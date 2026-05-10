---
title: "Supervised Learning Basics"
order: 1
moduleTitle: "COMP3038 - Machine Learning"
tags: ["linear-regression", "gradient-descent", "cost-function", "supervised-learning"]
---

## Supervised Learning Overview

| Concept | Description |
|---------|-------------|
| Training set | Labelled data $(x^{(i)}, y^{(i)})$ for $i = 1, \ldots, m$ |
| Hypothesis | Function $h_\theta(x)$ mapping inputs to predictions |
| Regression | Output is continuous (e.g., price, temperature) |
| Classification | Output is discrete (e.g., spam/not spam) |

## Linear Regression

### Model

$$h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \cdots + \theta_n x_n = \boldsymbol{\theta}^T \mathbf{x}$$

where $\mathbf{x} = [1, x_1, x_2, \ldots, x_n]^T$ (with bias term).

### Cost Function (MSE)

$$J(\boldsymbol{\theta}) = \frac{1}{2m} \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right)^2$$

| Property | Detail |
|----------|--------|
| Convex | Yes -- single global minimum for linear regression |
| Why $\frac{1}{2m}$? | The $\frac{1}{2}$ cancels with derivative; $\frac{1}{m}$ averages over samples |

## Gradient Descent

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

## Normal Equation (Closed-Form)

$$\boldsymbol{\theta} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$$

| Gradient Descent | Normal Equation |
|-----------------|-----------------|
| Need to choose $\alpha$ | No $\alpha$ needed |
| Iterative | One-step computation |
| $O(kn^2)$ per iteration | $O(n^3)$ for matrix inverse |
| Works well when $n$ large | Slow when $n > 10{,}000$ |

## Feature Scaling

Ensure features are on similar scales to speed up gradient descent.

| Method | Formula | Range |
|--------|---------|-------|
| Min-max normalisation | $x' = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$ | $[0, 1]$ |
| Standardisation (z-score) | $x' = \frac{x - \mu}{\sigma}$ | $\approx [-3, 3]$ |

## Polynomial Regression

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
