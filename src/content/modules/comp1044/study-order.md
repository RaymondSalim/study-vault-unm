---
title: "Study Order"
order: 94
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["study-plan", "dependencies", "learning-path"]
---

# Study Order

## Recommended Learning Path

| # | Topic | Why this order | Estimated time |
|---|-------|---------------|----------------|
| 1 | ER Modelling | Conceptual foundation -- learn to model data before implementing it | 4-5 hours |
| 2 | Relational Model | Translates ER diagrams into tables; introduces keys, constraints, FDs | 3-4 hours |
| 3 | SQL Basics | Now that you understand tables, learn to query them (SELECT, INSERT, UPDATE, DELETE) | 4-5 hours |
| 4 | SQL Advanced | Builds on basics with JOINs, subqueries, aggregates, GROUP BY/HAVING | 5-6 hours |
| 5 | Normalisation | Requires understanding of FDs and relational model; restructures tables to remove redundancy | 4-5 hours |
| 6 | Transactions | Understand how concurrent access is managed once you know how data is stored and queried | 3-4 hours |
| 7 | Web Interfaces | Applies all prior knowledge to build database-backed web applications | 3-4 hours |

## Rationale

The module follows a design-implement-optimise-deploy pattern. You first learn to model data conceptually (ER), then implement it (relational model + SQL), then optimise the structure (normalisation), handle concurrent access (transactions), and finally build user-facing applications (web interfaces).

## Dependencies Diagram

```
ER Modelling
    |
    v
Relational Model
   / \
  v   v
SQL Basics   Normalisation
  |
  v
SQL Advanced
  |
  v
Transactions
  |
  v
Web Interfaces
```
