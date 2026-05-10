---
title: "Glossary"
order: 95
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["glossary", "definitions", "terminology"]
---

## Key Terms

| Term | Definition | Agda equivalent |
|------|-----------|-----------------|
| Proposition | A type; a statement that can be proved | `Set` |
| Proof | An element (term) inhabiting a type | Value of a type |
| Conjunction ($\land$) | Both $P$ and $Q$ hold | `P × Q` (product) |
| Disjunction ($\lor$) | At least one of $P$ or $Q$ holds | `P ⊎ Q` (sum) |
| Implication ($\to$) | A function from proofs of $P$ to proofs of $Q$ | `P → Q` |
| Negation ($\neg P$) | $P$ implies absurdity | `P → ⊥` |
| Bottom ($\bot$) | Absurdity; the empty type | `⊥` (no constructor) |
| Top ($\top$) | Trivially true; the unit type | `⊤` (constructor `tt`) |
| Universal ($\forall$) | Dependent function: proof for every element | `(x : A) → P x` |
| Existential ($\exists$) | Dependent pair: a witness and its proof | `Σ[ x ∈ A ] P x` |
| LEM | Law of excluded middle: $P \lor \neg P$ | Not built-in; postulate |
| DNE | Double negation elimination: $\neg\neg P \to P$ | Not constructive |
| BHK | Brouwer-Heyting-Kolmogorov interpretation | Computational meaning of proofs |
| Curry-Howard | Propositions-as-types correspondence | Logic = type theory |
| Decidable | A proposition where $P \lor \neg P$ is provable | `Dec P` |
| Natural deduction | Proof system with intro/elim rules | Pattern matching + λ |
| Induction | Proof by base case + inductive step | Structural recursion |
| Recursion | Defining functions by pattern matching on structure | `f zero = ...; f (suc n) = ...` |
| `refl` | Reflexivity: $x \equiv x$ | `refl : x ≡ x` |
| `cong` | Congruence: equal inputs give equal outputs | `cong f : a ≡ b → f a ≡ f b` |
| `sym` | Symmetry: flip an equality | `sym : a ≡ b → b ≡ a` |
| `trans` | Transitivity: chain equalities | `trans : a ≡ b → b ≡ c → a ≡ c` |
| Structural recursion | Recursion that always decreases in size | Guaranteed termination |
| Peano numbers | $\mathbb{N}$ defined by `zero` and `suc` | `data ℕ where zero; suc` |
| Cons (`∷`) | Prepend element to a list | `_∷_ : A → List A → List A` |
| Nil (`[]`) | Empty list | `[] : List A` |
| Append (`++`) | Concatenate two lists | `_++_ : List A → List A → List A` |
| `map` | Apply function to each element | `map : (A → B) → List A → List B` |
| `foldr` | Right fold: collapse a list | `foldr : (A → B → B) → B → List A → B` |
| Binary tree | `leaf` or `node left val right` | `data Tree A` |
| Tree induction | Base on `leaf`, step on `node` with two IHs | Pattern match on `Tree` |
| Mirror | Swap left and right subtrees recursively | `mirror : Tree A → Tree A` |
| Involution | $f(f(x)) = x$ | `mirror-invol`, `not-invol` |

## Symbols Quick Reference

| Symbol | LaTeX | Meaning |
|--------|-------|---------|
| $\land$ | `\land` | And |
| $\lor$ | `\lor` | Or |
| $\to$ | `\to` | Implies |
| $\neg$ | `\neg` | Not |
| $\forall$ | `\forall` | For all |
| $\exists$ | `\exists` | There exists |
| $\bot$ | `\bot` | False/absurdity |
| $\top$ | `\top` | True/trivial |
| $\equiv$ | `\equiv` | Definitional/propositional equality |
| $\vdash$ | `\vdash` | Proves/entails |
| $\Sigma$ | `\Sigma` | Dependent pair (existential) |
| $\Pi$ | `\Pi` | Dependent function (universal) |
| $\lambda$ | `\lambda` | Function abstraction |

## Proof Techniques Summary

| Technique | When to use | Agda pattern |
|-----------|------------|--------------|
| Direct proof | Show $P \to Q$ by assuming $P$ | `λ p → ...` |
| Case analysis | Eliminate $P \lor Q$ or `Bool` | Pattern match |
| Contradiction | Show $\neg P$ | `λ p → ... : ⊥` |
| Induction on ℕ | Prove $\forall n. P(n)$ | `proof zero = ...; proof (suc n) = ...` |
| Induction on List | Prove $\forall xs. P(xs)$ | `proof [] = ...; proof (x ∷ xs) = ...` |
| Induction on Tree | Prove $\forall t. P(t)$ | `proof leaf = ...; proof (node l x r) = ...` |
| Equational reasoning | Chain equalities | `begin ... ≡⟨ ... ⟩ ... ∎` |
| Congruence | Lift equality under a function | `cong f eq` |
