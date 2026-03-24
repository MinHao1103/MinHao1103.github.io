# Hibernate 實體映射設定 (Entity Mapping)

在 ORM (Object-Relational Mapping) 框架中，將 Java 物件與關聯式資料庫的 Table 綁定是所有操作的基礎。

目前在現代 Spring Boot 與 Hibernate 專案中，我們已經完全放棄了早期繁瑣的 XML (`.hbm.xml`) 映射方式，全面改用 JPA Annotation 進行實體設定。這篇筆記主要記錄 JPA 常用註解與實戰踩坑經驗。

---

## 1. 核心 JPA 註解 (Annotation)

在 Java 端被映射的類別，我們通常稱為 Entity (實體類別)。預計要在類別或屬性上加上以下註解：

- `@Entity`：(必填) 宣告這是一個需要被 Hibernate 管理的實體類別。
- `@Table`：設定對應的資料庫 Table 名稱。例如 `@Table(name = "members")`。
  - Tip: 若 Java 類別名稱與 Table 名稱完全相同（不區分大小寫），此註解可省略。

### 屬性與主鍵設定
- `@Id`：(必填) 宣告此屬性為 Table 的 Primary Key (主鍵/識別值)。
- `@GeneratedValue`：設定主鍵的自動生成策略。最常用的是 `GenerationType.IDENTITY`（依賴資料庫的 Auto-Increment 功能）。
- `@Column`：設定映射的欄位名稱。
  - Tip: 基於自動映射機制，若屬性名稱為 `userName`，Hibernate 預設會自動映射到資料庫的 `user_name` 欄位（駝峰轉底線）。如果名稱一致，此註解可省略。
- `@Transient`：設定不被映射的屬性。如果某個變數只是為了在程式中做暫時計算（例如 `age` 是由 `birthday` 算出來的），不希望它在資料庫產生對應欄位，就必須加上這個註解。

---

## 2. 實戰範例程式碼

以下是一個標準且乾淨的 Entity 類別寫法：

```java
import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "employee") // 對應資料庫的 employee 表
public class Emp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_no") // DB 欄位名若與 Java 變數名不同，需明確指定
    private Integer empNo;

    // 依賴自動映射機制，可省略 @Column
    private String ename;

    private String job;

    private Double salary;

    @Transient // 此屬性只在記憶體中存在，不會寫入資料庫
    private String temporaryNote;

    // ... Getter & Setter (或使用 Lombok 的 @Data) ...
}
```

---

## 3. 註冊實體類別 (非 Spring Boot 環境)

原因是如果你沒有使用 Spring Boot 自動掃描 `@Entity` 的功能，你必須手動在 `hibernate.cfg.xml` 中註冊這些類別，Hibernate 才會認識它們。

```xml
<hibernate-configuration>
    <session-factory>
        <!-- 其他連線設定略 -->
        
        <!-- 必須使用 class 屬性來註冊 Annotation 實體 -->
        <mapping class="com.example.entity.Emp" />
        <mapping class="com.example.entity.Department" />
    </session-factory>
</hibernate-configuration>
```

> 💡 Tip: 目前的微服務專案中，再麻煩直接使用 Spring Boot 的 `@EntityScan(basePackages = "com.example.entity")`，就可以完全取代上述 XML 的繁瑣註冊步驟。