---
title: "Histograms & Equalisation"
order: 2
moduleTitle: "COMP2032 - Image Processing"
tags: ["histogram", "equalisation", "contrast"]
---

## Histograms

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

## Histogram Equalisation

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

## Colour Histograms & Matching

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
