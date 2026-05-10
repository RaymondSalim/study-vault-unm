---
title: "Vectors & Matrices"
order: 1
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["linear-algebra", "vectors", "matrices", "dot-product", "cross-product", "inverse"]
---

# Vectors & Matrices

## Vectors in $\mathbb{R}^n$

| Operation | Definition | Result |
|-----------|-----------|--------|
| Addition | $\mathbf{u} + \mathbf{v} = (u_1+v_1, \ldots, u_n+v_n)$ | Vector |
| Scalar mult. | $c\mathbf{u} = (cu_1, \ldots, cu_n)$ | Vector |
| Magnitude | $\|\mathbf{u}\| = \sqrt{u_1^2 + \cdots + u_n^2}$ | Scalar |
| Unit vector | $\hat{\mathbf{u}} = \frac{\mathbf{u}}{\|\mathbf{u}\|}$ | Vector |

## Dot Product

$$\mathbf{u} \cdot \mathbf{v} = \sum_{i=1}^{n} u_i v_i = \|\mathbf{u}\|\|\mathbf{v}\|\cos\theta$$

| Property | Formula |
|----------|---------|
| Commutative | $\mathbf{u} \cdot \mathbf{v} = \mathbf{v} \cdot \mathbf{u}$ |
| Distributive | $\mathbf{u} \cdot (\mathbf{v} + \mathbf{w}) = \mathbf{u}\cdot\mathbf{v} + \mathbf{u}\cdot\mathbf{w}$ |
| Orthogonal test | $\mathbf{u} \perp \mathbf{v} \iff \mathbf{u}\cdot\mathbf{v} = 0$ |
| Projection | $\text{proj}_{\mathbf{v}}\mathbf{u} = \frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{v}\cdot\mathbf{v}}\mathbf{v}$ |

## Cross Product (3D only)

$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix}$$

| Property | Value |
|----------|-------|
| Result direction | Perpendicular to both $\mathbf{u}$ and $\mathbf{v}$ (right-hand rule) |
| Magnitude | $\|\mathbf{u}\times\mathbf{v}\| = \|\mathbf{u}\|\|\mathbf{v}\|\sin\theta$ |
| Anti-commutative | $\mathbf{u}\times\mathbf{v} = -(\mathbf{v}\times\mathbf{u})$ |
| Parallel test | $\mathbf{u} \parallel \mathbf{v} \iff \mathbf{u}\times\mathbf{v} = \mathbf{0}$ |

## Matrix Operations

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

## Matrix Inverse

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

## Special Matrices

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
