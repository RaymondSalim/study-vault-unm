---
title: "Viola-Jones Face Detection"
order: 5
moduleTitle: "COMP3029 - Computer Vision"
tags: ["viola-jones", "face-detection", "adaboost", "integral-image", "cascade"]
---

## Overview

The Viola-Jones method (2001) was a breakthrough in real-time object detection, primarily applied to face detection. Three key contributions:

| Contribution | Purpose |
|-------------|---------|
| Integral images | Fast feature computation |
| AdaBoost | Feature selection + classifier training |
| Cascade classifier | Fast rejection of non-face regions |

## Haar-Like Features

### Feature Types

Four basic rectangular feature types computed over a 24x24 sub-window:

| Type | Structure | Measures |
|------|-----------|----------|
| A | Two vertical rectangles | Horizontal contrast |
| B | Two horizontal rectangles | Vertical contrast |
| C | Three horizontal rectangles | Centre vs surround |
| D | Four rectangles (diagonal) | Diagonal patterns |

**Computation:** Sum of pixels in white region minus sum in black region.

**Total features:** ~160,000 possible features in a 24x24 window (all positions, sizes, types).

### Relevance to Faces

- Eye region darker than cheek below
- Nose bridge lighter than eyes on either side
- Features capture these structural patterns

## Integral Image

The integral image enables O(1) computation of any rectangular sum.

### Definition

$$ii(x, y) = \sum_{x' \leq x, \, y' \leq y} i(x', y')$$

Value at $(x,y)$ = sum of all pixels above and to the left.

### Computation (Single Pass)

$$s(x, y) = s(x-1, y) + i(x, y)$$
$$ii(x, y) = ii(x, y-1) + s(x, y)$$

where $s(x,y)$ is the cumulative row sum.

### Rectangle Sum in O(1)

For rectangle D with corners at positions 1, 2, 3, 4:

$$\text{Sum}(D) = ii(4) + ii(1) - ii(2) - ii(3)$$

Only **4 array lookups** regardless of rectangle size.

## AdaBoost (Feature Selection)

### Key Idea

Combine many weak classifiers (each slightly better than chance) into a strong ensemble classifier.

### Weak Classifier

Each weak classifier thresholds a single Haar feature:

$$h_t(x) = \begin{cases} +1 & \text{if } p_t f_t(x) < p_t \theta_t \\ -1 & \text{otherwise} \end{cases}$$

where $f_t$ = feature value, $\theta_t$ = threshold, $p_t$ = polarity.

### AdaBoost Algorithm

| Step | Action |
|------|--------|
| 1 | Initialise weights uniformly: $w_i = \frac{1}{N}$ |
| 2 | For $t = 1, \ldots, T$: |
| 2a | Train all K (160,000) weak classifiers on weighted data |
| 2b | Select best weak classifier $h_t$ (lowest weighted error $\epsilon_t$) |
| 2c | Compute classifier weight: $\alpha_t = \frac{1}{2} \ln\frac{1-\epsilon_t}{\epsilon_t}$ |
| 2d | Update sample weights (increase for misclassified) |
| 3 | Final classifier: $H(x) = \text{sign}\left(\sum_{t=1}^T \alpha_t h_t(x)\right)$ |

### Properties

- Misclassified examples get higher weight -> next classifier focuses on hard cases
- No single rule separates complex objects from backgrounds, but a combination can
- Feature selection: only ~200 features needed (from 160,000) for 95% accuracy

## Cascade Classifier

### Motivation

- 95% accuracy not good enough for detection
- Most sub-windows are obviously non-face
- Need to quickly reject easy negatives

### Architecture

```
All Sub-windows -> [Stage 1] -T-> [Stage 2] -T-> [Stage 3] -T-> ... -> FACE
                       |F              |F              |F
                       v               v               v
                   REJECT          REJECT          REJECT
```

### Design Principles

| Principle | Detail |
|-----------|--------|
| Early stages | Few features, high recall, moderate precision |
| Later stages | More features, high precision |
| Rejection | Any stage can reject (fast for non-faces) |
| Speed | ~2 features reject 50% of non-faces in stage 1 |

### Performance

| Metric | Value |
|--------|-------|
| Training time | Weeks |
| Detection speed | Real-time (15+ fps) |
| Window size | 24x24 base, multi-scale |
| Cascade stages | ~38 stages, ~6000 features total |

## Summary

| Component | Role | Key Benefit |
|-----------|------|-------------|
| Haar features | Simple, interpretable features | Fast to compute |
| Integral image | O(1) rectangle sums | Enables massive feature evaluation |
| AdaBoost | Feature selection + combination | Selects best from 160K features |
| Cascade | Multi-stage rejection | Real-time speed |

### Legacy

- Embedded in smartphones and cameras
- Basis of SURF (integral images)
- Demonstrated that learning-based approaches outperform hand-crafted rules
- Superseded by deep learning methods (2014+) but conceptually influential

<details><summary>Practice</summary>

1. Compute the integral image for the following 3x3 image:
   ```
   1 2 3
   4 5 6
   7 8 9
   ```

2. Using the integral image, compute the sum of the bottom-right 2x2 block.

3. Why does the cascade architecture dramatically speed up detection even though it uses more total features than a single-stage classifier?

4. In AdaBoost, if $\epsilon_t = 0.3$, what is $\alpha_t$? What happens as $\epsilon_t \to 0$?

5. Explain why Haar-like features are particularly suited to face detection (give specific face structure examples).

</details>
