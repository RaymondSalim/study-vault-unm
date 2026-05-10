---
title: "Proof Techniques"
order: 4
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["proof", "induction", "contradiction", "contrapositive", "direct proof"]
---

# Proof Techniques

## Overview

| Technique | When to use | Structure |
|-----------|-------------|-----------|
| **Direct** | Straightforward "if $P$ then $Q$" | Assume $P$, derive $Q$ |
| **Contrapositive** | Direct proof is awkward; negations are simpler | Prove $\lnot Q \to \lnot P$ |
| **Contradiction** | "There is no..." or uniqueness claims | Assume $\lnot$ (statement), derive contradiction |
| **Induction** | Statements involving $\forall n \geq n_0$ | Base case + inductive step |
| **Strong Induction** | Need multiple previous cases | Assume true for all $k < n$ |
| **Counterexample** | Disprove universal statements | Find one $x$ where $P(x)$ fails |

## Direct Proof

**Template:** To prove $P \to Q$:
1. Assume $P$ is true
2. Use definitions, algebra, known results
3. Conclude $Q$

**Example:** Prove "If $n$ is even, then $n^2$ is even."

> Assume $n$ is even, so $n = 2k$ for some integer $k$.
> Then $n^2 = (2k)^2 = 4k^2 = 2(2k^2)$.
> Since $2k^2$ is an integer, $n^2$ is even. $\square$

## Proof by Contrapositive

**Template:** To prove $P \to Q$, instead prove $\lnot Q \to \lnot P$.

**Example:** Prove "If $n^2$ is odd, then $n$ is odd."

> Contrapositive: "If $n$ is even, then $n^2$ is even."
> Assume $n = 2k$. Then $n^2 = 4k^2 = 2(2k^2)$, which is even. $\square$

## Proof by Contradiction

**Template:** To prove $P$:
1. Assume $\lnot P$
2. Derive a logical contradiction
3. Conclude $P$ must be true

**Example:** Prove "$\sqrt{2}$ is irrational."

> Assume $\sqrt{2} = \frac{p}{q}$ in lowest terms ($\gcd(p,q) = 1$).
> Then $2 = \frac{p^2}{q^2}$, so $p^2 = 2q^2$.
> Thus $p^2$ is even, so $p$ is even. Write $p = 2k$.
> Then $4k^2 = 2q^2$, so $q^2 = 2k^2$, meaning $q$ is even.
> Contradiction: both $p$ and $q$ are even, but $\gcd(p,q) = 1$. $\square$

## Mathematical Induction

**Template:** To prove $P(n)$ for all $n \geq n_0$:

1. **Base case:** Verify $P(n_0)$
2. **Inductive hypothesis:** Assume $P(k)$ for some arbitrary $k \geq n_0$
3. **Inductive step:** Prove $P(k+1)$ using the hypothesis

**Example:** Prove $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$ for all $n \geq 1$.

> **Base case:** $n = 1$: LHS $= 1$, RHS $= \frac{1 \cdot 2}{2} = 1$. True.
>
> **Inductive step:** Assume $\sum_{i=1}^{k} i = \frac{k(k+1)}{2}$.
>
> Then $\sum_{i=1}^{k+1} i = \frac{k(k+1)}{2} + (k+1) = \frac{k(k+1) + 2(k+1)}{2} = \frac{(k+1)(k+2)}{2}$
>
> This is exactly the formula with $n = k+1$. $\square$

## Strong Induction

**Difference from standard:** Assume $P(n_0), P(n_0+1), \ldots, P(k)$ are all true, then prove $P(k+1)$.

**Example:** Every integer $n \geq 2$ has a prime factorisation.

> **Base case:** $n = 2$ is prime. Done.
>
> **Strong hypothesis:** Assume all integers $2 \leq m \leq k$ have prime factorisations.
>
> **Step:** Consider $k+1$.
> - If $k+1$ is prime, done.
> - If composite, $k+1 = ab$ where $2 \leq a, b \leq k$.
> - By hypothesis, $a$ and $b$ have prime factorisations.
> - Concatenating gives a prime factorisation of $k+1$. $\square$

## Common Induction Pitfalls

| Pitfall | Why it's wrong |
|---------|---------------|
| Forgetting the base case | The domino chain has no start |
| Wrong base case | Must match the claim's starting point |
| Not using the inductive hypothesis | You've proven nothing about the step |
| Assuming $P(k+1)$ instead of proving it | Circular reasoning |
| Induction on wrong variable | Must induct on the variable in $\forall n$ |

---

<details>
<summary><strong>Practice: Induction</strong></summary>

**Q:** Prove $\sum_{i=0}^{n} 2^i = 2^{n+1} - 1$ for all $n \geq 0$.

**Base case:** $n = 0$: LHS $= 2^0 = 1$. RHS $= 2^1 - 1 = 1$. True.

**Inductive step:** Assume $\sum_{i=0}^{k} 2^i = 2^{k+1} - 1$.

Then $\sum_{i=0}^{k+1} 2^i = (2^{k+1} - 1) + 2^{k+1} = 2 \cdot 2^{k+1} - 1 = 2^{k+2} - 1$. $\square$

</details>

<details>
<summary><strong>Practice: Contradiction</strong></summary>

**Q:** Prove there are infinitely many primes.

Assume there are finitely many primes: $p_1, p_2, \ldots, p_n$.

Consider $N = p_1 p_2 \cdots p_n + 1$.

$N > 1$, so $N$ has a prime factor $p$. But $N \mod p_i = 1$ for all $i$, so $p \neq p_i$ for any $i$.

Contradiction: $p$ is a prime not in our "complete" list. $\square$

</details>

<details>
<summary><strong>Practice: Identify the technique</strong></summary>

**Q:** Which technique for each?

| Statement | Best technique |
|-----------|---------------|
| "If $3 \mid n^2$ then $3 \mid n$" | Contrapositive |
| "$\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$" | Induction |
| "There is no smallest positive rational" | Contradiction |
| "If $n$ is odd then $n+1$ is even" | Direct |

</details>
