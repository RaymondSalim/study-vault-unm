---
title: "Convolutional Neural Networks"
order: 7
moduleTitle: "COMP3029 - Computer Vision"
tags: ["cnn", "convolution", "pooling", "alexnet", "vgg", "resnet", "transfer-learning"]
---

## Overview

:::eli10

CNNs are special neural networks designed for images. Instead of connecting every pixel to every neuron (which would be way too many connections), they use small sliding filters that scan across the image looking for patterns like edges, textures, and shapes. Early layers detect simple things (lines, corners), and later layers combine these into complex things (eyes, wheels, faces). This is what powers modern image recognition.

:::

:::eli15
Convolutional Neural Networks exploit the spatial structure of images through three key principles: local connectivity (each neuron sees only a small patch), weight sharing (the same filter is applied at every position), and hierarchical feature learning (simple features combine into complex ones across layers). This dramatically reduces parameters compared to fully-connected networks and builds in useful inductive biases about image structure -- nearby pixels are related, and the same pattern can appear anywhere.

:::

:::eli20
CNNs exploit the spatial structure of images through local connectivity, weight sharing, and hierarchical feature learning.

:::

## CNN Building Blocks

:::eli10

A CNN has three main types of layers. Convolutional layers slide small filters over the image to detect patterns (like edge detectors, but learned automatically). Pooling layers shrink the image to make it smaller and more manageable, while keeping the important information. Fully connected layers at the end take all the detected features and make the final decision about what is in the image.

:::

:::eli15
CNNs are built from three layer types. Convolutional layers apply learned filters (kernels) that slide over the input, producing feature maps that highlight where specific patterns occur. The output size depends on kernel size, stride, and padding. Pooling layers reduce spatial dimensions (typically 2x halving) while preserving channel count, providing some translation invariance. Fully connected layers at the end flatten all feature maps and perform classification. Convolution is volumetric (spans all input channels) while pooling is purely spatial.

:::

:::eli20
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

:::

## Key CNN Architectures

:::eli10

Over the years, people built bigger and better CNNs. AlexNet (2012) proved that deep learning works for images and won a famous competition. VGGNet showed that using many small filters is better than a few big ones. ResNet introduced "shortcut" connections that skip over layers, allowing networks to be incredibly deep (over 100 layers) without losing the learning signal.

:::

:::eli15
CNN architectures have evolved rapidly. AlexNet (2012) demonstrated deep learning dominance on ImageNet with 8 layers, using ReLU and dropout. VGGNet (2014) showed that stacking small 3x3 filters achieves the same receptive field as larger filters with fewer parameters and more non-linearity. ResNet (2015) solved the degradation problem in very deep networks by introducing skip connections (residual learning), enabling training of 152+ layer networks. Each generation roughly halved the error rate on ImageNet.

:::

:::eli20
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

:::

## Transfer Learning

:::eli10

Transfer learning is like using knowledge from one subject to help with another. A network trained on millions of general photos (cats, cars, buildings) has already learned what edges, textures, and shapes look like. Instead of starting from scratch, you take this pre-trained network and teach it your specific task (like identifying types of flowers) -- it learns much faster because it already understands the basics.

:::

:::eli15
Transfer learning reuses features learned on a large dataset (typically ImageNet with 1.2M images) for new tasks with limited data. Early CNN layers learn generic visual features (edges, textures, colour blobs) that transfer well across domains. For small target datasets, you freeze the pre-trained convolutional layers and only train a new classification head. With more data, you can fine-tune some or all layers with a small learning rate. This dramatically reduces the data needed for good performance.

:::

:::eli20
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

:::

## Convolution Variants

:::eli10

There are different flavours of convolution for different needs. A 1x1 convolution mixes information between channels without looking at neighbours -- like combining the RGB channels in a new way. Depthwise separable convolution splits the work into two cheaper steps to save computation (used in phones). Dilated convolution adds gaps in the filter to see a bigger area without using more weights. Group convolution processes channel groups independently.

:::

:::eli15
Several convolution variants address specific needs. 1x1 convolutions mix channel information without spatial interaction, serving as bottlenecks to reduce dimensionality. Depthwise separable convolutions (MobileNet) factor standard convolution into a per-channel spatial filter and a channel-mixing 1x1 filter, reducing computation by a factor of K^2. Dilated/atrous convolutions insert gaps between filter elements to expand the receptive field without adding parameters. Group convolutions split channels into independent groups, reducing computation by factor G. Inception modules apply multiple filter sizes in parallel.

:::

:::eli20
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

:::

## CNN Design Principles

:::eli10

Good CNNs follow a pattern: use small (3x3) filters stacked deep rather than big filters, increase the number of filters as you go deeper (since later layers need to represent more complex things), shrink the spatial size with pooling, use batch normalisation to keep training stable, and add skip connections to let gradients flow freely through very deep networks.

:::

:::eli15
Modern CNN design follows established principles. Small 3x3 filters are preferred because stacking them achieves the same receptive field as larger filters with fewer parameters and more non-linearity. Channel count increases with depth to provide capacity for increasingly abstract features. Spatial dimensions decrease with depth (via pooling or strided convolutions) to reduce computation. Batch normalisation, skip connections, and global average pooling (replacing large FC layers) are standard components in modern architectures.

:::

:::eli20
| Principle | Rationale |
|-----------|-----------|
| Small filters (3x3) | More non-linearity, fewer parameters |
| Increase channels with depth | More abstract features need more capacity |
| Reduce spatial with depth | Pool or stride to reduce computation |
| Batch normalisation | Stabilise training, allow higher LR |
| Skip connections | Enable very deep networks |
| Global average pooling | Replace FC layers, reduce parameters |

:::

## Receptive Field

:::eli10

The receptive field is how much of the original image a single neuron in a later layer can "see." Each convolutional layer can only see a small neighbourhood, but as you stack layers, the effective view gets bigger and bigger. Three layers of 3x3 filters let a neuron see a 7x7 area of the input. Deeper networks have larger receptive fields, which is why they can understand bigger structures.

:::

:::eli15
The receptive field is the region of the input image that influences a particular neuron's output. Each convolutional layer expands the receptive field by (kernel_size - 1) pixels. For L layers of FxF filters with stride 1, the total receptive field is L*(F-1)+1. Pooling and strided convolutions multiply the effective receptive field growth. Understanding receptive fields helps design networks that can "see" enough context for their task -- object detection needs larger receptive fields than edge detection.

:::

:::eli20
The receptive field is the input region that influences a particular output neuron.

For $L$ layers of $F \times F$ filters with stride 1:

$$\text{Receptive field} = L \times (F - 1) + 1$$

Example: 3 layers of 3x3 = receptive field of 7x7.

:::

<details><summary>Practice</summary>

1. An input of 224x224x3 is convolved with 64 filters of size 7x7, stride 2, padding 3. What is the output size? How many parameters?

2. Explain why two stacked 3x3 conv layers are preferred over one 5x5 layer.

3. Why does ResNet use skip connections? What would happen without them at 100+ layers?

4. You have 500 labelled medical images. Describe a transfer learning strategy using a pre-trained ResNet.

5. Calculate the receptive field of a network with: Conv 3x3 -> Pool 2x2 -> Conv 3x3 -> Pool 2x2 -> Conv 3x3.

</details>
