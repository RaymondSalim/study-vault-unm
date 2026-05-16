---
title: "Exam Prep Guide"
order: 89
moduleTitle: "COMP3029 - Computer Vision"
tags: ["exam", "prep", "2-day-plan", "strategy", "section-a", "section-b"]
---

## Exam Structure

| Section | Questions | Requirement | Topics |
|---------|-----------|-------------|--------|
| **A** | 4 questions (each with 2 sub-questions) | Answer ALL | Segmentation + Motion + Optical Flow; Features + Object Recognition; Stereo Vision; Deep Learning |
| **B** | 3 questions (each with 2 sub-questions) | Answer 2 of 3 | Stereo Vision; Deep Learning + Image Classification; Segmentation + Optical Flow |

---

## Strategic Analysis

### Overlap Map

```
Section A                          Section B
─────────────────────────────      ─────────────────────────────
Q1: Segmentation + Motion + OF ←──→ B3: Segmentation + Optical Flow
Q2: Features + Object Recognition ←→ B2: Deep Learning + Image Classification (partial)
Q3: Stereo Vision ←─────────────────→ B1: Stereo Vision
Q4: Deep Learning ←─────────────────→ B2: Deep Learning + Image Classification
```

### Section B Decision: Drop Stereo Vision (B1)

| Section B Option | Overlaps with Section A | Recommendation |
|---|---|---|
| B1: Stereo Vision | A-Q3 only | **DROP** |
| B2: Deep Learning + Image Classification | A-Q4 + A-Q2 | Keep (double overlap) |
| B3: Segmentation + Optical Flow | A-Q1 | Keep (direct overlap) |

**Why drop Stereo B1:**
- Stereo is the most math-heavy (epipolar geometry, fundamental matrix, SVD)
- It only overlaps with ONE Section A question
- The other two B options give double-duty: studying for them feeds into 3 of 4 Section A questions
- You still cover stereo enough for Section A Q3 (basic depth formula, pipeline overview) without mastering the hardest derivations

---

## Topics: Easiest to Hardest

| Rank | Topic | Effort | Section Coverage | What Makes It Easy/Hard |
|------|-------|--------|-----------------|------------------------|
| 1 | **Segmentation** (K-means, GMM, EM) | ~2 hrs | A-Q1, B3 | Procedural algorithms, follow-the-steps |
| 2 | **Viola-Jones + Object Recognition** | ~2.5 hrs | A-Q2, B2 | Conceptual (Haar, integral image, cascade) |
| 3 | **Features** (Harris, SIFT, HoG) | ~3 hrs | A-Q2, B2 | Some math (eigenvalues, scale-space) but mostly pipelines |
| 4 | **CNNs + Deep Learning** | ~4 hrs | A-Q4, B2 | Breadth is the challenge (backprop, architectures, GANs) |
| 5 | **Optical Flow** (LK, HS) | ~3 hrs | A-Q1, B3 | Medium math (brightness constancy, least-squares) |
| 6 | **Stereo Vision** (Epipolar, Camera Models) | ~4 hrs | A-Q3, B1 (dropped) | Hardest -- dense linear algebra, projective geometry |

---

## 2-Day Study Plan

### Day 1: High-ROI Topics (Covers Section A Q1 + Q2 + Section B Q3)

#### Morning (3 hours) -- Segmentation + Optical Flow

**Hour 1: Segmentation**

Must-know:
- K-means algorithm: initialise $\mu_k$, assign, update, repeat
- K-means objective: $J = \sum r_{nk} \|\mathbf{x}_n - \boldsymbol{\mu}_k\|^2$
- GMM density: $p(x) = \sum \pi_i \mathcal{N}(x|\mu_i, \Sigma_i)$
- EM E-step: compute posterior $P(\theta_i|x_j)$ (soft assignment)
- EM M-step: update $\mu_i$, $\Sigma_i$, $\pi_i$ from weighted stats
- K-means vs GMM: hard vs soft assignment, spherical vs arbitrary clusters

Practice: be able to trace 2 iterations of K-means on given data points.

**Hour 2-3: Optical Flow**

Must-know:
- Brightness constancy assumption: $I(x,y,t) = I(x+u,y+v,t+1)$
- Constraint equation: $I_x u + I_y v + I_t = 0$ (1 equation, 2 unknowns)
- Aperture problem: why you can't solve flow from one pixel
- Lucas-Kanade: assume constant flow in window, solve $A^T A \mathbf{d} = A^T \mathbf{b}$
- The 2x2 system: same structure tensor as Harris (works best at corners!)
- Horn-Schunck: global energy with smoothness term, iterative, dense output
- LK vs HS comparison table (local/global, sparse/dense, boundaries)
- Multi-resolution pyramid: coarse-to-fine for large motions
- "Optical flow is NOT motion" -- rotating uniform sphere vs moving light

Practice: derive the constraint equation from Taylor expansion. Know when LK fails (large motion, uniform regions).

#### Afternoon (3 hours) -- Features + Object Recognition

**Hour 4: Harris Corner Detection**

Must-know:
- Structure tensor $H$ and what eigenvalues tell you (flat/edge/corner)
- Response function: $R = \det(H) - k \cdot \text{trace}(H)^2$
- Harris is rotation invariant but NOT scale invariant
- Why corners are useful for tracking (well-conditioned $A^T A$)

**Hour 5: SIFT**

Must-know:
- 4-stage pipeline: DoG extrema $\to$ localise $\to$ orientation $\to$ 128-D descriptor
- DoG approximates scale-normalised LoG
- 26 neighbours compared (8 same + 9 above + 9 below)
- Descriptor: 4x4 grid of 8-bin histograms = 128 dimensions
- Lowe's ratio test for matching: $d_1/d_2 < 0.8$
- RANSAC for geometric verification

**Hour 6: Object Recognition + Viola-Jones**

Must-know:
- Bag of Features pipeline: detect $\to$ describe (SIFT) $\to$ quantise (k-means) $\to$ histogram $\to$ classify (SVM)
- IDF weighting, spatial pyramid matching
- Viola-Jones: Haar features, integral image (O(1) rectangle sum), AdaBoost, cascade
- Integral image formula: $s(x,y) = s(x-1,y) + i(x,y)$; $ii(x,y) = ii(x,y-1) + s(x,y)$
- Cascade logic: early rejection of easy negatives, high recall per stage
- Linear classifiers: SVM hinge loss, softmax cross-entropy

#### Evening (2 hours) -- Consolidation

- Write a 1-page formula sheet by hand (proven to aid recall)
- Do 1 past paper Section A Q1 + Q2 (timed, 30 min total)
- Check answers against solution files

---

### Day 2: Deep Learning + Minimum Stereo (Covers Section A Q3 + Q4 + Section B Q2)

#### Morning (3.5 hours) -- Deep Learning

**Hour 7: Neural Network Fundamentals**

Must-know:
- Perceptron: $y = f(\mathbf{w}^T\mathbf{x} + b)$; can't solve XOR
- Activations: sigmoid (vanishing grad), ReLU (dying neurons), softmax (output)
- Backpropagation: $\frac{\partial L}{\partial w_{ij}} = \delta_i \cdot a_j$ (error $\times$ activation)
- Chain rule backward: $\delta^{(l)} = (W^{(l+1)})^T \delta^{(l+1)} \odot f'(z^{(l)})$
- SGD, Momentum, Adam (know what each adds)
- BatchNorm: normalise per mini-batch, learn $\gamma$, $\beta$
- Dropout: force redundancy, multiply by $p$ at test time

**Hour 8-9: CNNs**

Must-know:
- Output size formula: $\text{out} = \frac{\text{in} - F + 2P}{S} + 1$
- Convolution is volumetric (all channels), pooling is spatial only (no params)
- Receptive field: $L$ layers of $F \times F$ with stride 1 = $L(F-1)+1$
- Three 3x3 = one 7x7 RF, fewer params, more non-linearity
- ResNet skip connections: $y = F(x) + x$; solves degradation, not overfitting
- 1x1 convolutions: channel mixing, dimensionality reduction
- Transfer learning: freeze early (generic) layers, fine-tune later (task-specific)

**Hour 9-10: GANs + Image Classification**

Must-know:
- GAN objective: $\min_G \max_D \; \mathbb{E}[\log D(x)] + \mathbb{E}[\log(1-D(G(z)))]$
- Generator vs Discriminator roles
- Mode collapse: generator produces limited variety
- Training instability fixes: spectral norm, progressive growing
- Evaluation metrics: precision, recall, IoU, mAP
- Image classification pipeline: CNN backbone $\to$ global pooling $\to$ FC $\to$ softmax

Bonus (if time): Vision Transformers -- patch embedding, self-attention $\text{softmax}(QK^T/\sqrt{d_k})V$, [CLS] token. Marked "[NOT TESTED]" on slides but could appear as a sub-question.

#### Afternoon (2.5 hours) -- Stereo Vision (Section A Q3 level)

**Hour 10-11: Camera Models + Stereo**

Must-know:
- Homogeneous coordinates: $(x,y) \to (x,y,1)^T$
- Camera projection: $\mathbf{p} = K[R|t]\mathbf{P}$
- $K$ matrix (intrinsics): $f_x$, $f_y$, $c_x$, $c_y$, skew
- Depth from disparity: $Z = fB/d$ (know what happens as $B$ or $d$ changes)
- Epipolar constraint: $\mathbf{p}_2^T F \mathbf{p}_1 = 0$
- Epipolar geometry: epipoles, epipolar lines, reduces matching to 1D search
- Stereo pipeline: calibrate $\to$ rectify $\to$ match $\to$ depth
- Block matching: SSD/SAD in scanline, window size trade-off

What you can skip (since you're dropping Section B stereo):
- Full 8-point algorithm derivation
- Decomposing $E$ into $R$ and $t$
- Detailed SVD computations
- Zhang's calibration method details

#### Evening (2 hours) -- Past Papers + Final Review

- Do 1 full past paper under timed conditions (prioritise Section A)
- For Section B, practice choosing 2 of 3 questions quickly
- Review your formula sheet -- add anything you forgot
- Re-read the [Exam Traps](exam-traps) page

---

## Section-by-Section: What You MUST Be Able To Do

### Section A Q1: Segmentation + Motion + Optical Flow

| Task | How to prepare |
|------|---------------|
| Trace K-means iterations on given data | Practice with 5-6 points, K=2 |
| Explain EM for GMM (E-step and M-step) | Write out formulas from memory |
| Derive optical flow constraint equation | Taylor expand brightness constancy |
| Solve Lucas-Kanade for given pixel values | Set up $A^T A$ matrix, invert, multiply |
| Compare LK vs Horn-Schunck | Memorise the comparison table |
| Explain aperture problem with diagram | Draw edge + ambiguous motion direction |

### Section A Q2: Features + Object Recognition

| Task | How to prepare |
|------|---------------|
| Explain Harris corner detector | Structure tensor, eigenvalue cases, response $R$ |
| Describe SIFT pipeline (4 stages) | Memorise: DoG $\to$ localise $\to$ orient $\to$ describe |
| Explain Bag of Features | 5-step pipeline + IDF + SPM |
| Describe Viola-Jones cascade | Haar $\to$ integral image $\to$ AdaBoost $\to$ cascade |
| Compare feature descriptors | Harris vs SIFT vs HoG (table) |
| Explain RANSAC | Random sample $\to$ fit $\to$ count inliers $\to$ repeat |

### Section A Q3: Stereo Vision

| Task | How to prepare |
|------|---------------|
| Explain camera model and $K$ matrix | Draw diagram, label components |
| Compute depth from disparity | $Z = fB/d$, plug in numbers |
| Explain epipolar geometry | Draw two cameras, epipolar lines, constraint |
| What does rectification achieve? | Horizontal epipolar lines $\to$ 1D search |
| Stereo matching challenges | Occlusion, textureless, repetitive patterns |

### Section A Q4: Deep Learning

| Task | How to prepare |
|------|---------------|
| Explain backpropagation | Forward pass $\to$ loss $\to$ backward chain rule |
| Calculate CNN output dimensions | Apply formula with given $W$, $F$, $P$, $S$ |
| Explain ResNet and why skip connections help | Degradation problem, gradient flow, identity shortcut |
| Describe GAN training | Min-max game, mode collapse, equilibrium |
| Transfer learning strategy | When to freeze vs fine-tune |

### Section B Q2 (Keep): Deep Learning + Image Classification

| Task | How to prepare |
|------|---------------|
| Design a classification pipeline | Input $\to$ CNN $\to$ pooling $\to$ FC $\to$ softmax |
| Compare architectures | AlexNet vs VGG vs ResNet (table) |
| Explain evaluation metrics | Precision, recall, IoU, mAP |
| Discuss overfitting solutions | Dropout, augmentation, weight decay, early stopping |

### Section B Q3 (Keep): Segmentation + Optical Flow

| Task | How to prepare |
|------|---------------|
| K-means vs GMM comparison | Table: hard/soft, spherical/arbitrary |
| Multi-resolution optical flow | Pyramid: downsample $\to$ solve $\to$ upsample $\to$ warp $\to$ refine |
| When does optical flow fail? | Large motion, occlusion, non-Lambertian surfaces |
| HSV colour space for segmentation | Why hue separates colour from brightness |

---

## Non-Negotiable Formulas (Memorise These)

| # | Formula | When You Need It |
|---|---------|-----------------|
| 1 | $J = \sum r_{nk} \|\mathbf{x}_n - \boldsymbol{\mu}_k\|^2$ | K-means questions |
| 2 | $P(\theta_i\|x_j) = \frac{\pi_i g(x_j\|\theta_i)}{\sum_m \pi_m g(x_j\|\theta_m)}$ | EM E-step |
| 3 | $R = \det(H) - k \cdot \text{trace}(H)^2$ | Harris corner |
| 4 | $I_x u + I_y v + I_t = 0$ | Optical flow constraint |
| 5 | $(A^TA)\mathbf{d} = A^T\mathbf{b}$ | Lucas-Kanade solution |
| 6 | $Z = fB/d$ | Stereo depth |
| 7 | $\mathbf{p}_2^T F \mathbf{p}_1 = 0$ | Epipolar constraint |
| 8 | $\text{out} = (W - F + 2P)/S + 1$ | CNN output size |
| 9 | $\min_G \max_D \; \mathbb{E}[\log D(x)] + \mathbb{E}[\log(1-D(G(z)))]$ | GAN objective |
| 10 | $\alpha_t = \frac{1}{2}\ln\frac{1-\epsilon_t}{\epsilon_t}$ | AdaBoost weight |

---

## During the Exam

1. **First 5 minutes:** Read ALL questions (both sections). Identify your 2 strongest Section B questions.
2. **Section A first:** These are compulsory -- get them done.
3. **Diagram questions:** Always label axes, directions, and coordinates.
4. **"Compare X and Y":** Use a table with 4-5 criteria.
5. **Derivations:** State formula $\to$ define every symbol $\to$ then manipulate.
6. **If stuck:** Write what you know, state assumptions, show partial working (marks for method).
7. **Section B last:** Pick 2, don't overthink the choice. If a question surprises you, change your plan.
