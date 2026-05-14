---
title: "Neural Networks"
order: 5
moduleTitle: "COMP3038 - Machine Learning"
tags: ["perceptron", "MLP", "backpropagation", "activation-functions", "neural-networks"]
---

## Perceptron

:::eli10

A perceptron is the simplest artificial "brain cell." It takes some inputs, multiplies each by a weight (how important it is), adds them up, and then decides: is the total above a threshold? If yes, output 1; if no, output -1. It can only learn to separate things with a straight line -- so it cannot solve tricky problems where the groups are interleaved.

:::

:::eli15

The perceptron is a single-layer linear classifier that predicts by computing a weighted sum of inputs plus a bias, then applying a sign function. If it misclassifies a point, it updates its weights toward the correct direction. It is guaranteed to converge only when the data is linearly separable. The famous XOR problem demonstrated that a single perceptron cannot model non-linear relationships, which motivated the development of multi-layer networks.

:::

:::eli20

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

:::

## Multi-Layer Perceptron (MLP)

:::eli10

An MLP is like stacking many perceptrons in layers. The first layer looks at the raw input, middle layers find useful patterns (like edges in a picture), and the final layer gives the answer. By having multiple layers, the network can learn curved and complicated boundaries that a single perceptron cannot.

:::

:::eli15

A Multi-Layer Perceptron has an input layer, one or more hidden layers, and an output layer. Each layer applies a linear transformation (weights and bias) followed by a non-linear activation function. Data flows forward through the network: each hidden layer transforms its input into a more useful representation. The hidden layers allow the network to learn complex, non-linear relationships. The number of layers and neurons per layer are architecture choices that affect the model's capacity.

:::

:::eli20

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

:::

## Activation Functions

:::eli10

Activation functions are like on/off switches (or dimmer switches) for each neuron. Without them, stacking layers would be useless -- it would just be one big multiplication. The activation function adds a "kink" or curve that lets the network learn non-straight-line patterns. ReLU is the most popular: it lets positive signals through unchanged and blocks negative ones.

:::

:::eli15

Activation functions introduce non-linearity into the network, which is essential for learning complex patterns. Without them, any number of stacked linear layers would collapse into a single linear transformation. The most common modern choice is ReLU (Rectified Linear Unit), which simply outputs zero for negative inputs and passes positive inputs unchanged. It trains faster than older choices (sigmoid, tanh) because it avoids the "vanishing gradient" problem for positive values. The output layer uses sigmoid (binary classification) or softmax (multi-class).

:::

:::eli20

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

:::

## Backpropagation

:::eli10

Backpropagation is how a neural network learns from its mistakes. After the network makes a prediction, it checks how wrong it was, then goes backwards through each layer figuring out "who was responsible for the error." Each neuron's weights get adjusted a little bit to make the answer less wrong next time. It is like a teacher marking a test and telling each student exactly what they got wrong.

:::

:::eli15

Backpropagation efficiently computes how much each weight contributed to the error by applying the chain rule of calculus backwards through the network. First, the forward pass produces a prediction. Then, the error is computed and propagated backward: for each layer, the algorithm calculates the gradient of the error with respect to that layer's weights. These gradients tell gradient descent which direction to adjust each weight to reduce the error. The key insight is that gradients from later layers can be reused when computing gradients for earlier layers, making the computation efficient.

:::

:::eli20

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

:::

## Weight Initialisation

:::eli10

Before training starts, the network needs starting values for all its weights. If you set them all to zero, every neuron does the same thing and the network cannot learn different features -- it is like having a class where every student gives the exact same answer. Instead, you give each weight a small random value so each neuron starts differently and can specialise.

:::

:::eli15

Weight initialisation sets the starting point for training. Zeros cause a "symmetry problem" -- all neurons compute the same thing and get the same gradient, so they never differentiate. Random initialisation breaks this symmetry. However, the scale matters: too large and signals explode; too small and they vanish. Xavier initialisation (scaled by 1/sqrt(fan-in)) works well with sigmoid/tanh activations. He initialisation (scaled by sqrt(2/fan-in)) is designed for ReLU and is the modern default.

:::

:::eli20

| Method | Formula | When |
|--------|---------|------|
| Xavier (Glorot) | $W \sim \mathcal{N}(0, \frac{1}{n_{in}})$ | Sigmoid/Tanh |
| He initialisation | $W \sim \mathcal{N}(0, \frac{2}{n_{in}})$ | ReLU |
| Zero init | $W = 0$ | **Never** (symmetry breaking problem) |

:::

## Universal Approximation Theorem

:::eli10

This theorem says that a neural network with just one hidden layer (if it is wide enough) can learn to approximate any smooth pattern. It is like saying "with enough LEGO bricks, you can build any shape." But it does not tell you how many bricks you need or how to find the right arrangement -- that is the hard part.

:::

:::eli15

The Universal Approximation Theorem proves that a feedforward network with a single hidden layer of sufficient width can approximate any continuous function on a bounded region to arbitrary precision. However, this is an existence result -- it does not guarantee that training will find those weights, nor that a single wide layer is efficient. In practice, deeper networks (more layers with fewer neurons each) often learn better representations than very wide shallow ones, which motivated deep learning.

:::

:::eli20

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

:::
