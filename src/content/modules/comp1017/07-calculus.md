---
title: "Calculus"
order: 7
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["calculus", "differentiation", "integration", "chain rule", "product rule"]
---

# Calculus

## Differentiation Rules

| Rule | Formula |
|------|---------|
| Constant | $\frac{d}{dx}[c] = 0$ |
| Power | $\frac{d}{dx}[x^n] = nx^{n-1}$ |
| Constant multiple | $\frac{d}{dx}[cf(x)] = cf'(x)$ |
| Sum | $\frac{d}{dx}[f+g] = f' + g'$ |
| Product | $\frac{d}{dx}[fg] = f'g + fg'$ |
| Quotient | $\frac{d}{dx}\left[\frac{f}{g}\right] = \frac{f'g - fg'}{g^2}$ |
| Chain | $\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$ |

## Common Derivatives

| $f(x)$ | $f'(x)$ |
|---------|----------|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $\frac{1}{x}$ |
| $a^x$ | $a^x \ln a$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |

## Applications of Derivatives

### Finding Stationary Points

1. Find $f'(x) = 0$
2. Classify using second derivative:
   - $f''(x) > 0$: local **minimum**
   - $f''(x) < 0$: local **maximum**
   - $f''(x) = 0$: inconclusive (use sign test)

### Tangent Line

At point $(a, f(a))$:

$$y = f(a) + f'(a)(x - a)$$

## Integration

Integration is the reverse of differentiation.

$$\int f'(x)\, dx = f(x) + C$$

## Common Integrals

| $f(x)$ | $\int f(x)\, dx$ |
|---------|-------------------|
| $x^n$ ($n \neq -1$) | $\frac{x^{n+1}}{n+1} + C$ |
| $\frac{1}{x}$ | $\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $a^x$ | $\frac{a^x}{\ln a} + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |
| $\sec^2 x$ | $\tan x + C$ |

## Integration Techniques

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

## Applications of Integration

### Area Under a Curve

$$\text{Area} = \int_a^b f(x)\, dx \quad \text{(when } f(x) \geq 0 \text{)}$$

If $f(x)$ crosses the $x$-axis, split at roots and take absolute values.

### Area Between Curves

$$\text{Area} = \int_a^b |f(x) - g(x)|\, dx$$

## Limits (Foundations)

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
