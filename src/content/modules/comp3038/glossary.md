---
title: "Glossary"
order: 95
moduleTitle: "COMP3038 - Machine Learning"
tags: ["glossary", "definitions", "terminology"]
---

## A

| Term | Definition |
|------|-----------|
| **Activation function** | Non-linear function applied to neuron output (e.g., ReLU, sigmoid) |
| **AdaBoost** | Boosting algorithm that re-weights misclassified samples |
| **AUC** | Area Under the ROC Curve; measures overall classifier performance |

## B

| Term | Definition |
|------|-----------|
| **Backpropagation** | Algorithm to compute gradients in neural networks using the chain rule |
| **Bagging** | Bootstrap Aggregating; train models on random subsets, average predictions |
| **Batch normalisation** | Normalise layer inputs during training to stabilise and speed up learning |
| **Bias (statistical)** | Error from overly simple model assumptions (underfitting) |
| **Bias term** | The intercept $\theta_0$ or $b$ in a model |
| **Boosting** | Sequential ensemble method; each model corrects predecessor's errors |

## C

| Term | Definition |
|------|-----------|
| **Classification** | Predicting a discrete label from input features |
| **CNN** | Convolutional Neural Network; uses convolutions for spatial data |
| **Convex function** | Function with a single global minimum (bowl-shaped) |
| **Cost function** | Function measuring how wrong predictions are; minimised during training |
| **Cross-entropy** | Loss function for classification: $-\sum y_k \log \hat{y}_k$ |
| **Cross-validation** | Evaluating model by training/testing on multiple data splits |
| **Curse of dimensionality** | Problems arising in high-dimensional spaces (data becomes sparse) |

## D

| Term | Definition |
|------|-----------|
| **Decision boundary** | Surface separating classes in feature space |
| **Decision tree** | Model that recursively splits feature space using thresholds |
| **Dendrogram** | Tree diagram showing hierarchical clustering merges |
| **Dimensionality reduction** | Reducing number of features while preserving information |
| **Dropout** | Randomly zeroing neurons during training for regularisation |

## E

| Term | Definition |
|------|-----------|
| **Eigenvalue** | Scalar indicating variance along corresponding eigenvector in PCA |
| **Ensemble** | Combining multiple models to improve performance |
| **Entropy** | Measure of impurity/uncertainty: $H = -\sum p_k \log_2 p_k$ |
| **Epoch** | One complete pass through the entire training dataset |

## F

| Term | Definition |
|------|-----------|
| **F1-score** | Harmonic mean of precision and recall |
| **Feature engineering** | Creating new input features from raw data |
| **Feature scaling** | Normalising features to similar ranges (z-score, min-max) |
| **Forward pass** | Computing output from input through all layers |

## G

| Term | Definition |
|------|-----------|
| **Gini impurity** | Splitting criterion: $1 - \sum p_k^2$ |
| **Gradient** | Vector of partial derivatives of the cost function |
| **Gradient descent** | Iteratively updating parameters in direction of steepest descent |
| **Gradient clipping** | Limiting gradient magnitude to prevent exploding gradients |

## H

| Term | Definition |
|------|-----------|
| **Hinge loss** | $\max(0, 1 - y\hat{y})$; loss function for SVM |
| **Hyperparameter** | Parameter set before training (e.g., learning rate, $K$, $\lambda$) |
| **Hypothesis** | The model's predicted function $h_\theta(x)$ |

## I-K

| Term | Definition |
|------|-----------|
| **Information gain** | Reduction in entropy after splitting on an attribute |
| **Inductive bias** | Assumptions a model makes to generalise from training data |
| **K-Means** | Clustering algorithm that assigns points to $K$ centroids |
| **Kernel** | Function computing dot product in transformed feature space |
| **K-NN** | K-Nearest Neighbours; classifies by majority vote of neighbours |

## L

| Term | Definition |
|------|-----------|
| **L1 regularisation** | Adds $\lambda\sum|\theta_j|$ to cost; promotes sparsity (Lasso) |
| **L2 regularisation** | Adds $\lambda\sum\theta_j^2$ to cost; shrinks weights (Ridge) |
| **Learning rate ($\alpha$)** | Step size in gradient descent |
| **Linear separability** | Classes can be separated by a hyperplane |
| **LSTM** | Long Short-Term Memory; RNN variant with gates to handle long sequences |
| **Log loss** | Binary cross-entropy; cost function for logistic regression |

## M

| Term | Definition |
|------|-----------|
| **Margin** | Distance from decision boundary to nearest support vector |
| **Mini-batch** | Subset of training data used for one gradient update |
| **MLP** | Multi-Layer Perceptron; feedforward neural network |
| **MSE** | Mean Squared Error: $\frac{1}{m}\sum(y-\hat{y})^2$ |

## N-O

| Term | Definition |
|------|-----------|
| **Normal equation** | Closed-form solution for linear regression: $\theta = (X^TX)^{-1}X^Ty$ |
| **Overfitting** | Model learns noise; low train error, high test error |

## P

| Term | Definition |
|------|-----------|
| **PCA** | Principal Component Analysis; finds directions of maximum variance |
| **Perceptron** | Single-layer binary classifier |
| **Pooling** | Downsampling operation in CNNs (max, average) |
| **Precision** | $\frac{TP}{TP+FP}$; fraction of predicted positives that are correct |
| **Pruning** | Removing tree branches to reduce overfitting |

## R

| Term | Definition |
|------|-----------|
| **Random Forest** | Ensemble of decision trees with bagging + random feature subsets |
| **Recall** | $\frac{TP}{TP+FN}$; fraction of actual positives correctly identified |
| **Regression** | Predicting a continuous output value |
| **Regularisation** | Adding penalty to prevent overfitting |
| **ReLU** | Rectified Linear Unit: $\max(0, z)$ |
| **Residual connection** | Skip connection adding input to output: $F(x) + x$ |
| **RNN** | Recurrent Neural Network; processes sequences with hidden state |
| **ROC curve** | Receiver Operating Characteristic; TPR vs FPR at various thresholds |

## S

| Term | Definition |
|------|-----------|
| **Sigmoid** | $\sigma(z) = \frac{1}{1+e^{-z}}$; maps to $(0,1)$ |
| **Softmax** | Generalisation of sigmoid to $K$ classes; outputs probability distribution |
| **Stochastic Gradient Descent** | GD using one (or mini-batch) sample per update |
| **Support vectors** | Data points on or inside the margin in SVM |
| **SVM** | Support Vector Machine; maximises margin between classes |

## T-U

| Term | Definition |
|------|-----------|
| **Transformer** | Architecture using self-attention; parallelisable sequence modelling |
| **Underfitting** | Model too simple; high error on both train and test |
| **Unsupervised learning** | Learning from unlabelled data (clustering, dimensionality reduction) |

## V-Z

| Term | Definition |
|------|-----------|
| **Vanishing gradient** | Gradients shrink exponentially in deep networks; hampers learning |
| **Variance (statistical)** | Sensitivity of model to training data (overfitting) |
| **Weight decay** | Another name for L2 regularisation effect on weights |
| **Xavier initialisation** | Weight init scaled by $1/\sqrt{n_{\text{in}}}$; for sigmoid/tanh |
