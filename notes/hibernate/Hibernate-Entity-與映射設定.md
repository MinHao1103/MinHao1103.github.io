# Hibernate Entity 規範與映射設定

在 ORM 框架中，Java 物件與資料庫 Table 的綁定是所有操作的基礎。這篇筆記說明 Hibernate 對 Entity 類別的規範要求，以及現代 JPA Annotation 的完整映射方式。

---

## 1. Entity 類別的四大規範（POJO）

Hibernate 底層依賴**反射（Reflection）**與**代理（Proxy）**機制來管理 Entity，因此必須遵守以下規範：

| 規範 | 原因 |
|------|------|
| **必須有無參數建構子** | Hibernate 底層透過無參數建構子來實例化物件 |
| **屬性必須私有化** | 遵守封裝原則，搭配 `public` 的 Getter/Setter |
| **必須有一個主鍵（OID）** | 用來唯一識別資料庫中的紀錄，對應 `@Id` |
| **類別不可宣告為 `final`** | `final` 類別無法被繼承，Hibernate 無法產生 Proxy，延遲載入（Lazy Loading）會失效 |

> 💡 **現況**：搭配 **Lombok** 可自動生成上述樣板程式碼：
> ```java
> @Entity
> @Table(name = "users")
> @Data
> @NoArgsConstructor
> public class User {
>     @Id
>     @GeneratedValue(strategy = GenerationType.IDENTITY)
>     private Long id;
>     private String name;
> }
> ```

---

## 2. 核心 JPA 映射 Annotation

現代 Spring Boot + Hibernate 專案已全面改用 **JPA Annotation** 進行映射，不再使用早期繁瑣的 XML（`.hbm.xml`）方式。

### 類別層級

- **`@Entity`**（必填）：宣告這是一個需要被 Hibernate 管理的實體類別
- **`@Table(name = "table_name")`**：指定對應的資料庫 Table 名稱
  > 💡 若 Java 類別名稱與 Table 名稱完全相同（不區分大小寫），此註解可省略

### 屬性層級

- **`@Id`**（必填）：宣告此屬性為 Primary Key
- **`@GeneratedValue(strategy = GenerationType.IDENTITY)`**：設定主鍵自動生成策略，`IDENTITY` 依賴資料庫的 Auto-Increment
- **`@Column(name = "col_name")`**：明確指定映射的欄位名稱
  > 💡 若屬性名稱為 `userName`，Hibernate 預設會自動映射到 `user_name` 欄位（駝峰轉底線），名稱一致時可省略
- **`@Transient`**：標記不需映射到資料庫的屬性（例如由其他欄位計算而來的暫時值）

---

## 3. 實戰範例

```java
import jakarta.persistence.*;

@Entity
@Table(name = "employee")
public class Emp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_no") // DB 欄位名與 Java 變數名不同時，需明確指定
    private Integer empNo;

    // 依賴自動映射機制（駝峰轉底線），名稱一致可省略 @Column
    private String ename;

    private String job;

    private Double salary;

    @Transient // 此屬性只在記憶體中存在，不會寫入資料庫
    private String temporaryNote;

    // Getter & Setter（或使用 Lombok 的 @Data）
}
```

---

## 4. 非 Spring Boot 環境的手動實體註冊

若未使用 Spring Boot 的自動掃描，必須在 `hibernate.cfg.xml` 中手動列出所有 Entity 類別：

```xml
<hibernate-configuration>
    <session-factory>
        <mapping class="com.example.entity.Emp" />
        <mapping class="com.example.entity.Department" />
    </session-factory>
</hibernate-configuration>
```

> 💡 **現況**：Spring Boot 使用 `@EntityScan(basePackages = "com.example.entity")` 即可完全取代以上 XML 設定。

---
