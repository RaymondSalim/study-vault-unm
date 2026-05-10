---
title: "Lists and Recursion"
order: 2
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["haskell", "lists", "recursion", "list-comprehension"]
---

# Lists and Recursion

## Lists in Haskell

Lists are **homogeneous** (all elements same type) and built with `:` (cons) operator.

```haskell
-- All equivalent
[1, 2, 3]
1 : 2 : 3 : []
1 : [2, 3]

-- String is [Char]
"hello" == ['h','e','l','l','o']
```

### List Operations

| Function | Type | Description | Example |
|----------|------|-------------|---------|
| `head` | `[a] -> a` | First element | `head [1,2,3]` = `1` |
| `tail` | `[a] -> [a]` | All but first | `tail [1,2,3]` = `[2,3]` |
| `last` | `[a] -> a` | Last element | `last [1,2,3]` = `3` |
| `init` | `[a] -> [a]` | All but last | `init [1,2,3]` = `[1,2]` |
| `length` | `[a] -> Int` | Number of elements | `length [1,2,3]` = `3` |
| `null` | `[a] -> Bool` | Is empty? | `null []` = `True` |
| `reverse` | `[a] -> [a]` | Reverse list | `reverse [1,2,3]` = `[3,2,1]` |
| `take` | `Int -> [a] -> [a]` | First n elements | `take 2 [1,2,3]` = `[1,2]` |
| `drop` | `Int -> [a] -> [a]` | Remove first n | `drop 2 [1,2,3]` = `[3]` |
| `elem` | `a -> [a] -> Bool` | Membership test | `3 \`elem\` [1,2,3]` = `True` |
| `zip` | `[a] -> [b] -> [(a,b)]` | Pair elements | `zip [1,2] ['a','b']` = `[(1,'a'),(2,'b')]` |
| `unzip` | `[(a,b)] -> ([a],[b])` | Separate pairs | `unzip [(1,'a'),(2,'b')]` = `([1,2],"ab")` |
| `++` | `[a] -> [a] -> [a]` | Concatenate | `[1,2] ++ [3,4]` = `[1,2,3,4]` |
| `!!` | `[a] -> Int -> a` | Index (0-based) | `[1,2,3] !! 1` = `2` |

### Ranges

```haskell
[1..10]       -- [1,2,3,4,5,6,7,8,9,10]
[2,4..10]     -- [2,4,6,8,10]  (step of 2)
[10,9..1]     -- [10,9,8,7,6,5,4,3,2,1]
['a'..'z']    -- "abcdefghijklmnopqrstuvwxyz"
[1..]         -- infinite list (lazy evaluation!)
```

## List Comprehensions

Syntax: `[expression | generators, guards]`

```haskell
-- Basic
[x * 2 | x <- [1..10]]
-- [2,4,6,8,10,12,14,16,18,20]

-- With guard (filter)
[x | x <- [1..20], x `mod` 3 == 0]
-- [3,6,9,12,15,18]

-- Multiple generators (nested loops)
[(x, y) | x <- [1..3], y <- ['a'..'c']]
-- [(1,'a'),(1,'b'),(1,'c'),(2,'a'),(2,'b'),(2,'c'),(3,'a'),(3,'b'),(3,'c')]

-- Dependent generators
[(x, y) | x <- [1..5], y <- [x..5]]
-- [(1,1),(1,2),...,(1,5),(2,2),(2,3),...,(5,5)]

-- String processing
removeSpaces :: String -> String
removeSpaces xs = [x | x <- xs, x /= ' ']

-- Using pattern matching in generator
firsts :: [(a, b)] -> [a]
firsts ps = [x | (x, _) <- ps]
```

## Recursion

Recursion replaces loops in functional programming. Every recursive function needs:
1. **Base case(s)** - when to stop
2. **Recursive case** - how to reduce the problem

### Simple Recursion

```haskell
-- Length of a list
length' :: [a] -> Int
length' []     = 0
length' (_:xs) = 1 + length' xs

-- Sum of a list
sum' :: Num a => [a] -> a
sum' []     = 0
sum' (x:xs) = x + sum' xs

-- Replicate
replicate' :: Int -> a -> [a]
replicate' 0 _ = []
replicate' n x = x : replicate' (n - 1) x

-- Reverse
reverse' :: [a] -> [a]
reverse' []     = []
reverse' (x:xs) = reverse' xs ++ [x]
-- Note: O(n^2) - use accumulator for O(n)
```

### Accumulator Pattern (Tail Recursion)

Tail recursion: the recursive call is the **last** operation. Uses an accumulator to build the result.

```haskell
-- Reverse with accumulator - O(n)
reverse'' :: [a] -> [a]
reverse'' xs = go [] xs
  where
    go acc []     = acc
    go acc (x:xs) = go (x:acc) xs

-- Factorial with accumulator
factorial :: Integer -> Integer
factorial n = go 1 n
  where
    go acc 0 = acc
    go acc n = go (acc * n) (n - 1)

-- Sum with accumulator
sum'' :: Num a => [a] -> a
sum'' xs = go 0 xs
  where
    go acc []     = acc
    go acc (x:xs) = go (acc + x) xs
```

### Common Recursive Patterns

```haskell
-- Filter: keep elements satisfying a predicate
filter' :: (a -> Bool) -> [a] -> [a]
filter' _ []     = []
filter' p (x:xs)
  | p x       = x : filter' p xs
  | otherwise  = filter' p xs

-- Map: apply function to each element
map' :: (a -> b) -> [a] -> [b]
map' _ []     = []
map' f (x:xs) = f x : map' f xs

-- Zip: combine two lists
zip' :: [a] -> [b] -> [(a, b)]
zip' [] _          = []
zip' _ []          = []
zip' (x:xs) (y:ys) = (x, y) : zip' xs ys

-- Take
take' :: Int -> [a] -> [a]
take' _ []     = []
take' 0 _      = []
take' n (x:xs) = x : take' (n - 1) xs

-- Quicksort (elegant but not in-place)
qsort :: Ord a => [a] -> [a]
qsort []     = []
qsort (x:xs) = qsort smaller ++ [x] ++ qsort larger
  where
    smaller = [y | y <- xs, y <= x]
    larger  = [y | y <- xs, y > x]

-- Merge sort
merge :: Ord a => [a] -> [a] -> [a]
merge [] ys = ys
merge xs [] = xs
merge (x:xs) (y:ys)
  | x <= y    = x : merge xs (y:ys)
  | otherwise = y : merge (x:xs) ys

msort :: Ord a => [a] -> [a]
msort []  = []
msort [x] = [x]
msort xs  = merge (msort left) (msort right)
  where
    (left, right) = splitAt (length xs `div` 2) xs
```

## Tuples

Unlike lists, tuples can hold **different types** but have **fixed length**.

```haskell
-- Pair
pair :: (Int, String)
pair = (1, "hello")

fst pair  -- 1
snd pair  -- "hello"

-- Triple
triple :: (Int, String, Bool)
triple = (1, "hello", True)

-- Pattern match to extract
getThird :: (a, b, c) -> c
getThird (_, _, z) = z
```

---

<details>
<summary><strong>Practice: Lists</strong></summary>

**Q1:** What does `[x^2 | x <- [1..5], odd x]` produce?

Answer: `[1, 9, 25]` (squares of odd numbers: 1, 3, 5)

**Q2:** Write `removeNeg :: [Int] -> [Int]` that removes negative numbers using list comprehension.

```haskell
removeNeg :: [Int] -> [Int]
removeNeg xs = [x | x <- xs, x >= 0]
```

**Q3:** Write `flatten :: [[a]] -> [a]` recursively (like `concat`).

```haskell
flatten :: [[a]] -> [a]
flatten []       = []
flatten (xs:xss) = xs ++ flatten xss
```

</details>

<details>
<summary><strong>Practice: Recursion</strong></summary>

**Q1:** Write `elem' :: Eq a => a -> [a] -> Bool` recursively.

```haskell
elem' :: Eq a => a -> [a] -> Bool
elem' _ []     = False
elem' e (x:xs) = e == x || elem' e xs
```

**Q2:** Write `maximum' :: Ord a => [a] -> a` recursively.

```haskell
maximum' :: Ord a => [a] -> a
maximum' [x]    = x
maximum' (x:xs) = max x (maximum' xs)
```

**Q3:** Trace through `length' [4,7,2]`:

```
length' [4,7,2]
= 1 + length' [7,2]
= 1 + (1 + length' [2])
= 1 + (1 + (1 + length' []))
= 1 + (1 + (1 + 0))
= 3
```

**Q4:** Convert this to use an accumulator:

```haskell
product' :: Num a => [a] -> a
product' []     = 1
product' (x:xs) = x * product' xs
```

Answer:

```haskell
product' :: Num a => [a] -> a
product' xs = go 1 xs
  where
    go acc []     = acc
    go acc (x:xs) = go (acc * x) xs
```

</details>
