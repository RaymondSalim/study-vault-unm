---
title: "Hill Climbing & Heuristic Search"
order: 2
moduleTitle: "COMP2039 - AI Methods"
tags: ["hill-climbing", "heuristic-search", "neighbourhood", "representation"]
---

## Components of Heuristic Search

| Component | Description | Example (TSP) |
|-----------|-------------|---------------|
| Representation | How solutions are encoded | Permutation of cities |
| Evaluation function | Measures solution quality | Total tour distance |
| Neighbourhood | How to move between solutions | 2-opt swap |
| Move operator | Generates neighbour | Swap two edges |
| Initial solution | Starting point | Random permutation |

## Solution Representation

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

## Evaluation (Objective/Fitness) Function

Maps a solution to a numerical quality value:

$$f: S \rightarrow \mathbb{R}$$

| Property | Requirement |
|----------|-------------|
| Complete | Defined for all valid solutions |
| Fast | Must be computed efficiently (called many times) |
| Discriminating | Should differentiate between solutions |

## Neighbourhood Structure

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

## Hill Climbing (HC)

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

## Problems with Hill Climbing

| Problem | Description | Solution |
|---------|-------------|----------|
| Local optima | Stuck at non-global peak | Random restart, SA |
| Plateaux | Flat regions, no gradient | Sideways moves |
| Ridges | Narrow ascending paths | Different neighbourhood |

## Hill Climbing Variants

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
