---
title: "Glossary"
order: 95
moduleTitle: "COMP2039 - AI Methods"
tags: ["glossary", "definitions", "reference"]
---

## Key Terms

| Term | Definition |
|------|-----------|
| Aspiration criterion | Rule to override tabu status (e.g., if move leads to new best) |
| Building block | Short, high-fitness schema that GA recombines (Schema Theorem) |
| Choice function | Hyper-heuristic scoring that combines individual performance, pair performance, and recency |
| Chromosome | Encoded solution in evolutionary algorithm |
| Combinatorial optimisation | Optimisation over discrete/finite structures |
| Cooling schedule | Rule for decreasing temperature in SA (geometric: $T_{k+1} = \alpha T_k$) |
| Crossover | Operator combining genetic material from two parents |
| Crowding distance | NSGA-II metric measuring solution isolation on Pareto front |
| Deceptive landscape | Fitness gradient leads away from global optimum |
| Diversification | Strategy to explore unvisited regions (opposite of intensification) |
| Domain barrier | Separation between hyper-heuristic and problem-specific details |
| Dominance (Pareto) | Solution A dominates B if A is no worse in all objectives and strictly better in at least one |
| Elitism | Preserving best individual(s) across generations |
| Evaluation function | Maps solution to fitness/objective value: $f: S \rightarrow \mathbb{R}$ |
| Exploitation | Refining solutions in known good regions |
| Exploration | Searching new, unvisited regions of search space |
| Feasible solution | Solution satisfying all constraints |
| Fitness landscape | Mapping of all solutions to their fitness values; terrain metaphor |
| Fitness sharing | Reducing fitness of individuals in crowded regions to maintain diversity |
| Generation | One complete cycle of selection, crossover, mutation, replacement in EA |
| Generation hyper-heuristic | HH that creates new heuristics (e.g., via GP) |
| Genetic Programming (GP) | EA that evolves programs/trees rather than fixed-length strings |
| Global optimum | Best solution in entire search space |
| Great Deluge | Acceptance method using decreasing level/bound |
| Heuristic | Rule of thumb; no optimality guarantee but practical |
| Hill climbing | Iterative improvement; accept only better neighbours |
| Hyper-heuristic | Heuristic to choose/generate heuristics |
| Infeasible solution | Solution violating one or more constraints |
| Intensification | Strategy to focus search in promising regions |
| Iterated Local Search (ILS) | Repeated local search from perturbed solutions |
| LAHC | Late Acceptance Hill Climbing; compare to historical fitness |
| Local optimum | Best solution in neighbourhood; may not be globally best |
| Memetic algorithm | Hybrid: EA + local search |
| Metaheuristic | High-level strategy guiding lower-level heuristics |
| Move operator | Function generating a neighbour from current solution |
| Multi-objective | Optimising multiple conflicting objectives simultaneously |
| Mutation | Random perturbation of solution; maintains diversity |
| Neighbourhood $N(s)$ | Set of solutions reachable from $s$ by one move |
| NP-hard | No known polynomial-time algorithm; at least as hard as hardest NP problems |
| Objective function | Function to minimise/maximise; measures solution quality |
| Pareto front | Set of all non-dominated solutions in objective space |
| Pareto optimal | Not dominated by any feasible solution |
| Perturbation | Controlled disruption to escape local optimum (ILS) |
| Plateau | Region of search space with equal fitness values |
| Population | Set of candidate solutions in EA |
| Premature convergence | Population losing diversity too early; stuck at suboptimal solution |
| Representation | How solutions are encoded (binary, permutation, real, etc.) |
| Ruggedness | Degree of local optima density in landscape |
| Search space | Set of all possible solutions |
| Selection | Choosing parents for reproduction based on fitness |
| Selection hyper-heuristic | HH that chooses from existing set of heuristics |
| Simulated Annealing (SA) | Accept worsening with probability $e^{-\Delta/T}$; inspired by metallurgy |
| Steady-state GA | Replace 1-2 individuals per generation (vs generational) |
| Stochastic | Involving randomness |
| Tabu list | Memory structure storing recently made moves (forbidden) |
| Tabu search | Local search with memory to avoid cycling |
| Tabu tenure | Number of iterations a move remains forbidden |
| Temperature ($T$) | SA control parameter; high = more acceptance of worsening |
| Threshold accepting | Accept if worsening is within threshold $\theta$ |
| Tournament selection | Select best of $k$ random individuals |
| 2-opt | TSP neighbourhood: reverse a subsequence (remove 2 edges, reconnect) |

## Notation Reference

| Symbol | Meaning |
|--------|---------|
| $s$ | Current solution |
| $s'$ | Candidate/neighbour solution |
| $s^*$ | Best solution found |
| $f(s)$ | Objective/fitness value of $s$ |
| $N(s)$ | Neighbourhood of $s$ |
| $\Delta$ | Change in fitness: $f(s') - f(s)$ |
| $T$ | Temperature (SA) |
| $\alpha$ | Cooling rate (SA) |
| $P_c$ | Crossover probability |
| $P_m$ | Mutation probability |
| $N$ | Population size |
| $L$ | Chromosome length |
| $k$ | Tournament size |
| $L_{\text{fa}}$ | LAHC list length |
| $B$ | Level/bound (Great Deluge) |
| $\theta$ | Threshold (Threshold Accepting) |

## Acronyms

| Acronym | Full form |
|---------|-----------|
| SA | Simulated Annealing |
| TS | Tabu Search |
| ILS | Iterated Local Search |
| HC | Hill Climbing |
| GA | Genetic Algorithm |
| EA | Evolutionary Algorithm |
| ES | Evolution Strategy |
| DE | Differential Evolution |
| GP | Genetic Programming |
| PSO | Particle Swarm Optimisation |
| ACO | Ant Colony Optimisation |
| HH | Hyper-Heuristic |
| GDA | Great Deluge Algorithm |
| LAHC | Late Acceptance Hill Climbing |
| TA | Threshold Accepting |
| RR | Record-to-Record Travel |
| OX | Order Crossover |
| PMX | Partially Mapped Crossover |
| CX | Cycle Crossover |
| ERX | Edge Recombination Crossover |
| TSP | Travelling Salesman Problem |
| NSGA-II | Non-dominated Sorting Genetic Algorithm II |
| LLM | Large Language Model |
| KR | Knowledge Representation |
| UCB | Upper Confidence Bound |
