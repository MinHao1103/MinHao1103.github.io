Java - 物件導向程式設計(實務應用一)
===

# Exception 物件
* Java程式執行時，發生異常可借助例外處理
    * 發生例外會產生了 Exception 物件
    * 例外處理分成
        * 一般正常處理程序
        * 錯誤處理程序
* 5個關鍵字：
    * **try、catch、finally、throws 與 throw**
* 若沒有支援例外處理的程式語言
    * 錯誤必須自行檢查
    * 需手動處理
    * 可能要用到很多 if … else 判斷
* 適合使用的時機
    * 如資料庫連結失敗
    * 找不到檔案
    * 除以0
    * 參數為空值
    * 參數型態不符
    * 陣列索引超出範圍等

## 例外的類別層級架構
![](https://i.imgur.com/Ul3cSEv.png)
* Error不處理
    * 發生 Error 即中斷
        * 發生原因多跟系統層面、環境有關
* Exception分兩大類
    * Exception 是？ 
        * 指當下而言，不正常的程式在執行期間所觸發的事件
    * RuntimeException 執行時期的例外 ( 不一定要處理 )
        * 稱不必檢查的例外 ( unchecked exceptions )
        * 例如 Runtime Exception 及其子類別
    * 非 RuntimeException 非執行時期的例外 ( 一定要處理 )
        * 也稱為必須檢查的例外 ( checked exceptions )
        * 例如 IOException、SQLException 等
            * 可能會跟程式外界互動造成異常，例如：
                * 資料庫存取，網路傳輸等

## 常見Runtime Exception介紹
![](https://i.imgur.com/K4n67mc.png)
## try – catch - finally
```java=
try {
    正常處理程序程式碼;
} catch (MyException e) {
    錯誤處理程序程式碼;
} catch (Exception e) {
    錯誤處理程序程式碼;
} finally {
    一定要執行的程式碼;
}
```
* try { }
    * 將正常處理程序的程式碼置於 try { }的程式區塊中
        * try { } 程式區塊後應緊接著 catch { } 程式區塊
        * try { } 程式區塊後可接多個 catch { } 程式區塊
* catch (MyException e) { }
    * 捕捉到例外物件時
        * 將錯誤處理程序的程式碼置於 catch { }的程式區塊中
        * 類別位階高者需置於類別位階低者的後面
* finally { }
    * finally { } 是無論發生什麼情況皆會執行的程式區塊
    * 可用來釋放有限的資源，例如
        * 關閉(close)資料庫連線
        * 檔案讀取等
    * finally { } 置於所有catch { }的後面

```java=
public class TestTryCatch {
	public static void main(String[] args) {
		int i = 0;
		String[] strs = { "Hello1", "Hello2", "Hello3" };
		while (i < 4) {
			try {
				System.out.println(strs[i]);
			} catch (ArrayIndexOutOfBoundsException e) {
				System.out.println("1-已超出陣列的長度");
			} catch (Exception e) {
				System.out.println("2-發生Exception");
			}
			i++;
		}
	}
}
```
## 分辨final、finally、finalize
* final
    * 宣告**類別**上，該類別**不能被其他類別繼承**
    * 宣告**方法**上，該方法**不能被覆寫(Override)**
    * 宣告**常數**上，表示**不能改變值**
* finally
    * 用在**Exception**上，表示**無論發生什麼情況皆會執行**
* finalize
    * 是 Object 類別的方法
    * 是垃圾收集器

## throws 關鍵字使用方式
* 在方法定義時，可使用 throws 關鍵字將可能發生的例外
    * 丟出給呼叫此方法的程式去處理，用法如下：
```java=
void method() throws MyException {…}
public static int parseInt(String s) throws NumberFormatException {…}
public int read() throws IOException {…}
public static Connection getConnection() throws SQLException {…}
```
* 對於checked exceptions，在呼叫有 throws 關鍵字的方法時
* 必須將該方法置於下列兩者之一：
    * 將該方法置於 try { } 程式區塊中
    * 將該方法置於定義有 throws 關鍵字的方法中
    * 此為再透過 throw 丟出例外，然後再由下一個呼叫者來處理
![](https://i.imgur.com/9h70q5a.png)
<br>
![](https://i.imgur.com/NG0FtzF.png)
* 使用 throw 關鍵字，將方法內的例外手動丟出
    * throw 「一個可被丟出的物件」
    * 該物件必須是 java.lang.Throwable 類別的子類別
* 方法內部檢查參數資料有誤會用到兩種情境
    * 利用例外產生丟出中斷此方法執行
    * 搭配"自訂例外"使用
* throw 範例
```java=
public class TestThrowDemo {
	public static double method(double i, double j) throws ArithmeticException {
		double result;
		if (j == 0) {
			throw new ArithmeticException("喂! 除到0 ! 算數錯誤!");
		}
		result = i / j;
		return result;
	}

	public static void main(String[] args) {
		try {
			System.out.println(method(1, 0));
		} catch (ArithmeticException e) {
//			System.out.println(e.getMessage());
			// 或
			e.printStackTrace();
		}
	}
}
```
## 例外訊息取得相關方法
* 取得錯誤訊息的方法 (Throwable 類別所定義)
![](https://i.imgur.com/qUoL5QP.png)
### 建議使用printStackTrace
```java=
public class TestStackTrace {

	public static void main(String[] args) {
		try {
			methodC();
		} catch (NullPointerException ne) {
			ne.printStackTrace();
		}
	}
	static void methodC() {
		methodB();
	}
	static void methodB() {
		methodA();
	}
	static String methodA() {
		String str = null;
		return str.toUpperCase();
	}
}
```

## 自訂例外設計
* 要自訂例外類別時
    * 必須繼承其中一個
        * **Throwable*****Exception*****RuntimeException**
* 可利用 throw 關鍵字
    * 將例外拋給負責處理此例外的 catch { } 區塊處理
* 自訂的例外類別，通常會包含兩個建構子
```java=
public 建構子名稱 () { }
public 建構子名稱 (String message) {
    super(message);
} 
```
```java=
public class MyException extends Exception {
	
	public MyException() {
	}
	
	public MyException(String message) {
		super(message);
	}
}
```
* 請建立一個正立方體Cube.java檔案
    * 定義邊長屬性(double length)
    * 建構子(Constructor)
    * getter/setter方法
* 產生一個cube物件並同時傳入邊長值
    * 若是值為0或負數，則拋出自行定義的例外CubeException
    * 並顯示「正立方體邊長不得為0或是負數」的訊息
* 若是傳入邊長的值沒有問題，則顯示體積
```java=
class CubeException extends Exception {
	public CubeException() {
	}

	public CubeException(String message) {
		super(message);
	}
}

class Cube {
	private double length;

	public Cube() {
	}

	public Cube(double length) throws CubeException {
		setLength(length);

	}

	public double getLength() {
		return length;
	}

	public void setLength(double length) throws CubeException {
		if (length > 0) {
			this.length = length;

		} else {
			throw new CubeException("正立方體邊長不得為0或是負數");
		}
	}
	public double getVolume() {
		return Math.pow(length, 3);
	}
}

public class CubeTest {

	public static void main(String[] args) {
		try {
//			Cube c1 = new Cube(0);
//			System.out.println(c1.getVolume());
			
			Cube c2 = new Cube(5);
			System.out.println(c2.getVolume());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```
## 例外拋出方法與覆寫關係
* 子類別**覆寫**父類別定義有 **throws**的方法時
    * **子類別所 throws 的 Exception*****必須與父類別被覆寫方法的 Exception 一樣或是更低階**
```java=
public class BaseClass {
    public void method() throws IOException { }
}

public class OK_A extends BaseClass {
    public void method() throws IOException { 
}

public class OK_B extends BaseClass {
    public void method() { }
}    
    
// 子類別的 Exception 不能比 父類別的 Exception 高階
public class NG_C extends BaseClass {
    public void method() throws Exception { } // Error! 
}
```

### Exception例外 ( override )
* SmartPhone父類別，父類別有 throw 的 Exception

```java=
import java.io.IOException;

public class SmartPhone {

	public void sendSMS() throws IOException {
		System.out.println("發送簡訊");
	}
	
}
```
* IPhone 繼承父類別，Override 時，
    * 子類別 Exception 必須比父類別 Exception 相等或低階

```java=
import java.io.IOException;

public class IPhone extends SmartPhone {
	
	public void sendSMS() throws Exception {
		System.out.println("很潮的發送簡訊");
	}

}
```
```java=
import java.io.IOException;

public class Test {

	public static void main(String[] args) {
		// 多型宣告在編譯階段時, Java利用資料型別(也就是class)來檢查呼叫的方法是否存在
		SmartPhone sp = new IPhone();
		try {
			// 執行子類別方法(也就是dynamic binding)
			sp.sendSMS();
			// 編譯時只檢查到父類別的方法, 所以不可以拋出比父類別還高階的例外, 會導致程式無法處理
		} catch (IOException ie) {
			ie.printStackTrace();
		}
	}
}
```
## 思考三種 Exception 輸出結果
* 1. method()執行一切正常
* 2. method()執行發生Exception1
* 3. method()執行發生Exception3
    * (Exception3與1, 2沒有繼承關係)
```java=
public class ExceptionFlow {
    public static void main(String[] args) {
        try {
            method();
            System.out.println(“output 0”);
        } catch (Exception1 e1) {
            System.out.println(“output 1”);
        } catch (Exception2 e2) {
            System.out.println(“output 2”);
        } finally {
            System.out.println(“output 3”);
        }
        System.out.println(“output 4”);
    } 
}
```
* 1. method()執行一切正常
    * 進入method正常執行，**輸出0**
    * finally一定會執行，**輸出3**
    * 最後try~catch外面的執行，**輸出4**
    * 程式最終輸出結果為 output 0, output 3, output 4
* 2. method()執行發生Exception1
    * 發生Exception例外，就會跳過try的正常執行
    * 進入到Exception e1，**輸出1**
    * finally一定會執行，**輸出3**
    * 因為例外有被處理，**輸出4**
    * 程式最終輸出結果為 output 1, output 3, output 4
* 3. method()執行發生Exception3
    * Exception3與1, 2沒有繼承關係
    * try~catch並沒有Exception3的例外處理
    * finally一定會執行，**輸出3**
    * 因為例外沒有被處理，java會中斷執行，並拋出異常
    * 程式最終輸出結果只有 output 3

### 例外範例思考
```java=
public class ExceptionFlow2 {

	public static void main(String[] args) {
		try {
			method();
		} catch (Exception e) {
			System.out.println("3 - Exception handling in main()");
		}
	}

//	public static void method() throws Exception {
//		try {
//			System.out.println("1 - in method()"); //method正常執行
//			throw new Exception(); //丟出Exception例外
//		} catch (Exception e) {
//			System.out.println("2 - Exception handling in method()"); //catch到例外並處理
//		}
//	}

//	public static void method() throws Exception {
//		try {
//			System.out.println("1 - in method()"); //method正常執行
//			throw new Exception(); // 丟出Exception例外
//		} catch (RuntimeException e) { //因為RuntimeException無法處理Exception的例外，所以再拋給method的try~catch
//			System.out.println("2 - Exception handling in method()");
//		}
//	}

	public static void method() throws Exception {
		try {
			System.out.println("1 - in method()"); // method正常執行
			throw new Exception(); // 拋出Exception
		} catch (Exception e) { //接到Exception
			System.out.println("2 - Exception handling in method()"); // 處理Exception
			throw e; // 拋出Exception給method後，讓method方法裡面的try~catch去處理Exception
		}
	}

}
```

## 例外類型多重捕捉
* Java 7 開始一個catch區塊可以處理一個以上的例外類型
* 可以有效地精簡程式碼過於冗長的撰寫
```java=
public class TestMultiCatch {
	static class ExceptionA extends Exception {
	}

	static class ExceptionB extends Exception {
	}

	static class ExceptionC extends ExceptionB {
	}

	public static void methodA(String exceptionName) throws ExceptionA {
		if (exceptionName.equals("A")) {
			throw new ExceptionA();
		}
	}

	public static void methodB(String exceptionName) throws ExceptionB {
		if (exceptionName.equals("B")) {
			throw new ExceptionB();
		}
	}

	public static void methodC(String exceptionName) throws ExceptionC {
		if (exceptionName.equals("C")) {
			throw new ExceptionC();
		}
	}

	public static void main(String[] args) {
		// before, 一個catch區塊只能處理一個例外類型
		try {
			methodA("A");
			methodB("B");
		} catch (ExceptionB e) {
			e.printStackTrace();
		} catch (ExceptionA e) {
			e.printStackTrace();
		}

		// Java 7, 一個catch區塊可以處理一個以上的例外類型，可以精簡程式碼
		try {
			methodA("A");
			methodB("B");
		} catch (ExceptionA | ExceptionB e) {
//			e.printStackTrace();
			if (e instanceof ExceptionA) {
				// A的處理
			} else if (e instanceof ExceptionB) {
				// B的處理
			}
		}

		// 編譯失敗，catch括號內的例外類型不可有繼承關係
//		try {
//			methodA("A");
//			methodB("B");
//			methodC("C");
//		} catch (ExceptionA | ExceptionB | ExceptionC e) {
//			e.printStackTrace();
//		}
	}
}
```
:exclamation:**對這些例外處理相同的動作可以使用例外多重捕捉**
* 上述發生例外都會捕捉下來，無法辨別是哪一個例外要處理
    * 如果要使用例外多重捕捉再各別辨識處理
    * 就必須要加上 if 以及 instanceof 來判斷

## 改良重新拋出例外的類型檢查
* 編譯器可以更精確地分析需拋出的例外類型
* 在方法宣告的throws子句中可指定更多明確的例外型別
```java=
public class TestImprovedRethrow {
	static class ExceptionA extends Exception { }
	static class ExceptionB extends Exception { }
	// before
	public static void methodA(String exceptionName) throws Exception {
		try {
			if (exceptionName.equals("A")) {
				throw new ExceptionA();
			} else {
				throw new ExceptionB();
			}
		} catch (Exception e) {
			throw e;
		}
	}

	// Java 7
	public static void methodB(String exceptionName) throws ExceptionA, ExceptionB {
		try {
			if (exceptionName.equals("A")) {
				throw new ExceptionA();
			} else {
				throw new ExceptionB();
			}
		} catch (Exception e) {
			throw e;
		}
	}

	public static void main(String[] args) {		
		try {
			methodB("B");
		} catch (ExceptionA | ExceptionB e) {
			e.printStackTrace();
		}
	}
}
```
## 斷言(Assertion)機制 
* 需求確認 -> 設計規劃 -> 開發 -> 測試 -> 佈署上限
* 什麼是Assertion？
    * 用來維護程式使之更堅固(robust)，零錯誤
    * Assertion通常用來檢查一些關鍵的值，避免這些值有錯誤時，讓程式無法繼續執行
* Assertion語法
    * assert <boolean_expression>：
    * 當boolean_expression為 false 時，會丟出AssertionError，程式即中斷
* assert <boolean_expression>：<detail_expression>;
    * 當boolean_expression為 false 時，
    * 會執行後面的運算式，最常用為字串，以說明錯誤的原因
        * 如：assert obj != null : “這物件不得為null”; 
        * 如：assert k != 0：”k值不得為0”;
* 執行：java –ea TestAssertion
    * ea：enable assert
* eclipse 啟動 assertion
![](https://i.imgur.com/FuLYwgd.png)

# File類別
* java.io.File 類別：
    * 可以用此類別來建立、移除檔案，或變更檔案的屬性…等
* 使用 File 建構子時：
    * 並未實際在檔案系統中建立檔案
    * 也未讀寫或修改該檔案內容
    * 該檔案可以已經存在或事後才建立

## File類別建構子
```java=
public File(String pathname)
    File myDir = new File(“C:\\myDir”);
    File myFile = new File(“C:\\myDir\\myFile.txt”);
public File(String parent, String child)
    File myFile = new File(“C:\\myDir”, “myFile.txt”);
public File(File parent, String child)
    File myDir = new File(“C:\\myDir”);
    File myFile = new File(myDir, “myFile.txt”);
```
:exclamation: 以上檔案路徑內的 【\\\】也可以使用【/】取代

## File類別常用方法 (一)
![](https://i.imgur.com/E1W7Z1d.png)
* :exclamation: list ( )：方法只對目錄操作有效
```java=
public class TestDir {

	public static void main(String[] args) {
		File dir = new File("c:\\javawork");     //建立目錄物件，只是在java產生物件
	    String contents[] = dir.list();          //取得目錄中的目錄、檔案陣列 
	         
	    if (!dir.isDirectory())
	         System.out.println("Not a directory");
	    else if (contents.length == 0)
	         System.out.println("目錄 "+ dir.getName() +" 內無檔案");
	    else 
	         for (int i = 0; i < contents.length; i++)
	         System.out.println(contents[i]);    //列出目錄中的目錄、檔案
	}
}
```
* 資料夾測試
```java=
import java.io.File;

public class TestFile {
	static void p(String s) {
		System.out.println(s);
	}

	public static void main(String args[]) {

		File f1 = new File("C:\\eclipse"); // 目錄物件
		p("File Name: " + f1.getName()); // 目錄名稱
		p("Path: " + f1.getPath()); // 一開始宣告時給的路徑
		p("Abs Path: " + f1.getAbsolutePath()); // 絕對路徑
		p("Parent: " + f1.getParent()); // 目前的路徑的上一個
		p(f1.exists() ? "exists" : "does not exist"); // 有存在檔案系統 exists
		p(f1.canWrite() ? "is writeable" : "is not writeable"); // 能不能修改 is writeable
		p(f1.canRead() ? "is readable" : "is not readable"); // 能不能讀取 is readable
		p(f1.isDirectory() ? "is a directory" : "is not a directory"); // 是不是資料夾 is a directory
		p(f1.isFile() ? "is a file" : "is not a file"); // 是不是檔案 is not a file
		p(f1.isAbsolute() ? "is absolute" : "is not absolute"); // 是不是絕對路徑 is absolute
		p("File last modified: " + f1.lastModified()); // 時間，電腦看得懂的時間 
		p("File size: " + f1.length() + " Bytes"); // 只對檔案的操作才有效果
	}
}
```
* 檔案測試
```java=
import java.io.File;
import java.util.Date;

import module21_26.NewThread;

public class TestFile {
	static void p(String s) {
		System.out.println(s);
	}

	public static void main(String args[]) {

		File f1 = new File("C:\\eclipse\\base_Java.pdf"); // 目錄物件
		p("File Name: " + f1.getName()); // 目錄名稱
		p("Path: " + f1.getPath()); // 一開始宣告時給的路徑
		p("Abs Path: " + f1.getAbsolutePath()); // 絕對路徑
		p("Parent: " + f1.getParent()); // 目前的路徑的上一個
		p(f1.exists() ? "exists" : "does not exist"); // 有存在檔案系統 exists
		p(f1.canWrite() ? "is writeable" : "is not writeable"); // 能不能修改 is writeable
		p(f1.canRead() ? "is readable" : "is not readable"); // 能不能讀取 is readable
		p(f1.isDirectory() ? "is a directory" : "is not a directory"); // 是不是資料夾 is not a directory
		p(f1.isFile() ? "is a file" : "is not a file"); // 是不是檔案 is a file
		p(f1.isAbsolute() ? "is absolute" : "is not absolute"); // 是不是絕對路徑 is absolute
		p("File last modified: " + f1.lastModified()); 
		System.out.println(new Date(f1.lastModified())); // 獲得最近一次修改的時間
		p("File size: " + f1.length() + " Bytes"); // 只對檔案的操作才有效果

	}
}
```
## File類別常用方法 (二)
![](https://i.imgur.com/4IfHoKc.png)
```java=
import java.io.File;
import java.io.IOException;

public class Demo01 {

	public static void main(String[] args) throws IOException {
		// 建立資料夾
		File dir01 = new File("D:\\Test");
		dir01.mkdir();
		
		// 刪除資料夾
		if(dir01.delete()) {
			System.out.println("OK");
		}else {
			System.out.println(("Failed"));
		}
		
		// 若要建立資料夾及子資料夾
		File dir02 = new File("D:\\Test\\abc");
		dir02.mkdirs();
		
		// 前提：必須要有Test\\abc資料夾，找到路徑後才能createNewFile
		File dir03 = new File("D:\\Test\\abc\\test.txt");
		dir03.createNewFile();
        
		// 取得絕對路徑
		File file = new File("");
		System.out.println(file.getAbsolutePath());
	}
}
```

## 檔案**絕對路徑**與**相對路徑** 表示
* 絕對路徑：從 **"根目錄"** 開始表示
    * 優點:好寫好理解
    * 缺點:容易因為更換環境而跟著調整
* 相對路徑：從 **"目前的位置"** 開始表示
    * 優點:彈性好
    * 缺點:理解上不直覺
* “.”代表當前路徑，“.\.”代表上一層路徑
    * 可用絕對路徑或相對路徑表示一個檔案或資料夾的位置

## 循序存取媒體 I/O
### 資料流處理觀念
* 程式透過資料流(Stream)讀取一連串資料
    * 來源可以是檔案、記憶體或是網路
![](https://i.imgur.com/hw5ZvvZ.png)

* 程式也能透過資料流(Stream)將資料寫出到目的地
    * 來源可以是檔案、記憶體或是網路
![](https://i.imgur.com/QJsnluf.png)

* 資料流處理觀念圖示
![](https://i.imgur.com/Jpddbv6.png)

### 資料流API

* InputStream / OutputStream 及 Reader / Writer
    - Java的資料流類別內建於 **四個抽象父類別**
* InputStream / OutputStream 型資料流 (位元資料流 JDK1.0)
    - 存取是以8bits為基礎的byte，處理中文有困難
    - Unicode 字元用 2 bytes 儲存
* Reader / Writer 型資料流
    - 存取是以16bits為基礎的char來處理Unicode (字元資料流 JDK1.1)
* I/O Stream 與 Reader / Writer 之間的資料傳輸
    - 網路 I/O 與 Console I/O是以byte為基礎的I/
* :exclamation:Unicode 字元一律使用 Reader / Writer
* :exclamation:非 Unicode 字元一律使用 InputStream / OutputStream

### 輸入父類別 ( InputStream、Reader )
* InputStream
    * int read ( ) 
        * 回傳值為檔案裡下一個byte資料，**如回傳 -1 代表已到檔案末端**
    * int read ( byte[] buf )
        * 讀取檔案中下一段 ( buf.length 個 byte )資料，並放入陣列 buf 裡
        * 回傳值為實際讀取到的 byte 數量，如回傳 -1 代表已到檔案末端
    * int read ( byte[] buf, int offset, int length )
        * 讀取檔案中下一段(buf.length個byte)資料，並放入陣列buf裡，從offset開始的位置
        * 回傳值為實際讀取到的byte數量，如回傳 -1 代表已到檔案末端
* Reader (方法說明同 InputStream，byte資料改為 char 字元資料)
    * int read ( )
    * int read ( char[] cbuf )
    * int read ( char[] cbuf, int offset, int length )

### 輸出父類別 ( OutputStream、Writer )
* OutputStream
    * void write ( int b ) 
        * 將b的位元組(byte)資料寫至目的地
    * void write ( byte[] buf )
    * 將陣列 buf 裡所有的位元組(byte)資料寫至目的地
    * void write(byte[] buf, int offset, int length)
    * 將陣列 buf 中從 offset 位置開始的 length 個位元組(byte)資料寫至目的地
* Writer (方法說明同OutputStream，byte資料改為char字元資料)
    * void write ( int c )
    * void write ( char[] cbuf )
    * void write ( char[] cbuf, int offset, int length )

![](https://i.imgur.com/ti47X2k.png)
* InputStream、OutputStream
```java=
import java.io.*;

public class CopyBytes {
	public static void main(String[] args) throws IOException {
		File inputFile = new File("farrago.txt");
		File outputFile = new File("outagain.txt");

		FileInputStream in = new FileInputStream(inputFile);
		FileOutputStream out = new FileOutputStream(outputFile);
		int c;

		while ((c = in.read()) != -1) { // 讀到檔案的尾端時,read()會回傳-1
			out.write(c);
			System.out.print((char) c);
			System.out.flush();
		}
		in.close();
		out.close();
	}
}

```
* Reader、Writer
```java=
import java.io.*;

public class Copy {
	public static void main(String[] args) throws IOException {
		File inputFile = new File("farrago.txt");
		File outputFile = new File("outagain.txt");

		FileReader in = new FileReader(inputFile);
		FileWriter out = new FileWriter(outputFile);
		int c;

		while ((c = in.read()) != -1) { // 讀到檔案的尾端時,read()會回傳-1
			out.write(c);
			System.out.print((char) c);
			System.out.flush();
		}

		in.close();
		out.close();
	}
}

```
:exclamation:**.close()，檔案傳輸結束後，一定要釋放資源，避免佔存空間**
* 因為 InputStream、OutputStream 是以 8bits 為基礎的 byte
* 而 char 是以 16 bits = 2 bytes 表示
* 轉換上可能會有存取問題
* 所以 Java 提供 Reader、Writer 的類別
* 來專門處理以 16 bits 為基礎的 char 的 Unicode

### 使用 FileInputStream、FileOutputStream 時, 解決中文碼印出問題
```java=
import java.io.*;

public class CopyBytes {
	public static void main(String[] args) throws IOException {
		File inputFile = new File("farrago.txt");
		File outputFile = new File("outagain.txt");

		FileInputStream in = new FileInputStream(inputFile);
		FileOutputStream out = new FileOutputStream(outputFile);
		int c;

//		while ((c = in.read()) != -1) { // 讀到檔案的尾端時,read()會回傳-1
//			out.write(c);
//			System.out.print((char) c);
//			System.out.flush();
//		}

		// 使用FileInputStream,FileOutputStream 時, 解決中文碼印出問題
		int i = 0;
		byte ch[] = new byte[(int) inputFile.length()];
		while ((c = in.read()) != -1) {
			out.write(c);
			ch[i++] = (byte) c;
		}
		System.out.print(new String(ch));
		System.out.flush();

		in.close();
		out.close();
	}
}
```

## I/O Chain
* 重要原則
* I/O 鍊 (I/O Chain)
    * 建立一個 I/O 前**必須先用低階 I/O 類別來存取資料**(如檔案)
    * 之後**再使用高階 I/O 類別來控制低階 I/O 類別的動作**
    * 此層層架構稱之為I/O鍊 (I/O Chain)
* 高階 I/O 類別可再與其它高階 I/O 類別連結
* **輸入類**的資料流只能與**輸入類**的類別相連接
* **輸出類**的資料流只能與**輸出類**的類別相連接

### InputStream Chain ( 低階 -> 高階 )

* 程式片段 ( 輸入 )
* 1.建立一個檔案輸入流 (低階)
    * FileInputStream fis = new FileInputStream(“輸入檔案名”);
* 2.建立一個高階I/O物件BufferedInputStream bis
    * 並連結至fis，將 fis 放到緩衝區
    * BufferedInputStream bis = new BufferedInputStream(fis);
* 3.**從緩衝區讀取資料，以減少CPU的I/O時間**
    * bis.read ( ) ;
:exclamation: **資源關閉順序：越晚建立，越早關閉**

* 程式架構圖
![](https://i.imgur.com/X9x8gDu.png)
* 目前程式執行速度比硬體執行速度快 N 倍
* 所以將 FileinputStream 低階資料流加上緩衝機制 (BufferedInputStream)
* 提升效能，減少CPU的I/O時間
* 範例
```java=
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class InputStreamChain {
	public static void main(String args[]) {
		int i;
		try {
			
			long startTime = System.currentTimeMillis();
			
//			FileInputStream fis = new FileInputStream("D:\\Test.pdf");
//			while ((i = fis.read()) != -1)
//				System.out.print((char) i);
//			fis.close();

			FileInputStream fis = new FileInputStream("D:\\Test.pdf");
			BufferedInputStream bis = new BufferedInputStream(fis);
			while ((i = bis.read()) != -1)
				System.out.print((char) i);

			bis.close();
			fis.close();
			
			long endTime = System.currentTimeMillis();
			
			System.out.println((endTime - startTime /1000.0 )+ "Seconds.");

		} catch (IOException e) {
			
		}
	}
}
```

### OutputStream Chain ( 高階 -> 低階 )
* 程式架構圖
![](https://i.imgur.com/Mph8FDw.png)
* 範例：**此範例是直接覆寫檔案，可能會造成資料遺失，要小心使用**
```java=
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;

public class OutputStreamChain {
	public static void main(String args[]) {
		try {
			FileOutputStream fos = new FileOutputStream("c:\\javawork\\hello.txt");

			BufferedOutputStream bos = new BufferedOutputStream(fos);

			PrintStream ps = new PrintStream(bos);

			ps.println("Hello World 世界你好 !");

			ps.close();
			bos.close();
			fos.close();
		} catch (IOException e) {
			System.err.println(e);
		}
	}
}
```
:exclamation: **資源關閉順序：越晚建立，越早關閉**

### 緩衝 ( Buffer ) 區
```java=
package module06_12;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReaderChain {
	public static void main(String args[]) {
		int i;
		try {

		// 基礎Reader 取字元用法
//             FileReader fr = new FileReader("c:\\javawork\\hello.txt");
//             while ((i = fr.read()) != -1)
//                 System.out.print((char)i);
//             fr.close();

		// 使用 BufferReader 緩衝，從緩衝區讀取資料，以減少 CPU 的 I/O 時間
//             FileReader fr = new FileReader("c:\\javawork\\hello.txt");
//             BufferedReader  br  =   new  BufferedReader(fr) ;
//             while ((i = br.read()) != -1)
//                 System.out.print((char)i);
//             
//             br.close();   
//             fr.close();

		// 最常使用的做法
		// BufferReader 的 readLine ，可以直接讀取一行 
		    String str;
		    FileReader fr = new FileReader("c:\\javawork\\hello.txt");
		    BufferedReader br = new BufferedReader(fr);
		    while ((str = br.readLine()) != null){
			    System.out.println(str);
                   }
		    br.close();
		    fr.close();

		} catch (IOException e) {
		}
	}
}
```

## Reader / Writer 資料流
* Reader / Writer用法與 I/O Stream 類似
    - Reader 類別只能與 Reader 類別相連接
    - Writer 類別只能與 Writer 類別相連接
    - 高階I/O類別亦可多層疊堆
        - **使用高階I/O類別前，必須有一個低階I/O類別先處理媒體相關的存取動作**
* Reader / Writer 與 I/O Stream 的差別 
    * 是專門用於Unicode的字元處理

### Reader Chain
* 1. 建立一個檔案輸入流
    * FileReader fr = new FileReader(“輸入檔案名”);
* 2. 建立一個高階I/O物件BufferedReader br, 並連結至fr，將fr放到緩衝區
    * BufferedReader br = new BufferedReader(fr);
* 3. 從緩衝區讀取資料，以減少CPU的I/O時間
    * br.readLine();
* 程式架構圖
![](https://i.imgur.com/vI9reSH.png)

### Writer Chain
```java=
FileWriter fw = new FileWriter(“輸出檔案名”);
BufferedWriter bw = new BufferedWriter(fw);
PrintWriter pw = new PrintWriter(bw);
pw.println(“Hello World”);
pw.close();
bw.close();
fw.close();
```
* 程式架構圖
![](https://i.imgur.com/fwmyctd.png)

## InputStreamReader、OutputStreamWriter 類別
* 網路 I/O 與 Console I/O
    - 因為網路 I/O 與 Console I/O 是**位元資料流**
        - 所以 Reader / Writer 不能夠直接存取網路 I/O 與Console I/O
        - 需要進行資料流的轉換，才能順利處理對應的資料內容
* InputStreamReader 類別
    - An InputStreamReader is a bridge from byte streams to character streams
* OutputStreamWriter 類別
    - An OutputStreamWriter is a bridge from character streams to byte streams

## Unicode 與 UTF 關係 ( 補充參考 )
* Unicode又叫統一碼、萬國碼、單一碼、標準萬國碼
    * 目的
        * 解決世界各國文字編碼問題
        * 中文字在不同的地區(中國、香港、台灣)的寫法不大一樣
        * 當時編碼上被歸類成不同套，所以產生不同內碼轉換表
            * 如：GB2312、GBK、BIG5等。
* Java對於文字都是採用Unicode編碼
    * Unicode 對於任何字元都是使用 2 bytes儲存
    * 英文語系國家每個字元佔用 2 個位元組太浪費了
    * 因為英語、數字、符號這些在 ASCII 只使用了 1 byte
    * 所以本來用 2 bytes 的 Unicode，為了節省儲存空間
    * 發展了Unicode的內部轉換格式
    * 稱為 ( Unicode Transformation Format，簡稱為UTF )
* 基本 7 位 ASCII 文字的 Unicode 文件
    * 每個字元都使用 2 bytes 的原 Unicode 編碼傳輸
    * 第一位元組的8位始終為0。這就造成了比較大的浪費。
    * 對於這種情況，可以使用UTF-8來進行演算，將字元轉換成一種可長可短的編碼
    * 這樣可能節省大量的容量。對於網際網路傳輸資料節省頻寬
    * 所以成了電子郵件、網路檔案傳送最愛的一種編碼格式。

### Unicode to UTF-8 ( 補充 )
- '我' 這個字元在Java裡面轉成 int 得到的整數為
    - 25105 (十進位表示) 轉成 Unicode 的十六進位表示為 \u6211
    - 它是如何對應到UTF-8的 E6 88 91 ? 
    * 1. 利用小算盤將 6211 轉成二進位表示： 110001000010001， 但由於只有15個0與1， 所以需要在最左邊補一個0。(Unicode編碼只要未滿16bits都是補0)
    * 2. 依照java API中，java.io.DataInput介面的說明將 0110001000010001 拆成三組位元 0110 001000 010001 
    * 3. 010001 的前面補 10 成為 10010001，001000 的前面補 10 成為 10001000，0110 的前面補 1110 成為 11100110 就會得到下面三個位元組： 11100110 10001000 10010001 
    * 4. 以上三個位元組對應的十六進位表示就是： E6 88 91

## 簡易網路爬蟲
### 爬蟲是什麼
* 又稱為 Web Crawler 或 Spider 
    * 藉由程式執行自動瀏覽網路資料內容或取得資料
    * 最早用來建立網路資料索引，以方便搜尋引擎執行的效能優化
    * 現今多應用於資料爬取。
* 爬取資料行為是個灰色地帶
    * 因為藉由程式偽裝成使用者(人)而取得該網站或 web server 所提供的資料
    * 所以在商業用途上需多加確認與告知
* HTML標籤結構觀念要清楚！
    * 因為Java語言的特性，所以單純地使用 Java API 進行爬蟲功能實現
    * 遇到動態網頁或是 Javascript 渲染過的內容，在爬取的支援性較差
    * 需要再搭配第三方套件或工具實現較為方便

### java.net
* java.net 套件已被包在 Java 標準 API 裡，有許多對於網路程式設計所需要的介面、類別與相關方法，如 URL, HttpURLConnection, Socket等。
    * URL 類別讓我們在 Java 程式建立一個對應指定的網路URL資源的物件
    * HttpURLConnection 類別可以讓我們藉由 http 通訊協定
        * 對指定的網路URL資源進行存取設定與資料的輸入與輸出 (結合資料流相關類別完成)

### Java 爬蟲範例
```java=
import java.io.*;
import java.net.*;

public class GetNatalieFromInternet {

	public static void main(String[] args) {
		File dir = new File("C:\\Pictures");
		if (!dir.exists()) {
			dir.mkdir();
		}
		
		for (int i = 1; i <= 42; i++) {
			String url = "http://www.space-fox.com/wallpapers/celebs/natalie-portman" + 
					"/natalie_portman_" + i	+ ".jpg";
			String filename = url.substring(url.lastIndexOf("/") + 1);
			File file = new File(dir, filename);
			try {
				URL myURL = new URL(url);
				HttpURLConnection conn = (HttpURLConnection) myURL.openConnection();
				InputStream is = conn.getInputStream();
				FileOutputStream fos = new FileOutputStream(file);

				System.out.println("Wallpaper: " + filename + " kick-off!");

				int length = 0;
				byte[] b = new byte[4096];
				while ((length = is.read(b)) != -1) {
					// b: 代表要輸出的byte陣列 (資料都放在裡面了)
					// 0: 代表從這個陣列的第一個元素開始輸出 (索引值)
					// length: 代表要輸出的資料量
					fos.write(b, 0, length);
					fos.flush(); // 強制將緩衝區裡未滿的資料進行輸出
				}
				
				fos.close();
				is.close();
				System.out.println(filename + " Done!");

			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
```

## 文字主控介面I/O
### Console I/O
* System.in、System.out、System.err
    * 三個不同資料流，不需 new 宣告即可使用
* System.in
    * 標準輸入資料流，預設是鍵盤
    * 為InputStream的物件
* System.out
    * 標準輸出資料流，預設是螢幕
    * 為PrintStream的物件
* System.err
    * 標準錯誤輸出資料流，預設是螢幕
    * 為PrintStream的物件

### Scanner類別(JDK 5)
* 鍵盤輸入範例
    - 如JDK 5之前的版本要從鍵盤讀入整數值的作法
        * InputStreamReader isr = new InputStreamReader(System.in);
        * BufferedReader br = new BufferedReader(isr);
        * String s = br.readLine();
        * int n = Integer.parseInt(s);
    - JDK 5以後的版本可改寫成?
        * Scanner sc = new Scanner(System.in);
        * String s = sc.next();
        * 【int n = sc.nextInt();】

### 資料流功能補充
* 抽象父類別 InputStream 類別提供 int available() 方法
    * 以取得輸入資料流的資料大小(number of bytes)
    * 輸出父類別 OutputStream 與 Writer 提供 void flush()方法
        * 可以強制將緩衝區裡未滿的資料進行輸出，避免造成資料遺失的情況
* 建構子 FileOutputStream(String name, boolean append)
* 建構子FileWriter(String fileName, boolean append)
    - 當append = false時，新增的資料將覆蓋/取代原始資料(預設為false)
    - 當append = true時，新增的資料將附加於原始資料之後

# 物件輸入與輸出
* 將物件寫出與讀入
    - 寫出物件：使用ObjectOutputStream類別寫出物件
    - 讀入物件：使用ObjectInputStream類別讀入物件
* 將物件寫出與讀入的建構子：
    - 寫出：ObjectOutputStream(OutputStream out) throws IOException
    - 讀入：ObjectInputStream(InputStream in) throws IOException
        * 看到建構子參數要再傳入資料流，代表它是"高階資料流"
* 將物件寫出與讀入的方法：
    - 寫出：void writeObject(Object obj) throws IOException
    - 讀入：Object readObject() throws IOException, ClassNotFoundException
        - ClassNotFoundException 沒有強制規定要寫在同個Java檔
        - 只要Java再classpath(類別路徑)找到即可
* 物件讀入注意事項：
    - 物件讀入順序必須與物件寫出順序相同
    - Object readObject()的回傳型態為Object，必須自行強迫轉型為原來寫出時的物件型態

## 序列化(Serializable)
### java.io.Serializable ( 空介面 ) 
- 物件是動態產生的，欲將物件永久儲存時，稱做persistence (永續)
- 欲將某物件的資料儲存(寫出)到OutputStream(檔案或socket)時，該物件必須實作Serializable空介面
    * 註1：Java類別預設是不實作Serializable介面的
    * 註2：Java類別實作Serializable介面後，其子類別將會自動實作Serializable介面
    * 註3：若是輸出的物件資料裡面還有物件，這些物件也都要實作Serializable介面
- 宣告為 transient 與 static 的資料成員不會被序列化
    * 如果某資料成員不想被serialized，程式設計者可以自行(主動)加上transient修飾子
    * 因為宣告為 static 的變數與方法，不是由任何此類別的物件單獨擁有，而是由屬於此類別所有物件共同擁有

### 序列化圖解(Serializable)
![](https://i.imgur.com/PL8GchS.png)
* 範例
```java=
import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class Book implements Serializable {
//	private static final long serialVersionUID = 8315449942815314809L;
	
	private String name;
	private double price; // 如果加上transient，該屬性不會加入序列化
	private String author;

	public Book(String name, double price, String author) {
		this.name = name;
		this.price = price;
		this.author = author;
	}

	public void show() {
		System.out.println("書名: " + name);
		System.out.println("定價: " + price);
		System.out.println("作者: " + author);
	}
}

public class ObjectInOut {
	public static void main(String[] args) throws Exception {
		File file = new File("bookInfo.ser");
		Book[] books = new Book[2];
		books[0] = new Book("Java程式設計", 580.0, "張搧風");
		books[1] = new Book("JSP程式設計", 650.0, "黃會紅");
		FileOutputStream fos = new FileOutputStream(file);
		ObjectOutputStream oos = new ObjectOutputStream(fos);
		for (int i = 0; i < books.length; i++)
			oos.writeObject(books[i]);
		oos.close();
		fos.close();
		
		FileInputStream fis = new FileInputStream(file);
		ObjectInputStream ois = new ObjectInputStream(fis);
		System.out.println(file.getName() + "檔案內容如下: ");
		System.out.println("--------------------");
		try {
			while (true) {
				((Book) ois.readObject()).show();
				System.out.println("--------------------");
			}
		} catch (EOFException e) {
			System.out.println("資料讀取完畢！");
		}
		ois.close();
		fis.close();
	}
}

```
* 新增 isbn：**Exception in thread "main" java.lang.Error: Unresolved compilation problems:**
```java=
import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class Book implements Serializable {
//	private static final long serialVersionUID = 8315449942815314809L;

	private String name;
	private double price; // 如果加上transient，該屬性不會加入序列化
	private String author;
	// 新增 isbn
	private String isbn;

	public Book(String name, double price, String author, String isbn) {
		this.name = name;
		this.price = price;
		this.author = author;
		this.isbn = isbn;
	}

	public void show() {
		System.out.println("書名: " + name);
		System.out.println("定價: " + price);
		System.out.println("作者: " + author);
		// 新增isbn
		System.out.println("isbn: " + isbn);
	}
}

public class ObjectInOut {
	public static void main(String[] args) throws Exception {
		File file = new File("bookInfo.ser");
		Book[] books = new Book[2];
		books[0] = new Book("Java程式設計", 580.0, "張搧風");
		books[1] = new Book("JSP程式設計", 650.0, "黃會紅");
		FileOutputStream fos = new FileOutputStream(file);
		ObjectOutputStream oos = new ObjectOutputStream(fos);
		for (int i = 0; i < books.length; i++)
			oos.writeObject(books[i]);
		oos.close();
		fos.close();

		FileInputStream fis = new FileInputStream(file);
		ObjectInputStream ois = new ObjectInputStream(fis);
		System.out.println(file.getName() + "檔案內容如下: ");
		System.out.println("--------------------");
		try {
			while (true) {
				((Book) ois.readObject()).show();
				System.out.println("--------------------");
			}
		} catch (EOFException e) {
			System.out.println("資料讀取完畢！");
		}
		ois.close();
		fis.close();
	}
}

```

* 當物件內容被改變時，會導致無法序列化
* 解決方法：定義 seriaLVersionUID 的值
* 宣告 serialVersionUID 讓反序列化相容性提高
* 不會因為類別內容改變而導致無法取得先前輸出的物件
```java=
import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class Book implements Serializable {
	private static final long serialVersionUID = 8315449942815314809L;

	private String name;
	private double price; // 如果加上transient，該屬性不會加入序列化
	private String author;
	// 新增 isbn
	private String isbn;

	public Book(String name, double price, String author, String isbn) {
		this.name = name;
		this.price = price;
		this.author = author;
		this.isbn = isbn;
	}

	public void show() {
		System.out.println("書名: " + name);
		System.out.println("定價: " + price);
		System.out.println("作者: " + author);
		// 新增isbn
		System.out.println("isbn: " + isbn);
	}
}

public class ObjectInOut {
	public static void main(String[] args) throws Exception {
		File file = new File("bookInfo.ser");
		Book[] books = new Book[2];
		books[0] = new Book("Java程式設計", 580.0, "張搧風","ISBN01");
		books[1] = new Book("JSP程式設計", 650.0, "黃會紅","ISBN02");
		FileOutputStream fos = new FileOutputStream(file);
		ObjectOutputStream oos = new ObjectOutputStream(fos);
		for (int i = 0; i < books.length; i++)
			oos.writeObject(books[i]);
		oos.close();
		fos.close();

		FileInputStream fis = new FileInputStream(file);
		ObjectInputStream ois = new ObjectInputStream(fis);
		System.out.println(file.getName() + "檔案內容如下: ");
		System.out.println("--------------------");
		try {
			while (true) {
				((Book) ois.readObject()).show();
				System.out.println("--------------------");
			}
		} catch (EOFException e) {
			System.out.println("資料讀取完畢！");
		}
		ois.close();
		fis.close();
	}
}
```

## I/O整理
* 一個無限制的鍊結機制讓你可混合一些類別來達成任何想要的I/O功能
* 可產生一些自己加強的資料類別
    * 以便在一個輸入鍊或輸出鍊其中的任何地方做插入
* I/O奠定將來網路程式設計的基礎
* 物件永續性與序列化觀念奠定將來RMI (遠端方法呼叫 – Remote Method Invocation)分散式運算基礎
* I/O 工具使用
    * 想好是做輸入還是輸出
    * 資料是否為Unicode字元
    * 源頭或目的的地形式
    * 串接高階資料流

## Java I/O API
負責位元資料的輸入 / 輸出工作
• 灰底者為Data Sink
![](https://i.imgur.com/M2eYU9n.png)

![](https://i.imgur.com/3pSPlLO.png)

## Java節點資料流
![](https://i.imgur.com/gFXpjXB.png)
* 用來讀取與寫出記憶體內char陣列資料 (後者為byte陣列資料)
    - CharArrayReader 與 CharArrayWriter
    - ByteArrayInputStream 與 ByteArrayOutputStream
* 用來讀取與寫出記憶體內String物件內的字元
    - StringReader與StringWriter
* 管線資料流：提供有關執行緒的通訊功能
    - PipedReader 與 PipedWriter
    - PipedInputStream 與 PipedOutputStream
* 檔案資料流：用來存取檔案系統內容
    - FileReader 與 FileWriter
    - FileInputStream 與 FileOutputStream

## Java處理資料流
![](https://i.imgur.com/eifVFGc.png)

# 集合 ( java.util )
* 集合物件
    - 指一群相關聯的資料，集合在一起組成一個物件
    - 裡面的資料稱為元素( element )
* Java的集合物件分兩大類
    * Collection 介面
        - 可持有各自獨立的物件
        - 且存放單一物件集合架構的根介面
    * Map 介面
        - 持有成對的 key-value 物件
## 集合架構圖
* 集合
    * Collection 家族 ( 持有各自獨立的物件 )
        * Set ( 無特定順序，不允許重複 )
            * HashSet ( 無順序，不允許重複 )
            * TreeSet ( 有大小排序特性 )
        * List ( 有特定順序，允許重複 )
            * ArrayList
            * LinkedList
        * Queue
            * PriorityQueue
            * Deque
            * ArrayDeque
    * Map 家族 ( 持有成對的 key-value 物件 )
        * Hashtable
        * HashMap
        * TreeMap ( 有大小排序特性 )
## Set ( Collection 家族 ) 相關物件常用方法
![](https://i.imgur.com/evqS6k4.png)

:exclamation: **Set 沒有 get 方法可用**
### HashSet
* 無順序，不允許重複
```java=
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class TestHashSet {

	public static void main(String[] args) {
		Set set = new HashSet();
		set.add(new Integer(12));
		set.add(new Long(34L));
		set.add(new Double(5.6));
		set.add("Hello");
		set.add("Hello"); // 值重覆不會加入

		System.out.println("toString()=" + set);
		System.out.println("元素個數=" + set.size());

		// Set家族只能用Iterator 取值
		Iterator objs = set.iterator();
		while (objs.hasNext())
			System.out.println(objs.next());
	}
}
```
* 使用 HashSet 取得 6 個不重複的亂數

```java=
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class Demo01 {

	public static void main(String[] args) {
		Set set = new HashSet();
		while (set.size() != 6) {
				int number = (int) (Math.random() * 49) + 1;
				set.add(number);
		}

		System.out.println("toString()=" + set);
		System.out.println("元素個數=" + set.size());

		// Set家族只能用Iterator 取值
		Iterator objs = set.iterator();
		while (objs.hasNext())
			System.out.println(objs.next());
	}

}

```
### TreeSet 
* 有大小排序特性
```java=
import java.util.*;

public class TestTreeSet {
	public static void main(String args[]) {
		Set set = new TreeSet();
		set.add(new Integer(56));
		set.add(new Integer(34));
		set.add(new Integer(12));
		
		//class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String
//		set.add("Hello"); //加入泛型，ClassCastException

		Iterator objs = set.iterator();
		while (objs.hasNext())
			System.out.println(objs.next());
	}
}
```

## List ( Collection 家族 ) 相關物件常用方法
![](https://i.imgur.com/o3YAFSR.png)

### ArrayList
```java=
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class TestArrayList {

	public static void main(String[] args) {
		List list = new ArrayList();
		// JDK 5 以前要手動裝箱才能加進集合裡
		list.add(new Integer(12));
		list.add(new Long(34L));
		list.add(new Double(5.6));
		list.add("Hello");
		list.add("Hello"); // 值重覆仍加入到集合裡

		System.out.println("toString()=" + list); // 集合列別的toString方法已經改寫過了
		System.out.println("元素個數=" + list.size());

		Iterator objs = list.iterator();
		while (objs.hasNext())
			System.out.println(objs.next());

		// List家族可以用Iterator或for迴圈取值
		System.out.println();
		for (int i = 0; i < list.size(); i++) {
			Object obj = list.get(i);
			System.out.println(obj);
		}
	}

}

```

### LinkedList
* **依照加入的先後順序**
    * LinkedHashSet
    * LinkedHashMap
* **LinkedList實作了List介面**
    * 有順序性，可重複加入的集合
* 使用方法與ArrayList幾乎相同
    * 但因為是鏈結的資料結構，因此適合對頭 / 尾元素進行處理
 *  LinkedList 可置入"任意物件"的"動態陣列"
     *  可隨內含物多寡增減其長度
 *  **如果需要經常將元素插入和刪除**
     *  LinkedList 效率較佳
 *  LinkedList 新增以下方法
     * void addFirst(Object o);
     * void addLast(Object o);
     * Object getFirst();
     * Object getLast(); 等方法
![](https://i.imgur.com/zkl7eMz.png)

```java=
import java.util.*;

public class TestLinkedList {
	public static void main(Stringargs[]) {

		LinkedList list = new LinkedList();
		list.add(new Integer(12));
		list.add(new Long(34L));
		list.add(new Double(5.6));
		list.add("Hello");
		list.add("Hello"); // duplicate, is added

		System.out.println("toString()=" + list);
		System.out.println("元素個數=" + list.size());

		Iterator objs = list.iterator();
		while (objs.hasNext())
			System.out.println(objs.next());

		// List家族可以用Iterator或for迴圈取值
		System.out.println();
		for (int i = 0; i < list.size(); i++) {
			Object obj = list.get(i);
			System.out.println(obj);
		}

		// 其它方法取值1 -> toArray()
		System.out.println();
		Object a[] = list.toArray();
		for (int i = 0; i < a.length; i++)
			System.out.println(a[i]);

		// 只有 LinkedList 才有此addFirst()...等method, 故呼叫此等method時不能用多型的寫法
		System.out.println();
		list.addFirst("first");
		list.addLast("last");
		list.remove("first");
		for (int i = 0; i < list.size(); i++)
			System.out.println(list.get(i));

	}
}
```
## Queue ( Collection 家族 )
* 佇列有順序性
    * 即為日常生活上的隊伍
* 佇列只能對"第一個"元素做取出的動作
    * 取出的同時也從佇列移除了該元素。
    * 適合使用佇列進行資料"消化"的操作
        * 如：待處理事項
* Queue 繼承 Collection，所以具有 Collection 的方法
    * add()
    * remove()
    * element()等方法
* 同時也定義了自己的方法
    * office() 在佇列後加入物件，失敗會回傳false，成功會回傳true
    * poll() 用來取出佇列前端物件，若佇列為空則傳回null
    * peek() 用來取得(但不取出)佇列前端物件，若佇列為空則回傳null
### 佇列(Queue)
```java=
import java.util.*;

public class TestQueue {
	public static void main(String[] args) {
		Queue q = new LinkedList();
		q.offer("First");
		q.offer("Second");
		q.offer("Third");
		Object o;
		System.out.println(q.toString());
		while ((o = q.poll()) != null) {
			String s = (String) o;
			System.out.println(s);
		}
		System.out.println(q.toString());
	}
}
```
### PriorityQueue
```java=
import java.util.*;

public class TestPriorityQueue1 {
	public static void main(String[] args) {
		PriorityQueue<String> pq = new PriorityQueue<String>();
		pq.offer("c");
		pq.offer("a");
		pq.offer("b");
		String s;
		while ((s = pq.poll()) != null) {
			System.out.print(s + ", ");
		}
	}
}
```
### Deque
```java=
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Stack;

public class TestStack {
	public static void main(String[] args) {
		Deque<String> stack = new ArrayDeque<>();
		stack.push("one");
		stack.push("two");
		stack.push("three");
		
		int size = stack.size()-1;
		while(size >=0 ) {
			System.out.println(stack.pop());
			size--;
		}
	}
}
```

## Map 家族 ( Mapping 對應 )
* Map 是 key/value 的集合
    * HashMap map = new HashMap();
    * map.put(“key”, “value”);
* Map介面常用方法
* Collection values()
    * Map的Value可重複
    * 但又沒有順序性
    * 所以Set、List都不適用
    * 就用更高階的Collection來代表
### Map 家族 相關物件常用方法
![](https://i.imgur.com/av2n8TX.png)

### HashMap
```java=
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class TestHashMap {

	public static void main(String[] args) {
		Map map = new HashMap();
		map.put("one", new Integer(1));
		map.put("two", "2");
		map.put("three", new Float(3.0));
		map.put("three", "Hello"); //若加入元素，Key重複時，新的value會取代舊的value
		
		System.out.println(map.get("one"));
		System.out.println(map.get("two"));
		System.out.println(map.get("three"));
		System.out.println(map.get("four")); // 若不存在，給予null值
		
		
		// 取出所有的key,包裝為Set的型態
		Set set = map.keySet();

		Iterator it = set.iterator();
		while (it.hasNext()) {
			Object myKey = it.next();
			System.out.println(myKey + "=" + map.get(myKey));
		}
	
        //keySet() 方法來自Map介面, 所以所有Map家族成員都適用此方式取值	
	}
}
```

### Map注意事項
* 若加入相同的主鍵值，則新的資料會取代舊的資料
* 使用主鍵值尋找內含值，若主鍵值不存在，則會回傳null
* HashMap 類別實作 Map 介面
    * 取得 Map 集合中所有的 key，可以使用keySet()，它會將Map裡所包含的所有key以Set介面的型態回傳
        * Set keySet()
    * 取得Map集合中所有的value，可以使用values()，它會將Map裡所包含的所有value以Collection介面的型態回傳
        * Collection values()

## 集合與陣列比較
![](https://i.imgur.com/a1uCXmK.png)

:exclamation: **集合裡面的資料都是物件的形式**

## 迭代器Iterator
* 對於資料一個一個取得的操作稱為"遍歷(traverse)"
    * 迭代就是一種遍歷的實現
* 如何取得集合裡的元素？
    - Collection 介面提供 iterator() 方法，回傳 Iterator 介面
        * public Iterator iterator()
        - 利用此方法可把 collection 裡的所有元素
        轉換成可進行迭代的迭代器(Iterator)
        -  **關於元素取得的順序是沒有任何保證的**
            -  除非此collection是提供保證順序的特性
    * Iterator介面 (稱為迭代器介面，JDK1.2開始)
        - 此介面被用來擷取 collection 集合裡的所有元素
            - 也包含了其子介面 Set 與 List 
        * public boolean hasNext() 
            * 檢查迭代器裡還有沒有未取過的元素，有就回傳true
        * public Object next()
    - Iterator(迭代器)介面是為了取代JDK1.0的Enumeration(列舉)介面
:exclamation: **用相同名稱代表各種不同集合的迭代器**

## 泛型 ( Generic Type )
* 泛型優點 ( JDK1.5 )
    - 可預先指定 Collection 中所含的物件類別
    * 因此只要不小心加入其它類別的物件，在編譯階段就會出現錯誤
        * 使得原本在執行階段才能檢查出來的問題
        提升到了編譯時期
    * 避免 runtime 時期的 java.lang.ClassCastException 的錯誤
        * 因型別已知，取出資料時可省略型別轉換(Cast)的麻煩
* Java 使用動態連結技術，並且有共同的 Object 祖先做為最根本的多型
* 在 JDK1.4 之前，實作Collection介面時，我們能夠處理Object物件
    * 如：add(Object o)或remove(Object o)方法
- 雖然可讓Collection介面變得一般化
    - 但是因為在大部份的實際狀況下，我們放在Collection中的物件通常都屬同一個類別
    - 取出時型別為Object還得作型別轉換(Cast)，較為麻煩也容易出錯
* BeforeGenericList (以前)
```java=
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class BeforeGenericList {

	public static void main(String[] args) {
		List data = new ArrayList();
		data.add("Hello");
		data.add("World");
		
		//class java.lang.Integer cannot be cast to class java.lang.String
		data.add(10); 
		

		Iterator it = data.iterator();
		while (it.hasNext()) {
			Object obj = it.next();
			if(obj instanceof String) {
				String str = (String) it.next(); // 強制轉型，因為next方法回傳的型別是Object
				System.out.println(str);
			}else if(obj instanceof Integer) {
				Integer i1 = (Integer) obj;
				System.out.println(i1.intValue());
			}

		}
	}

}

```

* GenericList (JDK1.5後)
```java=
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class GenericList {

	public static void main(String[] args) {
		List<String> data = new ArrayList<String>();
		data.add("Hello");
		data.add("World");

		Iterator<String> it = data.iterator();
		while (it.hasNext()) {
			String str = it.next(); // 強制轉型,不再需要
			System.out.println(str);
		}
	}

}

```

### 泛型 ( Map )
* Map< key , value > 的類型
```java=
import java.util.HashMap;
import java.util.Map;

public class GenericMap {

	public static void main(String[] args) {
		Map<Integer, String> map = new HashMap<Integer, String>();
		for (int i = 0; i < 3; i++) {
			map.put(new Integer(i), "number" + i);
		}
		System.out.println(map.get(new Integer(0)));
		System.out.println(map.get(new Integer(1)));
		System.out.println(map.get(new Integer(2)));
	}

}

```

### 自訂泛型
```java=
import java.util.*;

class MyGenericType<Type> {

	private List<Type> list;

	public MyGenericType() {
		list = new Vector<Type>();
	}

	public void add(Type t) {
		list.add(t);
	}

	public Type get(int i) {
		return list.get(i);
	}
}

public class MyGeneric {
	public static void main(String[] args) {
		MyGenericType<String> myGeneric = new MyGenericType<String>();
		for (int i = 0; i < 3; i++) {
			myGeneric.add("number" + i);
			System.out.println(myGeneric.get(i));
		}
	}
}
```

### 泛型上下邊界
* 泛型的進階設定
    * 泛型的設定可使用「?」搭配「extends」或「super」來增加泛型的彈性
* <\? extends Number>：代表可以是Number或Number的子類別
    * 制定出最高階類別為Number
* <\? super Number>：代表可以是Number或Number的父類別
    * 制定出最低階類別為Number
* 註：? 在泛型機制裡，代表為「any type」的意思

```java=
class Book<T>{
	T price;
	public static void show(Book<? extends Number> b){
		System.out.println("書籍定價為：" + b.price);
	}
}

public class GenericAdv {
	public static void main(String[] args){
		Book<Integer> book = new Book<Integer>();
		book.price = 580;
		Book.show(book);
	}
}

```

* 此機制讓泛型設計者可以限制使用者所決定的型別是否符合規範

## Iterable 介面
* 從JDK1.5開始，Collection介面增加了新的泛型(Generic Type)功能設計，並繼承JDK1.5的新介面Iterable
* 介面Iterable(JDK1.5)：
    * 此介面只有一個iterator()方法，回傳Iterable介面
    * Iterable\<T\> iterator()
* 實作Iterable介面，其目的是為了允許物件可以使用JDK1.5的「增強型for迴圈(for-each)」語法
* Implementing this interface allows an object to be the target of the “foreach” statement”

:exclamation: 當使用JDK1.5的for-each來走訪集合的元素內容時，一切將顯得格外輕鬆！
    
### 增強型for迴圈 (for-each)
* 增強型的for迴圈 (Enhanced for Loop) – for each：
    * 在JDK1.5中，針對for迴圈作了一些加強，讓我們無需知道陣列(array) 或集合(collection)的長度，甚至也不用迭代器(iterator)，便可以將其中的元素一一取出
    * 使用for – each來走訪集合的元素會格外輕鬆
* 語法：
    * for ( 資料型態 變數名稱 ： 陣列或集合)
    * for (Type varName ： listName)
        * 即可將listName裡的元素依順序，由型別為Type的變數varName存取
        * 陣列或集合中元素的型別必須是可以轉型為Type的型別
```java=
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class EnhanceForCollection {

	public static void main(String[] args) {
		List<String> data = new ArrayList<String>();
		// Set<String> data = new HashSet<String>();
		data.add("Hello");
		data.add("World");

		System.out.println("傳統的for 迴圈");
		for (int i = 0; i < data.size(); i++)
			System.out.println(data.get(i)); // (注意:Set不能用傳統的for迴圈)
		System.out.println();

		System.out.println("使用iterator迴圈");
		for (Iterator it = data.iterator(); it.hasNext();)
			System.out.println(it.next() + " ");
		System.out.println();

		System.out.println("增強功能的 for 迴圈(Using Enhanced foreach)");
		for (String str : data)
			System.out.println(str);
		System.out.println();

	}

}

```

### 兩種迴圈比較
* for-each 迴圈之所以被稱為語法蜜糖(sugar)
    * 就是因為對於先前迭代器的操作語法
    * for-each 能達到更簡化的程式碼撰寫
    * 即可走訪集合 / 陣列裡的所有元素
* 但也因為運作機制為迭代，因此元素取得操作的彈性不大，多用在元素全部取得的情境
* 傳統for迴圈具備迴圈設計要素(初值設定、條件判斷、計次)，除了對存取上更有操作的彈性之外，在執行效能上也會比for-each來得更好

## TreeSet ( Collection 家族 ) 與 TreeMap ( Map 家族 )
* TreeSet實作了SortedSet介面，成為了一個擁有大小排序特性的Set集合
    * **同時也維持了元素不重複的特性**
* TreeMap實作了SortedMap介面，成為了一個擁有大小排序特性的Map集合
    * **使用key的資料做為大小排序依據**
* 使用有排序特性的集合需保證集合內的元素為同一類型 (才有比大小的意義！)
    * **宣告泛型即可保證集合內的元素為同一類別**

## TreeMap
```java=
package module18_20;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class TestTreeMap {
	public static void main(String[] args) {

		Map<Integer , String> map = new HashMap<Integer , String>();
//		Map<Integer, String> map = new TreeMap<Integer, String>(); // TreeMap的Key值要同一種資料型別

		for (int i = 0; i < 6000000; i++) {
			map.put(i, "David" + i);
		}
		for (String val : map.values()) {
			System.out.println(val);
		}
	}
}
```
### HashMap、TreeMap 結果
 * HashMap 可能輸出結果： 
     * David2 
     * David4 
     * David1 
     * David3 
     * David5 
     * David0
 * TreeMap 輸出結果： 
     * David0 
     * David1 
     * David2 
     * David3 
     * David4 
     * David5

## 自訂物件大小排序
* 若想藉由集合或陣列擁有大小排序的特性
    * 必須主動對該類別實作Comparable介面
    * **實作目的其實就是描述此物件的大小定義與規則**
* 一個有實作Comparable介面的物件實體才會是被Java認同可以進行排序操作的資料
* 排序：Arrays.sort(字串);
```java=
import java.util.*;

public class TestArraysForArray {

	public static void main(String args[]) {

		String strArray[] = { "5", "2", "3", "4", "1" };

		Arrays.sort(strArray);

		for (int i = 0; i < strArray.length; i++) {
			System.out.println(strArray[i]);
		}
	}
}
```

## compareTo方法說明
* Comparable 介面裡需要實作的抽象方法：
    * int compareTo(T target) 
* compareTo 方法說明：
    * 回傳一個大於0或是小於0的整數 
    * 通常用 1 跟 -1 來定義物件的大小
* 參數型別 T 為泛型機制
    * 宣告Comparable介面時決定傳入比較物件的型別
    * 在此方法裡決定使用該物件的何種屬性進行大小定義的設計
* Arrays, Collections 類別的 sort 方法
    * 內部即會呼叫該比較物件的compareTo方法
## compareTo圖解 (以TreeSet為例)
![](https://i.imgur.com/7e7kBEX.png)

![](https://i.imgur.com/bGBCcvZ.png)
* Arrays, Collections 類別的 sort 方法
    * 內部即會呼叫該比較物件的 compareTo 方法
    * 若自己定義的物件想達排序效果
    * 則必須 override compareTo 方法
```java=
public class Employee implements Comparable<Employee> {
	private int empno;
	private String ename;

	public void setEmpno(int empno) {
		this.empno = empno;
	}

	public int getEmpno() {
		return empno;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getEname() {
		return ename;
	}

	public Employee(int empno, String ename) {
		this.empno = empno;
		this.ename = ename;
	}

	public Employee(int empno) {
		this(empno, "-");
	}

	public Employee(String ename) {
		this(0, ename);
	}

	public Employee() {
		this(0, "-"); //或  empno = 0; ename = "-"
	}

	public void display() {
		System.out.println("empno=" + empno);
		System.out.println("ename=" + ename);
	}

	public int compareTo(Employee aEmployee) {
		//物件本身與 aEmployee 相比較，如果 retrun 正值，就表示比 aEmployee 大
		if (this.empno > aEmployee.empno) {
			return 1;
		} else {
			return -1; // 正負值用來代表兩個元素的左右位置關係
		}
	}

}
```

## HashSet唯一性操作
* HashSet集合雖沒有排序特性，但保證了元素的唯一性 (重複不加入)
    * 在一些功能實現的情境上非常方便即可達成，但使用上需注意：
    * 自訂物件若要搭配 HashSet 達到唯一性
    * 需主動覆寫 Object 類別繼承來的方法
        *  equals 與 hashCode 方法
        *  覆寫目的是為了定義 "什麼叫做一樣的物件"
* Java API 文件中也明確告知，大部份情況下
    * 覆寫 equals 方法最好連帶覆寫 hashCode 方法
* 當兩個物件的hasCode相同，才回再用equals做確認　-> 提高效率
    * hashCode → 模糊比對 (先)
    * equals → 明確比對 (後)

## 什麼是 hashCode ?
* 每個 Java 物件都擁有 hashCode 方法
    * 可以取得一個整數的資料 ( 從Object類別繼承獲得 ) 
* HashSet 在加入元素前會先藉由 hashCode 來區分元素所在的空間( hash bucket )
    * 若該空間裡沒有其它元素即加入，若該空間已有其他元素
    * 再透過equals方法得出最後結果是否為重複

![](https://i.imgur.com/61i3Hcg.png)

![](https://i.imgur.com/qQyY7aB.png)

## 覆寫hashCode
* hashCode (雜湊)的演算牽涉到數學領域知識，因此這邊不會做太深入說明，有興趣的學員可以自行補充。基本覆寫的流程如下：
* (1) 決定好要比較的物件屬性有哪些 (與覆寫equals方法使用的屬性相同)
* (2) 選擇一個質數，用它與需要運算的屬性做累積相乘 (擴大運算結果避免容易發生碰撞情形)
* (3) 回傳累積相乘的最後結果
* 結論深入淺出：
    * 滑鼠右鍵 → Source → Generate hashCode() and equals()
:exclamation:**HashMap的Key若是自定物件，也要記得改寫equals & hashCode** 
```java=
package module18_20;

import java.util.Objects;

public class Employee implements Comparable<Employee> {
	private int empno;
	private String ename;

	public void setEmpno(int empno) {
		this.empno = empno;
	}

	public int getEmpno() {
		return empno;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getEname() {
		return ename;
	}

	public Employee(int empno, String ename) {
		this.empno = empno;
		this.ename = ename;
	}

	public Employee(int empno) {
		this(empno, "-");
	}

	public Employee(String ename) {
		this(0, ename);
	}

	public Employee() {
		this(0, "-"); // 或 empno = 0; ename = "-"
	}

	public void display() {
		System.out.println("empno=" + empno);
		System.out.println("ename=" + ename);
	}

	public int compareTo(Employee aEmployee) {
		// 物件本身與 aEmployee 相比較，如果 retrun 正值，就表示比 aEmployee 大
		if (this.empno > aEmployee.empno) {
			return 1;
		} else {
			return -1; // 正負值用來代表兩個元素的左右位置關係
		}
	}

	@Override
	public int hashCode() {
		return Objects.hash(empno, ename);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Employee other = (Employee) obj;
		return empno == other.empno && Objects.equals(ename, other.ename);
	}

	/*public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (obj != null && this.getClass() == obj.getClass()) {
			Employee e = (Employee) obj;
			if (this.empno == e.empno && this.ename.equals(e.ename)) {
				return true;
			}
		}
		return false;
	}

	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = result * prime + empno;
		result = result * prime + ((ename == null) ? 0 : ename.hashCode());
		return result;
	}*/

	
	
}

```
```java=
package module18_20;

import java.util.HashSet;
import java.util.Set;

public class TestHashSetEmp {
	
	public static void main(String[] args) {
		Set<Employee> set = new HashSet<Employee>();
		Employee em1 = new Employee(7001, "king1");
		Employee em2 = new Employee(7002, "king2");
		Employee em3 = new Employee(7003, "king3");
		Employee em4 = new Employee(7004, "king4");
		Employee em5 = new Employee(7005, "king5");
		Employee em6 = new Employee(7001, "king1");

		set.add(em5);
		set.add(em2);
		set.add(em3);
		set.add(em4);
		set.add(em1);
		set.add(em6);
		
		for (Employee aEmp2 : set) {
			System.out.println(aEmp2.getEmpno() + "-" + aEmp2.getEname());
		}
	}
}

```

## TreeSet唯一性
* TreeSet除了有元素大小排序的特性之外，也保有Set共同的特性，也就是元素重複不加入，但使用此集合時，必須注意：
    * TreeSet裡面的元素需為”可比較的”，也就是有實作Comparable介面
    * TreeSet不重複的根據是compareTo方法的結果，並不是equals()與hashCode()的結果
    * 在compareTo實作方法裡，對於”一樣大”的元素，需要做 return 0 的設計

:exclamation: TreeMap的key不重複，也是看compareTo回傳的結果
```java=
package module18_20;

import java.util.Objects;

public class Employee implements Comparable<Employee> {
	private int empno;
	private String ename;

	public void setEmpno(int empno) {
		this.empno = empno;
	}

	public int getEmpno() {
		return empno;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getEname() {
		return ename;
	}

	public Employee(int empno, String ename) {
		this.empno = empno;
		this.ename = ename;
	}

	public Employee(int empno) {
		this(empno, "-");
	}

	public Employee(String ename) {
		this(0, ename);
	}

	public Employee() {
		this(0, "-"); // 或 empno = 0; ename = "-"
	}

	public void display() {
		System.out.println("empno=" + empno);
		System.out.println("ename=" + ename);
	}

	public int compareTo(Employee aEmployee) {
		// 物件本身與 aEmployee 相比較，如果 retrun 正值，就表示比 aEmployee 大
		if (this.empno > aEmployee.empno) {
			return 1;
		} else if (this.empno == aEmployee.empno) {
			return 0; // 正負值用來代表兩個元素的左右位置關係
		}else {
			return -1;
		}
	}

	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (obj != null && this.getClass() == obj.getClass()) {
			Employee e = (Employee) obj;
			if (this.empno == e.empno && this.ename.equals(e.ename)) {
				return true;
			}
		}
		return false;
	}

	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = result * prime + empno;
		result = result * prime + ((ename == null) ? 0 : ename.hashCode());
		return result;
	}

	
	
}

```
```java=
import java.util.*;

public class TestTreeSetEmp {
	public static void main(String args[]) {
		Set<Employee> set = new TreeSet<Employee>();
		Employee e1 = new Employee(7001, "king1");
		Employee e2 = new Employee(7002, "king2");
		Employee e3 = new Employee(7003, "king3");
		Employee e4 = new Employee(7004, "king4");
		Employee e5 = new Employee(7005, "king5");
		Employee e6 = new Employee(7005, "king1");

		set.add(e5);
		set.add(e2);
		set.add(e3);
		set.add(e4);
		set.add(e1);
		set.add(e6);

		for (Employee aEmp : set) {
			System.out.println(aEmp.getEmpno() + "-" + aEmp.getEname());
		}
		
	}
}

```

## LinkedList 與 ArrayList比較
* LinkedList
![](https://i.imgur.com/RTOe5vj.png)
* ArrayList
![](https://i.imgur.com/8kUifDi.png)

:exclamation: **LinkedList也同時實作了Queue介面，也可以拿來做為佇列結構使用**

## PriorityQueue與Comparator
* PriorityQueue實作Queue介面而擁有佇列特性之外，也保證了元素會按照大小順序取出，另外也可以提供實作的Comparator的物件，自訂元素大小的排序規則
* Comparator介面使用時機：
    * 想改變排序規則的資料是標準API的項目，如Integer, String…等
    * 想改變排序規則，但沒有原始碼可以調整
* 除了PriortyQueue之外，像是sort()，TreeSet等有大小排序功能的方法或是集合
    * 都可以傳入Comparator實作物件進行排序規則的調整，大幅增加使用上的彈性

### 使用比較器(Comparator)調整排序規則
* 使用Comparator可以彈性調整比較規則
```java=
import java.util.*;

//class MyComparator implements Comparator<String> {
//	public int compare(String s1, String s2) {
//		return s1.compareTo(s2) * -1; //原本預設由小到大，比較大回傳正1，比較小回傳負值，乘以-1就可以變成由大到小的功能
//	}
//}

public class TestPriorityQueue2 {
	public static void main(String[] args) {
		// 匿名類別的語法 (對介面實作的簡化)
		Comparator<String> c = new Comparator<String>() {
			public int compare(String a, String b) {
				return a.compareTo(b) * -1;
			}
		};

//		MyComparator c = new MyComparator();
//		PriorityQueue<String> pq = new PriorityQueue<String>(3, c); //集合可以不用指定長度，也可以自訂長度
		PriorityQueue<String> pq = new PriorityQueue<String>(3, (s1, s2) -> s1.compareTo(s2) * -1); //箭頭
		pq.offer("c");
		pq.offer("a");
		pq.offer("b");
		pq.offer("d");
		String s;
		while ((s = pq.poll()) != null) {
			System.out.print(s + ", ");
		}
	}
}

```

## FIFO與LIFO
* 佇列(Queue)
    * FIFO (First-In-First-Out)，"先進先出"
    * "出，是指元素取得並包含移除的動作
* 堆疊(Stack)
    * LIFO (Last-In-First-Out)，"後進先出"
    * 並不是用索引值取得元素，而是使用該物件提供的pop()取得

### LIFO
```java=
import java.util.*;

public class Test_LIFO_Stack {
	public static void main(String[] args) {
		Stack list = new Stack();
		list.add("c"); // (4) pop "c"
		list.add("a"); // (3) pop "a"
		list.add("b"); // (2) pop "b"
		list.add("a"); // 後進先出，(1) pop "a"
		System.out.println(list.toString());

		for (int i = 0; i < list.size(); i++)
			System.out.println(list.get(i));

		System.out.println();

		while (!list.empty())
			System.out.println(list.pop());

	}
}
```

# 多執行緒設計
## 程序(Process)與執行緒(Thread)
![](https://i.imgur.com/fphf4dk.png)

## 執行緒 (Thread)
* 什麼是執行緒(Thread)
    * 執行緒是程式的執行區段，這個區段的指令獨立執行，不被其它區段影響，需要時啟動，不需要時關閉，以節省系統資源
* Multithreading(多執行緒)
    * Java支援多執行緒：
        * 看似電腦可同時執行許多工作，實質為CPU在各個程式中切換
        * 不是每個程式都必須使用執行緒，但使用多緒多工，可使系統的效率得以充分發揮
    * 已知的執行緒：
        * Java的Garbage Collector即是一個執行緒 (背景執行緒daemon thread)
        * Java程式啟動時，即自動建立一個執行緒，稱為主執行緒 (main thread)
            * 負責執行main方法裡的程式碼

## 執行緒與多工 (Multitasking)
* Multitasking(多工)指的是單一系統同時執行多個工作，由作業系統角度可以分成以下：
* 合作型 (Cooperative) 多工 (早期)
    * 分享CPU是程式的事情 (容易造成獨佔)
    * 需使用某些系統程序讓程式執行的控制權轉移
* 強奪型 (Preemptive) 多工 (近代)
    * 由系統分配(排程)CPU的使用 (無法獨佔)
    * 可由系統中斷工作，切換到另一個工作
* 由程式角度可以分成以下：
    * Process-based multitasking 多工
        * 允許電腦同時執行兩個或更多個程式
        * Program 是分配送遣的最小單位程式碼
    * Thread-based multitasking 多工
        * 在此環境下，單一程式可以同時執行兩個以上的工作
        * Thread 是可被分配送遣的最小單位程式碼

## 使用Thread類別
* 繼承java.lang.Thread類別
    * 建立Thread類別的衍生類別，並覆寫(Override)其run()方法
    * run()方法為執行緒執行的地方
* 單執行緒
```java=
package module21_26;

public class CounterMain {
	int counter = 10;

	public CounterMain() {
	} // 建構者函數

	public void runMethod() { // 一般的成員方法
		while (counter > 0) {
			System.out.println(counter);
			counter--;

			try {
				Thread.sleep(1000); // 暫停一秒
			} catch (Exception e) {
			}
		}
	}

	public static void main(String args[]) {
		CounterMain m1 = new CounterMain();
		CounterMain m2 = new CounterMain();
		m1.runMethod();
		m2.runMethod();
	}

}
```
* 多執行緒
* override run()方法
* 但呼叫時是用start()方法(即多重執行緒)
* 由JVM來啟動多重執行緒
* 若類別已經繼承其他類別，無法繼承 Thread (java只能單一繼承)
* 所以java提供 Runnable 介面
```java=
package module21_26;

public class CounterThread extends Thread {
	int counter = 10;

	public CounterThread() {
	} // 建構者函數

	public void run() { // 執行緒執行的地方
		while (counter > 0) {
			System.out.println(counter);
			counter--;

			try {
				Thread.sleep(1000); // 暫停一秒
			} catch (Exception e) {
			}
		}
	}

	public static void main(String args[]) {
		CounterThread t1 = new CounterThread(); // 產生執行緒物件
		CounterThread t2 = new CounterThread();
		t1.start(); // 呼叫執行緒物件的start()方法(即啟動執行緒) , 隨即執行物件中的run方法
		t2.start();
	}
}

```

## 使用Runnable介面
```java=
package module21_26;

public class CounterRunnable implements Runnable {
	int counter = 10;

	public CounterRunnable() {
	} // 建構者函數
	
	public void run() { // 執行緒執行的地方
		while (counter > 0) {
			System.out.println(counter);
			counter--;

			try {
				Thread.sleep(1000); // 暫停一秒
			} catch (Exception e) {
			}
		}
	}

	public static void main(String arg[]) {
		CounterRunnable r1 = new CounterRunnable();// 產生Runnable物件
		Thread t1 = new Thread(r1); // 再由Runnable物件, 產生執行緒Thread物件
		CounterRunnable r2 = new CounterRunnable();
		Thread t2 = new Thread(r2);
		t1.start(); // 呼叫執行緒物件的start()方法(即啟動執行緒) , 隨即執行物件中的run方法
		t2.start();
	}
}

```

## 執行緒生命週期 (Life cycle)
* 預備狀態(Ready)
    - 執行start()方法即進入排程器中等候CPU處理
* 執行狀態(Running)
    - run()方法被呼叫時
* 死亡狀態(Dead)
    - run()方法執行完畢時，或stop()方法被呼叫時 (註：stop()不再使用)
* 等待狀態(Waiting)
    - 執行wait()方法即移出執行狀態，透過notify()或notifyAll()方法回到預備狀態
* 睡眠狀態(Sleeping)
    - 停止一段時間後回到預備狀態
* 阻塞狀態(Blocked)
    - 需等待一段不確定的I/O時間，移出執行狀態
* 另有暫停狀態(Suspended) -> 被 sleep 取代
    * 透過resume()方法回到預備狀態 (註：不再使用) 
* 執行緒生命週期 (Life cycle)
![](https://i.imgur.com/J7TKZ95.png)
* wait()
    * 執行緒之間溝通的設計，搭配notify方法
* I/O blocked
    * 等待一段不確定的傳輸時間

## Thread類別常用方法整理
![](https://i.imgur.com/QSBKWIl.png)
* :exclamation: sleep()方法
    * throws InterruptedException
    * 一定要執行的例外處理
    * 當執行緒執行到interrupt方法就會發生此例外

### Thread 範例
```java=
public class MyThread extends Thread {
	public static boolean ready = false; //「開跑」變數

    //以四種不同的建構者函數來建立物件 (function overloading)
    public MyThread() {
        super("NT1");
    }

    public MyThread(String name) {
        super(name);
    }

    public MyThread(String name, int priority) {
        super(name);
        setPriority(priority);
    }

    public MyThread(String name, int priority, boolean isDaemon) {
        super(name);
        setPriority(priority);
        setDaemon(isDaemon);
    }

    public void run() {
        while (!ready) {
        } // 只要沒開跑，就不執行下一行。

        System.out.println(
              "My name is " + getName() 
            + "..... My priority is " + getPriority() 
            + "..... Am I alive? " + isAlive()
            + "..... Am I daemon? " + isDaemon()
        );
        

//      String nameOfcurrentThread = Thread.currentThread().getName();
//      System.out.println("目前正在執行的執行緒的名字="+nameOfcurrentThread);
    }
}
```
* TestMyThread 共有 6條執行緒
* 一條是main thread
```java=
public class TestMyThread {

	public static void main(String[] args) {
		 MyThread nt[] = new MyThread[] {
		                 new MyThread(),
		                 new MyThread("NT2", 2),
		                 new MyThread("NT3", 3),
		                 new MyThread("NT6", 6, true),
		                 new MyThread("NT9", 9, true)
		                 };

		        for (int i = 0; i < nt.length; i++)
		            nt[i].start();

		        //將執行緒物件中的ready變數設為true時，
		        //才會離開永久迴圈而執行下去
		        MyThread.ready = true;
	}

}

```
* 執行緒特性
    * 順序無法預測 (系統排程決定)
    * 執行過程會切換 (CPU)

## 控制執行緒與優先安排
### join方法與優先權
* 控制執行緒之間的"先後關係"
* 執行緒join其它執行緒：等它所呼叫的執行緒終止後再繼續執行
    - join()
    - join(long milliseconds)
* 優先權(Priority)可確保重要或急迫性執行緒可被立即或經常執行
    - 流程安排(Scheduling)是決定多個執行緒的執行順序
    - 優先權的值為1至10的整數，由Thread類別定義三種常數：
        * Thread.MIN_PRIORITY ：最小值 = 1
        * Thread.NORM_PRIORITY ：預設值 = 5
        * Thread.MAX_PRIORITY ：最大值 = 10
    - 可使用setPriority() 和 getPriority()方法重新設定和取得優先權值
    - 優先權較高者先執行，但優先權相等時，並非是等待最久者先執行，而是任選其一執行
```java=
package xxx;

public class Tibame {
	
	public static void main(String[] args) {
		System.out.println("開門了!!!");
		
		Classroom c1 = new Classroom(901, "小吳");
		Classroom c2 = new Classroom(902, "郭老");
		Classroom c3 = new Classroom(903, "大吳");
		
		Thread t1 = new Thread(c1);
		Thread t2 = new Thread(c2);
		Thread t3 = new Thread(c3);
		
		t1.start();
		t2.start();
		t3.start();
		
		try {
			t1.join();
			t2.join();
			t3.join();
		} catch (InterruptedException ie) {
			ie.printStackTrace();
		}
		
		System.out.println("關門了...");
	}
}
```
```java=
package xxx;

public class Classroom implements Runnable {
	private int no;
	private String tName;
	
	public Classroom(int no, String tName) {
		this.no = no;
		this.tName = tName;
	}
	
	@Override
	public void run() {
		System.out.println(no + " --- " + tName + " 開始上課了");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		System.out.println(no + " --- " + tName + " 下課了");
	}

}
```
* 執行緒切換發生於：
    - 有較高優先權的執行緒進入排程時
    - 執行緒被終止執行或 run() method執行完畢
    - Time-Slice系統：系統分配時間用完了
* 註：在一般情況下擁有最高優先權的執行緒先執行，不過有時候會有例外，因有時排程器會挑選優先權較低者來執行，以避免餓死(starvation)的情形，因此優先權的使用只是為了讓排程更有效率而己，勿在程式中完全使用優先權的關係來控制程式的進行
* 時間分割(Time-slicing)：
    - 如windows系統會將CPU的時間分成一段段的時間糟(time slot)，特性為：
    - ．具time-slicing特性作業系統將time slot分給「Priority最高且相等的數個執行緒」，直到執行完畢或是被更高優先權的執行緒搶走
    - ．無法保證time slot的平均分配，也不保證執行的先後順序
* 自私的執行緒(Selfish thread)：
    - 自私的執行緒實踐了「socially – impaired」，其特性為：
    - 擁有「密實迴圈(tight loop)」，將一直獨佔CPU執行權
    - 如果系統不支援Time-Slice則易完全獨佔，直到：
        - 該迴圈執行完畢
        - 或被更高Priority之其它執行緒搶走CPU執行權
* 禮讓的執行緒
    - 用yield()改進，自願移出執行(Running)狀態至預備(Ready)狀態
    - 對Priority相等的數個執行緒有效
* 自私的執行緒(Selfish thread)
```java=
package module21_26;

/**
 * 自私的執行緒 -自私的執行緒(selfish thread): 實踐了 "socially-impaired" 特性
 * 
 * -即 : 
 * 1.自私的執行緒擁有"密實迴圈(tight loop)" . 如下面所示之 while loop. 
 * 2.該迴圈會佔住CPU不放, (尤其, 如果系統不支援Time-Slice則易完全獨佔 ) 除非: 
 * a. 該迴圈執行完畢 
 * b. 或被更高Priority之其它執行緒搶走cpu執行權
 * (指有更高Priority之其它執行緒進入ready狀態,此即是preemptive的特性)
 */

public class SelfishRunner extends Thread {

	private int tick = 1;
	private int num;

	public SelfishRunner(int num) {
		this.num = num;
	}

	public void run() {
		while (tick < 40000000) { // 原來為400000
			tick++;
			if ((tick % 50000) == 0)
				System.out.println("Thread #" + num + ", tick = " + tick);
		}
	}
}

```

```java=
package module21_26;

public class SelfishTest {
	private final static int NUMRUNNERS = 2;

	public static void main(String[] args) {
		SelfishRunner[] runners = new SelfishRunner[NUMRUNNERS];

		for (int i = 0; i < NUMRUNNERS; i++) {
			runners[i] = new SelfishRunner(i);
			runners[i].setPriority(2);
		}
		for (int i = 0; i < NUMRUNNERS; i++)
			runners[i].start();
	}
}

```
* 禮讓的執行緒
```java=
package module21_26;

public class PoliteRunner extends Thread {

	private int tick = 1;
	private int num;

	public PoliteRunner(int num) {
		this.num = num;
	}

	public void run() {
		while (tick < 4000000) { // 原來為400000
			tick++;
			if ((tick % 50000) == 0) {
				System.out.println("Thread #" + num + ", tick = " + tick);
				Thread.yield(); 
			}
		}
	}
}

```
```java=
package module21_26;

public class PoliteTest {

	private final static int NUMRUNNERS = 2;

	public static void main(String[] args) {
		PoliteRunner[] runners = new PoliteRunner[NUMRUNNERS];

		for (int i = 0; i < NUMRUNNERS; i++) {
			runners[i] = new PoliteRunner(i);
			runners[i].setPriority(2);
		}
		for (int i = 0; i < NUMRUNNERS; i++)
			runners[i].start();
	}
}

```
### 控制執行緒與優先安排 (結論)
* 多執行緒程式的特性(結論一)：
    - 多執行緒是難以預測其行為的
    - 執行緒的執行順序無法完全保證
    - Task Switches可能在任何時刻任何位置發生
    - 執行緒對於小改變有高度的敏感性
    - 執行緒並不總是立刻啟動執行(需被排程)
* 多執行緒程式的特性(結論二)：
    - 在時間分割(Time-Slicing)系統中優先權相同的執行緒會以一種幾乎相同機會的循環方式來執行，甚至優先權較低的執行緒也能取得時間糟(time slot)的一小部份，其比例大約正比於他們的優先權值，因此在長時間執行中不會有執行緒完全都沒有被顧及到
    - 在非時間分割(Time-Slicing)系統中則易發生完全獨佔的情況
    - 對於有大量運算的執行緒應適度的呼叫yield()來讓其它執行緒有執行的機會，尤其可增加圖形使用者介面(GUI)的良好互動

# 多執行緒同步
## 同步 (Synchronization)
* 為什麼使用synchronized關鍵字
    - 原因：在程式的某Critical Section(危險區域)裡，不同執行緒可能同時存取同一份資源因而產生衝突或重複修改的問題
    - 目的：控制每次只能有一個執行緒在使用同一份資源，此時另外的執行緒無法同時使用此同一份資源
    - 舉例：銀行領錢問題
* 使用同步的概念
    - Monitor：物件都有一個Monitor，用來當每次只能有一個執行緒進入獨佔的鎖(Lock)(或稱旗標Flag)
    - 進入Monitor：在Java裡，由呼叫已經synchronized關鍵字修正過的method即進入Monitor並得到鎖(Lock)。此時其它所有嘗試進入Monitor的執行緒將會暫停(Blocked狀態)直到該執行緒
離開
### 使用同步的方法
* 先找出Critical Section(危險區域)後：
    * 在方法宣告中加入synchronized關鍵字
        * 可以的話最好不要，效率最差
    * 或程式區塊以synchronized標示
        * 需要有小括號，裡面標示著要監控的資源是什麼
    * 或類別資料以synchronized標示
        * 若有static資料，可以在小括號標示Xxx.class
* 再執行已經用synchronized修正過的方法(method)或程式區塊

* 第0版 (有問題)
```java=
package module21_26;

import java.io.PrintWriter;

public class TestSync0 {
	static int balance = 1000; // simulate balance kept remotely

	public static void main(String args[]) {
		PrintWriter out = new PrintWriter(System.out, true);
		Account account = new Account(out);
		DepositThread first, second;
		first = new DepositThread(account, 1000, "#1");
		second = new DepositThread(account, 1000, "\t\t\t\t#2");
		// start the transactions
		first.start();
		second.start();
		// wait for both transactions to finish
		try {
			first.join();
			second.join();
		} catch (InterruptedException e) {
		}
		// print the final balance
		out.println("*** Final balance is " + balance);
	}
}

class Account {
	PrintWriter out;

	Account(PrintWriter out) {
		this.out = out;
	}

	void deposit(int amount, String name) {
		int balance;
		out.println(name + " trying to deposit " + amount);
		out.println(name + " getting balance...");
		balance = getBalance();
		out.println(name + " balance got is " + balance);
		balance += amount;
		out.println(name + " setting balance...");
		setBalance(balance);
		out.println(name + " new balance set to " + TestSync0.balance);
	}

	int getBalance() {
		// simulate the delay in getting balance remotely
		try { 
			Thread.sleep(5000);
		} catch (InterruptedException e) {
		}
		return TestSync0.balance;
	}

	void setBalance(int balance) {
		// simulate the delay in setting new balance remotely
		try { 
			Thread.sleep(5000);
		} catch (InterruptedException e) {
		}
		TestSync0.balance = balance;
	}
}

class DepositThread extends Thread {
	Account account;
	int depositAmount;
	String message;

	DepositThread(Account account, int amount, String message) {
		this.message = message;
		this.account = account;
		this.depositAmount = amount;
	}

	public void run() {
		account.deposit(depositAmount, message);
	}
}

```
* 第1版修正
```java=
// 35行
synchronized void deposit(int amount, String name) { // synchronized 整個存款method
```

* 第2版修正
```java=
// 38行
synchronized (this) { // method 內必需synchronized的片段程式碼
```

* 第3版修正
```java=

synchronized (account) { // synchronized 於執行緒 run() method 內
```

* 第4版修正
```java=
synchronized (TestSync3.class) { // synchronized 於執行緒 run() method 內
```

### 同步與系統效能/穩定度
* 執行效率與程式的穩定度
    - 同步化是一個相當耗時的運算，除非必要否則應減少使用，尤其是常執行的方法(method)或程式區段
    - 然而妥善的運用對程式的穩定度和強健度有極大幫助
* 延伸集合工具： (Vector / Hashtable)與JDK 5 Collections類別新增方法
    * Thread-safe
    - Vector等同於ArrayList，但Vector提供同步化的優點(與負擔)，對多執行緒的存取是很重要的
    - Hashtable等同於HashMap，但Hashtable提供同步化的優點(與負擔)，對多執行緒的存取是很重要的
    - 以上兩種集合都是在JDK 1.0時就存在的類別
    - Collections類別於1.5時提供了有同步處理機制集合的各種方法，詳見API文件

# 多執行緒溝通
## 執行緒通訊
* 執行緒間的通訊(interthread communication)
    * 目的：讓執行緒之間可互相交談，彼此等待
* 方式
    * 可透過共同使用的資料交談
    * 或使用執行緒控制的方法(method)，如join()
    * 或於synchronized的方法內使用wait(), notify(), notifyAll()等更細微溝通機制，彼此等待，以避免「生產過剩、不足」或是「消費過剩、不足」的問題，並使CPU使用更有效率

## 執行緒之間等待與通知
* wait(), notify(), notifyAll()這些方法在Object類別裡被實作成final的方法，所有Java類別都可以使用
* wait()：當一執行緒呼叫wait()方法時，會放棄monitor，將lock釋放出給另一個正等待進入monitor的執行緒，並且進入等待執行緒群(pool)開始等待，直到等待時間終了，或是被另一個進入相同monitor的執行緒呼叫notify()或notifyAll()方法所叫醒，而再進入ready狀態
* notify()：隨機叫醒在相同物件上某一個正在waiting的執行緒
* notifyAll()：叫醒在相同物件上所有正在waiting的執行緒，priority最高者將第一個執行
```java=
package module21_26;

class Depot {
	private int stock = 0; // 庫存量

	synchronized public void produce(int qty) {
		while (stock > 20) {
			System.out.println("庫存量超過20，暫停生產");
			try {
				wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		stock += qty;
		System.out.println("產量：" + qty + "；庫存量：" + stock);
		notify();
	}

	synchronized public void consume(int qty) {
		while (stock < qty) {
			System.out.println("庫存量不足，暫停消費");
			try {
				wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		stock -= qty;
		System.out.println("消費量：" + qty + "；庫存量" + stock);
		if (stock < 5) {
			System.out.println("庫存量低，催促生產");
			notify();
		}
	}
}

class Producer extends Thread {
	Depot depot;

	public Producer(Depot depot) {
		this.depot = depot;
	}

	public void run() {
		for (int i = 1; i <= 10; i++)
			depot.produce(4); // 每次生產4個
	}
}

class Consumer extends Thread {
	Depot depot;

	public Consumer(Depot depot) {
		this.depot = depot;
	}

	public void run() {
		for (int i = 1; i <= 10; i++)
			depot.consume(3); // 每次消費3個
	}
}

public class TestWaitNotify {
	public static void main(String[] args) {
		Depot depot = new Depot();
		Producer producer = new Producer(depot);
		Consumer consumer = new Consumer(depot);
		producer.start();
		consumer.start();
	}
}

```

# 死結問題
## 什麼是死結(DeadLock)
* 死結(DeadLock)
* 原因
    * 多執行緒的同步化鎖定(synchronized)可能造成執行緒間相互等待的死結。而Java無法偵測或預防死結的發生，須由程式設計師自行控制與掌握
* 避免死結
    * Java編譯器無法在編譯時期得知是否會有死結發生的可能，再加上多執行緒行為難以預測最好方法是預防而非偵測它
* 預防死結
    * 最簡單方式是將一群物件的鎖定動作，按照相同的順序進行處理
* 哲學家用餐與死結

