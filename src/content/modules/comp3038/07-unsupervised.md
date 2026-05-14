---
title: "Unsupervised Learning"
order: 7
moduleTitle: "COMP3038 - Machine Learning"
tags: ["k-means", "clustering", "PCA", "dimensionality-reduction", "hierarchical-clustering"]
---

## Clustering

:::eli10

Clustering is like sorting a pile of LEGO bricks by colour without anyone telling you what the colours are. The computer looks at the data and groups similar things together on its own. It does not know the "right answer" ahead of time -- it just finds natural groups based on which items are most alike.

:::

:::eli15
Clustering is an unsupervised learning task where the goal is to partition data into groups such that items within a group are similar and items in different groups are different. Unlike classification, there are no labels -- the algorithm discovers the structure on its own. K-Means is the most popular algorithm: it assigns each point to the nearest centroid and then moves centroids to the centre of their assigned points, repeating until stable. Other methods include hierarchical clustering (builds a tree of merges/splits) and DBSCAN (finds dense regions of arbitrary shape).

:::

:::eli20
### K-Means

**Algorithm:**

1. Initialise $K$ centroids randomly
2. **Assign**: Each point to nearest centroid: $c^{(i)} = \arg\min_k \|x^{(i)} - \mu_k\|^2$
3. **Update**: Move centroids to cluster means: $\mu_k = \frac{1}{|C_k|}\sum_{i \in C_k} x^{(i)}$
4. Repeat until convergence

**Objective (distortion):**

$$J = \sum_{i=1}^m \|x^{(i)} - \mu_{c^{(i)}}\|^2$$

| Property | Detail |
|----------|--------|
| Convergence | Always converges (monotonically decreasing $J$) |
| Global optimum? | No -- sensitive to initialisation |
| Fix | K-Means++ initialisation, multiple restarts |
| Complexity | $O(nKd)$ per iteration |
| Cluster shape | Assumes spherical, equal-size clusters |

### K-Means++ Initialisation

1. Choose first centroid uniformly at random
2. For each remaining centroid, choose point with probability proportional to $D(x)^2$ (squared distance to nearest existing centroid)

### Choosing $K$

| Method | How |
|--------|-----|
| Elbow method | Plot $J$ vs $K$, look for "elbow" |
| Silhouette score | Measure how similar points are to own cluster vs others |
| Domain knowledge | Natural number of groups |

### Hierarchical Clustering

| Type | Approach |
|------|----------|
| Agglomerative (bottom-up) | Start with each point as a cluster, merge closest pairs |
| Divisive (top-down) | Start with one cluster, recursively split |

**Linkage criteria:**

| Linkage | Distance between clusters $A$, $B$ |
|---------|-------------------------------------|
| Single | $\min_{a \in A, b \in B} d(a, b)$ |
| Complete | $\max_{a \in A, b \in B} d(a, b)$ |
| Average | $\frac{1}{|A||B|}\sum_{a,b} d(a,b)$ |
| Ward's | Minimise increase in total within-cluster variance |

| Linkage | Shape tendency | Issue |
|---------|----------------|-------|
| Single | Elongated (chaining) | Sensitive to noise |
| Complete | Compact, spherical | Sensitive to outliers |
| Ward's | Compact, equal-size | Best general-purpose |

**Dendrogram**: Tree diagram showing merge history. Cut at desired height to get $K$ clusters.

### DBSCAN

Density-based clustering: finds clusters of arbitrary shape.

| Parameter | Meaning |
|-----------|---------|
| $\varepsilon$ (eps) | Neighbourhood radius |
| MinPts | Minimum points to form a dense region |

| Point type | Condition |
|-----------|-----------|
| Core point | $\geq$ MinPts within $\varepsilon$ |
| Border point | Within $\varepsilon$ of a core point, but not core itself |
| Noise | Neither core nor border |

:::

## Principal Component Analysis (PCA)

:::eli10

Imagine you have a 3D object and you want to draw it on a flat piece of paper. PCA finds the best angle to look at the data so that you keep as much of the interesting shape as possible, even though you are reducing dimensions. It is like finding the shadow of an object that reveals the most detail.

:::

:::eli15
PCA (Principal Component Analysis) is a dimensionality reduction technique that finds the directions (principal components) along which the data varies the most. It then projects the data onto a smaller number of these directions, discarding the least informative ones. This reduces the number of features while keeping as much information as possible. The first principal component captures the most variance, the second captures the next most (perpendicular to the first), and so on. You choose how many to keep based on how much total variance you want to preserve (typically 95%).

:::

:::eli20
### Goal

Find directions of maximum variance to reduce dimensionality while preserving as much information as possible.

### Algorithm

1. Centre the data: $\mathbf{x} \leftarrow \mathbf{x} - \bar{\mathbf{x}}$
2. Compute covariance matrix: $\Sigma = \frac{1}{m}\mathbf{X}^T\mathbf{X}$
3. Eigendecomposition (or SVD): find eigenvectors $\mathbf{u}_1, \ldots, \mathbf{u}_n$
4. Project onto top $k$ eigenvectors: $\mathbf{z} = \mathbf{U}_k^T \mathbf{x}$

### Key Properties

| Property | Detail |
|----------|--------|
| PCs are orthogonal | $\mathbf{u}_i^T \mathbf{u}_j = 0$ for $i \neq j$ |
| Ordered by variance | $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n$ |
| Variance explained | $\frac{\lambda_k}{\sum_i \lambda_i}$ |
| Cumulative variance | Choose $k$ s.t. $\frac{\sum_{i=1}^k \lambda_i}{\sum_{i=1}^n \lambda_i} \geq 0.95$ |

### Reconstruction

$$\hat{\mathbf{x}} = \mathbf{U}_k \mathbf{z} + \bar{\mathbf{x}}$$

Reconstruction error = sum of discarded eigenvalues: $\sum_{i=k+1}^n \lambda_i$

### PCA vs Other Methods

| Method | Linear? | Preserves |
|--------|---------|-----------|
| PCA | Yes | Global variance |
| t-SNE | No | Local structure |
| UMAP | No | Local + some global |
| Kernel PCA | No (via kernel) | Non-linear structure |

:::

## Clustering vs Classification

:::eli10

Classification is like a teacher giving you labelled examples and asking you to learn the pattern. Clustering is like being given a box of unlabelled things and having to sort them into groups by yourself. One has answers to learn from; the other does not.

:::

:::eli15
Classification (supervised) learns from labelled training data to predict categories for new samples. Clustering (unsupervised) has no labels -- it discovers natural groupings based solely on similarity. They are evaluated differently: classification uses accuracy, F1, etc. against known labels, while clustering uses internal measures like silhouette score or external measures if ground truth is available. Clustering is useful for exploratory analysis, customer segmentation, and finding structure in unlabelled data.

:::

:::eli20
| | Clustering | Classification |
|-|-----------|---------------|
| Labels | No labels (unsupervised) | Labelled data (supervised) |
| Goal | Discover structure | Predict labels |
| Evaluation | Silhouette, SSE, NMI | Accuracy, F1, AUC |

<details>
<summary><strong>Practice: K-Means convergence proof sketch</strong></summary>

1. The assignment step minimises $J$ w.r.t. cluster assignments (each point goes to nearest centroid)
2. The update step minimises $J$ w.r.t. centroids (mean minimises sum of squared distances)
3. Both steps decrease or maintain $J$
4. $J \geq 0$ (bounded below)
5. There are finitely many possible assignments
6. Therefore the algorithm must terminate
</details>

<details>
<summary><strong>Practice: Compute the first principal component</strong></summary>

Given centred data matrix $\mathbf{X}$ (rows are samples):

1. Compute $\Sigma = \frac{1}{m}\mathbf{X}^T\mathbf{X}$
2. Find eigenvector $\mathbf{u}_1$ corresponding to largest eigenvalue $\lambda_1$
3. This is the direction of maximum variance
4. Project: $z_i = \mathbf{u}_1^T \mathbf{x}^{(i)}$

Equivalently: $\mathbf{u}_1 = \arg\max_{\|\mathbf{u}\|=1} \mathbf{u}^T \Sigma \mathbf{u}$
</details>

:::
