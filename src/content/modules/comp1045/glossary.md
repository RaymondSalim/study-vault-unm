---
title: "Glossary"
order: 95
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["glossary", "definitions", "terminology"]
---

# Glossary

## Linear Algebra

| Term | Definition |
|------|-----------|
| **Adjugate** | Transpose of the cofactor matrix; $A^{-1} = \text{adj}(A)/\det(A)$ |
| **Basis** | A linearly independent set that spans the vector space |
| **Characteristic polynomial** | $\det(A - \lambda I)$; roots are eigenvalues |
| **Cofactor** | $C_{ij} = (-1)^{i+j} M_{ij}$ where $M_{ij}$ is the minor |
| **Column space** | Span of the columns of a matrix; equals the image of the transformation |
| **Determinant** | Scalar measuring signed volume change; zero iff singular |
| **Diagonal matrix** | All off-diagonal entries are zero |
| **Diagonalisable** | $A = PDP^{-1}$ for diagonal $D$ |
| **Dimension** | Number of vectors in any basis of the space |
| **Dot product** | $\mathbf{u} \cdot \mathbf{v} = \sum u_i v_i$; measures alignment |
| **Eigenvalue** | Scalar $\lambda$ such that $A\mathbf{v} = \lambda\mathbf{v}$ for some $\mathbf{v} \neq 0$ |
| **Eigenvector** | Nonzero vector $\mathbf{v}$ satisfying $A\mathbf{v} = \lambda\mathbf{v}$ |
| **Elementary row operation** | Row swap, row scaling, or row addition |
| **Full rank** | Rank equals the smaller dimension of the matrix |
| **Gaussian elimination** | Algorithm to reduce a matrix to row echelon form |
| **Homogeneous system** | $A\mathbf{x} = \mathbf{0}$; always has trivial solution |
| **Identity matrix** | Square matrix with 1s on diagonal, 0s elsewhere |
| **Image (range)** | Set of all outputs of a linear transformation |
| **Inverse matrix** | $A^{-1}$ such that $AA^{-1} = I$; exists iff $\det(A) \neq 0$ |
| **Kernel (null space)** | Set of vectors mapped to $\mathbf{0}$ |
| **Linear combination** | $c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_k\mathbf{v}_k$ |
| **Linear independence** | No vector in the set is a linear combination of the others |
| **Linear transformation** | Function preserving addition and scalar multiplication |
| **Minor** | Determinant of submatrix obtained by deleting row $i$ and column $j$ |
| **Null space** | $\{\mathbf{x} : A\mathbf{x} = \mathbf{0}\}$; dimension = nullity |
| **Nullity** | Dimension of the null space |
| **Orthogonal** | Perpendicular; $\mathbf{u} \cdot \mathbf{v} = 0$ |
| **Pivot** | Leading nonzero entry in a row of REF |
| **Rank** | Number of pivots; dimension of column space |
| **Row echelon form (REF)** | Upper triangular with zero rows at bottom |
| **RREF** | REF with pivots = 1 and zeros above each pivot |
| **Similar matrices** | $B = P^{-1}AP$; represent same transformation in different bases |
| **Singular** | Not invertible; $\det = 0$ |
| **Span** | Set of all linear combinations of given vectors |
| **Symmetric matrix** | $A = A^T$ |
| **Trace** | Sum of diagonal entries; equals sum of eigenvalues |
| **Transpose** | $(A^T)_{ij} = A_{ji}$; rows become columns |

## Multivariable Calculus

| Term | Definition |
|------|-----------|
| **Chain rule** | Derivative of composition; sum over all dependency paths |
| **Critical point** | Point where $\nabla f = \mathbf{0}$ |
| **Directional derivative** | Rate of change in a given direction; $D_\mathbf{u}f = \nabla f \cdot \hat{\mathbf{u}}$ |
| **Gradient** | Vector of all partial derivatives; points toward steepest ascent |
| **Hessian** | Matrix of second partial derivatives |
| **Lagrange multiplier** | $\lambda$ in $\nabla f = \lambda \nabla g$; sensitivity of optimum to constraint |
| **Level curve/surface** | Set where $f = c$ (constant) |
| **Local maximum** | $f(a,b) \geq f(x,y)$ for all $(x,y)$ near $(a,b)$ |
| **Local minimum** | $f(a,b) \leq f(x,y)$ for all $(x,y)$ near $(a,b)$ |
| **Partial derivative** | Derivative with respect to one variable, others held constant |
| **Saddle point** | Critical point that is neither max nor min |

## Probability & Statistics

| Term | Definition |
|------|-----------|
| **Bayes' theorem** | $P(B|A) = P(A|B)P(B)/P(A)$; updates beliefs with evidence |
| **Bernoulli trial** | Experiment with exactly two outcomes (success/failure) |
| **CDF** | Cumulative distribution function; $F(x) = P(X \leq x)$ |
| **Conditional probability** | $P(A|B) = P(A \cap B)/P(B)$ |
| **Continuous random variable** | Takes values in an interval; described by PDF |
| **Discrete random variable** | Takes countable values; described by PMF |
| **Event** | Subset of the sample space |
| **Expectation** | Long-run average; $E[X] = \sum x P(X=x)$ |
| **Hypothesis test** | Procedure to decide between $H_0$ and $H_1$ using data |
| **Independence** | $P(A \cap B) = P(A)P(B)$ |
| **Mutually exclusive** | $A \cap B = \emptyset$; cannot both occur |
| **Normal distribution** | Bell-shaped; parameterised by $\mu$ and $\sigma^2$ |
| **p-value** | Probability of observing data at least as extreme as observed, given $H_0$ |
| **PDF** | Probability density function; integrates to 1 |
| **PMF** | Probability mass function; sums to 1 |
| **Posterior** | Updated probability after observing evidence |
| **Prior** | Initial probability before evidence |
| **Sample space** | Set of all possible outcomes $\Omega$ |
| **Significance level** | $\alpha$; threshold for rejecting $H_0$ (usually 0.05) |
| **Standard deviation** | $\sigma = \sqrt{\text{Var}(X)}$ |
| **Type I error** | Rejecting true $H_0$ (false positive) |
| **Type II error** | Failing to reject false $H_0$ (false negative) |
| **Variance** | $\text{Var}(X) = E[(X-\mu)^2]$; measures spread |

## Graph Theory

| Term | Definition |
|------|-----------|
| **Adjacent** | Two vertices connected by an edge |
| **Bipartite** | Vertices can be 2-coloured with no monochromatic edge |
| **Chromatic number** | $\chi(G)$; minimum colours for proper colouring |
| **Clique** | Complete subgraph |
| **Complete graph** | $K_n$; edge between every pair of vertices |
| **Connected** | Path exists between every pair of vertices |
| **Cycle** | Closed path with no repeated vertices (except start = end) |
| **Degree** | Number of edges incident to a vertex |
| **Euler circuit** | Closed walk using every edge exactly once |
| **Euler path** | Walk using every edge exactly once (not necessarily closed) |
| **Face** | Region bounded by edges in a planar embedding (including outer face) |
| **Hamilton circuit** | Cycle visiting every vertex exactly once |
| **Hamilton path** | Path visiting every vertex exactly once |
| **Isomorphic** | Same structure up to vertex relabelling |
| **Leaf** | Vertex of degree 1 |
| **Planar** | Can be drawn without edge crossings |
| **Path** | Sequence of distinct vertices connected by edges |
| **Spanning tree** | Tree subgraph including all vertices |
| **Tree** | Connected acyclic graph |
| **Walk** | Sequence of vertices where consecutive pairs are adjacent |
