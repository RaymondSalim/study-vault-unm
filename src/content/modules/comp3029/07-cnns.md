---
title: "Convolutional Neural Networks"
order: 7
moduleTitle: "COMP3029 - Computer Vision"
tags: ["cnn", "convolution", "pooling", "alexnet", "vgg", "resnet", "transfer-learning"]
---

## Overview

CNNs exploit the spatial structure of images through local connectivity, weight sharing, and hierarchical feature learning.

## CNN Building Blocks

### Convolutional Layer

| Property | Detail |
|----------|--------|
| Operation | Slide filter (kernel) over input, compute dot products |
| Weight sharing | Same filter applied at all spatial positions |
| Local connectivity | Each output depends on small input region |
| Output | Feature map (activation map) |

**Output size:**

$$\text{out} = \frac{\text{in} - \text{kernel} + 2 \times \text{padding}}{\text{stride}} + 1$$

### Parameters of a Conv Layer

| Parameter | Meaning |
|-----------|---------|
| Kernel size | Spatial extent of filter (e.g., 3x3, 5x5) |
| Number of filters | Number of output feature maps |
| Stride | Step size of filter sliding |
| Padding | Zero-padding to control output size |

**Parameter count:** For input with $C_{in}$ channels, $K$ filters of size $F \times F$:

$$\text{params} = K \times (C_{in} \times F \times F + 1)$$

### Convolution is Volumetric

The filter spans ALL input channels but slides only spatially (x, y). Per-channel products are summed to produce one output value per filter position. Pooling, by contrast, is 2D only — channel count is preserved after pooling.

### Pooling Layer

Reduces spatial dimensions, provides translation invariance. Channel count stays unchanged.

| Type | Operation | Typical Size |
|------|-----------|-------------|
| Max pooling | Take maximum in window | 2x2, stride 2 |
| Average pooling | Take mean in window | 2x2, stride 2 |
| Global average pooling | Average entire feature map | Full spatial extent |

**No learnable parameters** in pooling layers.

### Fully Connected Layer

- Flatten feature maps into 1D vector
- Standard MLP layers for classification
- Typically at the end of the network

## Key CNN Architectures

| Architecture | Year | Depth | Top-5 Error | Key Innovation |
|-------------|------|-------|-------------|----------------|
| LeNet-5 | 1998 | 5 | -- | First successful CNN (digits) |
| AlexNet | 2012 | 8 | 15.3% | ReLU, dropout, GPU training |
| VGGNet | 2014 | 16/19 | 7.3% | Small 3x3 filters throughout |
| GoogLeNet | 2014 | 22 | 6.7% | Inception modules |
| ResNet | 2015 | 152 | 3.6% | Skip connections |

### LeNet-5 (1998)

- Input: 32x32 grayscale
- Architecture: Conv-Pool-Conv-Pool-FC-FC
- Application: Handwritten digit recognition

### AlexNet (2012)

| Innovation | Benefit |
|-----------|---------|
| ReLU activation | Faster training, no vanishing gradient |
| Dropout (p=0.5) | Regularisation |
| Data augmentation | Reduce overfitting |
| GPU training | Feasible for large networks |
| Local response normalisation | Lateral inhibition (later abandoned) |

Architecture: 5 conv layers + 3 FC layers, ~60M parameters.

### VGGNet (2014)

Key insight: **Stack of small 3x3 filters** equivalent to larger receptive field but with fewer parameters and more non-linearity.

| Configuration | Parameters (per channel) | Receptive Field | Non-linearities |
|--------------|------------------------|----------------|-----------------|
| Three 3x3 layers | $3 \times 9C^2 = 27C^2$ | 7x7 | 3 ReLUs |
| One 7x7 layer | $49C^2$ | 7x7 | 1 ReLU |
| Two 3x3 layers | $2 \times 9C^2 = 18C^2$ | 5x5 | 2 ReLUs |
| One 5x5 layer | $25C^2$ | 5x5 | 1 ReLU |

Stacking is more parameter-efficient AND adds more non-linearity.

### ResNet (2015)

**Problem:** Very deep networks degrade (not just overfit -- training error increases).

**Solution:** Skip connections (residual learning):

$$\mathbf{y} = F(\mathbf{x}) + \mathbf{x}$$

| Benefit | Explanation |
|---------|-------------|
| Gradient flow | Gradients can bypass layers via skip connection |
| Identity mapping | Easy to learn identity (set $F = 0$) |
| Very deep networks | Enables 100+ layers without degradation |
| Ensemble effect | Can be viewed as ensemble of shallower networks |

## Transfer Learning

Use features learned on large dataset (ImageNet) for new tasks.

### Strategies

| Strategy | When | Method |
|----------|------|--------|
| Feature extraction | Small dataset, similar domain | Freeze conv layers, train new FC |
| Fine-tuning | Moderate dataset | Unfreeze some/all layers, train with small LR |
| Full training | Large dataset, different domain | Train from scratch |

### Why Transfer Learning Works

- Early layers learn generic features (edges, textures)
- Later layers learn task-specific features
- Pre-trained features are good starting points for related tasks

## Convolution Variants

### 1x1 Convolution

Mixes channel information only — no spatial interaction. Used as a "bottleneck" to reduce channel dimensionality before expensive operations.

$$\text{params} = 1 \times 1 \times C_{in} \times C_{out}$$

### Depthwise Separable Convolution (MobileNet)

Separates spatial filtering and channel mixing:

| Step | Operation | Parameters |
|------|-----------|-----------|
| Depthwise | $K \times K$ filter per channel independently | $K^2 \times C_{in}$ |
| Pointwise | $1 \times 1 \times C_{in} \times C_{out}$ | $C_{in} \times C_{out}$ |
| **Total** | | $K^2 C_{in} + C_{in} C_{out}$ |

Standard convolution: $K^2 \times C_{in} \times C_{out}$ — depthwise separable reduces by factor $\approx K^2$.

### Dilated (Atrous) Convolution

Inserts gaps between filter elements to increase receptive field without increasing parameters or reducing resolution:

| Dilation rate $d$ | Effective receptive field of 3x3 kernel |
|------------------|----------------------------------------|
| $d = 1$ | 3x3 |
| $d = 2$ | 5x5 |
| $d = 3$ | 7x7 |

Effective size: $(2d + 1) \times (2d + 1)$ for a 3x3 kernel with dilation $d$.

### Group Convolution (ResNeXt)

Split input channels into $G$ groups; each group convolved independently:

$$\text{params} = K^2 \times \frac{C_{in}}{G} \times \frac{C_{out}}{G} \times G = \frac{K^2 \times C_{in} \times C_{out}}{G}$$

Reduces computation by factor $G$ while maintaining representational capacity.

### Inception Module (GoogLeNet)

Multi-scale feature integration via parallel branches:
- 1x1 convolution (captures fine details)
- 1x1 → 3x3 convolution (medium features)
- 1x1 → 5x5 convolution (coarse features)
- 3x3 max pooling → 1x1 convolution

All outputs concatenated along channel dimension. The 1x1 bottleneck before larger kernels reduces computation.

### Squeeze-and-Excitation (SE-Net)

Channel attention mechanism:

| Step | Operation | Output |
|------|-----------|--------|
| Squeeze | Global Average Pooling | $1 \times 1 \times C$ |
| Excitation | FC($C \to C/r$) → ReLU → FC($C/r \to C$) → Sigmoid | Channel weights |
| Scale | Multiply feature maps channel-wise by weights | Re-weighted features |

Learns which channels are important for each input. Reduction ratio $r$ (typically 16) controls bottleneck size.

## CNN Design Principles

| Principle | Rationale |
|-----------|-----------|
| Small filters (3x3) | More non-linearity, fewer parameters |
| Increase channels with depth | More abstract features need more capacity |
| Reduce spatial with depth | Pool or stride to reduce computation |
| Batch normalisation | Stabilise training, allow higher LR |
| Skip connections | Enable very deep networks |
| Global average pooling | Replace FC layers, reduce parameters |

## Receptive Field

The receptive field is the input region that influences a particular output neuron.

For $L$ layers of $F \times F$ filters with stride 1:

$$\text{Receptive field} = L \times (F - 1) + 1$$

Example: 3 layers of 3x3 = receptive field of 7x7.

<details><summary>Practice</summary>

1. An input of 224x224x3 is convolved with 64 filters of size 7x7, stride 2, padding 3. What is the output size? How many parameters?

2. Explain why two stacked 3x3 conv layers are preferred over one 5x5 layer.

3. Why does ResNet use skip connections? What would happen without them at 100+ layers?

4. You have 500 labelled medical images. Describe a transfer learning strategy using a pre-trained ResNet.

5. Calculate the receptive field of a network with: Conv 3x3 -> Pool 2x2 -> Conv 3x3 -> Pool 2x2 -> Conv 3x3.

</details>
