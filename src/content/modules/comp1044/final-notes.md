---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: ER MODELLING, RELATIONAL MODEL & SQL

### Entity-Relationship Modelling

| Concept | Symbol | Description |
|---------|--------|-------------|
| Strong Entity | Rectangle | Has own PK, exists independently |
| Weak Entity | Double rectangle | Depends on owner for identification |
| Attribute | Oval | Simple property |
| Key Attribute | Underlined oval | Unique identifier |
| Multivalued | Double oval | Can have multiple values |
| Derived | Dashed oval | Computed from other attributes |
| Composite | Oval with sub-ovals | Has sub-parts (e.g., Address) |
| Relationship | Diamond | Connection between entities |

**Cardinality:** 1:1 (one-to-one), 1:M (one-to-many), M:N (many-to-many)

**Participation:** Total (mandatory, double line) vs Partial (optional, single line)

---

### ER-to-Relational Mapping Rules

| ER Construct | Mapping |
|--------------|---------|
| Strong entity | Table with all simple attributes; PK becomes table PK |
| Weak entity | Table with partial key + owner PK as FK (composite PK) |
| 1:1 relationship | FK in either table (prefer total participation side) |
| 1:M relationship | FK in the "many" side table |
| M:N relationship | Junction table with both PKs as composite PK |
| Multivalued attribute | Separate table with FK back to entity |
| Composite attribute | Flatten into simple attributes |
| Derived attribute | Not stored (computed at query time) |

---

### Relational Model

**Properties:** Unique table/column names, all values atomic, no duplicate rows, row/column order irrelevant

| Key Type | Definition |
|----------|-----------|
| Super Key | Any set uniquely identifying tuples |
| Candidate Key | Minimal super key |
| Primary Key (PK) | Chosen candidate key (NOT NULL) |
| Foreign Key (FK) | References another table's PK |
| Composite Key | Multi-attribute key |

**Entity Integrity:** PK cannot be NULL. **Referential Integrity:** FK must match existing PK or be NULL.

---

### Relational Algebra

| Operation | Symbol | SQL Equivalent |
|-----------|--------|---------------|
| Selection | $\sigma_{cond}(R)$ | WHERE |
| Projection | $\pi_{cols}(R)$ | SELECT cols |
| Cartesian Product | $R \times S$ | CROSS JOIN |
| Natural Join | $R \bowtie S$ | NATURAL JOIN |
| Theta Join | $R \bowtie_\theta S$ | JOIN ON |
| Union | $R \cup S$ | UNION |
| Intersection | $R \cap S$ | INTERSECT |
| Difference | $R - S$ | EXCEPT |
| Division | $R \div S$ | NOT EXISTS pattern |

Set operations require **union-compatibility** (same degree, compatible domains).

**Example:** Names of students in COMP1044: $\pi_{\text{Name}}(\text{Student} \bowtie (\sigma_{\text{ModuleCode='COMP1044'}}(\text{Enrolment})))$

---

### SQL — DDL & DML

**DDL:** `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`

```sql
CREATE TABLE Student (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    GPA DECIMAL(3,2) DEFAULT 0.00 CHECK (GPA >= 0),
    DeptID INT REFERENCES Department(DeptID)
);
```

**Constraints:** PRIMARY KEY, FOREIGN KEY REFERENCES, NOT NULL, UNIQUE, CHECK, DEFAULT

**DML:** INSERT, UPDATE, DELETE, SELECT

```sql
INSERT INTO Student (StudentID, Name) VALUES (1, 'Alice');
UPDATE Student SET GPA = 3.9 WHERE StudentID = 1;
DELETE FROM Student WHERE StudentID = 1;
```

**WARNING:** UPDATE/DELETE without WHERE affects ALL rows.

---

### SQL — SELECT & Filtering

```sql
SELECT columns FROM table
WHERE condition
ORDER BY col ASC|DESC
LIMIT n;
```

| Operator | Usage |
|----------|-------|
| `=`, `<>`, `<`, `>`, `<=`, `>=` | Comparison |
| `AND`, `OR`, `NOT` | Logical |
| `BETWEEN a AND b` | Range (inclusive) |
| `IN (list)` | Set membership |
| `LIKE 'pattern'` | Pattern match (`%` = any chars, `_` = one char) |
| `IS NULL` / `IS NOT NULL` | NULL test (never use `= NULL`) |

**NULL:** Unknown value. Any comparison with NULL yields UNKNOWN. Use `IS NULL`.

---

### SQL — Joins

| Join Type | Returns |
|-----------|---------|
| INNER JOIN | Only matching rows |
| LEFT JOIN | All left + matching right (NULL if no match) |
| RIGHT JOIN | All right + matching left |
| FULL OUTER JOIN | All from both sides |
| CROSS JOIN | Cartesian product |

```sql
SELECT s.Name, m.Title, e.Grade
FROM Student s
INNER JOIN Enrolment e ON s.StudentID = e.StudentID
INNER JOIN Module m ON e.ModuleCode = m.ModuleCode;
```

**Self join:** `FROM Employee e LEFT JOIN Employee m ON e.ManagerID = m.EmpID`

---

### SQL — Aggregates & GROUP BY

| Function | Purpose |
|----------|---------|
| COUNT(*) | Count all rows |
| COUNT(col) | Count non-NULL values |
| SUM, AVG, MIN, MAX | Numeric aggregates |

**GROUP BY:** Groups rows; every non-aggregated SELECT column must be in GROUP BY.

**HAVING:** Filters groups (after aggregation). WHERE filters rows (before grouping).

**Execution order:** FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT

```sql
SELECT DeptID, AVG(GPA) AS AvgGPA
FROM Student
WHERE GPA > 2.0
GROUP BY DeptID
HAVING AVG(GPA) > 3.5
ORDER BY AvgGPA DESC;
```

---

### SQL — Subqueries & Set Operations

```sql
-- Scalar subquery
WHERE GPA > (SELECT AVG(GPA) FROM Student)

-- IN subquery
WHERE StudentID IN (SELECT StudentID FROM Enrolment WHERE ...)

-- EXISTS (correlated)
WHERE EXISTS (SELECT 1 FROM Enrolment e WHERE e.StudentID = s.StudentID)

-- "For all" pattern: NOT EXISTS with negated condition
WHERE NOT EXISTS (SELECT 1 FROM ... WHERE ... AND grade < 60)
```

**Set ops:** UNION (removes duplicates), UNION ALL (keeps), INTERSECT, EXCEPT

---

## SIDE 2: NORMALISATION, TRANSACTIONS & WEB

### Functional Dependencies (FDs)

$X \to Y$: If two tuples agree on $X$, they must agree on $Y$. "X determines Y."

| FD Type | Definition | NF Violation |
|---------|-----------|--------------|
| Full | Y depends on entire composite key | OK |
| Partial | Y depends on part of composite key | Violates 2NF |
| Transitive | $X \to Y \to Z$ (indirect via non-key) | Violates 3NF |

**Armstrong's Axioms:** Reflexivity ($Y \subseteq X \Rightarrow X \to Y$), Augmentation ($X \to Y \Rightarrow XZ \to YZ$), Transitivity ($X \to Y, Y \to Z \Rightarrow X \to Z$)

---

### Normal Forms

| NF | Rule | Eliminates |
|----|------|-----------|
| **1NF** | All values atomic, no repeating groups | Multi-valued cells |
| **2NF** | 1NF + no partial dependencies | Partial deps on composite key |
| **3NF** | 2NF + no transitive dependencies | Non-key → non-key chains |
| **BCNF** | Every determinant is a superkey | All remaining anomalies |

**Key check for 3NF:** For every $X \to Y$: (1) X is superkey, OR (2) Y is prime attribute (part of candidate key)

**BCNF is stricter:** For every $X \to Y$: X MUST be superkey (no exceptions)

**2NF only matters for composite PKs.** Single-column PK tables are automatically 2NF.

---

### Normalisation Process

1. List all FDs
2. Find candidate key(s) via attribute closure
3. Check 1NF → 2NF → 3NF → BCNF
4. Decompose at each violation

**Decomposition must be:**
- **Lossless join:** Common attribute is key in at least one resulting table
- **Dependency preserving:** All FDs checkable within individual tables

---

### Worked Example

**R(OrderID, Date, CustID, CustName, ProdID, ProdName, Qty)**

FDs: OrderID→Date,CustID | CustID→CustName | ProdID→ProdName | {OrderID,ProdID}→Qty

Key: {OrderID, ProdID}

2NF violations: OrderID→Date,CustID (partial), ProdID→ProdName (partial)

3NF violation: OrderID→CustID→CustName (transitive)

Final BCNF decomposition:
- Order(OrderID, Date, CustID)
- Customer(CustID, CustName)
- Product(ProdID, ProdName)
- OrderItem(OrderID, ProdID, Qty)

---

### Anomalies (Why Normalise)

| Anomaly | Problem |
|---------|---------|
| Insertion | Cannot add data without unrelated data |
| Deletion | Deleting a record loses unrelated facts |
| Update | Same fact in many rows must all be changed |

---

### Transactions & ACID

**Transaction:** Logical unit of work; all-or-nothing. `BEGIN` → operations → `COMMIT` or `ROLLBACK`.

| Property | Meaning | Enforced by |
|----------|---------|-------------|
| **A**tomicity | All or nothing | Undo log / recovery system |
| **C**onsistency | Valid state → valid state | Constraints |
| **I**solation | No interference between concurrent txns | Locks / isolation levels |
| **D**urability | Committed = permanent | Write-ahead log (WAL) |

**Transaction states:** Active → Partially committed → Committed (or Aborted → Failed → Rolled back)

---

### Web Interfaces & CRUD

| CRUD | SQL | HTTP Method | Form Purpose |
|------|-----|-------------|--------------|
| Create | INSERT | POST | Add new record |
| Read | SELECT | GET | Display data |
| Update | UPDATE | POST/PUT | Edit existing record |
| Delete | DELETE | POST/DELETE | Remove record |

**GET vs POST:** GET = data in URL (search/read, bookmarkable). POST = data in body (create/modify, more secure).

**HTML Form essentials:** `action` (URL), `method` (GET/POST), `name` attribute on inputs (server-side key)

**Input types:** text, email, password, number, date, select, radio, checkbox, hidden, textarea

---

### SQL Injection & Security

**Attack:** Input like `' OR 1=1 --` manipulates query logic.

**Prevention:** Prepared statements / parameterised queries (ALWAYS use these), input validation, least-privilege DB accounts.

```sql
-- VULNERABLE:
query = "SELECT * FROM User WHERE name='" + input + "'"

-- SAFE (parameterised):
query = "SELECT * FROM User WHERE name = ?"
```

---

### Key Exam Traps

| Trap | Fix |
|------|-----|
| `WHERE col = NULL` | Use `IS NULL` (comparison with NULL = UNKNOWN) |
| UPDATE/DELETE without WHERE | Affects ALL rows |
| Non-grouped column in SELECT with GROUP BY | Every non-aggregate must be in GROUP BY |
| Aggregate in WHERE clause | Use HAVING (aggregates not available in WHERE) |
| NOT IN with NULLs in subquery | Use NOT EXISTS instead |
| 2NF check on single-column PK | Single-column PK is automatically 2NF |
| BCNF = 3NF | BCNF is stricter (no prime attribute exception) |
| FK can point to any column | FK must reference a PRIMARY KEY (or UNIQUE) |
| UNION without compatible types | Requires same degree and compatible domains |
| LEFT JOIN then WHERE on right table | Converts to INNER JOIN; use condition in ON clause |
