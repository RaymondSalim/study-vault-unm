---
title: "Glossary"
order: 95
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["glossary", "definitions", "haskell", "prolog"]
---

# Glossary

## General Paradigm Terms

| Term | Definition |
|------|------------|
| **Programming paradigm** | A fundamental approach to programming that defines how computation is expressed (e.g., imperative, functional, logic) |
| **Imperative programming** | A paradigm where programs consist of sequences of commands that change state |
| **Functional programming** | A paradigm where computation is expressed as evaluation of mathematical functions without side effects |
| **Logic programming** | A paradigm where programs consist of logical declarations (facts and rules), and computation is proof search |
| **Declarative programming** | Programming that describes WHAT to compute, not HOW (includes functional and logic) |
| **Side effect** | Any observable interaction with the outside world or state change beyond returning a value (e.g., I/O, mutation) |
| **Referential transparency** | Property where an expression can always be replaced by its value without changing program behaviour |
| **First-class citizen** | An entity that can be passed as argument, returned from functions, and assigned to variables (e.g., functions in Haskell) |

## Haskell / Functional Terms

| Term | Definition |
|------|------------|
| **Pure function** | A function with no side effects that always returns the same output for the same input |
| **Immutability** | The property that once a value is bound to a name, it cannot be changed |
| **Lazy evaluation** | Evaluation strategy where expressions are not computed until their values are actually needed |
| **Strict evaluation** | Evaluation strategy where expressions are computed immediately when bound (opposite of lazy) |
| **Type inference** | The compiler's ability to deduce types automatically without explicit annotations |
| **Polymorphism** | The ability of a function to work with multiple types (parametric: `a -> a`, ad-hoc: type classes) |
| **Parametric polymorphism** | A function works uniformly for ALL types (e.g., `id :: a -> a`) |
| **Ad-hoc polymorphism** | Different implementations for different types, via type classes (e.g., `show` for Int vs Bool) |
| **Currying** | Transforming a multi-argument function into a chain of single-argument functions; all Haskell functions are curried |
| **Partial application** | Applying a function to fewer arguments than it takes, producing a new function (e.g., `(+3)`) |
| **Higher-order function** | A function that takes another function as argument or returns a function |
| **Lambda expression** | An anonymous (unnamed) function: `\x -> x + 1` |
| **Function composition** | Combining two functions so output of one feeds into input of the other: `(f . g) x = f (g x)` |
| **Pattern matching** | Checking a value against patterns and binding variables to parts of the structure |
| **Guard** | A boolean condition attached to a function definition, evaluated top to bottom |
| **Algebraic data type (ADT)** | A composite type formed by combining other types using sum (OR: `\|`) and product (AND: fields) |
| **Sum type** | A type with multiple constructors (e.g., `data Bool = True \| False`); a value is ONE of the alternatives |
| **Product type** | A type whose constructor holds multiple fields (e.g., `data Point = Point Double Double`); a value has ALL fields |
| **Type class** | A collection of functions that must be implemented for a type (like an interface); e.g., `Eq`, `Ord`, `Show` |
| **Instance** | An implementation of a type class for a specific type |
| **Deriving** | Automatically generating type class instances (`deriving (Show, Eq)`) |
| **Maybe** | A type representing optional values: `Nothing` (absent) or `Just x` (present) |
| **Either** | A type representing one of two possibilities: `Left a` (often error) or `Right b` (often success) |
| **Recursion** | A function calling itself; the primary looping mechanism in functional programming |
| **Tail recursion** | Recursion where the recursive call is the last operation; can be optimised to a loop |
| **Accumulator** | An extra parameter that builds up the result incrementally in tail-recursive functions |
| **Map** | Applying a function to every element of a collection: `map f [1,2,3]` = `[f 1, f 2, f 3]` |
| **Filter** | Selecting elements from a collection that satisfy a predicate |
| **Fold (reduce)** | Combining all elements of a collection into a single value using a binary function and initial value |
| **List comprehension** | Syntax for constructing lists from generators and guards: `[x*2 \| x <- [1..5], even x]` |
| **Infinite list** | A list with no end, made possible by lazy evaluation: `[1..]` |
| **Cons** | The list constructor `(:)` that prepends an element: `1 : [2,3]` = `[1,2,3]` |
| **Point-free style** | Writing functions without explicitly mentioning arguments: `sumEvens = sum . filter even` |

## Prolog / Logic Terms

| Term | Definition |
|------|------------|
| **Fact** | An unconditional assertion that is always true: `parent(tom, bob).` |
| **Rule** | A conditional assertion: `head :- body.` (head is true IF body is true) |
| **Query (goal)** | A question asked to the Prolog system: `?- parent(tom, X).` |
| **Clause** | A fact or rule in the knowledge base (a program unit) |
| **Predicate** | A named relation defined by one or more clauses with the same functor/arity |
| **Functor** | The name of a compound term or predicate (e.g., `parent` in `parent(tom, bob)`) |
| **Arity** | The number of arguments a predicate/functor takes (e.g., `parent/2` has arity 2) |
| **Atom** | A constant value: lowercase identifier or quoted string (`hello`, `'New York'`) |
| **Term** | The basic data structure in Prolog: atoms, numbers, variables, or compound terms |
| **Compound term** | A functor applied to arguments: `date(2024, 1, 15)` |
| **Unification** | The process of making two terms identical by finding variable substitutions |
| **Substitution** | A mapping from variables to terms that makes unification succeed |
| **Occurs check** | Checking whether a variable appears in the term it is being unified with (prevents infinite terms) |
| **Backtracking** | When a goal fails, Prolog returns to the most recent choice point and tries the next alternative |
| **Choice point** | A point where multiple clauses could match; Prolog remembers alternatives for backtracking |
| **Depth-first search** | Prolog's search strategy: explore one path fully before trying alternatives |
| **Resolution** | The inference rule used by Prolog: match a goal with a clause head, then prove the body |
| **Cut (`!`)** | A control operator that prevents backtracking past it |
| **Green cut** | A cut that improves efficiency without changing the set of solutions |
| **Red cut** | A cut that changes program behaviour (removes solutions that would otherwise be found) |
| **Negation as failure (`\+`)** | A goal `\+ G` succeeds if G cannot be proven; not the same as logical negation |
| **Closed-world assumption** | Anything not provable from the knowledge base is assumed false |
| **Generate and test** | A pattern: generate candidate solutions, then test which satisfy constraints |
| **Difference list** | An efficient list representation using a pair of lists (the list and its "hole") |
| **Accumulator (Prolog)** | An extra argument that builds up the result, enabling tail recursion |
| **Instantiated** | A variable that has been bound to a value through unification |
| **Ground term** | A term with no variables (fully instantiated) |
| **findall/3** | Built-in that collects all solutions to a goal into a list |
| **assert/retract** | Dynamically add/remove clauses from the knowledge base at runtime |

## Key Distinctions

| Easily Confused | Difference |
|----------------|------------|
| `=` vs `==` vs `=:=` (Prolog) | `=` unifies (binds), `==` checks structural identity (no binding), `=:=` evaluates arithmetic equality |
| `=` vs `==` (Haskell) | `=` defines/binds, `==` tests equality |
| `foldl` vs `foldr` | `foldl` processes left-to-right with left-associative combining; `foldr` processes right-to-left |
| Pattern matching vs Guards | Patterns check structure/values; guards check boolean conditions |
| `where` vs `let` | `where` scoped to whole definition; `let` is an expression |
| Atom vs Variable (Prolog) | Atoms are lowercase constants; variables are uppercase and can be bound |
| `:` vs `++` (Haskell) | `:` prepends one element O(1); `++` concatenates two lists O(n) |
| Type vs Type Class | Type is a set of values; type class is a set of operations defined over types |
| `Maybe` vs `Either` | `Maybe` = present or absent; `Either` = one of two types (with error info) |
| Lazy vs Strict | Lazy: compute when needed; Strict: compute immediately |

---

<details>
<summary><strong>Practice: Quick Definitions</strong></summary>

Can you define these without looking?

1. **Currying** - ?
2. **Unification** - ?
3. **Backtracking** - ?
4. **Referential transparency** - ?
5. **Algebraic data type** - ?
6. **Negation as failure** - ?
7. **Higher-order function** - ?
8. **Tail recursion** - ?
9. **Type class** - ?
10. **Closed-world assumption** - ?

(Scroll up to check your answers)

</details>
