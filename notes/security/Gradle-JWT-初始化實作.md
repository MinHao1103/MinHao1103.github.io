# Gradle JWT 初始化與實作 (Java 21 / Spring Boot 3.4)

## 1. 核心觀念
本專案示範了如何在基於 **Java 21** 與 **Spring Boot 3.4.0** 的環境下，使用 **Gradle** 建置一套完整的 JWT (JSON Web Token) 認證架構。

### 技術棧 (Tech Stack)：
*   **Java:** 21 (LTS)
*   **SpringBoot:** 3.4.0 (最新穩定版本)
*   **Database:** MariaDB (3.1.4)
*   **Documentation:** Swagger / OpenAPI
*   **Security:** Spring Security + JWT

---

## 2. 實作細節：JWT 安全性與金鑰生成
該專案不僅實作了 JWT 的基礎認證，更強調了基於 **RSA (非對稱加密)** 的簽署與驗證機制。

### RSA 非對稱加密
相較於傳統使用單一字串 (HS256) 的對稱加密，本專案使用 RSA 金鑰：
1.  **私鑰 (Private Key)：** 用於伺服器端簽署 Token。
2.  **公鑰 (Public Key)：** 用於驗證 Token 的完整性。

### 金鑰生成流程 (OpenSSL)：
1.  **產生私鑰：**
    ```bash
    openssl genpkey -algorithm RSA -out private_key.pem
    ```
2.  **產生憑證 (含公鑰)：**
    ```bash
    openssl req -new -x509 -key private_key.pem -out certificate.pem -days 365 -config openssl.cnf
    ```

---

## 3. 安全性配置與整合
### 集中化配置 (`Config.java`)
所有的安全性相關 Bean 與金鑰載入邏輯皆集中於 `Config.java` 中。產生的 RSA 金鑰與憑證應放入此檔案或對應的配置路徑，供系統在認證流程中調用。

### 初始化與測試
*   **資料庫整合：** 使用 MariaDB 存儲使用者資料，並提供 `test.sql` 進行測試資料初始化。
*   **API 測試：** 整合 Swagger UI (`/swagger-ui.html`) 與 Postman 集合文件，方便開發者進行驗證與功能測試。

---

## 4. 專案建置與遷移步驟
若要將此範本遷移至新專案，主要步驟如下：
1.  修改 `settings.gradle` 中的專案名稱。
2.  重構 `src/main/java` 中的套件 (Package) 路徑。
3.  重新產生 RSA 金鑰並更新 `Config.java`。
4.  設定資料庫連線資訊與 Smart Tomcat。

---

## 參考連結
*   [Gradle_JWT_init GitHub Repository](https://github.com/MinHao1103/Gradle_JWT_init)
