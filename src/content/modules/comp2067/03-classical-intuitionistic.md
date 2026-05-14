---
title: "Classical vs Intuitionistic Logic"
order: 3
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["LEM", "double-negation", "constructive", "BHK", "intuitionistic"]
---

## Key Distinction

:::eli10

In classical logic, something is either true or false — no middle ground. You can prove things exist without ever showing them. In intuitionistic (constructive) logic, you must actually build or demonstrate what you claim. It's like the difference between saying "there must be a key somewhere that opens this door" vs. actually holding the key in your hand.

:::

:::eli15

The fundamental difference between classical and intuitionistic logic:

- **Classical logic**: A proposition is either true or false (Law of Excluded Middle). Proofs by contradiction are valid — you can prove something exists just by showing its non-existence leads to contradiction.
- **Intuitionistic logic**: To prove $P \lor Q$, you must actually demonstrate which one holds. To prove something exists, you must construct a witness. "It can't not exist" is not enough.

This has computational meaning: intuitionistic proofs correspond to programs (Curry-Howard correspondence). An existence proof is literally a program that computes the witness.

:::

:::eli20

| Aspect | Classical Logic | Intuitionistic Logic |
|--------|---------------|---------------------|
| Proof meaning | Truth assignment exists | Witness/construction exists |
| LEM ($P \lor \neg P$) | Axiom | Not provable in general |
| Double negation elim | $\neg\neg P \to P$ valid | Not valid |
| Disjunction property | No | Yes: if $\vdash P \lor Q$ then $\vdash P$ or $\vdash Q$ |
| Existence property | No | Yes: if $\vdash \exists x. P(x)$ then $\vdash P(t)$ for some $t$ |

:::

## Law of Excluded Middle (LEM)

:::eli10

The Law of Excluded Middle says "either it's raining or it's not raining" — for any statement, either it or its opposite must be true. Classical logic treats this as an obvious rule. But constructive logic says you can only claim this if you have a way to actually check which one it is.

:::

:::eli15

**LEM**: $P \lor \neg P$ — "every proposition is either true or false."

- In classical logic: accepted as an axiom
- In intuitionistic logic: claiming $P \lor \neg P$ means you can *decide* which side holds, which isn't always possible (e.g., for undecidable properties)

Interestingly, $\neg\neg(P \lor \neg P)$ — "it's absurd that LEM fails" — IS provable constructively. You can prove that LEM can't be refuted, even though you can't prove LEM itself.

:::

:::eli20

$$P \lor \neg P$$

In classical logic this is an axiom. In intuitionistic/constructive logic, asserting $P \lor \neg P$ requires that we can **decide** $P$ — which is not always possible.

### What IS provable constructively

| Statement | Provable? | Note |
|-----------|-----------|------|
| $P \lor \neg P$ | No | LEM |
| $\neg\neg(P \lor \neg P)$ | **Yes** | Double-negated LEM is always provable |
| $\neg\neg\neg P \to \neg P$ | **Yes** | Triple negation collapses |
| $P \to \neg\neg P$ | **Yes** | Introduction of double negation |
| $\neg\neg P \to P$ | No | Double negation elimination |
| $(P \to Q) \to \neg Q \to \neg P$ | **Yes** | Contrapositive (one direction) |
| $\neg Q \to \neg P \to (P \to Q)$ | No | Contrapositive (other direction) |

:::

## BHK Interpretation

:::eli10

The BHK interpretation tells you what a proof actually IS. A proof of "A AND B" is having a proof of A and a proof of B. A proof of "A OR B" is having a proof of one of them (and saying which one). A proof of "if A then B" is a method that turns any proof of A into a proof of B. It makes proofs into concrete things you can build.

:::

:::eli15

The **Brouwer-Heyting-Kolmogorov (BHK) interpretation** gives constructive meaning to logical connectives:

- $P \land Q$: A pair of proofs — one for P and one for Q
- $P \lor Q$: A proof of one side, plus a tag saying which side
- $P \to Q$: A method (function) converting any proof of P into a proof of Q
- $\neg P$: A method that takes any proof of P and produces a contradiction ($\bot$)
- $\exists x. P(x)$: A specific value $t$ plus a proof that $P(t)$ holds

This is why intuitionistic proofs have computational content — they ARE programs.

:::

:::eli20

The **Brouwer-Heyting-Kolmogorov** interpretation gives computational meaning to proofs:

| Proposition | A proof of it is... |
|-------------|-------------------|
| $P \land Q$ | A pair $(p, q)$ where $p$ proves $P$ and $q$ proves $Q$ |
| $P \lor Q$ | Either $(left, p)$ where $p$ proves $P$, or $(right, q)$ where $q$ proves $Q$ |
| $P \to Q$ | A function that transforms any proof of $P$ into a proof of $Q$ |
| $\neg P$ | A function from proofs of $P$ to $\bot$ (i.e., $P \to \bot$) |
| $\bot$ | No proof exists |
| $\forall x. P(x)$ | A function that given any $x$ produces a proof of $P(x)$ |
| $\exists x. P(x)$ | A pair $(t, p)$ where $p$ proves $P(t)$ |

:::

## Curry-Howard Correspondence

:::eli10

The Curry-Howard correspondence is a deep idea: logical proofs and computer programs are secretly the same thing! A proposition is like a type in programming, and a proof is like a program of that type. "A and B" is like a pair (tuple). "A or B" is like a tagged union. "If A then B" is like a function from A to B. This is why proof assistants like Agda are also programming languages.

:::

:::eli15

The **Curry-Howard correspondence** reveals that proofs and programs are the same thing viewed from different angles:

| Logic side | Programming side |
|------------|-----------------|
| Proposition | Type |
| Proof | Program/value of that type |
| $P \land Q$ | Pair/tuple type ($A \times B$) |
| $P \lor Q$ | Tagged union/sum type ($A + B$) |
| $P \to Q$ | Function type ($A \to B$) |
| $\bot$ (false) | Empty type (uninhabited) |
| $\top$ (true) | Unit type (trivially inhabited) |

In Agda, writing a proof IS writing a program — the type checker verifies logical correctness.

:::

:::eli20

| Logic | Type Theory | Agda |
|-------|-------------|------|
| Proposition | Type | `Set` |
| Proof | Term/element | value |
| $P \land Q$ | Product type | `A × B` |
| $P \lor Q$ | Sum type | `A ⊎ B` |
| $P \to Q$ | Function type | `A → B` |
| $\bot$ | Empty type | `⊥` |
| $\top$ | Unit type | `⊤` |
| $\neg P$ | $P \to \bot$ | `A → ⊥` |

:::

## Equivalent Formulations of Classical Logic

:::eli10

You can turn intuitionistic logic into classical logic by adding just ONE extra rule. There are several choices (LEM, double negation elimination, Peirce's law, etc.) — they're all equivalent, meaning if you accept any one of them, you get all the others for free.

:::

:::eli15

Intuitionistic logic becomes classical logic by adding any ONE of these principles (they're all equivalent to each other):

- **LEM**: $P \lor \neg P$ — every proposition is decidable
- **Double Negation Elimination**: $\neg\neg P \to P$ — "can't be false" implies "is true"
- **Peirce's Law**: $((P \to Q) \to P) \to P$ — a subtle form of proof by contradiction
- **Material Implication**: $(P \to Q) \to \neg P \lor Q$ — implication decomposition

Each of these, added to intuitionistic logic, makes the logic strong enough to prove all the others.

:::

:::eli20

Adding **any one** of these to intuitionistic logic gives full classical logic:

| Principle | Statement |
|-----------|-----------|
| LEM | $P \lor \neg P$ |
| Double Negation Elimination | $\neg\neg P \to P$ |
| Peirce's Law | $((P \to Q) \to P) \to P$ |
| De Morgan (strong) | $\neg(\neg P \land \neg Q) \to P \lor Q$ |
| Material Implication | $(P \to Q) \to \neg P \lor Q$ |

:::

## Negation in Constructive Logic

:::eli10

In constructive logic, "NOT P" means "if P were true, that would lead to a contradiction." So proving NOT P means assuming P and showing things break. You can always prove "if P is true then it's not-not true" (double negation introduction). But you CANNOT go backwards — knowing "P isn't false" doesn't give you a way to actually build P.

:::

:::eli15

In constructive logic, negation is defined as:

$$\neg P \equiv P \to \bot$$

"Not P" means "P leads to contradiction."

Key consequences:
- **Double negation introduction** ($P \to \neg\neg P$) is always provable: given $p : P$ and $f : P \to \bot$, just apply $f$ to $p$
- **Double negation elimination** ($\neg\neg P \to P$) is NOT provable: knowing "there's no refutation of P" doesn't help you construct a P
- Triple negation collapses to single negation: $\neg\neg\neg P \to \neg P$ is provable

The computational interpretation: $\neg\neg P$ means "P can't be refuted" but doesn't give you a concrete element of type P.

:::

:::eli20

$$\neg P \equiv P \to \bot$$

This means:
- To prove $\neg P$: assume $P$ and derive a contradiction
- $\neg\neg P$ means $(P \to \bot) \to \bot$: "it's absurd that $P$ is absurd"
- But this does NOT give you a direct proof of $P$

```
-- Provable: double negation introduction
dni : A → ¬ ¬ A
dni a = λ (f : A → ⊥) → f a

-- NOT provable without postulate
-- dne : ¬ ¬ A → A
-- dne = ???  (no construction possible)
```

<details>
<summary>Practice: Prove $\neg\neg(P \lor \neg P)$ constructively</summary>

Goal: $(P \lor \neg P \to \bot) \to \bot$

```
lem-irrefutable : ¬ ¬ (A ⊎ ¬ A)
lem-irrefutable f = f (inj₂ (λ a → f (inj₁ a)))
```

Reasoning:
1. Assume $h : (P \lor \neg P) \to \bot$
2. Define $g : P \to \bot$ as $g(p) = h(\text{inj}_1(p))$
3. So $g : \neg P$, meaning $\text{inj}_2(g) : P \lor \neg P$
4. Then $h(\text{inj}_2(g)) : \bot$
5. Discharge assumption: done.
</details>

<details>
<summary>Practice: Why can't we prove $\neg\neg A \to A$?</summary>

By BHK, a proof of $\neg\neg A \to A$ would be a function that takes any $(A \to \bot) \to \bot$ and produces an element of $A$.

But $(A \to \bot) \to \bot$ only tells us "there's no refutation of $A$" — it doesn't **construct** a witness of type $A$.

In a computational reading: we have a function that produces $\bot$ from any refutation, but we never get our hands on an actual $a : A$.
</details>

<details>
<summary>Practice: Prove contrapositive $(A \to B) \to (\neg B \to \neg A)$</summary>

```
contrapositive : (A → B) → (¬ B → ¬ A)
contrapositive f nb = λ a → nb (f a)
```

1. Assume $f : A \to B$
2. Assume $nb : B \to \bot$
3. Assume $a : A$
4. $f(a) : B$
5. $nb(f(a)) : \bot$
6. Discharge $a$: we have $A \to \bot = \neg A$
</details>

:::
