Spring Boot ( 進階 )
===

# ( 7 ) Spring Boot 單元測試
* 確認 pom.xml 是否有添加 test 設定
* 基本上創建 Spring Boot，預設就會有此設定
```xml=
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

## ( 7-1 ) 單元測試 ( Unit Testing )
* 目的：
    * 自動化測試程式的正確性，一次只測試一個功能點
        * 可以是一個 method 或 一個 API
* 其他軟體測試，例如：
    * 整合測試 ( Integration Testing )
    * 端對端測試 ( End-To-End Testing )
* 用法：
    * 在想執行 Unit Testing 的方法內部按下右鍵
        * Generate -> Test 
        * 預設即可，直接按下 OK
* class Calculator
```java=
package com.example.demo;

public class Calculator {

    public int add(int x, int y){
        return x + y;
    }

    public static void main(String[] args) {
        Calculator calculator = new Calculator();
        int result = calculator.add(1, 2);
        System.out.println("結果為：" + result);
    }
}
```

* class CalculatorTest
```java=
package com.example.demo;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {

    @Test
    public void test(){
        Calculator calculator = new Calculator();
        int result = calculator.add(1, 2);

        // assert 斷言 -> 我認為
        // Equals 相等
        assertEquals(3, result);
    }
}
```
![](https://i.imgur.com/BFyMEpC.png)

## ( 7-2 ) 單元測試的特性和注意事項
* 單元測試的特性
    * 可自動化運行
    * 各個單元測試互相獨立，彼此不能有依賴關係
    * 測試結果穩定，不受外部服務影響
* 單元測試注意事項
    * 必須遵守
        * 測試的程式要放在 test 資料夾裡
    * 沒有硬性規定
        * 測試的 class 以 「原 class 名字加上 Test 做為結尾」來命名
        * 測試的 class 的 package 跟原 class的 package 保持一致

## ( 7-3 ) JUnit 5 用法
* JUnit
    * 是 Java 單元測試必備工具
    * 只要在方法上加上 @Test，即可產生一個單元測試

### ( 7-3-1 ) JUnit 與 Spring Boot 版本關係
* Spring Boot 版本 <= 2.1
    * 僅能使用 JUnit 4
* Spring Boot 版本為 2.2、2.3
    * 能同時使用 JUnit 4、JUnit 5
* Spring Boot 版本 >= 2.4
    * 僅能使用 JUnit 5

### ( 7-3-2 ) 如何禁用 JUnit 4
* 如果 Spring Boot 版本在 2.2、2.3 的話
* 可以同時使用 JUnit 4 和 JUnit 5
* 如何去停用 JUnit 4 的功能，要在 pom.xml 設定
```xml=
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
    <exclusions>
        <exclusion>
            <groupId>org.junit.vintage</groupId>
            <artifactId>junit-vintage-engine</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

## ( 7-4 ) JUnit 的 Assert 方法
* 若不符合 assert 斷言預期結果，則預測失敗
* assert 的任何方法，都可以再加一個字串參數，用來描述失敗時錯誤的原因
    * 不建議使用，有可能錯誤原因寫錯，可能會有誤導的情況發生
![](https://i.imgur.com/fG3ItsT.png)
```java=
package com.example.demo;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {

    @Test
    public void add(){
        Calculator calculator = new Calculator();
        int result = calculator.add(1, 2);

        assertNotNull(result);
        assertEquals(3, result, "加法有問題");
        assertTrue(result>1);
    }

    @Test
    public void divide(){
        Calculator calculator = new Calculator();

        // Java 8 的 lambda
        assertThrows(ArithmeticException.class, () -> {
            calculator.divide(1, 0);
        });
    }
}
```

## ( 7-5 )  JUnit 的 @BeforeEach、@AfterEach 註解
* @BeforeEach：在每次 @Test 開始前都會執行一次
* @AfterEach：在每次 @Test 結束後會執行一次
```java=
package com.example.demo;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class MyTest {

    @BeforeEach
    public void BeforeEach(){
        System.out.println("執行 BeforeEach");
    }

    @AfterEach
    public void AfterEach(){
        System.out.println("執行 AfterEach");
    }

    @Test
    public void test1(){
        System.out.println("執行 test1");
    }

    @Test
    public void test2(){
        System.out.println("執行 test2");
    }
}
```
![](https://i.imgur.com/ZkqSxJP.png)

## ( 7-6 )  JUnit 的 @BeforeAll、@AfterAll 註解
* @BeforeAll 和 @AfterAll 註解時，所寫的方法必須是 static
    * 因為方法必須是 static，會導致它們無法存取 Spring 容器中的 Bean，所以較不常用
    * @BeforeAll：在所有 @Test 開始前執行一次
    * @AfterAll：在所有　@Test 結束後執行一次
```java=
package com.example.demo;

import org.junit.jupiter.api.*;

public class MyTest {

    @BeforeAll
    public static void BeforeAll(){
        System.out.println("執行 BeforeAll");
    }

    @AfterAll
    public static void AfterAll(){
        System.out.println("執行 AfterAll");
    }

    @Test
    public void test1(){
        System.out.println("執行 test1");
    }

    @Test
    public void test2(){
        System.out.println("執行 test2");
    }
}
```
![](https://i.imgur.com/MlS77Hw.png)

## ( 7-7 )  JUnit 的 @Disabled、@DisplayName 註解
* @Disabled：忽略 @Test 不執行
* @DisplayName：自定義顯示名稱
```java=
package com.example.demo;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {

    @Disabled
    @Test
    public void add(){
        Calculator calculator = new Calculator();
        int result = calculator.add(1, 2);
        assertEquals(3, result, "加法有問題");
    }

    @DisplayName("測試除法問題")
    @Test
    public void divide(){
        Calculator calculator = new Calculator();
        assertThrows(ArithmeticException.class, () -> {
            calculator.divide(1, 0);
        });
    }
}
```
![](https://i.imgur.com/mz0ViGe.png)

## ( 7-8 ) 使用 JUnit 5 測試 Spring Boot 程式
* 在要測試的 class 上加上 @SpringBootTest，即可運行單元測試
* Spring Boot 就會啟動 Spring 容器，創建所有的 Bean
* 透過 @Component 或 @Configuration、@Bean 創建 Bean 都會被執行

![](https://i.imgur.com/XFyZHAk.png)

## ( 7-9 ) @Transaction 註解 ( 單元測試 )
* 可以加在方法上、也可以加在 class 上
* 單元測試結束後，會 rollback 所有資料庫操作，將數據恢復原狀
![](https://i.imgur.com/81ZIDUM.png)

```java=
package com.example.demo.dao;

import com.example.demo.model.Student;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class StudentDaoImplTest {

    @Autowired
    private StudentDao studentDao;

    @Test
    public void getById(){
        Student studnet = studentDao.getById(2);
        assertNotNull(studnet);
        assertEquals(34.6, studnet.getScore());
        assertEquals("Rom", studnet.getName());
        assertFalse(studnet.isGraduate());
        assertNotNull(studnet.getCreateDate());
    }

    @Test
    @Transactional
    public void deleteById(){
        studentDao.deleteById(3);
        Student student = studentDao.getById(3);
        assertNull(student);
    }

    @Test
    @Transactional
    public void insert(){
        Student student = new Student();
        student.setName("Eden");
        student.setScore(100.0);
        student.setGraduate(true);

        Integer studentId = studentDao.insert(student);

        Student result = studentDao.getById(studentId);

        assertNotNull(result);
        assertEquals("Eden", result.getName());
        assertEquals(100.0, result.getScore());
        assertTrue(result.isGraduate());
        assertNotNull(result.getCreateDate());
    }
    
    @Test
    @Transactional
    public void update(){
        Student studnet = studentDao.getById(3);
        studnet.setName("John");
        studentDao.update(studnet);

        Student result = studentDao.getById(3);
        assertNotNull(result);
        assertEquals("John", result.getName());
    }
}
```

### ( 7-9-1 ) @Transactional 在不同地方，使用方法不同
* 在 main 資料夾 ( 正常程式 )
    * 交易管理，程式運行發生錯誤，才會 rollback
* 在 test 資料夾 ( 單元測試 )
    * 在該單元測試結束後，強制 rollback 所有執行的資料庫操作，將數據恢復原狀

## ( 7-10 ) Controller 層單元測試
* 目的：模擬前端的行為，測試 API 是否正常
* 注意：不能直接注入 bean 測試，需要透過模擬真實 API cll 來測試
![](https://i.imgur.com/4bxPpJR.png)

### ( 7-10-1 ) MockMvc
* 用來模擬真實的 API call
* MockMvc 設定方法
    * (1) 在測試的 class 加上 @SpringBootTest 和 @AutoConfigurationMockMvc
    * (2) 注入 MockMvc
![](https://i.imgur.com/sBzl9QI.png)
```java=
package com.example.demo.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getById() throws Exception { // 33行，perform 會噴出一個 Exception，所以需要 throw 一個 Exception 出來

        // 第一個部分：創建一個 requestBuilder
        // 設定請求的方法、URL、參數
        // get 方法，路徑為 /student/3
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/students/3");

        // 第二個部分：執行 Http request
        // 將剛才創建的 requestBuilder 當作參數，放到 mockMvc.perform() 裡面，就可以送出請求
        // 第三個部分：驗證這次請求的返回結果
        // 34行，驗證此次的請求 Http Status code 是否為 200，不是的話單元測試失敗
        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().is(200));
    }
}
```

### ( 7-10-2 ) MockMvc 主體結構
![](https://i.imgur.com/GEEccwN.png)

### ( 7-10-3 ) MockMvc 常用寫法
* 通常會把 MockMvcResultMatchers 刪掉，然後
* import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
* 並且可以一直接 andExpect 方法，這種寫法屬於 Builder 設計模式 ( 建造者模式 )
* 注意：如果使用的是 Post 方法，必須加上 .contentType(MediaType.APPLICATION_JSON)
* [jsonPath](https://jsonpath.com/)("$.id", equalTo(3))
    * jsonPath 第一個字串參數，表示想要取得這個 json 中哪個 key 值
        * $ 表示最外層的 json Object
        * . 表示 的 意思
    * jsonPath 第二個參數驗證說 id 的值是否為 3
* GET 方法
```java=
package com.example.demo.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getById() throws Exception {

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/students/{studentId}", 3)
                .header("headerName", "headerValue")
                .queryParam("graduate", "true");

        MvcResult mvcResult = mockMvc.perform(requestBuilder)
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.id", equalTo(3)))
                .andExpect(jsonPath("$.name", notNullValue()))
                .andReturn();

        String body = mvcResult.getResponse().getContentAsString();
        System.out.println("返回的 response body 為" + body);

    }
}
```
* POST 方法
```java=
package com.example.demo.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void create() throws Exception {
        String json_String = "{\n" +
                "   \"name\": \"Eden\",\n" +
                "   \"score\": 14.6,\n" +
                "  \"graduate\": false\n" +
                "}";

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json_String);

        mockMvc.perform(requestBuilder)
                .andExpect(status().is(201));

    }
}
```

## ( 7-11 ) Mock 測試
* 目的：避免為了測試某一個單元測試，而建構整個 bean 的 dependency
* 作法：創造一個假的 bean，去替換掉 Spring 容器中原有的 bean
* 補充：Mock 測試為 Spring IoC 的優點 
    * More testable 方便測試程式
### ( 7-11-1 ) 圖說概念
![](https://i.imgur.com/KJH7zjX.png)
![](https://i.imgur.com/8SnAXvI.png)

### ( 7-11-2 ) Mockito
* Mockito 是 Spring Boot 中進行 Mock 測試的工具
* 功能：
    * 模擬方法的返回值
    ![](https://i.imgur.com/fm1i4YC.png)
    * 模擬拋出的 Exception
    ![](https://i.imgur.com/0TlVj5U.png)
    * 紀錄方法的使用次數、順序
    ![](https://i.imgur.com/aJHqkY3.png)
* 用法：
    * @MockBean：產生一個假的 Bean，去替換掉 Spring 容器中原有的 bean
        * 沒有定義的方法，預設為 null
* 限制：
    * 不能 mock static 方法
    * 不能 mock private 方法
    * 不能 mock final class

```java=
package com.example.demo.service;

import com.example.demo.dao.StudentDao;
import com.example.demo.model.Student;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class StudentServiceImplMockTest {

    @Autowired
    private StudentService studentService;

    // 創建一個假的 studentDao 的 Bean
    @MockBean
    private StudentDao studentDao;

    @Test
    public void getById(){

        // 用假的 studentDao 的 Bean 來 new 出一個實體
        Student mockStudent = new Student();
        mockStudent.setId(100);
        mockStudent.setName("I'm mock.");

        // 當有人使用 studentDao 的 getById 方法，就 return mockStudent
        // mockStudent 是我們在上面 new 出的實體
        Mockito.when(studentDao.getById(2)).thenReturn(mockStudent);

        // 也會使用 Mockito.any() 將條件設定寬鬆一點
        // Mockito.when(studentDao.getById(Mockito.any())).thenReturn(mockStudent);

        // 在第 33 行，只有設定 getById(2)，所以在第 40 行使用 getById(2) 才有值，其餘為預設 null
        Student student = studentService.getById(2);
        assertNotNull(student);
        assertEquals(100, student.getId());
        assertEquals("I'm mock.", student.getName());
    }
}
```

### ( 7-11-3 ) @MockBean、@SpyBean
* @MockBean：產生一個假的 Bean 替換掉 Spring 容器中的 bean
    * 沒有定義的方法，預設為 null
* @SpyBean：Spring 容器中的 Bean 仍舊是正常的 Bean，只是替換其中幾個方法
    * 沒有定義的方法，預設使用真實的方法

![](https://i.imgur.com/fw374NW.png)

## ( 7-12 ) 使用 H2 資料庫
* 一種嵌入式資料庫
* 主要用途
    * 可以在啟動 Spring Boot 時被生成出來，在運行結束時銷毀
    * 用完即丟的概念，常用在單元測試，降低程式對實體資料庫的依賴

### ( 7-12-1 ) H2 資料庫 Maven
* [H2 Maven](https://mvnrepository.com/artifact/com.h2database/h2) 
```xml=
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <version>1.4.200</version>
    <scope>test</scope>
</dependency>
```
### ( 7-12-2 ) 建立資料夾
* 在 test 資料夾下
    * 建立 resource 資料夾，在 resources 資料夾下
        * 建立 application.properties
* 要注意的是，在 main/resource/application.properties 檔案有做修改時
    * 記得也在 test/resource/application.properties 檔案做修改
![](https://i.imgur.com/2BfNDyJ.png)

### ( 7-12-3 ) 設定 test/resource/application.properties
* testdb 和 sa 可以自行更換名字
```xml=
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=sa
```

### ( 7-12-4 ) 建立 Table
* 首先在 test/resource 資料夾下 data.sql
    * 建立兩個 File
        * schema.sql
            * 創建 Table 的相關語法
        * data.sql
            * 插入數據的相關語法 
* schema.sql
```sql=
-- CREATE TABLE student ( 
-- H2 資料庫 create table 記得加上 IF NOT EXISTS
-- 當 student table 不存在時，Spring Boot 才會在 H2 資料庫創建 student table
CREATE TABLE IF NOT EXISTS student ( 
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    score DOUBLE,
    graduate BOOLEAN,
    create_date TIMESTAMP
);
```
* data.sql
```sql=
INSERT INTO student (name, score, graduate, create_date) VALUES ('Amy', 90.3, true, '2021-09-01 10:20:33');
INSERT INTO student (name, score, graduate, create_date) VALUES ('Rom', 34.6, false, '2021-08-10 17:21:14');
INSERT INTO student (name, score, graduate, create_date) VALUES ('Judy', 100.0, true, '2021-09-05 12:19:48');
INSERT INTO student (name, score, graduate, create_date) VALUES ('Mike', 87.2, true, '2021-09-03 15:01:15');
```

### ( 7-12-5 ) 補充
* 若是使用 Spring Data JPA，必須在 
    * test/resource/application.properties 加上一行設定
    * 才不會和 Hibernate 預設的設定互相影響
```xml=
spring.jpa.hibernate.ddl-auto=none
```

### ( 7-12-6 ) H2 資料庫運作流程
![](https://i.imgur.com/MHpkMy8.png)

### ( 7-12-7 ) Spring Boot 特性
* Convention over Configuration ( 約定大於配置 or 慣例優於設定 )
    * 不需添加任何設定，只要知道運作規則，就可以直接使用
    * 所有 project 遵循一致標準化設定
* Spring Boot 出現的意義就是為了簡化 Spring 開發
![](https://i.imgur.com/UKgGaXi.png)

## ( 7-13 ) 單元測試實戰經驗談
* 我們真的需要單元測試嗎 ?
    * 單元測試並不是越多越好，程式越多表示維護成本越高
    * 單元測試的重要程度 = 影響使用者的程度
* 如何寫好單元測試 ?
    * 寫單元測試時，要從使用者的角度出發
    * 一定要測試 Error Case
    * 善用 Run Test With Coverage 查看單元測試覆蓋範圍
![](https://i.imgur.com/FanZMZ6.png)

![](https://i.imgur.com/Wj5WZAn.png)

## ( 7-14 ) 測試驅動開發 ( Test-Driven Development，TDD )
* 「先寫測試，再寫開發」，大致上分成五個步驟
    * 選擇一個功能，先寫單元測試
    * 單元測試失敗
    * 實作程式
    * 單元測試成功
    * 持續重構程式
![](https://i.imgur.com/rL4Y5Xb.png)

# ( 8 ) Spring Boot 相關知識

## ( 8-1 ) Maven
* Maven 是在 Spring Boot 開發中
    * 負責 Library 管理
        * 管理這個 Spring Boot 可以使用那些功能
        * 透過 pom.xml 管理
    * Project 建構
        * 對 Spring Boot 進行編譯、測試、運行、清理、打包
        * 透過 Maven 指令操作

## ( 8-2 ) Maven Repository ( Maven 倉庫 )
* 儲存 Spring Boot project 依賴的 Library ( jar 檔 )
* 可分為 Local Repository ( 本地倉庫 ) 和 Remote Repository ( 遠端倉庫 )
* 當在 Local 倉庫找不到 jar 時，才會去 Remote 找
    * Local Repository：電腦存放 jar 的地方
    * Remote Repository：雲端存放 jar 的地方

## ( 8-3 ) Maven 指令的生命週期
![](https://i.imgur.com/eZkL5w4.png)

## ( 8-4 ) 不同的環境設定
* application.properties 檔案複製一份，分別取名為
    * application-dev.properties
    * application-test.properties
![](https://i.imgur.com/5Enf2Zg.png)
* application-dev.properties
```xml=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/dev?serverTimezone=Asia/Taipei&characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=ss210080
```

* application-test.properties
```xml=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/test?serverTimezone=Asia/Taipei&characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=ss210080
```

![](https://i.imgur.com/vBMJ7k5.png)

### ( 8-4-1 ) 若要執行 dev 資料庫
* Edit Configurations
![](https://i.imgur.com/8UlK6cA.png)
* Spring Boot / DemoApplication / Active profiles：dev
![](https://i.imgur.com/BlFDFqv.png)

## ( 8-5 ) Log 級別與規範
* 在實際工作中，我們會使用 Log 將資訊記錄下來
    * log.info("取得 student {}", studentId);
        * 一般資訊
    * log.warn("警告");
        * 不該發生的問題，但不至於對程式造成重大影響
    * log.error("程式有問題");
        * 程式目前運行出現問題

### ( 8-5-1 ) 在 StudentController.java 使用 Log
* 記得選的是 org.slf4f
* getLogger("這個 class 的名稱");
* StudentController.java
```java=
private final static Logger log = LoggerFactory.getLogger("studentController.class");

@GetMapping("/students/{studentId}")
public ResponseEntity<Student> read(@PathVariable Integer studentId) {

    log.info("取得 student {}", studentId); // 取得 studentId 寫法

    Student student = studentService.getById(studentId);
    return ResponseEntity.status(HttpStatus.OK).body(student);
}
```
* API Tester
![](https://i.imgur.com/YJXcnrv.png)

* IntelliJ
![](https://i.imgur.com/FwvMVSL.png)

## ( 8-6 ) 使用 IntelliJ 創建 Spring Boot Project
* 第一步驟
    * File/New/Project
* 第二步驟
    * Spring Initializr/Project SDK：依需求選擇 JDK
* 第三步驟
    * Group、Artifact 是 maven 中的 groupId 和 artifactId 的設定
        * Group：通常是公司名稱或是公司的網址倒過來寫
        * Artifact：通常是功能的名字
* 第四步驟
    * 要預先載入哪些 dependency 至 maven 的 pom 檔中
    * web/Spring Web
        * 表示添加一個 spring-boot-starter-web 的 dependency

### ( 8-6-1 ) 沿用原本的 Project 資料庫設定
* 打開之前的 Spring Boot Project
    * Database / Data Source Properites / 之前設定好的 sql 按下右鍵 / Make Global / OK

## ( 8-7 ) Json 字串和 Java Object 的轉換
* ObjectMapper
    * 用途：將 Json 字串和 Java Object 互相轉換
    * 條件：確保在 pom.xml 中有添加 spring-boot-starter-web 即可
    * 用法：
        * writeValueAsString()：Java Object → Json 字串
            * 如果物件的屬性原本沒有設定值，則轉成 Json 字串會是 null
        * readValue()：Json 字串 → Java Object
* [進階：SpringBoot - 使用 ObjectMapper 完成 json 和 Java Object 互相轉換](https://kucw.github.io/blog/2020/6/java-jackson/)
* User.java
```java=
package com.example.json.objectmapper;

public class User {

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

* objectMapperController.java
```java=
package com.example.json.objectmapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ObjectMapperController {

    @GetMapping("convert")
    public String convert() throws JsonProcessingException {

        User user = new User();
        user.setId(1);
        user.setName("Eden");

        ObjectMapper objectMapper = new ObjectMapper();

        // 將 User 轉成　json 字串
        String jsonResult = objectMapper.writeValueAsString(user);
        System.out.println("json 值：" + jsonResult);

        // 將 json 字串轉成 User
        String json = "{\"id\":3,\"name\":\"Amy\"}";
        User userResult = objectMapper.readValue(json, User.class);
        System.out.println("User 的 id ：" + userResult.getId());
        System.out.println("User 的 name ：" + userResult.getName());
        return "convert success";
    }
}
```

### ( 8-7-1 ) 過濾 null 的值
* 需要在 User.java 設定
```java=
package com.example.json.objectmapper;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

    Integer id;
    String name;

    // 省略 getter / setter
}
```

### ( 8-7-2 ) Json 字串有新的屬性，且需轉成 User 物件
* 可能隨著開發會產生新的屬性
* 在 Json 中有新的屬性，但在 User 沒有此屬性，就會導致 Unrecongized field
    * 第一種解決方法
        * 在 User 物件再新增一個屬性，但後續不好維護
    * 第二種解決方法
        * 在 User 物件加上 @JsonIgnoreProperties(ignoreUnknown = true)
* User.java
```java=
package com.example.json.objectmapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    Integer id;
    String name;

    // 省略 getter / setter
}
```

### ( 8-7-3 ) 解決 Java 變數名稱和 Json 字串中的 key 不同
* User.java
```java=
package com.example.json.objectmapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    Integer id;
    String name;

    @JsonProperty("content_email")
    String contentEmail;

    // 省略 getter / setter
}
```
* ObjectMapperController.java
```java=
package com.example.json.objectmapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ObjectMapperController {

    @GetMapping("convert")
    public String convert() throws JsonProcessingException {

        User user = new User();
        user.setId(1);
        user.setName("Eden");
        user.setContentEmail("Eden@test.com");

        ObjectMapper objectMapper = new ObjectMapper();

        // 將 User 轉成　json 字串
        String jsonResult = objectMapper.writeValueAsString(user);
        System.out.println("json 值：" + jsonResult);

        // 將 json 字串轉成 User
        String json = "{" +
                "\"id\":3," +
                "\"name\":\"Amy\"," +
                "\"content_email\":\"test@test.com\"}";
        User userResult = objectMapper.readValue(json, User.class);
        System.out.println("User 的 id ：" + userResult.getId());
        System.out.println("User 的 name ：" + userResult.getName());
        System.out.println("User 的 email ：" + userResult.getContentEmail());
        return "convert success";
    }
}
```

### ( 8-7-4 ) 可搭配使用
![](https://i.imgur.com/Rym9uHs.png)

## ( 8-8 ) RestTemplate
* 用途：在 Spring Boot 中，發起一個 Rest 風格的 Http 請求
    * 可以發起 GET、POST、PUT、DELETE 的 Http 請求
    * 並且可以將收到的 response body 中的 Json 字串轉成 java object
* 使用條件：
    * 確保 pom.xml 中有加上 spring-boot=starter-web 即可

### ( 8-8-1 ) [Mock API](https://mocki.io/)
* 創建一組臨時外部 API

* Student.java
```java=
package com.example.json.resttemplate;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Student {

    Integer id;
    String name;

    @JsonProperty("contact_phone")
    String contactPhone;

    // 省略 getter / setter
}
```
* RestTemplateController.java
```java=
package com.example.json.resttemplate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RestTemplateController {

    @GetMapping("/getForObject")
    public String getForObject(){

        RestTemplate restTemplate = new RestTemplate();
        Student student = restTemplate.getForObject(
                "https://mocki.io/v1/734d561f-b31a-4683-9076-9c23fa4f47f4", Student.class);

        System.out.println("student 的 id ：" + student.getId());
        System.out.println("student 的 name ：" + student.getName());
        System.out.println("student 的 contactPhone ：" + student.getContactPhone());

        return "getForObject success";
    }
}
```

### ( 8-8-2 ) 延伸寫法：在 url 後面加上請求參數
![](https://i.imgur.com/ZKTfQc4.png)
```java=
    @GetMapping("/getForObjectWithParm")
    public String getForObjectWithParm(){
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> queryParamMap = new HashMap<>();
        queryParamMap.put("graduate",true);

        Student student = restTemplate.getForObject(
                "https://mocki.io/v1/734d561f-b31a-4683-9076-9c23fa4f47f4",
                Student.class,
                queryParamMap
        );
        return "getForObject With Parm success";
    }
```

### ( 8-8-3 ) 延伸寫法：getForEntity
* getForEntity 和 getForObject 差別
    * getForEntity 是返回整個 ResponseEntity
        * HttpResponse、Response Header
        * 可以取得 Http status
```java=
    @GetMapping("/getForEntity")
    public String getForEntity(){
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Student> studentResponseEntity = restTemplate.getForEntity(
                "https://mocki.io/v1/734d561f-b31a-4683-9076-9c23fa4f47f4",
                Student.class
        );

        System.out.println("Http 狀態碼：" + studentResponseEntity.getStatusCode());

        Student student = studentResponseEntity.getBody();
        System.out.println("student 的 id ：" + student.getId());
        System.out.println("student 的 name ：" + student.getName());
        System.out.println("student 的 contactPhone ：" + student.getContactPhone());

        return "getForObject success";
    }
```

### ( 8-8-3 ) 延伸寫法：postForObject
* 用 post 的請求方法，然後回傳一個 java Object
* postForObject 三個參數
    * url：路徑
    * Request Body：包成物件，RestTemplate 會自動轉成 Json 格式，再發起 Post 請求
    * 回傳時，將 Json 字串轉成物件
![](https://i.imgur.com/5F4vwHQ.png)
```java=
    @GetMapping("/postForObject")
    public String postForObject(){
        RestTemplate restTemplate = new RestTemplate();

        Student studentRequestBody = new Student();
        studentRequestBody.setName("Eden");

        Student result = restTemplate.postForObject(
                "https://mocki.io/v1/734d561f-b31a-4683-9076-9c23fa4f47f4",
                studentRequestBody,
                Student.class
        );
        return "postForEntity success";
    }
```

### ( 8-8-3 ) 延伸寫法：postForEntity
```java=
    @GetMapping("/postForEntity")
    public String postForEntity(){
        RestTemplate restTemplate = new RestTemplate();

        Student studentRequestBody = new Student();
        studentRequestBody.setName("Eden");

        ResponseEntity<Student> responseEntity = restTemplate.postForEntity(
                "https://mocki.io/v1/734d561f-b31a-4683-9076-9c23fa4f47f4",
                studentRequestBody,
                Student.class
        );
        return "responseEntity success";
    }
```

### ( 8-8-4 ) 延伸寫法：GET exchange()
![](https://i.imgur.com/qlredLY.png)
```java=
    @GetMapping("/exchange")
    public String exchange(){

        RestTemplate restTemplate = new RestTemplate();

        // 使用 exchange 發起 Get 請求
        // 可以定義請求過程中要帶上那些 Header
        HttpHeaders requestsHeaders = new HttpHeaders();
        requestsHeaders.set("header1", "123");

        // 定義完後，再用 HttpEntity 封裝起來
        HttpEntity requestEntity = new HttpEntity(requestsHeaders);

        // queryParamMap 定義要帶哪一些參數
         Map<String, Object> queryParamMap = new HashMap<>();
         queryParamMap.put("graduate", true);

         ResponseEntity<Student> getStudentEntity = restTemplate.exchange(
                 "https://mocki.io/v1/734d561f-b31a-4683-9076-9c23fa4f47f4",
                 HttpMethod.GET,
                 requestEntity,
                 Student.class,
                 queryParamMap
         );

        System.out.println(getStudentEntity.getStatusCode());
        System.out.println(getStudentEntity.getBody().getId());
        System.out.println(getStudentEntity.getBody().getName());
        System.out.println(getStudentEntity.getBody().getContactPhone());

         return "exchange success";
    }
```

### ( 8-8-5 ) 延伸寫法：Post exchange()
![](https://i.imgur.com/yGJ05Cm.png)
```java=
    // 使用 exchange 發起 Post 請求
    @GetMapping("/postExcgange")
    public String postExcgange(){

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders requestsHeaders = new HttpHeaders();
        requestsHeaders.set("header1", "123");
        requestsHeaders.setContentType(MediaType.APPLICATION_JSON); // 這是一定要加的

        Student studentRequestBody = new Student();
        studentRequestBody.setName("John");

        // 定義完後，再用 HttpEntity 封裝起來
        HttpEntity requestEntity = new HttpEntity(studentRequestBody, requestsHeaders);

        ResponseEntity<Student> postStudentEntity = restTemplate.exchange(
                "https://mocki.io/v1/734d561f-b31a-4683-9076-9c23fa4f47f4",
                HttpMethod.POST,
                requestEntity,
                Student.class
        );

        System.out.println(postStudentEntity.getStatusCode());
        System.out.println(postStudentEntity.getBody().getId());
        System.out.println(postStudentEntity.getBody().getName());
        System.out.println(postStudentEntity.getBody().getContactPhone());

        return "exchange success";
    }
```

## ( 8-9 ) Thymeleaf 前端模板引擎
* 用途：Spring Boot 中的前端模板引擎，支援 Html 頁面的開發和渲染
* 使用條件：需在 pom.xml 中加上 spring-boot-starter-thymeleaf
* 其他常見 Spring Boot 模板引擎：JSP、Freemarker

### ( 8-9-1 ) 使用 Thymeleaf 重點
* 需使用 @Controller 註解
* Thymeleaf 根據 Controller 返回的字串，找尋相同名字的 Html 檔案

* Student.java
```java=
package com.example.thymeleaf;

public class Student {
    Integer id;
    String name;

    // 省略 getter / setter
}
```

* Thymeleaf.java
```java=
package com.example.thymeleaf;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ThymeleafController {

    @GetMapping("/home")
    public String home(Model model) {
        Student student = new Student();
        student.setId(1);
        student.setName("Judy");

        // 將 java 中的 student 變數，存放在 Thymeleaf 的 myStudent 變數裡
        model.addAttribute("myStudent", student);
        return "index";
    }

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @PostMapping("/login")
    public String login(String userName,
                        String userPassword) {

        System.out.println("userName 為: " + userName);
        System.out.println("userPassword 為: " + userPassword);

        return "login";
    }
}
```
* index.html
```html=
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>My Home</h1>>
</body>
</html>
```

* hello.html
```html=
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<h1>Hello!!</h1>

</body>
</html>
```

* login.html
```html=
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<h1>Login 成功</h1>

</body>
</html>
```