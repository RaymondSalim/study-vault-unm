---
title: "B-Trees"
order: 7
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["b-trees", "balanced-trees", "disk-storage", "multiway-trees"]
---

## B-Tree Definition

A B-tree of **minimum degree** $t$ (order $2t$) is a balanced multiway search tree satisfying:

| Property | Constraint |
|----------|-----------|
| Root keys | $1 \leq$ keys $\leq 2t-1$ |
| Non-root keys | $t-1 \leq$ keys $\leq 2t-1$ |
| Children of node with $k$ keys | Exactly $k+1$ children (if internal) |
| All leaves | Same depth |
| Ordering | Keys within node sorted; subtree between keys $k_i$ and $k_{i+1}$ contains values in $(k_i, k_{i+1})$ |

### Terminology Note

Some texts define **order** $m$ (max children = $m$):
- Min keys per non-root node: $\lceil m/2 \rceil - 1$
- Max keys per node: $m - 1$
- Relation: $m = 2t$

### Height Bound

For $n$ keys and minimum degree $t$:

$$h \leq \log_t \frac{n+1}{2}$$

A B-tree with $t=1000$ and $n=10^9$ keys has height $\leq 3$.

## Why B-Trees?

| Problem | Solution |
|---------|----------|
| Disk I/O is expensive | Minimise tree height (fewer disk reads) |
| Disk reads in blocks | Node size = disk block size |
| Memory hierarchy | Wide nodes fit disk access patterns |

| Comparison | BST/AVL | B-Tree |
|-----------|---------|--------|
| Branching factor | 2 | Up to $2t$ |
| Height for $n$ nodes | $O(\log_2 n)$ | $O(\log_t n)$ |
| Disk reads per search | $O(\log_2 n)$ | $O(\log_t n)$ |
| Optimised for | RAM | Disk/SSD |

## Search

```
search(node, key):
    i = 0
    while i < node.n and key > node.keys[i]:
        i += 1
    if i < node.n and key == node.keys[i]:
        return (node, i)
    if node.isLeaf:
        return null
    return search(node.children[i], key)
```

**Time**: $O(\log_t n)$ disk reads, $O(t \log_t n)$ total comparisons.

## Insert

**Key insight**: Never insert into a full node. Split full nodes proactively on the way down.

### Algorithm

1. Start at root; if root is full, split it (tree grows upward)
2. Traverse down to appropriate leaf, splitting any full node encountered
3. Insert key into the (non-full) leaf

### Split

Split a full node (with $2t-1$ keys) into two nodes of $t-1$ keys, pushing the **median** up to the parent.

```
splitChild(parent, i):
    fullNode = parent.children[i]   // has 2t-1 keys
    newNode = new Node()
    newNode.keys = fullNode.keys[t ... 2t-2]    // right half
    median = fullNode.keys[t-1]
    fullNode.keys = fullNode.keys[0 ... t-2]    // left half
    // Move median up to parent
    insert median into parent.keys at position i
    parent.children.insert(i+1, newNode)
```

### Example (t=2, 2-3-4 tree)

Insert 1, 2, 3, 4, 5:

```
Insert 1: [1]
Insert 2: [1, 2]
Insert 3: [1, 2, 3]  -- full (2t-1=3 keys)
Insert 4: Split! Median=2 goes up
         [2]
        /   \
      [1]   [3, 4]  -- then insert 4 into right
Wait, let me redo. Insert 4 causes split of root:
         [2]
        /   \
      [1]   [3]
Then insert 4 into right child: [3, 4]

Insert 5: Right child [3, 4, 5] is full on next insert...
Actually [3, 4] has room (max 3 keys for t=2), so insert 5:
         [2]
        /   \
      [1]   [3, 4, 5]
```

## Delete

Three cases depending on where the key is:

### Case 1: Key in Leaf

Simply remove it (if node has $\geq t$ keys after removal).

### Case 2: Key in Internal Node

| Sub-case | Condition | Action |
|----------|-----------|--------|
| 2a | Left child has $\geq t$ keys | Replace with predecessor, delete predecessor from child |
| 2b | Right child has $\geq t$ keys | Replace with successor, delete successor from child |
| 2c | Both children have $t-1$ keys | Merge children around key, then delete from merged node |

### Case 3: Key Not in Current Node (navigating down)

Before recursing into child $c_i$ with only $t-1$ keys:

| Sub-case | Condition | Action |
|----------|-----------|--------|
| 3a | Adjacent sibling has $\geq t$ keys | Rotate: borrow from sibling via parent |
| 3b | Both siblings have $t-1$ keys | Merge $c_i$ with a sibling and the separating parent key |

### Merge Operation

Combine two siblings (each with $t-1$ keys) and parent's separator key into one node with $2t-1$ keys.

## Operations Summary

| Operation | Disk I/O | CPU |
|-----------|----------|-----|
| Search | $O(\log_t n)$ | $O(t \log_t n)$ |
| Insert | $O(\log_t n)$ | $O(t \log_t n)$ |
| Delete | $O(\log_t n)$ | $O(t \log_t n)$ |
| Split | $O(1)$ | $O(t)$ |
| Merge | $O(1)$ | $O(t)$ |

## B-Tree Variants

| Variant | Difference |
|---------|-----------|
| B+ Tree | All keys in leaves; internal nodes only store separators; leaves linked |
| B* Tree | Nodes at least 2/3 full (delay splits by redistribution) |

### B+ Tree Advantages

| Feature | Benefit |
|---------|---------|
| All data in leaves | Simplifies range queries |
| Linked leaves | Sequential access without tree traversal |
| Internal nodes smaller | Higher branching factor, shorter tree |
| Used in | Databases (MySQL InnoDB), file systems (NTFS, ext4) |

<details>
<summary><strong>Practice: Insert into B-Tree (t=3)</strong></summary>

Max keys per node: $2t-1 = 5$. Min keys (non-root): $t-1 = 2$.

Insert sequence: 10, 20, 30, 40, 50, 60, 70

After inserting 10-50: `[10, 20, 30, 40, 50]` (full!)

Insert 60: split root. Median = 30.
```
          [30]
         /    \
  [10, 20]   [40, 50, 60]
```

Insert 70: goes into right child.
```
          [30]
         /    \
  [10, 20]   [40, 50, 60, 70]
```

Still room (max 5 keys). No split needed.

</details>

<details>
<summary><strong>Practice: Delete from B-Tree</strong></summary>

B-tree (t=2), max 3 keys, min 1 key per non-root node:

```
         [20]
        /    \
    [10]     [30, 40]
```

**Delete 10** (Case 1, but left child would have 0 keys):
- Case 3b applies: child has only $t-1=1$ key, sibling [30, 40] has $\geq t=2$ keys.
- Case 3a: Rotate -- bring 20 down to left, bring 30 up to parent.

```
         [30]
        /    \
    [10, 20]  [40]
```

Now delete 10 from left child (it has 2 keys, can afford to lose one):

```
         [30]
        /    \
      [20]   [40]
```

</details>

<details>
<summary><strong>Practice: Calculate B-Tree Height</strong></summary>

**Q**: A B-tree with $t=100$ stores 1,000,000 keys. What is the maximum height?

$$h \leq \log_t \frac{n+1}{2} = \log_{100} \frac{1000001}{2} \approx \log_{100} 500000$$

$$= \frac{\log_{10} 500000}{\log_{10} 100} = \frac{5.7}{2} \approx 2.85$$

So height $\leq 2$ (integer). With just 3 levels of disk reads, we can search among 1 million keys!

</details>
