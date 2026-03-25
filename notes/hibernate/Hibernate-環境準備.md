> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，再麻煩直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

# Hibernate 環境準備與工具安裝

這篇筆記記錄了早期在本地端搭建純 Hibernate 開發環境的步驟（使用 STS 與 Tomcat）。
原因是早期的專案沒有 Spring Boot 自動配置，所有環境都必須手動搭建。

---

## 1. 核心開發工具
- **STS (Spring Tool Suite)**：基於 Eclipse 的 IDE，內建對 Spring 的支援。
- **JDK**：建議安裝 LTS 版本並設定好環境變數。
- **JBoss Tools**：在 STS 內安裝，用來輔助撰寫 `hibernate.cfg.xml` 與 `.hbm.xml` 等設定檔。

---

## 2. 伺服器與資料庫建置
- **Tomcat 9**：下載後解壓縮，並在 STS 的 Server 視窗中進行掛載與綁定。
- **MySQL**：建立本地資料庫，供 Hibernate 連線測試。

---

## 3. IDE 基礎設定
- 預計將工作區 (Workspace)、CSS、HTML、JSP 的文字編碼全部統一設定為 **UTF-8**。
- 設定 **Auto Activation**，讓 Java 程式碼能自動提示與補全。

> 💡 **現況總結**：目前在使用 Spring Boot 時，我們不再需要手動安裝 Tomcat，也不需要手動掛載 JBoss Tools。這些步驟已全數自動化。

---
