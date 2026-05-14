---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: ANALYSIS, SORTING & TREES

### Asymptotic Notation

| Notation | Meaning | Formal |
|----------|---------|--------|
| $O(g(n))$ | Upper bound | $f(n) \leq c \cdot g(n)$ for $n \geq n_0$ |
| $\Omega(g(n))$ | Lower bound | $f(n) \geq c \cdot g(n)$ for $n \geq n_0$ |
| $\Theta(g(n))$ | Tight bound | $c_1 g(n) \leq f(n) \leq c_2 g(n)$ |

**Growth ordering:** $1 < \log n < \sqrt{n} < n < n\log n < n^2 < n^3 < 2^n < n! < n^n$

**Rules:** Sum: $O(f+g) = O(\max(f,g))$ | Product: $O(f \cdot g)$ | Constant: $O(cf) = O(f)$

---

### Master Theorem

For $T(n) = aT(n/b) + O(n^d)$ where $a \geq 1, b > 1, d \geq 0$:

| Case | Condition | Result |
|------|-----------|--------|
| 1 | $d < \log_b a$ | $O(n^{\log_b a})$ — leaves dominate |
| 2 | $d = \log_b a$ | $O(n^d \log n)$ — evenly spread |
| 3 | $d > \log_b a$ | $O(n^d)$ — root dominates |

**Common recurrences:**

| Recurrence | Solution | Algorithm |
|-----------|----------|-----------|
| $T(n) = T(n/2) + O(1)$ | $O(\log n)$ | Binary search |
| $T(n) = 2T(n/2) + O(n)$ | $O(n \log n)$ | Merge sort |
| $T(n) = 2T(n/2) + O(1)$ | $O(n)$ | Tree traversal |
| $T(n) = T(n-1) + O(n)$ | $O(n^2)$ | Selection sort |
| $T(n) = 2T(n-1) + O(1)$ | $O(2^n)$ | Towers of Hanoi |

**Amortised analysis:** Dynamic array doubling — single insert may cost $O(n)$, amortised $O(1)$.

---

### Sorting Algorithms

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| Bubble Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Insertion Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Selection Sort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No |
| Merge Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(n)$ | Yes |
| Quick Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n^2)$ | $O(\log n)$ | No |
| Heap Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(1)$ | No |
| Counting Sort | $O(n+k)$ | $O(n+k)$ | $O(n+k)$ | $O(n+k)$ | Yes |
| Radix Sort | $O(d(n+k))$ | $O(d(n+k))$ | $O(d(n+k))$ | $O(n+k)$ | Yes |

**Lower bound for comparison sorts:** $\Omega(n \log n)$ — decision tree has $n!$ leaves, height $\geq \log_2(n!) = \Theta(n\log n)$

**Stability:** Equal elements retain original order. Stable: Bubble, Insertion, Merge, Counting, Radix. Unstable: Selection, Quick, Heap.

**Quick Sort:** Pivot selection matters — random or median-of-three avoids $O(n^2)$ on sorted input. Worst case when pivot is always min/max.

**When to use:** Small arrays → Insertion. General → Merge/Quick. Memory-constrained → Heap. Nearly sorted → Insertion. Integer keys → Counting/Radix.

---

### Binary Search Trees (BST)

**BST Property:** For every node $x$: left subtree keys $< x$ < right subtree keys

| Operation | Average | Worst (unbalanced) |
|-----------|---------|-------------------|
| Search/Insert/Delete | $O(\log n)$ | $O(n)$ |

**Delete (3 cases):** Leaf → remove. One child → replace with child. Two children → replace with in-order successor (leftmost in right subtree), then delete successor.

**Traversals:**

| Traversal | Order | Use |
|-----------|-------|-----|
| In-order | Left, Root, Right | Sorted output |
| Pre-order | Root, Left, Right | Copy/serialise |
| Post-order | Left, Right, Root | Delete/evaluate |
| Level-order | BFS by depth | Print by level (use queue) |

---

### AVL Trees

**AVL Property:** For every node, $|BF| = |h(left) - h(right)| \leq 1$

Guarantees height $h = O(\log n)$, so all operations $O(\log n)$ worst case.

**Balance Factor:** $BF = h(left) - h(right)$. Values $-1, 0, +1$ are valid. $\pm 2$ = violation.

**Rotation Decision Table:**

| Node BF | Child BF | Rotation | Case |
|---------|----------|----------|------|
| +2 | +1 or 0 | Right rotation | LL |
| +2 | -1 | Left-Right (double) | LR |
| -2 | -1 or 0 | Left rotation | RR |
| -2 | +1 | Right-Left (double) | RL |

**Memory trick:** Same direction = single rotation. Opposite directions = double rotation.

**Right Rotation (LL):** Node z(+2) with left child y(+1) → y becomes root, z becomes right child of y

**Left-Right (LR):** First left-rotate the left child, then right-rotate the node

**Insert:** BST insert → walk up updating heights → fix FIRST unbalanced node (at most 1 rotation)

**Delete:** BST delete → walk up → may need rotations at EVERY ancestor (up to $O(\log n)$ rotations)

**Height bound:** $h < 1.44 \log_2(n+2)$

---

### Heaps & Priority Queues

**Binary heap:** Complete binary tree with heap property. Max-heap: parent $\geq$ children. Min-heap: parent $\leq$ children.

**Array representation (0-indexed):** Parent = $\lfloor(i-1)/2\rfloor$, Left = $2i+1$, Right = $2i+2$

| Operation | Time |
|-----------|------|
| Find max/min | $O(1)$ |
| Extract max/min | $O(\log n)$ |
| Insert (sift-up) | $O(\log n)$ |
| Build heap (bottom-up) | $O(n)$ |
| Increase key | $O(\log n)$ |

**Build-heap is $O(n)$** (not $O(n\log n)$): most nodes near leaves need few swaps. Proof: $\sum h/2^{h+1} \cdot n = O(n)$

**Heap Sort:** Build max-heap $O(n)$ → repeatedly swap root with last, heapify $O(\log n)$ × $n$ = $O(n\log n)$ total. In-place, not stable.

**Priority Queue applications:** Job scheduling (max-heap), Dijkstra (min-heap), Huffman coding (min-heap), Median maintenance (max-heap + min-heap)

---

## SIDE 2: HASH TABLES, B-TREES & GRAPHS

### Hash Tables

$h(k)$ maps key to index in $[0, m-1]$. Average $O(1)$ lookup, worst $O(n)$.

**Load factor:** $\alpha = n/m$. Resize when $\alpha > 0.75$.

**Hash functions:** Division: $h(k) = k \mod m$ (use prime $m$). Multiplication: $h(k) = \lfloor m(kA \mod 1)\rfloor$. Strings: $h(s) = \sum s[i] \cdot r^{n-1-i} \mod m$

**Collision Resolution:**

| Strategy | Clustering | Cache | Delete |
|----------|-----------|-------|--------|
| Chaining (linked lists) | None | Poor | Easy |
| Linear probing: $h(k,i) = (h'(k)+i) \mod m$ | Primary | Excellent | Tombstone |
| Quadratic: $h(k,i) = (h'(k)+c_1i+c_2i^2) \mod m$ | Secondary | Good | Tombstone |
| Double hashing: $h(k,i) = (h_1(k)+i \cdot h_2(k)) \mod m$ | None | Poor | Tombstone |

**Expected probes (open addressing):** Unsuccessful: $\frac{1}{1-\alpha}$. Successful: $\frac{1}{\alpha}\ln\frac{1}{1-\alpha}$

| $\alpha$ | Unsuccessful | Successful |
|----------|-------------|-----------|
| 0.5 | 2.0 | 1.39 |
| 0.75 | 4.0 | 1.85 |
| 0.9 | 10.0 | 2.56 |

**Deletion in open addressing:** Cannot simply empty (breaks probe chains). Use tombstone or rehash.

**Why prime table size?** Ensures better distribution; avoids patterns when keys share common factors.

---

### B-Trees

Balanced multiway search tree for disk-based storage. Minimum degree $t$:

| Property | Constraint |
|----------|-----------|
| Root keys | $1$ to $2t-1$ |
| Non-root keys | $t-1$ to $2t-1$ |
| Children | $k+1$ for node with $k$ keys |
| All leaves | Same depth |

**Height:** $h \leq \log_t \frac{n+1}{2}$. With $t=1000$, $n=10^9$ → height $\leq 3$!

**Why B-Trees?** Minimise disk I/O. Node size = disk block. Higher branching = shorter tree = fewer reads.

| | BST/AVL | B-Tree |
|-|---------|--------|
| Branching | 2 | Up to $2t$ |
| Height | $O(\log_2 n)$ | $O(\log_t n)$ |
| Optimised for | RAM | Disk |

**Insert:** Split full nodes proactively on way down. Split: median goes up, left/right halves become two nodes of $t-1$ keys each. Tree only grows at root.

**Delete Cases:**
- Key in leaf: remove (if $\geq t$ keys remain)
- Key in internal: replace with predecessor/successor from child with $\geq t$ keys; or merge if both children have $t-1$
- Navigating down to child with $t-1$ keys: rotate from sibling (3a) or merge with sibling (3b)

**B+ Tree:** All data in leaves, internal nodes = signposts only, leaves linked. Range queries = find start + walk linked list. Used in databases (MySQL InnoDB), file systems (NTFS, ext4).

---

### Graphs

$G = (V, E)$. Directed/Undirected. Weighted/Unweighted. Max edges: undirected $\frac{|V|(|V|-1)}{2}$, directed $|V|(|V|-1)$.

**Representations:**

| | Adjacency Matrix | Adjacency List |
|-|-----------------|----------------|
| Space | $O(V^2)$ | $O(V+E)$ |
| Edge query | $O(1)$ | $O(\deg(v))$ |
| Best for | Dense | Sparse (most cases) |

---

### BFS (Breadth-First Search)

Uses **queue**. Explores level by level.

```
BFS: enqueue source → while queue not empty: dequeue u,
     for each unvisited neighbour v: mark, set dist=u.dist+1, enqueue
```

| Property | Value |
|----------|-------|
| Time | $O(V+E)$ |
| Finds | Shortest path (unweighted) |
| Uses | Queue |

---

### DFS (Depth-First Search)

Uses **stack/recursion**. Explores as deep as possible, then backtracks.

| Property | Value |
|----------|-------|
| Time | $O(V+E)$ |
| Produces | Discovery/finish times, DFS forest |
| Uses | Stack (recursion) |

**Edge types:** Tree (white→grey), Back (→grey, **indicates cycle**), Forward (→black, $u.d < v.d$), Cross (→black, $u.d > v.d$)

**Cycle detection:** Directed graph has cycle $\iff$ DFS finds back edge.

---

### Topological Sort (DAG only)

Linear ordering: for every edge $(u,v)$, $u$ before $v$.

**DFS-based:** Output vertices in reverse finish-time order.
**Kahn's (BFS):** Repeatedly remove vertices with in-degree 0. If result $\neq |V|$ → cycle exists.

Time: $O(V+E)$. Applications: task scheduling, build systems, course prerequisites.

---

### Dijkstra's Algorithm

Single-source shortest path with **non-negative** weights. Greedy.

```
Set source.dist=0, all others=INF. PQ by dist.
While PQ not empty: extract min u, for each neighbour v:
  if u.dist + w(u,v) < v.dist: relax (update v.dist, decreaseKey)
```

| Property | Value |
|----------|-------|
| Time (binary heap) | $O((V+E)\log V)$ |
| Time (array) | $O(V^2)$ |
| Requirement | All weights $\geq 0$ |

**Why non-negative?** Once extracted, vertex distance is final. Negative edges can invalidate this.

---

### Bellman-Ford

Handles **negative** weights. Detects negative cycles.

```
Relax ALL edges V-1 times. One more pass: if any distance decreases → negative cycle.
```

| Property | Value |
|----------|-------|
| Time | $O(VE)$ |
| Handles | Negative weights |
| Detects | Negative cycles |

---

### Shortest Path Summary

| Algorithm | Time | Neg. Weights | Use Case |
|-----------|------|-------------|----------|
| BFS | $O(V+E)$ | N/A (unweighted) | Unweighted shortest path |
| Dijkstra | $O((V+E)\log V)$ | No | Non-negative weights |
| Bellman-Ford | $O(VE)$ | Yes | Negative weights |
| Floyd-Warshall | $O(V^3)$ | Yes | All-pairs |
| DAG relaxation | $O(V+E)$ | Yes | DAGs only |

---

### Minimum Spanning Tree

Connects all vertices with minimum total weight. $V-1$ edges, no cycles.

**Cut property:** Lightest edge crossing any partition is in some MST.

| | Prim's | Kruskal's |
|-|--------|-----------|
| Approach | Grow from one vertex | Add cheapest global edge |
| Data structure | Priority queue | Union-Find |
| Time (heap) | $O((V+E)\log V)$ | $O(E\log V)$ |
| Best for | Dense graphs | Sparse graphs |

**Prim's:** Like Dijkstra but key = edge weight to tree (not total distance).
**Kruskal's:** Sort edges by weight, add if doesn't form cycle (check with Union-Find).

---

### Key Complexity Summary

| Structure/Algorithm | Search | Insert | Delete | Space |
|-------------------|--------|--------|--------|-------|
| Array (unsorted) | $O(n)$ | $O(1)$ | $O(n)$ | $O(n)$ |
| Array (sorted) | $O(\log n)$ | $O(n)$ | $O(n)$ | $O(n)$ |
| BST (balanced) | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(n)$ |
| Hash table | $O(1)$ avg | $O(1)$ avg | $O(1)$ avg | $O(n)$ |
| Heap | $O(n)$ | $O(\log n)$ | $O(\log n)$ | $O(n)$ |
| B-Tree | $O(\log_t n)$ | $O(\log_t n)$ | $O(\log_t n)$ | $O(n)$ |
