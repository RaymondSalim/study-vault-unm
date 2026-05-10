---
title: "Metaheuristics"
order: 3
moduleTitle: "COMP2039 - AI Methods"
tags: ["simulated-annealing", "tabu-search", "iterated-local-search", "metaheuristics"]
---

## What are Metaheuristics?

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

## Simulated Annealing (SA)

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

## Tabu Search (TS)

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

## Iterated Local Search (ILS)

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
