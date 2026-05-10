---
title: "Flashcards"
order: 92
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["flashcards", "revision", "quick-review"]
---

# Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is an entity in ER modelling? | A real-world object or concept that can be distinctly identified (e.g., Student, Course). |
| 2 | What is a primary key? | An attribute (or set of attributes) that uniquely identifies each tuple in a relation. |
| 3 | What is a foreign key? | An attribute in one relation that references the primary key of another relation, enforcing referential integrity. |
| 4 | What is 1NF? | A relation is in First Normal Form if all attributes contain only atomic (indivisible) values and there are no repeating groups. |
| 5 | What is 2NF? | A relation is in 2NF if it is in 1NF and every non-key attribute is fully functionally dependent on the entire primary key (no partial dependencies). |
| 6 | What is 3NF? | A relation is in 3NF if it is in 2NF and no non-key attribute is transitively dependent on the primary key. |
| 7 | What is BCNF? | A relation is in BCNF if for every functional dependency X -> Y, X is a superkey. |
| 8 | What does SELECT do in SQL? | Retrieves rows from one or more tables based on specified conditions. |
| 9 | What is the difference between WHERE and HAVING? | WHERE filters rows before grouping; HAVING filters groups after GROUP BY. |
| 10 | What is a JOIN? | Combines rows from two or more tables based on a related column (e.g., matching foreign key to primary key). |
| 11 | What is the difference between INNER JOIN and LEFT JOIN? | INNER JOIN returns only matching rows from both tables; LEFT JOIN returns all rows from the left table plus matching rows from the right (NULLs where no match). |
| 12 | What is relational algebra selection ($\sigma$)? | Selects rows (tuples) from a relation that satisfy a given predicate. |
| 13 | What is relational algebra projection ($\pi$)? | Selects specific columns (attributes) from a relation, removing duplicates. |
| 14 | What is a transaction? | A sequence of database operations treated as a single logical unit of work -- either all succeed (commit) or all fail (rollback). |
| 15 | What are the ACID properties? | Atomicity (all or nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don't interfere), Durability (committed changes persist). |
| 16 | What is a weak entity? | An entity that cannot be uniquely identified by its own attributes alone and depends on an owner entity. |
| 17 | What is cardinality in ER diagrams? | The number of entity instances that can participate in a relationship (1:1, 1:N, M:N). |
| 18 | What is a functional dependency? | A constraint where the value of attribute X uniquely determines the value of attribute Y (X -> Y). |
| 19 | What does GROUP BY do? | Groups rows sharing the same values in specified columns, allowing aggregate functions (COUNT, SUM, AVG) to operate on each group. |
| 20 | What is a subquery? | A query nested inside another query, used in WHERE, FROM, or SELECT clauses. |
| 21 | What is the natural join ($\bowtie$) in relational algebra? | Joins two relations on all common attributes, returning tuples where those attributes match. |
| 22 | What is referential integrity? | A constraint ensuring that a foreign key value must either match an existing primary key value or be NULL. |
| 23 | What is an aggregate function in SQL? | A function that operates on a set of values and returns a single value (e.g., COUNT, SUM, AVG, MAX, MIN). |
| 24 | What is a deadlock in transactions? | When two or more transactions are each waiting for the other to release a lock, creating a cycle with no progress possible. |
| 25 | What is the difference between DELETE and TRUNCATE? | DELETE removes specific rows (can have WHERE, logged, can rollback); TRUNCATE removes all rows quickly (minimal logging, cannot rollback easily). |
