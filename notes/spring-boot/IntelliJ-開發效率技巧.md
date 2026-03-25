> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，再麻煩直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

IntelliJ
===

# ( 1 ) IntelliJ 中的 Debug 模式
* 可以新增斷點 ( breakpoint )，一行一行的執行程式
* 可以馬上知道運行中變數的值
## ( 1-1 ) Debug 視窗左側按鈕介紹
* Resume
    * 繼續 Spring Boot 程式，直到下一個斷點
* Mute Breakpoints
    * 點擊後，所有斷點皆為灰色，表示不會停止程式運行
* View Breakpoints
    * 點擊後，可查看目前所設置的所有斷點
    * Java Exception Breakpoints ( 不常用 )
        * 任何地方的 Exception 都添加一個斷點的感覺

## ( 1-2 ) Debug 視窗上方按鈕介紹
* Show Execution Point
    * 帶你回到目前程式停在哪一行
* Step Over
    * 一行一行執行程式
* Step Into
    * 假設當前這行程式，有呼叫其他方法，就會進到那個方法內部查看
* Evaluate Expression
    * 點擊後，會跳出一個視窗，可以執行你想執行的程式
    * 可以寫程式檢查當前變數是否符合所預期的

## ( 1-3 ) 在斷點上按下右鍵
* 可以在 For Loop 加上條件
## ( 1-4 ) DeBug Lambda 表達式
* Trace Currnet Stream Chain
    * 較複雜的 Lambda 表達式，不建議使用

# ( 2 ) IntelliJ 的實用技巧　( Windows )
* 萬用鍵：Alt + Enter
* 對某個方法 Ctrl + 左鍵，可直接跳到該方法的 Interface
    * 再透過左邊的綠色 I 符號，跳到方法的實作邏輯
* 全局搜尋視窗：Ctrl + Shift + F
* 跳回上一個游標位置：Ctrl + Alt + 左方向鍵
* 註解某行程式：Ctrl + /
* 移除多餘的 Import：Ctrl + Alt + o
* 美化排版：Ctrl + Alt + L
* 查詢 Java 檔案、或其他檔案：Ctrl + n　or 連續按下兩個 Shift 鍵
* 顯示近期開過的檔案：Ctrl + E
* 選取多行：Alt + 左鍵往下拉
* 產生 getter / setter：Alt + Insert 或 class 右鍵 → Generate → Getter and Setter
* 游標放在任意方法上
    * ctrl + alt：跳到呼叫這個方法的實作
    * ctrl + shift：可以查詢所有使用到這個方法的檔案

## ( 2-1 ) 如何根據 url 路徑，找到所在的 Controller
* 下方 Encoding，IntelliJ 會列出所有 url Mapping
## ( 2-2 ) 定位當前所在的位置
* Select Opened File
## ( 2-3 ) 查看某支程式的 class 有哪些方法
* Structure 標籤
## ( 2-4 ) 如何同時載入多個 Project
* File → Model from Existing Source
    * 開啟另一個 Project 的 pom.xml 檔
    * 就可以在同一個 IntelliJ 載入兩個 Project

# ( 3 ) 插件
* File → Setteings → Plugins → Marketplace

## ( 3-1 ) Nyan Progress Bar
* 進度條變成彩虹貓
## ( 3-2 ) One Dark theme
* 讓編輯器顏色變豐富
# ( 4 ) [IDEA 修改錯誤提示顏色](https://blog.csdn.net/qq_34120430/article/details/98483186)
* File → Settings → Editor → Color Scheme → General
    * Errors and Warnings → Warning → Effects ( C0C0C0 )
# ( 5 ) [Code With Me](https://www.jetbrains.com/help/idea/code-with-me.html)
* 可用 IntelliJ 共同編輯

# ( 6 ) [Lombok](https://kucw.github.io/blog/2020/3/java-lombok/)
* 透過添加註解，自動生成對應的程式，讓程式碼更簡潔
* 使用條件：
    * pom.xml 中加上 Lombok
    * IntelliJ 中安裝 Lombok 插件
## @Getter、@Setter
* 自動生成 @Getter、@Setter
* Student.java
```java=
package com.example.lombok;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Student {

    Integer id;
    String name;
}
```

## @Data
* @Data
    * 有 @Getter、@Setter 的功能
    * 還會 override toString() 方法
```java=
package com.example.lombok;

import lombok.Data;

@Data
public class Student {

    Integer id;
    String name;
}
```