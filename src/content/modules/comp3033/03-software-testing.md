---
title: "Software Testing Fundamentals"
order: 3
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["testing", "verification", "validation", "fault-error-failure", "levels", "v-model"]
---

## Verification & Validation (V&V)

| | Verification | Validation |
|-|-------------|-----------|
| **Definition (IEEE)** | Products of a phase fulfil established requirements | Software meets intended usage at end of development |
| **Question** | Are we building the product **right**? | Are we building the **right** product? |
| **Involves** | Static analysis, code execution, reviews | Code execution, user testing |
| **Activities** | Reviews, inspections, unit & integration testing | System testing, acceptance testing |
| **Depends on** | Technical knowledge | Domain knowledge |

**Goal of V&V**: Establish confidence that the system is "fit for purpose".

## Fault — Error — Failure

| Term | Definition | Example (banking app: `i <= 5` instead of `i < 5`) |
|------|-----------|--------------------------------------------------|
| **Fault** | Static defect in code (coding mistake) | The `i <= 5` in the for-loop |
| **Error** | Incorrect internal state at runtime | Interest variable holds RM 120 instead of RM 100 |
| **Failure** | Observable incorrect external behaviour | User sees "RM 120" on their statement |

**Causal chain**: Fault → Error → Failure

- Not every fault leads to a failure (fault may not be reached)
- "Bug" is informal and ambiguous — can refer to any of the three

### Notable Software Failures

| Incident | Fault | Consequence |
|----------|-------|-------------|
| Ariane 5 (1996) | 64-bit float → 16-bit integer conversion | Rocket exploded 37s after liftoff |
| Therac-25 | Race condition in radiation therapy machine | Patient deaths from radiation overdose |

## Software Testing

**Definition**: Executing software under controlled conditions to find whether it produces expected results.

### Key Limitations

> Testing can only show the **presence** of failures, not their **absence**.

- Cannot guarantee the system is failure-free
- Cannot prove correct behaviour under all conditions
- Can only establish incorrect behaviour under specific conditions

### Cost of Testing

- Most faults introduced during **requirements and design** phases
- Most faults detected during **system testing and post-deployment**
- Cost of finding & fixing increases exponentially in later phases

**Conclusion**: Detect and eliminate faults as early as possible.

## Levels of Testing

| Level | Tests... | Done by | Corresponds to... |
|-------|----------|---------|-------------------|
| **Unit testing** | Individual methods/functions | Developers | Implementation |
| **Integration testing** | Module interfaces & interactions | Dev/QA team | System design |
| **System testing** | Assembled system vs system requirements | QA team | System requirements |
| **Acceptance testing** | Complete software vs user requirements | QA + users | User requirements |
| **Regression testing** | Updated software retains prior functionality | Dev/QA | Maintenance & evolution |

### Debugging vs Testing

| Debugging | Testing |
|-----------|---------|
| Identify static fault in code | Identify runtime failure |
| Isolate and correct it | Without correcting it |
| By developers who wrote the code | By test engineers |
| Before passing to test engineers | After/alongside implementation |
