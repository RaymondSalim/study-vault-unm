---
title: "Exam Traps"
order: 91
moduleTitle: "COMP3029 - Computer Vision"
tags: ["exam", "mistakes", "tips"]
---

## Common Mistakes

| Trap | Why It's Wrong | Correct |
|------|---------------|---------|
| "SIFT is rotation invariant because it uses gradients" | Gradients alone aren't invariant — it's the dominant orientation assignment + relative descriptor that gives invariance | SIFT assigns a canonical orientation per keypoint, then describes relative to that |
| Confusing Harris corner response with edge response | Harris detects corners (both eigenvalues large), NOT edges (one large, one small) | $R = \det(M) - k \cdot \text{trace}(M)^2$; corners have $R \gg 0$ |
| "More CNN layers = better performance" | Vanishing gradients, overfitting on small datasets | Deeper networks need skip connections (ResNet) or careful regularisation |
| Mixing up precision and recall | Precision = of those predicted positive, how many correct; Recall = of actual positives, how many found | Precision = TP/(TP+FP), Recall = TP/(TP+FN) |
| "Epipolar constraint reduces matching to 1D" | True, but students forget it requires known camera geometry (F matrix) | Must calibrate or estimate F from correspondences first |
| "Optical flow = motion" | Optical flow is apparent motion in the image — a rotating sphere has OF but no translation | Distinguish image motion from scene motion |
| GAN mode collapse = underfitting | Mode collapse means generator produces limited variety, not that it fails to learn | Generator exploits discriminator weakness; fix with diversity losses, progressive training |
| "Integral image is O(n²) to compute" | Computing the integral image is O(n²) for an n×n image, but querying any rectangle is O(1) | The speed benefit is in the query, not construction |
| Confusing convolution and correlation | Convolution flips the kernel; correlation doesn't | For symmetric kernels they're identical; matters for asymmetric ones |
| "Bag of Features loses all spatial info" | Spatial pyramid matching (SPM) adds coarse spatial structure back | Standard BoF is orderless; SPM divides image into grid cells |

## Calculation Pitfalls

| Topic | Common Error |
|-------|-------------|
| Camera matrix | Forgetting that $P = K[R \mid t]$ uses extrinsic $t = -RC$ not camera centre directly |
| Disparity | Confusing disparity direction: $d = x_L - x_R$ assumes rectified left-right pair |
| Homogeneous coords | Not normalising: $(x, y, w)$ represents $(x/w, y/w)$, forgetting to divide |
| Backpropagation | Applying chain rule in wrong order; forgetting to accumulate gradients at fan-out nodes |
| IoU calculation | Using intersection area ÷ union area but computing union as sum of areas (double-counts intersection) |

## Exam Strategy

- Diagram questions: always label axes, show direction of increasing disparity/flow
- "Compare X and Y" questions: use a table with 4–5 criteria (speed, invariance, accuracy, training data, use case)
- Derivation questions: state the formula, define every symbol, then manipulate
- Always mention limitations alongside advantages when describing a method
