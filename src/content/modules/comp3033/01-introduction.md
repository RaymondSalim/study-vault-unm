---
title: "Introduction to SQA"
order: 1
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["sqa", "quality", "introduction", "verification", "validation", "stakeholders"]
---

## What is Software Quality?

:::eli10

Imagine you order a toy from a shop. "Quality" means two things: (1) the toy was built exactly as the instructions say, and (2) you actually enjoy playing with it. Software quality works the same way -- it should match what was planned AND make users happy.

:::

:::eli15
Software quality has two complementary definitions. Crosby (1979) defined it as "conformance to requirements" -- the software does exactly what the specification says. Juran (1970) defined it as "fitness for use" -- the software actually solves the user's problem. Good software quality means meeting both criteria: building to spec AND satisfying users.

:::

:::eli20
| Definition | Author | Focus |
|-----------|--------|-------|
| "Conformance to requirements" | Crosby (1979) | Producer/developer perspective |
| "Fitness for use" | Juran & Gryna (1970) | Customer/user perspective |

These definitions are **complementary**, not contradictory.

:::

## Stakeholders and Quality Perspectives

:::eli10

The people who build software care about following the blueprint correctly (like builders checking their plans). The people who use software care that it actually helps them do what they need. Both groups have different ideas about what "good quality" means.

:::

:::eli15
There are two main stakeholder groups. Producers (developers) ensure the software matches its specification through verification -- "are we building the product right?" Consumers (users) care whether the software solves their real problem through validation -- "are we building the right product?" Additionally, quality can be viewed narrowly (just defect rates) or broadly (including customer satisfaction and process quality).

:::

:::eli20
| Stakeholder | Quality means... | QA Activity |
|-------------|-----------------|-------------|
| Producers (developers) | Conformance to specification | **Verification** |
| Consumers (users) | Fitness for use, solves their problem | **Validation** |

### Two perspectives on quality

- **q** (little q): quality of the product only — defect rate and reliability
- **Q** (big Q): includes product quality, customer satisfaction, and process quality

:::

## SQA Goals: The Three Pillars

:::eli10

Quality assurance has three jobs: (1) make sure you're building the right thing that people actually need, (2) make sure you're building it correctly without mistakes, and (3) make sure the whole project is managed well so it finishes on time.

:::

:::eli15
SQA rests on three pillars. "The right product" ensures the software fits user needs and solves the correct problem. "Done right" ensures it is built following proper standards and processes. "Managed right" ensures the project is coordinated, delivered on time, and stays within budget. All three must be addressed for true quality.

:::

:::eli20
| Pillar | Focus | Ensures... |
|--------|-------|-----------|
| The right product | Product | Fits user needs, solves the right problem |
| Done right | Process | Built correctly, follows standards |
| Managed right | Project | Coordinated, on time, within budget |

:::

## Quality Assurance Strategies

:::eli10

There are two ways to keep software good: (1) prevent mistakes from happening in the first place (like proofreading before you submit homework), and (2) find and fix mistakes after they happen (like a teacher marking your work and you correcting it).

:::

:::eli15
QA uses two complementary strategies. Defect prevention focuses on process -- following standards, conducting reviews, and performing inspections to stop bugs from being introduced. Defect detection focuses on the product -- using testing, monitoring, and verification to find and fix bugs that slipped through. Both strategies should be employed together for the best results.

:::

:::eli20
| Strategy | Focus | Activities |
|----------|-------|-----------|
| **Prevent defects** | Process | Follow standards, reviews, inspections, audits |
| **Detect & fix defects** | Product | Testing, monitoring, formal verification |

Both strategies should be employed together for best outcomes.

:::

## Total Quality Management (TQM)

:::eli10

TQM is like a school that tries to get better at everything it does -- not just teaching, but also how the canteen works, how the playground is maintained, and how students feel. It is about improving everything in the whole organisation to make everyone happy.

:::

:::eli15
Total Quality Management (TQM) is an organisation-wide philosophy focused on continuous improvement of processes, products, services, and work culture. Its ultimate goal is long-term success achieved through customer satisfaction. TQM is not limited to a single team or product -- it encompasses all activities across the entire organisation.

:::

:::eli20
- Improvement of processes, products, services, and work culture
- Long-term success through customer satisfaction
- Encompasses all activities in the organisation

:::

## Assessment Structure

:::eli10

Your grade in this module comes from two parts: a written exam worth 60% and a group project worth 40%. For the group project, your teammates rate how much you contributed, which affects your individual mark.

:::

:::eli15
The module is assessed through a closed-book written exam (60%, 60 minutes) and group coursework (40%, peer-assessed). Your individual coursework mark is calculated by multiplying the group mark by a peer factor, so contribution within the team directly impacts your grade.

:::

:::eli20
| Component | Weight | Format |
|-----------|--------|--------|
| Exam | 60% | Written, 60 minutes, closed book |
| Coursework | 40% | Group practical work (peer-assessed) |

Individual coursework mark = group mark $\times$ peer factor

:::
