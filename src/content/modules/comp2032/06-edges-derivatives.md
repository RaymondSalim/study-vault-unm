---
title: "Edge Detection & Derivatives"
order: 6
moduleTitle: "COMP2032 - Image Processing"
tags: ["edges", "derivatives", "canny", "sobel", "laplacian"]
---

## Why Edges?

:::eli10

Edges are the outlines of things in a picture. Just like a colouring book has outlines to show where each object is, computers find edges by looking for sudden changes in brightness. If you can find all the edges, you can understand the shape of objects without needing all the colour details.

:::

:::eli15

Edges correspond to locations where pixel intensity changes sharply — these typically mark object boundaries, surface changes, or shadow borders. Edge detection is fundamental because edges encode most of the structural information in an image using far fewer pixels than the full image. Many higher-level tasks (object recognition, segmentation) begin with edge detection as a preprocessing step.

:::

:::eli20

Edges = locations of sharp intensity change. They encode object boundaries, texture, and shape.

:::

## 1st Derivative (Gradient)

:::eli10

The gradient is like measuring how steep a hill is. In an image, it measures how quickly brightness changes from one pixel to the next. Big changes mean an edge is there. You can also find out which direction the edge goes — like knowing if a hill faces north or east.

:::

:::eli15

The first derivative (gradient) of an image measures the rate of intensity change at each pixel. It has both a magnitude (how strong the edge is) and a direction (which way the edge runs). Common gradient operators like Sobel and Prewitt estimate this using small kernels. Sobel weights the centre row more heavily for better noise resistance. The gradient magnitude image shows where edges are; the direction tells you the edge orientation.

:::

:::eli20

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

:::

## 2nd Derivative (Laplacian)

:::eli10

If the first derivative finds where brightness is changing, the second derivative finds where that change itself changes — like going from flat to steep, or from steep back to flat. Edges appear exactly where the second derivative crosses zero, like the inflection point on a roller coaster.

:::

:::eli15

The Laplacian is the second derivative of image intensity. While the gradient gives maximum response at edges, the Laplacian gives zero-crossings at edges. It's computed by summing the second derivatives in x and y directions. Because second derivatives amplify noise even more than first derivatives, it's almost always applied after Gaussian smoothing (giving the Laplacian of Gaussian or LoG). The LoG finds edges as zero-crossings in the filtered image.

:::

:::eli20

$$\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2}$$

Edges at **zero-crossings** of the Laplacian.

| Kernel | Values |
|--------|--------|
| 4-connected | $\begin{bmatrix} 0 & 1 & 0 \\ 1 & -4 & 1 \\ 0 & 1 & 0 \end{bmatrix}$ |
| 8-connected | $\begin{bmatrix} 1 & 1 & 1 \\ 1 & -8 & 1 \\ 1 & 1 & 1 \end{bmatrix}$ |

**Laplacian of Gaussian (LoG)**: Smooth first (Gaussian), then apply Laplacian. Equivalent to convolving with LoG kernel.

:::

## Sharpening

:::eli10

Sharpening makes edges stand out more, like tracing over the outlines of a drawing with a darker pencil. The computer finds where the edges are (using derivatives), then adds that information back into the image to make those transitions more dramatic.

:::

:::eli15

Image sharpening enhances edges by amplifying intensity transitions. The basic idea is to compute the edges (using the Laplacian or by subtracting a blurred version from the original), then add them back to the original image scaled by a factor k. "Unsharp masking" works the same way — it subtracts a blurred copy to get the detail layer, then adds that detail back. The strength parameter k controls how much sharpening is applied.

:::

:::eli20

Enhance edges by adding scaled gradient back:

$$g = f + k \cdot \nabla^2 f$$

Or using **unsharp masking**: $g = f + k \cdot (f - f_{\text{blurred}})$

:::

## The Canny Edge Detector

:::eli10

The Canny edge detector is considered the best way to find edges. It works in steps: first it blurs the image slightly to remove noise, then finds where brightness changes quickly, then makes the edges thin (only 1 pixel wide), and finally uses two thresholds to keep real edges while removing noise.

:::

:::eli15

The Canny edge detector is a multi-stage algorithm considered the "gold standard" for edge detection. It first smooths with a Gaussian to suppress noise, then computes gradient magnitude and direction (via Sobel). Non-maximum suppression thins edges to single-pixel width by keeping only the local maximum along the gradient direction. Finally, hysteresis thresholding uses two thresholds: pixels above the high threshold are definite edges; pixels between the two thresholds are kept only if they connect to a strong edge. This ensures edge continuity without false detections.

:::

:::eli20

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

:::
