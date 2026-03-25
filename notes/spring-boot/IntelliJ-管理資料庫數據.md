> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，請直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

# IntelliJ 內建資料庫管理

這篇筆記記錄了如何使用 IntelliJ 內建的 Database 工具。
原因是不需要額外開啟 DBeaver 或 DataGrip，直接在 IDE 內就能完成資料庫操作，效率最高。

---

## 1. 連線設定
- 在右側邊欄打開 **Database** 面板。
- 點擊 `+` 新增 Data Source (例如 MySQL)。
- 輸入 URL、User、Password，並點擊 **Test Connection** 確保連線正常。

---

## 2. 實戰應用
目前我在開發 Spring Boot 時，都會直接使用這個工具：
- 撰寫 SQL 時享有**自動補全 (Auto-Completion)**。
- 雙擊 Table 直接檢視與修改資料。
- 快速匯出/匯入 DDL 與 DML 腳本。

---
