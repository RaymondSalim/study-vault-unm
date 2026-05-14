---
title: "Boolean Algebra & Logic Gates"
order: 1
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["boolean", "logic-gates", "truth-tables", "NAND"]
---

## Boolean Algebra Laws

:::eli10

Boolean algebra is like simple on/off math. Instead of regular numbers, everything is either 1 (true/on) or 0 (false/off). There are rules for combining these, like "anything AND 0 is always 0" and "anything OR 1 is always 1." These rules help simplify circuits.

:::

:::eli15

Boolean algebra provides the mathematical foundation for digital logic. It operates on binary values (0 and 1) with operations AND (.), OR (+), and NOT ('). A set of laws (identity, null, complement, commutative, associative, distributive, absorption, De Morgan's) allow you to manipulate and simplify boolean expressions, which directly translates to simpler and cheaper hardware circuits.

:::

:::eli20

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

:::

## Fundamental Logic Gates

:::eli10

Logic gates are tiny electronic switches that make decisions. An AND gate only turns on when BOTH inputs are on. An OR gate turns on when at least one input is on. A NOT gate flips the signal (on becomes off, off becomes on). All computers are built from millions of these simple gates.

:::

:::eli15

Logic gates are the physical building blocks of digital circuits. Each gate implements a boolean function with one or two inputs and one output. The seven fundamental gates are AND, OR, NOT, NAND (NOT-AND), NOR (NOT-OR), XOR (exclusive OR -- one but not both), and XNOR (equivalence). Each gate's behaviour is fully described by its truth table showing outputs for all input combinations.

:::

:::eli20

| Gate | Symbol | Expression | 0,0 | 0,1 | 1,0 | 1,1 |
|------|--------|-----------|-----|-----|-----|-----|
| AND | & | A.B | 0 | 0 | 0 | 1 |
| OR | ≥1 | A+B | 0 | 1 | 1 | 1 |
| NOT | 1/triangle | A' | 1 | 0 | - | - |
| NAND | &° | (A.B)' | 1 | 1 | 1 | 0 |
| NOR | ≥1° | (A+B)' | 1 | 0 | 0 | 0 |
| XOR | =1 | A⊕B | 0 | 1 | 1 | 0 |
| XNOR | =1° | (A⊕B)' | 1 | 0 | 0 | 1 |

:::

## NAND Universality

:::eli10

The NAND gate is special because you can build ANY other gate using only NAND gates. It is like a universal building block -- if you had a factory that only made NAND gates, you could still build any digital circuit in the world.

:::

:::eli15

NAND is a universal gate, meaning any boolean function can be implemented using only NAND gates. NOT is made by connecting both NAND inputs together. AND is a NAND followed by another NAND (as NOT). OR uses De Morgan's: NOT both inputs individually, then NAND them. This is why NAND gates are fundamental in chip manufacturing -- you only need to fabricate one type of gate.

:::

:::eli20

Any gate can be built from NAND alone:

| Gate | NAND construction |
|------|-------------------|
| NOT A | NAND(A, A) |
| A AND B | NAND(NAND(A,B), NAND(A,B)) |
| A OR B | NAND(NAND(A,A), NAND(B,B)) |
| A XOR B | Let P=NAND(A,B); NAND(NAND(A,P), NAND(B,P)) |

:::

## Simplification Techniques

:::eli10

When you have a complicated expression with lots of ANDs and ORs, you want to make it simpler so you need fewer gates (which means cheaper, smaller circuits). You can use algebra rules, or draw a special grid called a Karnaugh Map to find patterns visually.

:::

:::eli15

Boolean expressions can be simplified to use fewer terms and fewer gates, reducing hardware cost. Methods include algebraic manipulation (applying boolean laws), Karnaugh Maps (a visual grid method for 2-4 variables where you group adjacent 1s into powers of 2), Sum of Products (OR together the minterms where output is 1), and Product of Sums (AND together the maxterms where output is 0). K-maps are especially useful for finding minimal expressions quickly.

:::

:::eli20

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

:::
