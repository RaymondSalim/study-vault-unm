---
title: "SRS Document (IEEE 830/29148)"
order: 5
moduleTitle: "COMP2041 - Software Specification"
tags: ["SRS", "IEEE-830", "IEEE-29148", "documentation", "specification-writing"]
---

## What is an SRS?

A **Software Requirements Specification** is a comprehensive description of the intended purpose, behaviour, and constraints of a software system. It serves as the contract between stakeholders and the development team.

## IEEE 830 vs IEEE 29148

| Aspect | IEEE 830-1998 | IEEE 29148:2018 |
|--------|---------------|-----------------|
| Status | Superseded (but still widely taught) | Current standard |
| Scope | SRS only | Full requirements engineering lifecycle |
| Documents | SRS | StRS, SyRS, SRS (layered) |
| Approach | Plan-driven | Compatible with iterative/agile |

**StRS** = Stakeholder Requirements Specification
**SyRS** = System Requirements Specification
**SRS** = Software Requirements Specification

## SRS Template Structure (IEEE 830-based)

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

## Organising Section 3 (Functional Requirements)

Several strategies:

| Organisation | When to Use |
|-------------|-------------|
| By feature | Clear feature boundaries |
| By user class | Different user types have distinct needs |
| By use case | Use-case-driven development |
| By mode of operation | System has distinct modes (normal, maintenance, emergency) |
| By stimulus-response | Real-time / event-driven systems |

## Writing Individual Requirements

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

## Quality Criteria for an SRS

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

## Common SRS Pitfalls

| Pitfall | Consequence | Fix |
|---------|-------------|-----|
| Mixing design with requirements | Constrains implementation unnecessarily | Focus on WHAT, not HOW |
| Using ambiguous language | Different interpretations | Use "shall" + measurable criteria |
| Incomplete NFRs | Performance issues discovered late | Use Planguage / quantified targets |
| No traceability | Orphan requirements, missed tests | Maintain traceability matrix |
| Requirements in prose paragraphs | Hard to trace and test | One requirement per numbered item |
| Gold-plating | Scope creep | Link every FR to a business requirement |

## SRS Review Checklist

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
