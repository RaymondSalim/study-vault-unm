---
title: "Glossary"
order: 95
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "glossary", "definitions"]
---

# Glossary

## A

| Term | Definition |
|------|-----------|
| **ACID** | Atomicity, Consistency, Isolation, Durability — the four properties guaranteeing reliable transaction processing |
| **Aggregate Function** | A function that operates on a set of values and returns a single value (COUNT, SUM, AVG, MIN, MAX) |
| **Alias** | A temporary name given to a table or column using `AS` |
| **ALTER** | DDL command to modify an existing table structure |
| **Anomaly** | An undesirable consequence of poorly designed relations (insertion, deletion, update anomalies) |
| **Atomicity** | ACID property: a transaction is all-or-nothing |
| **Attribute** | A named column in a relation/table |

## B

| Term | Definition |
|------|-----------|
| **BCNF (Boyce-Codd Normal Form)** | A relation is in BCNF if every determinant is a superkey |
| **BETWEEN** | SQL operator for range comparisons (inclusive of both endpoints) |

## C

| Term | Definition |
|------|-----------|
| **Candidate Key** | A minimal set of attributes that uniquely identifies every tuple in a relation |
| **Cardinality (ER)** | The number of entity instances that can participate in a relationship (1:1, 1:M, M:N) |
| **Cardinality (Relation)** | The number of tuples (rows) in a relation |
| **Cartesian Product** | Combining every row from one table with every row from another (CROSS JOIN) |
| **CHECK** | A constraint that enforces a condition on column values |
| **Closure (of attributes)** | The set of all attributes functionally determined by a given set of attributes |
| **Composite Key** | A primary key consisting of two or more attributes |
| **Concurrency** | Multiple transactions executing simultaneously |
| **Consistency** | ACID property: a transaction brings the database from one valid state to another |
| **Constraint** | A rule enforced by the DBMS (PK, FK, UNIQUE, NOT NULL, CHECK) |
| **Correlated Subquery** | A subquery that references a column from the outer query; executes once per outer row |
| **CRUD** | Create, Read, Update, Delete — the four basic operations on data |
| **Cross Join** | A join that produces the Cartesian product of two tables |

## D

| Term | Definition |
|------|-----------|
| **DDL** | Data Definition Language — SQL commands for creating/altering/dropping schema objects |
| **Deadlock** | A situation where two or more transactions wait indefinitely for each other's locks |
| **Decomposition** | Splitting a relation into smaller relations to eliminate normalisation violations |
| **Degree** | The number of attributes (columns) in a relation |
| **DELETE** | DML command to remove rows from a table |
| **Dependency Preserving** | A decomposition where all original FDs can be enforced without joining tables |
| **Derived Attribute** | An attribute whose value can be calculated from other attributes |
| **Determinant** | The left-hand side of a functional dependency (X in X → Y) |
| **DISTINCT** | Keyword to eliminate duplicate rows from query results |
| **DML** | Data Manipulation Language — SQL commands for querying and modifying data |
| **Domain** | The set of allowed values for an attribute |
| **Dirty Read** | Reading uncommitted data from another transaction |
| **Durability** | ACID property: committed changes persist even after system failure |

## E

| Term | Definition |
|------|-----------|
| **Entity** | A distinguishable object/concept in the real world represented in the database |
| **Entity Integrity** | Constraint: no primary key attribute may be NULL |
| **ER Diagram** | Entity-Relationship Diagram — a visual model of entities, attributes, and relationships |
| **Equi-Join** | A theta join where the condition uses only equality |
| **Exclusive Lock (X-lock)** | A lock that prevents any other transaction from reading or writing the locked item |

## F

| Term | Definition |
|------|-----------|
| **First Normal Form (1NF)** | A relation where all attribute values are atomic (no repeating groups or arrays) |
| **Foreign Key (FK)** | An attribute that references the primary key of another table, enforcing referential integrity |
| **Full Functional Dependency** | An FD X → Y where Y does not depend on any proper subset of X |
| **FULL OUTER JOIN** | A join returning all rows from both tables, with NULLs where there is no match |
| **Functional Dependency (FD)** | A constraint X → Y meaning: same X always implies same Y |

## G

| Term | Definition |
|------|-----------|
| **GROUP BY** | SQL clause that groups rows sharing common values for aggregate calculations |

## H

| Term | Definition |
|------|-----------|
| **HAVING** | SQL clause that filters groups (used after GROUP BY) |

## I

| Term | Definition |
|------|-----------|
| **INNER JOIN** | A join returning only rows that have matching values in both tables |
| **INSERT** | DML command to add new rows to a table |
| **Isolation** | ACID property: concurrent transactions do not interfere with each other |
| **Isolation Level** | The degree to which a transaction is isolated from others (READ UNCOMMITTED to SERIALIZABLE) |

## J

| Term | Definition |
|------|-----------|
| **Join** | An operation combining rows from two or more tables based on a related column |
| **Junction Table** | A table created to resolve a M:N relationship, containing FKs to both related tables |

## K

| Term | Definition |
|------|-----------|
| **Key** | An attribute or set of attributes that uniquely identifies a tuple |

## L

| Term | Definition |
|------|-----------|
| **LEFT JOIN** | A join returning all rows from the left table and matching rows from the right (NULLs if no match) |
| **Lock** | A mechanism to control concurrent access to data |
| **Lossless Join** | A decomposition property where the original relation can be reconstructed by joining the decomposed relations |

## N

| Term | Definition |
|------|-----------|
| **Natural Join** | A join that automatically matches on all columns with the same name in both tables |
| **Non-repeatable Read** | When a transaction reads the same row twice and gets different values because another transaction modified it |
| **Normalisation** | The process of decomposing relations to reduce redundancy and anomalies |
| **NULL** | A special marker indicating that a value is unknown or missing; NOT the same as zero or empty string |

## O

| Term | Definition |
|------|-----------|
| **ORDER BY** | SQL clause to sort query results |
| **Outer Join** | A join that preserves unmatched rows from one or both tables (LEFT, RIGHT, or FULL) |

## P

| Term | Definition |
|------|-----------|
| **Parameterised Query** | A prepared SQL statement using placeholders for values, preventing SQL injection |
| **Partial Dependency** | A non-key attribute depends on only part of a composite primary key (violates 2NF) |
| **Phantom Read** | When new rows appear in a repeated query because another transaction inserted them |
| **Primary Key (PK)** | The chosen candidate key used to uniquely identify tuples; cannot be NULL |
| **Projection** | Relational algebra operation selecting specific columns (equivalent to SELECT clause) |

## R

| Term | Definition |
|------|-----------|
| **Referential Integrity** | Constraint: every foreign key value must reference an existing primary key or be NULL |
| **Relation** | A table — a set of tuples with the same attributes |
| **Relational Algebra** | A formal language of operations on relations (selection, projection, join, etc.) |
| **Relationship (ER)** | An association between two or more entities |
| **RIGHT JOIN** | A join returning all rows from the right table and matching rows from the left |
| **ROLLBACK** | Command to undo all changes made during the current transaction |

## S

| Term | Definition |
|------|-----------|
| **Second Normal Form (2NF)** | 1NF + no partial dependencies on the primary key |
| **Selection** | Relational algebra operation filtering rows by condition (equivalent to WHERE) |
| **Self Join** | Joining a table with itself |
| **Serializable** | The strictest isolation level; transactions behave as if executed one at a time |
| **Shared Lock (S-lock)** | A lock that allows other transactions to also read (but not write) the locked item |
| **SQL Injection** | A security attack inserting malicious SQL through user input |
| **Subquery** | A SELECT statement nested within another SQL statement |
| **Super Key** | Any set of attributes that uniquely identifies tuples (may include redundant attributes) |

## T

| Term | Definition |
|------|-----------|
| **Third Normal Form (3NF)** | 2NF + no transitive dependencies on non-key attributes |
| **Transaction** | A sequence of operations treated as a single logical unit of work |
| **Transitive Dependency** | An indirect FD: X → Y → Z, where Z depends on X through Y |
| **Tuple** | A single row/record in a relation |
| **Two-Phase Locking (2PL)** | A protocol requiring transactions to acquire all locks before releasing any |

## U

| Term | Definition |
|------|-----------|
| **UNION** | Set operation combining results of two queries, removing duplicates |
| **UNIQUE** | Constraint ensuring no duplicate values in a column (NULLs may be allowed) |
| **UPDATE** | DML command to modify existing rows in a table |

## W

| Term | Definition |
|------|-----------|
| **Weak Entity** | An entity that cannot be uniquely identified without its owner entity's key |
| **WHERE** | SQL clause to filter individual rows before grouping |
| **Write-Ahead Log (WAL)** | Technique where changes are logged before being applied, ensuring durability |
