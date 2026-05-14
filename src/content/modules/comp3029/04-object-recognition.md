---
title: "Object Recognition"
order: 4
moduleTitle: "COMP3029 - Computer Vision"
tags: ["object-recognition", "sliding-window", "bag-of-features", "svm", "detection"]
---

## Overview

:::eli10

Object recognition is teaching a computer to look at a photo and say "that is a cat" or "there is a car at this spot." There are three versions of this task: naming what is in the image (classification), drawing a box around where it is (detection), and figuring out exactly how the object is positioned in 3D space (pose estimation).

:::

:::eli15

Object recognition encompasses several related tasks of increasing difficulty. Classification identifies the main object category in an image. Detection localises objects with bounding boxes and labels. Pose estimation determines the 3D position and orientation of detected objects. Approaches have evolved from matching specific known objects (SIFT), through learned classifiers on hand-crafted features (HoG + SVM), to modern end-to-end deep learning methods (CNNs).

:::

:::eli20

Object recognition identifies and locates objects in images. Three key problems:

| Problem | Task | Output |
|---------|------|--------|
| Recognition/Classification | Identify main object category | Class label |
| Detection | Find object and its location | Bounding box + label |
| Pose estimation | Determine 3D position/orientation | 3D coordinates |

:::

## Approaches to Recognition

:::eli10

Over the decades, computers learned to recognise objects in different ways. First, they tried matching specific known objects using landmark points. Then, they learned to recognise whole categories (like "any car") by scanning a window across the image and asking a trained classifier "is this a car?" Now, deep neural networks learn everything from scratch -- they figure out both what to look for and how to decide.

:::

:::eli15

Object recognition has progressed through three major paradigms. In the 1990s, recognition meant matching specific objects via distinctive features (like SIFT keypoints). In the 2000s, the focus shifted to category-level recognition using hand-crafted features (HoG, SIFT descriptors) fed into learned classifiers (SVM, boosting) with sliding window detection. From 2012 onward, deep CNNs replaced both the feature extraction and classification stages, learning end-to-end from raw pixels to object labels.

:::

:::eli20

| Era | Approach | Method |
|-----|----------|--------|
| 1980-90s | Specific objects | SIFT feature matching |
| 2000-10s | Object classes | Sliding window + learned classifiers |
| 2010s+ | Deep learning | CNNs (end-to-end) |

:::

## Sliding Window Detection

:::eli10

Sliding window detection is like looking through a magnifying glass that you slide across every spot in the photo, at different zoom levels. At each position you ask: "Does this look like the object I am searching for?" A trained classifier answers yes or no. When multiple overlapping spots say "yes," you merge them into one detection.

:::

:::eli15

Sliding window detection systematically scans a fixed-size detection window across the image at multiple positions and scales. At each position, features (typically HoG) are extracted from the window and fed to a classifier (typically linear SVM). The detector runs at multiple scales via an image pyramid. Since objects may trigger multiple overlapping windows, non-maximum suppression merges nearby detections into a single final bounding box.

:::

:::eli20

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

:::

## Pictorial Structures (Deformable Parts Models)

:::eli10

Some objects, like people, are made of parts that move around (arms, legs, head). Pictorial structures model an object as a collection of connected parts -- like a paper doll with joints. Each part has its own appearance, and the connections say how far apart the parts can be. To find the object, you find the arrangement of parts that looks right and is not too stretched.

:::

:::eli15

Deformable Parts Models represent objects as collections of parts with learned appearance templates and spatial relationships (springs connecting parts). Detection minimises an energy function balancing appearance matching costs (how well each part matches its template) against deformation costs (how much the spatial arrangement deviates from the learned model). Inference uses dynamic programming on tree-structured graphs, enabling flexible detection of articulated objects like humans.

:::

:::eli20

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

:::

## Bag of Features (Bag of Visual Words)

:::eli10

Bag of Features treats an image like a bag of Scrabble tiles. First, you create a "dictionary" of common visual patterns (like different types of edges, corners, textures). Then for each new image, you find which dictionary patterns appear and count them up. The resulting count-list is the image's description. It is like describing a recipe by listing ingredients without caring about the cooking order.

:::

:::eli15

Bag of Features (inspired by text retrieval) represents images as histograms over a vocabulary of "visual words." The pipeline first extracts local features (e.g., SIFT) from many training images and clusters them into K representative patterns (the visual vocabulary). New images are described by assigning each detected feature to its nearest visual word and building a frequency histogram. This histogram is classified using SVM or similar. The approach loses spatial information but is simple and effective for recognition and retrieval.

:::

:::eli20

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

:::

## Linear Classifiers

:::eli10

A linear classifier draws a straight line (or flat plane) to separate things into categories. Imagine laying photos on a table and drawing a line so all cats are on one side and all dogs on the other. The computer learns where to draw this line by looking at many examples. The "score" for each class is just a weighted sum of the input features plus a bias.

:::

:::eli15

Linear classifiers compute a score for each class using a simple weighted sum of the input features: score = W*x + b. Each row of the weight matrix W acts as a template for one class. The classifier assigns the input to the class with the highest score. Training involves minimising a loss function (hinge loss for SVM, cross-entropy for softmax) that penalises incorrect predictions. Despite their simplicity, linear classifiers are effective when paired with good features (like HoG or bag-of-features histograms).

:::

:::eli20

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

:::

## Typical Datasets

:::eli10

To train and test object recognisers, researchers use big collections of labelled pictures. Small ones have around 9,000 images in 100 categories. The biggest (ImageNet) has over 1.2 million images in 1,000 categories. These datasets let us compare how well different methods work on the same problems.

:::

:::eli15

Standard benchmark datasets allow fair comparison between recognition methods. Caltech-101 (101 classes, ~9K images) and Pascal VOC (20 classes, ~11.5K images) are smaller benchmarks. ImageNet/ILSVRC (1000 classes, ~1.2M images) drove the deep learning revolution starting in 2012. COCO (80 classes, ~330K images) is the modern standard for detection and segmentation, offering more complex scenes with multiple objects per image.

:::

:::eli20

| Dataset | Classes | Images | Task |
|---------|---------|--------|------|
| Caltech-101 | 101 | ~9,000 | Classification |
| Pascal VOC | 20 | ~11,500 | Detection + Segmentation |
| ImageNet (ILSVRC) | 1,000 | ~1.2M | Classification |
| COCO | 80 | ~330K | Detection + Segmentation |

:::

## Comparison of Methods

:::eli10

Different recognition methods use different strategies. HoG + SVM uses edge patterns and a line-drawing classifier. Bag of Features uses a dictionary of visual patterns. Viola-Jones uses simple light/dark patterns with a cascade of quick checks. Each approach is like a different detective strategy -- some are faster, some are more accurate.

:::

:::eli15

The three classical recognition approaches differ in representation and learning strategy. HoG + linear SVM uses a fixed feature pipeline with a discriminative classifier optimised for classification. Bag of Features uses unsupervised clustering to build a visual vocabulary, then classifies frequency histograms. Viola-Jones uses extremely simple Haar features selected by boosting (AdaBoost) and organised in a cascade for real-time face detection. Deep learning has largely superseded all three.

:::

:::eli20

| Method | Representation | Learning | Goal |
|--------|---------------|----------|------|
| Linear Classifier (HoG + SVM) | Simple hand-crafted features | Optimisation (SVM/Softmax) | Classification |
| Bag of Features | Visual vocabulary (clustering) | K-means codebook | Recognition / Retrieval |
| Viola-Jones | Haar features | Boosting (AdaBoost) | Real-time Detection |

:::

<details><summary>Practice</summary>

1. Explain why bag-of-features loses spatial information. How does spatial pyramid matching address this?

2. In a sliding window detector with a 64x128 window, an image of 640x480, and 5 scales, approximately how many windows must be evaluated?

3. What is the role of non-maximum suppression in multi-scale detection?

4. Compare the Dalal & Triggs (HoG + SVM) pipeline with the Viola-Jones approach in terms of features, classifier, and speed.

5. Given scores [cat: 2.0, dog: 4.0, bird: -1.0] with true label = cat, compute the SVM hinge loss.

6. Show that minimising KL divergence between one-hot $P$ and predicted $Q$ is equivalent to minimising $-\log(Q_{y_i})$.

</details>
