# JWT 身份驗證機制

JWT（JSON Web Token）是一種用於在系統之間安全傳遞資訊的標準格式，常用於 API 的身份驗證與授權。

---

## 1. 結構

JWT 由三個部分組成，以 `.` 分隔：

```
Header.Payload.Signature
```

| 部分 | 內容 |
|------|------|
| **Header** | Token 類型（JWT）+ 加密演算法（如 HS256） |
| **Payload** | 要傳遞的資料（如使用者 ID、角色、過期時間） |
| **Signature** | 對 Header + Payload 的簽章，用於驗證完整性 |

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

## 3. 特點

| 特點 | 說明 |
|------|------|
| **無狀態** | 伺服器不需儲存 Session，Token 本身含所有資訊 |
| **跨域支援** | 適合前後端分離、微服務架構 |
| **有效期限** | Payload 中可設定 `exp`（過期時間）自動失效 |
| **不可篡改** | Signature 保護 Payload，若被竄改驗證會失敗 |

> 注意：JWT 本身不加密 Payload（僅 Base64 編碼），敏感資料不應放入 Payload，或需搭配 HTTPS 傳輸。

---
