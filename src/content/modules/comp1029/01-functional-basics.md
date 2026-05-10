---
title: "Haskell Functional Basics"
order: 1
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["haskell", "functional", "types", "pattern-matching", "guards"]
---

# Haskell Functional Basics

## Core Concepts

| Concept | Description | Example |
|---------|-------------|---------|
| Pure function | No side effects, same input always gives same output | `double x = x * 2` |
| Immutability | Values cannot be changed once bound | `x = 5` (not assignment, a definition) |
| Referential transparency | Expression can be replaced by its value | `double 3` is always `6` |
| Lazy evaluation | Expressions only evaluated when needed | `take 5 [1..]` works on infinite list |

## Types

Haskell is **statically typed** with **type inference**. Every expression has a type known at compile time.

### Basic Types

| Type | Description | Example Values |
|------|-------------|----------------|
| `Int` | Fixed-precision integer | `42`, `-7` |
| `Integer` | Arbitrary-precision integer | `12345678901234` |
| `Float` | Single-precision floating point | `3.14` |
| `Double` | Double-precision floating point | `3.14159265` |
| `Bool` | Boolean | `True`, `False` |
| `Char` | Single character | `'a'`, `'Z'` |
| `String` | List of characters (`[Char]`) | `"hello"` |

### Type Signatures

```haskell
-- Type declaration (optional but recommended)
add :: Int -> Int -> Int
add x y = x + y

-- Functions are curried by default
-- add :: Int -> (Int -> Int)

-- Polymorphic types use type variables
identity :: a -> a
identity x = x

-- Multiple constraints
compare :: (Ord a, Show a) => a -> a -> String
compare x y
  | x > y    = show x ++ " is greater"
  | otherwise = show y ++ " is greater or equal"
```

## Functions

### Defining Functions

```haskell
-- Simple function
square :: Int -> Int
square x = x * x

-- Multi-argument function
add :: Int -> Int -> Int
add x y = x + y

-- Prefix vs infix
-- Prefix: add 3 4
-- Infix:  3 `add` 4
-- Operators are infix by default: 3 + 4
-- Use parens for prefix: (+) 3 4
```

### Pattern Matching

Pattern matching checks value structure and **binds variables**. Patterns are tried top to bottom.

```haskell
-- Matching on specific values
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- Matching on tuples
fst' :: (a, b) -> a
fst' (x, _) = x

-- Matching on lists
head' :: [a] -> a
head' []    = error "empty list"
head' (x:_) = x

-- Matching on multiple patterns
and' :: Bool -> Bool -> Bool
and' True True = True
and' _    _    = False

-- As-patterns (@) - bind the whole AND destructure
firstLetter :: String -> String
firstLetter ""         = "Empty"
firstLetter all@(x:_) = "First letter of " ++ all ++ " is " ++ [x]
```

### Guards

Guards test boolean conditions (like if-else chains but cleaner).

```haskell
bmi :: Double -> String
bmi x
  | x < 18.5  = "underweight"
  | x < 25.0  = "normal"
  | x < 30.0  = "overweight"
  | otherwise  = "obese"

-- Guards with multiple parameters
max' :: (Ord a) => a -> a -> a
max' x y
  | x >= y    = x
  | otherwise = y
```

### Where and Let

Both introduce local bindings. Key difference: `where` is scoped to the whole function definition (including all guards), `let` is an expression.

```haskell
-- where: available to ALL guards
cylinderArea :: Double -> Double -> Double
cylinderArea r h = 2 * pi * r * h + 2 * circleArea
  where
    circleArea = pi * r * r

-- let-in: is an expression, can go anywhere
circleArea :: Double -> Double
circleArea r =
  let pi' = 3.14159
      sq x = x * x
  in pi' * sq r

-- Key difference demonstrated
roots :: Double -> Double -> Double -> (Double, Double)
roots a b c =
  let disc = sqrt (b*b - 4*a*c)
  in ((-b + disc) / (2*a), (-b - disc) / (2*a))
```

### If-Then-Else

In Haskell, `if` is an **expression** (must have `else`, always returns a value).

```haskell
abs' :: Int -> Int
abs' n = if n >= 0 then n else -n

-- Nested (prefer guards for readability)
classify :: Int -> String
classify n = if n < 0 then "negative"
             else if n == 0 then "zero"
             else "positive"
```

## Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `++` | List concatenation | `[1,2] ++ [3,4]` = `[1,2,3,4]` |
| `:` | Cons (prepend to list) | `1 : [2,3]` = `[1,2,3]` |
| `.` | Function composition | `(f . g) x` = `f (g x)` |
| `$` | Function application (low precedence) | `f $ g x` = `f (g x)` |
| `==`, `/=` | Equality, inequality | `3 /= 4` = `True` |
| `&&`, `||` | Logical AND, OR | `True && False` = `False` |

---

<details>
<summary><strong>Practice: Pattern Matching & Guards</strong></summary>

**Q1:** Write a function `isVowel :: Char -> Bool` using pattern matching.

```haskell
isVowel :: Char -> Bool
isVowel 'a' = True
isVowel 'e' = True
isVowel 'i' = True
isVowel 'o' = True
isVowel 'u' = True
isVowel _   = False
```

**Q2:** Write `grade :: Int -> Char` using guards (90+ = A, 80+ = B, 70+ = C, 60+ = D, else F).

```haskell
grade :: Int -> Char
grade mark
  | mark >= 90 = 'A'
  | mark >= 80 = 'B'
  | mark >= 70 = 'C'
  | mark >= 60 = 'D'
  | otherwise  = 'F'
```

**Q3:** What does this evaluate to?

```haskell
f (x:y:_) = x + y
f [x]     = x
f []      = 0

f [3, 5, 7, 9]
```

Answer: `8` (matches first pattern, `x=3`, `y=5`, returns `3+5`)

**Q4:** Fix this function:

```haskell
-- BROKEN
second :: [a] -> a
second xs = head (tail xs)
```

Better version with pattern matching:

```haskell
second :: [a] -> a
second (_:x:_) = x
second _       = error "list too short"
```

</details>
