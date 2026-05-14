---
title: "Image Compression"
order: 11
moduleTitle: "COMP2032 - Image Processing"
tags: ["compression", "huffman", "JPEG", "GIF", "redundancy"]
---

## Types of Redundancy

:::eli10

Images have a lot of repeated or unnecessary information. Nearby pixels are often the same colour (spatial redundancy). Some brightness levels are used way more than others but all get the same number of bits (coding redundancy). And there's detail so fine that your eyes can't even see it (psychovisual redundancy). Compression removes this waste to make files smaller.

:::

:::eli15

Image compression exploits three types of redundancy: coding redundancy (using more bits than needed for rare values — solved with variable-length codes like Huffman), spatial redundancy (neighbouring pixels are correlated — solved with transforms like DCT that concentrate energy), and psychovisual redundancy (detail the human visual system cannot perceive — removed by quantisation). Lossless methods only address coding redundancy; lossy methods like JPEG exploit all three.

:::

:::eli20

| Type | Description | Example |
|------|-------------|---------|
| Coding redundancy | Sub-optimal bit allocation | Using 8 bits for a grey level that rarely occurs |
| Spatial redundancy | Correlation between neighbouring pixels | Smooth regions have similar values |
| Psychovisual redundancy | Information invisible to human vision | Fine detail in high-frequency regions |

:::

## Information Theory

:::eli10

Information theory tells us the absolute minimum number of bits needed to store something. Common things need fewer bits; rare things need more. Entropy is this minimum — like the theoretical best score on a packing puzzle. No lossless compression can beat it.

:::

:::eli15

Information theory provides the theoretical foundation for compression. The average bit rate tells you how many bits you're currently using per pixel. Entropy gives the theoretical minimum — it's computed from the probability distribution of pixel values. If a particular grey level is very common, it carries less "information" (surprise) and can be encoded in fewer bits. The compression ratio measures how much smaller the compressed version is. No lossless code can achieve an average rate below entropy.

:::

:::eli20

**Average bits per pixel**:

$$L_{avg} = \sum_{k=0}^{L-1} l(r_k) \cdot P(r_k)$$

**Entropy** (theoretical minimum):

$$H = -\sum_{k=0}^{L-1} P(r_k) \cdot \log_2 P(r_k)$$

**Compression ratio**: $C_R = \frac{\text{original bits}}{\text{compressed bits}}$

:::

## Huffman Coding (Lossless)

:::eli10

Huffman coding is like giving short nicknames to your best friends (who you mention often) and long formal names to people you rarely talk about. The most common pixel values get short codes, and rare values get longer codes. This saves space overall without losing any information.

:::

:::eli15

Huffman coding is a lossless compression technique that assigns variable-length binary codes to symbols based on their frequency. More frequent symbols get shorter codes, less frequent ones get longer codes. The algorithm builds a binary tree by repeatedly merging the two least-frequent symbols. The resulting codes are prefix-free (no code is a prefix of another), so they can be uniquely decoded. The average code length approaches the entropy — making it near-optimal for symbol-by-symbol encoding.

:::

:::eli20

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

:::

## GIF (Psychovisual Redundancy)

:::eli10

GIF files only use 256 colours (like a box of 256 crayons). This works great for cartoons and simple graphics because they don't need millions of colours. But for photographs with smooth colour gradients, it looks bad because you run out of crayons and get visible banding.

:::

:::eli15

The GIF format exploits psychovisual redundancy by reducing the colour palette to at most 256 colours from the full 16 million. It uses LZW compression (lossless) on the palettised data. This works well for graphics with limited colours (logos, diagrams, simple animations) where most distinct colours can be represented by the palette. For photographs with continuous colour gradients, 256 colours are insufficient and visible colour banding occurs.

:::

:::eli20

- Limited to 256 colours (colour palette)
- LZW compression (lossless on the palette)
- Exploits psychovisual redundancy: humans can't distinguish millions of colours simultaneously
- Good for graphics, poor for photographs

:::

## JPEG Compression (Lossy)

:::eli10

JPEG compresses photos by first converting to a colour format where it can reduce colour detail (your eyes don't notice), then breaking the image into small 8x8 blocks, converting each to a frequency representation, and throwing away the fine details you can't see. The remaining information is efficiently encoded. Lower quality means smaller files but blockier-looking images.

:::

:::eli15

JPEG compression works through a multi-step pipeline. First, it converts to YCbCr and subsamples chrominance (humans are less sensitive to colour detail). The image is divided into 8x8 blocks, and each block undergoes DCT (Discrete Cosine Transform), which concentrates most of the image energy into a few low-frequency coefficients. Quantisation then divides these coefficients by a quality-dependent table and rounds — this is where most information is lost. The quantised coefficients (mostly zeros for high frequencies) are then efficiently encoded using zigzag ordering, run-length encoding, and Huffman coding. The quality factor controls how aggressive the quantisation is.

:::

:::eli20

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

:::
