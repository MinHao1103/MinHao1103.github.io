> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，再麻煩直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

使用 IntelliJ 管理資料庫數據
===
# ( 1 ) Database
* 在 IntelliJ 視窗的右邊有一個 Database
* 點選 + 號 -> Data Source -> MySQL
![](https://i.imgur.com/QXwnEq8.png)

# ( 2 ) 設定 Database
* Name：可任意名稱，方便自己辨識
* Host、Port：不用改
* User、Password：輸入自己的資料庫帳號密碼
* 最後按下 Test Connection
![](https://i.imgur.com/OxbdXBy.png)

# ( 3 ) 下載相對應的 Driver Files
![](https://i.imgur.com/w85Qpjm.png)

# ( 4 ) 成功畫面
![](https://i.imgur.com/NGZAQhZ.png)

# ( 5 ) 建立資料庫
* mysql local 右鍵 -> Jump to Query Console
![](https://i.imgur.com/Ku40Rbc.png)
* console ( Default )
![](https://i.imgur.com/KtJnSL8.png)
* 輸入 CREATE DATABASE myjdbc 並且按下執行
![](https://i.imgur.com/YxX3cri.png)

# ( 6 ) 建立 Table
```sql=
CREATE TABLE student(
    id INT PRIMARY KEY,
    name VARCHAR(30)
)
```
* 寫好創建 Table 的 SQL 語法後
* 記得要指定在哪一個 DataBase 創建 Table
* 如下表所示
![](https://i.imgur.com/FREwX2F.png)

# ( 7 ) 使用快捷鍵執行 SQL 語法
* 將鼠標移至欲執行的 SQL 指令
![](https://i.imgur.com/sM0HOuQ.png)

# ( 8 ) 基本 SQL 指令
```sql=
-- 新增 C
INSERT INTO student(id, name) VALUE (1,'Eden');

-- 查詢 R
SELECT * FROM student;

-- 修改 U
UPDATE student SET name = 'Peter' WHERE id = 1;

-- 刪除 D
DELETE FROM student WHERE id = 1;
```

# ( 9 ) 圖形化介面 操作 資料庫
* 點擊 student Table 兩下
![](https://i.imgur.com/xD5H3VE.png)

## ( 9-1 ) 新增
* 點擊 + 號，新增一筆資料
![](https://i.imgur.com/YitfdpE.png)
* 輸入完成後，按下 DB Submit 按鈕即可
![](https://i.imgur.com/3qjPvf1.png)

## ( 9-2 ) 修改
* 直接修改後，按下 DB Submit 即可
![](https://i.imgur.com/frxRi8E.png)

## ( 9-3 ) 刪除
* 點擊 - 號，刪除一筆資料
![](https://i.imgur.com/L3Dgdrc.png)
* 按下 DB Submit 按鈕即可
![](https://i.imgur.com/zS9K7EL.png)

## ( 9-4 ) 重新整理
* 如果是不小心修改到資料庫中的數據
* 按下 Reload Page，可以回復到一開始的狀態
![](https://i.imgur.com/Yym1ROO.png)

## ( 9-5 ) 查詢
![](https://i.imgur.com/PLwfxzb.png)

## ( 9-6 ) Teanspose 行列反轉
![](https://i.imgur.com/CUzGdr1.png)

# ( 10 ) pom.xml 資料庫連線設定
## ( 10-1 ) 讓 Spring Boot 程式，可以使用 Spring JDBC 的功能
```xml=
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

## ( 10-2 ) [MySQL Drivers](https://mvnrepository.com/artifact/mysql/mysql-connector-java)
* 選擇你需要的版本，添加 MySQL 的 Driver
* 讓 Spring Boot 程式，能夠成功連線到 MySQL 資料庫
```xml=
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.22</version>
</dependency>
```
![](https://i.imgur.com/Ry4HU0n.png)

## ( 10-3 ) application.properties
* [MySQL Timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
```properties=
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/myjdbc?serverTimezone=Asia/Taipei&characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=root
```
![](https://i.imgur.com/B9mPeV0.png)

## ( 10-4 ) Bean NamedParameterJdbcTemplate
* 當 ( 10-1 ) ~ ( 10-3 ) 都設定好之後
* Spring JDBC 會自動創建 NamedParameterJdbcTemplate 的 Bean
![](https://i.imgur.com/GHAUuSf.png)
