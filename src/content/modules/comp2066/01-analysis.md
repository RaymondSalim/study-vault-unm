---
title: "Algorithm Analysis"
order: 1
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["big-o", "complexity", "recurrences", "master-theorem"]
---

## Asymptotic Notation

:::eli10

Asymptotic notation is like a rating system for how fast or slow an algorithm gets as the input grows. Think of it like saying "this car goes at most 100 mph" (upper bound) or "at least 60 mph" (lower bound). Big-O tells you the worst-case speed limit of your algorithm.

:::

:::eli15

Asymptotic notation gives us a mathematical way to describe how an algorithm's running time scales with input size, ignoring constants and lower-order terms:

- **Big-O** ($O$): Upper bound — the algorithm will never be *worse* than this
- **Big-Omega** ($\Omega$): Lower bound — the algorithm will never be *better* than this
- **Big-Theta** ($\Theta$): Tight bound — the algorithm grows at exactly this rate (within constant factors)
- **Little-o** and **little-omega**: Strict bounds (not "equal to" the boundary)

These notations apply for sufficiently large $n$ (past some threshold $n_0$).

:::

:::eli20

| Notation | Meaning | Intuition |
|----------|---------|-----------|
| $O(g(n))$ | Upper bound | $f(n) \leq c \cdot g(n)$ for $n \geq n_0$ |
| $\Omega(g(n))$ | Lower bound | $f(n) \geq c \cdot g(n)$ for $n \geq n_0$ |
| $\Theta(g(n))$ | Tight bound | $c_1 g(n) \leq f(n) \leq c_2 g(n)$ for $n \geq n_0$ |
| $o(g(n))$ | Strict upper | $\lim_{n\to\infty} f(n)/g(n) = 0$ |
| $\omega(g(n))$ | Strict lower | $\lim_{n\to\infty} f(n)/g(n) = \infty$ |

### Formal Definitions

$$O(g(n)) = \{f(n) : \exists\, c > 0,\, n_0 > 0 \text{ s.t. } 0 \leq f(n) \leq c \cdot g(n)\;\forall\, n \geq n_0\}$$

$$\Omega(g(n)) = \{f(n) : \exists\, c > 0,\, n_0 > 0 \text{ s.t. } 0 \leq c \cdot g(n) \leq f(n)\;\forall\, n \geq n_0\}$$

$$\Theta(g(n)) = O(g(n)) \cap \Omega(g(n))$$

:::

## Common Growth Rates

:::eli10

Algorithms come in different "speeds." Constant is the fastest — like instantly grabbing something from a shelf. Logarithmic is like guessing a number by halving the range each time. Linear means checking every item one by one. Exponential and factorial are super slow — like trying every possible combination of a lock.

:::

:::eli15

Here's a hierarchy of growth rates from fastest to slowest:

- **Constant** $O(1)$: Doesn't depend on input size at all (e.g., accessing an array element)
- **Logarithmic** $O(\log n)$: Halving the problem each step (e.g., binary search)
- **Linear** $O(n)$: Scanning everything once (e.g., finding max in unsorted list)
- **Linearithmic** $O(n \log n)$: Efficient sorting (e.g., merge sort)
- **Quadratic** $O(n^2)$: Comparing all pairs (e.g., bubble sort)
- **Exponential** $O(2^n)$: Exploring all subsets — becomes impractical fast

Anything $O(n \log n)$ or better is generally considered "efficient." Polynomial ($n^k$) is tractable; exponential is not.

:::

:::eli20

| Class | Name | Example |
|-------|------|---------|
| $O(1)$ | Constant | Array access |
| $O(\log n)$ | Logarithmic | Binary search |
| $O(n)$ | Linear | Linear search |
| $O(n \log n)$ | Linearithmic | Merge sort |
| $O(n^2)$ | Quadratic | Bubble sort |
| $O(n^3)$ | Cubic | Matrix multiply (naive) |
| $O(2^n)$ | Exponential | Subset enumeration |
| $O(n!)$ | Factorial | Permutation generation |

### Ordering

$$1 < \log n < \sqrt{n} < n < n\log n < n^2 < n^3 < 2^n < n! < n^n$$

:::

## Big-O Rules

:::eli10

Big-O rules are shortcuts for combining algorithm speeds. If you do two things one after the other, the total speed is just whichever one was slower. If you do something inside a loop, you multiply. And you can always ignore constant multipliers — doing something 3 times vs. 1 time doesn't change the "category."

:::

:::eli15

These rules let you combine and simplify Big-O expressions:

- **Sum rule**: When you do two things sequentially, the overall complexity is the max of the two: $O(f + g) = O(\max(f, g))$
- **Product rule**: When one operation is nested inside another, you multiply: $O(f \cdot g)$
- **Constant rule**: Constant multipliers don't matter: $O(5n) = O(n)$
- **Transitivity**: If $f = O(g)$ and $g = O(h)$, then $f = O(h)$

These rules mean you always focus on the dominant (fastest-growing) term.

:::

:::eli20

| Rule | Statement |
|------|-----------|
| Sum | $O(f + g) = O(\max(f, g))$ |
| Product | $O(f \cdot g) = O(f) \cdot O(g)$ |
| Constant | $O(c \cdot f) = O(f)$ |
| Transitivity | $f = O(g)$ and $g = O(h) \Rightarrow f = O(h)$ |

:::

## Time vs Space Complexity

:::eli10

Time complexity is about how many steps an algorithm takes. Space complexity is about how much extra memory it needs. It's like cooking: time is how long the recipe takes, and space is how many bowls and pans you need.

:::

:::eli15

Every algorithm uses two key resources:

- **Time complexity**: How many operations are performed as a function of input size (e.g., number of comparisons in sorting)
- **Space complexity**: How much *extra* memory is needed beyond the input itself (e.g., an extra array for merge sort)

You should also distinguish between best case, worst case, and average case — unless the context makes it clear which you mean.

:::

:::eli20

| Aspect | Measures | Example |
|--------|----------|---------|
| Time | Number of operations | Comparisons in sorting |
| Space | Extra memory used | Auxiliary array in merge sort |

**Best / Worst / Average**: Always specify which case unless context is clear.

:::

## Recurrence Relations

:::eli10

A recurrence relation is like a recipe that says "to solve this big problem, first solve a smaller version of the same problem, then do a little extra work." If you keep breaking it down, eventually you get to a tiny problem you can solve easily. By adding up all the work at each step, you find out how fast the whole algorithm is.

:::

:::eli15

Recursive algorithms have running times described by **recurrence relations** — equations where $T(n)$ is defined in terms of $T$ on smaller inputs.

Common patterns:
- $T(n) = T(n-1) + O(1)$ means you reduce the problem by 1 each time — this gives $O(n)$
- $T(n) = 2T(n/2) + O(n)$ means you split in half and do linear work to combine — this gives $O(n \log n)$
- $T(n) = T(n/2) + O(1)$ means you halve the problem with constant work — this gives $O(\log n)$

Methods to solve them: guess-and-check (substitution), drawing a recursion tree, or applying the Master Theorem (a formula for divide-and-conquer recurrences).

:::

:::eli20

### Common Patterns

| Recurrence | Solution | Algorithm |
|-----------|----------|-----------|
| $T(n) = T(n-1) + O(1)$ | $O(n)$ | Linear recursion |
| $T(n) = T(n-1) + O(n)$ | $O(n^2)$ | Selection sort |
| $T(n) = 2T(n/2) + O(n)$ | $O(n \log n)$ | Merge sort |
| $T(n) = 2T(n/2) + O(1)$ | $O(n)$ | Binary tree traversal |
| $T(n) = T(n/2) + O(1)$ | $O(\log n)$ | Binary search |
| $T(n) = 2T(n-1) + O(1)$ | $O(2^n)$ | Towers of Hanoi |

### Solving Methods

1. **Substitution** (guess and prove by induction)
2. **Recursion tree** (visualise cost per level)
3. **Master theorem** (for divide-and-conquer)

:::

## Master Theorem

:::eli10

The Master Theorem is like a cheat sheet for figuring out how fast divide-and-conquer algorithms are. You just plug in three numbers — how many sub-problems you make, how much smaller each one is, and how much extra work you do at each step — and it tells you the answer immediately.

:::

:::eli15

The Master Theorem solves recurrences of the form $T(n) = aT(n/b) + O(n^d)$ where:
- $a$ = number of recursive sub-problems
- $b$ = factor by which the input shrinks
- $d$ = exponent of the work done outside recursion

Compare $d$ with $\log_b a$:
- If $d < \log_b a$: the recursion dominates — answer is $O(n^{\log_b a})$
- If $d = \log_b a$: work is evenly spread — answer is $O(n^d \log n)$
- If $d > \log_b a$: the top-level work dominates — answer is $O(n^d)$

:::

:::eli20

For recurrences of the form:

$$T(n) = aT(n/b) + O(n^d)$$

where $a \geq 1$, $b > 1$, $d \geq 0$:

| Case | Condition | Result |
|------|-----------|--------|
| 1 | $d < \log_b a$ | $T(n) = O(n^{\log_b a})$ |
| 2 | $d = \log_b a$ | $T(n) = O(n^d \log n)$ |
| 3 | $d > \log_b a$ | $T(n) = O(n^d)$ |

### Intuition

- **Case 1**: Leaves dominate (work increases at each level)
- **Case 2**: Work spread evenly across levels
- **Case 3**: Root dominates (work decreases at each level)

<details>
<summary><strong>Practice: Apply Master Theorem</strong></summary>

**Q1**: $T(n) = 4T(n/2) + n$

$a=4, b=2, d=1$. Compare $d=1$ vs $\log_2 4 = 2$. Since $d < \log_b a$: **Case 1** $\Rightarrow O(n^2)$

**Q2**: $T(n) = 2T(n/2) + n$

$a=2, b=2, d=1$. Compare $d=1$ vs $\log_2 2 = 1$. Since $d = \log_b a$: **Case 2** $\Rightarrow O(n \log n)$

**Q3**: $T(n) = 3T(n/4) + n^2$

$a=3, b=4, d=2$. Compare $d=2$ vs $\log_4 3 \approx 0.79$. Since $d > \log_b a$: **Case 3** $\Rightarrow O(n^2)$

**Q4**: $T(n) = 7T(n/2) + n^2$

$a=7, b=2, d=2$. Compare $d=2$ vs $\log_2 7 \approx 2.81$. Since $d < \log_b a$: **Case 1** $\Rightarrow O(n^{\log_2 7}) \approx O(n^{2.81})$

</details>

:::

## Amortised Analysis

:::eli10

Amortised analysis is like calculating the average cost of something over time. Imagine a piggy bank: most days you put in one coin (cheap), but occasionally you break it open and count everything (expensive). If you spread that rare expensive event over all the cheap days, the average cost per day is still low.

:::

:::eli15

Sometimes a single operation can be expensive, but if you look at a *sequence* of operations, the average cost per operation is low. This is **amortised analysis**.

Three methods:
- **Aggregate**: Add up total cost of $n$ operations, divide by $n$
- **Accounting**: Overcharge cheap operations to "save up" for expensive ones
- **Potential**: Define a potential function that increases during cheap operations and drops during expensive ones

Classic example: A dynamic array that doubles when full. A single insert might cost $O(n)$ (copying everything), but averaged over all inserts, each one costs $O(1)$ amortised.

:::

:::eli20

| Method | Idea |
|--------|------|
| Aggregate | Total cost / number of operations |
| Accounting | Assign "credits" to cheap operations |
| Potential | Define potential function tracking state |

**Example**: Dynamic array doubling -- individual insert may cost $O(n)$, but amortised cost is $O(1)$ per insertion.

<details>
<summary><strong>Practice: Complexity Identification</strong></summary>

Determine the time complexity:

```
for i = 1 to n:
    for j = 1 to n:
        sum += A[i][j]
```
Answer: $O(n^2)$ -- nested loops each running $n$ times.

---

```
for i = 1 to n:
    j = n
    while j > 0:
        j = j / 2
```
Answer: $O(n \log n)$ -- outer loop $n$ times, inner halves each time giving $\log n$.

---

```
i = 1
while i < n:
    i = i * 2
```
Answer: $O(\log n)$ -- doubling each step.

</details>

:::

## Space Complexity Notes

:::eli10

Space complexity tells you how much memory an algorithm needs. A simple loop that uses one extra variable takes almost no space. But if you use recursion, each function call uses memory (the call stack), so deep recursion uses lots of space — like stacking plates higher and higher.

:::

:::eli15

Space complexity measures the extra memory an algorithm uses (not counting the input):

- **Iterative algorithms** often use $O(1)$ extra space (just a few variables)
- **Recursive algorithms** use $O(\text{depth})$ space for the call stack
- **Merge sort** needs $O(n)$ extra space for the auxiliary array
- **Quick sort** uses $O(\log n)$ average stack space (in-place partitioning)

A common tradeoff: you can often reduce time complexity by using more space (e.g., hash tables use extra memory to give $O(1)$ lookups).

:::

:::eli20

| Algorithm | Time | Space |
|-----------|------|-------|
| Iterative sum | $O(n)$ | $O(1)$ |
| Recursive sum | $O(n)$ | $O(n)$ (call stack) |
| Merge sort | $O(n\log n)$ | $O(n)$ |
| Quick sort | $O(n\log n)$ avg | $O(\log n)$ avg (stack) |
| BFS | $O(V+E)$ | $O(V)$ (queue) |

:::
