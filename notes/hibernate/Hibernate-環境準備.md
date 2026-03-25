( 二 ) Hibernate環境準備
===
# ( 1 ) Hibernate JDK 及 STS 下載
## ( 1-1 ) STS，Spring Tool Suite 介紹
* STS ( Spring Tool Suite )
    * Java 框架 Spring 的開發⼯具
* 版本號
    * Spring Tools 4
        * Spring Boot 專用
    * Spring Tools 3
        * 傳統 Spring 專用 
        * :exclamation: 為了配合 Java 8，須將版本退至 3.9.14 ( for Eclipse 4.15.0 版 )

## ( 1-2 ) 創建一個 Hibernate 資料夾
## ( 1-3 ) JDK 下載並解壓縮到 Hibernate 資料夾
* [JDK 下載](https://adoptium.net/temurin/releases/?variant=openjdk8)
* 針對自身電腦環境做選擇
    * 建議使用 Java 8 
* 解壓縮到 Hibernate 資料夾
## ( 1-4 ) Spring Tools 下載
* [Spring|Tools網址](https://spring.io/tools)
    * [Windows 點我直接下載](https://download.springsource.com/release/STS/3.9.14.RELEASE/dist/e4.15/spring-tool-suite-3.9.14.RELEASE-e4.15.0-win32-x86_64.zip)
    * [MacOS 點我直接下載](https://download.springsource.com/release/STS/3.9.14.RELEASE/dist/e4.15/spring-tool-suite-3.9.14.RELEASE-e4.15.0-macosx-cocoa-x86_64.dmg)
* 以 Windows 為例子
    * 載完後點擊 spring-tool-suite-3.9.14.RELEASE-e4.15.0-win32-x86_64 資料夾
    * 點擊 sts-bundle 找到 sts-3.9.14.RELEASE 資料夾
    * 將 sts-3.9.14.RELEASE 複製到自己新建的 Hibernate 資料夾
## ( 1-5 ) 設定 STS.ini 檔
* 開啟檔案 sts-3.9.14.RELEASE -> STS.ini
* 在 openFile 後， -vmargs 前，設定 JDK 的路徑
* :exclamation: 注意 javaw.exe 改成自己的真實路徑  
```java=
-vm
D:\Hibernate\jdk8u322-b06\bin\javaw.exe
```
<br>
## ( 1-6 ) 建立 workspace
* 第一次先執行 eclipse.exe
* 專案指向剛建立的 workspace
## ( 1-7 ) 開啟後先調整 IDE 畫面
* Window -> show view
* 左上：Project Explorer
* 左下：Servers、Boot Dashboard
* 下方：Markets、Progress、Console
# ( 2 ) 文字編碼及基本設定
## ( 2-1 ) 工作區文字編碼
* Window -> Preferences
    * General -> Workspace  ->  Text file encoding
## ( 2-2 ) CSS 檔文字編碼
* Window -> Preferences
    * Web -> CSS Files -> Encoding
## ( 2-3 ) HTML 檔文字編碼
* Window -> Preferences
    * Web -> CSS Files -> Encoding
## ( 2-4 ) JSP 檔文字編碼
* Window -> Preferences
    * Web -> CSS Files -> Encoding
## ( 2-5 ) Auto activation triggers for java 設定
* Window -> Preferences
    * (１) java -> (２) Editoe -> (３) Content Assist
        * (４) 勾選 Disalbe insertion triggers except 'Enter'
        * (５) Auto activation triggers for java
            * 貼上下方字串
                * .abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@
## ( 2-6 ) Html Auto activation delay 設定
* Window -> Preferences
    * Web -> Htmlfiles -> Editor -> Context Assist
        * Auto activation delay(ms)：0
        * Prompt when these characters are inserted
            * abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ<=
## ( 2-7 ) 安裝 jboss tools ( 輔助 Hibernate 開發 )
* Help -> Eclipse Marketplace
    * 搜尋 jboss tools
## ( 2-8 ) 安裝 Enhanced Class Decompiler
# ( 3 ) [下載 Tomcat 9](https://tomcat.apache.org/download-90.cgi)
* windows 專用：zip
* mac 專用：tar.gz
## ( 3-1 ) 下載完 Tomcat 9 後解壓縮到 Hibernate 資料夾
## ( 3-2 ) Spring tool 設定 Tomcat
* Window -> Preferences
    * Server -> Runtime Environment -> Add
        * Apache -> Apache Tomcat v9.0
        * 勾選 Create a new local server
* 指定到剛下載的 Tomcat 資料夾
## ( 3-3 ) 開啟Servers⼦視窗 
* 雙擊 Tomcat v9.0 Server at localhost
<br>
## ( 3-4 ) 測試 Tomcat 是否正常執行
* 執行 Tomcat 時，點選左下角 Start the server
    * :exclamation: 直接執行 jsp 檔案是錯誤的方式
* 啟動時將 Console 點兩下放大
    * 檢查有沒有報錯
# ( 4 ) import 範例
* [hibernate-exercise.zip](https://drive.google.com/drive/folders/14f2Q3u87Feg4TIq-XfLhVEa-eHvipU8e)
    * 範例是 zip 檔
## ( 4-1 ) import
## ( 4-2 ) General -> Existing Projects into Workspace
## ( 4-3 ) Select archive file 壓縮檔
* 系統偵測成功就會自動打勾
## ( 4-4 ) Add and Remove
* 將剛才 import 的檔案加入到部署執行區塊
<br>
## ( 4-5 ) 啟動 Server，測試 localhost:8080 是否成功
* [http://localhost:8080/hibernate-exercise/index.html](http://localhost:8080/hibernate-exercise/index.html)
    * localhost:8080 為 Tomcat 預設
# ( 5 ) 資料庫相關設定
* context.xml
    * 帳號密碼改成自己的資料庫帳號與密碼
```xml=
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xml>
<Context>
	<Resource name="jdbc/javaFramework"
		type="javax.sql.DataSource" driverClassName="com.mysql.cj.jdbc.Driver"
		jdbcUrl="jdbc:mysql://localhost:3306/JAVA_FRAMEWORK" username="你的帳號"
		password="你的密碼" factory="com.zaxxer.hikari.HikariJNDIFactory"
		minimumIdle="5" maximumPoolSize="10" connectionTimeout="30000" />
</Context>
```

## ( 5-1 ) 建立資料庫
* [JAVA_FRAMEWORK.sql](https://drive.google.com/drive/folders/14f2Q3u87Feg4TIq-XfLhVEa-eHvipU8e)
    * 將 JAVA_FRAMEWORK.sql 檔案的內容，在 workbench 執行
## ( 5-2 ) 登入測試
* 帳號：admin
* 密碼：P@ssw0rd
http://localhost:8080/hibernate-exercise/index.html

# ( 6 ) Hibernate Library
* pom.xml 加入 Hibernate Library
    * 進入 [mvnrepository](https://mvnrepository.com/)
    * 搜尋 Hibernate
    * 點擊 Hibernate Core Relocation
* pom.xml
```xml=
<dependencies>
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>5.6.7.Final</version>
    </dependency>
</dependencies>
```
# ( 7 ) Hibernate參考⽂件
* [Guide](https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html)
* [API Doc](https://docs.jboss.org/hibernate/orm/current/javadocs/)
* [Manual](https://docs.jboss.org/hibernate/orm/5.0/manual/en-US/html/)
