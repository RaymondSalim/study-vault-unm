---
title: "AVL Trees"
order: 4
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["avl", "balanced-trees", "rotations", "self-balancing"]
---

## AVL Property

:::eli10

An AVL tree is a special kind of search tree that keeps itself balanced — like a seesaw that never tips too far to one side. At every node, the left and right sides can differ in height by at most 1. If inserting or deleting something breaks this rule, the tree "rotates" to fix itself. This guarantees fast searching every time.

:::

:::eli15

An AVL tree is a self-balancing BST that maintains the invariant: for every node, the heights of the left and right subtrees differ by at most 1. This ensures the height is always $O(\log n)$, guaranteeing worst-case $O(\log n)$ for search, insert, and delete.

The minimum number of nodes for a given height follows a Fibonacci-like recurrence: $N(h) = N(h-1) + N(h-2) + 1$. The height is bounded by approximately $1.44 \log_2 n$.

:::

:::eli20

An AVL tree is a BST where for **every** node:

$$|\text{balance factor}| = |h(\text{left}) - h(\text{right})| \leq 1$$

This guarantees height $h = O(\log n)$, so all operations are $O(\log n)$ worst case.

### Height Bound

$$h < 1.44 \log_2(n+2) - 0.328$$

Minimum nodes for height $h$ (Fibonacci-like): $N(h) = N(h-1) + N(h-2) + 1$

| Height | Min nodes |
|--------|-----------|
| 0 | 1 |
| 1 | 2 |
| 2 | 4 |
| 3 | 7 |
| 4 | 12 |
| 5 | 20 |

:::

## Balance Factor

:::eli10

The balance factor tells you if a node is leaning left, leaning right, or perfectly balanced. If it leans too far (balance factor of +2 or -2), the tree needs to fix itself with a rotation.

:::

:::eli15

The **balance factor** of a node is the height of its left subtree minus the height of its right subtree:

- BF = +1: slightly left-heavy (fine)
- BF = 0: perfectly balanced (fine)
- BF = -1: slightly right-heavy (fine)
- BF = +2 or -2: **violation** — a rotation is needed to restore balance

After every insert or delete, you walk back up to the root checking balance factors.

:::

:::eli20

$$BF(node) = height(left) - height(right)$$

| BF | Meaning |
|----|---------|
| +1 | Left-heavy |
| 0 | Balanced |
| -1 | Right-heavy |
| +2 or -2 | **Violation** -- needs rotation |

:::

## Rotations

:::eli10

Rotations are like rearranging a mobile hanging from the ceiling. When one side gets too heavy, you shift things around so it balances again — without breaking the rule that smaller items are on the left and bigger items are on the right. There are four patterns depending on where the extra weight is.

:::

:::eli15

When a node becomes unbalanced (BF = +2 or -2), we fix it with rotations — local rearrangements that preserve the BST ordering but change the structure:

- **LL (Right Rotation)**: The imbalance is in the left child's left subtree — one rotation to the right
- **RR (Left Rotation)**: The imbalance is in the right child's right subtree — one rotation to the left
- **LR (Left-Right)**: Imbalance in left child's right subtree — first rotate child left, then rotate node right
- **RL (Right-Left)**: Imbalance in right child's left subtree — first rotate child right, then rotate node left

Each rotation is $O(1)$ — just pointer reassignment.

:::

:::eli20

### Right Rotation (LL case)

Triggered when: BF = +2 and left child BF = +1 (or 0)

```
        z (+2)              y
       / \                /   \
      y   T4    -->      x     z
     / \                / \   / \
    x   T3             T1 T2 T3 T4
   / \
  T1  T2
```

### Left Rotation (RR case)

Triggered when: BF = -2 and right child BF = -1 (or 0)

```
    z (-2)                  y
   / \                    /   \
  T1   y      -->        z     x
      / \               / \   / \
     T2  x             T1 T2 T3 T4
        / \
       T3  T4
```

### Left-Right Rotation (LR case)

Triggered when: BF = +2 and left child BF = -1

```
      z (+2)          z (+2)            x
     / \             / \              /   \
    y   T4  -->     x   T4   -->    y     z
   / \             / \             / \   / \
  T1  x           y   T3         T1 T2 T3 T4
     / \         / \
    T2  T3      T1  T2
```
Step 1: Left-rotate at y | Step 2: Right-rotate at z

### Right-Left Rotation (RL case)

Triggered when: BF = -2 and right child BF = +1

```
    z (-2)          z (-2)              x
   / \             / \                /   \
  T1   y   -->    T1  x      -->    z     y
      / \            / \           / \   / \
     x  T4         T2   y        T1 T2 T3 T4
    / \                 / \
   T2  T3              T3  T4
```
Step 1: Right-rotate at y | Step 2: Left-rotate at z

:::

## Rotation Decision Table

:::eli10

To pick the right rotation, you just look at two numbers: the balance factor of the unbalanced node and the balance factor of its heavy child. These two numbers tell you exactly which rotation pattern to use.

:::

:::eli15

Quick reference for choosing the correct rotation:

| Situation | What to do |
|-----------|-----------|
| Node BF = +2, child BF = +1 or 0 | Single right rotation (LL) |
| Node BF = +2, child BF = -1 | Double: left-right rotation (LR) |
| Node BF = -2, child BF = -1 or 0 | Single left rotation (RR) |
| Node BF = -2, child BF = +1 | Double: right-left rotation (RL) |

Memory trick: If the node and child lean the same way, it's a single rotation. If they lean opposite ways, it's a double rotation.

:::

:::eli20

| Node BF | Child BF | Rotation | Case |
|---------|----------|----------|------|
| +2 | +1 or 0 | Right rotation | LL |
| +2 | -1 | Left-Right rotation | LR |
| -2 | -1 or 0 | Left rotation | RR |
| -2 | +1 | Right-Left rotation | RL |

:::

## Insert Algorithm

:::eli10

Inserting into an AVL tree is like adding a new item to a balanced bookshelf. First you put the new item where it belongs (just like a normal BST). Then you walk back and check if any shelf got too lopsided. If it did, you do one rotation to fix it — and then you're done.

:::

:::eli15

AVL insertion:
1. Do a normal BST insert (find the correct leaf position)
2. Walk back up to the root, updating heights at each ancestor
3. At the first node where $|BF| > 1$, apply the appropriate rotation
4. **Only one rotation** (single or double) is ever needed per insert — once you fix the first violation, everything above is fine

:::

:::eli20

1. Perform standard BST insert
2. Update heights on path from inserted node to root
3. Check balance factor at each ancestor
4. If $|BF| > 1$: apply appropriate rotation
5. **At most one rotation** (single or double) needed per insert

```
insert(node, key):
    // Standard BST insert
    if node is null: return new Node(key)
    if key < node.key: node.left = insert(node.left, key)
    else: node.right = insert(node.right, key)

    // Update height
    node.height = 1 + max(height(left), height(right))

    // Check balance
    bf = balanceFactor(node)

    // LL
    if bf > 1 and key < node.left.key:
        return rightRotate(node)
    // RR
    if bf < -1 and key > node.right.key:
        return leftRotate(node)
    // LR
    if bf > 1 and key > node.left.key:
        node.left = leftRotate(node.left)
        return rightRotate(node)
    // RL
    if bf < -1 and key < node.right.key:
        node.right = rightRotate(node.right)
        return leftRotate(node)

    return node
```

:::

## Delete Algorithm

:::eli10

Deleting from an AVL tree is trickier than inserting. You remove the item like in a normal BST, but then you might need to fix balance at multiple levels going up — not just one. It's like removing a block from a Jenga tower and having to adjust several layers.

:::

:::eli15

AVL deletion:
1. Perform standard BST delete (leaf, one-child, or two-children case)
2. Walk back up to the root, updating heights
3. Fix balance at **every** ancestor that has $|BF| > 1$

Key difference from insert: deletion can cause a cascade of rotations — up to $O(\log n)$ rotations may be needed (one at each level), whereas insert needs at most one.

:::

:::eli20

1. Perform standard BST delete
2. Update heights on path back to root
3. Check and fix balance at each ancestor
4. **Multiple rotations** may be needed (up to $O(\log n)$)

Key difference from insert: deletion may require rebalancing at **every** ancestor, not just the first unbalanced node.

:::

## Operations Complexity

:::eli10

Because AVL trees always stay balanced, every operation (searching, adding, or removing) takes about $\log n$ steps — even in the worst case. Rotations themselves are instant (just moving a few pointers around).

:::

:::eli15

All AVL tree operations are guaranteed $O(\log n)$ because the tree height is always $O(\log n)$:

- Search, Insert, Delete: $O(\log n)$
- Each rotation itself is $O(1)$ (constant pointer changes)
- Insert triggers at most 1 rotation; Delete may trigger up to $O(\log n)$ rotations

:::

:::eli20

| Operation | Time | Space |
|-----------|------|-------|
| Search | $O(\log n)$ | $O(\log n)$ recursive / $O(1)$ iterative |
| Insert | $O(\log n)$ | $O(\log n)$ |
| Delete | $O(\log n)$ | $O(\log n)$ |
| Rotation | $O(1)$ | $O(1)$ |

:::

## AVL vs Standard BST

:::eli10

A regular BST can become very unbalanced (imagine adding numbers 1, 2, 3, 4, 5 — it becomes a straight line!). An AVL tree prevents this by automatically rebalancing, so it's always fast. The trade-off is that inserts and deletes need extra work to maintain the balance.

:::

:::eli15

Why use AVL over a plain BST?

- **Plain BST**: Can degenerate to $O(n)$ height if you insert sorted data. Great when you know the data is random.
- **AVL tree**: Guarantees $O(\log n)$ height regardless of insertion order. Costs a little extra per insert/delete (rotation + storing height), but search is always fast.

Use AVL when lookups are frequent and you need worst-case guarantees. Use plain BST when the data is already random and you want simplicity.

:::

:::eli20

| Property | BST | AVL |
|----------|-----|-----|
| Worst-case height | $O(n)$ | $O(\log n)$ |
| Insert complexity | $O(n)$ worst | $O(\log n)$ always |
| Extra storage | None | Height/BF per node |
| Insert overhead | None | Rotations |
| Best for | Rare imbalance | Frequent lookups |

<details>
<summary><strong>Practice: Insert Sequence into AVL</strong></summary>

Insert: 10, 20, 30, 15, 25

**Insert 10**: `10` (BF=0)

**Insert 20**: `10(-1) -> 20` (balanced)

**Insert 30**: 
```
10 (-2)
  \
   20 (-1)    --> RR rotation at 10
     \
      30
```
After rotation:
```
   20
  /  \
 10   30
```

**Insert 15**:
```
    20 (+1)
   /  \
  10   30
    \
     15
```
BF(20)=1, BF(10)=-1... balanced (no |BF|>1).

Wait -- BF(10) = 0-1 = -1, BF(20) = 1-1 = 0. Actually still balanced.

Corrected: h(left of 20) = 1 (10->15), h(right of 20) = 0 (30). BF(20) = 1. OK.

**Insert 25**:
```
      20 (-1)
     /  \
    10   30 (+1)
      \  /
      15 25
```
BF(30) = 1, BF(20) = -1? Let's recalculate. h(left of 20)=1, h(right of 20)=1. BF(20)=0. All balanced.

Final tree:
```
      20
     /  \
    10   30
      \  /
      15 25
```

</details>

<details>
<summary><strong>Practice: Identify Rotation Type</strong></summary>

For each scenario, identify the rotation needed:

1. Node BF = +2, Left child BF = +1
   - **Answer**: LL (single right rotation)

2. Node BF = +2, Left child BF = -1
   - **Answer**: LR (left rotate child, then right rotate node)

3. Node BF = -2, Right child BF = -1
   - **Answer**: RR (single left rotation)

4. Node BF = -2, Right child BF = +1
   - **Answer**: RL (right rotate child, then left rotate node)

</details>

<details>
<summary><strong>Practice: Delete from AVL</strong></summary>

Delete 8 from:
```
       10 (BF=+1)
      /  \
     5    15
    / \
   3   8
```

1. Delete 8 (leaf -- remove directly)
2. Update heights: h(5) goes from 1 to 1? No: left(5)=3 (h=0), right(5)=null (h=-1). h(5)=1. BF(5)=+1. OK.
3. h(10): left=2, right=0... wait. h(left of 10)=h(5)=1, h(right of 10)=h(15)=0. BF(10)=+1. Still OK since the subtree under 5 now has height 1.

Actually after deleting 8:
```
       10
      /  \
     5    15
    /
   3
```
h(5)=1, h(15)=0. BF(10) = 1-0 = +1. Balanced. No rotation needed.

Now delete 15:
```
       10 (+2)
      /
     5
    /
   3
```
BF(10) = 2. BF(5) = +1. This is **LL case** -- right rotate at 10:
```
     5
    / \
   3   10
```

</details>

:::
