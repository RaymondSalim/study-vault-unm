---
title: "Software Maintenance Challenges"
order: 1
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["maintenance", "technical debt", "Lehman's laws", "code quality", "software evolution"]
---

# Software Maintenance Challenges

## Types of Software Maintenance

| Type | Purpose | Example | % of effort |
|------|---------|---------|-------------|
| **Corrective** | Fix defects/bugs | Patching a null pointer exception | ~20% |
| **Adaptive** | Adapt to environment changes | Updating for new OS/API version | ~25% |
| **Perfective** | Improve performance or maintainability | Refactoring, adding features | ~50% |
| **Preventive** | Prevent future problems | Restructuring code, updating docs | ~5% |

> Maintenance typically accounts for **60-80%** of total software lifecycle cost.

## Lehman's Laws of Software Evolution

| Law | Name | Statement |
|-----|------|-----------|
| I | Continuing Change | A system must be continually adapted or it becomes progressively less satisfactory |
| II | Increasing Complexity | As a system evolves, its complexity increases unless work is done to reduce it |
| III | Self-Regulation | System evolution is self-regulating with statistically determinable trends |
| IV | Conservation of Organisational Stability | Average effective global activity rate is invariant over the product lifetime |
| V | Conservation of Familiarity | Incremental growth and long-term growth rate tends to decline |
| VI | Continuing Growth | Functional content must be continually increased to maintain user satisfaction |
| VII | Declining Quality | Quality will appear to decline unless rigorously maintained and adapted |
| VIII | Feedback System | Evolution processes are multi-level, multi-loop, multi-agent feedback systems |

## Technical Debt

Technical debt is the implied cost of future rework caused by choosing an easy but limited solution now.

### Sources of Technical Debt

| Source | Description |
|--------|-------------|
| Deliberate/Prudent | "We know this is a shortcut, we'll fix it later" |
| Deliberate/Reckless | "We don't have time for design" |
| Inadvertent/Prudent | "Now we know how we should have done it" |
| Inadvertent/Reckless | "What's layered architecture?" |

### Consequences

- Increased bug rate
- Slower feature development
- Higher onboarding cost for new developers
- Cascading failures when modifying tightly coupled code

## Code Quality Metrics

| Metric | What it measures | Good value |
|--------|-----------------|------------|
| **Cyclomatic Complexity** | Number of independent paths through code | < 10 per method |
| **Lines of Code (LOC)** | Size of codebase | Context-dependent |
| **Coupling** | Dependencies between modules | Low (loose coupling) |
| **Cohesion** | Relatedness of elements within a module | High |
| **Code Churn** | Frequency of changes to a file | Low for stable modules |
| **Test Coverage** | % of code exercised by tests | > 80% |

### Cyclomatic Complexity

$$M = E - N + 2P$$

Where:
- E = number of edges in the control flow graph
- N = number of nodes
- P = number of connected components (usually 1)

**Practical rule**: Count decision points (if, while, for, case, &&, ||) + 1.

```java
// Complexity = 4 (3 decisions + 1)
public String classify(int score) {
    if (score >= 70) {          // +1
        return "First";
    } else if (score >= 60) {   // +1
        return "2:1";
    } else if (score >= 50) {   // +1
        return "2:2";
    } else {
        return "Fail";
    }
}
```

## Software Entropy

Software entropy is the tendency for software to become disordered over time. Contributing factors:

- Changing requirements
- Multiple developers with different styles
- Quick fixes under time pressure
- Lack of documentation
- Insufficient testing

<details>
<summary>Practice: Identify the maintenance type</summary>

1. Adding a search feature requested by users → **Perfective**
2. Fixing a crash when input is empty → **Corrective**
3. Migrating from Java 8 to Java 17 → **Adaptive**
4. Adding logging to detect future issues → **Preventive**
5. Improving response time of a query → **Perfective**

</details>

<details>
<summary>Practice: Which Lehman's law applies?</summary>

1. "Our system gets more complex with every release" → **Law II (Increasing Complexity)**
2. "Users keep asking for new features" → **Law VI (Continuing Growth)**
3. "The old version no longer works well for current needs" → **Law I (Continuing Change)**
4. "The system seems buggier even though we haven't introduced new bugs" → **Law VII (Declining Quality)**

</details>
