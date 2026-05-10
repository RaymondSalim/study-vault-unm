---
title: "Flashcards"
order: 92
moduleTitle: "COMP2066 - Algorithms Data Structures and Efficiency"
tags: ["flashcards", "revision", "quick-review"]
---

# Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is Big-O notation? | An upper bound on the growth rate of a function; describes worst-case time or space complexity as input size grows. |
| 2 | What is the time complexity of binary search? | O(log n) -- halves the search space at each step. |
| 3 | What is the worst-case complexity of quicksort? | O(n^2) -- occurs when the pivot is always the smallest or largest element (already sorted input with naive pivot). |
| 4 | What is the average/best-case complexity of quicksort? | O(n log n) -- with good pivot selection, partitions are roughly equal. |
| 5 | What is a BST and what is its search complexity? | A Binary Search Tree where left children are smaller and right children are larger. Search is O(h) where h is height; O(log n) if balanced, O(n) if degenerate. |
| 6 | What is an AVL tree? | A self-balancing BST where the height difference between left and right subtrees of every node is at most 1. |
| 7 | What rotations does an AVL tree use? | Left rotation, right rotation, left-right (double) rotation, and right-left (double) rotation. |
| 8 | What is a heap? | A complete binary tree satisfying the heap property: in a max-heap, every parent is >= its children; in a min-heap, every parent is <= its children. |
| 9 | What is the time complexity of heap insertion and extraction? | Both are O(log n) due to the sift-up and sift-down operations. |
| 10 | What is a hash table's average-case lookup complexity? | O(1) -- direct index access via hash function; degrades to O(n) with many collisions. |
| 11 | Name two collision resolution strategies for hash tables. | Chaining (linked lists at each bucket) and open addressing (linear probing, quadratic probing, double hashing). |
| 12 | What is the time complexity of merge sort? | O(n log n) in all cases (worst, average, best). Space: O(n) for the merge step. |
| 13 | What is a B-tree? | A self-balancing search tree designed for disk-based storage where each node can have many children, keeping the tree shallow to minimise disk accesses. |
| 14 | What is DFS and its time complexity on a graph? | Depth-First Search explores as far as possible along each branch before backtracking. O(V + E) with adjacency list. |
| 15 | What is BFS and when would you use it? | Breadth-First Search explores all neighbours at the current depth before going deeper. Use for shortest path in unweighted graphs. O(V + E). |
| 16 | What is Dijkstra's algorithm? | A greedy algorithm finding shortest paths from a source to all other vertices in a weighted graph with non-negative edge weights. O((V + E) log V) with a priority queue. |
| 17 | What is dynamic programming? | Solving complex problems by breaking them into overlapping subproblems, solving each once, and storing results (memoisation or tabulation). |
| 18 | Give an example of a greedy algorithm. | Kruskal's or Prim's for MST, Dijkstra's for shortest paths, Huffman coding for compression. |
| 19 | What is the difference between Omega, Theta, and Big-O? | O (Big-O): upper bound. Omega: lower bound. Theta: tight bound (both upper and lower). |
| 20 | What is an adjacency list vs adjacency matrix? | Adjacency list: array of linked lists (space O(V+E), good for sparse). Adjacency matrix: 2D array (space O(V^2), good for dense, O(1) edge lookup). |
| 21 | What is a stable sorting algorithm? | One that preserves the relative order of equal elements. Merge sort is stable; quicksort and heapsort are not (typically). |
| 22 | What is the Master Theorem used for? | Solving recurrence relations of the form T(n) = aT(n/b) + f(n) to determine time complexity of divide-and-conquer algorithms. |
| 23 | What is amortised analysis? | Analysing the average cost per operation over a sequence of operations, even if individual operations may be expensive (e.g., dynamic array resizing is O(1) amortised). |
| 24 | What is topological sort? | A linear ordering of vertices in a DAG such that for every directed edge (u,v), u appears before v. Used for dependency resolution. |
| 25 | What is the difference between Prim's and Kruskal's MST algorithms? | Prim's grows a single tree from a starting vertex (greedy on vertices); Kruskal's adds cheapest edges globally while avoiding cycles (greedy on edges). |
