> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，再麻煩直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

( 六 ) 使用 Hibernate 前置作業
===
# ( 1 ) 加入 Hibernate Library
```xm;
<dependencies>
	<dependency>
		<groupId>org.hibernate</groupId>
		<artifactId>hibernate-core</artifactId>
		<version>5.6.7.Final</version>
	</dependency>
</dependencies>
```

# ( 2 ) 使用框架皆須設定組態，Hibernate 也不例外
![](https://i.imgur.com/Vo95H4P.png)
## ( 2-1 ) 新建核心組態檔
* → Hibernate → Hibernate Configuration File(cfg.xml) → Next → Next → Finish
![](https://i.imgur.com/L9a3pTA.png)
## ( 2-2 ) Hibernate 組態設定 ( Connection )
![](https://i.imgur.com/AAX9WNQ.png)
* 資料庫連線設定
    * Session Factory → Properties → Connection
* Driver Class 輸入
    * com.mysql.cj.jdbc.Driver
* URL 輸入
    * jdbc:mysql://localhost:3306/JAVA_FRAMEWORK
* Username 輸入
    * root
* Password 輸入
    * 你的密碼
## ( 2-2 ) Hibernate 組態設定 ( Hibernate )
![](https://i.imgur.com/yfJGCkk.png)
* 其他設定
    * Session Factory → Properties → Hibernate
* Dialect 輸入
    * org.hibernate.dialect.MySQL8Dialect
* Show Sql 選 true
* Format Sql 選 true

## ( 2-3 ) 確認組態檔
![](https://i.imgur.com/PURHmGG.png)
* 切換至 Source 模式
* 將 \<session-factory name=""\> 改成 \<session-factory\> (即刪除name屬性) 存檔
![](https://i.imgur.com/hao0r6l.png)

# ( 3 ) Hibernate 映射設定 ( Annotation 的方式 )
![](https://i.imgur.com/aqBeOz1.png)
* @Column(name="xxx")
* 由於資料庫端對應的欄位名，含有底線 ( _ ) 與Java端不同
* 所以須另外以 name 屬性設定其名稱
![](https://i.imgur.com/PgBlk07.png)

## ( 3-1 ) 註冊實體
* 開啟 核心組態檔 ( hibernate.cfg.xml )
* 在 \<session-factory\> 中加入 \<mapping\>
![](https://i.imgur.com/ewChF32.png)

# ( 4 ) 純 Hibernate 環境下，須使用 HibernateUtil
* 說明
    * 純 Hibernate環境下，須使用 HibernateUtil
        * 用來載入 Hibernate 組態
* 新建 HibernateUtil 類別
    * src/main/java → core → util → 右鍵
    * → New → Class → Name 輸入 HibernateUtil → Finish
![](https://i.imgur.com/Oq0kDoy.png)
```java=
public class HibernateUtil {
	private static StandardServiceRegistry registry;
	private static SessionFactory sessionFactory;

	private static void buildSessionFactory() {
		try {
			registry = new StandardServiceRegistryBuilder().configure().build();
			MetadataSources metadataSource = new MetadataSources(registry);
			Metadata metadata = metadataSource.getMetadataBuilder().build();
			sessionFactory = metadata.getSessionFactoryBuilder().build();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static SessionFactory getSessionFactory() {
		if (sessionFactory == null) {
			buildSessionFactory();
		}
		return sessionFactory;
	}

	public static void shutdown() {
		if (registry != null) {
			StandardServiceRegistryBuilder.destroy(registry);
		}
	}
}
```

## ( 4-1 ) 使用 main 測試
```java=
public class TestApp {
    public static void main(String[] args) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Member member = session.get(Member.class, 1);
        System.out.println(member.getNickname());
        HibernateUtil.shutdown();
    }
}
```
# ( 5 ) 介紹工具類別
* java 中 Math 是一個工具類別
    * 為什麼在 Math 類別中，需要一個建構值是 private 無參數建構值
    * 因為本身是一個工具類別，不會有需要 Math 物件的存在
    * 而它的修飾字為 public static ( 公開 靜態 )
