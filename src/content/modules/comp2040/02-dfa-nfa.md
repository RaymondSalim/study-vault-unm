---
title: "DFAs & NFAs"
order: 2
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["DFA", "NFA", "finite-automata", "regular"]
---

## Deterministic Finite Automata (DFA)

A DFA is a 5-tuple $M = (Q, \Sigma, \delta, q_0, F)$:

| Component | Meaning |
|-----------|---------|
| $Q$ | Finite set of states |
| $\Sigma$ | Input alphabet |
| $\delta: Q \times \Sigma \to Q$ | Transition function (total, deterministic) |
| $q_0 \in Q$ | Start state |
| $F \subseteq Q$ | Set of accepting (final) states |

### Key Properties
- Exactly **one** transition per (state, symbol) pair
- Always in exactly **one** state
- Reads input left to right, one symbol at a time
- Accepts if ends in a final state after reading entire input

### Extended Transition Function

$\hat{\delta}(q, \varepsilon) = q$

$\hat{\delta}(q, wa) = \delta(\hat{\delta}(q, w), a)$

**Language**: $L(M) = \{w \in \Sigma^* \mid \hat{\delta}(q_0, w) \in F\}$

## Nondeterministic Finite Automata (NFA)

An NFA is a 5-tuple $M = (Q, \Sigma, \delta, q_0, F)$ where:

$$\delta: Q \times (\Sigma \cup \{\varepsilon\}) \to \mathcal{P}(Q)$$

| DFA vs NFA | DFA | NFA |
|-----------|-----|-----|
| $\delta$ output | Single state | Set of states |
| $\varepsilon$-transitions | No | Yes |
| Determinism | Must have exactly one transition | Can have 0, 1, or many |
| Acceptance | End in accepting state | **Any** reachable accepting state |

### NFA Computation

An NFA accepts $w$ if there **exists** at least one path from $q_0$ to some $q_f \in F$ on input $w$.

Think of it as exploring all branches simultaneously — accept if any branch accepts.

## NFA → DFA: Subset Construction

**Theorem**: Every NFA has an equivalent DFA (recognises the same language).

### Algorithm

| Step | Action |
|------|--------|
| 1 | Start state of DFA = $\varepsilon$-closure of NFA start state |
| 2 | For each DFA state $S$ and symbol $a$: new state = $\varepsilon\text{-closure}(\bigcup_{q \in S} \delta(q, a))$ |
| 3 | A DFA state is accepting if it contains any NFA accepting state |
| 4 | Repeat until no new states |

### $\varepsilon$-closure

$\varepsilon\text{-closure}(q)$ = set of all states reachable from $q$ using only $\varepsilon$-transitions (including $q$ itself).

### Worst Case

NFA with $n$ states → DFA with up to $2^n$ states (exponential blowup).

**Lazy subset construction**: Only construct states that are actually reachable.

<details>
<summary>Practice: Can a DFA have 0 accepting states?</summary>

Yes — such a DFA accepts no words at all. $L(M) = \emptyset$, which is a valid regular language.
</details>

<details>
<summary>Practice: If an NFA has 3 states, what is the maximum number of states in the equivalent DFA?</summary>

$2^3 = 8$ states (each subset of the NFA's state set becomes a DFA state). In practice, many subsets may be unreachable.
</details>
