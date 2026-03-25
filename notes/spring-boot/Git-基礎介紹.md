> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，再麻煩直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

# Git 基礎與版控

目前所有企業級專案都依賴 Git 進行版本控制。這篇記錄了早期學習 Git 的核心概念與指令。
原因是熟悉版控能大幅減少團隊協作時的衝突。

## 1. 核心觀念
- **工作區 (Working Directory)**：目前正在修改檔案的區域。
- **暫存區 (Staging Area)**：準備要 Commit 的檔案清單。
- **儲存庫 (Repository)**：已經 Commit 的本地歷史紀錄。

## 2. 常用指令
```bash
# 初始化與設定
git init
git config --global user.name "Name"

# 提交變更
git add .
git commit -m "feat: add new feature"

# 遠端操作
git push origin main
git pull
```
預計在實戰中，都會搭配 GitHub Actions 或 GitLab CI/CD 進行自動化部署。
