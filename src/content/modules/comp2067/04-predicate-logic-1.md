---
title: "Predicate Logic I"
order: 4
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["predicates", "quantifiers", "universal", "existential", "variables"]
---

## From Propositions to Predicates

| Concept | Propositional | Predicate |
|---------|--------------|-----------|
| Statement | $P$ (fixed truth value) | $P(x)$ (depends on $x$) |
| Domain | None | Universe of discourse |
| Variables | None | Free and bound |
| Quantification | None | $\forall$, $\exists$ |

A **predicate** $P(x)$ is a proposition-valued function: given a value for $x$, it yields a proposition.

## Quantifiers

| Symbol | Name | Agda | Meaning |
|--------|------|------|---------|
| $\forall x. P(x)$ | Universal | `(x : A) → P x` | For every $x$, $P(x)$ holds |
| $\exists x. P(x)$ | Existential | `Σ[ x ∈ A ] P x` | There exists an $x$ such that $P(x)$ |

### Type-theoretic reading

$$\forall x : A. \; P(x) \quad \longleftrightarrow \quad \Pi(x : A). \; P(x)$$
$$\exists x : A. \; P(x) \quad \longleftrightarrow \quad \Sigma(x : A). \; P(x)$$

## Free and Bound Variables

| Term | $x$ is | $y$ is |
|------|--------|--------|
| $P(x) \land Q(y)$ | Free | Free |
| $\forall x. P(x) \land Q(y)$ | Bound | Free |
| $\forall x. \exists y. R(x, y)$ | Bound | Bound |
| $(\forall x. P(x)) \land Q(x)$ | Bound in $\forall$, Free in $Q$ | — |

**Rules**:
- A quantifier **binds** its variable within its **scope**
- A variable can be free in one part and bound in another
- A **sentence** (closed formula) has no free variables
- Only sentences have definite truth values

## Scope

The scope of $\forall x$ in $\forall x. \phi$ is $\phi$.

| Formula | Scope of $\forall x$ | Parsing |
|---------|---------------------|---------|
| $\forall x. P(x) \to Q(x)$ | $P(x) \to Q(x)$ | $\forall x. (P(x) \to Q(x))$ |
| $(\forall x. P(x)) \to Q(x)$ | $P(x)$ only | $x$ in $Q$ is free |

> Convention: quantifiers extend as far right as possible.

## Negating Quantifiers

| Original | Negation |
|----------|----------|
| $\forall x. P(x)$ | $\exists x. \neg P(x)$ |
| $\exists x. P(x)$ | $\forall x. \neg P(x)$ |
| $\forall x. \exists y. R(x,y)$ | $\exists x. \forall y. \neg R(x,y)$ |

## Translating English to Predicate Logic

| English | Formula | Note |
|---------|---------|------|
| "All cats are mammals" | $\forall x. C(x) \to M(x)$ | Use $\to$ with $\forall$ |
| "Some cat is black" | $\exists x. C(x) \land B(x)$ | Use $\land$ with $\exists$ |
| "No cat flies" | $\forall x. C(x) \to \neg F(x)$ | or $\neg\exists x. C(x) \land F(x)$ |
| "Not all cats are black" | $\neg\forall x. C(x) \to B(x)$ | i.e., $\exists x. C(x) \land \neg B(x)$ |

> **Trap**: "All cats are mammals" is NOT $\forall x. C(x) \land M(x)$ (that says everything is both a cat and a mammal).

## Agda Encoding

```
-- Universal: dependent function type
∀-example : (n : ℕ) → n + 0 ≡ n
∀-example zero    = refl
∀-example (suc n) = cong suc (∀-example n)

-- Existential: dependent pair (Sigma type)
∃-example : Σ[ n ∈ ℕ ] (n + n ≡ 4)
∃-example = 2 , refl
```

<details>
<summary>Practice: Negate "$\forall x. \exists y. x < y$"</summary>

$$\exists x. \forall y. \neg(x < y)$$

i.e., $\exists x. \forall y. x \geq y$

"There exists an $x$ such that no $y$ is greater than it" (a maximum element).
</details>

<details>
<summary>Practice: Translate "Every student passed some exam"</summary>

Let $S(x)$ = "$x$ is a student", $E(y)$ = "$y$ is an exam", $P(x,y)$ = "$x$ passed $y$".

$$\forall x. S(x) \to \exists y. E(y) \land P(x, y)$$

Note: the existential is **inside** the universal — each student may pass a *different* exam.
</details>

<details>
<summary>Practice: Are $\forall x. \forall y. R(x,y)$ and $\forall y. \forall x. R(x,y)$ equivalent?</summary>

**Yes.** Universal quantifiers commute:
$$\forall x. \forall y. R(x,y) \equiv \forall y. \forall x. R(x,y)$$

Similarly, existentials commute with existentials. But $\forall$ does NOT commute with $\exists$:
$$\forall x. \exists y. R(x,y) \not\equiv \exists y. \forall x. R(x,y)$$

The second is stronger (one $y$ works for all $x$).
</details>
