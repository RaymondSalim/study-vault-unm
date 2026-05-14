---
title: "Support Vector Machines"
order: 4
moduleTitle: "COMP3038 - Machine Learning"
tags: ["svm", "kernel-trick", "margin", "support-vectors", "classification"]
---

## Linear SVM

:::eli10

Imagine you have red dots and blue dots on a table and you need to put a ruler between them to separate the two colours. An SVM finds the position for the ruler that keeps it as far away from both groups as possible -- like drawing a road with the widest possible lanes between the two groups. The dots closest to the road are called "support vectors" because they are the ones holding the boundary in place.

:::

:::eli15
A Support Vector Machine finds the decision boundary (hyperplane) that separates two classes with the largest possible margin. The margin is the gap between the boundary and the nearest data points on either side. Maximising this margin tends to give better generalisation. In practice, data is rarely perfectly separable, so a "soft margin" SVM allows some points to be on the wrong side by introducing slack variables, controlled by a parameter C. Large C means fewer violations (possible overfitting); small C means wider margin (possible underfitting).

:::

:::eli20
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

:::

## The Kernel Trick

:::eli10

What if the red and blue dots are all mixed together and no straight line can separate them? The kernel trick is like lifting the dots off the flat table into the air (a higher dimension) where they suddenly become easy to separate with a flat sheet. The clever part is that the computer can do this without actually computing all the lifted positions -- it uses a shortcut formula.

:::

:::eli15
When data is not linearly separable, the kernel trick allows an SVM to find non-linear decision boundaries. The idea is to map data into a higher-dimensional space where a linear separator exists. Instead of computing this expensive mapping explicitly, kernels compute the dot product in the higher-dimensional space directly using a formula on the original data. Common kernels include polynomial (for polynomial boundaries) and RBF/Gaussian (for complex, smooth boundaries). The RBF kernel effectively maps to infinite dimensions.

:::

:::eli20
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

:::

## SVM for Multi-Class

:::eli10

SVMs are designed to separate two groups, but what if you have more than two? You can run many little two-group competitions. For example, with cats, dogs, and birds, you run: cats vs dogs, cats vs birds, dogs vs birds -- then see which animal wins the most matchups.

:::

:::eli15
Since SVMs are inherently binary classifiers, multi-class problems require combining multiple SVMs. One-vs-Rest trains K classifiers (one per class, each separating that class from all others). One-vs-One trains a classifier for every pair of classes and uses majority voting. One-vs-One requires more classifiers but each one trains on less data, which can be faster for large datasets.

:::

:::eli20
| Strategy | Classifiers | Prediction |
|----------|------------|------------|
| One-vs-Rest (OvR) | $K$ classifiers | Highest score |
| One-vs-One (OvO) | $\binom{K}{2}$ classifiers | Majority vote |

:::

## SVM vs Logistic Regression

:::eli10

Both SVM and logistic regression draw a line between groups, but they have different goals. Logistic regression tries to estimate the probability of being in each group. SVM just cares about drawing the line with the widest possible gap. They often give similar results, but each has situations where it shines.

:::

:::eli15
SVM and logistic regression are both linear classifiers, but differ in their loss functions and outputs. Logistic regression outputs probabilities and uses log loss, making it naturally suited for problems where you need confidence estimates. SVM uses hinge loss and maximises margin, which often gives better generalisation with fewer support points. SVM also naturally supports the kernel trick for non-linear boundaries. For high-dimensional, sparse data, both work well; SVM tends to be more robust to outliers due to its dependence on only the support vectors.

:::

:::eli20
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

:::
