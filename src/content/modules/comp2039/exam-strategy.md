---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP2039 - Artificial Intelligence Methods"
tags: ["exam", "strategy", "revision", "tips"]
---

# Exam Strategy

## Time Allocation

| Section | Approx. Weight | Suggested Time (2hr exam) |
|---------|---------------|--------------------------|
| Search & local search | 20% | 24 min |
| Metaheuristics (SA, tabu) | 20% | 24 min |
| Evolutionary algorithms | 30% | 36 min |
| Hyper-heuristics | 15% | 18 min |
| Knowledge & reasoning | 15% | 18 min |

## Topic Weighting

1. **Evolutionary Algorithms** -- Most likely to have a multi-part question (representation, operators, trace through generations)
2. **Hill Climbing & Metaheuristics** -- Expect a comparison question or trace through SA with calculations
3. **Hyper-heuristics** -- Conceptual understanding, classification, examples
4. **Move Acceptance** -- Understanding different acceptance criteria and their properties
5. **Knowledge Representation** -- Forward/backward chaining, rule-based reasoning

## Common Question Types

- **Trace a GA** through 2-3 generations given initial population, fitness, crossover and mutation operators
- **Calculate SA acceptance probability** given temperature and delta values
- **Compare two metaheuristics** -- strengths, weaknesses, when to apply each
- **Design a representation** for a given problem (encoding, operators, fitness function)
- **Classify hyper-heuristics** and explain selection/generation approaches
- **Apply forward/backward chaining** to a rule base

## Key Formulas

| Formula | Description |
|---------|-------------|
| SA acceptance: P = exp(-deltaE / T) | Probability of accepting a worse solution in simulated annealing |
| Fitness proportionate: P(i) = f(i) / sum(f) | Probability of selecting individual i based on fitness |
| Tournament selection: P(best) = 1 - (1-1/k)^k | Approximate probability of selecting the best from k candidates |
| Mutation rate typical: 1/L | Where L is chromosome length; ensures ~1 bit flip per individual |
| Schema theorem: m(H,t+1) >= m(H,t) x f(H)/f_avg | Expected number of schema representatives grows proportionally to above-average fitness |

## Exam Approach Tips

1. **Show the fitness calculation** at each step when tracing an EA
2. **Draw the search space** if discussing local optima and operator effects
3. **Be precise with terminology** -- genotype vs phenotype, exploitation vs exploration
4. **For comparison questions**, use a structured table format (criterion | method A | method B)
5. **When designing a representation**, explicitly state: encoding, fitness function, operators, and termination condition

## Night Before Top 10 Checklist

1. Trace a genetic algorithm by hand: selection (tournament), one-point crossover, bit-flip mutation
2. Calculate SA acceptance probability for 3 different temperature values
3. List the classification of hyper-heuristics (selection vs generation, online vs offline)
4. Know the difference between intensification and diversification strategies
5. Explain why elitism helps and when it might hinder
6. Understand tabu list management: what goes in, tenure, aspiration criteria
7. Be able to define and compare at least 3 move acceptance methods
8. Know the No Free Lunch theorem and its implications
9. Review forward and backward chaining with a small rule base example
10. Memorise the key components of an EA: population, selection, variation operators, replacement
