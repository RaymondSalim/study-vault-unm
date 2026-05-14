---
title: "Point Features"
order: 3
moduleTitle: "COMP3029 - Computer Vision"
tags: ["sift", "harris", "feature-matching", "scale-invariance", "keypoints"]
---

## Overview

Point features are distinctive image locations (keypoints) with associated descriptors, used for matching between views, tracking, and recognition.

**Desirable properties:** invariance to scale, translation, rotation, and illumination changes.

## Harris Corner Detection

### Key Insight

A **corner** is a point where shifting a window in any direction causes a large intensity change (unlike flat regions or edges).

### Derivation

Sum of Squared Differences (SSD) for a shift $(u,v)$:

$$E(u,v) = \sum_{(x,y) \in W} [I(x+u, y+v) - I(x,y)]^2$$

Using Taylor expansion (small motion assumption):

$$E(u,v) \approx \begin{bmatrix} u & v \end{bmatrix} H \begin{bmatrix} u \\ v \end{bmatrix}$$

where the **structure tensor** (second moment matrix):

$$H = \sum_{(x,y) \in W} \begin{bmatrix} I_x^2 & I_x I_y \\ I_y I_x & I_y^2 \end{bmatrix}$$

### Eigenvalue Analysis

| Eigenvalues | Region Type |
|-------------|-------------|
| $\lambda_+$ small, $\lambda_-$ small | Flat region |
| $\lambda_+$ large, $\lambda_-$ small | Edge |
| $\lambda_+$ large, $\lambda_-$ large | **Corner** |

**Harris corner response:**

$$R = \lambda_+ \lambda_- - k(\lambda_+ + \lambda_-)^2 = \det(H) - k \cdot \text{trace}(H)^2$$

where $k \approx 0.04$--$0.06$. Corner if $R > $ threshold.

### Rotation Invariance

The dominant orientation is given by $\mathbf{x}_+$, the eigenvector of $H$ corresponding to the larger eigenvalue. Rotate the patch to a canonical orientation.

## SIFT (Scale Invariant Feature Transform)

Lowe 2004 -- over 31,000 citations. Provides invariance to scale, rotation, translation, and illumination.

### SIFT Pipeline

| Stage | Purpose | Method |
|-------|---------|--------|
| 1. Scale-space extrema | Find candidate keypoints | Difference of Gaussians (DoG) |
| 2. Keypoint localisation | Refine position, reject weak points | Sub-pixel interpolation, threshold |
| 3. Orientation assignment | Achieve rotation invariance | Gradient orientation histogram |
| 4. Keypoint descriptor | Create distinctive descriptor | 128-D histogram of gradients |

### Stage 1: Scale-Space Extrema Detection

**Scale space:** $L(x,y,\sigma) = G(x,y,\sigma) * I(x,y)$ — Gaussian convolution at different $\sigma$ highlights structures at different scales (small $\sigma$: fine details; large $\sigma$: coarse structures).

**Scale-normalised LoG:** $\sigma^2 \nabla^2 G$ detects blobs at their characteristic scale. Finding its extrema locates blob centres (more stable than zero-crossings).

**Key relationship** (Gaussian diffusion equation): $\frac{\partial G}{\partial \sigma} = \sigma \nabla^2 G$

**DoG approximation:** Taylor expand $G(\sigma + \Delta\sigma)$ with $\Delta\sigma = (k-1)\sigma$:

$$D(x,y,\sigma) = G(x,y,k\sigma) - G(x,y,\sigma) \approx (k-1) \sigma^2 \nabla^2 G$$

DoG is proportional to scale-normalised LoG — no extra convolutions needed, just subtract adjacent scale-space images.

**Octave implementation:**
- Within each octave: same resolution, $\sigma$ multiplied by $k = 2^{1/s}$ ($s$ scales per octave)
- Between octaves: downsample image by 2× (halve each dimension)
- Compare each point to **26 neighbours** (8 same scale + 9 above + 9 below)
- Extrema found within each octave, not across

### Stage 2: Keypoint Localisation

Filter extrema to keep only informative corner-like points:

**Error function** for a window at point $(x,y)$, moved by $(u,v)$:

$$E(u,v) = \sum_W [I(x+u, y+v) - I(x,y)]^2 \approx [u, v] \, H \, [u, v]^T$$

where $H$ is the structure tensor (Hessian):

$$H = \sum_W \begin{bmatrix} I_x^2 & I_x I_y \\ I_x I_y & I_y^2 \end{bmatrix}$$

**Eigenvalue analysis of $H$:**
- Both $\lambda$ large → corner (keep as keypoint)
- One large, one small → edge (reject)
- Both small → flat (reject)

Threshold: keep points where $\min(\lambda_1, \lambda_2) > T$.

### Stage 3: Orientation Assignment

- Compute gradient orientations in neighbourhood of keypoint
- Build histogram of orientations (36 bins, 0-360 degrees)
- Peak of histogram = dominant orientation
- All subsequent computations relative to this orientation

### Stage 4: SIFT Descriptor

| Step | Detail |
|------|--------|
| 1 | Take 16x16 window around keypoint |
| 2 | Divide into 4x4 grid of cells |
| 3 | Compute 8-bin orientation histogram per cell |
| 4 | Result: $4 \times 4 \times 8 = 128$ dimensions |
| 5 | Normalise to unit length |

### SIFT Properties

| Property | Detail |
|----------|--------|
| Descriptor length | 128 dimensions |
| Scale invariance | Via DoG scale-space |
| Rotation invariance | Via dominant orientation |
| Illumination robustness | Gradient-based + normalisation |
| Viewpoint tolerance | Up to ~60 degree out-of-plane rotation |

## Feature Matching

### Nearest-Neighbour Matching

For descriptor $d_A$ in image A, find closest descriptor $d_B$ in image B using Euclidean distance.

**Lowe's ratio test:** Accept match only if:

$$\frac{\|d_A - d_{B1}\|}{\|d_A - d_{B2}\|} < 0.8$$

where $d_{B1}$, $d_{B2}$ are the first and second nearest neighbours.

### RANSAC (Random Sample Consensus)

Robust estimation in the presence of outliers:

| Step | Action |
|------|--------|
| 1 | Randomly select minimum sample (e.g., 4 point pairs for homography) |
| 2 | Fit model to sample |
| 3 | Count inliers (points consistent with model within threshold) |
| 4 | Repeat for $N$ iterations |
| 5 | Select model with most inliers, refit using all inliers |

## Comparison of Point Feature Detectors

| Method | Speed | Scale Inv. | Rotation Inv. | Descriptor |
|--------|-------|-----------|---------------|------------|
| Harris | Fast | No | Yes | N/A (detector only) |
| SIFT | Moderate | Yes | Yes | 128-D float |
| SURF | Fast | Yes | Yes | 64-D float |
| ORB | Very fast | Yes | Yes | 256-bit binary |

## Applications

- Image stitching / panorama creation
- Object recognition (match to known templates)
- 3D reconstruction (multi-view geometry)
- Visual SLAM / localisation
- Tracking

<details><summary>Practice</summary>

1. Given a 3x3 image patch, compute the structure tensor $H$ and determine if the centre pixel is a corner, edge, or flat region.

2. Why does SIFT use Difference of Gaussians rather than directly computing the Laplacian of Gaussian?

3. Explain why the ratio test is more effective than a simple distance threshold for feature matching.

4. How many iterations of RANSAC are needed to find a correct homography with probability 0.99 if 50% of matches are outliers?

</details>
