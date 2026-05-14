---
title: "Software Maintenance Challenges"
order: 1
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["maintenance", "technical debt", "Lehman's laws", "code quality", "software evolution"]
---

# Software Maintenance Challenges

## Types of Software Maintenance

:::eli10

Software maintenance is like looking after a house. Sometimes you fix broken things (corrective), sometimes you adapt to new weather or rules (adaptive), sometimes you add a new room or improve the kitchen (perfective), and sometimes you do preventive work like painting before the wood rots (preventive). Most of the cost of software comes from maintaining it, not building it.

:::

:::eli15

Software maintenance is classified into four types: corrective (fixing bugs), adaptive (adjusting to environment changes like new OS versions), perfective (improving performance or adding features), and preventive (restructuring to prevent future problems). Maintenance typically consumes 60-80% of total software lifecycle cost, with perfective maintenance (improvements and new features) accounting for roughly half of all maintenance effort.

:::

:::eli20

| Type | Purpose | Example | % of effort |
|------|---------|---------|-------------|
| **Corrective** | Fix defects/bugs | Patching a null pointer exception | ~20% |
| **Adaptive** | Adapt to environment changes | Updating for new OS/API version | ~25% |
| **Perfective** | Improve performance or maintainability | Refactoring, adding features | ~50% |
| **Preventive** | Prevent future problems | Restructuring code, updating docs | ~5% |

> Maintenance typically accounts for **60-80%** of total software lifecycle cost.

:::

## Lehman's Laws of Software Evolution

:::eli10

Lehman's laws are rules about how software changes over time. The two most important ones are: (1) if you stop updating software, it becomes less and less useful (like a map that never gets updated), and (2) every time you add something, the software gets more complicated unless you work hard to keep it simple.

:::

:::eli15

Lehman's laws describe how real-world software systems inevitably evolve. Key laws include: software must be continually adapted or it becomes unsatisfactory (Law I), complexity increases unless actively reduced (Law II), and functional content must grow to maintain user satisfaction (Law VI). These laws explain why maintenance is unavoidable and why quality naturally declines without deliberate effort to counteract entropy.

:::

:::eli20

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

:::

## Technical Debt

:::eli10

Technical debt is like borrowing money -- you take a shortcut now (borrow) and pay for it later with interest (extra work). Sometimes shortcuts are smart and deliberate; sometimes people take them without even realising. If you do not pay it back (fix the shortcuts), everything gets slower and harder over time.

:::

:::eli15

Technical debt is the implied cost of future rework caused by choosing quick but limited solutions. It is categorised by a 2x2 matrix: deliberate vs inadvertent and prudent vs reckless. Deliberate/prudent debt ("we know this is a shortcut, we will fix it") is strategic; reckless debt ("what is layered architecture?") reflects lack of skill. Consequences include increasing bug rates, slower development, higher onboarding costs, and cascading failures in tightly coupled code.

:::

:::eli20

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

:::

## Code Quality Metrics

:::eli10

Code quality metrics are measurements that tell you how healthy your code is. Cyclomatic complexity counts how many different paths exist through a function (lower is simpler). Coupling measures how tangled things are (less is better). Cohesion measures how focused a piece of code is (more focused is better). It is like a health check-up for your code.

:::

:::eli15

Code quality metrics provide objective measurements of code health. Cyclomatic complexity counts independent execution paths (aim for less than 10 per method). Coupling measures dependencies between modules (aim for low/loose). Cohesion measures how related elements within a module are (aim for high). Other useful metrics include code churn (change frequency) and test coverage (percentage exercised by tests, aim above 80%). These metrics help identify problem areas before they cause failures.

:::

:::eli20

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

:::

## Software Entropy

:::eli10

Software entropy means software naturally gets messier over time -- like a bedroom that gets untidy if you never clean it. Changing requirements, different coding styles, quick fixes, and missing documentation all contribute. Without active cleanup (refactoring), the mess keeps growing.

:::

:::eli15

Software entropy is the tendency for software to become increasingly disordered over time. Contributing factors include: changing requirements, multiple developers with different styles, quick fixes under time pressure, lack of documentation, and insufficient testing. It parallels the second law of thermodynamics -- without active effort (refactoring, documentation, testing), disorder always increases. This connects directly to Lehman's Law II (Increasing Complexity).

:::

:::eli20

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

:::
