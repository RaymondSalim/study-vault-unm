---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP2032 - Image Processing"
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

## SIDE 1: FUNDAMENTALS, FILTERING & EDGES

### Digital Images

An image is $f(x,y)$; digitised via **sampling** (spatial resolution) and **quantisation** (intensity levels).

**Nyquist:** Sample at $\geq 2\times$ highest frequency. Under-sampling causes **aliasing**.

Storage: $M\times N$ image, $L$ grey levels needs $M\times N\times\lceil\log_2 L\rceil$ bits. 8-bit = 256 levels.

| Colour Space | Components | Use |
|-------------|-----------|-----|
| RGB | R, G, B | Display |
| HSV | Hue, Sat, Value | Colour segmentation |
| YCbCr | Luminance, Chrominance | JPEG compression |
| LAB | L, a*, b* | Perceptual uniformity |

---

### Point Processes

$g(x,y) = T[f(x,y)]$ — output depends only on input pixel value (no neighbours).

| Transform | Formula | Effect |
|-----------|---------|--------|
| Brightness | $g = f + c$ | Shift histogram |
| Contrast | $g = \alpha f$ | Stretch histogram |
| Negative | $g = L-1-f$ | Invert |
| Gamma | $g = cf^\gamma$ | $\gamma<1$ brightens, $\gamma>1$ darkens |
| Threshold | $g = 0$ if $f<T$, else $255$ | Binary |

---

### Histograms & Equalisation

Normalised histogram: $P(r_k) = n_k / (M\times N)$

**Histogram Equalisation** — spreads intensities to use full range:

$$s_k = \text{round}((L-1)\cdot\text{CDF}(r_k))$$

Steps: (1) Compute $P(r_k)$ (2) Compute CDF: $c(r_k)=\sum_{j=0}^k P(r_j)$ (3) Map: $s_k = \text{round}((L-1)\cdot c(r_k))$ (4) Replace pixels

**Histogram Intersection:** $H(I,M)=\sum\min(I_j,M_j)$ — similarity measure [0,1]

---

### Linear Filtering (Convolution)

$$g(x,y) = \sum_{s=-a}^a\sum_{t=-b}^b w(s,t)\cdot f(x+s,y+t)$$

**Convolution** flips kernel; **correlation** does not. For symmetric kernels, same result.

Properties: commutative, associative, distributive. **Separable** kernels: $O(n^2)\to O(2n)$ per pixel.

| Filter | Kernel | Effect |
|--------|--------|--------|
| Mean (box) | All $\frac{1}{n^2}$ | Smooths, blurs edges |
| Gaussian | $G(x,y)=\frac{1}{2\pi\sigma^2}e^{-(x^2+y^2)/2\sigma^2}$ | Smooth, no ringing, separable |

Gaussian: kernel size $\geq 6\sigma+1$. Larger $\sigma$ = more blur.

**Boundary:** Zero padding, replicate, reflect, wrap.

**Noise:** Gaussian noise $\to$ Gaussian/mean filter. Salt & pepper $\to$ median filter.

---

### Non-Linear Filtering

| Filter | Mechanism | Best for |
|--------|-----------|----------|
| Median | Sort window, pick middle | Salt & pepper; preserves edges |
| Bilateral | Weight by spatial AND intensity distance | Smooth while preserving edges |
| Anisotropic diffusion | Conductance $c=e^{-(\|\nabla I\|/K)^2}$ | Edge-preserving denoise |

**Bilateral:** $BF[I]_p = \frac{1}{W}\sum_q G_{\sigma_s}(\|p-q\|)\cdot G_{\sigma_r}(|I_p-I_q|)\cdot I_q$

When $\sigma_r\to\infty$: reduces to standard Gaussian. $\sigma_s$ = spatial extent, $\sigma_r$ = intensity tolerance.

---

### Edge Detection

Edges = locations of sharp intensity change. **Gradient:**

$$\|\nabla f\| = \sqrt{G_x^2+G_y^2}, \quad \theta = \arctan(G_y/G_x)$$

| Operator | $G_x$ kernel | Notes |
|----------|-------------|-------|
| Sobel | $\begin{bmatrix}-1&0&1\\-2&0&2\\-1&0&1\end{bmatrix}$ | Centre-weighted, good noise immunity |
| Prewitt | $\begin{bmatrix}-1&0&1\\-1&0&1\\-1&0&1\end{bmatrix}$ | Equal weights |

**Key:** $G_x$ detects **vertical** edges (horizontal change). $G_y$ detects **horizontal** edges.

**Laplacian (2nd derivative):** $\nabla^2f = f_{xx}+f_{yy}$. Edges at zero-crossings. Kernel: $\begin{bmatrix}0&1&0\\1&-4&1\\0&1&0\end{bmatrix}$

**LoG:** Gaussian smooth then Laplacian. **Sharpening:** $g = f + k\cdot\nabla^2 f$

---

### Canny Edge Detector

| Step | Operation |
|------|-----------|
| 1 | Gaussian smoothing |
| 2 | Gradient magnitude & direction (Sobel) |
| 3 | Non-maximum suppression (thin to 1px) |
| 4 | Hysteresis thresholding ($T_H$, $T_L$) |

**Hysteresis:** $\geq T_H$ = strong edge (keep). $T_L\leq x < T_H$ = weak (keep only if connected to strong). $< T_L$ = discard.

---

## SIDE 2: SEGMENTATION, HOUGH, CNN & COMPRESSION

### Thresholding & Morphology

**Otsu:** Maximises between-class variance $\sigma_B^2 = \omega_0\omega_1[\mu_0-\mu_1]^2$. Finds single global $T$.

**Adaptive thresholding:** Local $T$ per block (handles non-uniform illumination).

**Morphology** (binary images with structuring element $B$):

| Operation | Formula | Effect |
|-----------|---------|--------|
| Erosion $\ominus$ | $A\ominus B = \{z: B_z\subseteq A\}$ | Shrinks objects |
| Dilation $\oplus$ | $A\oplus B = \{z: \hat{B}_z\cap A\neq\emptyset\}$ | Grows objects |
| Opening | $(A\ominus B)\oplus B$ | Removes small foreground noise |
| Closing | $(A\oplus B)\ominus B$ | Fills small holes |

Opening & closing are **idempotent**. Opening $\neq$ closing (different effects).

**Connected components:** 4-connected (UDLR) vs 8-connected (includes diagonals). Two-pass algorithm.

---

### Hough Transform

Detects geometric primitives from edge points via voting in parameter space.

**Line (normal form):** $\rho = x\cos\theta + y\sin\theta$ &nbsp; ($\rho$ can be negative!)

Algorithm: (1) Quantise $(\rho,\theta)$ accumulator (2) Each edge point votes for all $\theta$: compute $\rho$ (3) Peaks = detected lines

**Circle:** $(x-a)^2+(y-b)^2=r^2$ — 3D parameter space $(a,b,r)$. If $r$ known: 2D accumulator. Gradient direction constrains votes.

**Generalised:** R-table for arbitrary shapes (store displacement vectors indexed by gradient direction).

---

### Segmentation

| Method | Strategy | Notes |
|--------|----------|-------|
| K-means | Cluster by colour/intensity | Must specify $K$; ignores spatial position |
| Region growing | Grow from seeds by similarity | Seed-dependent; threshold-sensitive |
| Split & merge | Quadtree: split non-uniform, merge similar | Top-down |
| Watershed | Flood from gradient minima | Over-segments; fix with markers |

**K-means:** Init $K$ centres $\to$ assign pixels to nearest $\to$ recompute means $\to$ repeat until stable.

**Watershed:** Treats gradient as topography. Catchment basins = regions. Ridges = boundaries. Marker-based fixes over-segmentation.

---

### Interactive Segmentation

**SLIC superpixels:** Modified K-means with combined colour+spatial distance: $D=\sqrt{d_c^2+(d_s/S)^2\cdot m^2}$. Grid spacing $S=\sqrt{N/K}$. Search within $2S\times 2S$.

**Livewire:** Dijkstra shortest path along strong edges from user seed. Cost = low along edges.

**Graph Cuts:** Image as graph, pixels as nodes. Min-cut = optimal segmentation. **GrabCut:** Iterative graph cuts with GMM colour models + user bounding box.

**Laplacian pyramid blending:** Decompose both images + mask into pyramids, blend at each level, reconstruct.

| Transform | DOF | Preserves |
|-----------|-----|-----------|
| Translation | 2 | Shape, size |
| Affine | 6 | Parallel lines |
| Projective | 8 | Straight lines |

---

### CNNs

Architecture: `Input → [Conv → ReLU → Pool]×N → Flatten → FC → Output`

| Layer | Function |
|-------|----------|
| Conv | Learned filters: $\text{output}(i,j)=\sum_{m,n}\text{input}(i+m,j+n)\cdot\text{kernel}(m,n)+b$ |
| ReLU | $f(x)=\max(0,x)$ |
| Pooling | Max/avg in window (2x2 stride 2 halves size) |
| FC | Classification |

**Output size:** $\lfloor(W-K+2P)/S\rfloor+1$

**Parameters:** 32 filters, 3x3, 3-channel input: $32\times(3\times3\times3+1)=896$

CNN layers = learned versions of classical filters. Early layers $\approx$ edge detectors.

---

### Compression

| Redundancy | Type | Exploited by |
|-----------|------|-------------|
| Coding | Sub-optimal bit allocation | Huffman |
| Spatial | Pixel correlation | DCT |
| Psychovisual | Invisible to HVS | Quantisation |

**Entropy:** $H = -\sum P(r_k)\log_2 P(r_k)$ — theoretical min bits/symbol

**Huffman:** Sort by prob $\to$ merge 2 lowest $\to$ assign 0/1 $\to$ repeat. Prefix-free. $L_{avg}\geq H$.

**JPEG pipeline:**

| Step | Type |
|------|------|
| RGB $\to$ YCbCr | Lossless |
| Chrominance subsampling | Lossy |
| 8x8 block DCT | Lossless |
| Quantisation ($\hat{F}=\text{round}(F/Q)$) | **Lossy (main loss)** |
| Zigzag + RLE + Huffman | Lossless |

DCT alone is lossless. Higher $Q$ values = more loss = smaller file = blocking artefacts.

**GIF:** 256-colour palette + LZW. Good for graphics, poor for photos.

---

### Key Traps

- Histogram equalisation: **must round** $s_k$ to integer
- Convolution **flips** kernel; correlation does not (symmetric kernels: same result)
- Sobel $G_x$ detects **vertical** edges (naming = derivative direction, not edge direction)
- Erosion **shrinks** (Erosion Eats); dilation grows
- DCT is lossless; **quantisation** is lossy
- Canny order: Smooth $\to$ Gradient $\to$ NMS $\to$ Hysteresis
- Hough $\rho$ can be negative
- 4-connected $\neq$ 8-connected (different component counts)
- Gaussian kernel size $\geq 6\sigma+1$
- Otsu finds ONE global threshold only
