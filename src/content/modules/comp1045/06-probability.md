---
title: "Probability"
order: 6
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["probability", "bayes-theorem", "conditional-probability", "independence"]
---

# Probability

## Axioms of Probability

For sample space $\Omega$ and event $A \subseteq \Omega$:

| Axiom | Statement |
|-------|-----------|
| Non-negativity | $P(A) \geq 0$ |
| Normalization | $P(\Omega) = 1$ |
| Additivity | If $A \cap B = \emptyset$, then $P(A \cup B) = P(A) + P(B)$ |

## Key Rules

| Rule | Formula |
|------|---------|
| Complement | $P(A') = 1 - P(A)$ |
| Union (general) | $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ |
| Union (mutually exclusive) | $P(A \cup B) = P(A) + P(B)$ |
| Inclusion-exclusion (3 events) | $P(A \cup B \cup C) = \sum P - \sum P(\text{pairs}) + P(A \cap B \cap C)$ |

## Conditional Probability

$$P(A|B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

| Property | Formula |
|----------|---------|
| Multiplication rule | $P(A \cap B) = P(A|B) \cdot P(B)$ |
| Chain rule | $P(A \cap B \cap C) = P(A) \cdot P(B|A) \cdot P(C|A \cap B)$ |

## Independence

Events $A$ and $B$ are **independent** iff:

$$P(A \cap B) = P(A) \cdot P(B)$$

Equivalently: $P(A|B) = P(A)$.

| Type | Condition |
|------|-----------|
| Pairwise independent | $P(A_i \cap A_j) = P(A_i)P(A_j)$ for all pairs |
| Mutually independent | All subset intersections factor (stronger condition) |

> **Warning:** Pairwise independence does NOT imply mutual independence.

## Law of Total Probability

If $\{B_1, B_2, \ldots, B_n\}$ is a partition of $\Omega$ (mutually exclusive, exhaustive):

$$P(A) = \sum_{i=1}^{n} P(A|B_i) P(B_i)$$

## Bayes' Theorem

$$P(B_i|A) = \frac{P(A|B_i) P(B_i)}{\sum_{j=1}^{n} P(A|B_j) P(B_j)}$$

### Two-event form:

$$P(B|A) = \frac{P(A|B) \cdot P(B)}{P(A|B) \cdot P(B) + P(A|B') \cdot P(B')}$$

### Interpretation

| Term | Name | Meaning |
|------|------|---------|
| $P(B)$ | Prior | Belief before evidence |
| $P(A|B)$ | Likelihood | Probability of evidence given hypothesis |
| $P(B|A)$ | Posterior | Updated belief after evidence |
| $P(A)$ | Evidence | Normalising constant |

## Combinatorial Probability

| Counting Method | Formula | Order matters? | Repetition? |
|----------------|---------|---------------|-------------|
| Permutation | $n!$ | Yes | No |
| $k$-permutation | $\frac{n!}{(n-k)!}$ | Yes | No |
| Combination | $\binom{n}{k} = \frac{n!}{k!(n-k)!}$ | No | No |
| With replacement | $n^k$ | Yes | Yes |

---

<details>
<summary><strong>Practice: Bayes' Theorem</strong></summary>

**Q:** A disease affects 1% of the population. A test has 95% sensitivity (true positive rate) and 90% specificity (true negative rate). If a person tests positive, what is the probability they have the disease?

**A:** Let $D$ = has disease, $+$ = tests positive.

- $P(D) = 0.01$, $P(D') = 0.99$
- $P(+|D) = 0.95$ (sensitivity)
- $P(+|D') = 0.10$ (1 - specificity)

$$P(D|+) = \frac{P(+|D)P(D)}{P(+|D)P(D) + P(+|D')P(D')} = \frac{0.95 \times 0.01}{0.95 \times 0.01 + 0.10 \times 0.99}$$

$$= \frac{0.0095}{0.0095 + 0.099} = \frac{0.0095}{0.1085} \approx 0.0876$$

Only about 8.8% chance of actually having the disease despite a positive test.

</details>

<details>
<summary><strong>Practice: Independence</strong></summary>

**Q:** Two dice are rolled. Let $A$ = "sum is 7" and $B$ = "first die is 3". Are $A$ and $B$ independent?

**A:**
- $P(A) = 6/36 = 1/6$
- $P(B) = 6/36 = 1/6$
- $P(A \cap B) = P(\text{first is 3 and sum is 7}) = P((3,4)) = 1/36$
- $P(A) \cdot P(B) = 1/6 \times 1/6 = 1/36$

Since $P(A \cap B) = P(A)P(B)$, events are **independent**.

</details>

<details>
<summary><strong>Practice: Total Probability</strong></summary>

**Q:** Factory has 3 machines. Machine A produces 50% of items (2% defect), B produces 30% (3% defect), C produces 20% (5% defect). What is the probability a random item is defective?

**A:**
$$P(D) = P(D|A)P(A) + P(D|B)P(B) + P(D|C)P(C)$$
$$= 0.02(0.5) + 0.03(0.3) + 0.05(0.2) = 0.01 + 0.009 + 0.01 = 0.029$$

Probability: 2.9%.

</details>
