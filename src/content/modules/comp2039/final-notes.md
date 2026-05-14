---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP2039 - AI Methods"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: SEARCH, METAHEURISTICS & MOVE ACCEPTANCE

### Optimisation & Complexity

| Class | Description | Example |
|-------|-------------|---------|
| P | Polynomial time | Sorting, shortest path |
| NP | Verifiable in poly time | TSP, SAT |
| NP-hard | At least as hard as NP | TSP (optimal) |

NP-hard $\neq$ unsolvable. Small instances solvable exactly; large need heuristics.

**Search space:** All possible solutions. **Objective function** $f(s)$: quality measure. **Neighbourhood** $N(s)$: reachable by one move.

| Paradigm | Mechanism | Example |
|----------|-----------|---------|
| Exact | Explore all | Branch & bound |
| Constructive | Build piece by piece | Greedy |
| Perturbative | Improve existing | Hill climbing |
| Population-based | Evolve set | GA |

---

### Solution Components

| Component | Description | TSP Example |
|-----------|-------------|-------------|
| Representation | Encoding | Permutation |
| Evaluation $f(s)$ | Quality score | Tour distance |
| Neighbourhood | Adjacent solutions | 2-opt swap |
| Move operator | Generates neighbour | Reverse segment |

| Representation | Suitable for |
|----------------|-------------|
| Binary string | Knapsack, feature selection |
| Permutation | TSP, scheduling |
| Integer vector | Graph colouring |
| Real vector | Continuous optimisation |

**Neighbourhood sizes:** Bit flip: $n$. Swap: $\binom{n}{2}$. 2-opt: $\binom{n}{2}$. Insert: $n(n-1)$.

---

### Hill Climbing

```
First Improvement: generate neighbour; if better, accept; repeat until stuck
Best Improvement: evaluate ALL neighbours; move to best; repeat until stuck
```

| Problem | Description | Solution |
|---------|-------------|----------|
| Local optima | Stuck at non-global peak | Random restart, SA |
| Plateaux | Flat, no gradient | Sideways moves |
| Ridges | Narrow paths | Different neighbourhood |

**Random restart:** Run HC from multiple random starts, return overall best.

**Davis's Bit HC (DBHC):** Random permutation of bits; flip each in order, keep improvements; repeat until no change in full pass.

HC finds **local** optimum only. No guarantee of global optimum.

---

### Simulated Annealing (SA)

Always accepts improvements. Accepts worsening with probability:

$$P(\text{accept}) = e^{-\Delta/T} \quad \text{where } \Delta = f(s')-f(s) > 0$$

| Temperature | Behaviour |
|-------------|-----------|
| High $T$ | Random walk ($P\approx 1$) |
| Low $T$ | Hill climbing ($P\approx 0$) |

| Cooling Schedule | Formula |
|-----------------|---------|
| Geometric | $T_{k+1}=\alpha T_k$ &nbsp; ($\alpha\in[0.9,0.99]$) |
| Linear | $T_{k+1}=T_k-\beta$ |
| Lundy-Mees | $T_{k+1}=T_k/(1+\beta T_k)$ |

**Theoretical:** Infinitely slow cooling $\to$ global optimum. **Practical:** No guarantee.

**Worked example:** $T=100$, $\Delta=50$: $P=e^{-50/100}=e^{-0.5}\approx 0.607$ (61% accept)

---

### Tabu Search (TS)

Always moves to **best non-tabu** neighbour (even if worse).

| Component | Purpose |
|-----------|---------|
| Tabu list | Recent moves forbidden |
| Tabu tenure | Duration of ban (fixed/adaptive) |
| Aspiration | Override tabu if better than best-known |
| Intensification | Focus on promising region |
| Diversification | Force exploration of new areas |

Tenure too short $\to$ cycling. Too long $\to$ over-restricted. Adaptive often best.

---

### Iterated Local Search (ILS)

```
s* = LocalSearch(random_init)
Repeat: s' = Perturb(s*); s'' = LocalSearch(s'); s* = Accept(s*, s'')
```

| Perturbation strength | Effect |
|----------------------|--------|
| Weak (1-2 moves) | Same basin (no escape) |
| Medium (3-5 moves) | New basin (good) |
| Strong (many) | Random restart |

---

### Move Acceptance Methods

| Method | Accept if... | Parameters |
|--------|-------------|------------|
| Only Improving (OI) | $f(s')\leq f(s)$ | 0 |
| SA | $\Delta\leq 0$ or $r < e^{-\Delta/T}$ | $T_0, \alpha$ |
| Threshold (TA) | $f(s')-f(s)<\theta$ | $\theta$ (decreasing) |
| Great Deluge (GD) | $f(s') < B$ (level) | $B_0, \Delta B$ |
| Record-to-Record | $f(s')-f^* < D$ | Deviation $D$ |
| LAHC | $f(s') \leq L[v \bmod L_{fa}]$ | List length $L_{fa}$ |
| All Moves | Always | 0 |

**GD:** Compares to absolute level (not current). Level decreases linearly.

**LAHC:** Compares to fitness from $L_{fa}$ iterations ago. $L_{fa}=1$ = OI (hill climbing). Larger = more permissive.

---

## SIDE 2: EVOLUTIONARY ALGORITHMS, HYPER-HEURISTICS & REASONING

### Genetic Algorithm Framework

```
Init random population → Evaluate → Repeat:
  Select parents → Crossover (Pc) → Mutate (Pm) → Evaluate → Replace
Return best ever found
```

| Parameter | Typical | Role |
|-----------|---------|------|
| Population $N$ | 50-200 | Diversity |
| Crossover $P_c$ | 0.6-0.9 | Exploitation |
| Mutation $P_m$ | $1/L$ | Exploration |

---

### Selection Methods

| Method | Mechanism | Pressure |
|--------|-----------|----------|
| Roulette | $P(i)=f_i/\sum f_j$ | Variable |
| Tournament($k$) | Best of $k$ random | Adjustable |
| Rank-based | Prob $\propto$ rank | Moderate |
| Truncation | Top $\tau\%$ only | Very high |

Tournament: $k=2$ (default), $k=N$ (always best), $k=1$ (random).

---

### Crossover Operators

**Binary:** One-point (swap tails), Two-point (swap middle), Uniform (each bit from random parent).

**Permutation (standard crossover INVALID -- creates duplicates):**

| Operator | Description |
|----------|-------------|
| OX (Order) | Copy segment from P1; fill rest in P2 order |
| PMX | Copy segment; map remaining via correspondence |
| CX (Cycle) | Alternate parents along cycles |
| ERX | Preserve edges from both parents |

---

### Mutation Operators

| Representation | Operator |
|----------------|----------|
| Binary | Bit flip ($P_m$ per bit) |
| Integer | Random reset |
| Real-valued | Gaussian noise $N(0,\sigma)$ |
| Permutation | Swap, insert, inversion |

$P_m = 1/L$ flips ~1 gene per individual. Too high = random search. Too low = premature convergence.

**Crossover** = exploitation (combine existing). **Mutation** = exploration (create new). Both needed.

---

### Replacement

| Strategy | Description |
|----------|-------------|
| Generational | All replaced by offspring |
| Steady-state | Replace 1-2 worst |
| Elitism | Best $k$ always survive |
| $(\mu+\lambda)$ | Best $\mu$ from parents+offspring |
| $(\mu,\lambda)$ | Best $\mu$ from offspring only |

**Elitism** ensures best solution never lost. Almost always beneficial.

---

### Multi-Objective Optimisation

$a$ **dominates** $b$ ($a\prec b$) iff: $\forall i: f_i(a)\leq f_i(b)$ AND $\exists j: f_j(a)<f_j(b)$

**Pareto front:** Set of all non-dominated solutions.

| Approach | Method | Issue |
|----------|--------|-------|
| Weighted sum | $\min\sum w_if_i$ | Misses concave regions |
| NSGA-II | Non-dominated sorting + crowding distance | Finds full front in one run |

**NSGA-II:** (1) Rank into fronts $F_1,F_2,...$ (2) Crowding distance for diversity (3) Prefer lower rank, break ties by higher crowding.

---

### Fitness Landscape Properties

| Property | Impact |
|----------|--------|
| Rugged (many local optima) | HC fails; need SA/GA |
| Neutral (plateaux) | No gradient guidance |
| Deceptive | Gradient misleads |
| Separable | Easier (variables independent) |

**FDC:** $\rho\approx -1$ easy, $\rho\approx 0$ hard, $\rho\approx +1$ deceptive.

---

### Hyper-Heuristics

**Heuristic to choose heuristics** -- operates in heuristic space, not solution space.

| | Metaheuristic | Hyper-heuristic |
|-|---------------|-----------------|
| Searches | Solution space | Heuristic space |
| Finds | Good solutions | Good heuristics |
| Domain knowledge | Often encoded | Domain barrier |

| Type | What it does |
|------|-------------|
| Selection HH | Choose from existing heuristics |
| Generation HH | Create new heuristics (GP) |

**Selection framework:** Choose heuristic $h$ $\to$ Apply: $s'=h(s)$ $\to$ Accept/reject $\to$ Learn

| Selection Method | Mechanism |
|-----------------|-----------|
| Simple Random | Baseline (no learning) |
| Greedy | Try all, keep best |
| Choice Function | $CF(h_i)=\alpha f_1 + \beta f_2 + \gamma f_3$ |
| Reinforcement Learning | Reward/punish based on outcome |
| Multi-Armed Bandit (UCB1) | $\bar{x}_i + C\sqrt{\ln N/n_i}$ |

**Choice Function:** $f_1$ = individual performance, $f_2$ = pair performance, $f_3$ = time since last used.

**Domain barrier:** HH sees only fitness changes, not solution representation.

---

### Knowledge & Reasoning

| Representation | Type |
|---------------|------|
| Logic-based | Propositional/predicate logic |
| Rule-based | IF-THEN (expert systems) |
| Semantic networks | Graph of concepts |
| Probabilistic | Bayesian networks |

**Inference:** Modus Ponens: $P, P\to Q \vdash Q$. Modus Tollens: $\neg Q, P\to Q \vdash \neg P$. Resolution: $P\vee Q, \neg P\vee R \vdash Q\vee R$

| | Forward Chaining | Backward Chaining |
|-|-----------------|-------------------|
| Direction | Data $\to$ Goal | Goal $\to$ Data |
| Use case | Monitoring | Diagnosis |
| Example | CLIPS | Prolog |

**Bayes:** $P(H|E)=\frac{P(E|H)P(H)}{P(E)}$

**LLMs:** Good for NL understanding, code generation, few-shot learning. Limitations: hallucination, no true reasoning, no iterative search. Best as components in optimisation (suggest operators/initial solutions), not standalone optimisers.

---

### Key Formulas

| Formula | Description |
|---------|-------------|
| $P=e^{-\Delta/T}$ | SA acceptance probability |
| $P(i)=f_i/\sum f_j$ | Roulette wheel selection |
| $P_m=1/L$ | Default mutation rate |
| $\text{UCB}_i=\bar{x}_i+C\sqrt{\ln N/n_i}$ | Multi-armed bandit |
| $a\prec b$: $\forall i: f_i(a)\leq f_i(b)$, $\exists j: f_j(a)<f_j(b)$ | Pareto dominance |

---

### Key Traps

- HC finds **local** optimum only, not global
- SA: theoretical guarantee needs **infinite** time; in practice no guarantee
- NP-hard $\neq$ unsolvable (just no poly-time algorithm)
- Crossover $\neq$ mutation (crossover exploits, mutation explores)
- Standard crossover INVALID for permutations (use OX/PMX/CX)
- Hyper-heuristic $\neq$ metaheuristic (different search level)
- Without elitism, best solution CAN be lost
- High temperature SA $\to$ random walk (not better performance)
- Tabu aspiration criterion prevents over-restriction
- Dominance: "at least as good in ALL" not "strictly better in all"
- LAHC $L_{fa}=1$ = hill climbing (not random walk)
- Neighbourhood structure defines the landscape
