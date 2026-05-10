---
title: "Number Theory"
order: 5
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["number theory", "GCD", "Euclidean algorithm", "modular arithmetic", "primes", "Fermat"]
---

# Number Theory

## Divisibility

$a \mid b$ means "$a$ divides $b$", i.e., $b = ka$ for some integer $k$.

| Property | Statement |
|----------|-----------|
| Reflexive | $a \mid a$ |
| Transitive | $a \mid b \land b \mid c \Rightarrow a \mid c$ |
| Linear combination | $a \mid b \land a \mid c \Rightarrow a \mid (bx + cy)$ for all $x,y \in \mathbb{Z}$ |
| Product | $a \mid b \Rightarrow a \mid bc$ |

## GCD and LCM

$$\gcd(a, b) = \text{largest } d \text{ with } d \mid a \text{ and } d \mid b$$
$$\text{lcm}(a, b) = \text{smallest positive } m \text{ with } a \mid m \text{ and } b \mid m$$

**Key identity:**

$$\gcd(a,b) \cdot \text{lcm}(a,b) = |a \cdot b|$$

## Euclidean Algorithm

Repeatedly apply: $\gcd(a, b) = \gcd(b, a \mod b)$ until remainder is 0.

**Example:** $\gcd(252, 105)$

| Step | Equation | Remainder |
|------|----------|-----------|
| 1 | $252 = 2 \times 105 + 42$ | 42 |
| 2 | $105 = 2 \times 42 + 21$ | 21 |
| 3 | $42 = 2 \times 21 + 0$ | 0 |

$\gcd(252, 105) = 21$

## Extended Euclidean Algorithm (Bezout's Identity)

For any $a, b$, there exist integers $x, y$ such that:

$$ax + by = \gcd(a, b)$$

**Back-substitution from above:**
- $21 = 105 - 2 \times 42$
- $42 = 252 - 2 \times 105$
- $21 = 105 - 2(252 - 2 \times 105) = 5 \times 105 - 2 \times 252$

So $x = -2, y = 5$: $252(-2) + 105(5) = 21$.

## Modular Arithmetic

$a \equiv b \pmod{n}$ means $n \mid (a - b)$.

### Properties

| Operation | Rule |
|-----------|------|
| Addition | $a \equiv b \Rightarrow a + c \equiv b + c$ |
| Multiplication | $a \equiv b \Rightarrow ac \equiv bc$ |
| Power | $a \equiv b \Rightarrow a^k \equiv b^k$ |
| **Cancellation** | $ac \equiv bc \pmod{n} \Rightarrow a \equiv b \pmod{n/\gcd(c,n)}$ |

> **Warning:** You CANNOT always cancel. Only when $\gcd(c, n) = 1$.

### Solving Linear Congruences

$ax \equiv b \pmod{n}$ has a solution iff $\gcd(a, n) \mid b$.

If solvable, there are $\gcd(a, n)$ solutions mod $n$.

**Method:** Find $a^{-1} \pmod{n}$ using extended Euclidean algorithm, then $x \equiv a^{-1}b \pmod{n}$.

## Primes

| Fact | Statement |
|------|-----------|
| Fundamental Theorem of Arithmetic | Every $n > 1$ has a unique prime factorisation |
| Testing primality | Check divisibility by primes up to $\lfloor\sqrt{n}\rfloor$ |
| Infinitely many primes | Proof by contradiction (Euclid) |

## Fermat's Little Theorem

If $p$ is prime and $\gcd(a, p) = 1$:

$$a^{p-1} \equiv 1 \pmod{p}$$

Equivalently, for any $a$:

$$a^p \equiv a \pmod{p}$$

**Application:** Compute large powers mod $p$.

**Example:** Find $7^{222} \pmod{11}$.

> By Fermat: $7^{10} \equiv 1 \pmod{11}$
> $222 = 10 \times 22 + 2$
> $7^{222} = (7^{10})^{22} \cdot 7^2 \equiv 1^{22} \cdot 49 \equiv 49 \equiv 5 \pmod{11}$

## Modular Exponentiation (Repeated Squaring)

Compute $a^n \pmod{m}$ efficiently:

1. Write $n$ in binary
2. Square and reduce at each step
3. Multiply in when bit is 1

**Example:** $3^{13} \pmod{7}$. $13 = 1101_2$.

| Step | Computation | Result mod 7 |
|------|------------|--------------|
| $3^1$ | $3$ | $3$ |
| $3^2$ | $9$ | $2$ |
| $3^4$ | $2^2 = 4$ | $4$ |
| $3^8$ | $4^2 = 16$ | $2$ |
| $3^{13} = 3^8 \cdot 3^4 \cdot 3^1$ | $2 \cdot 4 \cdot 3 = 24$ | $3$ |

---

<details>
<summary><strong>Practice: Euclidean Algorithm</strong></summary>

**Q:** Find $\gcd(1071, 462)$ and express as a linear combination.

$1071 = 2 \times 462 + 147$
$462 = 3 \times 147 + 21$
$147 = 7 \times 21 + 0$

$\gcd(1071, 462) = 21$

Back-substitution:
$21 = 462 - 3 \times 147 = 462 - 3(1071 - 2 \times 462) = 7 \times 462 - 3 \times 1071$

</details>

<details>
<summary><strong>Practice: Modular arithmetic</strong></summary>

**Q:** Solve $5x \equiv 3 \pmod{7}$.

$\gcd(5, 7) = 1$, so a unique solution exists.

Find $5^{-1} \pmod 7$: $5 \times 3 = 15 \equiv 1 \pmod 7$, so $5^{-1} \equiv 3$.

$x \equiv 3 \times 3 \equiv 9 \equiv 2 \pmod 7$.

**Check:** $5 \times 2 = 10 \equiv 3 \pmod 7$. Correct.

</details>

<details>
<summary><strong>Practice: Fermat's Little Theorem</strong></summary>

**Q:** Find $2^{1000} \pmod{13}$.

By Fermat: $2^{12} \equiv 1 \pmod{13}$.

$1000 = 12 \times 83 + 4$

$2^{1000} = (2^{12})^{83} \cdot 2^4 \equiv 1 \cdot 16 \equiv 3 \pmod{13}$

</details>
