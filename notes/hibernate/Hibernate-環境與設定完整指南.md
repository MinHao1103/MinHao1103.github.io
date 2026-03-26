> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，請直接參考「Hibernate Session 與查詢優化」或「延遲載入與效能優化」章節，謝謝！

---

# Hibernate 環境準備與設定完整指南

> ⚠️ **技術時效說明**：本篇描述的是**非 Spring Boot 環境**下的傳統手動配置流程。在現代 Spring Boot 專案中，以下大部分步驟已由自動裝配取代，但了解底層機制仍有助於排查老專案問題。

---

## 1. 開發環境準備

早期在沒有 Spring Boot 的環境下，需要手動搭建完整的 Hibernate 開發環境。

### 核心工具

| 工具 | 說明 |
|------|------|
| **STS（Spring Tool Suite）** | 基於 Eclipse 的 IDE，內建對 Spring 的支援 |
| **JBoss Tools** | 在 STS 內安裝，用來輔助撰寫 `hibernate.cfg.xml` 與 `.hbm.xml` 設定檔 |
| **Tomcat 9** | 下載後解壓縮，並在 STS 的 Server 視窗掛載與綁定 |
| **MySQL** | 建立本地資料庫，供 Hibernate 連線測試 |

### IDE 基礎設定

- 將工作區（Workspace）、CSS、HTML、JSP 的文字編碼統一設定為 **UTF-8**
- 開啟 **Auto Activation**，讓 Java 程式碼能自動提示與補全

> 💡 **現況**：使用 Spring Boot 後，不再需要手動安裝 Tomcat 或掛載 JBoss Tools，這些步驟已全數自動化。

---

## 2. 核心組態檔（`hibernate.cfg.xml`）

`hibernate.cfg.xml` 是 Hibernate 啟動時預設尋找的設定檔，**必須放在 `src/main/resources` 下**。

### 基本架構

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <!-- 各屬性設定寫在此處 -->
    </session-factory>
</hibernate-configuration>
```

### 資料庫連線設定

有兩種常見做法，依部署環境選擇：

**方式一：直接設定（適用本機開發）**

```xml
<property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
<property name="hibernate.connection.url">jdbc:mysql://localhost:3306/my_db</property>
<property name="hibernate.connection.username">root</property>
<property name="hibernate.connection.password">password</property>
```

**方式二：JNDI DataSource（適用正式環境）**

部署到 Tomcat / WebLogic 時，使用 JNDI 管理連線池，好處是程式碼不需知道真實帳密：

```xml
<property name="hibernate.connection.datasource">java:comp/env/jdbc/my_db</property>
```

### 方言與除錯設定

```xml
<!-- 指定資料庫方言，決定 Hibernate 產生的 SQL 語法 -->
<property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>

<!-- 開發期間建議開啟，方便除錯與排查 N+1 問題 -->
<property name="hibernate.show_sql">true</property>
<property name="hibernate.format_sql">true</property>
<property name="hibernate.highlight_sql">true</property>
```

> ⚠️ **注意**：正式上線時務必將 `show_sql` 關閉，大量 I/O 輸出會嚴重拖垮效能。

### 手動註冊實體類別

若未使用 Spring Boot 的自動掃描，必須在組態檔中明確列出所有 Entity：

```xml
<mapping class="com.example.entity.Emp" />
<mapping class="com.example.entity.Department" />
```

> 💡 **現況**：Spring Boot 只需 `@EntityScan(basePackages = "com.example.entity")` 即可取代上述 XML 步驟。

---

## 3. 組態載入：HibernateUtil

`SessionFactory` 建立過程非常耗時，必須設計為**單例模式（Singleton）**，整個應用程式共用同一個實例：

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

> 💡 **現況**：Spring Boot 的 `DataSourceAutoConfiguration` 在啟動時會全自動處理好所有連線池與 `SessionFactory` 的生命週期管理，不再需要手寫 `HibernateUtil`。

---
