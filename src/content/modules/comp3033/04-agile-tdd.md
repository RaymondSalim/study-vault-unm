---
title: "Test Design & Coverage Criteria"
order: 4
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["test-design", "coverage-criteria", "equivalence-partitioning", "boundary-value", "cfg", "cyclomatic-complexity", "mdtd"]
---

## Model-Driven Test Design (MDTD)

:::eli10

Instead of randomly poking at software to see if it breaks, you use a simplified picture (a model) of how the software works to figure out the smartest tests to run. It is like studying a map before exploring a cave -- you plan your route first.

:::

:::eli15

Model-Driven Test Design uses abstract models of the software (not the software itself) to systematically design tests. The process has four steps: test design (create input values), test automation (make tests executable), test execution (run them), and test evaluation (assess results). Models come from different development phases -- use cases from requirements, UML diagrams from design, and control flow graphs from code.

:::

:::eli20

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

:::

## Coverage Criteria

:::eli10

You cannot test every possible input because there are way too many combinations (imagine trying every number from 1 to a billion!). Coverage criteria are smart rules that tell you which tests are most important to run and when you have done enough testing.

:::

:::eli15

Exhaustive testing is impossible -- even a simple method with three integer parameters has an astronomical number of possible inputs. Coverage criteria solve this by providing structured strategies to search the input space efficiently and determine when you have "enough" tests. The four main types are: input domain criteria (partitioning inputs), graph criteria (control flow paths), logic criteria (boolean expressions), and syntax criteria (grammar descriptions).

:::

:::eli20

**Problem**: Even a simple 3-parameter method has $(2^{32})^3 = 2^{96}$ possible inputs. Exhaustive testing is impossible.

**Solution**: Coverage criteria provide structured ways to search the input space and tell us when we have enough tests.

| Criterion Type | Based on |
|---------------|----------|
| Input domain | Partitioning input values |
| Graph | Control flow paths |
| Logic | Boolean expressions |
| Syntax | Grammar descriptions |

:::

## Input Domain Partitioning

:::eli10

Imagine sorting a pile of toys into groups where all toys in the same group behave the same way when tested. Then you only need to test one toy from each group instead of every single toy. That is partitioning -- grouping inputs that should all give the same result.

:::

:::eli15

Input domain partitioning divides possible inputs into groups (partitions) where all values in a partition are considered equivalent -- testing any one value represents the entire group. There are two design approaches: interface-based (partitions based on individual parameter ranges, simpler but less thorough) and functionality-based (partitions based on what the code does, requiring domain knowledge but producing better tests).

:::

:::eli20

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

:::

## Boundary Value Analysis (BVA)

:::eli10

Programmers often make mistakes at the edges of ranges -- like writing "less than or equal to 10" when they meant "less than 10." So testers focus on testing right at the boundaries: just below, exactly at, and just above each limit. It is like checking if a door closes properly by pushing it right at the edge.

:::

:::eli15

Boundary Value Analysis targets partition boundaries because developers frequently make off-by-one errors at these points. For each boundary, you test six values: just below the minimum, at the minimum, just above the minimum, just below the maximum, at the maximum, and just above the maximum. This strategy efficiently catches common boundary-related bugs with relatively few test cases.

:::

:::eli20

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

:::

## Control Flow Graphs (CFG)

:::eli10

A control flow graph is like drawing a map of all the paths your code can take. Each step in the code is a dot on the map, and arrows show which step comes next. If there is an "if" statement, the path splits into two arrows (one for yes, one for no).

:::

:::eli15

A Control Flow Graph (CFG) is a visual representation of all possible execution paths through code. Sequences of statements become nodes, and branches (if/else, loops) become edges connecting those nodes. A path is a sequence of nodes from the start to the end of the program. CFGs are used to systematically identify which paths need testing.

:::

:::eli20

Extract a CFG from code by mapping:
1. Sequences of statements (basic blocks) → **nodes**
2. Branches → **edges**

**Path**: A sequence of nodes connected by edges from initial to final node.

:::

## Basis Path Testing

:::eli10

You do not need to test every single possible route through your code (there could be millions!). Instead, you find a smaller set of "basic" routes that, combined, cover every road at least once. Cyclomatic complexity is a formula that tells you how many of these basic routes you need.

:::

:::eli15

Basis path testing identifies a set of linearly independent paths through the CFG -- paths that each traverse at least one new node or edge not covered by other paths. Cyclomatic complexity (M = E - N + 2, or M = P + 1 where P is the number of branching nodes) gives the maximum number of independent paths needed. You then design test inputs that force execution along each path.

:::

:::eli20

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

:::
