---
title: "Edge Detection & Derivatives"
order: 6
moduleTitle: "COMP2032 - Image Processing"
tags: ["edges", "derivatives", "canny", "sobel", "laplacian"]
---

## Why Edges?

Edges = locations of sharp intensity change. They encode object boundaries, texture, and shape.

## 1st Derivative (Gradient)

$$\frac{\partial f}{\partial x} \approx f(x+1) - f(x)$$

The **gradient** at pixel $(x,y)$:

$$\nabla f = \begin{bmatrix} G_x \\ G_y \end{bmatrix} = \begin{bmatrix} \frac{\partial f}{\partial x} \\ \frac{\partial f}{\partial y} \end{bmatrix}$$

| Property | Formula |
|----------|---------|
| Magnitude | $\|\nabla f\| = \sqrt{G_x^2 + G_y^2}$ |
| Direction | $\theta = \arctan(G_y / G_x)$ |

### Common Gradient Operators

| Operator | $G_x$ kernel | $G_y$ kernel |
|----------|-------------|-------------|
| Roberts | $\begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$ | $\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$ |
| Prewitt | $\begin{bmatrix} -1 & 0 & 1 \\ -1 & 0 & 1 \\ -1 & 0 & 1 \end{bmatrix}$ | $\begin{bmatrix} -1 & -1 & -1 \\ 0 & 0 & 0 \\ 1 & 1 & 1 \end{bmatrix}$ |
| Sobel | $\begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix}$ | $\begin{bmatrix} -1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1 \end{bmatrix}$ |

Sobel gives more weight to the centre row/column → better noise immunity.

## 2nd Derivative (Laplacian)

$$\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2}$$

Edges at **zero-crossings** of the Laplacian.

| Kernel | Values |
|--------|--------|
| 4-connected | $\begin{bmatrix} 0 & 1 & 0 \\ 1 & -4 & 1 \\ 0 & 1 & 0 \end{bmatrix}$ |
| 8-connected | $\begin{bmatrix} 1 & 1 & 1 \\ 1 & -8 & 1 \\ 1 & 1 & 1 \end{bmatrix}$ |

**Laplacian of Gaussian (LoG)**: Smooth first (Gaussian), then apply Laplacian. Equivalent to convolving with LoG kernel.

## Sharpening

Enhance edges by adding scaled gradient back:

$$g = f + k \cdot \nabla^2 f$$

Or using **unsharp masking**: $g = f + k \cdot (f - f_{\text{blurred}})$

## The Canny Edge Detector

The "optimal" edge detector. Steps:

| Step | Operation |
|------|-----------|
| 1 | Gaussian smoothing (reduce noise) |
| 2 | Compute gradient magnitude & direction (Sobel) |
| 3 | Non-maximum suppression (thin edges to 1px) |
| 4 | Hysteresis thresholding (two thresholds: $T_H$, $T_L$) |

### Non-Maximum Suppression

At each pixel, check if gradient magnitude is local maximum along the gradient direction. If not, suppress to 0.

### Hysteresis Thresholding

| Pixel magnitude | Classification |
|----------------|---------------|
| $\geq T_H$ | Strong edge (keep) |
| $T_L \leq$ magnitude $< T_H$ | Weak edge (keep only if connected to strong edge) |
| $< T_L$ | Not an edge (discard) |

<details>
<summary>Practice: Why does Canny use two thresholds instead of one?</summary>

A single threshold either misses weak but genuine edges (if too high) or includes noise (if too low). Hysteresis keeps weak edges only when connected to strong edges, maintaining edge continuity without noise.
</details>

<details>
<summary>Practice: Why smooth before edge detection?</summary>

Derivatives amplify noise (high-frequency). Gaussian smoothing removes high-frequency noise so that the gradient responds primarily to genuine edges rather than noise fluctuations.
</details>
