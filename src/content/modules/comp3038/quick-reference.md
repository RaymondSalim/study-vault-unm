---
title: "Quick Reference"
order: 90
moduleTitle: "COMP3038 - Machine Learning"
tags: ["reference", "comparison", "algorithms", "cheat-sheet"]
---

## Algorithm Comparison Table

| Algorithm | Type | Interpretable | Handles Non-linearity | Feature Scaling | Training Speed | Prediction Speed |
|-----------|------|:---:|:---:|:---:|:---:|:---:|
| Linear Regression | Regression | High | No (unless poly) | Required | Fast | Fast |
| Logistic Regression | Classification | High | No (unless poly) | Required | Fast | Fast |
| Decision Tree | Both | High | Yes | Not needed | Fast | Fast |
| Random Forest | Both | Medium | Yes | Not needed | Medium | Medium |
| Gradient Boosting | Both | Low | Yes | Not needed | Slow | Fast |
| SVM (linear) | Both | Medium | No | Required | Medium | Fast |
| SVM (RBF) | Both | Low | Yes | Required | Slow | Medium |
| K-NN | Both | Medium | Yes | Required | None (lazy) | Slow |
| Neural Network | Both | Low | Yes | Required | Slow | Fast |

## When to Use What

| Scenario | Recommended Algorithm |
|----------|----------------------|
| Few features, linear relationship | Linear/Logistic Regression |
| Need interpretability | Decision Tree, Linear models |
| Tabular data, best accuracy | Gradient Boosting (XGBoost) |
| High-dimensional, few samples | SVM with RBF kernel |
| Image data | CNN |
| Sequential/time-series data | RNN/LSTM/Transformer |
| Need probability output | Logistic Regression, Neural Net (softmax) |
| Many features, want feature selection | L1 regularisation (Lasso) |
| Anomaly detection | Isolation Forest, DBSCAN |

## Loss Functions Reference

| Loss | Formula | Used for |
|------|---------|----------|
| MSE | $\frac{1}{m}\sum(y-\hat{y})^2$ | Regression |
| MAE | $\frac{1}{m}\sum|y-\hat{y}|$ | Regression (robust) |
| Binary Cross-Entropy | $-[y\log\hat{y}+(1-y)\log(1-\hat{y})]$ | Binary classification |
| Categorical Cross-Entropy | $-\sum_k y_k\log\hat{y}_k$ | Multi-class |
| Hinge | $\max(0, 1-y\hat{y})$ | SVM |
| Huber | MSE if small, MAE if large | Robust regression |

## Optimiser Comparison

| Optimiser | Key feature | Learning rate |
|-----------|-------------|---------------|
| SGD | Basic, noisy updates | Fixed |
| SGD + Momentum | Accumulates velocity | Fixed |
| RMSProp | Adapts per-parameter LR | Adaptive |
| Adam | Momentum + RMSProp | Adaptive |
| AdaGrad | Good for sparse features | Adaptive (decays) |

## Regularisation Quick Reference

| Technique | Applies to | Effect |
|-----------|-----------|--------|
| L1 (Lasso) | Weights | Feature selection (sparse) |
| L2 (Ridge) | Weights | Weight decay (small weights) |
| Dropout | Neural nets | Random neuron masking |
| Early stopping | Any iterative | Stop before overfit |
| Data augmentation | Neural nets (images) | Increase effective dataset |
| Batch normalisation | Neural nets | Stabilise activations |

## Dimensionality Reduction

| Method | Type | Preserves | Use case |
|--------|------|-----------|----------|
| PCA | Linear | Global variance | General preprocessing |
| LDA | Linear | Class separability | Supervised reduction |
| t-SNE | Non-linear | Local structure | 2D/3D visualisation |
| UMAP | Non-linear | Local + global | Visualisation, general |
| Kernel PCA | Non-linear | Kernel-dependent | Non-linear structure |

## Key Hyperparameters

| Algorithm | Key hyperparameters |
|-----------|--------------------|
| Linear Regression | $\lambda$ (regularisation) |
| Logistic Regression | $\lambda$, threshold |
| Decision Tree | max_depth, min_samples_split |
| Random Forest | n_estimators, max_features, max_depth |
| Gradient Boosting | n_estimators, learning_rate, max_depth |
| SVM | $C$, kernel, $\gamma$ (RBF) |
| K-NN | $K$, distance metric |
| Neural Network | layers, units, learning_rate, batch_size, epochs |
| K-Means | $K$, init method |

## Complexity Cheat Sheet

| Algorithm | Training | Prediction |
|-----------|----------|------------|
| Linear Regression (Normal) | $O(n^3)$ | $O(n)$ |
| Linear Regression (GD) | $O(mnk)$ | $O(n)$ |
| Decision Tree | $O(mn\log m)$ | $O(\text{depth})$ |
| Random Forest | $O(B \cdot mn\log m)$ | $O(B \cdot \text{depth})$ |
| SVM | $O(m^2 n)$ to $O(m^3)$ | $O(n_{\text{SV}} \cdot n)$ |
| K-NN | $O(1)$ (lazy) | $O(mn)$ |
| Neural Network | $O(m \cdot \text{params} \cdot \text{epochs})$ | $O(\text{params})$ |
