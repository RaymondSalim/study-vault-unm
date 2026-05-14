---
title: "Non-Linear Filtering"
order: 4
moduleTitle: "COMP2032 - Image Processing"
tags: ["median", "bilateral", "anisotropic-diffusion"]
---

## Why Non-Linear?

:::eli10

Regular (linear) filters blur everything — including important edges and outlines. Non-linear filters are smarter: they can smooth out noise while keeping the sharp boundaries between objects intact. It's like erasing pencil smudges without rubbing out the actual lines of your drawing.

:::

:::eli15

Linear filters like mean and Gaussian apply the same weighted average everywhere, which inevitably blurs edges along with noise. Non-linear filters use more sophisticated logic — they can detect whether a pixel is near an edge and behave differently. The median filter sorts neighbourhood values and picks the middle one (ignoring outliers). The bilateral filter weights pixels by both spatial distance AND intensity similarity, so it won't average across a sharp edge. Anisotropic diffusion smooths adaptively based on local gradient strength.

:::

:::eli20

Linear filters (convolution) smooth **everything** — including edges. Non-linear filters can preserve or enhance sharp changes.

| Filter Type | Edge Behaviour | Best For |
|-------------|---------------|----------|
| Mean/Gaussian (linear) | Blurs edges | Gaussian noise |
| Median (non-linear) | Preserves edges | Salt & pepper noise |
| Bilateral (non-linear) | Preserves strong edges | Smoothing while keeping structure |
| Anisotropic diffusion | Adapts to local structure | Edge-preserving denoising |

:::

## Median Filter

:::eli10

The median filter is like picking the "middle kid" in a lineup sorted by height. You look at a pixel and all its neighbours, sort their values from lowest to highest, and pick the middle one. This is great at removing random black and white specks (salt-and-pepper noise) because it completely ignores extreme values.

:::

:::eli15

The median filter replaces each pixel with the median (middle value when sorted) of its neighbourhood. Unlike averaging, it completely ignores extreme outliers — making it excellent for salt-and-pepper noise where pixels are randomly corrupted to black (0) or white (255). It also preserves edges better than linear smoothing because it selects an actual pixel value rather than a blend. The downside is higher computational cost (sorting required) and that it is not a linear operation, so it can't be expressed as convolution.

:::

:::eli20

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

:::

## Anisotropic Diffusion (Perona-Malik)

:::eli10

Anisotropic diffusion is like heat spreading through a metal plate, but with walls at the edges. In flat areas, it smooths freely (like heat flowing). At edges (sharp changes), it stops — so edges stay crisp while noise in flat areas gets smoothed away.

:::

:::eli15

Anisotropic diffusion models image smoothing as a heat-diffusion process that is inhibited at edges. A conductance function measures the local gradient: in flat regions (small gradient), diffusion proceeds normally; at edges (large gradient), diffusion is suppressed. The parameter K acts as a threshold — gradients above K are treated as edges to preserve. Over several iterations, flat regions get progressively smoother while edges remain sharp.

:::

:::eli20

Smooths within regions but stops at edges:

$$\frac{\partial I}{\partial t} = \text{div}[c(x,y,t) \cdot \nabla I]$$

The conductance function $c$ depends on gradient magnitude:

$$c(\|\nabla I\|) = e^{-(\|\nabla I\|/K)^2}$$

| $\|\nabla I\|$ | $c$ value | Behaviour |
|----------------|-----------|-----------|
| Small (flat region) | $\approx 1$ | Smooth normally |
| Large (edge) | $\approx 0$ | Stop diffusion |

**K** (threshold) controls what counts as an "edge".

:::

## Bilateral Filter

:::eli10

The bilateral filter is like asking nearby friends for their opinion, but only friends who think similarly to you. Pixels that are close by AND have a similar brightness get to influence the result. Pixels that are nearby but very different in brightness (probably on the other side of an edge) are ignored.

:::

:::eli15

The bilateral filter extends Gaussian smoothing by adding an intensity-based weight on top of the spatial weight. Each neighbouring pixel's influence depends on two things: how close it is spatially (controlled by sigma_s) and how similar its intensity is to the centre pixel (controlled by sigma_r). This means pixels across an edge (very different intensity) contribute almost nothing, so edges are preserved. In flat regions, all nearby pixels have similar intensity, so it acts like a regular Gaussian blur.

:::

:::eli20

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

:::
