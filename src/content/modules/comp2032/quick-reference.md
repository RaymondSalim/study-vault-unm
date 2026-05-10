---
title: "Quick Reference"
order: 90
moduleTitle: "COMP2032 - Image Processing"
tags: ["reference", "formulas"]
---

## Core Formulas

### Image Basics

| Concept | Formula |
|---------|---------|
| Image storage | $M \times N \times \lceil\log_2 L\rceil$ bits |
| Normalised histogram | $P(r_k) = n_k / n$ |
| Entropy | $H = -\sum P(r_k) \log_2 P(r_k)$ |

### Histogram Equalisation

$$s_k = (L-1) \cdot \sum_{j=0}^{k} P(r_j)$$

### Convolution

$$g(x,y) = \sum_s \sum_t w(s,t) \cdot f(x+s, y+t)$$

### Gaussian

$$G(x,y) = \frac{1}{2\pi\sigma^2} e^{-\frac{x^2+y^2}{2\sigma^2}}$$

### Gradient

$$|\nabla f| = \sqrt{G_x^2 + G_y^2}, \quad \theta = \arctan(G_y/G_x)$$

### Hough Transform (Lines)

$$\rho = x\cos\theta + y\sin\theta$$

### CNN Output Size

$$\text{out} = \lfloor\frac{W - K + 2P}{S}\rfloor + 1$$

### JPEG Quantisation

$$\hat{F}(u,v) = \text{round}\left(\frac{F(u,v)}{Q(u,v)}\right)$$

### Huffman Average Length

$$L_{avg} = \sum l(r_k) \cdot P(r_k)$$

### Compression Ratio

$$C_R = \frac{\text{original size}}{\text{compressed size}}$$

## Key Kernels

| Name | Kernel |
|------|--------|
| Mean 3×3 | $\frac{1}{9}\begin{bmatrix}1&1&1\\1&1&1\\1&1&1\end{bmatrix}$ |
| Sobel $G_x$ | $\begin{bmatrix}-1&0&1\\-2&0&2\\-1&0&1\end{bmatrix}$ |
| Sobel $G_y$ | $\begin{bmatrix}-1&-2&-1\\0&0&0\\1&2&1\end{bmatrix}$ |
| Laplacian 4 | $\begin{bmatrix}0&1&0\\1&-4&1\\0&1&0\end{bmatrix}$ |
| Laplacian 8 | $\begin{bmatrix}1&1&1\\1&-8&1\\1&1&1\end{bmatrix}$ |

## Morphology

| Operation | Formula | Effect |
|-----------|---------|--------|
| Erosion | $A \ominus B$ | Shrink |
| Dilation | $A \oplus B$ | Grow |
| Opening | $(A \ominus B) \oplus B$ | Remove small foreground |
| Closing | $(A \oplus B) \ominus B$ | Fill small holes |

## Algorithm Checklist

| Algorithm | Key Parameters |
|-----------|---------------|
| Otsu | Maximise $\sigma_B^2$ |
| Canny | $\sigma$, $T_H$, $T_L$ |
| Hough (lines) | $\Delta\theta$, $\Delta\rho$, vote threshold |
| K-means | $K$, max iterations |
| SLIC | $K$ superpixels, $m$ compactness |
| JPEG | Quality factor (Q-table) |
