# Java Reflection API 核心觀念與實作

## 1. 核心觀念
Java Reflection (反射) 是一種強大的 API，允許程式在執行時期 (Runtime) 檢查或修改類別、介面、欄位與方法的行為。透過反射，程式可以動態地載入類別、調用方法或存取私有成員。

### 主要功能：
*   **類別檢視：** 在執行時獲取類別的名稱、修飾符、套件資訊、父類別與實作的介面。
*   **動態載入：** 透過 `Class.forName()` 在執行時動態載入類別。
*   **成員存取：** 獲取並操作類別的欄位 (Fields)、方法 (Methods) 與建構子 (Constructors)。
*   **打破封裝：** 透過 `setAccessible(true)` 存取或修改私有 (private) 成員。

---

## 2. 實作案例：Reflections 函式庫應用
在該專案中，使用了 `Reflections` 輔助函式庫來簡化反射操作，常見的應用場景包括：

### 介面實作自動掃描 (Interface Discovery)
*   **方法：** 使用 `getSubTypesOf(Interface.class)`。
*   **用途：** 程式可以在執行時自動找出所有實作了特定介面的類別，實現高度的解耦。

### 外掛程式架構 (Plugin Architecture)
*   **動態管理：** 方便進行套件的動態載入與管理。
*   **擴充性：** 開發者只需將新類別加入特定的 classpath，系統即可透過反射自動辨識並整合新功能。

---

## 3. 專案結構 (Gradle)
*   **建置工具：** 使用 Gradle 管理依賴。
*   **原始碼：** 主要實作邏輯位於 `src/main/java/com/cache/api/service`。

---

## 參考連結
*   [Reflections GitHub Repository](https://github.com/MinHao1103/Reflections)
