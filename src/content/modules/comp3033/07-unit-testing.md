---
title: "Software Metrics"
order: 7
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["metrics", "cyclomatic-complexity", "loc", "coupling", "cohesion", "oop-metrics", "wmc", "dit"]
---

## Why Measure Software Quality?

Metrics are objective, quantitative indicators that enable us to:

| Purpose | Description |
|---------|-------------|
| **Compare** | Products/processes against others or against quality standards |
| **Predict** | Quality of a product or process |
| **Improve** | Quality of a product or process over time |

### Internal vs External Attributes

| External (hard to measure) | Internal (measurable) |
|---------------------------|----------------------|
| Maintainability | Cyclomatic complexity |
| Reliability | Program size (LOC) |
| Reusability | Depth of inheritance tree |
| Usability | Number of error messages, length of manual |

Internal metrics are **predictors** of external quality attributes.

## Code Size: Lines of Code (LOC)

| Variant | Measures |
|---------|----------|
| **NCLOC** | All lines except blank/comment lines |
| **CLOC** | Comment lines only |

### Issues with LOC

- Programmer-dependent (style, formatting)
- Language-dependent (positional vs delimited)
- Unclear relationship to quality
- Perverse incentive: measuring by LOC encourages verbose code

## McCabe's Cyclomatic Complexity

Estimates the number of linearly independent paths through a CFG.

$$M = E - N + 2 \quad \text{or} \quad M = P + 1$$

| Symbol | Meaning |
|--------|---------|
| $E$ | Number of edges |
| $N$ | Number of nodes |
| $P$ | Number of predicate (branching) nodes |

### Significance

| Application | Usage |
|-------------|-------|
| Development | Refactor methods when $M > 10$ |
| Testing | Derives minimum number of test cases needed |
| Quality | Direct indicator of maintainability |

## Chidamber & Kemerer (C&K) OO Metrics

### 1. Weighted Methods per Class (WMC)

$$WMC = \sum_{i=1}^{n} c_i$$

where $c_i$ is the complexity of each method, $n$ is number of methods.

- Higher WMC → more effort to maintain
- Higher WMC → greater impact on subclasses
- High WMC → more application-specific, less reusable

### 2. Depth of Inheritance Tree (DIT)

Maximum path length from class to root in hierarchy.

| DIT | Implication |
|-----|-------------|
| Low (0–2) | Less reuse through inheritance, simpler behaviour |
| High (4+) | More reuse, but harder to predict behaviour |

### 3. Number of Children (NOC)

Number of immediate subclasses.

- High NOC → more reuse but diluted abstraction
- Classes with many children need more testing

### 4. Coupling Between Object Classes (CBO)

Number of other classes a class is coupled to (uses methods/variables of).

- High CBO → decreased reuse potential
- High CBO → increased ripple effect of changes

### 5. Response For a Class (RFC)

Number of methods that could be called in response to a message:
- Methods in the class (set $M$)
- Methods called by methods in $M$

Higher RFC → greater testing effort, higher complexity.

### 6. Lack of Cohesion in Methods (LCOM)

Pairs of methods **not** sharing fields minus pairs that **do** share fields.

- High LCOM → class represents multiple abstractions
- Should refactor into separate classes (single-responsibility principle)

## Coupling vs Cohesion

| Coupling (between classes) | Cohesion (within a class) |
|---------------------------|--------------------------|
| How closely connected separate classes are | How closely related elements of one class are |
| High coupling → poor maintainability & reusability | Low cohesion → poor readability & high complexity |
| **Goal: minimise** | **Goal: maximise** |

## Limitations of Metrics

- Can only make limited assumptions from code measures
- What a metric predicts depends on the language used
- Hard to compare across projects using different languages
- Metrics useful as predictors only after correlation with past project success
- Companies adopt metrics that work for them over time
