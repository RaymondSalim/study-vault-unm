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

### IDF Weighting

Common visual words (appearing in many images) are uninformative — down-weight them:

$$\text{IDF}(w) = \log \frac{N_\text{total}}{N_\text{docs containing } w}$$

Re-weight histogram bins by IDF before classification or retrieval.

### Inverted File Index (Large-Scale Search)

Instead of comparing histograms of all database images:

| Step | Action |
|------|--------|
| 1 | Build vocabulary (visual words) |
| 2 | For each word, store which images contain it (posting list) |
| 3 | Query: extract features → map to words → find intersection of posting lists |
| 4 | Compare histograms only for candidate images |

Much faster than exhaustive comparison — enables real-time large-scale image retrieval.

### Spatial Pyramid Matching

Extension that preserves some spatial layout:
- Divide image into increasingly fine grids (1x1, 2x2, 4x4)
- Compute BoF histogram in each cell
- Concatenate with weights (finer levels get lower weight)

## Linear Classifiers

### Formulation

For $C$ classes, input $\mathbf{x}$ (flattened to $N \times 1$):

$$f(\mathbf{x}) = W\mathbf{x} + \mathbf{b}$$

where $W$ is $C \times N$, output is $C \times 1$ score vector. Each row $w_i$ of $W$ acts as a **template** for class $i$ — reshaping a learned row to image dimensions reveals what the classifier "looks for."

### Geometric Interpretation

- Each row $w_i \cdot x + b_i = 0$ defines a binary decision boundary (hyperplane)
- Combined: multi-class boundaries partition the feature space
- Support vectors are the training samples lying on the margin

### SVM Loss (Multi-Class Hinge Loss)

For sample $i$ with true label $y_i$ and scores $s = Wx_i + b$:

$$L_i = \sum_{j \neq y_i} \max(0, \; s_j - s_{y_i} + 1)$$

The margin constant 1 requires the true class score to beat all others by at least 1.

**Worked example:** Input is cat, scores = [cat: 3.2, car: 5.1, frog: -1.7]

| Comparison | Calculation | Result |
|-----------|-------------|--------|
| car vs cat | $\max(0, 5.1 - 3.2 + 1) = \max(0, 2.9)$ | 2.9 |
| frog vs cat | $\max(0, -1.7 - 3.2 + 1) = \max(0, -3.9)$ | 0 |
| **Total $L_\text{cat}$** | | **2.9** |

### Softmax / Cross-Entropy Loss

Convert scores to probabilities via softmax:

$$p_k = \frac{e^{s_k}}{\sum_j e^{s_j}}$$

Loss: negative log-probability of the true class:

$$L_i = -\log(p_{y_i})$$

**Derivation from KL divergence:** The true distribution $P$ is one-hot. Minimising $D_{KL}(P \| Q) = \sum_k P_k \log \frac{P_k}{Q_k}$ is equivalent to minimising cross-entropy $H(P, Q) = -\sum_k P_k \log Q_k$, which reduces to $-\log(Q_{y_i})$ since only one $P_k = 1$.

### Linear SVM

Find hyperplane $\mathbf{w} \cdot \mathbf{x} + b = 0$ that separates positive/negative examples with maximum margin. Support vectors are samples on the margin boundary.

| Property | Detail |
|----------|--------|
| Objective | Maximise margin between classes |
| Decision | Based on edge cases (support vectors), not class centres |
| Kernel trick | Map to higher dimensions for non-linear separation |
| Convexity | Convex objective → global optimum guaranteed |

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

## Comparison of Methods

| Method | Representation | Learning | Goal |
|--------|---------------|----------|------|
| Linear Classifier (HoG + SVM) | Simple hand-crafted features | Optimisation (SVM/Softmax) | Classification |
| Bag of Features | Visual vocabulary (clustering) | K-means codebook | Recognition / Retrieval |
| Viola-Jones | Haar features | Boosting (AdaBoost) | Real-time Detection |

<details><summary>Practice</summary>

1. Explain why bag-of-features loses spatial information. How does spatial pyramid matching address this?

2. In a sliding window detector with a 64x128 window, an image of 640x480, and 5 scales, approximately how many windows must be evaluated?

3. What is the role of non-maximum suppression in multi-scale detection?

4. Compare the Dalal & Triggs (HoG + SVM) pipeline with the Viola-Jones approach in terms of features, classifier, and speed.

5. Given scores [cat: 2.0, dog: 4.0, bird: -1.0] with true label = cat, compute the SVM hinge loss.

6. Show that minimising KL divergence between one-hot $P$ and predicted $Q$ is equivalent to minimising $-\log(Q_{y_i})$.

</details>
