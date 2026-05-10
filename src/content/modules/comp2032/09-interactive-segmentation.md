---
title: "Interactive Segmentation"
order: 9
moduleTitle: "COMP2032 - Image Processing"
tags: ["superpixels", "SLIC", "livewire", "grabcut", "graph-cut"]
---

## Superpixels (SLIC)

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

## Livewire (Intelligent Scissors)

User places points; algorithm finds optimal path between them along edges.

| Step | Action |
|------|--------|
| 1 | User clicks seed point |
| 2 | Dijkstra's algorithm finds shortest path from seed to all pixels |
| 3 | Path follows strong edges (low cost = high gradient) |
| 4 | User clicks next point → path snaps to boundary |

**Cost function**: Based on gradient magnitude, gradient direction, edge strength (low cost along edges).

## Graph Cuts

Model image as a graph:
- **Nodes** = pixels
- **Edges** = connections between neighbours
- **Weights** = based on similarity (low weight = likely boundary)
- **Terminal nodes**: Source (foreground), Sink (background)

**Min-cut** = partition minimising total edge weight across the cut = optimal segmentation.

## GrabCut

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

## Image Blending

After segmentation, compositing requires blending at boundaries:

**Laplacian pyramid blending**:
1. Build Laplacian pyramids of both images
2. Build Gaussian pyramid of the mask
3. Blend at each level: $L_{blend} = L_A \cdot G_{mask} + L_B \cdot (1 - G_{mask})$
4. Reconstruct

## Geometric Transformations

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
