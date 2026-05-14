---
title: "Software Quality Models"
order: 2
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["quality-models", "iso-25010", "mccall", "nfr", "quality-attributes"]
---

## Software Development Processes & SQA

:::eli10

There are two main ways to build software. The "waterfall" way is like following a recipe step by step -- you finish one step completely before starting the next. The "agile" way is like building with LEGO -- you build a small working piece, show it to people, get feedback, and keep adding to it.

:::

:::eli15
Software development follows either a plan-driven or adaptive approach. Waterfall is linear and sequential, with testing at the end (the V-Model links each development phase to a test phase). Agile is iterative and incremental, with testing integrated continuously via CI/CD. Each approach integrates quality assurance differently -- waterfall has distinct V&V phases, while agile tests continuously.

:::

:::eli20
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

:::

## McCall's Quality Model (1977)

:::eli10

McCall's model is like a report card for software with three sections: "How well does it run?" (is it correct and fast?), "Can I fix and update it?" (is it easy to maintain?), and "Can I move or share it?" (does it work on other computers?).

:::

:::eli15
McCall's Quality Model organises software quality into three categories with 11 factors. Product operation covers how well the software runs (correctness, reliability, efficiency, integrity, usability). Product revision covers maintainability, flexibility, and testability. Product transition covers portability, reusability, and interoperability. This model helps teams systematically evaluate quality from multiple angles.

:::

:::eli20
Three categories, 11 factors:

| Category | Factors | Question |
|----------|---------|----------|
| **Product operation** | Correctness, Reliability, Efficiency, Integrity, Usability | How well does it run? |
| **Product revision** | Maintainability, Flexibility, Testability | Can I fix and update it? |
| **Product transition** | Portability, Reusability, Interoperability | Can I move/reuse it? |

:::

## ISO/IEC 25000 Standards

:::eli10

ISO 25000 is like an international grading system for software. One part grades the software itself (is it fast? secure? easy to fix?). Another part grades how users feel when using it (can they do what they want? is it pleasant to use?).

:::

:::eli15
ISO/IEC 25000 provides two complementary quality models. The Product Quality Model (ISO 25010) evaluates the software from a developer's perspective across 8 characteristics: functional suitability, performance, compatibility, usability, reliability, security, maintainability, and portability. The Quality in Use Model (ISO 25019) evaluates from the user's perspective: effectiveness, efficiency, satisfaction, freedom from risk, and context coverage.

:::

:::eli20
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

:::

## Writing Good NFRs

:::eli10

A bad rule is "run fast" because nobody knows what "fast" means. A good rule is "load the page in less than 2 seconds" because you can actually check if that happens. Good quality requirements need to be specific enough that you can measure them.

:::

:::eli15
Non-functional requirements (NFRs) must be specific, measurable, and verifiable to be useful. Vague statements like "the system should be fast" or "the system must be secure" cannot be tested. Good NFRs include precise conditions and thresholds, such as "dashboard renders in under 2 seconds for 95% of requests under 500 concurrent users" or "all PII encrypted at rest using AES-256."

:::

:::eli20
| Bad NFR (vague) | Good NFR (testable) |
|----------------|-------------------|
| "The system should be fast" | "Under 500 concurrent users, dashboard renders in < 2s for 95% of requests" |
| "The system must be secure" | "All PII encrypted at rest using AES-256" |
| "The code should be clean" | "No method in core logic has cyclomatic complexity > 10" |
| "The system should be reliable" | "Public API achieves 99.9% monthly uptime" |

**Key principle**: Transform vague goals into **specific, measurable, verifiable** requirements.

:::
