---
title: "Prerequisites"
order: 96
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["prerequisites", "preparation", "haskell", "prolog", "paradigms"]
---

## What You Need to Know Before Starting

### Essential Prior Knowledge

- **Programming fundamentals:** Variables, conditionals, loops, functions (in any language)
- **Recursion basics:** Understanding how a function can call itself (at minimum, factorial/Fibonacci)
- **Basic data structures:** Arrays/lists and how to iterate over them
- **Mathematical functions:** The concept of a function as a mapping from inputs to outputs
- **Logical reasoning:** Understanding of AND, OR, NOT, implications (if-then)

### Helpful But Not Required

- Experience with any typed language (Java, C, TypeScript)
- Exposure to mathematics notation (sets, formal logic)
- Prior experience with the command line / terminal
- Any exposure to functional concepts (lambdas in Python/Java, list comprehensions)

### Prior Modules That Help

- **COMP1028 - Programming and Algorithms:** Provides essential programming foundations (especially recursion and method-based thinking)
- **COMP1017 - Mathematics for Computer Scientists 1:** Logic, sets, and functions directly map to concepts in both Haskell and Prolog
- **COMP1027 - Computer Fundamentals:** Boolean logic section provides groundwork for Prolog

## Quick Self-Test

Answer these 5 questions to check your readiness:

1. **Recursion:** What is the base case for computing factorial(n)?
   - *Expected answer: factorial(0) = 1 (or factorial(1) = 1)*

2. **Functions:** If f(x) = x + 1 and g(x) = x * 2, what is f(g(3))?
   - *Expected answer: 7 (g(3) = 6, then f(6) = 7)*

3. **Lists:** Given the list [5, 3, 8, 1], what is the first element and what remains?
   - *Expected answer: First = 5, remaining = [3, 8, 1]*

4. **Logic:** If "rains(today)" is true and the rule is "wet(X) :- rains(X)", is "wet(today)" true?
   - *Expected answer: Yes*

5. **Types:** What type would a function that takes two integers and returns a boolean have?
   - *Expected answer: Something like (Int, Int) -> Bool or int -> int -> bool*

**Scoring:** If you got 4-5 correct, you are well prepared. If fewer than 3, revise recursion and basic function concepts from your introductory programming module before starting.
