---
title: "Paradigm Comparison"
order: 7
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["paradigms", "imperative", "functional", "logic", "comparison"]
---

# Paradigm Comparison

## Overview of Paradigms

:::eli10

There are three big ways to write programs. Imperative (like Python) is like giving step-by-step cooking instructions. Functional (like Haskell) is like writing math formulas that transform inputs into outputs. Logic (like Prolog) is like stating clues and letting a detective figure out the answers. Each approach is better for different kinds of problems.

:::

:::eli15

The three main paradigms differ fundamentally in how they model computation. Imperative programming uses sequences of commands that modify state (variables change over time). Functional programming evaluates expressions without state changes (values are immutable, functions are pure). Logic programming declares relationships and lets the system search for solutions. Most modern languages blend paradigms -- Python has map/filter, Scala combines OOP and functional.

:::

:::eli20

| Aspect | Imperative (Python/C) | Functional (Haskell) | Logic (Prolog) |
|--------|----------------------|---------------------|----------------|
| Core idea | Sequence of commands | Evaluation of expressions | Declaration of relationships |
| Computation model | State transformation | Function application | Proof search |
| Key mechanism | Assignment, loops | Recursion, HOFs | Unification, backtracking |
| State | Mutable variables | Immutable bindings | Knowledge base |
| Control flow | Explicit (if/while/for) | Recursion, pattern matching | Automatic search |
| Side effects | Common | Restricted (pure) | Via assert/retract |
| Types | Often dynamic | Strong, static, inferred | Untyped (terms) |

:::

## The Same Problem in Three Paradigms

:::eli10

Here's the same problems solved three different ways. Notice how imperative uses loops and changing variables, functional uses recursion and pattern matching, and logic states what's true and lets Prolog figure out the calculation.

:::

:::eli15

Comparing the same algorithm across paradigms reveals their different approaches. Imperative uses loops with mutable state. Functional uses recursion with pattern matching (or higher-order functions like fold). Logic states base cases and recursive relationships, with Prolog handling the execution order. Each has trade-offs in readability, efficiency, and expressiveness for different problem types.

:::

:::eli20

### Factorial

```python
# Python (Imperative)
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
```

```haskell
-- Haskell (Functional)
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- Or with fold:
factorial n = foldl (*) 1 [1..n]
```

```prolog
% Prolog (Logic)
factorial(0, 1).
factorial(N, F) :-
    N > 0,
    N1 is N - 1,
    factorial(N1, F1),
    F is N * F1.
```

### Fibonacci

```python
# Python (Imperative)
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

```haskell
-- Haskell (Functional)
fib :: Int -> Int
fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)

-- Efficient with zip
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)
fib n = fibs !! n
```

```prolog
% Prolog (Logic)
fib(0, 0).
fib(1, 1).
fib(N, F) :-
    N > 1,
    N1 is N - 1, N2 is N - 2,
    fib(N1, F1), fib(N2, F2),
    F is F1 + F2.
```

### List Reversal

```python
# Python (Imperative)
def reverse(lst):
    result = []
    for item in lst:
        result.insert(0, item)
    return result
# Or simply: lst[::-1]
```

```haskell
-- Haskell (Functional)
reverse :: [a] -> [a]
reverse = foldl (flip (:)) []
```

```prolog
% Prolog (Logic)
reverse(List, Rev) :- rev_acc(List, [], Rev).
rev_acc([], Acc, Acc).
rev_acc([H|T], Acc, Rev) :- rev_acc(T, [H|Acc], Rev).
```

### Sorting

```python
# Python (Imperative)
def quicksort(lst):
    if len(lst) <= 1:
        return lst
    pivot = lst[0]
    less = [x for x in lst[1:] if x <= pivot]
    greater = [x for x in lst[1:] if x > pivot]
    return quicksort(less) + [pivot] + quicksort(greater)
```

```haskell
-- Haskell (Functional)
qsort :: Ord a => [a] -> [a]
qsort [] = []
qsort (x:xs) = qsort smaller ++ [x] ++ qsort larger
  where
    smaller = [y | y <- xs, y <= x]
    larger  = [y | y <- xs, y > x]
```

```prolog
% Prolog (Logic)
qsort([], []).
qsort([H|T], Sorted) :-
    partition(H, T, Less, Greater),
    qsort(Less, SL),
    qsort(Greater, SG),
    append(SL, [H|SG], Sorted).

partition(_, [], [], []).
partition(P, [H|T], [H|L], G) :- H =< P, partition(P, T, L, G).
partition(P, [H|T], L, [H|G]) :- H > P, partition(P, T, L, G).
```

### Finding an Element

```python
# Python (Imperative)
def find(lst, target):
    for item in lst:
        if item == target:
            return True
    return False
```

```haskell
-- Haskell (Functional)
elem :: Eq a => a -> [a] -> Bool
elem _ []     = False
elem e (x:xs) = e == x || elem e xs

-- Or: elem e = any (== e)
```

```prolog
% Prolog (Logic)
member(X, [X|_]).
member(X, [_|T]) :- member(X, T).

% Note: can also GENERATE members!
% ?- member(X, [a, b, c]).
% X = a ; X = b ; X = c.
```

:::

## Key Differences

:::eli10

The biggest difference is what "variable" means. In Python, a variable is a box you can keep changing. In Haskell, it's a permanent label (once x=5, it's always 5). In Prolog, it's an unknown that gets filled in once. Another big difference: Prolog can work backwards -- given the answer, it can figure out the inputs.

:::

:::eli15

Key paradigm differences: (1) Variables -- imperative allows reassignment, functional binds immutably, logic binds through unification (once). (2) Direction -- imperative/functional are one-directional (inputs to outputs), logic is multi-directional (any argument can be input or output). (3) Evaluation -- imperative is eager, Haskell is lazy (enables infinite structures), Prolog uses depth-first search with backtracking.

:::

:::eli20

### Variable Binding

| Paradigm | Variables |
|----------|-----------|
| Imperative | Mutable: `x = 5; x = x + 1` (reassignment) |
| Functional | Immutable: `x = 5` means x is always 5 |
| Logic | Logical: once bound through unification, cannot change |

### Direction of Computation

| Paradigm | Direction |
|----------|-----------|
| Imperative | One-directional: inputs -> outputs |
| Functional | One-directional: arguments -> results |
| Logic | Multi-directional: any argument can be input or output |

```prolog
% Prolog append works in MULTIPLE directions:
?- append([1,2], [3,4], X).    % X = [1,2,3,4]  (concatenate)
?- append(X, [3,4], [1,2,3,4]). % X = [1,2]      (find prefix)
?- append([1,2], X, [1,2,3,4]). % X = [3,4]      (find suffix)
?- append(X, Y, [1,2,3]).       % all splits      (generate)
```

### Evaluation Strategy

| Paradigm | Strategy |
|----------|----------|
| Imperative | Eager (strict): evaluate everything immediately |
| Functional (Haskell) | Lazy: evaluate only when needed |
| Logic (Prolog) | Depth-first search with backtracking |

```haskell
-- Lazy evaluation enables infinite data structures
naturals = [0..]
take 5 naturals  -- [0,1,2,3,4]

-- Only computes what's needed
head [1, undefined, 3]  -- 1 (never evaluates undefined)
```

:::

## Strengths and Weaknesses

:::eli10

Imperative programming is the easiest to learn and fastest to run, but harder to keep bug-free with all those changing variables. Functional is great for correct, testable code but has a steeper learning curve. Logic is amazing for search and relationship problems but isn't great for general-purpose programming.

:::

:::eli15

Each paradigm excels in different domains. Imperative: efficient, hardware-close, intuitive for sequential tasks, but mutation causes bugs. Functional: concise, testable, parallelizable (no shared state), but steeper learning curve. Logic: incredibly concise for search/constraint problems and multi-directional queries, but performance is unpredictable. Modern practice often combines paradigms -- using functional transformations within imperative frameworks.

:::

:::eli20

| Paradigm | Strengths | Weaknesses |
|----------|-----------|------------|
| Imperative | Intuitive, efficient, good hardware match | Harder to reason about (state), bugs from mutation |
| Functional | Concise, composable, easy to test/reason, parallelizable | Steeper learning curve, can be less efficient |
| Logic | Extremely concise for search/relation problems, multi-directional | Performance unpredictable, limited I/O, not general purpose |

:::

## When to Use Each

:::eli10

Use imperative for building apps and games. Use functional for processing and transforming data. Use logic for solving puzzles and searching through possibilities. Many modern languages let you mix and match.

:::

:::eli15

Paradigm choice depends on the problem domain. Systems programming and GUIs suit imperative. Data pipelines, parsers, and concurrent systems suit functional. Search problems, databases, and expert systems suit logic. Hybrid languages (Python with map/filter, Scala with FP+OOP) let you use the best approach for each part of your program.

:::

:::eli20

| Use Case | Best Paradigm | Why |
|----------|--------------|-----|
| Systems programming | Imperative | Direct hardware control, performance |
| Data transformation | Functional | Composable pipelines, no side effects |
| Search/constraint problems | Logic | Built-in backtracking |
| Database queries | Logic (SQL is logic-like) | Declarative relationships |
| GUI/interactive apps | Imperative/OOP | State management |
| Parsers/compilers | Functional | Pattern matching, recursion |
| AI/expert systems | Logic | Knowledge representation |
| Concurrent systems | Functional | Immutability avoids race conditions |
| Rapid prototyping | Imperative (scripting) | Quick iteration |
| Mathematical proofs | Functional/Logic | Close to mathematical notation |

## Hybrid Approaches

Modern languages often mix paradigms:

| Language | Primary Paradigm | Borrowed Features |
|----------|-----------------|-------------------|
| Python | Imperative | `map`, `filter`, `lambda`, list comprehensions |
| Scala | Functional + OOP | Pattern matching, immutability + classes |
| Rust | Imperative | Pattern matching, algebraic types, no GC |
| JavaScript | Multi-paradigm | First-class functions, closures |
| Kotlin | OOP | Data classes, when expressions, lambdas |

---

<details>
<summary><strong>Practice: Paradigm Comparison</strong></summary>

**Q1:** What is the key difference between `x = 5` in Python vs Haskell?

Answer: In Python, `x = 5` is an **assignment** - x is a variable that can be reassigned (`x = 6` later). In Haskell, `x = 5` is a **definition/binding** - x will always be 5 (immutable). It's closer to mathematical equality.

**Q2:** Why can Prolog's `append/3` work in multiple directions but Haskell's `(++)` cannot?

Answer: Prolog uses **unification** and **search** - it can work backwards from a result to find inputs. Haskell's `(++)` is a **function** that takes inputs and produces output - it can only go in one direction (left to right evaluation).

**Q3:** What would this look like in Haskell and Prolog?

```python
# Find all even numbers from a list that are greater than 5
result = [x for x in numbers if x % 2 == 0 and x > 5]
```

```haskell
-- Haskell
result = filter (\x -> even x && x > 5) numbers
-- or: [x | x <- numbers, even x, x > 5]
```

```prolog
% Prolog
filter_evens_gt5([], []).
filter_evens_gt5([H|T], [H|R]) :-
    H > 5, H mod 2 =:= 0, !,
    filter_evens_gt5(T, R).
filter_evens_gt5([_|T], R) :-
    filter_evens_gt5(T, R).
```

**Q4:** Name one thing Prolog can do that is very difficult/unnatural in Haskell.

Answer: Run a computation "backwards" - e.g., given a result, find the inputs. In Prolog, `append(X, Y, [1,2,3])` generates all ways to split the list. In Haskell, you'd need to explicitly write a function to generate all splits.

</details>

:::
