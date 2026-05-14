---
title: "Point Features"
order: 3
moduleTitle: "COMP3029 - Computer Vision"
tags: ["sift", "harris", "feature-matching", "scale-invariance", "keypoints"]
---

## Overview

:::eli10

Point features are special spots in an image that are easy to find again even if the picture is rotated, zoomed in, or taken from a different angle. Think of them as landmarks -- like a distinctive church steeple that you can always spot from any direction. The computer finds these special spots and creates a "description card" for each one so it can match them between different photos of the same scene.

:::

:::eli15

Point features (keypoints) are distinctive image locations that can be reliably detected across different views of the same scene. Each keypoint gets a descriptor -- a numerical vector summarising the local appearance. Good point features are invariant to scale, rotation, translation, and illumination changes. They enable applications like image stitching, object recognition, 3D reconstruction, and tracking by matching keypoints between images.

:::

:::eli20

Point features are distinctive image locations (keypoints) with associated descriptors, used for matching between views, tracking, and recognition.

**Desirable properties:** invariance to scale, translation, rotation, and illumination changes.

:::

## Harris Corner Detection

:::eli10

A corner is where two edges meet -- like the corner of a window in a photo. The Harris detector finds corners by checking: "If I slide a small window around this spot, does the image change a lot in every direction?" At a flat area nothing changes; at an edge it only changes one way; but at a corner it changes in all directions. Those are the points we want.

:::

:::eli15

The Harris corner detector identifies points where intensity changes significantly in all directions. It works by examining how the sum of squared differences (SSD) changes when a window is shifted. This is summarised by a 2x2 structure tensor whose eigenvalues reveal the local geometry: two large eigenvalues indicate a corner (high change in all directions), one large eigenvalue indicates an edge, and two small eigenvalues indicate a flat region. Harris corners are rotation-invariant but not scale-invariant.

:::

:::eli20

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

:::

## SIFT (Scale Invariant Feature Transform)

:::eli10

SIFT is a super-clever way to find and describe special points in an image that works even if the picture is zoomed in, rotated, or the lighting changes. It first finds interesting "blob" points at different zoom levels, then looks at the edge directions around each point to create a 128-number description card. Two photos of the same building can be matched by comparing these cards, even if one photo is taken close up and the other from far away.

:::

:::eli15

SIFT (Scale Invariant Feature Transform) detects keypoints that are invariant to scale, rotation, and illumination. It works in four stages: (1) find blob-like structures at multiple scales using Difference-of-Gaussians, (2) localise and filter keypoints to keep only stable corners, (3) assign a dominant orientation to each keypoint for rotation invariance, and (4) compute a 128-dimensional descriptor from local gradient histograms. SIFT features are highly distinctive and widely used for matching and recognition.

:::

:::eli20

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

:::

## Feature Matching

:::eli10

Once you have description cards for special points in two photos, you need to figure out which ones match. You compare each card from photo A against all cards in photo B and pick the closest match. But to avoid bad matches, you use a trick: only accept a match if the best match is much better than the second-best match. If they are too similar, it is probably a mistake.

:::

:::eli15

Feature matching connects keypoints between images by comparing their descriptors using Euclidean distance. The nearest-neighbour approach finds the closest descriptor in the second image for each descriptor in the first. Lowe's ratio test improves reliability by accepting a match only when the best match is significantly closer than the second-best (ratio < 0.8), filtering out ambiguous matches. RANSAC then removes remaining outliers by fitting a geometric model and keeping only consistent matches.

:::

:::eli20

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

:::

## Comparison of Point Feature Detectors

:::eli10

There are several methods for finding and describing special points. Harris is fast but cannot handle zoom changes. SIFT handles zoom and rotation but is slower. SURF is a faster version of SIFT. ORB is the fastest of all and uses simple binary codes instead of decimal numbers, making matching super quick.

:::

:::eli15

Different point feature methods trade off between speed, invariance properties, and descriptor type. Harris is fast but only detects corners (no scale invariance, no descriptor). SIFT is the gold standard for accuracy with full scale and rotation invariance but is moderately slow. SURF approximates SIFT more efficiently. ORB uses binary descriptors (256-bit) enabling extremely fast matching via Hamming distance, making it suitable for real-time applications on mobile devices.

:::

:::eli20

| Method | Speed | Scale Inv. | Rotation Inv. | Descriptor |
|--------|-------|-----------|---------------|------------|
| Harris | Fast | No | Yes | N/A (detector only) |
| SIFT | Moderate | Yes | Yes | 128-D float |
| SURF | Fast | Yes | Yes | 64-D float |
| ORB | Very fast | Yes | Yes | 256-bit binary |

:::

## Applications

:::eli10

Point features let computers do amazing things: stitch photos together into panoramas, recognise objects by matching to known examples, build 3D models from multiple photos, and help robots figure out where they are. Any time you need to find the same thing across different images, point features are the key tool.

:::

:::eli15

Point features enable numerous computer vision applications. Image stitching matches keypoints across overlapping photos to compute the transformation for panorama creation. Object recognition matches features against a database of known objects. 3D reconstruction uses correspondences across multiple views to triangulate 3D structure. Visual SLAM (Simultaneous Localisation and Mapping) uses feature tracking for real-time robot navigation.

:::

:::eli20

- Image stitching / panorama creation
- Object recognition (match to known templates)
- 3D reconstruction (multi-view geometry)
- Visual SLAM / localisation
- Tracking

:::

<details><summary>Practice</summary>

1. Given a 3x3 image patch, compute the structure tensor $H$ and determine if the centre pixel is a corner, edge, or flat region.

2. Why does SIFT use Difference of Gaussians rather than directly computing the Laplacian of Gaussian?

3. Explain why the ratio test is more effective than a simple distance threshold for feature matching.

4. How many iterations of RANSAC are needed to find a correct homography with probability 0.99 if 50% of matches are outliers?

</details>
