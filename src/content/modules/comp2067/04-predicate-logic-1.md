---
title: "Predicate Logic I"
order: 4
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["predicates", "quantifiers", "universal", "existential", "variables"]
---

## From Propositions to Predicates

:::eli10

In basic logic, a proposition like "it's raining" is just true or false. But what if you want to say "x is even"? That depends on what x is! A **predicate** is like a sentence with a blank — once you fill in the blank with a specific value, it becomes true or false. Predicate logic lets you talk about "all things" ($\forall$) or "some thing" ($\exists$).

:::

:::eli15

**Propositional logic** deals with fixed statements (true or false). **Predicate logic** extends this with:

- **Predicates**: Statements that depend on a variable, like $P(x)$ = "x is prime"
- **Domain/Universe**: The set of values variables can take
- **Quantifiers**: $\forall$ ("for all") and $\exists$ ("there exists")
- **Free/Bound variables**: Whether a variable is controlled by a quantifier or not

This is much more expressive — you can say "all even numbers greater than 2 are the sum of two primes" rather than just "P is true."

:::

:::eli20

| Concept | Propositional | Predicate |
|---------|--------------|-----------|
| Statement | $P$ (fixed truth value) | $P(x)$ (depends on $x$) |
| Domain | None | Universe of discourse |
| Variables | None | Free and bound |
| Quantification | None | $\forall$, $\exists$ |

A **predicate** $P(x)$ is a proposition-valued function: given a value for $x$, it yields a proposition.

:::

## Quantifiers

:::eli10

**For all** ($\forall$) means "this is true for every single thing." Like "every dog has a tail." **There exists** ($\exists$) means "there is at least one thing that makes this true." Like "some dog is named Rex." In programming terms, $\forall$ is like a function that works for any input, and $\exists$ is like a specific example with proof.

:::

:::eli15

The two quantifiers:

- **Universal** ($\forall x. P(x)$): "P holds for every x in the domain." In type theory, this corresponds to a dependent function — a function that given *any* $x$, produces a proof of $P(x)$.
- **Existential** ($\exists x. P(x)$): "There is some x for which P holds." In type theory, this is a dependent pair — a specific witness $x$ bundled with a proof of $P(x)$.

In Agda: $\forall$ becomes `(x : A) -> P x` and $\exists$ becomes `Sigma[ x in A ] P x`.

:::

:::eli20

| Symbol | Name | Agda | Meaning |
|--------|------|------|---------|
| $\forall x. P(x)$ | Universal | `(x : A) → P x` | For every $x$, $P(x)$ holds |
| $\exists x. P(x)$ | Existential | `Σ[ x ∈ A ] P x` | There exists an $x$ such that $P(x)$ |

### Type-theoretic reading

$$\forall x : A. \; P(x) \quad \longleftrightarrow \quad \Pi(x : A). \; P(x)$$
$$\exists x : A. \; P(x) \quad \longleftrightarrow \quad \Sigma(x : A). \; P(x)$$

:::

## Free and Bound Variables

:::eli10

A "bound" variable is one that's controlled by a $\forall$ or $\exists$ — like the "x" in "for all x, x is positive." A "free" variable has no quantifier controlling it — it's like a blank that still needs to be filled in. A complete sentence (no blanks) has a definite truth value.

:::

:::eli15

When a quantifier like $\forall x$ appears, it **binds** the variable $x$ within its scope:

- **Bound variable**: Controlled by a quantifier — its name doesn't matter (can be renamed)
- **Free variable**: Not under any quantifier — acts as a parameter that must be given a value

Important: The same variable name can be free in one part of a formula and bound in another. A **closed formula** (sentence) has no free variables and has a definite truth value.

:::

:::eli20

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

:::

## Scope

:::eli10

Scope is about how far a quantifier reaches. Think of it like parentheses around the part that the "for all" or "there exists" applies to. By convention, quantifiers reach as far to the right as possible — unless parentheses say otherwise.

:::

:::eli15

The **scope** of a quantifier is the part of the formula where the variable is bound.

Convention: quantifiers extend as far right as possible. So $\forall x. P(x) \to Q(x)$ means $\forall x. (P(x) \to Q(x))$ — the whole implication is inside the scope.

If you want only part to be quantified, use explicit parentheses: $(\forall x. P(x)) \to Q(x)$ means the $x$ in $Q$ is free (not bound by the $\forall$).

:::

:::eli20

The scope of $\forall x$ in $\forall x. \phi$ is $\phi$.

| Formula | Scope of $\forall x$ | Parsing |
|---------|---------------------|---------|
| $\forall x. P(x) \to Q(x)$ | $P(x) \to Q(x)$ | $\forall x. (P(x) \to Q(x))$ |
| $(\forall x. P(x)) \to Q(x)$ | $P(x)$ only | $x$ in $Q$ is free |

> Convention: quantifiers extend as far right as possible.

:::

## Negating Quantifiers

:::eli10

Negating "for all" gives "there exists one that doesn't." Negating "there exists" gives "none of them do." It's like: the opposite of "everyone passed" is "someone failed," and the opposite of "someone passed" is "nobody passed."

:::

:::eli15

To negate quantifiers, swap $\forall$ and $\exists$ and negate the predicate:

- $\neg(\forall x. P(x)) \equiv \exists x. \neg P(x)$ — "not everything satisfies P" means "something doesn't"
- $\neg(\exists x. P(x)) \equiv \forall x. \neg P(x)$ — "nothing satisfies P" means "everything fails P"

For nested quantifiers, push the negation inward, flipping each quantifier as you pass it.

:::

:::eli20

| Original | Negation |
|----------|----------|
| $\forall x. P(x)$ | $\exists x. \neg P(x)$ |
| $\exists x. P(x)$ | $\forall x. \neg P(x)$ |
| $\forall x. \exists y. R(x,y)$ | $\exists x. \forall y. \neg R(x,y)$ |

:::

## Translating English to Predicate Logic

:::eli10

Translating English into logic is tricky! A key rule: "All X are Y" uses $\forall$ with an arrow ($\to$), while "Some X is Y" uses $\exists$ with AND ($\land$). A common mistake is using AND with "for all" — that would mean everything in the universe is both an X and a Y!

:::

:::eli15

Common English-to-logic patterns:

- "All A are B" $\to$ $\forall x. A(x) \to B(x)$ (use implication with $\forall$)
- "Some A is B" $\to$ $\exists x. A(x) \land B(x)$ (use conjunction with $\exists$)
- "No A is B" $\to$ $\forall x. A(x) \to \neg B(x)$

**Common trap**: "All cats are mammals" is NOT $\forall x. C(x) \land M(x)$ — that claims everything is a cat AND a mammal! The correct form is $\forall x. C(x) \to M(x)$ — IF something is a cat, THEN it's a mammal.

:::

:::eli20

| English | Formula | Note |
|---------|---------|------|
| "All cats are mammals" | $\forall x. C(x) \to M(x)$ | Use $\to$ with $\forall$ |
| "Some cat is black" | $\exists x. C(x) \land B(x)$ | Use $\land$ with $\exists$ |
| "No cat flies" | $\forall x. C(x) \to \neg F(x)$ | or $\neg\exists x. C(x) \land F(x)$ |
| "Not all cats are black" | $\neg\forall x. C(x) \to B(x)$ | i.e., $\exists x. C(x) \land \neg B(x)$ |

> **Trap**: "All cats are mammals" is NOT $\forall x. C(x) \land M(x)$ (that says everything is both a cat and a mammal).

:::

## Agda Encoding

:::eli10

In Agda (a programming language for proofs), "for all" becomes a function type and "there exists" becomes a pair. Proving "for all natural numbers, n + 0 = n" means writing a function that works for any n. Proving "there exists n such that n + n = 4" means giving the specific number (2) and a proof.

:::

:::eli15

In Agda, quantifiers have direct computational representations:

- **Universal** ($\forall$): A dependent function type `(x : A) -> P x` — you provide a proof for every possible input
- **Existential** ($\exists$): A dependent pair `Sigma[ x in A ] P x` — you provide a specific witness AND its proof

Example: proving $\exists n. n + n = 4$ requires giving the pair `(2, refl)` — the witness is 2, and the proof is that $2 + 2 = 4$ holds by computation.

:::

:::eli20

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

:::
