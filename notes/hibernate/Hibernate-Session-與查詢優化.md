# Hibernate Session 狀態管理與查詢優化

在 Hibernate 的實戰開發中，如何精準掌握 Session 的開關時機與資料的快取狀態（Persistence Context），是決定系統效能與交易一致性的關鍵。這篇筆記主要記錄 Hibernate 查詢方法的差異、Session Cache 的管理，以及 MVC 架構中的交易控制實踐。

---

## 1. 核心查詢方法：get() vs load()

在僅依賴主鍵 (OID) 查詢單筆資料時，最常用到的是 `get()` 與 `load()`。目前實務上必須清楚區分兩者的底層行為差異，否則容易踩到 `LazyInitializationException` 或是多餘的 SQL 查詢。

### Session.get()
- **行為**：立即發送 SELECT 語句至資料庫查詢。
- **回傳值**：若資料存在，回傳實體物件 (**Persistent** 狀態)；若不存在，回傳 `null`。
- **使用場景**：當你不確定資料庫中是否有這筆資料，且需要立即使用時。

### Session.load()
- **行為**：**延遲載入** (Lazy Loading)。不會立刻發送 SQL，而是回傳一個具有該 OID 的「代理物件 (Proxy)」。
- **回傳值**：回傳 Proxy。若後續操作該物件且資料庫中無此資料，會拋出 `ObjectNotFoundException`。
- **使用場規**：當你「非常確定」資料存在，且只是需要這個物件來當作 Foreign Key 關聯（例如建立 Order 時塞入一個已知的 User），此時用 `load()` 可以省下一次 SELECT 查詢。

---

## 2. Session Cache (L1 Cache) 手動管理

Hibernate 的 Session 扮演著「**一級快取** (L1 Cache)」的角色。被查出的物件會被納入 Persistence Context 中，若同一個 Session 內再次查詢相同的 OID，Hibernate 會直接從記憶體返回物件，而不會敲資料庫。

但在批次處理或特殊業務情境下，我們需要手動介入管理：

- **`session.evict(Object)`**：將單一物件從 Session Cache 中剔除（變為**Detached** 狀態）。
- **`session.clear()`**：清空目前 Session 中的所有快取物件。通常在迴圈處理大量資料 (Batch Insert/Update) 時使用，避免發生 OutOfMemoryError (OOM)。
- **`session.flush()`**：強制將目前 Cache 中的變更轉換為 SQL 語句發送到資料庫（但尚未 Commit）。原因是我們可能需要在 Commit 前讓某些觸發器 (Trigger) 生效，或取得資料庫生成的 Auto-Increment ID。

---

## 3. MVC 架構下的 Session 與交易管理 (Transaction)

這是一個常見的架構設計考題：**「Transaction 應該要放在 DAO 層還是 Service 層？」**

### 現況與問題分析
在初學階段，我們常常在 DAO 層裡面寫 `sessionFactory.openSession()` 並直接 `commit`。
這會導致嚴重的問題：**一個業務邏輯通常包含多個 DAO 操作。如果每個 DAO 各自 openSession 並 commit，只要中間某個步驟報錯，前面的操作已經寫入資料庫了，完全無法 Rollback。**

### 實戰解法：將交易提升至 Service 層
我們必須確保整個 Service 邏輯都在「同一個 Session」與「同一個 Transaction」中執行。

1. **DAO 層只負責拿連線與操作**：
   使用 **`sessionFactory.getCurrentSession()`** 獲獲取綁定在當前執行緒的 Session，絕對不不在這裡執行 commit 或 rollback。
   ```java
   public Member findById(Integer id) {
       return getSessionFactory().getCurrentSession().get(Member.class, id);
   }
   ```

2. **Service 層負責交易邊界**：
   在這裡控制 **Transaction**，確保多個 DAO 動作的原子性 (**Atomicity**)。
   ```java
   public void processCheckout(Integer memberId, Order order) {
       Session session = getSessionFactory().getCurrentSession();
       Transaction tx = session.beginTransaction();
       try {
           memberDao.deductBalance(memberId, order.getAmount());
           orderDao.createOrder(order);
           tx.commit();
       } catch (Exception e) {
           tx.rollback();
           throw e;
       }
   }
   ```

> 💡 Tip: 目前在 Spring Boot 生態系中，我們幾乎不再手動寫 `beginTransaction()` 與 `commit()`。只要在 Service 層的方法上掛上 **`@Transactional`** 註解，Spring 的 AOP 就會自動幫我們接管上述的 `getCurrentSession` 與交易控制邏輯。

---
