---
title: "Negotiation & Validation"
order: 6
moduleTitle: "COMP2041 - Software Specification"
tags: ["MoSCoW", "Kano", "prioritisation", "validation", "review", "inspection", "walkthrough"]
---

## Requirements Negotiation

When stakeholders have **conflicting requirements** or resources are limited, negotiation resolves disagreements and establishes priorities.

### Why Negotiate?

- Stakeholders have different (often opposing) goals
- Budget/time constraints mean not everything can be built
- Technical feasibility may rule out some requests
- Regulatory requirements may override user preferences

### Negotiation Process

1. **Identify conflicts** — map requirements to stakeholders, flag contradictions
2. **Understand rationale** — why does each stakeholder want this?
3. **Assess impact** — cost, time, technical risk of each option
4. **Find compromises** — phased delivery, alternative solutions, partial implementation
5. **Document decisions** — record resolution and reasoning

## Prioritisation Techniques

### MoSCoW Method

| Category | Meaning | Guideline |
|----------|---------|-----------|
| **M**ust Have | Essential — system is unusable without these | Core functionality, legal/safety requirements |
| **S**hould Have | Important but not critical for this release | Significant value, workaround exists |
| **C**ould Have | Desirable if time/budget allows | Nice-to-have, enhances experience |
| **W**on't Have (this time) | Explicitly out of scope for this release | Acknowledged for future consideration |

**Rule of thumb:** Must Haves should not exceed ~60% of total effort for a timeboxed delivery.

### Kano Model

| Category | Description | If Present | If Absent |
|----------|-------------|-----------|-----------|
| Basic (Must-be) | Expected — customers assume these exist | No extra satisfaction | Strong dissatisfaction |
| Performance (Linear) | More is better — directly proportional to satisfaction | Satisfaction increases | Satisfaction decreases |
| Excitement (Delighter) | Unexpected features that impress | High satisfaction | No dissatisfaction |
| Indifferent | Customers don't care either way | No effect | No effect |
| Reverse | Feature actively annoys some users | Dissatisfaction | Satisfaction |

**Key insight:** Over time, Excitement features become Performance, then Basic (expectations rise).

### Other Prioritisation Approaches

| Technique | How It Works |
|-----------|-------------|
| Numerical ranking | Assign 1-10 score to each requirement |
| Pairwise comparison | Compare every pair — which is more important? |
| 100-dollar test | Stakeholders distribute 100 points across requirements |
| Value vs. Cost matrix | Plot on 2x2 grid; prioritise high-value, low-cost |
| Wiegers' method | Score benefit, penalty, cost, risk; compute priority |

## Requirements Validation

Validation ensures requirements are **correct, complete, and reflect true stakeholder needs** ("Are we building the right thing?").

### Validation vs Verification

| Aspect | Validation | Verification |
|--------|-----------|--------------|
| Question | "Are we building the right thing?" | "Are we building it right?" |
| Focus | Requirements match actual needs | Implementation matches requirements |
| When | Before/during requirements phase | During development/testing |
| Techniques | Reviews, prototyping, walkthroughs | Testing, inspections, static analysis |

## Review Techniques

### Informal Review

- Author asks colleagues to read the document
- No formal process or documented outcome
- Quick but may miss systematic issues

### Walkthrough

| Aspect | Description |
|--------|-------------|
| Led by | Author |
| Purpose | Educate reviewers, get feedback |
| Formality | Low-medium |
| Preparation | Reviewers may or may not pre-read |
| Output | Notes, action items (informal) |

### Technical Review

| Aspect | Description |
|--------|-------------|
| Led by | Moderator (not author) |
| Purpose | Find defects, assess conformance |
| Formality | Medium-high |
| Preparation | Reviewers study document beforehand |
| Output | Review report, defect list |

### Formal Inspection (Fagan Inspection)

| Phase | Activity |
|-------|----------|
| Planning | Select material, assign roles, schedule |
| Overview | Author presents context to inspectors |
| Individual Preparation | Each inspector reviews independently, logs issues |
| Inspection Meeting | Moderator leads; reader paraphrases; issues raised (NOT solved) |
| Rework | Author fixes identified defects |
| Follow-up | Moderator verifies fixes |

**Roles:** Moderator, Author, Reader, Inspector(s), Recorder

**Key rules:**
- Focus on **finding** defects, not fixing them
- No management present (avoid blame culture)
- Time-limited meeting (max 2 hours)
- Use checklists

### Inspection Checklist Items

- [ ] Requirements are testable
- [ ] No ambiguous terms (fast, user-friendly, etc.)
- [ ] No conflicts between requirements
- [ ] All requirements traceable to a source
- [ ] NFRs have quantified targets
- [ ] No unnecessary design constraints
- [ ] All stakeholder classes represented
- [ ] Edge cases and error conditions addressed

## Validation Through Prototyping

- Build a prototype (paper, clickable, or functional)
- Demonstrate to stakeholders
- Gather feedback: "Is this what you meant?"
- Iterate until stakeholders confirm correctness
- Discard prototype (unless evolutionary approach)

## Validation Through Modelling

- Create models (use cases, activity diagrams, state machines)
- Walk stakeholders through scenarios using the model
- Identify missing or incorrect behaviour

<details><summary>Practice: MoSCoW classification</summary>

An online exam system has these requirements. Classify each using MoSCoW for the first release (deadline in 8 weeks):

1. Students can log in and take exams.
2. System auto-saves answers every 30 seconds.
3. Exams are timed with countdown display.
4. Students can flag questions to review later.
5. AI-powered plagiarism detection.
6. Support for 10 different question types.
7. System prevents submission after time expires.
8. Dark mode theme option.

**Answers:**
1. **Must** — core functionality
2. **Should** — very important (data loss prevention) but could use manual save as workaround
3. **Must** — exams require time limits
4. **Could** — nice UX but not essential
5. **Won't** — complex, not needed for first release
6. **Should** — start with 3-4 types, expand later
7. **Must** — exam integrity requirement
8. **Won't** — cosmetic, no impact on core functionality

</details>

<details><summary>Practice: Identify review type</summary>

Match each scenario to the appropriate review type:

1. A safety-critical medical device SRS before regulatory submission.
2. A developer asks a colleague to "look over" their user stories before sprint planning.
3. The requirements analyst presents the SRS to the development team to ensure understanding.

**Answers:**
1. **Formal Inspection** — safety-critical, regulatory, needs documented evidence
2. **Informal Review** — quick peer check, no formal process
3. **Walkthrough** — author-led, purpose is to educate and get feedback

</details>
