---
title: "Quick Reference"
order: 90
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["reference", "comparison", "cheat-sheet"]
---

## Testing Levels

| Level | Tests what | Who runs it | Typical technique |
|-------|-----------|-------------|-------------------|
| Unit | Single method/class | Developer | JUnit, white-box |
| Integration | Module interactions | Dev/QA | API tests, stubs |
| System | Entire application | QA team | Black-box, NFR testing |
| Acceptance | User requirements | Customer/UAT team | User stories, scenarios |

## Test Design Techniques

| Technique | Type | Key idea | When to use |
|-----------|------|----------|-------------|
| Equivalence Partitioning | Black-box | Divide inputs into classes with same behaviour | Any input domain |
| Boundary Value Analysis | Black-box | Test at edges of partitions | Numeric/range inputs |
| Control Flow Testing | White-box | Exercise paths through CFG | Code with branches/loops |
| Basis Path Testing | White-box | Test linearly independent paths (cyclomatic complexity) | Ensuring minimum path coverage |

## Cyclomatic Complexity

| Formula | Variables |
|---------|-----------|
| $M = E - N + 2$ | E = edges, N = nodes in CFG |
| $M = P + 1$ | P = number of predicate (decision) nodes |
| $M = R$ | R = number of regions (including outer) |

**Interpretation**: M = minimum number of linearly independent paths to test.

## Quality Models Comparison

| Model | Focus | Structure |
|-------|-------|-----------|
| McCall (1977) | Product operation, revision, transition | 11 quality factors → criteria → metrics |
| ISO/IEC 25010 | Product quality | 8 characteristics, 31 sub-characteristics |
| ISO/IEC 25019 | Quality-in-use | 5 characteristics (context of actual use) |

## ISO 25010 Characteristics

| # | Characteristic | Key sub-characteristics |
|---|---------------|------------------------|
| 1 | Functional Suitability | Completeness, correctness, appropriateness |
| 2 | Performance Efficiency | Time behaviour, resource utilisation, capacity |
| 3 | Compatibility | Co-existence, interoperability |
| 4 | Usability | Learnability, operability, error protection |
| 5 | Reliability | Maturity, availability, fault tolerance, recoverability |
| 6 | Security | Confidentiality, integrity, non-repudiation, accountability, authenticity |
| 7 | Maintainability | Modularity, reusability, analysability, modifiability, testability |
| 8 | Portability | Adaptability, installability, replaceability |

## Security Testing Triad

| Tool Type | What it tests | When | Finds |
|-----------|--------------|------|-------|
| SAST | Source code (white-box) | Commit/build | Hardcoded secrets, SQL concat, code smells |
| SCA | Dependencies (black-box) | Build | Known CVEs in libraries |
| DAST | Running app (black-box) | Deploy | XSS, broken access control, real exploits |

## Performance Test Types

| Type | Goal | Load profile |
|------|------|--------------|
| Load | Verify NFR under expected load | Constant expected users |
| Stress | Find breaking point | Ramp up beyond capacity |
| Soak | Find time-dependent bugs (memory leaks) | Normal load, extended duration (24–48h) |

## Key Metrics

| Metric | Definition |
|--------|-----------|
| Latency (response time) | Time for single request to complete |
| Throughput | Requests handled per unit time (RPS/TPS) |
| Error rate | Percentage of failed requests |

## OWASP Top 10 (2021) — Top 5

| # | Category | Prevention |
|---|----------|-----------|
| A01 | Broken Access Control | Deny by default, enforce ownership |
| A02 | Cryptographic Failures | Encrypt sensitive data, strong algorithms |
| A03 | Injection | Parameterised queries, input validation |
| A04 | Insecure Design | Threat modelling, secure design patterns |
| A05 | Security Misconfiguration | Hardened defaults, no unnecessary features |

## JUnit 5 Annotations

| Annotation | Purpose |
|------------|---------|
| `@Test` | Marks a test method |
| `@BeforeEach` | Setup before each test (fixture) |
| `@AfterEach` | Teardown after each test |
| `@BeforeAll` | One-time setup (static) |
| `@ParameterizedTest` | Run test with multiple inputs |
| `@ValueSource` | Provide literal values for parameterized tests |
| `@CsvSource` | Provide CSV rows for parameterized tests |
| `@DisplayName` | Human-readable test name |

## TDD Cycle

```
Red → Green → Refactor → Repeat
 │        │        │
 │        │        └── Improve design without changing behaviour
 │        └── Write minimal code to pass
 └── Write a failing test first
```

## C&K OO Metrics

| Metric | Measures | Good range |
|--------|----------|-----------|
| WMC (Weighted Methods per Class) | Complexity sum of methods | Low = simpler class |
| DIT (Depth of Inheritance Tree) | Levels of inheritance | 2–5 typical |
| NOC (Number of Children) | Direct subclasses | High = reuse but also coupling |
| CBO (Coupling Between Objects) | Classes this class depends on | Lower = better |
| RFC (Response for Class) | Methods callable from this class | Lower = easier to test |
| LCOM (Lack of Cohesion) | Unrelatedness of methods | Lower = more cohesive |
