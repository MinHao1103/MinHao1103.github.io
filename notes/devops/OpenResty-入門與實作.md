# OpenResty 入門與負載平衡實作

## 1. 核心觀念
OpenResty 是一個基於 **Nginx** 與 **Lua** 的高性能 Web 平台。它透過將 Lua 腳本嵌入 Nginx 的各個生命週期階段，使得開發者能夠使用 Lua 語言來擴展 Nginx 的功能，實作如動態負載平衡、請求過濾、存取控制等複雜邏輯。

### 主要特點：
*   **高性能：** 繼承了 Nginx 的非阻塞 I/O 模型。
*   **動態性：** 利用 Lua 實作動態邏輯，無需頻繁重啟 Nginx 即可變更行為。
*   **豐富的模組：** 內建大量高品質的 Lua 庫（如 lua-resty-mysql, lua-resty-redis 等）。

---

## 2. Nginx + Lua 實作負載平衡 (Load Balancer)
在該專案中，OpenResty 被用作**負載平衡器**，透過 Nginx 的配置與 Lua 的靈活性來分配流量。

### 實作模式：
*   **配置管理 (`conf/`)：** 定義 Nginx Server 和 Location，並設定 Upstream 伺服器組。
*   **Lua 邏輯整合：** 透過 `access_by_lua_block` 或 `content_by_lua_file` 等指令，在請求處理過程中執行 Lua 腳本，進行自定義的路由或標頭處理。

---

## 3. 操作與運維 (以 Windows 環境為例)
專案提供了在 Windows 環境下運行與管理 OpenResty 的具體指令。

### 基本操作：
1.  **啟動：** `start nginx.exe`
2.  **停止：** `nginx -s stop` (優雅停止) 或 `taskkill /F /IM nginx.exe` (強制終止)。
3.  **重新載入配置：** `nginx -s reload` (套用修改後的 `nginx.conf` 而不中斷連線)。

### 監控日誌：
在 `logs` 目錄下使用 PowerShell 進行即時監控：
```powershell
Get-Content "error.log" -Wait
```

---

## 參考連結
*   [OpenResty GitHub Repository](https://github.com/MinHao1103/OpenResty)
