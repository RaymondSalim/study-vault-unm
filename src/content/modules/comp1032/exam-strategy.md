---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP1032 - Fundamentals of Artificial Intelligence"
tags: ["exam-strategy", "revision", "time-management"]
---

# Exam Strategy

## Time Allocation

| Section | Suggested Time | Notes |
|---------|---------------|-------|
| Search algorithms (uninformed + informed) | 30% | Tracing BFS/DFS/A* is common -- practise on paper |
| Constraint satisfaction | 15% | Arc consistency, backtracking with heuristics |
| Game playing | 15% | Minimax trees, alpha-beta pruning |
| Knowledge representation & logic | 20% | Propositional/predicate logic, inference |
| Machine learning basics | 20% | Concepts, decision trees, evaluation |

## Topic Weighting

- **High weight:** Search algorithms (BFS, DFS, A*, IDS), minimax with alpha-beta
- **Medium weight:** CSPs (arc consistency, backtracking), knowledge representation, decision trees
- **Lower weight:** Introductory agent concepts, advanced ML topics

## Question Types to Expect

1. **Search tracing** -- apply BFS/DFS/A* to a given graph, showing the frontier at each step
2. **Heuristic evaluation** -- determine if a heuristic is admissible/consistent, compute f(n) values
3. **Game tree analysis** -- apply minimax, identify alpha-beta prune points
4. **CSP solving** -- apply arc consistency (AC-3), show domain reductions
5. **Logic proofs** -- apply resolution, forward/backward chaining
6. **ML concepts** -- explain overfitting, compare algorithms, interpret decision trees

## Key Formulas & Definitions to Memorise

- A* evaluation: $f(n) = g(n) + h(n)$
- Admissibility: $h(n) \leq h^*(n)$ for all n
- Consistency: $h(n) \leq c(n, n') + h(n')$
- Minimax: $\text{minimax}(n) = \max/\min$ of children's minimax values
- BFS complexity: Time $O(b^d)$, Space $O(b^d)$
- DFS complexity: Time $O(b^m)$, Space $O(bm)$
- IDS complexity: Time $O(b^d)$, Space $O(bd)$
- Information gain: $IG = H(parent) - \sum \frac{|child|}{|parent|} H(child)$

## Night Before Checklist -- Top 10 Things to Review

1. A* algorithm: how f(n) = g(n) + h(n) works, when it is optimal
2. BFS vs DFS vs IDS: completeness, optimality, time/space complexity table
3. Admissible vs consistent heuristics and why they matter
4. Minimax algorithm with alpha-beta pruning (practise on a small tree)
5. Arc consistency (AC-3): how domains get reduced
6. MRV and LCV heuristics for CSP variable/value ordering
7. Propositional logic: modus ponens, resolution, CNF
8. Forward chaining vs backward chaining
9. Decision tree construction using information gain
10. Overfitting, training vs test error, cross-validation concept
