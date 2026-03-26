# Java 核心機制：例外處理、集合框架與並發程式設計

這篇筆記整理了 Java 在實戰中最常遇到的核心底層機制，包含例外處理的最佳實踐、集合框架的效能選擇，以及高併發場景下的多執行緒設計。

---

## 1. 例外處理 (Exception Handling) 的最佳實踐

在微服務架構中，精準的例外處理與統一的錯誤代碼 (Error Code) 是系統穩定性的基礎。

### Checked vs Unchecked Exception
- **Checked Exception** (編譯期例外) ：繼承自 `Exception`（但不包含 `RuntimeException`），如 `IOException`。必須強制 `try-catch` 或 `throws`。
  - *實戰建議*：目前現代 Java 開發（如 Spring 框架）傾向於將 Checked Exception 轉換為 Unchecked Exception 拋出，原因是強制捕獲往往導致程式碼充滿無意義的 `catch` 區塊，降低可讀性。
- **Unchecked Exception** (執行期例外) ：繼承自 `RuntimeException`，如 `NullPointerException`。
  - *實戰建議*：業務邏輯的錯誤（如「查無此用戶」、「餘額不足」）都應該自定義繼承自 `RuntimeException` 的例外類別，並交由 Spring 的 `@RestControllerAdvice` 統一攔截處理。

### try-with-resources 機制
處理 I/O 或資料庫連線時，一律使用 Java 7 引入的 `try-with-resources` 語法，確保資源會自動關閉，避免 Memory Leak。
```java
// 實作 AutoCloseable 介面的資源會自動被 close()
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    return br.readLine();
} catch (IOException e) {
    throw new CustomSystemException("檔案讀取失敗", e);
}
```

---

## 2. 集合框架 (Collections Framework) 的底層與選型

選擇正確的資料結構，是解決效能瓶頸的第一步。

### List 家族
- **ArrayList**：底層為連續記憶體陣列。查詢快 (`O(1)`)，但從中間新增/刪除慢。目前 95% 的場景都優先使用它。
- **LinkedList**：底層為雙向鏈結串列。查詢慢 (`O(n)`)，但在頭尾新增/刪除快。

### Map 與 Set 家族
- **HashMap / HashSet**：底層為**Hash Table**（JDK 8 後加入紅黑樹優化）。查找時間複雜度為 `O(1)`，但不保證順序。
  - > ⚠️ 當作為 Key 的物件沒有正確覆寫 `hashCode()` 與 `equals()` 時，會導致資料無法正確存取與 Memory Leak。
- **TreeMap / TreeSet**：底層為**紅黑樹**。可以保證元素按自然順序（或自訂的 `Comparator`）排序，查找時間複雜度為 `O(log n)`。

---

## 3. 多執行緒與並發設計 (Concurrency)

在高併發系統中，直接 `new Thread()` 是絕對禁止的，因為頻繁建立與銷毀執行緒的系統開銷極大。

### 執行緒池 (Thread Pool) 實戰
所有多執行緒任務都應該交由 `ExecutorService` (執行緒池) 來管理。
```java
// 建立一個固定大小的執行緒池
ExecutorService executor = Executors.newFixedThreadPool(10);

// 提交任務並取得 Future 回傳結果
Future<String> future = executor.submit(() -> {
    // 執行複雜耗時任務
    return "Task Completed";
});

// 記得在應用程式關閉時優雅地關閉執行緒池
executor.shutdown();
```

### 執行緒安全與同步 (Synchronization)
當多個執行緒同時存取共享資源時，會產生 **Race Condition**。
- **`synchronized` 關鍵字**：保證同一時間只有一個執行緒能進入臨界區 (Critical Section)。但這屬於悲觀鎖，效能較差。
- **JUC (java.util.concurrent) 套件**：
  - 盡量使用 `ConcurrentHashMap` 代替 `Hashtable`。
  - 計數器務必使用 `AtomicInteger` (底層基於 CAS 樂觀鎖操作)，效能遠高於加鎖的 `int`。

### 死結 (Deadlock) 防範
死結發生的原因是多個執行緒互相等待對方釋放鎖。
- *實戰解法*：確保所有執行緒獲取鎖的「順序」保持一致，或使用帶有 Timeout 機制的鎖（如 `ReentrantLock.tryLock(timeout)`），來破除死結的僵局。

---
