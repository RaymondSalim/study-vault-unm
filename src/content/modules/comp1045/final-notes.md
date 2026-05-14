---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: LINEAR ALGEBRA

### Vectors

| Operation | Formula |
|-----------|---------|
| Addition | $\mathbf{u}+\mathbf{v} = (u_1+v_1,\ldots,u_n+v_n)$ |
| Scalar mult | $c\mathbf{u} = (cu_1,\ldots,cu_n)$ |
| Magnitude | $\|\mathbf{u}\| = \sqrt{u_1^2+\cdots+u_n^2}$ |
| Unit vector | $\hat{\mathbf{u}} = \mathbf{u}/\|\mathbf{u}\|$ |
| Dot product | $\mathbf{u}\cdot\mathbf{v} = \sum u_iv_i = \|\mathbf{u}\|\|\mathbf{v}\|\cos\theta$ |
| Projection | $\text{proj}_\mathbf{v}\mathbf{u} = \frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{v}\cdot\mathbf{v}}\mathbf{v}$ |
| Cross product | $\mathbf{u}\times\mathbf{v} = \det\begin{pmatrix}\mathbf{i}&\mathbf{j}&\mathbf{k}\\u_1&u_2&u_3\\v_1&v_2&v_3\end{pmatrix}$ |

**Orthogonal:** $\mathbf{u}\cdot\mathbf{v}=0$ &nbsp; **Parallel:** $\mathbf{u}\times\mathbf{v}=\mathbf{0}$ &nbsp; **Cross magnitude:** $\|\mathbf{u}\|\|\mathbf{v}\|\sin\theta$ (area of parallelogram)

---

### Matrix Operations

$(AB)_{ij} = \sum_k a_{ik}b_{kj}$ &nbsp; Dimensions: $(m\times n)(n\times p) = m\times p$

**NOT commutative:** $AB\neq BA$ in general

| Property | Formula |
|----------|---------|
| $(AB)^T$ | $B^TA^T$ |
| $(AB)^{-1}$ | $B^{-1}A^{-1}$ |
| $(cA)^{-1}$ | $\frac{1}{c}A^{-1}$ |

**2x2 Inverse:** $A=\begin{pmatrix}a&b\\c&d\end{pmatrix} \Rightarrow A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ &nbsp; Exists iff $\det(A)\neq 0$

**General Inverse:** Row reduce $[A|I] \to [I|A^{-1}]$

---

### Determinants

**2x2:** $\det\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad-bc$

**3x3 (Sarrus):** $\det = aei+bfg+cdh-ceg-bdi-afh$

**Cofactor expansion:** $\det(A) = \sum_j (-1)^{i+j}a_{ij}M_{ij}$

| Property | Effect on det |
|----------|--------------|
| Row swap | $\times(-1)$ |
| Scale row by $c$ | $\times c$ |
| Row addition | No change |
| $\det(AB)$ | $\det(A)\det(B)$ |
| $\det(cA)$ for $n\times n$ | $c^n\det(A)$ |
| Triangular | Product of diagonal |

**Adjugate method:** $A^{-1} = \frac{1}{\det(A)}\text{adj}(A)$ where $\text{adj}(A)=C^T$

---

### Gaussian Elimination & Linear Systems

$A\mathbf{x}=\mathbf{b}$: Augment $[A|\mathbf{b}]$, row reduce to REF/RREF

| # Solutions | Condition |
|-------------|-----------|
| Unique | $\text{rank}(A) = \text{rank}([A|\mathbf{b}]) = n$ |
| Infinite | $\text{rank}(A) = \text{rank}([A|\mathbf{b}]) < n$ |
| None | $\text{rank}(A) < \text{rank}([A|\mathbf{b}])$ |

**Rank-Nullity:** $\text{rank}(A)+\text{nullity}(A)=n$ (number of columns)

**Linear independence:** $c_1\mathbf{v}_1+\cdots+c_k\mathbf{v}_k=\mathbf{0} \Rightarrow$ all $c_i=0$. Test: row reduce, count pivots = $k$? Or $\det\neq 0$ (square case)

---

### Eigenvalues & Eigenvectors

$A\mathbf{v}=\lambda\mathbf{v}$ where $\mathbf{v}\neq\mathbf{0}$

1. Solve $\det(A-\lambda I)=0$ (characteristic polynomial) for eigenvalues $\lambda$
2. For each $\lambda$: solve $(A-\lambda I)\mathbf{v}=\mathbf{0}$ for eigenvectors

**Checks:** $\text{tr}(A)=\sum\lambda_i$, &nbsp; $\det(A)=\prod\lambda_i$

**Diagonalisation:** $A=PDP^{-1}$ where $D=\text{diag}(\lambda_1,\ldots,\lambda_n)$, $P=[\mathbf{v}_1|\cdots|\mathbf{v}_n]$

**Power:** $A^k = PD^kP^{-1}$

Diagonalisable if: $n$ distinct eigenvalues, OR algebraic = geometric multiplicity for all $\lambda$

---

### Linear Transformations

$T:\mathbb{R}^n\to\mathbb{R}^m$ is linear iff $T(c_1\mathbf{u}+c_2\mathbf{v})=c_1T(\mathbf{u})+c_2T(\mathbf{v})$

Matrix: $A=[T(\mathbf{e}_1)|T(\mathbf{e}_2)|\cdots|T(\mathbf{e}_n)]$

| Transform | Matrix |
|-----------|--------|
| Rotation $\theta$ CCW | $\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}$ |
| Scale | $\begin{pmatrix}s_x&0\\0&s_y\end{pmatrix}$ |
| Reflect $x$-axis | $\begin{pmatrix}1&0\\0&-1\end{pmatrix}$ |
| Reflect $y=x$ | $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ |
| Shear | $\begin{pmatrix}1&k\\0&1\end{pmatrix}$ |

$\ker(T)=\{\mathbf{x}:T(\mathbf{x})=\mathbf{0}\}$, &nbsp; $\text{Im}(T)=\text{Col}(A)$

**Composition:** $T\circ S$ has matrix $BA$ (apply $A$ first, then $B$)

**Change of basis:** $[T]_B = P^{-1}AP$

---

## SIDE 2: CALCULUS, PROBABILITY & GRAPHS

### Multivariable Calculus

**Partial derivatives:** Differentiate w.r.t. one variable, treat others as constants. $f_{xy}=f_{yx}$ (Clairaut)

**Gradient:** $\nabla f = (f_x, f_y, \ldots)$ — direction of steepest ascent, $\perp$ to level curves

**Directional derivative:** $D_{\hat{\mathbf{u}}}f = \nabla f\cdot\hat{\mathbf{u}}$

**Chain rule:** $\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt}+\frac{\partial f}{\partial y}\frac{dy}{dt}$

**Critical points:** Solve $\nabla f=\mathbf{0}$. Classify with Hessian:

$$H = f_{xx}f_{yy}-(f_{xy})^2$$

| Condition | Type |
|-----------|------|
| $H>0$, $f_{xx}>0$ | Local min |
| $H>0$, $f_{xx}<0$ | Local max |
| $H<0$ | Saddle |
| $H=0$ | Inconclusive |

**Lagrange multipliers:** Optimise $f$ subject to $g=0$: Solve $\nabla f=\lambda\nabla g$ and $g(x,y)=0$

---

### Probability

**Axioms:** $P(A)\geq 0$, $P(\Omega)=1$, $P(A\cup B)=P(A)+P(B)$ if disjoint

| Rule | Formula |
|------|---------|
| Complement | $P(A')=1-P(A)$ |
| Union | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ |
| Conditional | $P(A|B)=\frac{P(A\cap B)}{P(B)}$ |
| Independence | $P(A\cap B)=P(A)P(B)$ |
| Total probability | $P(A)=\sum P(A|B_i)P(B_i)$ |

**Bayes' Theorem:** $P(B|A) = \frac{P(A|B)\cdot P(B)}{P(A|B)\cdot P(B)+P(A|B')\cdot P(B')}$

**Counting:** Permutations $n!$, &nbsp; $k$-perm $\frac{n!}{(n-k)!}$, &nbsp; Combinations $\binom{n}{k}=\frac{n!}{k!(n-k)!}$

---

### Distributions

| Distribution | PMF/PDF | $E[X]$ | $\text{Var}(X)$ |
|-------------|---------|--------|-----------------|
| Bernoulli($p$) | $P(1)=p$ | $p$ | $p(1-p)$ |
| Binomial($n,p$) | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Poisson($\lambda$) | $\frac{e^{-\lambda}\lambda^k}{k!}$ | $\lambda$ | $\lambda$ |
| Geometric($p$) | $(1-p)^{k-1}p$ | $1/p$ | $(1-p)/p^2$ |
| Uniform($a,b$) | $\frac{1}{b-a}$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Exponential($\lambda$) | $\lambda e^{-\lambda x}$ | $1/\lambda$ | $1/\lambda^2$ |
| Normal($\mu,\sigma^2$) | $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ |

**Properties:** $E[aX+b]=aE[X]+b$, &nbsp; $\text{Var}(aX+b)=a^2\text{Var}(X)$, &nbsp; $E[X+Y]=E[X]+E[Y]$ always

**Independent:** $\text{Var}(X+Y)=\text{Var}(X)+\text{Var}(Y)$

**Normal standardise:** $Z=\frac{X-\mu}{\sigma}\sim N(0,1)$ &nbsp; 68-95-99.7 rule: $\mu\pm 1\sigma/2\sigma/3\sigma$

**Poisson approx:** Binomial$(n,p)$ with large $n$, small $p$ $\to$ Poisson$(np)$

**Exponential:** Memoryless: $P(X>s+t|X>s)=P(X>t)$, &nbsp; CDF: $F(x)=1-e^{-\lambda x}$

---

### Graph Theory

**Handshaking:** $\sum\deg(v)=2|E|$ &nbsp; (number of odd-degree vertices is even)

| Graph | Properties |
|-------|-----------|
| $K_n$ | $|E|=\binom{n}{2}$, $\chi=n$ |
| Bipartite | $\chi=2$ |
| Tree ($n$ vertices) | $|E|=n-1$, connected, acyclic, unique paths |
| $C_n$ | $\chi=2$ (even), $\chi=3$ (odd) |

**Euler:** Circuit iff all even degree. Path iff exactly 0 or 2 odd-degree vertices.

**Hamilton:** Dirac: $\deg(v)\geq n/2 \Rightarrow$ Hamiltonian circuit. Ore: $\deg(u)+\deg(v)\geq n$ for non-adjacent $\Rightarrow$ Hamiltonian.

**Planar:** $V-E+F=2$ (Euler's formula). Bounds: $E\leq 3V-6$ (simple), $E\leq 2V-4$ (triangle-free). $K_5$, $K_{3,3}$ non-planar (Kuratowski).

**Chromatic number:** $\omega(G)\leq\chi(G)\leq\Delta(G)+1$

**Representation:** Adjacency matrix $O(V^2)$ space, $O(1)$ lookup. Adjacency list $O(V+E)$ space.

---

### Key Traps

- $AB\neq BA$; &nbsp; $(AB)^{-1}=B^{-1}A^{-1}$; &nbsp; $(AB)^T=B^TA^T$
- $\det(cA)=c^n\det(A)$ NOT $c\cdot\det(A)$
- $\det(A+B)\neq\det(A)+\det(B)$
- Eigenvectors are nonzero by definition
- $P(A\cup B)\neq P(A)+P(B)$ unless disjoint
- Independent $\neq$ mutually exclusive
- Poisson $\lambda$ must match time interval
- Euler = edges; Hamilton = vertices
- $K_4$ IS planar; non-planar starts at $K_5$, $K_{3,3}$
- Don't forget outer face in Euler's formula
