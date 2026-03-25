# Java 設計模式：工廠模式與策略模式

設計模式是解決常見軟體設計問題的可重用方案。本篇筆記介紹工廠模式與策略模式，並展示重構前後的差異。

---

## 1. 工廠模式（Factory Pattern）

**核心概念**：集中管理物件的建立邏輯，根據傳入條件回傳對應實例，降低呼叫端的耦合度。

**應用場景**：依不同類型建立動物物件、依儲存位置選擇本地 / S3 儲存策略。

### 重構前（直接 if/else 判斷）

```java
Animal animal;
if ("Dog".equals(type)) {
    animal = new Dog();
} else if ("Cat".equals(type)) {
    animal = new Cat();
}
```

### 重構後（透過工廠建立）

```java
// 工廠類別
public class AnimalFactory {
    public static Animal getAnimal(String type) {
        if ("Dog".equals(type)) return new Dog();
        if ("Cat".equals(type)) return new Cat();
        throw new IllegalArgumentException("Unknown type: " + type);
    }
}

// 呼叫端
Animal animal = AnimalFactory.getAnimal("Dog");
```

> 呼叫端不需知道如何建立物件，只需傳入條件即可。

---

## 2. 策略模式（Strategy Pattern）

**核心概念**：將行為封裝成可互換的策略物件，讓行為可在執行期（runtime）動態切換，而不需修改原始類別。

**應用場景**：動物的行走方式可動態變更（普通走路 / 快速走路）。

### 重構前（行為寫死在 if/else）

```java
public class Dog {
    private String walkType;

    public void walk() {
        if ("fast".equals(walkType)) {
            System.out.println("Dog is walking fast!");
        } else {
            System.out.println("Dog is walking normally.");
        }
    }
}
```

### 重構後（策略介面 + 注入）

```java
// 策略介面
public interface WalkStrategy {
    void walk();
}

// 具體策略
public class NormalWalk implements WalkStrategy {
    public void walk() { System.out.println("Walking normally."); }
}

public class FastWalk implements WalkStrategy {
    public void walk() { System.out.println("Walking fast!"); }
}

// 使用策略的類別
public class Dog {
    private WalkStrategy walkStrategy;

    public void setWalkStrategy(WalkStrategy strategy) {
        this.walkStrategy = strategy;
    }

    public void walk() {
        walkStrategy.walk();
    }
}

// 執行期動態切換
Dog dog = new Dog();
dog.setWalkStrategy(new NormalWalk());
dog.walk();  // Walking normally.

dog.setWalkStrategy(new FastWalk());
dog.walk();  // Walking fast!
```

---

## 3. 工廠模式 + 策略模式組合

**核心概念**：工廠負責物件建立，策略負責行為切換，兩者組合可應對複雜的業務場景。

**應用場景**：支付系統支援信用卡（CreditCard）與 LinePay 兩種付款方式。

### 重構前（所有邏輯堆在 if/else）

```java
public void processPayment(String type, double amount) {
    if ("credit".equals(type)) {
        // 信用卡付款邏輯...
    } else if ("linepay".equals(type)) {
        // LinePay 付款邏輯...
    }
}
```

### 重構後（工廠 + 策略）

```java
// 策略介面
public interface PaymentStrategy {
    void pay(double amount);
}

// 具體策略
public class CreditCardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " via Credit Card.");
    }
}

public class LinePayPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " via LinePay.");
    }
}

// 工廠
public class PaymentFactory {
    public static PaymentStrategy createPayment(String type) {
        if ("credit".equals(type)) return new CreditCardPayment();
        if ("linepay".equals(type)) return new LinePayPayment();
        throw new IllegalArgumentException("Unknown payment type: " + type);
    }
}

// 支付系統
public class PaymentSystem {
    public void processPayment(String type, double amount) {
        PaymentStrategy strategy = PaymentFactory.createPayment(type);
        strategy.pay(amount);
    }
}
```

---

## 4. 總結

| 模式 | 解決問題 | 核心手段 |
|------|----------|----------|
| **工廠模式** | 物件建立邏輯分散、耦合高 | 集中建立，呼叫端只傳條件 |
| **策略模式** | 行為切換靠 if/else，難以擴充 | 將行為封裝成可注入的物件 |
| **組合使用** | 建立與行為兩層複雜度 | 工廠建物件，策略切行為 |

---
