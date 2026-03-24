> 🌱 **歷史存檔聲明**：
> 這是早期初學階段留下的學習筆記與基礎練習紀錄，保留於此作為自己一路走來的初心回顧。
> 若面試官或同行前輩想看進階架構與實戰踩坑，再麻煩直接參考上方「Java 底層與架構」或「Spring 生態系解析」等章節，謝謝！

---

Java - 基礎
===

# 基本觀念與編譯執行
![](https://i.imgur.com/L8GquyT.png)
* JAVA 將 source code 編譯成位元組 (byte code).class檔，
* 依賴 JAVA Virtual Machine 解釋 .class檔，
* 一次編寫，到處執行(Write once run anywhere)=>誇平台。 
* JDK(Java Development Kit) => Java軟體開發工具包
* JRE(Java Runtime Environment) => Java執行環境
* 所有Java程式都需要在JRE下才能執行，若只要執行Java程式只需安裝JRE
* 為了保持JDK獨立性和完整性，安裝JDK時也安裝JRE的一部分，所以JDK安裝目錄下有JRE的目錄

# 基本資料字面常數

| 型別 | 基本型別 | 預設值 |
| -------- | -------- | -------- |
| 整數     | byte、short、int、long     | 0     |
| 浮點數     | float、double     | 0.0     |
| 字元     | char     | 空、''、'\u0000'     |
| 邏輯     | boolean     | false     |

## 基本資料型態
![](https://i.imgur.com/xRPrdN0.png)

## 基本資料型態其初始值指定
![](https://i.imgur.com/EkzjG22.png)

## 變數種類整理
### 區域變數( Local variables )
* 宣告在方法 ( method ) 或程式碼區塊( block ) 內
* 區域變數只能在它們被宣告的方法內存取
* 又稱 automatic, temporary 或 stack variables

### 實體變數( Instance variables )
* 宣告在方法之外，類別之內，且沒有static修飾子
* 實體變數可被類別內任何非static方法存取
* 又稱member variables(成員變數)、attribute variables(屬性變數)
* 注意：加上 static 修飾子為類別變數，也稱為靜態變數。
## 變數範例
```java=
public class MyTest{
    public static void main(String[] args){
        //區域變數使用前一定要有初值
        int i1;
//      System.out.println(i1);

        int i2 = 0;
        System.out.println(i2);
        //同區域裡的變數名稱不可重複
//      int i2 = 100; //(x)

        int i3;
        i3 = 100;
        System.out.println(i3);
    }
    
    public void show(){
        //區域變數不可跨區直接存取
        System.out.println(i2);
        
        //不同區域的變數名稱重複不會有影響
        int i3 = 0;
        System.out.println(i3);
    }
}
```

## final
* 變數宣告為final，變數初始化後不能再變更其值。
```java=
public class TestDemo4 {

	public static void main(String[] args) {
		
		final double PI =3.14;
		PI = 4;
		System.out.println(PI);
	}
}
Exception in thread "main" java.lang.Error: 
Unresolved compilation problem: 
The final local variable PI cannot be assigned.
It must be blank and not using a compound assignment
```

# 運算子與運算元
* 運算子(Operator)可對一個以上的運算元(Operand)進行運算動作
* 運算子執行運算之後將回傳值，而其回傳值型態視運算元而定
* 算數運算子： + , - , * , / , %
* 遞增遞減運算子： ++ , --
* 指定運算子： = , += , -= , *= , /= , %=
* 關係運算子： < , <= , >= , == ,!=
* 條件運算子： && , || , !
* 位元運算子： & , | , ^ , ~
* 移位運算子： << , >> , >>>
* 三元運算子：?:

## 算數運算子
```java=
public class TestArithmeticOP {

	public static void main(String[] args) {
		int num1 = 5, num2 = 2;
		double numD = 2.0;
		System.out.println(num1 + num2);
		System.out.println(num1 - num2);
		System.out.println(num1  num2  numD);
		System.out.println(num1 / num2);
		System.out.println(num1 / numD);
		System.out.println(num1 % num2);
		System.out.println("===============");
		
		//以下注意字串相加"+"
		String s1 = "現在是上午";
		int num3 = 10;
		String s2 = "點";
		System.out.println(s1 + num3 + s2);
	}

}
```

## 遞增遞減運算子
```java=
public class Demo01 {

	public static void main(String[] args) {
		int a = 3 , b = 3 , c = 3 , d = 3;
		System.out.print(a++); //3,先取出來使用再加1
		System.out.print(++b); //4,先加再取出使用
		System.out.print(c--); //3,先取出來使用再減1
		System.out.print(--d); //2,先減再取出使用
	}	
}    
```
## 指定運算子
* 將右邊運算完成的結果指定給左邊的變數保存
* 要注意位階.高低順序
    * double > float > long > int > short > byte

```java=
a = 2   --->  a = 2
a += 2  --->  a = a + 2
a -= 2  --->  a = a - 2
a = 2  --->  a = a  2
a /= 2  --->  a = a / 2
a %= 2  --->  a = a % 2
```
```java=
public class TestAssignOP {

	public static void main(String[] args) {
		int num = 1;
		num += 2;    
		String s = "1";
		s += 2;  
		System.out.println(num);
		System.out.println(s);
	}

}
```

## 條件運算子
* 將兩個部林值合併起來的運算子，運算結果仍為布林值
* a && b ---> a和b都是true才回傳true
* a || b ---> a和b只要有一個是true就回傳true
* !a     ---> 傳回相反的布林值

## 位元運算子
* &(and)、|(or)、^(xor)可用在整數的位元運算
* ~(位元反轉運算子)：用於整數，將位元1變成0，0變成1
```java=
/*
 * 以下為位元運算測試
 * 需將1(十位數)轉換成二進位，以8個bits表示
 * 也就是 0000 0001
 */
public class TestBitOP {
	public static void main(String[] args) {
		// AND運算
		System.out.println(0 & 1);
		System.out.println(0 & 0);
		System.out.println(1 & 0);
		System.out.println(1 & 1);
		System.out.println("===========");
		// OR運算
		System.out.println(0 | 1);
		System.out.println(0 | 0);
		System.out.println(1 | 0);
		System.out.println(1 | 1);
		System.out.println("===========");
		// XOR運算
		System.out.println(0 ^ 1);
		System.out.println(0 ^ 0);
		System.out.println(1 ^ 0);
		System.out.println(1 ^ 1);
		System.out.println("===========");
		// 位元反轉
		System.out.println(~0);
	}
}
```
## 移位運算子
* 整數型態的位元移位運算
    * a >> b   ---> 將a向右移動b個位元(具正負值)
    * a << b   ---> 將a向左移動b個位元(具正負值)
    * a >>> b  ---> 將a向右移動b個位元(不具正負值向右移位，以.位元補進)
* 備註
    * 移位運算子的右邊參數，若超過型態本身的位元數，則以餘數作為移位的次數
```java=
package module01_06;

public class TestShiftOP {

	public static void main(String[] args) {
		int num = 1;
		System.out.println("2的1次方 = " + (num << 1));
		System.out.println("2的2次方 = " + (num << 2));
		System.out.println("2的3次方 = " + (num << 3));
	}

}
```

## 三位元運算子
```java=
public class TestTernaryOP {

	public static void main(String[] args) {
		int income = 10000, outcome = 12000;
		System.out.println((income > outcome) ? "有積蓄" : "入不敷出");
	}
}
```

## 關係運算子
![](https://i.imgur.com/mVxn2sy.png)
```java=
public class TestRelationalOP {
	public static void main(String[] args) {
		int num1 = 5, num2 = 3;
		System.out.println(num1 < num2);  
		System.out.println(num1 <= num2); 
		System.out.println(num1 == num2); 
		System.out.println(num1 != num2); 
		System.out.println(num1 >= num2); 
		System.out.println(num1 > num2);  
	}
}
```

## 運算子與運算元練習
### 運算子：範例01
```java=
public class Demo01 {
	public static void main(String[] args) {
		int num1 = 3, num2 = 4, num3 = 10;
		System.out.println(num1+num2+num3); //17

		System.out.println(num1 > num2 && num1 != num2); //false
		System.out.println(!(num1 > num2)); //true

		//num1 = num1 + num2 * 3
		System.out.println(num1 += num2 *3); //15
		System.out.println(num2++ *2); //8 ，++在後面，所以先運算後加1
		System.out.println(++num3 * 2); //22
	}	
}
```

### 運算子：範例02 (容易出錯)
```java=
public class Demo01 {

	public static void main(String[] args) {
		int y = 11, b = 0;
		b = y++ - 3;
		System.out.println(b); // 8 ++在後面，等做完所有指令後再加一
		System.out.println(y); // 12 y原本是11，經過++之後變12
	}	
}

```
### 運算子：範例03
```java=
package January21;

public class Demo01 {
	public static void main(String[] args) {
		int i = 16;
		System.out.println(i + " " + ++i + " " + i++ + " " + i++ + " " + i++);
		// 16 17 17 18 19
		
		System.out.println(i);
		//20
	}
}
```

### 運算子：範例04
```java=
public class TestPrimitiveType {
	
	public static void main(String[] args) {
		// 整數型態
		byte num1 = 1;
		short num2 = 2;
		int num3 = 3;
		long num4 = 4;
		int num5 = 0x8e;  // 十六進位整數表示
		int num6 = 0b0010;  // JDK 7以後可使用二進位整數表示
		int num7 = 1_000_000;  // JDK 7以後可使用底線將數值隔開
		
		System.out.println(num1);
		System.out.println(num2);
		System.out.println(num3);
		System.out.println(num4);
		System.out.println(num5);
		System.out.println(num6);
		System.out.println(num7);
		System.out.println("==============");
	
		// 浮點數型態
		float num8 = 1.0f;  // f代表指定為float型態
		double num9 = 2.0;
		float num10 = 1234567890;
		double num11 = 1234567890;
		
		System.out.println(num8);
		System.out.println(num9);
		System.out.println(num10);
		System.out.println(num11);
		System.out.println("==============");
	
		// 其它型態
		boolean b = true;
		char ch1 = 'A';
		char ch2 = '我';
		int i1 = ch1;
		int i2 = ch2;
		char ch3 = '\u0041';    //參考Unicode表：http://www.tamasoft.co.jp/en/general-info/unicode.html
		String s1 = "Java";
		String s2 = "\"Java\"";
		
		System.out.println(b);
		System.out.println(ch1);
		System.out.println(ch2);
		System.out.println(i1);
		System.out.println(i2);
		System.out.println(ch3);
		System.out.println(s1);
		System.out.println(s2);
	}
}
```

## 晉升與型別轉換
* 晉升(Promotion)
    * 指較小的資料型別(等號的右邊)自動晉升較大的資料型別(等號左邊)
* 型別轉換(Typecasting)
    * 指較大的資料型別轉換成較小的資料型別
    * 必須使用強制轉換
    * 語法：
        * (target type) value
        例：
            int x = 1;
            double y = 2.2;
            y = x + 1; //晉升
            x = int(y) + 1; //型別強制轉換
### 晉升與型別轉換：範例
```java=
public class TestCast {

	public static void main(String[] args) {
		int i = 1;
		double d = 11.1;
		double sum1 = i + d;
		int sum2 = (int)(i + d);
		System.out.println(sum1);
		System.out.println(sum2);
	}

}
```

### 字串無法轉換成boolen
```java=
// Type mismatch: cannot convert from String to boolean
public class Demo01 {
	public static void main(String[] args) {
		String valid = "true";
		if (valid) {
			System.out.println("valid");
		} else {
			System.out.println("not valid");
		}
	}
}
```

# 選擇條件
## switch case
```java=
switch(x){
    case O;
        statement;
        break;
        default;
}
```
* x 必須是 整數(int) or 字串(string)
* default可以單獨存在
* case數字不可重複
* break要加入
```java=
/*
 * JDK 7以後switch - case也可進行字串比對
 */
public class TestSwitchCase {

	public static void main(String[] args) {
		int n = 10; // 10 20 30

		switch (n) {
		case 10:
			System.out.println("n 的值是 10");
			break;
		case 20:
			System.out.println("n 的值是 20");
			break;
		default:
			System.out.println("n 的值不是 10 也不是 20");
		}

		System.out.println("我仍有執行到!");
	}
}
```

## 巢狀選擇結構
```java=
/*
 * 此範例說明Nested if - else流程觀念
 * 另使用equals進行比對字串示範
 */
public class TestIfElse2 {

	public static void main(String[] args) {
		int age = 29;
		String sex = "女"; // "男"

		if (age <= 29) 
			if (sex.equals("女"))
				System.out.println("我請妳看電影^_^");
			else
				System.out.println("謝謝再聯絡！");
		else
			System.out.println("謝謝再聯絡！");
		
		
		//可以改成以下寫法
		if (age <= 29 && sex.equals("女"))
			System.out.println("我請妳看電影^_^");
		else
			System.out.println("謝謝再聯絡！");
	}
}
```

### 巢狀選擇結構練習
```java=
public class Demo01 {
	public static void main(String[] args) {
		int x = 2;
		int y = 1;
		if (x == 2) 
		    if (y == 2) // 因為沒有括號，所以if只有判斷下一行
		        System.out.print("x = 2, "); 
		        System.out.print("y = 2, ");

		if ( x + y == 3)
		    System.out.print("x+y = 3");
	}
}
```

# 迴圈設計介紹
* java有三種迴圈：for , while , do...while
* 迴圈三個要素：初值設定、條件判斷、計次。
    * 初值設定：起始值
    * 條件判斷：判斷是否重複執行迴圈
    * 計次：遞增或遞減運算式
* 使用時機
    * for：執行前確定執行次數
    * while、do...while：執行前不確定執行次數
* 注意：
    * for、while 執行 0 ~ n 次
    * do...while 執行 1 ~ n 次
* while(true){...}：無窮迴圈
## for 
### 無窮迴圈 (不建議使用，閱讀性差)
```java=
for(;;){...}
```
### 語法
```0
for(初值設定;條件判斷;計次){
    statement;
}
```
### for 1加到10
```java=
public class Demo01 {
	public static void main(String[] args) {
		int sum = 0;
		for (int count = 0; count <= 10; count++) {
			sum += count;
		}
		System.out.println(sum);
	}
}
```
## while
```java=
while(條件判斷){
    statement;
}
```
### while 1加到10
```java=
public class Demo01 {
	public static void main(String[] args) {
		int sum = 0;
		int count = 0;
		while (count <= 10) {
			sum += count;
			count += 1;
		}
		System.out.println(sum);
	}
}
```
## do...while
```java=
do{
    statement;
}while(條件判斷);
```
### do...while 1加到10
```java=
public class Demo01 {
	public static void main(String[] args) {
		int sum = 0;
		int count = 0;
		do {
			sum += count;
			count += 1;
		} while (count <= 10);
		System.out.println(sum);
	}
}
```

### do...while 範例
```java=
// do...while 先做再判斷
public class Demo01 {
	public static void main(String[] args) {
		int x = 0;
		int y = 0;
		do {
		    y++; 
		    ++x; 
		} while (x < 5);
		System.out.print(x + "," + y);
	}
}
```

## 巢狀迴圈應用，九九乘法表
```java=
public class NineNineLoop {

	public static void main(String[] args) {
		int i, j;
		for (i = 1; i <= 9; i++) {
			for (j = 1; j <= 9; j++)
				System.out.print(i + "" + j + "=" + i  j + "\t");
			System.out.println();
		}
	}
}
```

### 巢狀迴圈練習
```java=
public class Demo01 {
	public static void main(String[] args) {
		String str = "";
		for (int x = 0; x < 3; x++) {         //  0      1      2   
			for (int y = 0; y < 2; y++) { // 0 1    0 1    0 1
				str = str + x + y;    //00 01  10 11   20 21
			}
		}
		System.out.println(str);
	}
}
```
* 雙層迴圈剛好對應到矩形(二維)的資料結構
* 外層控制的是縱向資料的變化，如同 y 軸
* 內層控制的是橫向資料的變化，如同 x 軸

# break and continue
* break：跳離迴圈
* continue：跳過continue以下的敘述，回到迴圈的起始點
* break and continue 通常配合 if 敘述使用
* 無窮迴圈經常會搭配break使用
* break只能在迴圈與switch case內使用

## 標籤
* 可以直接退到最外層迴圈
* 標籤的下一行必須是迴圈
* 邊謙名稱可自行命名
## 迴圈搭配break與標籤的範例說明
```java=
public class TestBreakContinue1 {
	public static void main(String[] args) {
		int i = 1;
		int j;
		outer: 
			while (i <= 3) {
			i++;
			j = 0;
			while (j <= 5) {
				j++;
				if (j == 4) {
					break outer;
				}
				System.out.println(j);
			}
		}
	}
}
```

## 迴圈搭配continue與標籤的範例說明
```java=
public class TestBreakContinue2 {
	public static void main(String[] args) {
		int i = 1;
		int j;
		outer: 
			while (i <= 3) {
			i++;
			j = 0;
			while (j <= 5) {
				j++;
				if (j == 4) {
					continue outer;
				}
				System.out.println(j);
			}
		}
	}
}
```
# 方法
## 傳遞參數與回傳值
* 如果有回傳值，則不是用void，而是必須加return
```java=
package January21;

public class Demo01 {
	public static void main(String[] args) {
		Calculator cal = new Calculator();
		int sum = cal.sum(1, 2);
		System.out.println(sum);
	}
}
```
```java=
package January21;

public class Calculator {
	public int sum(int x, int y) {
		return x + y;
	}
}
```

## 方法覆載機制(Overloading)
* 觀念：
     Overloding 將功能類似的方法提供相同的方法名稱java 會自動依據參數的數目及不同的資料型別，自動呼叫對應的方法。
    * 例如：
        * public void println(int i)
        * public void println(float f)
        * public void printn(String s)
* 注意：
    * Overloading的方法無法根據回傳值型態的不同區分，以下為錯誤示範：
        * void method(int i)
        * int method(int i)
        * String method(int i)
```java=
public class TestOverloading {
	// 圓形面積
	public static double areaMeasure(double radius) {
		return radius  radius  3.14;
	}
	// 長方形面積
	public static double areaMeasure(double height, double width) {
		return height * width;
	}
	// 梯形面積
	public static double areaMeasure(double upper, double bottom, double height) {
		return (upper + bottom) * height / 2;
	}
	public static void main(String args[]) {
		double i = areaMeasure(3.0);
		double j = areaMeasure(3.0, 4.0);
		double k = areaMeasure(3.0, 4.0, 5.0);
		System.out.println("圓形面積=" + i);
		System.out.println("長方形面積=" + j);
		System.out.println("梯形面積=" + k);
	}
}
```
```java=
public class Demo02 {
	public int sum(int x, int y) {
		System.out.println("method - 1");
		return x + y;
	}

	public float sum(float x, int y) {
		System.out.println("method - 2");
		return x + y;
	}

	public float sum(int x, float y) {
		System.out.println("method - 3");
		return x + y;
	}
}
```
## Overloading選擇題
```java=
public class Demo02 {

	public void test(int data) {...}
	public int test(int data) {...}      //A
	public int test() {...}              //B
	public void test(String data) {...}  //C
	public void test(int num) {...}      //D
	public void test() {...}             //E
}

選項A：Overloading無法根據回傳型態不同來區別
選項B：不用理會回傳型別，方法名稱一致，參數數目不同就可以
選項C：方法名稱一致，不同的資料型別就可以
選項D：方法名稱一致，但參數型別相同，JAVA無法辨識
選項E：方法名稱一致，參數數目不同就可以
```

# 類別與物件
* 五字箴言：所見即物件
* 物件：
    * 屬性 ( attribute ) 或稱為特徵 ( Characteristics )
    * 行為 ( behavior ) 或稱為操作 ( Operation )
* Java 透過類別(class)實現物件概念，讓程式設計師更具體與直覺的方式進行資料處理
* 類別組成成員：
    * 資料成員( Data Member  -->  變數Variable )
    * 方法成員( Method Member --> 方法Method )
* 先設計類別(class)才能產生物件，
    * 一個物件是由某類別產生的實體(Instance)

## 建立物件進行操作
* 實體化與初始化物件
    * 流程
        * 宣告：
            * <類別名稱><變數名稱>
            * 例：Pen myPen;
        * 實體化物件：
            * 產生物件真正的記憶體空間，必須以new關鍵字建立
            * 例：new Pen();
        * 初始化物件：
            * 用 = (指定運算子)，指派該物件至物件參考變數
            * 例：myPen = new Pen();
        * 注意：
            * 物件參考變數(Object Reference Variable)
            * 是一個儲存物件在記憶體中位址的變數

### 建立物件進行操作：範例
```java=
class Pen {
	String brand;
	double price;
	public void showInfo() {
		System.out.println("品牌：" + brand);
		System.out.println("價格：" + price);
	}
}

public class PenTest {
	public static void main(String[] args) {
		Pen myPen = new Pen();
		myPen.brand = "SKB";
		myPen.price = 10.0;
		
		Pen yourPen = new Pen();
		yourPen.brand = "MontBlanc";
		yourPen.price = 12000.0;
		
		myPen.showInfo();
		yourPen.showInfo();
	}
}
```
## 實體變數(屬性)預設初始值

| 變數型態 | 值 |
| -------- | -------- |
|byte    |0       |
|short   |0       |
|int     |0       |
|long    |0L      |
|float   |0.0F    |
|double  |0.0(D)  |
|boolean |false   |
|char    |"\u0000"|
|類別型態  |null    |

## 區域變數 / 實體變數
![](https://i.imgur.com/irz6SQz.png)

* 區域變數 ( local )
    * 宣告
        * 宣告在方法裡或流程控制的區域裡
    * 初始值   
         沒有預設初始值，存取之前，要給予初始值。可以先宣告後再給值
    * 存取
        * 只能在自己所宣告的區域內使用,不能跨區直接使用 
    * 生命週期(scope)
        * 跟著自己所屬的區域或方法, 執行時存活,
        * 當該區域或方法執行完畢, 此變數即被釋放
* 實體變數
    * 宣告
        * 宣告在方法外, 類別裡面, 而且沒有static關鍵字
    * 初始值
        * 宣告後，Java會根據資料型別的不同給予對應的預設初始值
        * 若是想要指定自己的初始值，只能在宣告的同時指定。
    * 存取
        * 只要在同個類別裡, 可以跨不同方法使用
        * (該方法不可以有static關鍵字), 透過物件參考變數存取
    * 生命週期(scope)
        * 跟著所屬的物件實體創建而存在,
        * 只要該物件實體還在, 此實體變數就會隨著物件存活著, 直到該物件消失才結束
## 變數於記憶運作機制
![](https://i.imgur.com/z9Z7jcG.png)

![](https://i.imgur.com/eKYe9Ff.png)

 
* 類別 ( class ) 只用來決定( Object ) 形成的樣子
    * 當物件 ( Object ) 形成時，物件就變成一個記憶體中的空間
![](https://i.imgur.com/5XGijy0.png)

### pass by value / pass by reference
* 傳遞參數為基本資料型別，採用pass by value (傳值)
* 傳遞參數為物件，則採用pass by reference  (傳址)
```java=
/*
 * 此範例為傳值傳址測試
 */
public class PassArgTest {
						// 根據17行提供的值
	static void passValue(double value) {
		value = 20.0;
	}
						// 根據22行，此參數是呼叫時提供myPen的參考
	static void passReference(Pen reference) {
		reference.price = 20.0;
	}
	
	public static void main(String[] args) {
		double price = 10.0;
		passValue(price); // 傳遞基本資料型別，可看作值的複製(value copy)
		System.out.println(price);        // 10
		
		Pen myPen = new Pen();
		myPen.price = 10.0;
		passReference(myPen); // 傳遞參考型別的引數給方法使用，可看作為參考的複製(reference copy)
		System.out.println(myPen.price);  // 20
	}
}
```

# 物件導向程式語言(OOP)
* 物件導向三種特性：
    * 封裝(Encapsulation)
        * 依類別成員存取權限分為
            * private, default, protected, public
    * 繼承(Inheritance)
        * 子類別可繼承父類別的成員
        * 可修改或是新增自有成員
        * 可 Override 從父類別繼承的方法
    * 多型(Polymorphism)
        * 父類別指向子類別物件，並對應到子類別適用的方法
        並對應到子類別 overriding 的方法，稱動態繫結( dynamic binding )
* OOP 使用訊息傳遞(Message Passing)，透過物件接受訊息、處理訊息、傳送訊息來實現功能
# 陣列(Array)
* 陣列是由一群相同資料型態的變數所組成的一種資料結構。
* 變數與陣列的比較
* 變數：
    * int x = 0;
    * Pen myPen = new Pen();
* 陣列：
    * int x[] = new int[3]
    * Pen myPen[] = new Pen[3];
* 程式進入點main可以接受零至多個字串當作參數(String args[])傳入，
* String args[]其實就是一個字串陣列

## 宣告陣列與元素存取
### 宣告陣列
* 陣列(Array)宣告：
    * 陣列也是一種Reference資料型態
    * 也是傳遞陣列的記憶體位址(memory address)
    * 注意：new 宣告的同時必須指定長度且不可再更改
```java=
public class Main {

	public static void main(String[] args) {
		// int Array寫法一
		int x1[] = new int[3];
		x1[0] = 10;
		x1[1] = 20;
		x1[2] = 30;
		
		System.out.printf("%d,%d,%d\n",x1[0],x1[1],x1[2]);
		// int Array寫法二
		int x2[] = {10,20,30};
		System.out.printf("%d,%d,%d\n",x2[0],x2[1],x2[2]);
		
		// String Array寫法一
		String s1[] = new String[3];
		s1[0] = "one";
		s1[1] = "two";
		s1[2] = "three";
		System.out.printf("%s,%s,%s\n",s1[0],s1[1],s1[2]);
		
		// String Array寫法二
		String s2[] = {"one","two","three"};
		System.out.printf("%s,%s,%s\n",s2[0],s2[1],s2[2]);
	
		//class Array寫法一
		Pen p1[] = new Pen[3];
		p1[0] = new Pen();
		p1[1] = new Pen();
		p1[2] = new Pen();
	
		////class Array寫法二
		Pen p2[] = {new Pen(), new Pen(), new Pen()};
	}
}
```

### 元素存取
* 取得陣列的長度
    * 語法：陣列名稱.length (如 myAttay.length)
    * 注意：
        * 一維陣列為元素個數
        * 二維陣列維列數
        * length後面不可加上小括號，因此此處的length並非方法，
          且陣列的一個屬性 跟 String類別的length() 不同
    * 取得陣列的元素
        * 可藉由索引值(index)存取陣列中儲存的資料值
        * 注意：索引值從0開始
* 陣列使用 new 關鍵字分配好儲存空間後，所有元素都會自動賦予初始值 
 
### 陣列宣告的預設初始值
| 型別 | 基本型別 | 預設值 |
| -------- | -------- | -------- |
| 整數     | byte、short、int、long     | 0     |
| 浮點數     | float、double     | 0.0     |
| 字元     | char     | 空、''、'\u0000'     |
| 邏輯     | boolean     | false     |

### 一維陣列01
```java=
public class Main {
	public static void main(String[] args) {
		int intArray[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
		int sum = 0;
		for(int i = 0; i < intArray.length ; i++) {
			sum += intArray[i];
		}
		System.out.println(sum);
	}
}
```

### 一維陣列02
```java=
package January22;

public class Main {

	public static void main(String[] args) {
		int a[] = {65,68,69};
		for(int i:a) {
			System.out.println(i);
		}
	}
}
```

### 二維陣列
```java=
public class Main {
	public static void main(String[] args) {
		int intArray[][] = {
					{1, 2, 3, 4, 5},
					{ 6, 7, 8, 9, 10}
				};
		int sum = 0;
		for(int i = 0; i < intArray.length ; i++) {
			for(int j = 0; j < intArray[i].length ; j++) {
				sum += intArray[i][j];
			}
		}
		System.out.println(sum);
	}
}
```
### 觀察陣列的傳值
*  使用指定運算子(=)
```java=
public class TestAssignArray1 {

	public static void main(String[] args) {
		int[] intArray1 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

		// 將 intArray1指定給 intArray2
		int[] intArray2 = intArray1;

		// 將intArray2所有元素乘改成0
		for (int i = 0; i < intArray2.length; i++)
			intArray2[i] = 0;

		// 列印原來 intArray1所有元素,也會跟著改變
		for (int i = 0; i < intArray1.length; i++)
			System.out.println(intArray1[i]);
	}
}
```
```java=
public class TestAssignArray2 {

	static void passReference(int[] intArray) {
		for (int i = 0; i < intArray.length; i++)
			intArray[i] = 0;
	}

	public static void main(String[] args) {
		int[] iArray = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
		passReference(iArray);
		for (int i = 0; i < iArray.length; i++)
			System.out.println(iArray[i]);
	}
}
```

## 陣列進階運用
* 陣列的排序
    * static void Arrays.sort(欲排序陣列名稱)，可讓陣列元素由小到大排序
    * 遞增排序:Arrays.sort(陣列名稱)
    * 遞減排序:Arrays.sort(陣列名稱.Collection.reverseOder()) 
* 陣列的搜尋
    * static int Arrays.binarySearch(陣列名稱, 欲搜尋的值)
    * 使用二分搜尋法，搜尋陣列內某個值的位置(回傳int)
    * 執行搜尋前，必須先將陣列排序，如果該值不在陣列則回傳負值
* 陣列的複製(copyOf())
    * static複製的陣列型別Arrays.copyOf() (複製的陣列名稱，複製的長度)
    * 複製出新的陣列可以不用預先初始化(不用new)，直接回傳(複製出)一個新的陣列

### Arrays類別常用方法示範
```java=
public class TestArrays {
	public static void main(String[] args) {
		// 陣列排序
		int[] intArray = {200, 300, 100};
		Arrays.sort(intArray);  // 呼叫sort方法並傳入欲進行排序的陣列
		for(int i = 0; i < intArray.length; i++) {
			System.out.println(intArray[i]);
		}
        
		System.out.println("==============");
		
		//複製陣列
		int[] intArray2 = {100, 200, 300};
		//呼叫copyOf方法並傳入兩個參數：欲複製的陣列、欲複製的陣列長度
		int[] intArray2B = Arrays.copyOf(intArray2, intArray2.length);
		intArray2[0] = 0;
		System.out.println(intArray2[0]);
		System.out.println(intArray2B[0]);
		
		System.out.println("==============");
		
		// 搜尋陣列內的值
		int[] intArray3 = {100, 200, 300, 50};
		// 呼叫binarySearch方法並傳入兩個參數：欲搜尋的陣列、欲搜尋的值
		// 注意：欲搜尋前必先將陣列進行排序
		Arrays.sort(intArray3);
		int i1 = Arrays.binarySearch(intArray3, 50);  // 有要搜尋的值
		int i2 = Arrays.binarySearch(intArray3, 150); // 沒有搜尋到值
		System.out.println(i1);
		// 回傳負索引減1的值
		System.out.println(i2);
	}
}
```

### 氣泡排序法
```java=
public class TestBubble {

	public static void main(String[] args) {
		int a[] = { 38, 27, 19, 56, 92, 1, 68, 72, 100, 43 };

		for (int i = 0; i < a.length - 1; i++) { // 從a[0]比到a[8]，比較a[9]沒有意義
			for (int j = 0; j < a.length - i - 1; j++) {
				if (a[j + 1] < a[j]) {
					int temp = a[j + 1]; // 交換陣列元素
					a[j + 1] = a[j];
					a[j] = temp;
				}
			}
		}

		for(int i = 0; i < a.length; i++) {
			System.out.print(a[i] + " ");
		}
	}

}
```

### 陣列3x3範例
* 請分別建立x, y, z三個3x3的int陣列
* 把x和y陣列的加總存放到z陣列裡，
* 再將結果顯示於螢幕上
```java=
public class Demo01 {

	public static void main(String[] args) {
		// step 1 : 建立3個3x3的二維陣列
		int[][] x = new int[3][3];
		int[][] y = new int[3][3];
		int[][] z = new int[3][3];
		// step 2 : 將亂數資料加入到x陣列
		for (int i = 0; i < x.length; i++) {
			for (int j = 0; j < x[i].length; j++) {
				x[i][j] = (int) (Math.random() * 31);
			}
		}
		// step 3 : 將亂數資料加入到y陣列
		for (int i = 0; i < y.length; i++) {
			for (int j = 0; j < y[i].length; j++) {
				y[i][j] = (int) (Math.random() * 31);
			}
		}

		// step 4 : 兩個陣列元素加總的結果加入到z陣列
		for (int i = 0; i < z.length; i++) {
			for (int j = 0; j < z[i].length; j++) {
				z[i][j] = x[i][j] + y[i][j];
			}
		}

		// step 5 : 列印三個陣列的元素
		for (int i = 0; i < x.length; i++) {
			for (int j = 0; j < x[i].length; j++) {
				System.out.print(x[i][j] + "\t");
			}
			System.out.println();
		}

		System.out.println("=====================");

		for (int i = 0; i < y.length; i++) {
			for (int j = 0; j < y[i].length; j++) {
				System.out.print(y[i][j] + "\t");
			}
			System.out.println();
		}

		System.out.println("=====================");

		for (int i = 0; i < z.length; i++) {
			for (int j = 0; j < z[i].length; j++) {
				System.out.print(z[i][j] + "\t");
			}
			System.out.println();
		}

		System.out.println("=====================");
	}
}

```
重構
```java=
package February12;

public class Demo01 {

	public static void main(String[] args) {

		RandomArray2 ra = new RandomArray2();
		int[][] x = ra.getRandomArray();
		int[][] y = ra.getRandomArray();
		int[][] z = new int[3][3];

		for (int i = 0; i < z.length; i++) {
			for (int j = 0; j < z[i].length; j++) {
				z[i][j] = x[i][j] + y[i][j];
			}
		}
		ra.printArray(x);
		ra.printArray(y);
		ra.printArray(z);
	}
}
```
```java=
package February12;

public class RandomArray2 {

	public int[][] getRandomArray() {
		int[][] data = new int[3][3];
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[i].length; j++) {
				data[i][j] = (int) (Math.random() * 31);
			}
		}
		return data;
	}

	public void printArray(int[][] data) {
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[i].length; j++) {
				System.out.print(data[i][j] + "\t");
			}
			System.out.println();
		}
		System.out.println("===================");
	}

}
```

### Arrays、ArrayList、stream
* 有個一維陣列如下:
* {29, 100, 39, 41, 50, 8, 66, 77, 95, 15}
* 請寫出一隻程式能輸出此陣列所有元素的平均值與大於平均值的元素
* (提示:陣列,length屬性)
```java=
package February12;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Homework01 {

	// 加總
	public int arr_sum(int[] arr) {
		return Arrays.stream(arr).sum();
	}

	// 平均值
	public int arr_avg(int[] arr) {
		return arr_sum(arr) / arr.length;
	}

	// 大於平均值的元素
	public void arr_greater_avg(int[] arr) {
		List<Integer> arr_list = new ArrayList<Integer>();
		for (int i : arr) {
			if (i > arr_avg(arr)) {
				arr_list.add(i);
			}
		}
		System.out.println(arr_list);
	}

	public static void main(String[] args) {
		int[] arr = { 29, 100, 39, 41, 50, 8, 66, 77, 95, 15 };

		Homework01 h01 = new Homework01();
		// 加總
		System.out.println(h01.arr_sum(arr));
		// 平均值
		System.out.println(h01.arr_avg(arr));
		// 大於平均值的元素
		h01.arr_greater_avg(arr);
	}
}
```
# 字串不可變與字串池
* String物件特性
     不可變(immutable)字串：String一旦宣告後，即不能在原所在記憶體位置改變字串內容*使用String類別任何方法時，傳回的字串都會放在新的記憶體空間
    * String s1 = new String("Hello");
        * 有自己的記憶體空間
    * String s1 = "Hello";
    * 為了加快程式執行，Java會將此類字串放在字串池(String Pppl)
    * 程式若有多個變數，都使用相同字串常數，則均會使用相同記憶體空間(即字串池String Pool)
* 因為字串池內容不可改變(immutable)
所以可以讓多個變數參考相同物件
不用怕有修改的問題發生
達到重複使用、減少資源消耗
![](https://i.imgur.com/vnnF7jv.png)

## 字串比較 == 、 equals
* Java字串的 == 與 equals
* String的比較
    * 比較字串內容時，並非使用 == ，因為 == 在Java字串中，比較的是記憶體位址
    * 指的是占用相同的記憶體空間，而不是內容
    * 比較字串內時，應該使用String物件本身提供的方法
    * public boolean equals(Object anObject)
```java=
public class Demo01 {
	public static void main(String[] args) {
		String s1 = "Hello";
		String s2 = "Hello";
		String s3 = new String("Hello");
		
		System.out.println(s1 == s2); //true
		System.out.println(s1 == s3); //false
		System.out.println(s1.equals(s2)); //true
		System.out.println(s1.equals(s3)); //true

	}
}
```

## 字串常用方法示範
* String常用方法
```java=
    public char charAt(int index)：
        透過索引值取得字串內某一字元
    
    public int length()：
        回傳字串長度(注意!空白也算進去)
    
    public boolean isEmpty()：
        如果字串長度為0，回傳true，否則false
    
    public String substring(int beginIndex)：
        擷取從開始索引值的字元至結尾自字元的字串
    
    public String substring(int beginIndex, in exdIndex)：
        擷取從開始索引值的字元至結束索引值的字元之間的字串
        注意！結束索引值的字元不取
    
    public int compareTo(String antotherString)：
        比較的方式由左至右，依照字元ASCII值比較大小
        若回傳值=0，表示兩個字串相等
        若回傳值>0，表示左邊字串大於右邊字串
        若回傳值<0，表示左邊字串小於右邊字串
```
* null 空值
* 不代表任何記憶體位址，沒有指向任何實體
* 多用在宣告物件操考變數時的起始值
```java=
public class Demo03 {
	public static void main(String[] args) {
		String s1 = "Hello", s2 = "Hello";
		String s3 = new String("Hello");
		String s4 = " ";
		String s5 = " Hello ";
		String s6 = null;

		System.out.println(s1.charAt(4)); // 注意：索引從0開始
		System.out.println(s1.length());
		System.out.println(s4.isEmpty());
//		System.out.println(s6.isEmpty()); // null空值，不代表任何記憶體位址，沒有指向任何實體

		// substring第一個索引值開始
		// 若有兩個參數，第二個參數是結束的索引值，且不會呈現
		System.out.println(s1.substring(1)); // 注意：索引從0開始
		System.out.println(s1.substring(1, 4)); // 注意：索引從0開始
		System.out.println(s1.compareTo(s4)); // 依照字元ASCII值比較大小
		System.out.println(s5.trim()); // trim()：頭尾空白都去掉
		System.out.println(s5); //字串是immutable不可改變
		System.out.println(s4.trim().isEmpty()); //將頭尾空白去掉後，判斷是否空值
	}
}
```

# main方法的參數
* 程式進入點main方法可以接受零至多個字串當作參數傳入
* String[] args 指的就是一個字串陣列
## args測試
### 命令提示cmd
```java=
public class Demo01 {
	public static void main(String[] args) {
	    System.out.println("貓的英文是：" + args[0] + args[1] + args[2]);
	}
}
```
![](https://i.imgur.com/4NvmleM.png)
* 編譯時出現亂碼，需要將儲存的編碼格式修改為：ANSI

### Eclipse
![](https://i.imgur.com/qX4w61o.png)
![](https://i.imgur.com/g4q15ug.png)
![](https://i.imgur.com/Kkjgi4G.png)
![](https://i.imgur.com/Cup3sfi.png)

## 不固定參數機制(varargs)
* Varargs(不固定參數個數 / 可變數目的參數)
    * 方法內可使用 [...]點號，宣告[可變數目的參數]
    * 可變參數必須放在參數列的最後面
    * 方法中最多只有1個不固定參數的宣告，不能有2個或2個以上的不固定參數
* 例如
    * void methodTest1(int x, String... args){...}
    * void methodTest2(String... args){...}
        * 呼叫methodTest2的方法時就可變化如：
            * methodTest2("Xx");
            * methodTest2("xx", "yy");

```java=
public class AddInt {

	public int varArgTest(int... c) {
		int sum = 0;

		for (int i = 0; i < c.length; i++) {
			sum += c[i];
		}

		return sum;
	}

	public static void main(String[] args) {
		AddInt add = new AddInt();
		int sum1 = add.varArgTest();
		int sum2 = add.varArgTest(1, 2);
		int sum3 = add.varArgTest(1, 2, 3, 4);

		System.out.println("sum1=" + sum1); // 0
		System.out.println("sum2=" + sum2); // 3
		System.out.println("sum3=" + sum3); // 10
	}

}
```