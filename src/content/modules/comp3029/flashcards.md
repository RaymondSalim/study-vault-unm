---
title: "Flashcards"
order: 92
moduleTitle: "COMP3029 - Computer Vision"
tags: ["flashcards", "revision", "Q&A"]
---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is image segmentation? | Partitioning an image into meaningful regions (e.g., foreground vs background, individual objects) |
| 2 | Name two region-based segmentation methods. | Thresholding (Otsu) and region growing |
| 3 | What is the Harris corner detector measuring? | Local auto-correlation of image gradients; corners have high response in both x and y directions |
| 4 | What are the four main stages of SIFT? | Scale-space extrema detection, keypoint localisation, orientation assignment, descriptor generation |
| 5 | Why is SIFT invariant to scale and rotation? | It detects features at multiple scales via DoG pyramid and assigns a canonical orientation to each keypoint |
| 6 | What is the Bag of Features (BoF) model? | Quantises local descriptors into visual words using k-means, then represents images as histograms of visual word frequencies |
| 7 | How does the Viola-Jones face detector achieve real-time performance? | Integral image for fast Haar feature computation, AdaBoost for feature selection, and attentional cascade for early rejection |
| 8 | What is an integral image? | A precomputed table where each pixel stores the sum of all pixels above and to the left; allows O(1) rectangle sum computation |
| 9 | What is the vanishing gradient problem in deep networks? | Gradients become exponentially small through many layers, preventing early layers from learning |
| 10 | What is a convolutional layer doing? | Applying learnable filters that slide across the input to produce feature maps detecting local patterns |
| 11 | What is max pooling? | Takes the maximum value in each local region, reducing spatial dimensions and providing translation invariance |
| 12 | What is transfer learning? | Using a model pretrained on a large dataset (e.g., ImageNet) and fine-tuning it on a smaller target dataset |
| 13 | What is a GAN composed of? | A generator (creates fake samples) and a discriminator (distinguishes real from fake), trained adversarially |
| 14 | What is the epipolar constraint in stereo vision? | For a point in one image, its corresponding point in the other image lies on a specific line (the epipolar line) |
| 15 | What is the fundamental matrix? | A 3x3 matrix encoding the epipolar geometry between two views; maps a point in one image to an epipolar line in the other |
| 16 | How is depth estimated from stereo images? | Depth is inversely proportional to disparity: `Z = f * B / d` (focal length * baseline / disparity) |
| 17 | What is optical flow? | The apparent motion field of pixels between consecutive frames, representing scene or camera motion |
| 18 | State the brightness constancy assumption. | A pixel's intensity does not change between frames: `I(x,y,t) = I(x+u, y+v, t+1)` |
| 19 | What is the Lucas-Kanade method for optical flow? | Assumes constant flow in a local neighbourhood and solves an over-determined system using least squares |
| 20 | What is Non-Maximum Suppression (NMS)? | Removing duplicate detections by keeping only the highest-scoring bounding box among overlapping ones |
| 21 | What is IoU (Intersection over Union)? | Area of overlap between predicted and ground-truth boxes divided by area of their union; used to evaluate detection |
| 22 | What does the softmax function do? | Converts a vector of raw scores into a probability distribution (all values in [0,1] summing to 1) |
| 23 | What is data augmentation? | Artificially expanding training data through transformations (rotation, flip, crop, colour jitter) to reduce overfitting |
| 24 | What is the difference between object detection and image classification? | Classification assigns a single label to the whole image; detection localises and classifies multiple objects with bounding boxes |
| 25 | What is a feature pyramid network (FPN)? | A multi-scale architecture that combines low-resolution semantically-strong features with high-resolution spatially-precise features |
