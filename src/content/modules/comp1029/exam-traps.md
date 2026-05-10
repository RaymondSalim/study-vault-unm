---
title: "Exam Traps & Common Mistakes"
order: 91
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["exam", "mistakes", "haskell", "prolog", "tips"]
---

# Exam Traps & Common Mistakes

## Haskell Mistakes

### 1. Forgetting Parentheses Around Negative Numbers

```haskell
-- WRONG: Haskell thinks you're subtracting
abs -3          -- Error! Interpreted as abs - 3

-- CORRECT:
abs (-3)        -- 3
```

### 2. Confusing `=` (definition) with `==` (equality test)

```haskell
-- This DEFINES x, not tests equality:
x = 5

-- This TESTS equality:
x == 5  -- True (in an expression context)

-- In guards, use ==:
f x | x == 0 = "zero"
    | otherwise = "nonzero"
```

### 3. Pattern Match Order Matters

```haskell
-- WRONG: first pattern catches everything!
length' xs     = 0   -- matches ALL inputs
length' (x:xs) = 1 + length' xs  -- never reached!

-- CORRECT: specific patterns first
length' []     = 0
length' (_:xs) = 1 + length' xs
```

### 4. Missing Base Case in Recursion

```haskell
-- WRONG: infinite recursion
sum' (x:xs) = x + sum' xs
-- What happens with sum' []? No pattern matches -> crash!

-- CORRECT:
sum' []     = 0
sum' (x:xs) = x + sum' xs
```

### 5. Using `++` to Prepend (Inefficient)

```haskell
-- WRONG: O(n) to prepend one element
[x] ++ xs

-- CORRECT: O(1) with cons
x : xs
```

### 6. Confusing `foldl` and `foldr`

```haskell
-- These are DIFFERENT for non-commutative operations:
foldl (-) 0 [1,2,3]  -- ((0-1)-2)-3 = -6
foldr (-) 0 [1,2,3]  -- 1-(2-(3-0)) = 2

-- For building lists, use foldr:
-- WRONG: foldl (:) [] [1,2,3]  -- Type error! (:) :: a -> [a] -> [a]
--        but foldl needs (b -> a -> b)

-- CORRECT:
foldr (:) [] [1,2,3]  -- [1,2,3]
foldl (flip (:)) [] [1,2,3]  -- [3,2,1] (reversed!)
```

### 7. Confusing Type Variables and Concrete Types

```haskell
-- This is POLYMORPHIC (works for any type a):
id :: a -> a
id x = x

-- This is CONCRETE (only works for Int):
double :: Int -> Int
double x = x * 2

-- MISTAKE: forgetting type class constraints
sort :: [a] -> [a]       -- WRONG: can't compare arbitrary types
sort :: Ord a => [a] -> [a]  -- CORRECT: need Ord
```

### 8. `where` Scope vs `let` Scope

```haskell
-- where is scoped to the ENTIRE equation (all guards)
bmi x
  | val < 18.5 = "under"
  | val < 25   = "normal"
  | otherwise  = "over"
  where val = x  -- available to ALL guards

-- let is an EXPRESSION (local scope only)
f x = let y = x + 1
      in y * 2
-- y is NOT accessible outside the let-in
```

### 9. Lazy Evaluation Surprises

```haskell
-- This does NOT crash (lazy evaluation):
head [1, undefined, 3]  -- 1

-- But this DOES:
length [1, undefined, 3]  -- 3 (doesn't evaluate elements)
-- Wait, this actually works! length doesn't evaluate elements.

-- This crashes:
head (filter (>5) [1,2,3])  -- Exception: empty list
-- filter (>5) [1,2,3] = [], then head [] crashes
```

### 10. List Comprehension Generator Order

```haskell
-- Generators are like NESTED loops
-- Rightmost varies fastest:
[(x,y) | x <- [1,2], y <- ['a','b']]
-- [(1,'a'),(1,'b'),(2,'a'),(2,'b')]
-- NOT: [(1,'a'),(2,'a'),(1,'b'),(2,'b')]
```

---

## Prolog Mistakes

### 1. Forgetting the Period

```prolog
% WRONG: missing period
parent(tom, bob)

% CORRECT:
parent(tom, bob).
```

### 2. Variable vs Atom Confusion

```prolog
% Uppercase = Variable, lowercase = atom
% WRONG (if you want the atom "john"):
likes(John, mary).  % John is a VARIABLE here!

% CORRECT:
likes(john, mary).  % john is an atom
```

### 3. Using `=` Instead of `is` for Arithmetic

```prolog
% WRONG: unification, not arithmetic
X = 3 + 4.   % X = 3+4 (the TERM, not 7!)

% CORRECT: arithmetic evaluation
X is 3 + 4.  % X = 7

% Also WRONG: is with unbound right side
X is Y + 1.  % ERROR if Y is unbound!
```

### 4. Unbound Variables in `is`

```prolog
% WRONG: Y not yet bound
foo(X) :- X is Y + 1, Y = 5.

% CORRECT: bind Y first
foo(X) :- Y = 5, X is Y + 1.
% Or:
foo(X) :- Y is 5, X is Y + 1.
```

### 5. Clause Order Causes Infinite Loop

```prolog
% WRONG: infinite recursion before reaching base case
ancestor(X, Y) :- ancestor(X, Z), parent(Z, Y).
ancestor(X, Y) :- parent(X, Y).
% Prolog tries first clause, which calls ancestor again...

% CORRECT: base case FIRST, non-recursive clause first
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).
```

### 6. Left Recursion (Infinite Loop)

```prolog
% WRONG: left-recursive rule
connected(X, Y) :- connected(X, Z), edge(Z, Y).
connected(X, Y) :- edge(X, Y).
% First clause immediately calls connected again -> stack overflow

% CORRECT: use edge first to ground the recursion
connected(X, Y) :- edge(X, Y).
connected(X, Y) :- edge(X, Z), connected(Z, Y).
```

### 7. Negation with Unbound Variables

```prolog
% WRONG: \+ does not bind variables
?- \+ member(X, [1,2,3]).
% false. (because member(X, [1,2,3]) CAN succeed with X=1)

% What you probably meant: "X is NOT in the list"
% But X must be BOUND first!
not_in_list(X, L) :- \+ member(X, L).
?- not_in_list(5, [1,2,3]).  % true (5 is bound)
```

### 8. Cut Changing Program Meaning

```prolog
% Without cut: correct
max(X, Y, X) :- X >= Y.
max(X, Y, Y) :- X < Y.

% With cut: WRONG (broken for some queries)
max(X, Y, X) :- X >= Y, !.
max(_, Y, Y).

?- max(5, 3, 3).  % true! (WRONG - should be false)
% Why: first clause fails (5>=3 but X=5 doesn't unify with 3rd arg 3)
% Falls to second clause: max(_, 3, 3) unifies with _ = 5, Y = 3
```

### 9. Confusing `=`, `==`, and `=:=`

```prolog
% = is UNIFICATION (binds variables)
?- X = 5.        % X = 5

% == is STRUCTURAL EQUALITY (no binding)
?- X == 5.       % false (X is unbound, not identical to 5)
?- 5 == 5.       % true

% =:= is ARITHMETIC EQUALITY (evaluates both sides)
?- 2+3 =:= 5.   % true
?- 2+3 = 5.      % false! (term 2+3 is not the atom 5)
?- 2+3 == 5.     % false!
```

### 10. Append Efficiency

```prolog
% append/3 is O(n) in the first list
% WRONG: building list by appending to end
build([], []).
build([H|T], Result) :-
    build(T, Rest),
    append(Rest, [H], Result).  % O(n^2) total!

% CORRECT: use difference lists or cons to front
build(List, Result) :- build_acc(List, [], Result).
build_acc([], Acc, Acc).
build_acc([H|T], Acc, Result) :- build_acc(T, [H|Acc], Result).
```

---

## General Exam Tips

| Trap | What to Watch For |
|------|-------------------|
| Off-by-one | Check base cases: `[]` vs `[x]` vs `(x:xs)` |
| Type errors | Read type signatures carefully; `Num a =>` vs `Int` |
| Infinite recursion | Base case first; avoid left recursion in Prolog |
| Pattern exhaustiveness | Cover all cases: `[]`, `[x]`, `(x:y:xs)` if needed |
| Operator precedence | When in doubt, add parentheses |
| Prolog arithmetic | Right side of `is` must be fully instantiated |
| Fold direction | Draw out the evaluation for non-commutative operations |
| Cut side effects | A cut can make previously correct queries return wrong answers |

---

<details>
<summary><strong>Practice: Spot the Bug</strong></summary>

**Q1:** What's wrong?

```haskell
last :: [a] -> a
last (x:xs) = last xs
last [x]    = x
```

Answer: Pattern order! `(x:xs)` matches `[x]` (where xs=[]), so the second pattern is never reached. Infinite recursion on single-element lists. Fix: swap the order.

**Q2:** What's wrong?

```prolog
even(0).
even(N) :- N1 is N - 2, even(N1).

?- even(3).
```

Answer: This loops forever. `even(3)` tries `N1 is 3-2 = 1`, then `even(1)`, then `N1 is 1-2 = -1`, then `even(-1)`, then -3, -5... It never reaches 0. Fix: add guard `N > 0`.

**Q3:** What's wrong?

```haskell
zip' :: [a] -> [b] -> [(a,b)]
zip' (x:xs) (y:ys) = (x,y) : zip' xs ys
```

Answer: Missing base case for empty lists. `zip' [] _` and `zip' _ []` will crash. Fix: add `zip' _ _ = []`.

**Q4:** What does this evaluate to?

```prolog
?- X = 2 + 3, X =:= 5.
```

Answer: `X = 2+3` (unification binds X to the **term** `2+3`), then `2+3 =:= 5` evaluates arithmetically to `true`. So yes, this succeeds with `X = 2+3`.

**Q5:** What's wrong with this fold?

```haskell
myReverse = foldl (:) []
```

Answer: Type error! `foldl :: (b -> a -> b) -> b -> [a] -> b`. Here `b = [a]`, so the function needs type `[a] -> a -> [a]`, but `(:)` has type `a -> [a] -> [a]` (arguments are swapped). Fix: `foldl (flip (:)) []` or `foldl (\acc x -> x:acc) []`.

</details>
