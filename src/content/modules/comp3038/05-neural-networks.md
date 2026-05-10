---
title: "Neural Networks"
order: 5
moduleTitle: "COMP3038 - Machine Learning"
tags: ["perceptron", "MLP", "backpropagation", "activation-functions", "neural-networks"]
---

## Perceptron

### Model

$$\hat{y} = \text{sign}(\mathbf{w}^T \mathbf{x} + b)$$

### Update Rule (Perceptron Learning)

If misclassified:
$$\mathbf{w} \leftarrow \mathbf{w} + \alpha \cdot y^{(i)} \cdot \mathbf{x}^{(i)}$$

| Property | Detail |
|----------|--------|
| Converges | Only if data is linearly separable |
| XOR problem | Cannot solve (not linearly separable) |
| Solution | Multi-layer networks |

## Multi-Layer Perceptron (MLP)

### Architecture

```
Input Layer --> Hidden Layer(s) --> Output Layer
  x_1 ----\
  x_2 ------> [h_1, h_2, ...] --> y
  x_3 ----/
```

### Forward Pass

Layer $l$ with weights $\mathbf{W}^{[l]}$, biases $\mathbf{b}^{[l]}$:

$$\mathbf{z}^{[l]} = \mathbf{W}^{[l]} \mathbf{a}^{[l-1]} + \mathbf{b}^{[l]}$$
$$\mathbf{a}^{[l]} = g^{[l]}(\mathbf{z}^{[l]})$$

where $g$ is the activation function and $\mathbf{a}^{[0]} = \mathbf{x}$.

## Activation Functions

| Function | Formula | Range | Derivative | Use |
|----------|---------|-------|-----------|-----|
| Sigmoid | $\frac{1}{1+e^{-z}}$ | $(0,1)$ | $\sigma(z)(1-\sigma(z))$ | Binary output |
| Tanh | $\frac{e^z - e^{-z}}{e^z + e^{-z}}$ | $(-1,1)$ | $1 - \tanh^2(z)$ | Hidden layers (old) |
| ReLU | $\max(0, z)$ | $[0, \infty)$ | $\begin{cases}1 & z>0 \\ 0 & z\leq 0\end{cases}$ | Hidden layers (default) |
| Leaky ReLU | $\max(0.01z, z)$ | $(-\infty, \infty)$ | $\begin{cases}1 & z>0 \\ 0.01 & z\leq 0\end{cases}$ | Avoid dead neurons |
| Softmax | $\frac{e^{z_k}}{\sum_j e^{z_j}}$ | $(0,1)$, sums to 1 | -- | Multi-class output |

### Why ReLU?

| Problem with sigmoid/tanh | ReLU advantage |
|---------------------------|----------------|
| Vanishing gradient for large $|z|$ | Constant gradient for $z > 0$ |
| Expensive (exp) | Cheap (max) |
| Saturates | Non-saturating for positive values |

### Dead ReLU Problem

If $z < 0$ always, gradient is always 0 -- neuron never updates. Fix: Leaky ReLU, PReLU, ELU.

## Backpropagation

### Chain Rule Application

For cost $J$ and layer $l$:

$$\frac{\partial J}{\partial \mathbf{W}^{[l]}} = \frac{\partial J}{\partial \mathbf{z}^{[l]}} \cdot \frac{\partial \mathbf{z}^{[l]}}{\partial \mathbf{W}^{[l]}}$$

### Algorithm

1. **Forward pass**: Compute all $\mathbf{z}^{[l]}$, $\mathbf{a}^{[l]}$
2. **Compute output error**: $\boldsymbol{\delta}^{[L]} = \frac{\partial J}{\partial \mathbf{a}^{[L]}} \odot g'^{[L]}(\mathbf{z}^{[L]})$
3. **Backpropagate**: $\boldsymbol{\delta}^{[l]} = (\mathbf{W}^{[l+1]})^T \boldsymbol{\delta}^{[l+1]} \odot g'^{[l]}(\mathbf{z}^{[l]})$
4. **Compute gradients**:
   - $\frac{\partial J}{\partial \mathbf{W}^{[l]}} = \boldsymbol{\delta}^{[l]} (\mathbf{a}^{[l-1]})^T$
   - $\frac{\partial J}{\partial \mathbf{b}^{[l]}} = \boldsymbol{\delta}^{[l]}$
5. **Update weights**: $\mathbf{W}^{[l]} \leftarrow \mathbf{W}^{[l]} - \alpha \frac{\partial J}{\partial \mathbf{W}^{[l]}}$

## Weight Initialisation

| Method | Formula | When |
|--------|---------|------|
| Xavier (Glorot) | $W \sim \mathcal{N}(0, \frac{1}{n_{in}})$ | Sigmoid/Tanh |
| He initialisation | $W \sim \mathcal{N}(0, \frac{2}{n_{in}})$ | ReLU |
| Zero init | $W = 0$ | **Never** (symmetry breaking problem) |

## Universal Approximation Theorem

A feedforward network with a single hidden layer of sufficient width can approximate any continuous function on a compact set to arbitrary accuracy.

> Does **not** say it is easy to find such weights or that one layer is efficient.

<details>
<summary><strong>Practice: Compute forward and backward pass</strong></summary>

Given: 1 hidden layer, 2 inputs, 2 hidden units, 1 output. ReLU hidden, sigmoid output.

Forward:
- $z_1^{[1]} = w_{11}x_1 + w_{12}x_2 + b_1^{[1]}$
- $a_1^{[1]} = \max(0, z_1^{[1]})$
- $z^{[2]} = w_1^{[2]}a_1^{[1]} + w_2^{[2]}a_2^{[1]} + b^{[2]}$
- $\hat{y} = \sigma(z^{[2]})$

Backward (with BCE loss):
- $\delta^{[2]} = \hat{y} - y$
- $\delta^{[1]}_j = w_j^{[2]} \delta^{[2]} \cdot \mathbb{1}[z_j^{[1]} > 0]$
</details>

<details>
<summary><strong>Practice: Why can't we initialise all weights to zero?</strong></summary>

All neurons in a layer compute the same output (symmetry). Gradients are identical, so all weights update identically. The network effectively has one neuron per layer -- it cannot learn different features. Random initialisation breaks this symmetry.
</details>
