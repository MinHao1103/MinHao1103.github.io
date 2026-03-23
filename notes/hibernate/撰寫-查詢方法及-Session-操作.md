( 十 ) 使用 Hibernate 撰寫 查詢 方法 及 Session 進階操作
===

# ( 1 ) 查詢方法
:::warning
* 說明
    * 查詢方法底層使用的是 SQL 的 select 敘述
    * get()、load() 會取得永續狀態 ( Persistent ) 的實體物件
    * 只適用藉由 OID 查詢單筆資料
    * 若想查詢多筆資料，可使用 createQuery()
    * 其他查詢方式
        * HQL、Criteria 與 Native SQL
:::

## ( 1-1 ) 相關方法
:::warning
* \<T\> T load(Class\<T\> theClass, Serializable id)
    * 說明
        * 從實體類別對應的資料表中查詢
        * 因為會使用延遲載入 ( Lazy loading ) 機制
        * 所以只適用在確定對應的資料存在的情況下
    * 參數
        * theClass：實體類別
        * id：欲查詢的識別值
    * 回傳
        * 查詢到的實體物件，永續狀態(Persistent)
:::

## ( 1-2 ) get() vs. load()
![](https://i.imgur.com/nULSzsi.png)

### ( 1-2-1 ) get()
```java=
public static MemberPojo selectByIdUseGet(Integer id) {
	Session session = getSessionFactory().openSession();
	try {
		Transaction transaction = session.beginTransaction();
		MemberPojo member = session.get(MemberPojo.class, id);
		transaction.commit();
		return member;
	} catch (Exception e) {
		session.getTransaction().rollback();
		e.printStackTrace();
		return null;
	}
}
```

### ( 1-2-2 ) load()
```java=
public static MemberPojo selectByIdUseLoad(Integer id) {
	Session session = getSessionFactory().openSession();
	try {
		Transaction transaction = session.beginTransaction();
		MemberPojo member = session.load(MemberPojo.class, id);
		Hibernate.initialize(member); // 此行與延遲載入有關
		transaction.commit();
		return member;
	} catch (Exception e) {
		session.getTransaction().rollback();
		e.printStackTrace();
		return null;
	}
}
```


# ( 2 ) Session 其他方法
:::warning
* 說明
    * Session 物件 是 Hibernate 程式中的核心物件
        * 又稱 Persistence Context
    * Session 物件其中一項工作為
        * 控制實體物件，這些物件都儲存在 Session Cache 中
    * Session 物件基本上會自動控制 Session Cache
        * 特殊情況下需手動控制 Session Cache，例如
            * 移除 Session Cache 中的實體物件
    * 另外，若透過 sessionFactory.openSession() 來取得 Session 物件
        * 在執行新刪修動作時，有時必須手動刷新 Session Cache
:::

## ( 2-1 ) 相關方法
:::warning
* void evict ( Object object )
    * 說明
        * 從 Session Cache 中移除實體物件
    * 參數
        * Object：欲移除的實體物件
* void clear()
    * 說明
        * 移除所有 Session Cache 中的實體物件
* void flush()
    * 說明
        * 強制刷新 Session Cache
        * 此方法須在 transaction.commit() 和 session.close() 之前呼叫
:::

### ( 2-1-1 ) 使用 flush()
```java=
public boolean deleteByIdFlush(Integer id) {
	Member member = new Member();
	member.setId(id);
	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
	Session session = sessionFactory.openSession();
	try {
		Transaction transaction = session.beginTransaction();
		session.delete(member);
		session.flush();
		transaction.commit();
		session.close();
		return true;
	} catch (HibernateException e) {
		session.getTransaction().rollback();
		e.printStackTrace();
	}
	return false;
}
```

# ( 3 ) MVC 架構中的 Session 物件
:::warning
* Hibernate 是用來存取資料庫
    * 相關程式都應撰寫在 DAO 層 ( Data Access Object Layer )
* 但在 MVC 設計架構中
    * 通常希望在 Service 層中負責商業邏輯，做資料庫的交易控制 ( Transaction Control )
* 根據以上兩點會遇到什麼問題 ?
    * 因為在 MVC 架構中的 Service 層會呼叫 DAO 層
    * 並且做資料庫的交易控制
    * 而在 Hibernate 中，若要取得 Transaction 物件，要透過 Session 取得
        * 在這說明一下，在這之前練習的 DAO 範例，都是用
        * Session session = getSessionFactory().openSession();
        * 再用此 session 做交易控制，例如：
        * Transaction transaction = session.beginTransaction();
        * transaction.commit();
        * 這樣就會導致交易控制在 DAO 層就結束了
        * 但 MVC 設計架構下，是要在 Service 層來處理交易控制
    * 如果 Transaction 物件都在 DAO 方法中取得
    * 就無法讓多個 DAO 方法在同一個交易中
    * Service 層就無法做交易控制
:::

## ( 3-1 ) 解決方法
:::warning
* DAO 方法中
    * 透過 sessionFactory.getCurrentSession() 來取得 Session 物件
    * 不呼叫 Transaction 的 beginTransaction() / commit() / rollback() 方法
* Service 方法中
    * 控制 Transaction 物件，呼叫 brginTransaction() / commit() / rollback() 方法
* 原本在 DAO 層做交易控制，轉移到 Service 層
* 在 Spring 環境中，可使用 TransactionManager 物件
    * 加上 @Transactional 來解決此問題
:::

* DAO 層
```java=
package com.members.dao.impl;

import static core.util.HibernateUtil.*;

import java.util.List;
import org.hibernate.Session;
import com.members.dao.MemberDao;
import com.members.pojo.MemberPojo;

public class MemberDaoImpl implements MemberDao {

	private Session getSession() {
		return getSessionFactory().getCurrentSession();
	}

	@Override
	public Integer insert(MemberPojo member) {
		getSession().persist(member);
		return 1;
	}

	@Override
	public Integer deleteById(Integer id) {
		Session session = getSession();
		MemberPojo member = session.load(MemberPojo.class, id);
		session.delete(member);
		return 1;
	}

	@Override
	public Integer update(MemberPojo newMember) {
		MemberPojo member = getSession().load(MemberPojo.class, newMember.getMemberId());
		member.setPassword(newMember.getAccount());
		return 1;
	}

	@Override
	public MemberPojo selectById(Integer id) {
		return getSession().get(MemberPojo.class, id);
	}

	@Override
	public List<MemberPojo> selectAll() {
		return getSession().createQuery("from Member", MemberPojo.class).list();
	}
	
}
```
* Service 層
```java=
package com.members.service.impl;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.members.dao.MemberDao;
import com.members.dao.impl.MemberDaoImpl;
import com.members.service.MemberService;

import core.util.HibernateUtil;

public class MemberServiceImpl implements MemberService {

	private MemberDao dao;

	public MemberServiceImpl() {
		dao = new MemberDaoImpl();
	}

	public void someMethod() {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		try {
			Transaction transaction = session.beginTransaction();

			// dao.insert(member); // 新增
			// dao.deleteById(1); // 刪除
			// dao.update(member); // 修改
			// Member member = dao.selectById(1); // 查單筆
			// List<Member> list = dao.selectAll(); // 查多筆

			transaction.commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		}
	}
}
```