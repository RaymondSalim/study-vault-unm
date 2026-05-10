---
title: "Requirements Types & Qualities"
order: 2
moduleTitle: "COMP2041 - Software Specification"
tags: ["functional", "non-functional", "FURPS+", "requirement-qualities", "constraints"]
---

## Requirements Hierarchy

```
Business Requirements (WHY)
  └── User Requirements (WHAT users need to do)
       └── System Requirements (HOW the system does it)
            ├── Functional Requirements
            └── Non-Functional Requirements
```

## Functional vs Non-Functional

| Aspect | Functional (FR) | Non-Functional (NFR) |
|--------|-----------------|---------------------|
| Describes | What the system **does** | How **well** the system does it |
| Example | "System shall allow password reset via email" | "Password reset page loads in < 2s" |
| Violation | Feature is missing/broken | System works but poorly |
| Testing | Feature-level tests | Performance/load/security tests |
| Source | Use cases, user stories | Quality attribute scenarios |

## FURPS+ Classification

| Category | Meaning | Examples |
|----------|---------|----------|
| **F**unctionality | Features, capabilities, security | Authentication, search, printing |
| **U**sability | UX, aesthetics, help, documentation | Consistent UI, accessible, learnable in < 1hr |
| **R**eliability | Availability, failure rate, recovery | 99.9% uptime, MTBF > 1000 hrs |
| **P**erformance | Speed, throughput, capacity | < 200ms response, 10k concurrent users |
| **S**upportability | Maintainability, testability, portability | Modular architecture, CI/CD compatible |
| **+** (additional) | Constraints, interfaces, licensing | Must run on Linux, REST API, open-source licence |

## Constraint Types

| Type | Example |
|------|---------|
| Technology | "Must use Java 17 and Spring Boot" |
| Regulatory | "Must comply with GDPR Article 17" |
| Business | "Must launch before September" |
| Platform | "Must run on Android 12+" |
| Interface | "Must integrate with existing SAP system" |

## Requirement Quality Criteria

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

## Common NFR Categories (ISO 25010)

| Characteristic | Sub-characteristics |
|---------------|-------------------|
| Performance efficiency | Time behaviour, resource utilisation, capacity |
| Compatibility | Co-existence, interoperability |
| Usability | Learnability, operability, accessibility |
| Reliability | Maturity, availability, fault tolerance, recoverability |
| Security | Confidentiality, integrity, non-repudiation, authenticity |
| Maintainability | Modularity, reusability, analysability, modifiability, testability |
| Portability | Adaptability, installability, replaceability |

## Writing Measurable NFRs

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
