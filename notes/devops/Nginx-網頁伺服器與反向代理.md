# Nginx 網頁伺服器與反向代理

Nginx 是一款高效能的 Web 伺服器，同時具備反向代理與負載平衡功能，適用於高流量網站。

---

## 1. 特點

| 特點 | 說明 |
|------|------|
| **高併發** | 可同時處理大量請求 |
| **低資源消耗** | 記憶體與 CPU 佔用少 |
| **穩定可靠** | 運行穩定 |
| **多功能** | 除 Web 伺服器外，還支援反向代理、負載平衡與 HTTPS |

---

## 2. 主要用途

- **靜態資源服務**：提供 HTML、CSS、JS、圖片等靜態檔案
- **反向代理**：將請求轉發至後端應用（如 Spring Boot、Node.js）
- **負載平衡**：分配流量至多台伺服器，提高可用性
- **HTTPS 加密**：處理 TLS/SSL，提高安全性
- **API 網關**：統一管理與轉發 API 請求

---

## 3. 在 Ubuntu 上安裝與管理

### 安裝

```bash
sudo apt update
sudo apt install -y nginx
```

### 常用管理指令

```bash
# 啟動
sudo systemctl start nginx

# 查看狀態
sudo systemctl status nginx
sudo systemctl is-active nginx

# 重新啟動
sudo systemctl restart nginx

# 重新載入設定（不中斷現有連線）
sudo systemctl reload nginx
```

### 查看監聽的 Port

```bash
sudo netstat -tulnp | grep nginx
# 若無 netstat，先安裝：sudo apt install net-tools
```

### 防火牆設定（ufw）

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 本機測試

```bash
curl -I http://localhost
```

瀏覽器訪問 `http://伺服器IP`，若成功會看到預設頁面：

![Nginx 預設歡迎頁面](images/nginx-welcome-page.png)

---

## 4. 基本設定

### 編輯設定檔

```bash
sudo nano /etc/nginx/sites-available/default
```

### 常見 server 區塊設定

```nginx
server {
    listen 80;
    server_name your_domain_or_IP;

    location / {
        root /var/www/html;
        index index.html index.htm;
    }
}
```

### 驗證與套用設定

```bash
# 測試設定是否正確
sudo nginx -t

# 套用設定
sudo systemctl reload nginx
```

### 查看 Access Log

```bash
sudo tail -n 100 /var/log/nginx/access.log
```

### 解除安裝

```bash
sudo apt remove --purge nginx -y
sudo apt autoremove -y
```

---

## 5. 提供靜態資源（HTML、CSS、JS、圖片）

### 步驟一：放置靜態資源

將檔案放至 Nginx 可存取的目錄（預設 `/var/www/html/`）：

```
/var/www/html/
├── index.html
└── images/
    └── logo.png
```

### 步驟二：設定 Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 步驟三：重新啟動並測試

```bash
sudo systemctl restart nginx
# 瀏覽器訪問 http://yourdomain.com
```

---
