---
title: "Prolog Basics"
order: 5
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["prolog", "logic-programming", "unification", "backtracking"]
---

# Prolog Basics

## What is Logic Programming?

:::eli10

Logic programming is like playing detective. You give the computer facts ("Tom is Bob's parent") and rules ("X is a grandparent of Z if X is a parent of Y and Y is a parent of Z"). Then you ask questions and the computer figures out the answers by searching through what it knows. You tell it WHAT is true, not HOW to find the answer.

:::

:::eli15

In logic programming, you declare facts (unconditional truths) and rules (conditional relationships), then ask queries. Prolog automatically searches for answers using unification (pattern matching with variable binding) and backtracking (trying alternative solutions when one path fails). You describe the problem declaratively -- what relationships hold -- rather than writing step-by-step procedures.

:::

:::eli20

In logic programming, you describe **what** is true (facts and rules), not **how** to compute it. Prolog finds solutions via **search** (unification + backtracking).

| Concept | Description |
|---------|-------------|
| Fact | Something that is unconditionally true |
| Rule | Something that is true IF certain conditions hold |
| Query | A question asked to the knowledge base |
| Unification | Pattern matching / variable binding |
| Backtracking | Trying alternative solutions when one fails |

:::

## Syntax Basics

:::eli10

In Prolog, lowercase words are fixed values (atoms) like names. Uppercase words are unknowns (variables) that Prolog fills in. Every statement ends with a period. The `:-` symbol means "if," and commas mean "and."

:::

:::eli15

Prolog syntax: atoms (lowercase, fixed values like `john`), variables (uppercase like `X`, to be filled in), compound terms (structures like `date(2024,1,15)`), and lists (`[1,2,3]`). Clauses end with `.` (period). Rules use `:-` meaning "if." Conjunction (AND) is `,` and disjunction (OR) is `;`. The anonymous variable `_` matches anything without binding.

:::

:::eli20

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

:::

## Facts

:::eli10

Facts are things you tell Prolog are simply true, no questions asked. "Tom is Bob's parent" or "Mary likes food" -- you just state them and Prolog remembers them.

:::

:::eli15

Facts are ground truths in the knowledge base -- they have no conditions and are always true. They define the basic data that rules and queries operate on. Facts are written as predicates with arguments ending in a period. Multiple facts with the same predicate name define all instances of that relationship.

:::

:::eli20

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

:::

## Rules

:::eli10

Rules are like "if-then" statements for the detective. "X is a father of Y IF X is a parent of Y AND X is male." Prolog uses these rules to figure out things that aren't directly stated as facts.

:::

:::eli15

Rules define relationships that depend on other conditions being true. The head (before `:-`) is what the rule concludes; the body (after `:-`) lists the conditions. Rules can be recursive (like `ancestor` calling itself). Prolog tries rules top-to-bottom and conditions left-to-right, using unification to bind variables.

:::

:::eli20

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

:::

## Queries

:::eli10

Queries are questions you ask Prolog. You can ask yes/no questions ("Is Tom Bob's parent?") or fill-in-the-blank questions ("Who are Tom's children?"). Prolog searches through its facts and rules to find all possible answers.

:::

:::eli15

Queries ask questions about the knowledge base. Ground queries (no variables) return true/false. Queries with variables find all values that make the query true. Compound queries with `,` (and) require all parts to be satisfied simultaneously. Pressing `;` after an answer asks Prolog to find more solutions via backtracking.

:::

:::eli20

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

:::

## Unification

:::eli10

Unification is how Prolog matches things together. It tries to make two things look the same by filling in variables. If you ask "Does f(X) match f(apple)?", Prolog says "yes, if X = apple." If two things can't possibly match (like `cat` and `dog`), unification fails.

:::

:::eli15

Unification is Prolog's pattern matching mechanism. Two terms unify if they can be made identical by substituting variables consistently. Constants unify only with themselves, variables unify with anything (and become bound), and compound terms unify if they have the same functor/arity and all arguments unify. A variable cannot be bound to two different values. Lists unify structurally: `[H|T] = [1,2,3]` binds `H=1, T=[2,3]`.

:::

:::eli20

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

:::

## Backtracking

:::eli10

Backtracking is Prolog's way of trying all possibilities. If one path doesn't work, it backs up and tries a different one, like navigating a maze by trying each fork and going back when you hit a dead end. This is how it finds multiple answers to a question.

:::

:::eli15

When a goal fails, Prolog backtracks to the most recent choice point (where multiple clauses could match) and tries the next alternative. This depth-first search explores all possibilities systematically. Pressing `;` in the interactive prompt triggers manual backtracking. Understanding the search order (clauses top-to-bottom, goals left-to-right) is essential for predicting Prolog's behavior.

:::

:::eli20

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

:::

## Negation as Failure

:::eli10

Prolog's "not" works differently from normal logic. `\+ married(mary)` doesn't mean "Mary is unmarried" -- it means "I can't PROVE that Mary is married." If you never told Prolog that Mary is married, it assumes she isn't. This is called the "closed world assumption."

:::

:::eli15

`\+` (negation as failure) succeeds when its argument cannot be proven true. It's based on the closed-world assumption: anything not provable is considered false. Important limitation: `\+` does not bind variables -- `\+ member(X, [1,2,3])` fails because `member(X, [1,2,3])` CAN be proven (with X=1). Always ensure variables are bound before using negation.

:::

:::eli20

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

:::

## Comparison and Arithmetic

:::eli10

Prolog handles math with the `is` keyword -- `X is 3 + 4` calculates the answer and puts 7 into X. For comparing numbers, you use `<`, `>`, `=:=` (equal), and `=\=` (not equal). Note that the right side of `is` must have all values known -- no unknowns allowed.

:::

:::eli15

Arithmetic in Prolog uses `is/2` for evaluation (right side must be fully instantiated -- all variables must be bound to values). Comparison operators (`<`, `>`, `=:=`, `=\=`, `>=`, `=<`) compare arithmetic values. Note `=<` (not `<=`) for less-or-equal. The `=` operator performs unification (not arithmetic), while `=:=` performs arithmetic comparison. The `\=` operator means "does not unify" (structural), while `=\=` means "arithmetically not equal."

:::

:::eli20

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

:::
