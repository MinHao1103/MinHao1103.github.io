> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，再麻煩直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

Git 版本控制
===

# ( 1 ) Git 介紹
* 一種版本控制系統
* 目的：
    * 是有效管理多位工程師所寫的程式，達到多人協作開發
* 軟體工程：
    * 面對一個大型系統，工程師們要如何分工合作，一起解決問題？
    * MVC 架構模式、Git 版本控制
## ( 1-1 ) Git 專有名詞
* Remote：雲端
* Local：自己的電腦
* Clone：複製雲端上的 Repository 到自己的電腦
* Commit：存檔點
* Push：推送 commit 到雲端上
* Pull：拉取雲端上的 commit 到自己的電腦

# ( 2 ) 在 Git 建立 Repository

## ( 2-1 ) New repository
## ( 2-2 ) IntelliJ
* File → New → Project from Version Controller
    * URL：剛才在 Git 創建的 repository 的網址
## ( 2-3 ) Git 按鈕
* Update Project：Pull，藍色向下箭頭
* commit：打勾的符號
* push：綠色向上箭頭
## ( 2-4 ) commit
* 上方勾選要 commit 的檔案
* 下方填寫修改的資訊
* 建議一次不要 commit 太多檔案
# ( 3 ) Git 多人開發
* Git 中的 branch ( 分支 ) 概念，多人開發的精隨
* 每一個 branch就是一個平行世界，各個 branch 之間不會互相影響
## ( 3-1 ) Git 專有名詞
* Branch：分支
* Checkout：切換 branch
* orgin/master：雲端上的 master branch
* master：自己電腦上的 master branch

## ( 3-2 ) 創建 branch
## ( 3-3 ) 合併 branch 兩種方法
* 使用 Git 的 merge 指令 ( 較少使用 )
* 提交 Pull Request ( 最常用 )
