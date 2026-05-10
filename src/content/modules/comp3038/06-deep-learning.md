---
title: "Deep Learning"
order: 6
moduleTitle: "COMP3038 - Machine Learning"
tags: ["CNN", "RNN", "LSTM", "transformer", "deep-learning", "convolution", "pooling"]
---

## Convolutional Neural Networks (CNNs)

### Key Idea

Exploit **spatial structure** in data (images) using local connectivity and weight sharing.

### Architecture Components

| Layer | Operation | Purpose |
|-------|-----------|---------|
| Convolutional | Slide filter over input, compute dot products | Feature extraction |
| Pooling | Downsample (max/average) | Reduce spatial size, add invariance |
| Fully Connected | Standard MLP layer | Final classification |
| Batch Normalisation | Normalise activations | Stabilise training |

### Convolution Operation

For input $I$ and kernel $K$ of size $f \times f$:

$$(I * K)[i,j] = \sum_{m=0}^{f-1} \sum_{n=0}^{f-1} I[i+m, j+n] \cdot K[m, n]$$

### Output Size Formula

$$n_{\text{out}} = \left\lfloor \frac{n_{\text{in}} + 2p - f}{s} \right\rfloor + 1$$

| Symbol | Meaning |
|--------|---------|
| $n_{\text{in}}$ | Input size |
| $f$ | Filter/kernel size |
| $p$ | Padding |
| $s$ | Stride |

### Parameter Count

For a conv layer with $c_{\text{in}}$ input channels, $c_{\text{out}}$ filters of size $f \times f$:

$$\text{Params} = c_{\text{out}} \times (c_{\text{in}} \times f \times f + 1)$$

(The $+1$ is for bias per filter.)

### Pooling

| Type | Operation | Typical config |
|------|-----------|---------------|
| Max pooling | Take maximum in window | $2 \times 2$, stride 2 |
| Average pooling | Take average in window | $2 \times 2$, stride 2 |
| Global average pooling | Average entire feature map | Before FC layer |

> Pooling has **no learnable parameters**.

### Famous CNN Architectures

| Architecture | Year | Key innovation |
|-------------|------|----------------|
| LeNet-5 | 1998 | First successful CNN (digits) |
| AlexNet | 2012 | Deep CNN + ReLU + dropout + GPU |
| VGG | 2014 | Very deep (16-19 layers), small $3\times3$ filters |
| GoogLeNet | 2014 | Inception modules (parallel filters) |
| ResNet | 2015 | Skip connections (residual learning) |

### Residual Connection (ResNet)

$$\mathbf{a}^{[l+2]} = g(\mathbf{z}^{[l+2]} + \mathbf{a}^{[l]})$$

Solves vanishing gradient in very deep networks by providing a "shortcut" for gradients.

## Recurrent Neural Networks (RNNs)

### Key Idea

Process **sequential data** by maintaining a hidden state across time steps.

### Equations

$$\mathbf{h}_t = g(\mathbf{W}_{hh} \mathbf{h}_{t-1} + \mathbf{W}_{xh} \mathbf{x}_t + \mathbf{b}_h)$$
$$\mathbf{y}_t = \mathbf{W}_{hy} \mathbf{h}_t + \mathbf{b}_y$$

### Problems

| Problem | Cause | Effect |
|---------|-------|--------|
| Vanishing gradient | Repeated multiplication by $\mathbf{W}_{hh}$ | Cannot learn long-range dependencies |
| Exploding gradient | Large eigenvalues of $\mathbf{W}_{hh}$ | Unstable training |

**Fix for exploding**: Gradient clipping. **Fix for vanishing**: LSTM/GRU.

## Long Short-Term Memory (LSTM)

### Gates

| Gate | Formula | Purpose |
|------|---------|---------|
| Forget | $\mathbf{f}_t = \sigma(\mathbf{W}_f [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_f)$ | What to erase from cell state |
| Input | $\mathbf{i}_t = \sigma(\mathbf{W}_i [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_i)$ | What new info to store |
| Output | $\mathbf{o}_t = \sigma(\mathbf{W}_o [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_o)$ | What to output |

### Cell State Update

$$\tilde{\mathbf{c}}_t = \tanh(\mathbf{W}_c [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_c)$$
$$\mathbf{c}_t = \mathbf{f}_t \odot \mathbf{c}_{t-1} + \mathbf{i}_t \odot \tilde{\mathbf{c}}_t$$
$$\mathbf{h}_t = \mathbf{o}_t \odot \tanh(\mathbf{c}_t)$$

> The cell state $\mathbf{c}_t$ is the "memory highway" -- gradients flow through $\mathbf{f}_t$ multiplication rather than repeated matrix multiplications.

### GRU (Simplified LSTM)

| LSTM | GRU |
|------|-----|
| 3 gates (forget, input, output) | 2 gates (reset, update) |
| Separate cell state + hidden state | Single hidden state |
| More parameters | Fewer parameters |

## Transformers (Overview)

### Self-Attention

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

| Component | Role |
|-----------|------|
| Query ($Q$) | "What am I looking for?" |
| Key ($K$) | "What do I contain?" |
| Value ($V$) | "What do I output?" |
| $\sqrt{d_k}$ scaling | Prevents large dot products from saturating softmax |

### Key Advantages over RNNs

| | RNN | Transformer |
|-|-----|-------------|
| Parallelisation | Sequential (slow) | Fully parallel |
| Long-range dependencies | Difficult (vanishing gradient) | Direct attention |
| Training speed | Slow | Fast (on GPU) |
| Positional info | Implicit (order) | Explicit (positional encoding) |

<details>
<summary><strong>Practice: Calculate CNN output dimensions</strong></summary>

Input: $32 \times 32 \times 3$ image
Conv layer: 16 filters, $5 \times 5$, stride 1, padding 2

Output height/width: $\lfloor\frac{32 + 2(2) - 5}{1}\rfloor + 1 = \lfloor\frac{31}{1}\rfloor + 1 = 32$

Output: $32 \times 32 \times 16$

Parameters: $16 \times (3 \times 5 \times 5 + 1) = 16 \times 76 = 1{,}216$
</details>

<details>
<summary><strong>Practice: Why does LSTM solve vanishing gradients?</strong></summary>

In a standard RNN, the gradient at time $t$ involves $\prod_{k} \mathbf{W}_{hh}$ terms that shrink exponentially.

In LSTM, the cell state gradient involves:
$$\frac{\partial \mathbf{c}_t}{\partial \mathbf{c}_{t-1}} = \mathbf{f}_t$$

This is a **diagonal matrix** (element-wise multiplication), and the forget gate values are typically close to 1 for important information. This avoids the repeated multiplication by a fixed weight matrix.
</details>
