---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["exam-strategy", "revision", "time-management"]
---

# Exam Strategy

## Time Allocation

| Section | Suggested Time | Notes |
|---------|---------------|-------|
| ER modelling | 20% | Draw diagrams carefully -- cardinality and participation matter |
| Relational model & normalisation | 25% | Show working for FD identification and decomposition |
| SQL (basic + advanced) | 30% | Most marks available here -- practise writing queries |
| Relational algebra | 15% | Translate SQL to algebra or vice versa |
| Transactions & web interfaces | 10% | Conceptual -- ACID, concurrency, basic web architecture |

## Topic Weighting

- **High weight:** SQL queries (SELECT, JOIN, GROUP BY, subqueries), normalisation (1NF-3NF/BCNF), ER diagrams
- **Medium weight:** Relational algebra, ER-to-relational mapping, transactions
- **Lower weight:** Web interfaces, concurrency control details

## Question Types to Expect

1. **ER diagram construction** -- given a scenario, draw entities, relationships, cardinalities, participation
2. **ER to relational mapping** -- convert ER diagram to table schemas
3. **Normalisation** -- identify FDs, determine normal form, decompose to 3NF/BCNF
4. **SQL writing** -- write queries for given requirements (joins, aggregates, subqueries)
5. **SQL interpretation** -- explain what a given query returns
6. **Relational algebra** -- express queries using $\sigma$, $\pi$, $\bowtie$, $\cup$, $-$
7. **Transaction concepts** -- ACID properties, identify anomalies

## Key Definitions to Memorise

- Normal forms: 1NF (atomic values), 2NF (no partial deps), 3NF (no transitive deps), BCNF (every determinant is a superkey)
- ACID: Atomicity, Consistency, Isolation, Durability
- SQL JOIN types: INNER, LEFT, RIGHT, FULL OUTER, CROSS
- Relational algebra: $\sigma$ (select), $\pi$ (project), $\bowtie$ (join), $\times$ (cartesian), $\cup$ (union), $-$ (difference)
- Candidate key: minimal set of attributes that uniquely identifies a tuple
- Superkey: any set of attributes that uniquely identifies a tuple (candidate key + extras)

## Night Before Checklist -- Top 10 Things to Review

1. ER diagram notation: cardinality (1:1, 1:N, M:N), participation (total vs partial), weak entities
2. Mapping ER to relations: how M:N relationships become junction tables
3. Functional dependency identification and closure
4. Normalisation steps: 1NF -> 2NF -> 3NF -> BCNF with examples
5. SQL SELECT with WHERE, GROUP BY, HAVING, ORDER BY
6. SQL JOINs: INNER, LEFT, RIGHT -- when to use each
7. Subqueries: correlated vs non-correlated
8. Relational algebra equivalents of SQL queries
9. ACID properties with a concrete example for each
10. Aggregate functions: COUNT, SUM, AVG, MAX, MIN (especially with GROUP BY)
