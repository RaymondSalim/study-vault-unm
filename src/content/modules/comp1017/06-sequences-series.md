---
title: "Sequences and Series"
order: 6
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["sequences", "series", "arithmetic", "geometric", "summation", "convergence"]
---

# Sequences and Series

## Arithmetic Sequences

:::eli10

An arithmetic sequence is a list of numbers where you add the same amount each time. Like 2, 5, 8, 11 -- you keep adding 3. It is like going up stairs where each step is the same height.

:::

:::eli15

An arithmetic sequence has a constant difference between consecutive terms. You can find any term directly using the formula a_n = a_1 + (n-1)d, where d is the common difference. The sum of the first n terms has a convenient closed formula involving the first term, last term, and number of terms.

:::

:::eli20

Common difference $d$: each term increases by $d$.

| Formula | Expression |
|---------|-----------|
| $n$-th term | $a_n = a_1 + (n-1)d$ |
| Sum of first $n$ terms | $S_n = \frac{n}{2}(a_1 + a_n) = \frac{n}{2}(2a_1 + (n-1)d)$ |

**Example:** $2, 5, 8, 11, \ldots$ has $a_1 = 2$, $d = 3$. Then $a_{10} = 2 + 9(3) = 29$.

:::

## Geometric Sequences

:::eli10

A geometric sequence is a list where you multiply by the same number each time. Like 3, 6, 12, 24 -- you keep multiplying by 2. It is like doubling your pocket money every week. If the multiplier is less than 1 (like one-half), the numbers get smaller and smaller and eventually shrink toward zero.

:::

:::eli15

A geometric sequence has a constant ratio between consecutive terms. Each term is the previous term multiplied by r (the common ratio). The sum of n terms has a closed formula. When |r| < 1, the infinite sum converges to a finite value: a_1 / (1-r). When |r| >= 1, the sum grows without bound.

:::

:::eli20

Common ratio $r$: each term multiplied by $r$.

| Formula | Expression |
|---------|-----------|
| $n$-th term | $a_n = a_1 \cdot r^{n-1}$ |
| Sum of first $n$ terms | $S_n = a_1 \cdot \frac{1 - r^n}{1 - r}$ (for $r \neq 1$) |
| Infinite sum ($|r| < 1$) | $S_\infty = \frac{a_1}{1 - r}$ |

**Example:** $3, 6, 12, 24, \ldots$ has $a_1 = 3$, $r = 2$. Then $S_5 = 3 \cdot \frac{1-32}{1-2} = 93$.

:::

## Common Summation Formulas

:::eli10

There are handy formulas that let you add up lots of numbers without adding them one by one. For example, the sum of numbers from 1 to n is n(n+1)/2. Gauss figured this out as a kid by pairing numbers from opposite ends.

:::

:::eli15

Closed-form summation formulas allow you to compute sums of arithmetic or geometric series directly without iterating. Key ones to memorise include the sum of first n integers (n(n+1)/2), sum of squares, sum of cubes, and geometric series. These are frequently needed in algorithm analysis and in induction proofs.

:::

:::eli20

| Sum | Closed Form |
|-----|-------------|
| $\sum_{i=1}^n 1$ | $n$ |
| $\sum_{i=1}^n i$ | $\frac{n(n+1)}{2}$ |
| $\sum_{i=1}^n i^2$ | $\frac{n(n+1)(2n+1)}{6}$ |
| $\sum_{i=1}^n i^3$ | $\left(\frac{n(n+1)}{2}\right)^2$ |
| $\sum_{i=0}^n r^i$ | $\frac{r^{n+1} - 1}{r - 1}$ |
| $\sum_{i=0}^{\infty} r^i$ ($|r|<1$) | $\frac{1}{1-r}$ |

:::

## Summation Properties

:::eli10

You can split sums apart and pull out multipliers, just like with regular addition. If you are adding (2+3) + (4+5), you can rearrange it as (2+4) + (3+5). Constants can be pulled outside the sum.

:::

:::eli15

Summation is linear: you can separate a sum of terms into sums of individual parts, and you can factor out constants. These properties let you break complex summations into simpler ones that match known closed-form formulas. This is the main technique for evaluating summations in practice.

:::

:::eli20

$$\sum_{i=1}^n (a_i + b_i) = \sum_{i=1}^n a_i + \sum_{i=1}^n b_i$$

$$\sum_{i=1}^n c \cdot a_i = c \cdot \sum_{i=1}^n a_i$$

$$\sum_{i=1}^n c = cn$$

:::

## Telescoping Sums

:::eli10

A telescoping sum is like a collapsing telescope: most of the middle parts cancel out, leaving only the first and last pieces. It is like a chain of +1 and -1 that cancel in pairs, leaving only the ends.

:::

:::eli15

A telescoping sum occurs when consecutive terms cancel each other, leaving only the first and last values. If you can rewrite each term as the difference f(i) - f(i-1), then the sum collapses to f(n) - f(0). The key skill is recognising when a sum can be decomposed this way, often via partial fractions.

:::

:::eli20

If $a_i = f(i) - f(i-1)$, then:

$$\sum_{i=1}^n a_i = f(n) - f(0)$$

**Example:** $\sum_{i=1}^n \frac{1}{i(i+1)} = \sum_{i=1}^n \left(\frac{1}{i} - \frac{1}{i+1}\right) = 1 - \frac{1}{n+1} = \frac{n}{n+1}$

:::

## Convergence of Series

:::eli10

Some infinite sums add up to a finite number (they converge), while others grow forever (they diverge). Adding 1/2 + 1/4 + 1/8 + ... equals 1 (convergent). But adding 1 + 1/2 + 1/3 + 1/4 + ... goes on forever (divergent), even though the terms get smaller.

:::

:::eli15

A series converges if its partial sums approach a finite limit as you add more terms. Several tests help determine convergence: the divergence test (if terms do not approach 0, the series diverges), the geometric series test (converges when |r| < 1), p-series test (1/n^p converges when p > 1), and the ratio test. Important: terms approaching 0 is necessary but NOT sufficient for convergence (the harmonic series is the classic counterexample).

:::

:::eli20

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

:::

## Recurrence Relations

:::eli10

A recurrence relation defines a sequence where each term depends on earlier terms. The Fibonacci sequence is a famous example: each number is the sum of the two before it (1, 1, 2, 3, 5, 8...). You can find a direct formula by solving a special equation.

:::

:::eli15

A recurrence relation defines each term using previous terms. To find a direct (closed-form) formula for a linear homogeneous recurrence like a_n = c1*a_{n-1} + c2*a_{n-2}, you solve its characteristic equation to find roots r1 and r2. The general solution is a combination of r1^n and r2^n, with coefficients determined by initial conditions. This converts a recursive definition into a direct formula.

:::

:::eli20

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

:::
