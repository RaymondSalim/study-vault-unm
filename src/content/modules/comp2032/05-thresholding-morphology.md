---
title: "Thresholding & Morphology"
order: 5
moduleTitle: "COMP2032 - Image Processing"
tags: ["thresholding", "binary", "morphology", "erosion", "dilation"]
---

## Thresholding

:::eli10

Thresholding is like drawing a line in the sand: any pixel brighter than the line becomes white, and any pixel darker becomes black. It turns a grey photo into just black and white, which makes it easy to separate objects from the background.

:::

:::eli15

Thresholding converts a greyscale image into a binary (black and white) image by choosing a cutoff value T. Pixels above T become foreground (1), pixels below become background (0). The key challenge is choosing T well. Otsu's method automatically finds the best threshold by maximising the separation between the two groups. Adaptive thresholding uses different thresholds in different parts of the image, which helps when lighting is uneven.

:::

:::eli20

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

:::

## Connected Components

:::eli10

Connected components is like counting how many separate islands there are on a map. After turning an image black and white, you want to know how many separate blobs there are. Pixels that touch each other belong to the same blob and get the same label number.

:::

:::eli15

After thresholding produces a binary image, connected component analysis identifies and labels each separate group of foreground pixels. Two pixels belong to the same component if you can walk from one to the other through adjacent foreground pixels. "4-connected" means only up/down/left/right count as adjacent; "8-connected" includes diagonals too. A two-pass algorithm scans the image assigning temporary labels, then resolves conflicts to produce final labels.

:::

:::eli20

Label each connected group of foreground pixels:

| Connectivity | Neighbours considered |
|-------------|---------------------|
| 4-connected | Top, bottom, left, right |
| 8-connected | All 8 surrounding pixels |

**Algorithm (Two-pass)**:
1. Scan left→right, top→bottom. Assign labels from top/left neighbours; record equivalences
2. Resolve equivalences; relabel

:::

## Mathematical Morphology

:::eli10

Morphology is like using cookie cutters on a black-and-white image. Erosion makes white shapes smaller (like shaving off the edges). Dilation makes them bigger (like adding a border of icing). You can combine these to clean up images — removing tiny specks or filling small holes.

:::

:::eli15

Mathematical morphology uses a small shape called a structuring element (SE) to probe and modify binary images. Erosion shrinks foreground objects — a pixel stays white only if the entire SE fits inside the foreground at that position. Dilation expands objects — a pixel becomes white if any part of the SE overlaps foreground. Opening (erosion then dilation) removes small noise without changing overall shape. Closing (dilation then erosion) fills small holes. These are fundamental tools for cleaning up binary segmentation results.

:::

:::eli20

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

:::

## ROIs and Masks

:::eli10

A mask is like a stencil you hold over a picture. Only the parts you cut out in the stencil show through. In image processing, you make a black-and-white mask, and wherever it's white, you keep the original image. Wherever it's black, you block it out.

:::

:::eli15

A binary image can serve as a mask (stencil) to isolate regions of interest (ROIs) in the original image. You simply multiply each pixel of the original by the corresponding mask pixel (0 or 1). Pixels where the mask is 1 are kept; pixels where it's 0 are blacked out. This is commonly used after thresholding or morphological processing to extract only the relevant parts of an image for further analysis.

:::

:::eli20

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

:::
