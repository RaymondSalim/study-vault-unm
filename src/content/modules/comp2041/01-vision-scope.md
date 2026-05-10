---
title: "Vision & Scope Document"
order: 1
moduleTitle: "COMP2041 - Software Specification"
tags: ["vision", "scope", "stakeholders", "business-requirements", "problem-statement"]
---

## Purpose

The Vision & Scope document defines **what** the project aims to achieve and **boundaries** of what will (and won't) be built. It is the first artefact produced before detailed requirements.

## Document Structure

| Section | Content |
|---------|---------|
| Business Requirements | High-level objectives, success metrics |
| Problem Statement | The pain/gap the system addresses |
| Stakeholders | Anyone affected by or influencing the project |
| Vision Statement | Concise description of the desired end state |
| Scope | Features in/out of scope for the release |
| Assumptions & Dependencies | Things assumed true; external factors |
| Constraints | Budget, time, technology, regulatory limits |

## Problem Statement Template

> The problem of **[describe problem]**
> affects **[stakeholders]**
> the impact of which is **[consequence]**
> a successful solution would **[key benefit]**

## Stakeholders

| Role | Interest |
|------|----------|
| End Users | Usability, functionality |
| Customers (buyers) | Cost, ROI, compliance |
| Developers | Feasibility, clarity |
| Testers | Testability |
| Project Manager | Schedule, budget |
| Regulators | Compliance |

### Stakeholder Analysis Tips

- Identify **all** stakeholder classes early — missing one leads to missing requirements.
- Document their authority level (decision-maker vs. consulted).
- Note conflicts of interest between stakeholders.

## Business Requirements vs Features

| Business Requirement | Feature(s) that satisfy it |
|---------------------|---------------------------|
| "Reduce order processing time by 40%" | Automated validation, batch processing |
| "Expand to mobile customers" | Responsive UI, native app |
| "Meet GDPR compliance" | Consent management, data export, deletion |

Business requirements are **measurable goals**; features are capabilities the system provides to meet those goals.

## Scope Definition

Use an **in/out list** to set clear boundaries:

| Feature | In Scope | Out of Scope |
|---------|----------|--------------|
| User registration | Yes | — |
| Payment processing | Yes (credit card) | Cryptocurrency |
| Admin analytics | Basic dashboard | ML predictions |
| Multi-language | — | Deferred to v2 |

## Context Diagram

A context diagram shows the system as a single box with external entities (actors, other systems) connected by data flows. It visually defines scope.

Key elements:
- **System boundary** — single process node
- **External entities** — users, hardware, third-party systems
- **Data flows** — arrows labelled with information exchanged

<details><summary>Practice: Write a problem statement</summary>

**Scenario:** A university library's physical reservation system causes students to queue for 20+ minutes during peak hours.

Write a problem statement using the template above.

**Model answer:**
> The problem of **long queuing times for book reservations**
> affects **students and library staff**
> the impact of which is **wasted student time and staff overwhelm during peak periods**
> a successful solution would **allow online reservation with real-time availability, eliminating physical queues**

</details>

<details><summary>Practice: Identify stakeholders</summary>

**Scenario:** An online food ordering system for a university campus.

List at least 5 stakeholder classes and their primary interest.

**Model answer:**

| Stakeholder | Primary Interest |
|-------------|-----------------|
| Students (end users) | Easy ordering, fast delivery |
| Food vendors | Order accuracy, payment |
| University admin | Revenue share, campus policy |
| Delivery staff | Clear instructions, fair workload |
| IT department | Integration, maintenance |
| Finance office | Transaction records, audit |

</details>
