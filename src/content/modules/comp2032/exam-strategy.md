---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP2032 - Image Processing"
tags: ["exam", "strategy"]
---

## Exam Format

| Aspect | Details |
|--------|---------|
| Duration | 2 hours |
| Format | Written exam |
| Sections | Multiple sections covering theory + computation |
| Calculator | Allowed |

## Question Types

| Type | What to expect | How to prepare |
|------|---------------|----------------|
| Short answer | Define terms, compare methods | Glossary + exam traps |
| Computation | Apply algorithm step-by-step | Worked examples (histEq, Huffman, convolution, Hough) |
| Diagram/sketch | Draw kernels, histograms, pipelines | Practice on paper |
| Compare/contrast | When to use method A vs B | Understand trade-offs |
| Code interpretation | Given Python/pseudocode, explain output | Review lab exercises |

## Computation Questions: Step-by-Step Approach

### Histogram Equalisation
1. Draw the table: $r_k$, $n_k$, $P(r_k)$, CDF, $s_k$
2. Show CDF computation clearly
3. Round final values
4. State the new histogram

### Convolution
1. Flip kernel (if convolution, not correlation)
2. Show one output calculation in full
3. State boundary handling assumption
4. Compute remaining values

### Huffman Coding
1. Sort probabilities
2. Draw tree (show all merges)
3. List codes
4. Compute average code length
5. Compare to entropy

### Hough Transform
1. State parameterisation ($\rho = x\cos\theta + y\sin\theta$)
2. For each edge point, compute $\rho$ at key $\theta$ values
3. Fill accumulator table
4. Identify peak → line parameters

## Time Management

| Section | Suggested Time | Strategy |
|---------|---------------|----------|
| Read all questions | 5 min | Identify easy marks |
| Computational Qs | 50% of time | Show all working |
| Theory/short answer | 30% of time | Concise, use diagrams |
| Review | 10 min | Check arithmetic |

## Mark-Scoring Tips

- Always state formulas before substituting values
- Draw diagrams where helpful (histograms, kernels, pipelines)
- If stuck on computation, describe the algorithm steps for partial credit
- Label axes on any graph/sketch
- For "compare" questions: use a table (method, advantage, disadvantage, use case)
