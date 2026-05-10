---
title: "Heaps & Priority Queues"
order: 5
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["heaps", "priority-queue", "heapify", "heap-sort"]
---

## Heap Definition

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

## Core Operations

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

## Operations Summary

| Operation | Max-Heap Time |
|-----------|--------------|
| Find max | $O(1)$ |
| Extract max | $O(\log n)$ |
| Insert | $O(\log n)$ |
| Increase key | $O(\log n)$ |
| Build heap | $O(n)$ |
| Delete arbitrary | $O(\log n)$ |

## Heap Sort

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

## Priority Queue

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

## Min-Heap vs Max-Heap

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
