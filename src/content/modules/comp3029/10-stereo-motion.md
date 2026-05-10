---
title: "Stereo Vision & Motion"
order: 10
moduleTitle: "COMP3029 - Computer Vision"
tags: ["stereo", "disparity", "epipolar-geometry", "optical-flow", "motion-detection"]
---

## Overview

Stereo vision recovers depth from two views; motion analysis tracks changes across time (video frames).

## Stereo Correspondence

### Problem Statement

Given two images from different viewpoints, find corresponding points to triangulate 3D position.

### Geometry of Stereo

For a parallel camera setup (rectified stereo):

$$Z = \frac{f \cdot B}{d}$$

| Symbol | Meaning |
|--------|---------|
| $Z$ | Depth of point |
| $f$ | Focal length |
| $B$ | Baseline (distance between cameras) |
| $d$ | Disparity ($d = x_L - x_R$) |

Key insight: **depth is inversely proportional to disparity**.

### Disparity Map

| Property | Detail |
|----------|--------|
| Definition | Per-pixel horizontal displacement between left/right images |
| Large disparity | Close objects |
| Small disparity | Far objects |
| Zero disparity | Points at infinity |

## Epipolar Geometry

### Epipolar Constraint

For a point in one image, its correspondence in the other image must lie on a specific line (the **epipolar line**).

| Term | Definition |
|------|-----------|
| Epipole | Projection of one camera centre onto the other image |
| Epipolar line | Line in image 2 where correspondence of a point from image 1 must lie |
| Epipolar plane | Plane through 3D point and both camera centres |
| Baseline | Line connecting the two camera centres |

### Fundamental Matrix $F$

Encodes the epipolar geometry between two uncalibrated views:

$$\mathbf{p}_2^T F \mathbf{p}_1 = 0$$

| Property | Detail |
|----------|--------|
| Size | 3x3 |
| Rank | 2 (singular) |
| DoF | 7 |
| Estimation | 8-point algorithm (minimum 8 correspondences) |

### Essential Matrix $E$

For calibrated cameras: $E = K_2^T F K_1$

$$\mathbf{p}_2'^T E \mathbf{p}_1' = 0$$

where $\mathbf{p}'$ are normalised image coordinates. Contains only rotation and translation (5 DoF).

## Stereo Matching Methods

### Block Matching

| Step | Action |
|------|--------|
| 1 | For each pixel in left image, define a window |
| 2 | Search along epipolar line in right image |
| 3 | Find position with best match (min SSD or max NCC) |
| 4 | Disparity = horizontal offset of best match |

### Matching Costs

| Metric | Formula | Property |
|--------|---------|----------|
| SSD | $\sum(I_L - I_R)^2$ | Sensitive to illumination |
| SAD | $\sum|I_L - I_R|$ | Faster, less sensitive |
| NCC | Normalised cross-correlation | Illumination invariant |
| Census | Hamming distance of binary patterns | Robust to outliers |

### Challenges in Stereo Matching

| Challenge | Cause |
|-----------|-------|
| Occlusion | Regions visible in one view only |
| Textureless regions | No distinctive features to match |
| Repetitive patterns | Multiple possible matches |
| Reflective surfaces | Appearance changes with viewpoint |
| Depth discontinuities | Sharp changes cause artefacts |

## Optical Flow

### Definition

Optical flow is the apparent motion of pixels between consecutive frames:

$$\mathbf{v}(x,y) = (u(x,y), \; v(x,y))$$

where $(u, v)$ is the velocity (displacement) at pixel $(x,y)$.

### Brightness Constancy Assumption

$$I(x, y, t) = I(x + u, y + v, t + 1)$$

Taylor expansion yields the **optical flow constraint equation:**

$$I_x u + I_y v + I_t = 0$$

or equivalently: $\nabla I \cdot \mathbf{v} + I_t = 0$

**Problem:** One equation, two unknowns (aperture problem).

### Lucas-Kanade Method

Assumes flow is constant within a small window $W$:

$$\begin{bmatrix} u \\ v \end{bmatrix} = \begin{bmatrix} \sum I_x^2 & \sum I_x I_y \\ \sum I_x I_y & \sum I_y^2 \end{bmatrix}^{-1} \begin{bmatrix} -\sum I_x I_t \\ -\sum I_y I_t \end{bmatrix}$$

Note: The matrix is the same structure tensor $H$ from Harris corners -- well-conditioned at corners.

| Property | Detail |
|----------|--------|
| Assumption | Locally constant flow |
| Window size | Small (e.g., 5x5 to 15x15) |
| Best for | Small displacements, textured regions |
| Fails at | Large motions, textureless regions |

### Horn-Schunck Method

Global method with smoothness regularisation:

$$E = \iint \left[ (I_x u + I_y v + I_t)^2 + \alpha^2(\|\nabla u\|^2 + \|\nabla v\|^2) \right] dx\,dy$$

| Property | Detail |
|----------|--------|
| Produces | Dense flow field |
| Smoothness term | $\alpha$ controls regularisation strength |
| Solves | Aperture problem via global constraint |
| Limitation | Over-smooths at boundaries |

## Motion Detection

### Background Subtraction

| Method | Approach |
|--------|----------|
| Frame differencing | $|I(t) - I(t-1)| > T$ |
| Background modelling | Maintain model of static background, detect deviations |
| GMM background | Model each pixel as mixture of Gaussians |

### Applications of Motion Analysis

| Application | Method Used |
|-------------|------------|
| Video surveillance | Background subtraction |
| Autonomous driving | Dense optical flow, stereo |
| Action recognition | Flow features (e.g., two-stream networks) |
| Video stabilisation | Global motion estimation |
| 3D reconstruction | Structure from Motion (SfM) |

## Comparing Stereo and Motion

| Aspect | Stereo | Optical Flow |
|--------|--------|-------------|
| Input | Two simultaneous views | Two consecutive frames |
| Output | Depth/disparity map | Velocity field |
| Geometry | Epipolar constraint | Brightness constancy |
| Constraint | Spatial (two cameras) | Temporal (one camera, two times) |
| Shared problem | Correspondence | Correspondence |

<details><summary>Practice</summary>

1. A stereo system has baseline $B = 10$ cm and focal length $f = 500$ pixels. If disparity is 25 pixels, what is the depth?

2. Derive the optical flow constraint equation from the brightness constancy assumption using Taylor expansion.

3. Explain the aperture problem. Why can optical flow not be determined at an edge using a single constraint?

4. Why is the Lucas-Kanade method best suited to corners? (Hint: relate to the Harris matrix.)

5. In epipolar geometry, why does the fundamental matrix have rank 2?

</details>
