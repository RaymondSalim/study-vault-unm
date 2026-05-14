---
title: "The Relational Model"
order: 2
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "relational-model", "keys", "relational-algebra"]
---

# The Relational Model

## Fundamental Concepts

:::eli10

A relational database stores data in tables (like spreadsheets). Each table has columns (the types of information, like Name or Age) and rows (the actual data entries). Every table has a unique name, every column has a unique name, and no two rows are exactly the same.

:::

:::eli15

The relational model represents all data as tables (formally called "relations"). Each row (tuple) is a record, each column (attribute) is a field with a specific data type (domain). Key properties: no duplicate rows, order of rows and columns does not matter, and all values must be atomic (no lists or nested structures in a cell). This structured approach enables powerful querying and integrity enforcement.

:::

:::eli20

The relational model represents data as a collection of **relations** (tables).

| Term | Formal Name | Informal Name |
|------|-------------|---------------|
| Relation | Relation | Table |
| Tuple | Tuple | Row / Record |
| Attribute | Attribute | Column / Field |
| Domain | Domain | Data type / allowed values |
| Degree | Degree | Number of columns |
| Cardinality | Cardinality | Number of rows |

:::

## Properties of Relations

:::eli10

Tables have a few important rules: no column has the same name as another, every cell has a single value (no lists), and you cannot have two identical rows. The order of rows and columns does not matter.

:::

:::eli15

Relations have strict properties that distinguish them from arbitrary spreadsheets: unique relation and attribute names, all values from the same domain in a column, no duplicate tuples, and all values must be atomic (first normal form). The ordering of rows and columns carries no meaning -- data is accessed by column name, not position.

:::

:::eli20

1. Each relation has a **unique name**
2. Each attribute has a **distinct name** within the relation
3. All values in a column are from the **same domain**
4. Each tuple is **distinct** (no duplicate rows)
5. Order of tuples is **irrelevant**
6. Order of attributes is **irrelevant**
7. All attribute values are **atomic** (no repeating groups)

:::

## Keys

:::eli10

A key is like a student ID number -- it uniquely identifies one specific row in a table. A primary key is the chosen main identifier. A foreign key is when one table references another table's primary key, creating a link between them.

:::

:::eli15

Keys are attributes (or combinations) that uniquely identify rows. A super key is any combination that provides uniqueness. A candidate key is a minimal super key (remove any attribute and uniqueness is lost). The primary key is the chosen candidate key for the table. Foreign keys reference the primary key of another table, establishing relationships between tables. Two important rules: primary keys can never be NULL (entity integrity), and foreign keys must match an existing primary key or be NULL (referential integrity).

:::

:::eli20

| Key Type | Definition | Example |
|----------|-----------|---------|
| **Super Key** | Any set of attributes that uniquely identifies a tuple | {StudentID, Name}, {StudentID} |
| **Candidate Key** | Minimal super key (no redundant attributes) | {StudentID}, {Email} |
| **Primary Key (PK)** | Chosen candidate key for the relation | StudentID |
| **Alternate Key** | Candidate keys not chosen as PK | Email |
| **Foreign Key (FK)** | Attribute referencing the PK of another relation | DeptID in Employee |
| **Composite Key** | Key consisting of multiple attributes | {StudentID, ModuleCode} |

### Key Constraints

- **Entity Integrity:** No primary key attribute may be NULL
- **Referential Integrity:** Every foreign key value must match an existing primary key value in the referenced table, or be NULL

:::

## Relational Algebra

:::eli10

Relational algebra is a set of operations you can do on tables to get new tables. You can filter rows (selection), pick certain columns (projection), or combine two tables together (join). It is the mathematical foundation behind SQL queries.

:::

:::eli15

Relational algebra provides the theoretical foundation for SQL. Operations take relations as input and produce new relations. Unary operations work on one table: selection (filter rows by condition, like WHERE), projection (choose columns, like SELECT specific columns), and rename. Binary operations combine tables: union, intersection, difference (set operations), Cartesian product (all combinations), and various joins (combining tables on matching columns).

:::

:::eli20

Relational algebra provides a formal foundation for SQL queries. Operations take one or more relations as input and produce a new relation.

### Unary Operations

| Operation | Symbol | Purpose | SQL Equivalent |
|-----------|--------|---------|----------------|
| Selection | σ (sigma) | Filter rows by condition | `WHERE` |
| Projection | π (pi) | Choose specific columns | `SELECT col1, col2` |
| Rename | ρ (rho) | Rename relation/attributes | `AS` |

**Selection:** σ_{condition}(R)
```
σ_{Age > 20}(Student)
-- Returns all students older than 20
```

**Projection:** π_{attr1, attr2}(R)
```
π_{Name, Email}(Student)
-- Returns only Name and Email columns
```

### Binary Operations

| Operation | Symbol | Purpose | SQL Equivalent |
|-----------|--------|---------|----------------|
| Union | ∪ | Combine two compatible relations | `UNION` |
| Intersection | ∩ | Common tuples in both | `INTERSECT` |
| Difference | − | Tuples in R1 but not R2 | `EXCEPT` |
| Cartesian Product | × | All combinations of tuples | `CROSS JOIN` |
| Natural Join | ⋈ | Join on common attributes | `NATURAL JOIN` |
| Theta Join | ⋈_{θ} | Join on arbitrary condition | `JOIN ... ON` |

### Set Operations Requirements

For Union, Intersection, and Difference, the two relations must be **union-compatible**:
- Same number of attributes (same degree)
- Corresponding attributes have the same domain

### Join Operations

**Cartesian Product (Cross Join):** Every tuple in R1 paired with every tuple in R2.

```
Student × Module
-- If Student has 100 rows and Module has 20 rows → 2000 rows
```

**Natural Join:** Joins on all attributes with the same name, removes duplicate columns.

```
Student ⋈ Enrolment
-- Joins where Student.StudentID = Enrolment.StudentID
```

**Theta Join:** Join with an arbitrary condition.

```
Employee ⋈_{Employee.DeptID = Department.DeptID} Department
```

**Equi-Join:** Theta join where the condition uses only equality (=).

### Division

R ÷ S returns tuples in R that are associated with **every** tuple in S.

**Example:** "Find students enrolled in ALL modules"

```
Enrolment[StudentID, ModuleCode] ÷ Module[ModuleCode]
```

:::

## Relational Algebra Expression Examples

:::eli10

Here are examples of how you combine the operations to answer questions like "find the names of students in a specific module" by filtering, joining, and selecting columns step by step.

:::

:::eli15

Complex queries are built by composing simple operations. To find "names of students in COMP1044": first filter Enrolment for that module code (selection), join with Student on StudentID, then project only the Name column. To find "students not enrolled in anything": take all StudentIDs minus those that appear in Enrolment. Each step produces a new relation that feeds into the next.

:::

:::eli20

**Query:** Find names of students enrolled in 'COMP1044'

```
π_{Name}(Student ⋈ (σ_{ModuleCode='COMP1044'}(Enrolment)))
```

Step by step:
1. σ_{ModuleCode='COMP1044'}(Enrolment) — filter enrolments
2. Join with Student on StudentID
3. Project only the Name column

**Query:** Find students NOT enrolled in any module

```
π_{StudentID}(Student) − π_{StudentID}(Enrolment)
```

:::

## Practice

:::eli10

Try these questions to practise working with the relational model -- identifying keys, writing relational algebra expressions, and understanding how joins work.

:::

:::eli15

These exercises cover natural joins, writing relational algebra for multi-table queries, understanding the difference between key types, and recognizing when set operations can and cannot be applied.

:::

:::eli20

<details>
<summary>Q1: Given relations R(A, B, C) and S(C, D, E), what is the result of R ⋈ S?</summary>

The natural join R ⋈ S joins on the common attribute **C**.

Result schema: (A, B, C, D, E)

It returns all tuples where the value of C in R matches the value of C in S. The common column C appears only once.

</details>

<details>
<summary>Q2: Express in relational algebra: "Find the names and emails of all students who are over 21 and enrolled in a module worth more than 10 credits."</summary>

```
π_{Name, Email}(
    σ_{Age > 21}(Student) ⋈ Enrolment ⋈ σ_{Credits > 10}(Module)
)
```

Steps:
1. Select students with Age > 21
2. Select modules with Credits > 10
3. Natural join Student with Enrolment (on StudentID)
4. Natural join result with Module (on ModuleCode)
5. Project Name and Email

</details>

<details>
<summary>Q3: What is the difference between a super key and a candidate key?</summary>

- **Super key:** Any combination of attributes that uniquely identifies tuples. Can include unnecessary attributes.
- **Candidate key:** A *minimal* super key — removing any attribute would lose uniqueness.

Example for Student(StudentID, Email, Name, DOB):
- Super keys: {StudentID}, {Email}, {StudentID, Name}, {StudentID, Email, Name, DOB}, ...
- Candidate keys: {StudentID}, {Email} (both minimal)

</details>

<details>
<summary>Q4: Why can't you use Union on Student(ID, Name, Age) and Module(Code, Title, Credits)?</summary>

Union requires **union-compatibility**: same number of attributes with corresponding domains.

While both have degree 3, the domains don't correspond (INT vs CHAR, VARCHAR vs VARCHAR, INT vs INT). The semantics would be meaningless — you'd be combining student IDs with module codes.

In practice, you'd only union relations representing the same kind of data (e.g., two sets of student records).

</details>

:::
