# Spring Cloud 微服務架構實戰解析

在現代的企業級分散式系統中，Spring Cloud 提供了一套完整的微服務治理生態系。本篇筆記整理了微服務架構中三個最核心的基礎設施元件：服務註冊與發現 (Eureka)、API 網關 (Gateway)以及分散式配置中心 (Config Server)。

---

## 1. 服務註冊與發現 (Netflix Eureka)

在微服務架構中，服務的 IP 節點與 Port 會隨著容器化部署與水平擴展 (Auto-scaling) 頻繁變動。若在程式碼中「硬編碼 (Hardcode)」IP 位址，將無法適應動態的雲端環境。

### 核心機制
- Eureka Server (註冊中心)：作為微服務的通訊錄。所有的微服務啟動時，都會向 Eureka Server 註冊自己的網路位置與服務名稱 (Service ID)。
- Eureka Client (服務節點)：透過心跳機制 (Heartbeat) 定期向 Server 回報存活狀態。
- 客戶端負載均衡 (Client-Side Load Balancing)：當 Service A 要呼叫 Service B 時，A 會先向 Eureka 取得 B 的可用節點清單，並利用 LoadBalancer (舊版為 Ribbon) 演算法挑選其中一台發起請求。

> ⚠️ **自我保護機制（Self-Preservation）**：若 Eureka Server 短時間內丟失大量心跳（例如網路閃斷），它會啟動自我保護，暫停剔除任何服務節點，以防止健康的服務被誤殺。在開發環境（Dev）通常建議關閉以利除錯。

---

## 2. API 網關 (Spring Cloud Gateway)

隨著系統服務數量增加，前端 (Web/App) 若直接呼叫各個微服務的 API 會導致極高的耦合度。API Gateway 扮演了系統的「大門」與「警衛」角色。

### 核心功能
1. 統一路由轉發 (Routing)：將前端請求（例如 `/api/v1/user/`）自動代理到後端的 User Service。
2. 安全與權限驗證 (Authentication)：在此層進行 JWT 解析與 Token 校驗，攔截無效的請求，避免每個後端服務都要寫一次驗證邏輯。
3. 流量控制與防護 (Rate Limiting)：結合 Redis 實現基於 IP 或 User 的限流機制，防止 DDoS 攻擊或惡意爬蟲。

> 💡 Tip: 非阻塞架構：Spring Cloud Gateway 是基於 Spring WebFlux (Reactor) 打造的非阻塞非同步架構，效能遠高於舊版的 Zuul。在撰寫自訂的 Global Filter 時，絕對不能使用阻塞 (Blocking) 的操作（如 `Thread.sleep` 或傳統的 JDBC 查詢），否則會導致整個 Gateway 吞吐量崩潰。

---

## 3. 分散式配置中心 (Spring Cloud Config)

在微服務環境下，如果每個服務的 `application.yml` 都跟著程式碼一起打包，只要改一個資料庫密碼或參數，就要重新編譯並重啟服務，這在維運上是場災難。

### 核心機制
- 集中管理：透過 Config Server，將所有的設定檔統一抽離，並存放於外部儲存庫（如 GitHub / GitLab）。
- 多環境隔離：透過 `{application}-{profile}.yml` 的命名規則，輕鬆管理 Dev, Test, Prod 環境的配置。
- 動態熱更新 (Hot Refresh)：當 Git 上的配置改變時，客戶端可透過 Spring Boot Actuator 的 `/actuator/refresh` 端點（或結合 Spring Cloud Bus）動態載入新配置，無需重啟服務。

> 🔐 **敏感資訊保護**：絕對不要在 Git 配置庫中存放明文的資料庫密碼或 API Key。務必整合 Config Server 內建的加密機制（JCE），或對接 HashiCorp Vault 來管理機密資訊。

---
