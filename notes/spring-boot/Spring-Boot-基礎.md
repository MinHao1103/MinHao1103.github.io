Spring Boot ( 基礎 )
===
# ( 1 ) Spring IoC、DI、AOP 概念
:::warning
* Sprint 專有名詞
    * IoC = Inversion of Control 控制反轉
        * 將物件的控制權交給外部的 Spring 容器來管理
    * DI = Dependency Injection 依賴注入
    * Bean = 存放在 Spring 容器裡的 Object
        * Spring 容器創建的 object 稱為 bean
        * bean 的名字為 class name 的第一個字母轉成小寫
    * AOP = Aspect-Oriented Programming
        * 切面 導向 程式設計
:::

## ( 1-1 ) Java 介面  與多型  問題
:::warning
* Java 概念
    * Interface、Polymorphism
:::
![](https://i.imgur.com/AGa0Fra.png)
:::warning
* 如果我想換另一家廠牌的印表機
* 我就必須將有使用到那台印表機的地方全部修改一遍
:::
![](https://i.imgur.com/hpnULQa.png)

## ( 1-2 ) Spring IoC ( Inversion of Control 控制反轉 )
:::warning
* 導入 IoC 概念
    * 將物件 ( 印表機 ) 的控制權交給外部的 Spring 容器來管理
:::
![](https://i.imgur.com/XqgdI0i.png)

:::warning
* 控制權的轉移
:::
![](https://i.imgur.com/DD8Qe9O.png)

:::warning
* 優點
    * Loose coupling 鬆耦合
        * 讓物件之間的關聯性降低
    * Lifecycle Managerment 生命週期管理
    * More testable 方便測試程式
:::

## ( 1-3 ) Spring DI ( Dependency Injection 依賴注入 )
![](https://i.imgur.com/FM5BuDt.png)
:::warning
* 傳統寫法 與 Spring IoC 比較
:::
![](https://i.imgur.com/71PmFrb.png)

## ( 1-4 ) Spring AOP ( Aspect-Oriented Programming )
![](https://i.imgur.com/FC32w8p.png)


# ( 2 ) 了解 Spring 框架
## ( 2-1 ) @SpringBootApplication：運行 Spring Boot 程式
:::warning
* 加在 class 上，會有一個播放鍵，就可以運行 Spring Boot 程式
:::
* class Demo1Application
```java=
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Demo1Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }
}
```
## ( 2-2 ) Bean 的創建
:::warning
* @Component ( 較常用 )
* @Configuration、@Bean
:::
### ( 2-2-1 ) @Component 
:::warning
* 加在 class 上，將該 class 變成由 Spring 容器管理的 object
:::
* interface Printer
```java=
package com.example.demo;

import org.springframework.stereotype.Component;

@Component
public interface Printer {
    void print(String message);
}
```
* class HpPrinter
```java=
package com.example.demo;

import org.springframework.stereotype.Component;

@Component
public class HpPrinter implements Printer{

    @Override
    public void print(String message) {
        System.out.println("HP印表機："+message);
    }
}
```

### ( 2-2-2 ) @Configuration、@Bean
:::warning
* @Configuration
    * 加在 class 上，Spring 中的設定用註解，表示該 class 是拿來設定 Spring 用的
* @Bean
    * 只能加在帶有 @Configuration class 方法上，在 Spring 容器中創建 Bean
:::
* class CanonPrinter
```java=
package com.example.demo;

public class CanonPrinter implements Printer{

    @Override
    public void print(String message) {
        System.out.println("Canon印表機：" + message);
    }
}
```
* class MyConfiguration
```java=
package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyConfiguration {

    @Bean
    public Printer myPrinter(){
        return new CanonPrinter();
    }
}
```

## ( 2-3 ) 注入 Bean 的方法 
### ( 2-3-1 ) @Autowired、@Qualifier
:::warning
* @Autowired
    * 根據變數的類型，去 Spring 容器中尋找有沒有符合的 bean
* @Qualifier
    * 輔助 @Autowired，指定要載入的 bean 名字
:::
* class MyController
```java=
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @Autowired
    @Qualifier("hpPrinter")
    private Printer printerH; // @Component 創建 Bean
    @Autowired
    @Qualifier("myPrinter")
    private Printer printerC; // @Configuration + @Bean 創建 Bean

    @RequestMapping("/test")
    public String test(){
        printerH.print("Hello H");
        printerC.print("Hello C");
        return "Hello World";
    }
}
```
## ( 2-4 ) Bean 的初始化
### ( 2-4-1 ) @PostConstruct ( 較常用 )
:::warning
* 如果要初始化 HpPrinter 的 count 變數
* 要寫一個新的方法 
    * 方法必須是 public
    * 返回類型必須是 void
    * 方法名可隨意取
    * 不能有參數
:::
```java=
package com.example.demo;

import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;

@Component
public class HpPrinter implements Printer{

    private int count;

    @PostConstruct
    public void initialize(){
        count = 5;
    }

    @Override
    public void print(String message) {
        count --;
        System.out.println("HP 印表機：" + message);
        System.out.println("剩餘使用次數：" + count);
    }
}
```

### ( 2-4-2 ) afterPropertiesSet
:::warning
* 必須實作 InitializingBean interface
* 並且 override afterPropertiesSet() 方法
:::
```java=
package com.example.demo;

import org.springframework.beans.factory.InitializingBean;

public class CanonPrinter implements Printer, InitializingBean {

    private int count;

    @Override
    public void afterPropertiesSet() throws Exception {
        count =  5;
    }

    @Override
    public void print(String message) {
        count --;
        System.out.println("Canon 印表機：" + message);
        System.out.println("剩餘使用次數：" + count);
    }

}
```

## ( 2-5 ) Bean 的生命週期
:::warning
* Bean 的生命週期
    * 創建 -> 初始化 -> 可被使用
* 創建時若有依賴其他的 bean，則 Spring 會先去「創建 + 初始化」被依賴的 bean
* 不要寫出循環依賴的 code
    * 若有循環依賴，在啟動的時候可能會報 BeanCurrentlyInCreationException
:::

## ( 2-6 ) Spring Boot 設定檔 - application.properties
:::warning
* 用途
    * 存放 Spring Boot 的設定值
* 語法
    * key=value
    * 在 = 的前後不用加空白，例如：
    ```properties=
    count=5
    my.name=Eden  ( 可支援 "."，意思為「的」 )
    ```
* comment
    * 在最前面加上 #，就可以寫 comment，例如：
    ```properties=
    # this is comment
    ```
:::
### ( 2-6-1 ) @Value：取得 application.properties 設定檔的值
:::warning
* 加在 Bean 或是 設定 Spring 用的 class 裡面的變數上
* 讀取 Spring Boot 設定檔 ( application.properties ) 中指定的 key 值
* 可設定預設值，例如
```properties=
@Value("${nuKnown:Eden}")
```
:::
![](https://i.imgur.com/Hv3lzXg.png)
* application.properties
```java=
printer.name=Eden's Printer
printer.count=10

# this is comment
```
* HpPrinter
```java=
package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class HpPrinter implements Printer{

    @Value("${printer.name}")
    private String name;
    @Value("${printer.count}")
    private int count;

    @Override
    public void print(String message) {
        count --;
        System.out.println(name + "：" + message);
        System.out.println("剩餘使用次數：" + count);
    }
}
```

### ( 2-6-2 ) properites 與 yml 語法
![](https://i.imgur.com/67xqBAE.png)

# ( 3 ) Spring Aspect-Oriented Programming
:::warning
* 常用註解
    * @Before：在切入點的方法"執行前"執行
    * @After：在切入點的方法"執行後"執行
    * @Around：在切入點的方法"執行前、後"執行
* 不常用
    * @AfterThrowing：在切入點的方法"拋出異常後"執行
    * @AfterReturning：在切入點的方法"執行成功後"執行
:::
## ( 3-1 ) 常見的切入點表達式
![](https://i.imgur.com/tiyaQV8.png)

## ( 3-2 ) Spring AOP 發展
:::warning
* 權限驗證 Spring Security
* 統一的 Exception 處理 @ControllerAdvice
* Log 紀錄
:::

## ( 3-3 ) 使用 AOP 前，需先註冊
:::warning
* 要在 Spring Boot 使用 AOP 之前，需在 pom.xml 註冊
```xml=
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```
:::
## ( 3-4 ) @Aspect 宣告
:::warning
* 加在 class 上，必須和 @Component 一起使用
* 宣告這個 class 是一個切面
:::

## ( 3-5 ) 切入方式
### ( 3-5-1 ) @Before、@After
:::warning
* @Before
    * 加在切面 class 上，在切入點的方法執行"前"執行
* @After
    * 加在切面 class 上，在切入點的方法執行"後"執行
:::
* class MyAspect
```java=
package com.example.demo;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MyAspect {

    @Before("execution(* com.example.demo.HpPrinter.*(..))")
    public void before(){
        System.out.println("I'm before ! ");
    }

    @After("execution(* com.example.demo.HpPrinter.*(..))")
    public void after(){
        System.out.println("I'm after ! ");
    }
}
```

### ( 3-5-2 ) @Around
* class MyAspect
```java=
package com.example.demo;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.Date;

@Aspect
@Component
public class MyAspect {

    @Around("execution(* com.example.demo.HpPrinter.*(..))")
    public Object around(ProceedingJoinPoint pjp) throws Throwable{

        System.out.println("------ Before ------");
        Date start = new Date();

        Object obj = pjp.proceed(); // 執行切入點的方法

        Date end = new Date();
        long time = end.getTime() - start.getTime();
        System.out.println("總共執行：" + time + "ms");
        System.out.println("------ After ------");
        return obj;
    }
}
```

# ( 4 ) Spring MVC
## ( 4-1 ) HTTP 協議
:::warning
* 負責規定資料的傳輸格式，讓前端和後端能有效進行資料溝通
* 可以分成 request ( 請求 ) 和 response ( 回應 )
:::
![](https://i.imgur.com/65dczUR.png)

## ( 4-2 ) URL 格式
:::warning
* port 可能會被省略
:::
![](https://i.imgur.com/nLQDXzF.png)

## ( 4-3 ) @Controller / @RestController
:::warning
* 加在 class 上，將 class 變成 Bean，並且可使用 @RequestMapping
* @RestController 是 @Controller 和 @ResponseBody 註解的組合
* Following are Example Code which are Equal in Spring.
* @Controller / @ResponseBody
```java=
@Controller
@ResponseBody
Public class MVCController{
} 
```
* @RestController
```java= 
@RestController
public class MVCController{
}
```
:::

## ( 4-4 ) @RequestMapping
:::warning
* 加在 class 或 method 上，小括號裡面寫 url 路徑
* 將 url 路徑對應到方法上
    * 若要使用 @RequestMapping，則該 class 必須加上 @Controller 或 @RestController
:::
* class MyController
```java=
@RestController
public class MyController {
    
    @RequestMapping("/test")
    public String test(){
        System.out.println("Hi!");
        return "Hello World";
    }
}
```

## ( 4-5 ) 前後端溝通流程
![](https://i.imgur.com/mo70jkz.png)
* class MyController
```java=
package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @RequestMapping("/product") // http://localhost:8080/product
    public String product(){
        return "第一個是蘋果、第二個個是橘子";
    }
}
```
:::warning
* http://localhost:8080 為 SpringBoot 預設
:::
* class MyController
```java=
package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/detail")
@RestController
public class MyController {

    @RequestMapping("/product") // http://localhost:8080/detail/product
    public String product(){
        return "第一個是蘋果、第二個個是橘子";
    }

    @RequestMapping("/user") // http://localhost:8080/detail/user
    public String user(){
        return "Eden";
    }
}
```
![](https://i.imgur.com/1mAHusg.png)

## ( 4-6 ) JSON 結構化資料 ( structured data )
:::warning
* 說明
    * 一種易於讀寫輕量級的資料交換格式
* 目的
    * 結構化的呈現數據
:::
![](https://i.imgur.com/aQRhlii.png)

## ( 4-7 ) 在 ResponseBody 回傳 json 格式
![](https://i.imgur.com/LxutyFO.png)
* class Student
```java=
package com.example.demo;

public class Student {
    String name;
    Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
* class Store
```java=
package com.example.demo;

import java.util.List;

public class Store {
    
    List<String> productList;
    
    public List<String> getProductList() {
        return productList;
    }

    public void setProductList(List<String> productList) {
        this.productList = productList;
    }
}
```
* class MyController
```java=
package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MyController {

    @RequestMapping("/product")
    public Store product(){
        Store store = new Store();
        List<String> list = new ArrayList<>();
        list.add("蘋果");
        list.add("橘子");
        store.setProductList(list);
        return store;
    }

    @RequestMapping("/user")
    public Student user(){
        Student student = new Student();
        student.setName("Eden");
        return student;
    }
}

```

## ( 4-8 ) HTTP Method
:::warning
* 常用的 Http Method 
    * GET、POST、PUT、DELETE ...等
:::

### ( 4-8-1 ) GET
:::warning
* 類似於明信片，傳遞的參數會被別人看見，安全性較低
:::
* GET 的 URL
![](https://i.imgur.com/l0tanDI.png)

### ( 4-8-2 ) POST
:::warning
* 類似於信封，傳遞的參數不會被人看見，安全性較高
:::
* POST 的 URL
![](https://i.imgur.com/tegbyV3.png)

## ( 4-9 ) 取得請求參數
:::warning
* ( 4-9-1 ) @RequestParam：取得 url 參數
* ( 4-9-2 ) @RequestBody：取得 request body 的參數
* ( 4-9-3 ) @RequestHeader：取得 request header 裡的參數
* ( 4-9-4 ) @PathVariable：取得 url 路徑的值
:::
### ( 4-9-1 ) @RequestParam：取得 url 參數
:::warning
* 只能加在方法的參數上
:::
* MyController
```java=
package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @RequestMapping("/test1")
    public String test1(@RequestParam Integer id,
                        @RequestParam String name){
        System.out.println("id：" + id);
        System.out.println("name：" + name);
        return "Hello test1";
    }
}
```
* API Tester
![](https://i.imgur.com/hFbmg36.png)

* IntelliJ
![](https://i.imgur.com/kic84N8.png)
* @RequestParam 結論
:::warning
* 有在參數前面加上 @RequestParam 的話
* 在請求的 url 就一定要有這些參數
* 多帶其他參數的話，則會被 SpringBoot 忽略
:::

#### ( 4-9-1-1 ) @RequestParam 的 name or value 方法 
:::warning
* 指定 url 參數名稱
:::
![](https://i.imgur.com/9X9F9Ej.png)

#### ( 4-9-1-2 ) @RequestParam 的 required 方法
:::warning
* 是否為必須的參數，預設為 true，可改成 false
* 如果參數的 required 設為 false，在 url 請求時少了此參數，也可以順利運行，並且值為 null
:::
![](https://i.imgur.com/80MR4Z9.png)

#### ( 4-9-1-3 ) @RequestParam 的 defaultValue 方法
:::warning
* required = false 的加強版，可提供預設值
:::
![](https://i.imgur.com/xU2ldVF.png)

### ( 4-9-2 ) @RequestBody：取得 request body 的參數
:::warning
* 只能加在方法的參數上，取得 request body 裡的參數
    * 將 Json 轉為 Java Object
:::
![](https://i.imgur.com/IvfNSTb.png)
* class Student
```java=
package com.example.demo;

public class Student {
    Integer id;
    String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
* class MyController
```java=
package com.example.demo;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @RequestMapping("/test1")
    public String test1(@RequestBody Student student){
        System.out.println(student.getId());
        System.out.println(student.getName());
        return "Hello test1";
    }
}
```
* API Tester
![](https://i.imgur.com/m8vi7bN.png)
* IntelliJ
![](https://i.imgur.com/QJlhgsk.png)
* RequestBody 結論
:::warning
* 使用 RequestBody 取得前端的參數時
* 如果前端多帶一個 key，SpringBoot 會忽略它
* 如果前端少帶一個 key，SpringBoot 會將對應的變數值設成 null
:::

### ( 4-9-3 ) @RequestHeader：取得 request header 裡的參數
:::warning
* 只能加在方法的參數上
:::
![](https://i.imgur.com/7IA1BcQ.png)
* class MyController
```java=
package com.example.demo;

import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @RequestMapping("/test1")
    public String test1(@RequestHeader String info){
        System.out.println("Head info：" + info);
        return "Hello test1";
    }
}
```
* API Tester
![](https://i.imgur.com/E8coFtR.png)

* IntelliJ
![](https://i.imgur.com/onMopEC.png)
* @RequestHeader 結論
:::warning
* 方法裡的參數名稱必須和 request header 的 key 對應
* 有一些 header 的 key 中間可能會有 - 號
* 但 java 的變數不支援 - 號
* 所以需要用 @RequestHeader 的 name or value 方法改名稱
:::
#### ( 4-9-3-1 ) @RequestHeader 的 name or value 方法
:::warning
* 指定 request header 的 header 名字
:::
![](https://i.imgur.com/asTHOjz.png)


#### ( 4-9-3-2 ) @RequestHeader 的 required 方法
:::warning
* 是否為必須的 Header，預設為 true，可改成 false
:::
![](https://i.imgur.com/Ymee42f.png)

#### ( 4-9-3-3 ) @RequestHeader 的 defaultValue 方法
:::warning
* required = false 的加強版，可提供預設值
:::
![](https://i.imgur.com/LieGb4k.png)

#### ( 4-9-3-4 ) 常見的 request header
![](https://i.imgur.com/i8uxzVR.png)

### ( 4-9-4 ) @PathVariable：取得 url 路徑的值
:::warning
* 只能加在方法的參數上
:::
* 回顧 @RequestMapping 與 @RequestParam 方法
![](https://i.imgur.com/EbF5qgl.png)
* @PathVariable 用法
![](https://i.imgur.com/CPJzEBE.png)
* @RequestParam 與 @PathVariable 的差異
![](https://i.imgur.com/kHR9lqO.png)
:::warning
* @RequestParam：把 id 當成一般的 url 請求參數傳遞
* @PathVariable：把 id 放進 url 路徑來傳遞
:::
* class MyController
```java=
package com.example.demo;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @RequestMapping("/test1/{id}/{name}")
    public String test1(@PathVariable Integer id,
                        @PathVariable String name){
        System.out.println("Path id：" + id);
        System.out.println("Path name：" + name);
        return "Hello test1";
    }
}
```
* API Tester
![](https://i.imgur.com/HBpM0rn.png)

* IntelliJ
![](https://i.imgur.com/dlsP38s.png)

## ( 4-10 ) RESTful API
### ( 4-10-1 ) API
:::warning
* API 指用工程師的方式說明某個功能的使用方法
* 目的：寫清楚這個功能要如何使用
:::
* 取得商品列表 API：分成 Http Request 與 Http Response
![](https://i.imgur.com/vTqNApR.png)
* 範例
![](https://i.imgur.com/0gGCQx0.png)
### ( 4-10-2 ) REST 風格
:::warning
* 目的：簡化溝通成本
:::
### ( 4-10-3 ) REST 的 Http Method 表示動作
![](https://i.imgur.com/s0xt8q7.png)
### ( 4-10-4 ) 使用 url 路徑描述資源之間的階層關係
![](https://i.imgur.com/u80mV3m.png)

![](https://i.imgur.com/z4EmIuP.png)
### ( 4-10-5 ) response body 返回 json 或 xml 格式
:::warning
* @RestController = Rest + Controller
:::
![](https://i.imgur.com/vILH6ra.png)
### ( 4-10-6 ) 如何設計出 RESTful API ?
:::warning
* 使用 http method 表示動作
* 使用 url 路徑描述資源之間的階層關係
* response body 返回 json 或 xml 格式
:::
![](https://i.imgur.com/CHFi05Y.png)

### ( 4-10-7 ) RESTful API 實作
* class Student
```java=
package com.example.demo;

public class Student {
    Integer id;
    String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
* class StudentController
```java=
package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
public class StudentController {

    // 限制前端只能使用 POST 方法發送請求
    // @RequestMapping(value = "/students", method = RequestMethod.POST) // 第一種，不建議使用
    @PostMapping("/students") // 第二種
    public String create(@RequestBody Student student){
        return "執行資料庫 Create 操作";
    }

    @GetMapping("/students/{studentId}")
    public String read(@PathVariable Integer studentId){
        return "執行資料庫 Read 操作";
    }

    @PutMapping("/students/{studentId}")
    public String update(@PathVariable Integer studentId,
                         @RequestBody Student student){
        return "執行資料庫 Update 操作";
    }

    @DeleteMapping("/students/{studentId}")
    public String delete(@PathVariable Integer studentId){
        return "執行資料庫 Delete 操作";
    }
}
```

## ( 4-11 ) 驗證請求參數
:::warning
* 如果使用 Spring Boot 2.3 之後的版本
* 必須在 pom.xml 檔添加 validation 設定
```xml=
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```
:::
### ( 4-11-1 ) 第一種方式
* class StudentController
```java=
package com.example.demo;

import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
public class StudentController {

    @PostMapping("/students")
    public String create(@RequestBody @Valid Student student){
        return "執行資料庫 Create 操作";
    }
}
```

* class Student
```java=
package com.example.demo;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class Student {

    @NotNull
    Integer id;

    String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
![](https://i.imgur.com/8AKK8r9.png)


### ( 4-11-2 ) 第二種方式
* class StudentController
```java=
package com.example.demo;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.constraints.NotNull;

@RestController
@Validated
public class StudentController {

    @PostMapping("/students")
    public String create(@RequestBody @NotNull Student student){
        return "執行資料庫 Create 操作";
    }

}
```

![](https://i.imgur.com/VHxVhSM.png)



* API Tester ( 正常 )
![](https://i.imgur.com/KCM1jBO.png)

* API Tester ( 失敗 )
![](https://i.imgur.com/KmCntlg.png)

### ( 4-11-3 ) Spring Boot 中驗證請求猜數的註解
![](https://i.imgur.com/W4k66xq.png)
![](https://i.imgur.com/SWpLu2t.png)

## ( 4-12 ) 常見的 Http status code
:::warning
* 可以根據首位數字分成五大類
    * 1xx：資訊
    * 2xx：成功
    * 3xx：重新導向
    * 4xx：前端請求錯誤
    * 5xx：後端處理有問題
:::
### ( 4-12-1 ) 1xx：資訊
:::warning
* 無常見狀態碼
:::

### ( 4-12-2 ) 2xx：成功
:::warning
* 200 OK -> 請求成功
* 201 Create -> 請求成功且新的資源成功被創建，通常用在 POST 的 response
* 202 Accepted -> 請求已經接收，但尚未處理完成
:::

### ( 4-12-3 ) 3xx：重新導向
:::warning
* 301 Moved Permanently -> 永久性重新導向
    * 新的 url 應放在 response header 的 "Location" 中返回
    * 通常會用在網頁搬家上
* 302 Found -> 臨時重新導向
    * 新的臨時性的 url 應放在 response header 的 "Location" 中返回
:::

### ( 4-12-4 ) 4xx：前端請求錯誤
:::warning
* 400 Bad Request -> 前端的請求參數有錯誤
    * 例如：前端傳給後端的參數名稱不同、請求的格式有問題
* 401 Unauthorized -> 沒有通過身份驗證
* 403 Forbidden -> 請求被後端拒絕，通常是權限不足導致
* 404 Not Found -> 網頁不存在，可能是資源被移走或是 url 輸入錯誤
:::


### ( 4-12-5 ) 5xx：後端處理有問題
:::warning
* 500 Internal Server Error -> 後端在執行程式時發生錯誤
    * 可能是程式內有 bug 導致的
* 503 Service Unavailable -> 臨時維護或流量太大
    * 後端目前沒辦法處理請求
* 504 Gateway Timeout -> 請求超時
:::

### ( 4-12-6 ) ResponseEntity\<?\> 自定義 Http Response 狀態碼
![](https://i.imgur.com/wXXXyz8.png)
```java=
package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @RequestMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Hello World");
    }
}
```
![](https://i.imgur.com/2DmEbvN.png)

### ( 4-12-7 ) @ControllerAdvice + @ExceptionHandler 自定義 Exception
:::warning
* @ControllerAdvice
    * 加在 class 上，將 class 變成一個 bean
    * 並且可以在內部使用 @ExceptionHabdler
* @ExceptionHandler
    * 加在方法上，去 catch 方法所噴出的 Exception
* 底層是使用 Spring AOP 機制
:::
![](https://i.imgur.com/YspikYG.png)
#### ( 4-12-7-1 ) Java 基礎 Exception
![](https://i.imgur.com/iteNGYp.png)

#### ( 4-12-7-2 ) @ControllerAdvice + @ExceptionHandler 範例
* MyController
```java=
package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @RequestMapping("/test1")
    public String test1(){
        throw new RuntimeException("test1 Error");
    }

    @RequestMapping("/test2")
    public String test2(){
        throw  new IllegalArgumentException("test2 Error");
    }
}
```
* class MyExceptionHandler
```java=
package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MyExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handle(RuntimeException exception){
         return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                 .body("RuntimeException：" + exception.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handle(IllegalArgumentException exception){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("IllegalArgumentException：" + exception.getMessage());
    }
}
```
* RuntimeException
![](https://i.imgur.com/nbUP7sq.png)
* IllegalArgumentException
![](https://i.imgur.com/EXrIvzv.png)

#### ( 4-12-7-3 ) 使用 @ControllerAdvice 統一管理 Exception 的好處
![](https://i.imgur.com/K4WOz4I.png)

## ( 4-13 ) 攔截器 Interceptor
![](https://i.imgur.com/Qse7Mos.png)
:::warning
* 說明
    * 請求 url 的時候，Interceptor 會先擋下來，並且檢查 Http request 是否有問題
    * 如果沒有問題就會允許這個 Http request 進到 Controller 裡
    * 如果有問題就會回傳一個錯誤訊息給前端
    * 類似於保全的概念
* 使用時注意
    * 須加上 @Component 
    * 並且 implements HandlerInterceptor
    * preHandle 方法是攔截器中最重要的方法
        * true = 允許通過
        * false = 拒絕
:::
* MyController
```java=
package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @RequestMapping("/test1")
    public String test1(){
        System.out.println("執行 test1 方法");
        return "Hello test1";
    }
    
}
```
* MyInterceptor
```java=
package com.example.demo;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class MyInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("執行 MyInterceptor 的 preHandle 方法");
        // return true;

        response.setStatus(401);
        return false;
    }
}
```
* MyConfig
```java=
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyConfig implements WebMvcConfigurer {

    @Autowired
    private MyInterceptor myInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(myInterceptor).addPathPatterns("/**");
        // registry.addInterceptor(myInterceptor).addPathPatterns("/test1");
    }
}
```

# ( 5 ) Spring JDBC
* [使用 IntelliJ 管理資料庫數據](https://hackmd.io/@KfriURWvR1OWM2V5ZWsnQA/ryG_DeJc9)
:::warning
* 建好資料庫連線設定後
* Spring JDBC 會自動創建 NamedParameterJdbcTemplate 的 Bean
* 我們就可以使用 NamedParameterJdbcTemplate 這個 Bean 裡面的方法
* 對資料庫進行操作
:::

:::warning
* 在 Spring Boot 中執行原始的 SQL 語法來操作資料庫
* NameParameterJdbcTemplate，根據 SQL 語法可分成兩類
    * update()
        * update ( String sql, Map\<String, Object\>);
            * sql：欲執行的 SQL 語法
            * map：SQL 語法裡變數值
    * query() / queryForObject()
        * query( String sql, Map\<String, Object\>, RowMapper\<T\> rowMapper)
            * sql：欲執行的 SQL 語法
            * map：SQL 語法裡變數值
            * rowMapper：將資料庫查詢出來的數據，轉成 JavaObject
:::
![](https://i.imgur.com/y3o5rQi.png)

## ( 5-1 ) INSERT
:::warning
* 前提先建好 IntelliJ 與 MySQL 資料庫連線
:::
### ( 5-1-1 ) Insert 靜態寫法
```java=
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class StudentController {
   
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @PostMapping("/students")
    public String insert(){
        String sql ="INSERT INTO student(id, name) VALUE(3, 'Amy')";
        Map<String, Object> map = new HashMap<>();
        namedParameterJdbcTemplate.update(sql,map);
        return "執行 INSERT SQL";
    }
}
```
### ( 5-1-2 ) Insert 動態寫法
```java=
 package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class StudentController {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @PostMapping("/students")
    public String insert(@RequestBody Student student){

        // SQL 動態變數
        // 在 SQL 語法加上 : 非常重要，表示他是一個動態的變數，它的值就會由 map 裡存放的值決定
        String sql ="INSERT INTO student(id, name) VALUE(:studentId, :studentName)";

        Map<String, Object> map = new HashMap<>();
        map.put("studentId",student.getId());
        map.put("studentName",student.getName());

        namedParameterJdbcTemplate.update(sql,map);
        return "執行 INSERT SQL";
    }
}
```
* API Tester
![](https://i.imgur.com/qgtsXbx.png)

## ( 5-2 ) DELETE
```java=
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class StudentController {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @DeleteMapping("/studnets/{studentId}")
    public String delete(@PathVariable Integer studentId){

        String sql = "DELETE FROM student WHERE id = :studentId";

        Map<String, Object> map = new HashMap<>();
        map.put("studentId",studentId);

        namedParameterJdbcTemplate.update(sql, map);
        return "執行 DELETE SQL";

    }
}
```
* API Tester
![](https://i.imgur.com/3ggpzzF.png)

## ( 5-3 ) UPDATE() 的進階用法
### ( 5-3-1 )當 table 的 id 會自動遞增時，如何取 id 的值
:::warning
* new 一個 KeyHolder 物件
    *  KeyHolder keyHolder = new GeneratedKeyHolder();
* namedParameterJdbcTemplate.update(sql, new MapSqlParameterSource(map), keyHolder);
    * sql：欲執行的 SQL 指令
    * new MapSqlParameterSource(map)：固定寫法
    * keyHolder：剛才建立的 keyHolder 物件
* 取得 id 的值
    * int id = keyHolder.getKey().intValue();
    * 如果在 MySQL 資料庫中設定 id 的型態為 LONG，則必須改成
        * int id = keyHolder.getKey().longValue();
:::
```java=
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class StudentController {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @PostMapping("/students")
    public String insert(@RequestBody Student student){

        String sql ="INSERT INTO student(name) VALUE(:studentName)";

        Map<String, Object> map = new HashMap<>();
        map.put("studentName",student.getName());

        KeyHolder keyHolder = new GeneratedKeyHolder();

        namedParameterJdbcTemplate.update(sql, new MapSqlParameterSource(map), keyHolder);

        int id = keyHolder.getKey().intValue();
        System.out.println("MySQL 自動生成的 id：" + id);

        return "執行 INSERT SQL";
    }
}
```

### ( 5-3-2 ) 要如何大量執行一批 INSERT / UPDATE / DELETE SQL 指令
```java=
package com.example.demo;

import com.mysql.cj.jdbc.MysqlParameterMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class StudentController {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @PostMapping("students/batch")
    public String insertList(@RequestBody List<Student> studentList){

        String sql = "INSERT INTO student(name) VALUE (:studentName)";

        MapSqlParameterSource[] parameterSources = new MapSqlParameterSource[studentList.size()];

        for(int i=0 ; i< studentList.size(); i++){
            Student student = studentList.get(i);

            parameterSources[i] = new MapSqlParameterSource();
            parameterSources[i].addValue("studentName", student.getName());
        }

        namedParameterJdbcTemplate.batchUpdate(sql, parameterSources);

        return "執行一批 INSERT SQL";
    }
}
```
* API Tester
```java=
[
 	{
 		"name":"test1"
	},
 
 	{
 		"name":"test2"
	},

 	{
 		"name":"test3"
	}
]
```
![](https://i.imgur.com/kgNvL5e.png)
:::warning
* 補充：
    * 雖然用 update() 跑迴圈也可以達成 batchUpdate 的效果
    * 但在效率上使用 batchUpdate() 較快
:::
![](https://i.imgur.com/nq4roqk.png)


## ( 5-4 ) SELECT
:::warning
* 寫 SELECT SQL 語法時，不要使用 * 號，缺點是
    * 花費額外網路流量
    * 無法提升資料庫查詢的速度
:::
![](https://i.imgur.com/yolmXCY.png)

### ( 5-4-1 ) 查詢全部
* class StudentController
```java=
package com.example.demo;

import com.mysql.cj.jdbc.MysqlParameterMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class StudentController {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @GetMapping("/students")
    public List<Student> select(){

        String sql = "SELECT id, name FROM student";

        Map<String, Object> map = new HashMap<>();

        List<Student> list =  namedParameterJdbcTemplate.query(sql, map, new StudentRowMapper());

        return list;
    }

}
```
* class StudentRowMapper
```java=
package com.example.demo;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class StudentRowMapper implements RowMapper<Student> {

    // Student：將資料庫的數據轉換成哪種類型的 Java Object
    // ResultSet：從資料庫中查詢出來的數據
    @Override
    public Student mapRow(ResultSet rs, int rowNum) throws SQLException {

        Student student = new Student();
        student.setId(rs.getInt("id")); // 取得 column 為 id 的數據，使用 INT 類型取出來
        student.setName(rs.getString("name")); // 取得 column 為 name 的數據，使用 String 類型取出來

        return student;
    }
}
```
![](https://i.imgur.com/EEHSUtH.png)

### ( 5-4-2 ) 查單筆
```java=
package com.example.demo;

import com.mysql.cj.jdbc.MysqlParameterMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class StudentController {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @GetMapping("/students/{studentId}")
    public Student select(@PathVariable Integer studentId){

        String sql = "SELECT id, name FROM student WHERE id = :studentId";

        Map<String, Object> map = new HashMap<>();
        map.put("studentId", studentId);

        List<Student> list =  namedParameterJdbcTemplate.query(sql, map, new StudentRowMapper());

        // 解決 IndexOutOfBoundsException 的問題
        if(list.size() > 0){
            return list.get(0);
        }else{
            return null;
        }
    }

}
```
![](https://i.imgur.com/dEh3HzA.png)

### ( 5-4-3 ) 資料庫、JAVA、RowMapper 對應的型態

| 資料庫      | JAVA     | RowMapper    |
| --------   | -------- | --------     |
| INT        | Integer  | getInt       |
| VARCHAR    | String   | getString    |
| BIGINT     | Long     | getLong      |
| DOUBLE     | Double   | getDouble    |
| FLOAT      | Float    | getFloat     |
| TIMESTAMP  | Date     | getTimestamp |

![](https://i.imgur.com/fM8I0HQ.png)

### ( 5-4-4 ) Query 方法重點整理
:::warning
* 在 Spring Boor 中，寫 SELECT SQL 時，不要使用 *
    * 一一列舉想查詢的 column
* Query 方法永遠只會回傳一個 List
    * 取得 List 中的數據之前，記得先判斷內部是否有數據
* RowMapper 可將資料庫查詢出來的數據轉為 Java Object 
    * 可使用 resultSet.getXxx( String column ) 取得 column 名字的值 ( 建議使用 )
    * 可使用 resultSet.getXxx( int index ) 取得第幾順位的 column 的值
    * resultSet 所包含的 column，都是 SELECT SQL 中查詢出來的那些 column
* ResultSetExtractor
    * 和 RowMapper 用途一樣，比較強大，可以組合不同的 row 之間的數據
    * 較少用
:::
* RowMapper VS. ResultSetExtractor
![](https://i.imgur.com/E6x8KCv.png)

## ( 5-5 ) MVC 架構
![](https://i.imgur.com/q4xCoTX.png)
:::warning
* MVC 架構模式是軟體工程中一種軟體架構
    * 將系統拆分成 Model、View、Controller 三個部分，每個部分各自負責不同功能
* MVC 架構模式的優點
    * 職責分離，易維護
    * 程式結構更直覺，利於團隊分工
    * 可重複使用寫好的程式
:::

## ( 5-6 ) Controller - Service - DAO 三層式架構
![](https://i.imgur.com/PYiNjj7.png)
:::warning
* Controller - Service - DAO 三層式架構
    * Controller 層：負責接受 Http request、驗證請求參數
    * Service 層：負責業務邏輯
    * DAO 層：負責和資料庫溝通
* 注意事項
    * Class 命名需要以 Controller、Service、Dao 做結尾
        * 用來表示這些 Class 屬於哪一層
    * 將 Controller、Service、Dao 這些 Class 變成 Bean
        * 使用 @Autowired 注入
    * Controller 不能直接 call Dao
        * 只能 call Service，再透過 Service 去 call Dao
    * Dao 只能執行 SQL 指令，去存取資料庫內部數據，不能添加任何業務邏輯
:::
![](https://i.imgur.com/ZX8HpBr.png)

### ( 5-6-1 ) 在 IntelliJ 建立 Controller - Service - DAO 三層式架構
![](https://i.imgur.com/0uTGa64.png)
:::warning
* package controller
    * class StudentController
* package service
    * Interface StudentService
    * class StudentServiceImpl
* package dao
    * Interface StudentDao
    * class StudentDaoImpl
:::

#### DAO
* Interface StudentDao
```java=
package com.example.demo.dao;

import com.example.demo.Student;

public interface StudentDao {

    Student getById(Integer studentId);
}
```

* class StudentDaoImpl
```java=
package com.example.demo.dao;

import com.example.demo.Student;
import com.example.demo.StudentRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class StudentDaoImpl implements StudentDao {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public Student getById(Integer studentId) {

        String sql = "SELECT id, name FROM student WHERE id = :studentId";

        Map<String, Object> map = new HashMap<>();
        map.put("studentId", studentId);

        List<Student> list =  namedParameterJdbcTemplate.query(sql, map, new StudentRowMapper());

        if(list.size() > 0){
            return list.get(0);
        }else{
            return null;
        }
    }
}
```

#### Service
* Interface StudentService
```java=
package com.example.demo.service;

import com.example.demo.Student;

public interface StudentService {

    Student getById(Integer studentId);
}

```

* class StudentServiceImpl
```java=
package com.example.demo.service;

import com.example.demo.Student;
import com.example.demo.dao.StudentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentDao studentDao;

    @Override
    public Student getById(Integer studentId) {
         return studentDao.getById(studentId);
    }
}
```

#### Controller
 * class StudentController
 ```java
package com.example.demo.controller;

import com.example.demo.Student;
import com.example.demo.StudentRowMapper;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;


    @GetMapping("/students/{studentId}")
    public Student select(@PathVariable Integer studentId){
        return studentService.getById(studentId);
    }

}
 ```

## ( 5-7 ) 什麼是交易 ( Transaction )?
:::warning
* Transaction ( 交易 )
    * 資料庫中的一種用法
    * 一個交易裡包含多個資料庫操作，一起成功或一起失敗
    * All or Nothing 原則
* Rollback ( 回滾 )
    * 撤銷已執行的資料庫操作，確保數據恢復原狀
:::

### ( 5-7-1 ) @Transactional
:::warning
* 加在 class 或 method 上
* 使用交易來管理這個方法中的資料庫操作
:::
![](https://i.imgur.com/vnA2dpa.png)

## ( 5-8 ) 多個資料庫連線設定
![](https://i.imgur.com/tjIwMmr.png)
* application.properties
```properties=
# 多個資料庫的連線設定
spring.datasource.test1.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.test1.jdbc-url=jdbc:mysql://localhost:3306/test1?serverTimezone=Asia/Taipei&characterEncoding=utf-8
spring.datasource.test1.username=root
spring.datasource.test1.password=springboot

spring.datasource.test2.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.test2.jdbc-url=jdbc:mysql://localhost:3306/test2?serverTimezone=Asia/Taipei&characterEncoding=utf-8
spring.datasource.test2.username=root
spring.datasource.test2.password=springboot

# 單個資料庫的連線設定
#spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
#spring.datasource.url=jdbc:mysql://localhost:3306/myjdbc?serverTimezone=Asia/Taipei&characterEncoding=utf-8
#spring.datasource.username=root
#spring.datasource.password=springboot
```
* class DataSourceConfiguration 
```java=
package com.example.demo;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfiguration {

    // 連線到 test1 資料庫的 DataSource 和 NamedParameterJdbcTemplate
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.test1")
    public DataSource test1DataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public NamedParameterJdbcTemplate test1JdbcTemplate(
            @Qualifier("test1DataSource") DataSource dataSource) {
        return new NamedParameterJdbcTemplate(dataSource);
    }


    // 連線到 test2 資料庫的 DataSource 和 NamedParameterJdbcTemplate
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.test2")
    public DataSource test2DataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public NamedParameterJdbcTemplate test2JdbcTemplate(
            @Qualifier("test2DataSource") DataSource dataSource) {
        return new NamedParameterJdbcTemplate(dataSource);
    }

}
```

* class StudentController
```java=
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class StudentController {

    @Autowired
    @Qualifier("test1JdbcTemplate")
    private NamedParameterJdbcTemplate test1JdbcTemplate;

    @Autowired
    @Qualifier("test2JdbcTemplate")
    private NamedParameterJdbcTemplate test2JdbcTemplate;


    @PostMapping("/test1/students")
    public String test1Insert(@RequestBody Student student) {
        String sql = "INSERT INTO student(name) VALUE (:studentName)";

        Map<String, Object> map = new HashMap<>();
        map.put("studentName", student.getName());

        test1JdbcTemplate.update(sql, map);

        return "插入數據到 test1 資料庫";
    }

    @PostMapping("/test2/students")
    public String test2Insert(@RequestBody Student student) {
        String sql = "INSERT INTO student(name) VALUE (:studentName)";

        Map<String, Object> map = new HashMap<>();
        map.put("studentName", student.getName());

        test2JdbcTemplate.update(sql, map);

        return "插入數據到 test2 資料庫";
    }
}
```

# ( 6 ) Spring Data JPA
:::warning
* 使用 ORM 的概念，透過 Java Object 來間接操作資料庫
* ORM ( Object-Relational Mapping ) 
    * 將 Java Object 對應到資料庫的 Table
    * 所以對 Java Object 操作，就是對資料庫的操作
* JPA ( Java Persistence API )
    * 定義要如何去操作資料庫
    * 提供許多註解可以使用，例如：
        * @Entity、@Table、@Column
* Hibernate
    * 一種 ORM 框架，實現 JPA
    * 負責自動生成 SQL 語法
:::
![](https://i.imgur.com/r1BQWOk.png)

## ( 6-1 ) Spring JDBC vs Spring Data JPA
![](https://i.imgur.com/u4zJg80.png)

## ( 6-2 ) 資料庫連線設定
:::warning
* Spring JDBC 與 Sping Data JPA 的資料庫連線設定都相似
    * 除了 pom.xml 需要修改之外，其餘皆相同
:::
### ( 6-2-1 ) pom.xml
```xml=
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

## ( 6-3 ) 第一支 Spring Data JPA 程式
* Database
```sql=
CREATE TABLE student(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);
```
* class Student
```java=
package com.example.demo;

import javax.persistence.*;

@Entity
@Table(name = "studnet") // name 的名字是資料庫裡面 table 的名字
public class Student {

    @Id // 表示 id 為 Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 的值由資料庫自動生成
    @Column(name = "id") // name 的名字是資料庫裡面 column 的名字
    Integer id;

    @Column(name = "name")
    String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
* interface StudentRepository
```java=
package com.example.demo;

import org.springframework.data.repository.CrudRepository;

// 讓這支 class 去繼承 Spring Data JPA 所提供的 Interface
public interface StudentRepository extends CrudRepository<Student, Integer> {

}
```
* StudentController
```java=
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/students")
    public String insert(@RequestBody Student student){

        studentRepository.save(student);

        return "執行資料庫 Create 操作";
    }
}
```

## ( 6-4 ) CrudRepository
![](https://i.imgur.com/HsBifSX.png)

### ( 6-4-1 ) Spring Data JPA 提供的 Interface
![](https://i.imgur.com/ZdEQDNX.png)

### ( 6-4-2 ) 查看由 Spring Data JPA 所自動生成的 SQL 語法
* application.properties
```properties=
spring.jpa.show-sql=true
```

### ( 6-4-3 ) CrudRepository 的方法
:::warning
* 若想使用 save 方法來執行資料庫的 Update 操作之前
    * 要先確認這筆數據是否真的存在
        * 存在才會 Update
        * 不存在會 Insert
:::
* class StudentController
```java=
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/students")
    public String insert(@RequestBody Student student){
        studentRepository.save(student);
        return "執行資料庫 Create 操作";
    }

    @PutMapping("/students/{studentId}")
    public String update(@PathVariable Integer studentId,
                         @RequestBody Student student){

        Student s = studentRepository.findById(studentId).orElse(null);
        if( s != null) {
            s.setName(student.name);
            studentRepository.save(s);
            return "執行資料庫 Update 操作";
        }else{
            return "Update 失敗，數據不存在";
        }
    }

    @DeleteMapping("/students/{studentId}")
    public String delete(@PathVariable Integer studentId){
        studentRepository.deleteById(studentId);
        return "執行資料庫 Delete 操作";
    }

    @GetMapping("/students/{studentId}")
    public Student read(@PathVariable Integer studentId){
        Student student = studentRepository.findById(studentId).orElse(null);
        return student;
    }
}
```

## ( 6-5 ) 自定義查詢條件
:::warning
* Query vs findByXxx
    * 優先使用 findByXxx 命名規則
    * 複雜的邏輯才使用 @Query
:::

### ( 6-5-1 ) @Query
:::warning
* 在 Spring Data JPA 執行原生 SQL 指令
* nativeQuery
    * true：一般 SQL 語法
    * false：JPQL
:::
![](https://i.imgur.com/STOH5aL.png)

### ( 6-5-2 ) findByXxx
* 圖示說明
![](https://i.imgur.com/7VeNXRy.png)
* 圖示說明
![](https://i.imgur.com/6WU3KOp.png)

## ( 6-6 ) Spring Data JPA 總結
:::warning
* 建立 ORM 對應關係
    * @Entity
    * @Table、@Column、@Id
* CrudRepository 用法
    * save()：新增 / 修改
    * findBuId()：查詢
    * deleteById()：刪除
* 自定義查詢條件
    * findByXxx 命名規則
    * @Query 執行sql 語法
:::