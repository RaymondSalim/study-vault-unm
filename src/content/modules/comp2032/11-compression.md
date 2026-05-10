---
title: "Image Compression"
order: 11
moduleTitle: "COMP2032 - Image Processing"
tags: ["compression", "huffman", "JPEG", "GIF", "redundancy"]
---

## Types of Redundancy

| Type | Description | Example |
|------|-------------|---------|
| Coding redundancy | Sub-optimal bit allocation | Using 8 bits for a grey level that rarely occurs |
| Spatial redundancy | Correlation between neighbouring pixels | Smooth regions have similar values |
| Psychovisual redundancy | Information invisible to human vision | Fine detail in high-frequency regions |

## Information Theory

**Average bits per pixel**:

$$L_{avg} = \sum_{k=0}^{L-1} l(r_k) \cdot P(r_k)$$

**Entropy** (theoretical minimum):

$$H = -\sum_{k=0}^{L-1} P(r_k) \cdot \log_2 P(r_k)$$

**Compression ratio**: $C_R = \frac{\text{original bits}}{\text{compressed bits}}$

## Huffman Coding (Lossless)

Assigns shorter codes to more frequent symbols.

### Algorithm

| Step | Action |
|------|--------|
| 1 | Sort symbols by probability (ascending) |
| 2 | Merge two lowest-probability nodes → create parent |
| 3 | Assign 0/1 to left/right branches |
| 4 | Repeat until single root |
| 5 | Code = path from root to leaf |

### Properties
- Prefix-free: no code is a prefix of another
- Optimal among symbol-by-symbol codes
- Average code length approaches entropy

### Worked Example

| Symbol | Prob | Code | Bits |
|--------|------|------|------|
| A | 0.4 | 0 | 1 |
| B | 0.3 | 10 | 2 |
| C | 0.2 | 110 | 3 |
| D | 0.1 | 111 | 3 |

$L_{avg} = 0.4(1) + 0.3(2) + 0.2(3) + 0.1(3) = 1.9$ bits/symbol

## GIF (Psychovisual Redundancy)

- Limited to 256 colours (colour palette)
- LZW compression (lossless on the palette)
- Exploits psychovisual redundancy: humans can't distinguish millions of colours simultaneously
- Good for graphics, poor for photographs

## JPEG Compression (Lossy)

| Step | Operation | Type |
|------|-----------|------|
| 1 | Colour space conversion (RGB → YCbCr) | Lossless |
| 2 | Chrominance subsampling (4:2:0) | Lossy |
| 3 | Block into 8×8 blocks | — |
| 4 | DCT (Discrete Cosine Transform) | Lossless |
| 5 | Quantisation (divide by Q-table, round) | Lossy (main loss) |
| 6 | Zigzag scan (reorder coefficients) | — |
| 7 | RLE + Huffman coding | Lossless |

### DCT

Transforms spatial domain → frequency domain. Low-frequency coefficients (top-left) carry most energy.

### Quantisation

$$\hat{F}(u,v) = \text{round}\left(\frac{F(u,v)}{Q(u,v)}\right)$$

Higher Q values → more aggressive quantisation → smaller file → more loss.

### Quality Factor

| Quality | Effect |
|---------|--------|
| High (90–100) | Small Q values, little loss, large file |
| Medium (50–75) | Balance |
| Low (10–30) | Large Q values, visible artefacts (blocking) |

<details>
<summary>Practice: Why does JPEG process in 8×8 blocks rather than the whole image?</summary>

Full-image DCT would be computationally expensive ($O(N^2)$ for $N$ pixels). 8×8 blocks are efficient and local enough that blocking artefacts are usually acceptable. Also allows random access to portions of the image.
</details>

<details>
<summary>Practice: What is the entropy of a source with symbols of probability {0.5, 0.25, 0.125, 0.125}?</summary>

$H = -(0.5 \log_2 0.5 + 0.25 \log_2 0.25 + 0.125 \log_2 0.125 + 0.125 \log_2 0.125)$
$= -(−0.5 − 0.5 − 0.375 − 0.375) = 1.75$ bits/symbol.
</details>
