---
title: "Mock Exam Solutions"
order: 87
moduleTitle: "COMP3029 - Computer Vision"
tags: ["exam", "mock", "solutions", "answers"]
---

## COMP3029 Computer Vision — Mock Exam Solutions

---

## SECTION A

---

## Question 1: Segmentation, Motion Analysis, and Optical Flow

### (a) K-Means and GMM Segmentation

#### (i) One Iteration of K-Means [4 marks]

**Initial centres:** $\mu_1 = 45$, $\mu_2 = 130$, $\mu_3 = 200$

**Image pixels (flattened):**
```
45, 48, 130, 135, 42, 50, 128, 140, 44, 46, 200, 205, 47, 45, 195, 210
```

**Assignment step** — assign each pixel to nearest centre:

| Pixel | Distances to $\mu_1=45$, $\mu_2=130$, $\mu_3=200$ | Assigned Cluster |
|-------|-------|--------|
| 45 | 0, 85, 155 | 1 |
| 48 | 3, 82, 152 | 1 |
| 130 | 85, 0, 70 | 2 |
| 135 | 90, 5, 65 | 2 |
| 42 | 3, 88, 158 | 1 |
| 50 | 5, 80, 150 | 1 |
| 128 | 83, 2, 72 | 2 |
| 140 | 95, 10, 60 | 2 |
| 44 | 1, 86, 156 | 1 |
| 46 | 1, 84, 154 | 1 |
| 200 | 155, 70, 0 | 3 |
| 205 | 160, 75, 5 | 3 |
| 47 | 2, 83, 153 | 1 |
| 45 | 0, 85, 155 | 1 |
| 195 | 150, 65, 5 | 3 |
| 210 | 165, 80, 10 | 3 |

**Update step** — recalculate means:

- Cluster 1: {45, 48, 42, 50, 44, 46, 47, 45} → $\mu_1 = 367/8 = \mathbf{45.875}$
- Cluster 2: {130, 135, 128, 140} → $\mu_2 = 533/4 = \mathbf{133.25}$
- Cluster 3: {200, 205, 195, 210} → $\mu_3 = 810/4 = \mathbf{202.5}$

**New cluster centres:** $\mu_1 = 45.875$, $\mu_2 = 133.25$, $\mu_3 = 202.5$

---

#### (ii) EM vs K-Means [3 marks]

In K-means, each pixel is assigned **hard** membership: $r_{ik} = 1$ for the nearest cluster, 0 otherwise.

In the EM algorithm for GMMs, the E-step computes **soft** responsibilities (posterior probabilities):

$$P(\theta_k | x_i) = \frac{\pi_k \, \mathcal{N}(x_i | \mu_k, \Sigma_k)}{\sum_{m=1}^{K} \pi_m \, \mathcal{N}(x_i | \mu_m, \Sigma_m)}$$

This gives each pixel a probability of belonging to each cluster (e.g., 0.7 road, 0.2 vehicle, 0.1 marking).

**Advantage for boundary pixels:** A pixel at the edge between road and vehicle may have intensity 90 — equidistant between dark road and medium vehicle. K-means forces a hard binary decision, potentially misclassifying boundary pixels. GMM's soft assignment acknowledges the ambiguity, assigning partial membership to both classes. This produces smoother, more accurate boundaries in the final segmentation.

---

#### (iii) Neighbourhood-Modified Objective [3 marks]

The original objective $L$ clusters pixels based solely on feature similarity to cluster centres, ignoring spatial location. Two pixels with identical intensity but in different spatial regions will always receive the same assignment.

The modified objective $L'$ adds a penalty term that considers **neighbourhood structure**. The function $f(x_i, x_j)$ penalises situations where spatially adjacent pixels ($j \in \Omega(i)$) are assigned to different clusters if their feature vectors are similar.

**Effect:** Minimising $L'$ produces segmentations with:
- **Spatial coherence:** Adjacent pixels tend to belong to the same cluster, reducing salt-and-pepper noise
- **Smoother boundaries:** Isolated misclassified pixels are penalised by their neighbours
- **Reduced over-segmentation:** The neighbourhood term acts as a smoothness prior

This is analogous to adding a Markov Random Field (MRF) prior to the segmentation, enforcing the prior belief that natural images have spatially contiguous regions.

---

### (b) Optical Flow

#### (i) Gradient Calculation [5 marks]

**Time $t$ image (0-indexed):**
```
Row 0: 180  180  180  178  175
Row 1: 180  180  179  175  170
Row 2: 180  178  175  170  165
Row 3: 178  175  170  165  160
Row 4: 175  170  165  160  155
```

Centre pixel at (row=2, col=2), value = 175. The 3x3 window covers rows 1-3, cols 1-3.

**3x3 window from time $t$:**
```
180  179  175
178  175  170
175  170  165
```

**$I_x = I(x+1, y) - I(x, y)$** (shift in column direction):

| Position | Calculation | Value |
|----------|-------------|-------|
| (1,1) | I(1,2) - I(1,1) = 179 - 180 | -1 |
| (1,2) | I(1,3) - I(1,2) = 175 - 179 | -4 |
| (1,3) | I(1,4) - I(1,3) = 170 - 175 | -5 |
| (2,1) | I(2,2) - I(2,1) = 175 - 178 | -3 |
| (2,2) | I(2,3) - I(2,2) = 170 - 175 | -5 |
| (2,3) | I(2,4) - I(2,3) = 165 - 170 | -5 |
| (3,1) | I(3,2) - I(3,1) = 170 - 175 | -5 |
| (3,2) | I(3,3) - I(3,2) = 165 - 170 | -5 |
| (3,3) | I(3,4) - I(3,3) = 160 - 165 | -5 |

$$I_x = \begin{bmatrix} -1 & -4 & -5 \\ -3 & -5 & -5 \\ -5 & -5 & -5 \end{bmatrix}$$

**$I_y = I(x, y+1) - I(x, y)$** (shift in row direction):

| Position | Calculation | Value |
|----------|-------------|-------|
| (1,1) | I(2,1) - I(1,1) = 178 - 180 | -2 |
| (1,2) | I(2,2) - I(1,2) = 175 - 179 | -4 |
| (1,3) | I(2,3) - I(1,3) = 170 - 175 | -5 |
| (2,1) | I(3,1) - I(2,1) = 175 - 178 | -3 |
| (2,2) | I(3,2) - I(2,2) = 170 - 175 | -5 |
| (2,3) | I(3,3) - I(2,3) = 165 - 170 | -5 |
| (3,1) | I(4,1) - I(3,1) = 170 - 175 | -5 |
| (3,2) | I(4,2) - I(3,2) = 165 - 170 | -5 |
| (3,3) | I(4,3) - I(3,3) = 160 - 165 | -5 |

$$I_y = \begin{bmatrix} -2 & -4 & -5 \\ -3 & -5 & -5 \\ -5 & -5 & -5 \end{bmatrix}$$

**$I_t = I(x, y, t+1) - I(x, y, t)$:**

Time $t+1$ window (rows 1-3, cols 1-3):
```
180  178  175
178  175  170
175  170  165
```

$$I_t = \begin{bmatrix} 180-180 & 178-179 & 175-175 \\ 178-178 & 175-175 & 170-170 \\ 175-175 & 170-170 & 165-165 \end{bmatrix} = \begin{bmatrix} 0 & -1 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}$$

---

#### (ii) Lucas-Kanade Solution [5 marks]

The optical flow constraint: $I_x u + I_y v + I_t = 0$, rearranged as $I_x u + I_y v = -I_t$.

Setting up: $A = [I_x, I_y]$ per pixel, $\mathbf{b} = [-I_t]$ per pixel.

**Computing $A^T A$:**

$$\sum I_x^2 = 1 + 16 + 25 + 9 + 25 + 25 + 25 + 25 + 25 = 176$$

$$\sum I_y^2 = 4 + 16 + 25 + 9 + 25 + 25 + 25 + 25 + 25 = 179$$

$$\sum I_x I_y = 2 + 16 + 25 + 9 + 25 + 25 + 25 + 25 + 25 = 177$$

$$A^T A = \begin{bmatrix} 176 & 177 \\ 177 & 179 \end{bmatrix}$$

**Computing $A^T \mathbf{b}$** (where $\mathbf{b} = [-I_t]$ values: 0, 1, 0, 0, 0, 0, 0, 0, 0):

$$\sum I_x \cdot (-I_t) = (-1)(0) + (-4)(1) + (-5)(0) + (-3)(0) + (-5)(0) + (-5)(0) + (-5)(0) + (-5)(0) + (-5)(0) = -4$$

$$\sum I_y \cdot (-I_t) = (-2)(0) + (-4)(1) + (-5)(0) + (-3)(0) + (-5)(0) + (-5)(0) + (-5)(0) + (-5)(0) + (-5)(0) = -4$$

**System:**
$$\begin{bmatrix} 176 & 177 \\ 177 & 179 \end{bmatrix} \begin{bmatrix} u \\ v \end{bmatrix} = \begin{bmatrix} -4 \\ -4 \end{bmatrix}$$

**Solving:**

$\det(A^T A) = 176 \times 179 - 177 \times 177 = 31504 - 31329 = 175$

$$(A^T A)^{-1} = \frac{1}{175} \begin{bmatrix} 179 & -177 \\ -177 & 176 \end{bmatrix}$$

$$u = \frac{1}{175}(179 \times (-4) + (-177) \times (-4)) = \frac{1}{175}(-716 + 708) = \frac{-8}{175} \approx -0.046$$

$$v = \frac{1}{175}((-177) \times (-4) + 176 \times (-4)) = \frac{1}{175}(708 - 704) = \frac{4}{175} \approx 0.023$$

**Result:** $(u, v) \approx (-0.046, 0.023)$ pixels/frame.

**Interpretation:** The motion is very small — slightly leftward and slightly downward. This is consistent with the time $t+1$ patch being a shifted version of time $t$, where the gradient pattern moved approximately 1 pixel to the upper-left (the content shifted diagonally). The small magnitude indicates a near-uniform diagonal gradient where the pattern shift between frames is minimal.

Note: The near-singular $A^T A$ (determinant = 175, but the matrix entries are ~177) indicates the gradients are nearly parallel (both $I_x$ and $I_y$ are similar values), making this a challenging region for LK — close to the aperture problem.

---

## Question 2: Feature Extraction and Object Recognition

### (a) Image Features

#### (i-A) LBP String [3 marks]

**Image patch:**
```
 88  102   95
 92  100  108
105   97  112
```

Central pixel value = 100.

Compare each neighbour to centre (100), clockwise from top-left:

| Position | Value | >= 100? | Bit |
|----------|-------|---------|-----|
| Top-left | 88 | No | 0 |
| Top | 102 | Yes | 1 |
| Top-right | 95 | No | 0 |
| Right | 108 | Yes | 1 |
| Bottom-right | 112 | Yes | 1 |
| Bottom | 97 | No | 0 |
| Bottom-left | 105 | Yes | 1 |
| Left | 92 | No | 0 |

**Binary pattern (clockwise from top-left):** 01011010

**Decimal conversion** (top-left as MSB → LSB):
$0 \times 128 + 1 \times 64 + 0 \times 32 + 1 \times 16 + 1 \times 8 + 0 \times 4 + 1 \times 2 + 0 \times 1 = 64 + 16 + 8 + 2 = \mathbf{90}$

---

#### (i-B) LBP for Classification [2 marks]

1. **Cell histograms:** Divide the image into cells (e.g., 16x16 pixels). Compute LBP for every pixel in each cell. Build a 256-bin histogram per cell counting frequency of each LBP code.

2. **Spatial structure:** Arrange cells into a grid (e.g., 4x4). Concatenate all cell histograms into a single feature vector (e.g., 4×4×256 = 4096 dimensions).

3. **Classification:** Feed the concatenated histogram to an SVM classifier. The spatial histogram preserves both local texture information (from LBP) and global spatial layout (from the grid structure).

---

#### (ii-A) Structure Tensor [3 marks]

**$I_x$ (x-axis derivatives):**
```
 2   4  -1
 3   6   0
-2   1   3
```

**$I_y$ (y-axis derivatives):**
```
 1  -2   3
 4   2  -1
 0   3   2
```

$$H = \begin{bmatrix} \sum I_x^2 & \sum I_x I_y \\ \sum I_x I_y & \sum I_y^2 \end{bmatrix}$$

**$\sum I_x^2$:** $4 + 16 + 1 + 9 + 36 + 0 + 4 + 1 + 9 = \mathbf{80}$

**$\sum I_y^2$:** $1 + 4 + 9 + 16 + 4 + 1 + 0 + 9 + 4 = \mathbf{48}$

**$\sum I_x I_y$:** $(2)(1) + (4)(-2) + (-1)(3) + (3)(4) + (6)(2) + (0)(-1) + (-2)(0) + (1)(3) + (3)(2)$
$= 2 - 8 - 3 + 12 + 12 + 0 + 0 + 3 + 6 = \mathbf{24}$

$$H = \begin{bmatrix} 80 & 24 \\ 24 & 48 \end{bmatrix}$$

---

#### (ii-B) Eigenvalue Interpretation [2 marks]

The eigenvalues $\lambda_1$, $\lambda_2$ of $H$ encode local image structure:
- **Both small:** Flat region (no gradient variation)
- **One large, one small:** Edge (gradient in one direction only)
- **Both large:** Corner/keypoint (gradient varies in both directions)

The **Harris response function** $R = \det(H) - k \cdot \text{trace}(H)^2$ avoids explicit eigenvalue computation by using:
- $\det(H) = \lambda_1 \lambda_2$
- $\text{trace}(H) = \lambda_1 + \lambda_2$

A corner gives large $\det$ relative to $\text{trace}^2$, so $R \gg 0$.

For our matrix: $\det(H) = 80 \times 48 - 24^2 = 3840 - 576 = 3264$; $\text{trace}(H) = 128$. With $k=0.04$: $R = 3264 - 0.04 \times 128^2 = 3264 - 655.36 = 2608.64$ → strong corner.

---

### (b) Object Recognition

#### (i) Bag of Features Pipeline [5 marks]

**Step 1 — Feature Detection & Description:**
Extract SIFT features from all training images. Each keypoint produces a 128-dimensional descriptor capturing the local gradient structure in a scale/rotation-invariant manner.

**Step 2 — Visual Vocabulary Construction:**
Apply K-means clustering to all extracted SIFT descriptors (from all training images). The $K$ cluster centres become the "visual words" — a codebook/dictionary (typically $K$ = 500-5000).

**Step 3 — Histogram Construction:**
For each image (training or test): extract SIFT features, assign each descriptor to the nearest visual word (nearest cluster centre), and build a histogram counting the frequency of each word. This produces a $K$-dimensional vector per image.

**Step 4 — IDF Weighting:**
Apply Inverse Document Frequency weighting: $\text{IDF}(w) = \log(N_{total} / N_{containing\_w})$. Words that appear in many images (e.g., generic texture) get down-weighted; distinctive words get up-weighted. Multiply each histogram bin by its IDF weight.

**Step 5 — Classification:**
Train an SVM (or other classifier) on the IDF-weighted histograms. For a new test image: extract SIFT → assign to words → build weighted histogram → SVM predicts class.

**Limitation:** Standard BoF is orderless (loses spatial information). **Spatial Pyramid Matching (SPM)** addresses this by dividing the image into grids (1×1, 2×2, 4×4) and building separate BoF histograms per cell, then concatenating.

---

#### (ii-A) Integral Image [3 marks]

**Image patch:**
```
 70   80   90
100  110  120
 60   50   40
```

The integral image $II(x,y)$ stores the sum of all pixels above and to the left, inclusive.

Using recurrence: $II(x,y) = I(x,y) + II(x-1,y) + II(x,y-1) - II(x-1,y-1)$

**Row 0:**
- II(0,0) = 70
- II(1,0) = 70 + 80 = 150
- II(2,0) = 150 + 90 = 240

**Row 1:**
- II(0,1) = 70 + 100 = 170
- II(1,1) = 110 + 150 + 170 - 70 = 360
- II(2,1) = 120 + 240 + 360 - 150 = 570

**Row 2:**
- II(0,2) = 170 + 60 = 230
- II(1,2) = 50 + 230 + 360 - 170 = 470
- II(2,2) = 40 + 570 + 470 - 360 = 720

**Integral Image:**
```
 70  150  240
170  360  570
230  470  720
```

Any rectangular sum can be computed with **4 lookups:** $\text{Sum}(r) = II(D) + II(A) - II(B) - II(C)$, where A, B, C, D are the four corners of the rectangle. This is O(1) regardless of rectangle size.

---

#### (ii-B) Cascade Structure [2 marks]

**Early stages** use few features (e.g., stage 1 uses ~2 features) and are designed with **high recall** (detect nearly all faces, accepting some false positives). This means:
- Non-face regions are rejected quickly (most image sub-windows are background)
- True faces pass through to deeper stages for further verification

**When a sub-window is rejected** at any stage, it is immediately discarded — no further computation is performed on it. This gives the cascade its speed: ~50% of non-faces are rejected at stage 1, another ~50% of survivors at stage 2, etc. Only genuine face candidates reach the expensive later stages (with many features). This achieves real-time detection (15+ fps) despite having ~6000 total features across ~38 stages.

---

## Question 3: Stereo Vision

### (a) Camera Model and Depth Estimation

#### (i) Intrinsic Parameter Matrix [5 marks]

**Given:** $f = 50$ mm, 96 dpi = 37.80 pixels/cm, image 3840 × 2160

**Step 1: Convert focal length to pixels.**

37.80 pixels/cm = 3.780 pixels/mm

$f_{pixels} = 50 \text{ mm} \times 3.780 \text{ pixels/mm} = \mathbf{189.0 \text{ pixels}}$

Since pixels are square (single dpi value): $f_x = f_y = 189.0$

**Step 2: Principal point** (assume image centre):

$c_x = 3840 / 2 = \mathbf{1920}$
$c_y = 2160 / 2 = \mathbf{1080}$

**Step 3: Intrinsic matrix** (no skew):

$$K = \begin{bmatrix} 189.0 & 0 & 1920 \\ 0 & 189.0 & 1080 \\ 0 & 0 & 1 \end{bmatrix}$$

---

#### (ii) Depth Calculations [5 marks]

**Given:** $B = 12$ cm, $f = 800$ pixels.

**(A)** Disparity: $d = x_L - x_R = 520 - 472 = 48$ pixels

Depth: $Z = \frac{fB}{d} = \frac{800 \times 12}{48} = \frac{9600}{48} = \mathbf{200 \text{ cm} = 2.0 \text{ m}}$

**(B)** New depth: $Z' = 200 + 200 = 400$ cm

New disparity: $d' = \frac{fB}{Z'} = \frac{800 \times 12}{400} = \frac{9600}{400} = \mathbf{24 \text{ pixels}}$

**Comment on depth resolution:** The disparity halved (48 → 24) when depth doubled. Since $Z \propto 1/d$, depth resolution is **inversely proportional to the square of distance**: $\Delta Z = Z^2 / (fB) \cdot \Delta d$. At greater distances, a 1-pixel change in disparity corresponds to a much larger change in depth, meaning distant objects have significantly worse depth precision. At 2m, 1 pixel ≈ 4.2 cm; at 4m, 1 pixel ≈ 16.7 cm.

---

### (b) Epipolar Geometry

#### (i) Definitions and Search Reduction [4 marks]

**(A) Definitions:**

- **Epipolar plane:** The plane formed by the 3D point $P$ and the two camera centres $O_1$, $O_2$. Every point $P$ defines a different epipolar plane, but all share the baseline $O_1 O_2$.

- **Epipoles ($e$, $e'$):** The projection of each camera centre onto the other camera's image. $e$ = image of $O_2$ in camera 1; $e'$ = image of $O_1$ in camera 2. All epipolar lines pass through the epipole.

- **Epipolar lines:** The intersections of the epipolar plane with each image plane. For point $p$ in the left image, its epipolar line $l'$ in the right image is where the corresponding point $p'$ must lie.

**(B) Reducing 2D to 1D search:**

Without epipolar geometry, finding the correspondence of a point $p$ in the left image requires searching the entire 2D right image. The epipolar constraint states that $p'$ must lie on the epipolar line $l' = F\mathbf{p}$. This reduces the search from a 2D area to a **1D line**, dramatically reducing computation and ambiguity. After rectification, all epipolar lines become horizontal scanlines, making the search a simple 1D scan along a row.

---

#### (ii) Fundamental and Essential Matrices [6 marks]

**(A) What $F$ encodes:**

The fundamental matrix $F$ (3×3, rank 2, 7 DoF) encodes:
- The **intrinsic parameters** of both cameras ($K$ and $K'$)
- The **relative pose** (rotation $R$ and translation $t$) between cameras

Specifically: $F = K'^{-T} \, E \, K^{-1}$ where $E = [\mathbf{t}]_\times R$ is the essential matrix.

**(B) Fundamental vs Essential matrix:**

| | Fundamental Matrix $F$ | Essential Matrix $E$ |
|---|---|---|
| Coordinate system | Pixel coordinates | Normalised camera coordinates |
| DoF | 7 | 5 |
| Encodes | Intrinsics + relative pose | Relative pose only |
| Rank | 2 | 2 |
| Estimation | 8-point algorithm (pixels) | 5-point algorithm (calibrated) |

They are equivalent when both cameras have identity intrinsic matrices ($K = K' = I$), i.e., when working directly in normalised coordinates.

**(C) After rectification:**

Epipolar lines become **horizontal scanlines** (parallel to the image x-axis). This means:
- Corresponding points share the same y-coordinate ($y_L = y_R$)
- The search for correspondences becomes a 1D scan along the same row
- The rectified fundamental matrix has the special form: $F = [\mathbf{e}']_\times = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{bmatrix}$ (or similar), encoding that all epipolar lines are horizontal

This greatly simplifies stereo matching algorithms (block matching, dynamic programming) as they only need to compare pixels along the same row.

---

## Question 4: Deep Learning

### (a) Convolutional Neural Networks

#### (i) Output Size and Parameters [4 marks]

**Given:** Input 128×128×32, 64 filters of 5×5, padding=2, stride=2.

**(A) Output spatial size:**

$$\text{out} = \frac{128 - 5 + 2 \times 2}{2} + 1 = \frac{128 - 5 + 4}{2} + 1 = \frac{127}{2} + 1 = 63 + 1 = \mathbf{64}$$

Output dimensions: **64 × 64 × 64**

**(B) Learnable parameters:**

Each filter: $5 \times 5 \times 32 + 1 \text{ (bias)} = 801$

Total: $64 \times 801 = \mathbf{51{,}264}$ parameters

---

#### (ii) Architectural Innovations [6 marks]

**(A) ResNet skip connections:**

The **degradation problem**: Deeper networks (beyond ~20 layers) achieve *worse* training accuracy than shallower ones — not due to overfitting (training error also increases), but because deeper networks are harder to optimise. The network struggles to learn even the identity mapping.

**Solution:** $y = F(x) + x$ (residual learning). The network only needs to learn the residual $F(x) = y - x$. If the optimal mapping is close to identity, the network simply learns $F(x) \approx 0$, which is much easier than learning the full mapping. Skip connections also provide direct gradient paths, alleviating vanishing gradients.

**(B) 1×1 convolutions:**

1×1 convolutions perform **channel-wise linear combination** at each spatial position. They reduce (or expand) the number of channels without changing spatial dimensions.

**Example:** Input 14×14×480. To apply 48 filters of 5×5:
- Without bottleneck: $48 \times 5 \times 5 \times 480 = 576{,}000$ parameters
- With 1×1 bottleneck (480→16, then 5×5 16→48): $16 \times 480 + 48 \times 5 \times 5 \times 16 = 7{,}680 + 19{,}200 = 26{,}880$ parameters

Reduction: **~21× fewer parameters**.

**(C) Three 3×3 vs one 7×7:**

| | Three 3×3 | One 7×7 |
|---|---|---|
| Receptive field | $3(3-1)+1 = 7$ | 7 |
| Parameters | $3 \times (9C^2) = 27C^2$ | $49C^2$ |
| Non-linearity | 3 ReLUs | 1 ReLU |

Three stacked 3×3 layers achieve the same receptive field as one 7×7 but with **45% fewer parameters** ($27C^2$ vs $49C^2$) and **3× more non-linearity** (more expressive decision boundaries). This is the key insight behind VGGNet.

---

### (b) Generative Models

#### (i) GAN Training [5 marks]

**(A) Roles and equilibrium:**

- **Generator $G$:** Takes random noise $z \sim p_z(z)$ (e.g., standard normal) and produces fake images $G(z)$. Its goal is to fool $D$ by producing images indistinguishable from real data.

- **Discriminator $D$:** Takes an image (real or fake) and outputs a probability that it is real. Its goal is to correctly classify real vs fake.

**Equilibrium (Nash equilibrium):** $p_G = p_{data}$ (generator distribution matches true data distribution), and $D(x) = 0.5$ for all $x$ (discriminator cannot distinguish real from fake — it's a coin flip).

**(B) Mode collapse:**

**Mode collapse** occurs when the generator produces only a small subset of the possible outputs, ignoring entire modes of the data distribution. For example, a GAN trained on MNIST might only generate "1"s and "7"s, ignoring other digits.

**Mitigation — Minibatch discrimination:** The discriminator receives statistics about how similar the current batch of generated images are to each other. If the generator produces many near-identical images (low diversity), the discriminator easily flags them as fake. This incentivises the generator to produce diverse outputs.

---

#### (ii) Vision Transformer [5 marks]

**(A) Input conversion pipeline:**

1. **Patch splitting:** Divide the $H \times W$ image into non-overlapping patches of size $P \times P$ (typically 16×16). This produces $N = (H/P) \times (W/P)$ patches.

2. **Linear projection:** Flatten each patch into a vector ($P^2 \times C$ dimensions) and apply a learned linear projection to produce a $D$-dimensional embedding (e.g., 768-D).

3. **Positional encoding:** Add a learned positional embedding to each patch token. Since self-attention is permutation-equivariant (order-agnostic), positional encodings inject spatial information about where each patch came from.

4. **Class token:** Prepend a special learnable [CLS] token to the sequence (total length becomes $N+1$). After processing, only the [CLS] token output is used for classification via an MLP head.

**(B) Scaled dot-product attention:**

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

**Why $\sqrt{d_k}$:** Without scaling, the dot products $QK^T$ grow in magnitude proportionally to $d_k$ (the key dimension). Large dot products push softmax into saturation (outputs near 0 or 1), producing vanishing gradients. Dividing by $\sqrt{d_k}$ keeps the variance of the dot products at approximately 1 regardless of dimension, ensuring softmax operates in a well-behaved gradient regime.

---

## SECTION B

---

## Question 5: Stereo Vision

### (a) Stereo Matching and Depth Reconstruction

#### (i) Disparity and Depth [4 marks]

Given: $f = 720$ pixels, $B = 10$ cm.

| Point | $d = x_L - x_R$ | $Z = fB/d$ |
|-------|----------|------------|
| A (Origin) | 320 - 278 = 42 | $720 \times 10 / 42 = 171.4$ cm |
| B (Width) | 485 - 441 = 44 | $720 \times 10 / 44 = 163.6$ cm |
| C (Height) | 320 - 278 = 42 | $720 \times 10 / 42 = 171.4$ cm |
| D (Depth) | 335 - 290 = 45 | $720 \times 10 / 45 = 160.0$ cm |

---

#### (ii) 3D Coordinates [6 marks]

Using $X = (u - c_x) \cdot Z / f$ and $Y = (v - c_y) \cdot Z / f$ with $c_x = 400$, $c_y = 300$, $f = 720$.

**Point A** ($u=320$, $v=180$, $Z=171.4$):
- $X_A = (320 - 400) \times 171.4 / 720 = -80 \times 0.238 = -19.05$ cm
- $Y_A = (180 - 300) \times 171.4 / 720 = -120 \times 0.238 = -28.57$ cm
- $Z_A = 171.4$ cm

**Point B** ($u=485$, $v=180$, $Z=163.6$):
- $X_B = (485 - 400) \times 163.6 / 720 = 85 \times 0.227 = 19.31$ cm
- $Y_B = (180 - 300) \times 163.6 / 720 = -120 \times 0.227 = -27.27$ cm
- $Z_B = 163.6$ cm

**Point C** ($u=320$, $v=95$, $Z=171.4$):
- $X_C = (320 - 400) \times 171.4 / 720 = -80 \times 0.238 = -19.05$ cm
- $Y_C = (95 - 300) \times 171.4 / 720 = -205 \times 0.238 = -48.81$ cm
- $Z_C = 171.4$ cm

**Point D** ($u=335$, $v=180$, $Z=160.0$):
- $X_D = (335 - 400) \times 160.0 / 720 = -65 \times 0.222 = -14.44$ cm
- $Y_D = (180 - 300) \times 160.0 / 720 = -120 \times 0.222 = -26.67$ cm
- $Z_D = 160.0$ cm

---

#### (iii) Physical Dimensions [4 marks]

**Width (A→B):**
$$\sqrt{(19.31-(-19.05))^2 + ((-27.27)-(-28.57))^2 + (163.6-171.4)^2}$$
$$= \sqrt{38.36^2 + 1.30^2 + (-7.8)^2} = \sqrt{1471.5 + 1.7 + 60.8} = \sqrt{1534.0} \approx \mathbf{39.2 \text{ cm}}$$

**Height (A→C):**
$$\sqrt{(-19.05-(-19.05))^2 + ((-48.81)-(-28.57))^2 + (171.4-171.4)^2}$$
$$= \sqrt{0 + (-20.24)^2 + 0} = \sqrt{409.7} \approx \mathbf{20.2 \text{ cm}}$$

**Depth (A→D):**
$$\sqrt{((-14.44)-(-19.05))^2 + ((-26.67)-(-28.57))^2 + (160.0-171.4)^2}$$
$$= \sqrt{4.61^2 + 1.90^2 + (-11.4)^2} = \sqrt{21.3 + 3.6 + 129.96} = \sqrt{154.8} \approx \mathbf{12.4 \text{ cm}}$$

---

#### (iv) Challenges [2 marks]

1. **Correspondence accuracy:** The measurements depend critically on precise sub-pixel localisation of corresponding points. Even 1-pixel error in disparity at $d \approx 42$ causes $\sim 4$ cm depth error, which propagates to significant 3D measurement errors.

2. **Calibration accuracy:** The parameters $f$, $B$, $c_x$, $c_y$ must be precisely known from calibration. Errors in calibration (especially focal length) produce systematic biases in all depth and distance measurements. Real cameras also have lens distortion that must be corrected.

---

### (b) Block Matching and Cost Volume

#### (i) Block Matching [7 marks]

**(A) Matching cost metrics:**

- **SAD (Sum of Absolute Differences):** $\sum_{(i,j) \in W} |I_L(x+i, y+j) - I_R(x-d+i, y+j)|$. Fast, simple. Sensitive to illumination differences.

- **SSD (Sum of Squared Differences):** $\sum_{(i,j) \in W} (I_L(x+i, y+j) - I_R(x-d+i, y+j))^2$. Penalises large errors more heavily.

- **NCC (Normalised Cross-Correlation):** $\frac{\sum(I_L - \bar{I}_L)(I_R - \bar{I}_R)}{\sqrt{\sum(I_L-\bar{I}_L)^2 \sum(I_R-\bar{I}_R)^2}}$. Range [-1, 1]. Invariant to linear illumination changes (bias and gain). More expensive to compute.

**(B) Window size trade-off:**

- **Too small:** Insufficient information for reliable matching. Noise dominates, many ambiguous matches, noisy disparity map.
- **Too large:** Smooths over depth discontinuities (foreground-fattening), where the block straddles objects at different depths. Assumes constant disparity within the window, which is violated at boundaries.
- **Optimal:** Balance between noise robustness and edge preservation (typically 7×7 to 15×15).

**(C) Failure scenarios:**

1. **Textureless regions:** (e.g., white wall, clear sky) — all disparities give similar matching cost, no reliable minimum exists.
2. **Repetitive patterns:** (e.g., fence, brick wall) — multiple disparities give equally good matches, leading to systematic errors.
3. **Occlusions:** Regions visible in one image but not the other have no valid correspondence. The algorithm forces a match where none exists, producing errors at depth boundaries.

---

#### (ii) Deep Learning Cost Volume [7 marks]

**(A) Cost volume entry $C(x, y, d)$:**

Each entry represents the **matching cost** (or similarity) between the feature at pixel $(x, y)$ in the left image and the feature at pixel $(x-d, y)$ in the right image for disparity hypothesis $d$. Lower cost = better match. The full volume is $H \times W \times D_{max}$, storing costs for all pixels at all candidate disparities.

**(B) Cost volume regularisation:**

3D convolutions are applied to the raw cost volume to:
- **Enforce spatial smoothness:** Neighbouring pixels should have similar disparities (surfaces are smooth)
- **Resolve ambiguities:** In textureless regions, nearby textured pixels propagate reliable disparity information
- **Handle occlusions:** The 3D context allows the network to interpolate across occluded regions
- Replace hand-crafted smoothness penalties (e.g., SGM's penalties) with learned, data-driven regularisation

This is analogous to global optimisation in classical stereo but with parameters learned end-to-end.

**(C) Soft argmin:**

$$d^*(x,y) = \sum_{d=0}^{D_{max}} d \cdot \text{softmax}(-C(x,y,d))$$

This computes the **expected value** of disparity, using the negative cost as log-probabilities.

Advantages over hard argmin ($\arg\min_d C$):
- Produces **sub-pixel** disparity estimates (continuous rather than integer values)
- Is **differentiable**, allowing gradients to flow through during backpropagation for end-to-end training
- Hard argmin has zero gradient almost everywhere (piecewise constant), making it unsuitable for gradient-based learning

---

## Question 6: Deep Learning and Image Classification

### (a) CNN Architectures and Transfer Learning

#### (i) Architecture Comparison [6 marks]

| | AlexNet (2012) | VGGNet (2014) | ResNet (2015) |
|---|---|---|---|
| **Key Innovation** | ReLU activation, dropout, GPU training, data augmentation | Exclusively small 3×3 filters, uniform architecture | Skip connections (residual learning) |
| **Depth** | 8 layers (5 conv + 3 FC) | 16/19 layers | 50/101/152 layers |
| **Filter Strategy** | Large first filters (11×11, 5×5) | All 3×3 conv (stacked for larger RF) | 3×3 with 1×1 bottlenecks |
| **Main Limitation** | Shallow, large FC layers waste params | Very expensive (140M params), no skip connections | Bottleneck design complex, computationally heavy for largest variants |

---

#### (ii) Transfer Learning for Medical Images [8 marks]

**(A) Transfer learning strategy:**

With only 500 images, training from scratch will massively overfit. Instead:

1. **Start** with a pre-trained model (e.g., ResNet-50 trained on ImageNet).
2. **Freeze** all convolutional layers (feature extractor) — these contain generic visual features (edges, textures, shapes) that transfer well.
3. **Replace and train** only the final fully-connected classification head (new FC layer with 5 outputs for 5 classes) with a small learning rate.

**Why:** Early layers detect universal features (edges, corners, colours) that are useful for any visual task. Later layers become more task-specific. With 500 images, there isn't enough data to reliably learn new convolutional features, but there is enough to train a linear classifier on top of good features.

**(B) Augmentation techniques:**

1. **Random rotation** (±15°): Medical images may be captured at slightly different angles
2. **Random horizontal/vertical flip**: Many structures (cells, lesions) look similar when flipped
3. **Random cropping/scaling**: Simulates different zoom levels and fields of view
4. **Elastic deformation**: Simulates natural tissue deformation, particularly useful for histology

**Why NOT colour jitter:** In medical images, colour carries diagnostic information (e.g., stain intensity in histology, redness indicating inflammation, tissue colour indicating oxygenation). Random colour perturbation could destroy the exact chromatic features that distinguish healthy from pathological tissue, teaching the model to ignore informative colour signals.

**(C) Metrics:**

- **Precision** = TP/(TP+FP): "Of all positive predictions, how many were correct?" Important when false positives are costly (e.g., unnecessary invasive surgery).
- **Recall** = TP/(TP+FN): "Of all actual positives, how many were found?" Important when missing a positive is dangerous (e.g., failing to detect cancer).
- **F1-Score** = 2·Precision·Recall/(Precision+Recall): Harmonic mean — balances both.

**For medical diagnosis:** Recall is typically most critical. Missing a disease (false negative) can be fatal, while a false positive only leads to further testing. High recall ensures no cases are missed, even at the cost of some false alarms.

---

### (b) GAN for 3D Reconstruction

#### (i) Component Roles [10 marks]

**Encoder:** A CNN that takes the 2D input image and compresses it into a compact latent vector $Z$. It learns to extract 3D-relevant information (shape, pose, structure) from the 2D observation, effectively learning an inverse rendering function.

**Class label $C$:** A categorical label (e.g., "chair", "car") provided as conditioning input alongside $Z$. It helps the generator:
- Focus on category-specific shape priors
- Resolve ambiguities where the same 2D silhouette could correspond to different objects
- Share structural knowledge within a class while allowing instance variation

**Generator:** Takes the concatenated $[Z, C]$ and produces a 3D model (e.g., voxel grid, point cloud, or mesh). Uses 3D transposed convolutions to upsample from the latent code to full 3D geometry. Learns the mapping from compact 2D-derived representation to complete 3D structure.

**Classifier:** Takes the generated 3D model and predicts its class $C'$. Provides an auxiliary loss ensuring the generated model is semantically consistent with the specified class. Prevents the generator from producing plausible but wrong-category outputs.

**Discriminator:** Takes a 3D model (real from training set OR fake from generator) and outputs probability of being real. Provides the adversarial signal that pushes the generator toward realistic 3D geometry — smooth surfaces, plausible proportions, structural coherence.

---

#### (ii) Training and Inference [6 marks]

**(A) Loss functions:**

1. **Adversarial loss:** $\mathcal{L}_{adv} = \mathbb{E}[\log D(x_{real})] + \mathbb{E}[\log(1-D(G(Z,C)))]$ — ensures realistic geometry
2. **Reconstruction loss:** $\mathcal{L}_{recon} = \|G(Z,C) - x_{GT}\|_1$ (L1 distance to ground truth 3D model) — provides direct supervision
3. **Classification loss:** $\mathcal{L}_{cls} = -\log p(C | G(Z,C))$ (cross-entropy) — ensures class consistency

Total: $\mathcal{L} = \mathcal{L}_{adv} + \alpha \mathcal{L}_{recon} + \beta \mathcal{L}_{cls}$

**(B) Inference vs Training:**

At test time, only the **Encoder + Generator** are needed:
1. Feed novel 2D image → Encoder produces $Z$
2. Concatenate $[Z, C]$ → Generator produces 3D model
3. Done (single forward pass, no iteration)

**Not needed at test time:** Discriminator (training signal only), Classifier (training regulariser only). This makes inference fast — a single forward pass through two networks.

**(C) Advantage of adversarial loss over L2 alone:**

L2 reconstruction loss tends to produce **blurry, average-looking** outputs. When multiple plausible 3D structures could explain the 2D input, L2 minimisation produces the mean of all possibilities (a blurry compromise).

The adversarial loss ensures outputs lie on the **manifold of realistic 3D shapes** — the discriminator rejects any output that looks implausible (non-smooth surfaces, impossible geometry), pushing the generator to commit to a specific, realistic reconstruction rather than hedging with a blurry average. This produces sharper, more geometrically coherent 3D models.

---

## Question 7: Segmentation and Optical Flow

### (a) GMM Segmentation of Natural Scene

#### (i) Number of Components [2 marks]

Use $g = 3$ components (one per target class: sky, trees, ground). This directly matches the segmentation goal. Using fewer would merge distinct classes; using more (e.g., 5-6) could capture sub-classes (sunlit vs shadowed trees, wet vs dry ground) but requires more data to fit reliably and needs post-hoc cluster merging.

---

#### (ii) Feature Vector and Colour Space [3 marks]

Each pixel is represented as $\mathbf{x} = [H, S, V]^T$ (3D feature vector).

**Why HSV over RGB:**
- **Hue** directly encodes colour type: blue sky (~200) is well-separated from green trees (~60) and brown ground (~25-40)
- **Saturation** separates colourful regions (sky, foliage) from dull/muddy regions (ground)
- **Value** provides brightness discrimination without conflating it with colour
- RGB channels are highly correlated (bright = all channels high), making clusters less separable. HSV decouples chromaticity from intensity, providing more discriminative axes for this scene.

---

#### (iii) E-Step and Initialisation [5 marks]

**E-step formula:**

$$r_{ik} = P(\text{class } k | \mathbf{x}_i) = \frac{\pi_k \, \mathcal{N}(\mathbf{x}_i | \boldsymbol{\mu}_k, \Sigma_k)}{\sum_{m=1}^{3} \pi_m \, \mathcal{N}(\mathbf{x}_i | \boldsymbol{\mu}_m, \Sigma_m)}$$

This computes the **responsibility** — the posterior probability that pixel $i$ was generated by component $k$. Each pixel gets three values ($r_{i1}, r_{i2}, r_{i3}$) summing to 1, representing soft membership.

**Initialisation from histograms:**

- **Sky** ($k=1$): $\mu_1 = [200, 150, 220]$ (hue peak at 200, high saturation, bright)
- **Trees** ($k=2$): $\mu_2 = [60, 150, 125]$ (hue peak at 60, high saturation, moderate brightness)
- **Ground** ($k=3$): $\mu_3 = [35, 55, 130]$ (hue around 25-40, low saturation, variable brightness)

Initial covariances: diagonal, estimated from histogram peak widths. Initial mixing coefficients: $\pi_k = 1/3$ (equal prior, or proportional to estimated region sizes from histogram areas).

---

#### (iv) Classification and Limitations [3 marks]

**Classification:** After EM converges, assign each pixel to the class with highest posterior:

$$\text{segment}(x_i) = \arg\max_k \; r_{ik}$$

**Limitation:** Pixel-wise GMM ignores spatial context. A single green pixel surrounded by sky pixels would be classified as "tree" even though it's likely noise or a boundary artefact. The result can have salt-and-pepper noise.

**Solution:** Apply a Markov Random Field (MRF) post-processing step that penalises isolated label changes, enforcing spatial coherence. Alternatively, use morphological operations (opening/closing) to clean up small isolated regions.

---

#### (v) GMM vs K-Means at Boundaries [3 marks]

At the boundary between trees and sky, a pixel might have a blended colour (e.g., $H=130$, midway between blue sky and green trees due to partial coverage or atmospheric scattering).

**K-means:** Forces a hard decision — the pixel is assigned entirely to whichever cluster centre is closest. This creates a jagged, arbitrary boundary.

**GMM:** Assigns soft probabilities (e.g., 0.6 sky, 0.4 trees). This:
- Honestly represents the uncertainty at boundaries
- Enables smoother boundaries via probability thresholding
- Allows downstream processing to handle ambiguous pixels differently
- Better models the gradual colour transition that physically occurs between regions (e.g., trees fading into sky at the horizon)

**GMM is better** for boundary pixels because it captures the genuine ambiguity rather than forcing an artificial binary decision.

---

### (b) Optical Flow Methods

#### (i) Derivation and Aperture Problem [4 marks]

**(A) Derivation:**

Start with brightness constancy: $I(x, y, t) = I(x + u\delta t, \, y + v\delta t, \, t + \delta t)$

First-order Taylor expansion of the right side:

$$I(x + u\delta t, y + v\delta t, t + \delta t) \approx I(x,y,t) + \frac{\partial I}{\partial x} u\delta t + \frac{\partial I}{\partial y} v\delta t + \frac{\partial I}{\partial t} \delta t$$

Setting equal to $I(x,y,t)$ and dividing by $\delta t$:

$$\frac{\partial I}{\partial x} u + \frac{\partial I}{\partial y} v + \frac{\partial I}{\partial t} = 0$$

$$\boxed{I_x u + I_y v + I_t = 0}$$

**(B) Aperture problem:**

This is **one equation with two unknowns** ($u$ and $v$). A single pixel provides only one constraint — we can determine the component of flow **perpendicular to the local gradient direction** (the "normal flow"), but not the component **parallel to the edge**. Through a small aperture viewing an edge, you cannot tell if it moved diagonally, horizontally, or vertically — only the motion perpendicular to the edge is observable. Additional constraints (spatial coherence in LK, smoothness in HS) are needed to resolve both components.

---

#### (ii) LK vs HS Comparison [5 marks]

| Aspect | Lucas-Kanade | Horn-Schunck |
|--------|---|---|
| Scope | Local (per window) | Global (all pixels) |
| Output | Sparse (reliable only at textured points) | Dense (flow for every pixel) |
| Assumption | Constant flow in local window | Global flow smoothness |
| Handles boundaries | Preserves discontinuities | Over-smooths across boundaries |
| Iterative? | No (direct least-squares solve) | Yes (iterative until convergence) |

**Connection to Harris corner detector:**

The $A^T A$ matrix in Lucas-Kanade:

$$A^T A = \begin{bmatrix} \sum I_x^2 & \sum I_x I_y \\ \sum I_x I_y & \sum I_y^2 \end{bmatrix}$$

is **identical** to the Harris structure tensor $H$. For LK to give a reliable solution, $A^T A$ must be well-conditioned (invertible with two large eigenvalues). This is exactly the Harris corner condition!

**Implication:** LK optical flow works best at **corners** (where both eigenvalues of the structure tensor are large). At edges (one large, one small eigenvalue), only normal flow is recoverable. In flat regions (both small), the system is ill-conditioned and flow cannot be estimated. This means LK naturally produces sparse flow concentrated at feature-rich locations.

---

#### (iii) Multi-Resolution Pyramid [3 marks]

**Construction:** Build a Gaussian pyramid by repeatedly smoothing (Gaussian blur) and downsampling the image by factor 2. This creates levels at $1\times$, $1/2\times$, $1/4\times$, $1/8\times$, etc.

**Coarse-to-fine estimation:**
1. At the coarsest level, large motions become small (e.g., 16-pixel motion becomes 1-pixel at 4 levels down)
2. Estimate optical flow at the coarsest level using LK (now within the small-motion assumption)
3. Upsample the flow estimate by ×2 and **warp** the next-finer level using this flow
4. Estimate the **residual flow** at the finer level (the remaining small correction)
5. Add residual to the upsampled estimate
6. Repeat until full resolution

**Why it works:** The small-motion assumption ($I_x u + I_y v + I_t \approx 0$ requires linearisation to be valid) breaks for large displacements. By downsampling, a 32-pixel motion becomes a 2-pixel motion at level 4, well within the linear approximation. The coarse estimate captures the bulk motion; fine levels refine boundary details.

---

#### (iv) Flow vs Motion Paradoxes [2 marks]

**Optical flow exists, no motion:** A stationary, uniformly-coloured sphere illuminated by a moving light source. The highlight/shading pattern moves across the sphere's surface even though the sphere is completely still. The camera observes apparent brightness changes that produce optical flow, despite zero physical motion.

**Motion exists, no optical flow:** A uniformly-coloured sphere rotating about its axis. The surface is physically moving (every point on the sphere has non-zero velocity), but because the sphere has uniform colour/texture, the image appearance doesn't change at all — the camera observes no brightness variation, so $I_t = 0$ everywhere and the computed optical flow is zero.

---

## END OF SOLUTIONS
