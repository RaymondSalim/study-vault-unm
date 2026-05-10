---
title: "Flashcards"
order: 92
moduleTitle: "COMP1032 - Fundamentals of Artificial Intelligence"
tags: ["flashcards", "revision", "quick-review"]
---

# Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is an intelligent agent? | An entity that perceives its environment through sensors and acts upon it through actuators to maximise a performance measure. |
| 2 | What is the difference between BFS and DFS? | BFS explores level by level (uses a queue, complete, optimal for uniform cost); DFS explores depth-first (uses a stack, not complete in infinite spaces, not optimal). |
| 3 | What makes a heuristic admissible? | It never overestimates the true cost to reach the goal: $h(n) \leq h^*(n)$ for all nodes n. |
| 4 | What is the A* evaluation function? | $f(n) = g(n) + h(n)$ where g(n) is path cost so far and h(n) is heuristic estimate to goal. |
| 5 | What is a consistent (monotone) heuristic? | For every node n and successor n': $h(n) \leq c(n, n') + h(n')$ (triangle inequality). |
| 6 | What is a CSP? | A Constraint Satisfaction Problem defined by variables, domains, and constraints that restrict which value combinations are allowed. |
| 7 | What is arc consistency? | A variable X is arc-consistent with Y if for every value in the domain of X, there exists a valid value in the domain of Y satisfying the constraint. |
| 8 | What is the minimax value? | The optimal value for a player assuming both players play optimally; MAX maximises, MIN minimises. |
| 9 | What does alpha-beta pruning do? | Eliminates branches in the game tree that cannot affect the final minimax decision, reducing nodes evaluated. |
| 10 | What is a knowledge base in AI? | A set of sentences (in a formal language) representing known facts and rules about the world. |
| 11 | What is modus ponens? | If P is true and P implies Q, then Q is true: $P, P \rightarrow Q \vdash Q$. |
| 12 | What is forward chaining? | Data-driven inference: start with known facts and apply rules to derive new facts until the goal is reached. |
| 13 | What is backward chaining? | Goal-driven inference: start with the goal and work backwards to find supporting facts. |
| 14 | What is the difference between supervised and unsupervised learning? | Supervised: labelled training data with known outputs. Unsupervised: no labels, finds patterns/structure in data. |
| 15 | What is overfitting? | When a model learns noise in the training data and performs poorly on unseen data (low training error, high test error). |
| 16 | What is iterative deepening search? | Combines DFS space efficiency with BFS completeness by running depth-limited DFS with increasing depth limits. |
| 17 | What is the branching factor? | The average number of successors per node in a search tree. |
| 18 | What is uniform cost search? | Expands the node with the lowest path cost g(n); optimal for any non-negative step costs. |
| 19 | What is the MRV heuristic in CSPs? | Minimum Remaining Values -- choose the variable with the fewest legal values left in its domain. |
| 20 | What is a decision tree? | A tree-structured classifier where internal nodes test attributes, branches represent outcomes, and leaves assign class labels. |
| 21 | What is the time complexity of A*? | Exponential in the worst case: $O(b^d)$ where b is branching factor and d is solution depth, but good heuristics dramatically reduce this. |
| 22 | What is greedy best-first search? | Expands the node with the lowest h(n); fast but not optimal or complete. |
| 23 | What is a production system? | A set of condition-action rules (if-then rules) used for knowledge representation and reasoning. |
| 24 | What is the horizon effect in game playing? | When a search of limited depth fails to detect an inevitable event because it lies just beyond the search horizon. |
| 25 | What is k-nearest neighbours (KNN)? | A classification algorithm that assigns a label based on the majority class among the k closest training examples. |
