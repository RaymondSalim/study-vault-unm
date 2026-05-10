---
title: "Non-Linear Filtering"
order: 4
moduleTitle: "COMP2032 - Image Processing"
tags: ["median", "bilateral", "anisotropic-diffusion"]
---

## Why Non-Linear?

Linear filters (convolution) smooth **everything** — including edges. Non-linear filters can preserve or enhance sharp changes.

| Filter Type | Edge Behaviour | Best For |
|-------------|---------------|----------|
| Mean/Gaussian (linear) | Blurs edges | Gaussian noise |
| Median (non-linear) | Preserves edges | Salt & pepper noise |
| Bilateral (non-linear) | Preserves strong edges | Smoothing while keeping structure |
| Anisotropic diffusion | Adapts to local structure | Edge-preserving denoising |

## Median Filter

**Algorithm**: Sort pixel values in the window, output the middle value.

For a $3 \times 3$ window with values: `[2, 5, 3, 8, 1, 4, 7, 6, 9]`
- Sorted: `[1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Median = **5**

### Properties

| Property | Median Filter |
|----------|--------------|
| Removes salt & pepper | Excellent |
| Preserves edges | Yes (better than mean) |
| Linear? | No — not expressible as convolution |
| Computational cost | Higher (requires sorting) |
| Effect on Gaussian noise | Moderate (less effective than Gaussian filter) |

### Repeated Application

Multiple passes of median filtering produce a **root signal** — further applications have no effect.

## Anisotropic Diffusion (Perona-Malik)

Smooths within regions but stops at edges:

$$\frac{\partial I}{\partial t} = \text{div}[c(x,y,t) \cdot \nabla I]$$

The conductance function $c$ depends on gradient magnitude:

$$c(\|\nabla I\|) = e^{-(\|\nabla I\|/K)^2}$$

| $\|\nabla I\|$ | $c$ value | Behaviour |
|----------------|-----------|-----------|
| Small (flat region) | $\approx 1$ | Smooth normally |
| Large (edge) | $\approx 0$ | Stop diffusion |

**K** (threshold) controls what counts as an "edge".

## Bilateral Filter

Combines **spatial** and **intensity** proximity:

$$BF[I]_p = \frac{1}{W_p} \sum_{q \in \mathcal{N}(p)} G_{\sigma_s}(\|p - q\|) \cdot G_{\sigma_r}(|I_p - I_q|) \cdot I_q$$

| Parameter | Controls |
|-----------|----------|
| $\sigma_s$ | Spatial extent (like Gaussian) |
| $\sigma_r$ | Range/intensity tolerance |

- Pixels far away in space → low weight (spatial Gaussian)
- Pixels far away in intensity → low weight (range Gaussian)
- Result: edges preserved, flat regions smoothed

<details>
<summary>Practice: Why can't a linear filter remove salt & pepper noise effectively?</summary>

Salt & pepper noise consists of extreme outlier values (0 or 255). A linear filter averages these outliers with neighbours, spreading the corruption rather than removing it. The median ignores outliers entirely by taking the middle value.
</details>

<details>
<summary>Practice: What happens to the bilateral filter when σ_r → ∞?</summary>

The range Gaussian becomes approximately constant (all intensity differences get weight ≈ 1), so the filter reduces to a standard Gaussian spatial filter with parameter $\sigma_s$.
</details>
