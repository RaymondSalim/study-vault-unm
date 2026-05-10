---
title: "Introduction & Digital Images"
order: 1
moduleTitle: "COMP2032 - Image Processing"
tags: ["fundamentals", "digital-images", "point-processes"]
---

## What is Image Processing?

Collection of techniques for performing actions on digital images:

| Action | Description |
|--------|-------------|
| Acquire | Capture images from sensors |
| Store | Save in appropriate formats |
| Manipulate | Transform pixel values |
| Model | Represent image content |
| Analyse | Extract measurements |
| Display | Render for human viewing |

### Related Fields

| Field | Input | Output |
|-------|-------|--------|
| Image Processing | Image | Image |
| Image Analysis | Image | Measurements |
| Computer Vision | Image | Objects/Understanding |
| Computer Graphics | Model | Image |

## Digital Image Formation

An image is a 2D function $f(x, y)$ where amplitude at any $(x, y)$ gives intensity.

### Sampling & Quantisation

| Process | What it does | Determines |
|---------|--------------|------------|
| Sampling | Digitises spatial coordinates | Spatial resolution (pixels) |
| Quantisation | Digitises intensity values | Grey-level/colour resolution |

**Nyquist Rate**: Samples must be taken at $\geq 2 \times$ the highest frequency component.

**Aliasing**: Artefacts from under-sampling — two signals become indistinguishable.

### Image Representation

| Format | Channels | Values |
|--------|----------|--------|
| Greyscale | 1 | 0–255 |
| RGB | 3 | 0–255 per channel |
| Binary | 1 | 0 or 1 |
| RGBA | 4 | RGB + alpha |

An $M \times N$ image with $L$ grey levels requires $M \times N \times \lceil \log_2 L \rceil$ bits.

## Colour Spaces

| Space | Components | Use Case |
|-------|-----------|----------|
| RGB | Red, Green, Blue | Display, capture |
| HSV | Hue, Saturation, Value | Colour-based segmentation |
| LAB | Lightness, a*, b* | Perceptual uniformity |
| YCbCr | Luminance, Chrominance | Compression (JPEG) |

## Point Processes (Intensity Transforms)

Output depends **only** on the input pixel value — no neighbours involved.

$$g(x, y) = T[f(x, y)]$$

| Transform | Formula | Effect |
|-----------|---------|--------|
| Brightness | $g = f + c$ | Shift histogram left/right |
| Contrast | $g = \alpha \cdot f$ | Stretch/compress histogram |
| Negative | $g = L - 1 - f$ | Invert intensities |
| Gamma | $g = c \cdot f^\gamma$ | Non-linear brightness ($\gamma < 1$ brightens, $\gamma > 1$ darkens) |
| Thresholding | $g = \begin{cases} 0 & f < T \\ 255 & f \geq T \end{cases}$ | Binary output |

<details>
<summary>Practice: What gamma value brightens a dark image?</summary>

$\gamma < 1$ (e.g., $\gamma = 0.5$). This expands the dark range and compresses the bright range.
</details>

<details>
<summary>Practice: An 8-bit image uses how many grey levels?</summary>

$2^8 = 256$ grey levels (0 to 255).
</details>
