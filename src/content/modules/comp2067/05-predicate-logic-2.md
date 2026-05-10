---
title: "Predicate Logic II"
order: 5
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["quantifier-rules", "nested-quantifiers", "proofs", "natural-deduction"]
---

## Natural Deduction Rules for Quantifiers

### Introduction Rules

| Rule | Name | How to use |
|------|------|-----------|
| $\forall$-I | Universal introduction | Prove $P(x)$ for **arbitrary** $x$ (no assumptions about $x$) |
| $\exists$-I | Existential introduction | Provide a **witness** $t$ and prove $P(t)$ |

### Elimination Rules

| Rule | Name | How to use |
|------|------|-----------|
| $\forall$-E | Universal elimination | From $\forall x. P(x)$, instantiate to $P(t)$ for any term $t$ |
| $\exists$-E | Existential elimination | From $\exists x. P(x)$, assume $P(c)$ for fresh $c$, derive $R$ (where $c \notin R$) |

### Critical Restrictions

| Rule | Restriction | Why |
|------|-------------|-----|
| $\forall$-I | $x$ must not be free in any undischarged assumption | Otherwise proof depends on specific $x$ |
| $\exists$-E | Fresh variable $c$ must not appear in conclusion $R$ | Otherwise conclusion depends on the witness |

## Quantifier Rules in Agda

```
-- ∀-introduction: define a function over all x
∀-intro : ((x : A) → P x) → (x : A) → P x
∀-intro f = f  -- just a function!

-- ∀-elimination: apply to a specific term
∀-elim : ((x : A) → P x) → (a : A) → P a
∀-elim f a = f a  -- function application

-- ∃-introduction: provide witness and proof
∃-intro : (a : A) → P a → Σ[ x ∈ A ] P x
∃-intro a pa = (a , pa)

-- ∃-elimination: use the witness
∃-elim : Σ[ x ∈ A ] P x → ((x : A) → P x → B) → B
∃-elim (a , pa) f = f a pa
```

## Nested Quantifiers

### Order matters for mixed quantifiers

| Formula | Meaning | Example (ℕ) |
|---------|---------|-------------|
| $\forall x. \forall y. R(x,y)$ | Every pair satisfies $R$ | "All numbers are related" |
| $\exists x. \exists y. R(x,y)$ | Some pair satisfies $R$ | "Some pair is related" |
| $\forall x. \exists y. R(x,y)$ | For each $x$, some $y$ exists (may depend on $x$) | "Every number has a successor" |
| $\exists y. \forall x. R(x,y)$ | One $y$ works for all $x$ | "There is a universal $y$" |

**Logical strength**: $\exists y. \forall x. R(x,y) \to \forall x. \exists y. R(x,y)$ but NOT vice versa.

### Commutativity table

| Swap | Valid? |
|------|--------|
| $\forall\forall \to \forall\forall$ | Yes |
| $\exists\exists \to \exists\exists$ | Yes |
| $\exists\forall \to \forall\exists$ | Yes |
| $\forall\exists \to \exists\forall$ | **No** |

## Proofs with Quantifiers

### Example: $\forall x. P(x) \land \forall x. Q(x) \to \forall x. (P(x) \land Q(x))$

| Step | Statement | Rule |
|------|-----------|------|
| 1 | $\forall x. P(x)$ | Assumption |
| 2 | $\forall x. Q(x)$ | Assumption |
| 3 | Let $a$ be arbitrary | For $\forall$-I |
| 4 | $P(a)$ | $\forall$-E on 1 |
| 5 | $Q(a)$ | $\forall$-E on 2 |
| 6 | $P(a) \land Q(a)$ | $\land$-I on 4, 5 |
| 7 | $\forall x. P(x) \land Q(x)$ | $\forall$-I on 6 (discharging $a$) |

### Example: $\exists x. (P(x) \land Q(x)) \to \exists x. P(x)$

| Step | Statement | Rule |
|------|-----------|------|
| 1 | $\exists x. (P(x) \land Q(x))$ | Assumption |
| 2 | Assume $P(c) \land Q(c)$ for fresh $c$ | For $\exists$-E |
| 3 | $P(c)$ | $\land$-E₁ on 2 |
| 4 | $\exists x. P(x)$ | $\exists$-I with witness $c$ |
| 5 | $\exists x. P(x)$ | $\exists$-E on 1 (using 2-4), $c$ not in conclusion |

## Distributivity of Quantifiers

| Statement | Valid? |
|-----------|--------|
| $\forall x. (P(x) \land Q(x)) \leftrightarrow (\forall x. P(x)) \land (\forall x. Q(x))$ | Yes |
| $\exists x. (P(x) \lor Q(x)) \leftrightarrow (\exists x. P(x)) \lor (\exists x. Q(x))$ | Yes |
| $\forall x. (P(x) \lor Q(x)) \leftarrow (\forall x. P(x)) \lor (\forall x. Q(x))$ | Yes (→ fails) |
| $\exists x. (P(x) \land Q(x)) \to (\exists x. P(x)) \land (\exists x. Q(x))$ | Yes (← fails) |

<details>
<summary>Practice: Prove $(\exists x. P(x)) \to \neg(\forall x. \neg P(x))$</summary>

| Step | Statement | Rule |
|------|-----------|------|
| 1 | $\exists x. P(x)$ | Assumption |
| 2 | Assume $\forall x. \neg P(x)$ | For $\neg$-I |
| 3 | Assume $P(c)$ for fresh $c$ | For $\exists$-E on 1 |
| 4 | $\neg P(c)$ | $\forall$-E on 2 |
| 5 | $\bot$ | $\neg$-E on 3, 4 |
| 6 | $\bot$ | $\exists$-E on 1 (from 3-5) |
| 7 | $\neg(\forall x. \neg P(x))$ | $\neg$-I discharging 2 |

In Agda:
```
proof : Σ[ x ∈ A ] P x → ¬ ((x : A) → ¬ P x)
proof (a , pa) f = f a pa
```
</details>

<details>
<summary>Practice: Why does $\forall$-I fail if $x$ is free in an assumption?</summary>

Suppose we assume $P(x)$ and try to conclude $\forall x. P(x)$.

This would say "from one specific case $P(x)$, everything satisfies $P$" — clearly invalid.

The restriction ensures we proved $P(x)$ for a truly **arbitrary** $x$ with no special properties assumed.

**Concrete example of the error**: Assume "x is even". Then $x + x$ is even. Therefore $\forall x.$ $x + x$ is even. This happens to be true, but the proof is wrong — we used a non-discharged assumption about $x$.
</details>

<details>
<summary>Practice: Prove $\forall x. P(x) \to \exists x. P(x)$ (requires non-empty domain)</summary>

In Agda (requires an element of $A$):
```
proof : (a : A) → ((x : A) → P x) → Σ[ x ∈ A ] P x
proof a f = (a , f a)
```

We need at least one element $a : A$ to serve as the existential witness. This is why the theorem requires a non-empty domain.
</details>
