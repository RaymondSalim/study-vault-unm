---
title: "Generative Models & Vision Transformers"
order: 8
moduleTitle: "COMP3029 - Computer Vision"
tags: ["gan", "generative-models", "vision-transformer", "vit", "self-attention"]
---

## Overview

:::eli10

This topic covers two big ideas. Generative models are AI systems that can create brand new images (like faces that do not exist or turning a sketch into a photo). Vision Transformers are a new type of network borrowed from language AI that can look at an entire image at once (unlike CNNs that look at small patches), relating any part of the image to any other part directly.

:::

:::eli15

Generative models learn the underlying distribution of training data and can create new, realistic samples. GANs achieve this through adversarial training between a generator and discriminator. Vision Transformers (ViT) adapt the self-attention mechanism from NLP to images, replacing convolutional layers with global attention over image patches. ViTs lack the built-in spatial biases of CNNs but excel when trained on very large datasets, achieving state-of-the-art performance on image classification.

:::

:::eli20

Generative models learn to create new data samples resembling the training distribution. Vision Transformers apply attention mechanisms from NLP to image understanding.

:::

## Generative Adversarial Networks (GANs)

:::eli10

A GAN is like a forger and a detective playing a game. The forger (generator) tries to create fake images that look real. The detective (discriminator) tries to tell real images from fakes. As they compete, the forger gets better at making convincing fakes and the detective gets better at spotting them. Eventually, the forger produces images so realistic that even the detective cannot tell the difference.

:::

:::eli15

GANs consist of two neural networks trained in opposition. The generator takes random noise and produces images, trying to fool the discriminator. The discriminator receives both real and generated images, trying to classify them correctly. Through this adversarial game, the generator learns to produce increasingly realistic images. At equilibrium, the generator's output distribution matches the real data distribution. Key challenges include mode collapse (generator produces limited variety), training instability, and difficulty evaluating quality.

:::

:::eli20

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

:::

## Vision Transformers (ViT)

:::eli10

Vision Transformers treat an image like a sentence. They chop the image into small square patches (like words), line them up in a row, and use "attention" to figure out how each patch relates to every other patch. Unlike CNNs that only look at nearby pixels, a Vision Transformer can directly connect a patch in the top-left corner to a patch in the bottom-right corner in a single step. It needs a LOT of training data but can become very powerful.

:::

:::eli15

Vision Transformers (ViT) apply the transformer architecture from NLP to images by splitting them into fixed-size patches (e.g., 16x16) which serve as "tokens." Each patch is linearly projected into an embedding, positional information is added, and the sequence is processed by standard transformer encoder blocks with self-attention and MLPs. Unlike CNNs, ViTs have a global receptive field from the first layer and minimal inductive bias about image structure. This means they require massive datasets (or strong pre-training) to excel, but scale better with data and compute.

:::

:::eli20

### Motivation: CNN Limitations

| Limitation | Detail |
|-----------|--------|
| Local receptive fields | Cannot model long-range dependencies directly |
| Translation equivariance | $f(G(x)) = G(f(x))$, but classification needs invariance |
| Scaling | Stacking layers only gradually increases receptive field |

Pooling approximates invariance but doesn't guarantee it.

### Attention Mechanism: Origins

**Seq2seq bottleneck problem:** compressing an entire input sequence into one fixed context vector loses information for long sequences.

**Solution:** Let each output position attend to ALL input positions with learned weights:

$$e_{i,j} = f(s_{i-1}, h_j) \quad \text{(alignment score)}$$
$$\alpha_{i,j} = \frac{\exp(e_{i,j})}{\sum_k \exp(e_{i,k})} \quad \text{(attention weight)}$$
$$c_i = \sum_j \alpha_{i,j} h_j \quad \text{(context vector)}$$

### Scaled Dot-Product Attention

$$e_i = \frac{\mathbf{q} \cdot \mathbf{k}_i}{\sqrt{d_k}}$$
$$\alpha = \text{softmax}(\mathbf{e})$$
$$\mathbf{y} = \sum_i \alpha_i \mathbf{v}_i$$

**Why scale by $\sqrt{d_k}$:** Without scaling, large dot products push softmax into saturation → vanishing gradients during backpropagation.

### Query, Key, Value Projections

$$Q = X W_Q, \quad K = X W_K, \quad V = X W_V$$

| Component | Analogy | Role |
|-----------|---------|------|
| Query (Q) | Search query | What am I looking for? |
| Key (K) | Database index | What do I contain? |
| Value (V) | Stored content | What information do I return? |

**Cross-attention:** Q from one source, K/V from another (e.g., decoder queries encoder)

**Self-attention:** Q, K, V all derived from the same input (learning within-sequence interactions)

### Self-Attention Properties

| Property | Implication |
|----------|------------|
| Permutation equivariant | Changing input order changes output order identically |
| Global receptive field | Every token attends to every other token in one layer |
| Requires positional encoding | Without it, model cannot distinguish sequence order |

### Positional Encoding (Sinusoidal)

$$PE(pos, 2i) = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right)$$
$$PE(pos, 2i+1) = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)$$

Added to patch embeddings before the transformer encoder.

### Multi-Head Attention

Split dimensions into $H$ heads (partition, NOT replicate):

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_H) W^O$$

Each head operates on $d/H$ dimensions and learns different attention patterns.

### Transformer Block

$$\text{Input} \to \text{Multi-Head Self-Attention} \to \text{Add \& LayerNorm} \to \text{MLP} \to \text{Add \& LayerNorm} \to \text{Output}$$

| Component | Interaction |
|-----------|------------|
| Self-attention | Creates inter-token interaction (global mixing) |
| MLP | Operates independently per token (channel mixing) |
| LayerNorm | Statistics along feature dimension per token (not across batch) |
| Residual connections | Enable gradient flow through deep stacks |

**LayerNorm vs BatchNorm:** LayerNorm normalises across features for each token independently; BatchNorm normalises across the batch dimension.

### ViT Architecture

| Step | Operation | Dimensions |
|------|-----------|-----------|
| 1 | Split 224×224 image into 16×16 patches | 14×14 = 196 patches |
| 2 | Flatten each patch | 16×16×3 = 768-dim vector |
| 3 | Linear projection | $768 \to d_{model}$ embedding |
| 4 | Prepend learnable [CLS] token | 197 tokens total |
| 5 | Add positional embeddings | 197 × $d_{model}$ |
| 6 | Transformer encoder (L layers) | Self-attention + MLP |
| 7 | Extract [CLS] output → MLP head | Classification |

The **[CLS] token** aggregates global information through self-attention across all layers.

### ViT vs CNN

| Aspect | CNN | ViT |
|--------|-----|-----|
| Inductive bias | Local, translation equivariant | Minimal (global from start) |
| Data efficiency | Better with small data | Needs massive data (JFT-300M) |
| Receptive field | Grows with depth | Global from first layer |
| Computational cost | $O(n)$ per layer | $O(n^2)$ for self-attention |
| Scalability | Diminishing returns at scale | Scales well with data + compute |

### ViT Scaling Properties

- With enough data, ViT dominates CNNs
- Without large-scale pretraining, ViT underperforms ResNets
- Scaling depth > scaling width for performance

### Key ViT Variants

| Model | Key Difference |
|-------|---------------|
| ViT | Original patch-based transformer |
| DeiT | Data-efficient training with distillation |
| Swin Transformer | Shifted window attention (hierarchical) |
| BEiT | BERT-style pre-training for vision |

:::

<details><summary>Practice</summary>

1. In GAN training, what happens if the discriminator becomes too strong too quickly? How does this relate to vanishing gradients for the generator?

2. An image of 224x224 is split into 16x16 patches for ViT. How many patch tokens are in the sequence (excluding [CLS])?

3. Explain mode collapse in GANs with a concrete example.

4. Why does ViT need more training data than CNNs? What inductive biases does a CNN have that ViT lacks?

5. Compare the receptive field growth in a 5-layer CNN vs a single transformer layer applied to image patches.

6. Why is scaling by $\sqrt{d_k}$ necessary in dot-product attention? What goes wrong without it?

7. Explain the difference between cross-attention and self-attention. Give an example use case for each.

8. Why is self-attention permutation equivariant? How does positional encoding fix this?

</details>
