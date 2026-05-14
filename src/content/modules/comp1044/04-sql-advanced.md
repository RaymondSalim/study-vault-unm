---
title: "SQL Advanced"
order: 4
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "sql", "joins", "subqueries", "aggregation"]
---

# SQL Advanced

## Joins

:::eli10

Joins combine data from two or more tables. An INNER JOIN only keeps rows that match in both tables. A LEFT JOIN keeps everything from the left table even if there is no match (filling in blanks with NULL). Think of it like matching students to their clubs -- an inner join only shows students who are in a club, while a left join shows ALL students even if they have not joined one.

:::

:::eli15

Joins combine rows from multiple tables based on related columns. INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table plus matches from the right (NULL where no match). RIGHT JOIN is the reverse. FULL OUTER JOIN returns all rows from both sides. CROSS JOIN produces every possible combination. Self-joins allow a table to be joined with itself (useful for hierarchies like employee-manager relationships).

:::

:::eli20

Joins combine rows from two or more tables based on a related column.

### Join Types Summary

| Join Type | Returns |
|-----------|---------|
| INNER JOIN | Only matching rows from both tables |
| LEFT (OUTER) JOIN | All rows from left + matching from right (NULL if no match) |
| RIGHT (OUTER) JOIN | All rows from right + matching from left (NULL if no match) |
| FULL (OUTER) JOIN | All rows from both (NULL where no match) |
| CROSS JOIN | Cartesian product (every combination) |
| NATURAL JOIN | Auto-joins on columns with same name |

### Visual Concept

```
Table A          Table B
┌───┐            ┌───┐
│   │ INNER JOIN │   │  → Only intersection
│ ████████████████ │
│   │            │   │
│   │ LEFT JOIN  │   │  → All of A + matching B
│████████████████ │  │
│   │            │   │
│   │ RIGHT JOIN │   │  → All of B + matching A
│  ││████████████████│
│   │            │   │
│   │ FULL JOIN  │   │  → All of both
│████████████████████│
└───┘            └───┘
```

### INNER JOIN

```sql
-- Students with their department names
SELECT s.FirstName, s.LastName, d.DeptName
FROM Student s
INNER JOIN Department d ON s.DeptID = d.DeptID;
```

Only returns students who **have** a department AND departments that **have** students.

### LEFT JOIN

```sql
-- All students, with department if they have one
SELECT s.FirstName, s.LastName, d.DeptName
FROM Student s
LEFT JOIN Department d ON s.DeptID = d.DeptID;
```

Returns ALL students. If a student has no department, DeptName is NULL.

### RIGHT JOIN

```sql
-- All departments, with students if they have any
SELECT s.FirstName, s.LastName, d.DeptName
FROM Student s
RIGHT JOIN Department d ON s.DeptID = d.DeptID;
```

Returns ALL departments. Departments with no students show NULL for student fields.

### FULL OUTER JOIN

```sql
-- All students and all departments, matched where possible
SELECT s.FirstName, s.LastName, d.DeptName
FROM Student s
FULL OUTER JOIN Department d ON s.DeptID = d.DeptID;
```

### Multi-Table Joins

```sql
-- Students, their enrolments, and module details
SELECT s.FirstName, s.LastName, m.Title, e.Grade
FROM Student s
INNER JOIN Enrolment e ON s.StudentID = e.StudentID
INNER JOIN Module m ON e.ModuleCode = m.ModuleCode
ORDER BY s.LastName, m.Title;
```

### Self Join

```sql
-- Find employees and their managers (same table)
SELECT e.Name AS Employee, m.Name AS Manager
FROM Employee e
LEFT JOIN Employee m ON e.ManagerID = m.EmployeeID;
```

:::

## Aggregate Functions

:::eli10

Aggregate functions do maths on a whole column of data: COUNT counts how many, SUM adds them up, AVG finds the average, MIN finds the smallest, and MAX finds the biggest. They squash many rows down into one answer.

:::

:::eli15

Aggregate functions compute a single value from multiple rows. COUNT(*) counts all rows, COUNT(column) counts non-NULL values, SUM/AVG/MIN/MAX compute on numeric columns. An important detail: all aggregate functions ignore NULL values except COUNT(*). These functions are often used with GROUP BY to compute aggregates per group rather than for the whole table.

:::

:::eli20

| Function | Purpose | Example |
|----------|---------|---------|
| `COUNT(*)` | Count all rows | `SELECT COUNT(*) FROM Student` |
| `COUNT(col)` | Count non-NULL values | `SELECT COUNT(Email) FROM Student` |
| `COUNT(DISTINCT col)` | Count distinct values | `SELECT COUNT(DISTINCT DeptID) FROM Student` |
| `SUM(col)` | Total | `SELECT SUM(Credits) FROM Module` |
| `AVG(col)` | Average | `SELECT AVG(GPA) FROM Student` |
| `MIN(col)` | Minimum | `SELECT MIN(GPA) FROM Student` |
| `MAX(col)` | Maximum | `SELECT MAX(GPA) FROM Student` |

> **Important:** Aggregate functions ignore NULL values (except `COUNT(*)`).

:::

## GROUP BY

:::eli10

GROUP BY splits your data into groups and lets you do calculations on each group separately. For example, "find the average GPA in each department" groups students by department and then computes AVG(GPA) for each group.

:::

:::eli15

GROUP BY partitions rows into groups sharing the same value(s) for specified columns, then applies aggregate functions to each group independently. A critical rule: every column in SELECT must either be in the GROUP BY clause or inside an aggregate function. This ensures unambiguous results -- you cannot select a specific FirstName when multiple rows are grouped together.

:::

:::eli20

Groups rows sharing a value and applies aggregate functions per group.

```sql
-- Average GPA per department
SELECT DeptID, AVG(GPA) AS AvgGPA, COUNT(*) AS NumStudents
FROM Student
GROUP BY DeptID;
```

```sql
-- Number of students enrolled in each module
SELECT m.ModuleCode, m.Title, COUNT(e.StudentID) AS Enrolled
FROM Module m
LEFT JOIN Enrolment e ON m.ModuleCode = e.ModuleCode
GROUP BY m.ModuleCode, m.Title;
```

### Rule: Every non-aggregated column in SELECT must appear in GROUP BY.

```sql
-- WRONG: FirstName not in GROUP BY
SELECT DeptID, FirstName, AVG(GPA)
FROM Student
GROUP BY DeptID;

-- CORRECT:
SELECT DeptID, AVG(GPA)
FROM Student
GROUP BY DeptID;
```

:::

## HAVING

:::eli10

HAVING is like WHERE but for groups. WHERE filters individual rows before grouping; HAVING filters entire groups after the calculations. For example, "show me departments with an average GPA above 3.5" uses HAVING because you need to compute the average first.

:::

:::eli15

HAVING filters groups after aggregation, while WHERE filters individual rows before grouping. You cannot use aggregate functions in WHERE (the groups do not exist yet), but you can in HAVING. The full query execution order is: FROM/JOIN, then WHERE (filter rows), then GROUP BY (form groups), then HAVING (filter groups), then SELECT, then ORDER BY, then LIMIT.

:::

:::eli20

Filters **groups** (after aggregation), whereas WHERE filters **rows** (before aggregation).

```sql
-- Departments with average GPA above 3.5
SELECT DeptID, AVG(GPA) AS AvgGPA
FROM Student
GROUP BY DeptID
HAVING AVG(GPA) > 3.5;
```

```sql
-- Modules with more than 50 enrolled students
SELECT m.ModuleCode, m.Title, COUNT(*) AS Enrolled
FROM Module m
INNER JOIN Enrolment e ON m.ModuleCode = e.ModuleCode
GROUP BY m.ModuleCode, m.Title
HAVING COUNT(*) > 50;
```

### Query Execution Order

| Order | Clause | Purpose |
|-------|--------|---------|
| 1 | FROM / JOIN | Identify tables |
| 2 | WHERE | Filter rows |
| 3 | GROUP BY | Form groups |
| 4 | HAVING | Filter groups |
| 5 | SELECT | Choose columns |
| 6 | DISTINCT | Remove duplicates |
| 7 | ORDER BY | Sort results |
| 8 | LIMIT | Restrict output |

:::

## Subqueries

:::eli10

A subquery is a question inside another question. "Find students with a GPA above average" first needs to find the average (inner query), then uses that answer in the outer query. Subqueries can go in WHERE, FROM, or even SELECT.

:::

:::eli15

Subqueries are SELECT statements nested inside another query. They can appear in WHERE (to filter based on a computed value or set), in FROM (as a derived table), or in SELECT (as a computed column). Correlated subqueries reference the outer query and execute once per outer row. Key patterns include: comparison with a single value (=, >), membership testing (IN, NOT IN), and existence testing (EXISTS, NOT EXISTS).

:::

:::eli20

A subquery is a SELECT statement nested inside another query.

### Subquery in WHERE

```sql
-- Students with above-average GPA
SELECT FirstName, LastName, GPA
FROM Student
WHERE GPA > (SELECT AVG(GPA) FROM Student);
```

### Subquery with IN

```sql
-- Students enrolled in any 'COMP' module
SELECT FirstName, LastName
FROM Student
WHERE StudentID IN (
    SELECT StudentID
    FROM Enrolment
    WHERE ModuleCode LIKE 'COMP%'
);
```

### Subquery with EXISTS

```sql
-- Departments that have at least one student
SELECT DeptName
FROM Department d
WHERE EXISTS (
    SELECT 1
    FROM Student s
    WHERE s.DeptID = d.DeptID
);
```

### Correlated Subquery

References the outer query — executes once per outer row.

```sql
-- Students whose GPA is highest in their department
SELECT FirstName, LastName, GPA, DeptID
FROM Student s1
WHERE GPA = (
    SELECT MAX(GPA)
    FROM Student s2
    WHERE s2.DeptID = s1.DeptID
);
```

### Subquery in FROM (Derived Table)

```sql
-- Average of department averages
SELECT AVG(DeptAvg) AS OverallAvg
FROM (
    SELECT DeptID, AVG(GPA) AS DeptAvg
    FROM Student
    GROUP BY DeptID
) AS DeptAverages;
```

:::

## Set Operations

:::eli10

Set operations combine the results of two queries. UNION merges them (removing duplicates), INTERSECT keeps only rows in both, and EXCEPT keeps rows in the first but not the second.

:::

:::eli15

Set operations combine results from two compatible queries. UNION returns all rows from both queries (removing duplicates; use UNION ALL to keep them). INTERSECT returns only rows present in both results. EXCEPT (or MINUS) returns rows in the first result but not the second. Both queries must have the same number of columns with compatible types.

:::

:::eli20

```sql
-- Students in COMP1044 OR COMP2055
SELECT StudentID FROM Enrolment WHERE ModuleCode = 'COMP1044'
UNION
SELECT StudentID FROM Enrolment WHERE ModuleCode = 'COMP2055';

-- Students in COMP1044 AND COMP2055
SELECT StudentID FROM Enrolment WHERE ModuleCode = 'COMP1044'
INTERSECT
SELECT StudentID FROM Enrolment WHERE ModuleCode = 'COMP2055';

-- Students in COMP1044 but NOT COMP2055
SELECT StudentID FROM Enrolment WHERE ModuleCode = 'COMP1044'
EXCEPT
SELECT StudentID FROM Enrolment WHERE ModuleCode = 'COMP2055';
```

> `UNION` removes duplicates. Use `UNION ALL` to keep them.

:::

## Practice

:::eli10

Try these exercises to practise writing complex SQL queries with joins, subqueries, and aggregate functions.

:::

:::eli15

These exercises cover finding unmatched rows (LEFT JOIN with NULL check or NOT EXISTS), correlated subqueries for per-group maximums, the distinction between WHERE and HAVING, and the universal quantification pattern ("for all" via NOT EXISTS with a negated condition).

:::

:::eli20

<details>
<summary>Q1: Write a query to find the names of students who are NOT enrolled in any module.</summary>

```sql
-- Using LEFT JOIN
SELECT s.FirstName, s.LastName
FROM Student s
LEFT JOIN Enrolment e ON s.StudentID = e.StudentID
WHERE e.StudentID IS NULL;

-- Using NOT EXISTS
SELECT s.FirstName, s.LastName
FROM Student s
WHERE NOT EXISTS (
    SELECT 1
    FROM Enrolment e
    WHERE e.StudentID = s.StudentID
);

-- Using NOT IN
SELECT FirstName, LastName
FROM Student
WHERE StudentID NOT IN (
    SELECT StudentID FROM Enrolment
);
```

Note: The `NOT IN` approach can fail if the subquery returns any NULL values!

</details>

<details>
<summary>Q2: For each department, find the student with the highest GPA. Show department name, student name, and GPA.</summary>

```sql
SELECT d.DeptName, s.FirstName, s.LastName, s.GPA
FROM Student s
INNER JOIN Department d ON s.DeptID = d.DeptID
WHERE s.GPA = (
    SELECT MAX(s2.GPA)
    FROM Student s2
    WHERE s2.DeptID = s.DeptID
);
```

This is a **correlated subquery** — for each student, it checks if their GPA equals the max GPA in their department.

</details>

<details>
<summary>Q3: What is the difference between WHERE and HAVING?</summary>

| Feature | WHERE | HAVING |
|---------|-------|--------|
| Filters | Individual rows | Groups |
| Timing | Before GROUP BY | After GROUP BY |
| Can use aggregates? | No | Yes |

```sql
-- WHERE filters rows BEFORE grouping
SELECT DeptID, AVG(GPA)
FROM Student
WHERE GPA > 2.0         -- exclude students with GPA ≤ 2.0
GROUP BY DeptID
HAVING AVG(GPA) > 3.0;  -- then exclude departments with avg ≤ 3.0
```

</details>

<details>
<summary>Q4: Write a query to find modules where all enrolled students scored above 60.</summary>

```sql
SELECT m.ModuleCode, m.Title
FROM Module m
WHERE NOT EXISTS (
    SELECT 1
    FROM Enrolment e
    WHERE e.ModuleCode = m.ModuleCode
      AND (e.Grade <= 60 OR e.Grade IS NULL)
);
```

This uses the "for all" pattern: "there does NOT EXIST a student with grade ≤ 60" is equivalent to "ALL students have grade > 60."

</details>

:::
