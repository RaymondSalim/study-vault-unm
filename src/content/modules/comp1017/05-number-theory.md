---
title: "Number Theory"
order: 5
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["number theory", "GCD", "Euclidean algorithm", "modular arithmetic", "primes", "Fermat"]
---

# Number Theory

## Divisibility

:::eli10

Divisibility means one number divides evenly into another with no remainder. Like 3 divides 12 because 12 divided by 3 is exactly 4. We write "3 | 12" to say "3 divides 12."

:::

:::eli15

We say a divides b (written a | b) when b is a multiple of a, meaning b = ka for some integer k. Divisibility is reflexive (a always divides itself) and transitive (if a | b and b | c, then a | c). An important property is that if a divides two numbers, it divides any combination of them.

:::

:::eli20

$a \mid b$ means "$a$ divides $b$", i.e., $b = ka$ for some integer $k$.

| Property | Statement |
|----------|-----------|
| Reflexive | $a \mid a$ |
| Transitive | $a \mid b \land b \mid c \Rightarrow a \mid c$ |
| Linear combination | $a \mid b \land a \mid c \Rightarrow a \mid (bx + cy)$ for all $x,y \in \mathbb{Z}$ |
| Product | $a \mid b \Rightarrow a \mid bc$ |

:::

## GCD and LCM

:::eli10

The GCD (greatest common divisor) is the biggest number that divides two numbers evenly. The LCM (least common multiple) is the smallest number that both numbers divide into. For example, GCD of 12 and 8 is 4, and LCM of 12 and 8 is 24.

:::

:::eli15

The GCD of two numbers is the largest number that divides both. The LCM is the smallest positive number that both divide into. There is a useful relationship: GCD(a,b) times LCM(a,b) equals the product |a*b|. Finding the GCD is the key step -- once you have it, the LCM can be calculated directly.

:::

:::eli20

$$\gcd(a, b) = \text{largest } d \text{ with } d \mid a \text{ and } d \mid b$$
$$\text{lcm}(a, b) = \text{smallest positive } m \text{ with } a \mid m \text{ and } b \mid m$$

**Key identity:**

$$\gcd(a,b) \cdot \text{lcm}(a,b) = |a \cdot b|$$

:::

## Euclidean Algorithm

:::eli10

The Euclidean Algorithm is a quick trick for finding the GCD. You keep dividing and taking remainders until you get zero. The last non-zero remainder is the GCD. It is much faster than listing all the factors.

:::

:::eli15

The Euclidean Algorithm computes the GCD efficiently by repeatedly applying the rule: gcd(a, b) = gcd(b, a mod b), continuing until the remainder is 0. The last non-zero remainder is the GCD. This works because any common divisor of a and b also divides a mod b. It runs in logarithmic time, making it very fast even for large numbers.

:::

:::eli20

Repeatedly apply: $\gcd(a, b) = \gcd(b, a \mod b)$ until remainder is 0.

**Example:** $\gcd(252, 105)$

| Step | Equation | Remainder |
|------|----------|-----------|
| 1 | $252 = 2 \times 105 + 42$ | 42 |
| 2 | $105 = 2 \times 42 + 21$ | 21 |
| 3 | $42 = 2 \times 21 + 0$ | 0 |

$\gcd(252, 105) = 21$

:::

## Extended Euclidean Algorithm (Bezout's Identity)

:::eli10

The Extended Euclidean Algorithm not only finds the GCD but also finds a way to express it as a combination of the two original numbers. For example, 21 = 5 times 105 minus 2 times 252. This is useful for solving equations.

:::

:::eli15

Bezout's Identity states that for any integers a and b, there exist integers x and y such that ax + by = gcd(a, b). The extended Euclidean algorithm finds these coefficients by working backwards through the steps of the regular algorithm, substituting each equation into the previous one. This is the key to solving linear congruences and finding modular inverses.

:::

:::eli20

For any $a, b$, there exist integers $x, y$ such that:

$$ax + by = \gcd(a, b)$$

**Back-substitution from above:**
- $21 = 105 - 2 \times 42$
- $42 = 252 - 2 \times 105$
- $21 = 105 - 2(252 - 2 \times 105) = 5 \times 105 - 2 \times 252$

So $x = -2, y = 5$: $252(-2) + 105(5) = 21$.

:::

## Modular Arithmetic

:::eli10

Modular arithmetic is like clock math. On a 12-hour clock, 3 hours after 10 o'clock is 1 o'clock, not 13. We say 13 is equivalent to 1 "mod 12" because they differ by 12. It is about what the remainder is when you divide.

:::

:::eli15

Modular arithmetic studies remainders after division. We say a is congruent to b mod n (written a = b mod n) when n divides (a - b), meaning they have the same remainder when divided by n. You can add, multiply, and exponentiate within modular arithmetic. However, cancellation (division) is only safe when the number you divide by is coprime to the modulus.

:::

:::eli20

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

:::

## Primes

:::eli10

A prime number is a number greater than 1 that can only be divided evenly by 1 and itself (like 2, 3, 5, 7, 11). Every number can be broken down into a product of primes, like building blocks. There are infinitely many primes.

:::

:::eli15

A prime is an integer greater than 1 whose only divisors are 1 and itself. The Fundamental Theorem of Arithmetic guarantees that every integer greater than 1 has a unique factorisation into primes. To test if a number n is prime, you only need to check divisibility by primes up to the square root of n. Euclid proved there are infinitely many primes using a contradiction argument.

:::

:::eli20

| Fact | Statement |
|------|-----------|
| Fundamental Theorem of Arithmetic | Every $n > 1$ has a unique prime factorisation |
| Testing primality | Check divisibility by primes up to $\lfloor\sqrt{n}\rfloor$ |
| Infinitely many primes | Proof by contradiction (Euclid) |

:::

## Fermat's Little Theorem

:::eli10

Fermat's Little Theorem is a shortcut for working with big powers in modular arithmetic. If you raise a number to the power of (p-1) where p is prime, the result is always 1 mod p. This lets you simplify very large exponents quickly.

:::

:::eli15

Fermat's Little Theorem states that if p is prime and a is not divisible by p, then a^(p-1) is congruent to 1 mod p. This is extremely useful for computing large powers mod p: you can reduce the exponent modulo (p-1) first. For example, to compute 7^222 mod 11, you reduce 222 mod 10 = 2, so the answer is 7^2 = 49 = 5 mod 11.

:::

:::eli20

If $p$ is prime and $\gcd(a, p) = 1$:

$$a^{p-1} \equiv 1 \pmod{p}$$

Equivalently, for any $a$:

$$a^p \equiv a \pmod{p}$$

**Application:** Compute large powers mod $p$.

**Example:** Find $7^{222} \pmod{11}$.

> By Fermat: $7^{10} \equiv 1 \pmod{11}$
> $222 = 10 \times 22 + 2$
> $7^{222} = (7^{10})^{22} \cdot 7^2 \equiv 1^{22} \cdot 49 \equiv 49 \equiv 5 \pmod{11}$

:::

## Modular Exponentiation (Repeated Squaring)

:::eli10

Repeated squaring is a fast way to calculate very big powers. Instead of multiplying a number by itself hundreds of times, you keep squaring it (which doubles the exponent each time) and combine the pieces you need. It is like a shortcut for counting in jumps.

:::

:::eli15

Modular exponentiation by repeated squaring computes a^n mod m efficiently in O(log n) multiplications rather than O(n). The idea is to write the exponent in binary, then build up the result by squaring and selectively multiplying. At each step you reduce mod m to keep numbers small. This is the method used in real cryptographic systems like RSA.

:::

:::eli20

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

:::
