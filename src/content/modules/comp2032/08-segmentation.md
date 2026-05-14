---
title: "Segmentation"
order: 8
moduleTitle: "COMP2032 - Image Processing"
tags: ["segmentation", "region-growing", "clustering", "watershed"]
---

## What is Segmentation?

:::eli10

Segmentation is like using scissors to cut out different objects from a photo. The computer divides the picture into separate pieces — the sky, the grass, a person, a car — so it knows where each thing is. There are different strategies: grouping similar colours together, growing outward from a starting point, or finding the outlines and filling them in.

:::

:::eli15

Image segmentation partitions an image into distinct regions that correspond to objects or meaningful areas. The main approaches are: clustering (group pixels with similar colour/intensity regardless of position), region-based (start from seeds and grow outward while pixels remain similar), edge-based (find boundaries and use them to define regions), and graph-based (treat the image as a network and find optimal divisions). The choice depends on the application and image characteristics.

:::

:::eli20

Partitioning an image into meaningful regions based on pixel properties (intensity, colour, texture).

### Approaches Overview

| Approach | Strategy | Example |
|----------|----------|---------|
| Clustering | Group similar pixels (ignores spatial position) | K-means |
| Region-based | Grow/merge/split regions based on homogeneity | Region growing |
| Edge-based | Find boundaries then fill regions | Watershed |
| Graph-based | Model image as graph, find optimal cuts | Normalised cuts |

:::

## Region-Based Segmentation

:::eli10

Region growing is like a paint bucket tool in a drawing app. You click on one spot, and the colour spreads to all similar-looking neighbours, stopping when it hits an edge or something that looks different. Split-and-merge is the opposite approach: start with the whole image, chop up areas that aren't uniform, and glue together areas that match.

:::

:::eli15

Region growing starts from one or more seed pixels and iteratively adds neighbouring pixels that are sufficiently similar (e.g., within a threshold of the region's mean intensity). It stops when no more pixels qualify. The result depends heavily on seed selection and the similarity threshold. Split-and-merge takes a top-down approach: it recursively divides non-homogeneous regions into quadrants (split), then merges adjacent regions that are similar enough (merge), using a quadtree structure.

:::

:::eli20

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

:::

## Clustering: K-Means

:::eli10

K-means is like sorting a bag of mixed sweets into K piles by colour. You start with K random "example" sweets, then each sweet joins the pile whose example it looks most like. After sorting, you pick a new example from the middle of each pile and re-sort. You repeat until the piles stop changing.

:::

:::eli15

K-means clustering treats each pixel as a point in feature space (e.g., its RGB values) and groups all pixels into K clusters. The algorithm randomly initialises K centres, assigns each pixel to its nearest centre, recomputes the centres as the mean of each cluster, and repeats until stable. It's simple and fast, but you must choose K in advance, results depend on random initialisation, and it completely ignores spatial position — so two far-apart pixels with the same colour end up in the same segment.

:::

:::eli20

Treats each pixel as a data point in feature space (e.g., RGB or intensity).

| Step | Action |
|------|--------|
| 1 | Initialise $K$ cluster centres randomly |
| 2 | Assign each pixel to nearest centre |
| 3 | Recompute centres as mean of assigned pixels |
| 4 | Repeat 2–3 until convergence |

**Limitation**: Must specify $K$; sensitive to initialisation; ignores spatial proximity.

:::

## Edge-Based: Watershed

:::eli10

Imagine the image is a landscape with hills and valleys. Now imagine rain falling on it — water collects in pools at the bottom of each valley. The ridges between pools are the boundaries between regions. That's the watershed method! The problem is that noise creates lots of tiny "valleys," so you get too many regions — which is fixed by pre-marking which valleys actually matter.

:::

:::eli15

The watershed algorithm treats the gradient magnitude image as a topographic surface and simulates flooding from local minima. Each "catchment basin" (the area draining to one minimum) becomes a segment, and the ridges between basins become boundaries. The main problem is over-segmentation: noise in the gradient image creates many small basins. This is solved using marker-based watershed, where you specify seed markers for foreground and background — only these seeds create basins, dramatically reducing false regions.

:::

:::eli20

Treats gradient magnitude as a topographic surface:

| Concept | Analogy |
|---------|---------|
| Catchment basin | Region that drains to one minimum |
| Watershed line | Ridge between basins (= boundary) |
| Flooding | Simulate water rising from minima |

**Problem**: Over-segmentation (too many basins due to noise).

**Solution**: Use markers — specify foreground/background seeds; restrict flooding.

:::

## Evaluation

:::eli10

How do you know if a segmentation is good? If regions are too big (crossing over multiple objects), that's under-segmentation. If there are way too many tiny pieces, that's over-segmentation. A good segmentation has regions that match the actual object boundaries closely.

:::

:::eli15

Segmentation quality is assessed by checking for under-segmentation (regions span multiple objects), over-segmentation (an object is split into too many fragments), and boundary accuracy (how well the segment edges align with true object contours). In practice, you often compare against a human-drawn ground truth. There's typically a trade-off between over- and under-segmentation controlled by algorithm parameters.

:::

:::eli20

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

:::
