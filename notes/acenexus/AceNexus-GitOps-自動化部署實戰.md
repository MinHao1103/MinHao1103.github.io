# AceNexus GitOps 自動化部署架構實戰

本篇筆記詳細解析了 [**AceNexus/deploy**](https://github.com/AceNexus/deploy) 專案的核心架構。該系統採用了現代化的 **GitOps** 模式，實現了從代碼提交、安全掃描到 Kubernetes (K8S) 自動同步部署的全自動化流程。

---

## 1. 核心架構：ArgoCD + GitHub Actions

在 AceNexus 的生態系中，部署流程被拆分為兩個相互關聯的階段，確保了開發 (Dev) 與運維 (Ops) 的職責分離。

### 第一階段：CI (服務端儲存庫流水線)
每個微服務（如 `gatewayservice`, `nexusbot`）在其 GitHub Actions 工作流中執行以下步驟：
1.  **建置與測試：** 執行 Gradle 單元測試並封裝 JAR。
2.  **安全性掃描：** 使用 **Trivy** 對 Docker 映像檔進行漏洞掃描。若偵測到高風險漏洞，流水線將自動終止。
3.  **映像檔推送：** 通過掃描的映像檔被推送到 **GitHub Container Registry (GHCR)**。
4.  **配置更新 (關鍵步驟)：** 使用 `sed` 自動更新 [**AceNexus/deploy**](https://github.com/AceNexus/deploy) 儲存庫中對應服務的 `k8s/deployment.yaml` 映像檔標籤 (Image Tag)。

### 第二階段：CD (GitOps 部署中心)
這是一個「Source of Truth (單一事實來源)」的儲存庫：
1.  **ArgoCD 監控：** ArgoCD 持續監聽 `deploy` 儲存庫的變更。
2.  **狀態同步：** 當偵測到 YAML 配置（即 CI 階段更新的映像檔標籤）變更時，ArgoCD 會自動將 K8S 集群的狀態同步至最新配置。
3.  **零停機更新：** 利用 K8S 的滾動更新機制，確保服務在版本更迭過程中始終保持可用。

---

## 2. 基礎設施管理與維運

為了確保整個微服務集群的穩定性與開發便利性，該專案整合了多項運維工具：

### 具順序依賴性的重啟機制
微服務之間存在啟動順序的依賴關係，實作了 `restart_k8s.sh` 腳本確保順序正確：
- **第一步：** 啟動中介軟體 (RabbitMQ)。
- **第二步：** 啟動基礎設施服務 (Config → Eureka)。
- **第三步：** 啟動路由與業務服務 (Gateway → Bot)。

### 網路隧道整合 (ngrok)
- **場景：** LINE Webhook 需要一個公開的 HTTPS URL。
- **實作：** 透過 `ngrok-tunnel.sh` 自動建立外部隧道並導向內部 `gatewayservice` (Port 8080)。

---

## 3. 安全性與災難復原

- **Secret 管理：** 所有的敏感資訊（資料庫憑證、API Keys）均不進入 Git 儲存庫，而是透過 K8S Secrets 手動建立並在 Pod 中引用。
- **快速回滾：**
    - **Git 層級：** 透過 Git Revert 回退 `deploy` 儲存庫的配置。
    - **ArgoCD 層級：** 在 ArgoCD UI 中一鍵執行版本回滾，幾秒內即可恢復至先前的穩定版本。

---

## 參考連結
*   [AceNexus/deploy GitHub Repository](https://github.com/AceNexus/deploy)
*   [GitOps 核心觀念官方指南](https://www.gitops.tech/)
