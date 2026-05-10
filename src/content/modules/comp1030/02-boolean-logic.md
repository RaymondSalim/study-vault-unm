---
title: "Boolean Algebra & Logic Gates"
order: 2
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["boolean-algebra", "logic-gates", "truth-tables", "karnaugh-maps", "simplification"]
---

## Logic Gates

| Gate | Symbol | Expression | Output = 1 when... |
|------|--------|------------|---------------------|
| AND | $\cdot$ | $A \cdot B$ | Both inputs are 1 |
| OR | $+$ | $A + B$ | At least one input is 1 |
| NOT | $\overline{A}$ | $\overline{A}$ | Input is 0 |
| NAND | $\overline{A \cdot B}$ | $\overline{AB}$ | Not both inputs 1 |
| NOR | $\overline{A + B}$ | $\overline{A+B}$ | Both inputs are 0 |
| XOR | $\oplus$ | $A \oplus B$ | Inputs differ |
| XNOR | $\overline{A \oplus B}$ | $\overline{A \oplus B}$ | Inputs are the same |

### Truth Tables

| $A$ | $B$ | AND | OR | NAND | NOR | XOR | XNOR |
|-----|-----|-----|-----|------|-----|-----|------|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |

---

## Boolean Algebra Laws

| Law | AND form | OR form |
|-----|----------|---------|
| Identity | $A \cdot 1 = A$ | $A + 0 = A$ |
| Null | $A \cdot 0 = 0$ | $A + 1 = 1$ |
| Idempotent | $A \cdot A = A$ | $A + A = A$ |
| Complement | $A \cdot \overline{A} = 0$ | $A + \overline{A} = 1$ |
| Commutative | $AB = BA$ | $A+B = B+A$ |
| Associative | $(AB)C = A(BC)$ | $(A+B)+C = A+(B+C)$ |
| Distributive | $A(B+C) = AB+AC$ | $A+BC = (A+B)(A+C)$ |
| Absorption | $A(A+B) = A$ | $A+AB = A$ |
| **De Morgan's** | $\overline{AB} = \overline{A}+\overline{B}$ | $\overline{A+B} = \overline{A}\cdot\overline{B}$ |
| Consensus | $AB + \overline{A}C + BC = AB + \overline{A}C$ | — |

---

## Canonical Forms

| Form | Description | Example ($f = 1$ for minterms 1,2,3) |
|------|-------------|---------------------------------------|
| **SOP** (Sum of Products) | OR of AND terms (minterms) | $\overline{A}B + A\overline{B} + AB = \sum m(1,2,3)$ |
| **POS** (Product of Sums) | AND of OR terms (maxterms) | $(A+B) = \prod M(0)$ |

---

## Karnaugh Maps (K-Maps)

### 2-Variable K-Map

|  | $B=0$ | $B=1$ |
|--|-------|-------|
| $A=0$ | $m_0$ | $m_1$ |
| $A=1$ | $m_2$ | $m_3$ |

### 3-Variable K-Map

|  | $BC=00$ | $BC=01$ | $BC=11$ | $BC=10$ |
|--|---------|---------|---------|---------|
| $A=0$ | $m_0$ | $m_1$ | $m_3$ | $m_2$ |
| $A=1$ | $m_4$ | $m_5$ | $m_7$ | $m_6$ |

### 4-Variable K-Map

|  | $CD=00$ | $CD=01$ | $CD=11$ | $CD=10$ |
|--|---------|---------|---------|---------|
| $AB=00$ | $m_0$ | $m_1$ | $m_3$ | $m_2$ |
| $AB=01$ | $m_4$ | $m_5$ | $m_7$ | $m_6$ |
| $AB=11$ | $m_{12}$ | $m_{13}$ | $m_{15}$ | $m_{14}$ |
| $AB=10$ | $m_8$ | $m_9$ | $m_{11}$ | $m_{10}$ |

### K-Map Rules

1. Group adjacent 1s in powers of 2 (1, 2, 4, 8...)
2. Groups may wrap around edges
3. Make groups as large as possible
4. Every 1 must be covered by at least one group
5. Fewer groups = simpler expression
6. Each group gives one product term; variables that don't change within the group remain

---

## NAND/NOR as Universal Gates

Any logic function can be built using only NAND (or only NOR):

| Equivalent | Using NAND | Using NOR |
|------------|-----------|-----------|
| NOT A | $\overline{A \cdot A}$ | $\overline{A + A}$ |
| A AND B | $\overline{\overline{A \cdot B} \cdot \overline{A \cdot B}}$ | Complex |
| A OR B | $\overline{\overline{A} \cdot \overline{B}}$ | $\overline{\overline{A+B} + \overline{A+B}}$ |

---

## Simplification Example

Simplify $F = \overline{A}B\overline{C} + \overline{A}BC + A\overline{B}\overline{C} + AB\overline{C}$

Using K-map or algebra:
$$F = \overline{A}B + A\overline{C} \quad \text{(after grouping)}$$

Algebraic verification:
$$\overline{A}B(\overline{C}+C) + \overline{C}(A\overline{B}+AB) = \overline{A}B + A\overline{C}$$

---

## Practice

<details>
<summary>Simplify $F = AB + A\overline{B} + \overline{A}B$ using Boolean algebra</summary>

$$F = A(B + \overline{B}) + \overline{A}B = A + \overline{A}B$$

Apply absorption (reverse): $A + \overline{A}B = A + B$

Answer: $F = A + B$
</details>

<details>
<summary>Apply De Morgan's to $\overline{(A+B)(C+D)}$</summary>

$$\overline{(A+B)(C+D)} = \overline{(A+B)} + \overline{(C+D)} = \overline{A}\,\overline{B} + \overline{C}\,\overline{D}$$
</details>

<details>
<summary>Express XOR using only NAND gates</summary>

$$A \oplus B = \overline{\overline{A \cdot \overline{AB}} \cdot \overline{B \cdot \overline{AB}}}$$

Steps:
1. $P = \overline{AB}$ (one NAND)
2. $Q = \overline{A \cdot P}$ (one NAND)
3. $R = \overline{B \cdot P}$ (one NAND)
4. $A \oplus B = \overline{Q \cdot R}$ (one NAND)

Total: 4 NAND gates.
</details>

<details>
<summary>Use a K-map to simplify $F(A,B,C) = \sum m(0,2,4,5,6)$</summary>

K-map layout:

|  | $BC=00$ | $BC=01$ | $BC=11$ | $BC=10$ |
|--|---------|---------|---------|---------|
| $A=0$ | **1** | 0 | 0 | **1** |
| $A=1$ | **1** | **1** | 0 | **1** |

Groups:
- Column $BC=00$: $m_0, m_4$ → $\overline{C}\,\overline{B}$ → wait, better grouping:
- $m_0, m_2, m_4, m_6$ (all with $C=0$): $\overline{C}$
- $m_4, m_5$ ($A=1, C\text{ varies}, B=0$): $A\overline{B}$

Minimal SOP: $F = \overline{C} + A\overline{B}$
</details>
