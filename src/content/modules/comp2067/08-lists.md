---
title: "Lists"
order: 8
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["list", "cons", "append", "map", "fold", "induction"]
---

## List Type

```
data List (A : Set) : Set where
  []  : List A
  _∷_ : A → List A → List A
```

| Constructor | Meaning | Example |
|-------------|---------|---------|
| `[]` | Empty list (nil) | `[]` |
| `x ∷ xs` | Cons: prepend $x$ to $xs$ | `1 ∷ 2 ∷ 3 ∷ []` |

## Core Operations

### Append

```
_++_ : List A → List A → List A
[]       ++ ys = ys
(x ∷ xs) ++ ys = x ∷ (xs ++ ys)
```

### Length

```
length : List A → ℕ
length []       = zero
length (x ∷ xs) = suc (length xs)
```

### Map

```
map : (A → B) → List A → List B
map f []       = []
map f (x ∷ xs) = f x ∷ map f xs
```

### Fold (right)

```
foldr : (A → B → B) → B → List A → B
foldr f e []       = e
foldr f e (x ∷ xs) = f x (foldr f e xs)
```

### Reverse

```
reverse : List A → List A
reverse []       = []
reverse (x ∷ xs) = reverse xs ++ (x ∷ [])
```

## Induction on Lists

To prove $\forall xs : \text{List}\, A. \; P(xs)$:

| Step | What to prove | Analogous to ℕ |
|------|--------------|----------------|
| Base | $P(\texttt{[]})$ | $P(0)$ |
| Inductive | $\forall x, xs.\; P(xs) \to P(x \mathbin{::} xs)$ | $P(n) \to P(n+1)$ |

```
proof : (xs : List A) → P xs
proof []       = {- base -}
proof (x ∷ xs) = {- use (proof xs : P xs) as IH -}
```

## Key Proofs

### Append associativity: $(xs \mathbin{++} ys) \mathbin{++} zs \equiv xs \mathbin{++} (ys \mathbin{++} zs)$

```
++-assoc : (xs ys zs : List A) → (xs ++ ys) ++ zs ≡ xs ++ (ys ++ zs)
++-assoc []       ys zs = refl
++-assoc (x ∷ xs) ys zs = cong (x ∷_) (++-assoc xs ys zs)
```

### Right identity: $xs \mathbin{++} \texttt{[]} \equiv xs$

```
++-right-id : (xs : List A) → xs ++ [] ≡ xs
++-right-id []       = refl
++-right-id (x ∷ xs) = cong (x ∷_) (++-right-id xs)
```

### Length distributes over append

```
length-++ : (xs ys : List A) → length (xs ++ ys) ≡ length xs + length ys
length-++ []       ys = refl
length-++ (x ∷ xs) ys = cong suc (length-++ xs ys)
```

### Map distributes over append

```
map-++ : (f : A → B) (xs ys : List A)
       → map f (xs ++ ys) ≡ map f xs ++ map f ys
map-++ f []       ys = refl
map-++ f (x ∷ xs) ys = cong (f x ∷_) (map-++ f xs ys)
```

### Map composition (functor law)

```
map-compose : (f : B → C) (g : A → B) (xs : List A)
            → map f (map g xs) ≡ map (f ∘ g) xs
map-compose f g []       = refl
map-compose f g (x ∷ xs) = cong (f (g x) ∷_) (map-compose f g xs)
```

## Proof Pattern Summary

| Property | Induction on | Base | Step uses |
|----------|-------------|------|-----------|
| `xs ++ [] ≡ xs` | `xs` | `refl` | `cong (x ∷_)` + IH |
| `(xs ++ ys) ++ zs ≡ xs ++ (ys ++ zs)` | `xs` | `refl` | `cong (x ∷_)` + IH |
| `length (xs ++ ys) ≡ length xs + length ys` | `xs` | `refl` | `cong suc` + IH |
| `map f (xs ++ ys) ≡ map f xs ++ map f ys` | `xs` | `refl` | `cong (f x ∷_)` + IH |
| `reverse (xs ++ ys) ≡ reverse ys ++ reverse xs` | `xs` | sym right-id | IH + assoc |

> **Pattern**: Most list proofs induct on the first list argument (since `_++_` and `map` recurse on it).

<details>
<summary>Practice: Prove `map id xs ≡ xs`</summary>

```
map-id : (xs : List A) → map id xs ≡ xs
map-id []       = refl       -- map id [] = [] ✓
map-id (x ∷ xs) = cong (x ∷_) (map-id xs)
                  -- map id (x ∷ xs) = id x ∷ map id xs = x ∷ map id xs
                  -- by IH: map id xs ≡ xs
                  -- so: x ∷ map id xs ≡ x ∷ xs ✓
```
</details>

<details>
<summary>Practice: Prove `length (map f xs) ≡ length xs`</summary>

```
length-map : (f : A → B) (xs : List A) → length (map f xs) ≡ length xs
length-map f []       = refl
length-map f (x ∷ xs) = cong suc (length-map f xs)
  -- length (map f (x ∷ xs))
  -- = length (f x ∷ map f xs)
  -- = suc (length (map f xs))
  -- ≡ suc (length xs)         [by IH]
  -- = length (x ∷ xs) ✓
```
</details>

<details>
<summary>Practice: Why does `reverse (reverse xs) ≡ xs` need a helper lemma?</summary>

Direct induction gives:
```
reverse (reverse (x ∷ xs))
= reverse (reverse xs ++ (x ∷ []))
```

We're stuck because `reverse` doesn't distribute simply. We need the helper:

$$\text{reverse}(xs \mathbin{++} ys) \equiv \text{reverse}(ys) \mathbin{++} \text{reverse}(xs)$$

Then:
```
reverse (reverse xs ++ (x ∷ []))
= reverse (x ∷ []) ++ reverse (reverse xs)  [by helper]
= (x ∷ []) ++ reverse (reverse xs)          [by def]
= x ∷ reverse (reverse xs)                   [by def of ++]
= x ∷ xs                                     [by IH]
```
</details>
