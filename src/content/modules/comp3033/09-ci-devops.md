---
title: "SQA Management"
order: 9
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["sqa-management", "quality-plan", "organisational", "project-level", "process-improvement"]
---

## SQA Scope: Two Levels

| Level | Focus | Delivers |
|-------|-------|----------|
| **Organisational** | Company-wide policies, processes, culture | SQA infrastructure |
| **Project** | Specific project quality goals & activities | SQA plan |

## Organisational Level SQA

### How to Focus an Organisation on Quality

1. **Define a quality policy** — outline importance of quality
2. **Establish SQA processes** — verification, validation procedures
3. **Define SQA roles** — QA manager, QA analyst, software tester
4. **Establish management oversight** — reports, reviews, feedback
5. **Devise improvement process** — continuous improvement of SQA infrastructure

### Quality Policy Contents (Example: BQS Ltd.)

- Principal goal: fully comply with customer requirements and expectations
- Maximum priority to customer satisfaction
- Performing tasks correctly the first time (minimise rework)
- Ensuring professional level of employees
- QA activities throughout the software life cycle
- Applying QA standards to subcontractors
- Continuous improvement of productivity and SQA effectiveness

## Project Level SQA

### Two Teams, Two Processes

| Team | Focus | Independence |
|------|-------|-------------|
| **Software Engineering (SE) team** | Development | Builds the product |
| **Quality Assurance (SQA) team** | Quality oversight | Independent, objective view |

### SQA Team Responsibilities

- Create an SQA plan
- Ensure developers uphold quality standards and follow established process
- Regularly review requirements, specs, design, code
- Control change: document & handle according to procedures
- Measure & analyse project artifacts (metrics)
- Perform quality assurance audits
- Keep records; reporting

### SQA Plan Structure

1. Purpose
2. Reference
3. Software process
4. Software configuration management
5. Problem reporting and corrective actions
6. Tools & technologies
7. Source code management (revision control)
8. Testing methodology
9. Records: collection, maintenance and retention

### SQA Plan: Key Decisions

- Which organisational standards apply to this project?
- Most important quality attributes (from ISO 25010)?
- Error reporting and tracking techniques?
- Documents to be produced by SQA team?
- Forms of feedback to SE team?

## SQA Plan vs Project Plan

| SQA Plan | Project Plan |
|----------|-------------|
| Activities by SQA team | Tasks by project team |
| Ensure outcomes align with quality objectives | Scheduling development tasks |
| Focus on quality assurance | Focus on delivery |
| Both plans are tightly connected and must be coordinated |

## SQA Activities

| Activity | Type | Description |
|----------|------|-------------|
| Product audit | Evaluation | Review deliverable, identify deviations, verify corrections |
| Process audit | Monitoring | Review SE activities against SQA plan |
| Code inspection | Detect | Walkthroughs, formal reviews |
| Design inspection | Detect | Review design artifacts |
| Simulation | Validate | Simulate real-life scenarios |
| Static analysis | Detect | Automated code analysis |
| Testing | Detect & Fix | Working with developers and customers |

## Integrating SQA into Development

### For Each Development Phase: Three Activities

| Activity | Description |
|----------|-------------|
| **Action** | Test the product or artifacts created during this phase |
| **Design** | Use development artifacts to prepare future tests |
| **Influence** | Use insights to improve subsequent development activities |

### By Phase

| Phase | Action | Design | Influence |
|-------|--------|--------|-----------|
| Requirements | Evaluate: correct, complete, testable? | Prepare acceptance/system tests | Influence architecture toward testability |
| Design | Verify mapping between specs and design | Prepare integration & unit tests | Influence UI toward usability |
| Implementation | Perform unit testing, meet coverage criteria | Refine integration/system tests | Early testing enables early integration |
| Integration/Deploy | Integration, system, acceptance testing | Refine tests, increase coverage | Ensure conformance to requirements |
| Operation/Maintenance | Regression testing | Refine tests | Influence toward maintainability |

## Human Factors in Testing

- **Quality-driven mindset**: if you can't test it, don't build it
- Begin testing early
- Oppose shortcuts that diminish quality
- Manage test artifacts: up-to-date, under revision control, easily available
