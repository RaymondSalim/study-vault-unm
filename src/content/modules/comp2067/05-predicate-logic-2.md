---
title: "Predicate Logic II"
order: 5
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["quantifier-rules", "nested-quantifiers", "proofs", "natural-deduction"]
---

## Natural Deduction Rules for Quantifiers

:::eli10

There are rules for "using" and "creating" for-all and there-exists statements:

- To **prove** "for all x, P(x)": show P works for any x you might pick (without knowing anything special about x)
- To **use** "for all x, P(x)": plug in any specific value to get P of that value
- To **prove** "there exists x, P(x)": show a specific example that works
- To **use** "there exists x, P(x)": give the unknown thing a name and reason about it (but your final answer can't mention that name)

:::

:::eli15

Natural deduction has four rules for quantifiers:

**Introduction (proving)**:
- $\forall$-I: To prove $\forall x. P(x)$, let $x$ be arbitrary (no assumptions about it) and prove $P(x)$. The critical restriction: $x$ must not appear free in any undischarged assumption.
- $\exists$-I: To prove $\exists x. P(x)$, provide a specific witness $t$ and prove $P(t)$.

**Elimination (using)**:
- $\forall$-E: From $\forall x. P(x)$, instantiate to $P(t)$ for any term $t$.
- $\exists$-E: From $\exists x. P(x)$, assume $P(c)$ for a fresh name $c$, derive your conclusion $R$, then discharge (where $c$ must not appear in $R$).

:::

:::eli20

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

:::

## Quantifier Rules in Agda

:::eli10

In Agda, "for all" is just a function — it takes any input and gives back a proof. "There exists" is just a pair — the example and its proof bundled together. Using "for all" is calling the function on a specific input. Using "there exists" is unpacking the pair to get the example and its proof.

:::

:::eli15

In Agda, quantifier rules correspond directly to function and pair operations:

- **$\forall$-intro**: Define a function that works for all inputs — `f : (x : A) -> P x`
- **$\forall$-elim**: Apply the function to a specific value — `f a : P a`
- **$\exists$-intro**: Construct a pair of witness + proof — `(a , pa) : Sigma A P`
- **$\exists$-elim**: Unpack the pair and use both components — pattern match on `(a , pa)`

This is the Curry-Howard correspondence in action: logical reasoning IS programming.

:::

:::eli20

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

:::

## Nested Quantifiers

:::eli10

The order of "for all" and "there exists" matters a lot! "For every person there's a food they like" (different food per person) is very different from "there's one food that everyone likes" (one food for all people). The second is much harder to satisfy. Same quantifiers in a row ($\forall\forall$ or $\exists\exists$) can be swapped freely.

:::

:::eli15

When quantifiers are nested, order matters for mixed quantifiers:

- $\forall x. \exists y. R(x,y)$: "For each x, some y exists" — y can depend on x (weaker)
- $\exists y. \forall x. R(x,y)$: "One y works for ALL x" — much stronger

The stronger form implies the weaker: $\exists y. \forall x. R(x,y) \to \forall x. \exists y. R(x,y)$, but NOT the reverse.

Same-type quantifiers commute freely: $\forall\forall$ can swap, $\exists\exists$ can swap. But $\forall\exists$ CANNOT be swapped to $\exists\forall$ (only the other direction works).

:::

:::eli20

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

:::

## Proofs with Quantifiers

:::eli10

Doing proofs with "for all" and "there exists" follows the rules: introduce arbitrary variables, use known facts, and package up the results. It's like a recipe — you follow the introduction and elimination rules step by step to build the proof.

:::

:::eli15

Proofs with quantifiers combine the quantifier rules with propositional logic rules:

**General strategy**:
- To prove $\forall x. \phi(x)$: Let $x$ be arbitrary, prove $\phi(x)$, then generalize
- To use $\forall x. \phi(x)$: Instantiate with whatever value you need
- To prove $\exists x. \phi(x)$: Find a specific witness and verify it works
- To use $\exists x. \phi(x)$: Give the witness a fresh name, use it to derive your goal, ensure the name doesn't leak into the conclusion

These combine with $\land$-I, $\lor$-E, $\to$-I, etc. from propositional logic.

:::

:::eli20

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

:::

## Distributivity of Quantifiers

:::eli10

Some ways of rearranging quantifiers with AND/OR are always valid, and some are only valid in one direction. For example, "for all x, P(x) AND Q(x)" is the same as "for all x P(x) AND for all x Q(x)" — but the OR version only works one way.

:::

:::eli15

How quantifiers interact with $\land$ and $\lor$:

- $\forall$ distributes over $\land$ (both directions): $\forall x. (P \land Q) \iff (\forall x. P) \land (\forall x. Q)$
- $\exists$ distributes over $\lor$ (both directions): $\exists x. (P \lor Q) \iff (\exists x. P) \lor (\exists x. Q)$
- $\forall$ over $\lor$: only one direction works — if everything satisfies P or everything satisfies Q, then everything satisfies "P or Q," but not conversely
- $\exists$ over $\land$: only one direction — if something satisfies both, then something satisfies P and something satisfies Q, but not conversely

:::

:::eli20

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

:::
