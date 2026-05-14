---
title: "SQA Management"
order: 9
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["sqa-management", "quality-plan", "organisational", "project-level", "process-improvement"]
---

## SQA Scope: Two Levels

:::eli10

Quality assurance works at two levels. The company level is like school rules that apply to everyone (all projects follow these standards). The project level is like a specific class having its own homework rules. Both levels work together to keep things running smoothly.

:::

:::eli15

SQA operates at two levels. The organisational level establishes company-wide policies, processes, and culture -- this is the SQA infrastructure that all projects inherit. The project level defines quality goals and activities specific to a single project, documented in an SQA plan. Both levels are needed: the organisation provides the framework, and the project tailors it to specific needs.

:::

:::eli20

| Level | Focus | Delivers |
|-------|-------|----------|
| **Organisational** | Company-wide policies, processes, culture | SQA infrastructure |
| **Project** | Specific project quality goals & activities | SQA plan |

:::

## Organisational Level SQA

:::eli10

At the company level, you set up the "rules of the game" for everyone: define what quality means for the company, create processes everyone follows, assign people to quality roles, have managers check that quality is maintained, and always look for ways to improve. It is like a school setting up its rules, hiring teachers, and always trying to be a better school.

:::

:::eli15

Organisational-level SQA establishes the infrastructure for all projects. This involves five steps: define a quality policy (importance of quality), establish SQA processes (verification and validation procedures), define SQA roles (QA manager, analyst, tester), establish management oversight (reports, reviews, feedback), and devise an improvement process for continuous enhancement. The quality policy typically emphasises customer satisfaction, doing tasks right the first time, and applying QA throughout the software lifecycle.

:::

:::eli20

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

:::

## Project Level SQA

:::eli10

At the project level, there are two teams: the builders (developers) who make the software, and the quality checkers (QA team) who independently watch over the builders to make sure they are doing good work. The QA team creates a plan, reviews the work, tracks problems, and reports on quality.

:::

:::eli15

At the project level, two independent teams operate: the Software Engineering (SE) team builds the product, while the Quality Assurance (SQA) team provides objective quality oversight. The SQA team creates an SQA plan, ensures developers follow standards, reviews requirements/design/code, manages change control, measures and analyses metrics, performs audits, and maintains records. Their independence ensures objective assessment.

:::

:::eli20

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

:::

## SQA Plan vs Project Plan

:::eli10

The SQA plan and the project plan are like two sides of the same coin. The project plan says "here is what we are building and when." The SQA plan says "here is how we make sure what we build is actually good." They work together but focus on different things.

:::

:::eli15

The SQA plan and project plan serve complementary purposes. The SQA plan describes activities performed by the QA team to ensure quality objectives are met. The project plan describes tasks performed by the development team to schedule and deliver features. Both plans must be tightly coordinated since quality assurance activities depend on the development schedule and vice versa.

:::

:::eli20

| SQA Plan | Project Plan |
|----------|-------------|
| Activities by SQA team | Tasks by project team |
| Ensure outcomes align with quality objectives | Scheduling development tasks |
| Focus on quality assurance | Focus on delivery |
| Both plans are tightly connected and must be coordinated |

:::

## SQA Activities

:::eli10

The QA team does many different activities to keep quality high: they check deliverables (audits), watch how the developers work (process monitoring), read through code carefully (inspections), simulate real scenarios, use automated tools to analyse code, and work with developers on testing. It is like having inspectors who check a building at every stage of construction.

:::

:::eli15

SQA activities include product audits (reviewing deliverables against standards), process audits (monitoring SE activities against the SQA plan), code and design inspections (walkthroughs and formal reviews), simulation of real-life scenarios, static analysis (automated code checking), and testing in collaboration with developers and customers. These activities combine prevention (catching issues in process) with detection (finding defects in products).

:::

:::eli20

| Activity | Type | Description |
|----------|------|-------------|
| Product audit | Evaluation | Review deliverable, identify deviations, verify corrections |
| Process audit | Monitoring | Review SE activities against SQA plan |
| Code inspection | Detect | Walkthroughs, formal reviews |
| Design inspection | Detect | Review design artifacts |
| Simulation | Validate | Simulate real-life scenarios |
| Static analysis | Detect | Automated code analysis |
| Testing | Detect & Fix | Working with developers and customers |

:::

## Integrating SQA into Development

:::eli10

At every stage of building software, the QA team does three things: (1) test what was just built, (2) prepare tests for what comes next, and (3) give advice to make future work better. It is like a coach who watches the game, plans the next practice, and gives tips during halftime.

:::

:::eli15

SQA integrates into each development phase through three parallel activities. Action: test the products created during that phase. Design: use development artifacts to prepare future tests. Influence: use insights gained to improve subsequent development activities. For example, during requirements, you evaluate if requirements are testable, prepare acceptance tests, and influence architecture toward testability.

:::

:::eli20

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

:::

## Human Factors in Testing

:::eli10

Good quality comes from good attitudes. The best rule is: "if you cannot test it, do not build it." Start testing early, do not take shortcuts that hurt quality, and keep all your test materials organised and up to date -- just like keeping your school notes tidy so you can always find what you need.

:::

:::eli15

Human factors significantly impact testing effectiveness. A quality-driven mindset means refusing to build untestable features. Testing should begin early in the lifecycle. Teams must resist shortcuts that diminish quality. Test artifacts should be maintained under revision control, kept up to date, and made easily accessible to the entire team.

:::

:::eli20

- **Quality-driven mindset**: if you can't test it, don't build it
- Begin testing early
- Oppose shortcuts that diminish quality
- Manage test artifacts: up-to-date, under revision control, easily available

:::
