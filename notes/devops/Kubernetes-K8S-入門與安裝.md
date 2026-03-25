# Kubernetes (K8S) 入門與安裝

Kubernetes（通常簡稱 K8S）是一個開源的容器編排平台，用於自動化部署、擴展和管理容器化應用程式。最初由 Google 開發，現由 Cloud Native Computing Foundation (CNCF) 維護。

---

## 1. 核心概念

| 概念 | 說明 |
|------|------|
| **Pod** | K8S 中最小的部署單位，可包含一個或多個容器 |
| **Service** | 提供網路連接和負載均衡給一組 Pod |
| **Deployment** | 管理 Pod 的建立和更新 |
| **Namespace** | 提供隔離環境，將資源分組 |
| **ConfigMap / Secret** | 管理設定資料與敏感資訊 |

---

## 2. 使用情境

### 微服務架構
對於採用微服務架構的應用程式，Kubernetes 提供了理想的部署平台，能夠管理多個獨立服務，並處理它們之間的通信。

### 持續整合／持續部署 (CI/CD)
Kubernetes 與 CI/CD 工具整合，使開發團隊能夠實現自動化的應用部署和更新流程。

### 高可用性應用
透過自動化的健康檢查、自修復和負載均衡，Kubernetes 能夠確保應用程式的高可用性。

### 資源優化
Kubernetes 能夠有效分配運算資源，提高硬體利用率，並根據需求自動擴展或縮減應用程式。

---

## 3. 在 Ubuntu 上安裝 Kubernetes

### 系統需求

- Ubuntu 20.04 LTS 或更高版本
- 至少 2 GB RAM
- 2 CPU 或更多
- 充足的儲存空間與網路連線

### 步驟 1：系統準備

```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
```

### 步驟 2：設定 Kubernetes 儲存庫

```bash
# 建立金鑰存放目錄
sudo mkdir -p -m 755 /etc/apt/keyrings

# 下載並安裝 Kubernetes 簽章金鑰
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.33/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
sudo chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg

# 新增 Kubernetes apt 儲存庫
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.33/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo chmod 644 /etc/apt/sources.list.d/kubernetes.list
```

### 步驟 3：安裝 Kubernetes 工具

```bash
sudo apt-get update
sudo apt-get install -y kubectl kubelet kubeadm

# 防止套件被意外更新
sudo apt-mark hold kubelet kubeadm kubectl

# 驗證安裝
kubectl version --client
```

### 步驟 4：安裝 Kind（本地開發用）

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

kind --version
```

> 💡 Tip: **Kind** 適合用於本地開發和測試環境，不需要真實的多節點叢集。

### 步驟 5：建立叢集並驗證

```bash
# 建立本地叢集
kind create cluster

# 驗證叢集狀態
kubectl cluster-info
kubectl get nodes
```

---

## 4. 基本操作指令

### 查看節點狀態

```bash
kubectl get nodes
```

### 部署應用

```bash
# 部署 Nginx
kubectl create deployment nginx --image=nginx

# 查看部署與 Pod 狀態
kubectl get deployments
kubectl get pods
```

### 建立 Service

```bash
# 將 Nginx 暴露為服務
kubectl expose deployment nginx --port=80 --type=NodePort

# 查看服務
kubectl get services
```

### 使用 YAML 部署

建立 `nginx-deployment.yaml`：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

```bash
kubectl apply -f nginx-deployment.yaml
```

---
