---
title: "Context-Free Grammars"
order: 7
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["CFG", "grammar", "derivation", "ambiguity"]
---

## Formal Definition

A CFG is a 4-tuple $G = (V, T, P, S)$:

| Component | Meaning |
|-----------|---------|
| $V$ | Finite set of variables (non-terminals) |
| $T$ | Finite set of terminals ($V \cap T = \emptyset$) |
| $P$ | Finite set of productions: $A \to \gamma$ where $A \in V$, $\gamma \in (V \cup T)^*$ |
| $S \in V$ | Start symbol |

## Derivations

**Directly derives**: $\alpha A \beta \Rightarrow \alpha \gamma \beta$ if $A \to \gamma \in P$

**Derives** ($\Rightarrow^*$): Zero or more derivation steps.

**Language**: $L(G) = \{w \in T^* \mid S \Rightarrow^* w\}$

### Types of Derivation

| Type | Rule |
|------|------|
| Leftmost ($\Rightarrow_{lm}$) | Always expand the leftmost non-terminal |
| Rightmost ($\Rightarrow_{rm}$) | Always expand the rightmost non-terminal |

## Example CFG

$G = (\{S\}, \{a, b\}, \{S \to aSb \mid \varepsilon\}, S)$

Derivation of $aabb$:
$$S \Rightarrow aSb \Rightarrow aaSbb \Rightarrow aa\varepsilon bb = aabb$$

Language: $L(G) = \{a^nb^n \mid n \geq 0\}$

## Derivation Trees (Parse Trees)

- Root = start symbol
- Internal nodes = non-terminals
- Leaves = terminals (read left to right = derived string)
- Each internal node + children corresponds to one production

## Ambiguity

A grammar is **ambiguous** if there exists a word $w \in L(G)$ with two different **leftmost derivations** (equivalently, two different parse trees).

### Classic Example: Expression Grammar

$E \to E + E \mid E * E \mid (E) \mid id$

The string $id + id * id$ has two parse trees:
1. $(id + id) * id$ — addition first
2. $id + (id * id)$ — multiplication first

### Fixing Ambiguity

Introduce precedence and associativity via additional non-terminals:

```
E → E + T | T
T → T * F | F
F → (E) | id
```

Now $*$ binds tighter than $+$ (unambiguous).

## CFG ↔ PDA Equivalence

**Theorem**: A language is context-free iff it is accepted by some PDA.

| Direction | Construction |
|-----------|-------------|
| CFG → PDA | Single-state PDA that simulates leftmost derivation on stack |
| PDA → CFG | Each variable $[q, A, p]$ generates strings that take PDA from state $q$ with $A$ on stack to state $p$ with $A$ popped |

<details>
<summary>Practice: Is the grammar S → SS | (S) | ε ambiguous?</summary>

Yes. The string "()()" has two leftmost derivations:
1. $S \Rightarrow SS \Rightarrow (S)S \Rightarrow ()S \Rightarrow ()(S) \Rightarrow ()()$
2. $S \Rightarrow SS \Rightarrow (S)S \Rightarrow ()S \Rightarrow ()SS \Rightarrow ()(S)S \Rightarrow ()()S \Rightarrow ()()$

Actually more carefully: $S \Rightarrow SS \Rightarrow (S)S \Rightarrow ()S \Rightarrow ()SS \to \ldots$ vs $S \Rightarrow SS \Rightarrow SSS \Rightarrow \ldots$ — the S→SS production creates ambiguity.
</details>

<details>
<summary>Practice: Write a CFG for {a^i b^j | i ≠ j}.</summary>

Split into $i > j$ and $i < j$:

$S \to A \mid B$
$A \to aA \mid aAb \mid a$ (more a's than b's)
$B \to Bb \mid aBb \mid b$ (more b's than a's)

Or more precisely:
$S \to A \mid B$,
$A \to aAb \mid aC$, $C \to aC \mid a$,
$B \to aBb \mid Db$, $D \to Db \mid b$
</details>
