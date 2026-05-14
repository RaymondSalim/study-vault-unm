---
title: "Model Evaluation"
order: 8
moduleTitle: "COMP3038 - Machine Learning"
tags: ["cross-validation", "bias-variance", "overfitting", "regularisation", "ROC", "evaluation"]
---

## Train/Test/Validation Split

:::eli10

Imagine studying for a test. Your textbook is the training set -- you learn from it. Practice quizzes are the validation set -- you use them to figure out which study strategies work best. The final exam is the test set -- you only take it once at the end to see how well you really learned. You never peek at the final exam while studying!

:::

:::eli15
Data is split into three parts. The training set is used to learn model parameters. The validation set is used to tune hyperparameters and choose between different models -- if you trained directly on validation data, you would not know how well the model generalises. The test set is held out completely until the very end for a final, unbiased estimate of performance. Typical splits are 60-80% train, 10-20% validation, and 10-20% test. Never use the test set to make decisions during development.

:::

:::eli20
| Split | Purpose | Typical size |
|-------|---------|-------------|
| Training set | Learn parameters | 60-80% |
| Validation set | Tune hyperparameters, model selection | 10-20% |
| Test set | Final unbiased evaluation | 10-20% |

> **Never** tune on the test set -- this leads to overfitting to test data.

:::

## Cross-Validation

:::eli10

Cross-validation is like having 5 different practice tests instead of just one. You take turns -- each time, a different chunk of data acts as the practice test while you study from the rest. Then you average all 5 scores to get a really reliable idea of how well you have learned. It is fairer than just one test that might happen to be easy or hard.

:::

:::eli15
K-Fold cross-validation splits the data into K equal parts (folds). The model is trained K times -- each time, one fold is held out for validation and the remaining K-1 folds are used for training. The final score is the average across all K evaluations. This gives a more reliable performance estimate than a single train/validation split, especially with limited data. Common choices are K=5 or K=10. Stratified K-Fold preserves class proportions in each fold, which is important for imbalanced datasets.

:::

:::eli20
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

:::

## Bias-Variance Tradeoff

:::eli10

Bias is like always aiming too far to the left when throwing darts -- your average shot is off target (a consistently wrong model). Variance is like your darts landing all over the place -- even if your average is correct, any single throw might be way off (an unstable model). The best model has low bias AND low variance, but making one better usually makes the other worse -- that is the tradeoff.

:::

:::eli15
Every model's error can be decomposed into three parts: bias (systematic error from oversimplifying), variance (sensitivity to the specific training data used), and irreducible noise. Simple models (like linear regression on complex data) have high bias but low variance -- they consistently make the same mistake. Complex models (like deep decision trees) have low bias but high variance -- they fit training data perfectly but perform inconsistently on new data. The goal is to find the sweet spot where total error (bias squared + variance) is minimised. Regularisation and model selection are the tools for navigating this tradeoff.

:::

:::eli20
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

:::

## Overfitting and Regularisation

:::eli10

Overfitting is like memorising the exact answers to practice questions instead of understanding the subject -- you get 100% on practice but fail the real test because the questions are slightly different. Regularisation is like a rule that says "keep your answers simple." It stops the model from memorising noise and forces it to learn the real patterns that work on new data too.

:::

:::eli15
Overfitting occurs when a model learns the training data too well, including its noise and random fluctuations, resulting in poor generalisation. Regularisation techniques penalise model complexity to prevent this. L2 (Ridge) adds a penalty proportional to squared weights, shrinking all weights toward zero. L1 (Lasso) adds a penalty proportional to absolute weights, which can drive some weights to exactly zero (performing feature selection). Dropout randomly disables neurons during training, creating an implicit ensemble. Early stopping halts training when validation performance starts degrading.

:::

:::eli20
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

:::

## Classification Metrics

:::eli10

After your model makes predictions, you need to grade it. Accuracy is the overall percentage correct. But sometimes you care more about specific mistakes -- like a fire alarm that never goes off (misses real fires) is worse than one that occasionally gives a false alarm. Different metrics measure different kinds of mistakes.

:::

:::eli15
Classification metrics go beyond accuracy to capture different aspects of performance. The confusion matrix shows all four outcomes: true positives, false positives, true negatives, and false negatives. From this, you can compute precision (how reliable are positive predictions), recall (how completely are positives found), and F1 (the balance of both). The ROC curve plots true positive rate vs false positive rate at various thresholds, and its AUC summarizes overall ranking quality. For imbalanced datasets, precision-recall curves are more informative than ROC.

:::

:::eli20
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

:::

## Regression Metrics

:::eli10

For problems where the model predicts a number (not a category), you measure how far off the predictions are from the true values. MSE squares the errors so big mistakes are penalised heavily. MAE just averages the absolute differences. R-squared tells you what percentage of the pattern in the data your model has captured.

:::

:::eli15
Regression metrics measure prediction error as a continuous quantity. Mean Squared Error (MSE) averages the squared differences, making it sensitive to large errors. Root Mean Squared Error (RMSE) is in the same units as the target variable, making it more interpretable. Mean Absolute Error (MAE) is more robust to outliers. R-squared indicates the proportion of variance in the target that the model explains -- a value of 1 means perfect prediction, 0 means no better than predicting the mean, and negative values mean worse than predicting the mean.

:::

:::eli20
| Metric | Formula | Notes |
|--------|---------|-------|
| MSE | $\frac{1}{m}\sum(y_i - \hat{y}_i)^2$ | Penalises large errors more |
| RMSE | $\sqrt{\text{MSE}}$ | Same units as target |
| MAE | $\frac{1}{m}\sum|y_i - \hat{y}_i|$ | Robust to outliers |
| $R^2$ | $1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}}$ | Proportion of variance explained |

:::

## Learning Curves

:::eli10

Learning curves are like tracking how a student improves as they study more and more. You plot how the model performs as you give it more training data. If the model is too simple, more data will not help much. If the model is too complex, more data will gradually close the gap between training and test performance.

:::

:::eli15
Learning curves plot training error and validation error as a function of training set size. They are a diagnostic tool for the bias-variance tradeoff. If both errors are high and converge together, the model has high bias (too simple) -- adding more data will not help; you need a more powerful model. If training error is low but validation error is much higher (a gap), the model has high variance (overfitting) -- adding more training data will help close the gap. This guides whether you should collect more data or change your model.

:::

:::eli20
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

:::
