---
title: "Exam Traps"
order: 91
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["exam-prep", "common-mistakes", "pitfalls"]
---

# Exam Traps -- Common Mistakes

## Linear Algebra

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| Assuming $AB = BA$ | Matrix multiplication is NOT commutative | Always check order; $AB \neq BA$ in general |
| $(AB)^{-1} = A^{-1}B^{-1}$ | Order reverses for inverses | $(AB)^{-1} = B^{-1}A^{-1}$ |
| $(AB)^T = A^T B^T$ | Order reverses for transposes | $(AB)^T = B^T A^T$ |
| Forgetting $\det(cA) = c^n\det(A)$ | Common to write $c \cdot \det(A)$ | Remember the exponent $n$ (matrix size) |
| $\det(A+B) = \det(A) + \det(B)$ | Determinant is NOT linear in matrices | No shortcut -- must compute directly |
| Row reducing and claiming $\det$ = product of diagonal | Row operations change the determinant | Track sign flips and scaling factors |
| Eigenvector $= \mathbf{0}$ | By definition, eigenvectors are nonzero | Null space solution minus the zero vector |
| Wrong eigenspace dimension | Confusing algebraic and geometric multiplicity | Geometric multiplicity = dim(null space of $A - \lambda I$) |

## Gaussian Elimination

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| Dividing by zero pivot | Pivot might be zero | Swap rows to get nonzero pivot first |
| Forgetting free variables | Not every column has a pivot | Identify pivot vs. free columns after REF |
| Wrong back-substitution | Arithmetic errors in multi-step | Check solution by substituting back into original |
| Claiming "no solution" too early | A zero row in REF isn't inconsistent | Inconsistent only if $[0 \cdots 0 \mid b]$ with $b \neq 0$ |

## Calculus

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| $\frac{\partial}{\partial x}(xy^2) = y^2$ ... forgetting product rule | Sometimes product rule IS needed | Check if both variables appear in a product |
| $H > 0$ implies minimum | Only with $f_{xx} > 0$ | Must also check sign of $f_{xx}$ |
| Forgetting constraint in Lagrange | Found critical points of $\nabla f = \lambda \nabla g$ but didn't verify $g = 0$ | Always substitute back into constraint |
| Gradient = 0 means global optimum | Could be local or saddle | Check boundary, use second derivative test |
| Wrong chain rule application | Missing a term | Draw dependency diagram; sum over ALL paths |

## Probability

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| $P(A \cup B) = P(A) + P(B)$ | Only works for mutually exclusive events | General: subtract $P(A \cap B)$ |
| Confusing $P(A|B)$ with $P(B|A)$ | "Prosecutor's fallacy" | Use Bayes' theorem to flip conditional |
| Independence $\implies$ mutually exclusive | Opposite is true (for non-trivial events) | If independent: $P(A \cap B) = P(A)P(B) > 0$ |
| $\text{Var}(X+Y) = \text{Var}(X) + \text{Var}(Y)$ | Only for independent variables | If dependent: add $2\text{Cov}(X,Y)$ |
| Poisson: wrong $\lambda$ for different time interval | $\lambda$ must match the interval | Scale: if 3/min, then 6 for 2 minutes |
| Normal: forgetting to standardise | Can't look up arbitrary $\mu, \sigma$ | Always convert: $Z = (X-\mu)/\sigma$ |
| Binomial with dependent trials | Binomial assumes independence | Use different model or conditional probability |

## Graph Theory

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| Euler path vs. Hamilton path | Euler = every **edge**; Hamilton = every **vertex** | Remember: Euler ↔ edges, Hamilton ↔ vertices |
| Applying Euler's formula to non-planar graph | $V - E + F = 2$ only for connected planar graphs | First verify planarity |
| Forgetting outer face | Students count only interior faces | Euler's formula includes the unbounded face |
| $K_4$ is non-planar | $K_4$ IS planar | Non-planar starts at $K_5$ and $K_{3,3}$ |
| Chromatic number = max degree | Just an upper bound | $\chi(G) \leq \Delta(G) + 1$ but can be less |
| Directed graph Euler condition | Not same as undirected | Need in-degree = out-degree at every vertex |

## General Exam Strategies

| Strategy | Details |
|----------|---------|
| Verify dimensions | Matrix mult: $(m \times n)(n \times p) = m \times p$ |
| Sanity-check eigenvalues | Sum = trace, product = determinant |
| Check boundary cases | $n=0$, $n=1$, empty set |
| Units/scaling | Does answer scale correctly if you double input? |
| Substitute back | Always verify solutions in original equation |
| Read the question | "Find ALL solutions" vs. "find A solution" |
