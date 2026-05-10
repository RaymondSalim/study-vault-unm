---
title: "Support Vector Machines"
order: 4
moduleTitle: "COMP3038 - Machine Learning"
tags: ["svm", "kernel-trick", "margin", "support-vectors", "classification"]
---

## Linear SVM

### Intuition

Find the hyperplane that maximises the **margin** -- the distance between the decision boundary and the closest data points (support vectors).

### Hard-Margin SVM (Linearly Separable)

$$\min_{\mathbf{w}, b} \frac{1}{2} \|\mathbf{w}\|^2$$

subject to: $y^{(i)}(\mathbf{w}^T \mathbf{x}^{(i)} + b) \geq 1, \quad \forall i$

| Term | Meaning |
|------|---------|
| $\mathbf{w}$ | Normal vector to hyperplane |
| $b$ | Bias/offset |
| Margin width | $\frac{2}{\|\mathbf{w}\|}$ |
| Support vectors | Points where $y^{(i)}(\mathbf{w}^T \mathbf{x}^{(i)} + b) = 1$ |

### Soft-Margin SVM (Non-Separable)

Allow some misclassifications with slack variables $\xi_i \geq 0$:

$$\min_{\mathbf{w}, b, \xi} \frac{1}{2} \|\mathbf{w}\|^2 + C \sum_{i=1}^m \xi_i$$

subject to: $y^{(i)}(\mathbf{w}^T \mathbf{x}^{(i)} + b) \geq 1 - \xi_i$

| $C$ value | Effect |
|-----------|--------|
| Large $C$ | Small margin, few violations (may overfit) |
| Small $C$ | Large margin, more violations (may underfit) |

### Hinge Loss Interpretation

Equivalent unconstrained form:

$$\min_{\mathbf{w}} \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_{i=1}^m \max(0, 1 - y^{(i)}(\mathbf{w}^T\mathbf{x}^{(i)} + b))$$

## The Kernel Trick

### Dual Formulation

The SVM optimisation can be rewritten so it only depends on **dot products** $\langle \mathbf{x}^{(i)}, \mathbf{x}^{(j)} \rangle$.

Replace dot products with a kernel function: $K(\mathbf{x}^{(i)}, \mathbf{x}^{(j)}) = \phi(\mathbf{x}^{(i)})^T \phi(\mathbf{x}^{(j)})$

> Compute dot product in high-dimensional space **without** explicitly mapping there.

### Common Kernels

| Kernel | Formula | Use case |
|--------|---------|----------|
| Linear | $K(\mathbf{x}, \mathbf{z}) = \mathbf{x}^T \mathbf{z}$ | Linearly separable data |
| Polynomial | $K(\mathbf{x}, \mathbf{z}) = (\mathbf{x}^T \mathbf{z} + c)^d$ | Polynomial boundaries |
| RBF (Gaussian) | $K(\mathbf{x}, \mathbf{z}) = \exp(-\gamma \|\mathbf{x} - \mathbf{z}\|^2)$ | Complex, non-linear |
| Sigmoid | $K(\mathbf{x}, \mathbf{z}) = \tanh(\alpha \mathbf{x}^T \mathbf{z} + c)$ | Neural network-like |

### RBF Kernel Parameter $\gamma$

| $\gamma$ large | $\gamma$ small |
|----------------|----------------|
| Tight Gaussian, complex boundary | Wide Gaussian, smoother boundary |
| May overfit | May underfit |
| Each point has local influence | Points have global influence |

### Mercer's Condition

A function $K$ is a valid kernel iff the kernel matrix $K_{ij} = K(\mathbf{x}^{(i)}, \mathbf{x}^{(j)})$ is **positive semi-definite** for all datasets.

## SVM for Multi-Class

| Strategy | Classifiers | Prediction |
|----------|------------|------------|
| One-vs-Rest (OvR) | $K$ classifiers | Highest score |
| One-vs-One (OvO) | $\binom{K}{2}$ classifiers | Majority vote |

## SVM vs Logistic Regression

| | SVM | Logistic Regression |
|-|-----|---------------------|
| Loss | Hinge loss | Log loss |
| Output | Class label (or distance) | Probability |
| Sparse solution | Yes (support vectors only) | No |
| Kernel trick | Natural | Possible but less common |
| Large $n$, small $m$ | Works well | Works well |

<details>
<summary><strong>Practice: Why do only support vectors matter?</strong></summary>

The dual formulation shows that the solution depends only on data points with non-zero Lagrange multipliers ($\alpha_i > 0$). These are precisely the points on or inside the margin (support vectors). Moving other points does not change the decision boundary.
</details>

<details>
<summary><strong>Practice: RBF kernel maps to infinite dimensions -- how?</strong></summary>

The Taylor expansion of $e^{-\gamma\|\mathbf{x}-\mathbf{z}\|^2}$ yields an infinite series of polynomial terms. This means the implicit feature map $\phi(\mathbf{x})$ is infinite-dimensional. The kernel trick avoids computing this explicitly by only needing $K(\mathbf{x}, \mathbf{z})$.
</details>
