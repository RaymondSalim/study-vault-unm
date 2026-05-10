---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP2040 - Languages and Computation"
tags: ["exam", "strategy", "revision", "tips"]
---

# Exam Strategy

## Time Allocation

| Section | Approx. Weight | Suggested Time (2hr exam) |
|---------|---------------|--------------------------|
| DFA/NFA construction & conversion | 25% | 30 min |
| Regular expressions & Pumping Lemma | 20% | 24 min |
| CFGs & PDAs | 25% | 30 min |
| Turing machines & decidability | 20% | 24 min |
| Conceptual/short answer | 10% | 12 min |

## Topic Weighting

1. **DFA/NFA** -- Almost always tested: construct, convert (subset construction), minimise
2. **Pumping Lemma** -- Proof questions are common; know the structure precisely
3. **CFGs** -- Derivations, ambiguity, designing grammars for given languages
4. **PDAs** -- Transition diagrams, relationship to CFGs
5. **Turing Machines** -- Describe TM for simple languages, decidability arguments

## Common Question Types

- **Construct a DFA/NFA** accepting a described language
- **Convert NFA to DFA** using subset construction
- **Prove a language is not regular** using the Pumping Lemma
- **Write a CFG** for a given context-free language
- **Design a PDA** with transition diagrams
- **Describe a TM** that decides a given language
- **Determine** whether a language is regular, context-free, or neither
- **State and prove closure properties**

## Key Formulas & Structures

| Item | Description |
|------|-------------|
| Pumping Lemma (regular): w = xyz, |xy| <= p, |y| >= 1, xy^i z in L | Must hold for ALL valid decompositions |
| Pumping Lemma (CFL): w = uvxyz, |vxy| <= p, |vy| >= 1, uv^i xy^i z in L | Pump both v and y simultaneously |
| Subset construction: DFA state = set of NFA states | Transitions: delta'(S, a) = union of delta(q, a) for all q in S |
| DFA minimisation: distinguish non-equivalent states | Use table-filling algorithm or Myhill-Nerode equivalence classes |
| CFG to CNF: A -> BC or A -> a | Chomsky Normal Form for CYK parsing |

## Exam Approach Tips

1. **For DFA construction** -- identify what information the automaton needs to "remember" (think of states as memory)
2. **For Pumping Lemma proofs** -- choose the string carefully (usually the simplest one that forces a contradiction), consider ALL valid decompositions
3. **For NFA-to-DFA** -- systematically track epsilon-closures at each step; use a table
4. **For CFG design** -- start with the overall structure, then handle sub-parts recursively
5. **Label everything clearly** -- states, transitions, stack operations, tape movements

## Night Before Top 10 Checklist

1. Practice one NFA-to-DFA subset construction end-to-end (3-4 NFA states)
2. Do one Pumping Lemma proof (e.g., prove {a^n b^n | n >= 0} is not regular)
3. Write a CFG for a language like {a^n b^m | n >= m >= 0}
4. Construct a PDA for a balanced-parentheses language
5. Know all closure properties: regular (closed under union, intersection, complement, concatenation, star), CFL (closed under union, concatenation, star; NOT intersection or complement)
6. Be able to draw a Turing machine state diagram for a simple language
7. Memorise the Chomsky hierarchy with machine equivalences
8. Review epsilon-closure computation procedure
9. Understand why the halting problem is undecidable (diagonalisation argument)
10. Practice determining language class: given a language, argue whether it is regular, CF, or neither
