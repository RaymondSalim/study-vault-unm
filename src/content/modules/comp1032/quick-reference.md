---
title: "Quick Reference"
order: 90
moduleTitle: "COMP1032 - Fundamentals of AI"
tags: ["reference", "search-algorithms", "complexity"]
---

## Search Algorithms Comparison

### Uninformed Search

| Algorithm | Frontier | Complete | Optimal | Time | Space |
|-----------|----------|----------|---------|------|-------|
| BFS | FIFO Queue | Yes | Yes* | $O(b^d)$ | $O(b^d)$ |
| DFS | LIFO Stack | No | No | $O(b^m)$ | $O(bm)$ |
| Depth-Limited | Stack (limit $l$) | No | No | $O(b^l)$ | $O(bl)$ |
| IDDFS | Stack (iterative) | Yes | Yes* | $O(b^d)$ | $O(bd)$ |
| UCS | Priority Queue ($g$) | Yes | Yes | $O(b^{1+\lfloor C^*/\varepsilon\rfloor})$ | $O(b^{1+\lfloor C^*/\varepsilon\rfloor})$ |
| Bidirectional | Two queues | Yes | Yes* | $O(b^{d/2})$ | $O(b^{d/2})$ |

*Optimal only with uniform step costs.

### Informed Search

| Algorithm | $f(n)$ | Complete | Optimal | Time | Space |
|-----------|--------|----------|---------|------|-------|
| Greedy Best-First | $h(n)$ | No | No | $O(b^m)$ | $O(b^m)$ |
| A* | $g(n) + h(n)$ | Yes | Yes** | $O(b^d)$ | $O(b^d)$ |
| IDA* | $g(n) + h(n)$ (cutoff) | Yes | Yes** | $O(b^d)$ | $O(bd)$ |

**With admissible heuristic (tree search) or consistent heuristic (graph search).

---

## Key Variables

| Symbol | Meaning |
|--------|---------|
| $b$ | Branching factor |
| $d$ | Depth of shallowest goal |
| $m$ | Maximum depth of search tree |
| $l$ | Depth limit |
| $C^*$ | Optimal solution cost |
| $\varepsilon$ | Minimum step cost |
| $g(n)$ | Path cost from start to $n$ |
| $h(n)$ | Heuristic estimate from $n$ to goal |
| $h^*(n)$ | True optimal cost from $n$ to goal |
| $f(n)$ | Evaluation function: $g(n) + h(n)$ |

---

## Heuristic Properties

| Property | Definition | Consequence |
|----------|-----------|-------------|
| **Admissible** | $h(n) \leq h^*(n)$ for all $n$ | A* is optimal (tree search) |
| **Consistent** | $h(n) \leq c(n,a,n') + h(n')$ | A* is optimal (graph search), $f$ non-decreasing |
| **Dominance** | $h_2(n) \geq h_1(n)$ for all $n$ | A* with $h_2$ expands $\leq$ nodes than with $h_1$ |

---

## CSP Strategies

| Strategy | Type | Rule |
|----------|------|------|
| MRV | Variable ordering | Fewest remaining values first |
| Degree | Variable ordering | Most constraints first |
| LCV | Value ordering | Least constraining value first |
| Forward Checking | Inference | Remove inconsistent values from neighbours |
| AC-3 | Inference | Full arc consistency propagation |

---

## Game Playing

| Concept | Formula/Rule |
|---------|-------------|
| Minimax value (MAX) | $\max_a \text{minimax}(\text{children})$ |
| Minimax value (MIN) | $\min_a \text{minimax}(\text{children})$ |
| Alpha-beta prune condition | $\alpha \geq \beta$ |
| Best-case alpha-beta | $O(b^{m/2})$ nodes (perfect ordering) |
| Worst-case alpha-beta | $O(b^m)$ nodes (no pruning) |

---

## Logic Quick Reference

### Propositional Logic Equivalences

| Rule | Equivalence |
|------|-------------|
| Implication | $P \Rightarrow Q \equiv \neg P \lor Q$ |
| Contrapositive | $P \Rightarrow Q \equiv \neg Q \Rightarrow \neg P$ |
| De Morgan | $\neg(P \land Q) \equiv \neg P \lor \neg Q$ |
| De Morgan | $\neg(P \lor Q) \equiv \neg P \land \neg Q$ |
| Distribution | $P \lor (Q \land R) \equiv (P \lor Q) \land (P \lor R)$ |

### FOL Quantifiers

| Rule | Equivalence |
|------|-------------|
| Negation of $\forall$ | $\neg \forall x \; P(x) \equiv \exists x \; \neg P(x)$ |
| Negation of $\exists$ | $\neg \exists x \; P(x) \equiv \forall x \; \neg P(x)$ |
| $\forall$ with implication | $\forall x \; P(x) \Rightarrow Q(x)$ |
| $\exists$ with conjunction | $\exists x \; P(x) \land Q(x)$ |

---

## Machine Learning

### Decision Tree: Information Gain

$$H(S) = -\sum_c p_c \log_2 p_c$$

$$\text{Gain}(S,A) = H(S) - \sum_v \frac{|S_v|}{|S|} H(S_v)$$

### Evaluation Metrics

| Metric | Formula |
|--------|---------|
| Accuracy | $(TP+TN)/(TP+TN+FP+FN)$ |
| Precision | $TP/(TP+FP)$ |
| Recall | $TP/(TP+FN)$ |
| F1 | $2PR/(P+R)$ |

### Neural Network Update Rule

$$w \leftarrow w - \eta \frac{\partial L}{\partial w}$$

---

## When to Use What

| Scenario | Algorithm |
|----------|-----------|
| Uniform costs, memory limited | IDDFS |
| Non-uniform costs, need optimal | UCS or A* |
| Good heuristic available | A* |
| Very large state space, good heuristic | IDA* |
| Structured variables with constraints | CSP + backtracking |
| Two-player zero-sum game | Minimax + alpha-beta |
| Classification with labelled data | Decision tree, k-NN, neural network |
| Grouping unlabelled data | k-Means |
