---
title: "3D Vision & Camera Models"
order: 9
moduleTitle: "COMP3029 - Computer Vision"
tags: ["projective-geometry", "camera-model", "homogeneous-coordinates", "calibration"]
---

## Overview

:::eli10

When you take a photo, a 3D world gets squished onto a flat 2D picture. Depth information is lost -- you cannot tell if something is a small object nearby or a big object far away. 3D vision tries to recover that lost depth information by understanding exactly how cameras turn 3D scenes into 2D images, using geometry and math.

:::

:::eli15

3D vision aims to recover three-dimensional scene structure from two-dimensional images. This requires modelling the image formation process: how 3D world points project onto 2D image pixels through a camera. The mathematical framework is projective geometry, which handles perspective effects (parallel lines converging, objects shrinking with distance). Understanding camera models and projection enables applications like 3D reconstruction, augmented reality, and autonomous navigation.

:::

:::eli20

3D vision recovers the three-dimensional structure of the world from 2D images. This requires understanding the geometry of image formation.

:::

## Projective Geometry

:::eli10

Normal geometry says parallel lines never meet. But in photos, railway tracks appear to meet in the distance! Projective geometry is a special kind of math that can handle this -- it adds "points at infinity" where parallel lines meet. It uses a trick called homogeneous coordinates where every point gets an extra number added to represent it, making many camera calculations much simpler.

:::

:::eli15

Projective geometry extends Euclidean geometry to handle perspective effects that occur in cameras. It introduces homogeneous coordinates: a 2D point (x,y) becomes a 3-vector (x,y,1), or equivalently any scalar multiple (wx,wy,w). This representation elegantly handles points at infinity (w=0) where parallel lines converge, makes all geometric transformations expressible as matrix multiplications, and provides simple formulas for line intersections and point-line relationships via cross products.

:::

:::eli20

### Why Projective Geometry?

Standard Euclidean geometry cannot handle:
- Parallel lines meeting at infinity (vanishing points)
- The projection from 3D to 2D (information loss)

Projective geometry provides the mathematical framework for perspective projection.

### Homogeneous Coordinates

A 2D point $(x, y)$ is represented as a 3-vector:

$$\mathbf{p} = \begin{bmatrix} x \\ y \\ 1 \end{bmatrix} \quad \text{or more generally} \quad \begin{bmatrix} wx \\ wy \\ w \end{bmatrix} \sim \begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$$

> **What it is:** Homogeneous coordinate representation of a 2D point.
> **What it does:** Adds an extra coordinate to enable all geometric transformations (including projection) as matrix multiplications. Any scalar multiple represents the same point (divide by $w$ to recover Euclidean coordinates).
> **Variables:** $(x,y)$ = Euclidean coordinates, $w$ = scale factor ($w=0$ represents a point at infinity / direction).

| Property | Euclidean | Homogeneous |
|----------|-----------|-------------|
| 2D point | $(x, y)$ | $(x, y, 1)^T$ or $(wx, wy, w)^T$ |
| 3D point | $(X, Y, Z)$ | $(X, Y, Z, 1)^T$ or $(wX, wY, wZ, w)^T$ |
| Line | $ax + by + c = 0$ | $\mathbf{l} = (a, b, c)^T$ |
| Point on line | -- | $\mathbf{l}^T \mathbf{p} = 0$ |
| Line through 2 points | -- | $\mathbf{l} = \mathbf{p}_1 \times \mathbf{p}_2$ |
| Intersection of 2 lines | -- | $\mathbf{p} = \mathbf{l}_1 \times \mathbf{l}_2$ |

### Points at Infinity

Parallel lines $\mathbf{l}_1 = (a, b, c_1)^T$ and $\mathbf{l}_2 = (a, b, c_2)^T$ intersect at:

$$\mathbf{p}_\infty = \mathbf{l}_1 \times \mathbf{l}_2 = (b, -a, 0)^T$$

> **What it does:** Cross product of two parallel lines yields their intersection — a point at infinity ($w=0$).
> **Variables:** $\mathbf{l}_1$, $\mathbf{l}_2$ = lines with same direction $(a,b)$ but different offsets $c_1$, $c_2$. The result $(b,-a,0)$ represents a direction, not a location — this is where parallel lines "meet" (vanishing point).

A point with $w = 0$ is a **point at infinity** (direction without position).

### Transformations in Homogeneous Coordinates

| Transform | DoF | Matrix Size | Preserves |
|-----------|-----|-------------|-----------|
| Translation | 2 | 3x3 | Orientation, shape, size |
| Euclidean (rigid) | 3 | 3x3 | Shape, size |
| Similarity | 4 | 3x3 | Shape (angles) |
| Affine | 6 | 3x3 | Parallelism |
| Projective (homography) | 8 | 3x3 | Straight lines |

### Homography

Maps points between two views of a planar surface:

$$\mathbf{p}' = H \mathbf{p}$$

> **What it is:** Projective transformation mapping between two images of a plane.
> **What it does:** Transforms pixel coordinates from one view to another for planar scenes. Used in panorama stitching and augmented reality.
> **Variables:** $\mathbf{p}$ = point in image 1 (homogeneous), $\mathbf{p}'$ = corresponding point in image 2, $H$ = 3×3 homography matrix (8 DoF — 9 entries minus 1 for scale). Requires 4 point correspondences (each gives 2 equations).

where $H$ is a 3x3 matrix with 8 DoF (defined up to scale). Requires 4 point correspondences to solve.

:::

## Camera Models

:::eli10

A camera works like a pinhole: light from the 3D world passes through a tiny hole and hits the sensor, creating an upside-down image. The most important thing that happens is that depth disappears -- far-away things look small and nearby things look big. The "camera model" is the math that describes exactly how a 3D point ends up at a specific pixel location, depending on the camera's lens (intrinsic) and position/angle (extrinsic).

:::

:::eli15

The pinhole camera model describes perspective projection: a 3D point (X,Y,Z) projects to pixel (u,v) by dividing by depth Z and scaling by focal length. The full projection is described by two sets of parameters: intrinsic parameters (focal length, principal point -- properties of the camera itself, 5 DoF) and extrinsic parameters (rotation and translation -- the camera's pose in the world, 6 DoF). Together these give 11 degrees of freedom, represented as a 3x4 projection matrix P = K[R|t].

:::

:::eli20

### Pinhole Camera Model

The simplest camera model -- perspective projection through a single point.

**From similar triangles:** $x/f = X/Z \implies x = fX/Z$

| Property | Detail |
|----------|--------|
| Aperture trade-off | Smaller aperture = sharper but less light; larger = brighter but blurry |
| Image inversion | Image is flipped (solved by placing image plane in front of centre) |
| Depth of field | Aperture size determines range of depths in focus |

$$\begin{bmatrix} u \\ v \\ 1 \end{bmatrix} \sim \begin{bmatrix} f_x & 0 & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} r_{11} & r_{12} & r_{13} & t_x \\ r_{21} & r_{22} & r_{23} & t_y \\ r_{31} & r_{32} & r_{33} & t_z \end{bmatrix} \begin{bmatrix} X \\ Y \\ Z \\ 1 \end{bmatrix}$$

$$\mathbf{p} = K [R | \mathbf{t}] \mathbf{P}$$

> **What it is:** The full pinhole camera projection equation.
> **What it does:** Maps a 3D world point $\mathbf{P} = (X,Y,Z,1)^T$ to 2D pixel coordinates $\mathbf{p} = (u,v,1)^T$.
> **Variables:** $K$ = 3×3 intrinsic matrix (camera-specific: focal lengths $f_x, f_y$, principal point $c_x, c_y$), $[R|\mathbf{t}]$ = 3×4 extrinsic matrix ($R$ = 3×3 rotation for camera orientation, $\mathbf{t}$ = translation for camera position), $\sim$ means equality up to scale (divide by third component to get pixel coords).

### Camera Parameters

| Type | Parameters | Matrix | DoF |
|------|-----------|--------|-----|
| **Intrinsic** | Focal length, principal point, skew | $K$ (3x3) | 5 |
| **Extrinsic** | Rotation, translation (camera pose) | $[R|\mathbf{t}]$ (3x4) | 6 |

### Intrinsic Matrix $K$

$$K = \begin{bmatrix} f_x & s & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix}$$

> **What it is:** Camera intrinsic matrix — encodes internal camera properties (fixed for a given camera/lens).
> **What it does:** Converts normalised camera coordinates to pixel coordinates.

| Parameter | Meaning |
|-----------|---------|
| $f_x, f_y$ | Focal length in pixel units (x and y). Converts physical distance to pixels. May differ for non-square pixels. |
| $c_x, c_y$ | Principal point — where the optical axis meets the image plane (roughly image centre). |
| $s$ | Skew — non-orthogonality of pixel axes (usually 0 for modern cameras). |

### Intrinsic Parameters Detail

| Parameter | Meaning | Notes |
|-----------|---------|-------|
| $f_x = f \cdot m_x$ | Focal length × pixels/mm (x) | DPI converts physical to pixel units |
| $f_y = f \cdot m_y$ | Focal length × pixels/mm (y) | May differ from $f_x$ for non-square pixels |
| $c_x, c_y$ | Principal point offset | Where optical axis meets image plane |
| $s$ | Skewness | 0 for modern cameras |
| **Total** | | **5 degrees of freedom** |

### Extrinsic Parameters

| Component | DoF | Role |
|-----------|-----|------|
| Rotation $R$ (3×3) | 3 | Camera orientation in world frame |
| Translation $\mathbf{t}$ (3×1) | 3 | Camera position in world frame |
| **Total** | **6** | Camera pose |

**Grand total:** 11 DoF (5 intrinsic + 6 extrinsic).

### 3D Rotation Matrices

$$R_x(\theta) = \begin{bmatrix} 1 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta \\ 0 & \sin\theta & \cos\theta \end{bmatrix}, \quad R_y(\theta) = \begin{bmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{bmatrix}, \quad R_z(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

> **What they are:** Elementary rotation matrices for rotation by angle $\theta$ around each axis.
> **Variables:** $\theta$ = rotation angle. Each matrix rotates around its labelled axis (the row/column that remains as identity). $R_x$ rotates in the YZ plane, $R_y$ in XZ, $R_z$ in XY.

Combined: $R = R_z R_y R_x$ (order matters). Note $R_y$ has a sign flip due to the right-hand rule.

Rotation = projecting point onto new coordinate axes: $P' = R^T P$ transforms from world to camera coordinates.

### Projection Equation

For a 3D point $(X, Y, Z)$ in camera coordinates:

$$u = f_x \frac{X}{Z} + c_x, \quad v = f_y \frac{Y}{Z} + c_y$$

> **What it does:** Converts a 3D point to pixel coordinates via perspective division.
> **Variables:** $(X,Y,Z)$ = 3D point in camera frame, $(u,v)$ = resulting pixel coordinates, $f_x, f_y$ = focal lengths in pixels, $c_x, c_y$ = principal point offset. Division by $Z$ is what causes perspective effects (far objects appear smaller).

Key property: **perspective projection divides by depth Z**.

### Camera Model Types

| Model | Condition | Simplification |
|-------|-----------|---------------|
| Perspective | Full model | $x = fX/Z$ (depth-dependent) |
| Weak perspective | Depth variation $\ll$ average depth | $x = (f/Z_0)X$ (constant scale) |
| Orthographic | Camera at infinity | $x = X$ (no magnification, parallel rays) |

:::

## Camera Calibration

:::eli10

Camera calibration is figuring out the exact settings of your camera (how zoomed in it is, where the centre of the image is, etc.) by taking pictures of a known pattern like a checkerboard. Since you know the exact real-world positions of the checkerboard corners, and you can see where they appear in the image, you can work backwards to calculate all the camera's internal settings.

:::

:::eli15

Camera calibration determines the intrinsic and extrinsic parameters from images of a known calibration target (typically a checkerboard). Zhang's method captures multiple views of a planar pattern, detects corner points, computes homographies between the pattern plane and each image, and extracts camera parameters from constraints these homographies impose. Real lenses also introduce radial and tangential distortion (straight lines become curved), which must be modelled and corrected for accurate measurements.

:::

:::eli20

### Purpose

Determine intrinsic and extrinsic parameters from known 3D-2D correspondences.

### Zhang's Method (Checkerboard)

| Step | Action |
|------|--------|
| 1 | Capture multiple images of planar calibration pattern |
| 2 | Detect corner points in each image |
| 3 | Compute homographies (pattern plane to image) |
| 4 | Extract intrinsic parameters from homography constraints |
| 5 | Extract extrinsic parameters per image |
| 6 | Refine all parameters via non-linear optimisation |

### Lens Distortion

Real lenses introduce distortion (not modelled by pinhole):

| Type | Effect | Formula | Description |
|------|--------|---------|-------------|
| Radial (barrel/pincushion) | Straight lines become curved | $r' = r(1 + k_1 r^2 + k_2 r^4)$ | $r$ = distance from principal point, $r'$ = distorted distance, $k_1, k_2$ = radial distortion coefficients. Positive $k_1$ = pincushion, negative = barrel. |
| Tangential | Asymmetric distortion | $p_1, p_2$ coefficients | Caused by lens elements not perfectly aligned. Usually small. |

:::

## Projection Properties

:::eli10

When a camera takes a picture, some properties of the 3D world are preserved and some are lost. Straight lines stay straight (a ruler still looks straight in a photo). But parallel lines appear to converge (like railway tracks), angles get distorted, and distances become unreliable (you cannot measure real-world size from a single photo because nearby things look bigger than far-away things).

:::

:::eli15

Perspective projection preserves straight lines (they remain straight in the image) but distorts many other properties. Parallel lines converge to vanishing points, angles are not preserved (rectangles become trapezoids), and distances become depth-dependent (objects at twice the distance appear half the size). Relative depth ordering is lost from a single view. These properties are fundamental constraints that both limit single-image inference and enable multi-view 3D reconstruction.

:::

:::eli20

| Property | In 3D | After Projection |
|----------|-------|------------------|
| Straight lines | Preserved | Still straight |
| Parallel lines | Parallel | Converge to vanishing point |
| Angles | Fixed | Not preserved |
| Distances | Fixed | Not preserved (depends on depth) |
| Relative depth | Clear | Lost (without stereo) |

:::

## Epipolar Geometry

:::eli10

When two cameras look at the same scene from different positions, there is a special geometric relationship between them. If you see a point in one camera's image, you cannot know exactly where it is in 3D (it could be anywhere along a line of sight). But in the second camera's image, that point MUST lie somewhere on a specific line called the "epipolar line." This narrows your search from the entire image to just one line.

:::

:::eli15

Epipolar geometry describes the geometric relationship between two views of the same scene. For any point in one image, its correspondence in the other image is constrained to lie on a specific line (the epipolar line), reducing the search from 2D to 1D. This constraint is encoded in the Fundamental matrix F (for uncalibrated cameras, 7 DoF) or Essential matrix E (for calibrated cameras, 5 DoF). Both matrices relate corresponding points via the equation p2^T F p1 = 0. Image rectification warps both images so that epipolar lines become horizontal scanlines.

:::

:::eli20

### Fundamentals

| Term | Definition |
|------|-----------|
| Epipolar plane | Plane through 3D point $P$ and both camera centres $O_1, O_2$ |
| Epipolar line | Intersection of epipolar plane with image plane |
| Epipole | Projection of one camera centre onto the other's image plane |
| Baseline | Line connecting the two camera centres |

All epipolar lines converge at the epipole. The epipolar constraint reduces correspondence search from 2D to 1D.

### Essential Matrix $E$

$$E = [\mathbf{t}]_\times R$$

> **What it is:** Encodes the geometric relationship between two calibrated camera views.
> **What it does:** Relates corresponding normalised image points. Contains only rotation and translation (no camera intrinsics).
> **Variables:** $[\mathbf{t}]_\times$ = 3×3 skew-symmetric matrix of translation vector $\mathbf{t}$ (encodes cross product as matrix multiplication), $R$ = rotation between cameras.

where $[\mathbf{t}]_\times$ is the skew-symmetric (cross-product) matrix of translation.

**Constraint:** $\mathbf{p}'^T E \mathbf{p} = 0$

| Property | Value |
|----------|-------|
| Size | 3×3 |
| Rank | 2 |
| DoF | 5 (3 rotation + 3 translation - 1 scale) |
| Assumes | Calibrated cameras ($K = I$) |

### Fundamental Matrix $F$

$$F = K'^{-T} E K^{-1} = K'^{-T} [\mathbf{t}]_\times R \, K^{-1}$$

> **What it is:** Relates corresponding pixel coordinates between two uncalibrated views.
> **What it does:** Encapsulates both camera intrinsics and relative pose. Given a point in image 1, $F\mathbf{p}_1$ gives the epipolar line in image 2 where the correspondence must lie.
> **Variables:** $K$, $K'$ = intrinsic matrices of cameras 1 and 2, $E$ = essential matrix (pure geometry), $F$ = fundamental matrix (includes calibration).

**Constraint:** $\mathbf{p}_2^T F \mathbf{p}_1 = 0$

| Property | Value |
|----------|-------|
| Size | 3×3 |
| Rank | 2 (must be enforced after estimation via SVD) |
| DoF | 7 (9 entries - 1 scale - 1 rank constraint) |
| Estimation | Eight-point algorithm (≥8 non-collinear correspondences) |

**Epipolar lines:** $F\mathbf{p}_1$ = epipolar line in image 2; $F^T\mathbf{p}_2$ = epipolar line in image 1.

### Special Case: Parallel Image Planes

When cameras have parallel image planes ($R = I$, $\mathbf{t} = (t_x, 0, 0)$):
- Epipoles are at infinity
- Epipolar lines become horizontal (parallel to x-axis)
- Corresponding points have **same y-coordinate**: $v = v'$
- This is the goal of **image rectification**

### Image Rectification

Transform both images so that epipolar lines become horizontal scanlines. After rectification, stereo correspondence reduces to a 1D search along each row.

:::

<details><summary>Practice</summary>

1. Convert the 2D point $(3, 4)$ to homogeneous coordinates. What 3D homogeneous vector is equivalent to $(6, 8, 2)^T$?

2. Find the intersection of lines $l_1 = (1, 0, -3)^T$ and $l_2 = (0, 1, -5)^T$ using the cross product.

3. A camera with $f = 500$ pixels and principal point $(320, 240)$ observes a point at $(1, 2, 5)$ in camera coordinates. What are the pixel coordinates?

4. How many point correspondences are needed to determine a homography? Why?

5. Explain why parallel railway tracks appear to converge in a photograph using projective geometry.

6. If the fundamental matrix $F$ is estimated via SVD and has singular values $(\sigma_1, \sigma_2, \sigma_3)$, what must be done to enforce the rank-2 constraint?

7. Explain why parallel image planes cause epipolar lines to be horizontal.

8. What is the relationship between $E$ and $F$? When would you use one vs. the other?

</details>
