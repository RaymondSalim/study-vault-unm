---
title: "Image Segmentation"
order: 1
moduleTitle: "COMP3029 - Computer Vision"
tags: ["segmentation", "k-means", "gmm", "em-algorithm", "clustering"]
---

## Overview

:::eli10

Imagine you have a colouring book picture, but you need to figure out which parts belong together. Image segmentation is like using a magic marker to outline groups of similar-looking dots (pixels) in a photo -- separating the sky from the trees from the ground. The computer groups together pixels that look alike by colour, brightness, or texture.

:::

:::eli15

Image segmentation divides an image into meaningful regions by grouping pixels with similar properties. Simple approaches include thresholding (splitting by brightness) and K-means clustering (grouping pixels into K colour clusters). More advanced methods use probability models (GMMs with EM algorithm) to softly assign pixels to clusters, or deep learning to label every pixel with a semantic class like "car" or "sky."

:::

:::eli20

Image segmentation partitions an image into meaningful regions by grouping pixels according to local properties (intensity, colour, texture, spectral profiles).

| Approach | Type | Key Idea |
|----------|------|----------|
| Thresholding | Heuristic | Assign labels based on intensity threshold T |
| K-Means | Unsupervised | Cluster pixels by minimising within-cluster distance |
| GMM + EM | Unsupervised | Probabilistic soft clustering with Gaussian mixtures |
| Semantic Segmentation | Supervised (DL) | Assign class label to every pixel |
| Instance Segmentation | Supervised (DL) | Distinguish individual object instances |

:::

## K-Means Clustering

:::eli10

K-Means is like sorting your crayons into K piles by colour. You pick K starting colours, then each crayon goes to its closest pile. After sorting, you update each pile's "average colour." You keep re-sorting and updating until nothing changes. In images, the "crayons" are pixels and the "piles" become the segments.

:::

:::eli15

K-Means clustering splits data into K groups by repeatedly assigning each point to its nearest cluster centre, then recalculating each centre as the average of its assigned points. For images, each pixel's colour (or other feature) is the data point. The algorithm minimises the total squared distance between points and their assigned centres. It always converges but may find only a local optimum depending on initialisation.

:::

:::eli20

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

:::

## Gaussian Mixture Models (GMM)

:::eli10

Instead of forcing every pixel into exactly one group (like K-Means does), GMM says "this pixel is probably 70% sky and 30% cloud." It uses bell-shaped curves (Gaussians) to describe each group, and each pixel gets a percentage for how much it belongs to each group -- like mixing paint colours where you say how much of each colour went in.

:::

:::eli15

A Gaussian Mixture Model represents the distribution of pixel values as a weighted combination of multiple Gaussian (bell curve) distributions. Each Gaussian represents one cluster/segment with its own mean and spread. Unlike K-Means which forces hard assignments, GMM gives each pixel a probability of belonging to each cluster (soft assignment). This allows overlapping clusters and non-spherical shapes, making it more flexible for real image data.

:::

:::eli20

A GMM models pixel values as drawn from a mixture of M Gaussians:

$$p(x) = \sum_{i=1}^{M} \pi_i \, g(x | \theta_i)$$

where $\theta_i = (\mu_i, \Sigma_i)$ and $\pi_i$ are mixing coefficients ($\sum \pi_i = 1$).

### Log-Likelihood

Under the i.i.d. assumption (pixels are independent, identically distributed):

$$L(\boldsymbol{\theta}) = \log p(\mathbf{x}|\boldsymbol{\theta}) = \sum_{j=1}^{N} \log \left( \sum_{i=1}^{M} \pi_i \, g(x_j | \theta_i) \right)$$

Direct maximisation is intractable -- use EM.

:::

## EM Algorithm for GMM

:::eli10

The EM algorithm is like a guessing game with two steps you repeat. First (E-step), you guess how much each group "owns" each pixel based on current guesses. Then (M-step), you update your guesses for each group's centre and spread using those ownership scores. You keep going back and forth until your guesses stop changing -- like tuning a radio dial until the signal is clearest.

:::

:::eli15

The Expectation-Maximisation (EM) algorithm fits a GMM when you cannot directly solve for the best parameters. In the E-step, you compute the probability that each Gaussian generated each data point (soft assignments). In the M-step, you update each Gaussian's parameters (mean, covariance, weight) using those probabilities as weights. Each iteration is guaranteed to improve (or maintain) the likelihood, converging to a local maximum.

:::

:::eli20

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

:::

## K-Means Optimisation Formulation

:::eli10

K-Means works by solving a puzzle in two alternating steps: first, assign each pixel to its closest group centre; then, move each group centre to the middle of its assigned pixels. Each step makes the total "distance score" smaller, so the answer keeps getting better until it stops changing.

:::

:::eli15

K-Means can be understood as minimising a cost function (sum of squared distances from points to their assigned centres) using alternating optimisation. You fix the centres and optimise assignments, then fix assignments and optimise centres. Each sub-problem has a closed-form solution: assignments go to the nearest centre, and centres become the mean of assigned points. This "block coordinate descent" guarantees the cost never increases.

:::

:::eli20

The K-means algorithm derives from minimising:

$$J = \sum_{n=1}^{N} \sum_{k=1}^{K} r_{nk} \| \mathbf{x}_n - \boldsymbol{\mu}_k \|^2$$

subject to $r_{nk} \in \{0, 1\}$ and $\sum_k r_{nk} = 1$.

This is a **block coordinate descent** (alternating minimisation):

| Step | Fix | Minimise w.r.t. | Solution |
|------|-----|-----------------|----------|
| Assign | $\mu_k$ | $r_{nk}$ | $k^* = \arg\min_k \|x_n - \mu_k\|^2$ (independent per pixel) |
| Update | $r_{nk}$ | $\mu_k$ | $\mu_k = \frac{\sum_n r_{nk} x_n}{\sum_n r_{nk}}$ (derivative of quadratic = 0) |

:::

## GMM Log-Likelihood Objective

:::eli10

To train a GMM, we need a way to score how well our bell curves explain the data. The "log-likelihood" is that score -- it adds up how well the model predicts each pixel. A higher score means the model fits the data better. The tricky part is that the math involves a "log of a sum" which is hard to solve directly, so we use the EM trick instead.

:::

:::eli15

The GMM log-likelihood measures how probable the observed pixel values are under the current model. Since pixels are assumed independent, the joint probability is the product of individual probabilities, and taking the log converts it to a sum. However, each term contains a log of a sum (over mixture components), which has no closed-form maximum. This is why the EM algorithm is needed -- it optimises a tractable lower bound instead.

:::

:::eli20

Under i.i.d. assumption, the joint observation probability:

$$P(x_1, \ldots, x_N | \theta) = \prod_{j=1}^{N} P(x_j | \theta) = \prod_{j=1}^{N} \sum_{i=1}^{M} \pi_i \, g(x_j | \theta_i)$$

Log-likelihood to maximise:

$$\mathcal{L}(\theta) = \sum_{j=1}^{N} \log \left( \sum_{i=1}^{M} \pi_i \, g(x_j | \theta_i) \right)$$

Direct maximisation is intractable (log of sum) → use EM algorithm.

:::

## EM Algorithm: Conceptual Derivation

:::eli10

The reason EM works is clever math: since the hard problem (log of a sum) cannot be solved directly, EM introduces a "helper variable" that says which group generated each point. Using this helper, the problem splits into easier pieces. A math rule (Jensen's inequality) guarantees that solving these easier pieces always improves the overall answer.

:::

:::eli15

The EM algorithm works because directly maximising the log-likelihood is intractable due to the log-of-sum structure. By introducing a latent variable (which component generated each point), we can construct a lower bound on the log-likelihood using Jensen's inequality. EM alternates between tightening this bound (E-step) and maximising it (M-step), guaranteeing monotonic improvement. This same framework underlies Variational Autoencoders.

:::

:::eli20

| Concept | Detail |
|---------|--------|
| Problem | Log-likelihood has log(sum) — hard to optimise directly |
| Idea | Introduce latent variable $z$ (which Gaussian generated each pixel) |
| Jensen's inequality | $\log \mathbb{E}[Y] \geq \mathbb{E}[\log Y]$ → gives a lower bound |
| EM optimises | This lower bound alternately w.r.t. $q(z)$ and $\theta$ |
| Guarantee | Log-likelihood increases monotonically at each iteration |

This framework is reused in Variational Autoencoders (VAEs).

:::

## K-Means vs GMM

:::eli10

K-Means is like putting each crayon into exactly one box -- simple and fast. GMM is like saying each crayon is partly in several boxes at once -- more flexible but slower. K-Means only makes round (spherical) clusters, while GMM can make stretched or tilted clusters. K-Means is actually a special simplified version of GMM.

:::

:::eli15

K-Means makes hard binary assignments and assumes spherical clusters of equal size. GMM makes soft probabilistic assignments and can model elliptical clusters of different sizes and orientations via covariance matrices. K-Means is faster and simpler, while GMM provides richer information (class probabilities rather than just labels). Mathematically, K-Means is a limiting case of GMM where all covariances shrink to zero.

:::

:::eli20

| Aspect | K-Means | GMM + EM |
|--------|---------|----------|
| Assignment | Hard (binary $r_{nk}$) | Soft (probability $P(\theta_i|x_j)$) |
| Cluster shape | Spherical only | Arbitrary (via $\Sigma$) |
| Output | Cluster labels | Class probabilities |
| Parameters | Only means $\mu_k$ | $\mu_i$, $\Sigma_i$, $\pi_i$ |
| Speed | Faster | Slower per iteration |
| Mean update | Only assigned pixels contribute | ALL pixels contribute (weighted by posterior) |
| K-Means as special case | -- | GMM with $\Sigma = \sigma^2 I$, $\sigma \to 0$ |

:::

## HSV Colour Space for Segmentation

:::eli10

RGB describes colours using three numbers (red, green, blue amounts). HSV is a different way to describe colour: Hue is the actual colour (like "red" or "blue"), Saturation is how vivid it is, and Value is how bright it is. For segmenting by colour, Hue alone captures "what colour" in just one number, which makes clustering much easier.

:::

:::eli15

When segmenting images by colour, the HSV colour space is preferred over RGB because the Hue channel encodes colour identity as a single angular value (0-360 degrees), independent of brightness or saturation. In RGB, a colour like "red" is spread across all three channels and changes with lighting. HSV separates chromatic information (H) from intensity (V), making colour-based clustering with K-Means more effective and less sensitive to illumination changes.

:::

:::eli20

Convert RGB → HSV; use Hue channel for clustering:
- **H (Hue):** represents colour as single angle (0–360°)
- **S (Saturation):** colour vividness
- **V (Value):** brightness

Hue encodes colour information in one number vs. three in RGB — more representative for colour-based segmentation.

:::

## Advanced Segmentation Techniques

:::eli10

There are different levels of "understanding" an image. Semantic segmentation labels every pixel with a category (this pixel is "cat," that pixel is "sky"). Instance segmentation goes further -- it can tell apart cat #1 from cat #2, even if they overlap. Panoptic segmentation combines both: it labels everything and distinguishes individual objects.

:::

:::eli15

Modern deep learning offers three increasingly detailed segmentation tasks. Semantic segmentation assigns a class label to every pixel but cannot distinguish between multiple objects of the same class. Instance segmentation separates individual countable objects (e.g., two different cars). Panoptic segmentation combines both -- it handles countable objects with instance labels and uncountable "stuff" regions (sky, grass) with semantic labels.

:::

:::eli20

| Method | Definition | Output |
|--------|-----------|--------|
| Semantic segmentation | Assign class label per pixel | Pixel → {cat, dog, sky, ...} |
| Instance segmentation | Semantic + distinguish individuals | Pixel → {cat #1, cat #2, ...} |
| Panoptic segmentation | Combines both | Countable instances + amorphous regions |

- **Countable objects** (cars, people): instance segmentation
- **Amorphous regions** (sky, sea, grass): semantic segmentation only

:::

## Key Assumptions and Limitations

:::eli10

These methods have some weaknesses. They treat each pixel as independent -- they do not know that nearby pixels are usually part of the same object. You also have to tell them how many groups to make (they cannot figure it out on their own), and the answer depends on how you start the process.

:::

:::eli15

Both K-Means and GMM assume pixels are independent and identically distributed (i.i.d.), which ignores spatial relationships -- a pixel's neighbours give strong clues about its segment, but these methods do not use that information. The number of clusters K must be chosen in advance (a model selection problem with no universal solution). Both methods are sensitive to initialisation and may converge to different solutions depending on starting conditions.

:::

:::eli20

- **i.i.d. assumption:** pixels treated as independent -- ignores spatial relationships
- **Number of clusters:** must be specified in advance (model selection problem)
- **Initialisation:** both methods sensitive to initial parameters

:::

<details><summary>Practice</summary>

1. Given data points {2, 3, 5, 8, 9, 10, 14, 20, 23, 24} and initial means $\mu_1=6$, $\mu_2=12$, $\mu_3=18$, perform one iteration of K-means.

2. In the EM algorithm, what happens if a Gaussian component's covariance matrix becomes singular? How can this be prevented?

3. Why is hue often preferred over RGB values for K-means colour segmentation?

4. Explain why K-means can be viewed as a special case of EM for GMM.

5. Write the K-means cost function $J$. Show that minimising $J$ w.r.t. $\mu_k$ (with $r_{nk}$ fixed) gives the mean update formula.

6. What is the difference between semantic, instance, and panoptic segmentation?

</details>
