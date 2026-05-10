---
title: "Prerequisites"
order: 96
moduleTitle: "COMP2067 - Introduction to Formal Reasoning"
tags: ["prerequisites", "preparation", "self-assessment"]
---

# Prerequisites

## Required Background Knowledge

| Area | Topics Needed | Why |
|------|---------------|-----|
| Basic Logic | AND, OR, NOT, truth tables, implication | Foundation for propositional and predicate logic |
| Set Theory | Sets, membership, subset, basic operations | Domains in predicate logic, structural definitions |
| Mathematical Proof | Basic proof structure, if-then reasoning | Natural deduction formalises proof construction |
| Recursion Concepts | Recursive definitions, base case + recursive case | Needed for structural induction proofs |

## Helpful Prior Modules

- **COMP1015 - Mathematical Foundations** -- Sets, logic basics, proof techniques, induction
- **COMP1012 - Programming** -- Boolean expressions, recursive thinking
- **Any Discrete Maths module** -- Formal reasoning, proof by induction
- **COMP2040 - Languages & Computation** -- Formal definitions, proof structure (if taken concurrently)

## Key Concepts You Should Already Know

1. How truth tables work for AND, OR, NOT
2. What an implication (if P then Q) means
3. Basic set notation (element-of, subset, union, intersection)
4. What mathematical induction is (base case + inductive step)
5. How to read and write formal mathematical statements

## Self-Assessment Test

Answer these before starting the module. If you struggle with more than 2, review the prerequisites first.

| # | Question | Expected Answer |
|---|----------|-----------------|
| 1 | What is the truth value of "If 2+2=5 then pigs can fly"? | True (a false antecedent makes any implication true) |
| 2 | Simplify NOT (A AND B) using De Morgan's law. | (NOT A) OR (NOT B) |
| 3 | Prove by induction that 1+2+...+n = n(n+1)/2 (state base case). | Base case: n=1, LHS=1, RHS=1(2)/2=1. They are equal. |
| 4 | What does "for all x, P(x)" mean? | P(x) is true for every possible value of x in the domain |
| 5 | Is the statement "If it rains, the ground is wet" the same as "If the ground is wet, it rained"? | No -- the second is the converse, not the original. The contrapositive ("If the ground is not wet, it did not rain") is equivalent. |
