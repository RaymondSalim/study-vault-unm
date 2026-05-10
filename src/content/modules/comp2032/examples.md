---
title: "Worked Examples"
order: 96
moduleTitle: "COMP2032 - Image Processing"
tags: ["examples", "computation"]
---

## Example 1: Histogram Equalisation

**Given**: 3-bit image (L=8), pixel distribution:

| $r_k$ | $n_k$ | $P(r_k)$ |
|--------|--------|-----------|
| 0 | 8 | 0.10 |
| 1 | 10 | 0.13 |
| 2 | 20 | 0.25 |
| 3 | 14 | 0.18 |
| 4 | 12 | 0.15 |
| 5 | 8 | 0.10 |
| 6 | 5 | 0.06 |
| 7 | 3 | 0.04 |

**Step 1**: Compute CDF and mapping:

| $r_k$ | $P(r_k)$ | CDF | $s_k = \text{round}(7 \times \text{CDF})$ |
|--------|-----------|------|------|
| 0 | 0.10 | 0.10 | 1 |
| 1 | 0.13 | 0.23 | 2 |
| 2 | 0.25 | 0.48 | 3 |
| 3 | 0.18 | 0.65 | 5 |
| 4 | 0.15 | 0.80 | 6 |
| 5 | 0.10 | 0.90 | 6 |
| 6 | 0.06 | 0.96 | 7 |
| 7 | 0.04 | 1.00 | 7 |

**Result**: Mapping is $\{0 \to 1, 1 \to 2, 2 \to 3, 3 \to 5, 4 \to 6, 5 \to 6, 6 \to 7, 7 \to 7\}$

---

## Example 2: 3×3 Convolution

**Given** image patch and kernel:

Image:
$$\begin{bmatrix} 10 & 20 & 30 \\ 40 & 50 & 60 \\ 70 & 80 & 90 \end{bmatrix}$$

Kernel (Sobel $G_x$):
$$\begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix}$$

**Computation** (for centre pixel):

$$G_x = (-1)(10) + (0)(20) + (1)(30) + (-2)(40) + (0)(50) + (2)(60) + (-1)(70) + (0)(80) + (1)(90)$$
$$= -10 + 0 + 30 - 80 + 0 + 120 - 70 + 0 + 90 = 80$$

---

## Example 3: Huffman Coding

**Given** symbols with probabilities:

| Symbol | Probability |
|--------|-------------|
| A | 0.35 |
| B | 0.25 |
| C | 0.20 |
| D | 0.12 |
| E | 0.08 |

**Step 1**: Sort ascending: E(0.08), D(0.12), C(0.20), B(0.25), A(0.35)

**Step 2**: Build tree:
- Merge E+D → node(0.20)
- Merge node(0.20)+C → node(0.40)
- Merge B+A → node(0.60) ... wait, let's do it correctly:
- Merge E(0.08)+D(0.12) = ED(0.20)
- Merge C(0.20)+ED(0.20) = CED(0.40)
- Merge B(0.25)+A(0.35) = BA(0.60)
- Merge CED(0.40)+BA(0.60) = root(1.0)

**Step 3**: Assign codes (0=left, 1=right):

| Symbol | Code | Length |
|--------|------|--------|
| A | 11 | 2 |
| B | 10 | 2 |
| C | 00 | 2 |
| D | 011 | 3 |
| E | 010 | 3 |

**Average length**: $0.35(2) + 0.25(2) + 0.20(2) + 0.12(3) + 0.08(3) = 2.20$ bits/symbol

**Entropy**: $H = -(0.35\log_2 0.35 + 0.25\log_2 0.25 + 0.20\log_2 0.20 + 0.12\log_2 0.12 + 0.08\log_2 0.08) \approx 2.16$ bits/symbol

**Efficiency**: $2.16/2.20 = 98.2\%$

---

## Example 4: Hough Transform

**Given** edge points: $(1, 1)$, $(2, 2)$, $(3, 3)$

For point $(1, 1)$ at $\theta = 45°$:
$$\rho = 1 \cdot \cos 45° + 1 \cdot \sin 45° = 0.707 + 0.707 = 1.414$$

For point $(2, 2)$ at $\theta = 45°$:
$$\rho = 2 \cdot \cos 45° + 2 \cdot \sin 45° = 1.414 + 1.414 = 2.828$$

For point $(3, 3)$ at $\theta = 45°$:
$$\rho = 3 \cdot \cos 45° + 3 \cdot \sin 45° = 4.243$$

These DON'T align at $\theta = 45°$. Let's try $\theta = 135°$ ($\cos 135° = -0.707$, $\sin 135° = 0.707$):

Point $(1,1)$: $\rho = -0.707 + 0.707 = 0$
Point $(2,2)$: $\rho = -1.414 + 1.414 = 0$
Point $(3,3)$: $\rho = -2.121 + 2.121 = 0$

All three vote for $(\rho=0, \theta=135°)$ → **peak detected** → line is $y = x$ (diagonal through origin).

---

## Example 5: Otsu's Threshold

**Given** 2-bit image (L=4), 16 pixels total:

| $r_k$ | $n_k$ | $P(r_k)$ |
|--------|--------|-----------|
| 0 | 4 | 0.25 |
| 1 | 6 | 0.375 |
| 2 | 4 | 0.25 |
| 3 | 2 | 0.125 |

Try $T = 2$ (background: {0,1}, foreground: {2,3}):

- $\omega_0 = 0.25 + 0.375 = 0.625$
- $\omega_1 = 0.25 + 0.125 = 0.375$
- $\mu_0 = (0 \times 0.25 + 1 \times 0.375) / 0.625 = 0.6$
- $\mu_1 = (2 \times 0.25 + 3 \times 0.125) / 0.375 = 2.33$
- $\sigma_B^2 = 0.625 \times 0.375 \times (0.6 - 2.33)^2 = 0.234 \times 3.0 = 0.70$

Compare all thresholds, pick the one with maximum $\sigma_B^2$.
