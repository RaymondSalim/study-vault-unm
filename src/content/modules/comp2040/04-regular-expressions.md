---
title: "Regular Expressions"
order: 4
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["regex", "regular-expressions", "equivalence"]
---

## Syntax of Regular Expressions

:::eli10

Regular expressions are like a recipe language for describing patterns. You can say "any number of a's" (a*), "a or b" (a+b), or "a followed by b" (ab). These recipes can describe exactly the same word collections that DFAs and NFAs can recognise -- no more, no less.

:::

:::eli15

Regular expressions are a compact notation for describing regular languages. They are built from base cases (empty set, empty string, single symbols) using three operations: union (either pattern), concatenation (one pattern followed by another), and Kleene star (zero or more repetitions). They have the same expressive power as finite automata -- any language describable by one can be described by the other.

:::

:::eli20

Given alphabet $\Sigma$, regular expressions are defined recursively:

| Expression | Language |
|-----------|---------|
| $\emptyset$ | $\emptyset$ (empty language) |
| $\varepsilon$ | $\{\varepsilon\}$ |
| $a$ (for $a \in \Sigma$) | $\{a\}$ |
| $r_1 + r_2$ | $L(r_1) \cup L(r_2)$ |
| $r_1 \cdot r_2$ | $L(r_1) \cdot L(r_2)$ (concatenation) |
| $r^*$ | $L(r)^*$ (Kleene star) |

:::

## Operator Precedence

:::eli10

Just like in maths where multiplication comes before addition, regular expressions have an order: star (*) is done first, then concatenation (gluing letters together), and union (+) is done last. Parentheses can override this, just like in arithmetic.

:::

:::eli15

When reading a regular expression without parentheses, Kleene star binds tightest, then concatenation, then union. For example, ab*+c means "a followed by zero or more b's" OR "c" -- not "a followed by (zero or more b's or c)." Understanding precedence is essential for correctly interpreting and writing regular expressions.

:::

:::eli20

| Priority | Operator | Meaning |
|----------|----------|---------|
| Highest | $*$ | Kleene star |
| Middle | $\cdot$ | Concatenation |
| Lowest | $+$ | Union |

So $ab^*+c$ means $(a \cdot (b^*)) + c$, NOT $a \cdot (b^* + c)$.

:::

## Equivalence: RE ↔ FA

:::eli10

Regular expressions and finite automata (DFA/NFA) are two different ways of describing the exact same thing. You can always convert one into the other. It is like having a drawing and written instructions for the same LEGO model -- different formats, same result.

:::

:::eli15

A fundamental theorem states that regular expressions and finite automata are equivalent in power. Thompson's construction converts any RE into an NFA by building small automata for each part of the expression and connecting them. State elimination converts a DFA into an RE by removing states one by one and labelling transitions with regular expressions. This equivalence establishes that both formalisms define exactly the regular languages.

:::

:::eli20

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

:::

## Common RE Patterns

:::eli10

Here are some handy patterns: (0+1)* means "any binary string at all," (0+1)*1 means "ends in 1," and 0*10* means "exactly one 1 somewhere." Learning common patterns helps you read and write regular expressions more quickly.

:::

:::eli15

Some common regular expression patterns worth memorising: (0+1)* matches all binary strings; adding a suffix like 1 restricts to strings ending with that symbol; 0*10* forces exactly one occurrence of 1. Building complex patterns from simple ones using union, concatenation, and star is a core skill for this topic.

:::

:::eli20

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

:::
