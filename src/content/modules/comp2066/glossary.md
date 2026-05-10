---
title: "Glossary"
order: 95
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["glossary", "definitions", "terminology"]
---

## Algorithm Analysis

| Term | Definition |
|------|-----------|
| Algorithm | A finite sequence of well-defined steps to solve a problem |
| Time complexity | Number of basic operations as a function of input size |
| Space complexity | Amount of memory used as a function of input size |
| Big-O $O(f)$ | Asymptotic upper bound on growth rate |
| Big-Omega $\Omega(f)$ | Asymptotic lower bound on growth rate |
| Big-Theta $\Theta(f)$ | Tight asymptotic bound (both upper and lower) |
| Amortised analysis | Average cost per operation over a sequence of operations |
| Recurrence relation | Equation defining $T(n)$ in terms of smaller inputs |
| Master theorem | Formula for solving divide-and-conquer recurrences |
| Worst case | Maximum number of operations for any input of size $n$ |
| Average case | Expected operations over all inputs of size $n$ |
| Best case | Minimum operations for the most favourable input |

## Sorting

| Term | Definition |
|------|-----------|
| Comparison sort | Sort that only uses pairwise comparisons between elements |
| Stable sort | Preserves relative order of elements with equal keys |
| In-place sort | Uses $O(1)$ extra memory (ignoring recursion stack) |
| Divide and conquer | Split problem into subproblems, solve, combine |
| Pivot | Element chosen to partition array in quick sort |
| Partition | Rearranging array so elements < pivot are left, > pivot are right |
| Merge | Combining two sorted sequences into one sorted sequence |
| Inversion | A pair $(i, j)$ where $i < j$ but $A[i] > A[j]$ |
| Adaptive sort | Performance improves when input is partially sorted |
| Decision tree | Binary tree modelling all possible comparison outcomes |

## Trees

| Term | Definition |
|------|-----------|
| Tree | Connected acyclic graph |
| Binary tree | Tree where each node has at most 2 children |
| BST property | Left subtree keys < node key < right subtree keys |
| Root | Topmost node (no parent) |
| Leaf | Node with no children |
| Internal node | Node with at least one child |
| Height | Length of longest path from node to a leaf |
| Depth | Length of path from root to node |
| Level | Set of all nodes at the same depth |
| Complete tree | All levels full except possibly last (filled left to right) |
| Full tree | Every node has 0 or 2 children |
| Perfect tree | All leaves at same depth, all internal nodes have 2 children |
| Degenerate tree | Every node has at most 1 child (behaves like linked list) |
| Traversal | Systematic way of visiting all nodes |
| In-order successor | Next node in in-order traversal sequence |
| In-order predecessor | Previous node in in-order traversal sequence |

## AVL Trees

| Term | Definition |
|------|-----------|
| AVL tree | Self-balancing BST where balance factor $\in \{-1, 0, 1\}$ |
| Balance factor | $h(\text{left subtree}) - h(\text{right subtree})$ |
| Rotation | Local restructuring operation to restore balance |
| Single rotation | One rotation (LL or RR case) |
| Double rotation | Two rotations (LR or RL case) |
| LL imbalance | Left-left: node and left child both left-heavy |
| RR imbalance | Right-right: node and right child both right-heavy |
| LR imbalance | Left-right: node left-heavy, left child right-heavy |
| RL imbalance | Right-left: node right-heavy, right child left-heavy |

## Heaps

| Term | Definition |
|------|-----------|
| Heap | Complete binary tree satisfying heap property |
| Max-heap | Parent key $\geq$ children keys |
| Min-heap | Parent key $\leq$ children keys |
| Heapify (sift-down) | Fix heap property by moving a node down |
| Sift-up | Fix heap property by moving a node up (used in insert) |
| Build-heap | Convert arbitrary array to heap in $O(n)$ |
| Extract | Remove and return root (max/min), then restore heap |
| Priority queue | ADT supporting insert, extract-max/min, peek |
| Decrease/increase key | Change priority of an element in the heap |

## Hash Tables

| Term | Definition |
|------|-----------|
| Hash function | Maps keys to indices in $[0, m-1]$ |
| Hash table | Array-based structure using hash function for indexing |
| Collision | Two different keys mapping to the same index |
| Chaining | Collision resolution using linked lists at each slot |
| Open addressing | Collision resolution by probing for empty slots |
| Linear probing | Probe sequence: $h(k)+1, h(k)+2, \ldots$ |
| Quadratic probing | Probe sequence: $h(k)+1^2, h(k)+2^2, \ldots$ |
| Double hashing | Probe step determined by second hash function |
| Load factor ($\alpha$) | $n/m$ -- ratio of stored elements to table size |
| Rehashing | Creating larger table and reinserting all elements |
| Tombstone | Marker for deleted slot in open addressing |
| Primary clustering | Long runs of occupied slots (linear probing problem) |
| Secondary clustering | Same probe sequence for keys with same hash |
| Universal hashing | Randomly chosen hash function from a family |
| Perfect hashing | Zero collisions for a known set of keys |

## B-Trees

| Term | Definition |
|------|-----------|
| B-tree | Balanced multiway search tree optimised for disk access |
| Minimum degree ($t$) | Min keys per non-root node = $t-1$; max = $2t-1$ |
| Order ($m$) | Maximum number of children per node ($m = 2t$) |
| Split | Dividing a full node into two, pushing median to parent |
| Merge | Combining two underflowing siblings with parent separator |
| Borrow (rotate) | Taking a key from sibling via parent |
| B+ tree | Variant where all data is in leaves; leaves are linked |
| Internal node | Stores keys as separators for child subtrees |
| Leaf node | Contains actual data (or pointers to data) |

## Graphs

| Term | Definition |
|------|-----------|
| Graph $G=(V,E)$ | Set of vertices $V$ and edges $E$ |
| Directed graph | Edges have direction $(u \to v)$ |
| Undirected graph | Edges have no direction $\{u, v\}$ |
| Weighted graph | Edges have associated numerical costs |
| Adjacent | Two vertices connected by an edge |
| Degree | Number of edges incident to a vertex |
| Path | Sequence of vertices connected by edges |
| Cycle | Path starting and ending at the same vertex |
| DAG | Directed Acyclic Graph (no directed cycles) |
| Connected graph | Path exists between every pair of vertices |
| Strongly connected | Directed path between every pair (digraphs) |
| Spanning tree | Subgraph that is a tree including all vertices |
| MST | Minimum Spanning Tree -- spanning tree of minimum total weight |
| BFS | Breadth-First Search -- explores level by level using queue |
| DFS | Depth-First Search -- explores deeply using stack/recursion |
| Topological sort | Linear ordering respecting all directed edges in a DAG |
| Relaxation | Updating shortest distance estimate: if $d[u]+w < d[v]$, update $d[v]$ |
| Shortest path | Path with minimum total edge weight between two vertices |
| Negative cycle | Cycle whose total weight is negative (no finite shortest path) |
| Cut | Partition of vertices into two disjoint sets |
| Cut property | Lightest edge crossing any cut belongs to some MST |
| Union-Find | Data structure for tracking disjoint sets (used in Kruskal's) |
