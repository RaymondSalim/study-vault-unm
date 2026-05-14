---
title: "Evolutionary Algorithms I"
order: 5
moduleTitle: "COMP2039 - AI Methods"
tags: ["genetic-algorithms", "selection", "crossover", "mutation", "evolutionary"]
---

## Evolutionary Algorithms (EAs)

:::eli10

Evolutionary algorithms are inspired by nature's evolution. You start with a "population" of random solutions (like animals). The best ones are more likely to have "children" (be selected as parents). Children are made by mixing two parents together (crossover) and adding random changes (mutation). Over many generations, the population gets better and better — survival of the fittest!

:::

:::eli15

Evolutionary Algorithms (EAs) are population-based metaheuristics inspired by Darwinian evolution. Instead of improving a single solution, they maintain a population of solutions that evolves over generations. Each iteration involves selection (fitter individuals are more likely to become parents), crossover (combining two parents to create offspring that inherit traits from both), and mutation (random changes to maintain diversity). Over time, the population converges toward high-quality solutions. Key terms: individual = one solution, chromosome = solution encoding, gene = one variable, fitness = objective function value, generation = one cycle.

:::

:::eli20

Population-based metaheuristics inspired by natural evolution.

### Key Concepts

| Concept | Biological analogy | In EA |
|---------|-------------------|-------|
| Individual | Organism | A candidate solution |
| Population | Species | Set of solutions |
| Chromosome | DNA | Solution encoding |
| Gene | Single trait | One variable/position |
| Fitness | Survival ability | Objective function value |
| Generation | One lifecycle | One iteration |

:::

## Genetic Algorithm (GA) Framework

:::eli10

A genetic algorithm works in a loop: (1) choose the best solutions as parents, (2) mix parents together to make children, (3) randomly change a few things in the children, (4) check how good the children are, and (5) let the children become the new population. Keep looping until you run out of time or find a good-enough answer.

:::

:::eli15

The GA follows a simple loop: initialise a random population, then repeat: select parents (biased toward fitter individuals), apply crossover to pairs of parents with probability Pc to create offspring, apply mutation to offspring with probability Pm, evaluate their fitness, and form the next generation via a replacement strategy. Key parameters are population size (50-200, balancing diversity and computation), crossover rate (0.6-0.9, driving exploitation), and mutation rate (typically 1/chromosome_length, maintaining exploration). The algorithm returns the best individual ever found.

:::

:::eli20

```
1. Initialise population P of N individuals (random)
2. Evaluate fitness of each individual
3. Repeat until stopping condition:
   a. Selection: choose parents from P
   b. Crossover: combine parents → offspring (prob Pc)
   c. Mutation: randomly alter offspring (prob Pm)
   d. Evaluate offspring fitness
   e. Replacement: form new population
4. Return best individual found
```

### Parameters

| Parameter | Typical value | Effect |
|-----------|---------------|--------|
| Population size $N$ | 50–200 | Diversity vs computation |
| Crossover rate $P_c$ | 0.6–0.9 | Exploitation |
| Mutation rate $P_m$ | 1/L or 0.01–0.05 | Exploration |
| Generations | 100–1000+ | Computation budget |

:::

## Selection Methods

:::eli10

Selection decides which solutions get to be parents. It's like a talent show — better performers are more likely to advance, but even weaker ones might get lucky. Tournament selection picks a few random contestants and the best one wins. Roulette wheel gives everyone a chance proportional to their score. The goal is to favour good solutions without completely ignoring the rest.

:::

:::eli15

Selection determines which individuals become parents, creating evolutionary pressure toward better solutions. Roulette wheel assigns probability proportional to fitness (simple but can be dominated by one super-fit individual). Tournament selection randomly picks k individuals and selects the best — adjusting k controls pressure (k=2 is the common default). Rank-based selection uses fitness rank instead of raw value, avoiding scaling issues. The selection pressure must balance exploitation (favouring the best) and exploration (maintaining diversity) — too much pressure causes premature convergence; too little makes evolution too slow.

:::

:::eli20

Selection chooses parents for reproduction — fitter individuals should have higher probability.

| Method | Mechanism | Pressure |
|--------|-----------|----------|
| Roulette Wheel | Probability $\propto$ fitness | Variable |
| Tournament ($k$) | Best of $k$ random individuals | Adjustable via $k$ |
| Rank-based | Probability $\propto$ rank | Moderate, consistent |
| Truncation | Top $\tau\%$ only | Very high |
| Stochastic Universal Sampling | Evenly-spaced pointers on wheel | Low variance |

### Roulette Wheel Selection

Probability of selecting individual $i$:

$$P(i) = \frac{f_i}{\sum_{j=1}^{N} f_j}$$

**Problem**: Dominated by super-fit individuals (premature convergence). Sensitive to fitness scaling.

### Tournament Selection

```
1. Randomly pick k individuals from population
2. Return the fittest among them
```

| Tournament size $k$ | Selection pressure |
|--------------------|-------------------|
| $k = 2$ | Low (common default) |
| $k = N$ | Maximum (always selects best) |
| $k = 1$ | Zero (random selection) |

Probability best individual is selected:

$$P(\text{best selected}) = 1 - \left(1 - \frac{1}{N}\right)^k$$

### Rank-Based Selection

1. Sort population by fitness
2. Assign selection probability based on rank (not raw fitness)
3. Eliminates scaling issues of roulette wheel

:::

## Crossover Operators

:::eli10

Crossover is like combining two recipes to make a new one. You take a piece from parent A and a piece from parent B and stitch them together. For simple binary strings, you just cut and swap halves. For routes (like TSP), it's trickier because you can't have the same city twice — so special operators exist that mix parents while keeping every city exactly once.

:::

:::eli15

Crossover combines genetic material from two parents to create offspring, exploiting existing good building blocks. For binary representations: one-point crossover swaps tails at a random cut point; two-point swaps the middle segment; uniform crossover independently selects each bit from either parent. For permutation representations (TSP, scheduling), standard crossover creates invalid solutions with duplicates. Specialised operators like Order Crossover (OX), PMX, and Cycle Crossover preserve validity by ensuring each element appears exactly once in offspring.

:::

:::eli20

Crossover combines genetic material from two parents to produce offspring.

### For Binary/Integer Representations

| Operator | Description |
|----------|-------------|
| One-point | Split at one random point; swap tails |
| Two-point | Split at two points; swap middle |
| Uniform | Each bit from random parent (prob 0.5) |

#### One-Point Crossover

```
Parent 1: 1 0 1 1 | 0 0 1
Parent 2: 0 1 0 0 | 1 1 0
                    ↓
Child 1:  1 0 1 1 | 1 1 0
Child 2:  0 1 0 0 | 0 0 1
```

#### Uniform Crossover

```
Mask:     1 0 1 0 1 1 0
Parent 1: A B C D E F G
Parent 2: a b c d e f g
Child:    A b C d E F g
```

### For Permutation Representations

Standard crossover creates invalid solutions (duplicates). Use specialised operators:

| Operator | Description |
|----------|-------------|
| Order Crossover (OX) | Copy segment from P1; fill remaining in order from P2 |
| Partially Mapped (PMX) | Copy segment; map remaining via correspondence |
| Cycle Crossover (CX) | Identify cycles between parents; alternate |
| Edge Recombination (ERX) | Preserve edges from both parents |

#### Order Crossover (OX) Example

```
P1: 1 2 | 3 4 5 | 6 7 8 9
P2: 5 4 | 6 9 2 | 1 7 8 3

Child: _ _ | 3 4 5 | _ _ _ _
Fill from P2 (after cut point, skipping 3,4,5):
P2 order after segment: 1 7 8 3 5 4 6 9 2 → remove {3,4,5} → 1 7 8 6 9 2
Child: 8 6 | 3 4 5 | 9 2 1 7
```

:::

## Mutation Operators

:::eli10

Mutation is like making small random changes — flipping a coin, swapping two items, or adding a bit of noise. It keeps the population from getting too same-y. Without mutation, the population might lose important variety and get permanently stuck. But too much mutation turns the search into random guessing.

:::

:::eli15

Mutation introduces random variation to prevent the population from converging prematurely and losing diversity. The appropriate operator depends on the representation: bit-flip for binary strings, random reset for integers, Gaussian noise for real values, and swap/insert/inversion for permutations. The mutation rate Pm is typically set to 1/L (chromosome length), meaning on average one gene is mutated per individual. This maintains a balance — enough diversity to explore without destroying good solutions. Crossover exploits existing good structures; mutation creates genuinely new ones. Both are needed.

:::

:::eli20

Mutation introduces random variation — maintains diversity.

### By Representation

| Representation | Operator | Description |
|----------------|----------|-------------|
| Binary | Bit flip | Flip with probability $P_m$ per bit |
| Integer | Random reset | Change to random valid value |
| Real-valued | Gaussian | Add $N(0, \sigma)$ noise |
| Permutation | Swap | Swap two random positions |
| Permutation | Insert | Remove and reinsert elsewhere |
| Permutation | Inversion | Reverse a random subsequence |

### Mutation Rate

$$P_m = \frac{1}{L}$$

where $L$ = chromosome length. This flips ~1 gene per individual on average.

:::

## Replacement (Survivor Selection)

:::eli10

After creating children, you need to decide who makes it into the next generation. Generational replacement throws out all parents and keeps only children. Steady-state replaces just one or two worst individuals. Elitism always keeps the best solution from the previous generation — making sure you never lose your best answer. Elitism is almost always a good idea.

:::

:::eli15

Replacement (survivor selection) determines which individuals persist into the next generation. Generational replacement creates an entirely new population from offspring. Steady-state replaces only 1-2 individuals per iteration (slower generational change but faster per-generation computation). Elitism copies the best k individuals directly to the next generation, guaranteeing the best solution is never lost — this is almost always beneficial. Evolution strategies use specific notation: (mu + lambda) selects the best mu from both parents and offspring; (mu, lambda) selects only from offspring (allowing extinction of good solutions, which aids exploration).

:::

:::eli20

| Strategy | Description |
|----------|-------------|
| Generational | Entire population replaced by offspring |
| Steady-state | Replace 1-2 worst individuals per generation |
| Elitism | Always keep best $k$ from previous generation |
| $(\mu + \lambda)$ | Best $\mu$ from parents + offspring |
| $(\mu, \lambda)$ | Best $\mu$ from offspring only ($\lambda > \mu$) |

**Elitism** is almost always beneficial — ensures best solution is never lost.

<details><summary>Practice: Population of fitnesses [10, 20, 30, 40]. Roulette wheel P(select individual 3)?</summary>

$$P(3) = \frac{30}{10 + 20 + 30 + 40} = \frac{30}{100} = 0.30$$

Individual 3 has 30% selection probability.

Note: Individual 4 (fitness 40) has 40% — already 4x more likely than individual 1.

</details>

<details><summary>Practice: Why can't you use one-point crossover for TSP?</summary>

TSP solutions are permutations — each city appears exactly once. Standard one-point crossover:

```
P1: [1 2 3 | 4 5]
P2: [3 5 1 | 2 4]
Child: [1 2 3 | 2 4]  ← Invalid! City 2 appears twice, city 5 missing.
```

Must use permutation-preserving operators (OX, PMX, CX, ERX).

</details>

<details><summary>Practice: What happens if mutation rate is too high or too low?</summary>

| Rate | Effect |
|------|--------|
| Too high | Disrupts good solutions; becomes random search |
| Too low | Population converges; loses diversity; premature convergence |
| $1/L$ | Good default — changes ~1 gene per individual |

Crossover exploits existing building blocks; mutation explores new ones. Both are needed.

</details>

:::
