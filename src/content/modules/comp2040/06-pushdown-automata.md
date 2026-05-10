---
title: "Pushdown Automata"
order: 6
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["PDA", "pushdown", "context-free", "stack"]
---

## PDA vs FA

| Feature | Finite Automaton | Pushdown Automaton |
|---------|-----------------|-------------------|
| Memory | None (just current state) | Unbounded stack |
| Power | Regular languages | Context-free languages |
| Determinism | DFA = NFA (same power) | DPDA < NPDA (different power!) |

## Formal Definition

A PDA is a 7-tuple $P = (Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$:

| Component | Meaning |
|-----------|---------|
| $Q$ | Finite set of states |
| $\Sigma$ | Input alphabet |
| $\Gamma$ | Stack alphabet |
| $\delta: Q \times (\Sigma \cup \{\varepsilon\}) \times \Gamma \to \mathcal{P}(Q \times \Gamma^*)$ | Transition function |
| $q_0$ | Start state |
| $Z_0 \in \Gamma$ | Initial stack symbol |
| $F \subseteq Q$ | Accepting states |

### Transition Meaning

$\delta(q, a, X) \ni (p, \gamma)$ means: in state $q$, reading $a$ (or $\varepsilon$), with $X$ on top of stack → move to state $p$, replace $X$ with $\gamma$.

| $\gamma$ | Stack action |
|----------|-------------|
| $\varepsilon$ | Pop $X$ |
| $X$ | Leave stack unchanged |
| $YX$ | Push $Y$ (keeping $X$) |
| $YZ$ | Replace $X$ with $Z$, push $Y$ |

## Acceptance Methods

| Method | Accepts when |
|--------|-------------|
| Final state | Input consumed AND in accepting state |
| Empty stack | Input consumed AND stack is empty |

**Theorem**: Both methods are equivalent — any language accepted by one method can be accepted by the other (with a different PDA).

## Instantaneous Descriptions (IDs)

A configuration $(q, w, \gamma)$ represents:
- Current state $q$
- Remaining input $w$
- Stack contents $\gamma$ (leftmost = top)

**One-step relation**: $(q, aw, X\beta) \vdash (p, w, \alpha\beta)$ if $\delta(q, a, X) \ni (p, \alpha)$

## Example: $L = \{a^nb^n \mid n \geq 1\}$

| State | Input | Stack top | Action |
|-------|-------|-----------|--------|
| $q_0$ | $a$ | $Z_0$ | Push $A$: $(q_0, AZ_0)$ |
| $q_0$ | $a$ | $A$ | Push $A$: $(q_0, AA)$ |
| $q_0$ | $b$ | $A$ | Pop: $(q_1, \varepsilon)$ |
| $q_1$ | $b$ | $A$ | Pop: $(q_1, \varepsilon)$ |
| $q_1$ | $\varepsilon$ | $Z_0$ | Accept: $(q_2, Z_0)$ |

**Trace** for $aabb$: $(q_0, aabb, Z_0) \vdash (q_0, abb, AZ_0) \vdash (q_0, bb, AAZ_0) \vdash (q_1, b, AZ_0) \vdash (q_1, \varepsilon, Z_0) \vdash (q_2, \varepsilon, Z_0)$ ✓

## DPDA vs NPDA

| | DPDA | NPDA |
|-|------|------|
| At most one move per (state, input, stack top) | Yes | No |
| Power | Subset of CFLs | All CFLs |
| Example only NPDA can handle | $\{ww^R\}$ | — |

<details>
<summary>Practice: Why can't a DFA recognise {a^n b^n}?</summary>

A DFA has finite states and no auxiliary storage. To verify $n$ $a$'s match $n$ $b$'s for arbitrary $n$, it would need to "count" — but with finite states it can only count up to a fixed bound. A PDA uses the stack to count.
</details>

<details>
<summary>Practice: Design a PDA for {w ∈ {a,b}* | w has equal number of a's and b's}.</summary>

Use stack to track imbalance:
- Read $a$: if top = $B$, pop; else push $A$
- Read $b$: if top = $A$, pop; else push $B$
- Accept by empty stack (when initial symbol also popped/handled)

The stack height represents the absolute difference |#a - #b|.
</details>
