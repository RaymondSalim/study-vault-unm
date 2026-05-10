---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP3029 - Computer Vision"
tags: ["exam", "strategy", "revision", "planning"]
---

## Exam Strategy

### Time Allocation

| Section | Suggested Time | Notes |
|---------|---------------|-------|
| Reading & planning | 10 minutes | Map questions to topics, pick your strongest |
| Short-answer questions | 35 minutes | Definitions, diagrams, brief explanations |
| Long-answer / derivation questions | 65 minutes | Algorithm steps, mathematical derivations, comparisons |
| Review | 10 minutes | Check diagrams are labelled, formulas are complete |

### Topic Weighting (estimated)

| Topic | Weight | Priority |
|-------|--------|----------|
| Segmentation | 10% | Medium |
| Features and descriptors (Harris, SIFT) | 15% | High |
| Object recognition (BoF, Viola-Jones) | 15% | High |
| Neural networks and CNNs | 20% | High |
| Generative models (GANs) | 10% | Medium |
| 3D vision and stereo | 15% | High |
| Optical flow and motion | 15% | High |

### Question Types to Expect

1. **Algorithm description** -- step-by-step walkthrough of SIFT, Viola-Jones cascade, Lucas-Kanade
2. **Diagram/illustration** -- draw a CNN architecture, epipolar geometry, feature matching pipeline
3. **Mathematical derivation** -- optical flow equation, stereo depth formula, Harris matrix eigenvalues
4. **Compare and contrast** -- Harris vs SIFT, Lucas-Kanade vs Horn-Schunck, GAN vs VAE
5. **Application/design** -- propose a pipeline for a given vision task

### Key Formulas

| Formula | Context |
|---------|---------|
| Harris: `R = det(M) - k * trace(M)^2` | Corner response, M is structure tensor |
| Stereo depth: `Z = f * B / d` | f = focal length, B = baseline, d = disparity |
| Optical flow: `Ix*u + Iy*v + It = 0` | Brightness constancy constraint equation |
| IoU: `area(A intersect B) / area(A union B)` | Detection evaluation metric |
| Softmax: `exp(zi) / sum(exp(zj))` | Class probability output |
| Convolution output size: `(W - F + 2P) / S + 1` | W=input, F=filter, P=padding, S=stride |

### Night-Before Top 10 Checklist

1. SIFT pipeline: DoG pyramid, keypoint localisation, orientation, 128-dim descriptor
2. Harris corner detector: structure tensor M, eigenvalue interpretation, response function
3. Viola-Jones: integral image, Haar features, AdaBoost, attentional cascade
4. CNN architecture: conv, ReLU, pooling, fully-connected, softmax
5. GAN training: generator loss, discriminator loss, mode collapse, training instability
6. Epipolar geometry: epipoles, epipolar lines, fundamental matrix, essential matrix
7. Stereo depth formula and what happens as baseline/disparity change
8. Optical flow: brightness constancy, aperture problem, Lucas-Kanade vs Horn-Schunck
9. Bag of Features pipeline: detect, describe, quantise (k-means), histogram, classify (SVM)
10. Transfer learning: freeze early layers, fine-tune later layers, when to use
