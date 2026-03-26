> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與進階實作，請直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

# Spring Boot 環境準備

這篇筆記記錄了早期在 Windows 環境下，從零開始建置 Java 與 Spring Boot 開發環境的流程。

---

## 1. 核心開發工具安裝

- **JDK** (Java Development Kit)
  - 建議下載 OpenJDK 11 或 17 (目前主流 LTS 版本)。
  - 安裝後於終端機輸入 `java -version` 確認是否設定成功。
- **IDE 開發環境**-**IntelliJ IDEA Ultimate**：目前開發 Spring Boot 最強大的工具，內建資料庫連線與 HTTP Client。
- **版本控制**-**Git**：安裝 Git for Windows，並設定全域 `user.name` 與 `user.email`。

---

## 2. 資料庫與輔助工具

- **MySQL Server**
  - 安裝 MySQL Community Server。
  - 安裝過程中需設定 `root` 密碼，並建議將編碼預設改為 `utf8mb4`。
- **API 測試工具**-**Postman**或 Chrome 擴充功能**Talend API Tester**：用來測試 Spring Boot 寫出來的 RESTful API。

---
