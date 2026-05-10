---
title: "Recursion"
order: 6
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "recursion", "base-case", "stack-frames", "factorial", "fibonacci"]
---

# Recursion

## Core Concept

A recursive method calls itself to solve smaller subproblems.

Every recursive method needs:
1. **Base case** -- stops the recursion (no recursive call)
2. **Recursive case** -- breaks the problem into a smaller instance and calls itself

```java
public static int factorial(int n) {
    if (n <= 1) return 1;           // base case
    return n * factorial(n - 1);    // recursive case
}
```

## How the Call Stack Works

Each method call creates a **stack frame** containing local variables and return address.

```
factorial(4)
  -> 4 * factorial(3)
       -> 3 * factorial(2)
            -> 2 * factorial(1)
                 -> returns 1      (base case)
            -> returns 2 * 1 = 2
       -> returns 3 * 2 = 6
  -> returns 4 * 6 = 24
```

| Call | Stack depth | Returns |
|------|:-----------:|---------|
| `factorial(1)` | 4 (deepest) | 1 |
| `factorial(2)` | 3 | 2 |
| `factorial(3)` | 2 | 6 |
| `factorial(4)` | 1 | 24 |

> **StackOverflowError**: occurs when recursion is too deep (missing/wrong base case, or problem too large).

## Classic Examples

### Factorial

```java
public static int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
```

### Fibonacci

```java
// Naive O(2^n) -- exponential!
public static int fib(int n) {
    if (n <= 0) return 0;       // base case 1
    if (n == 1) return 1;       // base case 2
    return fib(n - 1) + fib(n - 2);  // two recursive calls
}
```

**Why naive Fibonacci is slow**: overlapping subproblems.

```
fib(5) calls fib(4) and fib(3)
fib(4) calls fib(3) and fib(2)  <-- fib(3) computed twice!
```

### Fibonacci with Memoisation

```java
public static int fib(int n, int[] memo) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    if (memo[n] != 0) return memo[n];   // already computed
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
// O(n) time, O(n) space
```

### Power

```java
// O(n) -- simple
public static double power(double base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

// O(log n) -- fast exponentiation
public static double fastPower(double base, int exp) {
    if (exp == 0) return 1;
    double half = fastPower(base, exp / 2);
    if (exp % 2 == 0) return half * half;
    else return base * half * half;
}
```

### Sum of Array

```java
public static int sum(int[] arr, int index) {
    if (index >= arr.length) return 0;       // base case
    return arr[index] + sum(arr, index + 1); // recursive case
}
// Call: sum(arr, 0)
```

### String Reversal

```java
public static String reverse(String s) {
    if (s.length() <= 1) return s;           // base case
    return reverse(s.substring(1)) + s.charAt(0);
}
// reverse("hello") -> reverse("ello") + 'h'
//                   -> reverse("llo") + 'e' + 'h'
//                   -> ... -> "olleh"
```

### Binary Search (Recursive)

```java
public static int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1;              // base case: not found

    int mid = low + (high - low) / 2;       // avoids overflow

    if (arr[mid] == target) return mid;     // base case: found
    else if (arr[mid] < target)
        return binarySearch(arr, target, mid + 1, high);
    else
        return binarySearch(arr, target, low, mid - 1);
}
```

### Palindrome Check

```java
public static boolean isPalindrome(String s, int left, int right) {
    if (left >= right) return true;                    // base case
    if (s.charAt(left) != s.charAt(right)) return false;
    return isPalindrome(s, left + 1, right - 1);
}
```

## Recursion vs Iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Readability | Often cleaner for tree/divide-and-conquer | Better for simple loops |
| Memory | O(n) stack frames | O(1) typically |
| Performance | Function call overhead | Usually faster |
| Risk | StackOverflowError | Infinite loop |
| When to use | Trees, divide-and-conquer, backtracking | Simple repetition |

### Converting Recursion to Iteration

```java
// Recursive factorial
public static int factorialRec(int n) {
    if (n <= 1) return 1;
    return n * factorialRec(n - 1);
}

// Iterative equivalent
public static int factorialIter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

## Designing Recursive Solutions

1. **Identify the base case(s)**: What is the simplest input? What should it return?
2. **Identify the recursive case**: How can you reduce the problem?
3. **Trust the recursion**: Assume the recursive call works correctly for smaller input.
4. **Ensure progress**: Each call must move toward the base case.

## Common Mistakes

| Mistake | Consequence |
|---------|-------------|
| Missing base case | StackOverflowError |
| Base case never reached | StackOverflowError |
| Not returning the recursive call | Computed value lost |
| Modifying shared state incorrectly | Wrong results |
| Redundant computation | Exponential time (use memoisation) |

---

<details>
<summary><strong>Practice: Trace through this</strong></summary>

```java
public static int mystery(int n) {
    if (n <= 0) return 0;
    return n + mystery(n - 2);
}
System.out.println(mystery(7));
```

**Answer:** `7 + 5 + 3 + 1 + mystery(-1)` = `7 + 5 + 3 + 1 + 0` = `16`

It sums all positive odd numbers up to n (when n is odd).

</details>

<details>
<summary><strong>Practice: What is wrong with this code?</strong></summary>

```java
public static int countDown(int n) {
    System.out.println(n);
    return countDown(n - 1);
}
```

**Answer:** No base case. This will recurse infinitely until StackOverflowError. Fix: add `if (n <= 0) return 0;` (or similar) at the start.

</details>

<details>
<summary><strong>Practice: Write a recursive method to count digits</strong></summary>

```java
public static int countDigits(int n) {
    // Your code here
}
// countDigits(12345) should return 5
```

**Answer:**

```java
public static int countDigits(int n) {
    if (n < 0) return countDigits(-n);  // handle negatives
    if (n < 10) return 1;               // base case: single digit
    return 1 + countDigits(n / 10);     // recursive case
}
```

Trace: `countDigits(123)` -> `1 + countDigits(12)` -> `1 + 1 + countDigits(1)` -> `1 + 1 + 1` = `3`

</details>

<details>
<summary><strong>Practice: What is the time complexity of naive fib(n)?</strong></summary>

**Answer:** O(2^n). Each call branches into two sub-calls, creating an exponential tree. With memoisation it becomes O(n).

</details>
