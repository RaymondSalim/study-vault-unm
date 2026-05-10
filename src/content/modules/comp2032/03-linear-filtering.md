---
title: "Linear Filtering"
order: 3
moduleTitle: "COMP2032 - Image Processing"
tags: ["convolution", "gaussian", "mean-filter", "noise"]
---

## From Point Processes to Spatial Filtering

| Approach | Depends on | Power |
|----------|-----------|-------|
| Point process | Single pixel | Limited — no context |
| Spatial filter | Pixel neighbourhood (window) | Can smooth, sharpen, detect edges |

## Convolution

The output pixel is a **weighted sum** of input pixels in a window:

$$g(x, y) = \sum_{s=-a}^{a} \sum_{t=-b}^{b} w(s, t) \cdot f(x+s, y+t)$$

Where $w$ is the **kernel** (mask) of size $(2a+1) \times (2b+1)$.

### Properties

| Property | Formula |
|----------|---------|
| Commutative | $f * g = g * f$ |
| Associative | $(f * g) * h = f * (g * h)$ |
| Distributive | $f * (g + h) = f * g + f * h$ |
| Separable (if applicable) | $w_{2D} = w_{col} \cdot w_{row}^T$ |

**Separability** reduces computation from $O(n^2)$ per pixel to $O(2n)$.

## Mean (Box) Filter

All weights equal: $w(s,t) = \frac{1}{(2a+1)^2}$

$$\text{3×3 mean:} \quad \frac{1}{9}\begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$$

**Effect**: Smooths image, reduces noise, blurs edges.

## Gaussian Filter

Weights follow a Gaussian distribution:

$$G(x, y) = \frac{1}{2\pi\sigma^2} e^{-\frac{x^2 + y^2}{2\sigma^2}}$$

| Parameter | Effect |
|-----------|--------|
| Small $\sigma$ | Less smoothing, preserves detail |
| Large $\sigma$ | More smoothing, more blur |
| Kernel size | Should be $\geq 6\sigma + 1$ |

**Advantages over box filter**:
- Weights decrease with distance (more natural)
- Separable: apply 1D Gaussian in x, then in y
- No ringing artefacts

### Gaussian Kernel Example ($\sigma = 1$, 5×5 approximation)

$$\frac{1}{273}\begin{bmatrix} 1 & 4 & 7 & 4 & 1 \\ 4 & 16 & 26 & 16 & 4 \\ 7 & 26 & 41 & 26 & 7 \\ 4 & 16 & 26 & 16 & 4 \\ 1 & 4 & 7 & 4 & 1 \end{bmatrix}$$

## Noise Types

| Noise Type | Characteristics | Best Filter |
|-----------|----------------|-------------|
| Gaussian | Additive, normal distribution | Gaussian/Mean |
| Salt & Pepper | Random black/white pixels | Median |
| Uniform | Equal probability across range | Mean |

## Boundary Handling

| Method | Description |
|--------|-------------|
| Zero padding | Assume pixels outside are 0 |
| Replicate | Copy nearest edge pixel |
| Reflect | Mirror the image at boundary |
| Wrap | Treat image as periodic |

<details>
<summary>Practice: A 5×5 mean filter requires how many multiplications per pixel? How many if separable?</summary>

Non-separable: $5 \times 5 = 25$ multiplications per pixel.
Separable: $5 + 5 = 10$ multiplications per pixel.
</details>

<details>
<summary>Practice: Why does a larger Gaussian kernel need a larger σ?</summary>

If the kernel is large but $\sigma$ is small, the outer weights are effectively zero (wasted computation). The kernel should be $\geq 6\sigma + 1$ to capture the meaningful part of the Gaussian distribution.
</details>
