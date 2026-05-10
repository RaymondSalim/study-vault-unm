---
title: "Flashcards"
order: 94
moduleTitle: "COMP2032 - Image Processing"
tags: ["flashcards", "review"]
---

## Key Concept Flashcards

<div class="flashcard-player" data-cards='[
  {"q": "What is the Nyquist rate?", "a": "Sampling rate must be ≥ 2× the highest frequency component to avoid aliasing."},
  {"q": "Histogram equalisation formula?", "a": "s_k = (L-1) × CDF(r_k), where CDF(r_k) = Σ P(r_j) for j=0 to k"},
  {"q": "What does a Gaussian filter with large σ do?", "a": "More smoothing/blur. Kernel should be ≥ 6σ+1 pixels wide."},
  {"q": "Median filter: linear or non-linear?", "a": "Non-linear. It cannot be expressed as convolution with a kernel."},
  {"q": "Erosion effect on binary objects?", "a": "Shrinks objects, removes small protrusions, separates touching objects."},
  {"q": "Opening = ?", "a": "Erosion followed by dilation. Removes small foreground noise."},
  {"q": "Closing = ?", "a": "Dilation followed by erosion. Fills small holes."},
  {"q": "Canny edge detector steps?", "a": "1. Gaussian smooth 2. Gradient (Sobel) 3. Non-maximum suppression 4. Hysteresis thresholding"},
  {"q": "Hough transform line parameterisation?", "a": "ρ = x·cos(θ) + y·sin(θ). Each point generates a sinusoidal curve in (ρ,θ) space."},
  {"q": "What does Otsu maximise?", "a": "Between-class variance σ²_B = ω₀·ω₁·(μ₀-μ₁)²"},
  {"q": "SLIC distance metric combines what?", "a": "Spatial distance (d_s) and colour distance (d_c) in CIELAB, balanced by compactness m."},
  {"q": "In JPEG, which step is lossy?", "a": "Quantisation (dividing DCT coefficients by Q-table and rounding)."},
  {"q": "Huffman coding optimality?", "a": "Optimal among symbol-by-symbol codes. Average length approaches entropy H."},
  {"q": "CNN output size formula?", "a": "floor((W - K + 2P) / S) + 1, where W=input, K=kernel, P=padding, S=stride"},
  {"q": "Sobel G_x detects what kind of edges?", "a": "Vertical edges (measures horizontal intensity change)."},
  {"q": "What is non-maximum suppression in Canny?", "a": "At each pixel, keep gradient only if it is the local max along gradient direction. Thins edges to 1px."},
  {"q": "Bilateral filter parameters?", "a": "σ_s (spatial extent) and σ_r (intensity range tolerance). Preserves edges."},
  {"q": "Entropy formula?", "a": "H = -Σ P(r_k) · log₂(P(r_k))"},
  {"q": "What is aliasing?", "a": "Artefacts from under-sampling. Two different signals become indistinguishable when sampled."},
  {"q": "GrabCut initialisation?", "a": "User draws bounding box. Outside = definite background. Inside = probable foreground. Iteratively refines with GMMs + graph cuts."}
]'></div>

<script>
  document.querySelectorAll('.flashcard-player').forEach(player => {
    const cards = JSON.parse(player.getAttribute('data-cards') || '[]');
    let idx = 0;
    let flipped = false;

    const container = document.createElement('div');
    container.innerHTML = `
      <div class="fc-card"><div class="fc-content"></div></div>
      <div class="fc-controls">
        <button class="fc-btn fc-prev">←</button>
        <span class="fc-counter"></span>
        <button class="fc-btn fc-next">→</button>
      </div>
      <button class="fc-btn fc-flip">Flip</button>
    `;
    player.replaceChildren(container);

    const content = container.querySelector('.fc-content');
    const counter = container.querySelector('.fc-counter');

    function render() {
      if (!cards.length) return;
      content.textContent = flipped ? cards[idx].a : cards[idx].q;
      content.style.color = flipped ? '#9ece6a' : '#c0caf5';
      counter.textContent = `${idx + 1} / ${cards.length}`;
    }

    container.querySelector('.fc-flip').addEventListener('click', () => { flipped = !flipped; render(); });
    container.querySelector('.fc-prev').addEventListener('click', () => { idx = (idx - 1 + cards.length) % cards.length; flipped = false; render(); });
    container.querySelector('.fc-next').addEventListener('click', () => { idx = (idx + 1) % cards.length; flipped = false; render(); });
    render();
  });
</script>

<style>
  .flashcard-player { text-align: center; margin: 2em 0; }
  .fc-card {
    min-height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-highlight);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2em;
    margin-bottom: 1em;
    font-size: 1.1em;
  }
  .fc-controls { display: flex; align-items: center; justify-content: center; gap: 1em; margin-bottom: 0.5em; }
  .fc-counter { color: var(--fg-muted); }
  .fc-btn {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    color: var(--fg);
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
  }
  .fc-btn:hover { border-color: var(--accent); color: var(--accent); }
</style>
