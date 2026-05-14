---
title: "Classification"
order: 2
moduleTitle: "COMP3038 - Machine Learning"
tags: ["logistic-regression", "classification", "decision-boundary", "softmax", "multi-class"]
---

## Logistic Regression

:::eli10

Logistic regression helps the computer answer yes-or-no questions -- like "Is this email spam?" Instead of drawing a straight line to predict a number, it squishes its answer through a special S-shaped curve so the output is always between 0 and 1, like a percentage chance. If the chance is above 50%, it says "yes."

:::

:::eli15
Logistic regression is used for binary classification. It takes the same linear combination of features as linear regression but passes it through the sigmoid function, which maps any value to a probability between 0 and 1. The model predicts the probability that a sample belongs to the positive class. It uses a special cost function called log loss (binary cross-entropy) instead of mean squared error, because log loss is convex for this setup and guarantees finding the best solution with gradient descent.

:::

:::eli20
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

:::

## Multi-Class Classification

:::eli10

What if you are not just choosing between two things (yes/no), but many things -- like recognising which digit (0-9) is in a picture? Multi-class classification is like having a bunch of experts, each one trained to spot a different answer, and then you pick whichever expert is most confident.

:::

:::eli15
When there are more than two categories, you extend binary classification. One approach (One-vs-Rest) trains a separate binary classifier for each class -- each one learns to distinguish "this class" vs "everything else." Then you pick the class with the highest confidence score. Another approach is softmax regression, which directly outputs a probability distribution across all classes, with all probabilities summing to 1. Softmax is a generalisation of logistic regression to multiple classes.

:::

:::eli20
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

:::

## Regularised Logistic Regression

:::eli10

Sometimes the computer tries too hard to memorise every tiny detail in the training examples, including noise and mistakes. Regularisation is like telling the computer "keep it simple!" -- it adds a penalty for making the model too complicated, so it generalises better to new data.

:::

:::eli15
Regularisation adds a penalty term to the cost function that discourages large parameter values. For logistic regression, you add the sum of squared weights (L2 regularisation) multiplied by a hyperparameter lambda. This prevents overfitting by keeping the model simpler. The bias term is not regularised because penalising it would shift the decision boundary in an unhelpful way. The strength of regularisation is controlled by lambda -- larger values mean simpler models.

:::

:::eli20
$$J(\boldsymbol{\theta}) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)} \log(h_\theta(x^{(i)})) + (1-y^{(i)}) \log(1-h_\theta(x^{(i)})) \right] + \frac{\lambda}{2m} \sum_{j=1}^{n} \theta_j^2$$

> Note: $\theta_0$ (bias) is **not** regularised.

:::

## Evaluation Metrics for Classification

:::eli10

How do you know if your classifier is doing a good job? Accuracy tells you what percentage it got right overall. But sometimes you care more about not missing important things (like a disease) or not raising false alarms (like wrongly marking a good email as spam). Different metrics measure different kinds of "good."

:::

:::eli15
Classification evaluation goes beyond simple accuracy. Precision measures "of all the things I predicted positive, how many were actually positive?" (important when false alarms are costly). Recall measures "of all the actual positives, how many did I catch?" (important when missing cases is costly). The F1-score balances both. A confusion matrix shows the full picture: true positives, false positives, true negatives, and false negatives. For imbalanced datasets, accuracy alone is misleading.

:::

:::eli20
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

:::
