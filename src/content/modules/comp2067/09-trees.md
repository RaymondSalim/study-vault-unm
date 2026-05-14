---
title: "Trees"
order: 9
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["binary-tree", "tree-induction", "traversal", "structural-recursion"]
---

## Binary Tree Type

:::eli10

A binary tree is either empty (a "leaf") or it's a node with a value in the middle and two smaller trees hanging off it (left and right). It's like a family tree where each person has at most two children. You build trees from the bottom up and take them apart from the top down.

:::

:::eli15

In type theory, binary trees are defined with two constructors:

- `leaf`: An empty tree (no data)
- `node l x r`: A value `x` with a left subtree `l` and right subtree `r`

This is an inductive type with **two recursive positions** (left and right subtrees), which means tree functions need to recurse on both, and tree proofs need two induction hypotheses.

:::

:::eli20

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

:::

## Core Operations

:::eli10

The basic tree operations are: **size** (how many values are stored), **height** (how many levels deep it goes), **mirror** (swaps left and right everywhere), and **flatten** (reads out all the values into a list in left-to-right order). Each one is defined by handling the leaf case and the node case separately.

:::

:::eli15

Standard operations on binary trees, all defined by structural recursion:

- **Size**: Count all nodes. `leaf` has 0, `node l x r` has `1 + size(l) + size(r)`.
- **Height**: Longest path from root to leaf. `leaf` has 0, `node l x r` has `1 + max(height l, height r)`.
- **Mirror**: Swap left and right subtrees recursively — useful for proving symmetry properties.
- **Flatten** (in-order): Convert tree to a sorted list by visiting left, then root, then right.

:::

:::eli20

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

:::

## Tree Traversals

:::eli10

Tree traversals are different orders for visiting every node. **In-order** goes left-root-right (gives sorted output for search trees). **Pre-order** goes root-left-right (good for copying). **Post-order** goes left-right-root (good for deleting). It's like three different routes through the same park.

:::

:::eli15

Three standard traversal orders for `node l x r`:

- **In-order** (Left, Root, Right): Produces sorted output for BSTs. Recursively visit left subtree, process root, then right subtree.
- **Pre-order** (Root, Left, Right): Root first — useful for serialization/copying.
- **Post-order** (Left, Right, Root): Root last — useful for deletion or bottom-up computations.

Each can be implemented as a function `Tree A -> List A` that collects elements in the given order.

:::

:::eli20

| Traversal | Order | For `node l x r` |
|-----------|-------|-------------------|
| In-order | Left, Root, Right | `flatten l ++ [x] ++ flatten r` |
| Pre-order | Root, Left, Right | `x ∷ flatten-pre l ++ flatten-pre r` |
| Post-order | Left, Right, Root | `flatten-post l ++ flatten-post r ++ [x]` |

:::

## Induction on Trees

:::eli10

Proving something about all trees works like proving something about all numbers, but with a twist: since each node has TWO subtrees, you get TWO induction hypotheses. Prove it for the empty tree (leaf), then prove that if it works for both subtrees, it works for the whole node.

:::

:::eli15

**Structural induction on trees** has:

1. **Base case**: Prove $P(\text{leaf})$
2. **Inductive step**: Assuming $P(l)$ and $P(r)$ (two IHs!), prove $P(\text{node}\; l\; x\; r)$ for any $x$

This reflects the structure: a tree has two recursive sub-structures, so you get two induction hypotheses. Compare with lists (one recursive position -> one IH) and natural numbers (one recursive position -> one IH).

:::

:::eli20

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

:::

## Key Proofs

:::eli10

The big theorem about mirror is that doing it twice gives you back the original tree (it's an involution). Mirroring also doesn't change the size or height of a tree — it just swaps left and right. Flattening a mirrored tree gives you the reverse of flattening the original.

:::

:::eli15

Important tree theorems:

- **Mirror is an involution**: `mirror (mirror t) = t` — mirroring twice gets back to the start. Uses both IHs and `cong2`.
- **Size preserved by mirror**: `size (mirror t) = size t` — swapping subtrees doesn't change count. Needs commutativity of addition.
- **Flatten mirror = reverse flatten**: The in-order traversal of a mirrored tree is the reverse of the original's in-order traversal. Needs helper lemmas about `reverse` and `++`.

All proofs follow the same structure: base case trivial, inductive step uses the two IHs.

:::

:::eli20

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

:::

## Proof Summary Table

:::eli10

Here's a cheat sheet: mirror doesn't change size or height (just swaps sides), and mirroring twice gives you back the original. All these proofs use the two induction hypotheses (one for each subtree) and some basic arithmetic properties.

:::

:::eli15

| Property | Key idea |
|----------|----------|
| `mirror (mirror t) = t` | Both IHs + cong2 |
| `size (mirror t) = size t` | Both IHs + commutativity of addition |
| `height (mirror t) = height t` | Both IHs + commutativity of max |
| `flatten (mirror t) = reverse (flatten t)` | Both IHs + reverse/append lemmas |

The consistent pattern: base case is `refl`, inductive step combines both IHs with `cong2` and possibly an auxiliary commutativity lemma.

:::

:::eli20

| Property | Base | Inductive step uses |
|----------|------|-------------------|
| `mirror (mirror t) ≡ t` | `refl` | Two IHs + `cong₂` |
| `size (mirror t) ≡ size t` | `refl` | Two IHs + `+-comm` |
| `height (mirror t) ≡ height t` | `refl` | Two IHs + `max-comm` |
| `size t ≤ 2^(height t) - 1` | trivial | IHs + arithmetic |

:::

## Relationship Between Size and Height

:::eli10

A balanced tree (short and wide) has height about $\log n$. A degenerate tree (tall and skinny, like a linked list) has height equal to the number of nodes. The height tells you how efficient search will be — shorter is better.

:::

:::eli15

The relationship between a tree's size ($n$ = number of nodes) and height ($h$):

- **Minimum height** (perfectly balanced): $h \approx \log_2 n$ — this is optimal
- **Maximum height** (completely degenerate/linear): $h = n$ — worst case, essentially a linked list
- **Maximum nodes for given height**: A perfect binary tree of height $h$ has $2^h - 1$ nodes

This relationship explains why balanced trees (AVL, red-black) guarantee $O(\log n)$ operations.

:::

:::eli20

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

:::
