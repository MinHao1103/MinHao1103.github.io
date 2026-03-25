> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，再麻煩直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

# Hibernate 框架介紹

這篇記錄了早期初學 ORM (Object-Relational Mapping) 的基本觀念。
原因是理解 Hibernate 的歷史與定位，有助於現在更好地使用 Spring Data JPA。

---

## 1. 什麼是 Hibernate？
- Hibernate 是一個開源的 ORM 框架，負責將 Java 的實體物件 (Entity) 映射到關聯式資料庫的 Table 中。
- **優點**：工程師不需要手寫大量重複的 JDBC 與 SQL，直接操作 Java 物件即可完成 CRUD。

---

## 2. 與 JPA 的關係
- **JPA** (Java Persistence API)：是 Java 官方制定的 ORM「規範/介面」。
- **Hibernate**：是 JPA 規範最主流的「實作體」。
- **現況**：目前在微服務專案中，我們預計直接使用 Spring Data JPA，它底層預設就是封裝了 Hibernate。

---
