---
title: "Quick Reference"
order: 90
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["haskell", "prolog", "cheat-sheet", "reference"]
---

# Quick Reference: Haskell & Prolog

## Haskell Syntax Cheat Sheet

### Function Definition

```haskell
-- Type signature (optional but recommended)
functionName :: Type1 -> Type2 -> ReturnType
functionName param1 param2 = expression

-- With guards
functionName x
  | condition1 = result1
  | condition2 = result2
  | otherwise  = defaultResult

-- With pattern matching
functionName []     = baseCase
functionName (x:xs) = recursiveCase

-- With where
functionName x = result
  where
    helper = x + 1

-- With let-in
functionName x = let y = x + 1 in y * 2

-- Lambda
\x -> x + 1
\x y -> x + y
```

### Common Types

| Type | Description |
|------|-------------|
| `Int` | Fixed integer |
| `Integer` | Arbitrary integer |
| `Double` | Floating point |
| `Bool` | `True` / `False` |
| `Char` | Character |
| `String` | `[Char]` |
| `[a]` | List of a |
| `(a, b)` | Tuple |
| `Maybe a` | `Nothing` / `Just a` |
| `Either a b` | `Left a` / `Right b` |
| `a -> b` | Function type |

### List Operations

| Operation | Syntax | Example |
|-----------|--------|---------|
| Cons | `x : xs` | `1 : [2,3]` = `[1,2,3]` |
| Concat | `xs ++ ys` | `[1,2] ++ [3]` = `[1,2,3]` |
| Index | `xs !! n` | `[1,2,3] !! 1` = `2` |
| Head | `head xs` | `head [1,2,3]` = `1` |
| Tail | `tail xs` | `tail [1,2,3]` = `[2,3]` |
| Length | `length xs` | `length [1,2,3]` = `3` |
| Take | `take n xs` | `take 2 [1,2,3]` = `[1,2]` |
| Drop | `drop n xs` | `drop 2 [1,2,3]` = `[3]` |
| Reverse | `reverse xs` | `reverse [1,2,3]` = `[3,2,1]` |
| Range | `[a..b]` | `[1..5]` = `[1,2,3,4,5]` |
| Step range | `[a,b..c]` | `[2,4..10]` = `[2,4,6,8,10]` |
| Comprehension | `[expr \| gen, guard]` | `[x*2 \| x <- [1..5], even x]` |

### Higher-Order Functions

| Function | Type | Usage |
|----------|------|-------|
| `map` | `(a->b) -> [a] -> [b]` | `map (+1) [1,2,3]` = `[2,3,4]` |
| `filter` | `(a->Bool) -> [a] -> [a]` | `filter even [1..6]` = `[2,4,6]` |
| `foldl` | `(b->a->b) -> b -> [a] -> b` | `foldl (+) 0 [1,2,3]` = `6` |
| `foldr` | `(a->b->b) -> b -> [a] -> b` | `foldr (:) [] [1,2,3]` = `[1,2,3]` |
| `zipWith` | `(a->b->c) -> [a] -> [b] -> [c]` | `zipWith (+) [1,2] [3,4]` = `[4,6]` |
| `takeWhile` | `(a->Bool) -> [a] -> [a]` | `takeWhile (<3) [1,2,3]` = `[1,2]` |
| `dropWhile` | `(a->Bool) -> [a] -> [a]` | `dropWhile (<3) [1,2,3]` = `[3]` |
| `iterate` | `(a->a) -> a -> [a]` | `take 4 (iterate (*2) 1)` = `[1,2,4,8]` |

### Operators

| Operator | Meaning | Precedence |
|----------|---------|------------|
| `.` | Function composition | 9 (highest) |
| `!!` | List index | 9 |
| `^` | Power | 8 |
| `*`, `/` | Multiply, divide | 7 |
| `+`, `-` | Add, subtract | 6 |
| `:` | Cons | 5 |
| `++` | List concat | 5 |
| `==`, `/=`, `<`, `>` | Comparison | 4 |
| `&&` | Logical AND | 3 |
| `||` | Logical OR | 2 |
| `$` | Application | 0 (lowest) |

### Data Types

```haskell
-- Enumeration
data Direction = North | South | East | West

-- Product type
data Point = Point Double Double

-- Sum + product
data Shape = Circle Double | Rectangle Double Double

-- Parameterised
data Maybe a = Nothing | Just a
data Either a b = Left a | Right b
data Tree a = Leaf | Node (Tree a) a (Tree a)

-- Record syntax
data Person = Person { name :: String, age :: Int }

-- Deriving
data Colour = Red | Green | Blue deriving (Show, Eq, Ord, Enum)
```

---

## Prolog Syntax Cheat Sheet

### Program Structure

```prolog
% Facts
predicate(arg1, arg2).

% Rules
head(X, Y) :- body1(X), body2(Y).

% Queries (at ?- prompt)
?- goal(X).
```

### Terms

| Type | Examples | Description |
|------|----------|-------------|
| Atom | `hello`, `'Hi There'`, `+` | Constants (lowercase or quoted) |
| Number | `42`, `3.14` | Integers or floats |
| Variable | `X`, `Name`, `_Who` | Uppercase or underscore |
| Anonymous | `_` | Matches anything, no binding |
| Compound | `f(a, b)`, `date(2024,1,1)` | Functor with arguments |
| List | `[1, 2, 3]`, `[H\|T]` | Built from `[]` and `[_\|_]` |

### List Patterns

| Pattern | Matches | Bindings |
|---------|---------|----------|
| `[X]` | Exactly one element | `X = element` |
| `[X,Y]` | Exactly two elements | `X = first, Y = second` |
| `[H\|T]` | At least one element | `H = head, T = rest` |
| `[X,Y\|Z]` | At least two elements | `X = first, Y = second, Z = rest` |
| `[]` | Empty list only | (none) |

### Arithmetic

```prolog
X is 3 + 4.       % X = 7 (evaluate right side)
X is 10 mod 3.    % X = 1
X is 2 ** 3.      % X = 8
X is abs(-5).     % X = 5
X is max(3, 7).   % X = 7
X is min(3, 7).   % X = 3
```

### Comparison Operators

| Operator | Meaning | Notes |
|----------|---------|-------|
| `X =:= Y` | Arithmetic equal | Both sides evaluated |
| `X =\= Y` | Arithmetic not equal | Both sides evaluated |
| `X < Y` | Less than | Arithmetic |
| `X > Y` | Greater than | Arithmetic |
| `X =< Y` | Less or equal | Note: NOT `<=` |
| `X >= Y` | Greater or equal | Arithmetic |
| `X = Y` | Unification | Not arithmetic! |
| `X \= Y` | Does not unify | |
| `X == Y` | Structurally identical | No binding |
| `X \== Y` | Not structurally identical | |

### Control

```prolog
% Conjunction (AND)
goal1, goal2.

% Disjunction (OR)
goal1 ; goal2.

% Negation as failure
\+ goal.

% Cut (prevent backtracking)
!

% If-then-else
(Cond -> Then ; Else)

% Fail (force backtracking)
fail.

% True (always succeeds)
true.
```

### Essential Built-in Predicates

| Predicate | Description |
|-----------|-------------|
| `member(X, L)` | X is in list L |
| `append(A, B, C)` | C is A concatenated with B |
| `length(L, N)` | N is length of L |
| `last(L, X)` | X is last element of L |
| `reverse(L, R)` | R is L reversed |
| `sort(L, S)` | S is L sorted (no duplicates) |
| `msort(L, S)` | S is L sorted (with duplicates) |
| `nth0(N, L, X)` | X is Nth element (0-indexed) |
| `nth1(N, L, X)` | X is Nth element (1-indexed) |
| `findall(X, G, L)` | L = all X satisfying G |
| `between(Lo, Hi, X)` | X is between Lo and Hi |
| `succ(X, Y)` | Y is X + 1 |
| `number(X)` | X is a number |
| `atom(X)` | X is an atom |
| `is_list(X)` | X is a list |
| `var(X)` | X is unbound |
| `nonvar(X)` | X is bound |
| `write(X)` | Print X |
| `writeln(X)` | Print X with newline |
| `nl` | Print newline |

### Common Patterns

```prolog
% Recursive list processing
process([], []).
process([H|T], [RH|RT]) :-
    transform(H, RH),
    process(T, RT).

% Accumulator
solve(Input, Result) :- solve_acc(Input, [], Result).
solve_acc([], Acc, Acc).
solve_acc([H|T], Acc, Result) :-
    NewAcc = [H|Acc],   % or some operation
    solve_acc(T, NewAcc, Result).

% Generate and test
find_solution(X) :-
    generate(X),
    test(X).
```

---

## Side-by-Side Comparison

| Task | Haskell | Prolog |
|------|---------|--------|
| Define constant | `x = 42` | `x(42).` or just use `42` |
| Define function | `f x = x + 1` | `f(X, Y) :- Y is X + 1.` |
| Conditional | guards or `if-then-else` | Multiple clauses or `->` |
| List head | `head [1,2,3]` | `[H\|_] = [1,2,3]` |
| List tail | `tail [1,2,3]` | `[_\|T] = [1,2,3]` |
| Check member | `elem x xs` | `member(X, Xs)` |
| List length | `length xs` | `length(Xs, N)` |
| Concatenate | `xs ++ ys` | `append(Xs, Ys, Zs)` |
| Filter | `filter p xs` | Custom recursive predicate |
| Map | `map f xs` | `maplist(f, Xs, Ys)` |
| Empty check | `null xs` | `Xs = []` or match `[]` |

---

<details>
<summary><strong>Quick Recall Exercises</strong></summary>

**Q1:** Write the Haskell type signature for: a function that takes a list of integers and returns the sum of the even ones.

```haskell
sumEvens :: [Int] -> Int
```

**Q2:** What Prolog query finds all grandchildren of `tom`?

```prolog
?- parent(tom, X), parent(X, Y).
% Or define: grandchild(GP, GC) :- parent(GP, P), parent(P, GC).
```

**Q3:** Convert `foldl (+) 0 [1,2,3,4,5]` result mentally.

Answer: `15` (0+1+2+3+4+5)

**Q4:** What does `[H|T] = [a]` bind in Prolog?

Answer: `H = a, T = []`

</details>
