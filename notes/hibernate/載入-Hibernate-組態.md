( 五 ) 載入 Hibernate 組態
===
# ( 1 ) 適用 環境及版本
:::warning
* 純 Hibernate 環境 vs. Spring 環境
    * 純 Hibernate 環境中
        * 會定義一個 HibernateUtil 的工具類別
            * 用來封裝載入組態的複雜程式碼
            * 讓使用端可以透過簡單的方式取得 SessionFactory 物件
            * Hibernate 每個版本 ( Version ) 皆有差異
            * 必須使用相對應的版本寫法
    * 業界通常會在 Spring 環境下使用 Hibernate
        * 此環境則不須撰寫 HibernateUtil 工具類別
:::
# ( 2 ) 組態相關物件
:::warning
* 說明
    * 撰寫載入核心組態的程式，須用到幾個重要物件
    * 以下僅說明版本 5.x 會用到的物件及步驟
* 使用步驟
    * 1. StandardServiceRegistryBuilder 相關
            * 實例化 → 載入核心組態檔 → 建立 StandardServiceRegistry 物件
    * 2. MetadataSources 相關
            * 實例化，StandardServiceRegistry 物件 → 註冊 映射檔/實體類別 →
            * 取得 MetadataBuilder 物件 → 建立 Metadata 物件
    * 3. Metadata 相關
            * 取得 SessionFactoryBuilder 物件 → 建立 SessionFactory 物件
    * 4. 銷毀 ( 使用完畢時 )
            * StandardServiceRegistryBuilder.destroy(registry);
:::

# ( 3 ) HibernateUtil-5.x 版
```java=
public class HibernateUtil5 {
	private static StandardServiceRegistry registry;
	private static SessionFactory sessionFactory;

	private static void buildSessionFactory() {
		try {
			registry = new StandardServiceRegistryBuilder().configure().build();
// registry = new StandardServiceRegistryBuilder().configure("核心組態路徑檔名").build();
			MetadataSources metadataSource = new MetadataSources(registry);
// metadataSource.addResource("映射檔路徑檔名");
// metadataSource.addAnnotatedClass(實體類別名.class);
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