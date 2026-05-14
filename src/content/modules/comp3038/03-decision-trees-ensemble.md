---
title: "Decision Trees and Ensemble Methods"
order: 3
moduleTitle: "COMP3038 - Machine Learning"
tags: ["decision-trees", "random-forest", "boosting", "bagging", "ensemble"]
---

## Decision Trees

:::eli10

A decision tree works like a game of 20 questions. It asks simple yes/no questions about the data, one after another, until it narrows down to an answer. For example: "Is the animal bigger than a cat? Yes. Does it have stripes? Yes. It is a tiger!" Each question splits the possibilities into smaller groups.

:::

:::eli15
Decision trees partition the feature space by asking a series of threshold-based questions on individual features. At each node, the tree picks the question (feature + threshold) that best separates the data into purer groups. "Purity" is measured by criteria like entropy (information gain) or Gini impurity. Trees are easy to interpret but prone to overfitting -- they can memorise the training data by growing too deep. Pruning techniques (limiting depth, requiring minimum samples per leaf) help control this.

:::

:::eli20
### How They Work

Recursively split the feature space using axis-aligned thresholds to create rectangular decision regions.

### Splitting Criteria

| Criterion | Formula | Used for |
|-----------|---------|----------|
| Information Gain (Entropy) | $H(S) = -\sum_{k=1}^K p_k \log_2 p_k$ | Classification (ID3, C4.5) |
| Gini Impurity | $G(S) = 1 - \sum_{k=1}^K p_k^2$ | Classification (CART) |
| Variance Reduction | $\text{Var}(S) - \sum \frac{|S_i|}{|S|}\text{Var}(S_i)$ | Regression |

### Information Gain

$$\text{IG}(S, A) = H(S) - \sum_{v \in \text{values}(A)} \frac{|S_v|}{|S|} H(S_v)$$

Choose attribute $A$ that maximises IG (equivalently, minimises remaining entropy).

### Properties

| Advantage | Disadvantage |
|-----------|--------------|
| Interpretable (white box) | Prone to overfitting |
| Handles mixed feature types | Unstable (small data change = different tree) |
| No feature scaling needed | Biased towards features with many values |
| Fast inference | High variance |

### Pruning

| Type | When | Method |
|------|------|--------|
| Pre-pruning | During training | Max depth, min samples per leaf, min info gain |
| Post-pruning | After training | Reduced error pruning, cost-complexity pruning ($\alpha$) |

:::

## Ensemble Methods

:::eli10

Imagine asking one friend for advice versus asking 100 friends and going with the most popular answer. Ensemble methods work the same way -- instead of relying on one model, they combine many models together. The combined answer is usually much better than any single model's answer because individual mistakes tend to cancel out.

:::

:::eli15
Ensemble methods combine multiple "weak" models to create a stronger overall model. The two main strategies are bagging and boosting. Bagging (like Random Forests) trains many models independently on random subsets of the data and averages their predictions -- this reduces variance (overfitting). Boosting (like XGBoost) trains models one after another, where each new model focuses on fixing the mistakes of the previous ones -- this reduces bias (underfitting). Ensembles almost always outperform individual models.

:::

:::eli20
> Combine multiple weak learners to create a strong learner.

### Bagging (Bootstrap Aggregating)

1. Create $B$ bootstrap samples (sample with replacement)
2. Train one model on each sample
3. Aggregate predictions: **majority vote** (classification) or **average** (regression)

$$\hat{f}(x) = \frac{1}{B} \sum_{b=1}^B f_b(x)$$

| Property | Effect |
|----------|--------|
| Reduces | Variance |
| Does not reduce | Bias |
| Works best with | High-variance models (deep trees) |

### Random Forests

Bagging + **random feature selection** at each split.

| Parameter | Typical value |
|-----------|---------------|
| Number of trees | 100--500 |
| Features per split (classification) | $\sqrt{n}$ |
| Features per split (regression) | $n/3$ |

**Why random features?** De-correlates trees, further reducing variance.

### Out-of-Bag (OOB) Error

- Each bootstrap sample leaves out $\approx 37\%$ of data
- Use these OOB samples as a "free" validation set
- No need for separate cross-validation

### Boosting

Train models **sequentially**, each correcting errors of the previous.

| Algorithm | Key Idea | Loss |
|-----------|----------|------|
| AdaBoost | Re-weight misclassified samples | Exponential |
| Gradient Boosting | Fit residuals of previous model | Any differentiable |
| XGBoost | Gradient boosting + regularisation + speed | Custom |

#### AdaBoost Update

For weak classifier $h_t$ with weighted error $\epsilon_t$:

$$\alpha_t = \frac{1}{2} \ln\left(\frac{1 - \epsilon_t}{\epsilon_t}\right)$$

$$w_i^{(t+1)} = w_i^{(t)} \cdot e^{-\alpha_t y_i h_t(x_i)}$$

#### Gradient Boosting

$$F_m(x) = F_{m-1}(x) + \eta \cdot h_m(x)$$

where $h_m$ fits the **negative gradient** (pseudo-residuals):

$$r_i^{(m)} = -\frac{\partial L(y_i, F(x_i))}{\partial F(x_i)} \bigg|_{F = F_{m-1}}$$

### Bagging vs Boosting

| | Bagging | Boosting |
|-|---------|----------|
| Training | Parallel | Sequential |
| Focus | Reduce variance | Reduce bias |
| Overfitting risk | Low | Higher (but regularised) |
| Sensitive to noise | Less | More |
| Example | Random Forest | XGBoost, AdaBoost |

<details>
<summary><strong>Practice: Calculate Information Gain</strong></summary>

Dataset: 9 positive, 5 negative ($|S| = 14$)

$H(S) = -\frac{9}{14}\log_2\frac{9}{14} - \frac{5}{14}\log_2\frac{5}{14} = 0.940$

Split on attribute $A$ with two values:
- $S_1$: 6+, 2- ($|S_1| = 8$)
- $S_2$: 3+, 3- ($|S_2| = 6$)

$H(S_1) = -\frac{6}{8}\log_2\frac{6}{8} - \frac{2}{8}\log_2\frac{2}{8} = 0.811$

$H(S_2) = -\frac{3}{6}\log_2\frac{3}{6} - \frac{3}{6}\log_2\frac{3}{6} = 1.000$

$\text{IG}(S, A) = 0.940 - \frac{8}{14}(0.811) - \frac{6}{14}(1.000) = 0.940 - 0.463 - 0.429 = 0.048$
</details>

<details>
<summary><strong>Practice: Why does Random Forest outperform a single deep tree?</strong></summary>

1. A single deep tree overfits (high variance, low bias)
2. Bagging reduces variance by averaging many trees
3. Random feature selection de-correlates the trees
4. Averaging de-correlated predictors reduces variance more than correlated ones
5. Result: similar bias but much lower variance
</details>

:::
