---
title: "Neural Networks"
order: 6
moduleTitle: "COMP3029 - Computer Vision"
tags: ["neural-networks", "perceptron", "mlp", "backpropagation", "deep-learning"]
---

## Overview

:::eli10

Neural networks are computer programs inspired by the brain. They have layers of simple "neurons" connected together. Instead of a human telling the computer what features to look for (like edges or colours), the network learns on its own what is important by looking at thousands of examples. Each layer discovers increasingly complex patterns, building from simple edges up to faces or objects.

:::

:::eli15

Neural networks are parameterised models that learn feature representations and classifiers directly from data, replacing the hand-crafted feature pipelines (HoG, SIFT, etc.) of classical computer vision. They consist of layers of neurons applying weighted sums followed by non-linear activation functions. Training adjusts all weights simultaneously via backpropagation (gradient descent through the chain rule), optimising a loss function that measures prediction error. Deep networks with multiple hidden layers can learn hierarchical representations.

:::

:::eli20

Neural networks learn feature representations and classifiers end-to-end from data, replacing hand-crafted feature pipelines.

:::

## The Perceptron

:::eli10

A perceptron is the simplest building block -- like a single brain cell. It takes in some numbers, multiplies each by a "weight" (how important that input is), adds them up, and then decides yes or no. It can draw a straight line to separate two groups, but it cannot handle complex problems where the groups are mixed up in a twisty way (like the XOR puzzle).

:::

:::eli15

The perceptron is a single neuron that computes a weighted sum of its inputs, adds a bias, and passes the result through an activation function. Geometrically, it implements a linear classifier -- its decision boundary is a hyperplane in the input space. This limits it to linearly separable problems; it famously cannot solve XOR where the two classes are interleaved. Stacking perceptrons with non-linear activations overcomes this limitation.

:::

:::eli20

### Single Neuron

$$y = f\left(\sum_{i=1}^{n} w_i x_i + b\right) = f(\mathbf{w}^T \mathbf{x} + b)$$

| Component | Role |
|-----------|------|
| $x_i$ | Inputs |
| $w_i$ | Weights (learned) |
| $b$ | Bias |
| $f$ | Activation function |
| $y$ | Output |

### Perceptron as Linear Classifier

- Decision boundary: $\mathbf{w}^T \mathbf{x} + b = 0$ (hyperplane)
- Can only solve **linearly separable** problems
- Cannot solve XOR

:::

## Multi-Layer Perceptron (MLP)

:::eli10

An MLP stacks multiple layers of perceptrons together, like a sandwich with hidden layers in the middle. The first layer receives the input, the hidden layers transform it into increasingly useful representations, and the output layer makes the final prediction. The "trick" that makes it powerful is the non-linear activation function between layers -- without it, the whole stack would just be another straight line.

:::

:::eli15

A Multi-Layer Perceptron adds one or more hidden layers between input and output, with non-linear activation functions at each layer. This enables learning non-linear decision boundaries -- the hidden layers transform the input into a representation where the classes become linearly separable. The Universal Approximation Theorem guarantees that a single hidden layer with enough neurons can approximate any continuous function, though deep networks are typically more parameter-efficient for complex functions.

:::

:::eli20

### Architecture

| Layer | Function |
|-------|----------|
| Input layer | Receives feature vector |
| Hidden layer(s) | Learn intermediate representations |
| Output layer | Produces predictions (classes/values) |

Adding hidden layers with non-linear activations enables learning non-linear decision boundaries.

### Universal Approximation Theorem

A single hidden layer with sufficient neurons can approximate any continuous function -- but may require exponentially many neurons. Deep networks are more parameter-efficient.

:::

## Activation Functions

:::eli10

Activation functions decide whether a neuron "fires" or not, and by how much. The simplest one (ReLU) just says: "if the input is negative, output zero; if it is positive, pass it through unchanged." This simple on/off switch is what gives the network its power to learn complex patterns. Without activation functions, no matter how many layers you stack, the network could only draw straight lines.

:::

:::eli15

Activation functions introduce non-linearity, which is essential for learning complex patterns. Sigmoid squashes values to (0,1) but suffers from vanishing gradients when saturated. Tanh is similar but zero-centred. ReLU (max(0,x)) is the modern default -- it is fast, does not saturate for positive inputs, and produces sparse activations. Softmax is used at the output layer for multi-class classification, converting raw scores into a probability distribution that sums to 1.

:::

:::eli20

| Function | Formula | Range | Properties |
|----------|---------|-------|------------|
| Sigmoid | $\sigma(x) = \frac{1}{1+e^{-x}}$ | $(0, 1)$ | Smooth, saturates, vanishing gradient |
| Tanh | $\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$ | $(-1, 1)$ | Zero-centred, still saturates |
| ReLU | $f(x) = \max(0, x)$ | $[0, \infty)$ | Fast, no saturation, dying neurons |
| Leaky ReLU | $f(x) = \max(\alpha x, x)$ | $(-\infty, \infty)$ | Fixes dying ReLU |
| Softmax | $\sigma(x_i) = \frac{e^{x_i}}{\sum_j e^{x_j}}$ | $(0, 1)$, sums to 1 | Output layer for multi-class |

:::

## Loss Functions

:::eli10

A loss function is like a "score of wrongness." It tells the network how far off its predictions are from the correct answers. If the network says "80% cat" but the answer is cat, the loss is small. If it says "10% cat," the loss is large. The network learns by trying to make this wrongness score as small as possible, adjusting its weights bit by bit.

:::

:::eli15

Loss functions quantify prediction error and provide the signal that drives learning. For classification, cross-entropy loss measures how far the predicted probability distribution is from the true (one-hot) distribution -- it heavily penalises confident wrong predictions. For regression, Mean Squared Error penalises predictions proportional to the square of their error. The choice of loss function affects training dynamics and what the network optimises for.

:::

:::eli20

| Task | Loss Function | Formula |
|------|--------------|---------|
| Binary classification | Binary Cross-Entropy | $-[y\log(\hat{y}) + (1-y)\log(1-\hat{y})]$ |
| Multi-class | Cross-Entropy | $-\sum_c y_c \log(\hat{y}_c)$ |
| Regression | Mean Squared Error | $\frac{1}{N}\sum_i(y_i - \hat{y}_i)^2$ |

:::

## Backpropagation

:::eli10

Backpropagation is how the network learns from its mistakes. After making a prediction, it checks how wrong it was (the loss). Then it works backwards through each layer, figuring out "how much did each weight contribute to the error?" Using this information, it nudges each weight a tiny bit to make the prediction better next time. It is like tracing back through a chain of dominoes to find which one caused the problem.

:::

:::eli15

Backpropagation computes the gradient of the loss with respect to every weight in the network using the chain rule of calculus. The forward pass computes the output layer by layer. The backward pass propagates error signals from the output back through each layer, computing how much each weight contributed to the total error. Each weight's gradient is the product of the back-propagated error signal and the forward-pass activation at that connection. These gradients then guide weight updates via gradient descent.

:::

:::eli20

### Forward Pass

Compute output layer by layer:

$$\mathbf{z}^{(l)} = W^{(l)} \mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}$$
$$\mathbf{a}^{(l)} = f(\mathbf{z}^{(l)})$$

### Backward Pass (Chain Rule)

Compute gradients of loss $L$ w.r.t. each parameter:

$$\frac{\partial L}{\partial w_{ij}^{(l)}} = \frac{\partial L}{\partial z_i^{(l)}} \cdot \frac{\partial z_i^{(l)}}{\partial w_{ij}^{(l)}} = \delta_i^{(l)} \cdot a_j^{(l-1)}$$

Error signal propagated backwards:

$$\delta^{(l)} = (W^{(l+1)})^T \delta^{(l+1)} \odot f'(\mathbf{z}^{(l)})$$

### Key Insight: Gradient Decomposition

Every weight gradient decomposes as:

$$\frac{\partial E}{\partial W_{ji}} = \underbrace{\delta_j}_{\text{back-propagated error}} \times \underbrace{z_i}_{\text{forward-pass activation}}$$

This directly explains:
- **Vanishing gradients:** if $f'(a) \approx 0$ (sigmoid saturation), $\delta$ vanishes through layers
- **Exploding gradients:** if weights/activations $> 1$, they accumulate multiplicatively across layers

:::

## Optimization Algorithms

:::eli10

Training a network is like finding the lowest point in a hilly landscape while blindfolded. You can feel which way is downhill (the gradient) and take a step. Basic gradient descent takes one careful step at a time. Smarter methods (like Adam) remember which direction they have been going (momentum) and adjust their step size for each weight individually, making the search much faster and more reliable.

:::

:::eli15

Optimisation algorithms update network weights to minimise the loss. Basic SGD follows the gradient with a fixed learning rate, but converges slowly on complex surfaces. Momentum accumulates velocity to smooth updates and escape shallow local minima. Adaptive methods (AdaGrad, RMSProp, Adam) adjust the learning rate per-parameter based on gradient history -- parameters with consistently large gradients get smaller learning rates, and vice versa. Adam combines momentum with adaptive rates and is the most popular default optimiser.

:::

:::eli20

### Gradient Descent Variants

$$\theta_{t+1} = \theta_t - \eta \nabla_\theta L$$

| Variant | Batch Size | Property |
|---------|-----------|----------|
| Batch GD | Full dataset | Stable but slow, memory-intensive |
| SGD | Single sample | Noisy, fast, helps escape saddle points |
| Mini-batch SGD | 32--256 samples | Balances noise and stability |

### Momentum

Accumulates velocity to smooth updates and escape local minima:

$$v_t = m \cdot v_{t-1} - \eta \cdot g_t$$
$$\theta_{t+1} = \theta_t + v_t$$

Typical $m = 0.9$. Helps with ill-conditioned curvature (reduces oscillation in narrow valleys).

### AdaGrad

Adapts learning rate per parameter based on historical gradients:

$$R_t = R_{t-1} + g_t^2$$
$$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{R_t + \epsilon}} \cdot g_t$$

Problem: $R$ grows monotonically → learning rate decays to zero over time.

### RMSProp

Fixes AdaGrad with exponential moving average (forgetting old gradients):

$$R_t = \rho \cdot R_{t-1} + (1 - \rho) \cdot g_t^2$$
$$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{R_t + \epsilon}} \cdot g_t$$

Typical: $\rho = 0.9$, $\eta = 0.001$.

### Adam (Adaptive Moment Estimation)

Combines momentum on gradients AND momentum on squared gradients with bias correction:

$$m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t$$
$$v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2$$
$$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t}$$
$$\theta_{t+1} = \theta_t - \frac{\eta \cdot \hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}$$

Typical: $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\eta = 0.001$. Bias correction compensates for zero-initialisation of $m_0, v_0$.

:::

## Error Surface Geometry

:::eli10

The "landscape" that the network navigates during training is not a simple valley. In high dimensions, most flat spots are not true bottoms but "saddle points" -- like the middle of a horse saddle that curves up one way and down another. Noisy updates (SGD) help escape these traps because the random jitter can push the network off the saddle and continue downhill.

:::

:::eli15

The loss landscape of deep networks is complex and high-dimensional. True local minima are extremely rare; most critical points are saddle points (some directions curve up, others down). The probability of a random critical point being a true local minimum drops exponentially with dimensionality. SGD noise helps escape saddle points by providing random perturbations. Ill-conditioned curvature (different steepness in different directions) causes oscillation, which momentum helps smooth out.

:::

:::eli20

| Property | Detail |
|----------|--------|
| Saddle points | Dominate in high dimensions; probability of true local minimum $\approx (1/3)^d$ |
| Ill-conditioned curvature | Causes oscillation (bouncing in narrow valleys) |
| SGD noise | Helps escape saddle points (random perturbation) |
| Momentum | Smooths oscillation, accumulates signal in consistent directions |

:::

## Batch Normalisation

:::eli10

Batch normalisation is like re-centering and rescaling the values flowing through the network so they stay in a nice range. Without it, values might drift to be very large or very small as they pass through layers, making learning difficult. It normalises the values in each mini-batch to have zero mean and unit variance, then lets the network learn what mean and scale actually work best.

:::

:::eli15

Batch normalisation stabilises training by normalising the activations within each mini-batch to zero mean and unit variance, then applying a learnable scale and shift. This prevents internal covariate shift (the distribution of layer inputs changing during training) and allows higher learning rates. During training, it uses batch statistics; during inference, it uses accumulated running averages. This behavioural difference is why switching to evaluation mode (model.eval()) before inference is critical.

:::

:::eli20

Normalises activations within each mini-batch to stabilise and accelerate training:

$$\hat{x} = \frac{x - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}$$
$$y = \gamma \hat{x} + \beta$$

where $\gamma$, $\beta$ are learnable scale and shift parameters.

| Phase | Statistics Used |
|-------|---------------|
| Training | Mini-batch mean $\mu_B$ and variance $\sigma_B^2$ |
| Inference | Population running averages accumulated during training |

Behaviour differs between train/inference — this is why `model.eval()` is essential.

:::

## Dropout

:::eli10

Dropout is like randomly sending some neurons on holiday during training. At each training step, some neurons are turned off (set to zero) at random. This forces the remaining neurons to not rely too heavily on any single partner -- they have to learn to work with different teammates. During the actual test, everyone comes back to work together, creating a stronger, more robust team.

:::

:::eli15

Dropout is a regularisation technique that randomly zeros out neuron activations during training with a specified probability. This prevents neurons from co-adapting (becoming dependent on specific other neurons) and forces the network to learn redundant, distributed representations. Effectively, each training step trains a different random sub-network, and the final model acts like an ensemble of exponentially many sub-networks. During inference, all neurons are active (with scaled weights), and no dropout is applied.

:::

:::eli20

During training, randomly set activations to zero with probability $(1-p)$:

| Phase | Behaviour |
|-------|-----------|
| Training | Zero out neurons with probability $(1-p)$; remaining scaled by $1/p$ (inverted dropout) |
| Inference | Use all neurons, no dropout applied |

- Acts as an implicit ensemble of $2^N$ sub-networks
- Prevents co-adaptation of neurons (forces redundant representations)

:::

## Training Considerations

:::eli10

Training neural networks well requires several tricks. You need to prevent the network from just memorising the training data (overfitting) using techniques like dropout and data augmentation (making new training examples by flipping, rotating, or zooming the images). You also need to pick good settings for learning speed, network size, and when to stop training.

:::

:::eli15

Successful neural network training requires managing overfitting and convergence. Regularisation techniques (L2 weight decay, dropout, data augmentation, early stopping) prevent the model from memorising training data. Batch normalisation stabilises training dynamics. Key hyperparameters include learning rate (often decayed over training), batch size (32-256), network depth and width, and number of training epochs. These are typically tuned via validation set performance.

:::

:::eli20

### Regularisation

| Technique | Purpose |
|-----------|---------|
| L2 (weight decay) | Penalise large weights |
| Dropout | Randomly zero neurons during training |
| Data augmentation | Increase effective training set |
| Early stopping | Stop when validation loss increases |
| Batch normalisation | Normalise activations, stabilise training |

### Hyperparameters

| Parameter | Typical Choices |
|-----------|----------------|
| Learning rate | 0.001 -- 0.01 (with scheduling) |
| Batch size | 32 -- 256 |
| Hidden layers | 2 -- 5 for MLP |
| Hidden units | 128 -- 1024 |
| Epochs | 50 -- 300 |

:::

## Problems with Deep Networks

:::eli10

Deep networks have some common problems. Vanishing gradients happen when error signals get weaker and weaker as they travel backwards through many layers -- the early layers stop learning. Exploding gradients are the opposite: signals grow out of control. Overfitting happens when the network memorises examples instead of learning general patterns. Solutions include ReLU activations, skip connections, gradient clipping, and regularisation.

:::

:::eli15

Deep networks face several challenges. Vanishing gradients occur when sigmoid/tanh activations saturate, causing error signals to shrink exponentially through layers (solved by ReLU and skip connections). Exploding gradients happen when multiplicative effects amplify signals (solved by gradient clipping and careful initialisation). Overfitting arises from having more parameters than necessary (solved by regularisation and more data). Slow convergence due to poor learning rate choices is addressed by adaptive optimisers and learning rate scheduling.

:::

:::eli20

| Problem | Cause | Solution |
|---------|-------|----------|
| Vanishing gradients | Sigmoid/tanh saturation | ReLU, residual connections |
| Exploding gradients | Deep chains of multiplication | Gradient clipping, careful init |
| Overfitting | Too many parameters | Regularisation, more data |
| Slow convergence | Poor learning rate | Adam, learning rate scheduling |

:::

<details><summary>Practice</summary>

1. A perceptron with weights $w = [2, -1]$ and bias $b = -1$ using a step activation. Classify the point $(1, 1)$.

2. Why can't a single perceptron solve XOR? Draw the XOR truth table and show no single line separates the classes.

3. Compute one step of backpropagation for a single neuron with sigmoid activation, input $x=1$, target $y=1$, weight $w=0.5$, bias $b=0$, learning rate $\eta=0.1$.

4. Explain why ReLU helps with the vanishing gradient problem compared to sigmoid.

</details>
