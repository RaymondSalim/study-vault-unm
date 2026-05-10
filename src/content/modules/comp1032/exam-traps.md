---
title: "Exam Traps"
order: 91
moduleTitle: "COMP1032 - Fundamentals of AI"
tags: ["exam", "mistakes"]
---

## Common Mistakes by Topic

<details>
<summary>BFS is NOT always optimal</summary>

BFS is only optimal when **all step costs are equal** (or cost = depth). With non-uniform edge weights, BFS finds the shallowest goal, not the cheapest path. Use **Uniform-Cost Search** for non-uniform costs.

Example: A→B costs 1, A→C costs 10, B→D costs 100, C→D costs 1. BFS finds A→B→D (cost 101) before A→C→D (cost 11).
</details>

<details>
<summary>DFS completeness depends on the variant</summary>

- **Tree-search DFS**: NOT complete (infinite loops possible)
- **Graph-search DFS** (with visited set): Complete on **finite** state spaces
- DFS is **never optimal** regardless of variant

Many students incorrectly state DFS is always incomplete — specify whether you mean tree or graph search.
</details>

<details>
<summary>IDDFS overhead is NOT significant</summary>

Students often dismiss IDDFS because "it re-expands nodes." The overhead is only $O(b/(b-1))$ — about 11% for $b=10$. IDDFS is the **preferred uninformed search** when memory is limited and costs are uniform.
</details>

<details>
<summary>Admissibility vs Consistency: Know the difference</summary>

- **Admissible**: $h(n) \leq h^*(n)$ — never overestimates. Guarantees A* optimality in **tree search**.
- **Consistent**: $h(n) \leq c(n,a,n') + h(n')$ — triangle inequality. Guarantees A* optimality in **graph search**.
- Consistency implies admissibility, but **not** vice versa.

If the question says "graph search," you need consistency for optimality. If it says "tree search," admissibility suffices.
</details>

<details>
<summary>A* with inadmissible heuristic can still find solutions</summary>

An inadmissible heuristic does NOT cause A* to fail — it just may return a **suboptimal** solution. A* is still complete (it will find *a* path). The issue is the found path may not be the cheapest.
</details>

<details>
<summary>Alpha-beta pruning does NOT change the result</summary>

Alpha-beta pruning returns the **exact same** minimax value as unpruned minimax. It only skips subtrees that provably cannot affect the decision. Students sometimes think pruning gives an approximation — it does not.
</details>

<details>
<summary>Alpha-beta: α is for MAX, β is for MIN</summary>

- $\alpha$ = best (highest) value that MAX can guarantee so far
- $\beta$ = best (lowest) value that MIN can guarantee so far
- Prune when $\alpha \geq \beta$

Common error: swapping which player updates which bound.
</details>

<details>
<summary>CSP: MRV vs LCV — opposite philosophies</summary>

- **MRV** (variable ordering): Choose the **most constrained** variable (fail-first → detect dead ends early)
- **LCV** (value ordering): Choose the **least constraining** value (succeed-first → maximise future options)

Students confuse these — MRV is "fail-first" for variables, LCV is "succeed-first" for values.
</details>

<details>
<summary>FOL: ∀ goes with ⇒, ∃ goes with ∧</summary>

**WRONG**: $\forall x \; \text{Student}(x) \land \text{Smart}(x)$ — asserts everything is a smart student!

**CORRECT**: $\forall x \; \text{Student}(x) \Rightarrow \text{Smart}(x)$ — all students are smart.

**WRONG**: $\exists x \; \text{Student}(x) \Rightarrow \text{Smart}(x)$ — vacuously true (any non-student works).

**CORRECT**: $\exists x \; \text{Student}(x) \land \text{Smart}(x)$ — there exists a smart student.
</details>

<details>
<summary>Resolution: Must be in CNF first</summary>

Resolution only works on clauses in **Conjunctive Normal Form**. Steps before resolution:
1. Eliminate biconditionals ($\Leftrightarrow$)
2. Eliminate implications ($\Rightarrow$)
3. Move negation inward (De Morgan's)
4. Distribute $\lor$ over $\land$

Skipping any step leads to invalid resolution.
</details>

<details>
<summary>Entropy: log₂ not ln</summary>

In information gain calculations, use $\log_2$ (information measured in **bits**). Using natural log gives the wrong numerical answer. Also remember: $0 \log_2 0 = 0$ by convention.
</details>

<details>
<summary>k-NN: Normalise features first</summary>

k-NN uses distance, so features with larger scales dominate. A feature ranging [0, 1000] will overwhelm one ranging [0, 1]. Always **normalise/standardise** features before applying k-NN (or any distance-based method).
</details>

<details>
<summary>Neural networks: A single perceptron cannot learn XOR</summary>

XOR is not linearly separable — no single line can separate the positive and negative examples in 2D. You need at least **one hidden layer** (2+ hidden neurons) to learn XOR. This was the key insight that motivated multi-layer networks.
</details>

<details>
<summary>Minimax: Assuming opponent plays sub-optimally</summary>

Minimax assumes the opponent plays **optimally** (worst case for us). If you solve a minimax tree assuming the opponent makes mistakes, you'll get the wrong minimax value. The correct answer always assumes MIN picks the worst option for MAX.
</details>

<details>
<summary>UCS vs A*: Don't confuse when goal test happens</summary>

Both UCS and A* test for the goal **when a node is expanded** (removed from frontier), NOT when it is generated. A node may be in the frontier with a suboptimal path — we must wait until it is selected for expansion (lowest $g$ or $f$) to declare it optimal.
</details>
