---
title: "Multivariable Calculus"
order: 5
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["calculus", "partial-derivatives", "gradient", "optimisation", "lagrange-multipliers"]
---

# Multivariable Calculus

## Partial Derivatives

For $f(x, y)$, differentiate with respect to one variable while treating others as constants.

$$\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}$$

| Notation | Meaning |
|----------|---------|
| $f_x$ or $\frac{\partial f}{\partial x}$ | Partial derivative w.r.t. $x$ |
| $f_{xx}$ or $\frac{\partial^2 f}{\partial x^2}$ | Second partial w.r.t. $x$ |
| $f_{xy}$ or $\frac{\partial^2 f}{\partial y \partial x}$ | Mixed partial |

> **Clairaut's Theorem:** If $f_{xy}$ and $f_{yx}$ are continuous, then $f_{xy} = f_{yx}$.

## Gradient

$$\nabla f = \left(\frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \ldots, \frac{\partial f}{\partial x_n}\right)$$

| Property | Meaning |
|----------|---------|
| Direction | Points in direction of steepest ascent |
| Magnitude | Rate of maximum increase |
| Level curves | $\nabla f$ is perpendicular to level curves |
| Zero gradient | Critical point |

## Directional Derivative

$$D_{\mathbf{u}} f = \nabla f \cdot \hat{\mathbf{u}}$$

Rate of change of $f$ in direction $\hat{\mathbf{u}}$ (unit vector).

## Chain Rule (Multivariable)

If $z = f(x, y)$ where $x = x(t)$, $y = y(t)$:

$$\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}$$

If $z = f(x, y)$ where $x = x(s, t)$, $y = y(s, t)$:

$$\frac{\partial z}{\partial s} = \frac{\partial f}{\partial x}\frac{\partial x}{\partial s} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial s}$$

## Optimisation

### Critical Points

Solve $\nabla f = \mathbf{0}$ (all partial derivatives equal zero).

### Second Derivative Test (2 variables)

Compute the **Hessian determinant** at critical point $(a, b)$:

$$H = f_{xx}(a,b) \cdot f_{yy}(a,b) - [f_{xy}(a,b)]^2$$

| Condition | Classification |
|-----------|---------------|
| $H > 0$ and $f_{xx} > 0$ | Local minimum |
| $H > 0$ and $f_{xx} < 0$ | Local maximum |
| $H < 0$ | Saddle point |
| $H = 0$ | Inconclusive |

### Hessian Matrix

$$\mathbf{H}(f) = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}$$

For $n$ variables: $(\mathbf{H})_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$

## Lagrange Multipliers

**Problem:** Optimise $f(x,y)$ subject to constraint $g(x,y) = 0$.

**Method:** Solve the system:

$$\nabla f = \lambda \nabla g \quad \text{and} \quad g(x,y) = 0$$

This gives:
$$\begin{cases} f_x = \lambda g_x \\ f_y = \lambda g_y \\ g(x,y) = 0 \end{cases}$$

### Multiple Constraints

For constraints $g_1 = 0, g_2 = 0$:

$$\nabla f = \lambda_1 \nabla g_1 + \lambda_2 \nabla g_2$$

### Interpretation

$\lambda$ measures the sensitivity of the optimal value to changes in the constraint.

---

<details>
<summary><strong>Practice: Gradient & Critical Points</strong></summary>

**Q:** Find and classify critical points of $f(x,y) = x^2 + y^2 - 4x - 6y + 13$.

**A:**
- $f_x = 2x - 4 = 0 \implies x = 2$
- $f_y = 2y - 6 = 0 \implies y = 3$
- Critical point: $(2, 3)$

Second derivative test:
- $f_{xx} = 2$, $f_{yy} = 2$, $f_{xy} = 0$
- $H = 2(2) - 0^2 = 4 > 0$ and $f_{xx} = 2 > 0$

Classification: **Local minimum** at $(2, 3)$ with $f(2,3) = 0$.

</details>

<details>
<summary><strong>Practice: Lagrange Multipliers</strong></summary>

**Q:** Find the maximum of $f(x, y) = xy$ subject to $x + y = 10$.

**A:** Constraint: $g(x, y) = x + y - 10 = 0$.

$\nabla f = (y, x)$, $\nabla g = (1, 1)$.

System:
- $y = \lambda$
- $x = \lambda$
- $x + y = 10$

From first two: $x = y$. Substituting: $2x = 10 \implies x = y = 5$.

Maximum value: $f(5, 5) = 25$.

</details>

<details>
<summary><strong>Practice: Chain Rule</strong></summary>

**Q:** Let $f(x, y) = x^2y$ where $x = \cos t$, $y = \sin t$. Find $\frac{df}{dt}$.

**A:**
$$\frac{df}{dt} = 2xy \cdot (-\sin t) + x^2 \cdot \cos t = 2\cos t \sin t(-\sin t) + \cos^2 t \cdot \cos t$$
$$= -2\cos t \sin^2 t + \cos^3 t$$

</details>
