# Docker 常用指令與技巧

這裡紀錄了平常工作中最常使用的 Docker 指令：

### 容器管理
```bash
# 查看正在運行的容器
docker ps

# 查看所有容器（包含已停止的）
docker ps -a

# 停止容器
docker stop <container_id>
```

### 映像檔管理
```bash
# 列出本地所有映像檔
docker images

# 刪除映像檔
docker rmi <image_id>
```

### Docker Compose
```yaml
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
```
