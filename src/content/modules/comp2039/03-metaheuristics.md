---
title: "Metaheuristics"
order: 3
moduleTitle: "COMP2039 - AI Methods"
tags: ["simulated-annealing", "tabu-search", "iterated-local-search", "metaheuristics"]
---

## What are Metaheuristics?

:::eli10

Metaheuristics are smarter versions of hill climbing that can escape traps. Hill climbing gets stuck on small hills because it only goes uphill. Metaheuristics sometimes accept "going downhill" to find a path to a taller hill. They're general-purpose problem-solving recipes that work on many different types of problems.

:::

:::eli15

Metaheuristics are high-level problem-solving strategies that guide heuristic searches beyond local optima. Unlike hill climbing, they can accept worsening moves under certain conditions to escape traps. They are problem-independent (the same framework applies to TSP, scheduling, etc.), incomplete (no guarantee of finding the optimal), and stochastic (involve randomness). They come in two flavours: single-solution methods (SA, Tabu, ILS) that improve one solution at a time, and population-based methods (GA, PSO) that evolve a collection of solutions simultaneously.

:::

:::eli20

Higher-level strategies that guide heuristic search — they escape local optima by accepting worsening moves.

| Property | Description |
|----------|-------------|
| Problem-independent | General framework applicable to many problems |
| Incomplete | No optimality guarantee |
| Stochastic | Involve randomness |
| Escape local optima | Accept non-improving moves under certain conditions |

### Taxonomy

| Type | Mechanism | Examples |
|------|-----------|---------|
| Single-solution | Improve one solution | SA, Tabu, ILS |
| Population-based | Evolve set of solutions | GA, PSO, ACO |
| Trajectory-based | Follow path through search space | SA, Tabu |

:::

## Simulated Annealing (SA)

:::eli10

Simulated Annealing is inspired by metalworking — when you heat metal and cool it slowly, atoms settle into a perfect structure. SA starts "hot" (accepting almost any move, even bad ones) and gradually "cools down" (becoming pickier). Early on, it explores freely; later, it settles into a good solution. If you cool too fast, you get stuck (like brittle metal); cool slowly and you get a better answer.

:::

:::eli15

Simulated Annealing borrows from thermodynamics: at high temperature, particles move freely; at low temperature, they settle into low-energy states. SA always accepts improving moves but also accepts worsening moves with probability e^(-delta/T). At high temperature, most moves are accepted (random exploration). As temperature decreases following a cooling schedule (typically geometric: T = alpha * T), acceptance of bad moves decreases until the algorithm behaves like hill climbing. Key parameters are initial temperature (controls exploration), cooling rate (controls the exploration-exploitation transition), and iterations per temperature level. Theoretically, infinitely slow cooling guarantees the global optimum — but in practice, you use a schedule that balances quality and runtime.

:::

:::eli20

Inspired by metallurgical annealing — cooling molten metal slowly to reach low-energy state.

### Algorithm

```
1. Generate initial solution s; set temperature T = T₀
2. Repeat until stopping condition:
   a. Generate random neighbour s' ∈ N(s)
   b. Δ = f(s') - f(s)  [for minimisation]
   c. If Δ ≤ 0 (improvement):
      s ← s'
   d. Else accept with probability:
      P(accept) = e^(-Δ/T)
   e. Update T (cooling)
3. Return best solution found
```

### Acceptance Probability

$$P(\text{accept}) = e^{-\Delta / T}$$

| Temperature | Behaviour | $P(\text{accept worsening})$ |
|-------------|-----------|------------------------------|
| High $T$ | Nearly random walk | Close to 1 |
| Low $T$ | Nearly hill climbing | Close to 0 |
| $T \to 0$ | Deterministic HC | 0 |

### Cooling Schedules

| Schedule | Formula | Properties |
|----------|---------|------------|
| Geometric | $T_{k+1} = \alpha \cdot T_k$ | Most common; $\alpha \in [0.9, 0.99]$ |
| Linear | $T_{k+1} = T_k - \beta$ | Simple but can go negative |
| Lundy-Mees | $T_{k+1} = T_k / (1 + \beta T_k)$ | Very slow cooling |
| Adaptive | Based on acceptance rate | Self-tuning |

### Key Parameters

| Parameter | Effect | Typical values |
|-----------|--------|----------------|
| $T_0$ (initial temp) | Higher = more exploration | Problem-dependent |
| $\alpha$ (cooling rate) | Higher = slower cooling | 0.9–0.999 |
| Iterations per temp | More = better sampling | 100–10000 |
| Stopping condition | When to terminate | $T < T_{min}$ or max iterations |

### Theoretical Guarantee

If cooling is *sufficiently slow* (logarithmic schedule), SA converges to global optimum with probability 1. In practice, this is too slow to be useful.

:::

## Tabu Search (TS)

:::eli10

Tabu Search has a memory — it remembers recent moves and forbids ("taboos") repeating them. This forces the algorithm to explore new territory instead of going in circles. It always moves to the best available neighbour (even if it's worse), as long as that move isn't on the "banned list." After a while, banned moves expire and become available again.

:::

:::eli15

Tabu Search uses memory to guide the search and prevent cycling. At each step, it moves to the best neighbour that isn't "tabu" (forbidden). The tabu list stores recent moves (or solution attributes) for a number of iterations (the tabu tenure), preventing immediate reversal. An aspiration criterion can override the tabu status — typically if a tabu move leads to a solution better than the best ever found. Tabu Search also supports intensification (focusing search on promising areas) and diversification (forcing exploration of unvisited regions). The tabu tenure is critical: too short allows cycling; too long restricts the search excessively.

:::

:::eli20

Uses memory to avoid revisiting recently explored solutions.

### Algorithm

```
1. Generate initial solution s
2. Initialise tabu list TL = ∅
3. Repeat until stopping condition:
   a. Generate neighbourhood N(s)
   b. s' ← best non-tabu solution in N(s)
      (or satisfies aspiration criterion)
   c. s ← s'
   d. Add move (or attributes) to TL
   e. If |TL| > tabu tenure: remove oldest
4. Return best solution found
```

### Key Components

| Component | Purpose | Example |
|-----------|---------|---------|
| Tabu list | Stores forbidden moves | Last 7 swap pairs |
| Tabu tenure | How long moves stay forbidden | Fixed or adaptive |
| Aspiration criterion | Override tabu status | If better than best-known |
| Intensification | Focus on promising regions | Reduce neighbourhood |
| Diversification | Explore new regions | Random restart, penalise frequent |

### Tabu List Strategies

| Strategy | Stores | Memory |
|----------|--------|--------|
| Move-based | The move made | Low |
| Solution-based | Full solutions | High |
| Attribute-based | Changed attributes | Medium |

### Tabu Tenure

| Type | Description |
|------|-------------|
| Fixed | Constant tenure (e.g., 7) |
| Random | Random value in range $[a, b]$ |
| Adaptive | Increase when cycling, decrease otherwise |

:::

## Iterated Local Search (ILS)

:::eli10

Iterated Local Search works like this: first, you hill climb to a local peak. Then you give the solution a "kick" (perturbation) — changing it enough to escape the current peak but not so much that you lose all the good structure. Then you hill climb again from the kicked position. Repeat, keeping the best answer. It's like jumping to a new hill and checking if it's taller.

:::

:::eli15

Iterated Local Search (ILS) combines local search with perturbation. It first applies local search (e.g., hill climbing) to reach a local optimum. Then it applies a perturbation (a small number of random changes) to escape the current basin of attraction, followed by another round of local search from the perturbed solution. The acceptance criterion decides whether to continue from the new local optimum or stay with the old one. Perturbation strength is critical: too weak and you land back in the same basin; too strong and it becomes random restart. Medium-strength perturbation (3-5 moves) usually provides the best balance.

:::

:::eli20

Repeatedly applies local search from perturbed solutions.

### Algorithm

```
1. s₀ ← GenerateInitialSolution()
2. s* ← LocalSearch(s₀)
3. Repeat until stopping condition:
   a. s' ← Perturbation(s*)
   b. s'' ← LocalSearch(s')
   c. s* ← AcceptanceCriterion(s*, s'')
4. Return best solution found
```

### Components

| Component | Purpose | Key consideration |
|-----------|---------|-------------------|
| Perturbation | Escape local optima | Too small = same basin; too large = random restart |
| Local search | Intensify | Any local search (HC, SA, etc.) |
| Acceptance | Balance exploration/exploitation | Better, random walk, SA-like |

### Perturbation Strength

| Strength | Effect |
|----------|--------|
| Weak (1-2 moves) | Stay in same basin — no escape |
| Medium (3-5 moves) | Reach new basin — good balance |
| Strong (many moves) | Essentially random restart |

<details><summary>Practice: SA with T=100, Δ=50. What is P(accept)?</summary>

$$P = e^{-50/100} = e^{-0.5} \approx 0.607$$

About 61% chance of accepting this worsening move. At high temperature, large worsening moves are still frequently accepted.

</details>

<details><summary>Practice: Why is tabu tenure important?</summary>

| Tenure too short | Tenure too long |
|-----------------|-----------------|
| Cycling between solutions | Restricts search too much |
| Doesn't prevent revisits | Good moves forbidden |
| Poor local optima escape | Slow convergence |

Optimal tenure is problem-dependent; adaptive tenure often works best.

</details>

<details><summary>Practice: Compare SA, TS, and ILS</summary>

| Feature | SA | TS | ILS |
|---------|----|----|-----|
| Escape mechanism | Probabilistic acceptance | Memory (tabu list) | Perturbation |
| Parameters | T₀, α, iterations/temp | Tenure, aspiration | Perturbation size |
| Memory | None (memoryless) | Short/long term | None |
| Deterministic? | No | More deterministic | Partly |
| Strength | Simple, theoretical backing | Exploits structure | Simple, effective |

</details>

:::
