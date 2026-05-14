---
title: "Higher-Order Functions"
order: 3
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["haskell", "higher-order", "map", "filter", "fold", "currying", "lambda"]
---

# Higher-Order Functions

:::eli10

A higher-order function is a function that takes another function as an ingredient. Imagine a machine that you can customize: you feed it a rule (like "double" or "add 1") and a list, and it applies your rule to every item. `map` applies a rule to each item, `filter` keeps only items that pass a test, and `fold` combines all items into one result.

:::

:::eli15

Higher-order functions accept functions as arguments or return functions. They are the core of functional programming, enabling powerful abstractions. `map` transforms every element, `filter` selects elements by a predicate, and `fold` reduces a list to a single value. Combined with currying (partial application), lambda expressions, and function composition, they allow concise, composable code without explicit loops or recursion.

:::

:::eli20

A **higher-order function** is a function that takes a function as argument or returns a function.

:::

## Map

:::eli10

`map` is like having a helper that does the same thing to every item in a list. Give it the rule "add 1" and a list [1,2,3], and it gives back [2,3,4]. The original list stays the same -- you get a brand new list.

:::

:::eli15

`map` applies a function to every element of a list, returning a new list of results. It's the functional equivalent of a for-each loop that transforms data. The type `(a -> b) -> [a] -> [b]` shows it takes a transformation function and a list, producing a new list (possibly of a different type).

:::

:::eli20

Apply a function to every element of a list.

```haskell
map :: (a -> b) -> [a] -> [b]
map _ []     = []
map f (x:xs) = f x : map f xs

-- Examples
map (+1) [1,2,3]         -- [2,3,4]
map (*2) [1,2,3]         -- [2,4,6]
map even [1,2,3,4]       -- [False,True,False,True]
map toUpper "hello"      -- "HELLO"
map (++ "!") ["hi","bye"] -- ["hi!","bye!"]
```

:::

## Filter

:::eli10

`filter` is like a sieve. You give it a test (like "is this number bigger than 3?") and a list, and it only keeps the items that pass the test. Everything else gets thrown away.

:::

:::eli15

`filter` takes a predicate (function returning Bool) and a list, returning only the elements for which the predicate returns True. It's the functional equivalent of an if-statement inside a loop. Combined with map, it covers most list-processing needs.

:::

:::eli20

Keep only elements satisfying a predicate.

```haskell
filter :: (a -> Bool) -> [a] -> [a]
filter _ []     = []
filter p (x:xs)
  | p x       = x : filter p xs
  | otherwise  = filter p xs

-- Examples
filter even [1..10]          -- [2,4,6,8,10]
filter (>3) [1,5,2,8,3]     -- [5,8]
filter (/= ' ') "h e l l o" -- "hello"
```

:::

## Fold (Reduce)

:::eli10

`fold` squishes a whole list down into one value. Think of it like a snowball rolling down a hill, picking up each item as it goes. To sum a list [1,2,3], you start with 0, then add 1 (get 1), add 2 (get 3), add 3 (get 6). The "rule" says how to combine the snowball with the next item.

:::

:::eli15

Fold (also called reduce) combines all elements of a list into a single value using a combining function and a starting value (accumulator). `foldl` processes left-to-right (best for accumulation like sum/product), `foldr` processes right-to-left (best for building lists, works on infinite lists if the function is lazy). Many standard functions (sum, product, length, reverse, map, filter) can be expressed as folds.

:::

:::eli20

Reduces a list to a single value by combining elements with a function.

### foldl (fold left)

Processes list from **left to right**. Associates to the left.

```haskell
foldl :: (b -> a -> b) -> b -> [a] -> b
foldl _ acc []     = acc
foldl f acc (x:xs) = foldl f (f acc x) xs

-- foldl (+) 0 [1,2,3]
-- = foldl (+) (0+1) [2,3]
-- = foldl (+) ((0+1)+2) [3]
-- = foldl (+) (((0+1)+2)+3) []
-- = ((0+1)+2)+3 = 6
```

### foldr (fold right)

Processes list from **right to left**. Associates to the right.

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr _ acc []     = acc
foldr f acc (x:xs) = f x (foldr f acc xs)

-- foldr (+) 0 [1,2,3]
-- = 1 + (foldr (+) 0 [2,3])
-- = 1 + (2 + (foldr (+) 0 [3]))
-- = 1 + (2 + (3 + (foldr (+) 0 [])))
-- = 1 + (2 + (3 + 0)) = 6
```

### When to Use Which?

| | `foldl` | `foldr` |
|---|---------|---------|
| Direction | Left to right | Right to left |
| Accumulator position | First argument of `f` | Second argument of `f` |
| Works on infinite lists? | No | Yes (if `f` is lazy in 2nd arg) |
| Typical use | Numeric accumulation | Building lists, `map`/`filter` |
| Strict version | `foldl'` (use this!) | N/A |

### Common Fold Patterns

```haskell
-- Sum
sum' = foldl (+) 0

-- Product
product' = foldl (*) 1

-- Length
length' = foldl (\acc _ -> acc + 1) 0

-- Reverse
reverse' = foldl (\acc x -> x : acc) []
-- or: foldl (flip (:)) []

-- Map using foldr
map' f = foldr (\x acc -> f x : acc) []

-- Filter using foldr
filter' p = foldr (\x acc -> if p x then x : acc else acc) []

-- Concatenate list of lists
concat' = foldr (++) []

-- And / Or
and' = foldr (&&) True
or'  = foldr (||) False

-- Maximum
maximum' = foldl1 max  -- foldl1 uses first element as initial accumulator
```

:::

## Lambda Expressions

:::eli10

A lambda is a quick throwaway function without a name. Instead of writing a whole named function just to say "multiply by 2," you write `\x -> x * 2`. It's like writing a note instead of a full letter -- quick and to the point.

:::

:::eli15

Lambda expressions (anonymous functions) are defined inline with `\parameters -> body`. They're useful when you need a small function only once, typically as an argument to map, filter, or fold. For simple operations, partial application or sections (like `(*2)` or `(>3)`) are often even more concise than lambdas.

:::

:::eli20

Anonymous functions (unnamed functions defined inline).

```haskell
-- Syntax: \parameters -> body
\x -> x + 1
\x y -> x + y

-- Usage
map (\x -> x * x) [1..5]          -- [1,4,9,16,25]
filter (\x -> x `mod` 2 == 0) [1..10]  -- [2,4,6,8,10]
foldl (\acc x -> acc + x) 0 [1..5]     -- 15

-- Multi-parameter lambda
zipWith (\x y -> x + y) [1,2,3] [4,5,6]  -- [5,7,9]
```

:::

## Function Composition

:::eli10

Function composition is like connecting machines in a row. The output of one machine feeds into the next. `(f . g) x` means "first run g on x, then run f on the result." It's like an assembly line for data.

:::

:::eli15

The `.` operator composes functions: `(f . g) x = f (g x)`. Read right to left -- the rightmost function runs first. Composition enables point-free style (defining functions without mentioning their arguments), which is concise but can sacrifice readability. The `$` operator is low-precedence function application that eliminates nested parentheses.

:::

:::eli20

The `.` operator composes two functions: `(f . g) x = f (g x)`

```haskell
(.) :: (b -> c) -> (a -> b) -> (a -> c)

-- Example: negate then double
negateAndDouble = (*2) . negate
negateAndDouble 3  -- -6  (negate 3 = -3, then *2 = -6)

-- Chain multiple compositions (read right to left)
process = show . (*2) . (+1)
process 3  -- "8"  (3+1=4, 4*2=8, show 8 = "8")

-- Useful for point-free style
-- Instead of:
countEvens xs = length (filter even xs)
-- Write:
countEvens = length . filter even

-- Instead of:
sumSquares xs = sum (map (^2) xs)
-- Write:
sumSquares = sum . map (^2)
```

:::

## The `$` Operator

:::eli10

The `$` sign is just a way to avoid writing so many parentheses. Instead of `f (g (h x))` with all those nested brackets, you can write `f $ g $ h x` -- much easier to read.

:::

:::eli15

`$` is function application with the lowest precedence. It's syntactic sugar to avoid deeply nested parentheses. `f $ g $ h x` is equivalent to `f (g (h x))`. Also useful with `map` to apply multiple functions to the same value: `map ($ 3) [f, g, h]` applies 3 to each function.

:::

:::eli20

Function application with lowest precedence. Avoids parentheses.

```haskell
($) :: (a -> b) -> a -> b
f $ x = f x

-- These are equivalent:
sum (filter even (map (*2) [1..10]))
sum $ filter even $ map (*2) [1..10]

-- Also useful with map
map ($ 3) [(+1), (*2), (^2)]  -- [4, 6, 9]
```

:::

## Currying and Partial Application

:::eli10

In Haskell, every function really only takes one thing at a time. `add 3 5` first gives `add` the 3 (creating a new "add-3" function), then gives that function the 5. This means you can create new specialized functions easily -- `addThree = add 3` makes a function that always adds 3 to whatever you give it.

:::

:::eli15

Every Haskell function takes exactly one argument. Multi-argument functions are curried -- `add x y` is really `(add x) y`, where `add x` returns a new function waiting for `y`. Partial application means giving fewer arguments than expected, producing a new function. Sections like `(*2)`, `(>0)`, `(++"-")` partially apply operators. This makes it easy to create specialized functions on the fly for use with map, filter, etc.

:::

:::eli20

Every function in Haskell takes exactly **one argument**. Multi-argument functions are **curried** (return a function that takes the next argument).

```haskell
-- add :: Int -> Int -> Int
-- is really: add :: Int -> (Int -> Int)

add :: Int -> Int -> Int
add x y = x + y

addThree :: Int -> Int
addThree = add 3  -- partial application

addThree 5  -- 8

-- Sections: partially apply operators
double = (*2)       -- multiply by 2
isPositive = (>0)   -- greater than 0
addOne = (+1)       -- add 1
halve = (`div` 2)   -- divide by 2

map (*2) [1..5]      -- [2,4,6,8,10]
filter (>3) [1..5]   -- [4,5]
```

### Uncurrying

```haskell
-- Convert curried to uncurried (takes a tuple)
uncurry :: (a -> b -> c) -> (a, b) -> c
uncurry f (x, y) = f x y

-- Useful with zip
map (uncurry (+)) [(1,2),(3,4),(5,6)]  -- [3,7,11]

-- Convert uncurried to curried
curry :: ((a, b) -> c) -> a -> b -> c
curry f x y = f (x, y)
```

:::

## Other Higher-Order Functions

:::eli10

Haskell has many useful tools: `zipWith` combines two lists using a rule, `takeWhile` keeps taking from a list while a condition is true, and `iterate` keeps applying a function forever (making an infinite list that Haskell only evaluates as needed).

:::

:::eli15

Additional useful higher-order functions: `zipWith` combines two lists element-by-element using a function, `takeWhile`/`dropWhile` take/skip elements while a predicate holds, `iterate` generates an infinite list by repeated function application, and `scanl` is like foldl but returns all intermediate results. These compose together to express complex transformations concisely.

:::

:::eli20

```haskell
-- zipWith: combine two lists with a function
zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith (+) [1,2,3] [4,5,6]  -- [5,7,9]
zipWith (*) [1,2,3] [4,5,6]  -- [4,10,18]

-- takeWhile: take elements while predicate holds
takeWhile :: (a -> Bool) -> [a] -> [a]
takeWhile (<5) [1,3,5,2,4]   -- [1,3]

-- dropWhile: drop elements while predicate holds
dropWhile :: (a -> Bool) -> [a] -> [a]
dropWhile (<5) [1,3,5,2,4]   -- [5,2,4]

-- iterate: infinite list by repeated application
iterate :: (a -> a) -> a -> [a]
take 5 (iterate (*2) 1)      -- [1,2,4,8,16]

-- scanl: like foldl but returns all intermediate accumulators
scanl :: (b -> a -> b) -> b -> [a] -> [b]
scanl (+) 0 [1,2,3,4]        -- [0,1,3,6,10]
```

---

<details>
<summary><strong>Practice: Map, Filter, Fold</strong></summary>

**Q1:** Express using `map` and `filter`: "double all odd numbers in a list"

```haskell
doubleOdds :: [Int] -> [Int]
doubleOdds = map (*2) . filter odd

-- doubleOdds [1,2,3,4,5] = [2,6,10]
```

**Q2:** What does `foldr (:) [] [1,2,3]` produce?

Trace:
```
foldr (:) [] [1,2,3]
= 1 : (foldr (:) [] [2,3])
= 1 : (2 : (foldr (:) [] [3]))
= 1 : (2 : (3 : (foldr (:) [] [])))
= 1 : (2 : (3 : []))
= [1,2,3]  -- identity! foldr (:) [] = id for lists
```

**Q3:** Implement `all :: (a -> Bool) -> [a] -> Bool` using fold.

```haskell
all' :: (a -> Bool) -> [a] -> Bool
all' p = foldr (\x acc -> p x && acc) True
```

**Q4:** What is `map ($ 2) [(+3), (*4), (^3)]`?

Answer: `[5, 8, 8]` (apply 2 to each function: 2+3=5, 2*4=8, 2^3=8)

**Q5:** Rewrite using composition (point-free):

```haskell
f xs = sum (map length (filter (not . null) xs))
```

Answer:

```haskell
f = sum . map length . filter (not . null)
```

</details>

<details>
<summary><strong>Practice: Currying and Lambda</strong></summary>

**Q1:** What is the type of `map (+1)`?

Answer: `Num a => [a] -> [a]` (partially applied map, waiting for a list)

**Q2:** Rewrite without lambda: `\x -> x * x + 1`

```haskell
-- Can't be done purely point-free easily, but:
f x = x * x + 1
-- Or using composition (less readable):
-- (+1) . (^2) -- but this is (x^2) + 1 which is the same
```

**Q3:** What does `flip` do?

```haskell
flip :: (a -> b -> c) -> b -> a -> c
flip f y x = f x y

-- flip (/) 2 10 = 10 / 2 = 5.0
-- flip (:) [1,2] 3 = 3 : [1,2] = [3,1,2]
-- flip (++) "world" "hello " = "hello world"
```

</details>

:::
