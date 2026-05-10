---
title: "Exam Traps"
order: 91
moduleTitle: "COMP2032 - Image Processing"
tags: ["exam", "mistakes"]
---

## Common Mistakes by Topic

<details>
<summary>Histogram Equalisation: Forgetting to round</summary>

The mapping $s_k = (L-1) \cdot \text{CDF}(r_k)$ produces non-integer values for discrete images. You **must round** to the nearest integer. Many students lose marks by leaving decimal values as the "new grey level".
</details>

<details>
<summary>Convolution vs Correlation: Kernel flipping</summary>

**Convolution** flips the kernel (180° rotation) before sliding. **Correlation** does not flip. For symmetric kernels (Gaussian, mean) the result is identical. For asymmetric kernels (Sobel) it matters! In most exam questions and OpenCV, `filter2D` performs correlation.
</details>

<details>
<summary>Sobel: Confusing G_x and G_y</summary>

- $G_x$ detects **vertical** edges (measures horizontal change)
- $G_y$ detects **horizontal** edges (measures vertical change)

The naming refers to the **derivative direction**, not the edge direction.
</details>

<details>
<summary>Morphology: Erosion shrinks, not grows</summary>

Erosion removes pixels from object boundaries → objects get smaller. Dilation adds pixels → objects grow. A common error is to swap their effects.

Remember: **Erosion Eats** (both start with E).
</details>

<details>
<summary>Hough Transform: ρ can be negative</summary>

In normal form $\rho = x\cos\theta + y\sin\theta$, $\rho$ ranges from $-D$ to $+D$ (where $D$ is the image diagonal). Don't forget to offset the accumulator array to handle negative indices.
</details>

<details>
<summary>Otsu: It finds ONE threshold</summary>

Otsu's method finds a single global threshold. It does NOT handle multi-modal histograms with more than 2 peaks (use multi-Otsu or adaptive thresholding for those).
</details>

<details>
<summary>Gaussian filter: σ vs kernel size</summary>

These are different parameters. $\sigma$ controls the spread; kernel size determines the window. Rule: kernel size $\geq 6\sigma + 1$. A small kernel with large $\sigma$ truncates the Gaussian and introduces artefacts.
</details>

<details>
<summary>JPEG: DCT is lossless, Quantisation is lossy</summary>

Students often say "DCT compresses the image". DCT alone is perfectly reversible. The **quantisation** step (dividing by Q-table and rounding) is where information is lost.
</details>

<details>
<summary>Canny: Order of operations matters</summary>

The Canny pipeline is: Smooth → Gradient → NMS → Hysteresis. Swapping any step gives wrong results. NMS must come **after** gradient computation and **before** thresholding.
</details>

<details>
<summary>Connected Components: 4-connected ≠ 8-connected</summary>

4-connectivity can split objects that 8-connectivity joins. The choice affects the number and shape of labelled regions. If the question doesn't specify, ask or state your assumption.
</details>
