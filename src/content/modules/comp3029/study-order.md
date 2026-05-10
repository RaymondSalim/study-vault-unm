---
title: "Study Order"
order: 94
moduleTitle: "COMP3029 - Computer Vision"
tags: ["study-order", "planning", "revision"]
---

## Recommended Study Order

| # | Topic | Why this order | Estimated time |
|---|-------|---------------|----------------|
| 1 | Segmentation | Foundation -- introduces pixel-level processing and region concepts | 2 hours |
| 2 | Features (edges, corners, Harris) | Builds on image gradients; needed for all later feature-based methods | 2.5 hours |
| 3 | Point Features (SIFT) | Extends Harris to scale/rotation invariance; descriptor used in recognition | 3 hours |
| 4 | Object Recognition (BoF) | Applies SIFT descriptors in a classification pipeline | 2.5 hours |
| 5 | Viola-Jones | Complements BoF with a different detection paradigm (cascade, boosting) | 2 hours |
| 6 | Neural Networks | Core ML foundations needed before CNNs | 2 hours |
| 7 | CNNs | Modern backbone for most vision tasks; builds on NN fundamentals | 3 hours |
| 8 | Generative Models (GANs) | Advanced deep learning topic building on CNN understanding | 2 hours |
| 9 | 3D Vision | Shifts to geometry-based reasoning; independent of deep learning | 2.5 hours |
| 10 | Stereo and Motion (Optical Flow) | Applies 3D geometry to practical depth and motion estimation | 3 hours |

### Tips

- Topics 1-5 form the "classical vision" block -- study these as a coherent unit.
- Topics 6-8 form the "deep learning" block -- ensure you understand backpropagation before tackling CNNs/GANs.
- Topics 9-10 are geometry-heavy -- practice the maths (matrix operations, epipolar constraint).
- Total estimated study time: ~24.5 hours (spread over 6-7 days recommended).
