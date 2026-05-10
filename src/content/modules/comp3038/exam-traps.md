---
title: "Exam Traps"
order: 91
moduleTitle: "COMP3038 - Machine Learning"
tags: ["exam", "common-mistakes", "traps", "pitfalls"]
---

## Common Exam Traps

### 1. Confusing Bias and Variance

| Trap | Reality |
|------|---------|
| "More data always helps" | Only helps high variance, not high bias |
| "More features always help" | Can increase variance (curse of dimensionality) |
| "Complex model = better" | Can overfit (high variance) |
| "Regularisation always helps" | Too much regularisation causes underfitting (high bias) |

### 2. Gradient Descent Mistakes

| Trap | Correct |
|------|---------|
| "GD always finds global minimum" | Only for convex functions (linear regression). Neural nets have local minima. |
| "Learning rate doesn't matter much" | Too large diverges, too small stalls |
| "Feature scaling is optional" | Without it, GD oscillates and converges slowly |
| "Normal equation is always better" | Only practical when $n < 10{,}000$ |

### 3. Regularisation Confusion

| Trap | Correct |
|------|---------|
| "L1 and L2 do the same thing" | L1 gives sparsity (feature selection), L2 gives small weights |
| "Regularise the bias term" | Convention: **do not** regularise $\theta_0$ |
| "Large $\lambda$ = complex model" | Large $\lambda$ = simpler model (more regularisation) |
| "$C$ in SVM same as $\lambda$" | $C \propto 1/\lambda$. Large $C$ = less regularisation |

### 4. SVM Traps

| Trap | Correct |
|------|---------|
| "All points determine the boundary" | Only **support vectors** matter |
| "Kernel SVM always better than linear" | Linear SVM can be better when data is (nearly) linearly separable or $n \gg m$ |
| "RBF kernel has no parameters" | Has $\gamma$ (bandwidth) -- crucial to tune |
| "SVM outputs probabilities" | Not natively. Platt scaling needed for probabilities. |

### 5. Decision Tree / Ensemble Traps

| Trap | Correct |
|------|---------|
| "Deeper tree = better generalisation" | Deeper = more overfit (lower bias, higher variance) |
| "Random Forest cannot overfit" | Can overfit with very deep trees, but less likely |
| "Bagging reduces bias" | Bagging reduces **variance** only |
| "Boosting reduces variance" | Boosting primarily reduces **bias** |
| "Gini and Entropy give very different trees" | In practice, they produce nearly identical splits |

### 6. Neural Network Traps

| Trap | Correct |
|------|---------|
| "More layers always better" | Vanishing gradients, harder to train (need skip connections) |
| "Sigmoid is the best activation" | ReLU is default for hidden layers (avoids vanishing gradient) |
| "Dropout during test time" | Dropout is **only** during training. At test, scale weights. |
| "Batch norm replaces dropout" | They serve different purposes (can use both) |
| "Backprop requires labelled data" | True for supervised; autoencoders use backprop unsupervised |

### 7. Evaluation Traps

| Trap | Correct |
|------|---------|
| "High accuracy = good model" | Useless for imbalanced data (99% accuracy predicting majority class) |
| "Use accuracy for imbalanced data" | Use F1, PR-AUC, or balanced accuracy |
| "Train accuracy tells you model quality" | Only **test/validation** accuracy matters |
| "Cross-validation prevents overfitting" | It **detects** overfitting; regularisation **prevents** it |
| "More folds = always better CV" | LOOCV has high variance; 5-10 folds is standard |

### 8. Clustering Traps

| Trap | Correct |
|------|---------|
| "K-Means always converges to optimal" | Converges to **local** optimum only |
| "K-Means works for all cluster shapes" | Only spherical/convex clusters |
| "PCA maximises class separability" | PCA maximises **variance** (unsupervised). LDA maximises separability. |
| "PCA requires standardisation" | Yes! Otherwise high-magnitude features dominate |

### 9. Mathematical Gotchas

| Trap | Correct |
|------|---------|
| "Logistic regression gradient differs from linear" | Same formula: $\frac{1}{m}\sum(h-y)x_j$, but $h$ is sigmoid |
| "Softmax is an activation function" | It's an activation + normalisation (outputs sum to 1) |
| "$R^2$ is always in $[0,1]$" | Can be **negative** if model is worse than predicting the mean |
| "Information Gain can be negative" | No, $\text{IG} \geq 0$ always (conditioning reduces entropy) |

### 10. Practical Traps

| Trap | Correct |
|------|---------|
| "Apply PCA to entire dataset" | Fit PCA on **train only**, then transform test |
| "Normalise before train/test split" | Split first, then compute stats on train only |
| "Missing data = drop the row" | Consider imputation; dropping may bias results |
| "Correlation = causation" | ML finds correlations, not causal relationships |
