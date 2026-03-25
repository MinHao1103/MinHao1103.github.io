> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，再麻煩直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

# 使用 Hibernate 的前置作業

這篇筆記記錄了在傳統 Java 專案中，如何手動初始化 Hibernate 的配置。
原因是這有助於理解 ORM 框架在底層需要哪些基礎資訊才能運作。

## 1. 建立核心組態檔
- 在 `src/main/resources` 下建立 `hibernate.cfg.xml`。
- 這是 Hibernate 啟動時預設會尋找的設定檔。

## 2. 設定連線與方言 (Dialect)
- 填入資料庫的 URL、Username 與 Password。
- 指定方言（例如 `org.hibernate.dialect.MySQL8Dialect`），這決定了 Hibernate 產生的 SQL 語法會針對哪個資料庫進行最佳化。
- 預計在開發環境中，會開啟 `show_sql` 與 `format_sql` 以便除錯。

## 3. 註冊實體與測試
- 使用 `<mapping class="com.example.Entity" />` 將加上了 `@Entity` 註解的類別註冊到組態檔中。
- 透過 `main` 方法執行 `Configuration().configure().buildSessionFactory()` 來測試連線是否成功建立。
