( 一 ) Hibernate 介紹
===
# ( 1 ) JDBC 程式問題
* 撰寫 JDBC 時，常需要在 ResultSet 物件取資料放到 JavaBean 中
    * 繁瑣且無技術價值
* 只要撰寫存取關聯式資料庫的程式，都會遇到此種問題
    * 故發展出 ORM 概念
![](https://i.imgur.com/s9olKjx.png)

# ( 2 ) 什麼是 ORM，Object Relational Mapping ?
* 物件導向程式語言 ( 由軟體工程發展而來 )
* 關聯式資料庫 ( 由數學中發展出來 )
    * 為了解決此兩種技術差異，而發展出"物件關聯映射" => ORM
* Object Relational Mapping ( 物件關聯映射 )
    * 將 "物件導向" 程式端與 "關聯式" 資料庫端做映射 ( Mapping )
    * 藉由操作程式端物件，來見間操作資料庫端的物件
    * ORM 的實作就稱為 ORM-Framwork ( ORM 框架 )
        * Hibernate
        * MyBatis
        * Spring Data JPA

# ( 3 ) Hibernate 由來
* 澳洲⼯程師 Gavin 受夠繁瑣 JDBC 程式而發明了 Hibernate
    * Hibernate 屬於 Object Relational Mapping ( ORM ) 的實作
    * 底層依賴 JDBC
        * Hibernate 對 JDBC 進行輕量級的封裝
            * "POJO" 與 "資料庫表" 建立 "映射" 關係
            * Hibernate 可自動生成SQL語句，自動執行

# ( 4 ) Hibernate 架構
![](https://i.imgur.com/u7dplNm.png)
* 名詞解釋
    * Data Access Layer ( 數據訪問層，DAL ) -> DAO
        * 在物件導向中，數據訪問層可能會回傳對象的引用及它的屬性
        * 可透過創建方法來對目標進行操作
        * 對目標對象操作的同時，對應的資料庫中的數據也會變更
    * Java Persistence API ( Java 持久化 API，JPA )
        * Java 應用程式接口規範
        * 持久化 三個層面
            * API 本身定義在 javax.persistence 內
            * Java 持久化查詢語言 ( JPQL )
            * 對象 / 關係 元數據

# ( 5 ) Hibernate 小故事
* 因為 Gavin 發明 Hibernate，導致 Java EE 原廠技術逐漸被拋棄
* 也出現許多其他框架，而 JAVA 官方想要將存取資料庫的寫法做到統一
* 才出現 Java Persistence API
* JPA 許多規範和 Hibernate 一致
* 因為 Java 官方提出的 JPA 也是由 Gavin 工程師開發的

# ( 6 ) Hibernate 使用概念
* 先對類別做映射設定
    * 描述 "類別" 與 "資料庫端" 的關聯
    * 再改變物件的狀態 State
        * 例如：有一個 Member 的 VO，將 memberId 從 1 改成 2
* 藉由狀態改變的副作用 ( Side effect ) 來間接操作資料庫
* 主流不撰寫 SQL，但遇到特殊情況還是可以撰寫原生 SQL 
    * Hibernate 提供 Native SQL API 來對應原生 SQL 用法
