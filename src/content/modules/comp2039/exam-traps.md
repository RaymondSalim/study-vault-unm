---
title: "Exam Traps & Common Mistakes"
order: 91
moduleTitle: "COMP2039 - AI Methods"
tags: ["exam", "mistakes", "traps"]
---

## Common Exam Mistakes

<details><summary>Trap: Confusing local optimum with global optimum</summary>

**Mistake**: Claiming hill climbing finds the optimal solution.

**Correct**: Hill climbing finds a **local** optimum — the best in the neighbourhood. Only exhaustive search guarantees the **global** optimum for NP-hard problems.

**Key phrase**: "HC terminates at a local optimum which may or may not be the global optimum."

</details>

<details><summary>Trap: SA "always finds the global optimum"</summary>

**Mistake**: Stating SA guarantees the global optimum.

**Correct**: SA has a **theoretical** guarantee only with infinitely slow (logarithmic) cooling. In practice with geometric cooling, SA is a heuristic with **no** optimality guarantee.

**Key phrase**: "SA converges to the global optimum in the limit (infinite time), but in practice provides no guarantee."

</details>

<details><summary>Trap: Confusing NP-hard with "unsolvable"</summary>

**Mistake**: "NP-hard problems cannot be solved."

**Correct**: NP-hard problems CAN be solved, just not in **polynomial time** (assuming P != NP). Small instances can be solved exactly. Large instances require heuristics that find **good** (not guaranteed optimal) solutions.

</details>

<details><summary>Trap: Saying crossover = mutation in GAs</summary>

**Mistake**: Treating crossover and mutation as interchangeable.

**Correct**:
- **Crossover**: Combines existing building blocks from two parents (exploitation)
- **Mutation**: Introduces new genetic material not present in parents (exploration)
- Both serve different purposes; GAs typically need both.

</details>

<details><summary>Trap: Using standard crossover for permutation problems</summary>

**Mistake**: Applying one-point crossover to TSP permutations.

**Correct**: Standard crossover creates **invalid** solutions (repeated/missing cities). Must use permutation-preserving operators: OX, PMX, CX, or ERX.

**Always check**: Does the operator maintain solution validity for the representation?

</details>

<details><summary>Trap: Confusing hyper-heuristic with metaheuristic</summary>

**Mistake**: Using the terms interchangeably.

**Correct**:
| | Metaheuristic | Hyper-heuristic |
|-|---------------|-----------------|
| Searches in | Solution space | Heuristic space |
| Finds | Good solutions | Good heuristics/sequences |
| Example | SA solving TSP | Choosing between SA, HC, etc. |

A hyper-heuristic operates at a **higher level** — it selects/generates the low-level heuristics.

</details>

<details><summary>Trap: Forgetting elitism loses best solution</summary>

**Mistake**: Describing GA without mentioning that best solution can be lost.

**Correct**: Without elitism, the best individual can be destroyed by crossover/mutation and not selected. **Always mention elitism** when describing GA — it ensures the best solution survives to the next generation.

</details>

<details><summary>Trap: Higher temperature = better SA performance</summary>

**Mistake**: "Just set temperature very high for better results."

**Correct**: High initial temperature is good for **exploration**, but if cooling is too slow or temperature stays high, SA becomes a **random walk** — accepting everything without converging. The key is the **cooling schedule** that transitions from exploration to exploitation.

</details>

<details><summary>Trap: Tabu search gets stuck because moves are forbidden</summary>

**Mistake**: "Tabu search cannot escape because all good moves are tabu."

**Correct**: The **aspiration criterion** allows overriding tabu status — typically if a tabu move leads to a solution better than the best known. Also, tabu tenure is finite, so moves eventually become available again.

</details>

<details><summary>Trap: Pareto dominance means "better in all objectives"</summary>

**Mistake**: "A dominates B means A is strictly better in every objective."

**Correct**: Dominance requires:
1. A is **at least as good** in ALL objectives (not strictly better)
2. A is **strictly better** in AT LEAST ONE objective

If A=(2,5) and B=(2,6) (minimisation): A dominates B because A equals B in $f_1$ and is better in $f_2$.

</details>

<details><summary>Trap: Forgetting that neighbourhood structure matters</summary>

**Mistake**: Discussing algorithms without specifying the neighbourhood.

**Correct**: The neighbourhood defines the search landscape. Same problem with different neighbourhoods = different landscapes = different algorithm performance. Always specify:
- What is a "move"?
- What is the neighbourhood size?
- How does it relate to the representation?

</details>

<details><summary>Trap: LAHC with list length 1 = random walk</summary>

**Mistake**: Stating small LAHC list means more acceptance.

**Correct**: LAHC with $L_{\text{fa}} = 1$ reduces to **Only Improving** (hill climbing), not random walk. It compares to the most recent fitness, which is essentially the current solution. **Larger** $L_{\text{fa}}$ = more permissive (compares to older, likely worse values).

</details>

<details><summary>Trap: Population size has no effect on GA</summary>

**Mistake**: Ignoring population size as a parameter.

**Correct**:
| Pop too small | Pop too large |
|---------------|---------------|
| Low diversity | Slow convergence |
| Premature convergence | Wasteful evaluations |
| Building blocks lost | Slow per-generation |

Typical: 50-200. Scale with problem difficulty.

</details>

## Exam Strategy Tips

| Tip | Explanation |
|-----|-------------|
| Define terms precisely | "Local optimum" not just "optimum" |
| State assumptions | "Assuming minimisation..." |
| Give examples | Illustrate with TSP/knapsack |
| Compare trade-offs | Never say one method is "always better" |
| Mention limitations | Every method has weaknesses |
| Use correct notation | $N(s)$ for neighbourhood, $f(s)$ for fitness |
