---
title: "Pushdown Automata"
order: 6
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["PDA", "pushdown", "context-free", "stack"]
---

## PDA vs FA

:::eli10

A pushdown automaton is like a DFA that also gets a stack of plates. It can push plates on top, peek at the top plate, or take the top plate off. This stack gives it memory to count and match things. For example, it can push a plate for every "a" it reads, then pop one for every "b" -- so it can check that a^n b^n matches perfectly.

:::

:::eli15

A PDA extends a finite automaton with an unbounded stack for memory. This lets it recognise context-free languages like balanced parentheses and a^n b^n, which require matching or counting. Unlike DFA vs NFA (same power), nondeterministic PDAs are strictly more powerful than deterministic ones. PDAs recognise exactly the context-free languages.

:::

:::eli20

| Feature | Finite Automaton | Pushdown Automaton |
|---------|-----------------|-------------------|
| Memory | None (just current state) | Unbounded stack |
| Power | Regular languages | Context-free languages |
| Determinism | DFA = NFA (same power) | DPDA < NPDA (different power!) |

:::

## Formal Definition

:::eli10

A PDA has states (like rooms), an input alphabet (the letters it reads), a stack alphabet (the labels on the plates), and rules that say "if I am in this room, reading this letter, with this plate on top, then I move to that room and change the plates." It also has a start state and accepting states, just like a DFA.

:::

:::eli15

A PDA is formally a 7-tuple: states, input alphabet, stack alphabet, transition function, start state, initial stack symbol, and accepting states. The transition function takes the current state, input symbol (or epsilon), and top of stack, and returns possible next states along with what to write on the stack. The stack allows push, pop, or replace operations depending on what the transition writes back.

:::

:::eli20

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

:::

## Acceptance Methods

:::eli10

A PDA can accept a word in two ways: by landing on a special "accept" state (like a DFA), or by emptying its stack completely. Both ways are equally powerful -- if you can build a PDA that accepts one way, you can always build another that accepts the other way.

:::

:::eli15

PDAs can accept by final state (end in an accepting state after consuming all input) or by empty stack (consume all input and have nothing left on the stack). These two methods are equivalent in power -- any language accepted by one method can be accepted by the other with a modified PDA. The choice is a matter of convenience for the particular language.

:::

:::eli20

| Method | Accepts when |
|--------|-------------|
| Final state | Input consumed AND in accepting state |
| Empty stack | Input consumed AND stack is empty |

**Theorem**: Both methods are equivalent — any language accepted by one method can be accepted by the other (with a different PDA).

:::

## Instantaneous Descriptions (IDs)

:::eli10

An instantaneous description is like a snapshot or photo of the PDA at one moment: what state it is in, what input is left to read, and what is currently on the stack. You can trace the PDA's behaviour by listing these snapshots one after another.

:::

:::eli15

An instantaneous description (ID) captures the complete configuration of a PDA at a point in time: the current state, the remaining unread input, and the full stack contents. The one-step relation shows how one ID transitions to the next. Tracing a sequence of IDs demonstrates whether a PDA accepts or rejects a given input.

:::

:::eli20

A configuration $(q, w, \gamma)$ represents:
- Current state $q$
- Remaining input $w$
- Stack contents $\gamma$ (leftmost = top)

**One-step relation**: $(q, aw, X\beta) \vdash (p, w, \alpha\beta)$ if $\delta(q, a, X) \ni (p, \alpha)$

:::

## Example: $L = \{a^nb^n \mid n \geq 1\}$

:::eli10

For matching a's and b's: push a marker onto the stack for every "a" you read, then pop one marker for every "b." If the stack empties perfectly when the word ends, you know the counts matched. It is like checking coat hangers -- one hanger per coat, and at the end there should be none left.

:::

:::eli15

The PDA for a^n b^n works by pushing a symbol for each "a" in a reading-a's state, then switching to a popping state when it sees the first "b." In the popping state it removes one symbol per "b." If the stack is empty exactly when the input finishes, the word is accepted. This demonstrates how the stack provides the counting ability that finite automata lack.

:::

:::eli20

| State | Input | Stack top | Action |
|-------|-------|-----------|--------|
| $q_0$ | $a$ | $Z_0$ | Push $A$: $(q_0, AZ_0)$ |
| $q_0$ | $a$ | $A$ | Push $A$: $(q_0, AA)$ |
| $q_0$ | $b$ | $A$ | Pop: $(q_1, \varepsilon)$ |
| $q_1$ | $b$ | $A$ | Pop: $(q_1, \varepsilon)$ |
| $q_1$ | $\varepsilon$ | $Z_0$ | Accept: $(q_2, Z_0)$ |

**Trace** for $aabb$: $(q_0, aabb, Z_0) \vdash (q_0, abb, AZ_0) \vdash (q_0, bb, AAZ_0) \vdash (q_1, b, AZ_0) \vdash (q_1, \varepsilon, Z_0) \vdash (q_2, \varepsilon, Z_0)$ ✓

:::

## DPDA vs NPDA

:::eli10

Unlike DFAs and NFAs (which are equally powerful), deterministic and nondeterministic PDAs are NOT the same. Some languages, like palindromes, need the guessing power of nondeterminism -- you have to guess where the middle of the word is, and a deterministic machine cannot do that.

:::

:::eli15

A DPDA has at most one possible move in any configuration, while an NPDA can have multiple choices. Unlike the DFA/NFA case, DPDAs are strictly weaker than NPDAs. The language of even-length palindromes {ww^R} is context-free (accepted by an NPDA that guesses the midpoint) but cannot be accepted by any DPDA. DPDAs correspond to a strict subset of context-free languages.

:::

:::eli20

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

:::
