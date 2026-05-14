---
title: "Propositional Logic"
order: 1
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["propositions", "connectives", "truth-tables", "natural-deduction"]
---

## Propositions and Connectives

:::eli10

A **proposition** is just a sentence that's either true or false. Like "it's raining" or "2 + 2 = 5".

We combine propositions using logic words:

- **AND** ($\land$) — both must be true
- **OR** ($\lor$) — at least one must be true
- **NOT** ($\neg$) — flips true to false
- **IF...THEN** ($\to$) — "if it rains, I take an umbrella"

:::

:::eli15

A **proposition** is a statement that is either true or false — no in-between.

We connect propositions with **logical connectives**:

| Symbol | Name | Meaning |
|--------|------|---------|
| $\land$ | Conjunction | "and" — both sides true |
| $\lor$ | Disjunction | "or" — at least one side true |
| $\to$ | Implication | "if P then Q" |
| $\neg$ | Negation | "not" — flips the truth value |
| $\leftrightarrow$ | Biconditional | "if and only if" — both sides same |

**Operator precedence** (like BODMAS for logic): $\neg$ binds tightest, then $\land$, then $\lor$, then $\to$, then $\leftrightarrow$.

:::

:::eli20

A **proposition** is a statement that is either true or false.

| Symbol | Name | Read as | Agda notation |
|--------|------|---------|---------------|
| $\land$ | Conjunction | "and" | `_×_` or `_∧_` |
| $\lor$ | Disjunction | "or" | `_⊎_` or `_∨_` |
| $\to$ | Implication | "if...then" | `_→_` |
| $\neg$ | Negation | "not" | `¬_` (defined as $P \to \bot$) |
| $\leftrightarrow$ | Biconditional | "iff" | `_↔_` |
| $\top$ | Top/True | "true" | `⊤` |
| $\bot$ | Bottom/False | "false" | `⊥` |

### Precedence (highest to lowest)

| Priority | Connective |
|----------|-----------|
| 1 | $\neg$ |
| 2 | $\land$ |
| 3 | $\lor$ |
| 4 | $\to$ |
| 5 | $\leftrightarrow$ |

> $\to$ is **right-associative**: $A \to B \to C$ means $A \to (B \to C)$

:::

## Truth Tables

:::eli10

A truth table shows every possible combination of true/false and what the result is.

The tricky one is **IF...THEN** ($\to$): it's only false when the "if" part is true but the "then" part is false. "If pigs fly, I'll eat my hat" is technically true (because pigs don't fly).

:::

:::eli15

Truth tables list all possible input combinations and the resulting output:

| $P$ | $Q$ | $P \land Q$ | $P \lor Q$ | $P \to Q$ |
|-----|-----|-------------|------------|-----------|
| T | T | T | T | T |
| T | F | F | T | **F** |
| F | T | F | T | T |
| F | F | F | F | T |

**Key insight**: $P \to Q$ is false **only** when $P$ is true and $Q$ is false. A false premise makes any implication vacuously true.

:::

:::eli20

| $P$ | $Q$ | $P \land Q$ | $P \lor Q$ | $P \to Q$ | $\neg P$ |
|-----|-----|-------------|------------|-----------|----------|
| T | T | T | T | T | F |
| T | F | F | T | F | F |
| F | T | F | T | T | T |
| F | F | F | F | T | T |

**Key insight**: $P \to Q$ is false **only** when $P$ is true and $Q$ is false.

:::

## Natural Deduction Rules

:::eli10

Natural deduction is like a game with rules. Each connective (AND, OR, IF-THEN) has:
- **Introduction rules** — how to build/create it
- **Elimination rules** — how to take it apart and use it

For example: if you know A is true AND B is true, you can combine them into "A AND B". That's the AND introduction rule.

:::

:::eli15

Natural deduction gives us formal proof rules. Each connective has two kinds of rules:

**Introduction** (how to construct):
- $\land$-I: Have $P$ and $Q$ separately? Combine into $P \land Q$
- $\lor$-I: Have $P$? You can claim $P \lor Q$ (for any Q)
- $\to$-I: Assume $P$, derive $Q$? Then you've proved $P \to Q$

**Elimination** (how to use):
- $\land$-E: Have $P \land Q$? Extract either $P$ or $Q$
- $\lor$-E: Have $P \lor Q$? Handle both cases separately to reach the same conclusion
- $\to$-E (modus ponens): Have $P \to Q$ and $P$? Conclude $Q$

:::

:::eli20

### Introduction Rules

| Connective | Rule | Meaning |
|-----------|------|---------|
| $\land$-I | From $P$ and $Q$, derive $P \land Q$ | Pair both proofs |
| $\lor$-I₁ | From $P$, derive $P \lor Q$ | Inject left |
| $\lor$-I₂ | From $Q$, derive $P \lor Q$ | Inject right |
| $\to$-I | Assume $P$, derive $Q$; conclude $P \to Q$ | Lambda abstraction |
| $\neg$-I | Assume $P$, derive $\bot$; conclude $\neg P$ | Proof by contradiction |

### Elimination Rules

| Connective | Rule | Meaning |
|-----------|------|---------|
| $\land$-E₁ | From $P \land Q$, derive $P$ | Project first |
| $\land$-E₂ | From $P \land Q$, derive $Q$ | Project second |
| $\lor$-E | From $P \lor Q$, $P \to R$, $Q \to R$; derive $R$ | Case analysis |
| $\to$-E | From $P \to Q$ and $P$, derive $Q$ | Function application (modus ponens) |
| $\neg$-E | From $P$ and $\neg P$, derive $\bot$ | Contradiction |
| $\bot$-E | From $\bot$, derive anything | Ex falso quodlibet |

:::

## Proof Structure in Agda Style

:::eli10

In this module, proofs are written as programs. Think of a proof like a function: it takes evidence in and produces evidence out. If you can write the program, you've proved the theorem.

:::

:::eli15

Proofs in Agda are programs. The type is the theorem; the implementation is the proof.

```
-- AND: pair up two proofs
proof : A × B
proof = ( proofA , proofB )

-- IF-THEN: a function from evidence of A to evidence of B
proof : A → B
proof = λ a → ...
```

The key insight: logical connectives correspond to type constructors (Curry-Howard correspondence).

:::

:::eli20

```
-- Conjunction introduction
proof : A × B
proof = ( proofA , proofB )

-- Implication introduction
proof : A → B
proof = λ a → ...  -- assume a : A, produce something of type B

-- Disjunction elimination
proof : A ⊎ B → C
proof (inj₁ a) = ...  -- case when left
proof (inj₂ b) = ...  -- case when right
```

:::

## Common Equivalences

:::eli10

Some logic expressions mean the same thing, just written differently:

- **Double NOT** cancels out: "not not raining" = "raining"
- **De Morgan's laws**: "not (A and B)" = "not A or not B" (break the AND, flip everything)
- **IF-THEN rewrite**: "if P then Q" = "not P or Q"

:::

:::eli15

| Equivalence | Name | Intuition |
|-------------|------|-----------|
| $\neg \neg P \equiv P$ | Double negation | Two negations cancel (classical logic only!) |
| $P \to Q \equiv \neg P \lor Q$ | Material implication | "if P then Q" means "not-P or Q" |
| $\neg(P \land Q) \equiv \neg P \lor \neg Q$ | De Morgan | Break AND → OR with negations |
| $\neg(P \lor Q) \equiv \neg P \land \neg Q$ | De Morgan | Break OR → AND with negations |

:::

:::eli20

| Equivalence | Name |
|-------------|------|
| $\neg \neg P \equiv P$ | Double negation (classical only) |
| $P \to Q \equiv \neg P \lor Q$ | Material implication |
| $\neg(P \land Q) \equiv \neg P \lor \neg Q$ | De Morgan |
| $\neg(P \lor Q) \equiv \neg P \land \neg Q$ | De Morgan |
| $P \leftrightarrow Q \equiv (P \to Q) \land (Q \to P)$ | Biconditional definition |

:::

## Practice Problems

:::eli10

**Try this**: If you know "it's sunny AND warm", what can you conclude? (Answer: you can say "it's sunny" on its own, or "it's warm" on its own — that's the AND elimination rule!)

:::

:::eli15

<details>
<summary>Prove $A \land B \to B \land A$ (AND is commutative)</summary>

Strategy: Assume $A \land B$. Extract $B$ and $A$ separately. Recombine as $B \land A$.

1. Assume $A \land B$
2. $B$ (by $\land$-E₂)
3. $A$ (by $\land$-E₁)
4. $B \land A$ (by $\land$-I on 2, 3)
5. Discharge assumption → $A \land B \to B \land A$
</details>

:::

:::eli20

<details>
<summary>Practice: Prove $A \land B \to B \land A$</summary>

In Agda style:
```
swap : A × B → B × A
swap (a , b) = (b , a)
```

In natural deduction:
1. Assume $A \land B$
2. $A$ (by $\land$-E₁ on 1)
3. $B$ (by $\land$-E₂ on 1)
4. $B \land A$ (by $\land$-I on 3, 2)
5. $A \land B \to B \land A$ (by $\to$-I, discharging 1)
</details>

<details>
<summary>Practice: Prove $A \to \neg\neg A$</summary>

Goal: $A \to (A \to \bot) \to \bot$

```
dne-intro : A → ¬ ¬ A
dne-intro a = λ f → f a
```

1. Assume $A$
2. Assume $\neg A$ (i.e., $A \to \bot$)
3. $\bot$ (by $\to$-E on 2, 1)
4. $\neg\neg A$ (by $\to$-I, discharging 2)
5. $A \to \neg\neg A$ (by $\to$-I, discharging 1)
</details>

<details>
<summary>Practice: Prove $(A \to B) \to (B \to C) \to (A \to C)$</summary>

```
comp : (A → B) → (B → C) → (A → C)
comp f g = λ a → g (f a)
```

This is function composition: given proofs of $A \to B$ and $B \to C$, compose them.
</details>

:::
