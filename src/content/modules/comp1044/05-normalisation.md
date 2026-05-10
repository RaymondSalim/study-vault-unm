---
title: "Normalisation"
order: 5
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "normalisation", "functional-dependencies", "normal-forms"]
---

# Normalisation

## Purpose

Normalisation is the process of organising relations to:
- Eliminate **redundancy** (duplicate data)
- Prevent **update anomalies** (insertion, deletion, modification)
- Ensure **data integrity**

## Anomalies in Unnormalised Data

| Anomaly | Problem | Example |
|---------|---------|---------|
| Insertion | Cannot insert data without unrelated data | Can't add a new module until a student enrols |
| Deletion | Deleting data causes unintended loss | Deleting last student in a module loses module info |
| Update/Modification | Changing one fact requires multiple updates | Changing a module title must update every row |

## Functional Dependencies (FDs)

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

## Normal Forms

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

---

## Decomposition Rules

A good decomposition must be:

| Property | Meaning | Test |
|----------|---------|------|
| Lossless join | Original data can be reconstructed by joining | At least one common attribute is a key in one of the new tables |
| Dependency preserving | All original FDs can be checked in the decomposed tables | Every FD is either within a single table or can be derived |

## Step-by-Step Normalisation Process

1. **List all FDs** from the data/requirements
2. **Identify candidate keys** (attributes that determine all others via closure)
3. **Check 1NF:** Are all values atomic?
4. **Check 2NF:** Are there partial dependencies? (Only for composite keys)
5. **Check 3NF:** Are there transitive dependencies?
6. **Check BCNF:** Is every determinant a superkey?
7. **Decompose** at each step if violations found

## Worked Example

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

## Practice

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
