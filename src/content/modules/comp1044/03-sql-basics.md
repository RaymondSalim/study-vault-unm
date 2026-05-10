---
title: "SQL Basics"
order: 3
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "sql", "ddl", "dml", "queries"]
---

# SQL Basics

## SQL Sub-Languages

| Sub-Language | Purpose | Commands |
|-------------|---------|----------|
| **DDL** (Data Definition Language) | Define/modify schema | CREATE, ALTER, DROP |
| **DML** (Data Manipulation Language) | Manipulate data | INSERT, UPDATE, DELETE, SELECT |
| **DCL** (Data Control Language) | Permissions | GRANT, REVOKE |
| **TCL** (Transaction Control Language) | Manage transactions | COMMIT, ROLLBACK, SAVEPOINT |

## Data Definition Language (DDL)

### CREATE TABLE

```sql
CREATE TABLE Student (
    StudentID   INT          PRIMARY KEY,
    FirstName   VARCHAR(50)  NOT NULL,
    LastName    VARCHAR(50)  NOT NULL,
    Email       VARCHAR(100) UNIQUE,
    DOB         DATE,
    GPA         DECIMAL(3,2) DEFAULT 0.00,
    DeptID      INT          REFERENCES Department(DeptID)
);
```

### Common Data Types

| Type | Description | Example |
|------|-------------|---------|
| INT / INTEGER | Whole numbers | 42 |
| DECIMAL(p,s) | Fixed precision | 3.75 |
| FLOAT / REAL | Floating point | 3.14159 |
| CHAR(n) | Fixed-length string | 'COMP1044' |
| VARCHAR(n) | Variable-length string | 'Hello' |
| DATE | Date | '2024-01-15' |
| BOOLEAN | True/False | TRUE |

### Constraints

| Constraint | Meaning |
|-----------|---------|
| `PRIMARY KEY` | Unique + NOT NULL identifier |
| `FOREIGN KEY ... REFERENCES` | Referential integrity |
| `NOT NULL` | Cannot be empty |
| `UNIQUE` | No duplicates allowed |
| `CHECK(condition)` | Custom validation |
| `DEFAULT value` | Default if not specified |

### ALTER TABLE

```sql
-- Add a column
ALTER TABLE Student ADD Phone VARCHAR(15);

-- Drop a column
ALTER TABLE Student DROP COLUMN Phone;

-- Add a constraint
ALTER TABLE Student ADD CONSTRAINT chk_gpa CHECK (GPA >= 0 AND GPA <= 4.0);

-- Drop a table
DROP TABLE Student;
```

## Data Manipulation Language (DML)

### INSERT

```sql
-- Insert a single row (all columns)
INSERT INTO Student VALUES (1, 'Alice', 'Smith', 'alice@uni.ac.uk', '2003-05-12', 3.80, 1);

-- Insert with named columns (preferred)
INSERT INTO Student (StudentID, FirstName, LastName, Email, DeptID)
VALUES (2, 'Bob', 'Jones', 'bob@uni.ac.uk', 2);

-- Insert multiple rows
INSERT INTO Student (StudentID, FirstName, LastName, DeptID)
VALUES (3, 'Carol', 'Lee', 1),
       (4, 'Dave', 'Brown', 3),
       (5, 'Eve', 'White', 2);
```

### UPDATE

```sql
-- Update specific rows
UPDATE Student
SET GPA = 3.90, Email = 'alice.smith@uni.ac.uk'
WHERE StudentID = 1;

-- Update all rows (careful!)
UPDATE Student
SET GPA = 0.00;
```

> **Warning:** Forgetting the `WHERE` clause updates ALL rows!

### DELETE

```sql
-- Delete specific rows
DELETE FROM Student
WHERE StudentID = 5;

-- Delete all rows (careful!)
DELETE FROM Student;
```

> **Warning:** Forgetting the `WHERE` clause deletes ALL rows!

## SELECT Queries

### Basic Syntax

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column ASC|DESC;
```

### Examples

```sql
-- Select all columns
SELECT * FROM Student;

-- Select specific columns
SELECT FirstName, LastName, GPA FROM Student;

-- With alias
SELECT FirstName AS "First Name", GPA AS "Grade Point"
FROM Student;

-- Distinct values (remove duplicates)
SELECT DISTINCT DeptID FROM Student;
```

### WHERE Clause Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `=` | Equal | `WHERE GPA = 4.0` |
| `<>` or `!=` | Not equal | `WHERE DeptID <> 1` |
| `<`, `>`, `<=`, `>=` | Comparison | `WHERE GPA >= 3.5` |
| `AND` | Both conditions | `WHERE GPA > 3 AND DeptID = 1` |
| `OR` | Either condition | `WHERE DeptID = 1 OR DeptID = 2` |
| `NOT` | Negate | `WHERE NOT DeptID = 1` |
| `BETWEEN` | Range (inclusive) | `WHERE GPA BETWEEN 3.0 AND 4.0` |
| `IN` | Match a list | `WHERE DeptID IN (1, 2, 3)` |
| `LIKE` | Pattern match | `WHERE LastName LIKE 'S%'` |
| `IS NULL` | Check for NULL | `WHERE Email IS NULL` |
| `IS NOT NULL` | Check not NULL | `WHERE Email IS NOT NULL` |

### LIKE Patterns

| Pattern | Meaning | Example |
|---------|---------|---------|
| `%` | Any sequence of characters | `'S%'` — starts with S |
| `_` | Any single character | `'_o%'` — second char is o |

```sql
-- Names starting with 'A'
SELECT * FROM Student WHERE FirstName LIKE 'A%';

-- Names with exactly 5 characters
SELECT * FROM Student WHERE FirstName LIKE '_____';

-- Email containing 'uni'
SELECT * FROM Student WHERE Email LIKE '%uni%';
```

### ORDER BY

```sql
-- Ascending (default)
SELECT * FROM Student ORDER BY LastName ASC;

-- Descending
SELECT * FROM Student ORDER BY GPA DESC;

-- Multiple columns
SELECT * FROM Student ORDER BY DeptID ASC, GPA DESC;
```

### LIMIT (MySQL) / FETCH FIRST (SQL Standard)

```sql
-- Top 5 students by GPA
SELECT FirstName, LastName, GPA
FROM Student
ORDER BY GPA DESC
LIMIT 5;
```

## NULL Handling

- NULL means "unknown" or "missing" — it is NOT zero or empty string
- Any arithmetic with NULL yields NULL: `5 + NULL = NULL`
- Any comparison with NULL yields UNKNOWN: `NULL = NULL` is NOT true
- Use `IS NULL` / `IS NOT NULL` to test for NULL

```sql
-- WRONG: will not find NULL emails
SELECT * FROM Student WHERE Email = NULL;

-- CORRECT:
SELECT * FROM Student WHERE Email IS NULL;
```

## Practice

<details>
<summary>Q1: Write a CREATE TABLE for a Book table with: ISBN (PK, 13 chars), Title, Author, Price (decimal), PublishDate, InStock (boolean defaulting to true).</summary>

```sql
CREATE TABLE Book (
    ISBN        CHAR(13)      PRIMARY KEY,
    Title       VARCHAR(200)  NOT NULL,
    Author      VARCHAR(100)  NOT NULL,
    Price       DECIMAL(6,2)  CHECK (Price >= 0),
    PublishDate DATE,
    InStock     BOOLEAN       DEFAULT TRUE
);
```

</details>

<details>
<summary>Q2: Write a query to find all students whose last name starts with 'J' and have a GPA above 3.0, ordered by GPA descending.</summary>

```sql
SELECT FirstName, LastName, GPA
FROM Student
WHERE LastName LIKE 'J%'
  AND GPA > 3.0
ORDER BY GPA DESC;
```

</details>

<details>
<summary>Q3: What's wrong with this query? <code>DELETE FROM Student WHERE GPA = NULL;</code></summary>

You cannot compare with NULL using `=`. NULL is not a value — it represents the absence of a value.

**Correct version:**
```sql
DELETE FROM Student WHERE GPA IS NULL;
```

The expression `GPA = NULL` evaluates to UNKNOWN (not TRUE or FALSE), so no rows would ever be deleted.

</details>

<details>
<summary>Q4: Write SQL to increase the GPA by 0.1 for all students in department 3, but cap it at 4.0.</summary>

```sql
UPDATE Student
SET GPA = LEAST(GPA + 0.1, 4.0)
WHERE DeptID = 3;
```

Alternative without LEAST:
```sql
UPDATE Student
SET GPA = CASE
    WHEN GPA + 0.1 > 4.0 THEN 4.0
    ELSE GPA + 0.1
END
WHERE DeptID = 3;
```

</details>
