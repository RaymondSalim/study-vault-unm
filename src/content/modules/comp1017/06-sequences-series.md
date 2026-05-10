---
title: "Sequences and Series"
order: 6
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["sequences", "series", "arithmetic", "geometric", "summation", "convergence"]
---

# Sequences and Series

## Arithmetic Sequences

Common difference $d$: each term increases by $d$.

| Formula | Expression |
|---------|-----------|
| $n$-th term | $a_n = a_1 + (n-1)d$ |
| Sum of first $n$ terms | $S_n = \frac{n}{2}(a_1 + a_n) = \frac{n}{2}(2a_1 + (n-1)d)$ |

**Example:** $2, 5, 8, 11, \ldots$ has $a_1 = 2$, $d = 3$. Then $a_{10} = 2 + 9(3) = 29$.

## Geometric Sequences

Common ratio $r$: each term multiplied by $r$.

| Formula | Expression |
|---------|-----------|
| $n$-th term | $a_n = a_1 \cdot r^{n-1}$ |
| Sum of first $n$ terms | $S_n = a_1 \cdot \frac{1 - r^n}{1 - r}$ (for $r \neq 1$) |
| Infinite sum ($|r| < 1$) | $S_\infty = \frac{a_1}{1 - r}$ |

**Example:** $3, 6, 12, 24, \ldots$ has $a_1 = 3$, $r = 2$. Then $S_5 = 3 \cdot \frac{1-32}{1-2} = 93$.

## Common Summation Formulas

| Sum | Closed Form |
|-----|-------------|
| $\sum_{i=1}^n 1$ | $n$ |
| $\sum_{i=1}^n i$ | $\frac{n(n+1)}{2}$ |
| $\sum_{i=1}^n i^2$ | $\frac{n(n+1)(2n+1)}{6}$ |
| $\sum_{i=1}^n i^3$ | $\left(\frac{n(n+1)}{2}\right)^2$ |
| $\sum_{i=0}^n r^i$ | $\frac{r^{n+1} - 1}{r - 1}$ |
| $\sum_{i=0}^{\infty} r^i$ ($|r|<1$) | $\frac{1}{1-r}$ |

## Summation Properties

$$\sum_{i=1}^n (a_i + b_i) = \sum_{i=1}^n a_i + \sum_{i=1}^n b_i$$

$$\sum_{i=1}^n c \cdot a_i = c \cdot \sum_{i=1}^n a_i$$

$$\sum_{i=1}^n c = cn$$

## Telescoping Sums

If $a_i = f(i) - f(i-1)$, then:

$$\sum_{i=1}^n a_i = f(n) - f(0)$$

**Example:** $\sum_{i=1}^n \frac{1}{i(i+1)} = \sum_{i=1}^n \left(\frac{1}{i} - \frac{1}{i+1}\right) = 1 - \frac{1}{n+1} = \frac{n}{n+1}$

## Convergence of Series

A series $\sum_{n=1}^{\infty} a_n$ converges if the partial sums $S_N = \sum_{n=1}^N a_n$ approach a finite limit.

### Tests for Convergence

| Test | Condition | Conclusion |
|------|-----------|------------|
| **Divergence test** | $\lim_{n\to\infty} a_n \neq 0$ | Series diverges |
| **Geometric** | $|r| < 1$ | Converges to $\frac{a}{1-r}$ |
| **Geometric** | $|r| \geq 1$ | Diverges |
| **$p$-series** $\sum \frac{1}{n^p}$ | $p > 1$ | Converges |
| **$p$-series** | $p \leq 1$ | Diverges |
| **Ratio test** | $\lim \frac{|a_{n+1}|}{|a_n|} < 1$ | Converges |
| **Ratio test** | $\lim \frac{|a_{n+1}|}{|a_n|} > 1$ | Diverges |

> **Note:** Divergence test can only prove divergence, never convergence. $a_n \to 0$ does NOT guarantee convergence (harmonic series: $\sum \frac{1}{n}$ diverges).

## Recurrence Relations

A sequence defined by earlier terms. Common form:

$$a_n = c_1 a_{n-1} + c_2 a_{n-2} + \ldots$$

**Solving linear homogeneous recurrences** $a_n = c_1 a_{n-1} + c_2 a_{n-2}$:

1. Write characteristic equation: $x^2 = c_1 x + c_2$, i.e., $x^2 - c_1 x - c_2 = 0$
2. Find roots $r_1, r_2$
3. General solution:
   - Distinct roots: $a_n = A r_1^n + B r_2^n$
   - Repeated root $r$: $a_n = (A + Bn)r^n$
4. Use initial conditions to find $A, B$

---

<details>
<summary><strong>Practice: Summation</strong></summary>

**Q:** Evaluate $\sum_{i=1}^{20} (3i + 2)$.

$$= 3\sum_{i=1}^{20} i + \sum_{i=1}^{20} 2 = 3 \cdot \frac{20 \cdot 21}{2} + 40 = 630 + 40 = 670$$

</details>

<details>
<summary><strong>Practice: Geometric series</strong></summary>

**Q:** Find $\sum_{n=0}^{\infty} \left(\frac{2}{3}\right)^n$.

$|r| = \frac{2}{3} < 1$, so converges.

$$S = \frac{1}{1 - \frac{2}{3}} = \frac{1}{\frac{1}{3}} = 3$$

</details>

<details>
<summary><strong>Practice: Recurrence</strong></summary>

**Q:** Solve $a_n = 5a_{n-1} - 6a_{n-2}$, with $a_0 = 1, a_1 = 4$.

Characteristic equation: $x^2 - 5x + 6 = 0 \Rightarrow (x-2)(x-3) = 0$

Roots: $r_1 = 2, r_2 = 3$. General solution: $a_n = A \cdot 2^n + B \cdot 3^n$.

From $a_0 = 1$: $A + B = 1$
From $a_1 = 4$: $2A + 3B = 4$

Solving: $B = 2, A = -1$.

$$a_n = -2^n + 2 \cdot 3^n$$

**Check:** $a_2 = -4 + 18 = 14$. Verify: $5(4) - 6(1) = 14$. Correct.

</details>
