---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP3029 - Computer Vision"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: FEATURES, DETECTION & RECOGNITION

### Image Segmentation (K-Means, GMM, EM)

**K-Means objective:** $J = \sum_{n=1}^{N} \sum_{k=1}^{K} r_{nk} \| \mathbf{x}_n - \boldsymbol{\mu}_k \|^2$

| Step | Action |
|------|--------|
| 1 | Initialise $\mu_k$ randomly |
| 2 | **Assign:** $r_{nk}=1$ for nearest $\mu_k$ (hard assignment) |
| 3 | **Update:** $\mu_k = \frac{\sum_n r_{nk} x_n}{\sum_n r_{nk}}$ |
| 4 | Repeat until convergence (guaranteed, local minimum only) |

**GMM:** $p(x) = \sum_{i=1}^{M} \pi_i \, g(x | \mu_i, \Sigma_i)$, &nbsp; $\sum \pi_i = 1$

**EM Algorithm:**
- **E-step:** $P(\theta_i | x_j) = \frac{\pi_i \, g(x_j | \theta_i)}{\sum_m \pi_m \, g(x_j | \theta_m)}$ (soft assignments via Bayes)
- **M-step:** $\mu_i = \frac{\sum_j P(\theta_i|x_j) x_j}{\sum_j P(\theta_i|x_j)}$, &nbsp; $\pi_i = \frac{1}{N} \sum_j P(\theta_i|x_j)$

| Aspect | K-Means | GMM + EM |
|--------|---------|----------|
| Assignment | Hard (binary $r_{nk}$) | Soft (posterior probabilities) |
| Cluster shape | Spherical only | Arbitrary (via $\Sigma$) |
| Output | Labels | Class probabilities |
| Parameters | Only $\mu_k$ | $\mu_i$, $\Sigma_i$, $\pi_i$ |
| K-Means is | -- | GMM with $\Sigma \to 0$ |

**HSV for segmentation:** Hue encodes colour as single angle (0-360), separating chromaticity from brightness. More effective than RGB for colour-based clustering.

---

### Feature Descriptors

**Colour Histograms:** Count pixel colour occurrences. Invariant to translation/rotation. Ignores spatial layout. Compare with: L1, Chi-squared ($\chi^2 = \sum \frac{(h_1-h_2)^2}{h_1+h_2}$), Bhattacharyya ($d = \sqrt{1 - \sum\sqrt{h_1 h_2}}$).

**LBP (Local Binary Patterns):** Compare centre pixel to 8 neighbours. $b_i = 1$ if neighbour $\geq$ centre, else 0. Produces 8-bit code (0-255). Build histogram over cells. Invariant to monotonic illumination changes.

**HoG (Histogram of Oriented Gradients):**

| Step | Action |
|------|--------|
| 1 | Compute gradient: $g = \sqrt{\Delta x^2 + \Delta y^2}$, $\theta = \arctan(\Delta y / \Delta x)$ |
| 2 | Divide into 8x8 cells |
| 3 | 9-bin orientation histogram per cell (0-180, unsigned) |
| 4 | Group cells into 2x2 overlapping blocks, L2-normalise |
| 5 | Concatenate block histograms |

| Feature | Best For | Invariant To | Limitation |
|---------|----------|--------------|------------|
| Colour histogram | Tracking, retrieval | Translation, rotation | No spatial layout |
| LBP | Face/texture recognition | Monotonic illumination | Noise sensitive |
| HoG | Person detection, shape | Small deformations | Not scale invariant |

---

### Harris Corner Detection

**SSD for shift $(u,v)$:** $E(u,v) \approx [u, v] \, H \, [u, v]^T$

**Structure tensor:** $H = \sum_W \begin{bmatrix} I_x^2 & I_x I_y \\ I_x I_y & I_y^2 \end{bmatrix}$

| Eigenvalues | Region |
|-------------|--------|
| Both small | Flat |
| One large, one small | Edge |
| Both large | **Corner** |

**Harris response:** $R = \det(H) - k \cdot \text{trace}(H)^2 = \lambda_+ \lambda_- - k(\lambda_+ + \lambda_-)^2$, &nbsp; $k \approx 0.04$-$0.06$

Rotation invariant (via eigenvector orientation). **NOT** scale invariant.

---

### SIFT (Scale Invariant Feature Transform)

| Stage | Method |
|-------|--------|
| 1. Scale-space extrema | DoG: $D = G(k\sigma) - G(\sigma) \approx (k-1)\sigma^2 \nabla^2 G$ |
| 2. Keypoint localisation | Structure tensor eigenvalues, reject edges/flat |
| 3. Orientation | 36-bin gradient histogram, dominant peak |
| 4. Descriptor | 16x16 window, 4x4 cells, 8-bin histograms = **128-D** |

**DoG approximates scale-normalised LoG** (from $\partial G/\partial \sigma = \sigma \nabla^2 G$). Compare each point to **26 neighbours** (8 same + 9 above + 9 below).

**Feature Matching:** Lowe's ratio test: accept if $\frac{\|d_A - d_{B1}\|}{\|d_A - d_{B2}\|} < 0.8$

**RANSAC:** Random sample $\to$ fit model $\to$ count inliers $\to$ repeat $N$ times $\to$ best model.

| Method | Scale Inv. | Rotation Inv. | Descriptor |
|--------|-----------|---------------|------------|
| Harris | No | Yes | N/A |
| SIFT | Yes | Yes | 128-D float |
| SURF | Yes | Yes | 64-D float |
| ORB | Yes | Yes | 256-bit binary |

---

### Object Recognition

**Sliding Window (Dalal & Triggs):** HoG features $\to$ linear SVM $\to$ multi-scale image pyramid $\to$ non-maximum suppression.

**Bag of Features:**
1. Extract SIFT from training images
2. K-means $\to$ visual vocabulary (codebook)
3. For new image: assign features to nearest word, build histogram
4. Classify with SVM

IDF weighting: $\text{IDF}(w) = \log(N_\text{total} / N_\text{containing})$. Spatial Pyramid Matching: divide into grids (1x1, 2x2, 4x4), concatenate BoF per cell.

**Pictorial Structures:** $E = \sum_i V_i(l_i) + \sum_{ij} V_{ij}(l_i, l_j)$ (appearance + deformation cost). Dynamic programming on tree graphs.

**Linear Classifiers:** $f(x) = Wx + b$. SVM hinge loss: $L_i = \sum_{j \neq y_i} \max(0, s_j - s_{y_i} + 1)$. Softmax: $p_k = e^{s_k}/\sum_j e^{s_j}$, loss $= -\log(p_{y_i})$.

**Evaluation:** Precision $= \frac{TP}{TP+FP}$, Recall $= \frac{TP}{TP+FN}$, IoU $= \frac{\text{Intersection}}{\text{Union}}$

---

### Viola-Jones Face Detection

| Component | Role |
|-----------|------|
| Haar features | Sum(white) - Sum(black); ~160,000 in 24x24 window |
| Integral image | $ii(x,y) = \sum_{x' \leq x, y' \leq y} i(x',y')$; any rect sum in **O(1)** with 4 lookups |
| AdaBoost | Select best weak classifiers, combine: $H(x) = \text{sign}(\sum \alpha_t h_t(x))$ |
| Cascade | Early stages: few features, high recall; reject non-faces fast |

**Integral image computation:** $s(x,y) = s(x-1,y) + i(x,y)$; &nbsp; $ii(x,y) = ii(x,y-1) + s(x,y)$

**AdaBoost:** $\alpha_t = \frac{1}{2}\ln\frac{1-\epsilon_t}{\epsilon_t}$; increase weights on misclassified samples. ~200 features needed (from 160K) for 95% accuracy.

**Cascade:** Stage 1 uses ~2 features, rejects 50% of non-faces. ~38 stages total, ~6000 features. Real-time 15+ fps.

---

## SIDE 2: DEEP LEARNING, 3D VISION & MOTION

### Neural Networks

**Perceptron:** $y = f(\mathbf{w}^T \mathbf{x} + b)$. Linear classifier; cannot solve XOR. MLP with hidden layers + non-linear activations solves non-linear problems.

| Activation | Formula | Issue |
|-----------|---------|-------|
| Sigmoid | $\frac{1}{1+e^{-x}}$ | Vanishing gradient when saturated |
| ReLU | $\max(0, x)$ | Dying neurons (no gradient for $x<0$) |
| Softmax | $\frac{e^{x_i}}{\sum_j e^{x_j}}$ | Output layer for classification |

**Backpropagation:** Forward: $z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$, $a^{(l)} = f(z^{(l)})$. Backward: $\frac{\partial L}{\partial w_{ij}^{(l)}} = \delta_i^{(l)} \cdot a_j^{(l-1)}$, &nbsp; $\delta^{(l)} = (W^{(l+1)})^T \delta^{(l+1)} \odot f'(z^{(l)})$

**Key insight:** Every weight gradient = (back-propagated error) $\times$ (forward activation)

**Adam:** $m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t$, $v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2$, $\theta_{t+1} = \theta_t - \frac{\eta \hat{m}_t}{\sqrt{\hat{v}_t}+\epsilon}$ (with bias correction $\hat{m}=m/(1-\beta_1^t)$)

**BatchNorm:** $\hat{x} = \frac{x-\mu_B}{\sqrt{\sigma_B^2+\epsilon}}$, $y = \gamma\hat{x}+\beta$. Uses batch stats in training, running averages in inference (`model.eval()`).

**Dropout:** Zero neurons with prob $(1-p)$ during training; forces redundant representations. Inference: all neurons active.

| Problem | Cause | Solution |
|---------|-------|----------|
| Vanishing gradients | Sigmoid saturation | ReLU, skip connections |
| Exploding gradients | Deep multiplication chains | Gradient clipping, careful init |
| Overfitting | Too many params | Dropout, weight decay, augmentation |

---

### CNNs (Convolutional Neural Networks)

**Output size:** $\text{out} = \frac{\text{in} - \text{kernel} + 2 \times \text{padding}}{\text{stride}} + 1$

**Parameters:** $K \times (C_{in} \times F \times F + 1)$ for $K$ filters of size $F \times F$

**Convolution is volumetric** (spans all input channels). **Pooling is spatial only** (channel count preserved). Pooling has NO learnable parameters.

**Receptive field:** $L$ layers of $F \times F$ with stride 1: RF $= L(F-1)+1$. Three 3x3 = 7x7 RF.

| Architecture | Key Innovation | Depth |
|-------------|----------------|-------|
| AlexNet (2012) | ReLU, dropout, GPU | 8 |
| VGGNet (2014) | Small 3x3 filters only | 16/19 |
| ResNet (2015) | Skip connections: $y = F(x) + x$ | 152 |

**VGG insight:** Three 3x3 layers = 7x7 RF with $27C^2$ params (vs $49C^2$ for one 7x7) + 3 ReLUs.

**ResNet:** Solves degradation (not overfitting) in deep nets. Skip connections enable gradient flow; easy to learn identity ($F=0$).

**1x1 Conv:** Channel mixing only; bottleneck to reduce dimensions. **Depthwise separable:** spatial per-channel + 1x1 pointwise; reduces params by $\sim K^2$.

**Transfer Learning:**

| Strategy | When | Method |
|----------|------|--------|
| Feature extraction | Small data, similar domain | Freeze conv, train new FC |
| Fine-tuning | Moderate data | Unfreeze some layers, small LR |

Early layers = generic features (edges, textures); later layers = task-specific.

---

### Generative Models (GANs)

**Minimax:** $\min_G \max_D \; \mathbb{E}[\log D(x)] + \mathbb{E}[\log(1-D(G(z)))]$

| Network | Input | Goal |
|---------|-------|------|
| Generator $G$ | Noise $z$ | Fool $D$ (produce realistic images) |
| Discriminator $D$ | Real/fake image | Classify correctly |

**Equilibrium:** $D(x) = 0.5$ everywhere, $p_G = p_{data}$

| Problem | Fix |
|---------|-----|
| Mode collapse (limited variety) | Minibatch discrimination, diversity loss |
| Training instability | Spectral normalisation, progressive growing |
| Vanishing G gradients (D too strong) | Wasserstein loss, label smoothing |

**Variants:** DCGAN (conv architecture), Conditional GAN (class-conditioned), Pix2Pix (paired translation), CycleGAN (unpaired), StyleGAN (high-quality faces)

---

### Vision Transformers (ViT)

**Pipeline:** Split image into 16x16 patches $\to$ flatten (768-D) $\to$ linear projection $\to$ add positional encoding $\to$ prepend [CLS] token $\to$ transformer encoder $\to$ MLP head

**Scaled dot-product attention:** $\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$

Scale by $\sqrt{d_k}$ to prevent softmax saturation. Multi-head: split into $H$ heads of $d/H$ dims, concat + project.

| Aspect | CNN | ViT |
|--------|-----|-----|
| Inductive bias | Local, translation equivariant | Minimal (global from start) |
| Data efficiency | Better with small data | Needs massive data |
| Receptive field | Grows with depth | Global from layer 1 |
| Complexity per layer | $O(n)$ | $O(n^2)$ |

**Self-attention:** Q, K, V from same input; permutation equivariant $\to$ needs positional encoding. **Cross-attention:** Q from one source, K/V from another.

**LayerNorm** (per token, across features) vs **BatchNorm** (across batch). Transformer: Self-Attn $\to$ Add & LN $\to$ MLP $\to$ Add & LN.

---

### 3D Vision & Camera Models

**Homogeneous coordinates:** $(x,y) \to (x,y,1)^T$; $(wx,wy,w)^T \sim (x,y,1)^T$. Point at infinity: $w=0$.

Line through 2 pts: $l = p_1 \times p_2$. Intersection of 2 lines: $p = l_1 \times l_2$. Point on line: $l^T p = 0$.

**Camera model:** $\mathbf{p} = K[R|\mathbf{t}]\mathbf{P}$ &nbsp; (3x4 projection matrix, 11 DoF total)

$$K = \begin{bmatrix} f_x & s & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix}$$

Intrinsic (5 DoF): $f_x, f_y, c_x, c_y, s$. Extrinsic (6 DoF): $R$ (3) + $t$ (3).

**Projection:** $u = f_x \frac{X}{Z} + c_x$, &nbsp; $v = f_y \frac{Y}{Z} + c_y$ (divide by depth $Z$)

| Model | Condition |
|-------|-----------|
| Perspective | Full: $x = fX/Z$ |
| Weak perspective | Depth variation $\ll$ avg depth: $x = (f/Z_0)X$ |
| Orthographic | Camera at $\infty$: $x = X$ |

**Homography:** $p' = Hp$, 3x3 matrix, 8 DoF, requires 4 point correspondences.

**Calibration (Zhang):** Multiple checkerboard views $\to$ detect corners $\to$ compute homographies $\to$ extract $K$, $[R|t]$ $\to$ refine.

**Lens distortion:** Radial: $r' = r(1+k_1 r^2 + k_2 r^4)$. Barrel/pincushion.

---

### Epipolar Geometry

**Fundamental matrix** $F$ (uncalibrated, 7 DoF): $\mathbf{p}_2^T F \mathbf{p}_1 = 0$. Rank 2. 8-point algorithm.

**Essential matrix** $E = [\mathbf{t}]_\times R$ (calibrated, 5 DoF): $\mathbf{p}'^T E \mathbf{p} = 0$. Relation: $F = K'^{-T} E K^{-1}$.

Epipolar line in image 2: $l_2 = F\mathbf{p}_1$. All epipolar lines pass through epipole.

**Rectification:** Warp images so epipolar lines become horizontal scanlines $\to$ 1D search.

---

### Stereo Vision

**Depth from disparity (rectified parallel cameras):**

$$Z = \frac{f \cdot B}{d}, \quad d = x_L - x_R$$

Large disparity = close; small disparity = far; zero disparity = infinity.

**Stereo pipeline:** Calibrate $\to$ Rectify $\to$ Match (along scanlines) $\to$ Compute depth

**Block matching:** Slide window along row, minimise SSD/SAD or maximise NCC. Window trade-off: large = smooth but blurs edges; small = sharp edges but noisy.

**Global optimisation:** $E = \sum_i C(i,d_i) + \lambda \sum_{(i,j)} S(d_i, d_j)$ (data + smoothness). Graph cuts or belief propagation.

**Challenges:** Occlusions, textureless regions, repetitive patterns, depth discontinuities.

---

### Optical Flow

**Brightness constancy:** $I(x,y,t) = I(x+u, y+v, t+1)$. Taylor expand $\to$ **constraint equation:** $I_x u + I_y v + I_t = 0$

**Aperture problem:** 1 equation, 2 unknowns. Only motion perpendicular to edges detectable.

**Lucas-Kanade (local):** Assumes constant flow in window. Solve: $(A^T A)\mathbf{d} = A^T\mathbf{b}$ where $A^T A = H$ (same structure tensor as Harris -- works best at corners).

$$\begin{bmatrix} u \\ v \end{bmatrix} = \begin{bmatrix} \sum I_x^2 & \sum I_x I_y \\ \sum I_x I_y & \sum I_y^2 \end{bmatrix}^{-1} \begin{bmatrix} -\sum I_x I_t \\ -\sum I_y I_t \end{bmatrix}$$

**Horn-Schunck (global):** Minimise $E = \sum[(I_x u + I_y v + I_t)^2 + \lambda((u-\bar{u})^2+(v-\bar{v})^2)]$. Dense, iterative, over-smooths boundaries.

| | Lucas-Kanade | Horn-Schunck |
|---|---|---|
| Scope | Local (per window) | Global (all pixels) |
| Output | Sparse | Dense |
| Iterative | No | Yes |
| Error propagation | Local only | Global |
| Boundaries | Errors | Over-smooths |

**Multi-resolution pyramid:** Downsample $\to$ solve at coarse level $\to$ upsample $\times 2$ $\to$ warp $\to$ solve residual. Handles large motions.

**Optical flow $\neq$ motion:** Rotating uniform sphere = motion but no OF. Static sphere + moving light = OF but no motion.

---

### Key Formulas Summary

| Formula | Context |
|---------|---------|
| $R = \det(H) - k \cdot \text{trace}(H)^2$ | Harris corner response |
| $Z = fB/d$ | Stereo depth |
| $I_x u + I_y v + I_t = 0$ | Optical flow constraint |
| $\text{out} = (W-F+2P)/S + 1$ | Conv output size |
| $p_k = e^{s_k}/\sum e^{s_j}$ | Softmax |
| $L = -\log(p_{y_i})$ | Cross-entropy loss |
| $\mathbf{p} = K[R|t]\mathbf{P}$ | Camera projection |
| $\mathbf{p}_2^T F \mathbf{p}_1 = 0$ | Epipolar constraint |
| Ratio test: $d_1/d_2 < 0.8$ | SIFT matching |
| $\alpha_t = \frac{1}{2}\ln\frac{1-\epsilon}{\epsilon}$ | AdaBoost weight |
