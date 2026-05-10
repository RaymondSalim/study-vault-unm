---
title: "Move Acceptance Methods"
order: 4
moduleTitle: "COMP2039 - AI Methods"
tags: ["move-acceptance", "threshold", "great-deluge", "parameter-setting"]
---

## Move Acceptance in Local Search

After generating a candidate solution $s'$ from current $s$, the **move acceptance** method decides whether to adopt $s'$.

### General Framework

```
1. s ← InitialSolution()
2. Repeat:
   a. s' ← GenerateNeighbour(s)
   b. If AcceptanceMethod(s, s', parameters):
      s ← s'
   c. UpdateParameters()
3. Return best found
```

## Move Acceptance Methods

| Method | Accept if... | Parameters |
|--------|-------------|------------|
| Only Improving (OI) | $f(s') \leq f(s)$ | None |
| Improving & Equal (IE) | $f(s') \leq f(s)$ | None |
| SA | $\Delta \leq 0$ or $r < e^{-\Delta/T}$ | $T$, cooling schedule |
| Threshold Accepting (TA) | $f(s') - f(s) < \theta$ | Threshold $\theta$ |
| Great Deluge (GD) | $f(s') < B$ (level/bound) | $B$, decay rate |
| Record-to-Record (RR) | $f(s') - f^* < D$ | Deviation $D$ |
| Late Acceptance (LAHC) | $f(s') < L[v]$ (historical) | List length $L_{\text{fa}}$ |
| All Moves (AM) | Always | None |

## Simulated Annealing Acceptance

$$P(\text{accept}) = \begin{cases} 1 & \text{if } \Delta \leq 0 \\ e^{-\Delta/T} & \text{if } \Delta > 0 \end{cases}$$

where $\Delta = f(s') - f(s)$ (minimisation).

## Threshold Accepting (TA)

Accept if worsening is within threshold:

$$\text{Accept if } f(s') - f(s) < \theta$$

- $\theta$ decreases over time (linear or geometric)
- Simpler than SA (no randomness in acceptance)
- Deterministic given same sequence of neighbours

## Great Deluge Algorithm (GDA)

Maintain a **level** (water level) $B$:

$$\text{Accept if } f(s') < B$$

- $B$ starts above initial $f(s)$ and decreases linearly
- $B = B - \Delta B$ each iteration
- Only requires $f(s')$ to be below the level — does not compare to current

### GDA Behaviour

| Phase | Level relative to fitness | Effect |
|-------|--------------------------|--------|
| Early | $B \gg f(s)$ | Accept almost anything |
| Middle | $B \approx f(s)$ | Selective acceptance |
| Late | $B \ll f(s)$ | Only improvements accepted |

## Record-to-Record Travel (RR)

Accept if solution is within deviation $D$ of the **best** found so far:

$$\text{Accept if } f(s') - f^* < D$$

where $f^*$ is the record (best known).

## Late Acceptance Hill Climbing (LAHC)

Compares candidate to a historical fitness value:

```
1. Initialise list L[0..Lfa-1] = f(s₀)
2. v = 0
3. Repeat:
   a. Generate s' ∈ N(s)
   b. If f(s') ≤ L[v mod Lfa]:
      s ← s'
   c. L[v mod Lfa] = f(s)  [update with current]
   d. v = v + 1
```

| List length $L_{\text{fa}}$ | Behaviour |
|------------------------------|-----------|
| Small (e.g., 1) | Equivalent to OI/IE |
| Large (e.g., 50000) | More permissive, allows more worsening |

## Comparison of Methods

| Method | Parameters | Randomness in acceptance | Memory |
|--------|-----------|--------------------------|--------|
| OI/IE | 0 | None | None |
| SA | $T_0, \alpha$ | Yes | None |
| TA | $\theta_0$, decay | None | None |
| GDA | $B_0, \Delta B$ | None | None (just level) |
| RR | $D$ | None | Record $f^*$ |
| LAHC | $L_{\text{fa}}$ | None | Fitness list |

## Parameter Setting

### Approaches

| Approach | Description | Pros/Cons |
|----------|-------------|-----------|
| Manual tuning | Trial and error | Simple but time-consuming |
| Grid search | Test all combinations | Exhaustive but expensive |
| Racing (F-race) | Statistical elimination | Efficient |
| irace | Iterated racing | State-of-the-art |
| Self-adaptive | Parameters evolve during search | No offline tuning needed |

### Parameter Control Taxonomy

| Type | Description | Example |
|------|-------------|---------|
| Deterministic | Change by fixed rule | $T_{k+1} = 0.95 T_k$ |
| Adaptive | Change based on feedback | Increase tenure if cycling |
| Self-adaptive | Encoded in solution | Mutation rate in GA |

### Good Practice

| Guideline | Reason |
|-----------|--------|
| Start with high exploration | Avoid premature convergence |
| Gradually reduce exploration | Focus on refinement |
| Test on multiple instances | Avoid over-fitting to one |
| Use statistical tests | Confirm significance of differences |

<details><summary>Practice: GDA with B=500, candidate f(s')=480. Accept?</summary>

Yes. Great Deluge accepts if $f(s') < B$. Since $480 < 500$, the move is accepted regardless of the current solution's fitness.

</details>

<details><summary>Practice: Which acceptance method has no parameters?</summary>

**Only Improving (OI)** and **Improving & Equal (IE)** have zero parameters — they deterministically accept improvements only.

However, they are just hill climbing and get stuck at local optima. The trade-off: more parameters = more flexibility but harder to tune.

</details>

<details><summary>Practice: LAHC with Lfa=1. What does this reduce to?</summary>

With list length 1, LAHC compares the candidate to the fitness stored one iteration ago — which is just the current solution's fitness (since we update L immediately). This is equivalent to **Only Improving / Hill Climbing**.

As $L_{\text{fa}} \to \infty$, LAHC becomes increasingly permissive (comparing to very old, likely worse fitness values).

</details>
