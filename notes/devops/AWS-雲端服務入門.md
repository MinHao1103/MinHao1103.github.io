# Amazon Web Services (AWS) 雲端服務入門

![AWS Logo](images/aws-logo.png)

AWS 是 Amazon 提供的雲端運算平台，讓企業和開發者能租用伺服器、儲存、資料庫等資源，不需自己架設實體設備，並按用量計費。

---

## 1. 主要特點

| 特點 | 說明 |
|------|------|
| **彈性擴展** | 需要多少資源就用多少 |
| **成本效益** | 依使用量付費，無需一次買斷 |
| **全球覆蓋** | 伺服器遍布世界各地 |
| **安全可靠** | 提供多層次的安全機制 |

---

## 2. 主要服務總覽

### 💻 運算
- **EC2** – Elastic Compute Cloud（雲端伺服器）
- **Lambda** – 無伺服器運算
- **ECS** – Elastic Container Service（Docker 容器管理）
- **EKS** – Elastic Kubernetes Service（Kubernetes 託管服務）

### 📦 儲存
- **S3** – Simple Storage Service（物件儲存）
- **EBS** – Elastic Block Store（雲端硬碟）
- **EFS** – Elastic File System（共享檔案儲存）

### 🗄️ 資料庫
- **RDS** – Relational Database Service（關聯式資料庫）
- **DynamoDB** – NoSQL 資料庫

### 🌍 網路
- **VPC** – Virtual Private Cloud（虛擬私有雲）
- **CloudFront** – 內容傳遞網路 (CDN)

### 🔐 安全
- **IAM** – Identity and Access Management（身分與存取管理）
- **Shield** – DDoS 防護
- **WAF** – Web Application Firewall

---

## 3. AWS RDS 建置說明

### 步驟 1：選擇資料庫引擎
- 常見引擎：MySQL、PostgreSQL、MariaDB、Oracle、SQL Server、Aurora
- 可視需求選擇是否啟用 **Multi-AZ** 提高可用性

### 步驟 2：選擇部署選項

| 選項 | 架構 | 適用情境 |
|------|------|----------|
| **單一執行個體** | 1 個資料庫執行個體 | 開發 / 測試，成本較低 |
| **Multi-AZ DB Instance** | 主要 + 1 個待命（不可讀） | 高可用性需求 |
| **Multi-AZ DB Cluster** | 主要 + 2 個可讀取待命 | 高負載，讀取流量分散 |

### 步驟 3：認證與安全性
- 密碼管理建議使用 **AWS Secrets Manager**
- 透過 **VPC 安全性群組** 控制存取範圍
- 可選擇 **KMS 金鑰** 加密靜態資料

### 步驟 4：計算與儲存選型

**執行個體類型：**
- `m` 類別（標準）：一般用途
- `r/x` 類別（記憶體最佳化）：快取、分析系統
- `t` 類別（爆量）：輕量應用，成本較低

**儲存類型：**
- `gp3`（一般用途 SSD）：成本效益高，適合大部分應用
- `io2`（佈建 IOPS SSD）：高負載、高 IOPS 需求

### 步驟 5：連線設定
- VPC、子網路與安全性群組設定
- 是否允許公開存取（Public Access）
- 可選用 **RDS Proxy** 改善連線效能與安全性

### 步驟 6：其他考量
- **備份**：自動備份最多保留 35 天，可手動建立快照
- **監控**：啟用 Amazon CloudWatch 設定告警
- **擴展**：可設定自動儲存擴展

---

## 4. AWS EC2 建置說明

### 步驟 1：選擇執行個體類型

| 系列 | 用途 |
|------|------|
| `t3/t4g`（爆量） | 小型應用、開發測試 |
| `m5/m6g`（一般用途） | Web 伺服器、應用伺服器 |
| `c5/c6g`（計算最佳化） | 高計算需求，影片編碼 |
| `r5/r6g`（記憶體最佳化） | 快取、分析系統 |
| `i3/i4`（儲存最佳化） | 高 IOPS，NoSQL 資料庫 |
| `p3/p4`、`g4/g5`（GPU） | 機器學習訓練與推論 |

### 步驟 2：部署與網路設定
- **VPC / 子網路**：決定 EC2 所屬虛擬網路
- **安全性群組**：設定允許的入站與出站流量
- **Elastic IP**：綁定固定公有 IP
- **Auto Scaling 群組**：根據負載動態調整執行個體數量
- **Spot Instances**：可大幅降低成本，但可能隨時被 AWS 回收

### 步驟 3：認證與存取控制
- **Key Pair**（SSH）：用於身份驗證
- **IAM 角色**：管理對其他 AWS 資源的存取權限
- **Session Manager**：無須 SSH，透過 AWS Console 直接管理

### 步驟 4：儲存選擇

**EBS（持久性）：**
- `gp3`：高性價比，適合大多數應用
- `io2`：高效能資料庫
- `st1`：大數據與日誌分析
- `sc1`：備份與長期儲存

**Instance Store（臨時）：**
- 不支援資料持久化，適合臨時快取與短期儲存

### 步驟 5：高可用性設計
- **ELB**（Elastic Load Balancer）：分配流量至多個 EC2
- **Auto Scaling**：根據 CPU / 流量自動擴縮
- **Multi-AZ**：跨可用區部署確保高可用性

### 步驟 6：其他考量
- **備份**：EBS 快照或 AMI（Amazon Machine Image）
- **監控**：CloudWatch（CPU、記憶體、網路）、CloudTrail（API 記錄）
- **計費模式**：

| 模式 | 特點 |
|------|------|
| On-Demand（按需） | 短期使用，無需承諾 |
| Savings Plans / Reserved | 長期應用，節省 30–70% |
| Spot Instances | 可中斷工作負載，節省最高 90% |

---
