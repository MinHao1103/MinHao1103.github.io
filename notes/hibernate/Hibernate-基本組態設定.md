# Hibernate 基本組態設定

這篇筆記整理了在非 Spring Boot 環境下，如何手動配置 Hibernate 的核心組態 (`hibernate.cfg.xml`) 以及資料庫連線設定。

原因是目前在 Spring Boot 專案中，這些設定通常由 `application.yml` 自動裝配接管。但如果需要維護老專案，或是想深入了解底層機制，手動配置 `hibernate.cfg.xml` 仍然是必備技能。

---

## 1. 核心組態檔 (`hibernate.cfg.xml`)

這份檔案是 Hibernate 的核心，預設路徑必須放在 `src/main/resources` 下。

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

---

## 2. 資料庫連線設定

在 `<session-factory>` 中，我們必須告訴 Hibernate 如何連線到資料庫。目前有兩種常見做法。

### 方式一：直接設定連線資訊 (適用於本機開發)
這是最直接的做法，把 Driver、URL、帳密寫死在設定檔裡。

```xml
<hibernate-configuration>
    <session-factory>
        <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
        <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/my_db</property>
        <property name="hibernate.connection.username">root</property>
        <property name="hibernate.connection.password">password</property>
    </session-factory>
</hibernate-configuration>
```

### 方式二：使用 JNDI 中的 DataSource (適用於正式環境)
預計部署到正式伺服器（如 Tomcat / WebLogic）時，通常會使用 JNDI 來管理連線池。好處是程式碼不需要知道真實的帳密，只要去伺服器取名為 `java:comp/env/jdbc/my_db` 的資源就好。

```xml
<hibernate-configuration>
    <session-factory>
        <property name="hibernate.connection.datasource">java:comp/env/jdbc/my_db</property>
    </session-factory>
</hibernate-configuration>
```

---

## 3. 其他常用與效能除錯設定

再麻煩注意，開發階段建議開啟 SQL 顯示功能，這樣在除錯與觀察效能（例如排查 N+1 問題）時會非常方便。

```xml
<hibernate-configuration>
    <session-factory>
        <!-- 告訴 Hibernate 你用的是哪個資料庫，以便產生對應的 SQL 語法 -->
        <property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>
        
        <!-- 在 Console 印出底層執行的 SQL 敘述 -->
        <property name="hibernate.show_sql">true</property>
        
        <!-- 格式化印出來的 SQL，讓它自動換行排版 -->
        <property name="hibernate.format_sql">true</property>
        
        <!-- 替 Console 印出的 SQL 關鍵字加上顏色 -->
        <property name="hibernate.highlight_sql">true</property>
    </session-factory>
</hibernate-configuration>
```

### 💡 實戰小提醒
> 在正式上線 (Production) 時，請務必將 `show_sql` 關閉，否則大量的 I/O 輸出會嚴重拖垮伺服器效能。
