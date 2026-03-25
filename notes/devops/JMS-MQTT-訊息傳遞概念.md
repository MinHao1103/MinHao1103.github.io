# JMS、MQTT 與 ActiveMQ 訊息傳遞概念

這篇筆記說明 JMS 兩種訊息模型、MQTT 協定，以及 ActiveMQ 在訊息傳遞架構中的角色。

---

## 1. JMS 訊息模型

### 點對點模型（Point-to-Point / Queue）

- 角色：**Producer（生產者）**、**Queue（佇列）**、**Consumer（消費者）**
- 每則訊息只能被**一個** Consumer 消費，消費後從 Queue 移除
- Consumer 需發出 **Acknowledge（確認）** 通知訊息已處理
- Producer 與 Consumer **無時間依賴**，支援非同步處理

![JMS Queue 模型](images/jms-queue-model.png)

### 發佈訂閱模型（Publish/Subscribe / Topic）

- 角色：**Topic**、**Publisher（發佈者）**、**Subscriber（訂閱者）**
- Subscriber 必須**先訂閱** Topic，Publisher 才發佈訊息（有時間依賴）
- 每則訊息可同時傳送給**所有**訂閱者

![JMS Topic 模型](images/jms-topic-model.png)

---

## 2. MQTT

**MQTT（Message Queuing Telemetry Transport）** 是輕量級的訊息傳遞協定，常用於 IoT（物聯網）裝置。

- 角色：**Publisher（發佈者）**、**Broker（代理伺服器）**、**Subscriber（訂閱者）**
- 由 Broker 統一轉發訊息，Publisher 與 Subscriber 不直接通訊

![MQTT 架構](images/mqtt-model.png)

---

## 3. ActiveMQ

ActiveMQ 是基於 JMS 規範的訊息代理（Message Broker），負責在系統之間傳遞訊息。

![ActiveMQ 架構](images/activemq-roles.png)

**三大核心用途：**

| 用途 | 說明 |
|------|------|
| **非同步效能提升** | 生產者不需等待消費者處理完成即可繼續執行 |
| **系統解耦** | 生產者與消費者互相獨立，降低依賴 |
| **流量削峰** | 高峰期訊息堆入佇列，消費者依自身能力逐步處理 |

---
