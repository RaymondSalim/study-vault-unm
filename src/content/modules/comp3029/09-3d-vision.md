---
title: "3D Vision & Camera Models"
order: 9
moduleTitle: "COMP3029 - Computer Vision"
tags: ["projective-geometry", "camera-model", "homogeneous-coordinates", "calibration"]
---

## Overview

3D vision recovers the three-dimensional structure of the world from 2D images. This requires understanding the geometry of image formation.

## Projective Geometry

### Why Projective Geometry?

Standard Euclidean geometry cannot handle:
- Parallel lines meeting at infinity (vanishing points)
- The projection from 3D to 2D (information loss)

Projective geometry provides the mathematical framework for perspective projection.

### Homogeneous Coordinates

A 2D point $(x, y)$ is represented as a 3-vector:

$$\mathbf{p} = \begin{bmatrix} x \\ y \\ 1 \end{bmatrix} \quad \text{or more generally} \quad \begin{bmatrix} wx \\ wy \\ w \end{bmatrix} \sim \begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$$

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

where $H$ is a 3x3 matrix with 8 DoF (defined up to scale). Requires 4 point correspondences to solve.

## Camera Models

### Pinhole Camera Model

The simplest camera model -- perspective projection through a single point.

$$\begin{bmatrix} u \\ v \\ 1 \end{bmatrix} \sim \begin{bmatrix} f_x & 0 & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} r_{11} & r_{12} & r_{13} & t_x \\ r_{21} & r_{22} & r_{23} & t_y \\ r_{31} & r_{32} & r_{33} & t_z \end{bmatrix} \begin{bmatrix} X \\ Y \\ Z \\ 1 \end{bmatrix}$$

$$\mathbf{p} = K [R | \mathbf{t}] \mathbf{P}$$

### Camera Parameters

| Type | Parameters | Matrix | DoF |
|------|-----------|--------|-----|
| **Intrinsic** | Focal length, principal point, skew | $K$ (3x3) | 5 |
| **Extrinsic** | Rotation, translation (camera pose) | $[R|\mathbf{t}]$ (3x4) | 6 |

### Intrinsic Matrix $K$

$$K = \begin{bmatrix} f_x & s & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix}$$

| Parameter | Meaning |
|-----------|---------|
| $f_x, f_y$ | Focal length in pixel units (x and y) |
| $c_x, c_y$ | Principal point (where optical axis meets image plane) |
| $s$ | Skew (usually 0) |

### Projection Equation

For a 3D point $(X, Y, Z)$ in camera coordinates:

$$u = f_x \frac{X}{Z} + c_x, \quad v = f_y \frac{Y}{Z} + c_y$$

Key property: **perspective projection divides by depth Z**.

## Camera Calibration

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

| Type | Effect | Formula |
|------|--------|---------|
| Radial (barrel/pincushion) | Straight lines become curved | $r' = r(1 + k_1 r^2 + k_2 r^4)$ |
| Tangential | Asymmetric distortion | $p_1, p_2$ coefficients |

## Projection Properties

| Property | In 3D | After Projection |
|----------|-------|------------------|
| Straight lines | Preserved | Still straight |
| Parallel lines | Parallel | Converge to vanishing point |
| Angles | Fixed | Not preserved |
| Distances | Fixed | Not preserved (depends on depth) |
| Relative depth | Clear | Lost (without stereo) |

<details><summary>Practice</summary>

1. Convert the 2D point $(3, 4)$ to homogeneous coordinates. What 3D homogeneous vector is equivalent to $(6, 8, 2)^T$?

2. Find the intersection of lines $l_1 = (1, 0, -3)^T$ and $l_2 = (0, 1, -5)^T$ using the cross product.

3. A camera with $f = 500$ pixels and principal point $(320, 240)$ observes a point at $(1, 2, 5)$ in camera coordinates. What are the pixel coordinates?

4. How many point correspondences are needed to determine a homography? Why?

5. Explain why parallel railway tracks appear to converge in a photograph using projective geometry.

</details>
