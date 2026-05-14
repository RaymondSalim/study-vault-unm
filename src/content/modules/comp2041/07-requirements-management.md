---
title: "Requirements Management"
order: 7
moduleTitle: "COMP2041 - Software Specification"
tags: ["traceability", "change-control", "baselines", "versioning", "requirements-management"]
---

## What is Requirements Management?

:::eli10

Requirements management is keeping track of all your requirements as the project goes on. Things change -- people want new features, old ones get dropped, rules get updated. You need a system to track what changed, why it changed, who approved it, and what else is affected. It is like keeping a living to-do list that never gets lost.

:::

:::eli15

Requirements management is the ongoing process of controlling, tracking, and maintaining requirements throughout the project lifecycle. It handles the reality that requirements change due to evolving business needs, stakeholder refinements, technical discoveries, and regulatory updates. Key activities include baselining (freezing approved versions), change control (evaluating and approving changes), traceability (linking requirements to source, design, and tests), and status tracking.

:::

:::eli20

The ongoing process of **controlling, tracking, and maintaining** requirements throughout the project lifecycle. It handles the reality that requirements change.

:::

## Key Activities

:::eli10

The main jobs are: locking in an agreed version (baselining), evaluating and approving changes (change control), linking requirements to their source, code, and tests (traceability), watching how each requirement is progressing (status tracking), keeping a history of changes (versioning), and figuring out what else breaks when something changes (impact analysis).

:::

:::eli15

Requirements management encompasses six key activities: baselining (freezing approved requirement snapshots), change control (structured evaluation and approval of proposed changes), traceability (bidirectional linking between requirements, sources, design, code, and tests), status tracking (monitoring each requirement through its lifecycle), version control (maintaining change history), and impact analysis (assessing the ripple effects of proposed changes on related artefacts).

:::

:::eli20

| Activity | Purpose |
|----------|---------|
| Baselining | Freeze an approved version of requirements |
| Change control | Evaluate and approve/reject changes |
| Traceability | Link requirements to source, design, test |
| Status tracking | Monitor progress of each requirement |
| Version control | Maintain history of changes |
| Impact analysis | Assess effect of proposed changes |

:::

## Requirements Attributes

:::eli10

Each requirement is like a trading card -- it has a name, but also extra information on the back: who asked for it, how important it is, what version it is, who owns it, and whether it has been built and tested yet. This metadata helps you manage hundreds of requirements without losing track.

:::

:::eli15

Every requirement should carry metadata attributes beyond its description: a unique ID, source (who/what originated it), priority, status (proposed through verified), version number, owner, rationale, risk level, and target release. These attributes enable filtering, sorting, reporting, and management of large requirement sets. They also support traceability and change impact analysis.

:::

:::eli20

Each requirement should carry metadata:

| Attribute | Values/Description |
|-----------|-------------------|
| Unique ID | FR-001, NFR-012 |
| Description | The requirement text |
| Source | Stakeholder, document, workshop |
| Priority | Must/Should/Could/Won't |
| Status | Proposed, Approved, Implemented, Verified, Deleted |
| Version | 1.0, 1.1, 2.0 |
| Owner | Who is responsible |
| Rationale | Why this requirement exists |
| Risk | High/Medium/Low |
| Release | Which release it targets |

:::

## Traceability

:::eli10

Traceability is being able to follow a requirement backwards (who asked for it and why) and forwards (where is it in the code, and which test checks it). It is like a thread connecting everything together so if you pull one thing, you can see everything connected to it.

:::

:::eli15

Traceability is the ability to follow a requirement backward to its source (stakeholder, regulation) and forward to its implementation (design, code, test cases). A traceability matrix maps these relationships in a table. Benefits include: impact analysis (what is affected by a change), coverage analysis (find untested requirements), completeness checking (every business need maps to at least one FR), and gold-plating detection (code without requirement justification). The main challenge is cost of maintenance.

:::

:::eli20

### What is Traceability?

The ability to follow a requirement **backward** (to its source) and **forward** (to design, code, and test).

### Traceability Directions

| Direction | From → To | Purpose |
|-----------|-----------|---------|
| Backward (pre-RS) | Requirement → Source (stakeholder, regulation) | Justify existence |
| Forward (post-RS) | Requirement → Design → Code → Test | Ensure implementation and verification |
| Lateral | Requirement → Requirement | Track dependencies |

### Traceability Matrix

A table mapping relationships between artefacts:

| Requirement | Source | Design Element | Code Module | Test Case |
|-------------|--------|---------------|-------------|-----------|
| FR-001 | WS-003 (Workshop) | Class: AuthService | auth.py | TC-001, TC-002 |
| FR-002 | INT-005 (Interview) | Class: OrderProcessor | orders.py | TC-010 |
| NFR-001 | REG-001 (GDPR) | Architecture: encryption layer | crypto.py | TC-050 |

### Benefits of Traceability

- **Impact analysis:** Change FR-001 → know which design, code, tests are affected
- **Coverage analysis:** Identify untested requirements or unjustified code
- **Completeness check:** Every business requirement maps to at least one FR
- **Gold-plating detection:** Code/features with no requirement link

### Traceability Challenges

| Challenge | Mitigation |
|-----------|-----------|
| Expensive to maintain | Use tools (DOORS, Jama, ReqIF) |
| Becomes outdated | Integrate into change control process |
| Granularity mismatch | Define clear traceability strategy upfront |
| Overhead perceived as waste | Demonstrate value through impact analysis examples |

:::

## Change Control

:::eli10

Change control is the process for deciding whether to accept or reject a requested change. Someone fills out a request, experts figure out how big the change is, a decision board says yes or no, and if approved, everything gets updated properly. This prevents random changes from breaking the project.

:::

:::eli15

Change control provides a structured process for managing requirement changes after baselining. A change request is submitted, impact analysis determines cost/schedule/quality effects, the Change Control Board (CCB) reviews and decides (approve/reject/defer), and if approved, the requirements, traceability matrix, and affected artefacts are updated. This prevents uncontrolled scope creep while allowing necessary evolution. The CCB typically includes the project manager, technical lead, business analyst, customer representative, and QA lead.

:::

:::eli20

### Why Requirements Change

- Business environment changes
- Stakeholders refine understanding
- Technical discoveries (infeasible requirement)
- Regulatory updates
- Market shifts

### Change Control Process

```
1. Change Request submitted
2. Impact Analysis performed
   - Which requirements affected?
   - Cost/schedule/quality impact?
   - Technical feasibility?
3. Change Control Board (CCB) reviews
4. Decision: Approve / Reject / Defer
5. If approved:
   - Update requirements (new version)
   - Update traceability matrix
   - Communicate to affected parties
   - Re-baseline if needed
```

### Change Control Board (CCB)

| Role | Responsibility |
|------|---------------|
| Project Manager | Schedule/resource impact |
| Technical Lead | Feasibility assessment |
| Business Analyst | Requirements impact |
| Customer Representative | Business value judgement |
| QA Lead | Testing impact |

### Change Request Form

| Field | Content |
|-------|---------|
| CR ID | CR-015 |
| Date | 2025-03-10 |
| Requester | Jane Smith (Marketing) |
| Description | Add social media login option |
| Rationale | Reduce registration abandonment by 30% |
| Requirements affected | FR-001, FR-003 |
| Impact assessment | +2 weeks dev, +1 week test |
| Priority | Should Have |
| Decision | Approved for Release 2 |

:::

## Baselines

:::eli10

A baseline is like taking a "save game" of your requirements at a specific point. Once saved, any changes require going through the official change process. You can always look back at older saves to see what changed and when.

:::

:::eli15

A baseline is a formally approved snapshot of requirements at a point in time. After baselining, changes require formal change control. Baselines are established at key milestones: after elicitation, after validation/review, before development sprints, and after change approvals. They provide a stable reference point for development and a comparison point for measuring requirements volatility.

:::

:::eli20

A **baseline** is a formally approved snapshot of the requirements at a point in time. After baselining:
- Changes require formal change control
- Previous baseline preserved for comparison
- All subsequent work references the baseline version

### When to Baseline

| Milestone | Baseline Content |
|-----------|-----------------|
| After elicitation phase | Initial requirements set |
| After validation/review | Reviewed and approved SRS |
| Before development sprint | Sprint backlog requirements |
| After change approval | Updated requirements set |

:::

## Requirements Status Tracking

:::eli10

Each requirement goes through stages like a package delivery: proposed (requested), analysed (checked), approved (accepted), implemented (coded), verified (tested), or rejected/deferred (not now). Tracking these statuses tells you how the project is progressing.

:::

:::eli15

Requirements move through lifecycle states: proposed, analysed, approved, implemented, verified, deferred, rejected, or deleted. Status dashboards provide metrics like percentage implemented/verified, open change requests, requirements churn rate (scope stability indicator), and orphan requirements (not linked to tests). These metrics give project managers visibility into progress and risk.

:::

:::eli20

| Status | Meaning |
|--------|---------|
| Proposed | Identified but not yet reviewed |
| Analysed | Assessed for feasibility and impact |
| Approved | Accepted by CCB / stakeholders |
| Implemented | Code written |
| Verified | Tests passed |
| Deferred | Postponed to future release |
| Rejected | Will not be implemented |
| Deleted | Removed from scope |

### Status Dashboard Metrics

| Metric | What it shows |
|--------|--------------|
| % requirements implemented | Development progress |
| % requirements verified | Testing progress |
| # open change requests | Volatility indicator |
| Requirements churn rate | Stability of scope |
| Orphan requirements | Reqs not linked to any test |

:::

## Tools for Requirements Management

:::eli10

You can track requirements in anything from a simple spreadsheet to expensive enterprise tools. Big tools like IBM DOORS handle traceability and versioning automatically, while smaller teams might use Jira or spreadsheets. The right tool depends on how big and formal your project is.

:::

:::eli15

Requirements management tools range from basic spreadsheets to enterprise solutions. Tools like IBM DOORS and Jama Connect provide sophisticated traceability, baselining, access control, and collaboration features. Integrated ALM tools (Azure DevOps, Jira with plugins) combine requirement tracking with development workflows. The choice depends on project size, formality level, budget, and team distribution. Even spreadsheets work for small projects if used disciplined.

:::

:::eli20

| Tool | Type | Features |
|------|------|----------|
| IBM DOORS | Enterprise | Traceability, baselines, access control |
| Jama Connect | Cloud/Enterprise | Collaboration, traceability, reviews |
| Helix RM | Enterprise | Integration with ALM tools |
| Azure DevOps | Integrated ALM | Work items, boards, traceability |
| Jira + plugins | Agile | Story tracking, linking |
| Spreadsheets | Basic | Accessible but limited traceability |

<details><summary>Practice: Build a traceability matrix</summary>

Given these artefacts, create a traceability matrix:

**Business Requirements:**
- BR-1: Reduce customer support calls by 25%

**Functional Requirements:**
- FR-1: System shall provide a searchable FAQ
- FR-2: System shall offer live chat with AI bot
- FR-3: System shall allow users to reset password without calling support

**Test Cases:**
- TC-1: Verify FAQ search returns relevant results
- TC-2: Verify AI bot responds within 5 seconds
- TC-3: Verify password reset email is sent within 60 seconds

**Model answer:**

| Business Req | Functional Req | Test Case |
|-------------|---------------|-----------|
| BR-1 | FR-1 | TC-1 |
| BR-1 | FR-2 | TC-2 |
| BR-1 | FR-3 | TC-3 |

All three functional requirements trace back to the same business requirement (reducing support calls). Each has at least one test case for verification coverage.

</details>

<details><summary>Practice: Impact analysis</summary>

**Change Request:** "Add two-factor authentication to login."

Identify:
1. Which existing requirements might be affected?
2. What new requirements might be needed?
3. What non-requirements artefacts are impacted?

**Model answer:**
1. **Affected existing:** FR for login (modified flow), NFR for response time (additional step), NFR for availability (new dependency on SMS/authenticator service)
2. **New requirements:** FR for 2FA setup, FR for backup codes, FR for 2FA recovery, NFR for SMS delivery time, constraint on supported authenticator apps
3. **Non-requirements artefacts:** UI mockups (new screens), architecture (new service), test cases (new + modified), user documentation, training materials

</details>

:::
