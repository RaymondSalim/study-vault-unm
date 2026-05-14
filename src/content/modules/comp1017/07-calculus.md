---
title: "Calculus"
order: 7
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["calculus", "differentiation", "integration", "chain rule", "product rule"]
---

# Calculus

## Differentiation Rules

:::eli10

Differentiation tells you how fast something is changing. If you are on a roller coaster, the derivative tells you how steep the track is at any point. There are rules for finding derivatives of different kinds of expressions, like products, quotients, and chains of functions.

:::

:::eli15

Differentiation computes the instantaneous rate of change of a function. The basic rules cover how to differentiate constants, powers, sums, products, quotients, and compositions of functions. The chain rule is the most important: it handles nested functions by multiplying the outer derivative by the inner derivative. These rules combine to let you differentiate any elementary function.

:::

:::eli20

| Rule | Formula |
|------|---------|
| Constant | $\frac{d}{dx}[c] = 0$ |
| Power | $\frac{d}{dx}[x^n] = nx^{n-1}$ |
| Constant multiple | $\frac{d}{dx}[cf(x)] = cf'(x)$ |
| Sum | $\frac{d}{dx}[f+g] = f' + g'$ |
| Product | $\frac{d}{dx}[fg] = f'g + fg'$ |
| Quotient | $\frac{d}{dx}\left[\frac{f}{g}\right] = \frac{f'g - fg'}{g^2}$ |
| Chain | $\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$ |

:::

## Common Derivatives

:::eli10

Some functions have derivatives that are good to memorise, like how the derivative of x-squared is 2x, and the derivative of e^x is just e^x again. These are the building blocks you use over and over.

:::

:::eli15

These are the standard derivatives you should know by heart. They serve as building blocks: any more complex derivative can be computed by combining these with the differentiation rules (chain, product, quotient). Notably, e^x is its own derivative, and trigonometric functions cycle through each other.

:::

:::eli20

| $f(x)$ | $f'(x)$ |
|---------|----------|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $\frac{1}{x}$ |
| $a^x$ | $a^x \ln a$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |

:::

## Applications of Derivatives

:::eli10

You can use derivatives to find the highest and lowest points on a curve. At these special points, the slope is zero (the curve is flat for a moment). The second derivative tells you whether it is a hilltop (maximum) or a valley bottom (minimum).

:::

:::eli15

Derivatives have practical applications: finding stationary points (where the function is momentarily flat) and classifying them as local maxima or minima using the second derivative test. The derivative also gives the slope of the tangent line at any point, which is used for linear approximation and constructing tangent line equations.

:::

:::eli20

### Finding Stationary Points

1. Find $f'(x) = 0$
2. Classify using second derivative:
   - $f''(x) > 0$: local **minimum**
   - $f''(x) < 0$: local **maximum**
   - $f''(x) = 0$: inconclusive (use sign test)

### Tangent Line

At point $(a, f(a))$:

$$y = f(a) + f'(a)(x - a)$$

:::

## Integration

:::eli10

Integration is the reverse of differentiation. If differentiation tells you the speed from position, integration tells you the position from speed. It is like adding up lots of tiny pieces to find the total.

:::

:::eli15

Integration is the inverse operation of differentiation. If F'(x) = f(x), then the integral of f(x) is F(x) + C (where C is an arbitrary constant). Integration computes accumulated quantities: area under curves, total distance from velocity, total quantity from a rate of change.

:::

:::eli20

Integration is the reverse of differentiation.

$$\int f'(x)\, dx = f(x) + C$$

:::

## Common Integrals

:::eli10

Just like you memorise derivatives, there are standard integrals to know. They are basically the derivative rules in reverse. The integral of x^n is x^(n+1) divided by (n+1).

:::

:::eli15

These standard integrals are the reverse of the common derivatives. When integrating, you add 1 to the power and divide by the new power. The constant of integration C is always needed for indefinite integrals because differentiation destroys constants. These form the toolkit you combine with integration techniques to handle more complex expressions.

:::

:::eli20

| $f(x)$ | $\int f(x)\, dx$ |
|---------|-------------------|
| $x^n$ ($n \neq -1$) | $\frac{x^{n+1}}{n+1} + C$ |
| $\frac{1}{x}$ | $\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $a^x$ | $\frac{a^x}{\ln a} + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |
| $\sec^2 x$ | $\tan x + C$ |

:::

## Integration Techniques

:::eli10

Sometimes integrals are tricky and you need a technique. Substitution is like undoing the chain rule: you replace a complicated part with a simpler variable, do the integral, then swap back.

:::

:::eli15

The main integration technique at this level is substitution (u-substitution), which reverses the chain rule. You identify an inner function u = g(x), compute du = g'(x)dx, and rewrite the integral in terms of u. For definite integrals, you apply the Fundamental Theorem of Calculus: evaluate the antiderivative at the upper and lower bounds and subtract.

:::

:::eli20

### Substitution (Chain Rule in Reverse)

$$\int f(g(x)) \cdot g'(x)\, dx = \int f(u)\, du \quad \text{where } u = g(x)$$

### Definite Integrals

$$\int_a^b f(x)\, dx = F(b) - F(a)$$

where $F$ is an antiderivative of $f$.

**Properties:**
- $\int_a^b f\, dx = -\int_b^a f\, dx$
- $\int_a^a f\, dx = 0$
- $\int_a^b [f + g]\, dx = \int_a^b f\, dx + \int_a^b g\, dx$
- $\int_a^b cf\, dx = c\int_a^b f\, dx$
- $\int_a^c f\, dx = \int_a^b f\, dx + \int_b^c f\, dx$

:::

## Applications of Integration

:::eli10

Integration can find the area of weird shapes. If you have a curve, integration adds up all the tiny slivers of area underneath it. You can also find the area between two curves by subtracting one from the other.

:::

:::eli15

The definite integral computes the signed area between a function and the x-axis. When the function is positive, the integral gives the area directly. When it crosses the x-axis, you must split the region and take absolute values. The area between two curves equals the integral of the absolute difference of the two functions over the interval.

:::

:::eli20

### Area Under a Curve

$$\text{Area} = \int_a^b f(x)\, dx \quad \text{(when } f(x) \geq 0 \text{)}$$

If $f(x)$ crosses the $x$-axis, split at roots and take absolute values.

### Area Between Curves

$$\text{Area} = \int_a^b |f(x) - g(x)|\, dx$$

:::

## Limits (Foundations)

:::eli10

A limit is what a value gets closer and closer to. If you keep halving the distance to a wall, your limit is the wall itself, even though you never quite reach it. L'Hopital's rule is a trick for when you get stuck with 0/0 -- you can take derivatives of the top and bottom instead.

:::

:::eli15

Limits formalise the idea of "approaching a value." The rules for limits allow you to handle sums, products, and quotients by taking limits separately. When a quotient gives an indeterminate form (0/0 or infinity/infinity), L'Hopital's rule lets you differentiate the numerator and denominator separately and try the limit again.

:::

:::eli20

| Rule | Statement |
|------|-----------|
| $\lim_{x \to a} [f(x) + g(x)]$ | $\lim f + \lim g$ |
| $\lim_{x \to a} [f(x) \cdot g(x)]$ | $\lim f \cdot \lim g$ |
| $\lim_{x \to a} \frac{f(x)}{g(x)}$ | $\frac{\lim f}{\lim g}$ (if $\lim g \neq 0$) |
| L'Hopital's rule | If $\frac{0}{0}$ or $\frac{\infty}{\infty}$: $\lim \frac{f}{g} = \lim \frac{f'}{g'}$ |

---

<details>
<summary><strong>Practice: Differentiation</strong></summary>

**Q:** Find $\frac{d}{dx}[(3x^2 + 1)^5]$.

Chain rule: Let $u = 3x^2 + 1$, $\frac{du}{dx} = 6x$.

$$\frac{d}{dx}[u^5] = 5u^4 \cdot 6x = 30x(3x^2 + 1)^4$$

</details>

<details>
<summary><strong>Practice: Integration</strong></summary>

**Q:** Evaluate $\int_0^2 (3x^2 - 2x + 1)\, dx$.

$$= \left[x^3 - x^2 + x\right]_0^2 = (8 - 4 + 2) - (0) = 6$$

</details>

<details>
<summary><strong>Practice: Stationary points</strong></summary>

**Q:** Find and classify stationary points of $f(x) = x^3 - 3x + 2$.

$f'(x) = 3x^2 - 3 = 3(x-1)(x+1) = 0 \Rightarrow x = \pm 1$

$f''(x) = 6x$

- At $x = 1$: $f''(1) = 6 > 0$ $\Rightarrow$ local minimum, $f(1) = 0$
- At $x = -1$: $f''(-1) = -6 < 0$ $\Rightarrow$ local maximum, $f(-1) = 4$

</details>

<details>
<summary><strong>Practice: Substitution</strong></summary>

**Q:** Find $\int x \cdot e^{x^2}\, dx$.

Let $u = x^2$, $du = 2x\, dx$, so $x\, dx = \frac{1}{2} du$.

$$\int x \cdot e^{x^2}\, dx = \frac{1}{2}\int e^u\, du = \frac{1}{2}e^{x^2} + C$$

</details>

:::
