---
title: "Generative Models & Vision Transformers"
order: 8
moduleTitle: "COMP3029 - Computer Vision"
tags: ["gan", "generative-models", "vision-transformer", "vit", "self-attention"]
---

## Overview

Generative models learn to create new data samples resembling the training distribution. Vision Transformers apply attention mechanisms from NLP to image understanding.

## Generative Adversarial Networks (GANs)

### Architecture

Two networks trained adversarially:

| Network | Input | Output | Objective |
|---------|-------|--------|-----------|
| Generator $G$ | Random noise $\mathbf{z} \sim p_z$ | Fake image $G(\mathbf{z})$ | Fool discriminator |
| Discriminator $D$ | Image (real or fake) | Probability of being real | Distinguish real from fake |

### Training Objective (Minimax Game)

$$\min_G \max_D \; V(D, G) = \mathbb{E}_{\mathbf{x} \sim p_{data}}[\log D(\mathbf{x})] + \mathbb{E}_{\mathbf{z} \sim p_z}[\log(1 - D(G(\mathbf{z})))]$$

### Training Procedure

| Step | Action |
|------|--------|
| 1 | Sample mini-batch of real images $\mathbf{x}$ |
| 2 | Sample noise $\mathbf{z}$, generate fake images $G(\mathbf{z})$ |
| 3 | **Train D:** Maximise $\log D(\mathbf{x}) + \log(1 - D(G(\mathbf{z})))$ |
| 4 | Sample new noise $\mathbf{z}$ |
| 5 | **Train G:** Minimise $\log(1 - D(G(\mathbf{z})))$ (or maximise $\log D(G(\mathbf{z}))$) |
| 6 | Repeat until convergence |

### Equilibrium

At optimum: $D(\mathbf{x}) = 0.5$ for all inputs (cannot distinguish real from fake), and $p_G = p_{data}$.

### Training Challenges

| Problem | Description | Mitigation |
|---------|-------------|-----------|
| Mode collapse | G produces limited variety | Minibatch discrimination, diversity loss |
| Training instability | Oscillations, non-convergence | Spectral normalisation, progressive growing |
| Vanishing gradients | D too strong, G gets no signal | Wasserstein loss, label smoothing |
| Evaluation difficulty | No single metric for quality | FID, IS scores |

### GAN Variants

| Variant | Innovation | Application |
|---------|-----------|-------------|
| DCGAN | Convolutional architecture | Stable image generation |
| Conditional GAN | Condition on class label | Controlled generation |
| Pix2Pix | Paired image translation | Image-to-image translation |
| CycleGAN | Unpaired translation | Style transfer without pairs |
| StyleGAN | Style-based generator | High-quality face synthesis |
| ProGAN | Progressive growing | High-resolution generation |

### Applications

- Image synthesis and super-resolution
- Style transfer and domain adaptation
- Data augmentation for training
- Image inpainting and editing
- Text-to-image generation

## Vision Transformers (ViT)

### From NLP to Vision

Transformers (Vaswani et al., 2017) use **self-attention** instead of convolution, originally for sequence modelling in NLP. ViT (Dosovitskiy et al., 2020) adapts this to images.

### ViT Architecture

| Step | Operation |
|------|-----------|
| 1 | Split image into fixed-size patches (e.g., 16x16) |
| 2 | Linearly embed each patch (flatten + project) |
| 3 | Add positional embeddings |
| 4 | Prepend [CLS] token |
| 5 | Pass through Transformer encoder blocks |
| 6 | Use [CLS] token output for classification |

### Self-Attention Mechanism

For input sequence of patch embeddings:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

where $Q = XW_Q$, $K = XW_K$, $V = XW_V$.

| Component | Role |
|-----------|------|
| Query (Q) | "What am I looking for?" |
| Key (K) | "What do I contain?" |
| Value (V) | "What information do I provide?" |
| $\sqrt{d_k}$ | Scaling factor for numerical stability |

### Multi-Head Attention

Run multiple attention heads in parallel, concatenate outputs:

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O$$

### ViT vs CNN

| Aspect | CNN | ViT |
|--------|-----|-----|
| Inductive bias | Local, translation equivariant | Minimal (global from start) |
| Data efficiency | Better with small data | Needs large datasets (or pre-training) |
| Receptive field | Grows with depth | Global from first layer |
| Computational cost | $O(n)$ per layer | $O(n^2)$ for self-attention |
| Scalability | Diminishing returns at scale | Scales well with data + compute |

### Key ViT Variants

| Model | Key Difference |
|-------|---------------|
| ViT | Original patch-based transformer |
| DeiT | Data-efficient training with distillation |
| Swin Transformer | Shifted window attention (hierarchical) |
| BEiT | BERT-style pre-training for vision |

<details><summary>Practice</summary>

1. In GAN training, what happens if the discriminator becomes too strong too quickly? How does this relate to vanishing gradients for the generator?

2. An image of 224x224 is split into 16x16 patches for ViT. How many patch tokens are in the sequence (excluding [CLS])?

3. Explain mode collapse in GANs with a concrete example.

4. Why does ViT need more training data than CNNs? What inductive biases does a CNN have that ViT lacks?

5. Compare the receptive field growth in a 5-layer CNN vs a single transformer layer applied to image patches.

</details>
