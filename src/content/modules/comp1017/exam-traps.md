---
title: "Exam Traps"
order: 91
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["exam tips", "common mistakes", "pitfalls"]
---

# Exam Traps - Common Mistakes

## Sets

| Trap | Correct |
|------|---------|
| Confusing $\in$ and $\subseteq$ | $\{1\} \in \{\{1\}, 2\}$ but $\{1\} \subseteq \{1, 2\}$ |
| $\emptyset \in \mathcal{P}(A)$ always | Not the same as $\emptyset \subseteq A$ (also true, but different) |
| $A \subseteq B$ does NOT mean $A \in B$ | Subset vs element |
| $|A \cup B| \neq |A| + |B|$ | Must subtract $|A \cap B|$ |
| $\mathcal{P}(\emptyset) = \{\emptyset\}$, not $\emptyset$ | Power set of empty set has one element |

## Logic

| Trap | Correct |
|------|---------|
| Converse $\neq$ original | $p \to q \not\equiv q \to p$ |
| "If $p$ then $q$" when $p$ is false | The implication is TRUE (vacuous truth) |
| $\lnot(p \to q) \neq \lnot p \to \lnot q$ | Correct: $\lnot(p \to q) = p \land \lnot q$ |
| Quantifier order matters | $\forall x \exists y \neq \exists y \forall x$ in general |
| Negating "for all" | $\lnot(\forall x, P) = \exists x, \lnot P$ (NOT $\forall x, \lnot P$) |

## Proof

| Trap | Correct |
|------|---------|
| Forgetting base case in induction | Always state and verify it |
| Assuming what you're trying to prove | Especially in inductive step: assume $P(k)$, prove $P(k+1)$ |
| "Proof by example" | Showing it works for specific values is NOT a proof |
| Not using the inductive hypothesis | If you don't use it, your proof is likely wrong |
| Proof by contradiction: forgetting to state assumption | Must explicitly say "Assume for contradiction that..." |

## Number Theory

| Trap | Correct |
|------|---------|
| Cancelling in modular arithmetic without checking | $ac \equiv bc \pmod n$ only gives $a \equiv b$ when $\gcd(c,n) = 1$ |
| $\gcd(0, n) = n$, not $0$ | $n$ divides $0$ |
| Fermat requires $\gcd(a,p) = 1$ | If $p \mid a$, then $a^{p-1} \not\equiv 1 \pmod p$ |
| $ax \equiv b \pmod n$ may have no solution | Check $\gcd(a,n) \mid b$ first |
| In Euclidean algorithm, remainder must be positive | $a = qb + r$ where $0 \leq r < b$ |

## Sequences/Series

| Trap | Correct |
|------|---------|
| Geometric sum formula requires $r \neq 1$ | If $r = 1$, sum is just $na_1$ |
| $a_n \to 0$ does NOT mean $\sum a_n$ converges | Harmonic series: $\sum \frac{1}{n}$ diverges |
| Off-by-one in index | Is first term $a_0$ or $a_1$? Check carefully |
| $\sum_{i=0}^n$ has $n+1$ terms | Not $n$ terms |
| Wrong characteristic equation | For $a_n = 3a_{n-1} - 2a_{n-2}$, equation is $x^2 - 3x + 2 = 0$ |

## Calculus

| Trap | Correct |
|------|---------|
| Forgetting $+C$ in indefinite integrals | Marks lost every time |
| Chain rule omission | $\frac{d}{dx}[\sin(3x)] = 3\cos(3x)$, NOT $\cos(3x)$ |
| $\frac{d}{dx}[e^{2x}] = 2e^{2x}$, not $e^{2x}$ | Chain rule again |
| Product rule: $(fg)' \neq f'g'$ | Must use $f'g + fg'$ |
| $\int \frac{1}{x}\, dx = \ln|x| + C$ | Absolute value! |
| $\int x^{-1}\, dx \neq \frac{x^0}{0}$ | Power rule doesn't apply when $n = -1$ |
| Second derivative test: $f''=0$ is inconclusive | Need first derivative sign test |

## Relations

| Trap | Correct |
|------|---------|
| Minimal $\neq$ minimum | Minimum must be $\leq$ everything; minimal just has nothing below |
| Antisymmetric allows $(a,a)$ | Only forbids $aRb \land bRa$ for $a \neq b$ |
| Symmetric + antisymmetric is possible | Only diagonal elements: $R \subseteq \{(a,a) : a \in A\}$ |
| Not all elements in a poset are comparable | That's what "partial" means |
| Transitive closure may add many edges | Must iterate until no new edges added |

## General Exam Strategy

1. **Read the question twice** - identify exactly what's being asked
2. **State definitions** before applying them - shows understanding
3. **Check edge cases** - empty set, $n = 0$, $n = 1$
4. **Verify your answer** - substitute back in where possible
5. **Watch your quantifiers** - "for all" vs "there exists"
