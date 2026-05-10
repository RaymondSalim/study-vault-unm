---
title: "Software Quality Models"
order: 2
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["quality-models", "iso-25010", "mccall", "nfr", "quality-attributes"]
---

## Software Development Processes & SQA

| Model | Approach | SQA Integration |
|-------|----------|----------------|
| **Waterfall** | Plan-driven, linear, sequential | V&V phase at end; V-Model links test design to each phase |
| **Agile** | Iterative, adaptive, incremental | Testing integrated continuously via CI/CD |

### The V-Model

Maps each development phase to a corresponding test level:

```
Specification ←→ Acceptance Test
User Requirements ←→ System Test
System Design ←→ Integration Test
Module Design ←→ Unit Test
Implementation
```

## McCall's Quality Model (1977)

Three categories, 11 factors:

| Category | Factors | Question |
|----------|---------|----------|
| **Product operation** | Correctness, Reliability, Efficiency, Integrity, Usability | How well does it run? |
| **Product revision** | Maintainability, Flexibility, Testability | Can I fix and update it? |
| **Product transition** | Portability, Reusability, Interoperability | Can I move/reuse it? |

## ISO/IEC 25000 Standards

### Product Quality Model (ISO/IEC 25010:2023)

Evaluates the software product itself — the **developer's** view.

| Characteristic | Sub-characteristics (examples) |
|---------------|-------------------------------|
| Functional suitability | Completeness, correctness, appropriateness |
| Performance efficiency | Time behaviour, resource utilisation, capacity |
| Compatibility | Co-existence, interoperability |
| Usability | Learnability, operability, accessibility |
| Reliability | Maturity, availability, fault tolerance, recoverability |
| Security | Confidentiality, integrity, non-repudiation, accountability |
| Maintainability | Modularity, reusability, analysability, modifiability, testability |
| Portability | Adaptability, installability, replaceability |

### Quality in Use Model (ISO/IEC 25019:2023)

Measures user experience — the **user's** view.

| Characteristic | Definition |
|---------------|-----------|
| Effectiveness | Can users achieve their goals accurately? |
| Efficiency | How much effort does it take? |
| Satisfaction | How pleasant is the experience? |
| Freedom from risk | Does it mitigate financial, health, data risks? |
| Context coverage | Is it effective in all intended contexts? |

## Writing Good NFRs

| Bad NFR (vague) | Good NFR (testable) |
|----------------|-------------------|
| "The system should be fast" | "Under 500 concurrent users, dashboard renders in < 2s for 95% of requests" |
| "The system must be secure" | "All PII encrypted at rest using AES-256" |
| "The code should be clean" | "No method in core logic has cyclomatic complexity > 10" |
| "The system should be reliable" | "Public API achieves 99.9% monthly uptime" |

**Key principle**: Transform vague goals into **specific, measurable, verifiable** requirements.
