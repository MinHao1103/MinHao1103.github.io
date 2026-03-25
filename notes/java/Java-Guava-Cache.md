# Java Guava Cache 核心觀念與實作

## 1. 核心觀念
Guava Cache 是 Google Guava 函式庫中提供的一個全功能的**本地快取 (Local Cache)** 實作。它提供了一種結構化的方式來存儲和管理臨時數據，以提高系統效能。

### 主要特性：
*   **本地範圍 (Local Scope)：** Guava Cache 是非分散式的。在微服務架構中，每個服務實例維護自己獨立的快取，資料不跨節點共享。
*   **自動回收 (Automatic Eviction)：** 支援多種回收策略，防止記憶體耗盡。
*   **線程安全 (Thread-Safe)：** 設計用於高並發環境。

### 快取策略 (CacheBuilder)：
*   **時間過期 (Time-based Expiration)：**
    *   `expireAfterWrite`：自建立或最後一次更新後經過指定時間過期。
    *   `expireAfterAccess`：自最後一次訪問後經過指定時間過期。
*   **容量限制 (Size-based Eviction)：**
    *   `maximumSize`：限制快取中的條目數量。
*   **引用回收 (Reference-based Eviction)：** 支援弱引用 (Weak References) 或軟引用 (Soft References)。

---

## 2. 實作細節
Guava Cache 常用於減少重複計算或頻繁的資料庫查詢。

### 基本操作：
*   `put(key, value)`：新增或更新快取條目。
*   `getIfPresent(key)`：獲取條目，若不存在或已過期則返回 `null`。
*   `get(key, Callable)`：獲取條目，若不存在則透過 Callable 加載並存入快取。

### 應用場景：Token 驗證 (Token Validation)
在該專案中，Guava Cache 被用來追蹤 **Token 的有效性**：
*   將 Token 作為 Key 存入快取。
*   透過快取快速驗證 Token，無需每次都查詢資料庫或外部授權服務。
*   利用過期策略，在 Token 失效時自動從快取中移除。

---

## 3. 專案結構 (Gradle)
此專案通常包含以下結構：
*   `build.gradle`：定義依賴（如 `com.google.guava:guava`）。
*   `src/main/`：包含實作 `CacheBuilder` 和 Token 邏輯的程式碼。

---

## 參考連結
*   [GuavaCache GitHub Repository](https://github.com/MinHao1103/GuavaCache)
