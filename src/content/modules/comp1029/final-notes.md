---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: HASKELL (Functional Programming)

### Core Concepts

| Concept | Description |
|---------|-------------|
| Pure function | No side effects, same input → same output |
| Immutability | Values cannot change once bound |
| Referential transparency | Expression replaceable by its value |
| Lazy evaluation | Only computed when needed; enables infinite lists |
| Static typing | Types checked at compile time; inferred automatically |
| Currying | Every function takes one argument; `f x y` = `(f x) y` |

---

### Types & Type Signatures

| Type | Description |
|------|-------------|
| `Int` | Fixed-precision integer |
| `Integer` | Arbitrary-precision integer |
| `Double` | Floating point |
| `Bool` | `True` / `False` |
| `Char` | Single character |
| `String` | `[Char]` (list of chars) |
| `[a]` | List of type `a` |
| `(a, b)` | Tuple (fixed size, mixed types) |
| `Maybe a` | `Nothing` or `Just x` |
| `Either a b` | `Left err` or `Right val` |

**Signatures:** `add :: Int -> Int -> Int` means curried: `Int -> (Int -> Int)`

**Polymorphism:** `id :: a -> a` — type variable `a` works for any type

**Constraints:** `sort :: Ord a => [a] -> [a]` — requires `Ord` instance

---

### Pattern Matching & Guards

```haskell
-- Patterns checked top-to-bottom; specific first!
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- List patterns
head' (x:_) = x        -- cons pattern
length' [] = 0         -- empty list
length' (_:xs) = 1 + length' xs

-- Guards (boolean conditions)
bmi x | x < 18.5 = "under" | x < 25 = "normal" | otherwise = "over"

-- where (scoped to all guards) vs let-in (expression, local scope)
```

---

### Lists & Recursion

**Key operations:** `head`, `tail`, `++` (concat), `:` (cons), `take`, `drop`, `length`, `reverse`, `elem`, `!!` (index), `zip`

**Ranges:** `[1..10]`, `[2,4..20]`, `[1..]` (infinite)

**List comprehension:** `[expr | x <- list, guard]`
- `[x*2 | x <- [1..10], odd x]` → `[2,6,10,14,18]`

**Recursion pattern:** Base case (`[]` or `0`) + Recursive case (process head, recurse on tail)

```haskell
-- Accumulator pattern (tail recursion, O(n))
reverse' xs = go [] xs
  where go acc []     = acc
        go acc (x:xs) = go (x:acc) xs
```

---

### Higher-Order Functions

| Function | Type | Purpose |
|----------|------|---------|
| `map` | `(a->b) -> [a] -> [b]` | Transform each element |
| `filter` | `(a->Bool) -> [a] -> [a]` | Keep elements passing test |
| `foldl` | `(b->a->b) -> b -> [a] -> b` | Reduce left-to-right |
| `foldr` | `(a->b->b) -> b -> [a] -> b` | Reduce right-to-left |
| `zipWith` | `(a->b->c) -> [a] -> [b] -> [c]` | Combine two lists |
| `takeWhile` | `(a->Bool) -> [a] -> [a]` | Take while predicate holds |
| `scanl` | `(b->a->b) -> b -> [a] -> [b]` | All intermediate accumulators |

**Fold traces:**
- `foldl (+) 0 [1,2,3]` = `((0+1)+2)+3` = 6
- `foldr (+) 0 [1,2,3]` = `1+(2+(3+0))` = 6
- `foldl (-) 0 [1,2,3]` = `((0-1)-2)-3` = -6
- `foldr (-) 0 [1,2,3]` = `1-(2-(3-0))` = 2

**Common folds:** `sum = foldl (+) 0` | `product = foldl (*) 1` | `length = foldl (\acc _ -> acc+1) 0` | `reverse = foldl (flip (:)) []` | `map f = foldr (\x acc -> f x : acc) []`

**foldl vs foldr:** Use `foldl'` for numeric accumulation; `foldr` for building lists / infinite lists

---

### Lambda, Composition, Operators

**Lambda:** `\x -> x + 1` | `\x y -> x + y`

**Sections (partial application of operators):** `(*2)`, `(>3)`, `(++"-")`, `` (`div` 2) ``

**Composition:** `(f . g) x = f (g x)` — read right-to-left
- `countEvens = length . filter even`

**`$` operator:** `f $ g x` = `f (g x)` — eliminates parens

---

### Algebraic Data Types & Type Classes

```haskell
data Shape = Circle Double | Rectangle Double Double  -- Sum type
data Tree a = Leaf | Node (Tree a) a (Tree a)         -- Recursive
```

| Type Class | Provides | Key Functions |
|------------|----------|---------------|
| `Eq` | Equality | `==`, `/=` |
| `Ord` | Ordering (requires Eq) | `<`, `>`, `compare` |
| `Show` | To string | `show` |
| `Num` | Arithmetic | `+`, `-`, `*` |
| `Enum` | Enumeration | `succ`, `pred` |

`deriving (Show, Eq, Ord)` auto-generates instances

---

## SIDE 2: PROLOG & PARADIGM COMPARISON

### Prolog Syntax

| Element | Convention | Example |
|---------|-----------|---------|
| Atom | lowercase | `john`, `'New York'` |
| Variable | Uppercase | `X`, `Name` |
| Anonymous | `_` | matches anything, no binding |
| Clause end | `.` (period) | `parent(tom, bob).` |
| Rule | `:-` (if) | `mortal(X) :- human(X).` |
| AND | `,` | `a, b` |
| OR | `;` | `a ; b` |

---

### Unification Rules

| Term 1 | Term 2 | Unifies? | Binding |
|--------|--------|----------|---------|
| `foo` | `foo` | Yes | — |
| `X` | `foo` | Yes | `X=foo` |
| `foo` | `bar` | No | — |
| `f(X,b)` | `f(a,Y)` | Yes | `X=a, Y=b` |
| `f(X,X)` | `f(a,b)` | No | X can't be both |
| `[H\|T]` | `[1,2,3]` | Yes | `H=1, T=[2,3]` |

**`=`** unification | **`==`** structural equality (no binding) | **`=:=`** arithmetic equality | **`is`** arithmetic evaluation

---

### Lists in Prolog

`[H|T]` = head/tail decomposition. `[X,Y|Z] = [1,2,3,4]` → `X=1, Y=2, Z=[3,4]`

```prolog
member(X, [X|_]).
member(X, [_|T]) :- member(X, T).

append([], L, L).
append([H|T], L, [H|R]) :- append(T, L, R).

reverse(L, R) :- rev_acc(L, [], R).
rev_acc([], Acc, Acc).
rev_acc([H|T], Acc, R) :- rev_acc(T, [H|Acc], R).

len([], 0).
len([_|T], N) :- len(T, N1), N is N1 + 1.
```

**append is multi-directional:** can concatenate, find prefix/suffix, or generate all splits

---

### Backtracking & Cut

**Search strategy:** Depth-first, left-to-right goal selection, clauses tried top-to-bottom

**Cut `!`:** Prevents backtracking past cut point
- **Green cut:** efficiency only (doesn't change answers)
- **Red cut:** changes semantics (danger!)

**Danger:** `bad_max(X,Y,X) :- X>=Y, !.` / `bad_max(_,Y,Y).` — `bad_max(5,3,3)` returns true (WRONG)

**Negation as failure:** `\+ Goal` succeeds when Goal cannot be proven. Does NOT bind variables!

---

### Arithmetic in Prolog

- Right side of `is` must be fully instantiated: `X is 3 + 4` (OK) | `X is Y + 1` (ERROR if Y unbound)
- `=<` for less-or-equal (NOT `<=`)

```prolog
factorial(0, 1).
factorial(N, F) :- N > 0, N1 is N-1, factorial(N1, F1), F is N*F1.
```

---

### Paradigm Comparison

| Aspect | Imperative | Functional (Haskell) | Logic (Prolog) |
|--------|-----------|---------------------|----------------|
| Core idea | Commands + state | Expression evaluation | Relationship declaration |
| Variables | Mutable (reassign) | Immutable (bind once) | Logical (unify once) |
| Control | Loops, if/else | Recursion, pattern match | Search + backtracking |
| Direction | Input → output | Input → output | Multi-directional |
| Evaluation | Eager | Lazy | Depth-first search |
| Strengths | Efficient, intuitive | Composable, testable, parallelisable | Concise for search problems |
| Weaknesses | Mutation bugs | Learning curve | Unpredictable performance |

---

### Key Traps to Remember

| Trap | Fix |
|------|-----|
| Pattern order matters (specific first) | Put `[]` / `0` before `(x:xs)` / `n` |
| `foldl` vs `foldr` differ for non-commutative ops | Trace the evaluation |
| `foldl (:) []` is type error | Use `foldl (flip (:)) []` or `foldr (:) []` |
| Prolog `X = 3+4` gives term, not 7 | Use `X is 3+4` |
| Prolog clause order → infinite loop | Base case first, avoid left recursion |
| `\+` doesn't bind variables | Bind variables before negation |
| Missing base case → crash/infinite recursion | Always handle `[]` and `0` |
| Prolog `=<` not `<=` | Remember: equals sign comes first |
