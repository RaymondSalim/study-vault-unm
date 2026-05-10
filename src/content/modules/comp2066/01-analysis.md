---
title: "Algorithm Analysis"
order: 1
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["big-o", "complexity", "recurrences", "master-theorem"]
---

## Asymptotic Notation

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

## Common Growth Rates

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

## Big-O Rules

| Rule | Statement |
|------|-----------|
| Sum | $O(f + g) = O(\max(f, g))$ |
| Product | $O(f \cdot g) = O(f) \cdot O(g)$ |
| Constant | $O(c \cdot f) = O(f)$ |
| Transitivity | $f = O(g)$ and $g = O(h) \Rightarrow f = O(h)$ |

## Time vs Space Complexity

| Aspect | Measures | Example |
|--------|----------|---------|
| Time | Number of operations | Comparisons in sorting |
| Space | Extra memory used | Auxiliary array in merge sort |

**Best / Worst / Average**: Always specify which case unless context is clear.

## Recurrence Relations

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

## Master Theorem

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

## Amortised Analysis

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

## Space Complexity Notes

| Algorithm | Time | Space |
|-----------|------|-------|
| Iterative sum | $O(n)$ | $O(1)$ |
| Recursive sum | $O(n)$ | $O(n)$ (call stack) |
| Merge sort | $O(n\log n)$ | $O(n)$ |
| Quick sort | $O(n\log n)$ avg | $O(\log n)$ avg (stack) |
| BFS | $O(V+E)$ | $O(V)$ (queue) |
