---
title: "Introduction & Digital Images"
order: 1
moduleTitle: "COMP2032 - Image Processing"
tags: ["fundamentals", "digital-images", "point-processes"]
---

## What is Image Processing?

:::eli10

Image processing is like using filters on your photos — but for computers! It's when a computer looks at a picture and changes it, measures things in it, or tries to understand what's in it. Think of it like a recipe book for editing photos automatically.

:::

:::eli15

Image processing is a collection of computational techniques that manipulate digital images. It covers everything from capturing images with sensors to storing, transforming, analyzing, and displaying them. Related fields include computer vision (understanding scene content) and computer graphics (creating images from models). The key distinction is: image processing takes an image in and outputs a modified image.

:::

:::eli20

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

:::

## Digital Image Formation

:::eli10

A digital image is like a huge grid of tiny colored squares (pixels). Each square has a number that says how bright or what colour it is. The more squares you use, the sharper the picture looks — like how more LEGO bricks make a smoother model.

:::

:::eli15

A digital image is a 2D grid of pixels, each storing an intensity value. Two key processes create a digital image from a continuous scene: sampling (choosing how many pixels to use, determining spatial resolution) and quantisation (choosing how many brightness levels each pixel can have). If you don't sample frequently enough, you get aliasing — fake patterns that weren't in the original scene. The Nyquist theorem says you need at least 2 samples per cycle of the highest frequency in the image.

:::

:::eli20

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

:::

## Colour Spaces

:::eli10

Colours on a computer can be described in different ways, just like you can describe a location using a street address or GPS coordinates. RGB mixes red, green, and blue light. HSV describes colour by its shade, how vivid it is, and how bright it is — which is closer to how we naturally think about colour.

:::

:::eli15

Different colour spaces represent colours using different coordinate systems, each suited to different tasks. RGB (red, green, blue) matches how monitors emit light. HSV (hue, saturation, value) separates colour shade from brightness, making it easier to select colours by "type." LAB is designed so equal numerical distances correspond to equal perceptual differences. YCbCr separates luminance from chrominance, which is useful for compression since humans are less sensitive to colour detail than brightness detail.

:::

:::eli20

| Space | Components | Use Case |
|-------|-----------|----------|
| RGB | Red, Green, Blue | Display, capture |
| HSV | Hue, Saturation, Value | Colour-based segmentation |
| LAB | Lightness, a*, b* | Perceptual uniformity |
| YCbCr | Luminance, Chrominance | Compression (JPEG) |

:::

## Point Processes (Intensity Transforms)

:::eli10

Point processes are like turning up or down the brightness and contrast knobs on a TV. Each pixel gets changed individually based on a simple rule — like "make everything brighter by 10" or "flip all colours to their opposite." No pixel needs to know what its neighbours are doing.

:::

:::eli15

Point processes transform each pixel independently based solely on its own value — no information from surrounding pixels is used. Common transforms include adjusting brightness (adding a constant), adjusting contrast (multiplying by a factor), computing the negative (inverting), and gamma correction (a non-linear curve that can brighten dark regions or darken bright ones). Thresholding converts a greyscale image to binary by picking a cutoff value.

:::

:::eli20

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

:::
