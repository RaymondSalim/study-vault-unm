---
title: "Mock Exam"
order: 88
moduleTitle: "COMP3029 - Computer Vision"
tags: ["exam", "mock", "practice", "questions"]
---

## COMP3029 Computer Vision — Mock Examination

**Time allowed: TWO HOURS**

**SECTION A:** Answer ALL FOUR questions. Each question has two sub-questions.

**SECTION B:** Answer TWO out of THREE questions. Each question has two sub-questions.

---

## SECTION A

*Answer ALL FOUR questions in this section.*

---

### Question 1: Segmentation, Motion Analysis, and Optical Flow

**[overall 20 marks]**

#### (a) K-Means and GMM Segmentation [10 marks]

> **Reference:** For a visual example of instance segmentation with K-means, see Figure 1 in the 2020-2021 paper (dining room scene with chairs, table, background).

A traffic monitoring system captures the following simplified 4x4 greyscale image of a road scene. The image contains three regions: road (dark), vehicle (medium), and road marking (bright).

```
 45   48  130  135
 42   50  128  140
 44   46  200  205
 47   45  195  210
```

i. Using K-means with K=3 and initial cluster centres $\mu_1 = 45$, $\mu_2 = 130$, $\mu_3 = 200$, perform **one complete iteration** of the algorithm. Show the assignment step and the update step. State the new cluster centres.

[4 marks]

ii. A researcher proposes using a Gaussian Mixture Model (GMM) instead of K-means for this segmentation task. Explain how the EM algorithm differs from K-means in its assignment step (E-step). Write the formula for the E-step and explain what advantage soft assignment provides for pixels near region boundaries.

[3 marks]

> **Reference:** For the modified objective with neighbourhood term, see Q1(a)(iii) in the 2020-2021 paper.

iii. The K-means objective function is:

$$L = \sum_{i=1}^{N} \sum_{k=1}^{K} r_{ik} \| x_i - \mu_k \|^2$$

A colleague modifies it to include a neighbourhood term:

$$L' = \sum_{i=1}^{N} \sum_{k=1}^{K} \left[ r_{ik} \| x_i - \mu_k \|^2 + \lambda \sum_{j \in \Omega(i)} f(x_i, x_j) \right]$$

where $\Omega(i)$ is the set of spatial neighbours of pixel $i$ and $f(x_i, x_j)$ is a function of the feature vectors of pixels $i$ and $j$. What effect would minimising $L'$ have compared to minimising $L$? Explain with reference to segmentation quality.

[3 marks]

---

#### (b) Optical Flow [10 marks]

> **Reference:** See Figure 7 in the 2023-2024 paper for the same format of 5×5 patch presentation.

Two 5x5 image patches at time $t$ and $t+1$ are given below.

**Time $t$:**
```
180  180  180  178  175
180  180  179  175  170
180  178  175  170  165
178  175  170  165  160
175  170  165  160  155
```

**Time $t+1$:**
```
180  180  180  180  178
180  180  180  178  175
180  180  178  175  170
180  178  175  170  165
178  175  170  165  160
```

The origin of the image coordinate system is at the upper-left corner. Use the formulae $I_x = I(x+1, y) - I(x, y)$ and $I_y = I(x, y+1) - I(x, y)$ to calculate image gradients.

i. Calculate the spatial gradients $I_x$, $I_y$, and the temporal gradient $I_t$ for the 3x3 window centred at pixel (2,2) (0-indexed, row 2 col 2) of the time-$t$ patch. Show your working.

[5 marks]

ii. Using the Lucas-Kanade method, set up the system $A^T A \begin{bmatrix} u \\ v \end{bmatrix} = A^T \mathbf{b}$ where $\mathbf{b} = [-I_t]$. Compute the matrices $A^T A$ and $A^T \mathbf{b}$, then solve for the optical flow vector $(u, v)$. Interpret the direction of motion.

[5 marks]

---

### Question 2: Feature Extraction and Object Recognition

**[overall 20 marks]**

#### (a) Image Features [10 marks]

i. The following 3x3 image patch is given:

```
 88  102   95
 92  100  108
105   97  112
```

(A) Determine the Local Binary Pattern (LBP) string for the central pixel. Start from the top-left neighbour and proceed clockwise. Convert to decimal.

[3 marks]

(B) Explain how LBP features are organised into a feature vector suitable for image classification using an SVM.

[2 marks]

> **Reference:** See Figure 2 in the 2023-2024 paper for the same format of derivative grids used in SIFT key point detection.

ii. The derivatives of image pixels along the x-axis and y-axis of a 3x3 patch are:

**Pixel derivative along x-axis:**
```
 2   4  -1
 3   6   0
-2   1   3
```

**Pixel derivative along y-axis:**
```
 1  -2   3
 4   2  -1
 0   3   2
```

(A) Calculate the structure tensor (Hessian matrix) used in SIFT key point detection. Show your steps.

[3 marks]

(B) Explain how the eigenvalues of this matrix determine whether the point is a corner, edge, or flat region. How does the Harris response function $R = \det(H) - k \cdot \text{trace}(H)^2$ avoid explicitly computing eigenvalues?

[2 marks]

---

#### (b) Object Recognition [10 marks]

> **Reference:** See Figure 2 in the 2020-2021 paper for a pictorial structure graph representation of an object (chair with parts V1-V6). Same format of part-based recognition question.

i. Describe the complete Bag of Features (BoF) pipeline for image classification, from feature extraction to classification. Your answer should include the role of:
- SIFT descriptors
- K-means clustering (visual vocabulary)
- Histogram construction
- IDF weighting
- SVM classification

[5 marks]

> **Reference:** See Figure 10 in the 2023-2024 paper for the same format of integral image computation from a 3×3 patch.

ii. The Viola-Jones face detection framework uses an attentional cascade of classifiers.

(A) Explain how the integral image enables O(1) computation of any rectangular sum. Given the following 3x3 image patch, compute its integral image:

```
 70   80   90
100  110  120
 60   50   40
```

[3 marks]

(B) Explain the cascade structure: why are early stages designed with few features and high recall? What happens when a sub-window is rejected at an early stage?

[2 marks]

---

### Question 3: Stereo Vision

**[overall 20 marks]**

#### (a) Camera Model and Depth Estimation [10 marks]

i. A pinhole camera has a focal length of 50mm, resolution 96 dpi (i.e., 37.80 pixels per cm) for both horizontal and vertical resolution, and produces images of 3840 x 2160 pixels. Assuming no distortion and no skew, calculate the intrinsic parameter matrix $K$. Show your work.

[5 marks]

ii. A rectified stereo system with baseline $B = 12$ cm and focal length $f = 800$ pixels observes an object. The object appears at pixel column 520 in the left image and pixel column 472 in the right image.

(A) Calculate the disparity and depth of the object.

(B) If the object moves 2 metres further away, what would be the new disparity? Comment on depth resolution at greater distances.

[5 marks]

---

#### (b) Epipolar Geometry [10 marks]

> **Reference:** See Figure 3 in the 2023-2024 paper for the epipolar geometry diagram showing cameras $O_1$, $O_2$, point $P$, projections $p$, $p'$, and epipoles $e$, $e'$.

i. With reference to a diagram of two cameras $O_1$ and $O_2$ observing a 3D point $P$:

(A) Define the epipolar plane, epipoles ($e$, $e'$), and epipolar lines.

(B) Explain how epipolar geometry reduces the correspondence search from 2D to 1D.

[4 marks]

ii. The fundamental matrix $F$ satisfies $\mathbf{p}'^T F \mathbf{p} = 0$ for corresponding points.

(A) Explain what the fundamental matrix encodes (what camera parameters does it combine?).

(B) Explain the difference between the fundamental matrix $F$ and the essential matrix $E$. Under what condition are they equivalent?

(C) After rectification, what special form do the epipolar lines take, and why does this simplify stereo matching?

[6 marks]

---

### Question 4: Deep Learning

**[overall 20 marks]**

#### (a) Convolutional Neural Networks [10 marks]

i. A CNN layer receives an input feature map of 32 channels with spatial dimensions 128x128. It applies 64 filters of size 5x5, with padding = 2 and stride = 2.

(A) Calculate the spatial dimensions of the output feature map. Show your work.

(B) Calculate the total number of learnable parameters in this layer (including biases).

[4 marks]

ii. Explain the following architectural innovations and the specific problem each solves:

(A) **ResNet skip connections:** What is the "degradation problem"? How does $y = F(x) + x$ solve it?

(B) **1x1 convolutions:** How do they reduce computational cost? Give a concrete example with numbers.

(C) **Three stacked 3x3 convolutions vs one 7x7 convolution:** Compare receptive field, number of parameters (assume $C$ channels), and non-linearity.

[6 marks]

---

#### (b) Generative Models [10 marks]

> **Reference:** See Figure 4 in the 2023-2024 paper for the Vision Transformer (ViT) architecture diagram showing patch embedding, transformer encoder, and MLP head.

i. The GAN training objective is:

$$\min_G \max_D \; \mathbb{E}_{x \sim p_{data}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1 - D(G(z)))]$$

(A) Explain the roles of the Generator $G$ and Discriminator $D$. What does equilibrium look like?

(B) Define **mode collapse** and explain one technique to mitigate it.

[5 marks]

ii. A Vision Transformer (ViT) processes an image for classification.

(A) Describe how the input image is converted into a sequence of tokens (patches, linear projection, positional encoding, class token).

(B) Write the scaled dot-product attention formula and explain why the scaling factor $\sqrt{d_k}$ is necessary.

[5 marks]

---

## SECTION B

*Answer TWO out of THREE questions in this section.*

---

### Question 5: Stereo Vision

**[overall 30 marks]**

#### (a) Stereo Matching and Depth Reconstruction [16 marks]

> **Reference:** See Figure 8 in the 2023-2024 paper for a rectified stereo pair of cargo in a warehouse with labelled corresponding points (Origin, 108cm, 139cm, 159cm).

A rectified stereo pair captures a warehouse scene. Four corresponding points are identified:

| Point | Left Image $(x_L, y)$ | Right Image $(x_R, y)$ | Label |
|-------|----------------------|------------------------|-------|
| A | (320, 180) | (278, 180) | Origin |
| B | (485, 180) | (441, 180) | Width |
| C | (320, 95) | (278, 95) | Height |
| D | (335, 180) | (290, 180) | Depth |

The camera has focal length $f = 720$ pixels and baseline $B = 10$ cm.

i. Calculate the disparity and 3D depth ($Z$) for each of the four points.

[4 marks]

ii. Using the reconstruction formula $X = (u - c_x) \cdot Z / f$ and $Y = (v - c_y) \cdot Z / f$ (with principal point $c_x = 400$, $c_y = 300$), compute the 3D coordinates $(X, Y, Z)$ for all four points.

[6 marks]

iii. Calculate the three physical dimensions of the object (Width = distance A-B, Height = distance A-C, Depth = distance A-D) using Euclidean distance in 3D.

[4 marks]

iv. Discuss two challenges that could affect the accuracy of these measurements in practice.

[2 marks]

---

#### (b) Block Matching and Cost Volume [14 marks]

i. Block matching is used to find correspondences along a scanline. Describe:

(A) The matching cost metrics commonly used (SAD, SSD, NCC).

(B) The window size trade-off: what happens with too-small vs too-large windows?

(C) Name three scenarios where block matching fails and explain why.

[7 marks]

> **Reference:** See Figure 9 in the 2023-2024 paper for the deep learning stereo pipeline diagram showing stages (A) through (E): feature extraction → feature matching → cost volume regularisation → argmin → post-processing.

ii. A deep learning stereo pipeline constructs a 3D cost volume of dimensions $H \times W \times D_{max}$.

(A) Explain what each entry $C(x, y, d)$ in the cost volume represents.

(B) Explain the purpose of cost volume regularisation using 3D convolutions.

(C) Explain how "soft argmin" produces sub-pixel disparity estimates and why it is preferred over hard argmin for end-to-end training.

[7 marks]

---

### Question 6: Deep Learning and Image Classification

**[overall 30 marks]**

#### (a) CNN Architectures and Transfer Learning [14 marks]

i. Compare the following architectures in a table with columns for: key innovation, depth, filter strategy, and main limitation.

- AlexNet (2012)
- VGGNet (2014)
- ResNet (2015)

[6 marks]

ii. A researcher has a small dataset of 500 medical images (5 classes, 100 per class) and wants to build a classifier.

(A) Explain the transfer learning strategy they should use. Which layers should be frozen and which should be trained? Why?

(B) The researcher applies data augmentation. List 4 suitable augmentation techniques for medical images and explain why random colour jitter might NOT be appropriate.

(C) Define and compare: Precision, Recall, F1-Score, and explain when each metric is most important for medical diagnosis.

[8 marks]

---

#### (b) GAN for 3D Reconstruction [16 marks]

> **Reference:** See Figure 11 in the 2023-2024 paper for the 3D model reconstruction framework with GAN, showing Encoder, Generator, Classifier, and Discriminator components with a 2D chair image as input and 3D model output.

i. Explain the role of each component:
- Encoder
- Class label C
- Generator
- Classifier
- Discriminator

[10 marks]

ii. Describe the training process:

(A) What loss functions are used? (adversarial loss, reconstruction loss, classification loss)

(B) How does inference (test time) differ from training? Which components are NOT needed at test time?

(C) What advantage does the adversarial loss provide compared to using only reconstruction loss (e.g., L2)?

[6 marks]

---

### Question 7: Segmentation and Optical Flow

**[overall 30 marks]**

#### (a) GMM Segmentation of Natural Scene [16 marks]

> **Reference:** See Figures 5 and 6 in the 2023-2024 paper for a similar GMM segmentation question with a reindeer image in HSV, including the HSV channel visualisations and histograms.

An outdoor image contains three regions: **sky** (blue), **trees** (green), and **ground** (brown/yellow). The image is converted to HSV colour space.

The histograms of the three HSV channels show:
- **Hue:** Two peaks — one around 60 (green/trees) and one around 200 (blue/sky). A broad distribution around 25-40 corresponds to ground.
- **Saturation:** A peak near 150 (sky and trees are saturated) and values spread 30-80 (ground is less saturated).
- **Value:** Broadly distributed — sky is bright (200+), trees are moderate (100-150), ground varies (80-180).

Design a GMM-based segmentation system for this image. Your answer must address:

i. How many Gaussian components $g$ should be used and why?

[2 marks]

ii. What feature vector represents each pixel? Justify why HSV is better than RGB for this task.

[3 marks]

iii. Write the E-step formula and explain what it computes. Explain how initial parameters can be set from the histogram analysis above.

[5 marks]

iv. After EM converges, how is each pixel assigned to a class? Discuss one limitation of pixel-wise GMM segmentation and one way to address it.

[3 marks]

v. Compare GMM segmentation (soft assignment) with K-means segmentation (hard assignment) for this scene. Which is better for pixels at the boundary between trees and sky? Why?

[3 marks]

---

#### (b) Optical Flow Methods [14 marks]

> **Reference:** See Figure 4 in the 2020-2021 paper for the aperture problem illustration (opaque square moving to the top-right with three aperture positions (a), (b), (c)).

i. The brightness constancy assumption leads to the optical flow constraint equation:

$$I_x u + I_y v + I_t = 0$$

(A) Derive this equation starting from $I(x, y, t) = I(x+u, y+v, t+1)$ using a first-order Taylor expansion.

(B) Explain the **aperture problem**: why can't this single equation determine both $u$ and $v$?

[4 marks]

ii. Compare Lucas-Kanade and Horn-Schunck methods:

| Aspect | Lucas-Kanade | Horn-Schunck |
|--------|---|---|
| Scope | ? | ? |
| Output | ? | ? |
| Assumption | ? | ? |
| Handles boundaries | ? | ? |
| Iterative? | ? | ? |

Complete this table and explain why the $A^T A$ matrix in Lucas-Kanade has the same structure as the Harris corner detector matrix. What does this imply about where LK works best?

[5 marks]

iii. Lucas-Kanade fails for large motions. Explain the **multi-resolution pyramid** approach:
- How is the pyramid constructed?
- How is the flow estimated coarse-to-fine?
- Why does this overcome the small-motion assumption?

[3 marks]

iv. Give an example where optical flow exists but there is no actual motion, and an example where there is motion but no optical flow. Explain each.

[2 marks]

---

## END OF PAPER
