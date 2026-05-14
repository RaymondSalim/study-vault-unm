---
title: "Requirements Types & Qualities"
order: 2
moduleTitle: "COMP2041 - Software Specification"
tags: ["functional", "non-functional", "FURPS+", "requirement-qualities", "constraints"]
---

## Requirements Hierarchy

:::eli10

Requirements come in layers, like a cake. The top layer is "why are we building this?" (business goals). The middle is "what do users need to do?" And the bottom is "how does the system actually work?" -- split into what it does (functional) and how well it does it (non-functional, like speed and reliability).

:::

:::eli15

Requirements form a hierarchy: business requirements (the "why" -- organisational goals), user requirements (the "what" -- tasks users need to accomplish), and system requirements (the "how" -- detailed specifications). System requirements split into functional (specific behaviours and features) and non-functional (quality attributes like performance, security, usability). Each level refines and implements the one above it.

:::

:::eli20

```
Business Requirements (WHY)
  └── User Requirements (WHAT users need to do)
       └── System Requirements (HOW the system does it)
            ├── Functional Requirements
            └── Non-Functional Requirements
```

:::

## Functional vs Non-Functional

:::eli10

Functional requirements are about WHAT the system does -- like "users can reset their password." Non-functional requirements are about HOW WELL it does things -- like "the page loads in under 2 seconds." If a functional requirement is missing, a feature is broken. If a non-functional requirement is missed, the system works but feels slow, insecure, or frustrating.

:::

:::eli15

Functional requirements (FRs) describe specific behaviours or features the system must provide -- they are testable through feature-level tests. Non-functional requirements (NFRs) describe quality attributes: how fast, reliable, secure, or usable the system must be. NFRs are often harder to specify precisely but equally important -- they are tested through performance, load, and security testing. Both types derive from different sources and require different verification approaches.

:::

:::eli20

| Aspect | Functional (FR) | Non-Functional (NFR) |
|--------|-----------------|---------------------|
| Describes | What the system **does** | How **well** the system does it |
| Example | "System shall allow password reset via email" | "Password reset page loads in < 2s" |
| Violation | Feature is missing/broken | System works but poorly |
| Testing | Feature-level tests | Performance/load/security tests |
| Source | Use cases, user stories | Quality attribute scenarios |

:::

## FURPS+ Classification

:::eli10

FURPS+ is a checklist to make sure you have not forgotten any type of requirement. F = features, U = easy to use, R = reliable, P = fast, S = easy to fix/maintain, and the + is for extras like rules and limits. Think of it as a shopping list for qualities your software needs.

:::

:::eli15

FURPS+ is a classification scheme for requirements: Functionality (features, security), Usability (learnability, accessibility), Reliability (uptime, failure recovery), Performance (speed, capacity), Supportability (maintainability, testability), plus additional concerns like constraints, interfaces, and licensing. It helps ensure no category of requirements is overlooked during elicitation and analysis.

:::

:::eli20

| Category | Meaning | Examples |
|----------|---------|----------|
| **F**unctionality | Features, capabilities, security | Authentication, search, printing |
| **U**sability | UX, aesthetics, help, documentation | Consistent UI, accessible, learnable in < 1hr |
| **R**eliability | Availability, failure rate, recovery | 99.9% uptime, MTBF > 1000 hrs |
| **P**erformance | Speed, throughput, capacity | < 200ms response, 10k concurrent users |
| **S**upportability | Maintainability, testability, portability | Modular architecture, CI/CD compatible |
| **+** (additional) | Constraints, interfaces, licensing | Must run on Linux, REST API, open-source licence |

:::

## Constraint Types

:::eli10

Constraints are rules you must follow that you cannot change -- like "it must be written in Java" or "it must launch before September." They are not features you are choosing to build; they are limits placed on you by technology, laws, business, or other systems.

:::

:::eli15

Constraints are fixed limitations imposed on the project that restrict design or implementation choices. They include technology mandates (specific languages or frameworks), regulatory requirements (GDPR, PCI-DSS), business deadlines, platform targets, and interface requirements with existing systems. Unlike regular requirements, constraints are not negotiable -- they are givens that the solution must accommodate.

:::

:::eli20

| Type | Example |
|------|---------|
| Technology | "Must use Java 17 and Spring Boot" |
| Regulatory | "Must comply with GDPR Article 17" |
| Business | "Must launch before September" |
| Platform | "Must run on Android 12+" |
| Interface | "Must integrate with existing SAP system" |

:::

## Requirement Quality Criteria

:::eli10

A good requirement is clear (only one meaning), testable (you can prove it works), complete (no missing pieces), and does not contradict other requirements. Bad requirements are vague like "the system should be fast" -- good ones say exactly what "fast" means with a number.

:::

:::eli15

Good requirements meet several quality criteria: they must be unambiguous (single interpretation), testable (you can write a pass/fail test), complete (all conditions specified), consistent (no conflicts), traceable (linked to source and tests), feasible (technically achievable), prioritised, and modifiable (easy to change). Poor requirements lead to implementation errors, scope disputes, and untestable deliverables. Writing measurable, specific requirements is a core skill.

:::

:::eli20

A **good** requirement is:

| Quality | Meaning | Bad Example | Good Example |
|---------|---------|-------------|--------------|
| **Unambiguous** | Single interpretation | "Fast response" | "Response within 200ms at 95th percentile" |
| **Testable** | Can write a pass/fail test | "User-friendly" | "New user completes registration in < 3 min" |
| **Complete** | All conditions specified | "System sends notification" | "System sends email notification within 5 min of order confirmation" |
| **Consistent** | No conflicts with other reqs | FR-12 says "email only" but FR-15 says "SMS and email" | Resolve contradiction |
| **Traceable** | Linked to source and tests | Orphan requirement | "Derived from BR-3; verified by TC-45" |
| **Feasible** | Technically achievable | "100% uptime" | "99.99% uptime" |
| **Ranked** | Priority assigned | No priority | "Priority: Must Have" |
| **Modifiable** | Easy to change without side effects | Requirements scattered in prose | Numbered, atomic, in a structured table |

:::

## Common NFR Categories (ISO 25010)

:::eli10

ISO 25010 is an international standard that lists all the quality aspects software should have: how fast it is, how well it plays with others, how easy to use, how reliable, how secure, how easy to maintain, and how portable. It is like a report card with different subjects for your software.

:::

:::eli15

ISO 25010 provides a standardised taxonomy of software quality characteristics. It breaks quality into categories (performance efficiency, compatibility, usability, reliability, security, maintainability, portability) each with sub-characteristics. Using this standard ensures comprehensive NFR coverage and provides a shared vocabulary when discussing quality attributes with stakeholders.

:::

:::eli20

| Characteristic | Sub-characteristics |
|---------------|-------------------|
| Performance efficiency | Time behaviour, resource utilisation, capacity |
| Compatibility | Co-existence, interoperability |
| Usability | Learnability, operability, accessibility |
| Reliability | Maturity, availability, fault tolerance, recoverability |
| Security | Confidentiality, integrity, non-repudiation, authenticity |
| Maintainability | Modularity, reusability, analysability, modifiability, testability |
| Portability | Adaptability, installability, replaceability |

:::

## Writing Measurable NFRs

:::eli10

To make non-functional requirements useful, you need numbers. Instead of "the system should be fast," say "it must respond in under 500 milliseconds, we aim for under 200, and ideally under 100." The Planguage approach gives you a scale, a way to measure, and three levels: minimum acceptable, target, and ideal.

:::

:::eli15

The Planguage approach (by Tom Gilb) makes NFRs measurable by specifying: a Scale (unit of measurement), a Meter (how to measure it), a Must level (minimum acceptable), a Plan level (target), and a Wish level (ideal). This transforms vague quality statements into testable specifications with clear pass/fail thresholds. It also allows stakeholders to negotiate between different quality levels based on cost and feasibility.

:::

:::eli20

Use the **Planguage** approach (Tom Gilb):

| Element | Purpose | Example |
|---------|---------|---------|
| Scale | Unit of measurement | Response time in milliseconds |
| Meter | How to measure | Measured at server under load test with 500 users |
| Must | Minimum acceptable | Must: < 500ms |
| Plan | Target | Plan: < 200ms |
| Wish | Ideal | Wish: < 100ms |

<details><summary>Practice: Classify requirements</summary>

Classify each as Functional (FR), Non-Functional (NFR), or Constraint (C):

1. "The system shall generate a monthly sales report."
2. "The system shall handle 5000 simultaneous connections."
3. "The system must be implemented in Python."
4. "Users shall be able to filter products by category."
5. "The system shall encrypt all data at rest using AES-256."
6. "The system must comply with PCI-DSS."
7. "System availability shall be 99.95%."

**Answers:**
1. FR — describes a function (report generation)
2. NFR — performance/capacity quality
3. C — technology constraint
4. FR — describes a user action
5. FR (security function) — but also satisfies an NFR (security quality)
6. C — regulatory constraint
7. NFR — reliability/availability

</details>

<details><summary>Practice: Fix bad requirements</summary>

Rewrite to make testable and unambiguous:

1. "The system should be fast."
2. "The interface should be easy to use."
3. "The system must handle many users."

**Model answers:**
1. "The system shall respond to search queries within 300ms at the 95th percentile under a load of 1000 concurrent users."
2. "A new user shall complete the account registration process in fewer than 3 minutes without external assistance."
3. "The system shall support at least 10,000 concurrent authenticated sessions without degradation below the specified response time SLA."

</details>

:::
