---
title: "Context-Free Grammars"
order: 7
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["CFG", "grammar", "derivation", "ambiguity"]
---

## Formal Definition

:::eli10

A context-free grammar is like a recipe book for building words. You start with a "start symbol" and replace it using rules until you have only real letters left. For example, S -> aSb | empty means "you can put an 'a' on the left and a 'b' on the right, or stop." This builds words like ab, aabb, aaabbb.

:::

:::eli15

A CFG consists of variables (non-terminals), terminals (the actual alphabet symbols), production rules, and a start symbol. Each rule lets you replace a single non-terminal with a string of terminals and non-terminals. By repeatedly applying rules starting from the start symbol, you generate the language. CFGs are more powerful than regular expressions and define context-free languages.

:::

:::eli20

A CFG is a 4-tuple $G = (V, T, P, S)$:

| Component | Meaning |
|-----------|---------|
| $V$ | Finite set of variables (non-terminals) |
| $T$ | Finite set of terminals ($V \cap T = \emptyset$) |
| $P$ | Finite set of productions: $A \to \gamma$ where $A \in V$, $\gamma \in (V \cup T)^*$ |
| $S \in V$ | Start symbol |

:::

## Derivations

:::eli10

A derivation is the step-by-step process of using grammar rules to build a word. At each step you pick one variable and replace it using a rule. When there are no variables left, you have your final word. It is like following craft instructions one step at a time until the project is done.

:::

:::eli15

A derivation shows how a word is produced from the start symbol by applying productions one at a time. "Directly derives" means one production step; "derives" (with star) means zero or more steps. A leftmost derivation always expands the leftmost non-terminal, while a rightmost derivation expands the rightmost. The language of a grammar is the set of all terminal strings derivable from the start symbol.

:::

:::eli20

**Directly derives**: $\alpha A \beta \Rightarrow \alpha \gamma \beta$ if $A \to \gamma \in P$

**Derives** ($\Rightarrow^*$): Zero or more derivation steps.

**Language**: $L(G) = \{w \in T^* \mid S \Rightarrow^* w\}$

### Types of Derivation

| Type | Rule |
|------|------|
| Leftmost ($\Rightarrow_{lm}$) | Always expand the leftmost non-terminal |
| Rightmost ($\Rightarrow_{rm}$) | Always expand the rightmost non-terminal |

:::

## Example CFG

:::eli10

The grammar S -> aSb | empty builds words with equal a's and b's in order (like ab, aabb, aaabbb). Each time you use the rule S -> aSb, you wrap another a...b pair around the middle. When you use S -> empty, you stop.

:::

:::eli15

Consider G = ({S}, {a,b}, {S -> aSb | epsilon}, S). Starting from S, each application of S -> aSb adds one "a" on the left and one "b" on the right. Applying S -> epsilon terminates the derivation. This generates exactly {a^n b^n | n >= 0}, a classic context-free language that is not regular.

:::

:::eli20

$G = (\{S\}, \{a, b\}, \{S \to aSb \mid \varepsilon\}, S)$

Derivation of $aabb$:
$$S \Rightarrow aSb \Rightarrow aaSbb \Rightarrow aa\varepsilon bb = aabb$$

Language: $L(G) = \{a^nb^n \mid n \geq 0\}$

:::

## Derivation Trees (Parse Trees)

:::eli10

A parse tree is like a family tree for a word. The start symbol is at the top (the ancestor), and each rule application creates branches. The leaves (bottom of the tree) are the actual letters, and reading them left to right gives you the final word. It is a picture of how the word was built.

:::

:::eli15

A derivation tree (parse tree) visually represents a derivation. The root is the start symbol, internal nodes are non-terminals, and leaves are terminals. Each internal node with its children corresponds to one production rule. Reading the leaves left to right gives the derived string. Parse trees abstract away the order of rule applications, showing only the structure.

:::

:::eli20

- Root = start symbol
- Internal nodes = non-terminals
- Leaves = terminals (read left to right = derived string)
- Each internal node + children corresponds to one production

:::

## Ambiguity

:::eli10

A grammar is ambiguous if the same word can be built in two genuinely different ways (different tree shapes, not just different orderings). It is like having two different sets of instructions that both produce the same LEGO model but with a different internal structure. This causes problems when you need to decide what a word "means."

:::

:::eli15

A grammar is ambiguous if some string has two or more distinct parse trees (equivalently, two different leftmost derivations). Ambiguity is problematic in programming languages because different parse trees imply different meanings (e.g., operator precedence). You can often fix ambiguity by restructuring the grammar to encode precedence and associativity through additional non-terminals. However, some context-free languages are inherently ambiguous -- every grammar for them is ambiguous.

:::

:::eli20

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

:::

## CFG ↔ PDA Equivalence

:::eli10

Context-free grammars and pushdown automata are two sides of the same coin. Anything you can describe with grammar rules, you can recognise with a PDA's stack, and vice versa. It is like recipes and taste-testers -- one creates the food, the other checks if it is correct, and they cover exactly the same dishes.

:::

:::eli15

A fundamental theorem states that a language is context-free if and only if some PDA accepts it. To convert a CFG to a PDA, you build a single-state machine that simulates leftmost derivation using the stack. To convert a PDA to a CFG, you create a variable for each (state, stack symbol, state) triple representing what the PDA does between those states with that symbol. This establishes the exact equivalence of the two formalisms.

:::

:::eli20

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

:::
