---
title: "Propositional Logic"
order: 1
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["propositions", "connectives", "truth-tables", "natural-deduction"]
---

## Propositions and Connectives

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

## Truth Tables

| $P$ | $Q$ | $P \land Q$ | $P \lor Q$ | $P \to Q$ | $\neg P$ |
|-----|-----|-------------|------------|-----------|----------|
| T | T | T | T | T | F |
| T | F | F | T | F | F |
| F | T | F | T | T | T |
| F | F | F | F | T | T |

**Key insight**: $P \to Q$ is false **only** when $P$ is true and $Q$ is false.

## Natural Deduction Rules

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

## Proof Structure in Agda Style

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

## Common Equivalences

| Equivalence | Name |
|-------------|------|
| $\neg \neg P \equiv P$ | Double negation (classical only) |
| $P \to Q \equiv \neg P \lor Q$ | Material implication |
| $\neg(P \land Q) \equiv \neg P \lor \neg Q$ | De Morgan |
| $\neg(P \lor Q) \equiv \neg P \land \neg Q$ | De Morgan |
| $P \leftrightarrow Q \equiv (P \to Q) \land (Q \to P)$ | Biconditional definition |

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
