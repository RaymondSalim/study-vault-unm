---
title: "Flashcards"
order: 92
moduleTitle: "COMP3038 - Machine Learning"
tags: ["flashcards", "revision", "Q&A"]
---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is the bias-variance tradeoff? | High bias = underfitting (too simple); high variance = overfitting (too complex). The goal is to minimise total error by balancing both. |
| 2 | What is the difference between supervised and unsupervised learning? | Supervised uses labelled data (input-output pairs); unsupervised finds structure in unlabelled data |
| 3 | What does linear regression minimise? | The sum of squared residuals (ordinary least squares): `sum((y_i - y_hat_i)^2)` |
| 4 | What is the sigmoid function and where is it used? | `sigma(z) = 1/(1+exp(-z))`; maps real values to (0,1); used in logistic regression and neural network activations |
| 5 | What is the difference between L1 and L2 regularisation? | L1 (Lasso) adds `lambda * sum|w|` producing sparsity; L2 (Ridge) adds `lambda * sum(w^2)` shrinking weights uniformly |
| 6 | How does a decision tree choose splits? | By maximising information gain (reduction in entropy) or minimising Gini impurity at each node |
| 7 | What is entropy in the context of decision trees? | A measure of impurity: `H = -sum(p_i * log2(p_i))`. Pure node has entropy 0. |
| 8 | What is a Random Forest? | An ensemble of decision trees trained on bootstrap samples with random feature subsets; predictions are averaged/voted |
| 9 | What is boosting? | Sequentially training weak learners where each new one focuses on examples the previous ones got wrong (e.g., AdaBoost, Gradient Boosting) |
| 10 | What is the kernel trick in SVMs? | Computing dot products in a high-dimensional feature space without explicitly transforming the data, enabling non-linear decision boundaries |
| 11 | What are support vectors? | The training points closest to the decision boundary (on or within the margin); they define the hyperplane |
| 12 | What is the purpose of the soft-margin SVM parameter C? | Controls the tradeoff between maximising the margin and minimising classification errors; high C = less tolerance for errors |
| 13 | What is backpropagation? | An algorithm that computes gradients of the loss w.r.t. each weight using the chain rule, propagating errors backward through the network |
| 14 | What is dropout in neural networks? | Randomly zeroing a fraction of neuron outputs during training to prevent co-adaptation and reduce overfitting |
| 15 | What is k-means clustering? | Iteratively assigns points to nearest centroid and recomputes centroids until convergence; requires k specified in advance |
| 16 | Name two limitations of k-means. | Must specify k in advance; assumes spherical clusters of equal size; sensitive to initialisation; converges to local optima |
| 17 | What is the silhouette score? | Measures how similar a point is to its own cluster vs neighbouring clusters; ranges from -1 (wrong cluster) to +1 (well-matched) |
| 18 | What is k-fold cross-validation? | Splitting data into k folds, training on k-1 and testing on the remaining fold, rotating k times, then averaging results |
| 19 | What is the difference between precision and recall? | Precision = TP/(TP+FP) (of predicted positives, how many are correct); Recall = TP/(TP+FN) (of actual positives, how many were found) |
| 20 | What is the F1 score? | The harmonic mean of precision and recall: `2*P*R / (P+R)`. Balances both metrics. |
| 21 | What is a confusion matrix? | A table showing TP, FP, FN, TN counts for a classifier's predictions vs actual labels |
| 22 | What is gradient descent? | An optimisation algorithm that iteratively updates parameters in the direction of steepest descent of the loss function |
| 23 | What is the difference between batch, mini-batch, and stochastic gradient descent? | Batch uses all data per update; mini-batch uses a subset; stochastic uses one sample. Trade-off between stability and speed. |
| 24 | What is overfitting and how can it be detected? | Model performs well on training data but poorly on unseen data; detected when training error is much lower than validation error |
| 25 | What is PCA (Principal Component Analysis)? | An unsupervised dimensionality reduction technique that projects data onto directions of maximum variance (eigenvectors of covariance matrix) |
