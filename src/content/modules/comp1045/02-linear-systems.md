---
title: "Linear Systems"
order: 2
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["linear-algebra", "gaussian-elimination", "row-echelon", "rank", "linear-independence"]
---

# Linear Systems

## System of Linear Equations

A system $A\mathbf{x} = \mathbf{b}$ where $A \in \mathbb{R}^{m \times n}$, $\mathbf{x} \in \mathbb{R}^n$, $\mathbf{b} \in \mathbb{R}^m$.

| # Solutions | Condition |
|-------------|-----------|
| Unique | $\text{rank}(A) = \text{rank}([A|\mathbf{b}]) = n$ |
| Infinite | $\text{rank}(A) = \text{rank}([A|\mathbf{b}]) < n$ |
| None | $\text{rank}(A) < \text{rank}([A|\mathbf{b}])$ |

## Elementary Row Operations

| Operation | Notation | Effect on $\det$ |
|-----------|----------|-----------------|
| Swap rows $i, j$ | $R_i \leftrightarrow R_j$ | Multiplies by $-1$ |
| Scale row $i$ by $c \neq 0$ | $R_i \to cR_i$ | Multiplies by $c$ |
| Add multiple of row $j$ to row $i$ | $R_i \to R_i + cR_j$ | No change |

## Gaussian Elimination

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

## Rank

$$\text{rank}(A) = \text{number of pivots in REF of } A$$

| Property | Statement |
|----------|-----------|
| Rank-nullity theorem | $\text{rank}(A) + \text{nullity}(A) = n$ (number of columns) |
| Max rank | $\text{rank}(A) \leq \min(m, n)$ |
| Full row rank | $\text{rank}(A) = m$ |
| Full column rank | $\text{rank}(A) = n$ |

## Linear Independence

Vectors $\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$ are **linearly independent** iff:

$$c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_k\mathbf{v}_k = \mathbf{0} \implies c_1 = c_2 = \cdots = c_k = 0$$

| Test Method | Procedure |
|-------------|-----------|
| Row reduce | Form matrix with vectors as columns; count pivots. Independent iff pivots = $k$ |
| Determinant (square) | Independent iff $\det \neq 0$ |
| Dimension | $k$ vectors in $\mathbb{R}^n$ with $k > n$ are always dependent |

## Span and Basis

| Concept | Definition |
|---------|-----------|
| Span | Set of all linear combinations of given vectors |
| Basis | Linearly independent set that spans the space |
| Dimension | Number of vectors in a basis |
| Column space | Span of columns of $A$ = $\text{Col}(A)$ |
| Null space | $\text{Null}(A) = \{\mathbf{x} : A\mathbf{x} = \mathbf{0}\}$ |

## Homogeneous Systems

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
