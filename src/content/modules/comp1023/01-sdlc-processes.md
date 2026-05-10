---
title: "SDLC Models & Processes"
order: 1
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "SDLC", "waterfall", "agile", "scrum", "spiral", "v-model"]
---

## Software Development Life Cycle (SDLC)

The SDLC defines the phases a software project goes through from conception to retirement.

### Core Phases (Common to All Models)

| Phase | Purpose | Key Output |
|-------|---------|-----------|
| Requirements | Define what the system must do | Requirements specification |
| Design | Define how the system will work | Architecture & design docs |
| Implementation | Build the system | Source code |
| Testing | Verify correctness | Test reports |
| Deployment | Release to users | Running system |
| Maintenance | Fix & evolve post-release | Patches, updates |

---

## Waterfall Model

Sequential, phase-gate approach. Each phase completes fully before the next begins.

```
Requirements → Design → Implementation → Testing → Deployment → Maintenance
     ↓            ↓           ↓              ↓           ↓
  (sign-off)  (sign-off)  (sign-off)    (sign-off)  (sign-off)
```

| Advantages | Disadvantages |
|-----------|--------------|
| Simple to understand & manage | No working software until late |
| Well-documented | Difficult to accommodate change |
| Clear milestones | Customer sees product only at end |
| Works for stable requirements | High risk of late failure |

**Best for:** Well-understood, fixed-requirement projects (e.g., embedded systems, regulatory).

---

## V-Model (Verification & Validation)

Extension of waterfall that pairs each development phase with a corresponding testing phase.

```
Requirements  ←————————→  Acceptance Testing
    Design    ←————————→  System Testing
  Architecture ←———————→  Integration Testing
  Module Design ←——————→  Unit Testing
        Implementation
```

| Left Side (Development) | Right Side (Testing) |
|------------------------|---------------------|
| Requirements analysis | Acceptance testing |
| System design | System testing |
| Architecture design | Integration testing |
| Module design | Unit testing |

**Key insight:** Test planning begins in the corresponding development phase (not after coding).

---

## Iterative / Agile (Scrum)

Deliver working software in short iterations (sprints), embracing change.

### Scrum Framework

| Element | Description |
|---------|------------|
| Sprint | Fixed timebox (1-4 weeks, typically 2) |
| Product Backlog | Prioritised list of all desired features |
| Sprint Backlog | Items selected for the current sprint |
| Increment | Potentially shippable product at sprint end |

### Scrum Roles

| Role | Responsibility |
|------|---------------|
| Product Owner | Manages backlog, represents stakeholders |
| Scrum Master | Facilitates process, removes impediments |
| Development Team | Self-organising, cross-functional (3-9 people) |

### Scrum Events

| Event | Purpose | Timebox |
|-------|---------|---------|
| Sprint Planning | Select & plan sprint work | 2h per sprint week |
| Daily Standup | Sync & identify blockers | 15 min |
| Sprint Review | Demo increment to stakeholders | 1h per sprint week |
| Sprint Retrospective | Improve team process | 45min per sprint week |

### Agile Manifesto Values

| Value (prioritise left) | Over (still has value) |
|------------------------|----------------------|
| Individuals and interactions | Processes and tools |
| Working software | Comprehensive documentation |
| Customer collaboration | Contract negotiation |
| Responding to change | Following a plan |

---

## Spiral Model (Boehm)

Risk-driven model combining iterative development with systematic risk analysis.

```
Each loop through the spiral:
1. Determine objectives, alternatives, constraints
2. Evaluate alternatives, identify & resolve risks
3. Develop & verify next-level product
4. Plan next iteration
```

| Advantages | Disadvantages |
|-----------|--------------|
| Risk analysis at each iteration | Complex to manage |
| Good for large, high-risk projects | Requires risk expertise |
| Flexibility to change | Costly for small projects |
| Early prototypes | Difficult to define completion |

---

## Model Comparison

| Criterion | Waterfall | V-Model | Agile/Scrum | Spiral |
|-----------|-----------|---------|-------------|--------|
| Requirements stability | High | High | Low/changing | Variable |
| Customer involvement | Low (start/end) | Low | High (continuous) | Medium |
| Risk handling | Poor | Medium | Good (early feedback) | Excellent |
| Documentation | Heavy | Heavy | Light | Medium |
| Flexibility | None | None | High | High |
| Project size | Any | Medium-large | Small-medium | Large |
| Delivery | Single (end) | Single (end) | Incremental | Incremental |
| When to use | Stable reqs, regulated | Safety-critical | Evolving reqs, web apps | High-risk, large |

---

## Practice Questions

<details>
<summary>Q: A hospital needs a life-support monitoring system with strict regulatory approval. Which SDLC model is most appropriate and why?</summary>

**V-Model** (or Waterfall). Reasons:
- Requirements are well-defined and unlikely to change
- Regulatory bodies require extensive documentation and traceability
- Each development stage must be formally verified against its corresponding test phase
- Safety-critical systems need rigorous V&V before deployment
</details>

<details>
<summary>Q: A startup is building a social media app where user needs are unclear. Which model fits best?</summary>

**Agile/Scrum**. Reasons:
- Requirements are uncertain and will evolve based on user feedback
- Need to get working software to users quickly to validate assumptions
- Short sprints allow rapid pivoting
- Continuous customer collaboration helps discover actual needs
</details>

<details>
<summary>Q: What distinguishes the Spiral model from pure iterative development?</summary>

The Spiral model explicitly incorporates **risk analysis** at each iteration. Before committing to development in each cycle, the team evaluates alternatives, identifies risks, and may prototype to resolve uncertainties. Pure iterative development repeats build cycles without this formal risk assessment step.
</details>

<details>
<summary>Q: Name three Agile principles that conflict with the Waterfall approach.</summary>

1. **Responding to change over following a plan** - Waterfall freezes requirements early
2. **Working software over comprehensive documentation** - Waterfall produces heavy docs before code
3. **Customer collaboration over contract negotiation** - Waterfall involves customer mainly at start/end
</details>
