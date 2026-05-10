---
title: "Classification"
order: 2
moduleTitle: "COMP3038 - Machine Learning"
tags: ["logistic-regression", "classification", "decision-boundary", "softmax", "multi-class"]
---

## Logistic Regression

### Model

$$h_\theta(x) = \sigma(\boldsymbol{\theta}^T \mathbf{x}) = \frac{1}{1 + e^{-\boldsymbol{\theta}^T \mathbf{x}}}$$

where $\sigma(z)$ is the **sigmoid function**.

| Property of $\sigma(z)$ | Value |
|--------------------------|-------|
| Range | $(0, 1)$ |
| $\sigma(0)$ | $0.5$ |
| $\sigma(z) \to 1$ as | $z \to +\infty$ |
| $\sigma(z) \to 0$ as | $z \to -\infty$ |
| Derivative | $\sigma(z)(1 - \sigma(z))$ |

### Decision Boundary

Predict $y = 1$ if $h_\theta(x) \geq 0.5$, i.e., $\boldsymbol{\theta}^T \mathbf{x} \geq 0$.

- **Linear boundary**: $\theta_0 + \theta_1 x_1 + \theta_2 x_2 = 0$ (a line/plane)
- **Non-linear boundary**: Add polynomial features (e.g., $x_1^2, x_1 x_2$)

### Cost Function (Log Loss / Binary Cross-Entropy)

$$J(\boldsymbol{\theta}) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)} \log(h_\theta(x^{(i)})) + (1 - y^{(i)}) \log(1 - h_\theta(x^{(i)})) \right]$$

| Why not MSE? | Reason |
|--------------|--------|
| Non-convex with sigmoid | Multiple local minima |
| Log loss is convex | Guaranteed global optimum with GD |

### Gradient

$$\frac{\partial J}{\partial \theta_j} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}$$

> Same form as linear regression gradient, but $h_\theta(x)$ is now the sigmoid.

## Multi-Class Classification

### One-vs-Rest (OvR / OvA)

For $K$ classes, train $K$ binary classifiers:

$$h_\theta^{(k)}(x) = P(y = k \mid x; \theta)$$

Predict: $\hat{y} = \arg\max_k h_\theta^{(k)}(x)$

### Softmax Regression (Multinomial Logistic)

$$P(y = k \mid x) = \frac{e^{\boldsymbol{\theta}_k^T \mathbf{x}}}{\sum_{j=1}^{K} e^{\boldsymbol{\theta}_j^T \mathbf{x}}}$$

| Property | Detail |
|----------|--------|
| Output | Probability distribution over $K$ classes |
| Sum of probabilities | Exactly 1 |
| Cost function | Cross-entropy: $-\sum_{k} y_k \log(\hat{p}_k)$ |
| Reduces to logistic | When $K = 2$ |

## Regularised Logistic Regression

$$J(\boldsymbol{\theta}) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)} \log(h_\theta(x^{(i)})) + (1-y^{(i)}) \log(1-h_\theta(x^{(i)})) \right] + \frac{\lambda}{2m} \sum_{j=1}^{n} \theta_j^2$$

> Note: $\theta_0$ (bias) is **not** regularised.

## Evaluation Metrics for Classification

| Metric | Formula | Use when |
|--------|---------|----------|
| Accuracy | $\frac{TP + TN}{TP + TN + FP + FN}$ | Balanced classes |
| Precision | $\frac{TP}{TP + FP}$ | Cost of FP is high (e.g., spam filter) |
| Recall | $\frac{TP}{TP + FN}$ | Cost of FN is high (e.g., disease detection) |
| F1-score | $\frac{2 \cdot P \cdot R}{P + R}$ | Imbalanced classes |

### Confusion Matrix

|  | Predicted Positive | Predicted Negative |
|--|-------------------|-------------------|
| **Actual Positive** | TP | FN |
| **Actual Negative** | FP | TN |

<details>
<summary><strong>Practice: Why is log loss convex for logistic regression?</strong></summary>

The negative log-likelihood of the Bernoulli distribution with sigmoid parameterisation is convex because:
1. $-\log(\sigma(z))$ is convex in $z$
2. $-\log(1 - \sigma(z))$ is convex in $z$
3. Non-negative weighted sum of convex functions is convex
4. Composition with linear $\boldsymbol{\theta}^T\mathbf{x}$ preserves convexity
</details>

<details>
<summary><strong>Practice: Threshold tuning</strong></summary>

Default threshold is 0.5, but you can adjust:
- **Increase threshold** (e.g., 0.7): Higher precision, lower recall
- **Decrease threshold** (e.g., 0.3): Higher recall, lower precision

Use **precision-recall curve** or **ROC curve** to choose optimal threshold for your application.
</details>
