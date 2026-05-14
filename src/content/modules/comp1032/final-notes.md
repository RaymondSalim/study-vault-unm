---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP1032 - Fundamentals of AI"
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

## SIDE 1: AGENTS, SEARCH & CSPs

### Intelligent Agents

**Agent:** Perceives environment (sensors) → acts on it (actuators). Agent function: $f: \mathcal{P}^* \rightarrow \mathcal{A}$

**PEAS:** Performance measure, Environment, Actuators, Sensors

**Environment properties:** Observable (full/partial), Deterministic/Stochastic, Episodic/Sequential, Static/Dynamic, Discrete/Continuous, Single/Multi-agent

**Agent types (increasing capability):** Simple reflex → Model-based → Goal-based → Utility-based → Learning

**Rationality:** Maximise expected performance given percept sequence, knowledge, and available actions. Rationality $\neq$ omniscience $\neq$ perfection.

---

### Search Problem Formulation

Components: Initial state, Actions, Transition model, Goal test, Path cost

**Uninformed Search Comparison:**

| Algorithm | Complete | Optimal | Time | Space |
|-----------|----------|---------|------|-------|
| BFS | Yes | Yes* | $O(b^d)$ | $O(b^d)$ |
| DFS | No | No | $O(b^m)$ | $O(bm)$ |
| Depth-Limited | No | No | $O(b^l)$ | $O(bl)$ |
| **IDDFS** | Yes | Yes* | $O(b^d)$ | $O(bd)$ |
| UCS | Yes | Yes | $O(b^{1+\lfloor C^*/\varepsilon\rfloor})$ | same |
| Bidirectional | Yes | Yes* | $O(b^{d/2})$ | $O(b^{d/2})$ |

*When all step costs are equal. $b$ = branching factor, $d$ = goal depth, $m$ = max depth.

**BFS:** FIFO queue. Optimal only for uniform costs. **DFS:** LIFO stack, low memory. **UCS:** Priority queue on $g(n)$. **IDDFS:** Best uninformed for large spaces (BFS optimality + DFS memory).

---

### Informed (Heuristic) Search

**Heuristic** $h(n)$: Estimated cost from $n$ to goal. $h(\text{goal}) = 0$.

**Greedy Best-First:** $f(n) = h(n)$ only. Fast but not complete/optimal.

**A\* Search:** $f(n) = g(n) + h(n)$ where $g(n)$ = cost so far, $h(n)$ = estimated remaining cost.

| Property | A* |
|----------|-----|
| Complete | Yes |
| Optimal | Yes (if $h$ admissible for tree search, consistent for graph search) |
| Time/Space | $O(b^d)$ worst case |
| Optimally efficient | No other optimal algorithm expands fewer nodes |

**Admissible:** $h(n) \leq h^*(n)$ for all $n$ (never overestimates)

**Consistent:** $h(n) \leq c(n, a, n') + h(n')$ (triangle inequality). Implies admissibility. Ensures $f$-values non-decreasing along any path.

**Dominance:** $h_2$ dominates $h_1$ if $h_2(n) \geq h_1(n)$ always (both admissible) → $h_2$ expands fewer nodes.

**Relaxed problems:** Remove constraints → optimal cost of relaxed problem is admissible heuristic.

**IDA\*:** Like IDDFS but uses $f$-cost cutoff instead of depth. Space $O(bd)$.

---

### Constraint Satisfaction Problems (CSPs)

**Components:** Variables $X$, Domains $D$, Constraints $C$. Solution: assignment satisfying all constraints.

**Constraint types:** Unary (1 var), Binary (2 vars), Global (many vars)

**Backtracking search:** DFS assigning one variable at a time; backtrack on constraint violation.

| Heuristic | Type | Strategy |
|-----------|------|----------|
| **MRV** | Variable ordering | Fewest legal values (fail-first) |
| **Degree** | Variable ordering | Most constraints on unassigned vars |
| **LCV** | Value ordering | Least constraining value (succeed-first) |

**Forward Checking:** After assigning $X_i = v$, remove inconsistent values from neighbours. Backtrack if any domain becomes empty.

**Arc Consistency (AC-3):** Arc $(X_i, X_j)$ is consistent if every value in $D_i$ has a compatible value in $D_j$. Queue-based: when domain shrinks, re-check affected arcs. Time: $O(ed^3)$.

**Min-Conflicts:** Start with complete (possibly invalid) assignment; iteratively reassign conflicted variables to minimise violations. Works well for large CSPs (e.g., $n$-queens).

---

## SIDE 2: GAMES, LOGIC & MACHINE LEARNING

### Adversarial Search (Games)

**Game formulation:** Players MAX/MIN, terminal states with utilities, alternating turns.

**Minimax:** MAX picks max of children, MIN picks min. Optimal against optimal opponent.

$$\text{minimax}(n) = \begin{cases} \text{Utility}(n) & \text{terminal} \\ \max_a \text{minimax}(\text{child}) & \text{MAX} \\ \min_a \text{minimax}(\text{child}) & \text{MIN} \end{cases}$$

Properties: Complete (finite tree), Optimal, Time $O(b^m)$, Space $O(bm)$

---

### Alpha-Beta Pruning

$\alpha$ = best value MAX can guarantee (starts $-\infty$). $\beta$ = best value MIN can guarantee (starts $+\infty$). **Prune when $\alpha \geq \beta$.**

- At MAX node: update $\alpha$; prune if $\alpha \geq \beta$ (beta cutoff)
- At MIN node: update $\beta$; prune if $\alpha \geq \beta$ (alpha cutoff)

**Result is identical to minimax** — pruning only skips branches that cannot affect decision.

| Move ordering | Nodes examined | Effective depth |
|--------------|---------------|-----------------|
| Worst (none) | $O(b^m)$ | $m$ |
| Perfect | $O(b^{m/2})$ | $2m$ (doubles searchable depth) |

**Evaluation functions:** $\text{Eval}(s) = \sum w_i f_i(s)$ — weighted features (material, mobility, etc.). Used with depth cutoff.

**Expectiminimax:** For stochastic games (dice) — adds chance nodes computing $\sum P(r) \cdot \text{value}(r)$. Alpha-beta cannot be applied.

---

### Propositional Logic

| Connective | Symbol | True when... |
|-----------|--------|--------------|
| NOT | $\neg P$ | P is false |
| AND | $P \land Q$ | Both true |
| OR | $P \lor Q$ | At least one true |
| IMPLIES | $P \Rightarrow Q$ | NOT (P true AND Q false) |
| IFF | $P \Leftrightarrow Q$ | Both same truth value |

**Key:** $P \Rightarrow Q \equiv \neg P \lor Q$. False ONLY when P=T, Q=F.

**Inference rules:** Modus Ponens ($P \Rightarrow Q, P \vdash Q$) | Modus Tollens ($P \Rightarrow Q, \neg Q \vdash \neg P$) | Resolution ($P \lor Q, \neg P \lor R \vdash Q \lor R$)

**Resolution refutation:** To prove KB $\models \alpha$: add $\neg\alpha$, convert all to CNF, apply resolution until empty clause $\bot$ derived.

**CNF conversion:** (1) Eliminate $\Leftrightarrow$, (2) Eliminate $\Rightarrow$ ($\neg P \lor Q$), (3) Push $\neg$ inward (De Morgan's), (4) Distribute $\lor$ over $\land$.

---

### First-Order Logic (FOL)

Extends propositional: constants, variables, predicates, functions, quantifiers.

| Quantifier | Syntax | Pairs with |
|-----------|--------|-----------|
| Universal | $\forall x\; P(x)$ | $\Rightarrow$ (implication) |
| Existential | $\exists x\; P(x)$ | $\land$ (conjunction) |

**Common mistake:** $\forall x\; \text{Cat}(x) \land \text{Black}(x)$ says EVERYTHING is a black cat. Correct: $\forall x\; \text{Cat}(x) \Rightarrow \text{Black}(x)$.

**Negation:** $\neg\forall x\; P(x) \equiv \exists x\; \neg P(x)$ | $\neg\exists x\; P(x) \equiv \forall x\; \neg P(x)$

**Unification:** Find substitution $\theta$ making expressions identical. Fails if variable must bind to two different values.

---

### Machine Learning

| Paradigm | Data | Goal |
|----------|------|------|
| Supervised | Labelled $(x_i, y_i)$ | Learn $f: X \to Y$ |
| Unsupervised | Unlabelled $x_i$ | Find structure |
| Reinforcement | States + rewards | Learn policy |

**Decision Trees:** Internal nodes = attribute tests, leaves = class labels. Choose split by **Information Gain**:

$$H(S) = -\sum_c p_c \log_2 p_c \quad\text{(entropy)}$$

$$\text{Gain}(S, A) = H(S) - \sum_v \frac{|S_v|}{|S|} H(S_v)$$

Entropy = 0 (pure), = 1 (binary 50/50), = $\log_2 k$ (uniform $k$ classes). Choose attribute with highest gain.

**Overfitting:** Tree memorises noise. Fix: pruning, min samples per leaf.

---

### k-Nearest Neighbours

Classify by majority vote of $k$ closest training points. Distance: Euclidean $\sqrt{\sum(x_i-y_i)^2}$, Manhattan $\sum|x_i-y_i|$.

Small $k$ → overfit (high variance). Large $k$ → underfit (high bias). Use odd $k$ for binary. No training time; prediction $O(nd)$.

---

### Neural Networks

**Perceptron:** $y = \sigma(\mathbf{w}^T\mathbf{x} + b)$. Can only learn linearly separable functions (AND, OR but NOT XOR).

**MLP:** Input → Hidden → Output. Hidden layers overcome linear separability limit.

**Backpropagation:** Forward pass → compute loss → backward pass (chain rule) → update: $w \leftarrow w - \eta \frac{\partial L}{\partial w}$

**Activations:** Sigmoid $\frac{1}{1+e^{-z}}$ (0,1) | ReLU $\max(0,z)$ | Tanh $(-1,1)$

---

### k-Means Clustering (Unsupervised)

1. Initialise $k$ centroids randomly
2. Assign each point to nearest centroid
3. Update centroids = mean of assigned points
4. Repeat until convergence

Converges but may find local optimum. Choose $k$ via elbow method.

---

### Evaluation Metrics

| Metric | Formula |
|--------|---------|
| Precision | $\frac{TP}{TP+FP}$ |
| Recall | $\frac{TP}{TP+FN}$ |
| F1 | $\frac{2PR}{P+R}$ |
| Accuracy | $\frac{TP+TN}{Total}$ |

**Bias-Variance:** Error = Bias$^2$ + Variance + Noise. High bias = underfit, high variance = overfit.

---

### Key Exam Traps

| Trap | Correction |
|------|-----------|
| BFS always optimal | Only with uniform step costs; use UCS otherwise |
| DFS always incomplete | Graph-search DFS is complete on finite spaces |
| A* needs admissibility for graph search | Needs **consistency** for graph search optimality |
| Inadmissible $h$ causes A* to fail | A* still finds a path, just possibly suboptimal |
| Alpha-beta gives approximate answer | Gives EXACT same value as minimax |
| MRV and LCV are the same | MRV = fail-first (variables), LCV = succeed-first (values) |
| $\forall$ with $\land$ | Use $\forall$ with $\Rightarrow$; use $\exists$ with $\land$ |
| $\forall x\;\exists y \equiv \exists y\;\forall x$ | Order matters for mixed quantifiers |
