# Ngrok 內網穿透工具

Ngrok 是一種能夠將本地伺服器映射到公共網路上的工具，讓開發者可以在不需要公網 IP 的情況下，將本地應用程式公開到網際網路。

---

## 1. 主要功能

| 功能 | 說明 |
|------|------|
| **內網穿透** | 讓位於內網或本地的服務可被外部網路訪問 |
| **臨時域名** | 提供臨時的公共 URL，無需購買或設定域名 |
| **安全連接** | 支援 HTTPS 加密通訊 |
| **請求檢查** | 提供 Web 介面用於監控和檢查所有流量 |

---

## 2. 常見使用場景

- 測試需要外部服務回呼的 API（如 Webhook）
- 與外部團隊共享本地開發的網站
- 展示本地專案給客戶
- 繞過企業防火牆限制進行開發

> Ngrok 提供免費和付費方案，開發者可依需求選擇合適版本。

---

## 3. 在 Ubuntu 中安裝與使用

### 步驟一：建立資料夾與設定權限

```bash
sudo mkdir -p /opt/ngrok
sudo chown -R ubuntu:ubuntu /opt/ngrok
cd /opt/ngrok
```

### 步驟二：下載並安裝

```bash
# 下載 ngrok
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz

# 解壓縮
tar -xvzf ngrok-v3-stable-linux-amd64.tgz

# 移至 PATH（建議放到 /usr/local/bin）
sudo mv /opt/ngrok/ngrok /usr/local/bin/
```

### 步驟三：設定授權

```bash
ngrok authtoken 你的授權令牌
```

### 步驟四：啟動與查詢

```bash
# 在背景執行 ngrok 映射 80 port
nohup ngrok http 80 > /opt/ngrok/ngrok.log 2>&1 &

# 取得 ngrok 隧道資訊（公開 URL）
curl http://127.0.0.1:4040/api/tunnels
```

> 執行後，ngrok 會提供一個公開的 URL，可透過該 URL 從外部訪問本地服務。

---
