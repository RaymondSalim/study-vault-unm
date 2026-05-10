---
title: "Quick Reference"
order: 90
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["reference", "natural-deduction", "laws", "proof-patterns"]
---

## Natural Deduction Rules

### Propositional Logic

| Connective | Introduction | Elimination |
|-----------|-------------|-------------|
| $\land$ | From $P$ and $Q$, infer $P \land Q$ | From $P \land Q$, infer $P$ (or $Q$) |
| $\lor$ | From $P$, infer $P \lor Q$ (or from $Q$) | From $P \lor Q$, $P \to R$, $Q \to R$, infer $R$ |
| $\to$ | Assume $P$, derive $Q$; infer $P \to Q$ | From $P \to Q$ and $P$, infer $Q$ |
| $\neg$ | Assume $P$, derive $\bot$; infer $\neg P$ | From $P$ and $\neg P$, infer $\bot$ |
| $\bot$ | (none) | From $\bot$, infer anything |
| $\top$ | Always: infer $\top$ | (none) |

### Quantifiers

| Quantifier | Introduction | Elimination |
|-----------|-------------|-------------|
| $\forall$ | Prove $P(x)$ for arbitrary $x$ | From $\forall x. P(x)$, infer $P(t)$ |
| $\exists$ | From $P(t)$, infer $\exists x. P(x)$ | From $\exists x. P(x)$, assume $P(c)$, derive $R$ |

### Restrictions

| Rule | Restriction |
|------|-------------|
| $\forall$-I | $x$ not free in undischarged assumptions |
| $\exists$-E | Fresh variable $c$ not in conclusion |

## Agda Correspondence

| Logic | Agda Type | Intro | Elim |
|-------|-----------|-------|------|
| $P \land Q$ | `P × Q` | `(p , q)` | `proj₁`, `proj₂` |
| $P \lor Q$ | `P ⊎ Q` | `inj₁ p`, `inj₂ q` | pattern match |
| $P \to Q$ | `P → Q` | `λ p → ...` | function application |
| $\neg P$ | `P → ⊥` | `λ p → ...` | application gives `⊥` |
| $\bot$ | `⊥` | (impossible) | `⊥-elim` |
| $\top$ | `⊤` | `tt` | (nothing useful) |
| $\forall x. P$ | `(x : A) → P x` | `λ x → ...` | `f a` |
| $\exists x. P$ | `Σ[ x ∈ A ] P x` | `(a , pa)` | `proj₁`, `proj₂` |

## Boolean Algebra Laws

| Law | Formula |
|-----|---------|
| Identity | $P \land \top = P$ ; $P \lor \bot = P$ |
| Domination | $P \land \bot = \bot$ ; $P \lor \top = \top$ |
| Idempotent | $P \land P = P$ ; $P \lor P = P$ |
| Complement | $P \land \neg P = \bot$ ; $P \lor \neg P = \top$ |
| De Morgan | $\neg(P \land Q) = \neg P \lor \neg Q$ |
| De Morgan | $\neg(P \lor Q) = \neg P \land \neg Q$ |
| Distributive | $P \land (Q \lor R) = (P \land Q) \lor (P \land R)$ |
| Distributive | $P \lor (Q \land R) = (P \lor Q) \land (P \lor R)$ |
| Absorption | $P \land (P \lor Q) = P$ ; $P \lor (P \land Q) = P$ |
| Contrapositive | $P \to Q \equiv \neg Q \to \neg P$ |
| Material Impl. | $P \to Q \equiv \neg P \lor Q$ (classical only) |

## Quantifier Equivalences

| Equivalence | Valid? |
|-------------|--------|
| $\neg\forall x. P(x) \equiv \exists x. \neg P(x)$ | Classical only |
| $\neg\exists x. P(x) \equiv \forall x. \neg P(x)$ | Constructive |
| $\forall x. (P \land Q(x)) \equiv P \land \forall x. Q(x)$ | Yes (if $x \notin P$) |
| $\exists x. (P \lor Q(x)) \equiv P \lor \exists x. Q(x)$ | Yes (if $x \notin P$) |
| $\forall x. \forall y. R \equiv \forall y. \forall x. R$ | Yes |
| $\exists x. \exists y. R \equiv \exists y. \exists x. R$ | Yes |
| $\exists y. \forall x. R \to \forall x. \exists y. R$ | Yes |
| $\forall x. \exists y. R \to \exists y. \forall x. R$ | **No** |

## Proof Patterns (Induction)

### Template for ℕ

```
proof : (n : ℕ) → P n
proof zero    = {- base: prove P zero -}
proof (suc n) = {- step: use (proof n : P n) to prove P (suc n) -}
```

### Template for List

```
proof : (xs : List A) → P xs
proof []       = {- base: prove P [] -}
proof (x ∷ xs) = {- step: use (proof xs : P xs) -}
```

### Template for Tree

```
proof : (t : Tree A) → P t
proof leaf         = {- base: prove P leaf -}
proof (node l x r) = {- step: use (proof l) and (proof r) -}
```

## Key `cong` Patterns

| Goal shape | Use |
|-----------|-----|
| `suc a ≡ suc b` | `cong suc (proof-a≡b)` |
| `x ∷ as ≡ x ∷ bs` | `cong (x ∷_) (proof-as≡bs)` |
| `f a ≡ f b` | `cong f (proof-a≡b)` |
| `node a x b ≡ node c x d` | `cong₂ (λ l r → node l x r) p q` |

## Classical-Only Principles

These require LEM or equivalent; they are NOT constructively provable:

| Principle | Statement |
|-----------|-----------|
| LEM | $P \lor \neg P$ |
| DNE | $\neg\neg P \to P$ |
| Peirce | $((P \to Q) \to P) \to P$ |
| Strong De Morgan | $\neg(P \land Q) \to \neg P \lor \neg Q$ |
| Material implication | $(P \to Q) \to \neg P \lor Q$ |
| $\neg\forall \to \exists\neg$ | $\neg(\forall x. P(x)) \to \exists x. \neg P(x)$ |
