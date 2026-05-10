---
title: "Boolean Type and Decidability"
order: 6
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["boolean", "decidability", "if-then-else", "type-theory"]
---

## Boolean Type in Type Theory

```
data Bool : Set where
  true  : Bool
  false : Bool
```

| Operation | Definition | Type |
|-----------|-----------|------|
| `not` | `not true = false; not false = true` | `Bool → Bool` |
| `_∧_` | `true ∧ b = b; false ∧ b = false` | `Bool → Bool → Bool` |
| `_∨_` | `true ∨ b = true; false ∨ b = b` | `Bool → Bool → Bool` |

## Bool vs Prop

| Aspect | `Bool` | Proposition (`Set`) |
|--------|--------|-------------------|
| Values | `true` or `false` | Proof terms |
| Decidable? | Always (pattern match) | Not necessarily |
| Information | 1 bit | Proof carries structure |
| Example | `3 < 5` returns `true` | `3 < 5` has a proof term |
| Negation | `not b` | `P → ⊥` |

**Key**: `Bool` is data; propositions are types. They connect via decidability.

## If-Then-Else

```
if_then_else_ : {A : Set} → Bool → A → A → A
if true  then x else y = x
if false then x else y = y
```

| Expression | Result |
|-----------|--------|
| `if true then 1 else 2` | `1` |
| `if false then 1 else 2` | `2` |
| `if b then x else x` | `x` (regardless of `b`) |

## Decidability

A proposition $P$ is **decidable** if we can construct either a proof of $P$ or a proof of $\neg P$:

```
data Dec (P : Set) : Set where
  yes : P   → Dec P
  no  : ¬ P → Dec P
```

| Concept | Type | Meaning |
|---------|------|---------|
| Decidable | `Dec P` | We have either `yes p` or `no ¬p` |
| Decision procedure | `(x : A) → Dec (P x)` | Algorithm that decides for any input |
| Boolean test | `A → Bool` | Computes answer but loses proof |

### Relating Bool and Dec

```
-- From decidability to boolean
⌊_⌋ : Dec P → Bool
⌊ yes _ ⌋ = true
⌊ no  _ ⌋ = false

-- The boolean reflects the proposition
T : Bool → Set
T true  = ⊤
T false = ⊥
```

## Decidable Properties — Examples

| Property | Decidable? | Why |
|----------|-----------|-----|
| $n =_\mathbb{N} m$ | Yes | Compare digit by digit |
| $n \leq m$ | Yes | Structural recursion |
| "Program $p$ halts" | **No** | Halting problem |
| $P \lor \neg P$ for all $P$ | **No** | Would give LEM |
| Equality on `Bool` | Yes | Pattern match |

## Proving Properties of Boolean Functions

```
-- not is an involution
not-invol : (b : Bool) → not (not b) ≡ b
not-invol true  = refl
not-invol false = refl

-- De Morgan for Bool
demorgan : (a b : Bool) → not (a ∧ b) ≡ (not a) ∨ (not b)
demorgan true  true  = refl
demorgan true  false = refl
demorgan false true  = refl
demorgan false false = refl
```

## The "Reflection" Pattern

Connecting a boolean test to a propositional proof:

```
-- If (m ≤? n) returns true, then m ≤ n holds as a proposition
≤-reflects : (m n : ℕ) → T (m ≤ᵇ n) → m ≤ n
```

| Direction | Name | Use |
|-----------|------|-----|
| `Bool → Prop` | Soundness | Boolean `true` implies proposition holds |
| `Prop → Bool` | Completeness | If proposition holds, boolean is `true` |
| Both | Reflection | Perfect correspondence |

<details>
<summary>Practice: Prove $\text{not}(a \lor b) \equiv \text{not}(a) \land \text{not}(b)$ by cases</summary>

```
demorgan-or : (a b : Bool) → not (a ∨ b) ≡ (not a) ∧ (not b)
demorgan-or true  true  = refl  -- not true  ≡ false ∧ false ✓
demorgan-or true  false = refl  -- not true  ≡ false ∧ true  → false ≡ false ✓
demorgan-or false true  = refl  -- not true  ≡ true  ∧ false → false ≡ false ✓
demorgan-or false false = refl  -- not false ≡ true  ∧ true  → true  ≡ true  ✓
```

Each case reduces by computation to `refl`.
</details>

<details>
<summary>Practice: Why is `Dec P` stronger than `Bool`?</summary>

`Bool` only gives you a bit: `true` or `false`.

`Dec P` gives you either:
- `yes p` where `p : P` — an actual proof/witness
- `no np` where `np : ¬ P` — an actual refutation

With `Dec P` you can **extract** the proof and use it in further reasoning. With `Bool` you just get a bit with no justification.

Example: `Dec (n ≤ m)` gives you either the proof `n ≤ m` or the proof `n > m`, which you can then use in subsequent proofs.
</details>

<details>
<summary>Practice: Define `_xor_` on Bool and prove it is commutative</summary>

```
_xor_ : Bool → Bool → Bool
true  xor b = not b
false xor b = b

xor-comm : (a b : Bool) → a xor b ≡ b xor a
xor-comm true  true  = refl
xor-comm true  false = refl
xor-comm false true  = refl
xor-comm false false = refl
```
</details>
