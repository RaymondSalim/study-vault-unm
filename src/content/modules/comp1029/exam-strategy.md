---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["exam", "strategy", "haskell", "prolog", "paradigms"]
---

## Time Allocation

- **Total exam time:** Typically 2 hours
- **Reading time:** First 5 minutes — note which questions are Haskell vs Prolog
- **Code tracing (Haskell):** 5-10 minutes each (follow reduction steps)
- **Code writing (Haskell):** 10-15 minutes each
- **Prolog query tracing:** 10 minutes each (draw search trees)
- **Prolog program writing:** 10-15 minutes each
- **Comparison/theory questions:** 10 minutes each
- **Buffer:** 10 minutes for review

## Topic Weighting

| Topic | Approximate Weight | Priority |
|-------|-------------------|----------|
| Functional Basics (Haskell) | 15% | High |
| Lists and Recursion (Haskell) | 20% | High |
| Higher-Order Functions | 15% | High |
| Types and Type Classes | 10% | Medium |
| Prolog Basics (facts, rules, queries) | 15% | High |
| Prolog Lists and Recursion | 15% | High |
| Paradigm Comparison | 10% | Medium |

## Question Types to Expect

- **Code tracing (Haskell):** Evaluate expressions step by step (e.g., "What does `foldr (+) 0 [1,2,3]` evaluate to?")
- **Code writing (Haskell):** Write functions using recursion, map/filter/fold, list comprehensions
- **Type inference:** Determine the type of a given Haskell expression
- **Prolog query tracing:** Given facts/rules, determine what a query returns (draw unification/backtracking)
- **Prolog program writing:** Write rules to express relationships (e.g., ancestor, member, append)
- **Comparison essay:** Compare paradigms — advantages and disadvantages of functional vs logic vs imperative

## Key Things to Memorise

1. Haskell list operations: `head`, `tail`, `++`, `:`, `length`, `take`, `drop`, `reverse`
2. Higher-order functions: `map`, `filter`, `foldr`, `foldl`, `zip`, `zipWith`
3. List comprehension syntax: `[expr | x <- list, guard]`
4. Haskell type syntax: `::`, `->`, type variables (a, b), constraints (Eq a =>)
5. Prolog list pattern: `[H|T]`, empty list `[]`
6. Prolog built-in predicates: `member/2`, `append/3`, `length/2`
7. Unification rules: constants unify with themselves, variables unify with anything, compound terms unify if functor and arity match and all arguments unify
8. How backtracking works (search tree traversal, left-to-right, depth-first)
9. Currying: `f x y` is `(f x) y`
10. Lambda syntax: `\x -> body`

## Night Before Checklist

1. ☐ Can you write a recursive Haskell function over lists (e.g., length, reverse, filter)?
2. ☐ Can you use map, filter, and foldr to solve problems?
3. ☐ Do you understand currying and partial application?
4. ☐ Can you write list comprehensions with generators and guards?
5. ☐ Can you determine the type of a Haskell expression?
6. ☐ Can you define Prolog facts and rules for family relationships?
7. ☐ Can you trace a Prolog query showing unification and backtracking?
8. ☐ Can you write recursive Prolog predicates over lists (member, append, reverse)?
9. ☐ Do you understand the cut (!) and how it affects backtracking?
10. ☐ Can you compare functional, logic, and imperative paradigms with concrete examples?
