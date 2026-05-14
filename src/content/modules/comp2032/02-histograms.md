---
title: "Histograms & Equalisation"
order: 2
moduleTitle: "COMP2032 - Image Processing"
tags: ["histogram", "equalisation", "contrast"]
---

## Histograms

:::eli10

A histogram is like a bar chart that shows how many pixels in a photo are dark, medium, or bright. If most bars are on the left, the image is dark. If they're spread out evenly, the image has good contrast — like a well-lit photo versus one taken in a dim room.

:::

:::eli15

An image histogram counts how many pixels exist at each intensity level (0-255 for an 8-bit image). It reveals the overall brightness distribution: a left-skewed histogram means the image is predominantly dark, a narrow histogram means low contrast, and a spread-out histogram means high contrast. Normalising the histogram by dividing by total pixel count gives a probability distribution — the probability that a random pixel has a particular grey level.

:::

:::eli20

A histogram counts pixel occurrences at each grey level:

$$P(r_k) = n_k \quad \text{where } k = 0, 1, \ldots, L-1$$

**Normalised histogram** (probability distribution):

$$P(r_k) = \frac{n_k}{n} \quad \text{where } n = M \times N$$

| Histogram Shape | Image Characteristic |
|----------------|---------------------|
| Left-skewed | Dark image |
| Right-skewed | Light image |
| Narrow | Low contrast |
| Spread | High contrast |

:::

## Histogram Equalisation

:::eli10

Histogram equalisation is like automatically adjusting the brightness and contrast of a photo so that it uses the full range from very dark to very bright. Imagine you have crayons but only use 3 shades — equalisation spreads your drawing across all the crayons so it looks more vivid.

:::

:::eli15

Histogram equalisation automatically improves image contrast by redistributing pixel intensities so that all brightness levels are used roughly equally. The algorithm computes the cumulative distribution function (CDF) of the histogram, then uses it as a mapping function to remap each pixel's intensity. The result is an image whose histogram is approximately uniform (flat), meaning the full dynamic range is utilised. It won't be perfectly flat for discrete images because multiple input levels can map to the same output level.

:::

:::eli20

**Goal**: Transform image so output histogram is approximately uniform (flat).

### Algorithm

Given input image with CDF $c(r_k)$:

$$s_k = T(r_k) = (L-1) \cdot \sum_{j=0}^{k} P(r_j) = (L-1) \cdot c(r_k)$$

### Step-by-Step

1. Compute histogram $P(r_k)$ for all grey levels
2. Compute cumulative distribution function (CDF): $c(r_k) = \sum_{j=0}^{k} P(r_j)$
3. Map: $s_k = \text{round}((L-1) \cdot c(r_k))$
4. Replace each pixel value $r_k$ with $s_k$

### Worked Example

| $r_k$ | $n_k$ | $P(r_k)$ | CDF | $s_k = \text{round}(7 \cdot \text{CDF})$ |
|--------|--------|-----------|------|------|
| 0 | 790 | 0.19 | 0.19 | 1 |
| 1 | 1023 | 0.25 | 0.44 | 3 |
| 2 | 850 | 0.21 | 0.65 | 5 |
| 3 | 656 | 0.16 | 0.81 | 6 |
| 4 | 329 | 0.08 | 0.89 | 6 |
| 5 | 245 | 0.06 | 0.95 | 7 |
| 6 | 122 | 0.03 | 0.98 | 7 |
| 7 | 81 | 0.02 | 1.00 | 7 |

:::

## Colour Histograms & Matching

:::eli10

Colour histogram matching is like comparing two bags of coloured sweets. You count how many of each colour are in each bag, then see how similar the bags are. This helps computers find objects in pictures by looking for areas with similar colour patterns.

:::

:::eli15

Colour histograms can be compared to measure how similar two images (or image regions) are. Histogram intersection sums the minimum value at each bin between two histograms, producing a similarity score from 0 to 1. Back-projection is a technique for locating an object in an image: you build a histogram of the object's colours, then for each pixel in the search image, look up how likely that colour belongs to the target. Bright areas in the back-projection map indicate where the object probably is.

:::

:::eli20

**Histogram Intersection** measures similarity between two histograms:

$$H(I, M) = \sum_{j=1}^{n} \min(I_j, M_j)$$

- Normalise by dividing by number of pixels in model
- Result in range [0, 1]: 1 = perfect match

### Object Location via Back-projection

1. Build colour histogram of target object
2. For each pixel in search image, look up its colour in target histogram
3. High values indicate likely object locations

<details>
<summary>Practice: Why does histogram equalisation not produce a perfectly flat histogram for discrete images?</summary>

Because grey levels are integers — the mapping $s_k = \text{round}((L-1) \cdot c(r_k))$ can map multiple input levels to the same output level, making some bins have more pixels than others.
</details>

<details>
<summary>Practice: What property must the transform T(r) satisfy?</summary>

1. $0 \leq T(r) \leq 1$ for $0 \leq r \leq 1$
2. $T(r)$ must be single-valued and strictly monotonically increasing (so the transform is invertible)
</details>

:::
