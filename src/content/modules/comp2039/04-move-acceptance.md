---
title: "Move Acceptance Methods"
order: 4
moduleTitle: "COMP2039 - AI Methods"
tags: ["move-acceptance", "threshold", "great-deluge", "parameter-setting"]
---

## Move Acceptance in Local Search

:::eli10

After a search algorithm creates a new candidate solution, it needs to decide: "Should I switch to this new answer, or keep my current one?" Move acceptance is the rule for making that decision. The simplest rule is "only accept improvements," but smarter rules sometimes accept slightly worse solutions to help escape traps.

:::

:::eli15

Move acceptance is the decision rule that determines whether to adopt a new candidate solution s' over the current solution s. It's the key mechanism that separates hill climbing (accept only improvements) from metaheuristics (can accept worsening moves). Different acceptance methods make this decision using different criteria: comparing to the current solution (SA, threshold accepting), comparing to a decreasing bound (Great Deluge), comparing to the best known (Record-to-Record), or comparing to a historical value (Late Acceptance). The choice of acceptance method significantly affects search behaviour — the balance between exploration and exploitation.

:::

:::eli20

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

:::

## Move Acceptance Methods

:::eli10

There are many rules for deciding whether to keep a new answer. "Only improving" only accepts better answers (gets stuck easily). Simulated Annealing flips a weighted coin. Threshold accepting allows answers that are "not too much worse." Great Deluge sets a water level that slowly rises — any answer above water is okay. Each method has different strengths.

:::

:::eli15

The main acceptance methods form a spectrum from strict (only improvements) to permissive (accept anything). SA uses probabilistic acceptance based on worsening magnitude and temperature. Threshold Accepting is a deterministic version of SA — accept if the worsening is below a threshold that decreases over time. Great Deluge compares against an absolute bound rather than the current solution. Record-to-Record allows moves within a fixed deviation of the best-ever. Late Acceptance compares against a historical fitness value from several iterations ago. Each trades off simplicity versus effectiveness differently.

:::

:::eli20

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

:::

## Simulated Annealing Acceptance

:::eli10

SA acceptance is like flipping a biased coin when you find a worse answer. If the temperature is high (early search), the coin is nearly fair — you'll probably accept it anyway. As the temperature drops, the coin becomes more biased against bad moves. Eventually you almost never accept worse answers.

:::

:::eli15

SA acceptance always accepts improvements but accepts worsenings probabilistically. The probability depends on how much worse the new solution is (delta) and the current temperature T. Large delta (big worsening) or low T gives low acceptance probability. This means early in the search (high T), the algorithm explores freely; late in the search (low T), it converges like hill climbing. The randomness helps escape local optima without a fixed direction.

:::

:::eli20

$$P(\text{accept}) = \begin{cases} 1 & \text{if } \Delta \leq 0 \\ e^{-\Delta/T} & \text{if } \Delta > 0 \end{cases}$$

where $\Delta = f(s') - f(s)$ (minimisation).

:::

## Threshold Accepting (TA)

:::eli10

Threshold accepting is simpler than SA — no randomness. It says: "I'll accept any answer that's not more than X worse than what I have." X (the threshold) starts big (you're tolerant) and gradually shrinks to zero (eventually you only accept improvements). It's completely deterministic — same moves always give same result.

:::

:::eli15

Threshold Accepting (TA) is a deterministic alternative to SA. It accepts a move if the worsening is less than a threshold value theta, which decreases over time (linearly or geometrically). There's no random number generation in the acceptance decision — making it faster and more reproducible than SA. The threshold starts high (permissive) and decreases to zero (strict). It's simpler to implement and has fewer parameters, while achieving comparable performance to SA on many problems.

:::

:::eli20

Accept if worsening is within threshold:

$$\text{Accept if } f(s') - f(s) < \theta$$

- $\theta$ decreases over time (linear or geometric)
- Simpler than SA (no randomness in acceptance)
- Deterministic given same sequence of neighbours

:::

## Great Deluge Algorithm (GDA)

:::eli10

Imagine your landscape is flooding and the water level is rising. You can move to any nearby position as long as it's above water. Early on, the water is low so you can go almost anywhere. As it rises, you're forced higher and higher — eventually you're on the tallest peak you can reach. That's the Great Deluge Algorithm — the "water level" is a bound that gradually tightens.

:::

:::eli15

The Great Deluge Algorithm maintains a "level" B that starts above the initial fitness and decreases linearly over time. A move is accepted if the new solution's fitness is below this level (for minimisation) — regardless of whether it's better or worse than the current solution. This is fundamentally different from SA/TA which compare against the current solution. Early on, B is high so almost anything is accepted. In the middle, B is close to the current fitness, and late on, only improvements pass. The algorithm has just two parameters: starting level and decay rate.

:::

:::eli20

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

:::

## Record-to-Record Travel (RR)

:::eli10

Record-to-Record Travel keeps track of the best answer ever found and accepts any new answer that isn't too far from that record. It's like saying "I'll try anything that's within 10 points of my personal best." This lets you explore solutions near the best without wandering too far away.

:::

:::eli15

Record-to-Record Travel accepts any move whose fitness is within a fixed deviation D of the best solution found so far (the "record"). Unlike SA or TA which compare to the current solution, RR compares to the global best. This means if you're far from the record, only significant improvements will be accepted; if you're near the record, you have more freedom to explore nearby. It's simple with just one parameter, but the deviation is static rather than decreasing — which can limit convergence.

:::

:::eli20

Accept if solution is within deviation $D$ of the **best** found so far:

$$\text{Accept if } f(s') - f^* < D$$

where $f^*$ is the record (best known).

:::

## Late Acceptance Hill Climbing (LAHC)

:::eli10

LAHC remembers your fitness from many steps ago and accepts anything better than that old value. It's like saying "I'll accept this move if it's better than where I was 1000 steps ago." This allows the search to get temporarily worse (since your current value might be below where you were before) while still making long-term progress.

:::

:::eli15

Late Acceptance Hill Climbing (LAHC) maintains a list of fitness values from previous iterations. Instead of comparing the candidate to the current solution, it compares to the fitness stored L_fa steps ago. This creates an implicit, self-adapting threshold: if the search has been improving, the old values are worse and acceptance is easy; if the search is stagnating, old and current values converge, making acceptance stricter. With list length 1, it reduces to basic hill climbing. Larger lists make it more permissive. It's a simple, single-parameter method that works surprisingly well.

:::

:::eli20

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

:::

## Comparison of Methods

:::eli10

Each acceptance method has a different number of settings you need to choose (parameters). More parameters give you more control but are harder to tune. SA uses randomness; most others are deterministic. Some remember past solutions (memory); others don't.

:::

:::eli15

The acceptance methods differ in parameters (complexity of configuration), use of randomness (reproducibility), and memory usage. SA is the most well-known but requires tuning temperature and cooling rate and is non-deterministic. TA is a simpler deterministic alternative. GDA only compares to a fixed declining level. RR and LAHC use different forms of memory. In practice, no single method dominates all problems — the best choice depends on the problem structure, time budget, and need for reproducibility.

:::

:::eli20

| Method | Parameters | Randomness in acceptance | Memory |
|--------|-----------|--------------------------|--------|
| OI/IE | 0 | None | None |
| SA | $T_0, \alpha$ | Yes | None |
| TA | $\theta_0$, decay | None | None |
| GDA | $B_0, \Delta B$ | None | None (just level) |
| RR | $D$ | None | Record $f^*$ |
| LAHC | $L_{\text{fa}}$ | None | Fitness list |

:::

## Parameter Setting

:::eli10

Every algorithm has settings (parameters) you need to choose — like temperature in SA or tenure in Tabu Search. Getting these right is tricky. You can try different values by hand, test many combinations systematically, or let the algorithm adjust its own settings as it runs (self-adaptive). Good parameters start exploratory (generous) and become focused (strict) over time.

:::

:::eli15

Parameter setting is a key challenge in metaheuristics. Approaches range from manual tuning (trial and error, simple but labour-intensive) through grid search (exhaustive but computationally expensive) to statistical methods like irace (efficient automated tuning). Parameters can also be controlled during the run: deterministically (fixed schedule), adaptively (based on search feedback), or self-adaptively (encoded within solutions). Best practices include starting with high exploration, gradually increasing exploitation, testing on multiple problem instances to avoid overfitting, and using statistical tests to confirm that performance differences are significant.

:::

:::eli20

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

:::
