---
title: "Prolog Lists and Recursion"
order: 6
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["prolog", "lists", "recursion", "cut", "arithmetic"]
---

# Prolog Lists and Recursion

## List Notation

:::eli10

Lists in Prolog work like a chain. You can split any list into its first item (head) and the rest (tail) using `[H|T]`. So `[1,2,3]` splits into head `1` and tail `[2,3]`. The empty list `[]` is where the chain ends. This head-tail splitting is how Prolog processes lists one item at a time.

:::

:::eli15

Prolog lists are built from the empty list `[]` and the head-tail operator `|`. The notation `[H|T]` destructures a list into its first element (H) and remaining list (T). Multiple elements can be extracted: `[X,Y|Z]` gets the first two elements and the rest. This pattern is the basis for all recursive list processing in Prolog, analogous to Haskell's `(x:xs)` pattern.

:::

:::eli20

Lists in Prolog are built from `[]` (empty) and `[Head|Tail]` (cons).

```prolog
% All equivalent representations of [1, 2, 3]:
[1, 2, 3]
[1 | [2, 3]]
[1 | [2 | [3 | []]]]
[1, 2 | [3]]

% Head/Tail decomposition
[H|T] = [a, b, c]    % H = a, T = [b, c]
[X,Y|Z] = [1,2,3,4]  % X = 1, Y = 2, Z = [3, 4]
[X|_] = [hello]       % X = hello
```

:::

## Basic List Operations

:::eli10

Prolog has built-in tricks for lists. `member` checks if something is in a list. `append` glues two lists together. `reverse` flips a list around. The cool thing is these work in multiple directions -- you can use `append` to split a list into all possible pairs.

:::

:::eli15

Core list predicates work through recursion: `member/2` checks if an element is in a list (base: head matches; recursive: check tail). `append/3` concatenates lists and is multi-directional (can split a list too). `reverse/2` has a naive O(n^2) version and an efficient O(n) accumulator version. `last/2` and `nth/3` access specific positions. These form the building blocks for all Prolog list processing.

:::

:::eli20

### Member

```prolog
% Check if element is in a list
member(X, [X|_]).            % X is the head
member(X, [_|T]) :- member(X, T).  % X is in the tail

?- member(2, [1, 2, 3]).
% true.

?- member(X, [a, b, c]).
% X = a ; X = b ; X = c.
```

### Length

```prolog
% Length of a list
len([], 0).
len([_|T], N) :- len(T, N1), N is N1 + 1.

?- len([a, b, c], N).
% N = 3.
```

### Append

```prolog
% Append two lists
append([], L, L).
append([H|T], L, [H|R]) :- append(T, L, R).

?- append([1,2], [3,4], X).
% X = [1, 2, 3, 4].

% append is MULTI-DIRECTIONAL!
?- append(X, Y, [1,2,3]).
% X = [], Y = [1,2,3] ;
% X = [1], Y = [2,3] ;
% X = [1,2], Y = [3] ;
% X = [1,2,3], Y = [].

% Use append to define other predicates:
prefix(P, L) :- append(P, _, L).
suffix(S, L) :- append(_, S, L).
```

### Reverse

```prolog
% Naive reverse - O(n^2) due to append
reverse([], []).
reverse([H|T], R) :- reverse(T, RT), append(RT, [H], R).

% Efficient reverse with accumulator - O(n)
reverse(List, Reversed) :- rev_acc(List, [], Reversed).
rev_acc([], Acc, Acc).
rev_acc([H|T], Acc, R) :- rev_acc(T, [H|Acc], R).
```

### Last Element

```prolog
last([X], X).
last([_|T], X) :- last(T, X).

?- last([1, 2, 3], X).
% X = 3.
```

### Nth Element

```prolog
nth(1, [H|_], H).
nth(N, [_|T], X) :- N > 1, N1 is N - 1, nth(N1, T, X).

?- nth(2, [a, b, c], X).
% X = b.
```

:::

## List Processing Patterns

:::eli10

You can transform lists by doing something to each item (like doubling every number), or by keeping only certain items (like only positive numbers). The pattern is always: handle the empty list, then handle one item and recurse on the rest.

:::

:::eli15

Common Prolog list patterns mirror functional programming: map-like (transform each element by processing head and recursing on tail), filter-like (keep/discard based on a condition with two clauses), and accumulator pattern (carry a running result through recursion for efficiency). The structure is always: base case for `[]`, recursive case for `[H|T]`.

:::

:::eli20

### Map-like (Apply to Each)

```prolog
% Double each element
double_all([], []).
double_all([H|T], [D|DT]) :- D is H * 2, double_all(T, DT).

?- double_all([1,2,3], X).
% X = [2, 4, 6].
```

### Filter-like (Select Elements)

```prolog
% Keep only positive numbers
positives([], []).
positives([H|T], [H|R]) :- H > 0, positives(T, R).
positives([H|T], R) :- H =< 0, positives(T, R).

?- positives([3, -1, 4, -5, 2], X).
% X = [3, 4, 2].
```

### Accumulator Pattern

```prolog
% Sum of list
sum_list(List, Sum) :- sum_acc(List, 0, Sum).
sum_acc([], Acc, Acc).
sum_acc([H|T], Acc, Sum) :- NewAcc is Acc + H, sum_acc(T, NewAcc, Sum).

% Maximum of list
max_list([X], X).
max_list([H|T], Max) :- max_list(T, TMax), Max is max(H, TMax).

% With accumulator (more efficient)
max_list([H|T], Max) :- max_acc(T, H, Max).
max_acc([], Max, Max).
max_acc([H|T], CurMax, Max) :-
    NewMax is max(H, CurMax),
    max_acc(T, NewMax, Max).
```

:::

## Arithmetic in Prolog

:::eli10

You can do math in Prolog too -- factorial, Fibonacci, and other calculations. The pattern is similar to other languages: define the base case (factorial of 0 is 1), then the recursive case (factorial of N is N times factorial of N-1). But in Prolog you use `is` to calculate and extra variables for intermediate results.

:::

:::eli15

Arithmetic recursion in Prolog follows the same base-case/recursive-case pattern but requires explicit use of `is` for evaluation and intermediate variables for computed values. Unlike Haskell, the arithmetic guard (`N > 0`) must be included to prevent infinite recursion on negative inputs. Results are passed through additional arguments rather than return values.

:::

:::eli20

```prolog
% Factorial
factorial(0, 1).
factorial(N, F) :-
    N > 0,
    N1 is N - 1,
    factorial(N1, F1),
    F is N * F1.

% Fibonacci
fib(0, 0).
fib(1, 1).
fib(N, F) :-
    N > 1,
    N1 is N - 1,
    N2 is N - 2,
    fib(N1, F1),
    fib(N2, F2),
    F is F1 + F2.

% GCD (Euclidean algorithm)
gcd(X, 0, X) :- X > 0.
gcd(X, Y, G) :- Y > 0, R is X mod Y, gcd(Y, R, G).
```

:::

## Sorting

:::eli10

You can sort lists in Prolog too. Insertion sort puts each item in the right spot one at a time. Quicksort picks one item (the pivot), splits the rest into smaller and bigger groups, sorts each group, and glues them back together.

:::

:::eli15

Prolog sorting algorithms follow the same logic as in other languages but are expressed declaratively. Insertion sort recursively sorts the tail then inserts the head into the correct position. Quicksort partitions around a pivot, recursively sorts both halves, and appends the results. The partition predicate splits elements into those less-than and greater-than the pivot.

:::

:::eli20

```prolog
% Insertion sort
insert_sort([], []).
insert_sort([H|T], Sorted) :- insert_sort(T, ST), insert(H, ST, Sorted).

insert(X, [], [X]).
insert(X, [H|T], [X,H|T]) :- X =< H.
insert(X, [H|T], [H|RT]) :- X > H, insert(X, T, RT).

% Quicksort
qsort([], []).
qsort([Pivot|T], Sorted) :-
    partition(Pivot, T, Less, Greater),
    qsort(Less, SortedLess),
    qsort(Greater, SortedGreater),
    append(SortedLess, [Pivot|SortedGreater], Sorted).

partition(_, [], [], []).
partition(Pivot, [H|T], [H|Less], Greater) :-
    H =< Pivot, partition(Pivot, T, Less, Greater).
partition(Pivot, [H|T], Less, [H|Greater]) :-
    H > Pivot, partition(Pivot, T, Less, Greater).
```

:::

## Cut (`!`)

:::eli10

The cut (`!`) is like telling Prolog "stop looking for other answers -- I'm happy with this path." Without it, Prolog might waste time exploring options you know won't work. But be careful -- cutting off too much can make Prolog give wrong answers.

:::

:::eli15

The cut `!` prunes Prolog's search tree, preventing backtracking past the cut point. Green cuts improve efficiency without changing results (just avoiding unnecessary search). Red cuts change program semantics by eliminating valid solutions (used for if-then-else patterns). Danger: cuts can cause incorrect answers if misused -- the classic example is a `max` predicate that gives wrong results when called with unexpected argument patterns.

:::

:::eli20

The **cut** prunes the search tree. Once a cut is passed, Prolog will not backtrack past it for the current goal.

### Types of Cut

| Type | Purpose | Example |
|------|---------|---------|
| Green cut | Efficiency only (doesn't change answers) | Pruning unnecessary search |
| Red cut | Changes program semantics (omits solutions) | Simulating if-then-else |

### Examples

```prolog
% Without cut: max checks both clauses on backtracking
max(X, Y, X) :- X >= Y.
max(X, Y, Y) :- X < Y.

% With cut: once first clause succeeds, don't try second
max(X, Y, X) :- X >= Y, !.
max(_, Y, Y).

% If-then-else using cut
classify(X, positive) :- X > 0, !.
classify(X, negative) :- X < 0, !.
classify(0, zero).

% Member - find only first occurrence
member_once(X, [X|_]) :- !.
member_once(X, [_|T]) :- member_once(X, T).
```

### Dangers of Cut

```prolog
% This is WRONG - cut changes meaning
bad_max(X, Y, X) :- X >= Y, !.
bad_max(_, Y, Y).

?- bad_max(5, 3, 3).
% true!  (should be false - 3 is not the max of 5 and 3)
% The cut prevents checking the first clause fails,
% so it falls through to second clause which unifies Y=3
```

### Cut with Negation

```prolog
% not/1 is defined using cut:
not(Goal) :- Goal, !, fail.
not(_).

% Same as \+ operator
```

:::

## Generate and Test

:::eli10

A common Prolog trick is to generate possible answers and then test which ones are correct. It's like trying every combination and keeping only the ones that work -- Prolog's backtracking handles this naturally.

:::

:::eli15

Generate-and-test is a common Prolog pattern where you first generate candidate solutions (using a predicate that produces multiple answers through backtracking), then test them against constraints. While not always efficient, it's natural in Prolog due to built-in backtracking. Examples include finding numbers in a range satisfying conditions, or permutation sort (generate all permutations, test which is sorted).

:::

:::eli20

A common Prolog pattern: generate candidates, then test them.

```prolog
% Find a number between 1 and 10 that is even
even_in_range(X) :- between(1, 10, X), X mod 2 =:= 0.

% Permutation sort (generate and test)
perm_sort(List, Sorted) :- permutation(List, Sorted), is_sorted(Sorted).

is_sorted([]).
is_sorted([_]).
is_sorted([X,Y|T]) :- X =< Y, is_sorted([Y|T]).
```

:::

## Useful Built-in Predicates

:::eli10

Prolog comes with many helpful built-in tools: `write` prints things, `findall` collects all answers to a question into a list, `sort` puts a list in order, and `length` tells you how long a list is.

:::

:::eli15

Key built-in predicates: `findall(X, Goal, List)` collects all solutions into a list, `write/1` and `nl` for output, type-checking predicates (`atom/1`, `number/1`, `var/1`), `assert/retract` to modify the knowledge base at runtime, `between/3` for generating integers in a range, and `sort/2`/`msort/2` for sorting lists.

:::

:::eli20

| Predicate | Description |
|-----------|-------------|
| `write(X)` | Print X |
| `nl` | Newline |
| `read(X)` | Read term from input |
| `atom(X)` | X is an atom |
| `number(X)` | X is a number |
| `is_list(X)` | X is a list |
| `var(X)` | X is unbound |
| `nonvar(X)` | X is bound |
| `assert(Clause)` | Add clause to DB |
| `retract(Clause)` | Remove clause from DB |
| `findall(X, Goal, L)` | Collect all X satisfying Goal into L |
| `between(Lo, Hi, X)` | X is between Lo and Hi |
| `msort(L, S)` | Sort list L (no duplicates removed) |
| `sort(L, S)` | Sort and remove duplicates |
| `length(L, N)` | Length of list |

### findall/3

```prolog
parent(tom, bob).
parent(tom, liz).
parent(bob, ann).

?- findall(X, parent(tom, X), Children).
% Children = [bob, liz].

?- findall(X-Y, parent(X, Y), Pairs).
% Pairs = [tom-bob, tom-liz, bob-ann].
```

---

<details>
<summary><strong>Practice: List Operations</strong></summary>

**Q1:** Trace through `append([a,b], [c], X)`:

```prolog
append([a,b], [c], X)
  -> H=a, append([b], [c], R1), X = [a|R1]
     -> H=b, append([], [c], R2), R1 = [b|R2]
        -> R2 = [c]  (base case: append([], L, L))
     -> R1 = [b, c]
  -> X = [a, b, c]
```

**Q2:** Write `flatten/2` that flattens nested lists:

```prolog
flatten([], []).
flatten([H|T], Flat) :-
    is_list(H), !,
    flatten(H, FH),
    flatten(T, FT),
    append(FH, FT, Flat).
flatten([H|T], [H|FT]) :-
    flatten(T, FT).

?- flatten([1, [2, [3]], 4], X).
% X = [1, 2, 3, 4].
```

**Q3:** Write `remove_duplicates/2`:

```prolog
remove_duplicates([], []).
remove_duplicates([H|T], R) :- member(H, T), !, remove_duplicates(T, R).
remove_duplicates([H|T], [H|R]) :- remove_duplicates(T, R).
```

</details>

<details>
<summary><strong>Practice: Arithmetic and Recursion</strong></summary>

**Q1:** Write `power(Base, Exp, Result)`:

```prolog
power(_, 0, 1).
power(Base, Exp, Result) :-
    Exp > 0,
    Exp1 is Exp - 1,
    power(Base, Exp1, R1),
    Result is Base * R1.
```

**Q2:** Write `range(Lo, Hi, List)` that generates `[Lo, Lo+1, ..., Hi]`:

```prolog
range(Hi, Hi, [Hi]).
range(Lo, Hi, [Lo|T]) :-
    Lo < Hi,
    Lo1 is Lo + 1,
    range(Lo1, Hi, T).
```

**Q3:** What does this output?

```prolog
foo([]) :- write('empty'), nl.
foo([_]) :- write('one'), nl.
foo([_,_|_]) :- write('many'), nl.

?- foo([a, b, c]).
```

Answer: `many` (matches third clause: head, second element, and rest)

</details>

:::
