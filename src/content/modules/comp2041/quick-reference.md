---
title: "Quick Reference"
order: 90
moduleTitle: "COMP2041 - Software Specification"
tags: ["reference", "templates", "SRS", "use-case", "MoSCoW", "elicitation"]
---

## SRS Template Outline (IEEE 830)

```
1. Introduction
   1.1 Purpose
   1.2 Scope
   1.3 Definitions, Acronyms, Abbreviations
   1.4 References
   1.5 Overview

2. Overall Description
   2.1 Product Perspective
   2.2 Product Functions
   2.3 User Characteristics
   2.4 Constraints
   2.5 Assumptions and Dependencies

3. Specific Requirements
   3.1 External Interface Requirements
       3.1.1 User Interfaces
       3.1.2 Hardware Interfaces
       3.1.3 Software Interfaces
       3.1.4 Communication Interfaces
   3.2 Functional Requirements
   3.3 Performance Requirements
   3.4 Design Constraints
   3.5 Software System Attributes
       3.5.1 Reliability
       3.5.2 Availability
       3.5.3 Security
       3.5.4 Maintainability
       3.5.5 Portability
   3.6 Other Requirements

Appendices
Index
```

## Use Case Template

| Field | Content |
|-------|---------|
| UC ID | UC-XXX |
| Title | Verb + Noun (e.g., "Place Order") |
| Primary Actor | Who initiates |
| Secondary Actors | Other participants |
| Preconditions | What must be true before |
| Trigger | Event that starts the UC |
| Main Success Scenario | Numbered steps (happy path) |
| Alternative Flows | Branches (e.g., 3a, 4b) |
| Exception Flows | Error handling paths |
| Postconditions | What is true after success |
| Business Rules | Domain constraints |
| NFRs | Quality requirements specific to this UC |
| Frequency | How often this UC occurs |
| Priority | Must/Should/Could |

## Elicitation Technique Comparison

| Technique | Best For | Cost | Depth | Breadth |
|-----------|----------|------|-------|---------|
| Interviews | Individual insight, complex domain | Medium | High | Low |
| Questionnaires | Large groups, confirmation | Low | Low | High |
| Observation | Tacit knowledge, actual workflows | High | High | Low |
| Workshops (JAD) | Consensus, cross-functional | Medium-High | Medium | Medium |
| Brainstorming | Creative ideas, new products | Low | Low | Medium |
| Prototyping | UI/UX clarity, validation | Medium-High | Medium | Medium |
| Document analysis | Existing systems, regulations | Low | Medium | Medium |
| Ethnography | Deep contextual understanding | Very High | Very High | Low |

## MoSCoW Definitions

| Category | Definition | % of Effort (guideline) |
|----------|-----------|------------------------|
| **Must Have** | Non-negotiable; system fails without it | ~60% |
| **Should Have** | Important; painful to leave out but workaround exists | ~20% |
| **Could Have** | Nice to have; only if time/budget allows | ~20% |
| **Won't Have** | Out of scope for this release (acknowledged) | 0% |

## Requirement Quality Checklist (SMART-style)

| Letter | Quality | Test |
|--------|---------|------|
| S | Specific | Does it describe one thing clearly? |
| M | Measurable | Can I write a pass/fail test? |
| A | Achievable | Is it technically feasible? |
| R | Relevant | Does it trace to a business need? |
| T | Time-bound | Is there a deadline or performance target? |

## Keywords for Requirements Writing

| Word | Meaning |
|------|---------|
| shall | Mandatory requirement |
| should | Recommended (not mandatory) |
| may | Optional |
| will | Statement of fact / future intent |
| must | Sometimes used for mandatory (prefer "shall") |

## Requirement Types Quick Reference

| Type | Answers | Example Prefix |
|------|---------|---------------|
| Business Requirement | WHY are we building this? | "The organisation needs to..." |
| User Requirement | WHAT does the user need to do? | "The user shall be able to..." |
| Functional Requirement | WHAT must the system do? | "The system shall..." |
| Non-Functional Requirement | HOW WELL must it perform? | "The system shall [verb] within [measure]" |
| Constraint | WHAT limits the solution? | "The system must use / comply with..." |

## Traceability Matrix Template

| Req ID | Source | Priority | Design | Code | Test | Status |
|--------|--------|----------|--------|------|------|--------|
| FR-001 | WS-01 | Must | D-003 | auth.py | TC-01 | Verified |
| FR-002 | INT-03 | Should | D-007 | orders.py | TC-10 | Implemented |
| NFR-001 | REG-01 | Must | D-001 | crypto.py | TC-50 | Approved |

## Change Request Template

| Field | Content |
|-------|---------|
| CR ID | CR-XXX |
| Date Submitted | YYYY-MM-DD |
| Requester | Name, role |
| Description | What change is requested |
| Rationale | Why it is needed |
| Requirements Affected | List of IDs |
| Impact (effort) | Dev time, test time |
| Impact (schedule) | Delay estimate |
| Priority | Must/Should/Could |
| CCB Decision | Approve/Reject/Defer |
| Decision Date | YYYY-MM-DD |

## Review Types Summary

| Type | Led By | Formality | Key Feature |
|------|--------|-----------|-------------|
| Informal | Author | Low | Quick peer check |
| Walkthrough | Author | Low-Medium | Educate audience |
| Technical Review | Moderator | Medium-High | Find defects |
| Inspection (Fagan) | Moderator | High | Rigorous, role-based, metrics |

## Kano Model Quick Guide

| Category | Customer Reaction (Present) | Customer Reaction (Absent) |
|----------|----------------------------|---------------------------|
| Basic | "Of course it has that" (neutral) | "This is broken!" (very dissatisfied) |
| Performance | "Great, the more the better" | "Not enough" (dissatisfied) |
| Excitement | "Wow, I didn't expect that!" | No reaction (unaware) |

## DFD Elements

| Symbol | Represents | Rules |
|--------|-----------|-------|
| Rectangle | External entity | Cannot connect directly to data store |
| Circle/Rounded rect | Process | Must have input AND output |
| Open rectangle | Data store | Connected only via processes |
| Arrow | Data flow | Must be labelled |
