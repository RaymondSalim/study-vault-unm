---
title: "Lists"
order: 8
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["list", "cons", "append", "map", "fold", "induction"]
---

## List Type

:::eli10

A list is either empty (`[]`) or it's one item stuck onto the front of another list (like building a train car by car). `1 :: 2 :: 3 :: []` is the list [1, 2, 3]. Every list operation works by handling these two cases: what to do with an empty list, and what to do when you have a first item and the rest.

:::

:::eli15

In type theory, lists are defined inductively — similar to natural numbers but carrying data:

- `[]` (nil): The empty list
- `x :: xs` (cons): Element `x` prepended to list `xs`

All list functions are defined by pattern matching on these two constructors, and all list proofs use induction on the list structure (base case for `[]`, inductive step for `x :: xs`).

:::

:::eli20

```
data List (A : Set) : Set where
  []  : List A
  _∷_ : A → List A → List A
```

| Constructor | Meaning | Example |
|-------------|---------|---------|
| `[]` | Empty list (nil) | `[]` |
| `x ∷ xs` | Cons: prepend $x$ to $xs$ | `1 ∷ 2 ∷ 3 ∷ []` |

:::

## Core Operations

:::eli10

The basic things you can do with lists: **append** (joining two lists end-to-end), **length** (counting items), **map** (applying a function to every item), and **reverse** (flipping the list backwards). Each one is defined by taking apart the first list piece by piece.

:::

:::eli15

Standard list operations defined by structural recursion:

- **Append** (`xs ++ ys`): Puts list `ys` at the end of `xs` by recursing on `xs`
- **Length**: Counts elements by adding 1 for each cons
- **Map** (`map f xs`): Applies function `f` to every element
- **Fold** (`foldr f e xs`): Collapses a list using a binary operation and initial value
- **Reverse**: Flips the list (naive version is $O(n^2)$ due to append)

All recurse on the first list argument.

:::

:::eli20

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

:::

## Induction on Lists

:::eli10

Proving things about all lists is like proving things about all natural numbers — but instead of zero and successor, you have empty list and "one more item at the front." Prove it for the empty list (base case), then prove that if it works for some list, it still works when you add one more element to the front.

:::

:::eli15

**Structural induction on lists** mirrors induction on natural numbers:

1. **Base case**: Prove $P([])$
2. **Inductive step**: Assuming $P(xs)$ (the IH), prove $P(x :: xs)$ for any element $x$

In Agda, this is just recursive function definition:
- Pattern match on `[]` for the base case
- Pattern match on `x :: xs` and use the recursive call `proof xs` as the induction hypothesis

Most list proofs induct on the first argument (since `_++_` and `map` both recurse on it).

:::

:::eli20

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

:::

## Key Proofs

:::eli10

The important list proofs show that append is associative (grouping doesn't matter), appending empty does nothing, and map distributes over append (mapping over a joined list is the same as joining two mapped lists). They all follow the same recipe: induction on the first list, base case is `refl`, and the inductive step wraps the IH with `cong`.

:::

:::eli15

Key properties of list operations, all proved by induction on the first list:

- **Append associativity**: $(xs ++ ys) ++ zs = xs ++ (ys ++ zs)$ — induct on `xs`
- **Right identity**: $xs ++ [] = xs$ — needs induction (like `n + 0 = n` for numbers)
- **Length distributes**: $\text{length}(xs ++ ys) = \text{length}(xs) + \text{length}(ys)$
- **Map distributes**: $\text{map}\; f\; (xs ++ ys) = \text{map}\; f\; xs ++ \text{map}\; f\; ys$
- **Map composition** (functor law): $\text{map}\; f\; (\text{map}\; g\; xs) = \text{map}\; (f \circ g)\; xs$

The proof pattern is nearly identical each time: base case `refl`, step uses `cong (x ::_)` or `cong suc` applied to the IH.

:::

:::eli20

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

:::

## Proof Pattern Summary

:::eli10

Almost every list proof follows the same pattern: do induction on the first list, the empty case is trivial, and the cons case uses `cong` to wrap the induction hypothesis with the head element. Once you see this pattern, all list proofs become very predictable.

:::

:::eli15

The standard recipe for list proofs:

1. Induct on the "structurally relevant" list (usually the first argument of `++` or `map`)
2. Base case (`[]`): Both sides reduce by definition, so `refl` works
3. Inductive case (`x :: xs`): Both sides reduce, then apply `cong (x ::_)` to the induction hypothesis

Harder proofs (like `reverse (reverse xs) = xs`) need auxiliary lemmas about how `reverse` interacts with `++`.

:::

:::eli20

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

:::
