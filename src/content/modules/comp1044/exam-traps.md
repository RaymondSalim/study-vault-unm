---
title: "Exam Traps"
order: 91
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "sql", "normalisation", "exam-tips"]
---

# Exam Traps & Common Mistakes

## SQL Traps

### 1. Forgetting WHERE in UPDATE/DELETE

```sql
-- WRONG: Updates ALL rows!
UPDATE Student SET GPA = 4.0;

-- CORRECT: Update only one student
UPDATE Student SET GPA = 4.0 WHERE StudentID = 12345;
```

**Exam trap:** Questions that ask "what does this query do?" when WHERE is missing.

---

### 2. NULL Comparisons

```sql
-- WRONG: This finds NOTHING (NULL = NULL is UNKNOWN, not TRUE)
SELECT * FROM Student WHERE Email = NULL;

-- CORRECT:
SELECT * FROM Student WHERE Email IS NULL;
```

**Remember:** `NULL = NULL` is **not** TRUE. NULL is not a value, it's the absence of a value.

---

### 3. COUNT(*) vs COUNT(column)

| Expression | Counts |
|-----------|--------|
| `COUNT(*)` | All rows including those with NULLs |
| `COUNT(Email)` | Only rows where Email is NOT NULL |
| `COUNT(DISTINCT DeptID)` | Distinct non-NULL DeptID values |

```sql
-- Table has 100 rows, 10 have NULL email
SELECT COUNT(*)     FROM Student;  -- Returns 100
SELECT COUNT(Email) FROM Student;  -- Returns 90
```

---

### 4. GROUP BY Missing Columns

```sql
-- WRONG: Name is not in GROUP BY or an aggregate
SELECT DeptID, Name, AVG(GPA)
FROM Student
GROUP BY DeptID;

-- CORRECT options:
SELECT DeptID, AVG(GPA) FROM Student GROUP BY DeptID;
-- or
SELECT DeptID, Name, AVG(GPA) FROM Student GROUP BY DeptID, Name;
```

**Rule:** Every column in SELECT must either be in GROUP BY or inside an aggregate function.

---

### 5. HAVING vs WHERE Confusion

```sql
-- WRONG: Cannot use aggregate in WHERE
SELECT DeptID, AVG(GPA)
FROM Student
WHERE AVG(GPA) > 3.0
GROUP BY DeptID;

-- CORRECT: Use HAVING for aggregate conditions
SELECT DeptID, AVG(GPA)
FROM Student
GROUP BY DeptID
HAVING AVG(GPA) > 3.0;
```

**Memory aid:** WHERE filters **rows** (before grouping), HAVING filters **groups** (after grouping).

---

### 6. NOT IN with NULLs

```sql
-- If any StudentID in Enrolment is NULL, this returns NOTHING!
SELECT * FROM Student
WHERE StudentID NOT IN (SELECT StudentID FROM Enrolment);

-- SAFE alternatives:
SELECT * FROM Student s
WHERE NOT EXISTS (SELECT 1 FROM Enrolment e WHERE e.StudentID = s.StudentID);

-- Or exclude NULLs explicitly:
SELECT * FROM Student
WHERE StudentID NOT IN (SELECT StudentID FROM Enrolment WHERE StudentID IS NOT NULL);
```

**Why:** `NOT IN` with a NULL in the list means every comparison is UNKNOWN, so no rows pass.

---

### 7. UNION vs UNION ALL

```sql
-- UNION removes duplicates (like DISTINCT)
SELECT City FROM Customers UNION SELECT City FROM Suppliers;

-- UNION ALL keeps duplicates (faster)
SELECT City FROM Customers UNION ALL SELECT City FROM Suppliers;
```

**Trap:** Using UNION when you expect duplicates to appear in results.

---

### 8. Join Producing More Rows Than Expected

If join keys are not unique, you get a **many-to-many** multiplication:

```sql
-- If Student has 3 enrolments and Enrolment has 3 modules
-- CROSS JOIN gives 9 rows, not 3!
SELECT * FROM Student, Enrolment;  -- implicit cross join!

-- Always use explicit JOIN with ON clause
SELECT * FROM Student s JOIN Enrolment e ON s.StudentID = e.StudentID;
```

---

### 9. Implicit vs Explicit Joins

```sql
-- Old-style (implicit) — easy to accidentally cross join
SELECT * FROM Student, Department WHERE Student.DeptID = Department.DeptID;

-- Modern (explicit) — clearer and safer
SELECT * FROM Student INNER JOIN Department ON Student.DeptID = Department.DeptID;
```

**Trap:** Forgetting the WHERE clause in old-style join = accidental cross join.

---

### 10. BETWEEN is Inclusive

```sql
-- This includes 18 AND 25
SELECT * FROM Student WHERE Age BETWEEN 18 AND 25;
-- Equivalent to: WHERE Age >= 18 AND Age <= 25
```

---

## Normalisation Traps

### 1. Confusing Partial and Transitive Dependencies

| Type | Condition | Normal Form Violation |
|------|-----------|----------------------|
| Partial | Non-key attribute depends on PART of composite key | Violates 2NF |
| Transitive | Non-key attribute depends on another non-key attribute | Violates 3NF |

**Key question:** Is the primary key composite?
- If YES: check for partial dependencies (2NF)
- If NO: table is automatically in 2NF (skip to 3NF check)

---

### 2. Forgetting That 2NF Only Applies to Composite Keys

A table with a single-column primary key **cannot** have partial dependencies. It is automatically in 2NF.

```
Student(StudentID, Name, DeptID, DeptName)
-- PK is just StudentID (single column)
-- Cannot have partial dependency → already 2NF
-- But has transitive dependency: StudentID → DeptID → DeptName → violates 3NF
```

---

### 3. Missing Functional Dependencies

Common mistake: only looking at obvious FDs and missing implied ones.

**Always check:**
- Direct FDs from the problem statement
- Transitive FDs (if A → B and B → C, then A → C)
- Is the candidate key correct? Compute the closure!

---

### 4. Wrong Candidate Key Identification

**Method:** For each combination of attributes, compute its closure. If the closure includes ALL attributes, it's a superkey. Find the minimal one(s).

```
R(A, B, C, D) with FDs: A → B, B → C, A → D

A+ = {A, B, C, D} → A is a candidate key
B+ = {B, C} → B is NOT a key (missing A, D)
```

**Trap:** Assuming the first attribute listed is always the key.

---

### 5. Lossless Join Confusion

After decomposing R into R1 and R2, the decomposition is lossless if:

- R1 ∩ R2 → R1 (the common attributes determine all of R1), OR
- R1 ∩ R2 → R2 (the common attributes determine all of R2)

**At least one** of these must hold.

---

### 6. BCNF vs 3NF

**3NF allows:** X → Y where Y is a prime attribute (part of a candidate key), even if X is not a superkey.

**BCNF does not allow this.** Every determinant must be a superkey, no exceptions.

```
R(Student, Module, Tutor) with:
- {Student, Module} → Tutor  (key)
- Tutor → Module             (violates BCNF but NOT 3NF, because Module is prime)
```

---

## ER Diagram Traps

### 1. M:N Relationships Need a Junction Table

A many-to-many relationship **cannot** be represented by a foreign key in either table. You MUST create a junction/link table.

---

### 2. Weak Entity Identification

A weak entity's primary key is ALWAYS composite: partial key + owner's primary key.

```sql
-- Room is weak entity owned by Building
CREATE TABLE Room (
    BuildingID INT,
    RoomNumber INT,
    Capacity INT,
    PRIMARY KEY (BuildingID, RoomNumber),
    FOREIGN KEY (BuildingID) REFERENCES Building(BuildingID)
);
```

---

### 3. Relationship Attributes

Attributes that belong to the **relationship** (not to either entity) must go in the junction table.

Example: "Grade" belongs to the Enrolment relationship, not to Student or Module.

---

## Transaction Traps

### 1. Dirty Read Definition

A dirty read occurs when you read data that has been modified but **not yet committed** by another transaction. If that transaction rolls back, you've read data that never officially existed.

---

### 2. Serializable Does Not Mean Serial

SERIALIZABLE isolation level guarantees the **result** is equivalent to some serial execution, but transactions may still physically overlap (using locks or MVCC). It does NOT mean they run one at a time.

---

### 3. Two-Phase Locking and Deadlocks

2PL guarantees serializability but does NOT prevent deadlocks. You still need deadlock detection/prevention alongside 2PL.

---

## Top 10 Exam Mistakes Summary

| # | Mistake | Fix |
|---|---------|-----|
| 1 | `WHERE col = NULL` | Use `IS NULL` |
| 2 | Aggregate in WHERE | Use HAVING |
| 3 | Missing GROUP BY column | Add to GROUP BY or wrap in aggregate |
| 4 | NOT IN with possible NULLs | Use NOT EXISTS |
| 5 | Forgetting WHERE in UPDATE/DELETE | Always double-check |
| 6 | Single-column PK → partial dependency claim | Impossible; skip to 3NF |
| 7 | Confusing 3NF and BCNF | BCNF: every determinant is superkey, no exceptions |
| 8 | Wrong candidate key | Compute closure of attribute sets |
| 9 | M:N without junction table | Always decompose M:N |
| 10 | Dirty read vs non-repeatable read | Dirty = uncommitted data; non-repeatable = committed change between reads |
