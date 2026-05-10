---
title: "Introduction & Search"
order: 1
moduleTitle: "COMP2039 - AI Methods"
tags: ["search", "optimisation", "complexity", "fundamentals"]
---

## What is AI?

Systems that exhibit intelligent behaviour — learning, reasoning, problem-solving, decision-making.

### AI Subfields

| Subfield | Focus |
|----------|-------|
| Machine Learning | Learning from data |
| Search/Optimisation | Finding best solutions |
| Knowledge Representation | Encoding domain knowledge |
| Planning | Sequencing actions |
| NLP | Processing language |

## Optimisation

Finding the best solution from a set of feasible solutions.

### Continuous vs Discrete

| Property | Continuous | Discrete (Combinatorial) |
|----------|-----------|--------------------------|
| Variables | Real-valued | Integer/binary |
| Search space | Smooth landscape | Discrete points |
| Methods | Gradient descent, Newton's | Heuristic search, exact methods |
| Example | Parameter tuning | TSP, scheduling |

### Minimisation vs Maximisation

$$\text{min } f(x) = \text{max } (-f(x))$$

Any minimisation problem can be converted to maximisation and vice versa.

## Computational Complexity

| Class | Description | Example |
|-------|-------------|---------|
| P | Solvable in polynomial time | Sorting, shortest path |
| NP | Verifiable in polynomial time | TSP, SAT |
| NP-hard | At least as hard as NP | Halting problem |
| NP-complete | NP-hard AND in NP | TSP decision, 3-SAT |

**Key insight**: No known polynomial-time algorithm exists for NP-hard problems. We use heuristics to find *good enough* solutions.

### P vs NP

$$P \subseteq NP$$

Open question: Does $P = NP$? (Almost certainly no.)

## Search Paradigms

| Paradigm | Mechanism | Example |
|----------|-----------|---------|
| Exhaustive/Exact | Explore all solutions | Branch and bound |
| Constructive | Build solution piece by piece | Greedy algorithms |
| Perturbative | Improve existing solution | Hill climbing |
| Population-based | Evolve set of solutions | Genetic algorithms |

### Exact vs Heuristic Methods

| Property | Exact | Heuristic |
|----------|-------|-----------|
| Guarantee | Optimal solution | No guarantee of optimality |
| Time | Exponential (worst case) | Polynomial (typically) |
| Scalability | Small instances | Large instances |
| Examples | Branch & bound, dynamic programming | SA, GA, tabu search |

## Search Space

The set of all possible solutions to a problem.

- **Solution**: A complete assignment of decision variables
- **Objective function** $f(s)$: Evaluates quality of solution $s$
- **Neighbourhood** $N(s)$: Set of solutions reachable from $s$ by a single move
- **Fitness landscape**: Mapping of all solutions to their objective values

### Landscape Features

| Feature | Description | Impact |
|---------|-------------|--------|
| Global optimum | Best solution overall | Target |
| Local optimum | Best in neighbourhood | Trap |
| Plateau | Region of equal fitness | Stagnation |
| Ridge | Narrow ascending path | Difficult traversal |

<details><summary>Practice: Why can't we just use exact methods for all problems?</summary>

Exact methods guarantee optimality but have exponential worst-case time complexity for NP-hard problems. For instance, TSP with $n$ cities has $(n-1)!/2$ possible tours. With $n=20$, that is over $10^{16}$ tours — infeasible to enumerate.

Heuristic methods sacrifice the optimality guarantee for practical runtime on large instances.

</details>

<details><summary>Practice: Classify these problems — P or NP-hard?</summary>

| Problem | Class | Reason |
|---------|-------|--------|
| Sorting an array | P | $O(n \log n)$ algorithms exist |
| Finding shortest path | P | Dijkstra's in $O(V^2)$ |
| Travelling Salesman (optimal) | NP-hard | No known poly-time algorithm |
| Graph colouring (k≥3) | NP-hard | Reducible from 3-SAT |
| Binary search | P | $O(\log n)$ |

</details>
