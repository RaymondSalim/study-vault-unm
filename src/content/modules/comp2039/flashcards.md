---
title: "Flashcards"
order: 92
moduleTitle: "COMP2039 - Artificial Intelligence Methods"
tags: ["flashcards", "revision", "quick-review"]
---

# Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is the difference between exploitation and exploration in search? | Exploitation focuses on improving the current best solution; exploration searches new regions of the solution space to avoid local optima. |
| 2 | What is hill climbing and its main weakness? | Hill climbing iteratively moves to a better neighbour; its main weakness is getting stuck in local optima. |
| 3 | Define a metaheuristic. | A high-level problem-independent algorithmic framework that provides strategies to guide search heuristics for optimisation problems. |
| 4 | What is simulated annealing? | A metaheuristic that accepts worse solutions with a probability that decreases over time (controlled by a temperature parameter), allowing escape from local optima. |
| 5 | Explain the difference between a genotype and phenotype in evolutionary algorithms. | Genotype is the encoded representation (e.g., binary string); phenotype is the decoded solution it represents in the problem domain. |
| 6 | What are the three main operators in a genetic algorithm? | Selection, crossover (recombination), and mutation. |
| 7 | What is tournament selection? | A selection method where k individuals are randomly chosen and the fittest among them is selected as a parent. |
| 8 | Describe one-point crossover. | A random crossover point is chosen; offspring inherit genes from one parent before the point and from the other parent after it. |
| 9 | What is the role of mutation in evolutionary algorithms? | Mutation introduces small random changes to maintain diversity in the population and prevent premature convergence. |
| 10 | What is a hyper-heuristic? | A method that selects or generates heuristics rather than directly solving the problem -- it searches the space of heuristics rather than the solution space. |
| 11 | What is the difference between selection hyper-heuristics and generation hyper-heuristics? | Selection hyper-heuristics choose from existing low-level heuristics; generation hyper-heuristics create new heuristics from components. |
| 12 | Define the neighbourhood of a solution. | The set of all solutions reachable from the current solution by applying a single move operator. |
| 13 | What is the fitness function? | A function that evaluates how good a solution is with respect to the optimisation objective. |
| 14 | Explain elitism in genetic algorithms. | Elitism guarantees the best individual(s) from the current generation survive unchanged into the next generation. |
| 15 | What is the No Free Lunch theorem? | No single optimisation algorithm performs best on all possible problems; any algorithm's superior performance on some problems is offset by inferior performance on others. |
| 16 | Describe tabu search. | A local search that maintains a tabu list of recently visited solutions or moves to prevent cycling and encourage exploration. |
| 17 | What is a knowledge-based system? | A system that uses a knowledge base (facts + rules) and an inference engine to reason and solve problems in a specific domain. |
| 18 | What is the difference between forward chaining and backward chaining? | Forward chaining starts from facts and applies rules to derive conclusions; backward chaining starts from a goal and works backwards to find supporting facts. |
| 19 | What is the acceptance criterion in simulated annealing? | Accept if new solution is better; if worse, accept with probability exp(-deltaE / T) where deltaE is the quality difference and T is temperature. |
| 20 | What is premature convergence? | When a population loses diversity too early, converging to a suboptimal solution before adequately exploring the search space. |
| 21 | Explain the difference between steady-state and generational replacement. | Generational replacement creates an entirely new population each generation; steady-state replaces only one or a few individuals per iteration. |
| 22 | What is the building block hypothesis? | Short, low-order, high-fitness schemata (building blocks) are combined by crossover to form increasingly fit solutions. |
| 23 | Define move acceptance in local search. | The criterion that decides whether to accept a candidate solution generated from the current solution (e.g., accept only improvements, or accept with some probability). |
| 24 | What is iterated local search? | A metaheuristic that applies perturbation to escape local optima, then re-applies local search from the perturbed solution. |
| 25 | What is multi-objective optimisation? | Optimisation with two or more conflicting objectives, seeking a set of Pareto-optimal trade-off solutions rather than a single optimum. |
