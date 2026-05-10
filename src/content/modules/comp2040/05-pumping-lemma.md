---
title: "Pumping Lemma & Non-Regular Languages"
order: 5
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["pumping-lemma", "non-regular", "proof"]
---

## Proving Languages NOT Regular

The pumping lemma provides a **necessary** condition for regularity. If a language fails the pumping lemma, it is NOT regular.

## The Pumping Lemma for Regular Languages

If $L$ is regular, then there exists a pumping length $p$ such that any $w \in L$ with $|w| \geq p$ can be split as $w = xyz$ where:

| Condition | Meaning |
|-----------|---------|
| $|y| > 0$ | $y$ is non-empty |
| $|xy| \leq p$ | Pump section is in first $p$ characters |
| $\forall i \geq 0: xy^iz \in L$ | Pumping $y$ any number of times stays in $L$ |

## Proof Strategy (by contradiction)

| Step | Action |
|------|--------|
| 1 | Assume $L$ is regular |
| 2 | Then pumping lemma applies: $\exists p$ |
| 3 | Choose a specific $w \in L$ with $|w| \geq p$ (adversarial choice) |
| 4 | Consider ALL possible splits $w = xyz$ satisfying conditions 1 & 2 |
| 5 | Show that for each valid split, $\exists i$ such that $xy^iz \notin L$ |
| 6 | Contradiction → $L$ is not regular |

## Classic Example: $L = \{a^nb^n \mid n \geq 0\}$

1. Assume $L$ is regular with pumping length $p$
2. Choose $w = a^pb^p$ (clearly in $L$, length $2p \geq p$)
3. Any split $w = xyz$ with $|xy| \leq p$ means $y = a^k$ for some $k > 0$ (entirely in the $a$-block)
4. Pump: $xy^2z = a^{p+k}b^p$. Since $k > 0$, we have more $a$'s than $b$'s → $\notin L$
5. Contradiction. $L$ is not regular.

## Common Non-Regular Languages

| Language | Why not regular |
|---------|----------------|
| $\{a^nb^n \mid n \geq 0\}$ | Requires counting (unbounded memory) |
| $\{ww^R \mid w \in \Sigma^*\}$ | Requires remembering first half |
| $\{a^{n^2} \mid n \geq 0\}$ | Gap between squares grows |
| $\{a^p \mid p \text{ prime}\}$ | Primes have no periodic structure |

## Closure Properties of Regular Languages

| Operation | Closed? |
|-----------|---------|
| Union | Yes |
| Intersection | Yes |
| Complement | Yes |
| Concatenation | Yes |
| Kleene star | Yes |
| Reversal | Yes |
| Homomorphism | Yes |

These can also prove non-regularity: if $L_1 \cap L_2$ is non-regular and $L_1$ is regular, then $L_2$ must be non-regular.

<details>
<summary>Practice: Prove {0^n1^n0^n | n ≥ 0} is not regular.</summary>

1. Assume regular with pumping length $p$.
2. Choose $w = 0^p1^p0^p$.
3. $|xy| \leq p$, so $y = 0^k$ (in the first block of 0s), $k > 0$.
4. Pump down: $xy^0z = 0^{p-k}1^p0^p$. Now first block has fewer 0s than the third block → $\notin L$.
5. Contradiction. Not regular.
</details>

<details>
<summary>Practice: Can the pumping lemma prove a language IS regular?</summary>

No. The pumping lemma is only a necessary condition, not sufficient. Some non-regular languages satisfy the pumping conditions. To prove regularity, construct a DFA/NFA/RE.
</details>
