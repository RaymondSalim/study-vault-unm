---
title: "Prerequisites"
order: 88
moduleTitle: "COMP2032 - Image Processing"
tags: ["prerequisites", "foundations"]
---

## Required Background

| Area | What you need | Where from |
|------|--------------|------------|
| Linear algebra | Matrix operations, dot product | COMP1017/COMP1045 |
| Calculus | Derivatives, partial derivatives | COMP1017/COMP1045 |
| Probability | Distributions, expected value, variance | COMP1017 |
| Programming | Python, NumPy array operations | COMP1028/COMP1029 |
| Statistics | Mean, variance, histograms | COMP1017 |

## Key Mathematical Concepts

### Matrices
- Matrix multiplication
- Transpose
- Element-wise operations
- Convolution (flipped kernel sliding over input)

### Calculus
- First derivative = rate of change (used in edge detection)
- Second derivative = rate of change of rate of change (Laplacian)
- Partial derivatives $\frac{\partial f}{\partial x}$, $\frac{\partial f}{\partial y}$ (gradient)

### Probability
- Probability distribution: $\sum P(x_i) = 1$
- Expected value: $E[X] = \sum x_i \cdot P(x_i)$
- Variance: $\text{Var}(X) = E[(X - \mu)^2]$
- Cumulative distribution function (CDF)

### Python/NumPy

```python
import numpy as np
import cv2

# Array indexing
img[y, x]           # Single pixel (row, col)
img[y1:y2, x1:x2]  # Region slice
img[:, :, 0]        # Single channel

# Common operations
np.sum(), np.mean(), np.max(), np.min()
np.zeros(), np.ones(), np.arange()
```

## Terminology

| Term | Meaning in this module |
|------|----------------------|
| Pixel | Single sample point in an image |
| Greyscale | Single-channel image (0–255) |
| Kernel/Mask | Small matrix of weights for filtering |
| Neighbourhood | Set of pixels around a given pixel |
| Frequency | Rate of intensity change (not time-based) |
| Transform | Function mapping one representation to another |
