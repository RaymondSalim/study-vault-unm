---
title: "Stereo Vision & Motion"
order: 10
moduleTitle: "COMP3029 - Computer Vision"
tags: ["stereo", "disparity", "epipolar-geometry", "optical-flow", "motion-detection"]
---

## Overview

:::eli10

Stereo vision is like how your two eyes give you depth perception. Two cameras take pictures from slightly different positions, and by comparing how much things shift between the two images (disparity), the computer can figure out how far away everything is. Motion analysis is about understanding movement in a video -- tracking how pixels move from one frame to the next.

:::

:::eli15

Stereo vision uses two cameras separated by a baseline to recover depth through triangulation. The key quantity is disparity -- the horizontal shift between corresponding points in the left and right images -- which is inversely proportional to depth. Motion analysis (optical flow) estimates per-pixel velocity between consecutive video frames, enabling motion detection, tracking, and video understanding. Both problems share the fundamental challenge of establishing pixel correspondences.

:::

:::eli20

Stereo vision recovers depth from two views; motion analysis tracks changes across time (video frames).

:::

## Stereo Correspondence

:::eli10

The tricky part of stereo vision is figuring out which pixel in the left image matches which pixel in the right image. Once you know the matches, depth is easy to calculate: things that shift a lot between the two images are close, and things that barely shift are far away. The formula is simple -- depth equals focal length times baseline divided by disparity.

:::

:::eli15

Stereo correspondence finds matching points between left and right images to compute disparity (and thus depth). For a rectified stereo pair, depth Z = f*B/d where f is focal length, B is baseline distance, and d is disparity (horizontal pixel shift). Large disparity means close objects; small disparity means distant objects. The main challenges are occlusions (regions visible in only one view), textureless areas (nothing distinctive to match), and repetitive patterns (ambiguous matches).

:::

:::eli20

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

:::

## Epipolar Geometry

:::eli10

Epipolar geometry is a rule that helps narrow down where to look for matches. If you see a point in the left image, its match in the right image must be somewhere on a specific horizontal line (after the images are rectified). Instead of searching the entire right image, you only need to search along one row -- much faster and less error-prone.

:::

:::eli15

Epipolar geometry constrains the stereo correspondence problem. For any point in one image, its match in the other must lie on the corresponding epipolar line (determined by the camera geometry). After rectification, epipolar lines become horizontal scanlines, so correspondence search reduces to a 1D search along each row. The Fundamental matrix F encodes this geometry for uncalibrated cameras (7 DoF, estimated from 8+ correspondences), while the Essential matrix E applies to calibrated cameras (5 DoF).

:::

:::eli20

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

:::

## Stereo Matching Methods

:::eli10

To find matching pixels between two images, the computer slides a small window along each row, comparing the left image patch against different positions in the right image. It picks the position where the patches look most similar. Bigger windows give smoother results but blur the edges of objects. Smaller windows are more precise at edges but noisier in plain areas.

:::

:::eli15

Stereo matching methods vary in complexity and quality. Block matching (local method) compares small image patches along epipolar lines using metrics like SSD or NCC -- simple and fast but struggles at boundaries and textureless areas. Window size presents a trade-off between noise robustness (large windows) and edge accuracy (small windows). Global methods formulate stereo as energy minimisation, combining a data term (matching cost) with a smoothness term (penalising disparity jumps), solved via graph cuts or dynamic programming for better results at higher computational cost.

:::

:::eli20

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

### Stereo Pipeline

| Step | Action |
|------|--------|
| 1 | **Calibrate** cameras (intrinsic + extrinsic parameters) |
| 2 | **Rectify** images (make epipolar lines horizontal) |
| 3 | **Find correspondence** (match pixels along scanlines) |
| 4 | **Compute depth** from disparity: $Z = fB/d$ |

### Window Size Trade-Off

| Small window | Large window |
|-------------|-------------|
| Better edge accuracy | Smoother in flat regions |
| Noisy in textureless areas | Blurs depth boundaries |
| Accuracy: ~half window size | Less affected by noise |

### Scan-Line Dynamic Programming

Formulate correspondence as optimal path through a cost matrix:

| Decision | Path direction | Meaning |
|----------|---------------|---------|
| Match | Diagonal | Left pixel matches right pixel |
| Left occlusion | Horizontal | No match in right image |
| Right occlusion | Vertical | No match in left image |

- Forward pass: accumulate costs cell by cell
- Backward pass: trace back optimal path
- **Ordering constraint:** generally preserved, but violated at narrow foreground objects

### Global Optimisation (Energy Minimisation)

Bayesian formulation: $P(d|I,I') \propto P(I,I'|d) \cdot P(d)$

Taking log: $E = E_\text{data} + E_\text{smoothness}$

$$E = \sum_i C(i, d_i) + \lambda \sum_{(i,j) \in \mathcal{N}} S(d_i, d_j)$$

- $C(i, d_i)$: matching cost at pixel $i$ with disparity $d_i$
- $S(d_i, d_j)$: penalises disparity discontinuities between neighbours
- Solved via graph cuts or belief propagation (MRF framework)

### 3D Cost Volume

| Dimension | Represents |
|-----------|-----------|
| Width ($W$) | Image x-coordinate |
| Height ($H$) | Image y-coordinate |
| Depth ($D$) | Possible disparity values |

Each entry stores the matching cost at $(x, y)$ for disparity $d$. Learning-based methods process this volume with 3D CNNs. For differentiable disparity output, use **soft-argmin** (weighted average using softmax of negative costs) instead of argmin.

### Scharstein & Szeliski (2002) Taxonomy

| Step | Description |
|------|-------------|
| 1 | Matching cost computation |
| 2 | Cost aggregation (over window/neighbourhood) |
| 3 | Disparity optimisation (WTA, DP, or global) |
| 4 | Disparity refinement (sub-pixel, consistency check) |

:::

## Optical Flow

:::eli10

Optical flow is about seeing movement. When you watch a video, things move between frames -- a ball flies to the right, a person walks forward. Optical flow calculates exactly how each pixel moved (direction and speed) from one frame to the next. It is like drawing tiny arrows on every pixel showing where it went. This helps computers understand motion, track objects, and detect activity.

:::

:::eli15

Optical flow estimates per-pixel motion (velocity) between consecutive video frames. It assumes brightness constancy -- a pixel's intensity stays the same as it moves. Taylor-expanding this assumption yields the optical flow constraint equation (one equation, two unknowns per pixel -- the aperture problem). Lucas-Kanade solves this locally by assuming constant flow within a window (works best at corners). Horn-Schunck solves globally with a smoothness regularisation. Multi-resolution pyramids handle large motions that violate the small-displacement assumption.

:::

:::eli20

### Definition

Optical flow is the apparent motion of pixels between consecutive frames:

$$\mathbf{v}(x,y) = (u(x,y), \; v(x,y))$$

where $(u, v)$ is the velocity (displacement) at pixel $(x,y)$.

### Optical Flow vs Motion Field

| | Optical Flow | Motion Field |
|---|---|---|
| Definition | Apparent motion of brightness patterns | True 3D motion projected onto image |
| Same? | NOT the same! | |
| Example 1 | Rotating uniform sphere under constant light = motion but NO optical flow | |
| Example 2 | Static sphere with moving light = optical flow but NO motion | |

### Brightness Constancy Assumption

$$I(x, y, t) = I(x + u, y + v, t + 1)$$

Taylor expansion yields the **optical flow constraint equation:**

$$I_x u + I_y v + I_t = 0$$

or equivalently: $\nabla I \cdot \mathbf{v} + I_t = 0$

**Problem:** One equation, two unknowns (aperture problem).

### Aperture Problem

Through a small aperture, only motion **perpendicular to edges** (along gradient direction) can be perceived. Motion parallel to edges is invisible. Additional constraints are needed.

### Lucas-Kanade Method

Assumes flow is constant within a small window $W$:

$$\begin{bmatrix} u \\ v \end{bmatrix} = \begin{bmatrix} \sum I_x^2 & \sum I_x I_y \\ \sum I_x I_y & \sum I_y^2 \end{bmatrix}^{-1} \begin{bmatrix} -\sum I_x I_t \\ -\sum I_y I_t \end{bmatrix}$$

Note: The matrix is the same structure tensor $H$ from Harris corners -- well-conditioned at corners.

Overconstrained system: $N$ pixels in window give $N$ equations for 2 unknowns. Least-squares solution: $\mathbf{d} = (A^T A)^{-1} A^T \mathbf{b}$ where $A$ has rows $[I_x, I_y]$ and $\mathbf{b} = -I_t$.

| Property | Detail |
|----------|--------|
| Assumption | Locally constant flow |
| Window size | Small (e.g., 5x5 to 15x15) |
| Best for | Small displacements, textured regions |
| Properties | Local, non-iterative, fast, errors don't propagate |
| Fails at | Large motions, textureless regions, motion boundaries |

### Horn-Schunck vs Lucas-Kanade

| Aspect | Horn-Schunck | Lucas-Kanade |
|--------|-------------|-------------|
| Scope | Global (all pixels) | Local (per window) |
| Output | Dense flow | Sparse (or dense with pyramid) |
| Iterative? | Yes | No (direct solve) |
| Error propagation | Errors propagate globally | Errors stay local |
| Boundaries | Over-smooths | Errors at boundaries |
| Speed | Slow (many iterations) | Fast |

### Multi-Resolution / Gaussian Pyramid

Large motions violate the Taylor linearisation assumption. Solution:

| Step | Action |
|------|--------|
| 1 | Build image pyramid (downsample by 2× at each level) |
| 2 | At coarsest level: solve for flow (motion is small) |
| 3 | Upsample flow × 2, warp finer level image |
| 4 | Solve for residual flow at finer level |
| 5 | Repeat until original resolution |

Enables handling of motions larger than a few pixels.

### Horn-Schunck Method

Global method with smoothness regularisation:

$$E = \sum_\text{pixels} \left[ (I_x u + I_y v + I_t)^2 + \lambda\left((u - \bar{u})^2 + (v - \bar{v})^2\right) \right]$$

**Iterative solution** (Gauss-Seidel/Jacobi):

$$u = \bar{u} - \frac{I_x(I_x \bar{u} + I_y \bar{v} + I_t)}{\lambda + I_x^2 + I_y^2}$$
$$v = \bar{v} - \frac{I_y(I_x \bar{u} + I_y \bar{v} + I_t)}{\lambda + I_x^2 + I_y^2}$$

where $\bar{u}, \bar{v}$ are neighbourhood averages of flow.

| Property | Detail |
|----------|--------|
| Produces | Dense flow field |
| $\lambda$ | Balances data fidelity vs. smoothness (higher = trust data more) |
| Solves | Aperture problem via global smoothness constraint |
| Properties | Global, iterative, errors propagate across image |
| Limitation | Over-smooths at motion boundaries |

:::

## Motion Detection

:::eli10

Motion detection figures out what is moving in a video. The simplest way is to remember what the background looks like (when nothing is moving) and then highlight anything that looks different. If a pixel's colour suddenly changes a lot, something probably moved there. This is how security cameras detect intruders -- they learn the normal background and flag anything unusual.

:::

:::eli15

Motion detection identifies moving objects by distinguishing them from the static background. Frame differencing (comparing consecutive frames) is the simplest approach but struggles with slow motion and static parts of moving objects. Background modelling builds a statistical model (Gaussian or GMM) of each pixel's normal appearance, flagging pixels that deviate significantly as foreground. GMM backgrounds can handle dynamic scenes (waving trees, water) by modelling multiple modes per pixel.

:::

:::eli20

### Background Subtraction

| Method | Approach |
|--------|----------|
| Frame differencing | $|I(t) - I(t-1)| > T$ |
| Background modelling | Per-pixel Gaussian: $P(x|\theta) = \mathcal{N}(\mu, \sigma^2)$ |
| GMM background | Model each pixel as mixture of Gaussians (handles dynamic backgrounds) |

**Gaussian background model:** Estimate $\mu$ and $\sigma$ from multiple background frames. Foreground pixels: $P(x|\text{background}) < \text{threshold}$.

### Applications of Motion Analysis

| Application | Method Used |
|-------------|------------|
| Video surveillance | Background subtraction |
| Autonomous driving | Dense optical flow, stereo |
| Action recognition | Flow features (e.g., two-stream networks) |
| Video stabilisation | Global motion estimation |
| 3D reconstruction | Structure from Motion (SfM) |

:::

## Comparing Stereo and Motion

:::eli10

Stereo and optical flow are related problems but work differently. Stereo uses two cameras at the same time to find depth (how far away things are). Optical flow uses one camera at two different times to find motion (how things are moving). Both solve the same puzzle of matching points between two images -- stereo matches across space, flow matches across time.

:::

:::eli15

Stereo vision and optical flow are dual problems sharing the fundamental correspondence challenge. Stereo uses spatial displacement between simultaneous views to recover depth via the epipolar constraint. Optical flow uses temporal displacement between consecutive frames to recover velocity via brightness constancy. Both produce dense per-pixel maps (disparity/velocity), both struggle with occlusion and textureless regions, and both benefit from similar algorithmic approaches (local matching, global energy minimisation, deep learning).

:::

:::eli20

| Aspect | Stereo | Optical Flow |
|--------|--------|-------------|
| Input | Two simultaneous views | Two consecutive frames |
| Output | Depth/disparity map | Velocity field |
| Geometry | Epipolar constraint | Brightness constancy |
| Constraint | Spatial (two cameras) | Temporal (one camera, two times) |
| Shared problem | Correspondence | Correspondence |

:::

<details><summary>Practice</summary>

1. A stereo system has baseline $B = 10$ cm and focal length $f = 500$ pixels. If disparity is 25 pixels, what is the depth?

2. Derive the optical flow constraint equation from the brightness constancy assumption using Taylor expansion.

3. Explain the aperture problem. Why can optical flow not be determined at an edge using a single constraint?

4. Why is the Lucas-Kanade method best suited to corners? (Hint: relate to the Harris matrix.)

5. In epipolar geometry, why does the fundamental matrix have rank 2?

</details>
