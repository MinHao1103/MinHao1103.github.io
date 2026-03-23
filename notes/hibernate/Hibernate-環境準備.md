( 二 ) Hibernate環境準備
===
# ( 1 ) Hibernate JDK 及 STS 下載
## ( 1-1 ) STS，Spring Tool Suite 介紹
:::warning
* STS ( Spring Tool Suite )
    * Java 框架 Spring 的開發⼯具
* 版本號
    * Spring Tools 4
        * Spring Boot 專用
    * Spring Tools 3
        * 傳統 Spring 專用 
        * :exclamation: 為了配合 Java 8，須將版本退至 3.9.14 ( for Eclipse 4.15.0 版 )
:::

## ( 1-2 ) 創建一個 Hibernate 資料夾
![](https://i.imgur.com/fxSR57M.png)

## ( 1-3 ) JDK 下載並解壓縮到 Hibernate 資料夾
:::warning
* [JDK 下載](https://adoptium.net/temurin/releases/?variant=openjdk8)
* 針對自身電腦環境做選擇
    * 建議使用 Java 8 
:::
![](https://i.imgur.com/YjLpFNU.png)
:::warning
* 解壓縮到 Hibernate 資料夾
:::
![](https://i.imgur.com/ydfg4tI.png)

## ( 1-4 ) Spring Tools 下載
:::warning
* [Spring|Tools網址](https://spring.io/tools)
    * [Windows 點我直接下載](https://download.springsource.com/release/STS/3.9.14.RELEASE/dist/e4.15/spring-tool-suite-3.9.14.RELEASE-e4.15.0-win32-x86_64.zip)
    * [MacOS 點我直接下載](https://download.springsource.com/release/STS/3.9.14.RELEASE/dist/e4.15/spring-tool-suite-3.9.14.RELEASE-e4.15.0-macosx-cocoa-x86_64.dmg)
* 以 Windows 為例子
    * 載完後點擊 spring-tool-suite-3.9.14.RELEASE-e4.15.0-win32-x86_64 資料夾
    * 點擊 sts-bundle 找到 sts-3.9.14.RELEASE 資料夾
    * 將 sts-3.9.14.RELEASE 複製到自己新建的 Hibernate 資料夾
:::
![](https://i.imgur.com/1puOUnY.png)

## ( 1-5 ) 設定 STS.ini 檔
:::warning
* 開啟檔案 sts-3.9.14.RELEASE -> STS.ini
* 在 openFile 後， -vmargs 前，設定 JDK 的路徑
* :exclamation: 注意 javaw.exe 改成自己的真實路徑  
:::
```java=
-vm
D:\Hibernate\jdk8u322-b06\bin\javaw.exe
```
![](https://i.imgur.com/vsvjD23.png)
<br>
![](https://i.imgur.com/2nH2sOf.png)


## ( 1-6 ) 建立 workspace
![](https://i.imgur.com/jb2JZ4E.png)
:::warning
* 第一次先執行 eclipse.exe
:::
![](https://i.imgur.com/3BXQdO6.png)
:::warning
* 專案指向剛建立的 workspace
:::
![](https://i.imgur.com/mPaYwPz.png)

## ( 1-7 ) 開啟後先調整 IDE 畫面
:::warning
* Window -> show view
* 左上：Project Explorer
* 左下：Servers、Boot Dashboard
* 下方：Markets、Progress、Console
:::
![](https://i.imgur.com/uewXFXe.png)

# ( 2 ) 文字編碼及基本設定
## ( 2-1 ) 工作區文字編碼
:::warning
* Window -> Preferences
    * General -> Workspace  ->  Text file encoding
:::
![](https://i.imgur.com/aFxiOR7.png)

## ( 2-2 ) CSS 檔文字編碼
:::warning
* Window -> Preferences
    * Web -> CSS Files -> Encoding
:::
![](https://i.imgur.com/dzrjgal.png)

## ( 2-3 ) HTML 檔文字編碼
:::warning
* Window -> Preferences
    * Web -> CSS Files -> Encoding
:::
![](https://i.imgur.com/vGxvekM.png)

## ( 2-4 ) JSP 檔文字編碼
:::warning
* Window -> Preferences
    * Web -> CSS Files -> Encoding
:::
![](https://i.imgur.com/FjNvLOp.png)

## ( 2-5 ) Auto activation triggers for java 設定
:::warning
* Window -> Preferences
    * (１) java -> (２) Editoe -> (３) Content Assist
        * (４) 勾選 Disalbe insertion triggers except 'Enter'
        * (５) Auto activation triggers for java
            * 貼上下方字串
                * .abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@
:::
![](https://i.imgur.com/nAYYY4l.png)

## ( 2-6 ) Html Auto activation delay 設定
:::warning
* Window -> Preferences
    * Web -> Htmlfiles -> Editor -> Context Assist
        * Auto activation delay(ms)：0
        * Prompt when these characters are inserted
            * abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ<=
:::
![](https://i.imgur.com/spBJ059.png)

## ( 2-7 ) 安裝 jboss tools ( 輔助 Hibernate 開發 )
:::warning
* Help -> Eclipse Marketplace
    * 搜尋 jboss tools
:::
![](https://i.imgur.com/BVrJUdl.png)

## ( 2-8 ) 安裝 Enhanced Class Decompiler
![](https://i.imgur.com/2PJgsFe.png)

# ( 3 ) [下載 Tomcat 9](https://tomcat.apache.org/download-90.cgi)
:::warning
* windows 專用：zip
* mac 專用：tar.gz
:::
![](https://i.imgur.com/2VzxAhC.png)
## ( 3-1 ) 下載完 Tomcat 9 後解壓縮到 Hibernate 資料夾
![](https://i.imgur.com/BViTFgB.png)

## ( 3-2 ) Spring tool 設定 Tomcat
:::warning
* Window -> Preferences
    * Server -> Runtime Environment -> Add
        * Apache -> Apache Tomcat v9.0
        * 勾選 Create a new local server
:::
![](https://i.imgur.com/hJrAtBa.png)
:::warning
* 指定到剛下載的 Tomcat 資料夾
:::
![](https://i.imgur.com/A75u0DC.png)

## ( 3-3 ) 開啟Servers⼦視窗 
:::warning
* 雙擊 Tomcat v9.0 Server at localhost
:::
![](https://i.imgur.com/PUCXqfU.png)
<br>
![](https://i.imgur.com/WMugZd4.png)

## ( 3-4 ) 測試 Tomcat 是否正常執行
:::warning
* 執行 Tomcat 時，點選左下角 Start the server
    * :exclamation: 直接執行 jsp 檔案是錯誤的方式
* 啟動時將 Console 點兩下放大
    * 檢查有沒有報錯
:::
![](https://i.imgur.com/one1tTt.png)

# ( 4 ) import 範例
:::warning
* [hibernate-exercise.zip](https://drive.google.com/drive/folders/14f2Q3u87Feg4TIq-XfLhVEa-eHvipU8e)
    * 範例是 zip 檔
:::
## ( 4-1 ) import
![](https://i.imgur.com/o6dGNe5.png)

## ( 4-2 ) General -> Existing Projects into Workspace
![](https://i.imgur.com/uDljVZr.png)

## ( 4-3 ) Select archive file 壓縮檔
:::warning
* 系統偵測成功就會自動打勾
:::
![](https://i.imgur.com/m9pj39S.png)

## ( 4-4 ) Add and Remove
:::warning
* 將剛才 import 的檔案加入到部署執行區塊
:::
![](https://i.imgur.com/9BjDD0B.png)
<br>
![](https://i.imgur.com/x7TjeL2.png)

## ( 4-5 ) 啟動 Server，測試 localhost:8080 是否成功
:::warning
* [http://localhost:8080/hibernate-exercise/index.html](http://localhost:8080/hibernate-exercise/index.html)
    * localhost:8080 為 Tomcat 預設
:::
![](https://i.imgur.com/f6Gz6V9.png)

# ( 5 ) 資料庫相關設定
:::warning
* context.xml
    * 帳號密碼改成自己的資料庫帳號與密碼
:::
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

![](https://i.imgur.com/brBqhwe.png)


## ( 5-1 ) 建立資料庫
:::warning
* [JAVA_FRAMEWORK.sql](https://drive.google.com/drive/folders/14f2Q3u87Feg4TIq-XfLhVEa-eHvipU8e)
    * 將 JAVA_FRAMEWORK.sql 檔案的內容，在 workbench 執行
:::
![](https://i.imgur.com/lzqLHc7.png)

## ( 5-2 ) 登入測試
:::warning
* 帳號：admin
* 密碼：P@ssw0rd
:::
http://localhost:8080/hibernate-exercise/index.html

# ( 6 ) Hibernate Library
:::warning
* pom.xml 加入 Hibernate Library
    * 進入 [mvnrepository](https://mvnrepository.com/)
    * 搜尋 Hibernate
    * 點擊 Hibernate Core Relocation
:::
![](https://i.imgur.com/1IE305a.png)
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
![](https://i.imgur.com/4GQwwoL.png)


# ( 7 ) Hibernate參考⽂件
:::warning
* [Guide](https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html)
* [API Doc](https://docs.jboss.org/hibernate/orm/current/javadocs/)
* [Manual](https://docs.jboss.org/hibernate/orm/5.0/manual/en-US/html/)
:::
