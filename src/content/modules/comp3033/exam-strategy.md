---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["exam", "strategy", "revision", "planning"]
---

## Exam Strategy

### Time Allocation

| Section | Suggested Time | Notes |
|---------|---------------|-------|
| Reading & planning | 10 minutes | Identify compulsory vs choice questions |
| Short-answer questions | 30 minutes | Definitions, comparisons, brief explanations |
| Calculation/diagram questions | 40 minutes | CFGs, cyclomatic complexity, path testing, partitioning |
| Scenario-based questions | 30 minutes | Security analysis, performance test selection, SQA decisions |
| Review | 10 minutes | Verify CFG edge counts, check all parts answered |

### Topic Weighting (estimated)

| Topic | Weight | Priority |
|-------|--------|----------|
| Test design & coverage (CFGs, cyclomatic complexity, partitioning, BVA) | 25% | High |
| Testing fundamentals (Fault-Error-Failure, RIPR, testing levels) | 15% | High |
| Security testing (SAST/DAST/SCA, SQL injection, OWASP) | 15% | High |
| Quality models & NFRs (McCall, ISO 25010, writing NFRs) | 10% | High |
| Test automation & JUnit (JUnit 5, parameterized tests, fixtures) | 10% | Medium |
| Agile & TDD (TDD cycle, user stories, CI) | 10% | Medium |
| Performance testing (load/stress/soak, metrics) | 8% | Medium |
| SQA Management (org vs project, SQA plan) | 7% | Medium |

### Question Types to Expect

1. **Fault-Error-Failure analysis** — given code with a seeded fault, identify states that are correct/incorrect and explain why
2. **CFG construction & path testing** — draw CFG, calculate cyclomatic complexity, identify basis paths, create test cases
3. **Input space partitioning** — identify characteristics, define partitions, select test inputs
4. **Security code analysis** — spot vulnerabilities in code, classify them, propose fixes
5. **Performance scenario classification** — given a scenario, determine if it's load/stress/soak testing and justify
6. **Quality model application** — map NFRs to ISO 25010 characteristics, evaluate whether NFRs are testable
7. **SQA level classification** — determine if an activity is organisational or project level

### Key Formulas

| Formula | Context |
|---------|---------|
| M = E - N + 2 | Cyclomatic complexity (edges, nodes) |
| M = P + 1 | Cyclomatic complexity (predicates) |
| Basis paths = M | Minimum independent paths for full basis path coverage |

### Night-Before Top 10 Checklist

1. **CFG construction**: practice drawing nodes for statements, edges for flow, decision nodes for conditions
2. **Cyclomatic complexity**: three formulas (E-N+2, P+1, regions) — be ready to verify with all three
3. **Basis path testing**: enumerate M independent paths, create test inputs for each
4. **Fault-Error-Failure**: given buggy code, trace execution to identify where error state first appears
5. **Input space partitioning**: identify characteristics, create partitions, select representatives
6. **BVA**: know on-point (boundary), off-point (just outside), and in-point (just inside)
7. **SQL injection**: recognise string concatenation vulnerability, write prepared statement fix
8. **SAST vs DAST vs SCA**: what each tests, when in CI, pros/cons — know the triad table cold
9. **Load vs stress vs soak**: match scenarios to test types with reasoning
10. **ISO 25010 characteristics**: name all 8 and give one sub-characteristic each
