---
title: "Prerequisites"
order: 96
moduleTitle: "COMP3038 - Machine Learning"
tags: ["prerequisites", "preparation", "self-test"]
---

## Prerequisites

### Required Knowledge

| Area | Specifics |
|------|-----------|
| Linear algebra | Vectors, matrices, dot products, eigenvalues, matrix inversion |
| Calculus | Derivatives, partial derivatives, chain rule, gradient |
| Probability and statistics | Bayes' theorem, distributions (Gaussian, Bernoulli), expectation, variance |
| Programming (Python) | NumPy, basic plotting (matplotlib), scikit-learn usage |
| Basic algorithms | Sorting, searching, computational complexity (Big-O) |

### Helpful Prior Modules

| Module | Why it helps |
|--------|-------------|
| Statistics / Probability | Distributions, hypothesis testing, Bayesian reasoning -- core to many ML methods |
| Linear Algebra | Matrix operations, eigendecomposition -- essential for PCA, SVMs, neural networks |
| Calculus / Optimisation | Gradient computation, convexity -- needed for gradient descent and loss minimisation |
| Programming / Data Structures | Implementing algorithms efficiently, working with datasets |
| Artificial Intelligence | Search, reasoning, basic classifiers -- provides conceptual foundation |

### Self-Test: Are You Ready?

Answer these 5 questions. If you struggle with more than 2, revise the prerequisite material first.

1. **Compute the derivative of f(x) = 3x^2 + 2x - 1.** (Expected: `f'(x) = 6x + 2`)
2. **Given P(A) = 0.3, P(B|A) = 0.8, P(B|not A) = 0.1, find P(A|B) using Bayes' theorem.** (Expected: `P(A|B) = (0.8*0.3) / (0.8*0.3 + 0.1*0.7) = 0.24/0.31 ≈ 0.77`)
3. **What is the dot product of vectors [1,2,3] and [4,5,6]?** (Expected: `1*4 + 2*5 + 3*6 = 32`)
4. **In Python/NumPy, how do you compute the mean of each column in a 2D array X?** (Expected: `np.mean(X, axis=0)`)
5. **What is the time complexity of a naive nested-loop distance computation between n points?** (Expected: O(n^2))
