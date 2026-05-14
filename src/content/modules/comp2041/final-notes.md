---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP2041 - Software Specification"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: REQUIREMENTS ENGINEERING FUNDAMENTALS

### Vision & Scope Document

Defines **what** the project aims to achieve and **boundaries** of what will/won't be built.

| Section | Content |
|---------|---------|
| Business Requirements | High-level objectives, success metrics |
| Problem Statement | The pain/gap the system addresses |
| Stakeholders | Anyone affected by or influencing the project |
| Vision Statement | Concise desired end state |
| Scope (in/out list) | Features included/excluded for this release |
| Assumptions & Dependencies | Things assumed true; external factors |
| Constraints | Budget, time, technology, regulatory limits |

**Problem Statement Template:**
> The problem of **[problem]** affects **[stakeholders]**, the impact of which is **[consequence]**, a successful solution would **[benefit]**

**Context Diagram:** System as single box, external entities (actors, other systems) connected by labelled data flows. Defines system boundary visually.

---

### Requirements Hierarchy

```
Business Requirements (WHY) → User Requirements (WHAT) → System Requirements (HOW)
                                                          ├── Functional (FR)
                                                          └── Non-Functional (NFR)
```

---

### Functional vs Non-Functional Requirements

| Aspect | Functional (FR) | Non-Functional (NFR) |
|--------|-----------------|---------------------|
| Describes | What the system **does** | How **well** it does it |
| Example | "Allow password reset via email" | "Page loads in < 2s" |
| Testing | Feature-level tests | Performance/load/security tests |
| Violation | Feature missing/broken | System works but poorly |

**TRAP:** "System shall authenticate users" = FR (it's a function). "System shall be secure" = NFR (quality). "System shall encrypt data" = FR (action). "System shall resist attacks for 24hrs" = NFR.

---

### FURPS+ Classification

| Category | Examples |
|----------|---------|
| **F**unctionality | Authentication, search, printing |
| **U**sability | Learnable in < 1hr, consistent UI |
| **R**eliability | 99.9% uptime, MTBF > 1000 hrs |
| **P**erformance | < 200ms response, 10k concurrent users |
| **S**upportability | Modular architecture, CI/CD |
| **+** (constraints) | Must run on Linux, REST API, open-source |

---

### Requirement Quality Criteria (IEEE 830)

| Quality | Bad Example | Good Example |
|---------|-------------|--------------|
| **Unambiguous** | "Fast response" | "Response within 200ms at 95th percentile" |
| **Testable** | "User-friendly" | "New user completes registration in < 3 min" |
| **Complete** | "Sends notification" | "Sends email within 5 min of order confirmation" |
| **Consistent** | Contradicting FRs | All requirements checked for conflicts |
| **Traceable** | Orphan requirement | "Derived from BR-3; verified by TC-45" |
| **Feasible** | "100% uptime" | "99.99% uptime" |
| **Ranked** | No priority | "Priority: Must Have" |
| **Modifiable** | Requirements in prose | Numbered, atomic, structured |

---

### Writing Measurable NFRs (Planguage)

| Element | Example |
|---------|---------|
| Scale | Response time in milliseconds |
| Meter | Measured at server under 500 users |
| Must | < 500ms |
| Plan | < 200ms |
| Wish | < 100ms |

---

### Constraint Types

| Type | Example |
|------|---------|
| Technology | "Must use Java 17 and Spring Boot" |
| Regulatory | "Must comply with GDPR Article 17" |
| Business | "Must launch before September" |
| Platform | "Must run on Android 12+" |
| Interface | "Must integrate with existing SAP system" |

**TRAP:** Design decisions disguised as requirements — "Must use MySQL" is a constraint (if mandated) or a mistake (if a preference). Focus on WHAT not HOW.

---

### Elicitation Techniques

| Technique | Best For | Limitation |
|-----------|----------|------------|
| Interviews | Deep individual insight | Time-consuming, bias |
| Questionnaires | Large groups, quantitative | Low response, no follow-up |
| Observation | Actual workflows, tacit knowledge | Hawthorne effect, time-intensive |
| Workshops (JAD) | Consensus, cross-functional input | Dominant personalities |
| Brainstorming | Creative/innovative features | Hard to converge |
| Prototyping | Clarifying UI/UX, validating ideas | Mistaken for final product |
| Document analysis | Existing systems/regulations | May be outdated |

**Choosing techniques:** Greenfield → workshops, brainstorming, prototyping. Replacing system → observation, document analysis. Can't articulate needs → observation, prototyping. Conflicts → facilitated workshops. Regulatory → document analysis.

---

### Use Cases

| Element | Description |
|---------|-------------|
| UC ID | Unique identifier |
| Primary Actor | Who initiates |
| Preconditions | What must hold before |
| Trigger | Event that starts the UC |
| Main Success Scenario | Happy path (numbered steps) |
| Alternative Flows | Branches from main (e.g., 4a) |
| Exception Flows | Error/failure handling |
| Postconditions | What is true after success |

**Use Case Diagram Relationships:**

| Relationship | Meaning |
|-------------|---------|
| Association (solid line) | Actor participates |
| <<include>> (dashed arrow) | Always includes sub-UC (mandatory) |
| <<extend>> (dashed arrow) | Optionally extends base (conditional) |
| Generalisation (triangle) | Inherits |

**TRAP:** <<include>> = mandatory (Place Order includes Validate Payment). <<extend>> = optional (Place Order extended by Apply Coupon). Test: if base UC makes no sense without it → include.

---

## SIDE 2: DOCUMENTATION, VALIDATION & MANAGEMENT

### SRS Document (IEEE 830)

| Section | Content |
|---------|---------|
| 1.1 Purpose | Why document exists, audience |
| 1.2 Scope | System name, what it does/doesn't do |
| 1.3 Definitions | Glossary |
| 2.1 Product Perspective | Context: standalone/larger system |
| 2.2 Product Functions | High-level summary |
| 2.3 User Characteristics | Who uses it, expertise |
| 2.4 Constraints | Regulatory, hardware, OS |
| 3.1 External Interfaces | UI, hardware, software, comms |
| 3.2 Functional Requirements | Detailed FRs |
| 3.3 Performance | Response time, throughput |
| 3.5 Quality Attributes | Reliability, security, maintainability |

**Language Conventions:** "shall" = mandatory, "should" = recommended, "may" = optional

**SRS Quality:** Correct, Unambiguous, Complete, Consistent, Ranked, Verifiable, Modifiable, Traceable

**TRAP:** Section 2 = high-level context. Section 3 = detailed, numbered, testable requirements. Don't mix them.

---

### Prioritisation

**MoSCoW:**

| Category | Meaning | Guideline |
|----------|---------|-----------|
| **M**ust Have | Essential, unusable without | ~60% of effort max |
| **S**hould Have | Important but workaround exists | Significant value |
| **C**ould Have | Desirable if time/budget allows | Nice-to-have |
| **W**on't Have | Out of scope this release | Acknowledged for future |

**Kano Model:**

| Category | If Present | If Absent |
|----------|-----------|-----------|
| Basic (Must-be) | No extra satisfaction | Strong dissatisfaction |
| Performance (Linear) | Satisfaction increases | Satisfaction decreases |
| Excitement (Delighter) | High satisfaction | No dissatisfaction |

**Key insight:** Over time, Excitement → Performance → Basic (expectations rise)

**TRAP:** Don't make everything "Must Have" — defeats the purpose. Use 60/20/20 guideline.

---

### Validation vs Verification

| | Validation | Verification |
|-|-----------|--------------|
| Question | "Right thing?" | "Thing right?" |
| Checks against | Stakeholder needs | Requirements spec |
| When | Before/during requirements | During development |
| Techniques | Reviews, prototyping, walkthroughs | Testing, inspections, static analysis |

---

### Review Techniques (least → most formal)

| Type | Led by | Purpose |
|------|--------|---------|
| Informal Review | Colleague | Quick check |
| Walkthrough | Author | Educate, get feedback |
| Technical Review | Moderator | Find defects |
| Formal Inspection (Fagan) | Moderator | Systematic defect detection |

**Fagan Inspection Phases:** Planning → Overview → Individual Prep → Inspection Meeting → Rework → Follow-up

**Key rules:** Focus on FINDING defects (not fixing). No management present. Use checklists. Time-limited (max 2hrs).

---

### Traceability

| Direction | From → To | Purpose |
|-----------|-----------|---------|
| Backward | Requirement → Source | Justify existence |
| Forward | Requirement → Design → Code → Test | Ensure implementation |
| Lateral | Requirement → Requirement | Track dependencies |

**Traceability Matrix:** Requirement ID → Source → Design Element → Code Module → Test Case

**Benefits:** Impact analysis, coverage analysis, completeness check, gold-plating detection

**TRAP:** Requirement with no source = gold-plating? Requirement with no test = unverifiable. Test with no requirement = wasted effort.

---

### Change Control Process

1. Change Request submitted
2. Impact Analysis (which reqs affected? cost/schedule/quality?)
3. CCB reviews (PM + Tech Lead + BA + Customer Rep + QA)
4. Decision: Approve / Reject / Defer
5. Update requirements, traceability matrix, communicate

**Baseline:** Formally approved snapshot. After baselining, changes need formal control.

---

### Requirements Testing

**Testability:** If you cannot write a pass/fail test → requirement is flawed (too vague, complex, contradictory, or incomplete)

**Acceptance Criteria (Given-When-Then):**
```
Given [precondition]
When  [action]
Then  [expected outcome]
```

**Deriving test cases:** Identify conditions → boundary values → equivalence classes → normal/alternative/exception flows

**Coverage:** Every requirement has $\geq 1$ test (requirements coverage). Every test maps to a requirement (no gold-plating).

**Acceptance Testing Types:** UAT (users verify), Operational (ops verify deployment), Contractual (formal sign-off), Alpha (internal), Beta (external)

---

### Key Frameworks Summary

| Framework | Purpose |
|-----------|---------|
| IEEE 830 / 29148 | SRS quality attributes & structure |
| MoSCoW | Prioritisation (Must/Should/Could/Won't) |
| Kano | Satisfaction classification |
| Planguage | Measurable NFRs (Scale/Meter/Must/Plan/Wish) |
| FURPS+ | Requirements classification checklist |
| ISO 25010 | Software quality characteristics taxonomy |

---

### Analysis & Modelling

| Model | Best For |
|-------|----------|
| Use cases | User interactions |
| Activity diagrams | Complex workflows with branching/parallelism |
| Domain model | Problem-space concepts and relationships |
| DFD | Data movement through system |
| Class diagram | Object relationships |

**DFD Levels:** Context (Level 0) = one process + externals → Level 1 = decomposed processes → Level 2+ = further detail

**DFD Rules:** Every process needs input AND output. Data stores cannot talk directly to externals. All flows labelled.

**Domain Model:** Identify nouns (concepts) → add verbs (associations) → add attributes → add multiplicity. NOT a design — no methods.

---

### Common Exam Traps

- FR vs NFR: "encrypt data" = FR; "resist attacks" = NFR; "authenticate users" = FR
- <<include>> vs <<extend>>: mandatory vs optional sub-behaviour
- Validation vs Verification: right product vs product right
- Design in requirements: "use MySQL" is constraint or mistake, not a requirement
- MoSCoW: Won't Have ≠ rejected — it's "acknowledged for future"
- Traceability: bidirectional (backward to source, forward to test)
- SRS: Section 2 = overview; Section 3 = detailed specs
- Use cases: ALWAYS include alternative + exception flows in exam answers
