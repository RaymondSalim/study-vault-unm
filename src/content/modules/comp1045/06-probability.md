---
title: "Probability"
order: 6
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["probability", "bayes-theorem", "conditional-probability", "independence"]
---

# Probability

## Axioms of Probability

:::eli10

Probability is a way of measuring how likely something is to happen, as a number between 0 (impossible) and 1 (certain). All possible outcomes together have probability 1. If two events cannot both happen at once, you can add their probabilities.

:::

:::eli15

Probability is built on three axioms: every event has probability >= 0 (non-negativity), the entire sample space has probability 1 (normalization), and for mutually exclusive events, the probability of their union is the sum of their individual probabilities (additivity). From these three axioms, all other probability rules can be derived, including the complement rule and the general addition rule.

:::

:::eli20

For sample space $\Omega$ and event $A \subseteq \Omega$:

| Axiom | Statement |
|-------|-----------|
| Non-negativity | $P(A) \geq 0$ |
| Normalization | $P(\Omega) = 1$ |
| Additivity | If $A \cap B = \emptyset$, then $P(A \cup B) = P(A) + P(B)$ |

:::

## Key Rules

:::eli10

The complement rule says the probability of something NOT happening is 1 minus the probability it does happen. The addition rule says for "A or B," add their probabilities but subtract the overlap (otherwise you count it twice).

:::

:::eli15

Key probability rules follow from the axioms. The complement rule: P(not A) = 1 - P(A). The general addition rule: P(A or B) = P(A) + P(B) - P(A and B), subtracting the intersection to avoid double-counting. For mutually exclusive events (cannot both occur), the intersection is zero so you just add. The inclusion-exclusion principle extends this to three or more events.

:::

:::eli20

| Rule | Formula |
|------|---------|
| Complement | $P(A') = 1 - P(A)$ |
| Union (general) | $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ |
| Union (mutually exclusive) | $P(A \cup B) = P(A) + P(B)$ |
| Inclusion-exclusion (3 events) | $P(A \cup B \cup C) = \sum P - \sum P(\text{pairs}) + P(A \cap B \cap C)$ |

:::

## Conditional Probability

:::eli10

Conditional probability answers: "given that one thing has already happened, how likely is another thing?" If you know it is raining, the probability of needing an umbrella changes. The formula divides the probability of both happening by the probability of the given event.

:::

:::eli15

Conditional probability P(A|B) is the probability of A given that B has occurred. It is computed as P(A and B) / P(B). The multiplication rule rearranges this: P(A and B) = P(A|B) * P(B). The chain rule extends this to multiple events: P(A and B and C) = P(A) * P(B|A) * P(C|A and B). Conditional probability is the foundation for Bayes' theorem and many real-world applications.

:::

:::eli20

$$P(A|B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

| Property | Formula |
|----------|---------|
| Multiplication rule | $P(A \cap B) = P(A|B) \cdot P(B)$ |
| Chain rule | $P(A \cap B \cap C) = P(A) \cdot P(B|A) \cdot P(C|A \cap B)$ |

:::

## Independence

:::eli10

Two events are independent if knowing one happened does not change the probability of the other. Flipping a coin twice: the second flip does not care what the first one was. Mathematically, independent events satisfy P(A and B) = P(A) times P(B).

:::

:::eli15

Events A and B are independent if knowing B occurred does not change the probability of A: P(A|B) = P(A), equivalently P(A and B) = P(A)P(B). Pairwise independence (every pair is independent) does not guarantee mutual independence (all subsets factor). This distinction matters when dealing with three or more events -- you need the stronger mutual independence condition for most applications.

:::

:::eli20

Events $A$ and $B$ are **independent** iff:

$$P(A \cap B) = P(A) \cdot P(B)$$

Equivalently: $P(A|B) = P(A)$.

| Type | Condition |
|------|-----------|
| Pairwise independent | $P(A_i \cap A_j) = P(A_i)P(A_j)$ for all pairs |
| Mutually independent | All subset intersections factor (stronger condition) |

> **Warning:** Pairwise independence does NOT imply mutual independence.

:::

## Law of Total Probability

:::eli10

If you can split all possibilities into non-overlapping groups that cover everything, you can find the probability of any event by adding up its probability within each group (weighted by how likely each group is). It is like computing a weighted average.

:::

:::eli15

The law of total probability lets you compute P(A) by conditioning on a partition of the sample space. If {B1, B2, ..., Bn} covers all possibilities (mutually exclusive and exhaustive), then P(A) = sum of P(A|Bi)P(Bi). This is useful when A is hard to compute directly but easy to compute conditional on each Bi. It is also the denominator in Bayes' theorem.

:::

:::eli20

If $\{B_1, B_2, \ldots, B_n\}$ is a partition of $\Omega$ (mutually exclusive, exhaustive):

$$P(A) = \sum_{i=1}^{n} P(A|B_i) P(B_i)$$

:::

## Bayes' Theorem

:::eli10

Bayes' theorem lets you flip a conditional probability around. If you know the probability of a symptom given a disease, Bayes' theorem tells you the probability of the disease given the symptom. It updates your belief using new evidence.

:::

:::eli15

Bayes' theorem "inverts" conditional probabilities: given P(evidence|hypothesis), it computes P(hypothesis|evidence). The formula combines the prior probability (your belief before evidence), the likelihood (how probable the evidence is under the hypothesis), and the total evidence probability. A famous example: even with a highly accurate medical test, a positive result may still have a low probability of actually indicating disease if the disease is rare (the base rate matters).

:::

:::eli20

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

:::

## Combinatorial Probability

:::eli10

Counting methods help you figure out probabilities when there are many equally likely outcomes. Permutations count arrangements where order matters (like race finishing positions). Combinations count selections where order does not matter (like choosing team members).

:::

:::eli15

Combinatorial probability uses counting techniques to compute probabilities for equally likely outcomes. Permutations (n!) count ordered arrangements. k-permutations count ordered selections of k items from n. Combinations (n choose k) count unordered selections. With replacement, selections can repeat (n^k ordered). The key is matching the counting method to whether order matters and whether repetition is allowed.

:::

:::eli20

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

:::
