# Spring Boot 核心機制剖析與實戰踩坑

目前在開發企業級應用時，Spring Boot 幾乎是唯一首選。原因是它利用了「約定優於配置 (Convention Over Configuration)」的特性，大幅降低了起手難度。

但在資深工程師的日常中，如果只會寫 Controller 跟 Service 是不夠的。這裡整理了 Spring 底層最核心的 **IoC**、**AOP**機制、**Bean 的生命週期**，以及在交易管理與測試上常遇到的踩坑紀錄。

---

## 1. IoC 控制反轉與 DI 依賴注入

### 為什麼需要 IoC？
傳統開發中，當 Class A 需要使用 Class B 的功能時，會在 A 裡面直接 `new B()`。這導致了高度的耦合，當 B 的建構邏輯改變時，所有依賴 B 的地方都要跟著改。
**IoC** (Inversion of Control) 的精神是將「創建與管理物件的權力」，交還給 Spring 的 IoC 容器 (ApplicationContext)。

### DI 注入方式與最佳實踐
目前實務上最推薦的是 **建構子注入** (Constructor Injection)，而非 `@Autowired` 欄位注入。

```java
@Service
public class OrderService {
    
    private final PaymentService paymentService;
    
    // Spring 4.3 之後，單一建構子可省略 @Autowired 標籤
    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```
**原因是：** 
1. 強制確保依賴不為 null（確保物件在實例化時，依賴已經準備好）。
2. 讓變數可以宣告為 `final`，確保執行期間不可變。
3. 方便單元測試時，可以直接透過建構子傳入 Mock 物件，不須依賴 Spring 容器啟動。

---

## 2. Bean 的生命週期管理

Spring 容器在啟動時，會掃描所有標註 `@Component`（包含 `@Service`, `@Controller`）的類別，並將其實例化為 Bean。

### 生命週期階段
1. **實例化** (Instantiation)：調用建構子產生 Bean。
2. **屬性賦值** (Populate Properties)：將 DI 依賴注入。
3. **初始化前** (Pre-Initialization)：執行 `BeanPostProcessor` 的 `postProcessBeforeInitialization`。
4. **自定義初始化**：執行帶有 `@PostConstruct` 的方法。
5. **初始化後** (Post-Initialization)：在這裡通常會進行**AOP 的動態代理** (Proxy) 生成。
6. **銷毀**：容器關閉時執行 `@PreDestroy` 方法。

> 💡 Tip: 若要讓一段程式在 Spring 啟動完成後「立刻執行一次」，除了 `@PostConstruct` 外，實作 `CommandLineRunner` 介面也是很常見的做法。

---

## 3. AOP 切面導向程式設計實戰

**AOP** 的核心價值是「將與主業務無關，但卻散落在各處的邏輯（如 Log、權限驗證、Transaction）抽離出來」。

### AOP 實戰：自定義權限攔截註解
在 API 上加個 `@RequireAdmin` 就能自動驗證權限。

```java
// 1. 定義自訂註解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequireAdmin { }

// 2. 定義切面 (Aspect)
@Aspect
@Component
public class SecurityAspect {

    // 切入點：攔截所有標註 @RequireAdmin 的方法
    @Around("@annotation(com.example.annotation.RequireAdmin)")
    public Object checkAdmin(ProceedingJoinPoint joinPoint) throws Throwable {
        // 在這裡撰寫驗證邏輯
        if (!SecurityContext.isAdmin()) {
            throw new AccessDeniedException("權限不足");
        }
        
        // 驗證通過，放行執行原方法
        return joinPoint.proceed(); 
    }
}
```

---

## 4. @Transactional 交易管理的踩坑紀錄

**`@Transactional`** 底層就是透過 AOP 生成代理物件來控制 `commit` 和 `rollback`。

### 常見失效場景
1. **同類別內的內部呼叫** (Self-Invocation)：
   若 Class A 有 `method1()` 沒有加 `@Transactional`，而內部呼叫了有加的 `method2()`，交易會**失效**。原因是內部呼叫不會經過 Spring 生成的 Proxy 物件。
   *解法*：把 `method2()` 抽到另一個 Service 裡，或透過 `AopContext.currentProxy()` 呼叫自己。
2. **非 RuntimeException 不會回滾**：
   預設情況下，只有發生 `RuntimeException` (Unchecked Exception) 時才會 rollback。如果拋出 `IOException` 等 **Checked Exception**，交易照樣會 commit。
   *解法*：使用 `@Transactional(rollbackFor = Exception.class)`。

---

## 5. 單元測試與 Mock 策略

身為資深工程師，寫出可測試的代碼與寫出能跑的代碼一樣重要。

### JUnit 5 + Mockito 實戰
在 Service 層的測試中，不應該啟動整個 Spring 容器，也「絕對不要」連線真實資料庫，而是使用 **Mockito** 將 Repository 模擬出來。

```java
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks // 自動將上述的 Mock 物件注入到 orderService 中
    private OrderService orderService;

    @Test
    void testCreateOrder() {
        // Arrange: 定義 Mock 行為
        Order mockOrder = new Order(1L, "Test Order");
        when(orderRepository.save(any(Order.class))).thenReturn(mockOrder);

        // Act: 執行業務邏輯
        Order result = orderService.createOrder("Test Order");

        // Assert: 驗證結果與互動次數
        assertEquals(1L, result.getId());
        verify(orderRepository, times(1)).save(any(Order.class));
    }
}
```
注意：如果是要測 API 端點的行為，則會使用 **`@WebMvcTest`**搭配**`MockMvc`** 來進行表現層的隔離測試。

---
