---
title: "Turing Machines & Decidability"
order: 8
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["turing-machine", "decidability", "halting-problem", "CSG"]
---

## Context-Sensitive Grammars (CSGs)

Productions: $\alpha \to \beta$ where $|\alpha| \leq |\beta|$ (non-contracting).

Exception: $S \to \varepsilon$ allowed only if $S$ doesn't appear on any RHS.

**Recogniser**: Linear Bounded Automaton (TM with tape limited to input length).

### Example: $L = \{a^nb^nc^n \mid n \geq 1\}$

This is context-sensitive but NOT context-free.

## Turing Machines

A TM is a 7-tuple $M = (Q, \Sigma, \Gamma, \delta, q_0, B, F)$:

| Component | Meaning |
|-----------|---------|
| $Q$ | Finite set of states |
| $\Sigma$ | Input alphabet ($B \notin \Sigma$) |
| $\Gamma$ | Tape alphabet ($\Sigma \subset \Gamma$, $B \in \Gamma$) |
| $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R\}$ | Transition function |
| $q_0$ | Start state |
| $B$ | Blank symbol |
| $F$ | Accepting states |

### Key Differences from PDA

| Feature | PDA | TM |
|---------|-----|-----|
| Read direction | Left to right only | Left AND right |
| Storage | Stack (LIFO) | Infinite tape (random access) |
| Write | Push/pop stack | Write to current cell |
| Halting | Always halts (on finite input) | May loop forever |

## Decidability

| Term | Definition |
|------|-----------|
| Decidable (recursive) | A TM exists that always halts (accepts or rejects) |
| Semi-decidable (r.e.) | A TM exists that halts and accepts if $w \in L$, but may loop if $w \notin L$ |
| Undecidable | No TM can decide the language |

## The Halting Problem

**Statement**: Given a TM $M$ and input $w$, does $M$ halt on $w$?

**Theorem**: The halting problem is undecidable.

**Proof sketch** (diagonalisation):
1. Assume TM $H$ decides halting: $H(M, w)$ = accept if $M$ halts on $w$, reject otherwise
2. Construct $D$: on input $M$, run $H(M, M)$; if $H$ accepts, loop forever; if $H$ rejects, accept
3. What does $D(D)$ do?
   - If $D$ halts on $D$ → $H$ accepts → $D$ loops. Contradiction.
   - If $D$ doesn't halt on $D$ → $H$ rejects → $D$ accepts (halts). Contradiction.
4. Therefore $H$ cannot exist.

## Church-Turing Thesis

Any "effectively computable" function can be computed by a Turing machine. (Not a theorem — a thesis/hypothesis.)

Equivalent models: Lambda calculus, recursive functions, Post systems, RAM machines.

## P vs NP

| Class | Definition |
|-------|-----------|
| P | Problems decidable in polynomial time by a deterministic TM |
| NP | Problems decidable in polynomial time by a nondeterministic TM |
| NP-complete | Hardest problems in NP (all NP problems reduce to these) |

Open question: Does $P = NP$?

<details>
<summary>Practice: Is the set of all valid Java programs decidable?</summary>

Yes — syntactic validity is decidable (it's context-free, actually). Whether a Java program **halts** is undecidable (reduction from the halting problem), but checking if it compiles is decidable.
</details>

<details>
<summary>Practice: Is the complement of a decidable language also decidable?</summary>

Yes. If TM $M$ decides $L$ (always halts), then swap accept/reject states to get a TM that decides $\overline{L}$.
</details>
