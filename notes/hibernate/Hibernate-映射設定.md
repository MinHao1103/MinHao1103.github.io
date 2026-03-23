( 四 ) Hibernate 映射設定
===

# ( 1 ) Hibernate 映射設機制
:::warning
* Hibernate 屬於 ORM 框架，使用時必須做映射設定
:::
## ( 1-1 ) Hibernate 映射機制
:::warning
* 有映射 類別/物件，稱為 實體類別/物件 ( Entity Class / Object)
* 兩種映射方式
    * 使用 映射檔
    * 使用 Annotation
:::
![](https://i.imgur.com/gRhGr1Y.png)


# ( 2 ) 使用 映射檔 
:::warning
* 說明
    * 較舊的 Hibernate 版本使用此種方式
* 使用格式
    * xml 格式，命名通常為 實體類別名.hbm.xml
* 映射內容
    * 根標籤為 \<hibernate-mapping\>
* 存放位置
    * 與實體類別同套件，或其他 Source Folder
* 註冊映射檔
    * 須在核心組態檔，以 \<mapping resource="\.\."\> 註冊
    * 可使用 JBoss Tools 建立 Hibernate XML Mapping file ( hbm.xml )
    * 較新的 Hibernate 版本已改 Annotation 設定
:::

## ( 2-1 ) 映射檔 標籤 與 標籤屬性
:::warning
* 設定實體類別
```xml=
<class name="實體類別全名" table="(DB端)資料表名">    
```
* 設定識別 屬性/欄位
```XML=+
    <id name="屬姓名" type="(Java端)資料型態">
        <column name="欄位名" />
        <generator class="值產生方式" />
    </id>
```
* 設定一般 屬性/欄位
```xml=+
    <property name="屬姓名" type=""(Java端)資料型態>
        <column name="欄位名" />
    </property>
</class>
```
:::

## ( 2-2 ) 映射檔範例 Emp.hbm.xml
```xml=
<?xml version="1.0"?>
<!DOCTYPE hibernate-mapping PUBLIC "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
"http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd">

<hibernate-mapping>
    <class name="emp.entity.Emp" table="EMP">
        <id name="empno" type="java.lang.Integer">
            <column name="EMPNO" />
            <generator class="assigned" />
        </id>
        <property name="ename" type="java.lang.String">
            <column name="ENAME" />
        </property>
        <property name="job" type="java.lang.String">
            <column name="JOB" />
        </property>
        <!-- 略 -->
    </class>
</hibernate-mapping>
```

## ( 2-3 ) 註冊映射檔 hibernate.cfg.xml
```xml=
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate
Configuration DTD 3.0//EN"
"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
    <session-factory>
        <!-- 略 -->
        <mapping resource="emp/entity/Emp.hbm.xml" />
    </session-factory>
</hibernate-configuration>
```

# ( 3 ) 使用 Annotation
:::warning
* 說明
    * 較新的 Hibernate 版本使用此種方式
* 使用格式
    * 直接在實體類別用 Annotation 設定
* 映射內容
    * 根據 Annotation 為 @Entity
* 註冊映射
    * 須在核心組態檔，以 \<mapping class="\.\." /> 註冊
    * Hibernate 有定義映射用的 Annotation，但皆已廢棄
    * 改用 JPA 定義的 Annotation ( javax.persistence )
:::

## ( 3-1 ) Annotation 與 Annotation 屬性
:::warning
* @Entity
    * 設定為實體類別
* @Table(name = "資料表名", catalog = "資料庫名")
    * 設定映射資料表
* @Id
    * 設定識別屬性。可在 屬性 或 Setter/Getter 前設定    
    * Hibernate 底層會參考識別屬性，所以一定要設定此 Annotation
* @GeneratedValue(strategy = GenerationType.產生方式)
    * 設定識別值產生方式
* @Column(name = "欄位名")
    * 設定映射屬性
    * 可在 屬性 或 Setter/Getter 前設定
    * 當 Java 端的屬性名 ( Property ) 與資料庫端的欄位名 ( Column ) 相同時
        * 可省略name="欄位名"
* @Transient
    * 設定不映射的屬性
    * 因為自動映射機制，會自動試著映射所有屬性
    * 若有不想映射的屬性，須加上此 Annotation
:::

## ( 3-2 ) 實體類別範例 Emp.java
```java=
@Entity
@Table
public class Emp {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column
private Integer empno;
@Column
private String ename;
@Column
private String job;
@Column
private Integer mgr;
@Column
private Timestamp hiredate;
@Column
private Double sal;
@Column
private Double comm;
@Column
private Integer deptno;
```

## ( 3-3 ) 註冊實體類別 hibernate.cfg.xml
```xml=
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate
Configuration DTD 3.0//EN"
"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
    <session-factory>
        <!-- 略 -->
        <mapping class="emp.entity.Emp" />
    </session-factory>
</hibernate-configuration>
```

## ( 3-4 ) 自動映射機制
:::warning
* 使用　Annotation　設定映射，會啟用 自動映射機制
* 若 程式端名稱 與 資料庫端名稱 相同 ( 不區分大小寫 ) 時，會自動映射
* 可不用撰寫 @Table、@Column
:::