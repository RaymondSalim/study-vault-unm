---
title: "Quick Reference"
order: 90
moduleTitle: "COMP3029 - Computer Vision"
tags: ["reference", "formulae", "cheat-sheet", "algorithms"]
---

## Key Formulae

### Segmentation

| Formula | Context | Description |
|---------|---------|-------------|
| $J = \sum_{n=1}^{N} \sum_{k=1}^{K} r_{nk} \|\mathbf{x}_n - \boldsymbol{\mu}_k\|^2$ | K-means objective | Total within-cluster sum of squared distances. Measures how well clusters fit the data. $N$ = number of data points, $K$ = number of clusters, $r_{nk}$ = 1 if point $n$ belongs to cluster $k$ (else 0), $\mathbf{x}_n$ = data point, $\boldsymbol{\mu}_k$ = cluster centre. Minimised by alternating assignment and update steps. |
| $\mu_k = \frac{\sum_n r_{nk} x_n}{\sum_n r_{nk}}$ | K-means update | Recomputes each cluster centre as the mean of all points assigned to it. $r_{nk}$ = assignment indicator, $x_n$ = data point. Derived by setting $\partial J / \partial \mu_k = 0$. |
| $P(\theta_i \| x_j) = \frac{\pi_i g(x_j \| \theta_i)}{\sum_m \pi_m g(x_j \| \theta_m)}$ | EM E-step | Posterior probability (responsibility) that Gaussian component $i$ generated data point $x_j$. Uses Bayes' rule. $\pi_i$ = mixing weight of component $i$, $g(x_j|\theta_i)$ = Gaussian PDF with parameters $\theta_i = (\mu_i, \Sigma_i)$. Denominator normalises over all $M$ components. |
| $p(x) = \sum_{i=1}^M \pi_i \mathcal{N}(x \| \mu_i, \Sigma_i)$ | GMM density | Models pixel values as a weighted sum of $M$ Gaussian distributions. $\pi_i$ = mixing coefficient (weight, $\sum \pi_i = 1$), $\mu_i$ = mean, $\Sigma_i$ = covariance of component $i$. Allows soft clustering with elliptical cluster shapes. |

### Features & Descriptors

| Formula | Context | Description |
|---------|---------|-------------|
| $g(x,y) = \sqrt{\Delta x^2 + \Delta y^2}$ | Gradient magnitude | Strength of intensity change at pixel $(x,y)$. $\Delta x$ = horizontal intensity difference (partial derivative $I_x$), $\Delta y$ = vertical intensity difference ($I_y$). Large values indicate edges. |
| $\theta(x,y) = \arctan(\Delta y / \Delta x)$ | Gradient direction | Angle of steepest intensity increase at pixel $(x,y)$. Perpendicular to edge direction. $\Delta x$, $\Delta y$ = horizontal/vertical intensity gradients. Used in HoG and SIFT descriptors. |
| $E(u,v) = [u \; v] \, H \, [u \; v]^T$ | Harris corner SSD | Approximation of intensity change when shifting a window by $(u,v)$. Derived via Taylor expansion of the SSD. $H$ = structure tensor. Large $E$ in all directions indicates a corner. |
| $H = \sum_{W} \begin{bmatrix} I_x^2 & I_x I_y \\ I_x I_y & I_y^2 \end{bmatrix}$ | Structure tensor | 2×2 matrix summarising local gradient structure over window $W$. $I_x$, $I_y$ = image partial derivatives. Eigenvalues reveal geometry: two large = corner, one large = edge, both small = flat. Also used in Lucas-Kanade optical flow. |
| $R = \det(H) - k \cdot \text{trace}(H)^2$ | Harris response | Corner score avoiding explicit eigenvalue computation. $\det(H) = \lambda_1 \lambda_2$, $\text{trace}(H) = \lambda_1 + \lambda_2$, $k \approx 0.04$–$0.06$. Corner if $R > $ threshold. Rotation-invariant. |

### Viola-Jones

| Formula | Context | Description |
|---------|---------|-------------|
| $ii(x,y) = ii(x, y-1) + s(x, y)$ | Integral image | Recursive computation of integral image. $ii(x,y)$ = sum of all pixels above and to the left of $(x,y)$. $s(x,y)$ = cumulative row sum. Enables O(1) rectangle sum queries. |
| $s(x,y) = s(x-1, y) + i(x, y)$ | Cumulative row sum | Running sum along each row. $s(x,y)$ = sum of pixels in row $y$ from column 0 to $x$. $i(x,y)$ = original pixel intensity. Helper for integral image construction. |
| $\text{Sum}(D) = ii(4) + ii(1) - ii(2) - ii(3)$ | Rectangle sum | Computes sum of any rectangular region using 4 lookups from the integral image. Corners labelled 1–4 (top-left, top-right, bottom-left, bottom-right). Makes Haar feature evaluation O(1) regardless of rectangle size. |
| $\alpha_t = \frac{1}{2}\ln\frac{1-\epsilon_t}{\epsilon_t}$ | AdaBoost weight | Confidence weight assigned to weak classifier $t$ in the ensemble. $\epsilon_t$ = weighted classification error. Lower error → higher $\alpha_t$ (more voting power). As $\epsilon_t \to 0$, $\alpha_t \to \infty$. |
| $H(x) = \text{sign}(\sum_t \alpha_t h_t(x))$ | Strong classifier | Final AdaBoost ensemble decision. Weighted vote of all $T$ selected weak classifiers $h_t(x)$. $\alpha_t$ = classifier weight. Output +1 (face) or −1 (non-face) based on sign of weighted sum. |

### Neural Networks

| Formula | Context | Description |
|---------|---------|-------------|
| $y = f(\mathbf{w}^T\mathbf{x} + b)$ | Neuron output | Single neuron computation. $\mathbf{x}$ = input vector, $\mathbf{w}$ = learned weight vector, $b$ = bias, $f$ = non-linear activation function. Computes weighted sum of inputs then applies non-linearity. Decision boundary is a hyperplane. |
| $\sigma(x) = \frac{1}{1+e^{-x}}$ | Sigmoid | Activation function squashing input to range $(0,1)$. $x$ = pre-activation value. Smooth and differentiable but saturates at extremes causing vanishing gradients. Used for binary output probabilities. |
| $\text{ReLU}(x) = \max(0, x)$ | ReLU | Rectified Linear Unit. $x$ = pre-activation. Outputs 0 for negatives, passes positives unchanged. Default modern activation — fast, no saturation for positive values, but "dead neurons" possible (always 0 output). |
| $L = -\sum_c y_c \log \hat{y}_c$ | Cross-entropy loss | Measures how far predicted probabilities are from true labels for multi-class classification. $y_c$ = ground truth (1 for correct class, 0 otherwise), $\hat{y}_c$ = predicted probability for class $c$. Heavily penalises confident wrong predictions. |
| $w \leftarrow w - \eta \frac{\partial L}{\partial w}$ | Gradient descent | Weight update rule. $w$ = weight, $\eta$ = learning rate (step size), $\partial L/\partial w$ = gradient of loss w.r.t. weight (computed via backpropagation). Moves weight in direction that reduces loss. |

### CNNs

| Formula | Context | Description |
|---------|---------|-------------|
| $\text{out} = \frac{\text{in} - k + 2p}{s} + 1$ | Conv output size | Spatial dimension of output feature map. $\text{in}$ = input size, $k$ = kernel/filter size, $p$ = zero-padding, $s$ = stride. Essential for designing network architectures and ensuring dimension compatibility. |
| $\mathbf{y} = F(\mathbf{x}) + \mathbf{x}$ | ResNet skip connection | Residual learning block output. $\mathbf{x}$ = input (skip connection), $F(\mathbf{x})$ = learned residual mapping (conv layers). Network only needs to learn the difference from identity. Enables gradient flow through very deep networks (100+ layers). |
| RF $= L(F-1) + 1$ | Receptive field (stride 1) | Total input region influencing one output neuron. $L$ = number of layers, $F$ = filter size. E.g., 3 layers of 3×3 gives RF = 7×7. Determines what spatial context the network can use for predictions. |

### GANs

| Formula | Context | Description |
|---------|---------|-------------|
| $\min_G \max_D \; \mathbb{E}[\log D(x)] + \mathbb{E}[\log(1-D(G(z)))]$ | GAN objective | Minimax game between Generator $G$ and Discriminator $D$. $D(x)$ = probability that real image $x$ is real (D wants this high). $G(z)$ = fake image from noise $z$. $D$ maximises (correctly classify real/fake), $G$ minimises (fool $D$). At equilibrium, $D(x) = 0.5$ and generated distribution matches real data. |

### Vision Transformers

| Formula | Context | Description |
|---------|---------|-------------|
| $\text{Attn}(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$ | Self-attention | Scaled dot-product attention. $Q$ = queries (what am I looking for), $K$ = keys (what do I contain), $V$ = values (what information to return), $d_k$ = key dimension. $QK^T$ computes similarity scores, scaling by $\sqrt{d_k}$ prevents softmax saturation, softmax normalises to weights, then weighted sum of $V$ produces output. Global receptive field in one layer. |
| Patches $= (H/P) \times (W/P)$ | Number of tokens | Number of patch tokens in ViT input sequence. $H$ = image height, $W$ = image width, $P$ = patch size (e.g., 16). Each patch is flattened and linearly projected into a token embedding. E.g., 224×224 image with P=16 gives 196 patches. |

### 3D Vision

| Formula | Context | Description |
|---------|---------|-------------|
| $\mathbf{p} = K[R \| \mathbf{t}]\mathbf{P}$ | Camera projection | Projects a 3D world point $\mathbf{P}$ to 2D pixel coordinates $\mathbf{p}$. $K$ = 3×3 intrinsic matrix (focal length, principal point), $R$ = 3×3 rotation matrix (camera orientation), $\mathbf{t}$ = 3×1 translation vector (camera position). Total 11 DoF (5 intrinsic + 6 extrinsic). |
| $Z = \frac{fB}{d}$ | Stereo depth | Recovers depth from stereo disparity. $Z$ = depth of point, $f$ = focal length (pixels), $B$ = baseline (distance between cameras), $d$ = disparity (pixel shift $x_L - x_R$). Depth is inversely proportional to disparity: large disparity = close, small disparity = far. |
| $\mathbf{p}_2^T F \mathbf{p}_1 = 0$ | Epipolar constraint | Relates corresponding points between two views. $\mathbf{p}_1$, $\mathbf{p}_2$ = matched points in homogeneous coordinates, $F$ = 3×3 fundamental matrix (rank 2, 7 DoF). Constrains correspondence search to 1D epipolar line $F\mathbf{p}_1$ in image 2. Estimated via 8-point algorithm. |
| $I_x u + I_y v + I_t = 0$ | Optical flow constraint | Relates pixel motion to intensity gradients. $I_x$, $I_y$ = spatial gradients, $I_t$ = temporal gradient (intensity change over time), $(u, v)$ = pixel velocity. Derived from brightness constancy via Taylor expansion. One equation, two unknowns (aperture problem) — requires additional constraints (Lucas-Kanade or Horn-Schunck). |

## Algorithm Summaries

### K-Means

1. Initialise $\mu_1, \ldots, \mu_K$ randomly
2. Assign each point to nearest mean
3. Recompute means from assignments
4. Repeat until stable

### EM for GMM

1. Initialise $\mu_i, \Sigma_i, \pi_i$
2. E-step: compute responsibilities $P(\theta_i|x_j)$
3. M-step: update $\mu_i, \Sigma_i, \pi_i$ using weighted stats
4. Repeat until log-likelihood converges

### SIFT

1. DoG scale-space extrema detection
2. Keypoint localisation (sub-pixel, reject weak)
3. Orientation assignment (gradient histogram peak)
4. Descriptor (4x4 grid, 8 orientation bins = 128-D)

### Viola-Jones

1. Compute integral image
2. Evaluate Haar features via rectangle sums
3. AdaBoost selects best features, builds cascade
4. Cascade: early rejection of easy negatives

### Backpropagation

1. Forward pass: compute all activations
2. Compute loss at output
3. Backward pass: propagate error using chain rule
4. Update weights: $w \leftarrow w - \eta \nabla_w L$

### Lucas-Kanade Optical Flow

1. Compute $I_x, I_y, I_t$ (spatial and temporal gradients)
2. For each pixel, collect equations in window
3. Solve least-squares: $(A^T A)^{-1} A^T b$
4. Output velocity $(u, v)$ per pixel

### RANSAC

1. Randomly sample minimal set
2. Fit model
3. Count inliers
4. Repeat N times, keep best model
5. Refit on all inliers

## Complexity Reference

| Algorithm | Time Complexity |
|-----------|----------------|
| K-Means (per iteration) | $O(NKd)$ |
| Harris corner detection | $O(N)$ per pixel (fixed window) |
| SIFT (per octave) | $O(N)$ |
| Viola-Jones detection | $O(1)$ per feature (integral image) |
| CNN forward pass | $O(K^2 \cdot C_{in} \cdot C_{out} \cdot H \cdot W)$ per layer |
| Self-attention | $O(n^2 \cdot d)$ |
