# Java Guava Cache 與 EventBus

Google Guava 函式庫提供了兩個常用的輕量工具：**Cache**（本地快取）與 **EventBus**（發佈訂閱）。兩者都能有效降低元件間的耦合，適用於不同的場景。

---

## 1. Guava Cache — 本地快取

### 核心觀念

Guava Cache 是一個**非分散式的本地快取（Local Cache）**實作。在微服務架構中，每個服務實例維護自己獨立的快取，資料不跨節點共享。

> 若需要跨節點共享快取，應使用 Redis 等分散式快取方案。

### 快取策略（CacheBuilder）

| 策略 | 說明 |
|------|------|
| `expireAfterWrite` | 自建立或最後一次更新後，經過指定時間過期 |
| `expireAfterAccess` | 自最後一次存取後，經過指定時間過期 |
| `maximumSize` | 限制快取中的條目數量，超過時自動淘汰最舊的項目 |
| 弱／軟引用回收 | 支援 `weakKeys()`、`weakValues()`、`softValues()`，讓 GC 在記憶體不足時自動回收 |

### 基本操作

```java
LoadingCache<String, String> cache = CacheBuilder.newBuilder()
    .maximumSize(1000)
    .expireAfterWrite(10, TimeUnit.MINUTES)
    .build(key -> loadFromDatabase(key)); // 快取不存在時的載入邏輯

cache.put("key", "value");           // 新增或更新
cache.getIfPresent("key");           // 取得，不存在或已過期則返回 null
cache.get("key");                    // 取得，不存在則透過 CacheLoader 自動載入
```

### 應用場景：Token 驗證

將 Token 作為 Key 存入快取，快速驗證有效性，無需每次查詢資料庫：

```java
Cache<String, Boolean> tokenCache = CacheBuilder.newBuilder()
    .expireAfterWrite(30, TimeUnit.MINUTES)
    .build();

tokenCache.put(token, true);
boolean valid = tokenCache.getIfPresent(token) != null;
```

利用過期策略，Token 失效時會自動從快取中移除。

### 參考連結

- [GuavaCache GitHub Repository](https://github.com/MinHao1103/GuavaCache)

---

## 2. Guava EventBus — 發佈訂閱

### 核心觀念

Guava EventBus 實作了**發佈／訂閱（Pub/Sub）**模式，讓元件之間可以溝通，而不需要顯式地互相依賴，從而達到**解耦（Decoupling）**的效果。

| 特性 | 說明 |
|------|------|
| **解耦** | 發佈者不需知道誰在訂閱，訂閱者不需知道誰在發佈 |
| **簡單易用** | 透過 `@Subscribe` 註解即可定義事件處理方法 |
| **同步／非同步** | `EventBus` 預設同步；`AsyncEventBus` 支援非同步事件處理 |

### 核心組件

- **EventBus**：作為分發事件的中央樞紐
- **事件物件（Event Object）**：例如 `UserRegisteredEvent`，包含事件所需的資料
- **訂閱者（Subscriber / Listener）**：標記 `@Subscribe` 的方法，自動接收對應類型的事件

### 應用場景：使用者註冊後觸發通知

這是一個典型的「副作用（Side Effect）」架構——主流程只負責核心邏輯，後續動作交由 EventBus 觸發：

**運作流程：**

1. 系統將帳號密碼存入資料庫
2. 註冊成功後，發佈一個 `UserRegisteredEvent`
3. `SMSListener` 和 `EmailListener` 透過 `@Subscribe` 自動接收並執行對應通知

```java
// 發佈事件
eventBus.post(new UserRegisteredEvent(userId, email, phone));

// 訂閱者（@Subscribe 自動接收）
public class SMSListener {
    @Subscribe
    public void onUserRegistered(UserRegisteredEvent event) {
        // 發送簡訊通知
    }
}
```

**易於擴展：** 未來若需要新增「發送歡迎禮包」功能，只需新增一個 Listener 並向 EventBus 註冊，完全不需要修改原有的註冊邏輯。

### 參考連結

- [GuavaEventBus GitHub Repository](https://github.com/MinHao1103/GuavaEventBus)

---

## 3. Cache vs EventBus 使用時機

| | Guava Cache | Guava EventBus |
|--|-------------|----------------|
| **解決的問題** | 減少重複查詢、提升讀取效能 | 元件間解耦、觸發副作用 |
| **適合場景** | Token 驗證、頻繁讀取的靜態資料 | 用戶行為觸發通知、跨模組事件傳遞 |
| **資料流向** | 讀取快取 → 未命中才查來源 | 發佈者 → Broker → 所有訂閱者 |

---
