# Docker 容器化技術與 DevOps 實戰技巧

在微服務架構與 CI/CD 流程中，Docker 已經是不可或缺的基礎設施。本篇筆記整理了在正式環境 (Production) 與開發環境 (Development) 中，容器管理的實戰技巧與常用指令。

## 1. 容器生命週期與管理 (Container Management)

在維運伺服器時，快速定位問題與清理資源是工程師的日常。

### 常用管理指令
```bash
# 檢視運行中的容器 (加上格式化輸出，易讀性更高)
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"

# 檢視所有容器 (包含已退出的)
docker ps -a

# 動態查看容器的即時資源佔用 (CPU, Memory, Network I/O)，類似 top 指令
docker stats

# 進入運行中的容器內部 (通常用於除錯)
docker exec -it <container_name_or_id> /bin/sh
```

### 日誌排查 (Logging & Troubleshooting)
在沒有集中式日誌系統 (如 ELK) 的環境下，直接查看容器日誌是第一步：
```bash
# 查看最新 100 行日誌並持續追蹤 (Tail)
docker logs -f --tail 100 <container_name>

# 根據時間戳記過濾日誌 (尋找特定時間點的錯誤)
docker logs --since "2024-03-01T10:00:00" <container_name>
```

## 2. 映像檔與空間清理 (Image & Storage)

長時間運行的伺服器經常會遇到硬碟空間被舊的 Image 塞滿的問題。

```bash
# 列出本地所有映像檔
docker images

# 檢視 Docker 系統的整體磁碟使用量
docker system df

# 【危險/實用】一鍵清理所有未被使用的資源 (包含停止的容器、未被標記的映像檔、孤立的網路)
# 加上 -a 會連同沒有被任何容器引用的 Image 一併刪除
docker system prune -a -f
```

## 3. Docker Compose 多容器編排

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

## 4. 實戰踩坑紀錄
> 💡 **時區問題 (Timezone)**：
> Docker 容器預設的時區通常是 UTC。如果你的 Java 程式沒有強制設定時區，寫入 MySQL 的 `LocalDateTime` 可能會產生 8 小時的落差。**解法**：在 Dockerfile 或 docker-compose 中掛載主機的 `/etc/localtime` 或設定環境變數 `TZ=Asia/Taipei`。
