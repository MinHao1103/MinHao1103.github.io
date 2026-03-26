# Hibernate 延遲載入 (Lazy Loading) 與效能優化

在開發企業級應用時，資料庫的查詢效能往往是系統的瓶頸。ORM 框架（如 Hibernate / Spring Data JPA）為了避免在查詢主實體時將所有關聯實體一次性全部撈出導致記憶體與網路 I/O 浪費，預設引入了 **延遲載入** (Lazy Loading) 機制。

---

## 1. 核心概念與底層機制

Lazy Loading 是一種設計模式（延遲初始化）。當我們從資料庫查詢一筆實體資料時，Hibernate 不會立刻查詢它的關聯物件或延遲屬性，而是回傳一個 **Proxy** (代理物件)。

- **觸發時機**：只有當程式真正在呼叫關聯物件的 Getter（且該屬性非 OID 識別碼）時，Hibernate 才會觸發一條新的 SQL 語句去資料庫抓取資料。
- **限制**：呼叫 Getter 時，**必須確保 Hibernate Session 仍然處於開啟狀態**。

---

## 2. 常見地雷：LazyInitializationException

在前後端分離的架構或是傳統 MVC 網頁中，我們經常遇到 `LazyInitializationException`。
原因通常是：在 Controller 或 View 層（此時 Service 層的 `@Transactional` 已經結束，Session 已關閉）試圖存取未被初始化的 Lazy 屬性。

### 過去的解法（不推薦）
- **OpenSessionInViewFilter / Interceptor**：在請求進來時就開啟 Session，直到 View 渲染完畢才關閉。
  - **缺點**：讓 Database Connection 佔用時間過長，極度影響系統吞吐量與併發效能，且容易在 View 層觸發不可預期的 N+1 查詢。現今微服務架構中被視為 Anti-Pattern（反模式）。

---

## 3. 現代架構的解決方案與效能優化

要在不犧牲效能的情況下解決 Lazy Loading 問題，建議採用以下實戰策略：

### 方法一：在 DAO / Repository 層強制初始化 (Fetch Join)
在我們確定會使用到關聯資料的場景中，直接在 SQL/HQL 中使用 `JOIN FETCH`，一次性將需要的關聯資料抓出來。
```java
// Spring Data JPA 範例
@Query("SELECT o FROM Order o JOIN FETCH o.items WHERE o.id = :id")
Order findOrderWithItemsById(@Param("id") Long id);
```

### 方法二：使用 @EntityGraph (Spring Data JPA)
若不想手寫 HQL，可利用 `@EntityGraph` 指定在該次查詢中需要 Eager 載入的屬性。
```java
@EntityGraph(attributePaths = {"items"})
Optional<Order> findById(Long id);
```

### 方法三：DTO Projection (最佳實踐)
不要將 Entity 直接傳到表現層，而是在查詢時就將需要的欄位直接映射成 **DTO** (Data Transfer Object)。這能從根本上避免 Lazy Loading 異常，且只撈出真正需要的欄位，效能最佳。
```java
@Query("SELECT new com.example.dto.OrderSummaryDTO(o.id, o.status, i.productName) " +
       "FROM Order o JOIN o.items i WHERE o.id = :id")
List<OrderSummaryDTO> findOrderSummary(@Param("id") Long id);
```

### 方法四：手動初始化
如果邏輯非常複雜，也可以在 Service 層的 `@Transactional` 區塊內，手動調用 Hibernate 提供的工具類進行初始化：
```java
@Transactional(readOnly = true)
public Order getOrderDetails(Long id) {
    Order order = orderRepository.findById(id).orElseThrow();
    Hibernate.initialize(order.getItems()); // 強制初始化 Proxy
    return order;
}
```

---

## 4. 總結
1. **單一實體查詢**預設使用 Lazy Loading 沒問題，但關聯查詢要特別注意。
2. 絕對避免開啟 `spring.jpa.open-in-view=true`。
3. 高併發系統中，優先考慮 **DTO 投影** (Projection) 與 **Fetch Join** 來精準控制 SQL 查詢次數，徹底解決 N+1 查詢問題與 LazyInitializationException。

---
