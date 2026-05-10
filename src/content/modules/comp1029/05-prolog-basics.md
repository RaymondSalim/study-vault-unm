---
title: "Prolog Basics"
order: 5
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["prolog", "logic-programming", "unification", "backtracking"]
---

# Prolog Basics

## What is Logic Programming?

In logic programming, you describe **what** is true (facts and rules), not **how** to compute it. Prolog finds solutions via **search** (unification + backtracking).

| Concept | Description |
|---------|-------------|
| Fact | Something that is unconditionally true |
| Rule | Something that is true IF certain conditions hold |
| Query | A question asked to the knowledge base |
| Unification | Pattern matching / variable binding |
| Backtracking | Trying alternative solutions when one fails |

## Syntax Basics

| Element | Convention | Example |
|---------|-----------|---------|
| Atoms | lowercase or 'quoted' | `john`, `'New York'` |
| Variables | Uppercase or _ prefix | `X`, `Name`, `_temp` |
| Anonymous variable | `_` (don't care) | `parent(_, child)` |
| Numbers | integers or floats | `42`, `3.14` |
| Compound terms | functor(args) | `date(2024, 1, 15)` |
| Lists | square brackets | `[1, 2, 3]` |
| Clause terminator | period `.` | `likes(john, mary).` |
| Rule operator | `:-` (if) | `mortal(X) :- human(X).` |
| Conjunction | `,` (and) | `a, b` |
| Disjunction | `;` (or) | `a ; b` |

## Facts

Facts are unconditional truths in the knowledge base.

```prolog
% Facts: predicate(arguments).
parent(tom, bob).
parent(tom, liz).
parent(bob, ann).
parent(bob, pat).

male(tom).
male(bob).
female(liz).
female(ann).
female(pat).

likes(mary, food).
likes(mary, wine).
likes(john, wine).
likes(john, mary).
```

## Rules

Rules define relationships that depend on conditions. Read `:-` as "if".

```prolog
% X is a father of Y IF X is parent of Y AND X is male
father(X, Y) :- parent(X, Y), male(X).

% X is a mother of Y IF X is parent of Y AND X is female
mother(X, Y) :- parent(X, Y), female(X).

% X is a grandparent of Z IF X is parent of Y AND Y is parent of Z
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).

% X is a sibling of Y IF they share a parent and are different
sibling(X, Y) :- parent(P, X), parent(P, Y), X \= Y.

% X is an ancestor of Y (recursive)
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).
```

## Queries

Queries ask questions about the knowledge base.

```prolog
% Yes/no queries
?- parent(tom, bob).
% true.

?- parent(bob, tom).
% false.

% Finding values (existential queries)
?- parent(tom, X).
% X = bob ;
% X = liz.

?- grandparent(tom, X).
% X = ann ;
% X = pat.

% Compound queries
?- parent(tom, X), female(X).
% X = liz.

?- sibling(ann, X).
% X = pat.
```

## Unification

Unification is how Prolog matches terms. Two terms unify if they can be made identical by substituting variables.

### Unification Rules

| Term 1 | Term 2 | Unifies? | Binding |
|--------|--------|----------|---------|
| `foo` | `foo` | Yes | (none) |
| `X` | `foo` | Yes | `X = foo` |
| `X` | `Y` | Yes | `X = Y` |
| `foo` | `bar` | No | - |
| `f(X)` | `f(a)` | Yes | `X = a` |
| `f(X, b)` | `f(a, Y)` | Yes | `X = a, Y = b` |
| `f(X, X)` | `f(a, b)` | No | (X can't be both a and b) |
| `f(X, b)` | `g(X, b)` | No | (different functors) |
| `[H\|T]` | `[1,2,3]` | Yes | `H = 1, T = [2,3]` |

### The `=` Operator (Unification)

```prolog
?- X = hello.
% X = hello.

?- f(X, b) = f(a, Y).
% X = a, Y = b.

?- X = f(X).
% X = f(f(f(...)))  -- occurs check (infinite term)

?- [H|T] = [a, b, c].
% H = a, T = [b, c].

?- [X, Y | Z] = [1, 2, 3, 4].
% X = 1, Y = 2, Z = [3, 4].
```

## Backtracking

When a goal fails, Prolog **backtracks** to the most recent choice point and tries the next alternative.

```prolog
% Knowledge base
colour(red).
colour(green).
colour(blue).

?- colour(X).
% X = red ;     (press ; for next)
% X = green ;
% X = blue.
```

### Execution Trace Example

```prolog
% Knowledge base
likes(mary, food).
likes(mary, wine).
likes(john, wine).
likes(john, mary).

% Query: Who likes wine AND food?
?- likes(X, wine), likes(X, food).

% Trace:
% 1. Try likes(X, wine):
%    Match with likes(mary, wine) -> X = mary
% 2. Try likes(mary, food):
%    Match with likes(mary, food) -> SUCCESS
%    X = mary
%
% Press ; for more:
% 3. Backtrack: Try next match for likes(X, wine):
%    Match with likes(john, wine) -> X = john
% 4. Try likes(john, food):
%    No match -> FAIL
% 5. No more alternatives -> done.
```

### Search Strategy

Prolog uses **depth-first search** with **left-to-right** goal selection:
1. Try to satisfy the leftmost goal
2. Use clauses in the order they appear in the program (top to bottom)
3. On failure, backtrack to most recent choice point

## Negation as Failure

`\+` means "not provable" (closed-world assumption).

```prolog
% NOT the same as logical negation!
unmarried(X) :- \+ married(X).

married(john).

?- unmarried(john).
% false.

?- unmarried(mary).
% true.  (because married(mary) is not provable)
```

**Warning:** `\+` does not bind variables!

```prolog
?- \+ member(X, [1,2,3]).
% false.  (because member(X, [1,2,3]) CAN be proven with X=1)
```

## Comparison and Arithmetic

```prolog
% Arithmetic evaluation (is/2)
?- X is 3 + 4.
% X = 7.

?- X is 10 mod 3.
% X = 1.

% Arithmetic comparison
?- 3 < 5.    % true
?- 3 > 5.    % false
?- 3 =:= 3.  % arithmetic equality
?- 3 =\= 4.  % arithmetic inequality
?- 3 >= 2.   % greater or equal
?- 3 =< 5.   % less or equal (note: =< not <=)

% IMPORTANT: Right side of 'is' must be fully instantiated
?- X is Y + 1.  % ERROR if Y is unbound
```

| Operator | Meaning |
|----------|---------|
| `X is Expr` | Evaluate Expr, unify with X |
| `=:=` | Arithmetic equality |
| `=\=` | Arithmetic inequality |
| `<`, `>` | Less than, greater than |
| `=<`, `>=` | Less or equal, greater or equal |
| `=` | Unification (not arithmetic) |
| `\=` | Does not unify |
| `==` | Structural equality |
| `\==` | Not structurally equal |

---

<details>
<summary><strong>Practice: Facts and Rules</strong></summary>

**Q1:** Given these facts, write a rule for `uncle(X, Y)` (X is uncle of Y):

```prolog
parent(tom, bob).
parent(tom, jim).
parent(bob, ann).
male(tom).
male(bob).
male(jim).
```

Answer:

```prolog
uncle(X, Y) :- parent(P, Y), sibling(X, P), male(X).
sibling(X, Y) :- parent(P, X), parent(P, Y), X \= Y.
```

Or more directly:

```prolog
uncle(X, Y) :- male(X), parent(P, Y), parent(G, P), parent(G, X), X \= P.
```

**Q2:** What does this query return?

```prolog
?- parent(tom, X), male(X).
```

Answer: `X = bob` (tom's male children)

**Q3:** Write a recursive rule for `descendant(X, Y)` - Y is a descendant of X.

```prolog
descendant(X, Y) :- parent(X, Y).
descendant(X, Y) :- parent(X, Z), descendant(Z, Y).
```

</details>

<details>
<summary><strong>Practice: Unification</strong></summary>

**Q1:** Do these unify? If yes, what are the bindings?

```prolog
a) foo(X, Y) = foo(bar, baz)
b) f(X, X) = f(a, b)
c) [H|T] = [1, 2, 3]
d) X = f(X)
e) g(X, Y) = g(Y, a)
```

Answers:
- a) Yes: `X = bar, Y = baz`
- b) No: X cannot be both `a` and `b`
- c) Yes: `H = 1, T = [2, 3]`
- d) Technically yes (infinite term), but usually fails with occurs check
- e) Yes: `Y = a, X = a` (X = Y, Y = a, so X = a)

**Q2:** What is the result of `?- [a, B, c] = [A, b, C].`?

Answer: `A = a, B = b, C = c`

</details>
