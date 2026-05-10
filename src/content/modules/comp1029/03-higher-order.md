---
title: "Higher-Order Functions"
order: 3
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["haskell", "higher-order", "map", "filter", "fold", "currying", "lambda"]
---

# Higher-Order Functions

A **higher-order function** is a function that takes a function as argument or returns a function.

## Map

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

## Filter

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

## Fold (Reduce)

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

## Lambda Expressions

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

## Function Composition

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

## The `$` Operator

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

## Currying and Partial Application

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

## Other Higher-Order Functions

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
