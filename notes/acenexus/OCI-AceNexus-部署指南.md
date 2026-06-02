# OCI + AceNexus 部署指南

---

## 目錄

- [架構](#架構)
- [免費資源](#免費資源)
- [網路設定](#網路設定)
- [建立 VM](#建立-vm)
- [軟體安裝](#軟體安裝)
- [K8s 部署](#k8s-部署)
- [CI/CD](#cicd)
- [費用](#費用)
- [常見問題](#常見問題)

---

## 架構

```
開發者 push
  |
  v
GitHub Actions (build -> test -> push image)
  |
  v
GHCR (ghcr.io/acenexus/<service>:<sha>)
  |
  v
AceNexus/deploy (k8s/*.yaml image tag 更新)
  |
  v  ArgoCD 每3分鐘輪詢
OCI VM - Kubernetes (k3s)
  |-- configservice  :8888
  |-- eurekaservice  :8761
  |-- gatewayservice :8080
  |-- nexusbot       :5001
  |-- rabbitmq       :5672
  |-- ArgoCD
  |-- TiDB Cloud (外部資料庫)
```

流量路徑：

```
LINE Webhook -> ngrok -> gatewayservice :8080 -> nexusbot :5001
```

CI/CD 時間：

```
push -> test (2-3 min) -> release (3-5 min) -> ArgoCD sync (3 min) = 約 8-11 分鐘
```

---

## 免費資源

| 資源 | 規格 |
|------|------|
| VM | VM.Standard.A1.Flex / 4 OCPU / 24GB RAM |
| Boot Volume | 50 GB |
| VCN / Subnet / IGW | 無限制 |
| Public IP | 臨時 IP（不手動保留） |
| 流量 | 10TB/月 |
| TiDB Cloud | Starter 5GB |

---

## 網路設定

### VCN

VCN（Virtual Cloud Network）是 OCI 的虛擬私有網路，等同於 AWS VPC，是所有網路資源（Subnet、路由、防火牆）的容器。設定位置：OCI Console → Networking → Virtual Cloud Networks → Create VCN。

| 欄位 | 值 |
|------|----|
| Name | acenexus-vcn |
| IPv4 CIDR | 10.0.0.0/16 |
| DNS Label | acenexusvcn |

### Subnet

Subnet 是 VCN 內的子網路，負責將網路空間切割成更小的區塊，VM 就建立在 Subnet 裡面。設定為 Public Subnet 表示該子網路內的 VM 可以取得 Public IP，能直接對外通訊。設定位置：VCN 詳細頁面 → Subnets → Create Subnet。

| 欄位 | 值 |
|------|----|
| Name | acenexus-subnet |
| Type | Regional |
| IPv4 CIDR | 10.0.0.0/24 |
| Access | Public Subnet |
| DNS Label | acenexussubnet |

### Internet Gateway

Internet Gateway（IGW）是 VCN 對外的出入口，讓 Subnet 內的 VM 可以與公網雙向通訊。沒有掛上 IGW，VM 就算有 Public IP 也無法對外連線。設定位置：VCN 詳細頁面 → Internet Gateways → Create Internet Gateway。

| 欄位 | 值 |
|------|----|
| Name | acenexus-igw |

### Route Table

Route Table 定義封包的轉發規則。`0.0.0.0/0 -> acenexus-igw` 表示所有對外流量都經由 IGW 出去，是讓 VM 能上網的關鍵設定。設定位置：VCN 詳細頁面 → 點入預設的 Default Route Table → Route Rules → Add Route Rules。

| Destination | Target |
|-------------|--------|
| 0.0.0.0/0 | acenexus-igw |

### Security List

Security List 是 OCI 的防火牆規則，等同於 AWS 的 Security Group，控制哪些 Port 允許進出。只有列在這裡的 Port 才能被外部存取，未開放的 Port 一律封鎖。設定位置：VCN 詳細頁面 → Security → 點入預設的 Default Security List → Ingress Rules → Add Ingress Rules。

| Port | 用途 |
|------|------|
| 22 | SSH |
| 6443 | k3s API |
| 8080 | gatewayservice |
| 8761 | eurekaservice |
| 8888 | configservice |
| 15672 | RabbitMQ UI |
| 9090 | ArgoCD |
| 3100 | aiclient |

---

## 建立 VM

VM（Virtual Machine）是實際運行 k3s 與所有服務的主機。OCI 的 Always Free 方案提供 VM.Standard.A1.Flex（ARM 架構），最多 4 OCPU / 24GB RAM 可免費使用。設定位置：OCI Console → Compute → Instances → Create Instance。

**Step 1 — Basic information**

| 欄位 | 值 |
|------|----|
| Name | acenexus-vm |
| Create in compartment | minhao1103 (root) |
| Availability domain | AD-1（若顯示 Out of capacity 改試 AD-2 / AD-3 或換區域） |
| Capacity type | On-demand capacity |

同一頁往下設定 Image 和 Shape：

點擊 **Change image**：

| 欄位 | 值 |
|------|----|
| OS | Canonical Ubuntu |
| Version | 22.04 |

點擊 **Change shape**：

| 欄位 | 值 |
|------|----|
| Shape series | Ampere（ARM） |
| Shape | **VM.Standard.A1.Flex** |
| OCPU | 4 |
| Memory | 24 GB |

> 預設會顯示 VM.Standard.E2.1.Micro（1 OCPU / 1GB），必須手動切換為 A1.Flex，否則試用期後收費。

**Step 2 — Security**

預設即可，不需要額外設定。

**Step 3 — Networking**

Primary VNIC 設定：

| 欄位 | 值 |
|------|----|
| VNIC name | acenexus-vcn |
| Primary network | Select existing virtual cloud network |
| VCN compartment | minhao1103 (root) |
| Virtual cloud network | acenexus-vcn |
| Subnet | Select existing subnet → acenexus-subnet (regional) |
| Private IPv4 address | Automatically assign private IPv4 address |
| Public IPv4 address | Automatically assign public IPv4 address（開啟 toggle） |
| IPv6 | 不支援，保持關閉即可 |

SSH Key 設定（同一頁下方 Add SSH keys）：

| 選項 | 說明 |
|------|------|
| Generate a key pair for me | OCI 自動產生，記得下載 private key（只顯示一次） |
| Upload public key file (.pub) | 上傳本機已有的 `~/.ssh/your_key.pub` |
| Paste public key | 直接貼上 public key 內容 |

**Step 4 — Storage**

預設 Boot Volume 46.6 GB 即可，不需要額外設定。若需要更大空間可勾選 **Specify a custom boot volume size**，Always Free 方案最大可設 200 GB。Block Volume 不需要掛載，保持空白。

點擊 **Create** 等待 VM 狀態變為 Running。

```bash
ssh -i ~/.ssh/your_private_key ubuntu@<VM_IP>
```

---

## 軟體安裝

### k3s

```bash
curl -sfL https://get.k3s.io | sh -
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
kubectl get nodes
```

### ArgoCD

```bash
kubectl create namespace argocd
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl get pods -n argocd -w
```

---

## K8s 部署

### Namespace

```bash
kubectl create namespace acenexus
```

### Secrets

```bash
kubectl create secret generic configservice-secret -n acenexus \
  --from-literal=security-username=<帳號> \
  --from-literal=security-password=<密碼> \
  --from-literal=encrypt-key=<金鑰> \
  --from-literal=rabbitmq-user=<帳號> \
  --from-literal=rabbitmq-pass=<密碼>

kubectl create secret generic nexusbot-secret -n acenexus \
  --from-literal=mysql-username=<帳號> \
  --from-literal=mysql-password=<密碼> \
  --from-literal=line-bot-channel-token=<token> \
  --from-literal=line-bot-channel-secret=<secret>

kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=<GitHub帳號> \
  --docker-password=<PAT> \
  -n acenexus

kubectl get secret -n acenexus
```

### 部署

```bash
kubectl apply -f k8s/configservice/deployment.yaml -n acenexus
kubectl apply -f k8s/eurekaservice/deployment.yaml -n acenexus
kubectl apply -f k8s/gatewayservice/deployment.yaml -n acenexus
kubectl apply -f k8s/nexusbot/deployment.yaml -n acenexus
kubectl apply -f k8s/aiclient/deployment.yaml -n acenexus
kubectl get pods -n acenexus -w
```

### ArgoCD

```bash
# 取得初始密碼
kubectl get secret argocd-initial-admin-secret -n argocd \
  -o jsonpath="{.data.password}" | base64 -d

# 開啟 UI
kubectl port-forward svc/argocd-server 9090:443 -n argocd

# 套用 Applications
kubectl apply -f argocd/configservice.yaml
kubectl apply -f argocd/eurekaservice.yaml
kubectl apply -f argocd/gatewayservice.yaml
kubectl apply -f argocd/nexusbot.yaml
kubectl apply -f argocd/aiclient.yaml

kubectl get application -n argocd
```

---

## CI/CD

### 流程

```
push to main
  |
  v  Job 1: test
  gradle build (失敗即中止)
  |
  v  Job 2: release
  gradle bootJar -> docker build -> push GHCR -> 更新 deploy repo
  |
  v  ArgoCD sync
  kubectl apply -> rolling update
```

### 日常指令

```bash
# 啟動
kubectl scale deployment aiclient configservice eurekaservice \
  gatewayservice nexusbot rabbitmq --replicas=1 -n acenexus

# 停止
kubectl scale deployment aiclient configservice eurekaservice \
  gatewayservice nexusbot rabbitmq --replicas=0 -n acenexus

# 狀態
kubectl get pods -n acenexus

# Log
kubectl logs -n acenexus deployment/nexusbot -f

# 重啟
kubectl rollout restart deployment -n acenexus

# 回滾
git revert HEAD && git push
```

---

## 費用

### 免費

| 項目 | 說明 |
|------|------|
| VM.Standard.A1.Flex | Always Free |
| VCN / Subnet / IGW | 永久免費 |
| 臨時 Public IP | 綁定 VM 即免費 |
| k3s | 自架 |
| TiDB Cloud Starter | 永久免費 5GB |

### 避免

| 項目 | 做法 |
|------|------|
| Static Reserved IP | 不手動保留 |
| OCI Load Balancer | 用 ngrok 取代 |
| OCI Container Engine | 用 k3s |
| NAT Gateway | 用 IGW |
| 非 Always Free VM | 只選 A1.Flex |

---

## Port 對照

| 服務 | Port |
|------|------|
| configservice | 8888 |
| eurekaservice | 8761 |
| gatewayservice | 8080 |
| nexusbot | 5001 |
| rabbitmq | 5672 |
| rabbitmq UI | 15672 |
| aiclient | 3100 |
| ArgoCD | 9090 |
| TiDB Cloud | 4000 |
