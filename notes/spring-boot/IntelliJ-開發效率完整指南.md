> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與進階實作，請直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

# IntelliJ IDEA 開發效率完整指南

熟練使用 IDE 的快捷鍵與內建工具，可以省下大量滑鼠操作時間，讓開發節奏更順暢。本篇整合了快捷鍵、外掛建議與內建資料庫管理三個面向。

---

## 1. 常用快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Alt + Insert` | 程式碼生成：產生 Getter/Setter、建構子 |
| `Alt + Enter` | 快速修復與提示：自動匯入套件、修復語法錯誤 |
| `Ctrl + Alt + L` | 格式化排版：保持程式碼風格一致 |
| `Shift + Shift` | 全域搜尋（Search Everywhere）：找檔案或類別最快的方式 |

---

## 2. 實用外掛建議

在微服務開發環境中，建議安裝以下外掛：

- **Lombok**：自動產生 Getter/Setter、建構子等樣板程式碼，讓 Entity 類別更簡潔
- **SonarLint**：即時檢查程式碼品質與潛在 Bug，減少 Code Review 來回

---

## 3. 內建資料庫管理

IntelliJ 內建的 Database 工具讓你不需要額外開啟 DBeaver 或 DataGrip，直接在 IDE 內就能完成大多數資料庫操作。

### 連線設定

1. 在右側邊欄開啟 **Database** 面板
2. 點擊 `+` 新增 Data Source（例如 MySQL）
3. 輸入 URL、User、Password，點擊 **Test Connection** 確認連線正常

### 實戰應用

- 撰寫 SQL 時享有**自動補全（Auto-Completion）**
- 雙擊 Table 直接檢視與修改資料
- 快速匯出／匯入 DDL 與 DML 腳本

---
