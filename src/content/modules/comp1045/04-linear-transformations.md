---
title: "Linear Transformations"
order: 4
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["linear-algebra", "linear-transformations", "rotation", "scaling", "kernel", "image"]
---

# Linear Transformations

## Definition

:::eli10

A linear transformation is a function that moves, stretches, rotates, or flips vectors while keeping straight lines straight and the origin fixed. If you transform two vectors and add them, it is the same as adding them first and then transforming. Every linear transformation can be represented by a matrix.

:::

:::eli15

A linear transformation T: R^n -> R^m preserves addition and scalar multiplication. This means T(u + v) = T(u) + T(v) and T(cv) = cT(v). Every linear transformation can be expressed as multiplication by a matrix A, where the columns of A are the images of the standard basis vectors. Common 2D examples include rotations, reflections, scalings, and shears.

:::

:::eli20

A function $T: \mathbb{R}^n \to \mathbb{R}^m$ is a **linear transformation** iff:

1. $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ (additivity)
2. $T(c\mathbf{u}) = cT(\mathbf{u})$ (homogeneity)

Equivalently: $T(c_1\mathbf{u} + c_2\mathbf{v}) = c_1 T(\mathbf{u}) + c_2 T(\mathbf{v})$

:::

## Matrix Representation

:::eli10

To find the matrix for any linear transformation, just see what happens to the standard unit arrows (i, j, k). Those results become the columns of the matrix. Then multiplying any vector by this matrix applies the transformation.

:::

:::eli15

Every linear transformation from R^n to R^m has a unique matrix representation. To find it, apply the transformation to each standard basis vector e1, e2, ..., en. The results become the columns of the matrix A, so that T(x) = Ax for all x. This means finding the matrix is just computing T(e1), T(e2), etc. and arranging them as columns.

:::

:::eli20

Every linear transformation $T: \mathbb{R}^n \to \mathbb{R}^m$ can be written as:

$$T(\mathbf{x}) = A\mathbf{x}$$

where $A \in \mathbb{R}^{m \times n}$ with columns $A = [T(\mathbf{e}_1) | T(\mathbf{e}_2) | \cdots | T(\mathbf{e}_n)]$.

:::

## Standard 2D Transformations

:::eli10

Common transformations in 2D include rotation (spinning around the origin), scaling (stretching or squishing along axes), reflection (flipping over a line), and shearing (slanting like pushing the top of a rectangle sideways).

:::

:::eli15

Each 2D transformation has a standard matrix. Rotation by angle theta uses cos and sin. Scaling stretches independently along x and y axes. Reflections flip over an axis or line (like y = x). Shears slant in one direction while keeping the other fixed. These matrices are the foundation of 2D computer graphics, where transformations are combined by multiplying their matrices.

:::

:::eli20

| Transformation | Matrix | Effect |
|---------------|--------|--------|
| Rotation by $\theta$ (CCW) | $\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$ | Rotates vectors |
| Scaling | $\begin{pmatrix} s_x & 0 \\ 0 & s_y \end{pmatrix}$ | Stretches axes |
| Reflection ($x$-axis) | $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ | Flips over $x$-axis |
| Reflection ($y$-axis) | $\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$ | Flips over $y$-axis |
| Reflection ($y=x$) | $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ | Swaps coordinates |
| Shear ($x$-direction) | $\begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$ | Slants horizontally |
| Projection onto $x$-axis | $\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ | Drops $y$-component |

:::

## Kernel (Null Space)

:::eli10

The kernel of a transformation is the set of all vectors that get squished to zero. If the only thing that goes to zero is the zero vector itself, then the transformation does not lose any information (it is one-to-one).

:::

:::eli15

The kernel (null space) of T is all vectors x where T(x) = 0. If the kernel contains only the zero vector, T is injective (one-to-one) -- no information is lost. The dimension of the kernel (nullity) tells you how many dimensions of information are "collapsed" by the transformation. The kernel connects to free variables in the solution of Ax = 0.

:::

:::eli20

$$\ker(T) = \{\mathbf{x} \in \mathbb{R}^n : T(\mathbf{x}) = \mathbf{0}\} = \text{Null}(A)$$

| Property | Meaning |
|----------|---------|
| $\ker(T) = \{\mathbf{0}\}$ | $T$ is injective (one-to-one) |
| $\dim(\ker(T))$ | Number of free variables = nullity |

:::

## Image (Range / Column Space)

:::eli10

The image of a transformation is all the places you can actually reach -- all possible outputs. If the image covers the entire output space, the transformation can hit any target (it is "onto").

:::

:::eli15

The image (range) of T is the set of all possible outputs -- everything T can produce. It equals the column space of the matrix A. If the image equals all of R^m, T is surjective (onto). The dimension of the image is the rank of A. Together with the kernel, the rank-nullity theorem connects inputs, outputs, and lost dimensions.

:::

:::eli20

$$\text{Im}(T) = \{T(\mathbf{x}) : \mathbf{x} \in \mathbb{R}^n\} = \text{Col}(A)$$

| Property | Meaning |
|----------|---------|
| $\text{Im}(T) = \mathbb{R}^m$ | $T$ is surjective (onto) |
| $\dim(\text{Im}(T))$ | Rank of $A$ |

:::

## Rank-Nullity Theorem

:::eli10

The rank-nullity theorem says: the number of dimensions you "keep" (rank/image) plus the number you "lose" (nullity/kernel) always equals the number of input dimensions. It is like conservation of dimensions.

:::

:::eli15

The rank-nullity theorem states that for a transformation from R^n: the dimension of the image (rank) plus the dimension of the kernel (nullity) always equals n (the number of input dimensions). This is a fundamental constraint: dimensions are either preserved in the output or collapsed to zero, and the total always matches the input dimension.

:::

:::eli20

$$\dim(\ker(T)) + \dim(\text{Im}(T)) = n$$

$$\text{nullity}(A) + \text{rank}(A) = \text{number of columns}$$

:::

## Composition of Transformations

:::eli10

If you apply one transformation and then another, the combined effect is represented by multiplying the two matrices. Important: the order matters! Apply the right matrix first, then the left one. It is like putting on socks before shoes -- the order matters.

:::

:::eli15

When you compose two transformations (apply S first, then T), the resulting matrix is BA (where A is the matrix for S and B for T). Note the right-to-left order: BAx means "apply A to x first, then apply B to the result." This is why matrix multiplication is not commutative -- doing rotation then reflection gives a different result than reflection then rotation.

:::

:::eli20

If $S: \mathbb{R}^n \to \mathbb{R}^m$ has matrix $A$ and $T: \mathbb{R}^m \to \mathbb{R}^p$ has matrix $B$, then:

$$T \circ S \text{ has matrix } BA$$

> **Order matters:** Apply right-to-left. $BA\mathbf{x}$ means apply $A$ first, then $B$.

:::

## Invertible Transformations

:::eli10

A transformation is invertible if you can undo it -- get back to where you started. This is only possible if no information was lost (the kernel is just zero, and the matrix has a nonzero determinant).

:::

:::eli15

A transformation T is invertible (has an inverse T^(-1) that undoes it) if and only if its matrix is invertible. Equivalent conditions: trivial kernel, image equals the full output space, nonzero determinant, and full rank. For square matrices, all these conditions are equivalent -- any one implies all the others.

:::

:::eli20

$T$ is invertible iff $A$ is invertible (square, $\det(A) \neq 0$).

| Condition | Equivalent statements |
|-----------|----------------------|
| Invertible | $\ker(T) = \{\mathbf{0}\}$, $\text{Im}(T) = \mathbb{R}^n$, $\det(A) \neq 0$, rank = $n$ |

:::

## Change of Basis

:::eli10

Change of basis is like describing the same room from a different viewpoint. The transformation does not change, but its matrix looks different depending on which coordinate system you use. Sometimes a different basis makes the matrix much simpler (like diagonal).

:::

:::eli15

The same linear transformation can have different matrix representations depending on the basis used. If P is the change-of-basis matrix (its columns are the new basis vectors), then the transformation matrix in the new basis is P^(-1)AP. This is called a similarity transformation. Similar matrices represent the same transformation in different coordinate systems. Diagonalisation is a special case where the new basis consists of eigenvectors.

:::

:::eli20

If $B = \{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$ is a new basis and $P = [\mathbf{b}_1 | \cdots | \mathbf{b}_n]$:

$$[T]_B = P^{-1}AP$$

This is a **similarity transformation** -- similar matrices represent the same transformation in different bases.

---

<details>
<summary><strong>Practice: Finding Transformation Matrix</strong></summary>

**Q:** Find the matrix for a rotation by $90°$ counterclockwise followed by a reflection over the $x$-axis.

**A:**
Rotation: $R = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$

Reflection: $M = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$

Combined (reflection after rotation): $MR = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ -1 & 0 \end{pmatrix}$

This is reflection over $y = -x$.

</details>

<details>
<summary><strong>Practice: Kernel & Image</strong></summary>

**Q:** Find the kernel and image of $T(\mathbf{x}) = A\mathbf{x}$ where $A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{pmatrix}$.

**A:** Row reduce: $\begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \end{pmatrix}$

- Rank = 1, nullity = 2
- Kernel: $x_1 = -2s - 3t$, $x_2 = s$, $x_3 = t$ → $\ker(T) = \text{span}\{(-2,1,0), (-3,0,1)\}$
- Image: $\text{Im}(T) = \text{span}\{(1,2)\}$ (first column)

</details>

:::
