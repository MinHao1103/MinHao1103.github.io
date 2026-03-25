# AceNexus 微服務基礎設施實戰架構

本篇筆記解析 [**AceNexus**](https://github.com/AceNexus) 組織下核心微服務基礎設施的實作細節。該架構採用 Spring Cloud 生態系，建構了一套高可用、可擴展且具備動態配置能力的後端系統。

---

## 1. 服務註冊與發現：EUREKASERVICE

[**EUREKASERVICE**](https://github.com/AceNexus/EUREKASERVICE) 是整個微服務體系的通訊錄，負責管理所有服務實例的生命週期。

### 關鍵實作：
- **安全防護：** 整合 HTTP Basic Auth，確保只有授權的服務節點能進行註冊。
- **健康監控：** 設定每 15 秒接收一次心跳 (Heartbeat)，若超過 45 秒未收到心跳則自動剔除失效節點。
- **叢集感知：** 支援多環境 Profile (local, dev, prod)，在生產環境中與 Config Server 深度整合。

---

## 2. 分散式配置中心：CONFIGSERVICE

[**CONFIGSERVICE**](https://github.com/AceNexus/CONFIGSERVICE) 實現了「配置即代碼 (Configuration as Code)」的理念，集中管理所有服務的環境參數。

### 關鍵實作：
- **Git 儲存後端：** 所有配置檔存放在專屬的 Git 儲存庫，實現版本控制與變更追蹤。
- **敏感資訊加密 (JCE)：** 使用 Java Cryptography Extension 進行對稱加密。在 Git 檔案中使用 `{cipher}` 前綴，Config Server 會在傳送給客戶端前自動解密。
- **動態重新載入 (Spring Cloud Bus)：** 整合 **RabbitMQ**。當配置變更時，透過 `/actuator/busrefresh` 端點發送廣播，讓所有微服務即時套用新配置而無需重啟。

---

## 3. 統一 API 網關：GATEWAYSERVICE

[**GATEWAYSERVICE**](https://github.com/AceNexus/GATEWAYSERVICE) 作為系統的唯一入口，承載了路由轉發與全域安全性檢查。

### 關鍵實作：
- **JwtAuthFilter：** 自定義全域過濾器。負責驗證請求標頭中的 JWT Token，校驗成功後將 `X-User-ID` 與 `X-User-Name` 注入下游請求，讓後端服務能直接獲取使用者身份。
- **GatewayLoggerFilter：** 記錄所有請求的詳細 Meta-data（Request ID, Path, IP, Duration），提升系統的可觀測性 (Observability)。
- **路徑重寫 (Path Rewriting)：** 透過 `StripPrefix` 過濾器，將 `/api/service-name/**` 格式的外部請求精確導向內部服務。

---

## 4. 部署維運體系
AceNexus 體系採用了現代化的 DevOps 流程：
1.  **映像檔建置：** 使用 GitHub Actions 進行測試、建置 JAR 並打包 Docker 映像檔。
2.  **安全性：** 在 CI 階段使用 **Trivy** 掃描映像檔漏洞。
3.  **自動部署：** 透過 ArgoCD 監控 `deploy` 儲存庫，實現 K8S 狀態自動同步。

---

## 參考連結
*   [AceNexus Organization](https://github.com/AceNexus)
*   [Spring Cloud 官方文件](https://spring.io/projects/spring-cloud)
