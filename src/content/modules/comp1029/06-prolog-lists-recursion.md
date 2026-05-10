---
title: "Prolog Lists and Recursion"
order: 6
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["prolog", "lists", "recursion", "cut", "arithmetic"]
---

# Prolog Lists and Recursion

## List Notation

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

## Basic List Operations

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

## List Processing Patterns

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

## Arithmetic in Prolog

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

## Sorting

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

## Cut (`!`)

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

## Generate and Test

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

## Useful Built-in Predicates

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
