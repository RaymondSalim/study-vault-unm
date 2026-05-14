---
title: "Image Features"
order: 2
moduleTitle: "COMP3029 - Computer Vision"
tags: ["features", "colour-histograms", "texture", "lbp", "hog", "gradients"]
---

## Overview

Features are numerical descriptions of image regions/patches used for matching, recognition, and tracking. A **feature vector** concatenates multiple descriptive measurements.

| Feature Type | Describes | Example |
|-------------|-----------|---------|
| Colour | Pixel-level appearance | Colour histogram |
| Texture | Local spatial patterns | Local Binary Patterns (LBP) |
| Shape/Edge | Boundary gradients | Histogram of Oriented Gradients (HoG) |

## Colour Features

### Colour Histograms

Colour histograms count pixel colour occurrences in a region.

| Property | Benefit |
|----------|---------|
| Translation invariant | Position of pixels does not matter |
| Rotation invariant | Orientation does not affect histogram |
| Robust to occlusion | Partial visibility still gives partial histogram |
| Robust to scale | Changes slowly with object size |

**Design choices:**
- Which colour space? (RGB, HSV, YUV)
- Joint histogram or separate per-channel?
- Number of bins (trade-off: discriminability vs. robustness)

### Histogram Comparison

| Metric | Formula | Range |
|--------|---------|-------|
| L1 distance | $d = \sum_i |h_1(i) - h_2(i)|$ | $[0, 2]$ |
| Chi-squared | $\chi^2 = \sum_i \frac{(h_1(i)-h_2(i))^2}{h_1(i)+h_2(i)}$ | $[0, \infty)$ |
| Bhattacharyya | $d = \sqrt{1 - \sum_i \sqrt{h_1(i) \cdot h_2(i)}}$ | $[0, 1]$ |

## Texture Features -- Local Binary Patterns (LBP)

LBP captures local texture patterns around each pixel.

### Algorithm

1. For centre pixel $p$ with value $v_p$, examine 8 neighbours
2. Create 8-bit binary number: $b_i = 1$ if neighbour $i \geq v_p$, else 0
3. The resulting 8-bit code (0--255) encodes the local pattern

**Example:**

```
|100|101|103|         Neighbours >= 50:
| 40| 50| 80|  --->   1 1 1 1 1 1 0 0 = 252
| 50| 60| 90|
```

### LBP Feature Vector Construction

| Step | Action |
|------|--------|
| 1 | Divide patch into cells (e.g., 16x16 pixels) |
| 2 | Compute LBP code for each pixel |
| 3 | Build histogram of codes per cell (256 bins) |
| 4 | Optionally normalise each histogram |
| 5 | Concatenate histograms into feature vector |

## Image Gradient Theory

The image gradient $\nabla f = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}\right)$ is a **vector** at each pixel:

| Property | Detail |
|----------|--------|
| Direction | Points toward maximum intensity increase |
| Perpendicular to | Edge direction (edge tangent) |
| Magnitude | $\|\nabla f\| = \sqrt{f_x^2 + f_y^2}$ — largest at edges |

### Directional Derivative

The intensity change along direction $\mathbf{u}$:

$$\frac{\partial f}{\partial \mathbf{u}} = \nabla f \cdot \mathbf{u}$$

This is maximised when $\mathbf{u}$ aligns with $\nabla f$ (proven via Lagrange multipliers with $\|\mathbf{u}\| = 1$ constraint). Therefore the gradient direction gives the steepest intensity increase.

### Sobel Filter Derivation

Approximates partial derivatives using central differences:

$$\frac{\partial f}{\partial x} \approx \frac{f(x+1, y) - f(x-1, y)}{2}$$

$$G_x = \begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix}, \quad G_y = \begin{bmatrix} -1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1 \end{bmatrix}$$

**Spatial filtering (convolution):** place template on image patch, multiply corresponding positions, sum all products → one response value at centre pixel.

## Shape Features -- Histogram of Oriented Gradients (HoG)

HoG captures edge/gradient structure and is widely used for object detection (Dalal & Triggs, CVPR 2005).

### Gradient Computation

Gradient magnitude and direction:

$$g(x,y) = \sqrt{\Delta x^2 + \Delta y^2}, \quad \theta(x,y) = \arctan\left(\frac{\Delta y}{\Delta x}\right)$$

### HoG Algorithm

| Step | Action |
|------|--------|
| 1 | (Optional) Gamma normalisation |
| 2 | Compute gradient magnitude and orientation at each pixel |
| 3 | Divide patch into small **cells** |
| 4 | For each cell: build weighted histogram of gradient orientations |
| 5 | Group cells into overlapping **blocks** |
| 6 | Concatenate and normalise block histograms |

### HoG Parameters

| Parameter | Typical Value |
|-----------|--------------|
| Cell size | 8x8 pixels |
| Block size | 2x2 cells (16x16 pixels) |
| Orientation bins | 9 (0-180 degrees, unsigned) |
| Block normalisation | L2-norm |

### Properties of HoG

- Robust to small translations/rotations (within cell/bin size)
- Captures shape/silhouette information
- Used with linear SVM for pedestrian detection

## Comparing Feature Types

| Feature | Best For | Invariant To | Limitation |
|---------|----------|--------------|------------|
| Colour histogram | Object tracking, retrieval | Translation, rotation | Ignores spatial layout |
| LBP | Face recognition, texture | Monotonic illumination change | Sensitive to noise |
| HoG | Person detection, shape | Small deformations | Not scale invariant |

<details><summary>Practice</summary>

1. Compute the LBP code for a pixel with value 120 surrounded by neighbours: [130, 110, 125, 100, 115, 140, 90, 135] (starting top-left, clockwise).

2. Why does HoG use unsigned gradient orientations (0-180) rather than signed (0-360) for pedestrian detection?

3. A HoG descriptor with 8x8 cells, 2x2 blocks, 9 orientation bins, and a 64x128 detection window has how many dimensions?

4. What are the trade-offs in choosing the number of bins for a colour histogram?

</details>
