---
title: "Interactive Segmentation"
order: 9
moduleTitle: "COMP2032 - Image Processing"
tags: ["superpixels", "SLIC", "livewire", "grabcut", "graph-cut"]
---

## Superpixels (SLIC)

:::eli10

Superpixels are like grouping pixels into small tiles — kind of like a mosaic. Instead of dealing with millions of individual pixels, the computer groups nearby, similar-coloured pixels into a few hundred chunks. SLIC does this by placing evenly-spaced centre points and letting each centre gather nearby pixels that look similar to it.

:::

:::eli15

SLIC (Simple Linear Iterative Clustering) over-segments an image into compact, roughly uniform regions called superpixels. It's a modified K-means that considers both colour similarity and spatial proximity. You choose K superpixels; the algorithm places centres on a regular grid, then iteratively assigns pixels to the nearest centre (measured by a combined colour+spatial distance) and updates centres. The compactness parameter m controls the trade-off between colour adherence and spatial regularity. Superpixels greatly reduce computational complexity for subsequent processing while preserving boundaries.

:::

:::eli20

**Simple Linear Iterative Clustering** — groups pixels into compact, nearly uniform regions.

### Algorithm

| Step | Action |
|------|--------|
| 1 | Initialise $K$ centres on a grid with spacing $S = \sqrt{N/K}$ |
| 2 | Move centres to lowest-gradient position in 3×3 window |
| 3 | Assign pixels to nearest centre within $2S \times 2S$ window |
| 4 | Recompute centres |
| 5 | Repeat 3–4 until convergence |

### Distance Metric

Combines spatial and colour distance:

$$D = \sqrt{d_c^2 + \left(\frac{d_s}{S}\right)^2 \cdot m^2}$$

| Term | Meaning |
|------|---------|
| $d_c$ | Colour distance (in CIELAB) |
| $d_s$ | Spatial distance |
| $m$ | Compactness parameter (higher → more regular shapes) |
| $S$ | Grid spacing |

:::

## Livewire (Intelligent Scissors)

:::eli10

Livewire is like a smart lasso tool. You click on one point on the edge of an object, and the computer automatically finds the best path along the object's outline to your cursor. It follows the edges in the image like a train follows tracks — you just guide it from point to point.

:::

:::eli15

Livewire (Intelligent Scissors) is a semi-automatic boundary tracing tool. The user clicks a starting point, and the algorithm uses Dijkstra's shortest-path algorithm to find the lowest-cost path from that seed to every other pixel, where cost is low along strong edges. As the user moves their cursor, they see the optimal path snap to nearby edges in real time. Clicking sets the next anchor point, and the process continues until the boundary is complete. This combines human guidance with computational precision.

:::

:::eli20

User places points; algorithm finds optimal path between them along edges.

| Step | Action |
|------|--------|
| 1 | User clicks seed point |
| 2 | Dijkstra's algorithm finds shortest path from seed to all pixels |
| 3 | Path follows strong edges (low cost = high gradient) |
| 4 | User clicks next point → path snaps to boundary |

**Cost function**: Based on gradient magnitude, gradient direction, edge strength (low cost along edges).

:::

## Graph Cuts

:::eli10

Imagine connecting every pixel to its neighbours with elastic bands. Strong bands connect similar pixels. To separate the foreground from the background, you cut the bands — but you want to cut the weakest ones (where pixels are most different). Graph cuts find the best way to do this automatically.

:::

:::eli15

Graph cut segmentation models the image as a graph where pixels are nodes connected by edges weighted by similarity. Two special terminal nodes represent foreground and background. Finding the minimum cut (the partition that severs the least total weight) gives the optimal segmentation — it naturally cuts along boundaries where neighbouring pixels differ most. The max-flow/min-cut theorem guarantees finding the global optimum efficiently. This provides a principled framework for combining boundary information with region-based cues.

:::

:::eli20

Model image as a graph:
- **Nodes** = pixels
- **Edges** = connections between neighbours
- **Weights** = based on similarity (low weight = likely boundary)
- **Terminal nodes**: Source (foreground), Sink (background)

**Min-cut** = partition minimising total edge weight across the cut = optimal segmentation.

:::

## GrabCut

:::eli10

GrabCut is like telling the computer "the object I want is somewhere in this box I drew." The computer guesses which part inside the box is the object and which is background, then keeps improving its guess. You can help by marking bits it got wrong, and it tries again.

:::

:::eli15

GrabCut is an interactive segmentation method that combines graph cuts with iterative refinement. The user draws a bounding box around the object of interest. Everything outside is labelled background; inside is initially considered probable foreground. The algorithm builds Gaussian Mixture Models (GMMs) for foreground and background colours, performs a graph cut to optimise the segmentation, then updates the GMMs based on the new labelling. This iterates until convergence. The user can provide additional strokes to correct mistakes, making it practical and accurate.

:::

:::eli20

Interactive refinement of graph cuts:

| Step | Action |
|------|--------|
| 1 | User draws bounding box around object |
| 2 | Outside box → definite background |
| 3 | Inside box → probable foreground (initial estimate) |
| 4 | Build GMMs for foreground/background colours |
| 5 | Graph cut optimisation |
| 6 | Iterate: update GMMs → re-cut → repeat |

User can refine by marking definite foreground/background strokes.

:::

## Image Blending

:::eli10

After cutting out an object from one photo and pasting it into another, the edges usually look obvious and fake. Image blending is like smudging the seam so the two photos merge smoothly — it mixes them gradually at the boundary so you can't tell where one ends and the other begins.

:::

:::eli15

After segmenting and compositing images, hard boundaries look unnatural. Laplacian pyramid blending solves this by decomposing both images into multi-scale detail layers (Laplacian pyramids), blending them at each scale using a soft mask (Gaussian pyramid of the mask), then reconstructing. This achieves seamless transitions at boundaries — fine details blend locally while large-scale features remain distinct, avoiding both visible seams and ghosting artefacts.

:::

:::eli20

After segmentation, compositing requires blending at boundaries:

**Laplacian pyramid blending**:
1. Build Laplacian pyramids of both images
2. Build Gaussian pyramid of the mask
3. Blend at each level: $L_{blend} = L_A \cdot G_{mask} + L_B \cdot (1 - G_{mask})$
4. Reconstruct

:::

## Geometric Transformations

:::eli10

Geometric transformations are ways to move, rotate, resize, or warp an image. Translation slides it around. Rotation spins it. Scaling makes it bigger or smaller. More complex ones can stretch, skew, or change the perspective — like how a rectangle looks like a trapezoid when viewed at an angle.

:::

:::eli15

Geometric transformations change the spatial arrangement of pixels. They range from simple (translation: shift position; rotation: spin around a point) to complex (affine: allows shearing and non-uniform scaling while keeping parallel lines parallel; projective/homography: maps any quadrilateral to another, modelling perspective changes). Each transform has a certain number of degrees of freedom (DOF), and more complex transforms require more corresponding point pairs to determine. These are used for image alignment, panorama stitching, and augmented reality.

:::

:::eli20

| Transform | DOF | Preserves |
|-----------|-----|-----------|
| Translation | 2 | Shape, size, angles |
| Rotation | 1 | Shape, size |
| Scaling | 2 | Shape, angles |
| Affine | 6 | Parallel lines |
| Projective | 8 | Straight lines |

<details>
<summary>Practice: Why does SLIC search only within a 2S×2S window rather than the whole image?</summary>

Each superpixel has approximate size $S \times S$. A pixel cannot belong to a cluster whose centre is more than $2S$ away (given compactness). This reduces assignment from $O(NK)$ to $O(N)$.
</details>

<details>
<summary>Practice: What makes GrabCut better than a single graph cut?</summary>

GrabCut iteratively refines the foreground/background colour models (GMMs) based on the current segmentation, then re-optimises. This bootstrapping improves results vs. a single pass with a fixed model.
</details>

:::
