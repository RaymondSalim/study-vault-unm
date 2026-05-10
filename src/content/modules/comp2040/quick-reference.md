---
title: "Quick Reference"
order: 90
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["reference", "formulas"]
---

## The Chomsky Hierarchy

| Type | Language Class | Grammar Restriction | Recogniser |
|------|--------------|--------------------|-----------| 
| 3 | Regular | $A \to aB$, $A \to a$ | DFA/NFA |
| 2 | Context-Free | $A \to \gamma$ | PDA |
| 1 | Context-Sensitive | $|\alpha| \leq |\beta|$ | LBA |
| 0 | Recursively Enumerable | Unrestricted | TM |

## Key Formal Definitions

| Object | Tuple |
|--------|-------|
| DFA | $(Q, \Sigma, \delta, q_0, F)$ with $\delta: Q \times \Sigma \to Q$ |
| NFA | $(Q, \Sigma, \delta, q_0, F)$ with $\delta: Q \times (\Sigma \cup \{\varepsilon\}) \to \mathcal{P}(Q)$ |
| PDA | $(Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$ with $\delta: Q \times (\Sigma \cup \{\varepsilon\}) \times \Gamma \to \mathcal{P}(Q \times \Gamma^*)$ |
| CFG | $(V, T, P, S)$ with $P: A \to \gamma$ |
| TM | $(Q, \Sigma, \Gamma, \delta, q_0, B, F)$ with $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L,R\}$ |

## Equivalences

| These are equivalent |
|---------------------|
| DFA ↔ NFA ↔ RE (all define regular languages) |
| CFG ↔ PDA (both define context-free languages) |
| TM ↔ Lambda calculus ↔ Recursive functions |

## Closure Properties

| Operation | Regular | Context-Free |
|-----------|---------|-------------|
| Union | ✓ | ✓ |
| Intersection | ✓ | ✗ |
| Complement | ✓ | ✗ |
| Concatenation | ✓ | ✓ |
| Kleene star | ✓ | ✓ |

## Pumping Lemma (Regular)

If $L$ is regular, $\exists p$: $\forall w \in L$ with $|w| \geq p$, $\exists$ split $w = xyz$:
1. $|y| > 0$
2. $|xy| \leq p$
3. $\forall i \geq 0: xy^iz \in L$

## RE Operator Precedence

$* > \text{concatenation} > +$

## Key Algorithms

| Algorithm | Purpose | Complexity |
|-----------|---------|-----------|
| Subset construction | NFA → DFA | $O(2^n)$ states worst case |
| Table-filling | DFA minimisation | $O(n^2)$ |
| Thompson's construction | RE → NFA | Linear in RE size |
| State elimination | DFA → RE | $O(n^3)$ |

## Decidability Quick Reference

| Problem | Decidable? |
|---------|-----------|
| Is $w \in L(M)$ for DFA $M$? | Yes (simulate) |
| Is $L(M) = \emptyset$ for DFA? | Yes (reachability) |
| Is $L(M_1) = L(M_2)$ for DFAs? | Yes (minimise & compare) |
| Is $w \in L(G)$ for CFG $G$? | Yes (CYK algorithm) |
| Is $L(G) = \emptyset$ for CFG? | Yes |
| Does TM $M$ halt on $w$? | No (halting problem) |
| Is $L(M_1) = L(M_2)$ for TMs? | No (Rice's theorem) |
