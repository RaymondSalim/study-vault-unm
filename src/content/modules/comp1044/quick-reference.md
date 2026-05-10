---
title: "Quick Reference"
order: 90
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "sql", "reference", "normalisation"]
---

# Quick Reference

## SQL Syntax Cheat Sheet

### DDL (Data Definition)

```sql
-- Create table
CREATE TABLE TableName (
    col1 datatype PRIMARY KEY,
    col2 datatype NOT NULL,
    col3 datatype DEFAULT value,
    col4 datatype UNIQUE,
    col5 datatype CHECK (condition),
    col6 datatype REFERENCES OtherTable(col),
    CONSTRAINT pk_name PRIMARY KEY (col1, col2),
    CONSTRAINT fk_name FOREIGN KEY (col6) REFERENCES OtherTable(col)
);

-- Alter table
ALTER TABLE TableName ADD column_name datatype;
ALTER TABLE TableName DROP COLUMN column_name;
ALTER TABLE TableName ADD CONSTRAINT name CHECK (condition);

-- Drop table
DROP TABLE TableName;
```

### DML (Data Manipulation)

```sql
-- Insert
INSERT INTO Table (col1, col2) VALUES (val1, val2);
INSERT INTO Table (col1, col2) VALUES (v1, v2), (v3, v4), (v5, v6);

-- Update
UPDATE Table SET col1 = val1, col2 = val2 WHERE condition;

-- Delete
DELETE FROM Table WHERE condition;
```

### SELECT Query Template

```sql
SELECT [DISTINCT] columns | expressions | aggregate_functions
FROM table1
[JOIN table2 ON condition]
[WHERE row_conditions]
[GROUP BY columns]
[HAVING group_conditions]
[ORDER BY columns [ASC|DESC]]
[LIMIT n];
```

### Joins

```sql
-- Inner join
SELECT * FROM A INNER JOIN B ON A.id = B.a_id;

-- Left outer join
SELECT * FROM A LEFT JOIN B ON A.id = B.a_id;

-- Right outer join
SELECT * FROM A RIGHT JOIN B ON A.id = B.a_id;

-- Full outer join
SELECT * FROM A FULL OUTER JOIN B ON A.id = B.a_id;

-- Cross join (cartesian product)
SELECT * FROM A CROSS JOIN B;

-- Self join
SELECT * FROM A a1 JOIN A a2 ON a1.manager_id = a2.id;
```

### Aggregate Functions

```sql
COUNT(*)          -- count all rows
COUNT(column)     -- count non-NULL values
COUNT(DISTINCT c) -- count distinct non-NULL values
SUM(column)       -- total
AVG(column)       -- average
MIN(column)       -- minimum
MAX(column)       -- maximum
```

### Subquery Patterns

```sql
-- Scalar subquery (returns one value)
WHERE col = (SELECT MAX(col) FROM Table)

-- List subquery (returns one column)
WHERE col IN (SELECT col FROM Table WHERE ...)

-- EXISTS (returns true/false)
WHERE EXISTS (SELECT 1 FROM Table WHERE ...)

-- ALL / ANY
WHERE col > ALL (SELECT col FROM Table WHERE ...)
WHERE col > ANY (SELECT col FROM Table WHERE ...)
```

### Set Operations

```sql
SELECT ... UNION     SELECT ...  -- combine, remove duplicates
SELECT ... UNION ALL SELECT ...  -- combine, keep duplicates
SELECT ... INTERSECT SELECT ...  -- common rows
SELECT ... EXCEPT    SELECT ...  -- rows in first but not second
```

### Transactions

```sql
BEGIN TRANSACTION;
SAVEPOINT sp1;
ROLLBACK TO SAVEPOINT sp1;
COMMIT;
ROLLBACK;
```

## WHERE Clause Operators

| Operator | Example |
|----------|---------|
| `=`, `<>`, `<`, `>`, `<=`, `>=` | `WHERE age >= 18` |
| `AND`, `OR`, `NOT` | `WHERE a > 1 AND b < 5` |
| `BETWEEN x AND y` | `WHERE price BETWEEN 10 AND 50` |
| `IN (list)` | `WHERE dept IN (1, 2, 3)` |
| `LIKE pattern` | `WHERE name LIKE 'A%'` |
| `IS NULL` / `IS NOT NULL` | `WHERE email IS NOT NULL` |

## Common Data Types

| Type | Use |
|------|-----|
| `INT` | Whole numbers |
| `DECIMAL(p,s)` | Exact decimals (money) |
| `VARCHAR(n)` | Variable text up to n chars |
| `CHAR(n)` | Fixed-length text |
| `DATE` | Dates (YYYY-MM-DD) |
| `BOOLEAN` | TRUE/FALSE |
| `TEXT` | Large text |

## Normalisation Quick Steps

### Identifying Normal Forms

| Question | If Yes | If No |
|----------|--------|-------|
| Are all values atomic (no lists/groups)? | At least 1NF | Not 1NF |
| Is every non-key attribute fully dependent on the ENTIRE key? | At least 2NF | Only 1NF |
| Are there NO transitive dependencies (non-key → non-key)? | At least 3NF | Only 2NF |
| Is every determinant a superkey? | BCNF | Only 3NF |

### Decomposition Checklist

1. Identify all functional dependencies
2. Find candidate keys (closure of attribute sets)
3. Check for violations at each level
4. Split into smaller relations where violations occur
5. Verify: lossless join? dependency preserving?

### Key Formulas

- **Closure of X (X+):** Start with X, repeatedly add attributes determined by FDs until no more can be added
- **X is a superkey** if X+ contains ALL attributes
- **X is a candidate key** if X is a superkey AND no proper subset of X is a superkey

## ER-to-Relational Mapping

| ER Element | Relational Mapping |
|------------|-------------------|
| Strong entity | Table with PK |
| Weak entity | Table with partial key + owner PK as FK (composite PK) |
| 1:1 relationship | FK in either table |
| 1:M relationship | FK in the "many" side |
| M:N relationship | Junction table with both PKs |
| Multivalued attribute | Separate table with FK |

## ACID Summary

| Property | Ensures | Mechanism |
|----------|---------|-----------|
| Atomicity | All-or-nothing | Undo log / rollback |
| Consistency | Valid states only | Constraints |
| Isolation | No interference | Locking / MVCC |
| Durability | Survives crashes | Write-ahead log |

## Isolation Levels (least to most strict)

1. READ UNCOMMITTED — dirty reads possible
2. READ COMMITTED — only see committed data
3. REPEATABLE READ — rows don't change mid-transaction
4. SERIALIZABLE — full isolation, as-if-serial execution
