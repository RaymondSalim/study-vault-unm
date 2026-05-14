---
title: "Software Testing Fundamentals"
order: 3
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["testing", "verification", "validation", "fault-error-failure", "levels", "v-model"]
---

## Verification & Validation (V&V)

:::eli10

Verification is like checking that you followed the recipe exactly. Validation is like checking that the food you made actually tastes good to the person eating it. You need both -- following the recipe correctly AND making something people enjoy.

:::

:::eli15

Verification asks "are we building the product right?" -- it checks that the software matches its specification through reviews, inspections, and testing. Validation asks "are we building the right product?" -- it checks that the software meets actual user needs through user testing and acceptance testing. Verification requires technical knowledge; validation requires domain knowledge. Both are needed to establish confidence the system is fit for purpose.

:::

:::eli20

| | Verification | Validation |
|-|-------------|-----------|
| **Definition (IEEE)** | Products of a phase fulfil established requirements | Software meets intended usage at end of development |
| **Question** | Are we building the product **right**? | Are we building the **right** product? |
| **Involves** | Static analysis, code execution, reviews | Code execution, user testing |
| **Activities** | Reviews, inspections, unit & integration testing | System testing, acceptance testing |
| **Depends on** | Technical knowledge | Domain knowledge |

**Goal of V&V**: Establish confidence that the system is "fit for purpose".

:::

## Fault — Error — Failure

:::eli10

Think of it like dominoes: A fault is a mistake someone wrote in the code (like a spelling mistake in a recipe). An error is when the computer gets confused because of that mistake (like adding too much sugar). A failure is when the user sees something wrong (like the cake tasting terrible). Mistake leads to confusion leads to a visible problem.

:::

:::eli15

A fault is a static defect in the code -- the actual incorrect line written by the developer. An error is an incorrect internal state that occurs at runtime when that faulty code executes. A failure is the externally observable wrong behaviour that the user sees. The causal chain is Fault leads to Error leads to Failure. Importantly, not every fault leads to a failure because the faulty code may never be reached during execution.

:::

:::eli20

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

:::

## Software Testing

:::eli10

Software testing is like a teacher giving a test to a student -- you give the software specific problems and check if it gives the right answers. But here is the tricky part: even if the software passes every test, you can never be 100% sure there are no hidden mistakes. Testing can only find problems, not prove there are none.

:::

:::eli15

Software testing means executing software under controlled conditions to check whether it produces expected results. A key limitation is that testing can only show the presence of failures, never their absence -- you cannot prove a system is bug-free through testing alone. Additionally, finding and fixing bugs becomes exponentially more expensive in later development phases, so detecting faults early (during requirements and design) is far cheaper than catching them in production.

:::

:::eli20

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

:::

## Levels of Testing

:::eli10

Testing happens in layers, like checking a LEGO build. First you check each individual brick works (unit testing). Then you check bricks connect properly together (integration testing). Then you check the whole model looks right (system testing). Finally, you show it to the person who asked you to build it and ask "is this what you wanted?" (acceptance testing).

:::

:::eli15

Testing is organised into levels that correspond to development phases. Unit testing checks individual functions/methods (done by developers). Integration testing checks that modules interact correctly. System testing verifies the assembled system against requirements (done by QA). Acceptance testing confirms the software meets user needs (done with users). Regression testing ensures updates do not break previously working functionality.

:::

:::eli20

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

:::
