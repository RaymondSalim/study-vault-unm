---
title: "Boolean Algebra & Logic Gates"
order: 1
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["boolean", "logic-gates", "truth-tables", "NAND"]
---

## Boolean Algebra Laws

| Law | AND form | OR form |
|-----|----------|---------|
| Identity | A . 1 = A | A + 0 = A |
| Null | A . 0 = 0 | A + 1 = 1 |
| Idempotent | A . A = A | A + A = A |
| Complement | A . A' = 0 | A + A' = 1 |
| Commutative | A . B = B . A | A + B = B + A |
| Associative | (A.B).C = A.(B.C) | (A+B)+C = A+(B+C) |
| Distributive | A.(B+C) = A.B+A.C | A+(B.C) = (A+B).(A+C) |
| Absorption | A.(A+B) = A | A+(A.B) = A |
| De Morgan's | (A.B)' = A'+B' | (A+B)' = A'.B' |

## Fundamental Logic Gates

| Gate | Symbol | Expression | 0,0 | 0,1 | 1,0 | 1,1 |
|------|--------|-----------|-----|-----|-----|-----|
| AND | & | A.B | 0 | 0 | 0 | 1 |
| OR | ≥1 | A+B | 0 | 1 | 1 | 1 |
| NOT | 1/triangle | A' | 1 | 0 | - | - |
| NAND | &° | (A.B)' | 1 | 1 | 1 | 0 |
| NOR | ≥1° | (A+B)' | 1 | 0 | 0 | 0 |
| XOR | =1 | A⊕B | 0 | 1 | 1 | 0 |
| XNOR | =1° | (A⊕B)' | 1 | 0 | 0 | 1 |

## NAND Universality

Any gate can be built from NAND alone:

| Gate | NAND construction |
|------|-------------------|
| NOT A | NAND(A, A) |
| A AND B | NAND(NAND(A,B), NAND(A,B)) |
| A OR B | NAND(NAND(A,A), NAND(B,B)) |
| A XOR B | Let P=NAND(A,B); NAND(NAND(A,P), NAND(B,P)) |

## Simplification Techniques

1. **Algebraic** -- apply laws above to reduce terms
2. **Karnaugh Maps (2-4 variables)** -- group adjacent 1s in powers of 2
3. **Sum of Products (SOP)** -- OR the minterms where output = 1
4. **Product of Sums (POS)** -- AND the maxterms where output = 0

### K-Map Grouping Rules

- Groups must be rectangular, sizes power of 2 (1, 2, 4, 8...)
- Larger groups = simpler expression
- Groups can wrap edges
- Every 1 must be in at least one group
- Overlapping allowed

<details>
<summary>Practice: Simplify F = A'B'C + A'BC + AB'C + ABC</summary>

Factor: F = C(A'B' + A'B + AB' + AB) = C(A'(B'+B) + A(B'+B)) = C(A' + A) = C

Answer: **F = C**
</details>

<details>
<summary>Practice: Implement OR using only NAND gates</summary>

A OR B = NAND(A NAND A, B NAND B) = ((A.A)')' . ((B.B)')' -- wrong framing.

Step by step:
- NOT A = NAND(A, A) = A'
- NOT B = NAND(B, B) = B'
- A OR B = (A'.B')' = NAND(A', B') = NAND(NAND(A,A), NAND(B,B))

So: 3 NAND gates total.
</details>

<details>
<summary>Practice: Use De Morgan's to find complement of F = AB + CD</summary>

F' = (AB + CD)' = (AB)'.(CD)' = (A'+B').(C'+D')

Expanded: F' = A'C' + A'D' + B'C' + B'D'
</details>
