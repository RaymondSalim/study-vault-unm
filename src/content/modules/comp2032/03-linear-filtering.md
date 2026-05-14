---
title: "Linear Filtering"
order: 3
moduleTitle: "COMP2032 - Image Processing"
tags: ["convolution", "gaussian", "mean-filter", "noise"]
---

## From Point Processes to Spatial Filtering

:::eli10

Point processes change each pixel on its own, but spatial filtering is smarter — it looks at a pixel AND its neighbours to decide what to do. It's like deciding if a spot on a painting is a mistake by looking at the colours around it, not just the spot itself.

:::

:::eli15

While point processes transform each pixel independently, spatial filters consider a neighbourhood (window) of pixels around each position. This allows operations like smoothing (averaging neighbours to reduce noise), sharpening (emphasising differences from neighbours), and edge detection. The filter is defined by a small grid of weights called a kernel that slides across the image.

:::

:::eli20

| Approach | Depends on | Power |
|----------|-----------|-------|
| Point process | Single pixel | Limited — no context |
| Spatial filter | Pixel neighbourhood (window) | Can smooth, sharpen, detect edges |

:::

## Convolution

:::eli10

Convolution is like putting a small stamp over each pixel in the image. The stamp has numbers on it that tell you how much to care about each nearby pixel. You multiply, add up the results, and that gives you the new value for the centre pixel. Slide the stamp across the whole image and you've filtered it!

:::

:::eli15

Convolution is the core operation of linear filtering. You place a small grid of weights (kernel) over each pixel position, multiply each weight by the corresponding pixel value beneath it, and sum the results to get the new pixel value. Key mathematical properties include commutativity (order doesn't matter), associativity (you can combine kernels), and separability (some 2D kernels can be split into two 1D passes, dramatically reducing computation).

:::

:::eli20

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

:::

## Mean (Box) Filter

:::eli10

A mean filter replaces each pixel with the average of itself and its neighbours. It's like blurring your eyes slightly — everything gets smoother and fuzzier. Noise (random speckles) gets reduced, but edges also get blurry.

:::

:::eli15

The mean (box) filter is the simplest smoothing filter — every weight in the kernel is equal, so the output is just the average of all pixels in the window. A 3x3 mean filter averages 9 pixels. It effectively reduces random noise by averaging it out, but it also blurs sharp edges because it treats all neighbours equally regardless of distance from the centre.

:::

:::eli20

All weights equal: $w(s,t) = \frac{1}{(2a+1)^2}$

$$\text{3×3 mean:} \quad \frac{1}{9}\begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$$

**Effect**: Smooths image, reduces noise, blurs edges.

:::

## Gaussian Filter

:::eli10

A Gaussian filter is a smarter blur. Instead of treating all neighbours equally (like the mean filter), it cares more about pixels close to the centre and less about ones far away. It's like asking your closest friends for advice rather than asking everyone in the room equally.

:::

:::eli15

The Gaussian filter weights neighbours using a bell-curve (Gaussian) distribution — pixels closer to the centre get higher weights. The parameter sigma controls how much smoothing occurs: larger sigma means more blur. Compared to the mean filter, it produces more natural-looking smoothing without ringing artefacts. It's also separable, meaning a 2D Gaussian can be computed as two sequential 1D passes (one horizontal, one vertical), which is much faster for large kernels.

:::

:::eli20

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

:::

## Noise Types

:::eli10

Noise in images is like static on a TV. Gaussian noise adds random fuzziness everywhere. Salt-and-pepper noise is like someone randomly flicked white and black paint on your picture. Different types of noise need different cleaning methods.

:::

:::eli15

Digital images can be corrupted by various types of noise. Gaussian noise adds random values drawn from a normal distribution to every pixel — best removed by averaging (mean or Gaussian filters). Salt-and-pepper noise randomly sets some pixels to black or white — best removed by a median filter, which picks the middle value from neighbours rather than averaging. Understanding the noise type helps you choose the most effective filter.

:::

:::eli20

| Noise Type | Characteristics | Best Filter |
|-----------|----------------|-------------|
| Gaussian | Additive, normal distribution | Gaussian/Mean |
| Salt & Pepper | Random black/white pixels | Median |
| Uniform | Equal probability across range | Mean |

:::

## Boundary Handling

:::eli10

When the filter reaches the edge of an image, some of the stamp hangs off the side with no pixels underneath. The computer has to guess what's there — it might pretend there are black pixels, copy the edge pixels, or mirror the image like a reflection in water.

:::

:::eli15

When applying a filter near image borders, the kernel extends beyond the image boundaries. Different strategies handle this: zero padding (assume black pixels outside), replicate (repeat the nearest edge pixel), reflect (mirror the image at the boundary), or wrap (treat the image as if it tiles infinitely). The choice affects the appearance of filtered border regions — reflection often gives the most natural results.

:::

:::eli20

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

:::
