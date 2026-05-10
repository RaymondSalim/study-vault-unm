---
title: "Model Evaluation"
order: 8
moduleTitle: "COMP3038 - Machine Learning"
tags: ["cross-validation", "bias-variance", "overfitting", "regularisation", "ROC", "evaluation"]
---

## Train/Test/Validation Split

| Split | Purpose | Typical size |
|-------|---------|-------------|
| Training set | Learn parameters | 60-80% |
| Validation set | Tune hyperparameters, model selection | 10-20% |
| Test set | Final unbiased evaluation | 10-20% |

> **Never** tune on the test set -- this leads to overfitting to test data.

## Cross-Validation

### K-Fold Cross-Validation

1. Split data into $K$ equal folds
2. For each fold $k$: train on $K-1$ folds, validate on fold $k$
3. Average performance across all $K$ folds

$$\text{CV Score} = \frac{1}{K}\sum_{k=1}^K \text{Score}_k$$

| $K$ | Pros | Cons |
|-----|------|------|
| 5 | Good balance, common default | -- |
| 10 | Lower bias | Higher variance, slower |
| $m$ (LOOCV) | Minimum bias | Very high variance, expensive |

### Stratified K-Fold

Preserves class proportions in each fold. Essential for imbalanced datasets.

## Bias-Variance Tradeoff

$$\text{Expected Error} = \text{Bias}^2 + \text{Variance} + \text{Irreducible Noise}$$

| Term | Definition | Source |
|------|-----------|--------|
| Bias | $E[\hat{f}(x)] - f(x)$ | Model too simple (underfitting) |
| Variance | $E[(\hat{f}(x) - E[\hat{f}(x)])^2]$ | Model too complex (overfitting) |
| Noise | $\sigma^2$ | Inherent data randomness |

### Diagnosis

| Symptom | Problem | Fix |
|---------|---------|-----|
| High train error, high test error | High bias (underfit) | More features, more complex model, less regularisation |
| Low train error, high test error | High variance (overfit) | More data, fewer features, more regularisation |
| Low train error, low test error | Good fit | -- |

## Overfitting and Regularisation

### Regularisation Methods

| Method | Penalty | Effect on weights |
|--------|---------|-------------------|
| L2 (Ridge) | $\lambda\sum_j \theta_j^2$ | Shrinks all weights (small but non-zero) |
| L1 (Lasso) | $\lambda\sum_j |\theta_j|$ | Drives some weights to exactly 0 (feature selection) |
| Elastic Net | $\lambda_1\sum|\theta_j| + \lambda_2\sum\theta_j^2$ | Combination of L1 and L2 |
| Dropout | Randomly zero neurons (prob $p$) | Ensemble effect, prevents co-adaptation |
| Early stopping | Stop when validation error increases | Implicit regularisation |

### L2 Regularised Cost

$$J_{\text{reg}}(\theta) = J(\theta) + \frac{\lambda}{2m}\sum_{j=1}^n \theta_j^2$$

Gradient update becomes:

$$\theta_j \leftarrow \theta_j\left(1 - \frac{\alpha\lambda}{m}\right) - \frac{\alpha}{m}\sum_i (h_\theta(x^{(i)}) - y^{(i)})x_j^{(i)}$$

> The term $(1 - \frac{\alpha\lambda}{m})$ is "weight decay" -- shrinks weights each step.

### Choosing $\lambda$

| $\lambda$ too small | $\lambda$ too large |
|--------------------|--------------------|
| Barely regularises | All weights near zero |
| Overfitting | Underfitting |
| Use cross-validation to select optimal $\lambda$ | |

## Classification Metrics

### Confusion Matrix

|  | Predicted + | Predicted - |
|--|-------------|-------------|
| **Actual +** | TP | FN |
| **Actual -** | FP | TN |

### Metrics Summary

| Metric | Formula | Intuition |
|--------|---------|-----------|
| Accuracy | $\frac{TP+TN}{TP+TN+FP+FN}$ | Overall correctness |
| Precision | $\frac{TP}{TP+FP}$ | "Of predicted +, how many correct?" |
| Recall (Sensitivity) | $\frac{TP}{TP+FN}$ | "Of actual +, how many found?" |
| Specificity | $\frac{TN}{TN+FP}$ | "Of actual -, how many correct?" |
| F1-Score | $\frac{2PR}{P+R}$ | Harmonic mean of precision & recall |
| F$_\beta$-Score | $\frac{(1+\beta^2)PR}{\beta^2 P + R}$ | Weighted harmonic mean |

### ROC Curve

- Plot **TPR** (recall) vs **FPR** ($1 - \text{specificity}$) at various thresholds
- **AUC** (Area Under Curve): probability that a random positive is ranked higher than a random negative
- AUC = 0.5: random classifier; AUC = 1.0: perfect

### Precision-Recall Curve

Better than ROC for **imbalanced datasets** where negatives dominate.

## Regression Metrics

| Metric | Formula | Notes |
|--------|---------|-------|
| MSE | $\frac{1}{m}\sum(y_i - \hat{y}_i)^2$ | Penalises large errors more |
| RMSE | $\sqrt{\text{MSE}}$ | Same units as target |
| MAE | $\frac{1}{m}\sum|y_i - \hat{y}_i|$ | Robust to outliers |
| $R^2$ | $1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}}$ | Proportion of variance explained |

## Learning Curves

Plot training and validation error vs training set size:

| Pattern | Diagnosis |
|---------|-----------|
| Both errors high and close | High bias |
| Training error low, validation high (gap) | High variance |
| Both converge low | Good fit |

> Adding more data helps high variance but **not** high bias.

<details>
<summary><strong>Practice: When to use which metric?</strong></summary>

- **Spam filter**: High precision (don't lose important emails)
- **Cancer screening**: High recall (don't miss cases)
- **Balanced dataset, equal costs**: Accuracy or F1
- **Ranking (recommendations)**: AUC-ROC
- **Highly imbalanced**: F1, PR-AUC (not accuracy!)
</details>

<details>
<summary><strong>Practice: L1 vs L2 geometric intuition</strong></summary>

- L2 penalty: constraint region is a circle/sphere. Optimal point is where cost contour touches the sphere -- generally not on an axis, so weights are small but non-zero.
- L1 penalty: constraint region is a diamond/rhombus. Corners lie on axes, so cost contour likely touches at a corner, driving some weights to exactly zero.
- This is why L1 performs **feature selection** and L2 does not.
</details>
