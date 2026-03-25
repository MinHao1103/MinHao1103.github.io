# Ollama 本地 AI 模型部署

Ollama 是一個讓開發者能在本地端運行大型語言模型（LLM）的工具，無需雲端服務即可使用 AI 能力。

---

## 1. 核心功能

| 功能 | 說明 |
|------|------|
| **本地執行** | 無需網路連接即可使用 AI |
| **跨平台支援** | macOS、Windows、Linux 皆可使用 |
| **簡單操作** | 提供 CLI 和 REST API 介面 |
| **自定義模型** | 可建立專屬的 AI 角色（Modelfile） |
| **API 整合** | 提供 REST API 讓開發者整合至應用程式，支援文字生成與聊天模式 |

---

## 2. 硬體需求

| 模型規模 | 最低 RAM |
|----------|----------|
| 7B 模型 | 8 GB |
| 13B 模型 | 16 GB |
| 33B 模型 | 32 GB+ |

---

## 3. 安裝

| 平台 | 方式 |
|------|------|
| **macOS / Windows** | 下載官方安裝器（[ollama.com](https://ollama.com/)） |
| **Linux** | `curl -fsSL https://ollama.com/install.sh \| sh` |
| **Docker** | `docker run -d --gpus all -p 11434:11434 ollama/ollama` |

安裝後驗證：

```bash
ollama --version
```

---

## 4. 基本指令

```bash
# 下載模型
ollama pull llama3

# 運行模型（互動對話）
ollama run llama3

# 查看已下載的模型
ollama list

# 刪除模型
ollama rm llama3
```

---

## 5. 自定義中文模型

建立 `Modelfile`：

```
FROM llama3
SYSTEM "你是中文助理，請用繁體中文回答。"
```

建立並執行自定義模型：

```bash
ollama create llama3-chinese -f Modelfile
ollama run llama3-chinese
```

---

## 6. REST API 呼叫

```powershell
Invoke-RestMethod -Uri "http://localhost:11434/api/generate" `
  -Method Post `
  -Body '{"model": "llama3", "prompt": "你的問題", "stream": false}' `
  -ContentType "application/json"
```

---

## 7. 常用模型比較

| 模型 | 大小 | 特性 |
|------|------|------|
| **llama3** | 4.7 GB | 推薦，效能與品質平衡 |
| **mistral** | 4.1 GB | 速度快 |
| **phi** | 1.6 GB | 輕量級，低資源需求 |

---
