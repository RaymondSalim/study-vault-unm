---
title: "Paradigm Comparison"
order: 7
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["paradigms", "imperative", "functional", "logic", "comparison"]
---

# Paradigm Comparison

## Overview of Paradigms

| Aspect | Imperative (Python/C) | Functional (Haskell) | Logic (Prolog) |
|--------|----------------------|---------------------|----------------|
| Core idea | Sequence of commands | Evaluation of expressions | Declaration of relationships |
| Computation model | State transformation | Function application | Proof search |
| Key mechanism | Assignment, loops | Recursion, HOFs | Unification, backtracking |
| State | Mutable variables | Immutable bindings | Knowledge base |
| Control flow | Explicit (if/while/for) | Recursion, pattern matching | Automatic search |
| Side effects | Common | Restricted (pure) | Via assert/retract |
| Types | Often dynamic | Strong, static, inferred | Untyped (terms) |

## The Same Problem in Three Paradigms

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

## Key Differences

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

## Strengths and Weaknesses

| Paradigm | Strengths | Weaknesses |
|----------|-----------|------------|
| Imperative | Intuitive, efficient, good hardware match | Harder to reason about (state), bugs from mutation |
| Functional | Concise, composable, easy to test/reason, parallelizable | Steeper learning curve, can be less efficient |
| Logic | Extremely concise for search/relation problems, multi-directional | Performance unpredictable, limited I/O, not general purpose |

## When to Use Each

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
