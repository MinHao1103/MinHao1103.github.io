( 八 ) Hibernate 程式的基本架構
===
# ( 1 ) SessionFactory 物件
* Hibernate 的 SessionFactory 物件類似 JDBC 中的 DataSource 物件
* SessionFactory 說明
    * 連線工廠物件
    * 負責產生資料庫連線物件
* 取得方式
    * 純 Hibernate 環境
        * SessionFactory sessionFactory = Hibernate.getSessionFactory();
    * spring 環境
        * 透過 IoC / DI 機制取得

## ( 1-1 ) SessionFactory 物件 的方法
* Session openSession()
    * 開啟一個新的資料庫連線，回傳 session 物件
* Session getCurrentSession()
    * 取得當前資料庫連，須配合組態設定  hibernate.current_session_context_class 的使用
    * 當前 ( Current ) 的定義，是依據上述設定之值決定，回傳: Session物件

| 比較項目 | openSession() | getCurrentSession() |
| -------- | -------- | -------- |
|取得 Session 方式|每次新建|第一次新建，之後直接取用|
|配合組態設定|無|須設定 hibernate.current_session_context_class 為 Thread|
|執行緒 Session 數量|多個|1 個|
|Session 內 Transaction 數量|多個|1 個|
|刷新 Session 方式|手動 session.flush()|自動|
|關閉 Session 方式|手動 session.close()|藉由 Transaction 關閉<br> transaction.commit()<br>transaction.rollback()|

## ( 1-2 )  SessionFactory 物件 相關組態設定
* hibernate.current_session_context_class
    * Session 物件的作用範圍
        * 一般設定為 Thread，會將 Session 物件與 Thread 結合
        * 因為一個 Thread 內只能有一個 Session 物件，
        * 一個 Session 物件只會有一個 Transaction 物件
        * 所以交易結束後 Session 物件也會跟著自動被關閉，不可再呼叫 session.close()
    * 一般交易控制，會使用此設定
    * 在 Spring 環境下，若有使用 Spring 提供的 TransactionManager 物件
        * 預設會使用 SpringSessionContext，屆時須將此設定移除，否則會發生例外

# ( 2 ) Session物件
* 說明
    * 當有 SessionFactory 物件後，就可以產生 Session 物件
    * 類似於 JDBC 中的 Connection 物件，代表資料庫連線
    * 是 Hibernate 程式中的核心物件，又稱為 Persistence Context
* session 物件負責內容
    * 資料庫連線控制
        * 同 Connection 物件
    * 交易控制
        * 類似 Connection 物件，但會另外產生 Transaction 物件
    * 實體物件控制
        * 提供多種方法，用以控制實體物件的狀態
    * 是一個Not Thread-Safe物件
* 取得方式
    * session session = sessionFactory.openSession();
    * session session = sessionFactory.getCurrentSession();
* 重要方法
    * Transaction beginTransaction()
        * 開始交易，回傳 Transaction 物件
    * Transaction getTransaction()
        * 取得當前交易，回傳 Transaction 物件
    * void close()
        * 關閉資料庫連線
    * Session 型態中，定義許多控制實體物件的方法，在第 9 和 10 章會提到

# ( 3 ) Transaction物件
* 說明
    * Hibernate 是藉由改變實體物件的狀態來間接操作資料庫
        * 所以自動提交 ( Auto Commit ) 預設為 false
    * 新刪修查等動作，皆須在交易中完成
        * 此時就須使用 Transaction 物件
    * Transaction 物件須依附某個 Session 物件
        * 由某 Session 物件取得
            * 可以想成有連線 ( Session ) 才會有交易 ( Transaction )
        * 1 個 Session 物件，可以有 N 個 Transaction 物件
            * 要注意的是它們的時間軸不可重疊
            * Transaction物件 ( 1 個交易未結束前，不可另開交易 )
    * 是一個 Not Thread-Safe 物件
        * Transaction 並不是一個執行緒安全的物件
        * 終究是依賴 session 物件
* 取得方式
    * Transaction transaction = session.beginTransaction();
        * 須手動關閉 Session.close()
    * Transaction transaction = session.getTransaction();
        * 藉由 Transaction 自動關閉
* 重要方法
    * void commit()
        * 提交，同時會結束交易
    * void rollback()
        * 還原，同時會結束交易
    * 若是依附在 Session 物件，是透過 sessionFactory.getCurrentSession() 取得
    * 且組態屬性 hibernate.current_session_context_class 設為 Thread
    * 當具備以上條件，使用 commit() 與 rollback() 會同時關閉資料庫連線

