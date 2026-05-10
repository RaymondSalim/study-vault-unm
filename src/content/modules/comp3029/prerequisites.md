---
title: "Prerequisites"
order: 96
moduleTitle: "COMP3029 - Computer Vision"
tags: ["prerequisites", "preparation", "self-test"]
---

## Prerequisites

### Required Knowledge

| Area | Specifics |
|------|-----------|
| Linear algebra | Matrices, eigenvalues/vectors, matrix multiplication, SVD |
| Calculus | Partial derivatives, gradients, chain rule |
| Probability and statistics | Gaussian distributions, Bayes' theorem, histograms |
| Programming (Python) | NumPy arrays, loops, basic image I/O (OpenCV or PIL) |
| Basic image processing | Convolution, filtering, thresholding, edge detection |

### Helpful Prior Modules

| Module | Why it helps |
|--------|-------------|
| Image Processing | Filtering, convolution, morphology -- direct prerequisite for segmentation and features |
| Linear Algebra / Mathematics | Matrix operations essential for transformations, epipolar geometry, PCA |
| Machine Learning basics | Classification, clustering, training/testing -- needed for recognition and CNNs |
| Programming / Algorithms | Efficient implementation of vision algorithms, understanding complexity |
| Statistics | Probability distributions underpin noise models, Bayesian methods, and evaluation metrics |

### Self-Test: Are You Ready?

Answer these 5 questions. If you struggle with more than 2, revise the prerequisite material first.

1. **What is the result of convolving a 5x5 image with a 3x3 kernel (no padding, stride 1)?** (Expected: a 3x3 output)
2. **Given matrix M = [[a,b],[c,d]], what is det(M)?** (Expected: `ad - bc`)
3. **What does a Gaussian filter do to an image?** (Expected: Blurs/smooths it by averaging pixels weighted by a Gaussian distribution)
4. **What is the gradient of f(x,y) = x^2 + 3xy?** (Expected: `(2x + 3y, 3x)`)
5. **In k-means clustering, what are the two alternating steps?** (Expected: Assign points to nearest centroid, then recompute centroids as cluster means)
