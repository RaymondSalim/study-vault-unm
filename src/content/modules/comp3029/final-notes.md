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

## Section A Q1: Segmentation, Motion & Optical Flow

### K-Means Clustering

**Objective:** $J = \sum_{n=1}^{N} \sum_{k=1}^{K} r_{nk} \| \mathbf{x}_n - \boldsymbol{\mu}_k \|^2$

| Step | Action |
|------|--------|
| 1 | Initialise $\mu_k$ (randomly or given) |
| 2 | **Assign:** $r_{nk}=1$ for nearest $\mu_k$ (hard assignment) |
| 3 | **Update:** $\mu_k = \frac{\sum_n r_{nk} x_n}{\sum_n r_{nk}}$ (mean of assigned points) |
| 4 | Repeat until convergence (guaranteed, local minimum only) |

**Neighbourhood term:** Adding $\lambda \sum_{j \in \Omega(i)} f(x_i, x_j)$ encourages spatial coherence — neighbouring pixels assigned to same cluster. Reduces salt-and-pepper noise, produces smoother segmentation. Similar to MRF energy.

### GMM + EM Algorithm

**GMM density:** $p(x) = \sum_{i=1}^{M} \pi_i \, \mathcal{N}(x | \mu_i, \Sigma_i)$, &nbsp; $\sum \pi_i = 1$

**E-step (soft assignment via Bayes):**
$$P(\theta_i | x_j) = \frac{\pi_i \, g(x_j | \theta_i)}{\sum_m \pi_m \, g(x_j | \theta_m)}$$

**M-step (update from weighted stats):**
- $\mu_i = \frac{\sum_j P(\theta_i|x_j) \, x_j}{\sum_j P(\theta_i|x_j)}$
- $\pi_i = \frac{1}{N} \sum_j P(\theta_i|x_j)$
- $\Sigma_i = \frac{\sum_j P(\theta_i|x_j)(x_j - \mu_i)(x_j - \mu_i)^T}{\sum_j P(\theta_i|x_j)}$

| Aspect | K-Means | GMM + EM |
|--------|---------|----------|
| Assignment | Hard (binary $r_{nk}$) | Soft (posterior probabilities) |
| Cluster shape | Spherical only | Arbitrary (via $\Sigma$) |
| Output | Labels | Class probabilities |
| Parameters | Only $\mu_k$ | $\mu_i$, $\Sigma_i$, $\pi_i$ |
| K-Means is | -- | GMM with $\Sigma \to 0$ |

**HSV for segmentation:** Hue = colour as single angle (0-360), separates chromaticity from brightness. Better than RGB for colour-based clustering because illumination changes affect V but not H.

---

### Optical Flow

**Brightness constancy:** $I(x,y,t) = I(x+u, y+v, t+1)$

**Taylor expand** $\to$ **Constraint equation:** $I_x u + I_y v + I_t = 0$

**Aperture problem:** 1 equation, 2 unknowns. Only component perpendicular to edge is detectable.

**Lucas-Kanade (local):** Assumes constant flow $(u,v)$ in window. Overdetermined system (9 equations for 3x3 window), solved by least squares:

$$\begin{bmatrix} u \\ v \end{bmatrix} = \begin{bmatrix} \sum I_x^2 & \sum I_x I_y \\ \sum I_x I_y & \sum I_y^2 \end{bmatrix}^{-1} \begin{bmatrix} -\sum I_x I_t \\ -\sum I_y I_t \end{bmatrix}$$

$A^T A$ has same structure as Harris tensor — **LK works best at corners** (both eigenvalues large).

**LK Computation Steps (from 5x5 patches):**
1. Identify 3x3 window at centre (rows 1-3, cols 1-3, 0-indexed)
2. $I_x = I(x{+}1,y) - I(x,y)$ for each pixel (use formula given!)
3. $I_y = I(x,y{+}1) - I(x,y)$ for each pixel
4. $I_t = I(x,y,t{+}1) - I(x,y,t)$ for each pixel
5. Compute sums: $\sum I_x^2$, $\sum I_y^2$, $\sum I_x I_y$, $\sum I_x I_t$, $\sum I_y I_t$
6. Form 2x2 system, solve via inverse: $(A^TA)^{-1} = \frac{1}{\det} \begin{bmatrix} a_{22} & -a_{12} \\ -a_{21} & a_{11} \end{bmatrix}$

**Horn-Schunck (global):** $E = \sum[(I_x u + I_y v + I_t)^2 + \lambda((u-\bar{u})^2+(v-\bar{v})^2)]$. Dense output, iterative, over-smooths boundaries.

| | Lucas-Kanade | Horn-Schunck |
|---|---|---|
| Scope | Local (per window) | Global (all pixels) |
| Output | Sparse | Dense |
| Iterative | No | Yes |
| Error propagation | Local only | Global |
| Boundaries | Errors near edges | Over-smooths |

**Multi-resolution pyramid:** Downsample $\to$ solve coarse $\to$ upsample $\times 2$ $\to$ warp $\to$ solve residual. Handles large motions beyond small-motion assumption.

**Optical flow $\neq$ motion:** Rotating uniform sphere = motion but no OF. Static sphere + moving light = OF but no motion.

---

## Section A Q2: Feature Extraction & Object Recognition

### LBP (Local Binary Pattern)

**Steps:** Compare centre to 8 neighbours clockwise from top-left. $b_i = 1$ if neighbour $\geq$ centre, else 0. Read as 8-bit binary $\to$ convert to decimal.

**For classification:** Divide image into cells $\to$ histogram of LBP codes per cell $\to$ concatenate all histograms $\to$ feed to SVM.

**Trap:** Check whether question defines top-left as MSB (bit 7) or LSB (bit 0).

### Structure Tensor (Harris / SIFT Keypoint Detection)

**Given Ix and Iy grids, compute:**

$$H = \begin{bmatrix} \sum I_x^2 & \sum I_x I_y \\ \sum I_x I_y & \sum I_y^2 \end{bmatrix}$$

| Eigenvalues | Classification |
|-------------|---------------|
| Both small | Flat |
| One large, one small | Edge |
| Both large | **Corner / Keypoint** |

**Harris response:** $R = \det(H) - k \cdot \text{trace}(H)^2$, &nbsp; $k \approx 0.04$-$0.06$

Avoids computing eigenvalues directly. $R \gg 0$ = corner, $R \ll 0$ = edge, $|R| \approx 0$ = flat.

Harris is rotation invariant. **NOT** scale invariant.

---

### SIFT (Scale Invariant Feature Transform)

| Stage | Method |
|-------|--------|
| 1. Scale-space extrema | DoG: $D = G(k\sigma) - G(\sigma)$; compare to **26 neighbours** (8 + 9 + 9) |
| 2. Keypoint localisation | Reject low contrast + edges via Hessian ratio |
| 3. Orientation | 36-bin gradient histogram, dominant peak = canonical orientation |
| 4. Descriptor | 16x16 window $\to$ 4x4 cells $\times$ 8-bin histograms = **128-D** |

**Matching:** Lowe's ratio test: accept if $d_1/d_2 < 0.8$

**RANSAC:** Random sample $\to$ fit model $\to$ count inliers $\to$ repeat $N$ times $\to$ keep best.

### HoG (Histogram of Oriented Gradients)

Gradient magnitude + orientation $\to$ 8x8 cells $\to$ 9-bin histogram (0-180) $\to$ 2x2 block normalise (L2) $\to$ concatenate. Used in pedestrian detection (Dalal & Triggs).

---

### Object Recognition

**Bag of Features pipeline:**
1. Extract SIFT descriptors from training images
2. K-means on all descriptors $\to$ visual vocabulary (codebook)
3. For each image: assign features to nearest visual word, build histogram
4. IDF weighting: $\text{IDF}(w) = \log(N_\text{total} / N_\text{containing})$
5. Classify histogram with SVM

**Spatial Pyramid Matching:** Divide image into grids (1x1, 2x2, 4x4), BoF per cell $\to$ concatenate. Adds coarse spatial layout.

---

### Viola-Jones Face Detection

| Component | Role |
|-----------|------|
| Haar features | Sum(white) - Sum(black); ~160,000 in 24x24 window |
| Integral image | Any rect sum in **O(1)** with 4 lookups |
| AdaBoost | Select best weak classifiers; $\alpha_t = \frac{1}{2}\ln\frac{1-\epsilon_t}{\epsilon_t}$ |
| Cascade | Early stages: few features, high recall; reject non-faces fast |

**Integral image:** $ii(x,y) = \sum_{x' \leq x, y' \leq y} i(x',y')$

Recurrence: $s(x,y) = s(x{-}1,y) + i(x,y)$; &nbsp; $ii(x,y) = ii(x,y{-}1) + s(x,y)$

Or: $ii(x,y) = i(x,y) + ii(x{-}1,y) + ii(x,y{-}1) - ii(x{-}1,y{-}1)$

**Cascade logic:** Stage 1 uses ~2 features, rejects 50% negatives. ~38 stages total. Early rejection = real-time speed.

**Evaluation:** Precision $= \frac{TP}{TP+FP}$, &nbsp; Recall $= \frac{TP}{TP+FN}$, &nbsp; F1 $= \frac{2 \cdot P \cdot R}{P + R}$, &nbsp; IoU $= \frac{\text{Intersection}}{\text{Union}}$

---

## Section A Q3: Stereo Vision

### Camera Model & Intrinsic Matrix K

**Projection:** $\mathbf{p} = K[R|\mathbf{t}]\mathbf{P}$ &nbsp; (11 DoF: 5 intrinsic + 6 extrinsic)

$$K = \begin{bmatrix} f_x & s & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix}$$

**K matrix calculation (appears every year):**
1. Convert: $f_{px} = f_{mm} \times \text{pixels/mm}$. Note: 72 dpi = 28.35 px/cm = **2.835 px/mm**; 96 dpi = 37.80 px/cm = **3.780 px/mm**
2. Principal point: $c_x = \text{width}/2$, &nbsp; $c_y = \text{height}/2$
3. If square pixels and no skew: $f_x = f_y$, $s = 0$

**Projection equations:** $u = f_x \frac{X}{Z} + c_x$, &nbsp; $v = f_y \frac{Y}{Z} + c_y$

**Homogeneous coordinates:** $(x,y) \to (x,y,1)^T$. Line through 2 pts: $l = p_1 \times p_2$. Intersection: $p = l_1 \times l_2$.

---

### Stereo Depth

**Depth from disparity (rectified):**

$$Z = \frac{f \cdot B}{d}, \quad d = x_L - x_R \text{ (always positive)}$$

Large disparity = close. Small disparity = far. Zero disparity = infinity.

**3D reconstruction:** $X = (u - c_x) \cdot Z / f$, &nbsp; $Y = (v - c_y) \cdot Z / f$

**Physical distance:** $\text{dist} = \sqrt{(X_2-X_1)^2 + (Y_2-Y_1)^2 + (Z_2-Z_1)^2}$

**Depth resolution decreases with distance** (disparity decreases inversely; quantisation error has larger effect).

---

### Epipolar Geometry

| Term | Definition |
|------|-----------|
| Epipolar plane | Plane through 3D point $P$ and both camera centres $O_1, O_2$ |
| Epipolar line | Intersection of epipolar plane with image plane |
| Epipole | Projection of one camera centre into other's image |
| Baseline | Line connecting the two camera centres |

**Fundamental matrix** $F$ (uncalibrated, 7 DoF, rank 2): $\mathbf{p}_2^T F \mathbf{p}_1 = 0$

**Essential matrix** $E = [\mathbf{t}]_\times R$ (calibrated, 5 DoF): relation $F = K'^{-T} E K^{-1}$

| | Fundamental $F$ | Essential $E$ |
|---|---|---|
| Cameras | Uncalibrated (pixel coords) | Calibrated (normalised coords) |
| DoF | 7 | 5 |
| Encodes | Intrinsics + relative pose | Relative pose only ($R$, $t$) |
| Equivalent when | $K = K' = I$ | -- |

**Epipolar line in image 2:** $l_2 = F\mathbf{p}_1$. All epipolar lines pass through epipole.

**Rectification:** Warp images so epipolar lines become horizontal $\to$ correspondence search reduces to 1D (same row).

---

### Block Matching

Slide window along scanline, minimise SSD/SAD or maximise NCC.

| Window Size | Pros | Cons |
|-------------|------|------|
| Small | Sharp edges, fine detail | Noisy, ambiguous matches |
| Large | Smooth, robust | Blurs depth boundaries |

**Failures:** Occlusions, textureless regions, repetitive patterns, thin structures.

---

## Section A Q4: Deep Learning

### CNN Fundamentals

**Output size:** $\text{out} = \lfloor\frac{\text{in} - F + 2P}{S}\rfloor + 1$

**Parameters:** $K \times (C_{in} \times F \times F + 1)$ for $K$ filters

**Convolution:** volumetric (all input channels). **Pooling:** spatial only, no learnable params, preserves channel count.

**Receptive field:** $L$ layers of $F \times F$ stride 1: RF $= L(F-1)+1$. Three 3x3 = 7x7 RF with $3 \times 9C^2 = 27C^2$ params (vs $49C^2$) + 3 ReLUs.

---

### Architectures

| Architecture | Key Innovation | Depth |
|-------------|----------------|-------|
| AlexNet (2012) | ReLU, dropout, GPU training | 8 |
| VGGNet (2014) | Small 3x3 filters only, deeper | 16/19 |
| ResNet (2015) | Skip connections: $y = F(x) + x$ | 50/101/152 |

**ResNet solves degradation** (not overfitting): adding layers to a good network makes training loss WORSE. Skip connections allow learning identity ($F=0$) — at worst, extra layers do nothing.

**1x1 Conv:** Channel mixing/dimensionality reduction. Bottleneck before expensive convolutions.

**Transfer Learning:**

| Strategy | When | Method |
|----------|------|--------|
| Feature extraction | Small data, similar domain | Freeze all conv, train new FC head |
| Fine-tuning | Moderate data | Unfreeze later layers, small learning rate |

Early layers = generic (edges, textures). Later layers = task-specific.

---

### GANs (Generative Adversarial Networks)

**Objective:** $\min_G \max_D \; \mathbb{E}_{x \sim p_{data}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1-D(G(z)))]$

| Network | Input | Goal |
|---------|-------|------|
| Generator $G$ | Noise $z$ | Fool $D$ (produce realistic images) |
| Discriminator $D$ | Real or fake image | Classify correctly |

**Equilibrium:** $D(x) = 0.5$ everywhere, $p_G = p_{data}$

| Problem | Fix |
|---------|-----|
| Mode collapse (limited variety) | Minibatch discrimination, diversity loss |
| Training instability | Spectral normalisation, progressive growing |
| Vanishing G gradients | Wasserstein loss, label smoothing |

**GAN for 3D Reconstruction:** Encoder (image $\to$ latent) $\to$ Generator (latent $\to$ 3D model) $\to$ Discriminator (real vs fake 3D) + Classifier (class label). Adversarial loss produces sharper outputs than L2 alone.

---

### Vision Transformers (ViT)

**Pipeline:** Image $\to$ 16x16 patches $\to$ flatten + linear projection (768-D) $\to$ add positional encoding $\to$ prepend [CLS] token $\to$ Transformer encoder $\to$ MLP head

**Attention:** $\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$

Scale by $\sqrt{d_k}$: prevents large dot products $\to$ softmax saturation $\to$ vanishing gradients.

**[CLS] token:** Learnable embedding prepended to sequence. Aggregates global info through attention across layers. Final [CLS] output $\to$ classification head.

**Multi-head:** Split Q,K,V into $H$ heads of $d/H$ dims. Each head learns different attention patterns. Concat + linear project.

---

### Neural Network Basics

| Activation | Formula | Issue |
|-----------|---------|-------|
| Sigmoid | $\frac{1}{1+e^{-x}}$ | Vanishing gradient |
| ReLU | $\max(0, x)$ | Dying neurons |
| Softmax | $e^{x_i}/\sum_j e^{x_j}$ | Output for multi-class |

**Backprop:** $\frac{\partial L}{\partial w_{ij}^{(l)}} = \delta_i^{(l)} \cdot a_j^{(l-1)}$ &nbsp; (error $\times$ activation)

**BatchNorm:** Normalise per mini-batch, learn $\gamma$, $\beta$. Inference: use running averages.

**Dropout:** Zero neurons with prob $(1-p)$ in training. Forces redundancy.

---

## Section B Reference (Pick 2 of 3)

### B-Q5: Stereo Vision (Extended)

**Full 3D reconstruction workflow:**
1. Disparity: $d = x_L - x_R$ for each point pair
2. Depth: $Z = fB/d$
3. 3D coords: $X = (u-c_x) Z/f$, $Y = (v-c_y) Z/f$
4. Physical dimensions: Euclidean distance between 3D points

**Deep Stereo Pipeline (5 stages):**

| Stage | Method |
|-------|--------|
| A. Feature extraction | Siamese CNN on L/R images (shared weights) |
| B. Feature matching | Build cost volume $H \times W \times D_{max}$ |
| C. Cost volume regularisation | 3D convolutions enforce smoothness |
| D. Argmin | Soft argmin: $d = \sum_d d \cdot \text{softmax}(-C(x,y,d))$ (differentiable, sub-pixel) |
| E. Post-processing | Residual refinement CNN, L-R consistency check |

**Cost volume:** $C(x,y,d)$ = matching cost between left feature at $(x,y)$ and right feature at $(x-d,y)$.

**Soft argmin:** Differentiable (enables end-to-end training). Produces sub-pixel disparity. Hard argmin is NOT differentiable.

---

### B-Q6: Deep Learning & Image Classification

**Architecture comparison:**

| | AlexNet | VGGNet | ResNet |
|---|---|---|---|
| Innovation | ReLU, dropout | 3x3 only | Skip connections |
| Depth | 8 | 16/19 | 50-152 |
| Filter strategy | Large (11x11, 5x5) | All 3x3 | 3x3 + bottleneck |
| Limitation | Shallow, large filters | Too many params (138M) | Complex training |

**Transfer learning for small datasets (e.g., 500 medical images):**
- Freeze pre-trained conv layers (generic features still useful)
- Replace + train FC head only
- Data augmentation: rotation, flip, scale, elastic deformation
- NOT colour jitter (medical images have diagnostic colour info)

**Metrics:**

| Metric | Formula | Best When |
|--------|---------|-----------|
| Precision | $TP/(TP+FP)$ | Cost of false positive high (spam filter) |
| Recall | $TP/(TP+FN)$ | Cost of missing positive high (cancer detection) |
| F1 | $2PR/(P+R)$ | Balance needed |

**GAN for 3D Reconstruction components:**
- **Encoder:** 2D image $\to$ latent vector $z$
- **Generator:** $z$ + class label $\to$ 3D voxel model
- **Discriminator:** Real vs generated 3D (adversarial loss)
- **Classifier:** Predicts class from generated 3D (classification loss)
- At test time: only Encoder + Generator needed

---

### B-Q7: Segmentation & Optical Flow (Extended)

**GMM System Design (for natural scene in HSV):**
1. Choose $g$ = number of distinct regions (typically 3)
2. Feature vector: $\mathbf{x} = [H, S, V]^T$ per pixel
3. Initialise: means from histogram peaks, $\pi_i = 1/g$
4. Run EM until convergence
5. Assign: $\text{class}(x_i) = \arg\max_k P(\theta_k | x_i)$

**LK vs HS extended comparison:**

| Aspect | Lucas-Kanade | Horn-Schunck |
|--------|---|---|
| Scope | Local window | Global (all pixels) |
| Output | Sparse (feature points) | Dense (every pixel) |
| Assumption | Constant flow in window | Global smoothness |
| Boundaries | May be inaccurate | Over-smoothed |
| Iterative | No (closed-form) | Yes |
| $A^T A$ structure | Same as Harris matrix | N/A |
| Works best at | Corners (both $\lambda$ large) | Everywhere (but blurred) |

**Multi-resolution pyramid:**
1. Build Gaussian pyramid (downsample by 2 at each level)
2. Estimate flow at coarsest level (small motion there)
3. Upsample flow $\times 2$, warp finer level
4. Estimate residual flow at finer level
5. Repeat to full resolution

Overcomes small-motion assumption by making large motions small at coarse resolution.

---

## Key Formulas (Non-Negotiable)

| # | Formula | When |
|---|---------|------|
| 1 | $J = \sum r_{nk} \|\mathbf{x}_n - \boldsymbol{\mu}_k\|^2$ | K-means objective |
| 2 | $P(\theta_i\|x_j) = \frac{\pi_i g(x_j\|\theta_i)}{\sum_m \pi_m g(x_j\|\theta_m)}$ | EM E-step |
| 3 | $R = \det(H) - k \cdot \text{trace}(H)^2$ | Harris corner |
| 4 | $I_x u + I_y v + I_t = 0$ | Optical flow constraint |
| 5 | $(A^TA)\mathbf{d} = A^T\mathbf{b}$ where $\mathbf{b} = [-I_t]$ | Lucas-Kanade |
| 6 | $Z = fB/d$, &nbsp; $d = x_L - x_R$ | Stereo depth |
| 7 | $\mathbf{p}_2^T F \mathbf{p}_1 = 0$ | Epipolar constraint |
| 8 | $\text{out} = (W - F + 2P)/S + 1$ | CNN output size |
| 9 | $\text{params} = K(C_{in} \cdot F^2 + 1)$ | CNN layer params |
| 10 | $\min_G \max_D \; \mathbb{E}[\log D(x)] + \mathbb{E}[\log(1-D(G(z)))]$ | GAN objective |
| 11 | $\text{Attn} = \text{softmax}(QK^T/\sqrt{d_k})V$ | Transformer attention |
| 12 | $\alpha_t = \frac{1}{2}\ln\frac{1-\epsilon_t}{\epsilon_t}$ | AdaBoost weight |

---

## Exam Traps (Quick Reference)

| Trap | Correct |
|------|---------|
| LBP bit order | Read question: top-left clockwise. Check MSB vs LSB convention |
| DPI conversion | 72 dpi = 2.835 px/mm (NOT px/cm) |
| Principal point | $c_x$ = WIDTH/2, $c_y$ = HEIGHT/2 |
| Disparity sign | $d = x_L - x_R$ (always positive for objects in front) |
| LK sign convention | System: $I_x u + I_y v = -I_t$, so $\mathbf{b} = [-I_t]$ |
| GAN equilibrium | $D(x) = 0.5$ (not "D always outputs 1") |
| Soft vs hard argmin | Soft = differentiable (weighted sum); hard = not |
| ResNet solves | Degradation (not overfitting) |
| Optical flow | $\neq$ motion (sphere examples) |
| Ix formula | Use EXACT formula given in question |
