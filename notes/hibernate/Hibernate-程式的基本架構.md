> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，請直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

# Hibernate 基礎程式架構

這篇筆記記錄了傳統 Hibernate 程式的標準執行流程。
原因是雖然現在 Spring Boot 自動處理了這些步驟，但了解底層的 `SessionFactory` 與 `Session` 運作，對排查連線問題非常有幫助。

---

## 1. 核心物件解析
- **Configuration**：讀取 `hibernate.cfg.xml` 設定檔。
- **SessionFactory**：重量級物件，負責建立資料庫連線池。整個應用程式通常只需一個實例（Singleton）。
- **Session**：輕量級物件，代表一次資料庫連線上下文 (Persistence Context)。
- **Transaction**：交易控制，確保資料的一致性 (ACID)。

---

## 2. 傳統執行流程
標準步驟如下：
```java
// 1. 取得 SessionFactory (通常封裝在 Util 類別中)
SessionFactory factory = new Configuration().configure().buildSessionFactory();

// 2. 開啟 Session 與 Transaction
try (Session session = factory.openSession()) {
    Transaction tx = session.beginTransaction();
    
    // 3. 執行 CRUD
    session.save(newMember);
    
    // 4. 提交交易
    tx.commit();
} catch (Exception e) {
    // 發生錯誤則 Rollback
}
```
再麻煩注意，現代開發一律交由 Spring 的 `@Transactional` 接管。

---
