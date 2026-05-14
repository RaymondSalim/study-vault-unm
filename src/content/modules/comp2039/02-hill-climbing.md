---
title: "Hill Climbing & Heuristic Search"
order: 2
moduleTitle: "COMP2039 - AI Methods"
tags: ["hill-climbing", "heuristic-search", "neighbourhood", "representation"]
---

## Components of Heuristic Search

:::eli10

Heuristic search needs five things: a way to write down solutions (representation), a way to score them (evaluation), a way to change a solution slightly to get a new one (neighbourhood/move operator), and a starting point (initial solution). For the Travelling Salesman Problem, a solution is an order of cities, the score is the total distance, and a "move" could be swapping two cities in the route.

:::

:::eli15

Every heuristic search method requires these components: a representation (how solutions are encoded — e.g., permutation for TSP), an evaluation/objective function (scoring solution quality — e.g., total tour length), a neighbourhood structure (which solutions are "adjacent" to the current one), a move operator (the mechanism for generating neighbours — e.g., 2-opt swap), and an initial solution (the starting point — often random). These choices fundamentally determine the search landscape and the algorithm's effectiveness.

:::

:::eli20

| Component | Description | Example (TSP) |
|-----------|-------------|---------------|
| Representation | How solutions are encoded | Permutation of cities |
| Evaluation function | Measures solution quality | Total tour distance |
| Neighbourhood | How to move between solutions | 2-opt swap |
| Move operator | Generates neighbour | Swap two edges |
| Initial solution | Starting point | Random permutation |

:::

## Solution Representation

:::eli10

You need a way to write down an answer that a computer understands. A binary string (like 101101) works for yes/no choices — "include this item or not" in a knapsack. A list of numbers in some order (like [3,1,4,2,5]) works for routing problems where order matters. The choice of representation determines how easy the problem is to search.

:::

:::eli15

The solution representation defines how candidate solutions are encoded as data structures. Binary strings suit problems with binary decisions (knapsack: include/exclude each item). Permutations suit ordering problems (TSP: city visit sequence). Integer vectors suit assignment problems (graph colouring: colour assigned to each node). Real-valued vectors suit continuous problems. The representation affects everything: search space size, which neighbours are accessible, what operators make sense, and the shape of the fitness landscape.

:::

:::eli20

| Representation | Suitable for | Example |
|----------------|-------------|---------|
| Binary string | Knapsack, feature selection | `101101` |
| Permutation | TSP, scheduling | `[3,1,4,2,5]` |
| Integer vector | Graph colouring | `[1,2,1,3,2]` |
| Real-valued vector | Continuous optimisation | `[0.3, 1.7, -0.5]` |

### Representation affects everything:

- Search space size
- Neighbourhood structure
- Operator design
- Landscape properties

:::

## Evaluation (Objective/Fitness) Function

:::eli10

The evaluation function is like a scoreboard — it tells you how good each answer is with a single number. For TSP, it's the total distance of the route. It needs to work for every possible answer, be fast to calculate (because you'll use it thousands of times), and give different scores to different-quality answers so you can tell them apart.

:::

:::eli15

The evaluation (objective/fitness) function maps each solution to a numerical quality score — it's the yardstick by which solutions are compared. Critical properties: it must be defined for all valid solutions (complete), fast to compute (since it's called thousands or millions of times during search), and discriminating (it should assign different values to solutions of different quality, providing a useful gradient for the search). If the function is too flat (many solutions score the same), the algorithm can't distinguish good moves from bad ones.

:::

:::eli20

Maps a solution to a numerical quality value:

$$f: S \rightarrow \mathbb{R}$$

| Property | Requirement |
|----------|-------------|
| Complete | Defined for all valid solutions |
| Fast | Must be computed efficiently (called many times) |
| Discriminating | Should differentiate between solutions |

:::

## Neighbourhood Structure

:::eli10

The neighbourhood of a solution is all the slightly different solutions you can reach by making one small change. For a binary string, flipping any single bit gives you a neighbour. For a route, swapping two cities gives you a neighbour. The neighbourhood determines which paths the search can take through the solution space — like which moves are allowed in a board game.

:::

:::eli15

The neighbourhood N(s) defines which solutions are considered "adjacent" to s — reachable by applying one move operator. Common operators include bit-flip (toggle one bit in a binary string), swap (exchange two positions in a permutation), insert (remove and reinsert an element), and 2-opt (reverse a subsequence in TSP). Neighbourhood size matters: larger neighbourhoods explore more per step but take longer to evaluate; smaller ones are faster but may miss good moves. The neighbourhood defines the landscape — changing it can turn local optima into non-optima.

:::

:::eli20

$N(s)$ = set of solutions reachable from $s$ by applying a single move operator.

### Common Move Operators

| Operator | Representation | Description |
|----------|---------------|-------------|
| Bit flip | Binary | Flip one bit |
| Swap | Permutation | Swap two positions |
| Insert | Permutation | Remove and reinsert element |
| 2-opt | Permutation (TSP) | Reverse a subsequence |
| Inversion | Permutation | Reverse segment |

### Example: 2-opt for TSP

```
Before: A - B - C - D - E - F
2-opt(B,E): A - B - E - D - C - F
            (reverse segment C-D-E)
```

### Neighbourhood Size

| Operator | Size |
|----------|------|
| Bit flip (n bits) | $n$ |
| Swap (n elements) | $\binom{n}{2} = \frac{n(n-1)}{2}$ |
| 2-opt (n cities) | $\frac{n(n-1)}{2}$ |
| Insert (n elements) | $n(n-1)$ |

:::

## Hill Climbing (HC)

:::eli10

Hill climbing is like being blindfolded on a hilly landscape and trying to reach the top. You take a step in some direction — if it goes uphill, you keep it. If it goes downhill, you stay put. You repeat until every direction goes downhill — then you're at a peak. But it might not be the tallest peak! You just know it's the highest point nearby.

:::

:::eli15

Hill climbing is the simplest iterative improvement algorithm. Starting from an initial solution, it repeatedly generates neighbours and moves to an improving one until no improvement is found (a local optimum). First improvement accepts the first improving neighbour found — faster per iteration. Best improvement (steepest ascent) evaluates the entire neighbourhood and picks the best — slower but more thorough. Random restart runs multiple independent hill climbs from different starting points to sample different local optima, returning the best found overall.

:::

:::eli20

### Simple Hill Climbing (First Improvement)

```
1. Generate initial solution s
2. Repeat:
   a. Generate neighbour s' ∈ N(s)
   b. If f(s') better than f(s):
      s ← s'
3. Until no improvement found
```

### Steepest Ascent Hill Climbing (Best Improvement)

```
1. Generate initial solution s
2. Repeat:
   a. Evaluate ALL neighbours in N(s)
   b. s' ← best neighbour
   c. If f(s') better than f(s):
      s ← s'
3. Until no improvement found
```

### Comparison

| Variant | Explores per iteration | Speed per iteration | Quality |
|---------|----------------------|---------------------|---------|
| First improvement | Until first improving | Fast | Variable |
| Best improvement | Entire neighbourhood | Slow | More consistent |
| Random restart | Reset when stuck | Medium | Better escape |

:::

## Problems with Hill Climbing

:::eli10

Hill climbing has three main problems: (1) getting stuck on a small hill that's not the tallest (local optima), (2) getting stuck on a flat area where no direction seems better (plateaux), and (3) following a narrow path where your allowed moves don't go uphill even though higher ground exists (ridges). These are why smarter algorithms were invented.

:::

:::eli15

Hill climbing's fundamental weakness is that it can only accept improving moves, so it inevitably gets trapped. Local optima are solutions better than all neighbours but not globally optimal — the algorithm stops here. Plateaux are regions where all neighbours have the same fitness — the algorithm has no gradient to follow. Ridges are narrow ascending paths that the neighbourhood structure can't align with — the algorithm can't make progress even though better solutions exist nearby. Solutions include random restarts (sample multiple local optima), simulated annealing (accept worse moves probabilistically), and changing the neighbourhood structure.

:::

:::eli20

| Problem | Description | Solution |
|---------|-------------|----------|
| Local optima | Stuck at non-global peak | Random restart, SA |
| Plateaux | Flat regions, no gradient | Sideways moves |
| Ridges | Narrow ascending paths | Different neighbourhood |

:::

## Hill Climbing Variants

:::eli10

Random restart hill climbing is like trying the blindfolded hilltop search from many different starting positions and keeping the best result. Stochastic hill climbing adds some randomness in choosing which improving neighbour to move to. Davis's Bit Hill Climbing is a systematic version for binary strings that tries flipping each bit in a random order.

:::

:::eli15

Several variants address standard hill climbing's weaknesses. Random restart runs HC multiple times from different random starting points, returning the overall best — this samples different basins of attraction and the probability of finding the global optimum increases with more restarts. Stochastic hill climbing selects a random improving neighbour rather than the first or best, adding diversity. Davis's Bit Hill Climbing (DBHC) is specialised for binary representations: it systematically tries flipping each bit in a random order, keeping improvements, and repeats until a full pass yields no improvement — more thorough than simple bit-flip HC.

:::

:::eli20

### Random Restart Hill Climbing

```
1. Repeat R times:
   a. Generate random initial solution s
   b. Apply hill climbing to s
   c. Record best solution found
2. Return overall best
```

### Stochastic Hill Climbing

Accept a random neighbour with probability proportional to improvement (not necessarily the best).

### Davis's Bit Hill Climbing (DBHC)

For binary representations:
1. Create random permutation of bit positions
2. Flip each bit in order; keep if improvement
3. Repeat with new permutation until no improvement in full pass

<details><summary>Practice: What is the neighbourhood size for a binary string of length 10?</summary>

For bit-flip neighbourhood: $N = 10$ (flip each of the 10 bits independently).

Total search space: $2^{10} = 1024$ solutions.

</details>

<details><summary>Practice: Hill climbing finds solution with f=85. Is this optimal?</summary>

We cannot know. Hill climbing only guarantees a **local** optimum — the best solution in the neighbourhood. The global optimum could be much better. HC provides no bound on solution quality.

To increase confidence: run random restarts and compare results.

</details>

<details><summary>Practice: First vs Best improvement — when to prefer each?</summary>

| Choose | When |
|--------|------|
| First improvement | Large neighbourhood, tight time budget |
| Best improvement | Small neighbourhood, quality matters more than speed |

First improvement is generally preferred in practice due to faster iterations, but best improvement gives more deterministic behaviour.

</details>

:::
