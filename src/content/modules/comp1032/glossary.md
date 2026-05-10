---
title: "Glossary"
order: 95
moduleTitle: "COMP1032 - Fundamentals of AI"
tags: ["glossary", "definitions"]
---

| Term | Definition |
|------|-----------|
| A* search | Informed search using $f(n) = g(n) + h(n)$; optimal with admissible/consistent heuristic |
| Activation function | Non-linear function applied to neuron output (sigmoid, ReLU, tanh) |
| Admissible heuristic | Heuristic that never overestimates true cost to goal: $h(n) \leq h^*(n)$ |
| Agent | Entity that perceives its environment through sensors and acts through actuators |
| Alpha-beta pruning | Optimisation of minimax that prunes branches that cannot affect the result |
| Arc consistency | Constraint $C_{ij}$ is arc-consistent if for every value of $X_i$, there exists a consistent value of $X_j$ |
| Backpropagation | Algorithm for computing gradients in neural networks using the chain rule |
| Backtracking search | DFS for CSPs that assigns one variable at a time and undoes on failure |
| Bias (ML) | Error from overly simple model assumptions; causes underfitting |
| Bidirectional search | Simultaneous search from start and goal; meets in the middle |
| Branching factor | Maximum number of successors of any node ($b$) |
| BFS | Breadth-First Search; expands shallowest nodes first (FIFO queue) |
| CNF | Conjunctive Normal Form; conjunction of disjunctions of literals |
| Complete (search) | Guaranteed to find a solution if one exists |
| Consistency (heuristic) | $h(n) \leq c(n,a,n') + h(n')$ for all nodes; implies admissibility |
| Constraint graph | Graph where nodes are variables and edges represent constraints |
| Cross-validation | Evaluation technique splitting data into $k$ folds for train/test rotation |
| CSP | Constraint Satisfaction Problem; defined by variables, domains, and constraints |
| Decision tree | Tree model where internal nodes test attributes and leaves give classifications |
| Depth-limited search | DFS with a maximum depth limit $l$ |
| DFS | Depth-First Search; expands deepest nodes first (LIFO stack) |
| Dominance (heuristic) | $h_2$ dominates $h_1$ if $h_2(n) \geq h_1(n)$ for all $n$ (both admissible) |
| Entailment | $\text{KB} \models \alpha$: $\alpha$ is true in every model where KB is true |
| Entropy | Measure of impurity/uncertainty: $H = -\sum p \log_2 p$ |
| Evaluation function | Heuristic estimate of position quality in game trees |
| Existential quantifier | $\exists x$: "there exists an $x$ such that..." |
| Expectiminimax | Extension of minimax for stochastic games with chance nodes |
| First-order logic | Logic with objects, predicates, functions, and quantifiers |
| Forward checking | After assignment, remove inconsistent values from neighbours' domains |
| Frontier (fringe) | Set of nodes available for expansion in search |
| Goal-based agent | Agent that considers future states to select actions achieving goals |
| Greedy best-first search | Informed search using $f(n) = h(n)$; not complete, not optimal |
| Heuristic | Estimated cost from current state to goal; guides informed search |
| IDA* | Iterative Deepening A*; uses $f$-cost cutoff instead of depth limit |
| IDDFS | Iterative Deepening DFS; runs DLS with increasing depth limits |
| Inference | Deriving new sentences from a knowledge base |
| Information gain | Reduction in entropy from splitting on an attribute |
| k-Means | Unsupervised clustering: assign points to nearest centroid, update centroids |
| k-NN | k-Nearest Neighbours; classifies by majority vote of $k$ closest training points |
| Knowledge base | Set of sentences in a formal language representing known facts |
| LCV | Least Constraining Value; choose value ruling out fewest options for neighbours |
| Learning rate ($\eta$) | Step size for gradient descent weight updates |
| Modus ponens | Inference rule: from $P \Rightarrow Q$ and $P$, derive $Q$ |
| Minimax | Algorithm for optimal play in two-player zero-sum games |
| Model-based agent | Agent maintaining internal state to track unobserved world aspects |
| MRV | Minimum Remaining Values; choose variable with fewest legal values (fail-first) |
| Neural network | Layered architecture of artificial neurons learning via backpropagation |
| Optimal (search) | Guaranteed to find the least-cost solution |
| Overfitting | Model memorises training data; poor generalisation to new data |
| Path cost | Cumulative cost of actions from start state to current node |
| PEAS | Performance, Environment, Actuators, Sensors — task environment specification |
| Perceptron | Single artificial neuron; can only learn linearly separable functions |
| Precision | $TP/(TP+FP)$; fraction of positive predictions that are correct |
| Propositional logic | Logic with atomic propositions and connectives ($\neg, \land, \lor, \Rightarrow, \Leftrightarrow$) |
| Rational agent | Agent that acts to maximise expected performance given available information |
| Recall | $TP/(TP+FN)$; fraction of actual positives correctly identified |
| Resolution | Inference rule for CNF: from $P \lor Q$ and $\neg P \lor R$, derive $Q \lor R$ |
| Search tree | Tree of states generated by expanding nodes from initial state |
| Skolem constant | New constant introduced when eliminating existential quantifiers |
| State space | Set of all states reachable from initial state via any action sequence |
| Supervised learning | Learning from labelled examples $(x_i, y_i)$ to predict $y$ from $x$ |
| Transition model | Function defining result of performing action in a state |
| Turing test | Test of machine intelligence: can a human distinguish it from another human? |
| Underfitting | Model too simple to capture underlying patterns; high training error |
| Unification | Finding substitution that makes two logical expressions identical |
| Uniform-cost search | Search expanding lowest path-cost node first; optimal for any step costs |
| Universal quantifier | $\forall x$: "for all $x$..." |
| Unsupervised learning | Learning structure from unlabelled data (clustering, dimensionality reduction) |
| Utility function | Function mapping states to numeric value representing agent's preferences |
| Variance (ML) | Error from sensitivity to training set fluctuations; causes overfitting |
