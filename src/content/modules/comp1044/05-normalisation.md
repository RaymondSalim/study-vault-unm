---
title: "Normalisation"
order: 5
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "normalisation", "functional-dependencies", "normal-forms"]
---

# Normalisation

## Purpose

:::eli10

Normalisation is like organizing your room so you do not have the same thing in two places. If you change your phone number, you should only have to update it once, not in ten different spots. Normalisation splits up messy tables so that each fact is stored in exactly one place.

:::

:::eli15

Normalisation is the process of restructuring tables to eliminate data redundancy and prevent anomalies. Without it, you get problems: insertion anomalies (cannot add data without unrelated data), deletion anomalies (deleting one record accidentally removes other facts), and update anomalies (changing one fact requires changing multiple rows). Normalisation systematically decomposes tables so each fact is stored exactly once.

:::

:::eli20

Normalisation is the process of organising relations to:
- Eliminate **redundancy** (duplicate data)
- Prevent **update anomalies** (insertion, deletion, modification)
- Ensure **data integrity**

:::

## Anomalies in Unnormalised Data

:::eli10

When data is not organized well, bad things happen: you might not be able to add new information without inventing fake data, deleting one thing might accidentally erase other important facts, and changing one detail means you have to find and change it everywhere it appears.

:::

:::eli15

Anomalies are problems that arise from poorly structured tables. Insertion anomalies prevent adding new data without unrelated data (e.g., cannot add a new module until someone enrols). Deletion anomalies cause unintended data loss (deleting the last student in a module loses the module info). Update anomalies require changing the same fact in multiple places (changing a module title in every enrolment row). Normalisation eliminates all three.

:::

:::eli20

| Anomaly | Problem | Example |
|---------|---------|---------|
| Insertion | Cannot insert data without unrelated data | Can't add a new module until a student enrols |
| Deletion | Deleting data causes unintended loss | Deleting last student in a module loses module info |
| Update/Modification | Changing one fact requires multiple updates | Changing a module title must update every row |

:::

## Functional Dependencies (FDs)

:::eli10

A functional dependency means "if you know X, you can figure out Y." For example, if you know a student's ID, you can find their name. We write this as StudentID -> Name. This idea helps us figure out how to split tables properly.

:::

:::eli15

A functional dependency X -> Y means that the value of X uniquely determines the value of Y. Knowing X, there is exactly one possible value for Y. FDs come in three types: full (Y depends on ALL of a composite key), partial (Y depends on only PART of a composite key -- violates 2NF), and transitive (X -> Y -> Z, an indirect dependency -- violates 3NF). Armstrong's Axioms (reflexivity, augmentation, transitivity) let you derive all implied FDs.

:::

:::eli20

A functional dependency X → Y means: if two tuples have the same value for X, they must have the same value for Y.

"X **determines** Y" or "Y is **functionally dependent** on X."

**Example:** StudentID → Name, Email (knowing the StudentID determines the Name and Email)

### Types of FDs

| Type | Definition | Example |
|------|-----------|---------|
| Full FD | Y depends on the whole of X, not a subset | {StudentID, ModuleCode} → Grade |
| Partial FD | Y depends on only part of a composite key | {StudentID, ModuleCode} → StudentName (only needs StudentID) |
| Transitive FD | X → Y → Z (indirect dependency) | StudentID → DeptID → DeptName |

### Armstrong's Axioms

| Axiom | Rule |
|-------|------|
| Reflexivity | If Y ⊆ X, then X → Y |
| Augmentation | If X → Y, then XZ → YZ |
| Transitivity | If X → Y and Y → Z, then X → Z |

Derived rules: Union, Decomposition, Pseudo-transitivity.

:::

## Normal Forms

:::eli10

Normal forms are levels of organization. 1NF means no lists in cells. 2NF means every non-key column depends on the WHOLE key (not just part of it). 3NF means no chain dependencies (where A determines B which determines C). Each level removes more problems. BCNF is the strictest -- every determinant must be a key.

:::

:::eli15

Normal forms are progressive levels of table quality. 1NF: all values are atomic (no arrays). 2NF: no partial dependencies (non-key attributes must depend on the entire composite primary key, not just part of it). 3NF: no transitive dependencies (non-key attributes must not depend on other non-key attributes). BCNF: every functional dependency's left side must be a superkey. Each level builds on the previous, and achieving a higher normal form requires decomposing the table.

:::

:::eli20

### Summary Table

| Normal Form | Requirement | Eliminates |
|-------------|-------------|------------|
| **1NF** | Atomic values, no repeating groups | Repeating groups |
| **2NF** | 1NF + no partial dependencies | Partial dependencies |
| **3NF** | 2NF + no transitive dependencies | Transitive dependencies |
| **BCNF** | Every determinant is a candidate key | All remaining anomalies |

Each normal form builds on the previous: BCNF ⊃ 3NF ⊃ 2NF ⊃ 1NF.

---

### First Normal Form (1NF)

**Rule:** All attributes must contain only **atomic** (indivisible) values. No repeating groups or arrays.

**Violation example:**

| StudentID | Name | Modules |
|-----------|------|---------|
| 1 | Alice | COMP1044, COMP1045, COMP1046 |

**Fix:** Separate into individual rows or a new table.

```sql
-- Solution: separate Enrolment table
CREATE TABLE Enrolment (
    StudentID INT,
    ModuleCode CHAR(8),
    PRIMARY KEY (StudentID, ModuleCode)
);
```

---

### Second Normal Form (2NF)

**Rule:** 1NF + every non-key attribute is **fully** dependent on the **entire** primary key (no partial dependencies).

> Only relevant when the primary key is **composite**. Tables with a single-column PK are automatically in 2NF.

**Violation example:**

Enrolment(**StudentID**, **ModuleCode**, Grade, StudentName, ModuleTitle)

FDs:
- {StudentID, ModuleCode} → Grade ✓ (full)
- StudentID → StudentName ✗ (partial — only depends on part of PK)
- ModuleCode → ModuleTitle ✗ (partial)

**Fix:** Decompose:

```
Student(StudentID, StudentName)
Module(ModuleCode, ModuleTitle)
Enrolment(StudentID, ModuleCode, Grade)
```

---

### Third Normal Form (3NF)

**Rule:** 2NF + no **transitive** dependencies (non-key attribute must not depend on another non-key attribute).

**Violation example:**

Student(**StudentID**, Name, DeptID, DeptName, DeptHead)

FDs:
- StudentID → DeptID ✓
- DeptID → DeptName, DeptHead (transitive via DeptID)

**Fix:** Decompose:

```
Student(StudentID, Name, DeptID)
Department(DeptID, DeptName, DeptHead)
```

**Formal 3NF test:** For every FD X → Y:
- X is a superkey, OR
- Y is part of a candidate key (prime attribute)

---

### Boyce-Codd Normal Form (BCNF)

**Rule:** For every non-trivial FD X → Y, X must be a **superkey**.

BCNF is stricter than 3NF — it removes the "Y is a prime attribute" exception.

**Violation example:**

TeachingAssignment(**Student**, **Module**, Tutor)

FDs:
- {Student, Module} → Tutor
- Tutor → Module (a tutor teaches only one module)

Tutor → Module violates BCNF because Tutor is not a superkey.

**Fix:** Decompose:

```
TutorModule(Tutor, Module)
StudentTutor(Student, Tutor)
```

> **Trade-off:** BCNF decomposition may lose some FDs that 3NF preserves.

:::

---

## Decomposition Rules

:::eli10

When you split a table, you need to make sure you can put it back together perfectly (lossless join) and that you can still check all the original rules (dependency preserving). If you cannot, the split might lose information.

:::

:::eli15

A good decomposition has two properties: lossless join (you can reconstruct the original data by joining the decomposed tables -- guaranteed if a common attribute is a key in at least one resulting table) and dependency preservation (all original FDs can be checked locally within individual tables, without needing to join). Sometimes achieving BCNF sacrifices dependency preservation, which is why 3NF is sometimes preferred in practice.

:::

:::eli20

A good decomposition must be:

| Property | Meaning | Test |
|----------|---------|------|
| Lossless join | Original data can be reconstructed by joining | At least one common attribute is a key in one of the new tables |
| Dependency preserving | All original FDs can be checked in the decomposed tables | Every FD is either within a single table or can be derived |

:::

## Step-by-Step Normalisation Process

:::eli10

The process is like cleaning up step by step: first list all the rules about what determines what, then check if your table passes each level of organization, and split it up wherever there is a problem.

:::

:::eli15

The normalisation process is systematic: (1) list all functional dependencies, (2) identify candidate keys using attribute closure, (3) check each normal form in order (1NF through BCNF), and (4) decompose whenever a violation is found. At each step, verify the decomposition is lossless. Continue until all resulting tables meet the target normal form.

:::

:::eli20

1. **List all FDs** from the data/requirements
2. **Identify candidate keys** (attributes that determine all others via closure)
3. **Check 1NF:** Are all values atomic?
4. **Check 2NF:** Are there partial dependencies? (Only for composite keys)
5. **Check 3NF:** Are there transitive dependencies?
6. **Check BCNF:** Is every determinant a superkey?
7. **Decompose** at each step if violations found

:::

## Worked Example

:::eli10

Here is an example of taking one big messy table (OrderDetail with too much information crammed in) and splitting it into clean, organized tables step by step. Each split fixes a specific type of redundancy.

:::

:::eli15

This worked example takes a denormalized OrderDetail table through the full normalisation process. Starting with identified FDs and key {OrderID, ProductID}, we find partial dependencies (violating 2NF) and transitive dependencies (violating 3NF), decomposing at each stage until we reach four clean tables in BCNF: Order, Customer, Product, and OrderItem.

:::

:::eli20

**Original unnormalised relation:**

OrderDetail(OrderID, OrderDate, CustomerID, CustomerName, CustomerCity, ProductID, ProductName, Quantity, Price)

**FDs:**
- OrderID → OrderDate, CustomerID
- CustomerID → CustomerName, CustomerCity
- ProductID → ProductName, Price
- {OrderID, ProductID} → Quantity

**Key:** {OrderID, ProductID}

**1NF:** Already atomic (assuming single product per row). ✓

**2NF violations:**
- OrderID → OrderDate, CustomerID (partial — only part of key)
- ProductID → ProductName, Price (partial)

Decompose:
```
Order(OrderID, OrderDate, CustomerID)
Product(ProductID, ProductName, Price)
OrderItem(OrderID, ProductID, Quantity)
```

**3NF violations (in Order):**
- OrderID → CustomerID → CustomerName, CustomerCity (transitive)

Decompose:
```
Order(OrderID, OrderDate, CustomerID)
Customer(CustomerID, CustomerName, CustomerCity)
Product(ProductID, ProductName, Price)
OrderItem(OrderID, ProductID, Quantity)
```

**BCNF:** All determinants are now superkeys. ✓

:::

## Practice

:::eli10

Try these normalisation problems -- figure out what normal form a table is in, and if it has problems, split it into better tables.

:::

:::eli15

These exercises require you to identify functional dependencies, determine candidate keys, check which normal form a relation satisfies, and decompose tables to eliminate violations. Work through them systematically: find the key first, then check for partial and transitive dependencies.

:::

:::eli20

<details>
<summary>Q1: Given R(A, B, C, D, E) with FDs: A → B, BC → D, D → E. Key is {A, C}. What normal form is R in?</summary>

Check 2NF:
- A → B is a **partial dependency** (A is part of key {A,C}, and B is non-key)

Therefore R is only in **1NF**, not 2NF.

Decomposition to 2NF:
- R1(A, B)
- R2(A, C, D, E)

Then check R2 for 3NF: {A,C} → D → E is transitive.
- R2a(A, C, D)
- R2b(D, E)

Final: R1(A, B), R2a(A, C, D), R2b(D, E) — in 3NF and BCNF.

</details>

<details>
<summary>Q2: Is this table in 3NF? Employee(EmpID, EmpName, DeptID, DeptName, DeptManager)</summary>

FDs:
- EmpID → EmpName, DeptID
- DeptID → DeptName, DeptManager

**No — it is NOT in 3NF.**

EmpID → DeptID → DeptName is a **transitive dependency** (DeptName depends on DeptID, which is not a key).

Fix: Decompose into:
- Employee(EmpID, EmpName, DeptID)
- Department(DeptID, DeptName, DeptManager)

</details>

<details>
<summary>Q3: What is the difference between 3NF and BCNF?</summary>

| Aspect | 3NF | BCNF |
|--------|-----|------|
| Rule | For X → Y: X is superkey OR Y is prime | For X → Y: X **must** be superkey |
| Strictness | Less strict | More strict |
| Exception | Allows non-key determinants if RHS is prime attribute | No exceptions |
| Dependency preservation | Always achievable | May sacrifice dependency preservation |

BCNF is violated when a non-key attribute determines part of a candidate key — something 3NF allows.

</details>

<details>
<summary>Q4: Normalise: Library(BookID, Title, AuthorID, AuthorName, BorrowerID, BorrowerName, BorrowDate)</summary>

FDs:
- BookID → Title, AuthorID
- AuthorID → AuthorName
- BorrowerID → BorrowerName
- {BookID, BorrowDate} → BorrowerID (assume one borrow per book per date)

Key: {BookID, BorrowDate}

**2NF violations:** BookID → Title, AuthorID (partial)

**3NF violations:** BookID → AuthorID → AuthorName (transitive)

Decomposed:
```
Book(BookID, Title, AuthorID)
Author(AuthorID, AuthorName)
Borrower(BorrowerID, BorrowerName)
BorrowRecord(BookID, BorrowDate, BorrowerID)
```

All in BCNF.

</details>

:::
