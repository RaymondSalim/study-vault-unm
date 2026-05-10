---
title: "Linear Transformations"
order: 4
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["linear-algebra", "linear-transformations", "rotation", "scaling", "kernel", "image"]
---

# Linear Transformations

## Definition

A function $T: \mathbb{R}^n \to \mathbb{R}^m$ is a **linear transformation** iff:

1. $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ (additivity)
2. $T(c\mathbf{u}) = cT(\mathbf{u})$ (homogeneity)

Equivalently: $T(c_1\mathbf{u} + c_2\mathbf{v}) = c_1 T(\mathbf{u}) + c_2 T(\mathbf{v})$

## Matrix Representation

Every linear transformation $T: \mathbb{R}^n \to \mathbb{R}^m$ can be written as:

$$T(\mathbf{x}) = A\mathbf{x}$$

where $A \in \mathbb{R}^{m \times n}$ with columns $A = [T(\mathbf{e}_1) | T(\mathbf{e}_2) | \cdots | T(\mathbf{e}_n)]$.

## Standard 2D Transformations

| Transformation | Matrix | Effect |
|---------------|--------|--------|
| Rotation by $\theta$ (CCW) | $\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$ | Rotates vectors |
| Scaling | $\begin{pmatrix} s_x & 0 \\ 0 & s_y \end{pmatrix}$ | Stretches axes |
| Reflection ($x$-axis) | $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ | Flips over $x$-axis |
| Reflection ($y$-axis) | $\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$ | Flips over $y$-axis |
| Reflection ($y=x$) | $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ | Swaps coordinates |
| Shear ($x$-direction) | $\begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$ | Slants horizontally |
| Projection onto $x$-axis | $\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ | Drops $y$-component |

## Kernel (Null Space)

$$\ker(T) = \{\mathbf{x} \in \mathbb{R}^n : T(\mathbf{x}) = \mathbf{0}\} = \text{Null}(A)$$

| Property | Meaning |
|----------|---------|
| $\ker(T) = \{\mathbf{0}\}$ | $T$ is injective (one-to-one) |
| $\dim(\ker(T))$ | Number of free variables = nullity |

## Image (Range / Column Space)

$$\text{Im}(T) = \{T(\mathbf{x}) : \mathbf{x} \in \mathbb{R}^n\} = \text{Col}(A)$$

| Property | Meaning |
|----------|---------|
| $\text{Im}(T) = \mathbb{R}^m$ | $T$ is surjective (onto) |
| $\dim(\text{Im}(T))$ | Rank of $A$ |

## Rank-Nullity Theorem

$$\dim(\ker(T)) + \dim(\text{Im}(T)) = n$$

$$\text{nullity}(A) + \text{rank}(A) = \text{number of columns}$$

## Composition of Transformations

If $S: \mathbb{R}^n \to \mathbb{R}^m$ has matrix $A$ and $T: \mathbb{R}^m \to \mathbb{R}^p$ has matrix $B$, then:

$$T \circ S \text{ has matrix } BA$$

> **Order matters:** Apply right-to-left. $BA\mathbf{x}$ means apply $A$ first, then $B$.

## Invertible Transformations

$T$ is invertible iff $A$ is invertible (square, $\det(A) \neq 0$).

| Condition | Equivalent statements |
|-----------|----------------------|
| Invertible | $\ker(T) = \{\mathbf{0}\}$, $\text{Im}(T) = \mathbb{R}^n$, $\det(A) \neq 0$, rank = $n$ |

## Change of Basis

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
