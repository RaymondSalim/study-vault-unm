---
title: "Trees"
order: 9
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["binary-tree", "tree-induction", "traversal", "structural-recursion"]
---

## Binary Tree Type

```
data Tree (A : Set) : Set where
  leaf : Tree A
  node : Tree A → A → Tree A → Tree A
```

| Constructor | Meaning |
|-------------|---------|
| `leaf` | Empty tree |
| `node l x r` | Node with left subtree $l$, value $x$, right subtree $r$ |

### Example

```
      2
     / \
    1   3
   / \ / \
  .  . .   .
```
= `node (node leaf 1 leaf) 2 (node leaf 3 leaf)`

## Core Operations

### Size (number of nodes)

```
size : Tree A → ℕ
size leaf         = zero
size (node l x r) = suc (size l + size r)
```

### Height

```
height : Tree A → ℕ
height leaf         = zero
height (node l x r) = suc (max (height l) (height r))
```

### Mirror

```
mirror : Tree A → Tree A
mirror leaf         = leaf
mirror (node l x r) = node (mirror r) x (mirror l)
```

### Flatten (in-order traversal)

```
flatten : Tree A → List A
flatten leaf         = []
flatten (node l x r) = flatten l ++ (x ∷ flatten r)
```

## Tree Traversals

| Traversal | Order | For `node l x r` |
|-----------|-------|-------------------|
| In-order | Left, Root, Right | `flatten l ++ [x] ++ flatten r` |
| Pre-order | Root, Left, Right | `x ∷ flatten-pre l ++ flatten-pre r` |
| Post-order | Left, Right, Root | `flatten-post l ++ flatten-post r ++ [x]` |

## Induction on Trees

To prove $\forall t : \text{Tree}\, A.\; P(t)$:

| Step | What to prove |
|------|--------------|
| Base | $P(\texttt{leaf})$ |
| Inductive | $\forall l, x, r.\; P(l) \to P(r) \to P(\texttt{node}\; l\; x\; r)$ |

```
proof : (t : Tree A) → P t
proof leaf         = {- base case -}
proof (node l x r) = {- use (proof l) and (proof r) as IH -}
```

> Note: tree induction gives **two** inductive hypotheses (one per subtree).

## Key Proofs

### Mirror involution: `mirror (mirror t) ≡ t`

```
mirror-invol : (t : Tree A) → mirror (mirror t) ≡ t
mirror-invol leaf = refl
mirror-invol (node l x r) =
  -- mirror (mirror (node l x r))
  -- = mirror (node (mirror r) x (mirror l))
  -- = node (mirror (mirror l)) x (mirror (mirror r))
  -- ≡ node l x r  [by IH on l and r]
  cong₂ (λ a b → node a x b) (mirror-invol l) (mirror-invol r)
```

### Size of mirror: `size (mirror t) ≡ size t`

```
size-mirror : (t : Tree A) → size (mirror t) ≡ size t
size-mirror leaf = refl
size-mirror (node l x r) =
  -- size (mirror (node l x r))
  -- = size (node (mirror r) x (mirror l))
  -- = suc (size (mirror r) + size (mirror l))
  -- ≡ suc (size r + size l)      [by IH]
  -- ≡ suc (size l + size r)      [by +-comm]
  -- = size (node l x r) ✓
  cong suc (trans (cong₂ _+_ (size-mirror r) (size-mirror l)) (+-comm ...))
```

### Flatten mirror: `flatten (mirror t) ≡ reverse (flatten t)`

```
flatten-mirror : (t : Tree A)
               → flatten (mirror t) ≡ reverse (flatten t)
flatten-mirror leaf = refl
flatten-mirror (node l x r) =
  -- flatten (node (mirror r) x (mirror l))
  -- = flatten (mirror r) ++ (x ∷ flatten (mirror l))
  -- ≡ reverse (flatten r) ++ (x ∷ reverse (flatten l))  [by IH]
  -- ≡ reverse (flatten l ++ (x ∷ flatten r))            [by reverse-++ lemmas]
  {- requires helper lemmas about reverse and ++ -}
```

## Proof Summary Table

| Property | Base | Inductive step uses |
|----------|------|-------------------|
| `mirror (mirror t) ≡ t` | `refl` | Two IHs + `cong₂` |
| `size (mirror t) ≡ size t` | `refl` | Two IHs + `+-comm` |
| `height (mirror t) ≡ height t` | `refl` | Two IHs + `max-comm` |
| `size t ≤ 2^(height t) - 1` | trivial | IHs + arithmetic |

## Relationship Between Size and Height

| Bound | Formula |
|-------|---------|
| Minimum height (balanced) | $h \geq \lceil \log_2(n+1) \rceil$ |
| Maximum height (degenerate) | $h = n$ |
| Max nodes at height $h$ | $2^h - 1$ |

<details>
<summary>Practice: Prove `height (mirror t) ≡ height t`</summary>

```
height-mirror : (t : Tree A) → height (mirror t) ≡ height t
height-mirror leaf = refl
height-mirror (node l x r) =
  -- height (node (mirror r) x (mirror l))
  -- = suc (max (height (mirror r)) (height (mirror l)))
  -- ≡ suc (max (height r) (height l))  [by IH on r and l]
  -- ≡ suc (max (height l) (height r))  [by max-comm]
  -- = height (node l x r) ✓
  cong suc (trans (cong₂ max (height-mirror r) (height-mirror l))
                  (max-comm (height r) (height l)))
```
</details>

<details>
<summary>Practice: Define `map` for trees and prove `map id t ≡ t`</summary>

```
map-tree : (A → B) → Tree A → Tree B
map-tree f leaf         = leaf
map-tree f (node l x r) = node (map-tree f l) (f x) (map-tree f r)

map-tree-id : (t : Tree A) → map-tree id t ≡ t
map-tree-id leaf         = refl
map-tree-id (node l x r) =
  cong₂ (λ a b → node a x b) (map-tree-id l) (map-tree-id r)
  -- Actually need: node (map-tree id l) (id x) (map-tree id r) ≡ node l x r
  -- id x = x, and by IH both subtrees equal
```

Note: we use two IHs since `map-tree` recurses on both subtrees.
</details>

<details>
<summary>Practice: Why does tree induction need two IHs but list induction needs one?</summary>

The inductive type determines the number of IHs:
- `List A` has one recursive occurrence: `x ∷ xs` (one sublist `xs`)
- `Tree A` has two recursive occurrences: `node l x r` (two subtrees `l`, `r`)

In general, each recursive position in a constructor gives one IH. A rose tree `data Rose A = Fork A (List (Rose A))` would need induction on the list of children.
</details>
