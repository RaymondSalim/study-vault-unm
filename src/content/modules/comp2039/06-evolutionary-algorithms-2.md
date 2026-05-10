---
title: "Evolutionary Algorithms II"
order: 6
moduleTitle: "COMP2039 - AI Methods"
tags: ["multi-objective", "fitness-landscape", "benchmark", "diversity"]
---

## Multi-Objective Optimisation

Many real problems have conflicting objectives:

$$\text{min } \mathbf{f}(x) = [f_1(x), f_2(x), \ldots, f_k(x)]$$

### Pareto Dominance

Solution $a$ **dominates** solution $b$ ($a \prec b$) if:
1. $a$ is at least as good as $b$ in all objectives
2. $a$ is strictly better than $b$ in at least one objective

$$a \prec b \iff \forall i: f_i(a) \leq f_i(b) \text{ AND } \exists j: f_j(a) < f_j(b)$$

### Key Concepts

| Term | Definition |
|------|-----------|
| Pareto optimal | Not dominated by any other feasible solution |
| Pareto front | Set of all Pareto optimal solutions (in objective space) |
| Pareto set | Set of all Pareto optimal solutions (in decision space) |
| Non-dominated set | Solutions not dominated within current population |

### Approaches

| Approach | Method | Issue |
|----------|--------|-------|
| Weighted sum | $\min \sum w_i f_i(x)$ | Misses concave regions; weight choice |
| $\epsilon$-constraint | Optimise one, constrain others | Many runs needed |
| Pareto-based EA | NSGA-II, SPEA2 | Finds entire front in one run |

### NSGA-II

1. **Non-dominated sorting**: Rank population into fronts $F_1, F_2, \ldots$
2. **Crowding distance**: Measure density around each solution
3. **Selection**: Prefer lower rank; break ties by higher crowding distance
4. Produces diverse spread along Pareto front

### Quality Indicators

| Metric | Measures |
|--------|----------|
| Hypervolume | Volume dominated by Pareto front approximation |
| IGD (Inverted Generational Distance) | Distance from true front to approximation |
| Spread/Spacing | Uniformity of distribution |

## Fitness Landscapes

The fitness landscape metaphor: solutions as points in space, fitness as elevation.

### Landscape Properties

| Property | Description | Impact on search |
|----------|-------------|-----------------|
| Ruggedness | Many local optima | HC struggles; need SA/GA |
| Neutrality | Plateaux of equal fitness | Drift; hard to navigate |
| Deceptiveness | Gradient leads away from optimum | GA building blocks fail |
| Modality | Number of local optima | Unimodal = easy; multimodal = hard |
| Separability | Variables independent | Separable = easier |

### Landscape Analysis Metrics

| Metric | What it measures |
|--------|-----------------|
| Autocorrelation | Correlation between nearby solutions |
| Fitness-distance correlation (FDC) | Correlation between fitness and distance to optimum |
| Number of local optima | Difficulty for local search |

### FDC Interpretation

| FDC value | Landscape type |
|-----------|---------------|
| $\rho \approx -1$ | Easy (fitness guides to optimum) |
| $\rho \approx 0$ | Difficult (no correlation) |
| $\rho \approx +1$ | Deceptive (fitness misleads) |

## Benchmark Functions

### Continuous Optimisation

| Function | Properties | Global min |
|----------|-----------|------------|
| Sphere | Unimodal, separable | $f(\mathbf{0}) = 0$ |
| Rosenbrock | Unimodal, non-separable, narrow valley | $f(\mathbf{1}) = 0$ |
| Rastrigin | Multimodal, separable | $f(\mathbf{0}) = 0$ |
| Ackley | Multimodal, non-separable | $f(\mathbf{0}) = 0$ |
| Schwefel | Multimodal, deceptive | $f(420.97..) = 0$ |

### Formulae

**Sphere**: $f(\mathbf{x}) = \sum_{i=1}^n x_i^2$

**Rastrigin**: $f(\mathbf{x}) = 10n + \sum_{i=1}^n [x_i^2 - 10\cos(2\pi x_i)]$

**Rosenbrock**: $f(\mathbf{x}) = \sum_{i=1}^{n-1} [100(x_{i+1} - x_i^2)^2 + (x_i - 1)^2]$

### Combinatorial Benchmarks

| Problem | Type | Known optimal? |
|---------|------|---------------|
| TSP (TSPLIB) | Routing | Yes (for small instances) |
| QAP | Assignment | Some instances |
| MAX-SAT | Satisfiability | Competition benchmarks |
| Bin Packing | Packing | Lower bounds known |

## Diversity Management

| Technique | Mechanism |
|-----------|-----------|
| Fitness sharing | Reduce fitness in crowded areas |
| Crowding | Replace most similar individual |
| Niching | Maintain subpopulations in different regions |
| Island model | Separate populations with migration |
| Speciation | Group similar individuals |

### Exploration vs Exploitation

| Exploration | Exploitation |
|-------------|-------------|
| Discover new regions | Refine known good regions |
| High mutation, large populations | Low mutation, selection pressure |
| Diversity preservation | Convergence |

**Balance is key**: Too much exploration = slow convergence. Too much exploitation = premature convergence.

## Advanced EA Variants

| Variant | Key difference from standard GA |
|---------|-------------------------------|
| Evolution Strategy (ES) | Real-valued; self-adaptive mutation |
| Evolutionary Programming (EP) | No crossover; mutation only |
| Differential Evolution (DE) | Difference vectors for mutation |
| Genetic Programming (GP) | Evolves programs/trees |
| Memetic Algorithm | GA + local search (hybrid) |

### Memetic Algorithms

Combine global search (GA) with local search (HC/SA):

```
1. GA produces diverse solutions (exploration)
2. Local search refines each solution (exploitation)
3. Often outperforms pure GA or pure local search
```

<details><summary>Practice: Solution A=(3,5), B=(4,4), C=(2,6). Which dominates which? (minimisation)</summary>

Compare pairwise:
- A vs B: A better on $f_1$ (3<4), B better on $f_2$ (4<5) → Neither dominates
- A vs C: C better on $f_1$ (2<3), A better on $f_2$ (5<6) → Neither dominates
- B vs C: C better on $f_1$ (2<4), B better on $f_2$ (4<6) → Neither dominates

**All three are non-dominated** — they all lie on the Pareto front of this set.

</details>

<details><summary>Practice: Why is Rastrigin harder than Sphere for local search?</summary>

- **Sphere**: Unimodal — single global optimum, gradient always points toward it. HC easily finds optimum.
- **Rastrigin**: Highly multimodal — $\cos(2\pi x_i)$ creates $\approx 10^n$ local optima arranged in a regular grid. HC gets trapped almost immediately.

Rastrigin requires population-based or restart methods to reliably find the global optimum.

</details>

<details><summary>Practice: What is the advantage of NSGA-II over weighted sum?</summary>

| Weighted sum | NSGA-II |
|--------------|---------|
| Single solution per run | Entire Pareto front in one run |
| Cannot find solutions in concave regions | Handles any front shape |
| Requires weight specification a priori | No weights needed |
| Multiple runs with different weights | One run suffices |

NSGA-II provides the decision maker with a set of trade-off solutions to choose from after the fact.

</details>
