---
title: "Boolean Algebra & Logic Gates"
order: 2
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["boolean-algebra", "logic-gates", "truth-tables", "karnaugh-maps", "simplification"]
---

## Logic Gates

:::eli10

Logic gates are tiny electronic switches that make decisions using 0s and 1s. AND only outputs 1 if BOTH inputs are 1. OR outputs 1 if at least one input is 1. NOT flips the input. These simple building blocks combine to create entire computers -- like building a castle from LEGO bricks.

:::

:::eli15

Logic gates are the physical building blocks of digital circuits. Each gate performs a boolean operation on binary inputs. AND, OR, NOT are the fundamentals. NAND and NOR are "universal gates" (any circuit can be built from just one type). XOR outputs 1 when inputs differ (useful for addition and parity). Truth tables define exact input-output behavior for all possible combinations.

:::

:::eli20

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

:::

---

## Boolean Algebra Laws

:::eli10

Boolean algebra has rules for simplifying expressions, like how 5+0=5 in regular math. The most important rule is De Morgan's Law: "NOT (A AND B)" is the same as "(NOT A) OR (NOT B)." These rules help engineers build simpler, cheaper circuits that do the same job.

:::

:::eli15

Boolean algebra laws allow simplification of logic expressions (fewer gates = cheaper, faster circuits). Key laws: Identity (A AND 1 = A), Complement (A AND NOT-A = 0), De Morgan's (break a bar over AND changes to OR and vice versa, flipping each variable). Absorption (A + AB = A) is often missed but very useful. Apply these laws to reduce sum-of-products expressions before building circuits.

:::

:::eli20

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

:::

---

## Canonical Forms

:::eli10

SOP (Sum of Products) and POS (Product of Sums) are standard ways to write any boolean function. SOP is a list of AND combinations joined by OR. It comes directly from the truth table -- each row where the output is 1 becomes one AND term.

:::

:::eli15

Any boolean function can be expressed in two standard forms. Sum of Products (SOP): OR of AND terms -- each AND term (minterm) corresponds to one row in the truth table where output is 1. Product of Sums (POS): AND of OR terms -- each OR term (maxterm) corresponds to a row where output is 0. SOP is more common and maps directly to truth table 1-rows.

:::

:::eli20

| Form | Description | Example ($f = 1$ for minterms 1,2,3) |
|------|-------------|---------------------------------------|
| **SOP** (Sum of Products) | OR of AND terms (minterms) | $\overline{A}B + A\overline{B} + AB = \sum m(1,2,3)$ |
| **POS** (Product of Sums) | AND of OR terms (maxterms) | $(A+B) = \prod M(0)$ |

:::

---

## Karnaugh Maps (K-Maps)

:::eli10

A K-map is a visual shortcut for simplifying boolean expressions. You draw a grid, fill in 1s where the function is true, then circle groups of adjacent 1s. Bigger groups mean simpler expressions. It's like a puzzle where you find the largest rectangles of 1s.

:::

:::eli15

Karnaugh maps provide a graphical method to minimize boolean expressions by exploiting adjacency (cells differing in one variable). Rules: group adjacent 1s in powers of 2 (1, 2, 4, 8), groups can wrap around edges, maximize group size to eliminate more variables, cover all 1s with minimal groups. Each group produces one product term -- variables that stay constant within the group remain in the term; variables that change are eliminated.

:::

:::eli20

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

:::

---

## NAND/NOR as Universal Gates

:::eli10

Here's something amazing: you can build ANY logic circuit using only NAND gates (or only NOR gates). NOT, AND, and OR can all be made from NAND alone. This simplifies manufacturing since factories only need to produce one type of gate.

:::

:::eli15

NAND and NOR are called "universal gates" because any boolean function can be implemented using only one type. NOT is made by connecting both inputs together. AND is a NAND followed by a NOT (another NAND). OR uses De Morgan's: invert both inputs then NAND. This is significant for manufacturing -- chips can use a single gate type throughout, simplifying fabrication.

:::

:::eli20

Any logic function can be built using only NAND (or only NOR):

| Equivalent | Using NAND | Using NOR |
|------------|-----------|-----------|
| NOT A | $\overline{A \cdot A}$ | $\overline{A + A}$ |
| A AND B | $\overline{\overline{A \cdot B} \cdot \overline{A \cdot B}}$ | Complex |
| A OR B | $\overline{\overline{A} \cdot \overline{B}}$ | $\overline{\overline{A+B} + \overline{A+B}}$ |

:::

---

## Simplification Example

:::eli10

Simplifying is about finding a shorter formula that gives the same answers. It's like realizing that "I like cats and dogs" is simpler than "I like cats that are pets, and I also like dogs that are pets" (because all cats and dogs ARE pets).

:::

:::eli15

Simplification reduces a boolean expression to use fewer terms and literals, yielding a circuit with fewer gates. Methods include algebraic manipulation (applying laws like absorption, De Morgan's, consensus) and K-maps (visual grouping). The goal is the minimal SOP -- fewest product terms with fewest literals per term.

:::

:::eli20

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

:::
