---
title: "Software Metrics"
order: 7
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["metrics", "cyclomatic-complexity", "loc", "coupling", "cohesion", "oop-metrics", "wmc", "dit"]
---

## Why Measure Software Quality?

:::eli10

Measuring software is like measuring how healthy you are. You cannot just say "I feel fine" -- you need numbers like your height, weight, and heart rate. Software metrics give you numbers that show if your code is healthy, predict if it might have problems, and let you compare it to other code.

:::

:::eli15
Software metrics provide objective, quantitative indicators for three purposes: comparing products/processes against standards, predicting quality outcomes, and improving quality over time. External attributes (like maintainability and reliability) are hard to measure directly, so we use internal metrics (like cyclomatic complexity and lines of code) as predictors of those external qualities.

:::

:::eli20
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

:::

## Code Size: Lines of Code (LOC)

:::eli10

Lines of Code (LOC) is the simplest way to measure how big a program is -- just count the lines! But it is not great because different programmers write differently (some use more lines for the same thing), and writing MORE lines does not mean the code is better. It is like judging an essay only by how many pages it has.

:::

:::eli15
LOC measures program size in two variants: NCLOC (all lines except blanks and comments) and CLOC (comment lines only). However, LOC has significant issues: it depends on programmer style and language, has an unclear relationship to quality, and creates a perverse incentive to write verbose code. Despite its simplicity, it is an unreliable quality indicator on its own.

:::

:::eli20
| Variant | Measures |
|---------|----------|
| **NCLOC** | All lines except blank/comment lines |
| **CLOC** | Comment lines only |

### Issues with LOC

- Programmer-dependent (style, formatting)
- Language-dependent (positional vs delimited)
- Unclear relationship to quality
- Perverse incentive: measuring by LOC encourages verbose code

:::

## McCabe's Cyclomatic Complexity

:::eli10

Cyclomatic complexity counts how many different paths your code can take. Think of it like a maze -- the more forks in the road, the more complex the maze is. If a piece of code has too many forks (more than 10), it is too complicated and should be simplified.

:::

:::eli15
McCabe's Cyclomatic Complexity estimates the number of linearly independent paths through a control flow graph using the formula M = E - N + 2 (edges minus nodes plus 2) or equivalently M = P + 1 (predicate nodes plus 1). It serves three purposes: guiding refactoring (methods above M=10 should be simplified), determining the minimum number of test cases needed, and directly indicating maintainability.

:::

:::eli20
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

:::

## Chidamber & Kemerer (C&K) OO Metrics

:::eli10

These are six ways to measure how well-organised your classes (blueprints for objects) are in object-oriented programming. They check things like: how many methods does a class have? How deep is the family tree? How many friends does it depend on? Too much of any of these means the code is hard to understand and fix.

:::

:::eli15
The Chidamber and Kemerer suite provides six metrics for object-oriented code. WMC (Weighted Methods per Class) measures total method complexity. DIT (Depth of Inheritance Tree) measures inheritance depth. NOC (Number of Children) counts subclasses. CBO (Coupling Between Objects) counts dependencies on other classes. RFC (Response For a Class) counts callable methods. LCOM (Lack of Cohesion) measures whether a class is doing too many unrelated things and should be split.

:::

:::eli20
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

:::

## Coupling vs Cohesion

:::eli10

Coupling is about how much classes depend on each other -- like friends who cannot do anything without each other (bad!). Cohesion is about how well everything inside one class belongs together -- like a toolbox where all the tools are for the same job (good!). You want low coupling (independent classes) and high cohesion (focused classes).

:::

:::eli15
Coupling measures how closely connected separate classes are -- high coupling means changes in one class ripple through others, making maintenance difficult. Cohesion measures how closely related elements within a single class are -- low cohesion means the class handles unrelated responsibilities and should be split. The goal is to minimise coupling between classes and maximise cohesion within classes.

:::

:::eli20
| Coupling (between classes) | Cohesion (within a class) |
|---------------------------|--------------------------|
| How closely connected separate classes are | How closely related elements of one class are |
| High coupling → poor maintainability & reusability | Low cohesion → poor readability & high complexity |
| **Goal: minimise** | **Goal: maximise** |

:::

## Limitations of Metrics

:::eli10

Metrics are helpful but not perfect. Just like knowing someone's height does not tell you everything about their health, code metrics do not tell you everything about code quality. Different programming languages make numbers look different, and what counts as "good" depends on the specific project.

:::

:::eli15
Software metrics have important limitations. You can only make limited assumptions from code measures. What a metric predicts varies by programming language, making cross-project comparisons difficult. Metrics are only useful as predictors after being correlated with past project success. Companies must adopt and calibrate metrics that work for their specific context over time.

:::

:::eli20
- Can only make limited assumptions from code measures
- What a metric predicts depends on the language used
- Hard to compare across projects using different languages
- Metrics useful as predictors only after correlation with past project success
- Companies adopt metrics that work for them over time

:::
