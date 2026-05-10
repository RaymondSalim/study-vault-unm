---
title: "Sorting Algorithms"
order: 2
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["sorting", "comparison-sorts", "stability", "divide-and-conquer"]
---

## Comparison Sort Summary

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| Bubble Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Insertion Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Selection Sort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No |
| Merge Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(n)$ | Yes |
| Quick Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n^2)$ | $O(\log n)$ | No |
| Heap Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(1)$ | No |

**Lower bound for comparison sorts**: $\Omega(n \log n)$ -- proven via decision tree argument ($n!$ leaves $\Rightarrow$ height $\geq \log_2(n!) = \Theta(n \log n)$).

## Stability

A sort is **stable** if elements with equal keys retain their relative order.

| Stable | Unstable |
|--------|----------|
| Bubble, Insertion, Merge, Counting, Radix | Selection, Quick, Heap |

## Bubble Sort

Repeatedly swap adjacent elements if out of order.

```
for i = 0 to n-2:
    for j = 0 to n-2-i:
        if A[j] > A[j+1]:
            swap(A[j], A[j+1])
```

- **Optimisation**: Early exit if no swaps in a pass (best case $O(n)$).

## Insertion Sort

Build sorted portion left-to-right; insert each element into correct position.

```
for i = 1 to n-1:
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key:
        A[j+1] = A[j]
        j -= 1
    A[j+1] = key
```

- Best for **nearly sorted** data and **small** arrays.
- Often used as base case in hybrid sorts (e.g., Timsort).

## Selection Sort

Find minimum in unsorted portion, swap to front.

```
for i = 0 to n-2:
    min_idx = i
    for j = i+1 to n-1:
        if A[j] < A[min_idx]:
            min_idx = j
    swap(A[i], A[min_idx])
```

- Always $O(n^2)$ regardless of input.
- Minimises number of swaps ($O(n)$ swaps).

## Merge Sort

Divide array in half, recursively sort, merge two sorted halves.

```
mergeSort(A, lo, hi):
    if lo < hi:
        mid = (lo + hi) / 2
        mergeSort(A, lo, mid)
        mergeSort(A, mid+1, hi)
        merge(A, lo, mid, hi)
```

**Merge** operation: use two pointers, compare heads of both halves, copy smaller.

- Recurrence: $T(n) = 2T(n/2) + O(n) \Rightarrow O(n \log n)$
- Requires $O(n)$ auxiliary space.

## Quick Sort

Pick pivot, partition around it, recurse on partitions.

```
quickSort(A, lo, hi):
    if lo < hi:
        p = partition(A, lo, hi)
        quickSort(A, lo, p-1)
        quickSort(A, p+1, hi)
```

### Lomuto Partition

```
partition(A, lo, hi):
    pivot = A[hi]
    i = lo - 1
    for j = lo to hi-1:
        if A[j] <= pivot:
            i += 1
            swap(A[i], A[j])
    swap(A[i+1], A[hi])
    return i + 1
```

### Pivot Selection Strategies

| Strategy | Worst Case Trigger |
|----------|-------------------|
| First/Last element | Sorted/reverse-sorted input |
| Random element | Extremely unlikely worst case |
| Median-of-three | Avoids sorted input issue |

- **Worst case** $O(n^2)$: when pivot always smallest/largest.
- **Average case** $O(n \log n)$: expected with random pivot.
- In practice, fastest comparison sort due to cache efficiency.

## Heap Sort

Build max-heap, repeatedly extract max.

```
heapSort(A):
    buildMaxHeap(A)
    for i = n-1 downto 1:
        swap(A[0], A[i])
        heapify(A, 0, i)
```

- Always $O(n \log n)$, in-place, but not stable.
- See [Heaps](./05-heaps) for detailed heap operations.

## Non-Comparison Sorts

### Counting Sort

For integers in range $[0, k]$:

```
countingSort(A, k):
    C = array of size k+1, initialised to 0
    for each x in A:
        C[x] += 1
    for i = 1 to k:
        C[i] += C[i-1]    // cumulative count
    for j = n-1 downto 0:  // iterate backwards for stability
        B[C[A[j]] - 1] = A[j]
        C[A[j]] -= 1
    return B
```

| Property | Value |
|----------|-------|
| Time | $O(n + k)$ |
| Space | $O(n + k)$ |
| Stable? | Yes |
| Constraint | Keys must be integers in $[0, k]$ |

### Radix Sort

Sort digit-by-digit from least significant to most significant, using a stable sort (counting sort) as subroutine.

```
radixSort(A, d):
    for i = 1 to d:
        stableSort A on digit i
```

| Property | Value |
|----------|-------|
| Time | $O(d(n + k))$ where $d$ = digits, $k$ = base |
| Space | $O(n + k)$ |
| Stable? | Yes |
| Constraint | Fixed-length keys decomposable into digits |

## When to Use What

| Scenario | Best Choice | Reason |
|----------|-------------|--------|
| Small array ($n < 20$) | Insertion sort | Low overhead |
| General purpose | Merge sort / Quick sort | $O(n\log n)$ average |
| Memory constrained | Heap sort / Quick sort | $O(1)$ / $O(\log n)$ space |
| Nearly sorted | Insertion sort | $O(n)$ best case |
| Integer keys, small range | Counting sort | $O(n+k)$ |
| Fixed-width integers | Radix sort | $O(dn)$ |
| Stability required | Merge sort / Counting | Guaranteed stable |

<details>
<summary><strong>Practice: Trace Quick Sort</strong></summary>

**Array**: `[5, 3, 8, 4, 2, 7, 1, 6]`, pivot = last element

**Pass 1** (pivot = 6):
- Partition: `[5, 3, 4, 2, 1] 6 [8, 7]`

**Left subarray** `[5, 3, 4, 2, 1]`, pivot = 1:
- Partition: `[] 1 [5, 3, 4, 2]`

Continue recursively...

</details>

<details>
<summary><strong>Practice: Stability Example</strong></summary>

**Input**: Cards `5♠ 3♥ 5♥ 2♦`

Sort by value:

- **Stable** result: `2♦ 3♥ 5♠ 5♥` (original order of 5s preserved)
- **Unstable** result: `2♦ 3♥ 5♥ 5♠` (5s may swap)

Why it matters: When sorting by multiple keys (e.g., sort by suit then by value), stability preserves previous orderings.

</details>

<details>
<summary><strong>Practice: Prove $\Omega(n\log n)$ Lower Bound</strong></summary>

1. Any comparison sort can be modelled as a binary decision tree
2. For $n$ elements, there are $n!$ possible orderings (leaves)
3. A binary tree with $L$ leaves has height $\geq \log_2 L$
4. Therefore height $\geq \log_2(n!)$
5. By Stirling's approximation: $\log_2(n!) = \Theta(n \log n)$
6. Height = worst-case comparisons $\Rightarrow \Omega(n \log n)$

</details>
