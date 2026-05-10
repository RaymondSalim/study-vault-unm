---
title: "Requirements Management"
order: 7
moduleTitle: "COMP2041 - Software Specification"
tags: ["traceability", "change-control", "baselines", "versioning", "requirements-management"]
---

## What is Requirements Management?

The ongoing process of **controlling, tracking, and maintaining** requirements throughout the project lifecycle. It handles the reality that requirements change.

## Key Activities

| Activity | Purpose |
|----------|---------|
| Baselining | Freeze an approved version of requirements |
| Change control | Evaluate and approve/reject changes |
| Traceability | Link requirements to source, design, test |
| Status tracking | Monitor progress of each requirement |
| Version control | Maintain history of changes |
| Impact analysis | Assess effect of proposed changes |

## Requirements Attributes

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

## Traceability

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

## Change Control

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

## Baselines

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

## Requirements Status Tracking

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

## Tools for Requirements Management

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
