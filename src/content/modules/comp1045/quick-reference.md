---
title: "Quick Reference"
order: 90
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["reference", "formulas", "cheat-sheet"]
---

# Quick Reference -- All Key Formulas

## Linear Algebra

### Vectors

| Formula | Expression |
|---------|-----------|
| Dot product | $\mathbf{u} \cdot \mathbf{v} = \sum u_i v_i = \|\mathbf{u}\|\|\mathbf{v}\|\cos\theta$ |
| Cross product magnitude | $\|\mathbf{u} \times \mathbf{v}\| = \|\mathbf{u}\|\|\mathbf{v}\|\sin\theta$ |
| Projection | $\text{proj}_\mathbf{v}\mathbf{u} = \frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{v}\cdot\mathbf{v}}\mathbf{v}$ |
| Unit vector | $\hat{\mathbf{u}} = \mathbf{u}/\|\mathbf{u}\|$ |

### Matrices

| Formula | Expression |
|---------|-----------|
| $(AB)^T$ | $B^T A^T$ |
| $(AB)^{-1}$ | $B^{-1}A^{-1}$ |
| 2x2 inverse | $\frac{1}{ad-bc}\begin{pmatrix}d & -b \\ -c & a\end{pmatrix}$ |
| 2x2 determinant | $ad - bc$ |
| $\det(cA)$ for $n\times n$ | $c^n \det(A)$ |
| $\det(AB)$ | $\det(A)\det(B)$ |

### Eigenvalues

| Formula | Expression |
|---------|-----------|
| Characteristic equation | $\det(A - \lambda I) = 0$ |
| Trace | $\text{tr}(A) = \lambda_1 + \lambda_2 + \cdots + \lambda_n$ |
| Determinant | $\det(A) = \lambda_1 \cdot \lambda_2 \cdots \lambda_n$ |
| Diagonalisation | $A = PDP^{-1}$, $A^k = PD^kP^{-1}$ |
| Rank-nullity | $\text{rank}(A) + \text{nullity}(A) = n$ |

### Transformations

| Transform | Matrix |
|-----------|--------|
| Rotation $\theta$ CCW | $\begin{pmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{pmatrix}$ |
| Scale | $\begin{pmatrix}s_x & 0 \\ 0 & s_y\end{pmatrix}$ |
| Reflect $x$-axis | $\begin{pmatrix}1 & 0 \\ 0 & -1\end{pmatrix}$ |

---

## Multivariable Calculus

| Formula | Expression |
|---------|-----------|
| Gradient | $\nabla f = (f_{x_1}, f_{x_2}, \ldots, f_{x_n})$ |
| Directional derivative | $D_\mathbf{u} f = \nabla f \cdot \hat{\mathbf{u}}$ |
| Chain rule | $\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}$ |
| Hessian det (2D) | $H = f_{xx}f_{yy} - f_{xy}^2$ |
| Lagrange condition | $\nabla f = \lambda \nabla g$ |

### Critical Point Classification (2D)

| $H$ | $f_{xx}$ | Type |
|-----|----------|------|
| $> 0$ | $> 0$ | Min |
| $> 0$ | $< 0$ | Max |
| $< 0$ | -- | Saddle |
| $= 0$ | -- | Inconclusive |

---

## Probability & Statistics

### Core Rules

| Rule | Formula |
|------|---------|
| Complement | $P(A') = 1 - P(A)$ |
| Union | $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ |
| Conditional | $P(A|B) = \frac{P(A \cap B)}{P(B)}$ |
| Bayes | $P(B|A) = \frac{P(A|B)P(B)}{P(A)}$ |
| Total probability | $P(A) = \sum P(A|B_i)P(B_i)$ |
| Independence test | $P(A \cap B) = P(A)P(B)$ |

### Distributions

| Distribution | $E[X]$ | $\text{Var}(X)$ | PMF/PDF |
|-------------|---------|-----------------|---------|
| Bernoulli($p$) | $p$ | $p(1-p)$ | $P(X=k) = p^k(1-p)^{1-k}$ |
| Binomial($n,p$) | $np$ | $np(1-p)$ | $\binom{n}{k}p^k(1-p)^{n-k}$ |
| Poisson($\lambda$) | $\lambda$ | $\lambda$ | $\frac{e^{-\lambda}\lambda^k}{k!}$ |
| Geometric($p$) | $1/p$ | $(1-p)/p^2$ | $(1-p)^{k-1}p$ |
| Uniform($a,b$) | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ | $\frac{1}{b-a}$ |
| Exponential($\lambda$) | $1/\lambda$ | $1/\lambda^2$ | $\lambda e^{-\lambda x}$ |
| Normal($\mu,\sigma^2$) | $\mu$ | $\sigma^2$ | $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/2\sigma^2}$ |

### Variance Properties

| Property | Formula |
|----------|---------|
| $\text{Var}(aX+b)$ | $a^2\text{Var}(X)$ |
| $\text{Var}(X+Y)$ independent | $\text{Var}(X) + \text{Var}(Y)$ |
| Shortcut | $\text{Var}(X) = E[X^2] - (E[X])^2$ |

---

## Discrete Mathematics

### Combinatorics

| Type | Formula |
|------|---------|
| Permutations | $P(n,k) = \frac{n!}{(n-k)!}$ |
| Combinations | $\binom{n}{k} = \frac{n!}{k!(n-k)!}$ |
| Binomial theorem | $(x+y)^n = \sum_{k=0}^n \binom{n}{k}x^{n-k}y^k$ |
| Pascal's identity | $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$ |
| Stars and bars | $\binom{n+k-1}{k-1}$ ways to distribute $n$ identical objects into $k$ bins |

### Graph Theory

| Formula | Expression |
|---------|-----------|
| Handshaking | $\sum \deg(v) = 2|E|$ |
| Tree edges | $|E| = |V| - 1$ |
| Euler's formula (planar) | $V - E + F = 2$ |
| Planar bound | $E \leq 3V - 6$ |
| Triangle-free planar | $E \leq 2V - 4$ |
| $\chi(K_n)$ | $n$ |
| $\chi(C_n)$ | 2 (even $n$), 3 (odd $n$) |
| Euler circuit condition | All vertices even degree |
| Euler path condition | Exactly 0 or 2 odd-degree vertices |
