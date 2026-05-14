---
title: "Sorting Algorithms"
order: 2
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["sorting", "comparison-sorts", "stability", "divide-and-conquer"]
---

## Comparison Sort Summary

:::eli10

Sorting means putting things in order (like arranging books by height). There are many different methods, and each has trade-offs — some are faster, some use less memory, and some keep equal items in their original order. The fastest general sorting methods take about $n \log n$ steps, and you mathematically cannot do better when comparing items one at a time.

:::

:::eli15

All comparison-based sorting algorithms compare pairs of elements to determine order. Key metrics for each:

- **Time complexity** (best/average/worst case)
- **Space complexity** (how much extra memory)
- **Stability** (whether equal elements keep their original order)

The theoretical lower bound for any comparison sort is $\Omega(n \log n)$, proven by a decision tree argument: since there are $n!$ possible orderings, the decision tree must have at least $\log_2(n!)$ height.

:::

:::eli20

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| Bubble Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Insertion Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Selection Sort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No |
| Merge Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(n)$ | Yes |
| Quick Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n^2)$ | $O(\log n)$ | No |
| Heap Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(1)$ | No |

**Lower bound for comparison sorts**: $\Omega(n \log n)$ -- proven via decision tree argument ($n!$ leaves $\Rightarrow$ height $\geq \log_2(n!) = \Theta(n \log n)$).

:::

## Stability

:::eli10

A "stable" sort keeps equal items in the same order they started in. Imagine sorting playing cards by number — a stable sort keeps the 5 of spades before the 5 of hearts if that was the original order.

:::

:::eli15

A sort is **stable** if elements with equal keys retain their relative input order in the output. This matters when sorting by multiple criteria — for instance, first sorting by name then by grade: stability ensures students with the same grade remain alphabetical.

:::

:::eli20

A sort is **stable** if elements with equal keys retain their relative order.

| Stable | Unstable |
|--------|----------|
| Bubble, Insertion, Merge, Counting, Radix | Selection, Quick, Heap |

:::

## Bubble Sort

:::eli10

Bubble Sort is like bubbles rising in water. You go through the list comparing neighbors and swapping them if they're in the wrong order. The biggest items "bubble up" to the end. It's simple but slow for big lists.

:::

:::eli15

Bubble Sort repeatedly passes through the array, swapping adjacent elements that are out of order. After each pass, the largest unsorted element is in its correct position.

- **Best case** $O(n)$: already sorted (with early-exit optimisation)
- **Worst case** $O(n^2)$: reverse sorted
- Stable and in-place, but rarely used in practice due to poor performance

:::

:::eli20

Repeatedly swap adjacent elements if out of order.

```
for i = 0 to n-2:
    for j = 0 to n-2-i:
        if A[j] > A[j+1]:
            swap(A[j], A[j+1])
```

- **Optimisation**: Early exit if no swaps in a pass (best case $O(n)$).

:::

## Insertion Sort

:::eli10

Insertion Sort is like sorting cards in your hand. You pick up one card at a time and slide it into the right spot among the cards you've already sorted. It's great when things are almost in order already.

:::

:::eli15

Insertion Sort builds a sorted section from left to right. For each new element, it shifts larger elements to the right until it finds the correct insertion point.

- **Best case** $O(n)$: input already sorted (just one comparison per element)
- **Worst case** $O(n^2)$: reverse sorted (every element must shift fully)
- Excellent for small arrays and nearly-sorted data; used as the base case in hybrid sorts like Timsort

:::

:::eli20

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

:::

## Selection Sort

:::eli10

Selection Sort works by finding the smallest item in the whole list and putting it first, then finding the smallest of what's left and putting it second, and so on. It's simple but always slow because it always checks everything.

:::

:::eli15

Selection Sort scans the unsorted portion for the minimum element and swaps it into the next sorted position.

- Always $O(n^2)$ regardless of input (no best-case improvement)
- Only $O(n)$ swaps total — useful if swaps are expensive
- Not stable (swapping can change relative order of equal elements)

:::

:::eli20

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

:::

## Merge Sort

:::eli10

Merge Sort is like splitting a deck of cards in half over and over until you have single cards, then combining them back together in order. Because you're always merging two already-sorted piles, it's fast and reliable — always $O(n \log n)$.

:::

:::eli15

Merge Sort is a divide-and-conquer algorithm:
1. **Divide**: Split the array in half
2. **Conquer**: Recursively sort each half
3. **Combine**: Merge the two sorted halves using a two-pointer technique

Key properties:
- Always $O(n \log n)$ — no bad inputs
- Stable (merging preserves order of equal elements)
- Requires $O(n)$ extra space for the merge step

:::

:::eli20

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

:::

## Quick Sort

:::eli10

Quick Sort picks one item (the "pivot") and puts everything smaller on the left and everything bigger on the right. Then it does the same thing to the left group and the right group. It's usually the fastest in practice, but if you pick bad pivots it can be slow.

:::

:::eli15

Quick Sort is a divide-and-conquer algorithm that:
1. Picks a **pivot** element
2. **Partitions** the array so elements less than pivot come before it and elements greater come after
3. Recursively sorts the two partitions

- **Average case** $O(n \log n)$: with a random or median-of-three pivot
- **Worst case** $O(n^2)$: when pivot is always the smallest or largest element
- In practice, the fastest comparison sort due to cache-friendly memory access and small constants
- Not stable (partitioning can reorder equal elements)

:::

:::eli20

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

:::

## Heap Sort

:::eli10

Heap Sort turns the array into a special structure called a "heap" (like a pyramid where the biggest value is always on top). Then it keeps taking the biggest item off the top and putting it at the end of the sorted portion. It's always $O(n \log n)$ and doesn't need extra memory.

:::

:::eli15

Heap Sort uses a max-heap data structure:
1. **Build** a max-heap from the array in $O(n)$ time
2. **Repeatedly extract** the maximum (root), place it at the end, and re-heapify

Key properties:
- Always $O(n \log n)$ — guaranteed, regardless of input
- In-place ($O(1)$ extra space)
- Not stable (heap operations can reorder equal elements)
- Slower in practice than Quick Sort due to poor cache locality

:::

:::eli20

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

:::

## Non-Comparison Sorts

:::eli10

Non-comparison sorts don't compare items directly. Instead, they use the digits or values of the items like sorting mail into numbered bins. Because they don't compare, they can beat the $n \log n$ limit — but they only work for specific types of data like integers.

:::

:::eli15

Non-comparison sorts bypass the $\Omega(n \log n)$ lower bound by not using pairwise comparisons. They exploit structure in the keys:

- **Counting Sort**: Counts occurrences of each key value. Works when keys are integers in a small range $[0, k]$. Time: $O(n + k)$.
- **Radix Sort**: Sorts digit-by-digit using a stable sort (usually counting sort) as a subroutine. Time: $O(d(n + k))$ where $d$ is the number of digits.

Both are stable and can be faster than comparison sorts when the key range is small relative to $n$.

:::

:::eli20

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

:::

## When to Use What

:::eli10

Different sorting methods are better for different situations — like how you'd organize a few books by hand (insertion sort) but use a different strategy for thousands of library books (merge sort). The best choice depends on how much data you have, whether it's nearly sorted already, and how much extra space you can use.

:::

:::eli15

Choosing the right sort depends on your constraints:

- **Small arrays** ($< 20$): Insertion sort (low overhead)
- **General purpose**: Merge sort (stable, guaranteed $O(n \log n)$) or Quick sort (fastest in practice)
- **Memory-constrained**: Heap sort ($O(1)$ space) or Quick sort ($O(\log n)$ space)
- **Nearly sorted data**: Insertion sort ($O(n)$ best case)
- **Integer keys in small range**: Counting sort ($O(n + k)$)
- **Stability required**: Merge sort or Counting sort

:::

:::eli20

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

:::
