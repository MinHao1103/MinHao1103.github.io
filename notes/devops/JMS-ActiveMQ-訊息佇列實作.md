# JMS 與 ActiveMQ 訊息佇列實作

JMS（Java Message Service）是 Java 平台的標準訊息傳遞 API，讓應用程式可以透過訊息佇列進行非同步通訊。本筆記以 ActiveMQ 作為 JMS Provider 進行實作。

> 參考專案：[Java_Message_Service](https://github.com/MinHao1103/Java_Message_Service)

---

## 1. 版本資訊

| 技術 | 版本 |
|------|------|
| Java | 8 |
| Spring Boot | 2.7.10 |
| ActiveMQ | 5.16.0 |

> 注意：ActiveMQ 5.18.3 需要 Java 11 才能啟動，但 Java 8 的程式仍可正常連線並發送訊息。

---

## 2. 依賴設定

**非 Spring Boot 框架：**

```xml
<dependency>
    <groupId>org.apache.activemq</groupId>
    <artifactId>activemq-all</artifactId>
    <version>5.16.0</version>
</dependency>
```

**Spring Boot 框架：**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-activemq</artifactId>
</dependency>
```

---

## 3. JMS API 介紹

### ConnectionFactory（連接工廠）

- **功能**：建立 `Connection` 物件的工廠
- **類型**：
  - `QueueConnectionFactory`（佇列連接工廠）
  - `TopicConnectionFactory`（主題連接工廠）

### Destination（目的地）

- **含義**：生產者的訊息發送目標，或消費者的訊息來源
- **類型**：
  - `Queue`（隊列）— 點對點模型
  - `Topic`（主題）— 發佈 / 訂閱模型

### Connection（連接）

- **描述**：客戶端與 JMS 系統建立的連接，是 TCP/IP socket 的封裝
- 一個 `Connection` 可建立一個或多個 `Session`

### Session（會話）

- **作用**：用於操作訊息的介面
- 透過 `Session` 可建立生產者、消費者、訊息等
- 提供**事務功能**，允許將發送 / 接收動作放入同一事務中

### Producer（生產者）

- **描述**：由 `Session` 建立，用於將訊息發送至 `Destination`
- **類型**：
  - `QueueSender`（佇列生產者）
  - `TopicPublisher`（主題生產者）
- **方法**：`send()`、`publish()`

### Consumer（消費者）

- **描述**：由 `Session` 建立，用於接收 `Destination` 的訊息
- **類型**：
  - `QueueReceiver`（隊列接收者）
  - `TopicSubscriber`（主題訂閱者）
- **建立方式**：`session.createReceiver(queue)` / `session.createSubscriber(topic)`

### MessageListener（訊息監聽器）

- **作用**：訊息抵達時，自動呼叫 `onMessage()` 方法
- **用途**：常用於非同步消費，EJB 中的 MDB（Message-Driven Bean）即為一種 `MessageListener`

---

## 4. 訊息模型

| 模型 | 特性 |
|------|------|
| **點對點（Queue）** | 一則訊息只能被一個消費者接收 |
| **發佈訂閱（Topic）** | 一則訊息可廣播給所有訂閱者 |

---

## 5. Spring Boot 設定重點

- 使用 `ActiveMQConfig.java` 設定 Bean，同時配置點對點與發佈訂閱模型
- Spring Boot 測試使用 `@SpringBootTest` 進行 JMS 傳送 / 接收測試

---
