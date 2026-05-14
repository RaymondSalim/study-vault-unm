---
title: "Introduction & Search"
order: 1
moduleTitle: "COMP2039 - AI Methods"
tags: ["search", "optimisation", "complexity", "fundamentals"]
---

## What is AI?

:::eli10

Artificial Intelligence is about making computers that can do "smart" things — like learning from examples, making decisions, solving puzzles, and understanding language. Think of it as teaching a computer to think and solve problems the way people do, but often much faster.

:::

:::eli15

Artificial Intelligence encompasses systems that exhibit intelligent behaviour, including learning from data, reasoning about knowledge, solving complex problems, and making decisions. Key subfields include machine learning (pattern recognition from data), search and optimisation (finding optimal solutions efficiently), knowledge representation (encoding domain information for reasoning), planning (determining action sequences), and natural language processing (understanding and generating human language).

:::

:::eli20

Systems that exhibit intelligent behaviour — learning, reasoning, problem-solving, decision-making.

### AI Subfields

| Subfield | Focus |
|----------|-------|
| Machine Learning | Learning from data |
| Search/Optimisation | Finding best solutions |
| Knowledge Representation | Encoding domain knowledge |
| Planning | Sequencing actions |
| NLP | Processing language |

:::

## Optimisation

:::eli10

Optimisation is like finding the best possible answer to a puzzle. Imagine you're trying to find the shortest route to deliver packages to 10 houses — there are millions of possible routes, and you want the best one. Optimisation is the science of finding that "best" without checking every single possibility.

:::

:::eli15

Optimisation is the process of finding the best solution from a set of feasible solutions, measured by an objective function. Problems can be continuous (real-valued variables, smooth landscapes — solved with gradient methods) or discrete/combinatorial (integer variables, discrete search spaces — like TSP or scheduling, often solved with heuristics). Any minimisation problem can be flipped to maximisation by negating the objective function. Combinatorial problems tend to be much harder because the search space is non-smooth and often astronomically large.

:::

:::eli20

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

:::

## Computational Complexity

:::eli10

Some problems are easy for computers (like sorting a list), and some are incredibly hard (like finding the shortest route through 100 cities). Computational complexity classifies how hard problems are. For the really hard ones (NP-hard), there's no known way to guarantee finding the perfect answer quickly, so we settle for "good enough" answers found with clever shortcuts called heuristics.

:::

:::eli15

Computational complexity classifies problems by how their solution time scales with input size. P problems have polynomial-time algorithms (efficient). NP problems have solutions that can be verified quickly but may take exponential time to find. NP-hard problems are at least as hard as any NP problem — no known polynomial algorithm exists for them. NP-complete problems are both NP-hard and in NP. The practical implication: for NP-hard problems (like TSP), we cannot guarantee finding optimal solutions in reasonable time, so we use heuristic methods that find good (but not provably optimal) solutions quickly.

:::

:::eli20

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

:::

## Search Paradigms

:::eli10

There are different strategies for searching for the best answer. Exhaustive search checks everything (guaranteed best but super slow). Constructive search builds a solution step by step. Perturbative search starts with a complete answer and keeps tweaking it. Population-based search evolves a whole group of answers at once, combining the best features of different solutions.

:::

:::eli15

Search paradigms differ in how they explore the solution space. Exhaustive/exact methods (branch and bound) explore all possibilities — guaranteed optimal but exponentially slow. Constructive methods (greedy algorithms) build solutions incrementally — fast but often suboptimal. Perturbative methods (hill climbing) start with a complete solution and iteratively improve it. Population-based methods (genetic algorithms) maintain and evolve a set of solutions simultaneously, combining good features. Heuristic methods trade the guarantee of optimality for practical scalability to large problem instances.

:::

:::eli20

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

:::

## Search Space

:::eli10

The search space is all possible answers to a problem. Imagine a huge landscape of hills and valleys — each point is a possible solution, and its height is how good it is. You're trying to find the highest peak (or lowest valley). Local optima are smaller hills that seem like the top until you see a taller one nearby. The challenge is exploring this landscape efficiently.

:::

:::eli15

The search space is the set of all possible solutions. Each solution is evaluated by an objective function (f) that assigns a quality value. The neighbourhood N(s) defines which solutions are reachable from s by a single move — this determines the structure of the fitness landscape. Key landscape features include: the global optimum (the overall best), local optima (best within their neighbourhood but not globally — these trap hill climbers), plateaux (flat regions where the objective gives no guidance), and ridges (narrow paths to good solutions that are hard to follow).

:::

:::eli20

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

:::
