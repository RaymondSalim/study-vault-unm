---
title: "Safety & Reliability"
order: 8
moduleTitle: "COMP3041 - Professional Ethics in Computing"
tags: ["safety", "reliability", "system-failures", "therac-25", "dependability", "software-engineering"]
---

## Core Principle

> Computers are only as good as we humans make them. Computing system errors stem from human errors.

Errors are typically traceable, but moral and legal responsibility is not always easy to establish.

## Causes of Failure in Computing Systems

| Cause | Description |
|-------|-------------|
| Hardware errors | Physical component failure |
| Software errors | Bugs in code |
| Solving the wrong problem | Incorrect requirements/specifications |
| Misuse of the system | Users operating beyond intended parameters |
| Human communication failure | Misunderstanding between stakeholders |
| Human malice | Deliberate sabotage or attack |

## Dependability Attributes

| Attribute | Definition |
|-----------|-----------|
| **Availability** | Ability to deliver service when requested |
| **Reliability** | Ability to deliver services as specified |
| **Safety** | Ability to operate without catastrophic failure |
| **Confidentiality** | Absence of unauthorised disclosure |
| **Integrity** | Absence of improper state alterations |
| **Maintainability** | Ability to undergo repairs and modifications |

## Software Engineering Lifecycle

| Phase | Focus | Ethical Relevance |
|-------|-------|-------------------|
| **Specification** | Define functions and constraints | Are requirements complete and correct? |
| **Development** | Produce working software matching specs | Are corners being cut? |
| **Validation** | Test the software | Is testing adequate? |
| **Evolution** | Modify for changing needs | Is maintenance properly resourced? |

### Validation Principles (Seven Principles of Testing)

1. Testing shows presence of defects (not absence)
2. Exhaustive testing is impossible
3. Early testing is important
4. Defect clustering (bugs tend to cluster)
5. Pesticide paradox (same tests stop finding new bugs)
6. Testing is context-dependent
7. Absence of errors is a fallacy

## Data-Related Failures

### Two Types
1. Wrong data entered into system
2. People incorrectly interpret data they retrieve

### Case Studies

| Case | What Happened | Consequence |
|------|---------------|-------------|
| Florida 2000 election | Voters incorrectly flagged as felons | Thousands wrongly disqualified; may have affected outcome |
| False arrests (Stossier, Hernandez, Rogan) | Database identity confusion | Innocent people arrested, jailed for days |
| NCIC accuracy | FBI exempt from Privacy Act accuracy provisions | More erroneous records → more false arrests |

## Notable Software System Failures

### Patriot Missile (1991)
- Designed as anti-aircraft; used to intercept Scud missiles
- One battery failed to shoot → 28 soldiers killed
- Cause: Designed for few hours' operation; kept running 100+ hours
- Tiny truncation errors accumulated → 0.3433 second clock error → 687m tracking error

### Ariane 5 (1996)
- 40 seconds into maiden flight, rocket self-destructed
- $500 million in uninsured satellites lost
- Cause: Floating-point to integer conversion raised exception (not caught)
- Code reused from Ariane 4 (slower rocket, smaller values — exception was previously impossible)

### AT&T Long-Distance Network
- Half of telephone-routing switches crashed
- 70 million calls not completed; 60,000 lost all service
- Cause: Single line of code in error-recovery procedure
- Propagated through network (all switches running same software)

## Ethical Analyses of System Failures

### Act Utilitarian Analysis: NCIC Database
- Benefits: ~100,000 cars recovered annually ($500M value)
- Harms: ~1 false arrest/year (~$55K compensation)
- Conclusion: Benefits surpass harm → database justified
- BUT: doesn't address the injustice to falsely arrested individuals

### Rule Utilitarian Analysis: E-Retailer Posts Wrong Price
- Amazon UK listed iPad for £7 instead of £275, refused to honour
- Rule: "Company must always honour advertised price"
- Consequences of rule: Higher costs → higher prices for all → few benefit from errors
- Conclusion: Rule has more harms than benefits → Amazon was right to refuse

### Kantian Analysis: E-Retailer Wrong Price
- Buyers knew 97.5% markdown was an error
- They attempted to take advantage (not acting in "good faith")
- Using Amazon as mere means to their end
- Conclusion: Buyers were wrong, not Amazon

## Computer Simulations

### Ethical Importance
- Simulate experiments not possible in real settings (nuclear weapons, oil drills)
- May produce erroneous results from software bugs OR flawed models

### Two Types of Correctness
- **Verification**: Is the program correctly implemented?
- **Validation**: Is the model an accurate representation of reality?

## Key Takeaway

The ability to cause harm is a powerful reason why computing professionals must:
- Act according to ethical principles
- Take personal responsibility for developing ethical decision-making skills
- Ensure adequate testing and validation
- Report concerns about safety and reliability
