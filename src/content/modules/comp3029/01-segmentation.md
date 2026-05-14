---
title: "Image Segmentation"
order: 1
moduleTitle: "COMP3029 - Computer Vision"
tags: ["segmentation", "k-means", "gmm", "em-algorithm", "clustering"]
---

## Overview

Image segmentation partitions an image into meaningful regions by grouping pixels according to local properties (intensity, colour, texture, spectral profiles).

| Approach | Type | Key Idea |
|----------|------|----------|
| Thresholding | Heuristic | Assign labels based on intensity threshold T |
| K-Means | Unsupervised | Cluster pixels by minimising within-cluster distance |
| GMM + EM | Unsupervised | Probabilistic soft clustering with Gaussian mixtures |
| Semantic Segmentation | Supervised (DL) | Assign class label to every pixel |
| Instance Segmentation | Supervised (DL) | Distinguish individual object instances |

## K-Means Clustering

**Goal:** Split N data points into K groups minimising the objective function:

$$J = \sum_{n=1}^{N} \sum_{k=1}^{K} r_{nk} \| \mathbf{x}_n - \boldsymbol{\mu}_k \|^2$$

where $r_{nk} = 1$ if point $n$ is assigned to cluster $k$, else 0.

### Algorithm

| Step | Action |
|------|--------|
| 1 | Initialise $\mu_k$ randomly |
| 2 | **Assign:** For each point, set $r_{nk}=1$ for nearest $\mu_k$ |
| 3 | **Update:** $\mu_k = \frac{\sum_n r_{nk} x_n}{\sum_n r_{nk}}$ |
| 4 | Repeat 2-3 until convergence |

### K-Means for Images

- Points $x_n$ = pixel feature values (e.g., hue, intensity, RGB)
- $\mu_k$ = average feature value for region $k$
- For colour segmentation: convert RGB to HSV, cluster on hue

### Properties

| Property | Detail |
|----------|--------|
| Convergence | Guaranteed to converge (monotonically decreasing J) |
| Optimality | Only local minimum -- sensitive to initialisation |
| Complexity | $O(NKI)$ where I = iterations |
| Limitation | Hard assignments, assumes spherical clusters |

## Gaussian Mixture Models (GMM)

A GMM models pixel values as drawn from a mixture of M Gaussians:

$$p(x) = \sum_{i=1}^{M} \pi_i \, g(x | \theta_i)$$

where $\theta_i = (\mu_i, \Sigma_i)$ and $\pi_i$ are mixing coefficients ($\sum \pi_i = 1$).

### Log-Likelihood

Under the i.i.d. assumption (pixels are independent, identically distributed):

$$L(\boldsymbol{\theta}) = \log p(\mathbf{x}|\boldsymbol{\theta}) = \sum_{j=1}^{N} \log \left( \sum_{i=1}^{M} \pi_i \, g(x_j | \theta_i) \right)$$

Direct maximisation is intractable -- use EM.

## EM Algorithm for GMM

| Step | Name | Action |
|------|------|--------|
| 1 | Init | Set initial $M$, $\mu_i$, $\Sigma_i$, $\pi_i$ |
| 2 | E-Step | Compute $P(\theta_i | x_j)$ using Bayes' rule (ownership probabilities) |
| 3 | M-Step | Update parameters using weighted statistics |
| 4 | Repeat | Until parameters converge |

### E-Step (Expectation)

Compute posterior probability that Gaussian $i$ generated pixel $x_j$:

$$P(\theta_i | x_j) = \frac{\pi_i \, g(x_j | \theta_i)}{\sum_{m=1}^{M} \pi_m \, g(x_j | \theta_m)}$$

### M-Step (Maximisation)

Update parameters using soft assignments:

$$\mu_i = \frac{\sum_{j=1}^{N} P(\theta_i|x_j) \, x_j}{\sum_{j=1}^{N} P(\theta_i|x_j)}$$

$$\Sigma_i = \frac{\sum_{j=1}^{N} P(\theta_i|x_j)(x_j - \mu_i)(x_j - \mu_i)^T}{\sum_{j=1}^{N} P(\theta_i|x_j)}$$

$$\pi_i = \frac{1}{N} \sum_{j=1}^{N} P(\theta_i|x_j)$$

## K-Means Optimisation Formulation

The K-means algorithm derives from minimising:

$$J = \sum_{n=1}^{N} \sum_{k=1}^{K} r_{nk} \| \mathbf{x}_n - \boldsymbol{\mu}_k \|^2$$

subject to $r_{nk} \in \{0, 1\}$ and $\sum_k r_{nk} = 1$.

This is a **block coordinate descent** (alternating minimisation):

| Step | Fix | Minimise w.r.t. | Solution |
|------|-----|-----------------|----------|
| Assign | $\mu_k$ | $r_{nk}$ | $k^* = \arg\min_k \|x_n - \mu_k\|^2$ (independent per pixel) |
| Update | $r_{nk}$ | $\mu_k$ | $\mu_k = \frac{\sum_n r_{nk} x_n}{\sum_n r_{nk}}$ (derivative of quadratic = 0) |

## GMM Log-Likelihood Objective

Under i.i.d. assumption, the joint observation probability:

$$P(x_1, \ldots, x_N | \theta) = \prod_{j=1}^{N} P(x_j | \theta) = \prod_{j=1}^{N} \sum_{i=1}^{M} \pi_i \, g(x_j | \theta_i)$$

Log-likelihood to maximise:

$$\mathcal{L}(\theta) = \sum_{j=1}^{N} \log \left( \sum_{i=1}^{M} \pi_i \, g(x_j | \theta_i) \right)$$

Direct maximisation is intractable (log of sum) → use EM algorithm.

## EM Algorithm: Conceptual Derivation

| Concept | Detail |
|---------|--------|
| Problem | Log-likelihood has log(sum) — hard to optimise directly |
| Idea | Introduce latent variable $z$ (which Gaussian generated each pixel) |
| Jensen's inequality | $\log \mathbb{E}[Y] \geq \mathbb{E}[\log Y]$ → gives a lower bound |
| EM optimises | This lower bound alternately w.r.t. $q(z)$ and $\theta$ |
| Guarantee | Log-likelihood increases monotonically at each iteration |

This framework is reused in Variational Autoencoders (VAEs).

## K-Means vs GMM

| Aspect | K-Means | GMM + EM |
|--------|---------|----------|
| Assignment | Hard (binary $r_{nk}$) | Soft (probability $P(\theta_i|x_j)$) |
| Cluster shape | Spherical only | Arbitrary (via $\Sigma$) |
| Output | Cluster labels | Class probabilities |
| Parameters | Only means $\mu_k$ | $\mu_i$, $\Sigma_i$, $\pi_i$ |
| Speed | Faster | Slower per iteration |
| Mean update | Only assigned pixels contribute | ALL pixels contribute (weighted by posterior) |
| K-Means as special case | -- | GMM with $\Sigma = \sigma^2 I$, $\sigma \to 0$ |

## HSV Colour Space for Segmentation

Convert RGB → HSV; use Hue channel for clustering:
- **H (Hue):** represents colour as single angle (0–360°)
- **S (Saturation):** colour vividness
- **V (Value):** brightness

Hue encodes colour information in one number vs. three in RGB — more representative for colour-based segmentation.

## Advanced Segmentation Techniques

| Method | Definition | Output |
|--------|-----------|--------|
| Semantic segmentation | Assign class label per pixel | Pixel → {cat, dog, sky, ...} |
| Instance segmentation | Semantic + distinguish individuals | Pixel → {cat #1, cat #2, ...} |
| Panoptic segmentation | Combines both | Countable instances + amorphous regions |

- **Countable objects** (cars, people): instance segmentation
- **Amorphous regions** (sky, sea, grass): semantic segmentation only

## Key Assumptions and Limitations

- **i.i.d. assumption:** pixels treated as independent -- ignores spatial relationships
- **Number of clusters:** must be specified in advance (model selection problem)
- **Initialisation:** both methods sensitive to initial parameters

<details><summary>Practice</summary>

1. Given data points {2, 3, 5, 8, 9, 10, 14, 20, 23, 24} and initial means $\mu_1=6$, $\mu_2=12$, $\mu_3=18$, perform one iteration of K-means.

2. In the EM algorithm, what happens if a Gaussian component's covariance matrix becomes singular? How can this be prevented?

3. Why is hue often preferred over RGB values for K-means colour segmentation?

4. Explain why K-means can be viewed as a special case of EM for GMM.

5. Write the K-means cost function $J$. Show that minimising $J$ w.r.t. $\mu_k$ (with $r_{nk}$ fixed) gives the mean update formula.

6. What is the difference between semantic, instance, and panoptic segmentation?

</details>
