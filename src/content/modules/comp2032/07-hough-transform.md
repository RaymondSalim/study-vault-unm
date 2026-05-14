---
title: "Hough Transform"
order: 7
moduleTitle: "COMP2032 - Image Processing"
tags: ["hough", "lines", "circles", "parameter-space"]
---

## The Problem

:::eli10

After finding edges in an image, you have a bunch of scattered dots. But you want to know if those dots form a straight line or a circle. The Hough Transform is like a voting system — each dot "votes" for all the lines it could belong to, and the line with the most votes wins.

:::

:::eli15

Edge detection gives you a set of edge points, but you need to know which points belong together as lines or circles. Directly checking all possible groupings is impractical. The Hough Transform cleverly converts this from an image-space problem to a parameter-space problem: each edge point votes for all shapes it could be part of, and true shapes accumulate many votes. This makes it robust to gaps and noise in edges.

:::

:::eli20

After edge detection, we have a set of edge points $(x_i, y_i)$. How do we find **lines** (or other geometric primitives) that pass through these points?

:::

## Line Representations

:::eli10

There are different ways to describe a line mathematically. The simplest (y = mx + c) breaks for vertical lines. Instead, we use a form that describes any line by its angle and its distance from the origin — like saying "the line is 30 degrees tilted and 50 pixels away from the corner."

:::

:::eli15

Lines can be represented as y = mx + c (slope-intercept) but this fails for vertical lines where the slope is infinite. The normal form uses two parameters: rho (the perpendicular distance from the origin to the line) and theta (the angle of that perpendicular). This representation handles all orientations with bounded, finite parameter values, making it ideal for the Hough Transform accumulator.

:::

:::eli20

| Form | Equation | Issue |
|------|----------|-------|
| Slope-intercept | $y = mx + c$ | Vertical lines → $m = \infty$ |
| Normal form | $x\cos\theta + y\sin\theta = \rho$ | Handles all orientations |

The Hough Transform uses **normal form**: $(\rho, \theta)$ parameterisation.

:::

## The Hough Transform for Lines

:::eli10

Each edge dot draws a wavy curve in a "voting space." Where multiple curves cross at the same point, that means those dots all lie on the same line. The more curves that cross, the more confident you are that a real line exists there. It's like finding the most popular answer in a survey.

:::

:::eli15

The Hough Transform maps each edge point to a curve in parameter space (rho, theta). A point (x,y) maps to a sinusoidal curve representing all possible lines through that point. When multiple points are collinear, their curves all intersect at the same (rho, theta) — creating a peak in the accumulator. The algorithm: (1) create a 2D vote grid over rho and theta, (2) for each edge point trace its curve and increment votes along it, (3) find peaks in the grid — these correspond to detected lines.

:::

:::eli20

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

:::

## Hough Transform for Circles

:::eli10

Finding circles works the same way as lines, but now you're voting for centre positions and circle sizes. If you already know how big the circle is, it's easier — each edge point votes for where the centre could be, forming a ring of votes. The real centre gets the most votes from all the edge points around it.

:::

:::eli15

For circles, the parameter space is 3D: centre coordinates (a, b) and radius r. Each edge point votes for all circles it could lie on — tracing a cone in (a, b, r) space. If the radius is known, the problem reduces to 2D: each edge point traces a circle of that radius in (a, b) space, and the peak corresponds to the actual centre. Using the gradient direction at each edge point further constrains the vote to a line rather than a full circle, greatly reducing computation.

:::

:::eli20

A circle with centre $(a, b)$ and radius $r$:

$$(x - a)^2 + (y - b)^2 = r^2$$

**3D parameter space**: $(a, b, r)$ — computationally expensive.

### If radius $r$ is known:

For each edge point $(x_i, y_i)$:
$$a = x_i - r\cos\theta, \quad b = y_i - r\sin\theta$$

Trace a circle in $(a, b)$ space. Accumulator peak = circle centre.

### Using gradient direction:

If edge direction is known, the centre lies along the gradient direction → reduces search from circle to line per edge point.

:::

## Generalised Hough Transform

:::eli10

The generalised Hough Transform can find any shape — not just lines and circles. You first teach it what the shape looks like by creating a lookup table. Then when it sees edge points in a new image, it uses the table to vote for where that shape might be. It's like having a wanted poster and searching a crowd.

:::

:::eli15

The Generalised Hough Transform extends the method to arbitrary shapes using a reference table (R-table). In a training phase, you record displacement vectors from each boundary point to a reference point (e.g., the shape's centre), indexed by the local gradient direction. During detection, each edge point's gradient direction is used to look up possible reference point locations and cast votes. Peaks in the accumulator indicate where instances of the learned shape appear.

:::

:::eli20

For arbitrary shapes: use an **R-table** built from a reference shape.

| Step | Action |
|------|--------|
| Build | For each boundary point, store displacement vector to reference point, indexed by gradient direction |
| Detect | For each edge point, look up gradient direction → vote for possible reference point locations |

:::

## Practical Considerations

:::eli10

The Hough Transform can get confused by noise (random dots voting for non-existent shapes) and can be slow when looking for shapes with many parameters. Solutions include requiring a minimum number of votes and using edge direction to reduce the number of votes each point needs to cast.

:::

:::eli15

Practical challenges with the Hough Transform include: noise causing spurious peaks (solved by setting a minimum vote threshold), quantisation causing broad or split peaks (solved by finer resolution or interpolation), and high computational cost for shapes with more parameters (solved by constraining parameters using gradient direction or other prior knowledge). Despite these issues, the Hough Transform is robust to partial occlusion and gaps in edges — major advantages over methods that require continuous contours.

:::

:::eli20

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

:::
