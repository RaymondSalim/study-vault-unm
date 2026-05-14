---
title: "Linear Systems"
order: 2
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["linear-algebra", "gaussian-elimination", "row-echelon", "rank", "linear-independence"]
---

# Linear Systems

## System of Linear Equations

:::eli10

A system of linear equations is like having several clues that together tell you the answer. "x + y = 5" and "x - y = 1" are two clues -- together they tell you x = 3 and y = 2. Sometimes clues give one answer, sometimes infinitely many, and sometimes they contradict each other (no answer).

:::

:::eli15

A system of linear equations Ax = b asks: what values of x satisfy all equations simultaneously? There are three possibilities: a unique solution (the equations pin down exactly one point), infinitely many solutions (some variables are "free" to vary), or no solution (the equations contradict each other). The rank of the coefficient matrix compared to the number of variables determines which case applies.

:::

:::eli20

A system $A\mathbf{x} = \mathbf{b}$ where $A \in \mathbb{R}^{m \times n}$, $\mathbf{x} \in \mathbb{R}^n$, $\mathbf{b} \in \mathbb{R}^m$.

| # Solutions | Condition |
|-------------|-----------|
| Unique | $\text{rank}(A) = \text{rank}([A|\mathbf{b}]) = n$ |
| Infinite | $\text{rank}(A) = \text{rank}([A|\mathbf{b}]) < n$ |
| None | $\text{rank}(A) < \text{rank}([A|\mathbf{b}])$ |

:::

## Elementary Row Operations

:::eli10

Row operations are like legal moves in a puzzle -- they change the appearance of equations without changing the answer. You can swap two rows, multiply a row by a number, or add a multiple of one row to another. These help you simplify the system step by step.

:::

:::eli15

Elementary row operations transform a matrix without changing the solution set of the corresponding system. There are three types: swapping two rows, scaling a row by a nonzero constant, and adding a multiple of one row to another. They form the basis of Gaussian elimination. Each operation has a predictable effect on the determinant (swap flips sign, scaling multiplies by c, addition leaves it unchanged).

:::

:::eli20

| Operation | Notation | Effect on $\det$ |
|-----------|----------|-----------------|
| Swap rows $i, j$ | $R_i \leftrightarrow R_j$ | Multiplies by $-1$ |
| Scale row $i$ by $c \neq 0$ | $R_i \to cR_i$ | Multiplies by $c$ |
| Add multiple of row $j$ to row $i$ | $R_i \to R_i + cR_j$ | No change |

:::

## Gaussian Elimination

:::eli10

Gaussian elimination is a step-by-step method to solve equations. You use row operations to create a "staircase" pattern where each row starts further to the right than the one above. Once you have this shape, you can easily read off the answers by working from the bottom up (back-substitution).

:::

:::eli15

Gaussian elimination transforms the augmented matrix [A|b] into row echelon form (REF) using elementary row operations. REF has all zeros below each pivot (leading entry), with pivots moving right as you go down. To find solutions, back-substitute from the bottom row upward. Reduced row echelon form (RREF) goes further: each pivot is 1 and is the only nonzero entry in its column, making the solution immediately readable.

:::

:::eli20

**Goal:** Transform augmented matrix $[A|\mathbf{b}]$ to row echelon form (REF).

### Row Echelon Form (REF)

1. All zero rows are at the bottom
2. Leading entry (pivot) of each row is to the right of the pivot above
3. All entries below a pivot are zero

### Reduced Row Echelon Form (RREF)

REF plus:
4. Each pivot is 1
5. Each pivot is the only nonzero entry in its column

### Algorithm

```
For each column (left to right):
  1. Find pivot (first nonzero entry in column, at or below current row)
  2. Swap to bring pivot to current row
  3. Eliminate all entries below pivot using R_i → R_i - (a_ij/pivot)R_pivot
For RREF: back-substitute to eliminate entries above pivots
```

:::

## Rank

:::eli10

The rank of a matrix tells you how many "useful" equations you actually have (ones that give new information). If you have 3 equations but one is just a combination of the others, the rank is 2, not 3. The rank-nullity theorem connects the rank to how many free variables (unknowns you can choose freely) exist.

:::

:::eli15

The rank of a matrix is the number of pivots in its row echelon form -- it represents the number of linearly independent rows (or equivalently, columns). The rank-nullity theorem states: rank + nullity = number of columns, where nullity is the dimension of the solution space for Ax = 0. Full column rank means a unique solution exists; rank less than n means free variables and infinitely many solutions (or none, if the system is inconsistent).

:::

:::eli20

$$\text{rank}(A) = \text{number of pivots in REF of } A$$

| Property | Statement |
|----------|-----------|
| Rank-nullity theorem | $\text{rank}(A) + \text{nullity}(A) = n$ (number of columns) |
| Max rank | $\text{rank}(A) \leq \min(m, n)$ |
| Full row rank | $\text{rank}(A) = m$ |
| Full column rank | $\text{rank}(A) = n$ |

:::

## Linear Independence

:::eli10

Vectors are linearly independent if none of them can be made by combining the others. Think of three arrows in 3D: if they all point in genuinely different directions (not all in the same plane), they are independent. If one is a combination of the others, they are dependent.

:::

:::eli15

Vectors are linearly independent if the only way to combine them (with scalar multipliers) to get the zero vector is to use all-zero multipliers. Equivalently, no vector in the set can be written as a combination of the others. To test: form a matrix with vectors as columns and row-reduce. If every column has a pivot, they are independent. If there are fewer pivots than vectors, they are dependent. In R^n, you can have at most n independent vectors.

:::

:::eli20

Vectors $\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$ are **linearly independent** iff:

$$c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_k\mathbf{v}_k = \mathbf{0} \implies c_1 = c_2 = \cdots = c_k = 0$$

| Test Method | Procedure |
|-------------|-----------|
| Row reduce | Form matrix with vectors as columns; count pivots. Independent iff pivots = $k$ |
| Determinant (square) | Independent iff $\det \neq 0$ |
| Dimension | $k$ vectors in $\mathbb{R}^n$ with $k > n$ are always dependent |

:::

## Span and Basis

:::eli10

The span of a set of vectors is all the places you can reach by combining them. A basis is the smallest set of independent vectors that can reach everywhere in the space. The dimension is how many vectors are in the basis -- for example, 3D space has dimension 3.

:::

:::eli15

The span of a set of vectors is all possible linear combinations of those vectors -- the "reachable" space. A basis is a linearly independent set that spans the entire space (you need all of them, and none is redundant). The dimension equals the number of basis vectors. The column space of A is the span of its columns (what outputs Ax can produce). The null space is the set of inputs x that produce zero output (Ax = 0).

:::

:::eli20

| Concept | Definition |
|---------|-----------|
| Span | Set of all linear combinations of given vectors |
| Basis | Linearly independent set that spans the space |
| Dimension | Number of vectors in a basis |
| Column space | Span of columns of $A$ = $\text{Col}(A)$ |
| Null space | $\text{Null}(A) = \{\mathbf{x} : A\mathbf{x} = \mathbf{0}\}$ |

:::

## Homogeneous Systems

:::eli10

A homogeneous system is one where all the equations equal zero (Ax = 0). It always has at least the "boring" solution where all variables are zero. Whether it has interesting solutions depends on whether there are free variables (rank less than the number of unknowns).

:::

:::eli15

A homogeneous system Ax = 0 always has the trivial solution x = 0. It has non-trivial (interesting) solutions if and only if rank(A) < n (number of variables), meaning there are free variables. The solution set forms the null space of A, with dimension equal to n - rank(A). This is important because homogeneous systems arise when testing linear independence and finding eigenspaces.

:::

:::eli20

$A\mathbf{x} = \mathbf{0}$ always has at least the trivial solution $\mathbf{x} = \mathbf{0}$.

- Nontrivial solutions exist iff $\text{rank}(A) < n$
- Solution set = null space of $A$
- Dimension of solution set = $n - \text{rank}(A)$ (number of free variables)

---

<details>
<summary><strong>Practice: Gaussian Elimination</strong></summary>

**Q:** Solve the system:
$$\begin{cases} x + 2y + z = 4 \\ 2x + 5y + 2z = 9 \\ x + 3y + 2z = 7 \end{cases}$$

**A:** Augmented matrix:
$$\begin{pmatrix} 1 & 2 & 1 & | & 4 \\ 2 & 5 & 2 & | & 9 \\ 1 & 3 & 2 & | & 7 \end{pmatrix}$$

$R_2 \to R_2 - 2R_1$, $R_3 \to R_3 - R_1$:
$$\begin{pmatrix} 1 & 2 & 1 & | & 4 \\ 0 & 1 & 0 & | & 1 \\ 0 & 1 & 1 & | & 3 \end{pmatrix}$$

$R_3 \to R_3 - R_2$:
$$\begin{pmatrix} 1 & 2 & 1 & | & 4 \\ 0 & 1 & 0 & | & 1 \\ 0 & 0 & 1 & | & 2 \end{pmatrix}$$

Back-substitute: $z = 2$, $y = 1$, $x = 4 - 2(1) - 2 = 0$.

Solution: $(x, y, z) = (0, 1, 2)$.

</details>

<details>
<summary><strong>Practice: Linear Independence</strong></summary>

**Q:** Are $\mathbf{v}_1 = (1, 2, 3)$, $\mathbf{v}_2 = (4, 5, 6)$, $\mathbf{v}_3 = (7, 8, 9)$ linearly independent?

**A:** Form matrix and row reduce:
$$\begin{pmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{pmatrix} \to \begin{pmatrix} 1 & 4 & 7 \\ 0 & -3 & -6 \\ 0 & -6 & -12 \end{pmatrix} \to \begin{pmatrix} 1 & 4 & 7 \\ 0 & -3 & -6 \\ 0 & 0 & 0 \end{pmatrix}$$

Only 2 pivots for 3 vectors, so they are **linearly dependent**.

(Note: $\mathbf{v}_3 = 2\mathbf{v}_2 - \mathbf{v}_1$.)

</details>

:::
