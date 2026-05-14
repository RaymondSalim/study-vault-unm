---
title: "Proof Techniques"
order: 4
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["proof", "induction", "contradiction", "contrapositive", "direct proof"]
---

# Proof Techniques

## Overview

:::eli10

A proof is a convincing argument that something is true. There are different strategies you can use depending on the situation. It is like solving a puzzle: sometimes you go forward step by step, sometimes you work backwards from what you want to show, and sometimes you assume the opposite and show it leads to nonsense.

:::

:::eli15

Mathematical proofs are rigorous logical arguments that establish the truth of a statement. Different proof techniques are suited to different types of claims. Direct proof works forward from assumptions. Contrapositive rewrites the statement in an equivalent but easier form. Contradiction assumes the opposite and derives an impossibility. Induction proves statements about all integers by establishing a base case and a domino-like step.

:::

:::eli20

| Technique | When to use | Structure |
|-----------|-------------|-----------|
| **Direct** | Straightforward "if $P$ then $Q$" | Assume $P$, derive $Q$ |
| **Contrapositive** | Direct proof is awkward; negations are simpler | Prove $\lnot Q \to \lnot P$ |
| **Contradiction** | "There is no..." or uniqueness claims | Assume $\lnot$ (statement), derive contradiction |
| **Induction** | Statements involving $\forall n \geq n_0$ | Base case + inductive step |
| **Strong Induction** | Need multiple previous cases | Assume true for all $k < n$ |
| **Counterexample** | Disprove universal statements | Find one $x$ where $P(x)$ fails |

:::

## Direct Proof

:::eli10

A direct proof is the most straightforward approach: you start with what you know is true and work step by step until you reach what you want to prove. It is like following a recipe from ingredients to finished dish.

:::

:::eli15

In a direct proof of "if P then Q," you assume P is true and use logical steps, definitions, and known results to arrive at Q. Each step must follow logically from the previous ones. This is the default method -- try it first before resorting to more advanced techniques.

:::

:::eli20

**Template:** To prove $P \to Q$:
1. Assume $P$ is true
2. Use definitions, algebra, known results
3. Conclude $Q$

**Example:** Prove "If $n$ is even, then $n^2$ is even."

> Assume $n$ is even, so $n = 2k$ for some integer $k$.
> Then $n^2 = (2k)^2 = 4k^2 = 2(2k^2)$.
> Since $2k^2$ is an integer, $n^2$ is even. $\square$

:::

## Proof by Contrapositive

:::eli10

Instead of proving "if A then B," you prove the equivalent statement "if NOT B then NOT A." It is like proving "if I am wet then it rained" by proving "if it did not rain then I am not wet." Same thing, just backwards.

:::

:::eli15

The contrapositive of "if P then Q" is "if not Q then not P." These two statements are logically equivalent, so proving one proves the other. This technique is useful when the negated forms are easier to work with than the original statement, which is common when the conclusion involves an "or" or is hard to start with directly.

:::

:::eli20

**Template:** To prove $P \to Q$, instead prove $\lnot Q \to \lnot P$.

**Example:** Prove "If $n^2$ is odd, then $n$ is odd."

> Contrapositive: "If $n$ is even, then $n^2$ is even."
> Assume $n = 2k$. Then $n^2 = 4k^2 = 2(2k^2)$, which is even. $\square$

:::

## Proof by Contradiction

:::eli10

Proof by contradiction is like saying "suppose the opposite were true" and then showing that leads to something impossible. If assuming something is false creates a mess that makes no sense, then it must be true after all.

:::

:::eli15

In a proof by contradiction, you assume the negation of what you want to prove and show this leads to a logical impossibility (a statement that contradicts itself or a known fact). Since the assumption led to an impossibility, the original statement must be true. This is especially useful for proving statements about uniqueness or non-existence.

:::

:::eli20

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

:::

## Mathematical Induction

:::eli10

Induction is like dominoes: you prove the first domino falls (base case), and then you prove that if any domino falls, the next one falls too (inductive step). That guarantees all dominoes fall. It is a way to prove something is true for ALL numbers starting from some point.

:::

:::eli15

Mathematical induction proves that a statement P(n) holds for all integers n greater than or equal to some starting value. First you verify the base case (the statement is true for the starting value). Then you prove the inductive step: assuming P(k) is true for an arbitrary k, you show P(k+1) must also be true. Together these guarantee the statement holds for all values in the range, like a chain reaction.

:::

:::eli20

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

:::

## Strong Induction

:::eli10

Strong induction is like regular induction but instead of only knowing the previous domino fell, you know ALL previous dominoes fell. Sometimes you need to look back at multiple earlier steps, not just the one right before.

:::

:::eli15

Strong induction differs from standard induction in the hypothesis: instead of only assuming P(k) is true, you assume P(m) is true for ALL values m from the base case up to k. Then you prove P(k+1). This is useful when the proof for P(k+1) depends on earlier values than just P(k), such as in problems involving factorisation or recursive definitions that reference multiple previous terms.

:::

:::eli20

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

:::

## Common Induction Pitfalls

:::eli10

There are common mistakes students make with induction: forgetting to check the first domino actually falls, not actually using the assumption about previous cases, or accidentally assuming what you are trying to prove.

:::

:::eli15

Induction proofs fail when: the base case is missing or wrong (the chain has no valid start), the inductive step does not actually use the inductive hypothesis (you have not linked the chain), you assume P(k+1) is true rather than proving it (circular reasoning), or you induct on the wrong variable. Always verify your base case matches the claim and your step genuinely uses the hypothesis.

:::

:::eli20

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

:::
