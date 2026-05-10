---
title: "Test Design & Coverage Criteria"
order: 4
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["test-design", "coverage-criteria", "equivalence-partitioning", "boundary-value", "cfg", "cyclomatic-complexity", "mdtd"]
---

## Model-Driven Test Design (MDTD)

**Idea**: Use a model of the software (not the software itself) to design tests.

### Test Development Process

1. **Test design** — create input values that test effectively
2. **Test automation** — translate test cases into executable code
3. **Test execution** — run the tests
4. **Test evaluation** — assess results

### When Models Are Created

| Phase | Model Examples |
|-------|---------------|
| Requirements | Use cases, user stories, natural language specs |
| Design | UML sequence/activity diagrams |
| Implementation | Control flow graphs (CFGs) |

## Coverage Criteria

**Problem**: Even a simple 3-parameter method has $(2^{32})^3 = 2^{96}$ possible inputs. Exhaustive testing is impossible.

**Solution**: Coverage criteria provide structured ways to search the input space and tell us when we have enough tests.

| Criterion Type | Based on |
|---------------|----------|
| Input domain | Partitioning input values |
| Graph | Control flow paths |
| Logic | Boolean expressions |
| Syntax | Grammar descriptions |

## Input Domain Partitioning

**Principle**: Divide the input domain into partitions where all values in a partition are considered **equivalent** — testing with any value should yield the same pass/fail outcome.

### Two Approaches to Characteristic Design

| Approach | Method | Quality |
|----------|--------|---------|
| **Interface-based** | Each characteristic limits to a single parameter | Simpler but less thorough |
| **Functionality-based** | Characteristics based on what the code does | Requires domain knowledge, better test suites |

### Example: `Grade marksAverage(int m1, int m2, int m3)`

**Interface-based partitions** (6 partitions):
- $p_1$: m1 $\in$ [0,100], $p_2$: m1 $\notin$ [0,100]
- $p_3$: m2 $\in$ [0,100], $p_4$: m2 $\notin$ [0,100]
- $p_5$: m3 $\in$ [0,100], $p_6$: m3 $\notin$ [0,100]

**Functionality-based partitions** (6 partitions):
- $p_1$: 1st (avg ≥ 70), $p_2$: 2:1 (60–69), $p_3$: 2:2 (50–59)
- $p_4$: 3rd (40–49), $p_5$: Fail (< 40), $p_6$: INVALID

## Boundary Value Analysis (BVA)

**Idea**: Focus testing on partition boundaries — developers often make off-by-one errors.

For each partition boundary, select values:
- Just below minimum
- At minimum
- Just above minimum
- Just below maximum
- At maximum
- Just above maximum

### Example: `boolean decide(int x)` where valid range is [4, 10]

| Input | Expected | Boundary |
|-------|----------|----------|
| 3 | false | Just below min |
| 4 | true | At min |
| 5 | true | Just above min |
| 9 | true | Just below max |
| 10 | true | At max |
| 11 | false | Just above max |

## Control Flow Graphs (CFG)

Extract a CFG from code by mapping:
1. Sequences of statements (basic blocks) → **nodes**
2. Branches → **edges**

**Path**: A sequence of nodes connected by edges from initial to final node.

## Basis Path Testing

**Idea**: Find a set of **linearly independent (LI) paths** and design test cases for those.

A path $p$ is linearly independent from path $q$ if it contains at least one new node or edge.

### Cyclomatic Complexity

Estimates the number of LI paths through a CFG:

$$M = E - N + 2$$

- $E$ = number of edges
- $N$ = number of nodes

**Alternative formula**: $M = P + 1$ where $P$ = number of predicate (branching) nodes.

### Workflow

1. Draw the control flow graph
2. Calculate cyclomatic complexity $M$
3. Derive a set of LI paths (max $M$ paths)
4. Generate input values to drive each path

### Example

```java
int example(int value, boolean cond1, boolean cond2) {
    if (cond1) value++;
    if (cond2) value--;
    return value;
}
```

$M = P + 1 = 2 + 1 = 3$ (max 3 LI paths)

| # | Path | value | cond1 | cond2 | Expected |
|---|------|-------|-------|-------|----------|
| 1 | 1–3–5 | 5 | false | false | 5 |
| 2 | 1–2–3–4–5 | 5 | true | true | 5 |
| 3 | 1–2–3–5 | 5 | true | false | 6 |

### Cyclomatic Complexity as Quality Metric

- Correlates with error rate
- Industry guideline: methods with $M > 10$ should be refactored
- Direct indicator of **maintainability** (ISO/IEC 25010)
