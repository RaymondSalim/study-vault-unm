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

### Key Insight: Gradient Decomposition

Every weight gradient decomposes as:

$$\frac{\partial E}{\partial W_{ji}} = \underbrace{\delta_j}_{\text{back-propagated error}} \times \underbrace{z_i}_{\text{forward-pass activation}}$$

This directly explains:
- **Vanishing gradients:** if $f'(a) \approx 0$ (sigmoid saturation), $\delta$ vanishes through layers
- **Exploding gradients:** if weights/activations $> 1$, they accumulate multiplicatively across layers

## Optimization Algorithms

### Gradient Descent Variants

$$\theta_{t+1} = \theta_t - \eta \nabla_\theta L$$

| Variant | Batch Size | Property |
|---------|-----------|----------|
| Batch GD | Full dataset | Stable but slow, memory-intensive |
| SGD | Single sample | Noisy, fast, helps escape saddle points |
| Mini-batch SGD | 32--256 samples | Balances noise and stability |

### Momentum

Accumulates velocity to smooth updates and escape local minima:

$$v_t = m \cdot v_{t-1} - \eta \cdot g_t$$
$$\theta_{t+1} = \theta_t + v_t$$

Typical $m = 0.9$. Helps with ill-conditioned curvature (reduces oscillation in narrow valleys).

### AdaGrad

Adapts learning rate per parameter based on historical gradients:

$$R_t = R_{t-1} + g_t^2$$
$$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{R_t + \epsilon}} \cdot g_t$$

Problem: $R$ grows monotonically → learning rate decays to zero over time.

### RMSProp

Fixes AdaGrad with exponential moving average (forgetting old gradients):

$$R_t = \rho \cdot R_{t-1} + (1 - \rho) \cdot g_t^2$$
$$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{R_t + \epsilon}} \cdot g_t$$

Typical: $\rho = 0.9$, $\eta = 0.001$.

### Adam (Adaptive Moment Estimation)

Combines momentum on gradients AND momentum on squared gradients with bias correction:

$$m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t$$
$$v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2$$
$$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t}$$
$$\theta_{t+1} = \theta_t - \frac{\eta \cdot \hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}$$

Typical: $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\eta = 0.001$. Bias correction compensates for zero-initialisation of $m_0, v_0$.

## Error Surface Geometry

| Property | Detail |
|----------|--------|
| Saddle points | Dominate in high dimensions; probability of true local minimum $\approx (1/3)^d$ |
| Ill-conditioned curvature | Causes oscillation (bouncing in narrow valleys) |
| SGD noise | Helps escape saddle points (random perturbation) |
| Momentum | Smooths oscillation, accumulates signal in consistent directions |

## Batch Normalisation

Normalises activations within each mini-batch to stabilise and accelerate training:

$$\hat{x} = \frac{x - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}$$
$$y = \gamma \hat{x} + \beta$$

where $\gamma$, $\beta$ are learnable scale and shift parameters.

| Phase | Statistics Used |
|-------|---------------|
| Training | Mini-batch mean $\mu_B$ and variance $\sigma_B^2$ |
| Inference | Population running averages accumulated during training |

Behaviour differs between train/inference — this is why `model.eval()` is essential.

## Dropout

During training, randomly set activations to zero with probability $(1-p)$:

| Phase | Behaviour |
|-------|-----------|
| Training | Zero out neurons with probability $(1-p)$; remaining scaled by $1/p$ (inverted dropout) |
| Inference | Use all neurons, no dropout applied |

- Acts as an implicit ensemble of $2^N$ sub-networks
- Prevents co-adaptation of neurons (forces redundant representations)

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
