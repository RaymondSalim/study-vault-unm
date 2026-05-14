---
title: "Evolutionary Algorithms II"
order: 6
moduleTitle: "COMP2039 - AI Methods"
tags: ["multi-objective", "fitness-landscape", "benchmark", "diversity"]
---

## Multi-Objective Optimisation

:::eli10

Sometimes you want to optimise multiple things at once that conflict with each other — like wanting a car that's both fast AND fuel-efficient. You can't usually have the best of both. Multi-objective optimisation finds a set of compromise solutions showing the trade-offs: if you want more speed, you sacrifice fuel economy. The set of best compromises is called the Pareto front.

:::

:::eli15

Many real problems have multiple conflicting objectives (e.g., minimise cost AND maximise quality). No single solution is best at everything, so we seek the set of Pareto-optimal solutions — solutions where you can't improve one objective without worsening another. Solution A dominates B if A is at least as good in all objectives and strictly better in at least one. Approaches include weighted sums (combine objectives into one — but misses concave regions), epsilon-constraint (optimise one, constrain others), and Pareto-based EAs like NSGA-II which find an approximation of the entire Pareto front in a single run using non-dominated sorting and crowding distance for diversity.

:::

:::eli20

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

:::

## Fitness Landscapes

:::eli10

A fitness landscape is an imaginary 3D map where each point is a possible solution and its height shows how good it is. A smooth landscape with one peak is easy — just walk uphill. A spiky landscape with millions of peaks is hard — you keep getting stuck on short hills. Understanding the landscape tells you which search method will work best.

:::

:::eli15

The fitness landscape metaphor visualises the search space as terrain where elevation represents solution quality. Key properties include ruggedness (many local optima — hard for hill climbers), neutrality (flat plateaux — no gradient guidance), deceptiveness (the gradient points away from the optimum), modality (number of optima — unimodal is easy, highly multimodal is hard), and separability (whether variables interact). Landscape analysis metrics like autocorrelation and fitness-distance correlation (FDC) help predict which algorithms will perform well. FDC near -1 means easy, near 0 means hard, and near +1 means deceptive.

:::

:::eli20

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

:::

## Benchmark Functions

:::eli10

Benchmark functions are test problems with known answers used to compare algorithms fairly. Some are easy (Sphere — one smooth hill), some are hard (Rastrigin — millions of little bumps), and some are tricky (Rosenbrock — a narrow winding valley). If your algorithm works well on many different benchmarks, it's probably good at real problems too.

:::

:::eli15

Benchmark functions are standardised test problems with known optima, used to fairly compare algorithm performance. In continuous optimisation: Sphere is simple and unimodal (baseline test); Rosenbrock has a narrow valley that's easy to find but hard to follow; Rastrigin is massively multimodal with a regular grid of local optima; Ackley is multimodal and non-separable; Schwefel is deceptive (global optimum far from local ones). Combinatorial benchmarks include TSPLIB instances, QAP, MAX-SAT, and bin packing. Using standard benchmarks enables fair comparison between algorithms across publications.

:::

:::eli20

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

:::

## Diversity Management

:::eli10

If all the solutions in your population become too similar (like everyone moving to the same hill), the algorithm gets stuck. Diversity management fights this by discouraging crowding, keeping subgroups in different areas, or using separate "islands" that occasionally share solutions. The goal is maintaining variety so you keep exploring while still improving.

:::

:::eli15

Maintaining population diversity is crucial to avoid premature convergence (the entire population converging to one local optimum). Techniques include fitness sharing (reduce fitness of individuals in crowded regions), crowding (replace the most similar existing individual), niching (maintain subpopulations in distinct regions), island models (parallel populations with occasional migration), and speciation (group similar individuals and compete within groups). The fundamental trade-off is exploration (discovering new regions via high diversity) versus exploitation (refining known good solutions via convergence). Too much of either is harmful.

:::

:::eli20

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

:::

## Advanced EA Variants

:::eli10

There are many variations on the evolutionary algorithm idea. Evolution Strategies focus on real numbers and let mutation rates evolve themselves. Differential Evolution uses differences between solutions to guide changes. Genetic Programming evolves computer programs. Memetic Algorithms combine evolution with local search — creating children (exploration) and then refining each one (exploitation) — often giving the best results.

:::

:::eli15

Beyond standard GAs, several EA variants specialise for different domains. Evolution Strategies (ES) use real-valued representations with self-adaptive mutation (the step sizes evolve alongside the solutions). Evolutionary Programming drops crossover entirely, relying only on mutation. Differential Evolution creates mutations by adding scaled differences between population members — very effective for continuous optimisation. Genetic Programming evolves tree-structured programs. Memetic Algorithms hybridise GAs with local search: the GA explores globally while local search (HC, SA) refines each individual — often significantly outperforming either approach alone.

:::

:::eli20

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

:::
