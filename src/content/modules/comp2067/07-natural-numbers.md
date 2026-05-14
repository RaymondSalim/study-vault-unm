---
title: "Natural Numbers (Peano)"
order: 7
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["peano", "induction", "recursion", "addition", "multiplication"]
---

## Peano Natural Numbers

:::eli10

The Peano numbers are a way of building all natural numbers from just two things: zero, and "add one more" (successor). So 0 is `zero`, 1 is `suc zero`, 2 is `suc (suc zero)`, and so on — like counting with tally marks. Every number is either zero or some number plus one.

:::

:::eli15

In type theory, the natural numbers are defined inductively with two constructors:

- `zero` — the number 0
- `suc n` — the successor (n + 1)

Key properties (Peano axioms):
- **Injectivity**: If `suc m = suc n` then `m = n`
- **Disjointness**: `suc n` is never equal to `zero` (0 is not a successor)
- **Induction**: To prove a property for all natural numbers, prove it for 0 and prove that if it holds for $n$, it holds for $n+1$

:::

:::eli20

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

:::

## Defining Operations by Recursion

:::eli10

Addition and multiplication are defined by breaking down the first number one step at a time. For addition: adding zero to something leaves it unchanged, and adding (n+1) to something means you add n first, then add one more. Multiplication: zero times anything is zero, and (n+1) times something is that something plus n times it.

:::

:::eli15

Operations on natural numbers are defined by **structural recursion** — pattern matching on one argument:

- **Addition** `m + n`: Recurse on `m`. Base: `0 + n = n`. Step: `(suc m) + n = suc (m + n)` — peel off one suc at a time.
- **Multiplication** `m * n`: Recurse on `m`. Base: `0 * n = 0`. Step: `(suc m) * n = n + (m * n)` — multiplication is repeated addition.

Note: Addition is defined by recursion on the *first* argument. This matters for proofs — `0 + n` reduces immediately by definition, but `n + 0` doesn't (you need induction).

:::

:::eli20

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

:::

## Principle of Induction

:::eli10

Induction is like climbing an infinite ladder. If you can get on the first rung (base case), and if being on any rung lets you reach the next one (inductive step), then you can reach every rung. In Agda, induction is just writing a recursive function — the base case is for zero, and the recursive case uses the answer for n to build the answer for n+1.

:::

:::eli15

**Mathematical induction** proves a property for all natural numbers in two steps:

1. **Base case**: Prove $P(0)$
2. **Inductive step**: Prove that $P(k) \to P(k+1)$ for all $k$

In Agda, induction = recursion on the structure of the number:
- Pattern match on `zero` for the base case
- Pattern match on `suc n` for the inductive step, where the recursive call `proof n` gives you the induction hypothesis $P(n)$

The termination checker verifies that you always recurse on a structurally smaller argument.

:::

:::eli20

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

:::

## Key Proofs

:::eli10

Proving things about addition requires induction because the definition only "unfolds" on the first argument. For example, "n + 0 = n" isn't obvious to the computer — it has to unfold by cases. The proof uses `cong suc` which says "if two things are equal, adding suc to both keeps them equal."

:::

:::eli15

Core lemmas about addition, all proved by induction on the first argument:

1. **Right identity** ($n + 0 = n$): Induction on $n$. Base: `0 + 0 = 0` by definition. Step: use `cong suc` on the induction hypothesis.
2. **Successor on right** ($m + suc(n) = suc(m + n)$): Induction on $m$. Same pattern.
3. **Commutativity** ($m + n = n + m$): Uses both lemmas above.
4. **Associativity** ($(m + n) + p = m + (n + p)$): Straightforward induction on $m$.

Key technique: `cong suc` lifts an equality `a = b` to `suc a = suc b`.

:::

:::eli20

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

:::

## Proof Summary Table

:::eli10

Here's a cheat sheet of which proofs require induction and which variable to do induction on. The common pattern is: induct on the variable that's being recursed on in the definition, and use `cong suc` to handle the successor case.

:::

:::eli15

Summary of standard arithmetic proofs — note the patterns:

- Most induct on the first argument of `_+_` (since that's how `_+_` is defined)
- Base cases are usually `refl` (definitional equality)
- Inductive steps typically use `cong suc` plus the IH
- Commutativity is harder because it needs auxiliary lemmas (right-identity and +-suc)

:::

:::eli20

| Property | Induction on | Base case | IH used |
|----------|-------------|-----------|---------|
| $n + 0 = n$ | $n$ | `refl` | `cong suc` |
| $m + \text{suc}\, n = \text{suc}(m + n)$ | $m$ | `refl` | `cong suc` |
| $m + n = n + m$ | $m$ | right-id | IH + +-suc |
| $(m+n)+p = m+(n+p)$ | $m$ | `refl` | `cong suc` |
| $m * 0 = 0$ | $m$ | `refl` | IH + right-id for + |
| $m * \text{suc}\, n = m + m * n$ | $m$ | `refl` | IH + assoc + comm |

:::

## Equational Reasoning

:::eli10

Equational reasoning is a way to write proofs step by step, showing exactly how you get from one expression to another — like showing your working in maths class. Each step says "this equals that because of this rule."

:::

:::eli15

Agda provides **equational reasoning** combinators that let you write proofs as chains of equalities, much like pen-and-paper mathematics:

```
begin LHS ≡⟨ reason₁ ⟩ middle ≡⟨ reason₂ ⟩ RHS ∎
```

Each step cites a justification (a previously proven lemma or `refl` for definitional equality). This style makes proofs much more readable than composing `trans` and `sym` manually.

:::

:::eli20

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

:::
