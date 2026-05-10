---
title: "Types and Type Classes"
order: 4
moduleTitle: "COMP1029 - Programming Paradigms"
tags: ["haskell", "types", "typeclasses", "algebraic-data-types", "maybe", "either"]
---

# Types and Type Classes

## Algebraic Data Types (ADTs)

Custom types defined with `data` keyword. Two kinds: **sum types** (OR) and **product types** (AND).

### Enumeration (Sum Type)

```haskell
-- Sum type: a value is ONE of these
data Direction = North | South | East | West
  deriving (Show, Eq)

data Colour = Red | Green | Blue
  deriving (Show, Eq)

-- Pattern match on constructors
opposite :: Direction -> Direction
opposite North = South
opposite South = North
opposite East  = West
opposite West  = East
```

### Product Types (Records)

```haskell
-- Product type: a value contains ALL of these
data Point = Point Double Double
  deriving (Show)

data Person = Person String Int
  deriving (Show)

-- Record syntax (auto-generates accessor functions)
data Student = Student
  { name :: String
  , age  :: Int
  , sid  :: String
  } deriving (Show)

-- Access fields
getName :: Student -> String
getName s = name s

-- Create with record syntax
john :: Student
john = Student { name = "John", age = 20, sid = "12345" }
```

### Parameterised Types

```haskell
-- Type parameter 'a' makes it polymorphic
data Maybe a = Nothing | Just a
data Either a b = Left a | Right b
data Tree a = Leaf | Node (Tree a) a (Tree a)

-- List is defined as:
-- data [a] = [] | a : [a]
```

### Recursive Data Types

```haskell
-- Binary tree
data Tree a = Leaf | Node (Tree a) a (Tree a)
  deriving (Show)

-- Functions on trees
treeDepth :: Tree a -> Int
treeDepth Leaf         = 0
treeDepth (Node l _ r) = 1 + max (treeDepth l) (treeDepth r)

treeSize :: Tree a -> Int
treeSize Leaf         = 0
treeSize (Node l _ r) = 1 + treeSize l + treeSize r

-- In-order traversal
flatten :: Tree a -> [a]
flatten Leaf         = []
flatten (Node l x r) = flatten l ++ [x] ++ flatten r

-- Insert into BST
insert :: Ord a => a -> Tree a -> Tree a
insert x Leaf = Node Leaf x Leaf
insert x (Node l v r)
  | x < v     = Node (insert x l) v r
  | x > v     = Node l v (insert x r)
  | otherwise  = Node l v r

-- Natural numbers (Peano)
data Nat = Zero | Succ Nat
  deriving (Show)

natToInt :: Nat -> Int
natToInt Zero     = 0
natToInt (Succ n) = 1 + natToInt n
```

## Type Aliases and Newtypes

```haskell
-- Type alias: just a synonym, no new type
type String = [Char]
type Name = String
type Age = Int
type PhoneBook = [(Name, String)]

-- Newtype: wraps existing type, zero runtime cost
-- Can only have ONE constructor with ONE field
newtype StudentId = StudentId Int
  deriving (Show, Eq)

-- Distinction from data: newtype is strict wrapper, no overhead
```

## Type Classes

A type class defines a set of functions that must be implemented for a type. Like interfaces in OOP.

### Common Type Classes

| Type Class | Purpose | Key Functions |
|------------|---------|---------------|
| `Eq` | Equality testing | `==`, `/=` |
| `Ord` | Ordering | `<`, `>`, `<=`, `>=`, `compare` |
| `Show` | Convert to String | `show` |
| `Read` | Parse from String | `read` |
| `Num` | Numeric operations | `+`, `-`, `*`, `abs`, `signum`, `fromInteger` |
| `Integral` | Whole numbers | `div`, `mod`, `quot`, `rem` |
| `Fractional` | Division | `/`, `recip`, `fromRational` |
| `Enum` | Enumerable | `succ`, `pred`, `toEnum`, `fromEnum` |
| `Bounded` | Has min/max | `minBound`, `maxBound` |

### Deriving

```haskell
-- Automatically derive common instances
data Shape = Circle Double | Rectangle Double Double
  deriving (Show, Eq, Ord)

-- show (Circle 5.0) = "Circle 5.0"
-- Circle 3.0 == Circle 3.0 = True
```

### Writing Instances

```haskell
data TrafficLight = RedLight | YellowLight | GreenLight

instance Show TrafficLight where
  show RedLight    = "Red"
  show YellowLight = "Yellow"
  show GreenLight  = "Green"

instance Eq TrafficLight where
  RedLight    == RedLight    = True
  YellowLight == YellowLight = True
  GreenLight  == GreenLight  = True
  _           == _           = False

instance Ord TrafficLight where
  compare RedLight RedLight       = EQ
  compare RedLight _              = LT
  compare _ RedLight              = GT
  compare YellowLight YellowLight = EQ
  compare YellowLight _           = LT
  compare _ YellowLight           = GT
  compare GreenLight GreenLight   = EQ
```

### Class Constraints

```haskell
-- Type variable 'a' must be in Eq class
elem' :: Eq a => a -> [a] -> Bool
elem' _ []     = False
elem' e (x:xs) = e == x || elem' e xs

-- Multiple constraints
showMax :: (Ord a, Show a) => a -> a -> String
showMax x y = show (max x y)
```

## Maybe

Represents an optional value. Used instead of null/exceptions.

```haskell
data Maybe a = Nothing | Just a

-- Safe head
safeHead :: [a] -> Maybe a
safeHead []    = Nothing
safeHead (x:_) = Just x

-- Safe division
safeDiv :: Int -> Int -> Maybe Int
safeDiv _ 0 = Nothing
safeDiv x y = Just (x `div` y)

-- Lookup in association list
lookup :: Eq a => a -> [(a, b)] -> Maybe b
lookup _ []          = Nothing
lookup k ((k',v):xs)
  | k == k'   = Just v
  | otherwise  = lookup k xs

-- Working with Maybe
fromMaybe :: a -> Maybe a -> a
fromMaybe def Nothing  = def
fromMaybe _   (Just x) = x

-- Chaining with case
process :: String -> Maybe Int
process s = case safeHead s of
  Nothing -> Nothing
  Just c  -> if c == '0' then Just 0 else Nothing
```

## Either

Represents a value that is one of two types. Often used for error handling (`Left` = error, `Right` = success).

```haskell
data Either a b = Left a | Right b

-- Error handling
safeDivE :: Int -> Int -> Either String Int
safeDivE _ 0 = Left "Division by zero"
safeDivE x y = Right (x `div` y)

-- Processing
process :: Either String Int -> String
process (Left err) = "Error: " ++ err
process (Right n)  = "Result: " ++ show n

-- Example usage
result = case safeDivE 10 0 of
  Left msg -> "Failed: " ++ msg
  Right n  -> "Got: " ++ show n
```

## Type Class Hierarchy

```
        Eq
        |
       Ord
      /   \
   Num    Enum
   / \      |
Int  Float  Bounded
```

Key relationships:
- `Ord` requires `Eq` (must test equality to compare)
- Many numeric classes build on `Num`

---

<details>
<summary><strong>Practice: ADTs</strong></summary>

**Q1:** Define a `Shape` type with constructors for `Circle` (radius), `Rectangle` (width, height), and `Triangle` (base, height). Write an `area` function.

```haskell
data Shape = Circle Double
           | Rectangle Double Double
           | Triangle Double Double
  deriving (Show)

area :: Shape -> Double
area (Circle r)      = pi * r * r
area (Rectangle w h) = w * h
area (Triangle b h)  = 0.5 * b * h
```

**Q2:** Define a binary tree and write a `treeMap` function.

```haskell
data Tree a = Leaf | Node (Tree a) a (Tree a)

treeMap :: (a -> b) -> Tree a -> Tree b
treeMap _ Leaf         = Leaf
treeMap f (Node l x r) = Node (treeMap f l) (f x) (treeMap f r)
```

**Q3:** What is the type of `Just "hello"`?

Answer: `Maybe String` (or `Maybe [Char]`)

**Q4:** Write `safeLast :: [a] -> Maybe a`

```haskell
safeLast :: [a] -> Maybe a
safeLast []     = Nothing
safeLast [x]    = Just x
safeLast (_:xs) = safeLast xs
```

</details>

<details>
<summary><strong>Practice: Type Classes</strong></summary>

**Q1:** What does `deriving (Show, Eq)` do?

Answer: Automatically generates instances of the `Show` and `Eq` type classes. `Show` lets you convert values to strings (for printing). `Eq` lets you compare values with `==` and `/=`.

**Q2:** Why does this fail to compile?

```haskell
myMax :: a -> a -> a
myMax x y = if x > y then x else y
```

Answer: The type `a` is unconstrained. `>` requires the `Ord` type class. Fix: `myMax :: Ord a => a -> a -> a`

**Q3:** Write an `Eq` instance for this type:

```haskell
data Colour = RGB Int Int Int
```

```haskell
instance Eq Colour where
  (RGB r1 g1 b1) == (RGB r2 g2 b2) = r1 == r2 && g1 == g2 && b1 == b2
```

</details>
