---
title: "Quick Reference"
order: 90
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["reference", "formulas", "cheat sheet"]
---

# Quick Reference - All Key Formulas

## Sets

| Formula | |
|---------|---|
| $|\mathcal{P}(A)| = 2^{|A|}$ | Power set cardinality |
| $|A \cup B| = |A| + |B| - |A \cap B|$ | Inclusion-exclusion |
| $|A \times B| = |A| \cdot |B|$ | Cartesian product size |
| $\overline{A \cup B} = \overline{A} \cap \overline{B}$ | De Morgan |
| $\overline{A \cap B} = \overline{A} \cup \overline{B}$ | De Morgan |

## Logic

| Formula | |
|---------|---|
| $p \to q \equiv \lnot p \lor q$ | Implication elimination |
| $\lnot(p \to q) \equiv p \land \lnot q$ | Negation of implication |
| Contrapositive: $p \to q \equiv \lnot q \to \lnot p$ | Always equivalent |
| $\lnot \forall x\, P(x) \equiv \exists x\, \lnot P(x)$ | Quantifier negation |
| $\lnot \exists x\, P(x) \equiv \forall x\, \lnot P(x)$ | Quantifier negation |

## Number Theory

| Formula | |
|---------|---|
| $\gcd(a,b) = \gcd(b, a \mod b)$ | Euclidean algorithm |
| $\gcd(a,b) \cdot \text{lcm}(a,b) = |ab|$ | GCD-LCM identity |
| $ax + by = \gcd(a,b)$ | Bezout's identity |
| $a^{p-1} \equiv 1 \pmod p$ | Fermat's little theorem ($p$ prime, $\gcd(a,p)=1$) |
| $ax \equiv b \pmod n$ solvable iff $\gcd(a,n) \mid b$ | Linear congruence |

## Sequences and Series

| Formula | |
|---------|---|
| $a_n = a_1 + (n-1)d$ | Arithmetic $n$-th term |
| $S_n = \frac{n}{2}(a_1 + a_n)$ | Arithmetic sum |
| $a_n = a_1 r^{n-1}$ | Geometric $n$-th term |
| $S_n = a_1 \frac{1-r^n}{1-r}$ | Geometric finite sum |
| $S_\infty = \frac{a_1}{1-r}$ ($|r|<1$) | Geometric infinite sum |
| $\sum_{i=1}^n i = \frac{n(n+1)}{2}$ | Triangular numbers |
| $\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$ | Sum of squares |
| $\sum_{i=1}^n i^3 = \left(\frac{n(n+1)}{2}\right)^2$ | Sum of cubes |

## Calculus - Differentiation

| $f(x)$ | $f'(x)$ |
|---------|----------|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |
| $a^x$ | $a^x \ln a$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |

| Rule | Formula |
|------|---------|
| Product | $(fg)' = f'g + fg'$ |
| Quotient | $(f/g)' = (f'g - fg')/g^2$ |
| Chain | $[f(g(x))]' = f'(g(x)) \cdot g'(x)$ |

## Calculus - Integration

| $f(x)$ | $\int f(x)\, dx$ |
|---------|-------------------|
| $x^n$ | $\frac{x^{n+1}}{n+1} + C$ |
| $1/x$ | $\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |

$$\int_a^b f(x)\, dx = F(b) - F(a)$$

## Proof Templates

| Method | Key step |
|--------|----------|
| Direct | Assume hypothesis, derive conclusion |
| Contrapositive | Prove $\lnot Q \to \lnot P$ |
| Contradiction | Assume negation, find contradiction |
| Induction | Base case + (assume $P(k)$ $\Rightarrow$ prove $P(k+1)$) |

## Relations Quick Check

| Type | Properties needed |
|------|-------------------|
| Equivalence relation | Reflexive + Symmetric + Transitive |
| Partial order | Reflexive + Antisymmetric + Transitive |
| Total order | Partial order + every pair comparable |
