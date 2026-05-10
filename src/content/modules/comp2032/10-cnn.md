---
title: "Convolutional Neural Networks"
order: 10
moduleTitle: "COMP2032 - Image Processing"
tags: ["CNN", "deep-learning", "convolution", "pooling"]
---

## CNN Overview

CNNs apply the image processing operations we learned (convolution, resizing, filtering) as **learnable** layers.

### Architecture

```
Input → [Conv → ReLU → Pool]×N → Flatten → FC → Output
```

## Components

| Layer | Function | Output |
|-------|----------|--------|
| Convolutional | Learnable filters detect features | Feature maps |
| Activation (ReLU) | Non-linearity: $f(x) = \max(0, x)$ | Same size |
| Pooling | Downsample (reduce spatial size) | Smaller feature maps |
| Fully Connected | Classification from features | Class scores |
| Output (Softmax) | Probability distribution | Predictions |

## Convolutional Layer

Same operation as image filtering, but **kernels are learned**:

$$\text{output}(i,j) = \sum_m \sum_n \text{input}(i+m, j+n) \cdot \text{kernel}(m,n) + b$$

| Parameter | Description |
|-----------|-------------|
| Filter size | Typically 3×3 or 5×5 |
| Number of filters | Depth of output (e.g., 32, 64, 128) |
| Stride | Step size (1 = overlap, 2 = downsample) |
| Padding | Preserve spatial dimensions (same vs valid) |

**Output size**: $\lfloor \frac{W - K + 2P}{S} \rfloor + 1$

Where $W$ = input size, $K$ = kernel size, $P$ = padding, $S$ = stride.

## Pooling Layer

Reduces spatial dimensions while retaining important features.

| Type | Operation |
|------|-----------|
| Max pooling | Take maximum in window |
| Average pooling | Take mean in window |
| Global average | Average over entire feature map → single value per channel |

Typical: 2×2 window, stride 2 → halves spatial dimensions.

## Training

| Concept | Description |
|---------|-------------|
| Forward pass | Input → compute output through all layers |
| Loss function | Measure error (cross-entropy for classification) |
| Backpropagation | Compute gradients of loss w.r.t. all weights |
| Optimiser | Update weights (SGD, Adam) |
| Epoch | One pass through entire training set |

## Connection to Image Processing

| CNN Layer | IP Equivalent |
|-----------|--------------|
| Conv layer (learned) | Convolution with designed kernel |
| Pooling | Downsampling / resizing |
| Early layers | Edge detection (Sobel-like filters) |
| Middle layers | Texture/pattern detection |
| Deep layers | Semantic/object-level features |

## Applications

| Task | Approach |
|------|----------|
| Classification | CNN → FC → softmax |
| Object detection | Region proposals + CNN (R-CNN, YOLO) |
| Segmentation | Encoder-decoder (U-Net) |
| Super-resolution | CNN learns upsampling |

<details>
<summary>Practice: How many parameters does a convolutional layer with 32 filters of size 3×3 on a 3-channel input have?</summary>

Each filter: $3 \times 3 \times 3 = 27$ weights + 1 bias = 28.
Total: $32 \times 28 = 896$ parameters.
</details>

<details>
<summary>Practice: What is the output size of a 28×28 input with a 5×5 filter, stride 1, no padding?</summary>

$\lfloor(28 - 5 + 0)/1\rfloor + 1 = 24$. Output is 24×24.
</details>
