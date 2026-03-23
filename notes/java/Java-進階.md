Java - 進階
===
# 目錄
* [Java - 基礎](https://hackmd.io/@KfriURWvR1OWM2V5ZWsnQA/BkgzGkBat)
* [Java - 物件導向程式設計(實務應用一)](https://hackmd.io/@KfriURWvR1OWM2V5ZWsnQA/Sk5lzBi1c)
* [Java - 物件導向程式設計(實務應用二)](https://hackmd.io/@KfriURWvR1OWM2V5ZWsnQA/SkP5SREW9)

# Java存取修飾字
:::warning
* public
    * Visible to the world
    * 所有類別皆能存取
* protected
    * Visible to the package and all subclasses
    * 同套件底下類別或所有其子類別皆可存取
* default(預設)
    * Visible to the package
    * 同套件底下類別皆可存取
    * 不是使用default關鍵字，沒有出現任何存取權限稱"預設"
* private
    * Visible to rhe class only
    * 只有該類別內部才可存取
* 存取修飾子大至小
    * public --> protected --> default -->private
* 注意
    * <font color="#f00">**類別只能使用public與default兩種修飾子。**</font>
    * 方法變數(區域變數)不能使用存取修飾子。
        * 因為區域變數的存取是由它所屬方法決定好的
    * 若要使用default，並不是寫default關鍵字，而是空白即可。
:::
![](https://i.imgur.com/i3yO0t8.png)
![](https://i.imgur.com/32IPbAi.png)

# 封裝(Encapsulation)
:::warning
* 什麼是封裝?
    * <font color="#f00">**封裝就是將屬性、方法放進物件，這就是封裝**</font>
* 目的：
    * <font color="#f00">**透過"存取修飾字"來限制其他類別存取此類別的資料和方法成員**</font>
        * 必須透過該物件的成員方法來對資料進行存取
        * 其他程式無法直接對此物件的資料存取
    * <font color="#f00">**封裝的基本就是類別**</font>
    * Java使用4種存取修飾子作為封裝權限的等級
        * private, default, protected, public
* 封裝設計
    * 設計類別時，建議實體變數( instance variable )設定為 <font color="#f00"> **private 權限**</font>
    * 只能藉由自己類別中的方法來修改或查看
    * 這些方法(getter / setter)應該包含程式碼和運作邏輯，
    * 以確保變數不會設定成不適當的值
* 封裝設計思維
    * 思考方向
        * 個人
        * 商業
    * 運用分析
        * 類別設計
        * 資料、方法存取控制
:::
## 封裝：NG範例
```java=
package module16_19;
/*
 * 設計類別時的不好示範
 * 資料操作安全性考量
 * 搭配PenTestNG.java使用
 */
public class PenNG {
	public String brand;
	public double price;
	
}
```
```java=
/*
 * 透過此範例讓同學暸解封裝其重要性
 */
public class PenTestNG {

	public static void main(String[] args) {
		PenNG p = new PenNG();
		p.brand = "SKB";
		p.price = -10;
		
		System.out.println(p.brand);
		System.out.println(p.price);
	}
}
```

## 封裝：正確範例
:::warning
* 在方法裡加上對資料的驗證檢查邏輯
* 確保外界對我們資料存取的正確性
:::
```java=
/*
 * 正確的資料封裝處理示範
 * 將商業邏輯放在getter/setter方法裡
 * 可確保資料操作安全與正確性
 */
public class PenGood {
	private String brand;
	private double price;
	
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brandXXX) {
		brand = brandXXX;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double priceXXX) {
		if(priceXXX > 0)
			price = priceXXX;
		else
			System.out.println("請確認售價設定");
	}
}
```
```java=
/*
 * 試著操作給不同的值
 * 看結果有何變化
 */
public class PenTestGood {

	public static void main(String[] args) {
		PenGood p = new PenGood();
		p.setBrand("SKB");
		p.setPrice(10);
//		p.setPrice(-10);
		
		System.out.println(p.getBrand());
		System.out.println(p.getPrice());
	}
}
```



:::warning
* 因為資料皆須被保護，故需使用封裝機制，
* 但設定資料時，會造成程式碼的重複性高。
* 故衍伸出建構子。
:::


# 建構子
:::warning
* <font color="#f00">**建構子名稱需與類別名稱相同**</font>
* 建構子宣告：
    * [modifier] constructor_name([arguments]){...}
    * 一個類別可以有多個建構子
        * <font color="#f00">**建構子有overloading機制**</font>
    * 一個建構子可以傳入零至多個參數
    * 建構子類似方法，可以存放修飾子
    * 建構子沒有宣告回傳型別，加了回傳型別即成為一般方法

:exclamation:<font color="#f00">**必須使用 new 關鍵字呼叫建構子產生物件，且同時初始化該物件的實體變數**</font>

:exclamation:<font color="#f00">**Java預設會自動給一個不帶參數的建構子**</font>

:exclamation:<font color="#f00">**一旦宣告其他建構子，Java會自動將此預設建構子移除**</font>
:::

## 建構子：範例
```java=
package module16_19;

public class PenConstructor {
	private String brand;
	private double price;
	
	public PenConstructor(String brandXXX, double priceXXX) {
		brand = brandXXX;
		price = priceXXX;
	}
	
	public static void main(String[] args) {
		PenConstructor pc = new PenConstructor("SKB", 10);
		System.out.println(pc.brand);
		System.out.println(pc.price);
	}
	
}
```

## 建構子只是初始化，取得值或修改值只能透過get/set
```java=
public class Animal {
	
	private int age;
	private float weight;
	
	public Animal(int age,float weight) {
		this.age=age;
		this.weight=weight;
	}
	
	public void speak() {
		System.out.printf("%d歲，%.1f公斤",age,weight);
	}
	
	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public float getWeight() {
		return weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}

}
```
```java=
public class AnimalTest {

	public static void main(String[] args) {
		Animal a1 = new Animal(2, 5.0f);
		a1.speak();
	
	
		System.out.println("=== 經過三年 ===");
		
//		因為private所以不能直接改變值
//		a1.age = 5;
//		a1.weight = 25.0f;
		
//		Animal建構子需要透過new來建立
//		a1.Animal(5,25.0f);
		
//		產生新的物件，並非原本的a1
//		a1 = new Animal(5, 25.0f);
		
		a1.setAge(5);
		a1.setWeight(25.0f);
		
		a1.speak();
	}

}
```


## 建構子覆載(Overloading)
:::warning
* 可以藉由 <font color="#f00">**this**</font> 關鍵字呼叫同類別底下的另一個建構子
* 建構子第一行只要有this()，則進行呼叫其它建構子
* this代表的是：這個"物件"
:::

```java=
package module16_19;
/*
 * 此範例為多載建構子示範
 * 可以透過this關鍵字呼叫當前物件與其它建構子
 */
public class PenConstOverload {
	private String brand;
	private double price;
	
	public PenConstOverload(String brand, double price) {
		this.brand = brand;
		this.price = price;
	}
	
	public PenConstOverload(double price) {
		this("SKB", price);
	}
	
	public PenConstOverload(String brand) {
		this(brand, 10);
	}
	
	public PenConstOverload() {
		this("SKB", 10);
	}
	
	public void showInfo() {
		System.out.println("牌子為： " + brand);
		System.out.println("價格為： " + price);
		System.out.println("=============");
	}
	
	public static void main(String[] args) {
		
		PenConstOverload p1 = new PenConstOverload("A", 20);
		PenConstOverload p2 = new PenConstOverload(40);
		PenConstOverload p3 = new PenConstOverload("B");
		PenConstOverload p4 = new PenConstOverload();
		
		p1.showInfo();
		p2.showInfo();
		p3.showInfo();
		p4.showInfo();
	}
}
	public Constructor_Overloading() {
		this("SKB", 10);
	}
}
```

# Static 關鍵字
:::warning
* 實體變數和方法若宣告為 static
    * 變數成為<font color="#f00">  **類別變數 ( 靜態變數 )**  </font>
    * 方法成為<font color="#f00">  **類別方法 ( 靜態方法 )**  </font>
* 宣告為static的變數和方法，不是由任何此類別的物件單獨擁有，而是
    * <font color="#f00">**屬於此類別的所有物件共同擁有**</font>
* 補充1：實體變數由物件各自獨立維護，彼此不受干擾
* 補充2：static 類別變數是屬於類別的變數，但卻可由該類別所創造(new)出來的物件共用
* 補充3：儲存類別變數和方法的記憶體空間為 global，與儲存物件的記憶體空間是分開的
* 補充4：使用 static 變數和 static 方法的方式有兩種：
    * 經由類別的任何實體來呼叫 (不好也不鼓勵使用)
    * 經由類別的名稱來呼叫 (較好的方式)
:::
:::warning
* static宣告的變數為共享共用
    * 例如：銀行裡的錢與客戶的錢
        * 客戶01向銀行提錢
        * 客戶02向銀行存錢
        * 都是針對static銀行裡的錢進行存取
:::
## static機制
:::warning
* 當類別第一次被載入JVM時，在任何實體被建構之前
* <font color="#f00">**靜態的變數與方法就會先被載入**</font>
    * <font color="#f00">**static方法不可使用this**</font>
    * <font color="#f00">**static方法不可被覆寫(override)**</font>
        * 類別方法不存在覆寫機制(因為是屬於類別的項目，非物件的行為)
        * 且子類別裡不可出現跟父類別static方法相同的一般方法
    * 宣告為靜態static方法，不可以存取該類別中non-static的變數和方法，只可以存取該類別中static的變數和方法
        * 因為實體變數/一般方法須透過new才能產生物件
        經過static宣告後會先被載入
        因此實體變數/一般方法還未new出物件時
        static沒有辦法找到實體變數/一般方法
    * 宣告為non-static的方法，可以存取該類別中non-static的變數和方法，也可以存取該類別中static的變數和方法
:::

```java=
public class TestCount {

	public static void main(String[] args) {
		System.out.println("起始數量:" + Count.getTotalCount() + "\n");

		Count count1 = new Count();
		System.out.println("累計數量:" + Count.getTotalCount());
		System.out.println("序號:" + count1.getSerialNumber() + "\n");

		Count count2 = new Count();
		System.out.println("累計數量:" + Count.getTotalCount());
		System.out.println("序號:" + count2.getSerialNumber() + "\n");
	}
}
```
![](https://i.imgur.com/W2We30z.png)
```java=+
public class Count2 {
	// 產品序號
	private int serialNumber;

	public int getSerialNumber() {
		return serialNumber;
	}

	// 產品數量
	private static int counter;
	static {
		counter = 0;
		System.out.println("起始數量:" + counter + "\n");
	}

	public static int getTotalCount() {
		return counter;
	}

	// 建構式
	public Count2() {
		counter++;
		serialNumber = 1000 + counter;
	}
}
```
:::warning
* static方法不得存取non-static變數
:::
```java=
public class Demo01 {
	private int number; //non-static的變數
	public static int getNumber() {
		return number(); //編譯失敗，因為static方法裡，不得存取non-static變數
	}
}
```

### 使用static方法與main方法
:::warning
* <font color="#f00">**main 方法本身帶有 static**</font>
    * 同類別下想要在main方法裡使用一般方法
        * 必須將一般方法宣告成static 或
        * 在main方法裡new出物件 即可
:::
```java=
public class TestStaticMethod {

	public static void main(String[] args) { //main方法本身帶有static
		 System.out.println("請畫三角形!");
         int count = 9;
         drawTriangle(count); //drawTriangle方法有宣告static
         System.out.println("畫的還不錯!");
     }
     
    //當類別第一次被載入JVM時，在任何實體被建構之前，靜態的變數與方法就會先被載入
     public static void drawTriangle(int count){
         int i, j;
         for ( i = 1; i <= count; i++){
            for ( j = 1; j <= i; j++ )
               System.out.print("*");
            System.out.println();
         }
	}
}
```
:::warning
* 範例
:::
```java=
public class InitialBlock {
	private String brand;
	private double price;
	private static int amount;
	
	/* Java會在編譯時自動加入初始區塊，目的是將實體變數(屬性)的初始值建立好
	 * 如果類別裡有靜態變數，會自動加入靜態初始區塊，目的一樣
	   {
		 name = null;
		 price = 0.0;
	   }
	
	   static {
		 amount = 0;
	   }
	*/
	
	// 我們也能自行建立初始區塊，用來定義初始值或是有些需要先執行的內容
	// 但執行的先後順序一定是Java預設的初始區塊先執行，再來才執行我們定義的區塊內容
	{
		price = 10.0;
//		amount = 10;   //OK
		System.out.println("Hello");
	}
	
	// 我們也能自行建立static初始區塊，用來定義static初始值或是有些需要先執行的內容
	// 但執行的先後順序一定是Java預設的初始區塊先執行，再來才執行我們定義的區塊內容
	static {
		amount = 10;
//		price = 20.0;  // NG, static區塊裡只能有static變數
	}
	
	//建構式
	public InitialBlock(String brand, double price) {
		this.brand = brand;
		this.price = price;
		System.out.println("Here is Constructor");
	}
	
	public InitialBlock() { }
	
	
	/*
	 * 總結：
	 * 1. Java為了給實體變數跟static變數初始值，所以會在編譯時自動加入初始區塊設定初始值
	 * 2. 設計上若是有些內容想要先執行或是先指定初始值時，可以再自行加入區塊 (不常用)
	 * 3. 物件產生的程式執行順序 (Java預設區塊 → 自行定義區塊 → 建構式) 
	 */
	
	public static void main(String[] args) {
//		InitialBlock ib = new InitialBlock();
		InitialBlock ib = new InitialBlock("SKB", 10);
		System.out.println(ib.brand);
		System.out.println(ib.price);
		System.out.println(InitialBlock.amount);
	}
	
	
}
```

## java結構
:::warning
* 類別
    * 資料
        * 變數 ( 基本型別(存值)、類別型別(存址的值) )
            * 區域變數
            * 實體變數
            * 類別變數(必須有static宣告)
        * 常數
    * 方法
        * 建構子(名稱必須與類別相同)
        * 一般方法(成員變數)
        * 類別方法(必須有static宣告)
:::


# 繼承(Inheritance)
:::warning
* 什麼是繼承?
    * 比如說大家都是人，但職業都不相同，有工程師、老師，他們各自代表不同身分，也都是人，所以可以繼承人的屬性、方法
* 繼承的目的?
    * <font color="#f00">**去除重複的程式碼，提高程式的重複使用性**</font>
* 說明
    * <font color="#f00">**子類別會繼承父類別所有變數與方法**</font>
    * <font color="#f00">**共同資料以及處理共同資料的成員方法只描述一次**</font>
        * 為子類別( subclass )延伸( extends )自父類別( superclass )
        * 父類別( superclass )
            * 具有共同成員的類別
            * 一般化( generalization )
        * 子類別( subclass )
            * 繼承自父類別的類別
            * 特別化( specialization )
        * 例如正職員工( FullTime )與工讀生( PartTime )
            * 都有共同資料，如姓名、電話、地址、性別等…
            * 能不能在子類別直接使用，必須看存取權限關鍵字決定
    * 每一個子類別可以使用定義在父類別的成員方法
        * 例如員工方法的
            * getName();
            * getSalary();
        * 子類別繼承父類別功能之後：還可以再加入新方法 ( method )
        * 也可以覆寫(override)從父類別而來的方法，建立一個專屬自己類別的運作邏輯
:::
## 繼承語法與注意事項
:::warning
* 語法
:::
```java=
class SubClassName extends SuperClassName
class FullTimeEmployee extends Employee {
    private double monthlySalary; //月薪
}
```
:::warning
* 注意
    * <font color="#f00">**不支援多重繼承**</font>
        * 一個子類別只能extends一個父類別
    * <font color="#f00">**建構子(Constructor)無法被繼承**</font>
    * <font color="#f00">**java.lang.Object 類別是所有類別的共同父類別**</font>
:::

##  is a 與 has a 觀念建立
:::warning
*  當B繼承自A，以「B is a A」表示
:::
```java=
class FullTimeEmployee extends Employee {
    private double monthlySalary; //月薪
}
// FullTimeEmployee is a Employee
// FullTimeEmployee has a monthlySalary
```

## 繼承的方法覆寫( override )機制
:::warning
* 目的：
    * 子類別繼承父類別後，不滿意父類別定義的方法
        * <font color="#f00">**子類別可以在繼承後重新改寫，即為overriding**</font>
* 規定：
    * 子類別宣告覆寫(overriding)方法時
        * <font color="#f00">**方法名稱、參數個數、參數型別與回傳值**</font>皆須跟父類別裡被覆寫的方法相同
        * JDK 1.5開始，如回傳型態是類別，則可以是原方法回傳值型別的子類別
        * <font color="#f00">**存取修飾子的等級不可以小於原方法**</font>
            * 指可以一樣或是更加寬廣
        * <font color="#f00">**子類別覆寫父類別定義有throws的方法時**</font>
            * 不得比父類別被覆寫方法的Exception還要高階** 

:exclamation: 只是對方法內容作改變，原則上只要跟父類別的方法格式相同就符合改寫規則
:::

### 子類別覆寫(override)父類別的方法
:::warning
* 其存取控制的範圍不可小於原方法
    * 必須是相同或是開放等級更高
:::
```java=
public class Father {
    protected void doSomething() {…}
}
覆寫存取修飾字規則
public class Son extends Father {
private void doSomething() {…} //失敗，private小於protected
void doSomething() {…} //失敗，default小於protected
protected void doSomething() {…} //成功，與父類別同存取等級
public void doSomething() {…} //成功，大於父類別存取等級
}
```
### 員工繼承範例
```java=
public class Employee {
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
	}

	public void display() {
		System.out.println("empno = " + empno);
		System.out.println("ename = " + ename);
	}
}
```
```java=
public class FullTimeEmployee extends Employee {
	private double monthlySalary; // 月薪

	public void display() {
		super.display();
		System.out.println("月薪 = " + monthlySalary);
	}

	public FullTimeEmployee(int empno, String ename, double monthlySalary) {
		super(empno, ename);
		this.monthlySalary = monthlySalary;
	}
}

```
```java=
public class Manager extends FullTimeEmployee {
	private double bonus; // 獎金; 額外津貼; 特別補助

	public void display() {
		super.display();
		System.out.println("額外津貼 = " + bonus);
	}

	public Manager(int empno, String ename, double monthlySalary, double bonus) {
		super(empno, ename, monthlySalary);
		this.bonus = bonus;
	}
}
```

## final關鍵字
:::warning
* 類別宣告為final：<font color="#f00">**類別不能被繼承**</font>
* 方法宣告為final：<font color="#f00">**方法不能被覆寫(Override)**</font>
* 變數宣告為final：<font color="#f00">**變數初始值化後，不得改變其值，也就是常數(Constant)**</font>
* 物件參考變數宣告為final：<font color="#f00">**變數初始值化後，不得再指向另一個物件**</font>
:::

## super呼叫父類別方法
:::warning
* 子類別透過 super. 可以呼叫上一層類別的方法
* 語法 ： super.methodName( );
* 其中的 methodName( ) 為上一層類別的方法，<font color="#f00">**無法越級呼叫.**</font>

:exclamation: <font color="#f00">**多在覆寫時用到，但非必要**</font>
:::

### 呼叫父類別的建構子
:::warning
* 共同的資料應使用父類別的建構子
* 子類別透過建構子super(…)將共同的建構子參數傳給父類別
* 物件產生時，<font color="#f00">**建構子呼叫的順序為先父類別再子類別**</font>
    * 保證子類別物件裡的共同資料一定都有初始化的動作
    * 建構子中若有出現 super(…)，<font color="#f00">**一定要放在第一個敘述位置**</font>
    * 建構子中若未出現 super(…)，<font color="#f00">**Java預設會有一個隱形的 super()**</font>
* 【呼叫父類別不帶參數的建構子】預設自動放在第一個敘述的位置
* super(...) 與 this(...)
    * 都只能放在建構子第一個敘述的位子
    * 才能符合建構子執行順序
    * 所以兩者只能擇一使用
:::
* 父類別
```java=
package February14;

public class Animal {
	
	private int age;
	private float weight;
	
	public Animal() {
		//1.保留給使用者的彈性
		//2.保留無參數建構子給日後搭配的工具(框架)使用，讓它們可以利用此建構子幫我們產生物件
	}
	
	public Animal(int age,float weight) {
		this.age=age;
		this.weight=weight;
	}
	
	public void speak() {
		System.out.printf("%d歲，%.1f公斤",age,weight);
	}
	
	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public float getWeight() {
		return weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}

}
```
* 子類別
```java=
package February14;

public class Elephant extends Animal{
	private String name;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Elephant(int age, float weight, String name) {
		super(age,weight);
		this.name = name;
	}
	
	@Override //JDK 5的新機制 Annotation(標註)：給java相關工具看的資訊，像編譯器，框架等
	public void speak() {
		super.speak();
		System.out.println(" Name is " + name);
	}

	
	//此方法沒有符合改寫規則，但沒有編譯失敗，因為編譯器會當作overloading
	//一個是speak()繼承父類別沒有參數的，另一個是子類別有參數的
//	public void speak(int data) {
//		super.speak();
//		System.out.println(" Name is " + name);
//	}
	
}

```
* main方法
```java=
package February14;

public class AnimalTest {

	public static void main(String[] args) {
		Animal a1 = new Animal(3, 8.0f);
		a1.speak();
		System.out.println("\n");
		Elephant e1 = new Elephant(8, 1200f,"大象");
		e1.speak();
	}
}
```
## 員工算薪水

:::warning
* employee
:::

```java=
public class Employee {
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
	}

	public void display() {
		System.out.println("empno = " + empno);
		System.out.println("ename = " + ename);
	}
}
```
:::warning
* FullTimeEmployee
:::
```java=
public class FullTimeEmployee extends Employee {
	private double monthlySalary; // 月薪

	public void display() {
		super.display();
		System.out.println("月薪 = " + monthlySalary);
	}

	public FullTimeEmployee(int empno, String ename, double monthlySalary) {
		super(empno, ename);
		this.monthlySalary = monthlySalary;
	}
	public double getFullTimeSalary() {
		return monthlySalary;
	}
}
```
:::warning
* Manager
:::
```java=
public class Manager extends FullTimeEmployee {
	private double bonus; // 獎金; 額外津貼; 特別補助

	public void display() {
		super.display();
		System.out.println("額外津貼 = " + bonus);
	}

	public Manager(int empno, String ename, double monthlySalary, double bonus) {
		super(empno, ename, monthlySalary);
		this.bonus = bonus;
	}
	
	public double getManagerSalary() {
		//double monthlySalary = getFullTimeSalary();
		return getFullTimeSalary() + bonus;
	}
}
```
:::warning
* main方法
:::
```java=
public class SalaryTest {

	public static void main(String[] args) {
		FullTimeEmployee tom = new FullTimeEmployee(1010, "Tom", 300000);
		Manager ryan = new Manager(101, "Ryan", 600000, 400000);
		
		System.out.println(tom.getFullTimeSalary());
		System.out.println(ryan.getManagerSalary());
				
	}

}
```
:::warning
* employee一種薪水算法，Manager是另一種薪水算法
* 若還有parttime、約聘等員工
* 就要有非常多算薪水的方法
* <font color="#f00">**故衍伸出多型(Polymorphism)**</font>
:::


# 多型 (Polymorphism)
:::warning
* 什麼是多型?
* <font color="#f00">**一個物件有多種外型**</font>
* 例如 
    * 我有三個物件
    *  一個物件是人
    * 一個物件是學生
    * 一個物件是老師
    * 那老師物件一定是老師，當然也是一個人
    * 所以外型是人，物件是老師
* 繼承 與 多型
    * 多型 是運用類別間<font color="#f00"> **繼承關係**</font>
    * 使父類別可當成子類別的<font color="#f00"> **通用型態**</font>
    * 如：class FullTimeEmployee extends Employee
        * 正職員工「是一種」員工
        * class Manager extends FullTimeEmployee
        * 經理「是一種」正職員工
        * 經理也可以視為「是一種」員工
* 多型資料一致性操作
    * <font color="#f00">**對於不同的物件實體找出可通用的型別作為宣告**</font>
:::
# 型別多樣化
:::warning
* 回憶基本型別的晉升( promotion )關係：
    * double weight = 60; // OK 
    * long uid = 10000; // OK 
* 只要符合類別間的繼承關係
    * 在宣告參考變數時，子類別(位階低)物件實體可以升級成父類別(位階高)
:::
```java=
//new後面呼叫哪個建構子，就是用該類別來產生物件實體出來
Employee e1 = new FullTimeEmployee(); // OK
Employee e2 = new Manager(); // OK
Employee e3 = new PartTimeEmployee(); // OK
```

:::warning
Manager繼承FullTimeEmployee
FullTimeEmployee繼承Employee
PartTimeEmployee繼承Employee
:::
![](https://i.imgur.com/ng8tkKa.png)


```java=
Manager m1 = new Manager();
FullTimeEmployee = new Manager();
Employee = new Manager();
Object (Everything is an object)在java世界，所見及物件
```

## 類別型別轉換(Cast)
:::warning
* 基本型別的強制轉型(Cast)關係：
    * float weight = 65.0f; // OK 
    * int i1 = (int)10.0; // OK 
    * String s1 = (String) 10; // NG
* 父類別參考變數若是要轉型回子類別，則需要靠強迫轉型(Cast)，但是會在執行時期檢查是否能夠轉回適當的子類別
    * 如：Employee e1 = new FullTimeEmployee();
    * FullTimeEmployee f = (FullTimeEmployee)e1; // OK
    * Manager m = (Manager)e1;  <font color="#f00">**//執行發生執行發生java.lang.ClassCastException**</font>
        * 轉型失敗例外
* 從程式碼寫好到執行得到結果，java可分三大時期
    * 1.編譯時期
    * 2.載入(.class)時期
    * 3.執行時期 (物件實體創建)
    * 編譯器在編譯時期，物件實體尚未創建
        * 故一開始也無法得知參考物件指向甚麼
        * 所以無法在編譯時期判斷是否符合轉型
:::
:::warning
* 轉型失敗例外範例
:::
```java=
package module20_23;

public class TestPolymorphism1 {

	public static void main(String[] args) {
		EmployeePoly e1 = new FullTimeEmployeePoly(7002, "peter", 50000.0);
		EmployeePoly e2 = new ManagerPoly(7003, "merry", 50000.0, 10000.0);
		EmployeePoly e3 = new PartTimeEmployeePoly(7004, "John", 1000.0, 8);

		FullTimeEmployeePoly f = (FullTimeEmployeePoly) e1; // Type casting
//		ManagerPoly m = (ManagerPoly) e1; // 執行時期:java.lang.ClassCastException
//		PartTimeEmployeePoly m = (PartTimeEmployeePoly) e1; // 執行時期:java.lang.ClassCastException

//		System.out.println(e1 instanceof FullTimeEmployeePoly); // true
//		System.out.println(e1 instanceof ManagerPoly); // false
//		System.out.println(e1 instanceof PartTimeEmployeePoly); // false
	}
}
```

## instanceof關鍵字
:::warning
* instanceof 運算子
    * <font color="#f00">**判斷父類別參考變數真正指向何種子類別的物件實體**</font>
* 語法：物件參考變數 instanceof 類別名稱
* 說明：檢查左邊參考的物件是否可以轉型為右邊的類別型別
    * 如果可以回傳true，否則為false
:::
```java=
Employee e1 = new FullTimeEmployee();
System.out.println(e1 instanceof FullTimeEmployee); // true
System.out.println(e1 instanceof Manager); // false
System.out.println(e1 instanceof PartTimeEmployee); // false
```
* TestPolymorphism1
```java=
package module20_23;

public class TestPolymorphism1 {

	public static void main(String[] args) {
		EmployeePoly e1 = new FullTimeEmployeePoly(7002, "peter", 50000.0);
		EmployeePoly e2 = new ManagerPoly(7003, "merry", 50000.0, 10000.0);
		EmployeePoly e3 = new PartTimeEmployeePoly(7004, "John", 1000.0, 8);

		FullTimeEmployeePoly f = (FullTimeEmployeePoly) e1; // Type casting
//		ManagerPoly m = (ManagerPoly) e1; // 執行時期:java.lang.ClassCastException
//		PartTimeEmployeePoly m = (PartTimeEmployeePoly) e1; // 執行時期:java.lang.ClassCastException

		System.out.println(e1 instanceof FullTimeEmployeePoly); // true
		System.out.println(e1 instanceof ManagerPoly); // false
		System.out.println(e1 instanceof PartTimeEmployeePoly); // false
	}

}
```
* EmployeePoly
```java=
package module20_23;

public class EmployeePoly {
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

	public EmployeePoly(int empno, String ename) {
		this.empno = empno;
		this.ename = ename;
	}

	public EmployeePoly(int empno) {
		this(empno, "-");
	}

	public EmployeePoly(String ename) {
		this(0, ename);
	}

	public EmployeePoly() {
		this(0, "-"); // 或 empno = 0; ename = "-";
	}

	public void display() {
		System.out.println("empno=" + empno);
		System.out.println("ename=" + ename);
	}

	// 新增getSalary方法
	public double getSalary() {
		return 0;
	}
}

```
* FullTimeEmployeePoly
```java=
package module20_23;

public class FullTimeEmployeePoly extends EmployeePoly {
	private double monthlySalary; // 月薪

	public void display() {
		super.display();
		System.out.println("月薪=" + monthlySalary);
	}

	public FullTimeEmployeePoly(int empno, String ename, double monthlySalary) {
		super(empno, ename);
		this.monthlySalary = monthlySalary;
	}

	// add
	public double getSalary() {
		return monthlySalary;
	}
}

```
* ManagerPoly
```java=
package module20_23;

public class ManagerPoly extends FullTimeEmployeePoly {
	private double bonus; // 獎金; 額外津貼; 特別補助

	public void display() {
		super.display();
		System.out.println("額外津貼=" + bonus);
	}

	public ManagerPoly(int empno, String ename, double monthlySalary, double bonus) {
		super(empno, ename, monthlySalary);
		this.bonus = bonus;
	}

	// add
	public double getSalary() {
		double monthlySalary = super.getSalary();
		return monthlySalary + bonus;
	}
}

```
* PartTimeEmployeePoly
```java=
package module20_23;

public class PartTimeEmployeePoly extends EmployeePoly {
	 private double hourPay; //時薪
     private int workHour;   //工作時數 

     public void display() {
       super.display();
       System.out.println("hour pay=" + hourPay);
       System.out.println("work hour=" + workHour);
     }


     public PartTimeEmployeePoly(int empno , String ename , double hourPay, int workHour) {
          super(empno, ename);
          this.hourPay = hourPay;
          this.workHour = workHour;
     }

     //add
     public double getSalary() {
          return hourPay * workHour;
     }
}

```
* TestPolymorphism2
```java=
package module20_23;

public class TestPolymorphism2 {
	public static void main(String[] args) {
		EmployeePoly[] e = new EmployeePoly[3]; // 宣告員工陣列,準備置入員工3人
		e[0] = new FullTimeEmployeePoly(7002, "peter", 40000.0);
		e[1] = new ManagerPoly(7003, "merry", 50000.0, 10000.0);
		e[2] = new PartTimeEmployeePoly(7004, "John", 1000.0, 8);
		for (int i = 0; i < e.length; i++)
			System.out.println(e[i].getSalary());

//   instanceof測試 
//   for (int i = 0; i < e.length; i++)
//   if(e[i] instanceof FullTimeEmployeePoly)   //EmployeePoly , FullTimeEmployeePoly , ManagerPoly , PartTimeEmployeePoly
//		   System.out.println("yes");
//	  else 
//		   System.out.println("no");

//    另外第二種寫法
//    EmployeePoly[] e = new EmployeePoly[3];
//    EmployeePoly e0 = new FullTimeEmployeePoly(7002 ,"peter", 40000.0 );
//    EmployeePoly e1 = new ManagerPoly(7003 ,"merry", 50000.0 , 10000.0);
//    EmployeePoly e2 = new PartTimeEmployeePoly(7004 , "John" , 1000.0, 8);
//    e[0] = e0;
//    e[1] = e1;
//    e[2] = e2;
//    for (int i = 0; i < e.length; i++)
//          System.out.println(e[i].getSalary());

//    再另第三種寫法
//    EmployeePoly[] e = new EmployeePoly[3];
//    FullTimeEmployeePoly e0 = new FullTimeEmployeePoly(7002 ,"peter", 40000.0 );
//    ManagerPoly e1 = new ManagerPoly(7003 ,"merry", 50000.0 , 10000.0);
//    PartTimeEmployeePoly e2 = new PartTimeEmployeePoly(7004 , "John" , 1000.0, 8);
//    e[0] = e0;
//    e[1] = e1;
//    e[2] = e2;
//    for (int i = 0; i < e.length; i++)
//          System.out.println(e[i].getSalary());
	}
}
```
## 多型資料一致性操作
:::warning
* <font color="#f00">**對於不同的物件實體找出可通用的型別作為宣告**</font>
    * 實現資料操作上的一致性，可以讓程式碼變得更加簡潔
    * 也易於日後資料的擴充設計與維護
:::
```java=
public class TestPolymorphism2 {
	public static void main(String[] args) {
		Employee[] e = new Employee[3];
		e[0] = new FullTimeEmployee(7002, "peter", 40000.0);
		e[1] = new Manager(7003, "merry", 50000.0, 10000.0);
		e[2] = new PartTimeEmployee(7004, "John", 1000.0, 8);
		for (int i = 0; i < e.length; i++)
			System.out.println(e[i].getSalary());
	}
}
```
:::warning
:exclamation: getSalary()對不同類型的物件進行一致性的操作，簡化程式碼的撰寫
:::

## 動態繫結( dynamic binding )
:::warning
* 動態就是執行時期
* 又稱延遲繫結( late binding )
* 用父類別的型別(參考)，指向子類別的物件，並對應到子類別overriding的方法
* 父類別會先判斷實際的子類別物件是哪一個，再呼叫此子類別裡對應的overriding方法
:::
```java=
Manager m = new Manager(7003, “David”, 50000.0, 10000,0);
double salary = m.getSalary();
Employee e = new Manager(7003, “David”, 50000.0, 10000.0);
double salary = e.getSalary();
```
:::warning
* getSalary()在最後執行時，都是子類別Manager的方法
* 但父類別的getSalary()還是不可省去，否則無法進行對應造成錯誤
* 編譯器透過宣告型別(類別)，來確認我們存取的方法 / 屬性是否都有定義
* 結論：<font color="#f00">**身分(型別)決定了特徵與行為**</font>
:::
### 動態繫結範例
```java=
//Employee
public class Employee {

	private int empno;
	private String ename;

	public double getSalary() {
		return 0;
	}
}
//FullTimeEmployee
public class FullTimeEmployee extends Employee {
	private double monthlySalary; // 月薪

	public double getSalary() {
		return monthlySalary;
	}
}

//Manager
public class Manager extends FullTimeEmployee {
	private double bonus; // 獎金

	public double getSalary() {
		double monthlySalary = super.getSalary();
		return monthlySalary + bonus;
	}
}
```

### 動態繫結練習
* Animal
```java=
public class Animal {
	
	private int age;
	private float weight;
	
	public Animal() {
		//1.保留給使用者的彈性
		//2.保留無參數建構子給日後搭配的工具(框架)使用，讓它們可以利用此建構子幫我們產生物件
	}
	
	public Animal(int age,float weight) {
		this.age=age;
		this.weight=weight;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public float getWeight() {
		return weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}
	
	public void speak() {
		System.out.printf("%d歲，%.1f公斤",age,weight);
	}
}
```
* Elephant
```java=
public class Elephant extends Animal{
	private String name;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Elephant(int age, float weight, String name) {
		super(age,weight);
		this.name = name;
	}
	
	@Override //JDK 5的新機制 Annotation(標註)：給java相關工具看的資訊，像編譯器，框架等
	public void speak() {
		super.speak();
		System.out.println(" Name is " + name);
	}
}
```
* PolyAnimal
```java=
public class PolyAnimal {

	public static void main(String[] args) {
		Animal[] animals = new Animal[3];
		
		animals[0] = new Animal(2,5.0f);
		animals[1] = new Elephant(8, 1200f,"大象");
		animals[2] = new Animal(2,5.0f);
	
		for (int i =0;i<animals.length;i++) {
			animals[i].speak();
		}
	}
}
```

### 請看動態繫結範例
```java=
public class Employee {

	private int empno;
	private String ename;

	public double getSalary() {
		return 0;
	}
}
```
:::warning
* 在Employee的getSalary的方法中發現
    * <font color="#f00">**return 0 ; 毫無意義**</font>
* java 有針對此情形提供一些機制
* 故衍伸出 abstract
:::

# 抽象機制與目的
## 抽象類別 (abstract class)
:::warning
* 抽象方法沒有方法主體
    * public abstract void myMethod();
        * 一般方法變成抽象方法
            * <font color="#f00">**必須加上abstract修飾子**</font>
            * 不能有大括號
            * 最後加上分號
* 抽象類別不一定要有抽象方法
    * <font color="#f00">**但具有抽象方法的類別，一定要宣告為抽象類別**</font>
        * public abstract class MyClass {…}
    * <font color="#f00">**類別只要加上abstract修飾子**</font>
        * <font color="#f00">**即使類別不含 abstract 方法，類別就無法產生實體**</font>
        * 只能透過繼承來建立延伸子類別
* 說明
    * 該類別若繼承了抽象父類別，除非它實作了抽象父類別當中的所有抽象方法，否則它仍然只是個抽象類別
        * 子類別 繼承 抽象父類別
        * 就會繼承抽象父類別的抽象方法
        * 等於子類別就會有抽象方法
        * 所以子類別就無法產生實體
        * <font color="#f00">**解決方法就是子類別將父類別抽象方法實作出來**</font>
* 建立類別若有方法尚未決定如何設計內容主體時
    * 就可將此方法加上 abstract 修飾子成為抽象方法
    * 之後再由繼承的子類別來實做
:::
:::warning
* 一個.java檔可以宣告多個類別：
    * 最多只有一個public class
    * 此public class 名稱就是檔名
:::
```java=
package module24_26;

// 筆類別(父類別)
// 抽象類別
abstract class Pen {
	// 宣告成protected ， class內容可以使用 ， 同套件可以使用 ， 子類別可以使用
	protected String brand;
	protected double price;

	// 抽象方法
	public abstract void write();

	public void setdata(String brand, double price) {
		this.brand = brand;
		this.price = price;
	}
}

// 自訂的筆類別(子類別)
class MyPen extends Pen {
	// 定義抽象類別的動作
	public void write() {
        // 因為父類別的 brand、price 宣告成 protected ，所以可以拿的到 brand、price 的資料
		System.out.print("牌子是： " + brand); 
		System.out.println("價格為： " + price);
	}
}

public class TestAbstract {
	public static void main(String args[]) {
		MyPen myPen = new MyPen();
		myPen.setdata("SKB", 10);
		myPen.write();
	}
}
```

# 介面 (Interface)
## 前提
:::warning
* 濫用繼承
    * 1.資料關係與現實生活不相符
    * 2.子類別可能從父類別得到錯誤或不必要的項目
:::
![](https://i.imgur.com/g4oFAUs.png)
:::warning
* 透過實作介面，可以改善濫用繼承
:::
![](https://i.imgur.com/rneLBNM.png)

## Interface 介紹
:::warning
* Java使用介面(interface)的主要五大功能
    * 多重繼承
    * 定義規格
    * 貼標籤
    * 型別轉換
    * 降低相依性
:::

### 多重繼承
:::warning
* Java只能單一繼承，<font color="#f00">**而介面可以實現物件導向中的多重繼承**</font>
    * (替代C++中的多重繼承)
* 語句
    * class 子類別 extends 父類別 implements 介面1, 介面2, … {…}
    * class 子類別 implements 介面1, 介面2, … {…}
:::

### 定義規格
:::warning
* 預先定義規格給實作此介面的所有子類別
* <font color="#f00">**介面的所有方法皆為抽象方法的抽象類別**</font>
* <font color="#f00">**所以子類別必須實作介面的所有抽象方法**</font>
* <font color="#f00">**介面跟介面之間是可以再繼承(extends)**</font>
* 介面宣告的屬性
    * 由編譯器預設自動加入以下三個修飾關鍵字
        * <font color="#f00">**public static final**</font> ( 公開、靜態、常數 )　
            * 代表在介面裡宣告的資料都是常數
            * 為什麼要宣告成常數？
                * 因為要讓大家都能取得這個資料
                * 且Interface的資料都是公開的
                * 但為了確保資料不被任何人修改
                * 所以會預設為final
* 介面宣告的方法
    * 由編譯器預設自動加入以下兩個修飾關鍵字：
        * <font color="#f00">**public abstract**</font> ( 公開、抽象 )
        * <font color="#f00">**介面裡宣告的方法強制為抽象方法**</font>
* 因為介面做為定義規格的用途
    * 對任何實作介面的類別來說，資料需為一致，也就是所謂的"標準"
    * 既然是實作同一個介面，理所當然地從介面得到的資料都是相同的。
    * 但方法是可以在各個實作類別裡自行完成
:::
```java=
//宣告介面
interface Display {
	// 宣告變數(常數) , 修飾子如同 public static final
	int num1 = 100;
	int num2 = 10;

	// 宣告方法(抽象方法) , 修飾子如同 public abstract
	void disp();
}

// 實作介面：因為implements介面，所以此類別會有抽象方法
//	 	   有抽象方法就必須要將此類別宣告成抽象類別
//         但又會遇到抽象類別不能產生實體
//         解決方法就是把介面的方法全部實作出來
//         讓此類別沒有抽象方法
class Plus implements Display {
	public void disp() {
		System.out.print(num1 + " + " + num2 + " = ");
		System.out.println(num1 + num2);
	}
}

// 實作介面
class Minus implements Display {
	public void disp() {
		System.out.print(num1 + " - " + num2 + " = ");
		System.out.println(num1 - num2);
	}
}

public class TestInterface {
	public static void main(String args[]) {
//		Plus p1 = new Plus();
//		p1.disp();
//		Minus m1 = new Minus();
//		m1.disp();
		
		//可以透過介面來new出物件
		Display p1 = new Plus();
		p1.disp();
		Display m1 = new Minus();
		m1.disp();
	}
}

```
### 介面延伸
:::warning
* Java使用介面(interface)的主要目的：
    * 因為介面對Java來說是個規格較特殊的類別(class)
        * 介面也是一種參考型別，也就是介面提供了另一種彈性
        * <font color="#f00">**使子類別在繼承原父類別的特性之外**</font>
        * <font color="#f00">**能具有其他型別的特性**</font>
    * 因為一個物件可以實作多個介面
        * 所以每一個父介面都可以當作此物件的(父)多型之一
        * 因此用介面來幫物件作型態轉換將是一件容易的事情
:::


### 介面範例
:::warning
* 請運用多型設計讓Powder, Plane, Dog這三個類別藉由getWeightTool()方法可以顯示出各自適合的量體重的工具
* (如: Powder使用天秤, Plane使用地磅, Dog使用體重計)
:::
* Dog
```java=
package February16;
public class Dog implements Weightable {
	private String name;
	private double weight;
	
	public Dog() {
		super();
	}

	public Dog(String name, double weight) {
		super();
		this.name = name;
		this.weight = weight;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}
	
	@Override
	public void getWeightTool() {
		System.out.println("Dog使用體重計");
	};
}
```
* Plane
```java=
package February16;
public class Plane implements Weightable {
	private String kind;     // 種類
	private double weight;
	
	public Plane() {
		super();
	}

	public Plane(String kind, double weight) {
		super();
		this.kind = kind;
		this.weight = weight;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}
	
	@Override
	public void getWeightTool() {
		System.out.println("Plane使用地磅");
	};
}
```
* Powder
```java=
package February16;
public class Powder implements Weightable {
	private String color; 
	private double weight;
	
	public Powder() {
		super();
	}
	
	public Powder(String color, double weight) {
		super();
		this.color = color;
		this.weight = weight;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}
	
	@Override
	public void getWeightTool() {
		System.out.println("Powder使用天秤");
	};
}
```
* Weightable (interface)
```java=
package February16;

public interface Weightable {

	void getWeightTool();
}
```
* Demo01 (main)
```java=
package February16;

public class Demo01 {

	public static void main(String[] args) {

		Weightable[] we = new Weightable[3];

		we[0] = new Dog("Dog", 5);
		we[1] = new Plane("Plane", 5);
		we[2] = new Powder("Powder", 5);

		for (int i = 0; i < we.length; i++) {
			we[i].getWeightTool();
		}
	}
}
```

### 介面與多型、相依性關係
:::warning
* 介面與多型比起繼承又更有彈性
* 我們將類別之間從 is - a 的關係(繼承)
* <font color="#f00">**轉化成"有共同行為"的關係( interface )**</font>
* 例如：
    * 鳥類、飛機、超人
* 雖然沒有現實生活上的"是一"種"關係
* 但他們都具備了"飛"的行為，所以也能達到資料一致性的操作
:::
### 降低相依性
:::warning
* :x: <font color="#f00">**低凝聚性 - 高相依性**</font>
    * Pencil.java,
    * InkBrush.java,
    * WorkWithPens.java,
    * WriteBusinessTest.java
* :ballot_box_with_check: <font color="#f00">**高凝聚性 - 低相依性**</font>
    * IWritable.java,
    * Pencil2.java, 
    * InkBrusch2.java, 
    * WorkWithPens2.java, 
    * WriteBusinessTest2.java
:::

```java=

public class Printer2 implements USB {
	
	public void work() {
		System.out.println("列印文件");
	}

}


public class Mouse2 implements USB {
	
	public void work() {
		System.out.println("移動游標");
	}

}


public class Keyboard2 implements USB {
	
	public void work() {
		System.out.println("輸入文字");
	}

}


public class Computer2 {
	private USB usb;
	
	public void setUSB(USB usb) {
		this.usb = usb;
	}
	
	public void workWithUSB() {
		usb.work();
	}
}


public class CustomerTest2 {
	
	public static void main(String[] args) {
		Computer2 c2 = new Computer2();
		Keyboard2 k2 = new Keyboard2();
		Mouse2 m2 = new Mouse2();
		
		c2.setUSB(k2);
		c2.workWithUSB();
		
		c2.setUSB(m2);
		c2.workWithUSB();
		
		Printer2 p2 = new Printer2();
		c2.setUSB(p2);
		c2.workWithUSB();
	}
}
```
![](https://i.imgur.com/tnfQ5iS.png)
### 空介面 (Tag interface)：貼標籤
:::warning
* <font color="#f00">**沒有定義任何方法的介面叫做空介面**</font>
* 一個類別可以 implements 某個空介面
    * 不需實作任何方法
    * 但該類別的任何實體即已經成為該介面的一個合法實體
    * 例如：
        * java.lang.Cloneable 
        * java.io.Serializable
* 一個類別 implements java.lang.Cloneable空介面
    * 該類別的物件才可以做物件的複製
* 一個類別implements java.io.Serializable空介面
    * 該類別的物件才可以做物件的序列化
    * (將物件永久儲存(persistence)，稱做序列化)
:::

# 修飾子適用場合
![](https://i.imgur.com/oyz0BGX.png)

# 套件介紹 (package)
## Java原始檔案格式
:::warning
* Java檔案中可能會出現三個稱為編譯單元( compilation units )的元素
* 這些元素皆非必要
* 但如果有這些元素，則一定要依以下順序出現：
    * 1. package 宣告
    * 2. import 引用敘述
    * 3. class 類別
:::

```java=
// 1.
package myPackageName;
// 2. 
import yourPackageName1.*;
// 3.
import yourPackageName2.*;
// 4. 
class MyClass {…}
```


## 套件(package)建議命名英文小寫
:::warning
* Java提供套件(Package)機制就像管理容器
    * 可將所定義的名稱區隔管理在package底下
    * 不會有類別名稱相互衝突的情況發生
* Java的package設計為與檔案系統結構相對應
    * 以檔案管理的觀點著手，將性質相似的類別集合在一起
* 例如 java.sql 表示名稱 java 的目錄底下有一個子目錄名叫 sql
    * 其內存放的都是Java資料庫連線相關的類別檔
* 套件宣告：
    - 宣告於原始檔案的第一行
    - package 套件名稱(myPackageName);
    - package com.ibm;
:::

## Java API 與常用套件
:::warning
* Java標準API有許多已經設計好的類別與其相關的內容
* 方便我們程式設計師可以更輕鬆快速實現所需要的功能和應用
* 例如：
    * java.lang (language)
    * java.io (傳輸資料相關)
    * java.net (網路程式設計相關)
    * java.sql (關聯式資料庫互動用JDBC)
    * java.util (utility、工具)、(集合API)
    * java.util.function (Java 8新增)
:::

## 套件編譯與執行
:::warning
* 所有屬於 myPackageName 類別庫的 .class 檔案都必須儲存在 myPackageName 資料夾下
    * 若不使用package宣告，Java預設會將類別檔置於目前工作環境所在的目錄中
* 因為source檔( .java檔 )與 .class 檔不一定要放在同一個目錄下
    * 所以使用package宣告時，必須在編譯時透過 –d option
    * 指定類別檔要置於哪個目錄之中
* 編譯： javac –d . HelloWorld.java
    * 【註：「.」指編譯後的class檔置於目前的目錄位置】
* 執行： java packageName.HelloWorld
    * 【註：要在原來的目錄下執行】
:::

# import (引用) 套件
:::warning
* import 可用來引入API中的功能 或 是自行定義的套件(package)
* Java會自動引用的兩個套件：
    * java.lang.*：常用的類別，如String類別已置於此套件中
    * 目前工作環境所在的package
* 若使用上述之外的其它套件，則必須用 import 引用敘述
    * 如：import java.xxx.*;
    * 註：不包含其子目錄的類別
        * 如import java.xxx.yyy.*; 是引用不同的套件
:::

## import (引用) 套件或特定類別
:::warning
* 引用套件中所有類別：
    * import java.sql.*;
    * Date date = new Date(…);
* 引用套件中特定的類別：
    * import java.sql.Date;
    * Date date = new Date(…);
* 如不使用import敘述，則必須使用類別長名稱
    * java.sql.Date date = new java.sql.Date(…);
    * java.util.Date date = new java.util.Date(…);
:::

## 靜態引用套件 ( static import )
:::warning
* 靜態引用套件 【JDK 5加入的功能】
    * 可導入類別內的所有的
    * static fields 、 static methods
    * 使用這些static members無需再指定其類別名稱
* 用 * 星號可導入類別內所有靜態成員
    * 例如：
        * import static java.lang.Math.*;
        * r = sin(PI * 2); 相當於
        * r = Math.sin(PI * 2);
* 避免過度使用static import功能，否則容易造成混淆而不利於維護
:::

# 類別路徑(classpath)
:::warning
* classpath可以讓Java應用程式在編譯和執行時，找到要用的相關類別
* 根據JDK文件說明，Java以下面三類classpath順序，依序找尋所需的class
* 1. Bootstrap classes(Core classes)：
    * Java2 Platform核心類別函式庫
    * 已置於%JAVA_HOME%\jre\lib\rt.jar檔案
    * JDK預設會自動載入，不必額外再作設定
* 2. Extension classes
    * Java2 Platform擴充的類別函式庫
    * 指的是%JAVA_HOME%\jre\lib\ext目錄下的jar檔或zip檔
    * JDK預設會自動載入此目錄內所有的jar檔或zip檔，不必額外再作設定
* 3. Users classes
    * 是使用者自己寫的類別函式庫(third-party的類別函式庫也可)
    * 必需額外作設定，JDK才會載入類別
    * 指我們在環境變數classpath設定路徑下的classes或jar檔
    * 例如：
        * (1)在作業系統的環境變數，預先新增classpath變數 
            * .;C:\myLib\xxx.jar;C:\myLib\yyy.jar;C:\myClass;
        * (2)在命令列中
            * set classpath = %classpath%;C:\myLib2\zzz.jar;C:\myClass2;
        * (3)在編譯及執行時
            * javac –classpath “%classpath%;C:\myLib2\zzz.jar;C:\myClass2;“ HelloWorld.java
            * java –classpath “%classpath%;C:\myLib2\zzz.jar;C:\myClass2;” HelloWorld 
        * (4)-cp
:::
:::warning
* classpath路徑設定
:::
![](https://i.imgur.com/kCmluOV.png)


# Object類別
## 所有Java類別共同父類別 - Object
:::warning
* Java的所有類別，全部繼承自java.lang.Object類別
    * 若一類別無繼承任何類別，則Java會自動用Object類別作為此類別的父類別
* Object類別常用的方法：
* 為何Java要在(共同父類別)Object類別預備這些方法?
    * boolean equals(Object obj) 
        * :exclamation: Object：運用多型特性，讓所有物件都能傳入進行比較
        * 自訂物件有內容相同比較的需求
        * 我們可以學習String類別
        * 主動去Override equals方法
        * Override的目的就是定義什麼叫做一樣的物件
    * String toString()
        * 通常會結合列印
        * 將物件用文字的形式呈現(用Debug觀察)
    * protected void finalize()
        * 給垃圾收集器呼叫的方法，當一個物件要被釋放前執行
    * final void wait() notify() notifyAll() 【屬於執行緒的部份】
:::

## Object.equals (override)
:::warning
* Modifier and Type：boolean
* equals(Object obj)
    * Indicates whether some other object is "equal to" this one.
:::
```java=
public class Employee {
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
		this(0, "-"); 
	}

	public void display() {
		System.out.println("empno=" + empno);
		System.out.println("ename=" + ename);
	}

	public boolean equals(Object obj) {
		// 仍要使用==來判斷，因為(也許)要比較的"物件參考變數"，其實指的是同一個實體(指向同一個記憶體空間)
		if (this == obj)
			return true;
		// 用(Object類別的)getClass()來確定是否隸屬於同一個class的物件
		// if (obj != null && getClass() == obj.getClass()) {
			//為了可以存取到empno/ename, 需要把obj型別轉回成Employee
			if (obj instanceof Employee) {
				Employee e = (Employee) obj;
				// 選擇該類別的必要成員變數(實體變數)來加以判斷是否有相等(相同)
				if (empno == e.empno && ename.equals(e.ename)) {
					return true;
				}
			}
		//}
		return false;
	}
}
```
```java=
public class TestEquals {
	public static void main(String args[]) {
		Employee e1 = new Employee(7001, "king");
		Employee e2 = new Employee(7001, "king");
		
		System.out.println(e1);
		System.out.println(e2);
		System.out.println("e1==e2 = " + (e1 == e2)); //false
		// 因為原始碼比較也是記憶體位置
        // 經過override後就可以比較物件的值
		System.out.println("e1.equals(e2) = " + e1.equals(e2));
	}
}
```

## 垃圾處理機制
:::warning
* Modifier and Type：protected void
* protected void finalize()
    * Called by the garbage collector on an object when garbage collection determines that there are no more references to the object.
:::
```java=
package module27_30;

class ClassFinalize {
	protected void finalize() {
		System.out.println("finalize方法執行了");
	}
}

public class TestFinalize {
	public static void main(String args[]) {
		ClassFinalize fin = new ClassFinalize();
		fin = null;
		System.out.println("強制進行垃圾收集");
		System.gc();
	}
}

```

## String toString()
:::warning
* Modifier and Type：String
* toString()
    * Returns a string representation of the object.
* System.out.println 的 println 就會呼叫toString的方法
    * 所以我們可以 override toString()裡面的方法
    * 將它改成我們想要呈現的形式

:::
* 原本Object裡面toString()內容
```java=
 public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```
### override toString()
```java=
public class HelloWorld {

	//override Object 類別的 toString() 方法
	public String toString() {
		System.out.println("HelloWorld! 世界你好 toString!");
		return "";
	}
}

```
```java=
public class HelloWorld {
	//override Object 類別的 toString() 方法
	public String toString() {
		System.out.println("HelloWorld! 世界你好 toString!");
		return "";
	}
}
```

## clone() 複製
:::warning
* Modifier and Type：protected Object
* clone()
    * Creates and returns a copy of this object.
:::
![](https://i.imgur.com/rNmcRNw.png)
```java=
public class TestCloneableShirt implements Cloneable {

	private char colorCode = 'U'; // Unknown

	public char getColorCode() {
		return colorCode;
	}

	public void setColorCode(char newCode) {
		switch (newCode) {
		case 'R':
		case 'G':
		case 'B':
			colorCode = newCode;
			break;
		default:
			System.out.println("不正確的顏色碼. 請使用 R, G, or B");
		}
	}

	public static void main(String[] args) {
		TestCloneableShirt myShirt = new TestCloneableShirt();
		TestCloneableShirt yourShirt = new TestCloneableShirt();
		myShirt.setColorCode('R');
		yourShirt.setColorCode('G');

		System.out.println(myShirt.getColorCode()); // R
		try {
			myShirt = (TestCloneableShirt) yourShirt.clone();
		} catch (CloneNotSupportedException e) {
			System.out.println("不允許複製此物件!");
			e.printStackTrace();
		}
		System.out.println(myShirt.getColorCode()); // G
	}
}
```

# 包裝類別 ( Wrapper Class )
:::warning
* Java每一個基本資料型態，都有一個相對應的Wrapper類別(包裝類別)
:::
![](https://i.imgur.com/KvgJGSB.png)

## 使用包裝類別
:::warning
* boxing：將基本型別，置入相對應的包裝類別中
    * Integer i = new Integer(10);
    * JDK 9 以後不建議此方法
    * 改用 valueOf 取代
        * Integer.valueOf(10);
* unboxing：從相對應的包裝類別取其值
    * 使用 xxxValue()方法
    * 例如：int x = i.intValue();
* 字串轉成數字
    * 使用 static method parseXxx(String s) 
    * 例如：int i = Integer.parseInt(“1”);
* 字串轉成包裝類別
    * 使用 static method valueOf(String s) 
    * 例如：Integer i = Integer.valueOf(“1”); 
* 比較兩個物件是否相等
    * 使用 boolean equals(Object obj)
:::

### Wrapper Class 的繼承與覆寫
:::warning
* Integer物件
    * 繼承 Object
    * override euqals( ) and toString( )
:::
```java=
package February17;

public class Test01 {

	public static void main(String[] args) {
		Integer i1 = new Integer(10);
	
		Integer i2 = new Integer(10);

		System.out.println(i1 == i2); //f，比的是記憶體位址
		System.out.println(i1.equals(i2)); //t，在Integer物件中有 override equals的方法
		System.out.println(i1); //10 ， 使用print方法會呼叫toString，可發現toString方法也有被override
		
		String str01 = "100";
		int data01 = Integer.parseInt(str01);
		System.out.println(data01 + 100);
		
//		String str02 = "abc";
//		int data02 = Integer.parseInt(str02);
//		System.out.println(data02 + 100);
	}
}

```

## 自動裝箱 / 拆箱機制 (Auto-boxing / unboxing)
:::warning
* Autoboxing / Unboxing
    * 如果 int 的基本資料型別放到 Collection 中的話要怎麼辦呢？
    * Autoboxing(自動裝箱)：
        * 基本資料型別自動轉為包裝型態(Wrapper Types)，如int轉Integer
    * Unboxing(自動拆箱)：
        * 包裝型態自動轉為基本資料型別，例如Integer轉int
* 說明
    * int 包裝成 Integer 稱之為 Autoboxing
        * 反之則是 Auto-unboxing。
    * 在 Java 中的八種基本型別，分別是
        * byte, short, int, long, float, double, char 和 boolean。
    * 理論上來說，真正的物件導向中的型別應該都必須是類別定義
        * 像是 Short, Integer 等類別。
        * 不過為了我們使用上的方便，Java 提供了基本型別。
    * 同時存在這兩種型別常常會造成我們在設計上要加上許多額外的程式碼，例如在做數字運算時，使用 int 或 double 型別來處理，但是要將數字存入容器時，必須要將其轉換成 Integer 或 Double 型別，才能使用 add(new Integer(i))，在使用容器或多型處理時常常要多一道轉型手續。
    * Java 1.5 中，已經增加了這方面的處理，稱之為 Autoboxing 和 Auto-unboxing，編譯器會自動幫我們在 int 和 Integer 之中轉換。 
:::

```java=
public class TestAutoboxing {

	public static void main(String[] args) {
		Integer i1 = 1; // boxing
		int i2 = i1; // unboxing

		int sum1 = i1 + i2;
		Integer sum2 = i1 + i2;
		System.out.println(sum1);
		System.out.println(sum2);
	}
}
```