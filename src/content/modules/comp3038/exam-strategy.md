---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP3038 - Machine Learning"
tags: ["exam", "strategy", "revision", "planning"]
---

## Exam Strategy

### Time Allocation

| Section | Suggested Time | Notes |
|---------|---------------|-------|
| Reading & planning | 10 minutes | Identify compulsory vs choice questions |
| Short-answer questions | 35 minutes | Definitions, comparisons, brief calculations |
| Long-answer / derivation questions | 65 minutes | Algorithm walkthroughs, worked examples, design questions |
| Review | 10 minutes | Verify calculations, check all parts answered |

### Topic Weighting (estimated)

| Topic | Weight | Priority |
|-------|--------|----------|
| Supervised basics (linear/logistic regression) | 15% | High |
| Classification (kNN, Naive Bayes) | 10% | Medium |
| Decision trees and ensembles | 15% | High |
| SVMs | 15% | High |
| Neural networks | 15% | High |
| Deep learning (CNNs, architectures) | 10% | Medium |
| Unsupervised learning (k-means, PCA) | 10% | Medium |
| Evaluation and methodology | 10% | High |

### Question Types to Expect

1. **Hand calculations** -- decision tree split (entropy/IG), gradient descent step, SVM margin
2. **Algorithm comparison** -- when to use which model, strengths/weaknesses tables
3. **Derivation** -- gradient of logistic loss, backprop through a small network, SVM dual formulation
4. **Experimental design** -- train/test splits, cross-validation, choosing metrics for imbalanced data
5. **Interpretation** -- reading confusion matrices, ROC curves, learning curves

### Key Formulas

| Formula | Context |
|---------|---------|
| MSE: `(1/n) * sum((y_i - y_hat_i)^2)` | Linear regression loss |
| Sigmoid: `1 / (1 + exp(-z))` | Logistic regression / activations |
| Entropy: `H = -sum(p_i * log2(p_i))` | Decision tree split criterion |
| Gini: `1 - sum(p_i^2)` | Alternative split criterion |
| Info Gain: `H(parent) - sum((|child|/|parent|) * H(child))` | Tree construction |
| SVM margin: `2 / ||w||` | Maximise to find optimal hyperplane |
| Precision: `TP / (TP + FP)` | Evaluation |
| Recall: `TP / (TP + FN)` | Evaluation |
| F1: `2PR / (P + R)` | Harmonic mean of precision and recall |
| GD update: `w = w - alpha * dL/dw` | Gradient descent parameter update |

### Night-Before Top 10 Checklist

1. Bias-variance tradeoff: definitions, diagram, how regularisation helps
2. Decision tree construction: entropy calculation, information gain, when to stop
3. Random Forest vs single tree: bagging, feature randomness, out-of-bag error
4. SVM: maximum margin, support vectors, kernel trick (RBF, polynomial), C parameter
5. Gradient descent: learning rate effects, convergence, batch vs mini-batch vs SGD
6. Backpropagation: chain rule through a 2-layer network (be able to compute by hand)
7. k-means: algorithm steps, choosing k (elbow method), limitations
8. Overfitting indicators: training vs validation curves, remedies (regularisation, dropout, early stopping)
9. Evaluation metrics: confusion matrix, precision, recall, F1, ROC-AUC, when to use each
10. Cross-validation: k-fold procedure, stratified k-fold for imbalanced classes, nested CV for hyperparameter tuning
