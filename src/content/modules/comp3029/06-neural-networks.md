---
title: "Neural Networks"
order: 6
moduleTitle: "COMP3029 - Computer Vision"
tags: ["neural-networks", "perceptron", "mlp", "backpropagation", "deep-learning"]
---

## Overview

Neural networks learn feature representations and classifiers end-to-end from data, replacing hand-crafted feature pipelines.

## The Perceptron

### Single Neuron

$$y = f\left(\sum_{i=1}^{n} w_i x_i + b\right) = f(\mathbf{w}^T \mathbf{x} + b)$$

| Component | Role |
|-----------|------|
| $x_i$ | Inputs |
| $w_i$ | Weights (learned) |
| $b$ | Bias |
| $f$ | Activation function |
| $y$ | Output |

### Perceptron as Linear Classifier

- Decision boundary: $\mathbf{w}^T \mathbf{x} + b = 0$ (hyperplane)
- Can only solve **linearly separable** problems
- Cannot solve XOR

## Multi-Layer Perceptron (MLP)

### Architecture

| Layer | Function |
|-------|----------|
| Input layer | Receives feature vector |
| Hidden layer(s) | Learn intermediate representations |
| Output layer | Produces predictions (classes/values) |

Adding hidden layers with non-linear activations enables learning non-linear decision boundaries.

### Universal Approximation Theorem

A single hidden layer with sufficient neurons can approximate any continuous function -- but may require exponentially many neurons. Deep networks are more parameter-efficient.

## Activation Functions

| Function | Formula | Range | Properties |
|----------|---------|-------|------------|
| Sigmoid | $\sigma(x) = \frac{1}{1+e^{-x}}$ | $(0, 1)$ | Smooth, saturates, vanishing gradient |
| Tanh | $\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$ | $(-1, 1)$ | Zero-centred, still saturates |
| ReLU | $f(x) = \max(0, x)$ | $[0, \infty)$ | Fast, no saturation, dying neurons |
| Leaky ReLU | $f(x) = \max(\alpha x, x)$ | $(-\infty, \infty)$ | Fixes dying ReLU |
| Softmax | $\sigma(x_i) = \frac{e^{x_i}}{\sum_j e^{x_j}}$ | $(0, 1)$, sums to 1 | Output layer for multi-class |

## Loss Functions

| Task | Loss Function | Formula |
|------|--------------|---------|
| Binary classification | Binary Cross-Entropy | $-[y\log(\hat{y}) + (1-y)\log(1-\hat{y})]$ |
| Multi-class | Cross-Entropy | $-\sum_c y_c \log(\hat{y}_c)$ |
| Regression | Mean Squared Error | $\frac{1}{N}\sum_i(y_i - \hat{y}_i)^2$ |

## Backpropagation

### Forward Pass

Compute output layer by layer:

$$\mathbf{z}^{(l)} = W^{(l)} \mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}$$
$$\mathbf{a}^{(l)} = f(\mathbf{z}^{(l)})$$

### Backward Pass (Chain Rule)

Compute gradients of loss $L$ w.r.t. each parameter:

$$\frac{\partial L}{\partial w_{ij}^{(l)}} = \frac{\partial L}{\partial z_i^{(l)}} \cdot \frac{\partial z_i^{(l)}}{\partial w_{ij}^{(l)}} = \delta_i^{(l)} \cdot a_j^{(l-1)}$$

Error signal propagated backwards:

$$\delta^{(l)} = (W^{(l+1)})^T \delta^{(l+1)} \odot f'(\mathbf{z}^{(l)})$$

### Gradient Descent Update

$$w \leftarrow w - \eta \frac{\partial L}{\partial w}$$

| Variant | Update Rule | Property |
|---------|-------------|----------|
| SGD | Single sample gradient | Noisy but fast |
| Mini-batch SGD | Average over batch | Balance noise/speed |
| Adam | Adaptive learning rates + momentum | Most commonly used |

## Training Considerations

### Regularisation

| Technique | Purpose |
|-----------|---------|
| L2 (weight decay) | Penalise large weights |
| Dropout | Randomly zero neurons during training |
| Data augmentation | Increase effective training set |
| Early stopping | Stop when validation loss increases |
| Batch normalisation | Normalise activations, stabilise training |

### Hyperparameters

| Parameter | Typical Choices |
|-----------|----------------|
| Learning rate | 0.001 -- 0.01 (with scheduling) |
| Batch size | 32 -- 256 |
| Hidden layers | 2 -- 5 for MLP |
| Hidden units | 128 -- 1024 |
| Epochs | 50 -- 300 |

## Problems with Deep Networks

| Problem | Cause | Solution |
|---------|-------|----------|
| Vanishing gradients | Sigmoid/tanh saturation | ReLU, residual connections |
| Exploding gradients | Deep chains of multiplication | Gradient clipping, careful init |
| Overfitting | Too many parameters | Regularisation, more data |
| Slow convergence | Poor learning rate | Adam, learning rate scheduling |

<details><summary>Practice</summary>

1. A perceptron with weights $w = [2, -1]$ and bias $b = -1$ using a step activation. Classify the point $(1, 1)$.

2. Why can't a single perceptron solve XOR? Draw the XOR truth table and show no single line separates the classes.

3. Compute one step of backpropagation for a single neuron with sigmoid activation, input $x=1$, target $y=1$, weight $w=0.5$, bias $b=0$, learning rate $\eta=0.1$.

4. Explain why ReLU helps with the vanishing gradient problem compared to sigmoid.

</details>
