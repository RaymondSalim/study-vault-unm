---
title: "Segmentation"
order: 8
moduleTitle: "COMP2032 - Image Processing"
tags: ["segmentation", "region-growing", "clustering", "watershed"]
---

## What is Segmentation?

Partitioning an image into meaningful regions based on pixel properties (intensity, colour, texture).

### Approaches Overview

| Approach | Strategy | Example |
|----------|----------|---------|
| Clustering | Group similar pixels (ignores spatial position) | K-means |
| Region-based | Grow/merge/split regions based on homogeneity | Region growing |
| Edge-based | Find boundaries then fill regions | Watershed |
| Graph-based | Model image as graph, find optimal cuts | Normalised cuts |

## Region-Based Segmentation

### Region Growing

| Step | Action |
|------|--------|
| 1 | Select seed pixel(s) |
| 2 | Check neighbours: if similar (within threshold), add to region |
| 3 | Repeat until no more pixels can be added |
| 4 | Select new seed for next region |

**Similarity criteria**: intensity difference, colour distance, texture similarity.

### Split and Merge

1. **Split**: If a region is not homogeneous, divide into 4 quadrants
2. **Merge**: If adjacent regions are similar, merge them
3. Repeat until stable

Uses a **quadtree** data structure.

## Clustering: K-Means

Treats each pixel as a data point in feature space (e.g., RGB or intensity).

| Step | Action |
|------|--------|
| 1 | Initialise $K$ cluster centres randomly |
| 2 | Assign each pixel to nearest centre |
| 3 | Recompute centres as mean of assigned pixels |
| 4 | Repeat 2–3 until convergence |

**Limitation**: Must specify $K$; sensitive to initialisation; ignores spatial proximity.

## Edge-Based: Watershed

Treats gradient magnitude as a topographic surface:

| Concept | Analogy |
|---------|---------|
| Catchment basin | Region that drains to one minimum |
| Watershed line | Ridge between basins (= boundary) |
| Flooding | Simulate water rising from minima |

**Problem**: Over-segmentation (too many basins due to noise).

**Solution**: Use markers — specify foreground/background seeds; restrict flooding.

## Evaluation

| Metric | Measures |
|--------|----------|
| Under-segmentation | Regions too large, crossing object boundaries |
| Over-segmentation | Too many small regions |
| Boundary accuracy | How well segments align with true edges |

<details>
<summary>Practice: Why does K-means segmentation often fail on images with overlapping intensity distributions?</summary>

K-means assigns each pixel to the nearest cluster centre based on distance in feature space. If two objects have overlapping intensity ranges, their pixels will be mixed between clusters. K-means cannot exploit spatial contiguity.
</details>

<details>
<summary>Practice: What causes watershed over-segmentation and how is it fixed?</summary>

Every local minimum in the gradient image creates a catchment basin. Noise creates many spurious minima. Fix: use marker-based watershed where only pre-specified seeds (markers) generate basins.
</details>
