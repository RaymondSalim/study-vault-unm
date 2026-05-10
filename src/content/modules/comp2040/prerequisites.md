---
title: "Prerequisites"
order: 96
moduleTitle: "COMP2040 - Languages and Computation"
tags: ["prerequisites", "preparation", "self-assessment"]
---

# Prerequisites

## Required Background Knowledge

| Area | Topics Needed | Why |
|------|---------------|-----|
| Discrete Mathematics | Sets, functions, relations, proof techniques | Formal language definitions, automata are defined set-theoretically |
| Logic | Propositional logic, basic proof structure | Pumping Lemma proofs require careful logical reasoning |
| Basic Graph Theory | Directed graphs, paths, reachability | Automata are essentially labelled directed graphs |
| Mathematical Notation | Summation, exponentiation, set builder notation | Reading and writing formal definitions |

## Helpful Prior Modules

- **COMP1015 - Mathematical Foundations** -- Sets, relations, functions, proof by contradiction/induction
- **COMP1013 - Algorithms & Data Structures** -- Graph traversal, stacks (needed for PDA understanding)
- **Any Programming module** -- Understanding of grammars from language syntax
- **MATH modules** -- Formal proof writing and logical reasoning

## Key Concepts You Should Already Know

1. Set operations (union, intersection, complement, Cartesian product)
2. What a function is (domain, codomain, injective, surjective)
3. Proof by contradiction
4. Proof by induction
5. Basic graph terminology (nodes, edges, paths, cycles)

## Self-Assessment Test

Answer these before starting the module. If you struggle with more than 2, review the prerequisites first.

| # | Question | Expected Answer |
|---|----------|-----------------|
| 1 | If A = {1,2,3} and B = {2,3,4}, what is A intersect B? | {2, 3} |
| 2 | Prove that the square root of 2 is irrational (outline the method). | Proof by contradiction: assume sqrt(2) = p/q in lowest terms, then 2q^2 = p^2, so p is even, but then q must also be even, contradicting "lowest terms." |
| 3 | What is the power set of {a, b}? | {{}, {a}, {b}, {a,b}} -- has 2^2 = 4 elements |
| 4 | In a directed graph, what is a path? | A sequence of vertices where each consecutive pair is connected by a directed edge. |
| 5 | What does it mean for a function to be injective (one-to-one)? | f(a) = f(b) implies a = b; no two distinct inputs map to the same output. |
