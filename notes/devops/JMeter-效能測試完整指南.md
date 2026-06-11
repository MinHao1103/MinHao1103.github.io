# JMeter 效能測試完整指南

## 什麼是 JMeter？

Apache JMeter 是一款開源的 Java 效能測試工具，最初用於測試 Web 應用程式，現在已支援多種協定：

| 協定 | 說明 |
|------|------|
| HTTP / HTTPS | 最常見，測試 REST API 或網頁 |
| JDBC | 直接對資料庫壓測 |
| FTP / SMTP / LDAP | 各種網路服務 |
| WebSocket | 即時通訊協定 |
| TCP | 底層 Socket 測試 |

**主要用途**
- **負載測試（Load Testing）**：模擬大量使用者同時請求
- **壓力測試（Stress Testing）**：找出系統崩潰的臨界點
- **基準測試（Benchmark）**：比較程式碼優化前後的效能差異
- **功能測試**：搭配斷言驗證 API 回應是否正確

---

## 安裝與啟動

### 前置條件

JMeter 需要 Java 8+ 才能執行：

```bash
java -version
# 應顯示 java version "1.8.0" 以上
```

若出現 `Not able to find Java executable or version. Please check your Java installation.`，表示 Java 尚未安裝或未加入系統環境變數，請先完成以下安裝步驟。

### 安裝 Java（Windows）

推薦安裝 **Eclipse Temurin（OpenJDK）**，免費且無商業授權限制。

1. 前往 `https://adoptium.net/`
2. 選擇以下選項後下載：

   | 選項 | 值 |
   |------|----|
   | Version | 最新 LTS（網站會自動偵測推薦） |
   | OS | Windows |
   | Architecture | x64 |
   | Package Type | JDK |
   | Format | `.msi`（安裝檔） |

3. 執行安裝檔，過程中確認勾選：
   - **Add to PATH**
   - **Set JAVA_HOME variable**

4. 安裝完成後，重新開啟 cmd 驗證：

   ```cmd
   java -version
   ```

   應顯示類似：
   ```
   openjdk version "21.0.x" ...
   ```

之後再執行 `jmeter.bat` 即可正常啟動。

### 下載與解壓

1. 前往 [https://jmeter.apache.org/download_jmeter.cgi](https://jmeter.apache.org/download_jmeter.cgi)
2. 選擇正確的版本下載：

下載頁面會看到以下選項：

```
Binaries
  apache-jmeter-5.6.3.tgz    sha512    pgp
  apache-jmeter-5.6.3.zip    sha512    pgp
Source
  apache-jmeter-5.6.3_src.tgz    sha512    pgp
  apache-jmeter-5.6.3_src.zip    sha512    pgp
```

| 分類 | 說明 | 是否需要 |
|------|------|----------|
| **Binaries** | 已編譯好的執行檔，下載後直接用 | 下載這個 |
| **Source** | 未編譯的 Java 原始碼，需自行用 Maven 編譯 | 一般使用者不需要 |

副檔名依作業系統選擇：

| 檔案 | 適合 |
|------|------|
| `apache-jmeter-5.6.3.zip` | Windows |
| `apache-jmeter-5.6.3.tgz` | Linux / Mac |

> `sha512` 與 `pgp` 是校驗碼連結，用來驗證下載檔案的完整性，一般使用者不需要點。

3. 解壓後目錄結構如下：

```
apache-jmeter-5.6.3/
├── bin/           ← 執行檔與設定檔
│   ├── jmeter          (Linux/Mac 啟動腳本)
│   ├── jmeter.bat      (Windows 啟動腳本)
│   └── jmeter.properties
├── lib/           ← 核心 JAR
├── lib/ext/       ← 放第三方插件
└── docs/
```

### 啟動 GUI

```bash
# Windows
bin\jmeter.bat

# Linux / Mac
bin/jmeter
```

> **注意**：GUI 模式僅用於建立和除錯測試計畫，**正式壓測請用命令列模式**，GUI 本身會消耗大量系統資源，影響測試結果。

### 儲存測試計畫（.jmx）

設定完成後按 **Ctrl + S** 存檔，檔案格式為 `.jmx`。

**不要存在 JMeter 的 `bin/` 資料夾**，升級 JMeter 時容易被覆蓋。建議建立獨立資料夾統一管理：

```
D:\jmeter-tests\
├── my-test.jmx        ← 測試計畫
├── users.csv          ← 參數化資料（CSV Data Set 用）
├── results\
│   └── run1.jtl       ← 壓測結果
└── report\
    └── run1\          ← HTML 報告
```

路徑避免含有空格，命令列執行時比較不容易出問題。

---

## 第一個測試：快速入門

以測試一個登入 API 為例，完整走過建立 → 執行 → 看結果的流程。

### 步驟一：建立測試計畫結構

啟動 JMeter GUI 後預設已有一個 Test Plan，依序新增以下元件：

**1. Thread Group**（控制虛擬使用者）

右鍵 Test Plan → Add → Threads (Users) → Thread Group

```
Number of Threads: 1     ← 第一次先設 1 個使用者，確認請求正確後再加量
Ramp-Up Period:    1
Loop Count:        1
```

**2. HTTP Header Manager**（設定 Content-Type）

右鍵 Thread Group → Add → Config Element → HTTP Header Manager

新增一筆：`Content-Type` = `application/json`

**3. HTTP Request**（實際發送的請求）

右鍵 Thread Group → Add → Sampler → HTTP Request

填入 Protocol、Server Name、Port、Method、Path，並在 **Body Data** 分頁填入 JSON。

**4. View Results Tree**（看結果）

右鍵 Thread Group → Add → Listener → View Results Tree

### 步驟二：執行

按工具列的綠色播放鈕（▶）執行。

### 步驟三：看結果

點左側 **View Results Tree**：

- 綠色 = 成功
- 紅色 = 失敗 → 點選失敗的請求 → 切換到 **Response data** 分頁 → 讀取錯誤訊息

> 看到錯誤先別慌，Response data 裡伺服器的回應通常已經說明原因（例如欄位名稱錯誤、帳密不對、Token 遺失等）。

### 完整結構示意

```
Test Plan
└── Thread Group
    ├── HTTP Header Manager  ← Content-Type: application/json
    ├── HTTP Request         ← POST /api/login
    │   └── JSON Extractor   ← 擷取回應中的 token（若需要）
    └── View Results Tree    ← 看結果 / 除錯
```

---

## 核心概念架構

JMeter 的測試計畫是一棵**樹狀結構**，父子節點之間有作用域關係：

```
Test Plan（測試計畫）
└── Thread Group（執行緒組）
    ├── Config Element（設定元件）  ← HTTP Header Manager、HTTP Request Defaults
    ├── Sampler（取樣器）           ← HTTP Request
    ├── Post Processor（後置處理器）← JSON Extractor
    └── Listener（監聽器）          ← View Results Tree、Aggregate Report
```

---

## Thread Group（執行緒組）

Thread Group 是壓測的核心，控制**虛擬使用者數量**與**執行方式**。

右鍵 Test Plan → Add → Threads (Users) → Thread Group

### 關鍵參數

| 參數 | 說明 |
|------|------|
| **Number of Threads** | 虛擬使用者數（並發數） |
| **Ramp-Up Period** | 啟動所有執行緒所需秒數（避免瞬間湧入） |
| **Loop Count** | 每個執行緒執行幾次，`-1` 表示無限 |
| **Duration** | 搭配 Scheduler 設定執行總秒數 |

**範例：100 用戶，30 秒內全部啟動，執行 1 次**

```
Number of Threads: 100
Ramp-Up Period:    30
Loop Count:        1
```

這代表每秒大約新增 100÷30 ≈ 3.3 個虛擬使用者。

---

## HTTP Request Sampler（HTTP 請求取樣器）

取樣器是實際發送請求的元件。

右鍵 Thread Group → Add → Sampler → HTTP Request

### 基本設定

```
Protocol:    https
Server Name: api.example.com
Port:        443
Method:      POST
Path:        /api/v1/login
```

實際範例（對應截圖欄位）：

```
Protocol [http]:    https
Server Name or IP:  accountsystem-070u.onrender.com
Port Number:        443
Method:             POST
Path:               /v1/auth/login
```

### 傳送 JSON Body

切換到 **Body Data** 分頁：

```json
{
  "account": "testuser",
  "password": "123456"
}
```

> **欄位名稱必須與 API 規格完全一致**。若打錯欄位名（例如 API 要求 `account` 卻填了 `username`），伺服器會回 400 並說明哪個欄位有問題。遇到 400 先去 View Results Tree 的 Response data 確認伺服器的錯誤訊息。

同時加上 Header：

1. 左側樹狀結構，右鍵點 **HTTP Request** → Add → Config Element → **HTTP Header Manager**
2. 點進 HTTP Header Manager，新增一筆：

```
Name:  Content-Type
Value: application/json
```

### 傳送 Form 參數

> Body Data 和 Parameters 兩者只能擇一，若 Body Data 有內容，Parameters 分頁會無法點擊。需先將 Body Data 清空，才能切換到 Parameters。

切換到 **Parameters** 分頁，新增 Name / Value：

| Name | Value |
|------|-------|
| username | testuser |
| password | 123456 |

---

## HTTP Request Defaults（HTTP 預設設定）

當所有請求都打同一個 Host 時，可用此元件統一設定，避免每個 Sampler 重複填寫：

右鍵 Thread Group → Add → Config Element → HTTP Request Defaults

```
Protocol:    https
Server Name: api.example.com
Port:        443
```

之後每個 HTTP Request 只需填 Path 即可。

---

## JSON Extractor（擷取回應欄位）

最常見場景：登入後從回應取得 `token`，帶入後續請求的 Header。

右鍵 HTTP Request → Add → Post Processors → JSON Extractor

```
Names of created variables:  token
JSON Path expressions:        $.data.token
Default Value:                ERROR
```

之後在其他請求的 Header Manager 中使用：

```
Authorization: Bearer ${token}
```

> 若 `token` 值為 `ERROR`，表示 JSON Path 沒有正確擷取到，先用 View Results Tree 檢查實際回應結構。

---

## 監聽器（Listeners）

**正式壓測時停用所有監聽器**（右鍵 → Disable），壓測結束後再開啟分析，避免影響測試結果。

### View Results Tree

逐筆顯示每個請求的詳細資訊，專用於除錯：

右鍵 Thread Group → Add → Listener → View Results Tree

- 綠色 = 成功，紅色 = 失敗
- **Request** 分頁：查看實際送出的內容（確認 URL、Body 是否正確）
- **Response data** 分頁：查看伺服器回傳的完整回應（**出錯優先看這裡**）

**除錯流程：**

1. 點選紅色失敗的請求
2. 切換到 **Response data** 分頁
3. 讀取 Response Body 裡的錯誤訊息，例如：
   - `"message": "account: must not be blank"` → 欄位名稱錯誤
   - `"message": "Invalid credentials"` → 帳密不對
   - 回應內容為空、連線逾時 → 伺服器未啟動或網路問題

### Aggregate Report

顯示整體壓測統計，是分析結果的主要工具：

右鍵 Thread Group → Add → Listener → Aggregate Report

| 欄位 | 說明 |
|------|------|
| # Samples | 總請求次數 |
| Average | 平均回應時間（ms） |
| 90th pct | 90% 請求在此時間內完成 |
| Error % | 錯誤率，理想值 < 1% |
| Throughput | 每秒請求數（TPS） |

---

## 命令列模式（Non-GUI Mode）

正式壓測必須使用 CLI 模式，減少 JMeter 本身的資源消耗：

```bash
# 基本執行
jmeter -n -t test-plan.jmx -l result.jtl

# 執行並產生 HTML 報告
jmeter -n -t test-plan.jmx -l result.jtl -e -o ./report

# 覆寫 Thread Group 參數（不改 JMX 直接帶參數）
jmeter -n -t test-plan.jmx -l result.jtl \
  -Jthreads=200 \
  -Jrampup=60 \
  -Jduration=300
```

| 參數 | 說明 |
|------|------|
| `-n` | Non-GUI 模式 |
| `-t` | 指定 `.jmx` 測試計畫檔 |
| `-l` | 結果輸出檔（`.jtl`） |
| `-e` | 執行完後產生報告 |
| `-o` | HTML 報告輸出目錄（必須為空目錄） |
| `-J` | 覆寫 JMeter Properties 或使用者變數 |

---

## HTML 報告解讀

執行 `jmeter -e -o ./report` 後，用瀏覽器開啟 `report/index.html`：

### Statistics 表格

| 指標 | 理想值 |
|------|--------|
| Error Rate | < 1% |
| 90th pct | 業務 SLA 要求內 |
| Throughput (TPS) | 符合容量規劃目標 |

### Over Time 圖表

- **Response Times Over Time**：觀察回應時間是否隨時間劣化（爬坡）
- **Active Threads Over Time**：確認 Ramp-Up 符合預期
- **Transactions per Second**：TPS 曲線是否平穩

---

## 常見問題排查

### 'jmeter' is not recognized（命令列找不到指令）

執行 `jmeter` 時出現此錯誤，表示 JMeter 的 `bin/` 資料夾未加入系統 PATH。

**方法一：用完整路徑執行（臨時）**

```cmd
C:\apache-jmeter-5.6.3\bin\jmeter.bat -n -t jmeter-tests.jmx -l result.jtl -e -o ./report
```

路徑依實際解壓位置調整。同時確認 `-t` 後面的檔名與實際存檔名稱一致。

**方法二：永久加入 PATH（建議）**

1. 搜尋「環境變數」→ 編輯系統環境變數
2. 點「環境變數」→ 找到 `Path` → 編輯
3. 新增一筆：`C:\apache-jmeter-5.6.3\bin`
4. 確定後重新開啟 cmd，之後直接打 `jmeter` 即可

---

### The file X doesn't exist or can't be opened

`-t` 後面的檔名與實際存檔名稱不一致。先確認目錄下的真實檔名：

```cmd
dir D:\jmeter-tests\*.jmx
```

再將命令改成對應的實際檔名：

```cmd
jmeter -n -t jmeter-tests.jmx -l result.jtl -e -o ./report
```

---

### 400 Bad Request（欄位驗證失敗）

伺服器回應類似以下內容：

```json
{"status":400,"message":"account: must not be blank"}
```

表示請求有傳到伺服器，但 JSON Body 的欄位名稱與 API 規格不符。對照 API 文件確認正確的欄位名稱後修正 Body Data。