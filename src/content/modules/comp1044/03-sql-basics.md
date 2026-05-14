---
title: "SQL Basics"
order: 3
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "sql", "ddl", "dml", "queries"]
---

# SQL Basics

## SQL Sub-Languages

:::eli10

SQL has different "modes." DDL is for building the structure (creating tables), DML is for working with the actual data (adding, changing, deleting, and finding records), DCL is for permissions (who can do what), and TCL is for managing safe operations (making sure changes either fully happen or do not happen at all).

:::

:::eli15

SQL is divided into sub-languages by purpose. DDL (Data Definition Language) creates and modifies the structure of tables -- CREATE, ALTER, DROP. DML (Data Manipulation Language) handles the data itself -- INSERT, UPDATE, DELETE, SELECT. DCL controls access permissions, and TCL manages transactions. Understanding which sub-language a command belongs to helps clarify what it does.

:::

:::eli20

| Sub-Language | Purpose | Commands |
|-------------|---------|----------|
| **DDL** (Data Definition Language) | Define/modify schema | CREATE, ALTER, DROP |
| **DML** (Data Manipulation Language) | Manipulate data | INSERT, UPDATE, DELETE, SELECT |
| **DCL** (Data Control Language) | Permissions | GRANT, REVOKE |
| **TCL** (Transaction Control Language) | Manage transactions | COMMIT, ROLLBACK, SAVEPOINT |

:::

## Data Definition Language (DDL)

:::eli10

DDL commands build the "skeleton" of your database. CREATE TABLE makes a new table with columns and rules. You specify what kind of data goes in each column (numbers, text, dates) and what rules to enforce (like "this cannot be empty" or "this must be unique").

:::

:::eli15

DDL defines database structure. CREATE TABLE specifies column names, data types, and constraints. Common data types include INT (whole numbers), VARCHAR(n) (variable-length text), DATE, DECIMAL(precision, scale), and BOOLEAN. Constraints enforce data integrity: PRIMARY KEY (unique identifier), FOREIGN KEY (referential link), NOT NULL, UNIQUE, CHECK (custom rules), and DEFAULT values. ALTER TABLE modifies existing tables; DROP TABLE removes them entirely.

:::

:::eli20

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

:::

## Data Manipulation Language (DML)

:::eli10

DML commands let you work with the data inside tables. INSERT adds new rows, UPDATE changes existing rows, DELETE removes rows, and SELECT finds and displays data. Be careful with UPDATE and DELETE -- if you forget to say WHICH rows, it changes or deletes ALL of them!

:::

:::eli15

DML commands manipulate the actual data. INSERT adds rows (you can specify all values or just some columns). UPDATE modifies existing rows matching a WHERE condition -- always include WHERE unless you intentionally want to change every row. DELETE removes rows matching a condition -- again, forgetting WHERE deletes everything. SELECT is the most complex, querying data with filtering, sorting, and various options.

:::

:::eli20

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

:::

## SELECT Queries

:::eli10

SELECT is how you ask the database questions. You say which columns you want, which table to look in, and optionally add filters (WHERE), remove duplicates (DISTINCT), or sort the results (ORDER BY). It is like asking "show me the names of all students in department 1, sorted by name."

:::

:::eli15

SELECT retrieves data from tables. The basic syntax is SELECT columns FROM table WHERE condition ORDER BY column. You can use aliases (AS) for readable column names, DISTINCT to remove duplicates, and various WHERE operators for filtering (comparison, BETWEEN, IN, LIKE for pattern matching, IS NULL). ORDER BY sorts results ascending (default) or descending. LIMIT restricts the number of rows returned.

:::

:::eli20

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

:::

## NULL Handling

:::eli10

NULL means "we do not know" -- it is not zero and not an empty word. You cannot compare things to NULL using = because "unknown equals unknown" is not true. Instead, you use the special IS NULL check.

:::

:::eli15

NULL represents missing or unknown data. It behaves unusually: any arithmetic with NULL gives NULL, any comparison with NULL gives UNKNOWN (not true or false), and even NULL = NULL is not true. You must use IS NULL / IS NOT NULL to test for it. This is a common source of bugs -- using WHERE column = NULL will never match any rows.

:::

:::eli20

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

:::

## Practice

:::eli10

Try these SQL exercises -- create tables, write queries, and watch out for common mistakes with NULL values.

:::

:::eli15

These exercises cover CREATE TABLE with appropriate constraints, writing filtered and sorted queries, understanding NULL behaviour, and using UPDATE with conditions. Pay special attention to NULL handling -- it is one of the most common sources of SQL bugs.

:::

:::eli20

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

:::
