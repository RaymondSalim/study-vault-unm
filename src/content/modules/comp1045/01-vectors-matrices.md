---
title: "Vectors & Matrices"
order: 1
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["linear-algebra", "vectors", "matrices", "dot-product", "cross-product", "inverse"]
---

# Vectors & Matrices

## Vectors in $\mathbb{R}^n$

:::eli10

A vector is like an arrow pointing from one place to another. It has a direction and a length. You can add vectors together (like walking east then north), stretch them (scalar multiplication), and measure how long they are (magnitude). A unit vector is one with length exactly 1, pointing in a specific direction.

:::

:::eli15

Vectors in R^n are ordered lists of n numbers representing direction and magnitude. You can add vectors component-wise, multiply by a scalar to stretch/shrink, compute the magnitude (length) using the Pythagorean theorem generalized to n dimensions, and normalize to get a unit vector (same direction, length 1). Vectors are fundamental to representing positions, directions, and forces in computer science and physics.

:::

:::eli20

| Operation | Definition | Result |
|-----------|-----------|--------|
| Addition | $\mathbf{u} + \mathbf{v} = (u_1+v_1, \ldots, u_n+v_n)$ | Vector |
| Scalar mult. | $c\mathbf{u} = (cu_1, \ldots, cu_n)$ | Vector |
| Magnitude | $\|\mathbf{u}\| = \sqrt{u_1^2 + \cdots + u_n^2}$ | Scalar |
| Unit vector | $\hat{\mathbf{u}} = \frac{\mathbf{u}}{\|\mathbf{u}\|}$ | Vector |

:::

## Dot Product

:::eli10

The dot product multiplies two vectors together to get a single number. If the result is zero, the vectors are perpendicular (at right angles). It also tells you how much one vector points in the direction of another -- like measuring how much of a slope goes "forward" versus "up."

:::

:::eli15

The dot product (scalar product) of two vectors gives a single number computed as the sum of component-wise products. Geometrically, it equals the product of the magnitudes times the cosine of the angle between them. Key uses: testing orthogonality (dot product = 0 means perpendicular), computing angles between vectors, and projecting one vector onto another. It is commutative and distributive.

:::

:::eli20

$$\mathbf{u} \cdot \mathbf{v} = \sum_{i=1}^{n} u_i v_i = \|\mathbf{u}\|\|\mathbf{v}\|\cos\theta$$

| Property | Formula |
|----------|---------|
| Commutative | $\mathbf{u} \cdot \mathbf{v} = \mathbf{v} \cdot \mathbf{u}$ |
| Distributive | $\mathbf{u} \cdot (\mathbf{v} + \mathbf{w}) = \mathbf{u}\cdot\mathbf{v} + \mathbf{u}\cdot\mathbf{w}$ |
| Orthogonal test | $\mathbf{u} \perp \mathbf{v} \iff \mathbf{u}\cdot\mathbf{v} = 0$ |
| Projection | $\text{proj}_{\mathbf{v}}\mathbf{u} = \frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{v}\cdot\mathbf{v}}\mathbf{v}$ |

:::

## Cross Product (3D only)

:::eli10

The cross product takes two arrows in 3D space and gives you a new arrow that is perpendicular to both of them. The length of this new arrow tells you the area of the parallelogram formed by the original two. Use the right-hand rule to find which way it points.

:::

:::eli15

The cross product (only defined in 3D) takes two vectors and produces a third vector perpendicular to both. Its magnitude equals the area of the parallelogram spanned by the two vectors (|u||v|sin(theta)). Unlike the dot product, it is anti-commutative (swapping the order flips the direction). Two vectors are parallel if and only if their cross product is the zero vector. Computed using a determinant formula with i, j, k unit vectors.

:::

:::eli20

$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix}$$

| Property | Value |
|----------|-------|
| Result direction | Perpendicular to both $\mathbf{u}$ and $\mathbf{v}$ (right-hand rule) |
| Magnitude | $\|\mathbf{u}\times\mathbf{v}\| = \|\mathbf{u}\|\|\mathbf{v}\|\sin\theta$ |
| Anti-commutative | $\mathbf{u}\times\mathbf{v} = -(\mathbf{v}\times\mathbf{u})$ |
| Parallel test | $\mathbf{u} \parallel \mathbf{v} \iff \mathbf{u}\times\mathbf{v} = \mathbf{0}$ |

:::

## Matrix Operations

:::eli10

A matrix is a grid of numbers (like a table). You can add matrices of the same size, multiply every entry by a number, or multiply two matrices together (which is trickier -- you go row-by-column). The transpose flips a matrix along its diagonal. Matrix multiplication is NOT commutative: A times B usually does not equal B times A.

:::

:::eli15

Matrices are rectangular arrays of numbers. Addition requires same dimensions (add element-by-element). Multiplication of A (m x n) and B (n x p) produces an (m x p) result where each entry is the dot product of a row from A with a column from B -- note that n must match. Key fact: matrix multiplication is NOT commutative (AB is not generally equal to BA). The transpose flips rows and columns, and (AB)^T = B^T A^T (order reverses).

:::

:::eli20

For $A \in \mathbb{R}^{m \times n}$ and $B \in \mathbb{R}^{n \times p}$:

| Operation | Notation | Dimensions |
|-----------|----------|-----------|
| Addition | $A + B$ | Both must be $m \times n$ |
| Scalar mult. | $cA$ | Same as $A$ |
| Multiplication | $AB$ | Result is $m \times p$ |
| Transpose | $A^T$ | Result is $n \times m$ |

### Matrix Multiplication

$$(AB)_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}$$

> **Not commutative:** $AB \neq BA$ in general.

### Transpose Properties

| Property | Formula |
|----------|---------|
| Double transpose | $(A^T)^T = A$ |
| Sum | $(A+B)^T = A^T + B^T$ |
| Product | $(AB)^T = B^T A^T$ |
| Scalar | $(cA)^T = cA^T$ |

:::

## Matrix Inverse

:::eli10

The inverse of a matrix undoes what the matrix does, like how dividing undoes multiplying. Not every matrix has an inverse -- only square matrices with a non-zero determinant do. For a 2x2 matrix, there is a simple formula involving swapping and negating entries.

:::

:::eli15

The inverse of a square matrix A (written A^(-1)) satisfies AA^(-1) = A^(-1)A = I (the identity matrix). It exists only when det(A) is not zero. For 2x2 matrices, there is a direct formula. For larger matrices, use row reduction: augment [A | I] and row-reduce to [I | A^(-1)]. Key properties: (AB)^(-1) = B^(-1)A^(-1) (order reverses), and (A^T)^(-1) = (A^(-1))^T.

:::

:::eli20

$A^{-1}$ exists iff $\det(A) \neq 0$ (square matrices only).

$$AA^{-1} = A^{-1}A = I$$

### 2x2 Inverse Formula

$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \implies A^{-1} = \frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$$

### Inverse Properties

| Property | Formula |
|----------|---------|
| Product | $(AB)^{-1} = B^{-1}A^{-1}$ |
| Transpose | $(A^T)^{-1} = (A^{-1})^T$ |
| Scalar | $(cA)^{-1} = \frac{1}{c}A^{-1}$ |

### Finding Inverse via Row Reduction

Augment $[A \mid I]$ and row-reduce to $[I \mid A^{-1}]$.

:::

## Special Matrices

:::eli10

Special matrices have nice properties. A symmetric matrix looks the same when flipped along its diagonal. The identity matrix is like multiplying by 1 -- it does not change anything. Diagonal matrices only have numbers on the main diagonal (everything else is zero), which makes them easy to work with.

:::

:::eli15

Special matrix types have useful properties. Symmetric matrices (A^T = A) have real eigenvalues and orthogonal eigenvectors. Orthogonal matrices (A^T A = I) preserve lengths and angles -- their columns form an orthonormal basis. Diagonal matrices are easy to multiply and invert. Triangular matrices (upper or lower) arise from Gaussian elimination and have determinants equal to the product of diagonal entries.

:::

:::eli20

| Type | Definition |
|------|-----------|
| Symmetric | $A^T = A$ |
| Orthogonal | $A^T A = I$ (columns are orthonormal) |
| Diagonal | $a_{ij} = 0$ for $i \neq j$ |
| Identity | Diagonal with all 1s |
| Upper triangular | $a_{ij} = 0$ for $i > j$ |

---

<details>
<summary><strong>Practice: Dot & Cross Product</strong></summary>

**Q1:** Find $\mathbf{u} \cdot \mathbf{v}$ where $\mathbf{u} = (2, -1, 3)$ and $\mathbf{v} = (4, 0, -2)$.

**A1:** $2(4) + (-1)(0) + 3(-2) = 8 + 0 - 6 = 2$

**Q2:** Find $\mathbf{u} \times \mathbf{v}$ for the same vectors.

**A2:**
$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 2 & -1 & 3 \\ 4 & 0 & -2 \end{vmatrix} = ((-1)(-2) - 3(0))\mathbf{i} - (2(-2) - 3(4))\mathbf{j} + (2(0) - (-1)(4))\mathbf{k} = (2, 16, 4)$$

**Q3:** Find the inverse of $A = \begin{pmatrix} 3 & 1 \\ 5 & 2 \end{pmatrix}$.

**A3:** $\det(A) = 6 - 5 = 1$. So $A^{-1} = \begin{pmatrix} 2 & -1 \\ -5 & 3 \end{pmatrix}$.

</details>

<details>
<summary><strong>Practice: Matrix Multiplication</strong></summary>

**Q:** Compute $AB$ where $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$, $B = \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}$.

**A:**
$$AB = \begin{pmatrix} 1(5)+2(7) & 1(6)+2(8) \\ 3(5)+4(7) & 3(6)+4(8) \end{pmatrix} = \begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}$$

</details>

:::
