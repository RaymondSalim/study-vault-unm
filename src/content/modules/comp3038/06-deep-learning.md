---
title: "Deep Learning"
order: 6
moduleTitle: "COMP3038 - Machine Learning"
tags: ["CNN", "RNN", "LSTM", "transformer", "deep-learning", "convolution", "pooling"]
---

## Convolutional Neural Networks (CNNs)

:::eli10

CNNs are designed to understand images. Instead of looking at every single pixel individually, they use small sliding windows (filters) that scan across the image looking for patterns -- like edges, corners, or textures. Early layers detect simple things (lines), and later layers combine them into complex things (faces, cars). It is like how you recognise a face by first noticing eyes, nose, and mouth, then putting them together.

:::

:::eli15
Convolutional Neural Networks exploit the spatial structure of images. A convolutional layer slides small learnable filters across the input, detecting local patterns (edges, textures). Pooling layers then downsample the result, making the representation smaller and somewhat invariant to small shifts. Stacking multiple convolutional and pooling layers builds a hierarchy: early layers detect simple features, deeper layers detect complex objects composed of those simpler features. CNNs have far fewer parameters than fully-connected networks on images because weights are shared across spatial positions.

:::

:::eli20
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

:::

## Recurrent Neural Networks (RNNs)

:::eli10

RNNs are designed for sequences -- like sentences, music, or time series. They read one word (or note) at a time and remember what they have seen so far using a "hidden state" -- like short-term memory. This lets them understand that "not" in "not good" flips the meaning, because they remember the "not" when they see "good."

:::

:::eli15
Recurrent Neural Networks process sequential data by maintaining a hidden state that gets updated at each time step. The same weights are applied at every step, and the hidden state carries information from previous inputs. This allows the network to model dependencies across time (e.g., understanding context in language). However, vanilla RNNs struggle with long sequences because gradients either vanish (making it impossible to learn long-range patterns) or explode (causing unstable training). This led to LSTM and GRU architectures.

:::

:::eli20
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

:::

## Long Short-Term Memory (LSTM)

:::eli10

An LSTM is like giving the RNN a notebook. It can choose to write important things down (input gate), erase things that are no longer useful (forget gate), and look up notes when needed (output gate). This way, it can remember important information from much earlier in the sequence -- like remembering the subject of a sentence even if many words have passed.

:::

:::eli15
LSTM networks solve the vanishing gradient problem by introducing a "cell state" -- a separate memory channel that flows through time with only minor modifications. Three gates control it: the forget gate decides what to erase, the input gate decides what new information to write, and the output gate decides what to read out. Because the cell state is modified by addition rather than repeated multiplication, gradients flow through it much more easily over long sequences. GRU is a simpler variant with two gates that achieves similar performance with fewer parameters.

:::

:::eli20
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

:::

## Transformers (Overview)

:::eli10

Transformers are the technology behind ChatGPT and modern AI. Instead of reading a sentence one word at a time (like RNNs), they look at all words at once and figure out which words are most related to each other. It is like reading a whole page and drawing lines between related words, no matter how far apart they are. This makes them very fast and very good at understanding context.

:::

:::eli15
Transformers replaced RNNs for most sequence tasks by using a "self-attention" mechanism. Instead of processing one element at a time, attention lets each position directly look at every other position and decide how much to focus on it. This solves the long-range dependency problem and allows full parallelisation during training (unlike sequential RNNs). The attention score between two positions is computed as a scaled dot product of their query and key vectors, and the result is used to weight their value vectors. Multi-head attention runs several attention mechanisms in parallel to capture different types of relationships.

:::

:::eli20
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

:::
