# Spring Boot 基礎架構與 MVC 開發實戰

這篇筆記整理了在 Spring Boot 中最常見的開發模式與基礎組件，包含 Bean 的創建方式、Spring MVC 的請求處理，以及基礎的資料庫操作方式 (Spring Data JPA)。

原因是雖然現在很多架構都已經被封裝得很深，但了解最基礎的 `@RestController` 如何運作、以及 JPA 的核心概念，對於快速開發 API 與除錯依然非常重要。

---

## 1. Bean 的創建與管理

除了我們在進階篇提到的 IoC 機制，目前實務上創建 Bean 有兩種最常見的方式。

### 方法一：使用 @Component 及其衍生註解
最常見的做法。只要在 Class 上加上 `@Component`（或 `@Service`, `@Controller`, `@Repository`），Spring 啟動時掃描到就會自動幫你實例化並放進容器裡。
- **優點**：簡單快速，直接在自己寫的類別上加個註解就好。
- **限制**：只能用在你自己寫的原始碼上。如果是第三方 Library 的類別，你無法去改別人的原始碼加註解。

### 方法二：使用 @Configuration + @Bean
當你需要實例化第三方套件的物件，或是需要經過複雜的初始化設定時，這是唯一的做法。
```java
@Configuration
public class MyConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        // 在這裡可以做各種複雜的初始化設定
        return new RestTemplate();
    }
}
```

---

## 2. Spring MVC 核心概念

**Spring MVC** 是我們開發 RESTful API 的核心。

### 常用註解速查
- `@RestController`：等於 `@Controller` + `@ResponseBody`。它會告訴 Spring，這個類別回傳的資料不是 HTML 網頁，而是要直接轉換成 JSON 格式回傳給前端。
- `@RequestMapping`：用來對應 URL 路徑，通常會放在類別上方當作 Base URL。
- **HTTP Method 對應**：
  - `@GetMapping`：對應 HTTP GET (查詢資料)
  - `@PostMapping`：對應 HTTP POST (新增資料)
  - `@PutMapping`：對應 HTTP PUT (修改資料)
  - `@DeleteMapping`：對應 HTTP DELETE (刪除資料)

### 參數接收方式 (Parameter Binding)
1. `@RequestParam`：接收 URL Query String。
2. `@PathVariable`：接收 URL 路徑變數。
3. `@RequestBody`：接收 HTTP 請求的 Body，並自動反序列化 (**Deserialize**) 成 Java 物件。

---

## 3. 請求驗證 (Validation)

在 Controller 層直接驗證前端傳來的資料是否合法，是防呆與保護資料庫的第一道防線。

### 實戰寫法
1. 確保 `pom.xml` 有引入 `spring-boot-starter-validation`。
2. 在 DTO 的欄位上加上驗證註解，例如 `@NotNull`, `@NotBlank`, `@Email`, `@Min`, `@Max`。
3. 在 Controller 接收參數時加上 `@Valid`。

```java
// DTO 定義
public class UserRequest {
    @NotBlank(message = "名稱不能為空")
    private String name;
    
    @Min(value = 18, message = "未滿18歲")
    private Integer age;
}

// Controller 接收
@PostMapping("/users")
public ResponseEntity<String> createUser(@RequestBody @Valid UserRequest request) {
    return ResponseEntity.ok("新增成功");
}
```

---

## 4. Spring Data JPA 基礎

相比於手寫 SQL (Spring JDBC)，目前業界最常使用 **Spring Data JPA** 來大幅減少 CRUD 的程式碼。

### Repository 介面
只要繼承 `CrudRepository`或`JpaRepository`，完全不用寫實作類別，Spring 在啟動時會透過動態代理自動幫你生出常用的 CRUD 方法。

```java
public interface UserRepository extends JpaRepository<User, Integer> {
    
    // 方法名稱查詢 (Method Name Query Generation)
    List<User> findByNameAndAgeGreaterThan(String name, Integer age);
    
    // 自定義 HQL
    @Query("SELECT u FROM User u WHERE u.status = ?1")
    List<User> findActiveUsers(String status);
}
```

> 💡 Tip: 若查詢邏輯過於複雜（包含大量 JOIN 或動態條件），建議退回使用 Criteria API、QueryDSL 或是直接寫 MyBatis/MyBatis-Plus，不要硬寫一長串的方法名稱，以免後續難以維護。

---
