# Java 核心機制：常用類別與進階實戰

這篇筆記整理了 Java 開發中常見的字串處理、數字運算、正則表達式，以及時間日期的最佳實踐。

---

## 1. 數字與精準運算 (BigDecimal)

在處理商業邏輯（尤其是「金額」與「匯率」）時，絕對不能使用 `double` 或 `float` 進行運算。

### 為什麼不用 double？
原因是 Java 對浮點數處理參考了 IEEE 754 標準，採二進制的分數與指數表示，這會導致小數運算產生精度丟失。
例如：`0.1 + 0.1 + 0.1` 不會等於 `0.3`。

### BigDecimal 最佳實踐
目前開發中，遇到小數運算一律使用 **`BigDecimal`**。
- **踩坑點**：建構 `BigDecimal` 時，**一定要傳入字串 (`String`)**，不要傳入 `double`，否則依然會失去精度。
- **除法例外**：如果除法產生無限循環小數，會拋出 `ArithmeticException`。務必指定小數位數與進位模式。

```java
// 正確建構方式
BigDecimal bd1 = new BigDecimal("0.1");

// 安全的除法與四捨五入 (保留 6 位小數)
BigDecimal rate = new BigDecimal("1").divide(new BigDecimal("3"), 6, RoundingMode.HALF_UP);
```

---

## 2. 字串處理：String vs StringBuilder

在 Java 中，`String` 是一個不可變 (**Immutable**) 的物件。每次對字串進行拼接，都會在記憶體中產生一個新物件，極度消耗資源。

### StringBuilder 的應用場景
當我們需要「頻繁拼接字串」（例如：在迴圈中組裝 SQL 或動態產生 HTML）時，請使用 **`StringBuilder`**。
- **`StringBuffer`**：舊版類別，執行緒安全 (Thread-Safe)，但效能較差。
- **`StringBuilder`**：JDK 5 引入，非執行緒安全，但效能極佳。目前實務上 99% 的場景都使用它。

```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" Java");
// 只有在最後需要輸出時才轉回 String
String result = sb.toString();
```

---

## 3. 正規表示法 (Regular Expression)

正則表達式是檢驗資料格式（如身分證、Email、手機號碼）的利器。

### 常見實戰範例
在 Java 中，可以直接使用 `String.matches(regex)` 來進行快速驗證。
> 💡 Tip: Java 字串中的反斜線 `\` 必須跳脫，所以寫正則時要用 `\\`。

```java
// 驗證台灣身分證字號 (首字大寫英文，第二碼 1 或 2，後面 8 碼數字)
String regex = "^[A-Z][12]\\d{8}$";
boolean isValid = "T123456789".matches(regex);
```

---

## 4. 日期與時間 API (Date & Time)

### 過去的痛點
早期的 `java.util.Date` 與 `java.util.Calendar` 設計不良，且不是執行緒安全的。目前已被淘汰。

### 現代最佳實踐 (Java 8 引入的 `java.time` 套件)
在處理時間時，全面改用 Java 8 的新 API。這些物件都是不可變的 (**Immutable**)，保證執行緒安全。

- **`LocalDate`**：僅處理日期 (年-月-日)，無時區概念。
- **`LocalTime`**：僅處理時間 (時:分:秒)。
- **`LocalDateTime`**：日期 + 時間，最常使用。

```java
// 取得當前時間
LocalDateTime now = LocalDateTime.now();

// 格式化輸出
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formattedDate = now.format(formatter);
```

---
