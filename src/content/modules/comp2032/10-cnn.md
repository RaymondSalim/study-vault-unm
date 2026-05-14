---
title: "Convolutional Neural Networks"
order: 10
moduleTitle: "COMP2032 - Image Processing"
tags: ["CNN", "deep-learning", "convolution", "pooling"]
---

## CNN Overview

:::eli10

A CNN (Convolutional Neural Network) is a computer brain that learns to see. Instead of a human programming "look for edges here, look for circles there," the CNN learns by looking at thousands of examples. It starts by detecting simple things (like edges), then combines them to recognise more complex things (like faces or cars).

:::

:::eli15

Convolutional Neural Networks apply the same convolution operation used in image filtering, but the filter weights are learned automatically from training data rather than designed by hand. A CNN stacks multiple layers — convolution (detect features), activation (add non-linearity), and pooling (reduce size) — building from simple edge-like features in early layers to complex semantic features in deeper layers. They have revolutionised computer vision by learning task-specific representations directly from images.

:::

:::eli20

CNNs apply the image processing operations we learned (convolution, resizing, filtering) as **learnable** layers.

### Architecture

```
Input → [Conv → ReLU → Pool]×N → Flatten → FC → Output
```

:::

## Components

:::eli10

A CNN is built from simple building blocks stacked together. Convolutional layers are like smart filters that detect patterns. ReLU turns off negative values (like ignoring dim signals). Pooling shrinks the image to focus on what matters. Finally, fully connected layers put all the clues together to make a decision — like "this is a cat."

:::

:::eli15

CNNs are composed of distinct layer types: convolutional layers apply learned filters to detect features (edges, textures, shapes); activation functions like ReLU introduce non-linearity (without them, stacking layers would just be one big linear filter); pooling layers downsample feature maps to reduce computation and build translation invariance; fully connected layers at the end aggregate spatial features into class predictions; and softmax converts raw scores to probabilities.

:::

:::eli20

| Layer | Function | Output |
|-------|----------|--------|
| Convolutional | Learnable filters detect features | Feature maps |
| Activation (ReLU) | Non-linearity: $f(x) = \max(0, x)$ | Same size |
| Pooling | Downsample (reduce spatial size) | Smaller feature maps |
| Fully Connected | Classification from features | Class scores |
| Output (Softmax) | Probability distribution | Predictions |

:::

## Convolutional Layer

:::eli10

The convolutional layer slides a small learned filter across the image — just like the filters we studied before. But instead of being designed by humans (like Sobel for edges), the network figures out the best filter values by itself through practice. Each filter learns to detect a different pattern.

:::

:::eli15

A convolutional layer performs the same convolution operation as traditional image filters, but the kernel weights are parameters learned during training. Key settings include filter size (commonly 3x3), number of filters (determines how many different features are detected), stride (how far the filter moves each step — larger stride downsamples), and padding (adding zeros around the border to control output size). The output spatial size is calculated as floor((W - K + 2P) / S) + 1.

:::

:::eli20

Same operation as image filtering, but **kernels are learned**:

$$\text{output}(i,j) = \sum_m \sum_n \text{input}(i+m, j+n) \cdot \text{kernel}(m,n) + b$$

| Parameter | Description |
|-----------|-------------|
| Filter size | Typically 3×3 or 5×5 |
| Number of filters | Depth of output (e.g., 32, 64, 128) |
| Stride | Step size (1 = overlap, 2 = downsample) |
| Padding | Preserve spatial dimensions (same vs valid) |

**Output size**: $\lfloor \frac{W - K + 2P}{S} \rfloor + 1$

Where $W$ = input size, $K$ = kernel size, $P$ = padding, $S$ = stride.

:::

## Pooling Layer

:::eli10

Pooling shrinks the image by keeping only the most important information in each small window. Max pooling picks the brightest (strongest) value in each patch — like reading a summary instead of the whole book. This makes the network faster and helps it recognise objects no matter where they appear in the image.

:::

:::eli15

Pooling layers reduce the spatial dimensions of feature maps, lowering computation and providing some translation invariance (the network becomes less sensitive to exact pixel positions). Max pooling takes the maximum value in each small window — it keeps the strongest feature activation regardless of its exact position. Average pooling takes the mean. A typical configuration uses 2x2 windows with stride 2, halving both width and height. Global average pooling averages each entire feature map to a single number, often used before the final classifier.

:::

:::eli20

Reduces spatial dimensions while retaining important features.

| Type | Operation |
|------|-----------|
| Max pooling | Take maximum in window |
| Average pooling | Take mean in window |
| Global average | Average over entire feature map → single value per channel |

Typical: 2×2 window, stride 2 → halves spatial dimensions.

:::

## Training

:::eli10

Training a CNN is like studying with flashcards. You show it a picture, it guesses the answer, you tell it if it's wrong, and it adjusts a tiny bit to do better next time. After seeing thousands of pictures many times over (epochs), it gets really good at recognising things.

:::

:::eli15

Training a CNN involves repeatedly showing it labelled examples and adjusting weights to reduce errors. In the forward pass, an input image flows through all layers to produce a prediction. The loss function measures how wrong the prediction is (cross-entropy for classification). Backpropagation computes how each weight contributed to the error (gradients). An optimiser (like Adam or SGD) uses these gradients to update all weights slightly. One complete pass through all training examples is called an epoch — training typically requires many epochs.

:::

:::eli20

| Concept | Description |
|---------|-------------|
| Forward pass | Input → compute output through all layers |
| Loss function | Measure error (cross-entropy for classification) |
| Backpropagation | Compute gradients of loss w.r.t. all weights |
| Optimiser | Update weights (SGD, Adam) |
| Epoch | One pass through entire training set |

:::

## Connection to Image Processing

:::eli10

CNNs are actually doing the same thing as the image processing techniques we already learned — but they figure out the best settings automatically. Early layers learn edge-detection filters (like Sobel). Middle layers learn texture patterns. Deep layers learn to recognise whole objects. The network teaches itself what used to take engineers years to hand-design.

:::

:::eli15

CNNs directly relate to classical image processing: convolutional layers are learned versions of hand-designed filters; pooling is equivalent to downsampling; early CNN layers learn edge-detecting kernels similar to Sobel/Prewitt; middle layers detect textures and patterns; and deep layers capture semantic meaning (object parts, whole objects). The key difference is that classical IP requires manual kernel design while CNNs learn optimal kernels from data, often discovering features humans would not have designed.

:::

:::eli20

| CNN Layer | IP Equivalent |
|-----------|--------------|
| Conv layer (learned) | Convolution with designed kernel |
| Pooling | Downsampling / resizing |
| Early layers | Edge detection (Sobel-like filters) |
| Middle layers | Texture/pattern detection |
| Deep layers | Semantic/object-level features |

:::

## Applications

:::eli10

CNNs can do many things with images: classify pictures (is this a cat or a dog?), find objects (where is the car in this photo?), segment images (colour every pixel by what object it belongs to), and even make low-quality images sharper (super-resolution).

:::

:::eli15

CNNs power most modern computer vision tasks. Classification assigns an overall label to an image. Object detection locates and classifies multiple objects within an image (YOLO, R-CNN). Semantic segmentation labels every pixel with a class using encoder-decoder architectures like U-Net. Super-resolution uses CNNs to intelligently upscale low-resolution images. In each case, the same fundamental architecture is adapted — different heads for different tasks, but shared convolutional backbones for feature extraction.

:::

:::eli20

| Task | Approach |
|------|----------|
| Classification | CNN → FC → softmax |
| Object detection | Region proposals + CNN (R-CNN, YOLO) |
| Segmentation | Encoder-decoder (U-Net) |
| Super-resolution | CNN learns upsampling |

<details>
<summary>Practice: How many parameters does a convolutional layer with 32 filters of size 3×3 on a 3-channel input have?</summary>

Each filter: $3 \times 3 \times 3 = 27$ weights + 1 bias = 28.
Total: $32 \times 28 = 896$ parameters.
</details>

<details>
<summary>Practice: What is the output size of a 28×28 input with a 5×5 filter, stride 1, no padding?</summary>

$\lfloor(28 - 5 + 0)/1\rfloor + 1 = 24$. Output is 24×24.
</details>

:::
