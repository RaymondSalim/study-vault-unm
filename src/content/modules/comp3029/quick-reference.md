---
title: "Quick Reference"
order: 90
moduleTitle: "COMP3029 - Computer Vision"
tags: ["reference", "formulae", "cheat-sheet", "algorithms"]
---

## Key Formulae

### Segmentation

| Formula | Context |
|---------|---------|
| $J = \sum_{n=1}^{N} \sum_{k=1}^{K} r_{nk} \|\mathbf{x}_n - \boldsymbol{\mu}_k\|^2$ | K-means objective |
| $\mu_k = \frac{\sum_n r_{nk} x_n}{\sum_n r_{nk}}$ | K-means update |
| $P(\theta_i \| x_j) = \frac{\pi_i g(x_j \| \theta_i)}{\sum_m \pi_m g(x_j \| \theta_m)}$ | EM E-step |
| $p(x) = \sum_{i=1}^M \pi_i \mathcal{N}(x \| \mu_i, \Sigma_i)$ | GMM density |

### Features & Descriptors

| Formula | Context |
|---------|---------|
| $g(x,y) = \sqrt{\Delta x^2 + \Delta y^2}$ | Gradient magnitude |
| $\theta(x,y) = \arctan(\Delta y / \Delta x)$ | Gradient direction |
| $E(u,v) = [u \; v] \, H \, [u \; v]^T$ | Harris corner SSD |
| $H = \sum_{W} \begin{bmatrix} I_x^2 & I_x I_y \\ I_x I_y & I_y^2 \end{bmatrix}$ | Structure tensor |
| $R = \det(H) - k \cdot \text{trace}(H)^2$ | Harris response |

### Viola-Jones

| Formula | Context |
|---------|---------|
| $ii(x,y) = ii(x, y-1) + s(x, y)$ | Integral image |
| $s(x,y) = s(x-1, y) + i(x, y)$ | Cumulative row sum |
| $\text{Sum}(D) = ii(4) + ii(1) - ii(2) - ii(3)$ | Rectangle sum |
| $\alpha_t = \frac{1}{2}\ln\frac{1-\epsilon_t}{\epsilon_t}$ | AdaBoost weight |
| $H(x) = \text{sign}(\sum_t \alpha_t h_t(x))$ | Strong classifier |

### Neural Networks

| Formula | Context |
|---------|---------|
| $y = f(\mathbf{w}^T\mathbf{x} + b)$ | Neuron output |
| $\sigma(x) = \frac{1}{1+e^{-x}}$ | Sigmoid |
| $\text{ReLU}(x) = \max(0, x)$ | ReLU |
| $L = -\sum_c y_c \log \hat{y}_c$ | Cross-entropy loss |
| $w \leftarrow w - \eta \frac{\partial L}{\partial w}$ | Gradient descent |

### CNNs

| Formula | Context |
|---------|---------|
| $\text{out} = \frac{\text{in} - k + 2p}{s} + 1$ | Conv output size |
| $\mathbf{y} = F(\mathbf{x}) + \mathbf{x}$ | ResNet skip connection |
| RF $= L(F-1) + 1$ | Receptive field (stride 1) |

### GANs

| Formula | Context |
|---------|---------|
| $\min_G \max_D \; \mathbb{E}[\log D(x)] + \mathbb{E}[\log(1-D(G(z)))]$ | GAN objective |

### Vision Transformers

| Formula | Context |
|---------|---------|
| $\text{Attn}(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$ | Self-attention |
| Patches $= (H/P) \times (W/P)$ | Number of tokens |

### 3D Vision

| Formula | Context |
|---------|---------|
| $\mathbf{p} = K[R \| \mathbf{t}]\mathbf{P}$ | Camera projection |
| $Z = \frac{fB}{d}$ | Stereo depth |
| $\mathbf{p}_2^T F \mathbf{p}_1 = 0$ | Epipolar constraint |
| $I_x u + I_y v + I_t = 0$ | Optical flow constraint |

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
