---
title: "Natural Numbers (Peano)"
order: 7
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["peano", "induction", "recursion", "addition", "multiplication"]
---

## Peano Natural Numbers

```
data ℕ : Set where
  zero : ℕ
  suc  : ℕ → ℕ
```

| Axiom | Meaning |
|-------|---------|
| `zero : ℕ` | 0 is a natural number |
| `suc : ℕ → ℕ` | Every natural number has a successor |
| Injectivity | `suc m ≡ suc n → m ≡ n` |
| Disjointness | `suc n ≢ zero` |
| Induction | If $P(0)$ and $\forall n. P(n) \to P(n+1)$, then $\forall n. P(n)$ |

## Defining Operations by Recursion

### Addition

```
_+_ : ℕ → ℕ → ℕ
zero    + n = n          -- base case
(suc m) + n = suc (m + n)  -- recursive case
```

### Multiplication

```
_*_ : ℕ → ℕ → ℕ
zero    * n = zero
(suc m) * n = n + (m * n)
```

### Computation examples

| Expression | Reduces to |
|-----------|-----------|
| `zero + n` | `n` |
| `suc zero + n` | `suc n` |
| `suc (suc zero) + n` | `suc (suc n)` |
| `zero * n` | `zero` |
| `suc zero * n` | `n + zero` |

## Principle of Induction

To prove $\forall n : \mathbb{N}. \; P(n)$:

| Step | What to prove | Name |
|------|--------------|------|
| Base | $P(0)$ | Base case |
| Inductive | $\forall k. P(k) \to P(k+1)$ | Inductive step |
| Conclusion | $\forall n. P(n)$ | By induction |

In Agda, induction = recursion on the structure:

```
proof : (n : ℕ) → P n
proof zero    = {- base case -}
proof (suc n) = {- use (proof n : P n) for inductive hypothesis -}
```

## Key Proofs

### Right identity: $n + 0 \equiv n$

```
+-right-id : (n : ℕ) → n + zero ≡ n
+-right-id zero    = refl              -- zero + zero ≡ zero ✓
+-right-id (suc n) = cong suc (+-right-id n)
                     -- suc (n + zero) ≡ suc n
                     -- by IH: n + zero ≡ n
```

### Successor on the right: $m + \text{suc}(n) \equiv \text{suc}(m + n)$

```
+-suc : (m n : ℕ) → m + suc n ≡ suc (m + n)
+-suc zero    n = refl
+-suc (suc m) n = cong suc (+-suc m n)
```

### Commutativity of addition: $m + n \equiv n + m$

```
+-comm : (m n : ℕ) → m + n ≡ n + m
+-comm zero    n = sym (+-right-id n)
+-comm (suc m) n = trans (cong suc (+-comm m n)) (sym (+-suc n m))
```

### Associativity of addition: $(m + n) + p \equiv m + (n + p)$

```
+-assoc : (m n p : ℕ) → (m + n) + p ≡ m + (n + p)
+-assoc zero    n p = refl
+-assoc (suc m) n p = cong suc (+-assoc m n p)
```

## Proof Summary Table

| Property | Induction on | Base case | IH used |
|----------|-------------|-----------|---------|
| $n + 0 = n$ | $n$ | `refl` | `cong suc` |
| $m + \text{suc}\, n = \text{suc}(m + n)$ | $m$ | `refl` | `cong suc` |
| $m + n = n + m$ | $m$ | right-id | IH + +-suc |
| $(m+n)+p = m+(n+p)$ | $m$ | `refl` | `cong suc` |
| $m * 0 = 0$ | $m$ | `refl` | IH + right-id for + |
| $m * \text{suc}\, n = m + m * n$ | $m$ | `refl` | IH + assoc + comm |

## Equational Reasoning

```
-- Using equational reasoning combinators
+-comm : (m n : ℕ) → m + n ≡ n + m
+-comm zero n =
  begin
    zero + n  ≡⟨ refl ⟩
    n         ≡⟨ sym (+-right-id n) ⟩
    n + zero
  ∎
```

<details>
<summary>Practice: Prove $1 + n \equiv \text{suc}\, n$ by computation</summary>

```
1+n≡suc-n : (n : ℕ) → (suc zero) + n ≡ suc n
1+n≡suc-n n = refl
```

This holds by the **definition** of `_+_`:
- `(suc zero) + n = suc (zero + n) = suc n`

No induction needed — just computation!
</details>

<details>
<summary>Practice: Prove $n * 1 \equiv n$ by induction</summary>

```
*-right-id : (n : ℕ) → n * (suc zero) ≡ n
*-right-id zero    = refl    -- zero * 1 = zero ✓
*-right-id (suc n) =
  -- suc n * 1 = 1 + (n * 1)  [by def of *]
  -- need: 1 + (n * 1) ≡ suc n
  -- by IH: n * 1 ≡ n
  -- so: 1 + n ≡ suc n  [by def of +]
  cong suc (*-right-id n)
```

Induction on $n$. The `suc` case uses the IH inside `cong suc`.
</details>

<details>
<summary>Practice: Why does $n + 0 \equiv n$ need a proof but $0 + n \equiv n$ doesn't?</summary>

Because `_+_` is defined by recursion on the **first** argument:
- `zero + n = n` — this reduces by definition, so `refl` works
- `n + zero` — cannot reduce until we know what `n` is

So `n + zero ≡ n` requires induction on `n` to unfold the definition step by step.

This asymmetry is fundamental to working with recursively-defined functions.
</details>
