---
title: "Object Recognition"
order: 4
moduleTitle: "COMP3029 - Computer Vision"
tags: ["object-recognition", "sliding-window", "bag-of-features", "svm", "detection"]
---

## Overview

Object recognition identifies and locates objects in images. Three key problems:

| Problem | Task | Output |
|---------|------|--------|
| Recognition/Classification | Identify main object category | Class label |
| Detection | Find object and its location | Bounding box + label |
| Pose estimation | Determine 3D position/orientation | 3D coordinates |

## Approaches to Recognition

| Era | Approach | Method |
|-----|----------|--------|
| 1980-90s | Specific objects | SIFT feature matching |
| 2000-10s | Object classes | Sliding window + learned classifiers |
| 2010s+ | Deep learning | CNNs (end-to-end) |

## Sliding Window Detection

### Pipeline (Dalal & Triggs)

| Step | Operation |
|------|-----------|
| 1 | Gamma/colour normalisation |
| 2 | Compute gradients |
| 3 | Weighted vote in spatial & orientation cells |
| 4 | Contrast normalise over overlapping blocks |
| 5 | Collect HoGs over detection window |
| 6 | Linear SVM classification |

### Multi-Scale Detection

- Run detector at multiple scales (image pyramid)
- Non-maximum suppression to merge overlapping detections

## Pictorial Structures (Deformable Parts Models)

Model objects as a collection of parts with spatial relationships.

### Formulation

- **Parts:** $V = \{v_1, \ldots, v_n\}$ with locations $L$ and appearance $A$
- **Connections:** Edges $e_{ij}$ between neighbouring parts with parameters $C$
- **Energy minimisation:**

$$E = \sum_i V_i(l_i) + \sum_{ij \in E} V_{ij}(l_i, l_j)$$

where $V_i(l_i)$ = appearance cost, $V_{ij}(l_i, l_j)$ = deformation cost.

### Properties

| Aspect | Detail |
|--------|--------|
| Flexibility | Handles articulated objects (humans, animals) |
| Inference | Dynamic programming on tree-structured graphs |
| Training | Learn part appearances + spatial priors from data |
| Limitation | Complex, slow inference |

## Bag of Features (Bag of Visual Words)

Inspired by text retrieval -- represent images as unordered collections of local features.

### Pipeline

| Step | Action |
|------|--------|
| 1 | Extract local features (e.g., SIFT) from training images |
| 2 | Cluster features into K visual words (K-means) |
| 3 | Build **visual vocabulary** (codebook) |
| 4 | For new image: assign each feature to nearest visual word |
| 5 | Build histogram of visual word frequencies |
| 6 | Classify histogram using SVM or other classifier |

### Properties

| Advantage | Limitation |
|-----------|------------|
| Simple and effective | Loses spatial information |
| Handles variable number of features | Codebook size is a hyperparameter |
| Works with any local descriptor | Quantisation introduces errors |

### Spatial Pyramid Matching

Extension that preserves some spatial layout:
- Divide image into increasingly fine grids (1x1, 2x2, 4x4)
- Compute BoF histogram in each cell
- Concatenate with weights (finer levels get lower weight)

## Linear Classifiers and SVMs

### Linear SVM

Find hyperplane $\mathbf{w} \cdot \mathbf{x} + b = 0$ that separates positive/negative examples with maximum margin.

$$\text{Classify: } \begin{cases} +1 & \text{if } \mathbf{w} \cdot \mathbf{x}_i + b \geq 0 \\ -1 & \text{if } \mathbf{w} \cdot \mathbf{x}_i + b < 0 \end{cases}$$

### Evaluation Metrics

| Metric | Formula |
|--------|---------|
| Precision | $\frac{TP}{TP + FP}$ |
| Recall | $\frac{TP}{TP + FN}$ |
| AP (Average Precision) | Area under precision-recall curve |
| IoU (Intersection over Union) | $\frac{\text{Area of Overlap}}{\text{Area of Union}}$ |

## Typical Datasets

| Dataset | Classes | Images | Task |
|---------|---------|--------|------|
| Caltech-101 | 101 | ~9,000 | Classification |
| Pascal VOC | 20 | ~11,500 | Detection + Segmentation |
| ImageNet (ILSVRC) | 1,000 | ~1.2M | Classification |
| COCO | 80 | ~330K | Detection + Segmentation |

<details><summary>Practice</summary>

1. Explain why bag-of-features loses spatial information. How does spatial pyramid matching address this?

2. In a sliding window detector with a 64x128 window, an image of 640x480, and 5 scales, approximately how many windows must be evaluated?

3. What is the role of non-maximum suppression in multi-scale detection?

4. Compare the Dalal & Triggs (HoG + SVM) pipeline with the Viola-Jones approach in terms of features, classifier, and speed.

</details>
