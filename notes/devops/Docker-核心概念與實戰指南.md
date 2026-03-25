# Docker 核心概念與實戰指南

這篇筆記整合了 Docker 核心概念、在 Ubuntu 上的安裝流程，以及在正式與開發環境中，容器管理的實戰技巧、常用指令與 Docker Compose 的編排配置。

---

## 1. 核心概念

Docker 讓開發人員能夠自動化部署、擴展和運行應用程式，核心概念如下：

| 概念 | 說明 |
|------|------|
| **容器 (Container)** | 獨立的小盒子，將應用程式及依賴項打包在一起，確保在不同系統上正常運行 |
| **映像檔 (Image)** | 容器的藍圖，容器是根據映像檔建立的 |
| **Dockerfile** | 製作映像檔的指令文件 |
| **Docker Hub** | 分享和下載映像檔的公共平台 |

---

## 2. 在 Ubuntu 上安裝 Docker 與路徑搬移

### 安裝 Docker 引擎
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt install docker-ce docker-ce-cli containerd.io
sudo docker run hello-world
```

### 搬移 Docker 根目錄
Docker 預設將所有資料存於 `/var/lib/docker`，若磁碟空間不足，可搬移至其他路徑（例如 `/mnt/sda`）：
```bash
# 停止 Docker 服務
sudo systemctl stop docker
sudo systemctl stop docker.socket

# 建立新目錄並複製資料
sudo mkdir -p /mnt/sda/docker
sudo rsync -aP /var/lib/docker/ /mnt/sda/docker/

# 修改設定檔
sudo nano /etc/docker/daemon.json
```
寫入以下內容：
```json
{
  "data-root": "/mnt/sda/docker"
}
```
```bash
# 重啟並確認
sudo systemctl start docker
sudo docker info | grep "Docker Root Dir"
```

> 💡 Tip: 若出現 `permission denied` 錯誤，將使用者加入 docker 群組：
> ```bash
> sudo usermod -aG docker $USER
> newgrp docker
> ```

---

## 3. 基礎操作與映像檔管理 (Image)

### 服務狀態指令
```bash
sudo service docker start    # 啟動
sudo service docker stop     # 停止
sudo service docker status   # 查看狀態
sudo service docker restart  # 重啟
```

### 映像檔管理
```bash
sudo docker images                  # 查詢本地所有映像檔
sudo docker search redis            # 搜尋 Docker Hub 上的映像檔
sudo docker pull redis              # 下載映像檔
sudo docker rmi <image_id>          # 刪除本地映像檔
```

### 空間清理
長時間運行的伺服器經常會遇到硬碟空間被舊的 Image 塞滿的問題。
```bash
# 檢視 Docker 系統的整體磁碟使用量
docker system df

# 【危險/實用】一鍵清理所有未被使用的資源 (包含停止的容器、未被標記的映像檔、孤立的網路)
# 加上 -a 會連同沒有被任何容器引用的 Image 一併刪除
docker system prune -a -f
```

---

## 4. 容器生命週期與管理 (Container)

### 建立容器
```bash
# 前台容器（進入 bash，Redis 不自動啟動）
sudo docker run -it --name myredis redis /bin/bash

# 前台容器（直接進入 Redis CLI）
sudo docker run -it --name myredis redis

# 後台容器（detached mode，Redis 自動啟動）
sudo docker run -d --name=myredis redis
```
> 💡 Tip: 前台容器退出（`exit`）後容器會停止。按 `Ctrl+P` 再 `Ctrl+Q` 可讓容器在背景繼續運行。

### 管理指令
在維運伺服器時，快速定位問題與清理資源是工程師的日常。
```bash
# 啟停與刪除
sudo docker start <容器名稱或ID>      # 啟動已停止的容器
sudo docker stop <容器名稱或ID>       # 停止運行中的容器
sudo docker restart <容器名稱或ID>    # 重啟容器
sudo docker rm <容器名稱或ID>         # 刪除容器（需先停止）
sudo docker rm -f <容器名稱或ID>      # 強制刪除運行中的容器

# 檢視運行中的容器 (加上格式化輸出，易讀性更高)
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"

# 檢視所有容器 (包含已退出的)
docker ps -a
```

### 進入、監控與除錯
在沒有集中式日誌系統 (如 ELK) 的環境下，直接查看容器日誌是第一步：
```bash
sudo docker exec -it <容器名稱或ID> /bin/bash   # 進入容器內部
sudo docker logs -f --tail 100 <容器名稱或ID>    # 查看最新 100 行日誌並持續追蹤
sudo docker logs --since "2024-03-01T10:00:00" <容器名稱> # 根據時間戳記過濾日誌
sudo docker inspect <容器名稱或ID>               # 查看容器詳細資訊
sudo docker stats <容器名稱或ID>                 # 動態查看資源使用情況 (CPU, Memory)
```

---

## 5. 檔案複製與目錄掛載

```bash
# 宿主機 → 容器
docker cp /home/hello.txt myredis:/usr/local/

# 容器 → 宿主機
docker cp myredis:/usr/local/hello.txt /home/

# 目錄掛載（容器與宿主機共享資料夾）
docker run -d --name myredis -v <宿主機路徑>:<容器路徑> redis
```

---

## 6. 常用服務快速啟動

### MySQL 8.0
```bash
docker pull mysql:8.0
docker run -di -p 3306:3306 --name=mysql -e MYSQL_ROOT_PASSWORD=password mysql:8.0

# 進入容器與連線
sudo docker exec -it mysql bash
mysql -u root -p
```

### Redis
```bash
docker pull redis
docker run -di --name=redis -p 6379:6379 redis

# 進入容器與連線
sudo docker exec -it redis bash
redis-cli -p 6379
```

### Tomcat 9.0
```bash
docker pull tomcat:9.0
docker run -di --name tomcat -p 8080:8080 tomcat:9.0

# 部署 WAR 檔與掛載
docker cp your-app.war tomcat:/usr/local/tomcat/webapps/
docker run -d --name tomcat -p 8080:8080 -v /path/to/server.xml:/usr/local/tomcat/conf/server.xml tomcat:9.0

# 設定 JVM 參數
docker run -d --name tomcat -p 8080:8080 -e JAVA_OPTS="-Xmx512m -Xms256m" tomcat:9.0
```

---

## 7. Docker Compose 多容器編排

在開發或部署微服務時，通常需要同時啟動資料庫、Redis、Gateway 與後端服務，此時 `docker-compose.yml` 是最佳實踐。

### 實戰範例架構
以下是一個典型的 Spring Boot 後端搭配 MySQL 的設定範例：

```yaml
version: '3.8'

services:
  database:
    image: mysql:8.0
    container_name: dev-mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: my_db
      TZ: Asia/Taipei  # 解決跨時區資料問題
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  backend-api:
    image: my-spring-boot-app:latest
    container_name: api-service
    depends_on:
      - database
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://database:3306/my_db
      - SPRING_PROFILES_ACTIVE=prod

volumes:
  db_data:  # 宣告具名卷宗，確保資料持久化
```

### Compose 常用指令
```bash
# 在背景啟動所有服務 (-d 表示 Detached mode)
docker-compose up -d

# 停止並移除所有容器與網路
docker-compose down

# 重新構建並重啟特定服務 (在更新程式碼後非常實用)
docker-compose up -d --build backend-api
```

---

## 8. 實戰踩坑紀錄

> ⚠️ 踩坑點: 時區問題 (Timezone)
> Docker 容器預設的時區通常是 UTC。如果你的 Java 程式沒有強制設定時區，寫入 MySQL 的 `LocalDateTime` 可能會產生 8 小時的落差。解法：在 Dockerfile 或 docker-compose 中掛載主機的 `/etc/localtime` 或設定環境變數 `TZ=Asia/Taipei`。

---
