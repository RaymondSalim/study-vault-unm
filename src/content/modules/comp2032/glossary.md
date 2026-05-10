---
title: "Glossary"
order: 95
moduleTitle: "COMP2032 - Image Processing"
tags: ["glossary", "definitions"]
---

| Term | Definition |
|------|-----------|
| Aliasing | Artefacts from sampling below the Nyquist rate |
| Anisotropic diffusion | Edge-preserving smoothing that stops diffusion at high gradients |
| Bilateral filter | Smoothing filter weighting by both spatial and intensity distance |
| Binary image | Image with only two values (0 and 1) |
| Canny operator | Multi-stage optimal edge detector (smooth, gradient, NMS, hysteresis) |
| CDF | Cumulative Distribution Function: running sum of histogram |
| Closing | Dilation followed by erosion; fills small holes |
| Connected components | Labelling of contiguous foreground pixel groups |
| Convolution | Weighted sum of pixels in a sliding window (with kernel flipping) |
| DCT | Discrete Cosine Transform: converts spatial data to frequency domain |
| Dilation | Morphological operation that grows foreground regions |
| Edge | Location of significant intensity change |
| Entropy | Minimum average bits per pixel: $H = -\sum P \log_2 P$ |
| Erosion | Morphological operation that shrinks foreground regions |
| Gaussian filter | Smoothing filter with weights from a Gaussian distribution |
| GrabCut | Iterative graph-cut segmentation initialised by user bounding box |
| Gradient | First derivative of image; magnitude and direction indicate edges |
| Histogram | Count of pixels at each grey level |
| Histogram equalisation | Transform to produce approximately uniform histogram |
| Hough transform | Voting method to detect parametric shapes in edge images |
| Huffman coding | Lossless variable-length coding: short codes for frequent symbols |
| Hysteresis thresholding | Two-threshold method keeping weak edges connected to strong ones |
| K-means | Clustering algorithm partitioning data into K groups by nearest mean |
| Kernel | Weight matrix used in convolution/filtering |
| Laplacian | Second derivative operator detecting zero-crossings at edges |
| Livewire | Interactive segmentation finding optimal path along edges |
| Mean filter | Replaces pixel with average of its neighbourhood |
| Median filter | Replaces pixel with median of neighbourhood (non-linear) |
| Morphology | Set of operations on binary images using structuring elements |
| NMS | Non-maximum suppression: thinning edges to single-pixel width |
| Nyquist rate | Minimum sampling rate = 2× highest frequency |
| Opening | Erosion followed by dilation; removes small foreground noise |
| Otsu's method | Automatic threshold selection maximising between-class variance |
| Point process | Transformation depending only on individual pixel value |
| Pooling | Downsampling in CNNs (max or average over window) |
| Quantisation | Digitising intensity values to discrete levels |
| Region growing | Segmentation by iteratively adding similar neighbouring pixels |
| Sampling | Digitising spatial coordinates to create pixel grid |
| Segmentation | Partitioning image into meaningful regions |
| SLIC | Simple Linear Iterative Clustering for superpixel generation |
| Sobel operator | 3×3 gradient filter with centre-weighted smoothing |
| Structuring element | Shape used as probe in morphological operations |
| Superpixel | Over-segmented atomic region grouping similar neighbouring pixels |
| Thresholding | Converting greyscale to binary using a cutoff value |
| Watershed | Segmentation treating gradient as topography and flooding from minima |
