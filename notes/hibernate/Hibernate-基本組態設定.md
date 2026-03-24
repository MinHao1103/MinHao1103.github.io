( 三 ) Hibernate 基本組態設定
===
# ( 1 ) 核⼼組態檔
* 說明
    * 使用框架除了要加 Library，還需要做組態檔設定
    * 針對框架全局的組態，稱為核心組態
        * 使用組態檔為設定方式之一
* 檔案格式由官方決定
    * 常見格式：xml、properties、json 等
* 組態內容由官方定義
    * 須參考官方文件

## ( 1-1 ) Hibernate 核心組態檔
* 檔案格式
    * xml 格式，預設路徑檔名為
        * classpath:hibernate.cfg.xml
            * classpath 是放 java 檔的地方
* 組態內容
    * 根標籤\<hibernate-configuration\>
        * 可參考 [Guide-24.Configuration](https://docs.jboss.org/hibernate/orm/5.4/userguide/html_single/Hibernate_User_Guide.html)
    * 可使用 JBoss Tools 建立 Hibernate Configuration File ( cfg.xml )
## ( 1-2 ) Source Folder 資料夾
* src/main/java ( Source Folder )
    * 放 java 檔案
* src/main/resources ( Source Folder )
    * 放框架相關設定檔
![](https://i.imgur.com/IFZCQzk.png)

## ( 1-3 ) Hibernate 核心組態檔基本架構
```xml=
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate 
Configuration DTD 3.0//EN"
"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <!-- 各屬性設定寫在此處 -->
</hibernate-configuration>
```

# ( 2 ) 資料庫連線設定
## ( 2-1 ) 前提概要，為何需要資料庫連線設定 ?
* Hibernate 是 java 的 ORM 框架
    * O：Object -> 物件導向程式語言
    * R：Relational -> 關聯式資料庫 ( 資料庫連線設定 )
    * M：Mapping -> 映射
* ORM 框架
    * 就是為了操作物件導向的程式，來間接操作資料庫的物件

## ( 2-2 ) 資料庫連線設定說明
* Hibernate 用於存取資料庫
    * 所以必須做資料庫的連線設定
* 設定方式有兩種
    * １．直接設定連線資訊
    * ２．使用 JNDI 中的 DataSource
        * 上述兩種方式皆在 \<session-factory\> 標籤中設定
        * 參考 [Guide-24.4.Database connection properties](https://docs.jboss.org/hibernate/orm/5.4/userguide/html_single/Hibernate_User_Guide.html)

## ( 2-3 ) Guide-24.4.Database connection properties 相關文件
* JDBC Driver 的類別全名
![](https://i.imgur.com/txAzRWF.png)
* 資料庫連線的URL
![](https://i.imgur.com/OVHfN5w.png)
* 資料庫連線的使⽤者名稱
![](https://i.imgur.com/s04clB6.png)
* 資料庫連線的密碼
![](https://i.imgur.com/Fv0TSEt.png)

## ( 2-4 ) 什麼是 JNDI ?
* Java 命名與目錄介面
* Java Naming and Directory Interface
    * Naming -> 命名
    * Directory -> 目錄
    * Interface -> 介面
* 提供一個目錄系統，並將服務名稱與物件關聯起來
    * 讓開發人員在開發過程中可以使用名稱來存取物件

### ( 2-4-1 ) 傳統沒有 JNDI 的做法
* 對 MySQL JDBC 驅動程式類進行編碼
* 並通過 JDBC URL 連線到資料庫
```java=
class ConnectTestDemo {
	public static void main(String[] args) {
        
		String url = "jdbc:mysql://localhost:3306?useUnicode=yes&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Taipei";
		String user = "root";
		String password = "password";
		String driverClass = "com.mysql.cj.jdbc.Driver";
        
		try {
			Class.forName(driverClass);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return;
		}

		try (Connection connection = DriverManager.getConnection(url, user, password)) {
			System.out.println("Connecting to MySQL successfully!!");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
```

### ( 2-4-2 ) 沒有 JNDI 的作法存在的問題
* 1、資料庫伺服器名稱、使用者名稱或語法變動時
    * 則 JDBC URL 也要跟著改變
* 2、資料庫改用別的產品
    * 例如： DB2 或 Oracle 
        * 則 JDBC 驅動程式和類名需要修改
* 3、隨著時間實際使用終端的增加
    * 原配置的連線池也需要作調整
* 工程師不需要關心
    * "具體的資料庫"是什麼？
    * "JDBC 驅動程式"是什麼？
    * "JDBC URL 格式"是什麼？
    * "訪問資料庫的使用者名稱和語法"是什麼？
    * 等等這些問題交給 J2EE 容器來配置管理
    * 工程師只需要對這些配置和管理進行引用即可。
    * 由此，就有了JNDI

## ( 2-5 ) Hibernate 資料庫連線設定
### ( 2-5-1 ) ⽅式⼀：直接設定連線資訊
```xml=
<hibernate-configuration>
    <session-factory>
        <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
        <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/JAVA_FRAMEWORK</property>
        <property name="hibernate.connection.username">root</property>
        <property name="hibernate.connection.password">你的密碼</property>
    </session-factory>
</hibernate-configuration>
```

### ( 2-5-2 ) ⽅式⼆：使⽤ JNDI 中的 DataSource
* hibernate.connection.datasource
    * 掛載在 JNDI 中的 DataSource 物件之識別名稱
    * 對應context.xml中，<Resource name="識別名稱" ..略 />
```xml=
<hibernate-configuration>
    <session-factory>
        <property name="hibernate.connection.datasource">java:comp/env/jdbc/javaFramework</property>
    </session-factory>
</hibernate-configuration>
```

## ( 2-6 ) Hibernate 其他常⽤設定
* hibernate.dialect
    * 資料庫⽅⾔的類別全名
    * org.hibernate.dialect.Dialect 的⼦類皆可使⽤
* hibernate.show_sql
    * 是否在 Console 印出底層執⾏的 SQL 敘述
        * true：顯⽰
        * false：不顯⽰ ( 預設值 )
* hibernate.format_sql
    * 是否格式化在 Console 印出的 SQL 敘述
    * 配合 hibernate.show_sql 使⽤
        * true：格式化
        * false：不格式化 ( 預設值 )
* hibernate.highlight_sql
    * 是否替在 Console 印出的 SQL 敘述之關鍵字加上顏⾊
    * 配合 hibernate.show_sql 使⽤
    * true：加上顏⾊
    * false：不加上顏⾊ ( 預設值 )
```xml=
<hibernate-configuration>
    <session-factory>
        <property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>
        <property name="hibernate.show_sql">true</property>
        <property name="hibernate.format_sql">true</property>
        <property name="hibernate.highlight_sql">true</property>
    </session-factory>
</hibernate-configuration>
```

# ( 3 ) Hibernate 前置作業
## ( 3-1 ) 使用 Hibernate 技術，須加入 Hibernate Library
* 在 pom.xml 加入 Hibernate Library
* pom.xml
```xml=
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>5.6.7.Final</version>
</dependency>
```
![](https://i.imgur.com/nFxX46J.png)

### ( 3-1-1 ) pom.xml
* 在 pom.xml 下載的 Library 都會存放在
* ~\.m2\repository 資料夾
    * 以我這台電腦為例
        * C:\Users\Hao\.m2\repository
* 只要在 pom.xml 檔匯入 Maven，就會自動下載 Library
![](https://i.imgur.com/nWXnH9S.png)

### ( 3-1-2 ) Maven 重要目錄 / 檔案
* 本地端儲存庫
    * 路徑： ~/.m2/repository/
    * 說明：專案使用到的程式庫都會被下載到此處
* Maven 組態檔
    * 路徑：~/.m2/settings.xml
    * 說明：Maven 全局的組態設定
    * 備註：此檔案預設不存在，須手動建立
* 本地端 Archetype 列表檔
    * 路徑：~/.m2/archetype-catalog.xml
    * 說明：手動加入的 Arachetype，須在此檔註冊
    * 備註：此檔案預設不存在，須手動建立
* Maven 專案的 POM 檔
    * 路徑：%專案%/pom.xml
    * 說明：Maven 專案範圍的組態設定

## ( 3-2 ) Hibernate 組態設定
* 使用框架皆須設定組態
* src/main/resource 右鍵
    * new -> Other
![](https://i.imgur.com/KQTtCQ1.png)
* Hibernate -> Hibernatw Configuration File ( cfg.xml )
![](https://i.imgur.com/0dCk50o.png)
### ( 3-2-1 ) 資料庫連線設定
* DialectDialect
    * 輸⼊ org.hibernate.dialect.MySQL8Dialect
* Driver Class
    * 輸⼊ com.mysql.cj.jdbc.Driver
* URL
    * 輸⼊ jdbc:mysql://localhost:3306/JAVA_FRAMEWORK
* Username
    * 輸⼊ root
* Password
    * 輸⼊ 你的密碼
![](https://i.imgur.com/TBqiplE.png)
* Show Sql
    * 選 true
* Format Sql
    * 選 true
![](https://i.imgur.com/A1U9tSv.png)
* 設定完畢後切換到 Source
* 每次經由 JBoss Tools 編輯後都有可能⾃動被加上 name 屬性
    * :exclamation:需⼿動刪除 
![](https://i.imgur.com/NKU7PZ3.png)
* 正確如下
![](https://i.imgur.com/RKucxDt.png)
