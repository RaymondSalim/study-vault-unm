---
title: "Image Features"
order: 2
moduleTitle: "COMP3029 - Computer Vision"
tags: ["features", "colour-histograms", "texture", "lbp", "hog", "gradients"]
---

## Overview

:::eli10

Features are like a "fingerprint" for a part of an image. Just as you might describe a friend by hair colour, height, and clothing, computers describe image patches using numbers that capture colour, texture, and edges. These number-descriptions help the computer recognise and match things across different photos.

:::

:::eli15

Image features are numerical measurements extracted from image regions that serve as compact, descriptive representations for tasks like matching, recognition, and tracking. A feature vector combines multiple measurements (colour distribution, texture patterns, edge orientations) into a single array of numbers. Good features are distinctive (different objects produce different vectors) and robust (the same object produces similar vectors despite changes in lighting or viewpoint).

:::

:::eli20

Features are numerical descriptions of image regions/patches used for matching, recognition, and tracking. A **feature vector** concatenates multiple descriptive measurements.

| Feature Type | Describes | Example |
|-------------|-----------|---------|
| Colour | Pixel-level appearance | Colour histogram |
| Texture | Local spatial patterns | Local Binary Patterns (LBP) |
| Shape/Edge | Boundary gradients | Histogram of Oriented Gradients (HoG) |

:::

## Colour Features

:::eli10

A colour histogram is like counting how many Skittles of each colour are in a bag. You count how many red pixels, blue pixels, green pixels, and so on are in a region of the image. It does not matter where exactly those pixels are -- you just count them. Two photos of the same object will have similar colour counts even if the object moves around.

:::

:::eli15

Colour histograms count the frequency of each colour in an image region, creating a distribution that characterises the region's appearance. They are naturally invariant to translation and rotation (since position does not matter, only counts), and partially robust to occlusion and scale changes. Key design choices include the colour space (RGB, HSV), whether to build a joint 3D histogram or separate per-channel histograms, and the number of bins (more bins = more discriminative but less robust to noise).

:::

:::eli20

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

:::

## Texture Features -- Local Binary Patterns (LBP)

:::eli10

LBP is like a game where you look at each pixel and its 8 neighbours. For each neighbour, you ask "are you brighter than the centre pixel?" If yes, write a 1; if no, write a 0. You get an 8-digit binary code that describes the local pattern around that pixel -- like a tiny stamp that captures whether the area is spotty, stripy, or smooth.

:::

:::eli15

Local Binary Patterns (LBP) encode texture by comparing each pixel to its 8 neighbours, producing an 8-bit binary code (0-255) that captures the local intensity pattern. These codes are histogrammed over image cells to create a texture descriptor. LBP is computationally cheap, invariant to monotonic illumination changes (since it only uses relative comparisons), and effective for texture classification and face recognition.

:::

:::eli20

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

:::

## Image Gradient Theory

:::eli10

An image gradient tells you where brightness changes quickly -- like where a dark object meets a bright background. Think of it like feeling a hill with your hand: the gradient points "uphill" toward brighter areas, and it is strongest at sharp edges. Computers use this to find the outlines of objects.

:::

:::eli15

The image gradient is a vector at each pixel pointing in the direction of steepest intensity increase, with magnitude proportional to how rapidly intensity changes. Edges (boundaries between regions) produce large gradient magnitudes because intensity changes sharply. The gradient direction is perpendicular to the edge itself. Gradients are computed using filters like the Sobel operator, which approximates partial derivatives using differences between neighbouring pixel values.

:::

:::eli20

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

:::

## Shape Features -- Histogram of Oriented Gradients (HoG)

:::eli10

HoG is like describing a silhouette by the directions of its edges. You divide the image into small cells, and in each cell you count how many edges point up, how many point sideways, how many point diagonally, and so on. The resulting pattern of edge directions captures the shape of objects (like the outline of a person) without worrying about exact colours or textures.

:::

:::eli15

Histogram of Oriented Gradients (HoG) captures the distribution of edge directions within an image region. The image is divided into small cells, and for each cell a histogram of gradient orientations (weighted by magnitude) is computed. Cells are grouped into overlapping blocks for normalisation, making the descriptor robust to illumination changes. HoG effectively encodes shape and silhouette information and was the key feature behind the Dalal-Triggs pedestrian detector.

:::

:::eli20

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

:::

## Comparing Feature Types

:::eli10

Different features are good for different jobs. Colour histograms are great for tracking an object (like following a red ball), LBP is good for recognising textures and faces, and HoG is best for detecting shapes like people. No single feature is perfect for everything -- each has its own strengths and weaknesses.

:::

:::eli15

Each feature type captures different image properties and suits different tasks. Colour histograms excel at object tracking and retrieval because they are position-invariant, but they ignore spatial layout entirely. LBP is effective for texture and face recognition and handles illumination changes well, but is noise-sensitive. HoG captures shape information for detection tasks but is not scale-invariant. In practice, features are often combined for better performance.

:::

:::eli20

| Feature | Best For | Invariant To | Limitation |
|---------|----------|--------------|------------|
| Colour histogram | Object tracking, retrieval | Translation, rotation | Ignores spatial layout |
| LBP | Face recognition, texture | Monotonic illumination change | Sensitive to noise |
| HoG | Person detection, shape | Small deformations | Not scale invariant |

:::

<details><summary>Practice</summary>

1. Compute the LBP code for a pixel with value 120 surrounded by neighbours: [130, 110, 125, 100, 115, 140, 90, 135] (starting top-left, clockwise).

2. Why does HoG use unsigned gradient orientations (0-180) rather than signed (0-360) for pedestrian detection?

3. A HoG descriptor with 8x8 cells, 2x2 blocks, 9 orientation bins, and a 64x128 detection window has how many dimensions?

4. What are the trade-offs in choosing the number of bins for a colour histogram?

</details>
