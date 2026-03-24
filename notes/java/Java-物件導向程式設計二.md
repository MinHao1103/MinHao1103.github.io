Java - 物件導向程式設計(實務應用二)
===

## 過時API (Deprecation)
* 隨著Java版本的更新，標準類別函式庫 (class library)除了會加入新的類別/介面跟其相關的屬性、方法與建構子等等，也會有取代既有的內容
* 在原始碼進行編譯時，若是出現了 “xxx.java uses or overrides a deprecated API” 時，就表示我們使用到了過時的內容
* 在編譯時，可以透過指令 –deprecation 來檢視程式碼裡哪些敘述用到了過時內容
    * 如：javac –deprecation HelloWorld.java
* 像stop()、resume()方法已被列為Deprecated，就是因為容易發生死結問題，所以不建議我們使用

# 數字與文字資料
## 工具類別 - Math
* java.lang.Math類別提供許多數學上實用的方法如亂數、絕對值、平方根、立方根與三角函數等，讓程式設計師在設計時，省去許多數學運算程式碼的撰寫
* 因為java.lang.Math類別所提供的屬性與方法都是類別等級(都是static修飾子)，因此我們只要透過Math類別名稱，即可呼叫所需的屬性或方法，非常方便

![](https://i.imgur.com/HtTW8Ex.png)

```java=
package module21_26;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;

public class TestNumber {
	
	public static void main(String[] args) {
//		System.out.println(1 / 0);     // ArithmeticException (整數相除分母為0的時候)
//		System.out.println(1 / 0.0);   // Java對浮點數處理是參考IEEE754標準, 浮點數相除分母為0時會得到Infinity或-Infinity
//		System.out.println(1.0 / 0);   // 同上
//		System.out.println(1.0 / 0.0); // 同上
//		
//		System.out.println(0 / 0);     // ArithmeticException (整數相除分母為0的時候)
//		System.out.println(0 / 0.0);   // Java對浮點數處理是參考IEEE754標準, 浮點數相除分母分子都為0時會得到NaN
//		System.out.println(0.0 / 0);   // 同上
//		System.out.println(0.0 / 0.0); // 同上
		
//		System.out.println(0.1 + 0.1 + 0.1); // IEEE754對小數值是採二進制的分數與指數作為表示, 所以無法精準處理我們數學上的數值運算
		
//		System.out.println(Long.MAX_VALUE);
		
//		long test = 9223372036854775808L;  // 編譯器會檢查出資料已超過long最大上限
		
//		BigInteger bi = new BigInteger("9223372036854775808"); // 使用BigInteger可以處理超過long的整數
//		System.out.println(bi.add(new BigInteger("2")));       // Immutable物件, 運算後得到的都是新的物件
		
		
		BigDecimal bd2 = new BigDecimal(String.valueOf(0.1));  // 請用字串建構BigDecimal物件來處理小數資料在商業計算上
		
		System.out.println(bd2.add(bd2).add(bd2));
		
		// divide(除)若是結果會是無限循環小數會有例外
//		BigDecimal rate = new BigDecimal(1).divide(new BigDecimal(3));
//		System.out.println(rate);
		
		// 解決: 設定進位即可 (HALF_UP即為四捨五入, 捨棄的部分>= 5才進位)
		BigDecimal rate2 = new BigDecimal(1).divide(new BigDecimal(3),6,RoundingMode.HALF_UP);
		System.out.println(rate2);
	}
}
```
## StringBuffer類別
* String類別不可在原字串所在記憶體位置改變字串內容，StringBuffer類別則在原字串所在記憶體位置改變字串內容 (append, insert, delete, replace)
* 使用StringBuffer類別中的任何方法時，回傳的字串會使用原有的記憶體空間
    * 創建者設計模式 (Builder Pattern)
* StringBuffer字串與String字串不可以比較 (沒有意義)
    * 如：String s1 = new String(“test”);
        * StringBuffer s2 = new StringBuffer(“test”);
        * if (s1 == s2) {…} //false
        * if (s1.equals(s2)) {…} //false
        * 但可以利用toString方法，將處理好的文字轉為String類型

```java=
package module27_33;

public class TestStringBuffer {
	public static void main(String args[]) {

		StringBuffer sb = new StringBuffer("Hello Java ");
		sb.append("StringBuffer!");
		System.out.println(sb);

//		StringBuffer sb = new StringBuffer("Hello  StringBuffer!");
//		sb.insert(6, "Java");
//		System.out.println(sb);

		
//		StringBuffer sb = new StringBuffer("Hello Java StringBuffer!");
//		sb.delete(6,10); System.out.println(sb);
		

		
//		StringBuffer sb = new StringBuffer("Hello Java StringBuffer!");
//		sb.replace(7,10,"AVA"); System.out.println(sb);
		

		/*
		 * 測試用: -StringBuffer類別是在原字串所在記憶體位置改變字串內容 -未覆寫(Override) Object類別的
		 * equals method
		 */

		
//		StringBuffer sb1 = new StringBuffer("AB");
//		System.out.println("sb1= " + sb1);		//AB
//
//		StringBuffer sb2 = sb1.append("CD"); 
//		System.out.println("sb1= " + sb1);		//ABCD 
//		System.out.println("sb2= " + sb2);		//ABCD
//
//		System.out.println(sb1 == sb2); 			//true
//		System.out.println(sb2.equals(sb1));		//true
		

	}
}

```

## StringBuilder類別
* StringBuilder類別是JDK 5的新類別，其用法與StringBuffer類別完全一樣(append, insert, delete, replace)
* 舊類別StringBuffer是thread-safe，新類別StringBuilder則是non-thread-safe
* 使用上，如果不考慮多執行緒的問題就可以使用StringBuilder來提升執行的效率
* 常見於結合BufferedReader的readLine()方法進行文字串接，對執行資源損耗減輕不小

# Regular Expression
* 正規表示法(Regular Expression)就是由許多樣式的符號組成的樣式句，主要功能就是用來比對文字是否符合該規則的要求
* 正規表示法並非Java語法，但為了通過編譯，都是以字串型式存在，等到要執行時，再由特定的編譯器進行處理
* 正規表示法在本課程會簡略說明，有興趣的同學可以在網路上搜尋到更多規則與說明
* java.util.regex.Pattern 裡面有完整的符號說明
![](https://i.imgur.com/DYOvqzz.png)
<br>
![](https://i.imgur.com/CFA0e7I.png)
<br>
![](https://i.imgur.com/W8SsYGw.png)
* 可搭配String類別提供的boolean matches(String regex)方法，回傳結果即為是否符合正則表達式的文字格式
* 若有反斜線，記得要再補一個反斜線(跳脫字元)
* 身分證驗證
```java=
package February22;

import java.util.Scanner;

public class Demo01 {

	public static void main(String[] args) {
		String regex = "^[A-Z][12]\\d{8}$"; //T123456789
	
		Scanner sc = new Scanner(System.in);
		System.out.println("輸入身分證");
		String id = sc.next();
		
		if(id.toUpperCase().matches(regex)) {
			System.out.println("OK");
		}else {
			System.out.println("輸入錯誤!");
		}
	}
}
```

## 字串切割
* 文字切割是程式設計師在處理文字資料時常見的操作，Java也提供了相關的類別與方法，而切割操作也可以結合正則表達式規則使用
* String類別在JDK 1.4時加入了 String[ ] split(String regex)方法，符合運算式的部份就會被當成分隔符號移除掉，剩下部份就會置入於最後回傳的字串陣列裡
* StringTokenizer類別也可以將一個字串分成數個字串處理

```java=
package module27_33;

import java.util.StringTokenizer;

public class TestSplit1 {
	public static void main(String args[]) {

		String str = "This is a book";

		StringTokenizer st = new StringTokenizer(str);
		while (st.hasMoreTokens()) {
			System.out.println(st.nextToken());
		}

		System.out.println("-----------------------");
		
		// 比較
		String[] tokens = str.split(" ");
		for (int i = 0; i < tokens.length; i++) {
			System.out.println(tokens[i]);
		}

		System.out.println("-----------------------");

		String str1 = "That-is-a-pen";

		StringTokenizer st1 = new StringTokenizer(str1, "-");
		while (st1.hasMoreTokens()) {
			System.out.println(st1.nextToken());
		}

		System.out.println("-----------------------");
		
		// 比較
		String[] tokens1 = str1.split("-");
		for (int i = 0; i < tokens1.length; i++) {
			System.out.println(tokens1[i]);
		}

	}
}

```

```java=
package module27_33;

public class TestSplit2 {
	public static void main(String args[]) {

		String str1 = "boo:and:foo";

		String[] tokens1 = str1.split(":"); // { "boo", "and", "foo" }
		for (int i = 0; i < tokens1.length; i++) {
			System.out.println(tokens1[i]);
		}

		System.out.println("-----------------------");

		String[] tokens2 = str1.split("o"); // { "b", "", ":and:f" } //參考String API文件的split方法
		for (int i = 0; i < tokens2.length; i++) {
			System.out.println(tokens2[i]);
		}

		System.out.println("-----------------------");

		String[] tokens3 = str1.split("o+"); // { "b", ":and:f" } //+指任意多個重複的字元
		for (int i = 0; i < tokens3.length; i++) {
			System.out.println(tokens3[i]);
		}

		System.out.println("-----------------------");

		String str = "http://tw.yahoo.com";
		String[] tokens = str.split("[:/.]+"); // { "http", "tw", "yahoo", "com" } //[]指在[]中的任意一個字元
										 
		for (int i = 0; i < tokens.length; i++) {
			System.out.println(tokens[i]);
		}
	}
}
```

# 日期時間資料
![](https://i.imgur.com/VzVmRec.png)

## Calendar類別與相關常數
* 取得今天的日期與現在時間
- Calendar rightNow = Calendar.getInstance(); //Calendar為抽象類別
![](https://i.imgur.com/kMzWqN2.png)

```java=
package module27_33;

import java.util.*;

public class TestCalendar {

	static String[] week = { "日", "一", "二", "三", "四", "五", "六" };

	public static void main(String args[]) {
		Calendar cal = Calendar.getInstance();
		int y = cal.get(Calendar.YEAR);
		int m = cal.get(Calendar.MONTH) + 1;
		int d = cal.get(Calendar.DATE);
		int h = cal.get(Calendar.HOUR_OF_DAY);
		int min = cal.get(Calendar.MINUTE);
		int sec = cal.get(Calendar.SECOND);
		System.out.print("今天是: ");
		System.out.println(y + "年" + m + "月" + d + "日");
		System.out.print("現在是: ");
		System.out.println(h + "點" + min + "分" + sec + "秒");

		int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
		System.out.println("星期" + week[w]);
	}
}

```
## GregorianCalendar類別
* GregorianCalendar 為Calendar的子類別，適合用來設定某一特定的日期時間
* 呼叫建構子即可傳入需要的年、月、日甚至時、分、秒來指定想要的特定時間點
* GregorianCalendar中文可稱為格里曆，是目前世界上各國常用的標準日曆系統，其實也就是我們所謂的”國曆”或”陽曆”的制度
* 像是isLeapYear()方法，就是只有GregorianCalendar類別才有定義的方法，使用此方法就不可以用多型的宣告方式，如：Calendar cal = new GregorianCalendar();
```java=
package module27_33;

import java.util.*;

public class TestGregorianCalendar {
	static String[] week = { "日", "一", "二", "三", "四", "五", "六" };

	public static void main(String args[]) {
		Calendar cal = new GregorianCalendar(2015, Calendar.JANUARY, 15, 0, 0, 0); //到秒 second
//		Calendar cal = new GregorianCalendar(2014, Calendar.JANUARY, 1, 0, 0); //到分 minute
//		Calendar cal = new GregorianCalendar(2014, Calendar.JUNE, 1); //到日 month
		
//		Calendar cal = new GregorianCalendar(); // 現在
		
//		GregorianCalendar cal = new GregorianCalendar();
		int y = cal.get(Calendar.YEAR);
		int m = cal.get(Calendar.MONTH) + 1;
		int d = cal.get(Calendar.DATE);
		int h = cal.get(Calendar.HOUR_OF_DAY);
		int min = cal.get(Calendar.MINUTE);
		int sec = cal.get(Calendar.SECOND);
		System.out.print("日期: ");
		System.out.println(y + "年" + m + "月" + d + "日");
		System.out.print("時間: ");
		System.out.println(h + "點" + min + "分" + sec + "秒");

		int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
		System.out.println("星期" + week[w]);
		
		//與LinkedList一樣，欲使用isLeapYear方法不可使用多型寫法，需使用GregorianCalendar型態建立GregorianCalendar物件
//		boolean isLeap = cal.isLeapYear(y);
//		System.out.println(isLeap);
	
	}
}

```

## Calendar抽象類別
* Calendar類別為抽象類別，所以不能藉由new關鍵字產生實體
* 但可使用該類別的方法public static Calendar getInstance()來獲得一個
    * "Calendar類型" 的物件
* 將於課堂上搭配Calendar原始碼說明該設計目的為何

## 父子同名的Date類別
* 取得今天的日期與現在時間
    * java.util.Date rightNow = new java.util.Date(); //java.util.Date表示某一時間點
* 在Java 1.0.2版中java.util.Date有數種功能，但在Java 1.1開始，其中大部份的方法都已被淘汰(Deprecated)，所以java.util.Date目前功能就是表示某一時間點
* 利用Calendar物件的getTime()方法，可產生java.util.Date物件
* 小心！在做import(引入套件)設定，不要選錯套件了

```java=
package module27_33;

public class TestDate {
	public static void main(String argv[]) {

		// java.util.Date(今天)(現在)(如:Wed Aug 18 22:10:06 CST 2010)
		java.util.Date du = new java.util.Date();
		System.out.println("java.util.Date() = " + du);

		// java.sql.Date(今天)(如:2010-08-18)
		long long1 = du.getTime(); // 也可用long long1 =
									// System.currentTimeMillis();
		java.sql.Date ds1 = new java.sql.Date(long1);
		System.out.println("java.sql.Date()  = " + ds1);

		// java.sql.Date(30天後)(如:2010-09-17)
		long long2 = du.getTime() + 30 * 24 * 60 * 60 * 1000L;
		java.sql.Date ds2 = new java.sql.Date(long2);
		System.out.println("java.sql.Date()  = " + ds2);
	}
}

```

* java.sql.Date為java.util.Date的子類別，用在資料庫的日期欄位資料的對應與格式
* 若是使用建構子產生sql.Date物件的話，參數一定要提供一個為long型別的時間資料
* 此類別只有對應到年、月、日的格式，不包含時、分、秒
* 顯示格式為 yyyy-mm-dd

## 作業系統時間
* 我們使用日期/時間相關API取得的資料，事實上是向執行環境的作業系統取得的系統時間。若是系統時間本身是有問題的，當然就會連帶影響程式執行的結果
* 利用java.util.Date物件的getTime()方法，可得到自1970年1月1日0時0分0秒起的毫秒
* 該時間也被稱為系統起始時間，普遍的說法是為了紀念UNIX作業系統的誕生，所以制定此時間點為開始時間
* 程式裡只要遇到long型別的時間資料，就是代表起始時間開始的總毫秒數

## java.text.DateFormat類別
* 用來格式化 java.util.Date，可設定國別格式與時區，用在國際化
* DateFormat類別與Calendar類別設計相似，也是一個抽象類別，但可以透過
    * getInstance()來取得一個實體進行格式化的動作
* 結合TimeZone與Locale類別，可輕鬆完成日期時間的格式轉換
* 註：TimeZone與Locale均為java.util套件裡的類別

## java.text.SimpleDateFormat類別
* 用來格式化 java.util.Date，可以用更簡便的做法完成日期格式化
* 使用上，利用建構子的呼叫，傳入想要的格式定義與代號完成初始化後，即可用
    * format()得到結果 (注意format()回傳為字串的結果)
* 代號的定義請查閱Java API文件！
* 額外補充：DecimalFormat類別操作使用

## printf方法
* Simple Formatter Output(簡易的格式化輸出：printf)
    - JDK 5新增System.out.printf()方法
    - printf()方法源自於java.util.Formatter類別
    - 比如只需寫出：
        * java.util.Date d = new java.util.Date();
        * System.out.printf(“%tY/%<tm/%<td %<tT%n”, d);
        * 即可輸出：2014/06/13 17:38:20之結果
* 相關代碼定義，也可以從Java API文件裡取得資訊

# System類別

## java.lang.System類別
System類別為Java 1.0即存在，用來對應到系統環境相關的資訊取得或操作，像是取
得系統時間與系統屬性等
• 需注意的是，System類別沒有建構子的宣告，這也代表我們無法產生System類別的
物件實體
• 因此，System類別裡面的所有屬性與方法全部為static等級
Ø 如：System.out、System.gc()等… 

## 系統屬性 (System Property)
系統屬性(System Properties)可以顯示系統的環境資訊
• public static Properties getProperties()：
- 取得所有的系統屬性
- 回傳Properties類別的物件
• public static String getProperty(String key)：
- 回傳特定系統屬性名稱的值
• public static String setProperty(String key, String value)：
- 設定特定的系統屬性
- 要設定系統屬性，也可在程式執行時設定
．java –DmyProperty=myValue HelloWorld
-D與屬性之間不得有任何空白字元

## 垃圾回收機制(Garbage Collector)
通常Java會在記憶體不足時，自動執行垃圾收集的動作
• 如果想要自己強制Java進行垃圾收集時，可透過使用System.gc();的方法
• JVM將記憶體空間最佳化後，就會將控制權還給原來進行中的程式
• 嚴格來講System.gc();只是建議系統應啟動GC，它不一定會完全執行，我們也不知道
GC的正確啟動時間

# Runtime類別
## Runtime類別與Singleton模式
Runtime類別作為代表執行環境，此類別提供的方法讓我們可以取得執行時的資訊
• Runtime實體的取得方式並非是透過 new 關鍵字，而是呼叫該類別提供的一個 static
方法：getRuntime()
• 此種設計為一個最具Singleton模式的代表作！
• Singleton模式：此類別在執行期間，只會有一個物件實體存在，因此也常被稱之為
“單例模式”

# 內部類別
```java=
Java可以將一個類別變成另一個類別的成員，如下：
class OuterClass {
…
class InnerClass {
…
}
…
}
```
Java 1.1之後，除了先前所探討的一般類別與介面之外，額外定義了四種內部類別(inner class)
1. 靜態內部類別 (static inner class)
2. 成員內部類別 (member inner class)
3. 區域內部類別 (local inner class)
4. 匿名內部類別 (anonymous inner class)

## 使用內部類別 (Inner Class)目的
使用內部類別的好處
- 可以直接存取外部類別的私有(private)成員
．例如在視窗程式中，可以使用內部類別來實作一個事件傾聽者 類別(Listener)，
這個視窗傾聽者類別可以直接存取視窗元件，而不用透過參數傳遞
- 另一個好處，當某個slave類別只完全服務於一個master類別時，就可以將之設定為
內部類別，如此使用master類別的人就不用知道slave的存在

## static內部類別特性
內部類別在宣告時可根據功能上的需要加上static修飾字，即成為了一個靜態內部類別
• 需注意的是，因為載入先後順序的關係，所以：
1. static內部類別無法存取外部類別的實體成員，會編譯失敗
2. static內部類別可以不藉由外部類別即可直接存取並實體化物件
(需注意存取修飾關係)

## 成員內部類別特性
內部類別在宣告時，若不是在方法裡，也沒有static關鍵字，即為成員內部類別
• 需注意的是：
1. 因為成員內部類別依附在外部類別的物件實體上，所以必須先產生外部類別的物
件實體才能再產生內部類別的物件實體
2. 成員內部類別除了可以存取外部類別的實體成員外，也同樣可以存取static屬性與
方法

## 區域內部類別特性
宣告在方法裡，即為區域內部類別，跟區域變數一樣，不能宣告存取修飾字
• 需注意的是：
1. 區域內部類別會隨著方法執行完畢後跟著被釋放，所以需注意宣告位置與執行順
序的關係
2. 區域內部類別若是使用了所屬方法的參數或變數時，被使用到的參數或變數都得
宣告為final，也就是不得修改 (原因於課堂說明)
匿名類別多見於對介面的實作，算是一種在撰寫程式碼時，達到簡化語法的設計
• 參考範例說明與實作
• 額外補充：內部類別/匿名類別與.class檔的關係

# 列舉類型Enum
列舉類型(enum)
- 列舉enum適合使用在某些狀況的表現(如：一年有四季、一週有七天)
- enum除了常數設置功能外，還給了您許多編譯時期的檢查功能
• enum的特性
- enum本質上還是一個類別，編譯器會將enum轉成類別，其內部除可定義本身的enum types(列舉子) 外，仍可以有fields、
methods跟constructors，但與一般類別不同的是：
．enum本身不具備類別的某些功能，如繼承
．constructors不能為public和protected，因enum型別不能產生物件
- 必需使用關鍵字 enum 定義列舉型態
．enum型態預設繼承自java.lang.Enum類別
．enum types(列舉子)預設為public static final，而列舉子的值其實是它本身的名稱
- 它可以和泛型以及增強型for迴圈(for-each)很好地搭配
- 它也可以使用在switch控制中

## 列舉(enum)進階使用
更複雜的enum列舉定義：
- 它可以擁有自訂建構子(constructors)，欄位(fields)以及方法 (methods)
- 詳見範例內說明：
EnumeratedType2_1.java
EnumeratedType2_2.java

## 列舉(enum)應用
實際應用例參考：
- 詳見範例額外補充的演進流程，共3組
- PrivateShirt.java + PrivateShirtTest.java
- ColorCode.java + PrivateShirt2.java + PrivateShirtTest2.java
- ColorCode2.java + PrivateShirt3.java + PrivateShirtTest3.java

# Java 8 Lambda語法
## 為何需要Lambda
為何一定要加入Lambda呢？
• (1) 時代在改變
．1995年那時，主要的程式語言都沒有支援closures(閉包)，例如Fortran, C, Pascal
• (2) Java是最後一道防線
．C++也加進去啦
．C#在3.0時也加進去啦啦
．現今新起的語言通通都加啦啦啦
• (3) JSR 335講好要加入Lambda了
![](https://i.imgur.com/QxaVYmA.png)
為什麼要設計成內部類別？
• (1) 讓彼此有邏輯關聯性的類別們能在同一個地方使用
- 設計為內部類別即可直接使用外部類別的private成員，無須再透過參數傳遞，
增加了使用上的便利性
• (2) 增加封裝設計的安全性
- 因為內部類部可以宣告為private，這樣外界就不會知道內部類別的存在，達到
隱藏細節的設計
• (3) 增加程式閱讀性與維護性
- 因為程式碼都在同一隻Java類別裡，所以在調整與閱讀理解上方便
再看看匿名內部類別
• 垂直問題
• 不好處理的語法
• 無法重複使用
• 會產生額外的.class檔
改成Lambda表示式
• 垂直問題解決 (一行完成)
• 乾淨的語法
• 可重複使用
• 不再產生額外的.class檔

## Lambda Expression
![](https://i.imgur.com/s4mGuUk.png)
基本的Lambda表示式
．(int x, int y) -> x + y
．(int x, int y) -> { System.out.println(x + y); }
．(x, y) -> x + y
• 註：區塊(Block)裡是可以多行敘述的 (但lambda風格不建議這麼做)

