---
title: "Determinants & Eigenvalues"
order: 3
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["linear-algebra", "determinants", "cofactors", "eigenvalues", "eigenvectors", "diagonalisation"]
---

# Determinants & Eigenvalues

## Determinants

:::eli10

A determinant is a single number you calculate from a square matrix. It tells you important things: if it is zero, the matrix has no inverse and the system of equations has no unique solution. For a 2x2 matrix, the determinant is just ad - bc. For bigger matrices, you break them into smaller pieces.

:::

:::eli15

The determinant is a scalar value computed from a square matrix that encodes key information. If det(A) = 0, the matrix is singular (no inverse, dependent columns, no unique solution). For 2x2, it is ad - bc. For larger matrices, use cofactor expansion: pick a row or column, and for each entry multiply it by the determinant of the submatrix with that row and column removed (with alternating signs). Determinants also measure how a transformation scales area/volume.

:::

:::eli20

### 2x2 Determinant

$$\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$$

### 3x3 Determinant (Cofactor Expansion)

$$\det(A) = \sum_{j=1}^{n} (-1)^{i+j} a_{ij} M_{ij}$$

where $M_{ij}$ is the minor (determinant of submatrix with row $i$ and column $j$ removed).

### Sarrus' Rule (3x3 shortcut)

$$\det\begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix} = aei + bfg + cdh - ceg - bdi - afh$$

:::

## Properties of Determinants

:::eli10

Determinants follow predictable rules: swapping two rows flips the sign, multiplying a row by a number multiplies the determinant by that number, and adding rows together does not change it. The determinant of a product equals the product of determinants.

:::

:::eli15

Determinant properties are essential for computation and understanding. Row swaps negate the determinant. Scaling a row by c multiplies det by c. Row addition leaves det unchanged (useful in Gaussian elimination). For products: det(AB) = det(A)det(B). For transposes: det(A^T) = det(A). For scalar multiplication: det(cA) = c^n det(A) for an n x n matrix. Triangular matrices have det equal to the product of diagonal entries.

:::

:::eli20

| Property | Effect |
|----------|--------|
| Row swap | $\det$ changes sign |
| Row scaling by $c$ | $\det$ multiplied by $c$ |
| Row addition | $\det$ unchanged |
| Transpose | $\det(A^T) = \det(A)$ |
| Product | $\det(AB) = \det(A)\det(B)$ |
| Inverse | $\det(A^{-1}) = \frac{1}{\det(A)}$ |
| Scalar mult. | $\det(cA) = c^n \det(A)$ for $n \times n$ |
| Triangular | Product of diagonal entries |

:::

## Cofactor Matrix & Adjugate

:::eli10

The cofactor matrix and adjugate give another way to find the inverse of a matrix. The adjugate is the transpose of the cofactor matrix, and dividing it by the determinant gives you the inverse. This method is useful for small matrices and theoretical understanding.

:::

:::eli15

The cofactor C_ij of entry a_ij is (-1)^(i+j) times the minor M_ij (determinant of the submatrix). The cofactor matrix contains all cofactors. The adjugate (or adjoint) is the transpose of the cofactor matrix. The inverse formula A^(-1) = (1/det(A)) * adj(A) provides a theoretical way to compute inverses, though row reduction is more practical for large matrices.

:::

:::eli20

| Term | Definition |
|------|-----------|
| Minor $M_{ij}$ | Determinant of matrix with row $i$, col $j$ removed |
| Cofactor $C_{ij}$ | $(-1)^{i+j} M_{ij}$ |
| Cofactor matrix | Matrix of all cofactors |
| Adjugate (adjoint) | $\text{adj}(A) = C^T$ (transpose of cofactor matrix) |

$$A^{-1} = \frac{1}{\det(A)} \text{adj}(A)$$

:::

## Eigenvalues & Eigenvectors

:::eli10

An eigenvector is a special arrow that, when a matrix transforms it, only gets stretched or shrunk (not rotated). The amount of stretching is the eigenvalue. If you push a door and it swings on its hinge -- the hinge direction is like an eigenvector because the door's movement does not change that direction.

:::

:::eli15

An eigenvector v of matrix A is a nonzero vector whose direction is unchanged by the transformation: Av = lambda * v, where lambda (the eigenvalue) is the scaling factor. To find eigenvalues, solve det(A - lambda * I) = 0 (the characteristic equation), which gives a polynomial. For each eigenvalue, find eigenvectors by solving (A - lambda * I)v = 0. The trace equals the sum of eigenvalues, and the determinant equals their product.

:::

:::eli20

### Definition

$\lambda$ is an eigenvalue of $A$ if there exists $\mathbf{v} \neq \mathbf{0}$ such that:

$$A\mathbf{v} = \lambda\mathbf{v}$$

$\mathbf{v}$ is the corresponding eigenvector.

### Finding Eigenvalues

Solve the **characteristic equation**:

$$\det(A - \lambda I) = 0$$

This gives a polynomial of degree $n$ (characteristic polynomial).

### Finding Eigenvectors

For each eigenvalue $\lambda_i$, solve:

$$(A - \lambda_i I)\mathbf{v} = \mathbf{0}$$

The solution space is the **eigenspace** $E_{\lambda_i} = \text{Null}(A - \lambda_i I)$.

:::

## Key Properties

:::eli10

There are handy shortcuts with eigenvalues: they always add up to the trace (sum of diagonal entries) and multiply to give the determinant. Symmetric matrices (the kind that look the same when flipped) always have real eigenvalues with perpendicular eigenvectors.

:::

:::eli15

Key eigenvalue properties: the trace of A equals the sum of all eigenvalues, and det(A) equals their product. The algebraic multiplicity (how many times an eigenvalue is a root) is always at least the geometric multiplicity (dimension of the eigenspace). Symmetric real matrices always have real eigenvalues and orthogonal eigenvectors -- this makes them particularly well-behaved and important in applications.

:::

:::eli20

| Property | Statement |
|----------|-----------|
| Trace | $\text{tr}(A) = \sum \lambda_i$ |
| Determinant | $\det(A) = \prod \lambda_i$ |
| Multiplicity | Algebraic $\geq$ geometric multiplicity |
| Symmetric matrices | All eigenvalues are real; eigenvectors are orthogonal |

:::

## Diagonalisation

:::eli10

Diagonalisation is like finding a "simple view" of a matrix. If you can write A = PDP^(-1) where D is diagonal (only numbers on the main diagonal), then computing things like A raised to a large power becomes easy -- you just raise the diagonal numbers to that power.

:::

:::eli15

A matrix A is diagonalisable if it can be written as A = PDP^(-1), where D is diagonal (eigenvalues on the diagonal) and P has the corresponding eigenvectors as columns. This is powerful because A^k = PD^kP^(-1), and raising a diagonal matrix to a power is trivial (just raise each diagonal entry). A matrix is diagonalisable if it has n linearly independent eigenvectors (guaranteed if all eigenvalues are distinct, or if algebraic equals geometric multiplicity for each).

:::

:::eli20

$A$ is diagonalisable if $A = PDP^{-1}$ where:
- $D$ = diagonal matrix of eigenvalues
- $P$ = matrix whose columns are eigenvectors

### Conditions for Diagonalisability

| Condition | Sufficient? |
|-----------|------------|
| $n$ distinct eigenvalues | Yes (always diagonalisable) |
| Algebraic = geometric multiplicity for all $\lambda$ | Yes |
| Symmetric real matrix | Yes (orthogonally diagonalisable) |

### Process

1. Find eigenvalues $\lambda_1, \ldots, \lambda_n$
2. Find eigenvectors $\mathbf{v}_1, \ldots, \mathbf{v}_n$
3. Form $P = [\mathbf{v}_1 | \cdots | \mathbf{v}_n]$
4. Form $D = \text{diag}(\lambda_1, \ldots, \lambda_n)$

### Applications

$$A^k = PD^kP^{-1} \quad \text{where} \quad D^k = \text{diag}(\lambda_1^k, \ldots, \lambda_n^k)$$

---

<details>
<summary><strong>Practice: Finding Eigenvalues</strong></summary>

**Q:** Find eigenvalues of $A = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}$.

**A:** Characteristic equation:
$$\det(A - \lambda I) = \det\begin{pmatrix} 4-\lambda & 1 \\ 2 & 3-\lambda \end{pmatrix} = (4-\lambda)(3-\lambda) - 2 = 0$$

$$\lambda^2 - 7\lambda + 10 = 0 \implies (\lambda - 5)(\lambda - 2) = 0$$

Eigenvalues: $\lambda_1 = 5$, $\lambda_2 = 2$.

Check: $\text{tr}(A) = 7 = 5 + 2$ and $\det(A) = 10 = 5 \times 2$. ✓

</details>

<details>
<summary><strong>Practice: Diagonalisation</strong></summary>

**Q:** Diagonalise $A = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}$.

**A:** From above, $\lambda_1 = 5$, $\lambda_2 = 2$.

For $\lambda_1 = 5$: $(A - 5I)\mathbf{v} = \begin{pmatrix} -1 & 1 \\ 2 & -2 \end{pmatrix}\mathbf{v} = \mathbf{0}$, giving $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

For $\lambda_2 = 2$: $(A - 2I)\mathbf{v} = \begin{pmatrix} 2 & 1 \\ 2 & 1 \end{pmatrix}\mathbf{v} = \mathbf{0}$, giving $\mathbf{v}_2 = \begin{pmatrix} 1 \\ -2 \end{pmatrix}$.

$$P = \begin{pmatrix} 1 & 1 \\ 1 & -2 \end{pmatrix}, \quad D = \begin{pmatrix} 5 & 0 \\ 0 & 2 \end{pmatrix}$$

</details>

<details>
<summary><strong>Practice: 3x3 Determinant</strong></summary>

**Q:** Find $\det\begin{pmatrix} 2 & 1 & 3 \\ 0 & 4 & 5 \\ 1 & 0 & 2 \end{pmatrix}$.

**A:** Expanding along row 1:
$$2\det\begin{pmatrix}4&5\\0&2\end{pmatrix} - 1\det\begin{pmatrix}0&5\\1&2\end{pmatrix} + 3\det\begin{pmatrix}0&4\\1&0\end{pmatrix}$$
$$= 2(8-0) - 1(0-5) + 3(0-4) = 16 + 5 - 12 = 9$$

</details>

:::
