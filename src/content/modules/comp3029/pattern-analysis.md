---
title: "Past Paper Pattern Analysis & Predictions"
order: 86
moduleTitle: "COMP3029 - Computer Vision"
tags: ["exam", "patterns", "predictions", "past-papers", "analysis"]
---

## Past Paper Pattern Analysis (2010–2024)

This analysis examines recurring question types, computation patterns, and topic frequencies across all available COMP3029 past papers to predict what will appear on the upcoming exam.

---

## 1. Question Type Taxonomy

Every past paper question falls into one of four types. The exam heavily favours **computation** and **pipeline description** over pure theory.

| Type | Description | Frequency | Marks |
|------|-------------|-----------|-------|
| **Computation** | "Calculate X given this data" | ~40% of marks | 3-7 marks each |
| **Pipeline/Process** | "Describe the steps of algorithm X" | ~30% of marks | 5-10 marks |
| **Compare/Contrast** | "What is the difference between X and Y?" | ~15% of marks | 3-6 marks |
| **Explain/Justify** | "Why does X happen / What advantage does Y provide?" | ~15% of marks | 2-4 marks |

---

## 2. Topic Frequency Map

### Tier 1: Appears EVERY Year (100% probability)

| Topic | Years Present | Typical Format |
|-------|--------------|----------------|
| **K-Means / GMM / EM** | 2010, 2011, 2012, 2013, 2014, 2015, 2020, 2022, 2023, 2024 | Define terms in objective → trace iteration OR design GMM system |
| **Camera Intrinsic Matrix K** | 2021, 2022, 2023, 2024 (every year since format change) | Given focal length (mm) + DPI + image size → compute K |
| **Epipolar Geometry** | 2020, 2021, 2022, 2023, 2024 | Define epipolar plane/lines/epipoles → explain F matrix → rectification |

### Tier 2: Appears Most Years (80%+ probability)

| Topic | Years Present | Typical Format |
|-------|--------------|----------------|
| **LBP Computation** | 2021, 2022, 2023, 2024 | Given 3x3 patch → compute LBP binary string → convert to decimal |
| **Structure Tensor / Hessian** | 2023, 2024 | Given Ix and Iy grids → compute H = [ΣIx², ΣIxIy; ΣIxIy, ΣIy²] → interpret eigenvalues |
| **Optical Flow (Lucas-Kanade)** | 2022, 2023, 2024 + Section B every year | Given 5x5 patches at t and t+1 → compute Ix, Iy, It → solve A^TA system |
| **CNN Output Size** | 2022, 2023, 2024 | Given input dims, kernel, padding, stride → apply formula |
| **Stereo Depth Z=fB/d** | 2020, 2021, 2022, 2023, 2024 | Given pixel coordinates in L/R images → compute disparity → depth |

### Tier 3: Appears Frequently (60%+ probability)

| Topic | Years Present | Typical Format |
|-------|--------------|----------------|
| **Viola-Jones / Integral Image** | 2022, 2023, 2024 | Given 3x3 patch → compute integral image → explain cascade |
| **SIFT Pipeline** | 2021, 2022, 2023, 2024 | Describe 4 stages OR explain specific properties (DoG, 26 neighbours, 128-D) |
| **GAN Objective** | 2023, 2024 | Write min-max formula → explain G and D roles → mode collapse |
| **Vision Transformer** | 2023, 2024 | Describe patch embedding → attention formula → explain class token |
| **Bag of Features** | 2020, 2022 | Describe full pipeline (SIFT → codebook → histogram → SVM) |
| **ResNet Skip Connections** | 2022, 2023, 2024 | Explain degradation problem → how y=F(x)+x solves it |

### Tier 4: Occasional (30-50% probability)

| Topic | Years Present | Typical Format |
|-------|--------------|----------------|
| **HoG Pipeline** | 2023, 2024 | Describe steps (gradient → cells → histogram → normalise) |
| **Block Matching** | 2022, 2023 | SAD/SSD/NCC → window trade-off → failure cases |
| **Transfer Learning** | 2022, 2024 | When to freeze/fine-tune → small vs large dataset strategy |
| **1x1 Convolutions** | 2022, 2023 | Explain dimension reduction → compute parameter savings |
| **Deep Stereo Pipeline** | 2022, 2023, 2024 | 5 stages: features → matching → cost volume → argmin → post-process |
| **3x3 vs 7x7 argument** | 2022, 2023 | RF equivalence, parameter count (27C² vs 49C²), more ReLUs |

---

## 3. Recurring Computation Patterns

These are the specific numerical exercises that repeat with different values each year.

### Pattern A: Intrinsic Matrix K Calculation
**Source:** 2021-2022 Q2(b), 2022-2023 Q2(a), 2023-2024 Q2(a)

Every year since 2021 gives:
- Focal length in mm (26mm, 35mm, 36mm)
- Resolution in DPI (always 72 dpi = 28.35 px/cm = 2.835 px/mm)
- Image dimensions in pixels
- "No distortion, no skew"

**Steps always required:**
1. Convert f_mm to f_pixels: `f_px = f_mm × 2.835`
2. Principal point at image centre: `cx = width/2`, `cy = height/2`
3. Write K matrix (s=0)

**Prediction:** Will appear with different numbers (e.g., f=50mm, 96 dpi, 3840×2160).

---

### Pattern B: LBP Computation
**Source:** 2021-2022 Q1(a), 2022-2023 Q1(a), 2023-2024 Q1(b)

Every year since 2021 gives a 3x3 patch and asks:
1. Compare 8 neighbours to centre (>= centre → 1, else 0)
2. Read clockwise from top-left
3. Convert binary to decimal

**Note on convention:** The 2021-2022 solution treats top-left as MSB (position 7 = 128), giving binary 01011100 = 92. The 2022-2023 solution treats top-left as LSB (position 0 = 1), giving 01011100 read as 00111010 = 58. **The question should specify the convention** — read the wording carefully.

**Prediction:** Will appear again. Practice both conventions.

---

### Pattern C: Structure Tensor / Harris Matrix
**Source:** 2023-2024 Q1(c), Mock Q2(a)

Given two 3x3 grids (Ix derivatives and Iy derivatives):
1. Compute Ix² for each pixel, sum all 9
2. Compute Iy² for each pixel, sum all 9
3. Compute Ix×Iy for each pixel, sum all 9
4. Form H = [[ΣIx², ΣIxIy], [ΣIxIy, ΣIy²]]
5. Interpret: both eigenvalues large → corner; compute R = det(H) - k·trace(H)²

**Prediction:** High probability. May be combined with SIFT or Harris explanation.

---

### Pattern D: Lucas-Kanade Optical Flow from Pixel Grids
**Source:** 2022-2023 Q4(b), 2023-2024 Q4(b)

Given two 5x5 patches (time t and t+1):
1. Identify 3x3 window at centre (rows 1-3, cols 1-3)
2. Compute Ix = I(x+1,y) - I(x,y) for each pixel in window
3. Compute Iy = I(x,y+1) - I(x,y) for each pixel in window
4. Compute It = I(x,y,t+1) - I(x,y,t) for each pixel in window
5. Form A^TA (2x2) and A^Tb (2x1)
6. Solve 2x2 system using Cramer's rule or matrix inverse
7. Interpret direction of motion

**Critical detail:** The formula definitions (Ix = I(x+1,y) - I(x,y)) are always given in the question. Follow them exactly.

**Prediction:** Very high probability. The numbers will be different but the method is identical.

---

### Pattern E: CNN Output Size
**Source:** 2022-2023 Q3(a), 2023-2024 Q3(a)

Always gives input dimensions, kernel size, padding, stride, output channels. Apply:
```
out = floor((in - kernel + 2×padding) / stride) + 1
```
May also ask for parameter count: `K × (C_in × F × F + 1)`

**Prediction:** Will appear. Sometimes combined with "design a 3-layer CNN to achieve target output size."

---

### Pattern F: Integral Image
**Source:** 2022-2023 Q6(a), 2023-2024 Q6(a)

Given a 3x3 patch, compute the cumulative integral image using:
`II(x,y) = I(x,y) + II(x-1,y) + II(x,y-1) - II(x-1,y-1)`

Then compute a Haar feature value = Sum(white region) - Sum(dark region).

**Prediction:** Likely to appear in the Viola-Jones portion.

---

### Pattern G: Stereo Depth Reconstruction
**Source:** 2020-2021 Q2, 2022-2023 Q5, 2023-2024 Q5

Given corresponding points in left/right images:
1. Compute disparity: d = x_L - x_R
2. Compute depth: Z = f×B/d
3. Sometimes: Reconstruct 3D coordinates using X = (u-cx)×Z/f, Y = (v-cy)×Z/f
4. Sometimes: Compute physical distance between 3D points

**Prediction:** Very likely in Section A Q3 (Stereo). If it appears in Section B, may include full 3D reconstruction.

---

## 4. Section-Specific Patterns

### Section A Question Structure (Post-2020 Format)

Since 2020-2021, the exam has stabilised into this structure:

| Question | Part (a) | Part (b) |
|----------|----------|----------|
| **Q1: Features** | LBP/HoG computation + explanation | SIFT pipeline or structure tensor |
| **Q2: Camera + Epipolar** | Compute K matrix | Explain epipolar geometry + F matrix |
| **Q3: CNNs** | Output size calculation | Architecture comparison or design task |
| **Q4 (Section B): Segmentation + OF** | GMM design for given scene (HSV) | Lucas-Kanade from pixel grids |

### Section B Question Structure

| Question | Part (a) | Part (b) |
|----------|----------|----------|
| **Stereo** | Block matching challenges + 3D reconstruction | Deep stereo pipeline (5 stages) |
| **DL + Classification** | Viola-Jones integral image + Haar features | CNN architecture comparison or GAN |
| **Segmentation + OF** | GMM design (full E/M step writeup) | LK computation + LK vs HS comparison |

---

## 5. Mark Allocation Patterns

| Computation Type | Typical Marks | Time Investment |
|-----------------|---------------|-----------------|
| K matrix calculation | 5-7 marks | 5-8 minutes |
| LBP computation | 2-3 marks | 3-4 minutes |
| Structure tensor | 3-4 marks | 5-7 minutes |
| LK optical flow (full) | 8-10 marks | 12-15 minutes |
| Integral image | 3 marks | 3-4 minutes |
| CNN output size | 2 marks | 2 minutes |
| Stereo depth | 4-5 marks | 5 minutes |
| "Explain pipeline" (5-step) | 5-10 marks | 8-12 minutes |
| "Compare X vs Y" (table) | 4-6 marks | 5-8 minutes |

---

## 6. Predictions for the Upcoming Exam

Based on the analysis above and the confirmed exam structure (Section A: Segmentation+Motion+OF, Features+Recognition, Stereo, Deep Learning; Section B: Stereo, DL+Classification, Segmentation+OF):

### Section A Q1: Segmentation + Motion + Optical Flow [~20 marks]

| Sub-question | Prediction | Confidence | Source Pattern |
|-------------|------------|------------|----------------|
| (a) K-means | Trace 1-2 iterations on given data (4x4 image or point set) | **95%** | Every year since 2010 |
| (a) GMM vs K-means | Explain EM E-step formula, soft vs hard assignment | **90%** | 2020, 2022, 2023, 2024 |
| (a) Neighbourhood term | "What effect does adding spatial term have?" | **60%** | 2020-2021 Q1(a)(iii) — exact same format |
| (b) LK Optical Flow | Given 5x5 patches, compute gradients, solve system | **90%** | 2022-2023 Q4(b), 2023-2024 Q4(b) |
| (b) Aperture problem | "Why can't one equation determine u and v?" | **70%** | Conceptual, appears in most OF questions |

**Most likely format:** Part (a) = K-means iteration + GMM explanation (10 marks). Part (b) = full LK computation from pixel grids (10 marks).

---

### Section A Q2: Features + Object Recognition [~20 marks]

| Sub-question | Prediction | Confidence | Source Pattern |
|-------------|------------|------------|----------------|
| (a) LBP computation | Given 3x3 patch, compute LBP code | **90%** | 2021, 2022, 2023, 2024 — every year |
| (a) LBP → classification | "How are LBP features organised for SVM?" | **80%** | 2022-2023 Q1(a) |
| (a) Structure tensor | Given Ix, Iy grids → compute H → classify point | **75%** | 2023-2024 Q1(c) |
| (b) Bag of Features pipeline | Describe full 5-step pipeline | **65%** | 2020-2021, alternates with SIFT |
| (b) Viola-Jones | Integral image computation + cascade explanation | **70%** | 2022-2023 Q6, 2023-2024 Q6 |
| (b) SIFT 4-stage pipeline | "Describe the four stages" | **60%** | 2021-2022 Q1(b), not in 2023-2024 Section A |

**Most likely format:** Part (a) = LBP + Structure tensor computation (10 marks). Part (b) = BoF pipeline OR Viola-Jones (10 marks).

---

### Section A Q3: Stereo Vision [~20 marks]

| Sub-question | Prediction | Confidence | Source Pattern |
|-------------|------------|------------|----------------|
| (a) K matrix | Compute K from f, DPI, image size | **95%** | 2021, 2022, 2023, 2024 — every year |
| (a) Stereo depth | Compute d and Z from pixel coordinates | **85%** | 2020, 2022, 2023, 2024 |
| (b) Epipolar geometry | Define epipolar plane/lines/epipoles | **90%** | Every year |
| (b) F vs E matrix | "What does F encode? How does it differ from E?" | **80%** | 2022-2023 Q2(b), 2023-2024 Q2(b) |
| (b) Rectification | "After rectification, what form do epipolar lines take?" | **75%** | Standard follow-up |

**Most likely format:** Part (a) = K matrix + depth from disparity (10 marks). Part (b) = Epipolar geometry explanation + F matrix (10 marks).

---

### Section A Q4: Deep Learning [~20 marks]

| Sub-question | Prediction | Confidence | Source Pattern |
|-------------|------------|------------|----------------|
| (a) CNN output size | Apply formula with given parameters | **90%** | 2022, 2023, 2024 |
| (a) Architecture innovation | ResNet skip connections OR 1x1 conv OR 3x3 vs 7x7 | **85%** | 2022-2023 Q3(b,c), 2023-2024 |
| (b) GAN objective | Write formula, explain G/D, mode collapse | **75%** | 2023-2024 Q (Section B) |
| (b) Vision Transformer | Patch embedding + attention formula + [CLS] token | **70%** | 2023-2024 Q3(c) |
| (a) Parameter count | "How many learnable parameters in this layer?" | **60%** | Natural extension of output size |

**Most likely format:** Part (a) = CNN computation + architecture explanation (10 marks). Part (b) = GAN or ViT (10 marks).

---

### Section B Predictions (Pick 2 of 3)

#### B-Q5: Stereo Vision [~30 marks]
- (a) Full 3D reconstruction from stereo pair (disparity → depth → 3D coordinates → Euclidean distance) — **very likely**, exact format in 2023-2024 Q5(a)
- (b) Deep learning stereo pipeline (5 stages A-E) OR block matching challenges — **likely**, 2022-2023 Q5(c), 2023-2024 Q5(b)

#### B-Q6: Deep Learning + Image Classification [~30 marks]
- (a) Architecture comparison table (AlexNet vs VGG vs ResNet) + Transfer learning strategy — **likely**, combines 2022-2023 and 2023-2024 patterns
- (b) GAN for 3D reconstruction (Encoder/Generator/Discriminator/Classifier roles) — **high probability**, appeared in both 2023-2024 Section B with detailed component breakdown

#### B-Q7: Segmentation + Optical Flow [~30 marks]
- (a) GMM segmentation of natural scene in HSV (design full system, justify choices) — **very likely**, exact format in 2022-2023 Q4(a) and 2023-2024 Q4(a)
- (b) LK vs HS comparison table + multi-resolution pyramid explanation — **likely**, conceptual OF questions standard for Section B

---

## 7. High-Value "Free Mark" Topics

These are topics where 2-4 marks are essentially free if you memorise the answer:

| Topic | Marks | What to Write |
|-------|-------|---------------|
| "Why HSV over RGB?" | 2 | Hue encodes colour independent of illumination; separates chromaticity from brightness |
| Aperture problem | 2 | 1 equation, 2 unknowns; only perpendicular component detectable |
| "Optical flow ≠ motion" | 2 | Rotating uniform sphere (motion, no OF); moving light on static sphere (OF, no motion) |
| Rectification benefit | 2 | Epipolar lines become horizontal → 1D search along scanlines |
| Mode collapse | 2 | Generator produces limited variety; fix: minibatch discrimination |
| Why scale by √dk | 2 | Prevents dot products from becoming large → softmax saturation |
| Degradation problem | 2 | Adding layers to already-good net makes it WORSE (not overfitting); skip connections let network learn identity |
| K-means is GMM with Σ→0 | 1-2 | Hard assignment is limit case of soft assignment |

---

## 8. Dangerous Traps (Patterns of Student Errors)

Based on mark schemes and solution patterns:

| Trap | What Students Do Wrong | Correct Approach |
|------|----------------------|------------------|
| LBP bit ordering | Confuse MSB/LSB position | Read question: "starting from top-left, clockwise" — note if MSB or position 0 |
| Ix formula direction | Use I(x,y) - I(x-1,y) instead of given formula | Always use the EXACT formula stated in the question |
| K matrix: DPI conversion | Forget to convert dpi to pixels/mm | 72 dpi = 28.35 px/cm = 2.835 px/mm |
| Principal point | Calculate from wrong dimension | cx = WIDTH/2, cy = HEIGHT/2 (not swapped) |
| Disparity sign | Compute x_R - x_L (negative) | d = x_L - x_R (always positive for objects in front) |
| A^T b sign in LK | Confuse -A^Tb vs A^T(-b) | Set up as Ix·u + Iy·v = -It, so b_vec = [-It] |
| GAN equilibrium | Say "D always outputs 1" | At equilibrium D(x) = 0.5 everywhere |
| Soft vs hard argmin | Confuse which is differentiable | Soft argmin (weighted sum) is differentiable; hard argmin is not |

---

## 9. Year-over-Year Evolution

The exam has evolved noticeably:

| Period | Characteristics |
|--------|----------------|
| **2010-2015** | Focused on: edge detection, watershed, Hough transform, segmentation, basic features. No deep learning. |
| **2015-2020** | Transition period. GMM/EM became standard. Stereo depth introduced. |
| **2020-2024** | Modern format. Deep learning (CNN, GAN, ViT) now ~25% of marks. LBP computation added. Structure tensor computation added. Optical flow computation from grids added. |

**Key trend:** The exam increasingly tests **numerical computation** (LBP, K matrix, structure tensor, LK flow, CNN size, integral image) over pure description. Expect 40-50% of marks to require showing working.

---

## 10. Summary: What to Drill Before the Exam

**Priority 1 (will definitely appear):**
1. K matrix from DPI + focal length + image size
2. LBP from 3x3 patch
3. K-means iteration trace
4. Lucas-Kanade: Ix, Iy, It → A^TA → solve
5. Epipolar geometry definitions

**Priority 2 (very likely to appear):**
6. Structure tensor computation
7. CNN output size + parameter count
8. GMM E-step formula
9. Stereo depth Z = fB/d
10. Integral image computation

**Priority 3 (likely, good ROI):**
11. BoF pipeline (5 steps)
12. GAN min-max + mode collapse
13. ResNet degradation problem
14. LK vs HS comparison table
15. Viola-Jones cascade logic

---

*Analysis based on: 2010-2011, 2011-2012, 2012-2013, 2013-2014, 2014-2015, 2014-2015-UK, 2015-2016, 2020-2021, 2021-2022, 2022-2023, 2023-2024 papers.*
