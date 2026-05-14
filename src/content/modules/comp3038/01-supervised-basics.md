---
title: "Supervised Learning Basics"
order: 1
moduleTitle: "COMP3038 - Machine Learning"
tags: ["linear-regression", "gradient-descent", "cost-function", "supervised-learning"]
---

## Supervised Learning Overview

:::eli10

Supervised learning is like a teacher showing you flashcards with questions and answers. The computer sees lots of examples (like "this picture is a cat") and learns the pattern so it can answer new questions it has never seen before. If the answer is a number (like a price), it is called regression; if the answer is a category (like cat or dog), it is called classification.

:::

:::eli15

In supervised learning, you give the model a training set of input-output pairs. The model learns a function that maps inputs to outputs. There are two main types: regression (predicting continuous values like temperature or price) and classification (predicting categories like spam/not-spam). The model makes a hypothesis -- essentially a formula -- that takes in features and produces a prediction, and the goal is to make this hypothesis as accurate as possible on new, unseen data.

:::

:::eli20

| Concept | Description |
|---------|-------------|
| Training set | Labelled data $(x^{(i)}, y^{(i)})$ for $i = 1, \ldots, m$ |
| Hypothesis | Function $h_\theta(x)$ mapping inputs to predictions |
| Regression | Output is continuous (e.g., price, temperature) |
| Classification | Output is discrete (e.g., spam/not spam) |

:::

## Linear Regression

:::eli10

Linear regression draws the best straight line through a bunch of dots on a graph. Imagine you are plotting how tall kids are based on their age -- linear regression finds the line that gets closest to all the dots, so you can predict how tall a kid might be at any age.

:::

:::eli15

Linear regression models the relationship between input features and a continuous output as a weighted sum. Each feature gets a weight (coefficient), and the model predicts by multiplying each feature by its weight and adding them up (plus a bias term). The "cost function" measures how wrong the predictions are on average -- specifically, it uses the mean squared error between predicted and actual values. The model's job is to find the weights that minimize this error.

:::

:::eli20

### Model

$$h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \cdots + \theta_n x_n = \boldsymbol{\theta}^T \mathbf{x}$$

where $\mathbf{x} = [1, x_1, x_2, \ldots, x_n]^T$ (with bias term).

### Cost Function (MSE)

$$J(\boldsymbol{\theta}) = \frac{1}{2m} \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right)^2$$

| Property | Detail |
|----------|--------|
| Convex | Yes -- single global minimum for linear regression |
| Why $\frac{1}{2m}$? | The $\frac{1}{2}$ cancels with derivative; $\frac{1}{m}$ averages over samples |

:::

## Gradient Descent

:::eli10

Gradient descent is like being blindfolded on a hill and trying to get to the bottom. You feel which way is downhill and take a small step in that direction. You keep doing this until you reach the lowest point. The computer does the same thing to find the best answer -- it adjusts its guess a little bit at a time, always moving toward less error.

:::

:::eli15

Gradient descent is an optimization algorithm that iteratively adjusts the model's parameters to minimize the cost function. At each step, it calculates the slope (gradient) of the cost function and moves the parameters in the direction that reduces the error. The "learning rate" controls how big each step is -- too small and it takes forever, too large and you might overshoot the minimum. There are variants: batch (uses all data per step), stochastic (uses one sample), and mini-batch (uses a small group of samples).

:::

:::eli20

### Update Rule

$$\theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\boldsymbol{\theta})$$

For linear regression:

$$\theta_j := \theta_j - \frac{\alpha}{m} \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right) x_j^{(i)}$$

### Variants

| Variant | Batch size | Pros | Cons |
|---------|-----------|------|------|
| Batch GD | All $m$ samples | Stable convergence | Slow for large $m$ |
| Stochastic GD (SGD) | 1 sample | Fast updates | Noisy, oscillates |
| Mini-batch GD | $b$ samples (e.g., 32, 64) | Best of both | Requires tuning $b$ |

### Learning Rate $\alpha$

| $\alpha$ too small | $\alpha$ too large |
|-------------------|-------------------|
| Slow convergence | Overshoots, may diverge |

:::

## Normal Equation (Closed-Form)

:::eli10

Instead of slowly walking downhill (gradient descent), the normal equation is like a magic shortcut that instantly tells you the answer in one step. It works great when you do not have too many features, but for really big problems, the slow-walking method is actually faster overall.

:::

:::eli15

The normal equation is a direct mathematical formula that solves for the optimal weights in one computation, without any iteration. It works by solving a system of linear equations using matrix algebra. The trade-off is that it requires inverting a matrix, which becomes very expensive (slow) when you have many features (more than about 10,000). For smaller problems, it is often simpler than gradient descent because there is no learning rate to tune.

:::

:::eli20

$$\boldsymbol{\theta} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$$

| Gradient Descent | Normal Equation |
|-----------------|-----------------|
| Need to choose $\alpha$ | No $\alpha$ needed |
| Iterative | One-step computation |
| $O(kn^2)$ per iteration | $O(n^3)$ for matrix inverse |
| Works well when $n$ large | Slow when $n > 10{,}000$ |

:::

## Feature Scaling

:::eli10

Imagine one feature is measured in millimetres (like 1000mm) and another in kilometres (like 2km). They are very different sizes, and that confuses the learning process. Feature scaling is like converting everything to the same units so the computer can learn fairly from all the information.

:::

:::eli15

Feature scaling ensures all input features are on a similar numerical range. Without it, features with larger values dominate the cost function, and gradient descent takes a zigzag path instead of going straight to the minimum. Two common methods are min-max normalisation (rescaling to [0,1]) and standardisation (rescaling so the mean is 0 and standard deviation is 1). This significantly speeds up convergence.

:::

:::eli20

Ensure features are on similar scales to speed up gradient descent.

| Method | Formula | Range |
|--------|---------|-------|
| Min-max normalisation | $x' = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$ | $[0, 1]$ |
| Standardisation (z-score) | $x' = \frac{x - \mu}{\sigma}$ | $\approx [-3, 3]$ |

:::

## Polynomial Regression

:::eli10

Sometimes the best fit is not a straight line but a curve. Polynomial regression lets you draw curves through your data -- like a roller coaster line instead of just a flat ramp. You create new features by squaring or cubing the original ones, and the model learns how to use those curves.

:::

:::eli15

When the relationship between inputs and output is not linear, you can add polynomial features (like x squared, x cubed) to capture curved patterns. The model itself is still linear in its parameters -- you are just giving it richer features to work with. However, polynomial features can grow very large in magnitude, making feature scaling critical. Higher-degree polynomials risk overfitting if not regularised.

:::

:::eli20

Create new features from existing ones:

$$h_\theta(x) = \theta_0 + \theta_1 x + \theta_2 x^2 + \theta_3 x^3$$

> Feature scaling becomes **critical** with polynomial features since $x^3$ can be huge.

<details>
<summary><strong>Practice: Derive the gradient for MSE cost</strong></summary>

Given $J(\theta) = \frac{1}{2m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})^2$:

$$\frac{\partial J}{\partial \theta_j} = \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_j^{(i)}$$

Steps:
1. Apply chain rule to the squared term
2. The $\frac{1}{2}$ cancels with the power of 2
3. Derivative of $h_\theta(x)$ w.r.t. $\theta_j$ is $x_j$
</details>

<details>
<summary><strong>Practice: When would you use Normal Equation over GD?</strong></summary>

- Small number of features ($n < 10{,}000$)
- Exact solution needed (no hyperparameter tuning)
- Dataset fits in memory for matrix operations
- $\mathbf{X}^T\mathbf{X}$ is invertible (features are not redundant)
</details>

:::
