---
title: "Viola-Jones Face Detection"
order: 5
moduleTitle: "COMP3029 - Computer Vision"
tags: ["viola-jones", "face-detection", "adaboost", "integral-image", "cascade"]
---

## Overview

:::eli10

Viola-Jones is a super-fast method for detecting faces in photos, used in almost every camera and phone. It works by checking simple light/dark patterns (like "are the eyes darker than the cheeks?"), using a trick to compute them instantly, and organising checks in a chain where most non-face regions are rejected in the first few checks -- so it only does hard work on things that actually look like faces.

:::

:::eli15
The Viola-Jones method (2001) achieved real-time face detection through three innovations: (1) Haar-like features that capture simple intensity patterns relevant to faces, (2) integral images that enable computing any rectangular sum in constant time, and (3) a cascade of increasingly complex classifiers trained with AdaBoost that rapidly rejects non-face regions in early stages. This combination allows scanning hundreds of thousands of image windows per second.

:::

:::eli20
The Viola-Jones method (2001) was a breakthrough in real-time object detection, primarily applied to face detection. Three key contributions:

| Contribution | Purpose |
|-------------|---------|
| Integral images | Fast feature computation |
| AdaBoost | Feature selection + classifier training |
| Cascade classifier | Fast rejection of non-face regions |

:::

## Haar-Like Features

:::eli10

Haar features are like very simple stencils you place on a part of the image. Each stencil has a white region and a black region. You add up all the pixel values under the white part and subtract the values under the black part. If the result is big, it means there is a strong contrast there. For faces, one feature might detect that the eye region is darker than the forehead above it.

:::

:::eli15
Haar-like features measure contrast between adjacent rectangular regions within a detection window. Four basic types capture horizontal, vertical, centre-surround, and diagonal patterns. Each feature computes the sum of pixels in one region minus the sum in another. With ~160,000 possible features in a 24x24 window (varying position, size, and type), they over-represent the space but include highly relevant face-structure features -- like the brightness difference between the nose bridge and eye sockets.

:::

:::eli20
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

:::

## Integral Image

:::eli10

The integral image is a clever shortcut. Normally, adding up all the pixels in a rectangle requires looking at every pixel inside it -- slow for big rectangles. The integral image pre-computes running totals so that you can find the sum of ANY rectangle using just 4 lookups, no matter how big the rectangle is. It is like having a magic table where you can instantly know the total of any region.

:::

:::eli15
The integral image is a pre-computed table where each entry stores the sum of all pixels above and to the left of that position. Once computed (one pass over the image), the sum of any rectangular region can be calculated with exactly 4 array lookups regardless of rectangle size. This transforms Haar feature computation from O(pixels-in-rectangle) to O(1), making it feasible to evaluate hundreds of thousands of features per window in real time.

:::

:::eli20
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

:::

## AdaBoost (Feature Selection)

:::eli10

AdaBoost is like assembling a team of weak players who each know one small trick. Each player (weak classifier) can only check one simple feature and makes many mistakes. But AdaBoost cleverly combines them: after each player makes their predictions, it makes the next player focus on the mistakes the team got wrong. The final team decision is a weighted vote where better players get more say. Together, they become highly accurate.

:::

:::eli15
AdaBoost (Adaptive Boosting) builds a strong classifier by iteratively combining weak classifiers, each of which thresholds a single Haar feature. In each round, it selects the feature with lowest weighted error, increases the weight of misclassified examples (so the next classifier focuses on hard cases), and assigns a confidence weight to the selected classifier. The final decision is a weighted vote of all selected weak classifiers. From 160,000 candidate features, only ~200 are typically needed for 95% accuracy.

:::

:::eli20
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

:::

## Cascade Classifier

:::eli10

The cascade is like a series of security checkpoints. Most windows in an image are obviously NOT faces, so the first checkpoint uses just 2 simple features to quickly reject 50% of them. Only the windows that pass go to the next checkpoint, which is a bit harder. This continues through many stages. Real faces pass all checkpoints, but non-faces get kicked out early, making the whole process super fast.

:::

:::eli15
The cascade classifier organises detection as a series of increasingly strict stages. Early stages use very few features and are designed for high recall (catch all faces) with moderate precision (allow some false positives through). Later stages use more features for higher precision. Any stage can reject a window, and rejection is final. Since ~95% of windows are rejected in the first few stages (using just 2-5 features), the detector spends minimal time on obvious negatives, achieving real-time performance of 15+ fps.

:::

:::eli20
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

:::

## Summary

:::eli10

Viola-Jones combines four ideas: simple contrast patterns (Haar features), a fast summing trick (integral image), a clever team-building algorithm (AdaBoost), and a chain of quick rejections (cascade). Together they made face detection fast enough for real-time cameras -- a huge breakthrough in 2001 that is still used in phones and cameras today, though deep learning has since surpassed it in accuracy.

:::

:::eli15
The Viola-Jones framework succeeds through the synergy of its four components: Haar features provide simple, interpretable measurements of local contrast; integral images make computing these features near-instantaneous; AdaBoost selects the most discriminative features and combines them; and the cascade structure ensures sub-linear average computation by rejecting easy negatives immediately. Although superseded by deep learning for accuracy, the concepts (especially integral images and cascaded classifiers) remain influential in modern systems.

:::

:::eli20
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

:::

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
