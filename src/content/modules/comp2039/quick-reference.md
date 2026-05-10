---
title: "Quick Reference"
order: 90
moduleTitle: "COMP2039 - AI Methods"
tags: ["reference", "algorithms", "parameters", "comparison"]
---

## Algorithm Summary

| Algorithm | Type | Escape mechanism | Key parameter(s) |
|-----------|------|-----------------|-------------------|
| Hill Climbing | Single-solution | None (restarts) | Neighbourhood |
| Simulated Annealing | Single-solution | Probabilistic acceptance | $T_0$, $\alpha$ |
| Tabu Search | Single-solution | Memory (tabu list) | Tenure |
| ILS | Single-solution | Perturbation | Perturbation size |
| Great Deluge | Single-solution | Level-based acceptance | $B_0$, $\Delta B$ |
| LAHC | Single-solution | Historical comparison | $L_{\text{fa}}$ |
| Genetic Algorithm | Population | Crossover + mutation | $N$, $P_c$, $P_m$ |
| NSGA-II | Population | + Pareto ranking | Same as GA |
| Hyper-heuristic | Meta-level | Adapts operators | Heuristic set |

## Parameter Settings Cheat Sheet

### Simulated Annealing

| Parameter | Typical range | Notes |
|-----------|--------------|-------|
| $T_0$ | Accept ~80% initially | Problem-dependent |
| $\alpha$ | 0.90–0.999 | Geometric cooling |
| Iterations/temp | 100–10000 | More = better but slower |
| $T_{\min}$ | Near 0 | Stopping criterion |

### Genetic Algorithm

| Parameter | Typical value | Notes |
|-----------|---------------|-------|
| Population $N$ | 50–200 | Larger = more diversity |
| Crossover $P_c$ | 0.6–0.9 | Main exploration driver |
| Mutation $P_m$ | $1/L$ or 0.01 | Maintain diversity |
| Tournament $k$ | 2–5 | Selection pressure |
| Elitism | 1–2 individuals | Preserve best |

### Tabu Search

| Parameter | Typical value | Notes |
|-----------|---------------|-------|
| Tenure | $\sqrt{n}$ or 7–20 | Problem size dependent |
| Aspiration | Better than best | Override tabu |
| Neighbourhood | Full or sampled | Trade quality/speed |

## Acceptance Methods Quick Comparison

| Method | Formula (minimisation) | Params |
|--------|----------------------|--------|
| OI | $f(s') < f(s)$ | 0 |
| SA | $e^{-\Delta/T}$ if $\Delta > 0$ | $T$ |
| TA | $f(s') - f(s) < \theta$ | $\theta$ |
| GDA | $f(s') < B$ | $B, \Delta B$ |
| RR | $f(s') - f^* < D$ | $D$ |
| LAHC | $f(s') \leq L[v \mod L_{\text{fa}}]$ | $L_{\text{fa}}$ |

## Selection Methods

| Method | Pressure | Pros | Cons |
|--------|----------|------|------|
| Roulette | Proportional | Simple | Scaling issues |
| Tournament-2 | Low-moderate | Adjustable, no sorting | Stochastic |
| Tournament-5 | High | Fast | May lose diversity |
| Rank | Moderate | No scaling issues | Sorting needed |
| Truncation | Very high | Simple | Loses diversity fast |

## Crossover Operators by Representation

| Representation | Operators |
|----------------|-----------|
| Binary | One-point, two-point, uniform |
| Permutation | OX, PMX, CX, ERX |
| Real-valued | Arithmetic, BLX-$\alpha$, SBX |
| Tree (GP) | Subtree swap |

## Mutation Operators by Representation

| Representation | Operators |
|----------------|-----------|
| Binary | Bit flip ($P_m$ per bit) |
| Permutation | Swap, insert, inversion |
| Real-valued | Gaussian $N(0,\sigma)$, uniform |
| Tree (GP) | Subtree replacement, point mutation |

## Key Formulas

| Formula | Context |
|---------|---------|
| $P = e^{-\Delta/T}$ | SA acceptance probability |
| $P(i) = f_i / \sum f_j$ | Roulette wheel selection |
| $P_m = 1/L$ | Default mutation rate |
| $\binom{n}{2} = n(n-1)/2$ | Swap neighbourhood size |
| $\text{UCB}_i = \bar{x}_i + C\sqrt{\frac{\ln N}{n_i}}$ | Multi-armed bandit |

## Exploration vs Exploitation

| Favours Exploration | Favours Exploitation |
|--------------------|---------------------|
| High $T$ in SA | Low $T$ in SA |
| High $P_m$ | Low $P_m$ |
| Large population | Small population |
| Low selection pressure | High selection pressure |
| Random selection (HH) | Greedy selection (HH) |
| Long tabu tenure | Short tabu tenure |
| Strong perturbation (ILS) | Weak perturbation (ILS) |

## When to Use What

| Problem characteristics | Recommended approach |
|------------------------|---------------------|
| Small search space | Exact methods |
| Single objective, one instance | SA or tabu search |
| Multiple objectives | NSGA-II |
| Large population beneficial | GA/EA |
| Portfolio of heuristics available | Hyper-heuristic |
| Very large/complex | Memetic algorithm (GA + local search) |
| Black-box, no gradient | Any metaheuristic |
| Need theoretical guarantee | Exact or SA (infinite time) |
