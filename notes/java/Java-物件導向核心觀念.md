# Java 核心機制與進階觀念 (OOP)

在 Java 後端開發中，掌握物件導向 (OOP) 的核心機制與底層運作，是寫出高內聚、低耦合程式碼的基礎。這篇筆記主要記錄 Java 的存取修飾子、封裝、繼承、多型以及 Static 關鍵字的實戰應用與踩坑點。

---

## 1. 封裝 (Encapsulation) 與存取修飾字

封裝的本質是**隱藏物件的內部實作細節，僅對外開放安全的存取介面** (Getter/Setter)。

### 存取權限等級
由嚴格到寬鬆依序為：
1. **`private`**：僅限類別內部存取。（實體變數的最佳實踐）
2. **`default`** (預設/不寫)：同一個 Package 下可存取。
3. **`protected`**：同 Package，或是不同 Package 但為「子類別」時可存取。
4. **`public`**：對所有類別開放。

> 💡 Tip: 類別 (Class) 只能使用 `public` 或 `default` 兩種修飾子。區域變數 (方法內的變數) 則不能使用任何存取修飾子，因為它的生命週期只存在於該方法內。

---

## 2. Static 關鍵字 (靜態成員)

`static` 是一個容易踩坑的關鍵字。被宣告為 `static` 的變數或方法，**不屬於任何單一物件，而是屬於整個類別共用**。

### 核心特性
- **靜態變數** (Static Variables)：
  - 儲存在 Method Area (方法區)，全域共用一份記憶體。
  - 通常用來定義常數 (搭配 `final`)。例如：`public static final double PI = 3.14;`
- **靜態方法** (Static Methods)：
  - 不需要 `new` 出物件就能直接透過 `ClassName.methodName()` 呼叫（如 `Math.random()`）。
  - > ⚠️ 踩坑點：靜態方法內絕對不能直接存取非靜態 (實體) 的變數或方法，也不能使用 `this` 或 `super` 關鍵字，因為靜態方法執行時，物件可能根本還沒被創建。

---

## 3. 繼承 (Inheritance) 與覆寫 (Overriding)

繼承的目的是為了**代碼重用**與建立**Is-A 關係**。

- Java 僅支援**單一繼承**（一個子類別只能有一個父類別），但可以實作多個介面 (Interface)。
- 子類別可以繼承父類別中非 `private` 的成員。

### Overriding (覆寫) 最佳實踐
當子類別需要改變父類別方法的行為時，會進行覆寫。
1. 方法名稱、參數列表、回傳型別必須**完全相同**（回傳型別可以是子類別）。
2. **存取權限不能比父類別更嚴格**（例如父類是 `protected`，子類只能是 `protected` 或 `public`）。
3. 覆寫時建議加上 `@Override` 註解，讓編譯器幫你檢查是否拼錯字。

---

## 4. 多型 (Polymorphism) 與動態繫結

多型是 OOP 最強大的特性。它的核心概念是：**「父類別的參考變數，可以指向子類別的實體物件」**。

```java
// Animal 是父類，Dog 和 Cat 是子類，並覆寫了 makeSound()
Animal myPet = new Dog();
myPet.makeSound(); // 執行時會印出 "汪汪"，而非 Animal 的叫聲
```

### 為什麼需要多型？
原因是為了讓程式具備極佳的**擴展性與彈性**。
例如，在設計一個 `vetService(Animal pet)` 方法時，我們不需要為了 Dog 或 Cat 分別寫不同的方法，只要傳入不同的子類實體，Java 就會透過**動態繫結** (Dynamic Binding) 在執行期 (Runtime) 決定要呼叫哪個子類別的實作。

### 強制轉型與 instanceof
如果要使用子類別獨有的方法，必須向下轉型 (Downcasting)。為了避免 `ClassCastException`，轉型前一定要先檢查：
```java
if (myPet instanceof Dog) {
    Dog myDog = (Dog) myPet;
    myDog.fetchBall(); // 呼叫 Dog 特有的方法
}
```

---

## 5. 抽象類別 (Abstract Class) vs 介面 (Interface)

在架構設計上，這兩者經常被拿來比較：

| 特性 | 抽象類別 (Abstract Class) | 介面 (Interface) |
| --- | --- | --- |
| **設計目的** | 定義「是什麼」(Is-A)，抽取共通屬性與行為。 | 定義「能做什麼」(Has-A)，制訂行為規範。 |
| **繼承限制** | 只能單一繼承。 | 可以實作 (implements) 多個介面。 |
| **屬性變數** | 可宣告各種變數。 | 只能宣告 `public static final` 的常數。 |
| **建構子** | 有建構子 (供子類別 `super()` 呼叫)。 | 沒有建構子。 |

> 💡 Tip: Java 8 以後的 Interface 變革：
> 目前的 Interface 允許使用 `default` 或 `static` 關鍵字來撰寫具有實作內容的方法。原因是為了解決向後相容的問題（例如讓現有的 `List` 介面可以直接擴充 `forEach` 等功能，而不影響舊程式碼）。

---
