---
title: "Pumping Lemma & Non-Regular Languages"
order: 5
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["pumping-lemma", "non-regular", "proof"]
---

## Proving Languages NOT Regular

:::eli10

Some languages are too complicated for DFAs to handle. The pumping lemma is like a test: if a language fails this test, it is definitely too hard for a DFA. It works by showing that any DFA would eventually have to repeat itself, and that repeating part should still give valid words -- if it does not, the language cannot be regular.

:::

:::eli15

The pumping lemma is a tool for proving a language is NOT regular. It exploits the pigeonhole principle: since a DFA has finite states, any sufficiently long input must revisit a state, creating a loop. That loop can be "pumped" (repeated any number of times) and the resulting string must still be in the language. If you can find a string where no valid pumping works, the language cannot be regular.

:::

:::eli20

The pumping lemma provides a **necessary** condition for regularity. If a language fails the pumping lemma, it is NOT regular.

:::

## The Pumping Lemma for Regular Languages

:::eli10

The rule says: if a language is regular, then every long-enough word in it has a middle section that can be repeated (or removed) and the result is still in the language. If you find even one word where this fails no matter how you pick the middle section, the language is not regular.

:::

:::eli15

Formally, if L is regular there exists a pumping length p such that any word w in L of length at least p can be split as w = xyz where: y is non-empty, xy has length at most p, and for every i >= 0, xy^i z is still in L. To prove non-regularity, you assume regularity, pick a clever word, and show that every valid split fails to pump.

:::

:::eli20

If $L$ is regular, then there exists a pumping length $p$ such that any $w \in L$ with $|w| \geq p$ can be split as $w = xyz$ where:

| Condition | Meaning |
|-----------|---------|
| $|y| > 0$ | $y$ is non-empty |
| $|xy| \leq p$ | Pump section is in first $p$ characters |
| $\forall i \geq 0: xy^iz \in L$ | Pumping $y$ any number of times stays in $L$ |

:::

## Proof Strategy (by contradiction)

:::eli10

The proof works like a game. You assume the language is regular, then challenge the "opponent" to split a carefully chosen word. No matter how they split it, you show the pumping breaks the language rules. Since every split fails, your assumption must have been wrong -- the language is not regular.

:::

:::eli15

The proof is adversarial: you assume regularity (so the pumping lemma applies), then choose a specific word that is hard to pump. Your "opponent" (the lemma) gets to choose the split xyz subject to the constraints. You must show that for EVERY valid split, there exists some pump count i where xy^i z leaves the language. If you succeed for all splits, you have a contradiction.

:::

:::eli20

| Step | Action |
|------|--------|
| 1 | Assume $L$ is regular |
| 2 | Then pumping lemma applies: $\exists p$ |
| 3 | Choose a specific $w \in L$ with $|w| \geq p$ (adversarial choice) |
| 4 | Consider ALL possible splits $w = xyz$ satisfying conditions 1 & 2 |
| 5 | Show that for each valid split, $\exists i$ such that $xy^iz \notin L$ |
| 6 | Contradiction → $L$ is not regular |

:::

## Classic Example: $L = \{a^nb^n \mid n \geq 0\}$

:::eli10

The language "equal number of a's then b's" cannot be handled by any DFA because the machine would need to count how many a's it has seen (to match with b's), but it only has a limited number of states so it cannot count forever. The pumping lemma proof makes this precise.

:::

:::eli15

To prove {a^n b^n} is not regular: pick w = a^p b^p. The constraint |xy| <= p forces y to be entirely within the a-block. Pumping y (repeating it) increases a's without increasing b's, producing a string not in the language. This contradicts the pumping lemma, so the language cannot be regular.

:::

:::eli20

1. Assume $L$ is regular with pumping length $p$
2. Choose $w = a^pb^p$ (clearly in $L$, length $2p \geq p$)
3. Any split $w = xyz$ with $|xy| \leq p$ means $y = a^k$ for some $k > 0$ (entirely in the $a$-block)
4. Pump: $xy^2z = a^{p+k}b^p$. Since $k > 0$, we have more $a$'s than $b$'s → $\notin L$
5. Contradiction. $L$ is not regular.

:::

## Common Non-Regular Languages

:::eli10

Languages that require counting, remembering, or matching things typically are not regular. If you need to remember the whole first half to check the second half, a DFA cannot do it.

:::

:::eli15

Classic non-regular languages include: equal-count languages (a^n b^n), palindromes (ww^R), languages based on squares or primes. They all require some form of unbounded memory or counting that finite automata cannot provide. You can prove each non-regular using the pumping lemma or closure properties.

:::

:::eli20

| Language | Why not regular |
|---------|----------------|
| $\{a^nb^n \mid n \geq 0\}$ | Requires counting (unbounded memory) |
| $\{ww^R \mid w \in \Sigma^*\}$ | Requires remembering first half |
| $\{a^{n^2} \mid n \geq 0\}$ | Gap between squares grows |
| $\{a^p \mid p \text{ prime}\}$ | Primes have no periodic structure |

:::

## Closure Properties of Regular Languages

:::eli10

Regular languages are very well-behaved under operations. If you take two regular languages and combine them (union, intersection, etc.), you always get another regular language. This is useful because you can sometimes prove a language is not regular by showing that combining it with a known regular language would give something impossible.

:::

:::eli15

Regular languages are closed under union, intersection, complement, concatenation, Kleene star, reversal, and homomorphism. This means applying any of these operations to regular languages always yields another regular language. Closure properties provide an alternative proof technique for non-regularity: if L1 intersect L2 is non-regular and L1 is regular, then L2 must be non-regular.

:::

:::eli20

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

:::
