---
title: "Slides Index"
order: 97
moduleTitle: "COMP3029 - Computer Vision"
tags: ["slides", "index", "lectures", "overview"]
---

## Slides Index

| Slide | Topic | Lectures | Key Concepts | Exam Weight |
|-------|-------|----------|--------------|-------------|
| 1 | Segmentation | L02.1 | K-means, GMM, EM algorithm, block coordinate descent, log-likelihood | Medium |
| 2 | Features | L02.2, L03.1 | Image gradient, Sobel, LBP, HoG, directional derivative, spatial filtering | High |
| 3 | Point Features (SIFT) | L03.2 | Scale-space, DoG ≈ LoG, octaves, Hessian keypoint localisation, 128-dim descriptor | High |
| 4 | Object Recognition | L04 | Linear classifiers, SVM/softmax loss, Bag of Features, IDF, inverted file index | High |
| 5 | Viola-Jones | L04 | Haar-like features, integral image, AdaBoost, attentional cascade, face detection | High |
| 6 | Neural Networks | L05 | Backpropagation (δ×z), SGD/Momentum/Adam, batch norm, dropout, error surface | Medium |
| 7 | CNNs | L06 | Volumetric conv, ResNet, depthwise separable, SE-Net, dilated conv, 1×1 conv | High |
| 8 | Generative Models & ViT | L07 | GANs, attention (Q/K/V), multi-head, positional encoding, ViT architecture | High |
| 9 | 3D Vision | L08, L09 | Camera models (K, R, t), projective geometry, epipolar geometry, E and F matrices | High |
| 10 | Stereo and Motion | L10, L11, L12 | Disparity-depth, 3D cost volume, scan-line DP, optical flow, Lucas-Kanade, Horn-Schunck, pyramids | High |

### Cross-cutting Themes

- **Feature representation** -- from hand-crafted (SIFT, Haar, HoG) to learned (CNN, ViT)
- **Matching and correspondence** -- SIFT matching, stereo, optical flow
- **Scale and invariance** -- SIFT scale-space, CNN pooling, pyramid methods
- **Optimisation** -- K-means cost, EM lower bound, SVM hinge, cross-entropy, energy minimisation
- **Linear algebra** -- eigenvalue analysis (Harris, PCA), matrix decomposition (SVD for F)
