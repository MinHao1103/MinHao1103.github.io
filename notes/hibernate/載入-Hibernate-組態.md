> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，再麻煩直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

# Hibernate 組態載入與 Utility 類別

這篇筆記記錄了如何在沒有 Spring 框架協助的情況下，手動載入 Hibernate 設定檔並建立連線池。
原因是 `SessionFactory` 建立過程非常耗時，必須被設計為單例模式 (Singleton)。

---

## 1. HibernateUtil 設計模式
在傳統架構中，我們預計會建立一個 `HibernateUtil` 類別來管理全域唯一的 `SessionFactory`。

### 實作範例
```java
public class HibernateUtil {
    private static final SessionFactory sessionFactory;

    static {
        try {
            // 讀取 hibernate.cfg.xml 並建立 SessionFactory
            sessionFactory = new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
    
    public static void shutdown() {
        getSessionFactory().close();
    }
}
```

---

## 2. 現況與下一步
目前微服務專案中，再麻煩直接忘記這個工具類。Spring Boot 的 `DataSourceAutoConfiguration` 會在啟動時全自動幫你處理好所有的連線池與 `SessionFactory` 生命週期管理。

---
