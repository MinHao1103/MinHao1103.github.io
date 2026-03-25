# Java Guava EventBus 核心觀念與實作

## 1. 核心觀念
Guava EventBus 是 Google Guava 函式庫中提供的一個**發佈/訂閱 (Pub/Sub)** 模式的實作。它允許組件之間進行溝通，而不需要顯式地註冊彼此，從而實現了組件之間的**解耦 (Decoupling)**。

### 主要特性：
*   **解耦 (Decoupling)：** 發佈者 (Publisher) 不需要知道誰在訂閱事件，訂閱者 (Subscriber) 也不需要知道事件是誰發佈的。
*   **簡單易用：** 透過 `@Subscribe` 註解即可定義事件處理方法。
*   **同步與非同步：** 預設 `EventBus` 是同步的；`AsyncEventBus` 則支援非同步事件處理。

---

## 2. 實作細節：使用者註冊案例 (User Registration)
在該專案中，Guava EventBus 被用來處理使用者註冊後的後續動作（如發送簡訊和郵件），這是一個典型的「副作用 (Side Effect)」架構實作。

### 核心組件：
*   **EventBus：** 作為分發事件的中央樞紐。
*   **事件物件 (Event Object)：** 例如 `UserRegisteredEvent`，包含使用者的註冊資訊。
*   **訂閱者 (Listeners)：**
    *   `SMSListener`：負責處理簡訊通知邏輯。
    *   `EmailListener`：負責處理郵件通知邏輯。

### 運作流程：
1.  **註冊處理：** 系統將帳號密碼存入資料庫。
2.  **發佈事件：** 註冊成功後，系統向 `EventBus` 發佈 (post) 一個註冊事件。
3.  **自動觸發：** `SMSListener` 和 `EmailListener` 透過 `@Subscribe` 註解自動接收到該事件並執行對應的通知動作。

### 優點：
*   **易於擴展：** 若未來需要增加「發送歡迎禮包」的功能，只需新增一個 Listener 並註冊到 EventBus，不需要修改原有的註冊邏輯程式碼。

---

## 3. 專案結構 (Gradle)
此專案通常包含以下結構：
*   `build.gradle`：定義對 Google Guava (`com.google.guava:guava`) 的依賴。
*   `src/main/`：包含 EventBus 配置、Listener 實作及註冊邏輯。

---

## 參考連結
*   [GuavaEventBus GitHub Repository](https://github.com/MinHao1103/GuavaEventBus)
