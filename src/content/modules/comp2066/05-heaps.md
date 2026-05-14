---
title: "Heaps & Priority Queues"
order: 5
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["heaps", "priority-queue", "heapify", "heap-sort"]
---

## Heap Definition

:::eli10

A heap is like a tournament bracket. In a max-heap, the winner (biggest value) is always at the top, and every parent beats their children. It's stored as an array but you can think of it as a tree. You can always find the biggest (or smallest) item instantly because it's right at position zero.

:::

:::eli15

A **binary heap** is a complete binary tree (every level is full except possibly the last, which fills left-to-right) that satisfies the **heap property**:

- **Max-heap**: Every parent is greater than or equal to its children (root = maximum)
- **Min-heap**: Every parent is less than or equal to its children (root = minimum)

Heaps are stored as arrays. For a node at index $i$: its parent is at $(i-1)/2$, left child at $2i+1$, right child at $2i+2$. No pointers needed — the structure is implicit from the indices.

:::

:::eli20

A **binary heap** is a complete binary tree satisfying the heap property:

| Type | Property |
|------|----------|
| Max-heap | Parent $\geq$ children |
| Min-heap | Parent $\leq$ children |

### Array Representation

For node at index $i$ (0-indexed):

| Relationship | Index |
|-------------|-------|
| Parent | $\lfloor (i-1)/2 \rfloor$ |
| Left child | $2i + 1$ |
| Right child | $2i + 2$ |

For 1-indexed:

| Relationship | Index |
|-------------|-------|
| Parent | $\lfloor i/2 \rfloor$ |
| Left child | $2i$ |
| Right child | $2i + 1$ |

### Properties

| Property | Value |
|----------|-------|
| Height | $\lfloor \log_2 n \rfloor$ |
| Max nodes at level $l$ | $2^l$ |
| Leaves | indices $\lfloor n/2 \rfloor$ to $n-1$ |
| Root | index 0 (max in max-heap, min in min-heap) |

:::

## Core Operations

:::eli10

The main heap operations are like managing a leaderboard. "Insert" adds a new player at the bottom and lets them move up if they beat their parent. "Extract" removes the champion from the top, puts the last player there, and lets them sink down to the right spot. Both take about $\log n$ steps because the heap is shaped like a balanced tree.

:::

:::eli15

The key heap operations:

- **Heapify (sift-down)**: Fix a violation by swapping a node down with its largest child until the heap property is restored. $O(\log n)$.
- **Insert (sift-up)**: Add at the end, then bubble up by swapping with parent while larger. $O(\log n)$.
- **Extract-max**: Remove root, replace with last element, then sift-down to restore order. $O(\log n)$.
- **Build-heap**: Convert an arbitrary array into a heap by calling heapify bottom-up on all non-leaf nodes. Despite appearances, this is $O(n)$ total (not $O(n \log n)$) because most nodes are near the leaves and need very few swaps.

:::

:::eli20

### Heapify (Sift-Down)

Fix heap property at node $i$ assuming subtrees are valid heaps.

```
maxHeapify(A, i, size):
    largest = i
    l = 2*i + 1
    r = 2*i + 2
    if l < size and A[l] > A[largest]:
        largest = l
    if r < size and A[r] > A[largest]:
        largest = r
    if largest != i:
        swap(A[i], A[largest])
        maxHeapify(A, largest, size)
```

**Time**: $O(\log n)$ -- traverses at most one path from node to leaf.

### Build-Heap

Convert arbitrary array into a heap by heapifying from bottom-up.

```
buildMaxHeap(A):
    for i = floor(n/2) - 1 downto 0:
        maxHeapify(A, i, n)
```

| Analysis | Complexity |
|----------|-----------|
| Naive bound | $O(n \log n)$ (n nodes, each $O(\log n)$) |
| Tight bound | $O(n)$ (most nodes near leaves, short heapify) |

**Proof of $O(n)$**: Sum $\sum_{h=0}^{\lfloor\log n\rfloor} \lceil n/2^{h+1}\rceil \cdot O(h) = O(n \sum_{h=0}^{\infty} h/2^h) = O(n)$

### Insert (Sift-Up)

```
insert(A, key):
    A.append(key)
    i = size - 1
    while i > 0 and A[parent(i)] < A[i]:
        swap(A[i], A[parent(i)])
        i = parent(i)
```

**Time**: $O(\log n)$

### Extract-Max (or Extract-Min)

```
extractMax(A):
    max = A[0]
    A[0] = A[size-1]
    size -= 1
    maxHeapify(A, 0, size)
    return max
```

**Time**: $O(\log n)$

### Increase/Decrease Key

```
increaseKey(A, i, newKey):
    A[i] = newKey
    while i > 0 and A[parent(i)] < A[i]:
        swap(A[i], A[parent(i)])
        i = parent(i)
```

**Time**: $O(\log n)$

:::

## Operations Summary

:::eli10

Here's the quick cheat sheet: finding the biggest item is instant ($O(1)$), but adding, removing, or changing items takes $O(\log n)$ steps. Building a whole heap from scratch is surprisingly fast — only $O(n)$.

:::

:::eli15

| Operation | Time | Why |
|-----------|------|-----|
| Find max/min | $O(1)$ | Always at the root |
| Extract max/min | $O(\log n)$ | Remove root + sift-down |
| Insert | $O(\log n)$ | Add at end + sift-up |
| Increase key | $O(\log n)$ | Sift-up from modified node |
| Build heap | $O(n)$ | Bottom-up heapify (tight analysis) |
| Delete arbitrary | $O(\log n)$ | Swap with last + heapify |

:::

:::eli20

| Operation | Max-Heap Time |
|-----------|--------------|
| Find max | $O(1)$ |
| Extract max | $O(\log n)$ |
| Insert | $O(\log n)$ |
| Increase key | $O(\log n)$ |
| Build heap | $O(n)$ |
| Delete arbitrary | $O(\log n)$ |

:::

## Heap Sort

:::eli10

Heap Sort works by first turning the array into a max-heap (biggest on top), then repeatedly swapping the biggest item to the end and shrinking the heap. It's like always picking the tallest person and moving them to the back of the line. Always $O(n \log n)$ and doesn't need extra memory.

:::

:::eli15

Heap Sort algorithm:
1. Build a max-heap from the array — $O(n)$
2. Repeatedly swap the root (maximum) with the last unsorted element, shrink the heap, and sift-down — each extraction is $O(\log n)$, done $n-1$ times

Total: $O(n \log n)$ in all cases. In-place ($O(1)$ extra space). Not stable.

Compared to Quick Sort, Heap Sort has a better worst case ($O(n \log n)$ vs $O(n^2)$), but worse cache performance in practice.

:::

:::eli20

```
heapSort(A):
    buildMaxHeap(A)           // O(n)
    for i = n-1 downto 1:    // n-1 iterations
        swap(A[0], A[i])     // Move max to end
        maxHeapify(A, 0, i)  // O(log n)
```

| Property | Value |
|----------|-------|
| Time (all cases) | $O(n \log n)$ |
| Space | $O(1)$ in-place |
| Stable? | No |

### Heap Sort Trace

Array: `[4, 10, 3, 5, 1]`

1. Build max-heap: `[10, 5, 3, 4, 1]`
2. Swap 10 & 1, heapify: `[5, 4, 3, 1 | 10]`
3. Swap 5 & 1, heapify: `[4, 1, 3 | 5, 10]`
4. Swap 4 & 3, heapify: `[3, 1 | 4, 5, 10]`
5. Swap 3 & 1: `[1 | 3, 4, 5, 10]`

Result: `[1, 3, 4, 5, 10]`

:::

## Priority Queue

:::eli10

A priority queue is like a hospital waiting room — the sickest patient (highest priority) always gets seen next, regardless of when they arrived. You can add new patients and the most urgent one is always at the front. A heap is the best way to implement this.

:::

:::eli15

A **priority queue** is an abstract data type where each element has a priority, and you can always efficiently access/remove the highest-priority element.

Operations:
- `insert`: Add an element with a priority — $O(\log n)$
- `extractMax/Min`: Remove and return the highest-priority element — $O(\log n)$
- `peek`: Look at the highest priority without removing — $O(1)$

Common applications: job scheduling, Dijkstra's shortest path, Huffman coding, event-driven simulation.

:::

:::eli20

Abstract data type supporting:

| Operation | Description | Heap Time |
|-----------|-------------|-----------|
| `insert(key)` | Add element | $O(\log n)$ |
| `extractMax()` | Remove & return highest priority | $O(\log n)$ |
| `peek()` | Return highest priority without removing | $O(1)$ |
| `increaseKey(i, k)` | Increase priority of element | $O(\log n)$ |

### Applications

| Application | Heap Type |
|-------------|-----------|
| Job scheduling | Max-heap (highest priority first) |
| Dijkstra's algorithm | Min-heap (shortest distance first) |
| Huffman coding | Min-heap (lowest frequency first) |
| Median maintenance | One max-heap + one min-heap |
| Event simulation | Min-heap (earliest time first) |

:::

## Min-Heap vs Max-Heap

:::eli10

A min-heap keeps the smallest item on top (like a "who's shortest?" competition), while a max-heap keeps the biggest item on top (like a "who's tallest?" competition). You choose which one based on whether you need quick access to the smallest or largest value.

:::

:::eli15

The difference is simply the ordering:

- **Min-heap**: Root is the smallest element. Used when you need quick access to the minimum (e.g., Dijkstra's algorithm, event scheduling).
- **Max-heap**: Root is the largest element. Used when you need quick access to the maximum (e.g., heap sort, max priority queues).

All operations have the same complexity — only the comparison direction changes.

:::

:::eli20

| | Min-Heap | Max-Heap |
|--|---------|----------|
| Root | Smallest element | Largest element |
| Property | Parent $\leq$ children | Parent $\geq$ children |
| Extract | Returns minimum | Returns maximum |
| Use case | Dijkstra, event queues | Heap sort, max priority queue |

<details>
<summary><strong>Practice: Build Max-Heap</strong></summary>

**Array**: `[3, 9, 2, 1, 4, 5]`

Indices to heapify (bottom-up): 2, 1, 0

**Heapify index 2** (value 2): children = 5 (index 5). 5 > 2, swap.
Array: `[3, 9, 5, 1, 4, 2]`

**Heapify index 1** (value 9): children = 1, 4. 9 > both. No swap.
Array: `[3, 9, 5, 1, 4, 2]`

**Heapify index 0** (value 3): children = 9, 5. 9 > 3, swap with 9.
Array: `[9, 3, 5, 1, 4, 2]`
Now heapify index 1 (value 3): children = 1, 4. 4 > 3, swap.
Array: `[9, 4, 5, 1, 3, 2]`

**Final max-heap**: `[9, 4, 5, 1, 3, 2]`

</details>

<details>
<summary><strong>Practice: Sequence of Extractions</strong></summary>

Max-heap: `[20, 15, 10, 8, 12, 5, 3]`

**Extract 20**: swap with last (3), remove 20, heapify from root.
`[3, 15, 10, 8, 12, 5]` -> heapify -> `[15, 12, 10, 8, 3, 5]`

**Extract 15**: swap with last (5), remove 15, heapify.
`[5, 12, 10, 8, 3]` -> heapify -> `[12, 8, 10, 5, 3]`

Elements extracted in order: 20, 15, 12, ... (sorted descending!)

</details>

<details>
<summary><strong>Practice: Is this a valid max-heap?</strong></summary>

```
        50
       /  \
      30   40
     / \   /
    20 25  35
```

Check: 50 > 30, 40. 30 > 20, 25. 40 > 35. All parent >= children.

**Answer**: Yes, valid max-heap.

---

```
        50
       /  \
      30   40
     / \
    35  25
```

Check: 30 > 35? No! 35 > 30 violates heap property.

**Answer**: No, not a valid max-heap.

</details>

:::
