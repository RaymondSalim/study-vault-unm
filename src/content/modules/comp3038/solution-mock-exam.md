---
title: "Mock Exam Solution"
order: 99
moduleTitle: "COMP3038 - Machine Learning"
tags: ["past-papers", "solutions", "exam"]
---

## COMP3038 Machine Learning - Mock Exam Solution

**Autumn 2025-2026**

**Answer All 3 Questions**

---

## Question 1: Foundations of Machine Learning [18 marks]

**Context:** Credit card fraud detection -- at its simplest, someone obtains your card details and makes transactions without you knowing.

---

### (a) Explain the credit card fraud transaction problem in the context of machine learning and define T, P & E. [7 marks]

Credit card fraud detection is a **classification problem** in machine learning. The goal is to automatically determine whether a given credit card transaction is fraudulent or legitimate, based on historical transaction data. This fits within Tom Mitchell's well-posed learning problem framework, which states:

> A computer program is said to **learn** from experience **E** with respect to some class of tasks **T** and performance measure **P**, if its performance at tasks in **T**, as measured by **P**, improves with experience **E**.

For the credit card fraud detection problem:

**Task (T):** Classifying credit card transactions as either fraudulent or legitimate (a binary classification task). Given a new incoming transaction with its associated features (transaction amount, location, time of day, merchant type, frequency of transactions, etc.), the system must assign it to one of two classes: fraud or not fraud.

**Performance Measure (P):** The accuracy (or more appropriately, metrics such as precision, recall, F1-score, or the area under the ROC curve) of correctly classifying transactions. In fraud detection, we particularly care about:
- **True Positive Rate (Recall):** The proportion of actual fraudulent transactions correctly identified as fraud -- missing a fraud case is costly.
- **False Positive Rate:** The proportion of legitimate transactions incorrectly flagged as fraud -- this inconveniences customers.
- Overall classification accuracy may also be used, though it can be misleading due to class imbalance (fraudulent transactions are rare compared to legitimate ones).

**Experience (E):** A dataset of historical credit card transactions, where each transaction is labelled as either fraudulent or legitimate. The system learns patterns from this labelled data (supervised learning). The experience consists of feature vectors (transaction amount, time, location, merchant category, card-not-present indicator, etc.) paired with their known class labels. As the system processes more labelled examples, it refines its model to better distinguish between the two classes.

This is a **supervised learning** problem because we have labelled training data (transactions already classified as fraud or not fraud). The challenge is that the dataset is highly **imbalanced** -- the vast majority of transactions are legitimate, with only a small fraction being fraudulent.

---

### (b) Give the formal definition of overfitting. Explain when it occurs and why it is a big problem for Machine Learning. [5 marks]

**Formal Definition:**

Given a hypothesis space H, a hypothesis h in H is said to **overfit** the training data if there exists some alternative hypothesis h' in H such that:

$$\text{error}_{\text{train}}(h) < \text{error}_{\text{train}}(h')$$

but

$$\text{error}_{\text{true}}(h) > \text{error}_{\text{true}}(h')$$

In other words, h has a smaller error than h' on the training examples, but h has a larger error than h' over the entire distribution of instances (the true error, or generalisation error).

**When Overfitting Occurs:**

Overfitting occurs when a model learns not only the underlying true patterns in the training data but also the noise, random fluctuations, and idiosyncrasies specific to that particular training set. Common causes include:

1. **Insufficient training data:** When the training set is too small, the model may latch onto coincidental patterns that do not generalise.
2. **Overly complex model:** When the model has too many parameters or too much capacity relative to the amount of training data (e.g., a very deep decision tree, a high-degree polynomial, or a neural network with excessive parameters).
3. **Training for too long:** In iterative learning algorithms, training for too many epochs can cause the model to memorise training examples.
4. **Noisy data:** When the training data contains errors or irrelevant features, the model may learn to fit the noise.

**Why It Is a Big Problem:**

Overfitting is one of the most fundamental challenges in machine learning because:

- **Poor generalisation:** The entire purpose of machine learning is to build models that perform well on **unseen data**. An overfit model performs excellently on training data but poorly on new, real-world data -- defeating the purpose of the model.
- **Bias-Variance Tradeoff:** Overfitting is directly related to the bias-variance tradeoff. An overfit model has **low bias** (it fits the training data well) but **high variance** (its predictions are highly sensitive to the specific training set used). Small changes in the training data lead to large changes in the learned hypothesis. The ideal model balances bias and variance to minimise total generalisation error.
- **False confidence:** High training accuracy may give a misleading impression that the model is performing well, when in reality it will fail in deployment.
- **Wasted resources:** Time and compute spent on a model that cannot generalise is wasted.

**Mitigation strategies** include: cross-validation, regularisation, pruning (for decision trees), early stopping, dropout (for neural networks), and ensuring sufficient training data.

---

### (c) Confidence interval calculation and comparison. [6 marks]

We use the confidence interval formula for the true error:

$$\text{error}_S \pm Z_n \sqrt{\frac{\text{error}_S (1 - \text{error}_S)}{n}}$$

where:
- error_S is the sample error (1 - accuracy)
- Z_n = 1.96 for 95% confidence
- n is the number of test examples

---

**Logistic Regression:**

- Training examples: 300
- Test examples: n = 30
- Accuracy: 82%, so error_S = 1 - 0.82 = 0.18

Confidence interval:

$$0.18 \pm 1.96 \sqrt{\frac{0.18 \times 0.82}{30}}$$

$$= 0.18 \pm 1.96 \sqrt{\frac{0.1476}{30}}$$

$$= 0.18 \pm 1.96 \sqrt{0.00492}$$

$$= 0.18 \pm 1.96 \times 0.0701$$

$$= 0.18 \pm 0.1374$$

**95% Confidence Interval for true error of Logistic Regression: [0.0426, 0.3174]**

This means we are 95% confident that the true error lies between approximately 4.3% and 31.7% (i.e., true accuracy is between 68.3% and 95.7%).

---

**Support Vector Machine:**

- Training examples: 400
- Test examples: n = 50
- Accuracy: 92%, so error_S = 1 - 0.92 = 0.08

Confidence interval:

$$0.08 \pm 1.96 \sqrt{\frac{0.08 \times 0.92}{50}}$$

$$= 0.08 \pm 1.96 \sqrt{\frac{0.0736}{50}}$$

$$= 0.08 \pm 1.96 \sqrt{0.001472}$$

$$= 0.08 \pm 1.96 \times 0.03837$$

$$= 0.08 \pm 0.0752$$

**95% Confidence Interval for true error of SVM: [0.0048, 0.1552]**

This means we are 95% confident that the true error lies between approximately 0.5% and 15.5% (i.e., true accuracy is between 84.5% and 99.5%).

---

**Comment on Statistical Difference:**

| Classifier | Sample Error | 95% Confidence Interval |
|---|---|---|
| Logistic Regression | 0.18 | [0.0426, 0.3174] |
| Support Vector Machine | 0.08 | [0.0048, 0.1552] |

The confidence intervals **overlap** significantly. The LR interval is [0.0426, 0.3174] and the SVM interval is [0.0048, 0.1552]. The overlapping region is approximately [0.0426, 0.1552].

Because the confidence intervals overlap, we **cannot conclude with 95% confidence that there is a statistically significant difference** between the two classifiers' true error rates. Although the SVM appears to perform better on the sample (92% vs 82% accuracy), the small test set sizes (30 and 50 examples respectively) result in wide confidence intervals that prevent us from making a definitive statistical claim that one classifier is truly superior to the other.

The key takeaway is that **larger test sets are needed** to draw statistically meaningful conclusions. The small test set sizes lead to high uncertainty in our error estimates. To obtain narrower confidence intervals and potentially establish a statistically significant difference, we would need substantially more test examples.

---

## Questions 2 and 3

**Note:** Questions 2 and 3 were not available in the provided mock exam paper. Only Question 1 was visible in the PDF. If these questions become available, solutions will be added accordingly.
