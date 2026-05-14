---
title: "SRS Document (IEEE 830/29148)"
order: 5
moduleTitle: "COMP2041 - Software Specification"
tags: ["SRS", "IEEE-830", "IEEE-29148", "documentation", "specification-writing"]
---

## What is an SRS?

:::eli10

An SRS (Software Requirements Specification) is the official rulebook for what the software must do. It is like a very detailed recipe that tells the builders exactly what to make, how well it should work, and all the rules it must follow. If there is a disagreement later, everyone looks at the SRS to settle it.

:::

:::eli15

The SRS is a comprehensive document describing the intended purpose, behaviour, and constraints of a software system. It serves as the contract between stakeholders and the development team -- the authoritative reference for what must be built. It covers functional requirements, non-functional requirements, interfaces, constraints, and assumptions in a structured format that supports traceability and testing.

:::

:::eli20

A **Software Requirements Specification** is a comprehensive description of the intended purpose, behaviour, and constraints of a software system. It serves as the contract between stakeholders and the development team.

:::

## IEEE 830 vs IEEE 29148

:::eli10

IEEE 830 is an older standard that tells you how to write an SRS. IEEE 29148 is the newer version that covers the whole requirements process, not just the document. Most courses still teach 830 because it is simpler, but 29148 is the current official standard.

:::

:::eli15

IEEE 830-1998 was the original SRS standard, now superseded by IEEE 29148:2018. The older standard focused solely on the SRS document structure; the newer standard covers the entire requirements engineering lifecycle and defines a layered document hierarchy (Stakeholder, System, and Software Requirements Specifications). IEEE 29148 also supports iterative and agile approaches rather than only plan-driven development.

:::

:::eli20

| Aspect | IEEE 830-1998 | IEEE 29148:2018 |
|--------|---------------|-----------------|
| Status | Superseded (but still widely taught) | Current standard |
| Scope | SRS only | Full requirements engineering lifecycle |
| Documents | SRS | StRS, SyRS, SRS (layered) |
| Approach | Plan-driven | Compatible with iterative/agile |

**StRS** = Stakeholder Requirements Specification
**SyRS** = System Requirements Specification
**SRS** = Software Requirements Specification

:::

## SRS Template Structure (IEEE 830-based)

:::eli10

The SRS template has three main parts: Introduction (what this document is about), Overall Description (big picture of the system), and Specific Requirements (the detailed list of everything it must do). It is like a book with a preface, overview chapter, and then detailed chapters for each feature.

:::

:::eli15

The IEEE 830-based SRS template has three main sections. Section 1 (Introduction) covers purpose, scope, definitions, and references. Section 2 (Overall Description) provides context: product perspective, major functions, user characteristics, constraints, and assumptions. Section 3 (Specific Requirements) contains the detailed specifications: interfaces, functional requirements, performance, design constraints, and quality attributes. This structure ensures completeness and aids navigation.

:::

:::eli20

| Section | Content |
|---------|---------|
| **1. Introduction** | |
| 1.1 Purpose | Why this document exists, intended audience |
| 1.2 Scope | System name, what it does/doesn't do |
| 1.3 Definitions, Acronyms | Glossary for the document |
| 1.4 References | Related documents, standards |
| 1.5 Overview | Document organisation guide |
| **2. Overall Description** | |
| 2.1 Product Perspective | Context: standalone/part of larger system, interfaces |
| 2.2 Product Functions | High-level summary of major functions |
| 2.3 User Characteristics | Who will use the system, their expertise |
| 2.4 Constraints | Regulatory, hardware, OS, standards |
| 2.5 Assumptions & Dependencies | Things assumed true |
| **3. Specific Requirements** | |
| 3.1 External Interfaces | UI, hardware, software, communication interfaces |
| 3.2 Functional Requirements | Detailed FR specifications |
| 3.3 Performance Requirements | Response time, throughput, capacity |
| 3.4 Design Constraints | Standards compliance, platform limits |
| 3.5 Quality Attributes | Reliability, availability, security, maintainability |
| 3.6 Other Requirements | Anything not covered above |
| **Appendices** | Models, prototypes, analysis results |

:::

## Organising Section 3 (Functional Requirements)

:::eli10

You can organise the detailed requirements list in different ways: by feature, by type of user, by use case, by system mode, or by trigger event. Pick whichever grouping makes it easiest for people to find what they need.

:::

:::eli15

Section 3 (functional requirements) can be organised in several ways depending on the system: by feature (clear feature boundaries), by user class (distinct user types), by use case (use-case-driven development), by mode of operation (normal/maintenance/emergency modes), or by stimulus-response (event-driven systems). The choice affects how easily stakeholders can review and developers can implement from the document.

:::

:::eli20

Several strategies:

| Organisation | When to Use |
|-------------|-------------|
| By feature | Clear feature boundaries |
| By user class | Different user types have distinct needs |
| By use case | Use-case-driven development |
| By mode of operation | System has distinct modes (normal, maintenance, emergency) |
| By stimulus-response | Real-time / event-driven systems |

:::

## Writing Individual Requirements

:::eli10

Each requirement should have an ID number, a clear description using "shall," a reason why it exists, a priority level, and a way to test whether it was built correctly. It is like writing a clear instruction that someone can check off: "Did we do this? Yes or No."

:::

:::eli15

Each individual requirement needs: a unique ID, a clear description using "shall" (mandatory) / "should" (recommended) / "may" (optional), a rationale linking to business need, a priority, the source (who requested it), a fit criterion (how to verify), and dependencies. Avoid subjective terms ("user-friendly"), vague quantifiers ("quickly"), and design decisions disguised as requirements. One atomic requirement per numbered item.

:::

:::eli20

### Format

Each requirement should have:

| Field | Example |
|-------|---------|
| ID | FR-042 |
| Description | "The system shall allow the administrator to disable a user account." |
| Rationale | Needed for security compliance (BR-7) |
| Priority | Must Have |
| Source | Interview with IT Security Manager, 15 Jan |
| Fit Criterion | Account is immediately inaccessible after disable action |
| Dependencies | FR-010 (User Management module) |

### Language Conventions

| Keyword | Meaning (per RFC 2119) |
|---------|----------------------|
| **shall** | Mandatory requirement |
| **should** | Recommended but not mandatory |
| **may** | Optional |
| **will** | Statement of fact / declaration of intent |

**Avoid:** "the system must be able to..." (use "shall"), subjective terms ("user-friendly"), vague quantifiers ("quickly", "many").

:::

## Quality Criteria for an SRS

:::eli10

A good SRS is correct (matches what people actually want), clear (no confusion), complete (nothing missing), consistent (no contradictions), and testable (you can prove each requirement was met). If the SRS is bad, the whole project suffers.

:::

:::eli15

An SRS document should be evaluated against eight quality criteria: correct (accurately reflects needs), unambiguous (single interpretation per requirement), complete (all requirements present, no TBDs), consistent (no contradictions), ranked (priorities assigned), verifiable (every requirement is testable), modifiable (structured for easy change), and traceable (requirements linked to sources and tests). These criteria are assessed during reviews and inspections.

:::

:::eli20

| Criterion | Description |
|-----------|-------------|
| Correct | Accurately reflects stakeholder needs |
| Unambiguous | Each requirement has only one interpretation |
| Complete | All requirements present; no TBDs left |
| Consistent | No conflicting requirements |
| Ranked for importance | Priority assigned |
| Verifiable | Every requirement can be tested |
| Modifiable | Easy to change (structured, no redundancy) |
| Traceable | Each requirement linked to source and forward to design/test |

:::

## Common SRS Pitfalls

:::eli10

Common mistakes include: mixing HOW to build it with WHAT to build (putting design decisions in requirements), using vague words, forgetting to make requirements testable, not linking requirements together (so you cannot track changes), and hiding requirements inside long paragraphs instead of numbering them clearly.

:::

:::eli15

Common SRS pitfalls include: embedding design decisions (constraining implementation unnecessarily), ambiguous language (lacking measurable criteria), incomplete NFRs (discovered too late in development), missing traceability (orphan requirements, missed tests), requirements buried in prose (hard to trace and test), and gold-plating (features without business justification). Each pitfall has specific remediation strategies focused on structure, precision, and linkage.

:::

:::eli20

| Pitfall | Consequence | Fix |
|---------|-------------|-----|
| Mixing design with requirements | Constrains implementation unnecessarily | Focus on WHAT, not HOW |
| Using ambiguous language | Different interpretations | Use "shall" + measurable criteria |
| Incomplete NFRs | Performance issues discovered late | Use Planguage / quantified targets |
| No traceability | Orphan requirements, missed tests | Maintain traceability matrix |
| Requirements in prose paragraphs | Hard to trace and test | One requirement per numbered item |
| Gold-plating | Scope creep | Link every FR to a business requirement |

:::

## SRS Review Checklist

:::eli10

Before declaring the SRS "done," check it against a list of quality checks: Does every requirement have an ID? Is every "shall" testable? Do any requirements contradict each other? Are all vague terms removed? This is like proofreading a school essay with a checklist.

:::

:::eli15

An SRS review checklist ensures systematic quality checking: verify unique IDs, testable "shall" statements, no contradictions, measurable NFRs, resolved TBDs, consistent terminology, source traceability, no embedded design decisions, documented interfaces, and stated assumptions. This checklist is used during formal reviews and inspections to catch defects before they propagate into design and code.

:::

:::eli20

- [ ] Every requirement has a unique ID
- [ ] All "shall" statements are testable
- [ ] No requirement contradicts another
- [ ] NFRs have measurable targets
- [ ] All TBDs resolved or tracked
- [ ] Consistent terminology (matches glossary)
- [ ] Requirements linked to source (stakeholder/document)
- [ ] No design decisions embedded in requirements
- [ ] All interfaces documented
- [ ] Assumptions clearly stated

<details><summary>Practice: Spot the problems</summary>

Identify issues with these SRS excerpts:

1. "FR-1: The system should provide a user-friendly interface that loads quickly."
2. "FR-2: The system shall use React.js for the frontend."
3. "FR-3: The system shall process all transactions."
4. "NFR-1: The system shall be reliable."

**Answers:**
1. **Problems:** "should" (not mandatory), "user-friendly" (subjective/untestable), "quickly" (unmeasurable). **Fix:** "FR-1: The system shall display the dashboard within 2 seconds of login. New users shall complete onboarding in fewer than 5 minutes without assistance."
2. **Problem:** Design decision, not a requirement. **Fix:** Remove or move to constraints section if genuinely mandated: "Constraint-1: The frontend shall be implemented using React.js (mandated by existing team expertise)."
3. **Problem:** Incomplete — which transactions? What does "process" mean? **Fix:** "FR-3: The system shall validate, authorise, and record all customer purchase transactions within 5 seconds of submission."
4. **Problem:** Untestable, no measurable target. **Fix:** "NFR-1: The system shall maintain 99.9% availability measured monthly, with mean time to recovery not exceeding 15 minutes."

</details>

<details><summary>Practice: Write an SRS entry</summary>

Write a complete SRS entry (ID, description, rationale, priority, fit criterion) for: "Users can reset their password."

**Model answer:**

| Field | Content |
|-------|---------|
| ID | FR-015 |
| Description | The system shall allow a registered user to reset their password by receiving a time-limited reset link via their registered email address. |
| Rationale | Users frequently forget passwords; self-service reset reduces support tickets (BR-4). |
| Priority | Must Have |
| Source | Stakeholder workshop, 20 Feb (WS-003) |
| Fit Criterion | (1) Reset email delivered within 60 seconds of request. (2) Link expires after 30 minutes. (3) After reset, old password is invalid immediately. |
| Dependencies | FR-003 (Email service integration), FR-001 (User registration) |

</details>

:::
