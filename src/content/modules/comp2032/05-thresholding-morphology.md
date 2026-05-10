---
title: "Thresholding & Morphology"
order: 5
moduleTitle: "COMP2032 - Image Processing"
tags: ["thresholding", "binary", "morphology", "erosion", "dilation"]
---

## Thresholding

Converts a greyscale image to binary:

$$g(x,y) = \begin{cases} 1 & \text{if } f(x,y) \geq T \\ 0 & \text{otherwise} \end{cases}$$

### Choosing T

| Method | Description |
|--------|-------------|
| Manual | User selects T by inspection |
| Otsu's method | Maximises between-class variance |
| Adaptive | T varies spatially (local statistics) |

### Otsu's Method

Finds threshold that maximises between-class variance $\sigma_B^2$:

$$\sigma_B^2(T) = \omega_0(T) \cdot \omega_1(T) \cdot [\mu_0(T) - \mu_1(T)]^2$$

Where:
- $\omega_0, \omega_1$ = class probabilities (background, foreground)
- $\mu_0, \mu_1$ = class means

### Adaptive Thresholding

For images with non-uniform illumination:
- Divide image into blocks
- Compute local threshold per block (e.g., local mean or local Otsu)
- Interpolate between blocks for smooth transitions

## Connected Components

Label each connected group of foreground pixels:

| Connectivity | Neighbours considered |
|-------------|---------------------|
| 4-connected | Top, bottom, left, right |
| 8-connected | All 8 surrounding pixels |

**Algorithm (Two-pass)**:
1. Scan left→right, top→bottom. Assign labels from top/left neighbours; record equivalences
2. Resolve equivalences; relabel

## Mathematical Morphology

Operations on binary images using a **structuring element** (SE).

### Erosion ($\ominus$)

$$A \ominus B = \{z \mid B_z \subseteq A\}$$

Output pixel = 1 **only if** the entire SE fits inside the foreground.

**Effects**: Shrinks objects, removes small protrusions, separates touching objects.

### Dilation ($\oplus$)

$$A \oplus B = \{z \mid (\hat{B})_z \cap A \neq \emptyset\}$$

Output pixel = 1 **if any** part of the SE overlaps foreground.

**Effects**: Grows objects, fills small holes, connects nearby objects.

### Opening & Closing

| Operation | Formula | Effect |
|-----------|---------|--------|
| Opening | $A \circ B = (A \ominus B) \oplus B$ | Removes small foreground noise, smooths contours |
| Closing | $A \bullet B = (A \oplus B) \ominus B$ | Fills small holes, connects narrow breaks |

### Properties

| Property | Erosion | Dilation | Opening | Closing |
|----------|---------|----------|---------|---------|
| Idempotent | No | No | Yes | Yes |
| Dual of | Dilation | Erosion | Closing | Opening |
| Monotone | Yes | Yes | Yes | Yes |

## ROIs and Masks

- Use binary image as a **mask** to select regions of interest
- Multiply mask with original: $g(x,y) = f(x,y) \cdot m(x,y)$

<details>
<summary>Practice: What is the result of opening then closing an image?</summary>

Opening removes small bright noise (foreground specks), then closing fills small dark holes. Together they clean both types of noise while approximately preserving object shapes.
</details>

<details>
<summary>Practice: Is erosion followed by dilation the same as dilation followed by erosion?</summary>

No. Erosion then dilation = Opening (removes small foreground). Dilation then erosion = Closing (fills small holes). They have different effects.
</details>
