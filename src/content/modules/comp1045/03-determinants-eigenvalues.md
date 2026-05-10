---
title: "Determinants & Eigenvalues"
order: 3
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["linear-algebra", "determinants", "cofactors", "eigenvalues", "eigenvectors", "diagonalisation"]
---

# Determinants & Eigenvalues

## Determinants

### 2x2 Determinant

$$\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$$

### 3x3 Determinant (Cofactor Expansion)

$$\det(A) = \sum_{j=1}^{n} (-1)^{i+j} a_{ij} M_{ij}$$

where $M_{ij}$ is the minor (determinant of submatrix with row $i$ and column $j$ removed).

### Sarrus' Rule (3x3 shortcut)

$$\det\begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix} = aei + bfg + cdh - ceg - bdi - afh$$

## Properties of Determinants

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

## Cofactor Matrix & Adjugate

| Term | Definition |
|------|-----------|
| Minor $M_{ij}$ | Determinant of matrix with row $i$, col $j$ removed |
| Cofactor $C_{ij}$ | $(-1)^{i+j} M_{ij}$ |
| Cofactor matrix | Matrix of all cofactors |
| Adjugate (adjoint) | $\text{adj}(A) = C^T$ (transpose of cofactor matrix) |

$$A^{-1} = \frac{1}{\det(A)} \text{adj}(A)$$

## Eigenvalues & Eigenvectors

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

## Key Properties

| Property | Statement |
|----------|-----------|
| Trace | $\text{tr}(A) = \sum \lambda_i$ |
| Determinant | $\det(A) = \prod \lambda_i$ |
| Multiplicity | Algebraic $\geq$ geometric multiplicity |
| Symmetric matrices | All eigenvalues are real; eigenvectors are orthogonal |

## Diagonalisation

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
