---
title: "Vision & Scope Document"
order: 1
moduleTitle: "COMP2041 - Software Specification"
tags: ["vision", "scope", "stakeholders", "business-requirements", "problem-statement"]
---

## Purpose

:::eli10

Before building any software, you need a plan that says "what are we trying to do and how far should we go?" The Vision & Scope document is that plan. It is like deciding what you want to build with LEGO before opening the box -- you write down your goal and which pieces you will and will not use.

:::

:::eli15

The Vision & Scope document defines the project's objectives and boundaries before detailed requirements work begins. It answers: what problem are we solving, who cares about it, what does success look like, and what is included vs excluded from this release. It aligns all stakeholders on a shared understanding and prevents scope creep later.

:::

:::eli20

The Vision & Scope document defines **what** the project aims to achieve and **boundaries** of what will (and won't) be built. It is the first artefact produced before detailed requirements.

:::

## Document Structure

:::eli10

The document has sections for: why we are building it (business goals), what problem exists, who is involved, what we imagine the finished thing looks like, what is included and not included, and what we are assuming. It is like a project proposal a kid might write for a science fair -- purpose, plan, materials, and rules.

:::

:::eli15

The Vision & Scope document typically includes: business requirements (high-level goals and success metrics), a problem statement (the gap or pain being addressed), stakeholder identification, a vision statement (desired end state), scope definition (features in and out), assumptions and dependencies, and constraints (budget, time, technology, regulatory). Each section builds on the previous to give a complete project overview.

:::

:::eli20

| Section | Content |
|---------|---------|
| Business Requirements | High-level objectives, success metrics |
| Problem Statement | The pain/gap the system addresses |
| Stakeholders | Anyone affected by or influencing the project |
| Vision Statement | Concise description of the desired end state |
| Scope | Features in/out of scope for the release |
| Assumptions & Dependencies | Things assumed true; external factors |
| Constraints | Budget, time, technology, regulatory limits |

:::

## Problem Statement Template

:::eli10

A problem statement is like filling in blanks in a sentence: "The problem is ___, it affects ___, the bad result is ___, and a good solution would ___." This makes sure everyone agrees on what is wrong before trying to fix it.

:::

:::eli15

A structured problem statement template ensures clarity: it identifies the specific problem, who it affects, what the negative impact is, and what a successful solution would achieve. This forces the team to articulate the problem precisely before jumping to solutions. It also helps justify the project to decision-makers.

:::

:::eli20

> The problem of **[describe problem]**
> affects **[stakeholders]**
> the impact of which is **[consequence]**
> a successful solution would **[key benefit]**

:::

## Stakeholders

:::eli10

Stakeholders are all the people who care about the project -- users, buyers, builders, testers, managers, and rule-makers. You need to find them all early because if you forget someone, you will miss important requirements and have to redo work later.

:::

:::eli15

Stakeholders include anyone who affects or is affected by the system: end users, customers (who pay), developers, testers, project managers, and regulators. Each has different interests and authority levels. Identifying all stakeholder classes early is critical -- missing one leads to missing requirements. You should document their roles, interests, authority level, and any conflicts between them.

:::

:::eli20

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

:::

## Business Requirements vs Features

:::eli10

Business requirements are the big goals (like "make ordering faster"), while features are the specific things you build to reach those goals (like "add an autofill button"). Goals tell you WHY; features tell you WHAT you will build to get there.

:::

:::eli15

Business requirements are measurable organisational goals (e.g., "reduce processing time by 40%"). Features are the system capabilities built to achieve those goals (e.g., automated validation, batch processing). Every feature should trace back to a business requirement; if it does not, it may be gold-plating. Conversely, every business requirement should be served by at least one feature.

:::

:::eli20

| Business Requirement | Feature(s) that satisfy it |
|---------------------|---------------------------|
| "Reduce order processing time by 40%" | Automated validation, batch processing |
| "Expand to mobile customers" | Responsive UI, native app |
| "Meet GDPR compliance" | Consent management, data export, deletion |

Business requirements are **measurable goals**; features are capabilities the system provides to meet those goals.

:::

## Scope Definition

:::eli10

Scope is like drawing a fence around what you will build. An in/out list clearly says "we WILL build this" and "we will NOT build this." This prevents people from adding more and more things until the project never finishes.

:::

:::eli15

Scope definition uses an explicit in/out list to set clear boundaries on what the system will and will not include for a given release. Features explicitly marked "out of scope" prevent scope creep and manage expectations. Some features may be deferred to a future version rather than rejected entirely. A clear scope definition is essential for realistic planning and delivery.

:::

:::eli20

Use an **in/out list** to set clear boundaries:

| Feature | In Scope | Out of Scope |
|---------|----------|--------------|
| User registration | Yes | — |
| Payment processing | Yes (credit card) | Cryptocurrency |
| Admin analytics | Basic dashboard | ML predictions |
| Multi-language | — | Deferred to v2 |

:::

## Context Diagram

:::eli10

A context diagram is a simple picture showing your system as one box in the middle, with all the outside things (people, other systems) connected to it by arrows showing what information goes in and out. It is like a map showing who talks to whom.

:::

:::eli15

A context diagram visually defines the system boundary by showing the system as a single process node surrounded by external entities (users, hardware, third-party systems). Labelled arrows represent data flows between the system and its environment. It immediately communicates what is inside vs outside the system, making scope tangible for all stakeholders.

:::

:::eli20

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

:::
