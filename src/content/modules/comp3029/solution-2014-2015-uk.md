---
title: "Exam Solution 2014-2015 (UK)"
order: 104
moduleTitle: "COMP3029 - Computer Vision"
tags: ["past-papers", "solutions", "exam"]
---

## COMP3029 (G54VIS) Computer Vision — Autumn 2014-2015 (UK)

**Instructions:** Answer THREE questions. Each question carries 33 marks.

---

## Question 1: Optic Flow (33 marks)

### (a) Brightness Constancy and Smoothness in Optical Flow [6 marks]

**Brightness Constancy Assumption:**
The brightness constancy assumption states that the intensity of a pixel remains constant as it moves between consecutive frames. Mathematically, if a pixel at position (x, y) at time t moves to (x + dx, y + dy) at time t + dt, then:

$$I(x, y, t) = I(x + dx, y + dy, t + dt)$$

This leads (via Taylor expansion) to the **optical flow constraint equation**:

$$\frac{\partial I}{\partial x} u + \frac{\partial I}{\partial y} v + \frac{\partial I}{\partial t} = 0$$

where u = dx/dt and v = dy/dt are the horizontal and vertical flow components. This single equation has two unknowns (u, v), making the problem under-constrained (the aperture problem).

**Smoothness Assumption:**
The smoothness assumption states that neighbouring pixels generally belong to the same object and therefore have similar motion vectors. This provides an additional constraint to resolve the aperture problem. It regularises the solution by penalising large spatial variations in the flow field. Smoothness acts as a prior that flow varies slowly across the image, except at motion boundaries.

Together, brightness constancy provides the data term (fidelity to observations) and smoothness provides the regularisation term (spatial coherence), forming a well-posed optimisation problem.

---

### (b) Smoothness Measure in Horn-Schunck [3 marks]

Horn-Schunck uses the **sum of squares of the spatial gradients** of the flow components as the smoothness measure:

$$E_{smooth} = \iint \left[ \left(\frac{\partial u}{\partial x}\right)^2 + \left(\frac{\partial u}{\partial y}\right)^2 + \left(\frac{\partial v}{\partial x}\right)^2 + \left(\frac{\partial v}{\partial y}\right)^2 \right] dx\, dy$$

This is a **global smoothness constraint** that penalises any spatial variation in the flow field. It enforces smoothness everywhere uniformly, treating the entire flow field as a connected entity. This is equivalent to minimising the magnitude of the Laplacian of both flow components, encouraging the flow to vary as gradually as possible across the image.

---

### (c) Role of λ in the Horn-Schunck Iterative Equations [3 marks]

The parameter λ controls the **relative weighting between the data term (brightness constancy) and the smoothness term**:

- **Large λ:** Greater weight is placed on the brightness constancy constraint relative to smoothness. The resulting flow field adheres more closely to the image data but may be noisy, especially in regions with low image gradient where the constraint equation is unreliable.

- **Small λ:** Greater weight is placed on the smoothness constraint. The resulting flow field is smoother and more spatially coherent, but may over-smooth motion boundaries and deviate from the true motion where brightness constancy is informative.

λ acts as a regularisation parameter that trades off between fitting the observed data faithfully and producing a smooth, physically plausible flow field.

---

### (d) Chicken-and-Egg Problem and Resolution [6 marks]

**The Problem:**
To compute the flow (u, v) at each pixel, we need the local averages (ū, v̄) from the neighbourhood, but these averages themselves depend on the flow values at neighbouring pixels, which are also unknown. This creates a circular dependency — we cannot compute any flow value without already knowing the surrounding flow values.

**Resolution — Iterative Relaxation (Gauss-Seidel / Jacobi Iteration):**

1. **Initialise:** Set all flow values to zero (or some initial estimate), i.e., u⁰ = v⁰ = 0 everywhere.

2. **Iterate:** At each iteration k, compute new estimates using the iterative update equations:
   - Calculate ū^k and v̄^k from the current flow estimates u^k, v^k (using a local averaging kernel, typically the 4-connected or 8-connected neighbours)
   - Update u^(k+1) and v^(k+1) using the Horn-Schunck update equations with these averages

3. **Converge:** Repeat until the change between successive iterations falls below a threshold, or a maximum number of iterations is reached.

This works because each iteration propagates flow information outward from regions where the brightness constancy constraint is well-conditioned (high gradient areas) to regions where it is poorly conditioned (homogeneous areas). The smoothness term ensures that information diffuses across the image, and the process converges to the global minimum of the energy functional (since Horn-Schunck's energy is convex).

---

### (e) Image Pyramid with Horn-Schunck [7 marks]

**How It Is Used (Coarse-to-Fine Strategy):**

1. Construct a Gaussian image pyramid by repeatedly smoothing and downsampling both frames (e.g., by factor 2 at each level), creating L levels from fine (original) to coarse (smallest).

2. At the **coarsest level**, compute optical flow using Horn-Schunck. Large motions at the original scale appear as small motions at this level.

3. **Upsample** the estimated flow to the next finer level (scaling flow vectors by factor 2 to account for resolution change).

4. **Warp** the first image toward the second using the upsampled flow estimate, creating a residual motion that should be small.

5. Compute the **residual flow** at this finer level using Horn-Schunck, and add it to the upsampled estimate.

6. Repeat steps 3-5 until the finest (original) level is reached.

**Advantages:**

- **Handles large displacements:** The brightness constancy equation is derived from a first-order Taylor expansion and is only valid for small motions (sub-pixel). At the coarsest pyramid level, large motions are reduced to small motions that satisfy the linearisation assumption.

- **Faster convergence:** The coarse-level solution provides a good initialisation for the finer levels, requiring fewer iterations at each level.

- **Reduced local minima risk:** Although Horn-Schunck's energy is convex, the coarse-to-fine approach also helps avoid convergence to poor solutions caused by numerical issues with large displacements violating the linearisation.

- **Computational efficiency:** Fewer pixels at coarse levels means faster computation where the most iterations are needed.

---

### (f) Traffic Camera Scenario — Problems and Solutions [8 marks]

**Scenario:** A traffic camera at 25fps observing a truck driving away and a tree swaying in a breeze.

**Problems with Horn-Schunck:**

1. **Large displacement of the truck:** At 25fps, the truck moving toward the camera or away may have large inter-frame displacements (many pixels), violating the small-motion assumption underlying the optical flow constraint equation. The linearisation breaks down, leading to incorrect flow estimates.

2. **Global smoothness over-smooths motion boundaries:** Horn-Schunck applies smoothness uniformly. At the boundary between the moving truck and the static background (or the swaying tree and the sky), the true flow field is discontinuous. Horn-Schunck will blur these boundaries, producing incorrect "smeared" flow that averages the truck's motion into the background and vice versa.

3. **Brightness constancy violations:** The truck moving away changes in apparent size (scaling), which causes pixel intensities to change. Specular reflections on the truck surface and changing lighting/shadows also violate brightness constancy. The tree leaves may flip, showing different sides and changing apparent brightness.

4. **Periodic/repetitive texture on the tree:** The tree's leaves create repetitive texture, causing ambiguity in matching (multiple local minima for correspondence), leading to incorrect flow in those regions.

5. **Occlusion:** As the truck moves, background pixels are revealed that were previously hidden. Horn-Schunck has no mechanism to handle pixels that appear or disappear.

**Solutions:**

1. **Coarse-to-fine pyramid approach** (as in part e) to handle the truck's large displacement.

2. **Robust data terms:** Replace the quadratic brightness constancy penalty with a robust function (e.g., Lorentzian, Charbonnier) that is less sensitive to outliers caused by brightness constancy violations.

3. **Anisotropic or edge-preserving smoothness:** Use an image-driven smoothness term that reduces smoothness across strong image edges (motion boundaries). Alternatively, use a robust penalty on the smoothness term to allow flow discontinuities.

4. **Region-based or segmentation-aided flow:** Segment the image into regions (truck, tree, background) and allow independent motion models per segment.

5. **Use of longer temporal windows or feature-based initialisation:** Combine feature tracking (e.g., KLT features on the truck) with dense flow estimation to provide better initialisation for large motions.

---

## Question 2: Feature Detection and Segmentation (33 marks)

### (a) Four Basic Features in Viola-Jones [6 marks]

The Viola-Jones algorithm uses four types of simple Haar-like rectangular features:

1. **Two-rectangle horizontal feature (edge feature):** Two adjacent rectangles side by side (left and right). The feature value is the difference between the sum of pixels in the white (light) rectangle and the sum of pixels in the dark (shaded) rectangle. Detects vertical edges.

2. **Two-rectangle vertical feature (edge feature):** Two adjacent rectangles stacked vertically (top and bottom). The feature value is the difference between the sum of pixels in one rectangle and the other. Detects horizontal edges.

3. **Three-rectangle feature (line feature):** Three adjacent rectangles in a row (horizontal or vertical). The feature value is the sum of the centre rectangle minus the sum of the two outer rectangles. Detects lines or stripes (e.g., the bridge of the nose is brighter than the eye sockets on either side).

4. **Four-rectangle feature (diagonal feature):** A 2x2 grid of rectangles in a checkerboard pattern. The feature value is the difference between the sum of the two diagonal rectangle pairs. Detects diagonal structures.

Each feature encodes the relative intensity differences between adjacent image regions, capturing structural patterns like edges, lines, and gradients that are characteristic of facial features (eyes darker than cheeks, nose bridge lighter than eyes, etc.).

---

### (b)(i) Integral Image — Definition and Computation [5 marks]

**Definition:**
The integral image (also called the summed area table) is a data structure where each pixel location (x, y) stores the sum of all pixel intensity values in the original image that are above and to the left of (x, y), inclusive:

$$II(x, y) = \sum_{x' \leq x} \sum_{y' \leq y} I(x', y')$$

**Computation:**
The integral image can be computed in a single pass over the image using the following recurrence:

$$II(x, y) = I(x, y) + II(x-1, y) + II(x, y-1) - II(x-1, y-1)$$

with boundary conditions II(-1, y) = II(x, -1) = 0.

Alternatively, it can be computed using cumulative row sums:
1. Compute cumulative sum along each row: s(x, y) = s(x-1, y) + I(x, y)
2. Compute cumulative sum along each column: II(x, y) = II(x, y-1) + s(x, y)

**Key advantage:** Once the integral image is computed (in O(n) time for n pixels), the sum of intensities in ANY axis-aligned rectangular region can be computed in **constant time O(1)** using only 4 array lookups and 3 arithmetic operations, regardless of the rectangle's size.

---

### (b)(ii) Sum of Intensity Values in a 10x15 Patch at (20,20) [3 marks]

To compute the sum of pixel intensities in a rectangular patch of width 10 and height 15 with its top-left corner at position (20, 20):

The patch spans from (20, 20) to (29, 34) inclusive (width = 10 pixels, height = 15 pixels).

Using the integral image formula for the sum of a rectangle with corners at (x1, y1) to (x2, y2):

$$S = II(x_2, y_2) - II(x_1 - 1, y_2) - II(x_2, y_1 - 1) + II(x_1 - 1, y_1 - 1)$$

Substituting:

$$S = II(29, 34) - II(19, 34) - II(29, 19) + II(19, 19)$$

This requires exactly **4 lookups** in the integral image array and **3 additions/subtractions**, regardless of the patch size (10 x 15 = 150 pixels that would otherwise need to be summed individually).

---

### (c)(i) Internal vs External Energy in Snakes [3 marks]

**Internal Energy:**
The internal energy is derived from the **properties of the contour itself** (its shape and configuration). It controls the geometric behaviour of the snake independently of the image. It has two components:
- **Elasticity (first-order term, weighted by α):** Penalises stretching of the contour, acting like a membrane that resists elongation. It controls the tension of the snake.
- **Stiffness (second-order term, weighted by β):** Penalises bending/curvature of the contour, acting like a thin plate that resists sharp corners. It controls the rigidity of the snake.

**External Energy:**
The external energy is derived from the **image data** and attracts the snake toward desired features in the image (typically edges). It depends on image properties such as gradient magnitude, intensity values, or distance to nearest edge. It provides the force that pulls the contour toward the target boundary.

In summary: internal energy controls the snake's own shape preferences (smoothness, compactness), while external energy drives the snake toward image features.

---

### (c)(ii) Why the External Energy is Negated [3 marks]

$$E_{ext} = -\sum \left[ \left(\frac{\partial I}{\partial x}\right)^2 + \left(\frac{\partial I}{\partial y}\right)^2 \right]$$

The snake algorithm works by **minimising** the total energy. The squared image gradient magnitude (∂I/∂x)² + (∂I/∂y)² is **largest at edges** (where intensity changes rapidly). 

By negating this term, we create an energy that is **most negative (lowest) at strong edges**. When the total energy is minimised, the algorithm seeks positions where this negated gradient magnitude is as large as possible — i.e., where edges are strongest.

Without the negation, minimising the energy would drive the snake **away from** edges toward homogeneous regions (where gradient is zero), which is the opposite of what we want.

---

### (c)(iii) Curvature Term — Requirement on Contour [3 marks]

$$E_{curve} = |p_{i-1} - 2p_i + p_{i+1}|^2$$

This term approximates the **second derivative** (curvature) of the contour at point p_i using finite differences. It imposes the requirement that the contour should be **smooth and resist bending** — it penalises high curvature (sharp corners and kinks).

Minimising this term drives the contour toward shapes with **low curvature everywhere**, which means it prefers straight lines or gentle curves. If this is the only internal energy term (or dominates), the contour will tend to become a **straight line** or a **circle** (the closed curve with minimum total curvature for a given perimeter).

This term acts as a rigidity or stiffness constraint, requiring the contour to maintain smooth, gradual changes in direction rather than having abrupt angular changes.

---

### (c)(iv) Snake Shrinking Toward a Square [5 marks]

**Scenario:** A snake is initialised outside a square shape and is shrinking toward it under the influence of internal and external energies.

**Final Shape:**
The snake will settle on a shape that is a **rounded rectangle** (a rectangle with rounded corners) rather than a perfect square. The corners will be smoothed.

**Explanation:**

- The **external energy** (edge attraction) drives the snake toward the edges of the square, pulling it to align with the four straight sides and trying to reach the corners.

- However, the **internal energy** (particularly the curvature/stiffness term β) penalises sharp corners. A perfect 90-degree corner has very high curvature, which creates a large internal energy penalty.

- The final shape represents the equilibrium between the external force pulling toward the sharp corners and the internal stiffness resisting high curvature.

- The straight edges of the square are well captured because they have zero curvature (no penalty from the stiffness term), but the corners are rounded because the bending cost outweighs the edge attraction at those points.

- If α is large (high tension), the snake may also "cut across" concavities. For a convex shape like a square, high tension mainly contributes to the corner-rounding effect.

---

### (c)(v) Effect of α >> β vs β >> α on a Circle [5 marks]

**Scenario:** A snake is converging on a circular object in Figure 2b.

**Case 1: α >> β (Elasticity dominates over stiffness):**

When α (tension/elasticity) greatly dominates β (stiffness/rigidity):
- The snake behaves like an **elastic band or membrane** with minimal resistance to bending.
- The elasticity term penalises stretching, minimising the total length of the contour.
- The snake will shrink to **minimise its perimeter** while still being attracted to the edge.
- For a circle, the snake will converge well because a circle is naturally the minimum-perimeter closed curve for a given enclosed area.
- The final shape will closely match the circle, and the contour points will be **evenly distributed** along the boundary (elasticity equalises spacing between control points).
- The snake can potentially follow fine details and indentations because bending is not penalised.

**Case 2: β >> α (Stiffness dominates over elasticity):**

When β (stiffness/rigidity) greatly dominates α (tension/elasticity):
- The snake behaves like a **rigid rod** that strongly resists bending.
- The contour will strongly prefer to be as **straight as possible** (minimising curvature everywhere).
- Since a circle has constant non-zero curvature, the stiffness term will resist conforming to it. However, a circle is the closed curve with minimum curvature for a given area, so it is still a relatively favourable shape.
- The final shape will tend toward a **larger, smoother circle** — the snake may not shrink fully to the target because any closed curve must have some curvature, and the stiffness term resists this.
- The snake will appear over-smoothed and may not follow the circular boundary precisely if the circle is small (high curvature).
- Control points will not necessarily be evenly spaced since elasticity is weak.

---

## Question 3: Tracking (33 marks)

### (a) CONDENSATION Algorithm: Prediction, Noise, and Evaluation [12 marks]

The CONDENSATION (Conditional Density Propagation) algorithm is a particle filter for visual tracking. It represents the probability distribution of the target state (e.g., position, scale, orientation) using a weighted set of samples (particles). Each time step involves three key stages:

**1. Prediction Step (Dynamics / State Transition):**

- **What it does:** Each particle from the previous time step is propagated forward in time according to a **dynamical model** (motion model). This predicts where the target is likely to be in the current frame based on its previous state and motion.
- **How:** Apply a deterministic state transition function to each particle. For example, a constant-velocity model would predict: x_t = x_{t-1} + v_{t-1} · Δt. More complex models (second-order, autoregressive) can capture acceleration or oscillatory motion.
- **Purpose:** Encodes prior knowledge about how the target moves. Without prediction, particles would remain static and lose track of moving objects. The prediction step shifts the particle distribution to the predicted region of state space, ensuring particles are placed near where the target is expected to be.

**2. Noise Step (Diffusion / Stochastic Perturbation):**

- **What it does:** Random noise is added to each predicted particle, **spreading** the particles around the predicted state.
- **How:** Add Gaussian (or other distribution) random noise to the state vector: x_t = x_predicted + N(0, Σ), where Σ is a noise covariance matrix controlling the spread in each dimension.
- **Purpose:** Accounts for **uncertainty** in the motion model and allows the tracker to cope with unpredictable motion. It ensures that the particle set covers a range of possible states, not just the single predicted point. This diversity is essential for:
  - Handling deviations from the assumed motion model
  - Recovering from temporary tracking failures
  - Exploring the state space around the prediction to find the target if the motion model is slightly wrong
  - Preventing particle depletion (all particles collapsing to the same state)

**3. Evaluation Step (Measurement / Weighting / Resampling):**

- **What it does:** Each particle is evaluated against the **current image observation** to determine how well it matches the target. Particles are assigned weights (likelihoods) based on this comparison.
- **How:** For each particle, extract the image region corresponding to its state (position, scale), compute a similarity measure (e.g., colour histogram comparison, template correlation, edge matching) with the target model, and assign a weight w_i proportional to the likelihood p(observation | state_i).
- **Purpose:** Grounds the prediction in actual observations. Particles that match the current appearance of the target in the image receive high weights, while poor matches receive low weights.
- **Resampling:** After weighting, particles are resampled with replacement according to their weights (survival of the fittest). High-weight particles are duplicated, low-weight particles are eliminated. This focuses computational resources on the most probable states.

The three steps together form a recursive Bayesian estimation cycle: predict where the target might be, add uncertainty to cover possibilities, then use the observation to confirm which hypotheses are correct.

---

### (b)(i) Multi-Modal Distribution [part of 8 marks]

A **multi-modal distribution** is a probability distribution that has **multiple distinct peaks** (modes), as opposed to a unimodal distribution which has a single peak.

In the context of visual tracking, a multi-modal posterior distribution arises when there are multiple plausible hypotheses about the target's state. For example:
- The target is partially occluded and could be in one of several positions consistent with the visible portion
- There are multiple similar-looking objects in the scene (distractors)
- The target moves ambiguously (e.g., a hand could be moving left or right based on the current evidence)

Each mode corresponds to a different hypothesis about the target's location or state, and the distribution cannot be characterised by a single mean and covariance.

---

### (b)(ii) Why CONDENSATION is Robust to Multi-Modal Distributions While Mean Shift is Not [part of 8 marks]

**CONDENSATION (Particle Filter):**
- Represents the posterior distribution using a **set of discrete samples** (particles) spread across state space.
- Particles can cluster around **multiple modes simultaneously**, naturally representing multi-modal distributions.
- When there are two likely target positions, some particles will cluster around each, maintaining both hypotheses until evidence disambiguates.
- The non-parametric representation places no restriction on the shape of the distribution — it can represent any arbitrary distribution shape.

**Mean Shift:**
- Represents the target state as a **single point estimate** (the mode of a kernel density estimate).
- It iteratively climbs the gradient of the probability density to find **one local maximum**.
- It inherently converges to a **single mode** — whichever peak is nearest to the current estimate.
- If the true distribution is multi-modal (e.g., two equally likely positions), Mean Shift can only represent one hypothesis. It will lock onto one mode and completely ignore the other.
- If the target jumps to a different mode, Mean Shift may fail to track because it has no particles/representation near the other mode.

In essence: CONDENSATION maintains a population of hypotheses (particles) that can represent multiple possibilities simultaneously, while Mean Shift collapses all information into a single point estimate that cannot represent ambiguity.

---

### (b)(iii) Why Coping with Multi-Modal Distributions is Important [part of 8 marks]

Multi-modal distributions arise frequently in real visual tracking scenarios:

1. **Occlusion:** When the target is partially or fully occluded, multiple positions are consistent with the visible evidence. Maintaining multiple hypotheses allows the tracker to recover when the target reappears, even if it emerges at a different location.

2. **Clutter and distractors:** Similar-looking objects in the scene create multiple peaks in the likelihood. A tracker that only follows one mode may lock onto a distractor and permanently lose the target.

3. **Ambiguous motion:** After fast motion or motion blur, the target could plausibly be in several locations. Multi-modal representation allows the tracker to hedge until the next clear frame resolves the ambiguity.

4. **Target reacquisition:** If tracking is temporarily lost, maintaining multiple hypotheses across the search space enables faster reacquisition when the target becomes visible again.

5. **Appearance change:** Gradual appearance changes may create uncertainty about whether a new observation is the target or background, requiring multiple hypotheses.

A tracker that cannot handle multi-modality will irreversibly commit to a single hypothesis, and if that hypothesis is wrong (or becomes wrong due to occlusion/clutter), it has no mechanism to recover.

---

### (c) Tracking a Waving Hand with Particle Filter — Problems and Solutions [13 marks]

**Scenario:** Vision-based interface tracking a hand waving goodbye using a particle filter.

**Problem 1: Fast and Non-Linear Motion**
- A hand waving goodbye exhibits rapid, oscillatory, non-linear motion (back and forth).
- **Issue:** If the motion model assumes linear/constant velocity, particles will lag behind the hand's reversals. The diffusion noise would need to be very large to cover the motion range, reducing efficiency.
- **Solution:** Use an **autoregressive or second-order motion model** that captures oscillatory dynamics. Alternatively, use a **larger noise variance** in the diffusion step to spread particles over the range of the waving motion. An adaptive motion model that learns the oscillation frequency could be very effective.

**Problem 2: Self-Occlusion and Appearance Change**
- As the hand waves, fingers may occlude each other, the hand rotates showing different views (palm, back, edge), and the apparent shape changes dramatically.
- **Issue:** A fixed appearance model (e.g., single template) will not match these varying appearances, causing all particle weights to drop.
- **Solution:** Use a **flexible appearance model** such as a colour histogram (invariant to shape changes), multiple templates covering different poses, or an adaptive model that updates online. Colour-based likelihood is relatively robust to deformation.

**Problem 3: Background Clutter (Skin-Coloured Objects)**
- If the person's face or another skin-coloured object is in the background, particles may be attracted to these distractors.
- **Issue:** The likelihood function based on skin colour alone cannot distinguish the hand from the face, creating a multi-modal distribution.
- **Solution:** Use **motion information** as an additional cue (the waving hand moves differently from the static face). Incorporate shape constraints or use a **motion prior** that expects oscillatory motion. Restrict the search region based on prediction.

**Problem 4: Dimensionality of State Space**
- Hand tracking may require modelling position (x, y), scale, orientation, and possibly finger articulation — a high-dimensional state space.
- **Issue:** Particle filters suffer from the **curse of dimensionality** — the number of particles needed grows exponentially with state space dimension. Too few particles leads to poor coverage and tracking failure.
- **Solution:** Use a **reduced state representation** (e.g., bounding box: x, y, scale only). Apply **partitioned sampling** or **annealed particle filtering** to handle higher dimensions efficiently. Hierarchical models can separate translation from articulation.

**Problem 5: Initialisation**
- The tracker needs to know where the hand is initially to start tracking.
- **Issue:** Without good initialisation, particles may never find the hand.
- **Solution:** Use a **skin colour detector** or hand detector (e.g., Viola-Jones trained on hands) to initialise the particle distribution around the detected hand region.

**Problem 6: Variable Speed**
- The hand accelerates and decelerates during the wave cycle, and the person may suddenly stop waving.
- **Issue:** A fixed motion model cannot capture this variability.
- **Solution:** Use **multiple motion models** (a switching dynamics model) or increase noise diffusion to be robust to speed changes. Include a "stationary" model as one possibility.

---

## Question 4: Stereo Vision (33 marks)

### (a) Epipolar Plane and Simplification of Correspondence [8 marks]

**Epipolar Plane:**

The epipolar plane is defined by three points: a 3D scene point P and the optical centres (focal points) of two cameras, O_L and O_R. These three points define a unique plane in 3D space called the **epipolar plane** for point P.

**Diagram description:** Imagine two cameras with their optical centres O_L (left) and O_R (right) connected by a baseline. A 3D point P sits above this baseline. The triangle formed by O_L, O_R, and P defines the epipolar plane. This plane intersects the left image plane along a line called the **epipolar line** in the left image, and intersects the right image plane along a corresponding epipolar line in the right image.

**Key geometric elements:**
- **Baseline:** The line connecting O_L and O_R
- **Epipoles:** The points where the baseline intersects each image plane (e_L is the projection of O_R onto the left image; e_R is the projection of O_L onto the right image)
- **Epipolar lines:** The intersection of the epipolar plane with each image plane. All epipolar lines in one image pass through that image's epipole.

**How it simplifies correspondence:**

Without epipolar geometry, finding the corresponding point in the right image for a point p_L in the left image requires searching the **entire 2D image** — an expensive O(n²) search per pixel.

The **epipolar constraint** states that the corresponding point in the right image **must lie on the epipolar line** corresponding to p_L. This reduces the search from a 2D area to a **1D line**, dramatically reducing computational cost and the number of false matches.

For **rectified images** (where cameras have parallel optical axes and co-planar image planes), epipolar lines are horizontal scanlines. Correspondence reduces to searching along the **same row** in the other image, making it trivially efficient to implement and enabling the use of dynamic programming along scanlines.

---

### (b) Advantages and Disadvantages of More Than Two Views [6 marks]

**Advantages:**

1. **Improved accuracy and robustness:** Multiple views provide redundant measurements. Depth estimates can be averaged or optimised jointly, reducing the effect of noise in individual measurements.

2. **Resolves ambiguities:** Regions that are occluded from one viewpoint may be visible from another. Multiple views reduce the impact of occlusion on reconstruction.

3. **Wider baseline effectively:** Using cameras at different baselines helps handle both near and far objects. Short baselines give accurate depth for near objects; long baselines give accurate depth for far objects.

4. **Better coverage:** Multiple viewpoints can observe surfaces that are foreshortened or nearly parallel to the viewing direction in a two-camera setup.

5. **Handles textureless regions better:** More views provide more constraints, potentially resolving matches in regions that are ambiguous from just two views.

**Disadvantages:**

1. **Increased computational cost:** More views mean more image pairs to match, more correspondences to find, and more complex optimisation (e.g., multi-view bundle adjustment is expensive).

2. **Calibration complexity:** All cameras must be accurately calibrated (intrinsic and extrinsic parameters). More cameras mean more calibration parameters and more potential for calibration errors.

3. **Synchronisation:** Multiple cameras must be temporally synchronised for dynamic scenes. Hardware and software complexity increases.

4. **Storage and bandwidth:** More images require more memory and processing bandwidth.

5. **Diminishing returns:** Beyond a certain number of views, the marginal improvement in reconstruction quality decreases while cost continues to increase linearly.

6. **Matching complexity:** N-view matching is harder than pairwise matching — enforcing consistency across all views adds algorithmic complexity.

---

### (c) Multiple Baseline Stereo — Operation, Strengths, and Weaknesses [11 marks]

**Operation:**

Multiple baseline stereo uses a set of cameras (or a single camera at multiple positions) arranged along a baseline, typically with one designated as the **reference view**. The method works as follows:

1. **Setup:** Arrange N cameras along a line (or arc), with one central reference camera. All cameras are rectified so that epipolar lines are horizontal scanlines.

2. **For each pixel in the reference image:** Consider a range of candidate disparities (depths).

3. **For each candidate disparity d:** Project the reference pixel into each of the other N-1 images using the disparity and the known baseline between the reference camera and each other camera. If camera i has baseline B_i relative to the reference, the disparity in camera i's image is d_i = d × (B_i / B_ref).

4. **Compute matching cost:** For each candidate disparity, compute the similarity (e.g., SSD, NCC) between the reference patch and the corresponding patch in each non-reference image. **Sum (or average) the matching costs** across all images.

5. **Select optimal disparity:** Choose the disparity with the minimum aggregate matching cost (or maximum correlation). This is the winner-takes-all approach.

6. **Repeat** for all pixels in the reference image to produce a dense disparity (depth) map.

**Strengths:**

1. **Sharper matching peak:** Summing matching scores across multiple baselines produces a much more distinct and unambiguous minimum at the correct disparity. Individual stereo pairs may have broad or noisy cost curves, but summing sharpens the peak.

2. **Handles different depth ranges:** Short baselines give reliable matches for nearby objects (where large baselines would cause too much appearance change), while long baselines give precise depth for far objects (where short baselines have poor depth resolution). The combination handles the full depth range well.

3. **Reduces false matches:** Random correlations in one image pair are unlikely to appear at the same disparity in other pairs. Summing suppresses these false peaks.

4. **Improved depth resolution:** The effective baseline is the longest baseline used, giving the maximum triangulation angle and best depth precision.

5. **Robustness to individual view problems:** If one view has a local occlusion or reflection, the contribution from other views overwhelms the corrupted data.

**Weaknesses:**

1. **Occlusion handling:** A point visible in the reference may be occluded in some of the other views. If many views are occluded, the summed cost may still be driven by incorrect matches. Need explicit occlusion reasoning or robust aggregation (e.g., take the best subset rather than sum all).

2. **Appearance change with viewpoint:** For non-Lambertian surfaces (specular, reflective), the appearance changes between views. Matching costs assuming constant appearance may fail. Wide baselines exacerbate this.

3. **Foreshortening effects:** Surfaces viewed at grazing angles from some cameras will appear heavily distorted, reducing matching reliability.

4. **Calibration requirements:** All cameras must be precisely calibrated relative to each other. Calibration errors accumulate and can cause systematic depth errors.

5. **Computational cost:** Cost grows linearly with number of views — each additional camera requires computing matching costs for every pixel at every candidate disparity.

6. **Restricted geometry:** Works best with cameras in a linear arrangement. For more general configurations, the simple disparity-scaling approach does not apply, requiring more complex multi-view formulations.

---

### (d) Photo Hull and Visual Hull [8 marks]

**Scenario:** Four cameras imaging a coloured rectangular solid from different viewpoints (top view shows cameras around the object).

**Visual Hull:**

The **visual hull** is the intersection of all the visual cones (silhouette cones) obtained by back-projecting the object's silhouette from each camera view into 3D space.

- From each camera, the object's silhouette (binary foreground/background mask) defines a cone (or generalised cylinder) of rays that could contain the object.
- The visual hull is the **maximal shape consistent with all silhouettes** — it is the intersection of all silhouette cones.
- It provides an **outer bound** on the object's shape: the true object must be contained within the visual hull, but the visual hull may be larger than the true object (it cannot recover concavities that are not visible in any silhouette).

For a rectangular solid viewed from four cameras:
- Each camera sees a rectangular silhouette that defines a truncated pyramid of possible 3D locations.
- The intersection of four such pyramids will produce a shape that closely approximates the rectangular solid (with four views covering all sides, the visual hull can be quite tight for a convex object).
- Since a rectangular solid is convex, the visual hull with sufficient views will approach the true shape closely.

**Photo Hull:**

The **photo hull** is the maximal shape that is **photo-consistent** with all input images. A point in 3D space is photo-consistent if, when projected into all cameras that can see it, the projected colours are consistent (i.e., the surface at that point could produce the observed colours under some reasonable reflectance model).

- The photo hull uses **colour/texture information**, not just silhouettes.
- A voxel is included in the photo hull if the colours observed from all cameras viewing that voxel are mutually consistent (e.g., similar within some threshold, accounting for Lambertian assumption).
- The photo hull is always contained within the visual hull: Photo Hull ⊆ Visual Hull ⊆ True Shape is NOT guaranteed — rather, True Shape ⊆ Photo Hull ⊆ Visual Hull.

For a coloured rectangular solid:
- Different faces of the solid have different colours. A voxel in empty space in front of the object would project to different background regions or to different coloured faces in different views — the colour inconsistency would exclude it from the photo hull.
- The photo hull can "carve away" regions of the visual hull where colour inconsistency is detected, providing a tighter reconstruction than the visual hull alone.
- However, the photo hull may still include some incorrect regions if, by coincidence, the background happens to be colour-consistent across views at certain 3D locations.

**Comparison:**
- Visual hull uses only binary silhouette information — simple but loses colour/texture detail.
- Photo hull uses full colour consistency — more discriminative, provides tighter bounds, but computationally more expensive and sensitive to non-Lambertian effects and calibration errors.
- Both provide conservative (over-)estimates of the true object shape.
- With a coloured rectangular solid, the photo hull will be significantly tighter than the visual hull because the distinct face colours provide strong constraints for carving away empty space.
