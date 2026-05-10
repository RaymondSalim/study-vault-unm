---
title: "Glossary"
order: 95
moduleTitle: "COMP3029 - Computer Vision"
tags: ["glossary", "definitions"]
---

## Key Terms

| Term | Definition |
|------|-----------|
| **AdaBoost** | Ensemble method that combines weak classifiers into a strong one by reweighting misclassified samples |
| **Affine transformation** | Linear mapping preserving parallelism: rotation, scale, shear, translation |
| **Backpropagation** | Algorithm for computing gradients in a neural network via the chain rule, layer by layer |
| **Bag of Features (BoF)** | Image representation as histogram of quantised local feature descriptors (visual words) |
| **Cascade classifier** | Multi-stage classifier where each stage can reject negatives early (Viola-Jones) |
| **CNN** | Convolutional Neural Network — uses learnable spatial filters, pooling, and fully connected layers |
| **Convolution** | Sliding a flipped kernel over an image, computing weighted sums at each position |
| **Correlation** | Like convolution but without flipping the kernel |
| **Depth map** | Image where pixel values encode distance from camera to scene surface |
| **Descriptor** | Compact numerical representation of a local image patch (e.g., SIFT 128-D vector) |
| **Discriminator** | GAN component that classifies inputs as real or generated |
| **Disparity** | Pixel shift between corresponding points in a stereo pair; inversely proportional to depth |
| **Epipolar geometry** | Geometric relationship between two views constraining where correspondences can lie |
| **Epipolar line** | Line in one image along which the correspondence of a point in the other image must lie |
| **Epoch** | One complete pass through the entire training dataset |
| **Essential matrix (E)** | Relates corresponding points in calibrated stereo: $x'^T E x = 0$ |
| **Feature map** | Output of applying a convolutional filter to an input — a spatial activation map |
| **Fundamental matrix (F)** | Relates corresponding points in uncalibrated stereo: $x'^T F x = 0$ |
| **GAN** | Generative Adversarial Network — generator and discriminator trained in a minimax game |
| **Generator** | GAN component that synthesises data from random noise to fool the discriminator |
| **Haar-like features** | Simple rectangular features computed efficiently with integral images (Viola-Jones) |
| **Harris corner** | Point where image intensity changes significantly in all directions ($R > \text{threshold}$) |
| **Histogram equalisation** | Remapping pixel intensities to flatten the histogram, improving contrast |
| **Homogeneous coordinates** | Representation adding an extra dimension: $(x, y) \to (x, y, 1)$; enables projective transforms as matrix multiplication |
| **Homography** | Projective transformation mapping one plane to another: $x' = Hx$ |
| **Integral image** | Precomputed table of cumulative sums enabling O(1) rectangular region queries |
| **IoU (Intersection over Union)** | Overlap metric for bounding boxes: area of intersection ÷ area of union |
| **Kernel** | Small matrix of weights used in convolution/filtering |
| **Keypoint** | Distinctive, repeatable point in an image (corner, blob) used for matching |
| **K-means** | Clustering algorithm: assign points to nearest centroid, recompute centroids, repeat |
| **Laplacian of Gaussian (LoG)** | Second derivative operator for blob detection; approximated by Difference of Gaussians (DoG) |
| **Max pooling** | Downsampling by taking the maximum value in each local region |
| **Mode collapse** | GAN failure where generator produces limited variety of outputs |
| **NMS (Non-maximum suppression)** | Technique to keep only local maxima, suppressing weaker overlapping detections |
| **Optical flow** | Per-pixel apparent velocity field between consecutive frames |
| **ORB** | Oriented FAST and Rotated BRIEF — fast binary descriptor, rotation invariant |
| **Pinhole model** | Idealised camera: light passes through a single point, projecting 3D→2D |
| **Precision** | TP / (TP + FP) — of predicted positives, fraction that are correct |
| **Principal point** | Point where optical axis intersects the image plane (usually near image centre) |
| **Projective transformation** | Most general linear transformation in homogeneous coords (8 DoF for 2D) |
| **RANSAC** | Random Sample Consensus — robust fitting that handles outliers by random sampling |
| **Recall** | TP / (TP + FN) — of actual positives, fraction that are detected |
| **Receptive field** | Region of input that influences a particular neuron's activation |
| **Rectification** | Warping stereo images so epipolar lines become horizontal scanlines |
| **ResNet** | CNN architecture using skip/residual connections to train very deep networks |
| **ROC curve** | Plot of true positive rate vs false positive rate at varying thresholds |
| **Scale space** | Multi-scale image representation (Gaussian pyramid) for detecting features at different sizes |
| **Segmentation** | Partitioning an image into meaningful regions (semantic, instance, or panoptic) |
| **SIFT** | Scale-Invariant Feature Transform — keypoint detector + 128-D descriptor invariant to scale and rotation |
| **Sliding window** | Detection approach: classify every image sub-window at multiple scales |
| **Stereo matching** | Finding corresponding points between left and right images to compute depth |
| **Stride** | Step size of a sliding filter or pooling operation |
| **SURF** | Speeded-Up Robust Features — faster approximation of SIFT using box filters and integral images |
| **Transfer learning** | Reusing a pre-trained network (e.g., ImageNet) on a new task, fine-tuning top layers |
| **Vanishing point** | Image point where parallel 3D lines converge under perspective projection |
| **Vision Transformer (ViT)** | Architecture applying self-attention to image patches instead of convolution |
| **Visual word** | Cluster centre in feature space representing a prototypical local appearance |
