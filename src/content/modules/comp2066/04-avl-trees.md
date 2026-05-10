---
title: "AVL Trees"
order: 4
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["avl", "balanced-trees", "rotations", "self-balancing"]
---

## AVL Property

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

## Balance Factor

$$BF(node) = height(left) - height(right)$$

| BF | Meaning |
|----|---------|
| +1 | Left-heavy |
| 0 | Balanced |
| -1 | Right-heavy |
| +2 or -2 | **Violation** -- needs rotation |

## Rotations

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

## Rotation Decision Table

| Node BF | Child BF | Rotation | Case |
|---------|----------|----------|------|
| +2 | +1 or 0 | Right rotation | LL |
| +2 | -1 | Left-Right rotation | LR |
| -2 | -1 or 0 | Left rotation | RR |
| -2 | +1 | Right-Left rotation | RL |

## Insert Algorithm

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

## Delete Algorithm

1. Perform standard BST delete
2. Update heights on path back to root
3. Check and fix balance at each ancestor
4. **Multiple rotations** may be needed (up to $O(\log n)$)

Key difference from insert: deletion may require rebalancing at **every** ancestor, not just the first unbalanced node.

## Operations Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Search | $O(\log n)$ | $O(\log n)$ recursive / $O(1)$ iterative |
| Insert | $O(\log n)$ | $O(\log n)$ |
| Delete | $O(\log n)$ | $O(\log n)$ |
| Rotation | $O(1)$ | $O(1)$ |

## AVL vs Standard BST

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
