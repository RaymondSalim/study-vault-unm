---
title: "Regular Expressions"
order: 4
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["regex", "regular-expressions", "equivalence"]
---

## Syntax of Regular Expressions

Given alphabet $\Sigma$, regular expressions are defined recursively:

| Expression | Language |
|-----------|---------|
| $\emptyset$ | $\emptyset$ (empty language) |
| $\varepsilon$ | $\{\varepsilon\}$ |
| $a$ (for $a \in \Sigma$) | $\{a\}$ |
| $r_1 + r_2$ | $L(r_1) \cup L(r_2)$ |
| $r_1 \cdot r_2$ | $L(r_1) \cdot L(r_2)$ (concatenation) |
| $r^*$ | $L(r)^*$ (Kleene star) |

## Operator Precedence

| Priority | Operator | Meaning |
|----------|----------|---------|
| Highest | $*$ | Kleene star |
| Middle | $\cdot$ | Concatenation |
| Lowest | $+$ | Union |

So $ab^*+c$ means $(a \cdot (b^*)) + c$, NOT $a \cdot (b^* + c)$.

## Equivalence: RE ↔ FA

**Theorem**: Regular expressions and finite automata define exactly the same class of languages (regular languages).

| Direction | Method |
|-----------|--------|
| RE → NFA | Thompson's construction (structural induction) |
| DFA → RE | State elimination |

### RE → NFA (Thompson's Construction)

Build NFA inductively:

| RE | NFA construction |
|----|-----------------|
| $a$ | Two states, one transition on $a$ |
| $r_1 + r_2$ | New start → $\varepsilon$ → NFA($r_1$) and $\varepsilon$ → NFA($r_2$) → $\varepsilon$ → new accept |
| $r_1 \cdot r_2$ | Accept of NFA($r_1$) → $\varepsilon$ → Start of NFA($r_2$) |
| $r^*$ | New start → $\varepsilon$ → NFA($r$) → $\varepsilon$ → new accept; plus $\varepsilon$ from accept back to NFA start; $\varepsilon$ from new start to new accept |

### DFA → RE (State Elimination)

1. Add new start state $s$ with $\varepsilon$ to old start
2. Add new accept state $f$ with $\varepsilon$ from all old accept states
3. Eliminate states one by one, replacing with RE labels on transitions
4. Final RE is the label on the single remaining $s \to f$ transition

## Common RE Patterns

| RE | Language |
|----|---------|
| $(0+1)^*$ | All binary strings |
| $(0+1)^*1$ | Binary strings ending in 1 |
| $0^*10^*$ | Exactly one 1 |
| $(01+10)^*$ | Alternating 0s and 1s (starting with either) |
| $a^*ba^*$ | Exactly one $b$ |

<details>
<summary>Practice: Write a RE for binary strings containing at least two 0s.</summary>

$(0+1)^* 0 (0+1)^* 0 (0+1)^*$

This ensures at least two 0s appear anywhere in the string.
</details>

<details>
<summary>Practice: Is ∅* = {ε}? Why?</summary>

Yes. $\emptyset^* = \bigcup_{i=0}^{\infty} \emptyset^i$. We have $\emptyset^0 = \{\varepsilon\}$ and $\emptyset^i = \emptyset$ for all $i \geq 1$. So $\emptyset^* = \{\varepsilon\}$.
</details>
