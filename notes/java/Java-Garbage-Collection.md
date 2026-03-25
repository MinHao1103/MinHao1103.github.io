# Java Garbage Collection (GC) 核心觀念

## 1. 什麼是 Garbage Collection (GC)？
Garbage Collection（垃圾回收）是 Java 中的一種**自動化記憶體管理機制**。其主要角色是追蹤記憶體中的物件，並自動釋放那些不再被程式使用的物件所佔用的空間。

### 核心優點：
*   **自動化 (Automation)：** 減少開發者手動管理記憶體的錯誤。
*   **可靠性 (Reliability)：** 有助於防止記憶體洩漏 (Memory Leaks) 和系統崩潰。
*   **效率 (Efficiency)：** 在最佳時機回收記憶體，以便應用程式可以重複使用。
*   **觸發機制：** 通常在記憶體不足時運行，但也可以手動觸發。

---

## 2. Java 中的記憶體洩漏 (Memory Leaks)
當物件不再被應用程式需要，但仍被引用，導致 GC 無法回收其空間時，就會發生記憶體洩漏。這會導致：
*   系統效能下降。
*   應用程式最終崩潰（例如：`OutOfMemoryError`）。
*   **常見原因：** 循環引用 (Circular references) 或使用如 `Map` 作為快取但未進行適當清理。

---

## 3. 分析與除錯工具
以下是調查記憶體問題的常用工具與方法：
*   **VisualVM (jvisualvm)：** 用於監控和分析 Java 應用程式的堆疊 (Heap) 和效能。
*   **Eclipse Memory Analyzer (MAT)：** 專門用於分析 Heap Dumps，以尋找記憶體洩漏並減少記憶體消耗。
*   **Heap Dumps (`.hprof` 檔案)：** 記憶體快照，可分析哪些物件佔用了空間。

---

## 4. 實戰指令與配置
測試和捕捉記憶體資料的具體步驟：

### JVM 測試參數：
*   `-Xmx10m -Xms10m`：將最大和初始堆疊大小設置為 10MB（用於在測試期間快速強制觸發 OutOfMemoryError）。
*   `-XX:+HeapDumpOnOutOfMemoryError`：當程式因記憶體不足而崩潰時，自動產生 Heap Dump。

### CLI 常用指令：
*   `jps -l`：列出正在運行的 Java 程序及其 PID。
*   `jmap -dump:live,format=b,file=heap.hprof <PID>`：手動觸發特定程序的 Heap Dump。

---

## 5. 監控最佳實踐
*   定期捕捉 Heap Dumps（例如：每小時一次）以比較記憶體增長情況。
*   監控實例數量 (Instance counts) 和異常訊息，以識別哪些物件正在累積。

---

## 參考連結
*   [Java_Garbage_Collection GitHub Repository](https://github.com/MinHao1103/Java_Garbage_Collection)
