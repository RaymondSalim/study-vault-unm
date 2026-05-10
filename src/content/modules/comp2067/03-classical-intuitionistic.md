---
title: "Classical vs Intuitionistic Logic"
order: 3
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["LEM", "double-negation", "constructive", "BHK", "intuitionistic"]
---

## Key Distinction

| Aspect | Classical Logic | Intuitionistic Logic |
|--------|---------------|---------------------|
| Proof meaning | Truth assignment exists | Witness/construction exists |
| LEM ($P \lor \neg P$) | Axiom | Not provable in general |
| Double negation elim | $\neg\neg P \to P$ valid | Not valid |
| Disjunction property | No | Yes: if $\vdash P \lor Q$ then $\vdash P$ or $\vdash Q$ |
| Existence property | No | Yes: if $\vdash \exists x. P(x)$ then $\vdash P(t)$ for some $t$ |

## Law of Excluded Middle (LEM)

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

## BHK Interpretation

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

## Curry-Howard Correspondence

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

## Equivalent Formulations of Classical Logic

Adding **any one** of these to intuitionistic logic gives full classical logic:

| Principle | Statement |
|-----------|-----------|
| LEM | $P \lor \neg P$ |
| Double Negation Elimination | $\neg\neg P \to P$ |
| Peirce's Law | $((P \to Q) \to P) \to P$ |
| De Morgan (strong) | $\neg(\neg P \land \neg Q) \to P \lor Q$ |
| Material Implication | $(P \to Q) \to \neg P \lor Q$ |

## Negation in Constructive Logic

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
