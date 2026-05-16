---
title: "Exam Keywords & Further Learning"
order: 88
moduleTitle: "COMP3029 - Computer Vision"
tags: ["exam", "keywords", "further-reading", "google", "slides"]
---

## How to Use This Page

Each topic lists **search keywords** you can paste into Google for deeper learning, mapped to the relevant lecture slides and exam sections.

---

## Topic 1: Segmentation

**Slides:** 02. Segmentation.pdf, 02a. EM for GMM.pdf
**Exam coverage:** Section A Q1, Section B Q3

| Sub-topic | Search Keywords | Slide |
|-----------|----------------|-------|
| K-means clustering | `K-means clustering algorithm image segmentation` | 02 |
| Gaussian Mixture Models | `Gaussian Mixture Model image segmentation` | 02, 02a |
| EM Algorithm | `Expectation Maximization algorithm GMM tutorial` | 02a |
| Hard vs Soft assignment | `K-means vs GMM soft assignment clustering` | 02 |

**Recommended links:**
- [Stanford CS231n — Clustering](https://cs231n.github.io/)
- [Scikit-learn GMM guide](https://scikit-learn.org/stable/modules/mixture.html)

---

## Topic 2: Features

**Slides:** 03. Features.pdf, 04. Point Features.pdf, 04a. ijcv04-SIFT.pdf
**Exam coverage:** Section A Q2

| Sub-topic | Search Keywords | Slide |
|-----------|----------------|-------|
| Harris Corner Detection | `Harris corner detector structure tensor eigenvalues` | 03 |
| SIFT | `SIFT feature descriptor scale-space Difference of Gaussians` | 04, 04a |
| HoG | `Histogram of Oriented Gradients feature descriptor` | 03 |
| Feature Matching | `SIFT feature matching Lowe ratio test RANSAC` | 04 |
| Scale Invariance | `scale-space representation Difference of Gaussians blob detection` | 04 |
| Image Gradient / Sobel | `image gradient Sobel operator edge detection` | 03 |
| LBP | `Local Binary Pattern texture descriptor` | 03 |

**Recommended links:**
- [OpenCV Harris Corner Tutorial](https://docs.opencv.org/4.x/dc/d0d/tutorial_py_features_harris.html)
- [OpenCV SIFT Tutorial](https://docs.opencv.org/4.x/da/df5/tutorial_py_sift_intro.html)
- [Lowe's SIFT Paper (2004)](https://www.cs.ubc.ca/~lowe/papers/ijcv04.pdf)

---

## Topic 3: Object Recognition + Viola-Jones

**Slides:** 05. Object Recognition.pdf, 06. Bag of Features.pdf, 07. Viola-Jones.pdf
**Exam coverage:** Section A Q2, Section B Q2

| Sub-topic | Search Keywords | Slide |
|-----------|----------------|-------|
| Bag of Features / Bag of Visual Words | `Bag of Visual Words image classification pipeline` | 05, 06 |
| Spatial Pyramid Matching | `spatial pyramid matching image classification SPM` | 05 |
| Viola-Jones Face Detection | `Viola-Jones face detection Haar features cascade classifier` | 07 |
| Integral Image | `integral image summed area table fast feature computation` | 07 |
| AdaBoost | `AdaBoost weak learner ensemble boosting algorithm` | 07 |
| SVM Classification | `Support Vector Machine hinge loss image classification` | 05 |
| IDF Weighting | `TF-IDF weighting bag of visual words` | 05 |

**Recommended links:**
- [Viola-Jones Original Paper (2001)](https://www.cs.cmu.edu/~efros/courses/LBMV07/Papers/viola-cvpr-01.pdf)
- [OpenCV Cascade Classifier Tutorial](https://docs.opencv.org/4.x/db/d28/tutorial_cascade_classifier.html)

---

## Topic 4: Neural Networks + CNNs

**Slides:** 08. Fundamentals of NNs (part 1).pdf, 09. Fundamentals of NNs (part 2).pdf, 10. Convolutional Neural Networks.pdf, 11. CNN Architectures.pdf, 11a. Vision Transformers.pdf
**Exam coverage:** Section A Q4, Section B Q2

| Sub-topic | Search Keywords | Slide |
|-----------|----------------|-------|
| Backpropagation | `backpropagation neural network chain rule gradient descent` | 08 |
| Activation Functions | `ReLU sigmoid softmax activation function comparison` | 08 |
| SGD / Adam Optimizer | `stochastic gradient descent Adam optimizer momentum` | 09 |
| Batch Normalization | `batch normalization deep learning training` | 09 |
| Dropout | `dropout regularization neural network` | 09 |
| CNN Convolution | `convolutional neural network convolution pooling stride padding` | 10 |
| Output Size Formula | `CNN output size formula padding stride kernel` | 10 |
| ResNet Skip Connections | `ResNet residual learning skip connections degradation problem` | 11 |
| 1x1 Convolutions | `1x1 convolution channel mixing dimensionality reduction Network-in-Network` | 11 |
| Transfer Learning | `transfer learning fine-tuning pretrained CNN feature extraction` | 11 |
| Vision Transformers | `Vision Transformer ViT self-attention patch embedding` | 11a |

**Recommended links:**
- [Stanford CS231n — Convolutional Networks](https://cs231n.github.io/convolutional-networks/)
- [Stanford CS231n — Backpropagation](https://cs231n.github.io/optimization-2/)
- [3Blue1Brown Neural Networks (YouTube)](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)
- [ResNet Paper (He et al. 2015)](https://arxiv.org/abs/1512.03385)

---

## Topic 5: Generative Models

**Slides:** 12. Generative Models - Generative Adversarial Networks.pdf
**Exam coverage:** Section A Q4, Section B Q2

| Sub-topic | Search Keywords | Slide |
|-----------|----------------|-------|
| GANs | `Generative Adversarial Network minimax objective training` | 12 |
| Mode Collapse | `GAN mode collapse training instability solutions` | 12 |
| DCGAN | `DCGAN deep convolutional GAN architecture` | 12 |
| Conditional GAN | `conditional GAN cGAN image generation` | 12 |
| GAN Evaluation | `GAN evaluation FID score inception score` | 12 |

**Recommended links:**
- [GAN Original Paper (Goodfellow 2014)](https://arxiv.org/abs/1406.2661)
- [Stanford CS231n — Generative Models](https://cs231n.github.io/)

---

## Topic 6: 3D Vision + Stereo

**Slides:** 13. Projective Geometry.pdf, 14. Camera Models.pdf, 15. Stereo Correspondence.pdf
**Exam coverage:** Section A Q3, (Section B Q1 — dropped in exam strategy)

| Sub-topic | Search Keywords | Slide |
|-----------|----------------|-------|
| Projective Geometry | `projective geometry homogeneous coordinates computer vision` | 13 |
| Camera Intrinsic Matrix | `pinhole camera model intrinsic matrix K calibration` | 14 |
| Camera Extrinsics | `camera extrinsic parameters rotation translation world coordinates` | 14 |
| Epipolar Geometry | `epipolar geometry fundamental matrix essential matrix constraint` | 13, 14 |
| Depth from Disparity | `stereo vision disparity depth estimation Z=fB/d` | 15 |
| Stereo Matching | `stereo correspondence block matching SSD cost volume` | 15 |
| Rectification | `stereo rectification epipolar lines horizontal alignment` | 15 |
| 8-Point Algorithm | `eight-point algorithm fundamental matrix estimation` | 13 |

**Recommended links:**
- [Stanford CS231a — Camera Models](https://web.stanford.edu/class/cs231a/)
- [OpenCV Stereo Vision Tutorial](https://docs.opencv.org/4.x/dd/d53/tutorial_py_depthmap.html)
- [Multiple View Geometry (Hartley & Zisserman) — textbook reference](https://www.robots.ox.ac.uk/~vgg/hzbook/)

---

## Topic 7: Optical Flow

**Slides:** 16. Motion Detection and Optic Flow.pdf
**Exam coverage:** Section A Q1, Section B Q3

| Sub-topic | Search Keywords | Slide |
|-----------|----------------|-------|
| Optical Flow Constraint | `optical flow brightness constancy constraint equation derivation` | 16 |
| Aperture Problem | `aperture problem optical flow ambiguity normal flow` | 16 |
| Lucas-Kanade | `Lucas-Kanade optical flow local method least squares window` | 16 |
| Horn-Schunck | `Horn-Schunck optical flow global smoothness regularization energy` | 16 |
| Coarse-to-Fine Pyramid | `optical flow coarse-to-fine pyramid multi-resolution large displacement` | 16 |
| LK vs HS Comparison | `Lucas-Kanade vs Horn-Schunck optical flow comparison local global` | 16 |

**Recommended links:**
- [OpenCV Optical Flow Tutorial](https://docs.opencv.org/4.x/d4/dee/tutorial_optical_flow.html)
- [Stanford CS131 — Optical Flow](http://vision.stanford.edu/teaching/cs131_fall1718/)

---

## General Recommended Courses

| Course | Search Keywords | Covers |
|--------|----------------|--------|
| Stanford CS231n | `CS231n Stanford CNNs visual recognition` | CNNs, backprop, GANs, transfer learning |
| Stanford CS131 | `CS131 Stanford computer vision` | Features, segmentation, optical flow, stereo |
| UCL COMP0137 | `UCL computer vision tutorial` | Epipolar geometry, camera models |
| First Principles of CV (YouTube) | `First Principles of Computer Vision YouTube` | Harris, SIFT, stereo, optical flow |
| OpenCV Documentation | `OpenCV tutorial <topic>` | Practical implementations |
