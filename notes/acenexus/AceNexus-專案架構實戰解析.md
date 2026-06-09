# AceNexus 專案架構實戰解析

[**AceNexus**](https://github.com/AceNexus) 是一套微服務系統，以 **NEXUSBOT**（LINE Bot 智慧助理）作為核心應用服務，並以 Spring Cloud 生態系建構基礎設施。

---

## 系統架構

![LineBot Demo](./images/LineBot.gif)

**服務組成與啟動順序：**

| 啟動順序 | 服務 | 技術 | 職責 |
|----------|------|------|------|
| 1 | RabbitMQ | Message Broker | 訊息佇列，Config 熱更新前置依賴 |
| 2 | [CONFIGSERVICE](https://github.com/AceNexus/configservice) | Spring Cloud Config | 集中管理所有服務環境配置，支援熱更新 |
| 3 | [EUREKASERVICE](https://github.com/AceNexus/eurekaservice) | Netflix Eureka | 服務註冊與發現 |
| 4 | [GATEWAYSERVICE](https://github.com/AceNexus/gatewayservice) | Spring Cloud Gateway | 系統唯一入口，路由轉發、JWT 驗證 |
| 5 | [NEXUSBOT](https://github.com/AceNexus/nexusbot) | Java + Spring Boot | LINE Bot，AI 對話、排程提醒、Flyway Schema 版控、MDC TraceID 追蹤 |

---

## 核心設計決策

### JWT 集中驗證（GATEWAYSERVICE）

統一驗證所有入站請求，驗證後將 `X-User-ID` 注入下游 Header。各業務服務無需重複實作驗證邏輯。

### 配置熱更新（CONFIGSERVICE + RabbitMQ）

配置變更透過 RabbitMQ 廣播，所有微服務即時套用新配置，**無需重啟任何服務**。

### 責任鏈模式（NEXUSBOT）

LINE 擁有多種事件類型（`message`、`follow`、`postback`、`unfollow` 等），若用 `if-else` 集中判斷會導致程式碼膨脹。
因此採用責任鏈模式，事件依優先序流經各處理器，匹配即截斷：

```
LINE Webhook → 管理員指令 → AI 聊天 → 預設回覆
```

新增功能只需插入新處理器，不動現有邏輯。

### GitOps CI/CD

```
push code
  → GitHub Actions 建置 JAR + Docker Image → 推送至 GHCR
  → 自動更新 deploy repo
  → ArgoCD 偵測變更 → 同步至 K8s 叢集
```

[deploy repo](https://github.com/AceNexus/deploy) 是唯一事實來源，回滾只需 `git revert`。

![NEXUSBOT CI/CD 操作示範](./images/nexusbot_cicd_1.gif)

![ArgoCD Applications](./images/argocd-applications.png)


---

## 參考連結

- [AceNexus Organization](https://github.com/AceNexus)
