---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP2066 - Algorithms Data Structures and Efficiency"
tags: ["exam", "strategy", "revision", "tips"]
---

# Exam Strategy

## Time Allocation

| Section | Approx. Weight | Suggested Time (2hr exam) |
|---------|---------------|--------------------------|
| Complexity analysis | 20% | 24 min |
| Sorting algorithms | 15% | 18 min |
| Trees (BST, AVL, B-tree) | 25% | 30 min |
| Graphs (BFS, DFS, Dijkstra, MST) | 25% | 30 min |
| Heaps & hash tables | 15% | 18 min |

## Topic Weighting

1. **Trees** -- AVL rotations, BST operations, B-tree insertion are frequently tested with traces
2. **Graphs** -- Dijkstra's algorithm, DFS/BFS traversal, MST algorithms
3. **Complexity Analysis** -- Determine Big-O from code, compare algorithms, Master Theorem
4. **Sorting** -- Trace through quicksort/mergesort, compare properties (stability, in-place)
5. **Heaps & Hashing** -- Heap operations, hash table collision resolution

## Common Question Types

- **Trace an algorithm:** Step through AVL insertion with rotations, Dijkstra's on a graph, quicksort partition
- **Determine complexity:** Analyse nested loops, recursive functions, amortised analysis
- **Compare algorithms:** When to use which data structure or algorithm and why
- **Prove/justify:** Why is an algorithm correct? Why is a bound tight?
- **Design:** Solve a problem by selecting appropriate data structures and algorithms

## Key Formulas

| Formula | Description |
|---------|-------------|
| Master Theorem: T(n) = aT(n/b) + O(n^d) | Case 1: d < log_b(a) -> O(n^(log_b a)). Case 2: d = log_b(a) -> O(n^d log n). Case 3: d > log_b(a) -> O(n^d) |
| Binary search: T(n) = T(n/2) + O(1) = O(log n) | Halves problem each step |
| Merge sort: T(n) = 2T(n/2) + O(n) = O(n log n) | Divide in half, linear merge |
| Dijkstra with min-heap: O((V + E) log V) | Priority queue operations dominate |
| AVL height: h <= 1.44 log2(n+2) | Guarantees O(log n) operations |
| Hash table load factor: alpha = n/m | n items in m slots; resize when alpha exceeds threshold |

## Exam Approach Tips

1. **For traces** -- draw the data structure at each step; show before and after for rotations
2. **For complexity** -- identify the loop structure, count operations, express as recurrence if recursive
3. **For comparisons** -- use a table with criteria (time, space, stability, in-place, best/worst case)
4. **Show your reasoning** -- "This is O(n log n) because the outer loop runs n times and the inner halves each time"
5. **Watch for off-by-one** -- especially in heap indexing (0-based vs 1-based)

## Night Before Top 10 Checklist

1. Practice one AVL insertion with double rotation (left-right or right-left case)
2. Trace Dijkstra's algorithm on a small graph (6 nodes) -- show distance table updates
3. Know the complexity of all major sorting algorithms (best, average, worst, space, stability)
4. Apply the Master Theorem to 3 different recurrences
5. Trace heapify on an array and one extract-min operation
6. Know when to use BFS vs DFS vs Dijkstra vs Bellman-Ford
7. Understand B-tree insertion (splitting nodes when full)
8. Be able to analyse nested loops for Big-O (e.g., for i=1..n, for j=1..i)
9. Know Prim's vs Kruskal's: both find MST but differ in approach and complexity
10. Review hash table operations: insertion, deletion, search with chaining and open addressing
