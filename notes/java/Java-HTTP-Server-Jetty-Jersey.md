# Java HTTP Server 實作：Jetty 與 Jersey 整合

## 1. 核心技術
本專案是一個基於 Java 實作的輕量級 HTTP 伺服器，結合了兩個強大的框架來處理 Web 請求與 RESTful 服務。

### Jetty：底層 Web 伺服器
*   **定位：** 一個輕量級、模組化的 Java Web 伺服器與 Servlet 容器。
*   **角色：** 負責底層 HTTP 機制，包括接收請求、回傳回應，並實作 `javax.servlet` API。
*   **優勢：** 相比於 Apache Tomcat，Jetty 更為輕量，適合嵌入式應用或微服務。

### Jersey：RESTful 服務框架
*   **定位：** 基於 **JAX-RS (JSR 311 & JSR 339)** 標準的開源 RESTful 服務框架。
*   **角色：** 處理應用程式層級的邏輯與路由 (Routing)，功能類似於 Spring MVC。
*   **特性：** 提供結構化的方式來實作 REST API，並支援多種資料格式的序列化與反序列化。

---

## 2. 專案功能與能力
1.  **伺服器端 (Server-Side)：** 能夠處理傳入的 HTTP 請求並根據邏輯回傳對應的回應。
2.  **用戶端 (Client-Side)：** 包含作為 HTTP Client 的功能，可向其他伺服器發送請求。
3.  **Servlet 支援：** 支援部署依賴標準 Servlet API 的 Java Web 應用。
4.  **RESTful API：** 提供標準化的 REST 服務開發模式，易於擴展與維護。

---

## 3. 專案結構
*   **建置系統：** 使用 **Gradle** 進行依賴管理與專案建置。
*   **原始碼：** Java 實作位於 `src/main` 目錄下。
*   **依賴管理：** 外部函式庫存放於 `libs` 資料夾或透過 Gradle 遠端抓取。

---

## 參考連結
*   [HTTPServer GitHub Repository](https://github.com/MinHao1103/HTTPServer)
