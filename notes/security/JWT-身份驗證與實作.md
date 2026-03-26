# JWT 身份驗證與實作

JWT（JSON Web Token）是一種用於在系統之間安全傳遞資訊的標準格式，常用於 API 的身份驗證與授權。本篇涵蓋 JWT 核心概念，以及基於 RSA 非對稱加密的 Spring Boot 實作。

---

## 1. JWT 結構

JWT 由三個部分組成，以 `.` 分隔：

```
Header.Payload.Signature
```

| 部分 | 內容 |
|------|------|
| **Header** | Token 類型（JWT）+ 加密演算法（如 HS256、RS256） |
| **Payload** | 要傳遞的資料（如使用者 ID、角色、過期時間 `exp`） |
| **Signature** | 對 Header + Payload 的簽章，用於驗證完整性 |

> ⚠️ **注意**：JWT 本身不加密 Payload（僅 Base64 編碼），敏感資料不應放入 Payload，或需搭配 HTTPS 傳輸。

---

## 2. 運作流程

```
1. 使用者登入 → 伺服器驗證帳密
2. 驗證成功 → 伺服器產生並回傳 JWT
3. 後續請求 → 客戶端在 Header 附上 JWT
   Authorization: Bearer <token>
4. 伺服器驗證 JWT 簽章 → 確認身份後回應
```

---

## 3. JWT 特點

| 特點 | 說明 |
|------|------|
| **無狀態** | 伺服器不需儲存 Session，Token 本身含所有資訊 |
| **跨域支援** | 適合前後端分離、微服務架構 |
| **有效期限** | Payload 中可設定 `exp`（過期時間）自動失效 |
| **不可篡改** | Signature 保護 Payload，若被竄改驗證會失敗 |

---

## 4. RSA 非對稱加密實作

相較於傳統使用單一密鑰（HS256 對稱加密），RSA 非對稱加密更適合需要多個服務驗證 Token 的微服務架構：

- **私鑰（Private Key）**：用於伺服器端**簽署** Token，只有 Auth 服務持有
- **公鑰（Public Key）**：用於其他服務**驗證** Token 的完整性，可公開分發

### 技術棧

| 技術 | 版本 |
|------|------|
| Java | 21 (LTS) |
| Spring Boot | 3.4.0 |
| Spring Security | 內建 |
| Database | MariaDB 3.1.4 |
| Documentation | Swagger / OpenAPI |

### 金鑰生成流程（OpenSSL）

```bash
# 1. 產生私鑰
openssl genpkey -algorithm RSA -out private_key.pem

# 2. 產生憑證（含公鑰）
openssl req -new -x509 -key private_key.pem -out certificate.pem -days 365 -config openssl.cnf
```

### 安全性配置

所有安全性相關 Bean 與金鑰載入邏輯集中於 `Config.java`，產生的 RSA 金鑰與憑證放入對應的配置路徑，供系統在認證流程中調用。

- **資料庫整合**：使用 MariaDB 存儲使用者資料，並提供 `test.sql` 進行測試資料初始化
- **API 測試**：整合 Swagger UI（`/swagger-ui.html`）與 Postman 集合文件

---

## 5. 遷移至新專案的步驟

1. 修改 `settings.gradle` 中的專案名稱
2. 重構 `src/main/java` 中的套件（Package）路徑
3. 重新產生 RSA 金鑰並更新 `Config.java`
4. 設定資料庫連線資訊

---

## 參考連結

- [Gradle_JWT_init GitHub Repository](https://github.com/MinHao1103/Gradle_JWT_init)

---
