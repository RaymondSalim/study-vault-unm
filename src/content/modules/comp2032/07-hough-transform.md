---
title: "Hough Transform"
order: 7
moduleTitle: "COMP2032 - Image Processing"
tags: ["hough", "lines", "circles", "parameter-space"]
---

## The Problem

After edge detection, we have a set of edge points $(x_i, y_i)$. How do we find **lines** (or other geometric primitives) that pass through these points?

## Line Representations

| Form | Equation | Issue |
|------|----------|-------|
| Slope-intercept | $y = mx + c$ | Vertical lines → $m = \infty$ |
| Normal form | $x\cos\theta + y\sin\theta = \rho$ | Handles all orientations |

The Hough Transform uses **normal form**: $(\rho, \theta)$ parameterisation.

## The Hough Transform for Lines

### Key Insight

A point $(x_i, y_i)$ in image space corresponds to a **sinusoidal curve** in $(\rho, \theta)$ parameter space:

$$\rho = x_i \cos\theta + y_i \sin\theta$$

Points that are **collinear** produce curves that intersect at the same $(\rho, \theta)$.

### Algorithm

| Step | Action |
|------|--------|
| 1 | Quantise parameter space into accumulator array $A(\rho, \theta)$ |
| 2 | For each edge point $(x_i, y_i)$, compute $\rho$ for all $\theta$ values |
| 3 | Increment $A(\rho, \theta)$ for each computed pair |
| 4 | Find peaks in accumulator → these are detected lines |

### Parameters

| Parameter | Typical Range |
|-----------|---------------|
| $\theta$ | $[0°, 180°)$ |
| $\rho$ | $[-D, D]$ where $D = \sqrt{W^2 + H^2}$ (image diagonal) |
| Resolution | $\Delta\theta = 1°$, $\Delta\rho = 1$ pixel |

## Hough Transform for Circles

A circle with centre $(a, b)$ and radius $r$:

$$(x - a)^2 + (y - b)^2 = r^2$$

**3D parameter space**: $(a, b, r)$ — computationally expensive.

### If radius $r$ is known:

For each edge point $(x_i, y_i)$:
$$a = x_i - r\cos\theta, \quad b = y_i - r\sin\theta$$

Trace a circle in $(a, b)$ space. Accumulator peak = circle centre.

### Using gradient direction:

If edge direction is known, the centre lies along the gradient direction → reduces search from circle to line per edge point.

## Generalised Hough Transform

For arbitrary shapes: use an **R-table** built from a reference shape.

| Step | Action |
|------|--------|
| Build | For each boundary point, store displacement vector to reference point, indexed by gradient direction |
| Detect | For each edge point, look up gradient direction → vote for possible reference point locations |

## Practical Considerations

| Issue | Solution |
|-------|----------|
| Noise → spurious peaks | Threshold accumulator; require minimum votes |
| Quantisation → broad peaks | Use finer resolution or peak finding with interpolation |
| Computational cost (3D+) | Constrain parameters using gradient direction |
| Multiple shapes | Multiple accumulator peaks |

<details>
<summary>Practice: How many votes does a single edge point cast in line detection?</summary>

One vote for each quantised $\theta$ value. If $\theta$ ranges over 180 values, the point casts 180 votes (one sinusoidal curve through parameter space).
</details>

<details>
<summary>Practice: Why use normal form instead of y = mx + c?</summary>

Slope-intercept form cannot represent vertical lines ($m \to \infty$) and requires an unbounded parameter space. Normal form $(\rho, \theta)$ handles all orientations with bounded parameters.
</details>
