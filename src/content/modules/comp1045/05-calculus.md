---
title: "Multivariable Calculus"
order: 5
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["calculus", "partial-derivatives", "gradient", "optimisation", "lagrange-multipliers"]
---

# Multivariable Calculus

## Partial Derivatives

:::eli10

A partial derivative is like measuring how steep a hill is in one specific direction. If you are on a hillside, you could measure steepness going north (while ignoring east-west changes) or going east (while ignoring north-south changes). Each direction gives you a different partial derivative.

:::

:::eli15

For functions of multiple variables, a partial derivative measures the rate of change with respect to one variable while holding all others constant. For f(x, y), the partial with respect to x treats y as a constant and differentiates normally with respect to x. Second-order partials and mixed partials exist (and by Clairaut's theorem, the order of mixed partials does not matter if they are continuous).

:::

:::eli20

For $f(x, y)$, differentiate with respect to one variable while treating others as constants.

$$\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}$$

| Notation | Meaning |
|----------|---------|
| $f_x$ or $\frac{\partial f}{\partial x}$ | Partial derivative w.r.t. $x$ |
| $f_{xx}$ or $\frac{\partial^2 f}{\partial x^2}$ | Second partial w.r.t. $x$ |
| $f_{xy}$ or $\frac{\partial^2 f}{\partial y \partial x}$ | Mixed partial |

> **Clairaut's Theorem:** If $f_{xy}$ and $f_{yx}$ are continuous, then $f_{xy} = f_{yx}$.

:::

## Gradient

:::eli10

The gradient is a vector that points "uphill" -- in the direction where the function increases fastest. Its length tells you how steep that steepest direction is. If the gradient is zero, you are at a flat point (a peak, valley, or saddle).

:::

:::eli15

The gradient of a function f is a vector of all partial derivatives. It points in the direction of steepest ascent, and its magnitude is the maximum rate of increase. The gradient is perpendicular to level curves (contour lines). Where the gradient is zero, you have a critical point -- possibly a local minimum, maximum, or saddle point. The gradient is fundamental to optimization algorithms like gradient descent.

:::

:::eli20

$$\nabla f = \left(\frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \ldots, \frac{\partial f}{\partial x_n}\right)$$

| Property | Meaning |
|----------|---------|
| Direction | Points in direction of steepest ascent |
| Magnitude | Rate of maximum increase |
| Level curves | $\nabla f$ is perpendicular to level curves |
| Zero gradient | Critical point |

:::

## Directional Derivative

:::eli10

The directional derivative tells you the slope of a function in any direction you choose -- not just along the x or y axes. You compute it by taking the dot product of the gradient with the direction you want.

:::

:::eli15

The directional derivative gives the rate of change of f in any specified direction (given by a unit vector u). It is computed as the dot product of the gradient with u. The maximum directional derivative occurs in the gradient direction (equals the gradient magnitude), and the minimum occurs in the opposite direction. Perpendicular to the gradient, the directional derivative is zero (along level curves).

:::

:::eli20

$$D_{\mathbf{u}} f = \nabla f \cdot \hat{\mathbf{u}}$$

Rate of change of $f$ in direction $\hat{\mathbf{u}}$ (unit vector).

:::

## Chain Rule (Multivariable)

:::eli10

The chain rule for multiple variables lets you find how fast something changes when your variables are themselves changing. If z depends on x and y, and x and y both depend on time t, the chain rule tells you how fast z changes with time by combining all the pathways of influence.

:::

:::eli15

The multivariable chain rule extends the single-variable chain rule. If z = f(x, y) where x and y depend on other variables (say t), then dz/dt sums up contributions from each path: (partial f/partial x)(dx/dt) + (partial f/partial y)(dy/dt). For functions of multiple intermediate variables, you sum over all paths from the output to the variable you are differentiating with respect to.

:::

:::eli20

If $z = f(x, y)$ where $x = x(t)$, $y = y(t)$:

$$\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}$$

If $z = f(x, y)$ where $x = x(s, t)$, $y = y(s, t)$:

$$\frac{\partial z}{\partial s} = \frac{\partial f}{\partial x}\frac{\partial x}{\partial s} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial s}$$

:::

## Optimisation

:::eli10

Finding the highest or lowest point of a multivariable function is like finding the top of a hill or the bottom of a valley. First find where the surface is flat (gradient equals zero), then check whether it is a peak, valley, or saddle point using second derivatives.

:::

:::eli15

To optimize a multivariable function: first find critical points by setting the gradient to zero (all partial derivatives = 0). Then classify each critical point using the second derivative test. Compute the Hessian determinant H = f_xx * f_yy - (f_xy)^2 at the critical point. If H > 0 and f_xx > 0: local minimum. If H > 0 and f_xx < 0: local maximum. If H < 0: saddle point. If H = 0: inconclusive.

:::

:::eli20

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

:::

## Lagrange Multipliers

:::eli10

Lagrange multipliers help you find the best value of a function when you are restricted to a certain path or surface. Imagine wanting to find the highest point on a circular track -- you cannot just go anywhere, you must stay on the track. Lagrange multipliers solve this constrained problem.

:::

:::eli15

Lagrange multipliers solve constrained optimization: optimize f(x,y) subject to a constraint g(x,y) = 0. The key insight is that at the optimum, the gradient of f must be parallel to the gradient of g (otherwise you could improve f while staying on the constraint). This gives the system: grad(f) = lambda * grad(g) plus the constraint equation. Lambda measures how sensitive the optimal value is to relaxing the constraint. Multiple constraints use multiple multipliers.

:::

:::eli20

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

:::
