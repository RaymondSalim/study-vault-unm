---
title: "Flashcards"
order: 92
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["flashcards", "revision", "haskell", "prolog", "paradigms"]
---

## Key Concept Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is functional programming? | A paradigm where programs are built from pure functions, avoiding mutable state and side effects. |
| 2 | What is a pure function? | A function whose output depends only on its inputs and produces no side effects (no mutation, no I/O). |
| 3 | What is referential transparency? | An expression can be replaced by its value without changing program behaviour — a consequence of purity. |
| 4 | What is pattern matching in Haskell? | A mechanism for deconstructing data by matching against patterns; used in function definitions and case expressions. |
| 5 | What is a recursive function in Haskell? | A function defined in terms of itself with a base case; the primary iteration mechanism in functional programming. |
| 6 | What is a list in Haskell? | A homogeneous, singly-linked sequence; constructed with `:` (cons) and `[]` (empty list). [1,2,3] = 1:2:3:[]. |
| 7 | What does `map` do? | Applies a function to every element of a list, returning a new list of results. map f [x1,x2,...] = [f x1, f x2,...]. |
| 8 | What does `filter` do? | Returns a new list containing only elements that satisfy a predicate. filter p xs = [x | x <- xs, p x]. |
| 9 | What does `foldr` do? | Reduces a list from the right using a binary function and an accumulator: foldr f z [a,b,c] = f a (f b (f c z)). |
| 10 | What is a higher-order function? | A function that takes another function as an argument or returns a function as its result. |
| 11 | What is currying? | Transforming a multi-argument function into a sequence of single-argument functions. In Haskell, all functions are curried by default. |
| 12 | What is a type class in Haskell? | An interface that defines a set of functions that can be implemented for different types (e.g., Eq, Ord, Show). |
| 13 | What is lazy evaluation? | Expressions are not evaluated until their results are needed; enables working with infinite data structures. |
| 14 | What is a lambda expression in Haskell? | An anonymous function: `\x -> x + 1` is a function that adds 1 to its argument. |
| 15 | What is list comprehension in Haskell? | Syntactic sugar for generating lists: [expr | generators, guards]. e.g., [x*2 | x <- [1..5], even x]. |
| 16 | What is logic programming? | A paradigm where programs are expressed as facts and rules; computation proceeds by querying and logical inference. |
| 17 | What is a fact in Prolog? | An unconditional assertion that something is true: e.g., `parent(tom, bob).` |
| 18 | What is a rule in Prolog? | A conditional statement: `Head :- Body.` means Head is true if Body is true. |
| 19 | What is unification in Prolog? | The process of finding variable substitutions that make two terms identical. |
| 20 | What is backtracking in Prolog? | When a goal fails, Prolog undoes variable bindings and tries alternative clauses to find a solution. |
| 21 | What is a Prolog list? | Represented as [Head|Tail] where Head is the first element and Tail is the remaining list; [] is empty. |
| 22 | What is the cut (!) in Prolog? | A control mechanism that prevents backtracking past the point where the cut was placed. |
| 23 | What is the difference between declarative and imperative programming? | Declarative describes what to compute (Haskell, Prolog); imperative describes how to compute step by step (Java, C). |
| 24 | What is function composition in Haskell? | Combining functions with `.`: (f . g) x = f (g x). Applies g first, then f to the result. |
| 25 | What is the type signature `Int -> Int -> Int`? | A function taking two Int arguments and returning an Int (due to currying, it takes one Int and returns a function Int -> Int). |
