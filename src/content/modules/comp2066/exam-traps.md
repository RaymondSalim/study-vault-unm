---
title: "Exam Traps & Common Mistakes"
order: 91
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["exam-prep", "mistakes", "pitfalls"]
---

## Big-O Mistakes

| Mistake | Why It's Wrong | Correct |
|---------|---------------|---------|
| Saying $O(n)$ is "exactly $n$ operations" | Big-O is an upper bound, not exact count | $O(n)$ means $\leq cn$ for large $n$ |
| $O(n^2 + n) = O(n^2 + n)$ | Must simplify | $O(n^2)$ |
| "Best case of quick sort is $O(n\log n)$" | Best case should use $\Omega$ or $\Theta$ | Best case is $\Theta(n\log n)$ |
| Confusing $O$ with $\Theta$ | $O$ is upper bound only | $O(n^2)$ doesn't mean it takes $n^2$ |
| Saying "$2^n = O(n^{100})$" | Exponential always beats polynomial | $2^n$ grows faster than any polynomial |
| "Log base matters in Big-O" | $\log_a n = \log_b n / \log_b a$ = constant factor | All log bases are equivalent in Big-O |

## Sorting Mistakes

| Mistake | Correction |
|---------|-----------|
| "Quick sort is always $O(n\log n)$" | Worst case is $O(n^2)$ (e.g., sorted input with bad pivot) |
| "Selection sort is stable" | No -- swapping can change relative order of equal elements |
| "Merge sort is in-place" | Requires $O(n)$ auxiliary space |
| "Counting sort works on any data" | Only works on integers in a known range $[0, k]$ |
| Forgetting radix sort processes **least** significant digit first | Most significant first would require recursion/extra work |
| "Heap sort best case is $O(n)$" | Always $O(n\log n)$ (unlike insertion/bubble sort) |
| Confusing number of **swaps** vs **comparisons** | Selection sort: $O(n)$ swaps but $O(n^2)$ comparisons |

## BST Mistakes

| Mistake | Correction |
|---------|-----------|
| "BST search is always $O(\log n)$" | Only if balanced; worst case is $O(n)$ (degenerate/skewed tree) |
| Wrong delete for two-children case | Must use in-order **successor** (or predecessor), not arbitrary child |
| Confusing in-order successor with right child | Successor = leftmost node in right subtree (not just right child) |
| "Pre-order traversal gives sorted output" | Only **in-order** gives sorted output for BST |
| Building BST from sorted input | Creates degenerate tree (linked list) -- $O(n)$ height |

## AVL Mistakes

| Mistake | Correction |
|---------|-----------|
| Computing BF as $|h_L - h_R|$ | BF = $h_L - h_R$ (signed! can be negative) |
| Wrong rotation direction | LR means left-rotate child THEN right-rotate node (not the reverse) |
| "One rotation always fixes AVL" | For **delete**: may need rotations at every ancestor |
| Height of empty subtree is 0 | Convention: height of null = $-1$ (some texts use 0, be consistent) |
| Forgetting to update heights after rotation | Both rotated nodes need height recalculation |

## Heap Mistakes

| Mistake | Correction |
|---------|-----------|
| "Build-heap is $O(n\log n)$" | Tight bound is $O(n)$ (bottom-up heapify) |
| Confusing sift-up vs sift-down | Insert uses sift-up; heapify/extract uses sift-down |
| "Second largest is at index 1 or 2" | True for max-heap! But third largest could be anywhere below |
| "A sorted array is a valid min-heap" | True! But a max-heap is NOT a sorted array in reverse |
| Applying heap property to non-parent-child | Heap property only compares parent-child, not siblings |
| "Can search heap in $O(\log n)$" | Heap search is $O(n)$; no BST property |

## Hash Table Mistakes

| Mistake | Correction |
|---------|-----------|
| "Hash table search is always $O(1)$" | $O(1)$ average; $O(n)$ worst (all keys collide) |
| Using $m = 2^k$ with division method | Loses information (only uses low-order bits); use prime $m$ |
| Deleting in open addressing by clearing slot | Breaks probe chains; must use **tombstone** |
| "Linear probing has no clustering" | Linear probing suffers from **primary** clustering |
| Forgetting to rehash ALL elements when resizing | All elements need new positions since $m$ changes |
| Load factor > 1 with open addressing | Impossible! Must have $\alpha \leq 1$ (resize earlier) |

## B-Tree Mistakes

| Mistake | Correction |
|---------|-----------|
| "B-tree node has at most $t$ keys" | Max keys = $2t - 1$ (where $t$ = minimum degree) |
| Confusing order $m$ with degree $t$ | $m = 2t$; order = max children |
| Splitting pushes TWO keys up | Only the **median** key moves to parent |
| "B-tree grows at leaves" | B-tree grows at the **root** (splits propagate up) |
| Forgetting minimum occupancy on delete | Non-root nodes must have $\geq t-1$ keys; must borrow/merge |

## Graph Mistakes

| Mistake | Correction |
|---------|-----------|
| "BFS finds shortest path in weighted graphs" | Only for unweighted; use Dijkstra for weighted |
| Using Dijkstra with negative weights | Dijkstra fails with negative edges; use Bellman-Ford |
| "DFS finds shortest path" | DFS does NOT guarantee shortest path |
| Confusing directed vs undirected edges in complexity | Undirected edge counted twice in adjacency list |
| "Topological sort works on any graph" | Only on **DAGs** (directed acyclic graphs) |
| "Kruskal's always better than Prim's" | Prim's better for dense graphs; Kruskal's for sparse |
| Forgetting to check all vertices in DFS | Must restart DFS from unvisited vertices (disconnected graph) |
| "MST gives shortest path between vertices" | MST minimises total weight, NOT individual paths |

## General Exam Tips

| Tip | Details |
|-----|---------|
| State your assumptions | "Assuming 0-indexed array", "Using min degree $t$" |
| Show trace tables | Step-by-step for Dijkstra, BFS, insertions |
| Draw the tree/graph | Visual verification catches errors |
| Check edge cases | Empty input, single element, already sorted |
| Verify complexity | Count loops/recursion depth, apply master theorem |
| Read the question | "Worst case" vs "average case"; "time" vs "space" |
