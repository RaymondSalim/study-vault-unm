---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP3038 - Machine Learning"
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

## SIDE 1: SUPERVISED LEARNING

### Linear Regression

**Model:** $h_\theta(x) = \boldsymbol{\theta}^T \mathbf{x} = \theta_0 + \theta_1 x_1 + \cdots + \theta_n x_n$

**Cost (MSE):** $J(\theta) = \frac{1}{2m}\sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})^2$ (convex, single global min)

**Gradient Descent:** $\theta_j := \theta_j - \frac{\alpha}{m}\sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}$

**Normal Equation:** $\boldsymbol{\theta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ (no $\alpha$, $O(n^3)$, use when $n < 10{,}000$)

| GD Variant | Batch size | Property |
|-----------|-----------|----------|
| Batch | All $m$ | Stable but slow for large $m$ |
| SGD | 1 | Fast but noisy |
| Mini-batch | $b$ (32-64) | Best of both |

**Feature Scaling:** Min-max: $x' = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$; Z-score: $x' = \frac{x - \mu}{\sigma}$

---

### Logistic Regression (Classification)

**Model:** $h_\theta(x) = \sigma(\boldsymbol{\theta}^T\mathbf{x}) = \frac{1}{1+e^{-\boldsymbol{\theta}^T\mathbf{x}}}$

**Sigmoid properties:** Range $(0,1)$; $\sigma(0) = 0.5$; derivative $= \sigma(z)(1-\sigma(z))$

**Decision boundary:** Predict 1 if $\boldsymbol{\theta}^T\mathbf{x} \geq 0$

**Cost (Log Loss):** $J = -\frac{1}{m}\sum[y\log(h) + (1-y)\log(1-h)]$ (convex for sigmoid)

**Multi-class:** One-vs-Rest ($K$ classifiers) or Softmax: $P(y=k|x) = \frac{e^{\theta_k^Tx}}{\sum_j e^{\theta_j^Tx}}$

**Regularised:** $J_{\text{reg}} = J + \frac{\lambda}{2m}\sum_{j=1}^n \theta_j^2$ (do NOT regularise $\theta_0$)

---

### Decision Trees

**Entropy:** $H(S) = -\sum_{k=1}^K p_k \log_2 p_k$ (max = $\log_2 K$ when uniform)

**Gini Impurity:** $G(S) = 1 - \sum_{k=1}^K p_k^2$

**Information Gain:** $\text{IG}(S,A) = H(S) - \sum_v \frac{|S_v|}{|S|} H(S_v)$ (choose attribute with max IG)

**Worked example:** $S$: 9+, 5- $\to$ $H(S) = -\frac{9}{14}\log_2\frac{9}{14} - \frac{5}{14}\log_2\frac{5}{14} = 0.940$

**Pruning:** Pre-pruning (max depth, min samples) vs Post-pruning (cost-complexity $\alpha$)

**Properties:** Interpretable, no scaling needed, handles mixed types; BUT: high variance, overfits, unstable

---

### Ensemble Methods

| Method | Trains | Reduces | Technique |
|--------|--------|---------|-----------|
| **Bagging** | Parallel (bootstrap) | Variance | Average/vote |
| **Boosting** | Sequential | Bias | Weighted sum |

**Random Forest:** Bagging + random feature subset at each split ($\sqrt{n}$ for classification). OOB error as free validation.

**AdaBoost:** $\alpha_t = \frac{1}{2}\ln\frac{1-\epsilon_t}{\epsilon_t}$; up-weight misclassified samples

**Gradient Boosting:** $F_m(x) = F_{m-1}(x) + \eta \cdot h_m(x)$ where $h_m$ fits negative gradient (residuals)

---

### Support Vector Machines

**Hard-margin:** $\min \frac{1}{2}\|\mathbf{w}\|^2$ s.t. $y^{(i)}(\mathbf{w}^T\mathbf{x}^{(i)} + b) \geq 1$. Margin width $= \frac{2}{\|\mathbf{w}\|}$

**Soft-margin:** $\min \frac{1}{2}\|\mathbf{w}\|^2 + C\sum\xi_i$ s.t. $y^{(i)}(\mathbf{w}^T\mathbf{x}^{(i)} + b) \geq 1 - \xi_i$

| $C$ large | $C$ small |
|-----------|-----------|
| Narrow margin, few violations (overfit) | Wide margin, more violations (underfit) |

**Note:** $C \propto 1/\lambda$ (inverse of regularisation strength)

**Kernel Trick:** Replace dot products with $K(\mathbf{x}, \mathbf{z}) = \phi(\mathbf{x})^T\phi(\mathbf{z})$

| Kernel | Formula | Notes |
|--------|---------|-------|
| Linear | $\mathbf{x}^T\mathbf{z}$ | Linearly separable |
| Polynomial | $(\mathbf{x}^T\mathbf{z} + c)^d$ | Degree $d$ boundary |
| RBF | $\exp(-\gamma\|\mathbf{x}-\mathbf{z}\|^2)$ | Infinite dim; $\gamma$ large = overfit |

**Only support vectors** (points on/inside margin) determine the boundary.

---

## SIDE 2: NEURAL NETS, UNSUPERVISED & EVALUATION

### Neural Networks

**Perceptron:** $\hat{y} = \text{sign}(\mathbf{w}^T\mathbf{x} + b)$. Converges only for linearly separable data. Cannot solve XOR.

**MLP Forward pass:** $\mathbf{z}^{[l]} = \mathbf{W}^{[l]}\mathbf{a}^{[l-1]} + \mathbf{b}^{[l]}$; $\mathbf{a}^{[l]} = g(\mathbf{z}^{[l]})$

**Activation Functions:**

| Function | Formula | Use | Issue |
|----------|---------|-----|-------|
| Sigmoid | $\frac{1}{1+e^{-z}}$ | Binary output | Vanishing gradient |
| Tanh | $\frac{e^z-e^{-z}}{e^z+e^{-z}}$ | Hidden (old) | Vanishing gradient |
| ReLU | $\max(0,z)$ | Hidden (default) | Dead neurons |
| Leaky ReLU | $\max(0.01z, z)$ | Hidden | Fixes dead ReLU |
| Softmax | $\frac{e^{z_k}}{\sum e^{z_j}}$ | Multi-class output | -- |

**Backpropagation:** Forward pass $\to$ compute loss $\to$ backpropagate $\delta^{[l]} = (W^{[l+1]})^T\delta^{[l+1]} \odot g'(z^{[l]})$ $\to$ update $W^{[l]} \leftarrow W^{[l]} - \alpha \delta^{[l]}(a^{[l-1]})^T$

**Weight Init:** Xavier ($\frac{1}{\sqrt{n_{in}}}$) for sigmoid/tanh; He ($\sqrt{\frac{2}{n_{in}}}$) for ReLU. Never zeros (symmetry problem).

---

### Deep Learning

**CNN:** Exploit spatial structure. Conv layer $\to$ Pooling $\to$ FC.

**Output size:** $n_{\text{out}} = \lfloor\frac{n_{\text{in}} + 2p - f}{s}\rfloor + 1$ ($p$=padding, $f$=filter, $s$=stride)

**Conv params:** $c_{\text{out}} \times (c_{\text{in}} \times f \times f + 1)$. Pooling has NO learnable params.

**ResNet:** $a^{[l+2]} = g(z^{[l+2]} + a^{[l]})$ -- skip connections solve vanishing gradients in deep nets.

**RNN:** $h_t = g(W_{hh}h_{t-1} + W_{xh}x_t + b)$. Problems: vanishing/exploding gradients.

**LSTM:** Cell state $c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t$; $h_t = o_t \odot \tanh(c_t)$. Gates (forget, input, output) control memory. Solves vanishing gradient via additive cell state updates.

**Transformer:** $\text{Attention}(Q,K,V) = \text{softmax}(\frac{QK^T}{\sqrt{d_k}})V$. Fully parallel, direct long-range attention.

---

### Unsupervised Learning

**K-Means:** 1. Init $K$ centroids; 2. Assign points to nearest centroid; 3. Update centroids to cluster means; 4. Repeat.

**Objective:** $J = \sum_{i=1}^m \|x^{(i)} - \mu_{c^{(i)}}\|^2$ (always converges to LOCAL min)

**K-Means++ init:** First centroid random; subsequent chosen proportional to $D(x)^2$

**Choosing K:** Elbow method (plot $J$ vs $K$) or Silhouette score

**Hierarchical Clustering:** Agglomerative (bottom-up merge). Linkage: single (chaining), complete (compact), Ward's (best general).

**DBSCAN:** Density-based. Params: $\varepsilon$ (radius), MinPts. Finds arbitrary shapes. Labels: core, border, noise.

---

### PCA (Dimensionality Reduction)

**Algorithm:** 1. Centre data ($x - \bar{x}$); 2. Covariance $\Sigma = \frac{1}{m}X^TX$; 3. Eigendecompose; 4. Project onto top $k$ eigenvectors.

**Variance explained:** $\frac{\lambda_k}{\sum \lambda_i}$. Choose $k$ s.t. cumulative $\geq 95\%$.

**Reconstruction:** $\hat{x} = U_k z + \bar{x}$. Error $= \sum_{i=k+1}^n \lambda_i$.

| Method | Linear? | Preserves |
|--------|---------|-----------|
| PCA | Yes | Global variance |
| t-SNE | No | Local structure |

---

### Evaluation & Methodology

**Bias-Variance:** $\text{Error} = \text{Bias}^2 + \text{Variance} + \text{Noise}$

| Symptom | Problem | Fix |
|---------|---------|-----|
| High train + high test error | Underfitting (bias) | More complex model, more features |
| Low train + high test error | Overfitting (variance) | More data, regularisation, simpler model |

**Regularisation:**

| Method | Penalty | Effect |
|--------|---------|--------|
| L2 (Ridge) | $\lambda\sum\theta_j^2$ | Shrinks all weights |
| L1 (Lasso) | $\lambda\sum|\theta_j|$ | Sparse (feature selection) |
| Dropout | Zero neurons with prob $p$ | Ensemble effect (train only!) |

**K-Fold CV:** Split into $K$ folds; train $K$ times (each fold as val); average scores. Stratified for imbalanced.

**Classification Metrics:**

| Metric | Formula |
|--------|---------|
| Precision | $\frac{TP}{TP+FP}$ |
| Recall | $\frac{TP}{TP+FN}$ |
| F1 | $\frac{2PR}{P+R}$ |
| AUC-ROC | Area under TPR vs FPR curve |

**Regression:** MSE $= \frac{1}{m}\sum(y-\hat{y})^2$; $R^2 = 1 - \frac{SS_{res}}{SS_{tot}}$

---

### Key Exam Traps

- More data helps variance NOT bias
- GD only finds global min for convex functions (not neural nets)
- $C$ in SVM is inverse of $\lambda$ (large $C$ = less regularisation)
- Only support vectors determine SVM boundary
- Bagging reduces variance; Boosting reduces bias
- High accuracy is meaningless on imbalanced data -- use F1/AUC
- Dropout is ONLY during training (not test)
- ReLU default for hidden layers (not sigmoid)
- K-Means converges to local optimum only
- Cross-validation DETECTS overfitting; regularisation PREVENTS it
- Do NOT regularise the bias term $\theta_0$
