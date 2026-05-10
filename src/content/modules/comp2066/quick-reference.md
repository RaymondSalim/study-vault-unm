---
title: "Quick Reference"
order: 90
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["reference", "complexity", "big-o"]
---

## Data Structure Operations

| Data Structure | Search | Insert | Delete | Space |
|---------------|--------|--------|--------|-------|
| Array (unsorted) | $O(n)$ | $O(1)$* | $O(n)$ | $O(n)$ |
| Array (sorted) | $O(\log n)$ | $O(n)$ | $O(n)$ | $O(n)$ |
| Linked List | $O(n)$ | $O(1)$ | $O(1)$** | $O(n)$ |
| BST (balanced) | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(n)$ |
| BST (worst) | $O(n)$ | $O(n)$ | $O(n)$ | $O(n)$ |
| AVL Tree | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(n)$ |
| Hash Table (avg) | $O(1)$ | $O(1)$ | $O(1)$ | $O(n)$ |
| Hash Table (worst) | $O(n)$ | $O(n)$ | $O(n)$ | $O(n)$ |
| Max/Min Heap | $O(n)$*** | $O(\log n)$ | $O(\log n)$ | $O(n)$ |
| B-Tree | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(n)$ |

\* Append at end. ** Given pointer to node. *** Find-max/min is $O(1)$.

## Heap Operations

| Operation | Time |
|-----------|------|
| Find max/min | $O(1)$ |
| Extract max/min | $O(\log n)$ |
| Insert | $O(\log n)$ |
| Build heap | $O(n)$ |
| Heap sort | $O(n \log n)$ |

## Sorting Algorithms

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Insertion | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Selection | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No |
| Merge | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(n)$ | Yes |
| Quick | $O(n\log n)$ | $O(n\log n)$ | $O(n^2)$ | $O(\log n)$ | No |
| Heap | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(1)$ | No |
| Counting | $O(n+k)$ | $O(n+k)$ | $O(n+k)$ | $O(n+k)$ | Yes |
| Radix | $O(d(n+k))$ | $O(d(n+k))$ | $O(d(n+k))$ | $O(n+k)$ | Yes |

## Graph Algorithms

| Algorithm | Time | Space | Notes |
|-----------|------|-------|-------|
| BFS | $O(V+E)$ | $O(V)$ | Unweighted shortest path |
| DFS | $O(V+E)$ | $O(V)$ | Cycle detection, topo sort |
| Topological Sort | $O(V+E)$ | $O(V)$ | DAGs only |
| Dijkstra (bin. heap) | $O((V+E)\log V)$ | $O(V)$ | Non-negative weights |
| Dijkstra (array) | $O(V^2)$ | $O(V)$ | Better for dense graphs |
| Bellman-Ford | $O(VE)$ | $O(V)$ | Handles negative weights |
| Floyd-Warshall | $O(V^3)$ | $O(V^2)$ | All-pairs shortest path |
| Prim (bin. heap) | $O((V+E)\log V)$ | $O(V)$ | MST, dense: use array $O(V^2)$ |
| Kruskal | $O(E\log E)$ | $O(V)$ | MST, sparse graphs |

## Tree Traversals

| Traversal | Order | Time | Space |
|-----------|-------|------|-------|
| In-order | L, Root, R | $O(n)$ | $O(h)$ |
| Pre-order | Root, L, R | $O(n)$ | $O(h)$ |
| Post-order | L, R, Root | $O(n)$ | $O(h)$ |
| Level-order | BFS | $O(n)$ | $O(w)$ max width |

## Big-O Rules Cheat Sheet

| Rule | Example |
|------|---------|
| Drop constants | $O(3n) = O(n)$ |
| Drop lower terms | $O(n^2 + n) = O(n^2)$ |
| Nested loops multiply | Two nested $O(n)$ loops = $O(n^2)$ |
| Sequential add | $O(n) + O(m) = O(n + m)$ |
| Log base irrelevant | $O(\log_2 n) = O(\log_{10} n) = O(\log n)$ |
| $\log(n!) = \Theta(n\log n)$ | Comparison sort lower bound |

## Master Theorem Quick Reference

$$T(n) = aT(n/b) + O(n^d)$$

| Compare $d$ vs $\log_b a$ | Result |
|---------------------------|--------|
| $d < \log_b a$ | $O(n^{\log_b a})$ |
| $d = \log_b a$ | $O(n^d \log n)$ |
| $d > \log_b a$ | $O(n^d)$ |

## Common Recurrences

| Recurrence | Solution | Example |
|-----------|----------|---------|
| $T(n) = T(n/2) + O(1)$ | $O(\log n)$ | Binary search |
| $T(n) = 2T(n/2) + O(1)$ | $O(n)$ | Tree traversal |
| $T(n) = 2T(n/2) + O(n)$ | $O(n\log n)$ | Merge sort |
| $T(n) = T(n-1) + O(1)$ | $O(n)$ | Factorial |
| $T(n) = T(n-1) + O(n)$ | $O(n^2)$ | Selection sort |
| $T(n) = 2T(n-1) + O(1)$ | $O(2^n)$ | Fibonacci (naive) |

## AVL Rotation Quick Reference

| Balance Factor | Child BF | Rotation |
|---------------|----------|----------|
| +2 | +1 or 0 | Right (LL) |
| +2 | -1 | Left-Right (LR) |
| -2 | -1 or 0 | Left (RR) |
| -2 | +1 | Right-Left (RL) |

## Hash Table Load Factor Guidelines

| $\alpha$ Range | Performance |
|---------------|-------------|
| $< 0.5$ | Excellent (wastes space) |
| $0.5 - 0.75$ | Good balance |
| $> 0.75$ | Resize recommended |
| $> 1.0$ | Only with chaining |
