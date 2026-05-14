---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP1023 - Software Engineering"
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

## SIDE 1: SDLC, REQUIREMENTS & USE CASES

### SDLC Models

| Model | Approach | Best For | Key Weakness |
|-------|----------|----------|--------------|
| **Waterfall** | Sequential, phase-gate | Stable reqs, regulated systems | No working SW until late; hard to change |
| **V-Model** | Waterfall + paired testing | Safety-critical systems | Same inflexibility as waterfall |
| **Agile/Scrum** | Iterative, 2-week sprints | Evolving reqs, web apps | Light documentation |
| **Spiral** | Risk-driven iteration | Large, high-risk projects | Complex, needs risk expertise |

**Waterfall phases:** Requirements -> Design -> Implementation -> Testing -> Deployment -> Maintenance

**V-Model pairing:** Requirements <-> Acceptance Testing | System Design <-> System Testing | Architecture <-> Integration Testing | Module Design <-> Unit Testing

---

### Scrum Framework

| Element | Description |
|---------|------------|
| Sprint | Fixed timebox (typically 2 weeks) |
| Product Backlog | Prioritised list of all features |
| Sprint Backlog | Items selected for current sprint |
| Increment | Potentially shippable product at sprint end |

**Roles:** Product Owner (manages backlog, represents stakeholders) | Scrum Master (facilitates, removes impediments) | Dev Team (self-organising, 3-9 people)

**Events:** Sprint Planning (select work) | Daily Standup (15 min sync) | Sprint Review (demo to stakeholders) | Retrospective (improve process)

**Agile Manifesto:** Individuals > Processes | Working software > Documentation | Customer collaboration > Contracts | Responding to change > Following a plan

**Trap:** "Agile = no documentation" is WRONG. Agile values working software MORE, not zero docs.

---

### Requirements Engineering

| Phase | Activity | Output |
|-------|----------|--------|
| Elicitation | Gather needs | Raw requirements |
| Analysis | Resolve conflicts | Structured requirements |
| Specification | Document formally | SRS |
| Validation | Check correctness | Validated requirements |
| Management | Track changes | Traceability matrix |

**Functional vs Non-Functional:**

| | Functional (FR) | Non-Functional (NFR) |
|---|-----------------|---------------------|
| What | What system **does** | How well it **performs** |
| Example | "User can log in" | "Login responds in < 2s" |
| Test by | Feature tests | Performance/stress tests |

**NFR Categories (FURPS+):** Functionality | Usability | Reliability | Performance | Supportability

**Elicitation Techniques:** Interviews (deep understanding) | Questionnaires (large groups) | Observation (real workflows) | Workshops/JAD (consensus) | Prototyping (clarify UI) | Document analysis

---

### User Stories & Prioritisation

**Format:** "As a [role], I want [feature], so that [benefit]."

**INVEST criteria:** Independent | Negotiable | Valuable | Estimable | Small | Testable

**Acceptance Criteria (Given-When-Then):**
- Given [precondition], When [action], Then [expected result]

**MoSCoW Prioritisation:**

| Priority | Meaning | Effort guidance |
|----------|---------|-----------------|
| **M**ust have | Essential, system fails without | ~60% |
| **S**hould have | Important but survivable | ~20% |
| **C**ould have | Nice-to-have | ~20% |
| **W**on't have | Out of scope this time | 0% |

**SMART Requirements:** Specific, Measurable, Achievable, Relevant, Time-bound

**Trap:** "The system should be fast" is BAD. "Page loads in < 2s on 4G" is GOOD.

---

### Use Cases

**Elements:** Actor (stick figure) | Use Case (oval) | System Boundary (rectangle) | Association (solid line) | Include (dashed arrow `<<include>>`) | Extend (dashed arrow `<<extend>>`)

| Aspect | `<<include>>` | `<<extend>>` |
|--------|---------------|--------------|
| Direction | Base -> Included | Extension -> Base |
| Mandatory? | Yes, always executed | No, conditional |
| Purpose | Factor out common behaviour | Add optional steps |

**Arrow trap:** Include arrow FROM base TO included. Extend arrow FROM extension TO base.

**Fully-dressed use case:** UC ID | Name | Primary Actor | Preconditions | Postconditions | Main Success Scenario (numbered steps) | Extensions (branching paths) | Trigger

**Scenarios:** Main Success (happy path) | Alternative (valid different path) | Exception (error/failure)

---

## SIDE 2: UML DIAGRAMS, OOP DESIGN & TESTING

### UML Class Diagrams

**Visibility:** `+` Public | `-` Private | `#` Protected | `~` Package

**Relationships (weak to strong):**

| Relationship | Line | Meaning |
|-------------|------|---------|
| Dependency | Dashed arrow | Temporary usage |
| Association | Solid line | "knows about" |
| Aggregation | Solid + hollow diamond $\diamondsuit$ | "has-a" (independent lifecycle) |
| Composition | Solid + filled diamond $\blacklozenge$ | "owns" (dependent lifecycle) |
| Inheritance | Solid + hollow triangle | "is-a" |
| Realisation | Dashed + hollow triangle | "implements" |

**Aggregation vs Composition:**

| | Aggregation ($\diamondsuit$) | Composition ($\blacklozenge$) |
|---|---|---|
| Lifecycle | Independent | Part dies with whole |
| Ownership | Shared possible | Exclusive |
| Delete whole | Parts survive | Parts destroyed |
| Example | Team-Player | Order-OrderLine |

**Diamond placement:** Always on the WHOLE (container) side.

**Multiplicity:** `1` (exactly one) | `0..1` (optional) | `*` / `0..*` (zero+) | `1..*` (one+)

**Reading:** Number near a class = how many of THAT class relate to one of the OTHER.

**Abstract classes:** Italic name or `{abstract}`. **Interfaces:** `<<interface>>` stereotype.

---

### UML Sequence Diagrams

**Elements:** Participant (box at top) | Lifeline (dashed vertical) | Activation bar (thin rectangle) | Message (solid arrow) | Return (dashed arrow) | Destruction (X)

**Message types:** Synchronous (solid, filled head -- caller waits) | Asynchronous (open head -- fire & forget) | Return (dashed) | Self-message (loops back)

**Combined Fragments:**

| Fragment | Meaning | Analogy |
|----------|---------|---------|
| `alt` | If-else (mutually exclusive) | `if/else` |
| `opt` | Optional (no else) | `if` only |
| `loop` | Repetition | `while/for` |
| `break` | Exit enclosing fragment | `break` |
| `par` | Parallel execution | concurrent |
| `ref` | Reference sub-diagram | method call |

**Guards:** `[condition]` in square brackets control when messages are sent.

---

### OOP Principles & SOLID

**Four Pillars:** Encapsulation (hide state) | Abstraction (simplify interface) | Inheritance (is-a hierarchy) | Polymorphism (same interface, different behaviour)

**SOLID:**

| | Principle | Meaning | Violation Sign |
|---|-----------|---------|----------------|
| S | Single Responsibility | One reason to change | God class |
| O | Open/Closed | Extend, don't modify | If-else chains for new types |
| L | Liskov Substitution | Subtypes substitutable | Override breaks expectations |
| I | Interface Segregation | Small, focused interfaces | Empty method implementations |
| D | Dependency Inversion | Depend on abstractions | Hard-coded `new` dependencies |

---

### Coupling & Cohesion

| Property | Good | Bad |
|----------|------|-----|
| Coupling (between modules) | Low (loose) | High (tight) |
| Cohesion (within module) | High (focused) | Low (unfocused) |

**Coupling levels (low to high):** Message -> Data -> Stamp -> Control -> Content

**Cohesion levels (high to low):** Functional -> Sequential -> Communicational -> Procedural -> Temporal -> Coincidental

---

### Design Patterns

| Category | Pattern | Intent |
|----------|---------|--------|
| Creational | Singleton | One instance, global access |
| Creational | Factory Method | Subclasses decide creation |
| Structural | Adapter | Convert interface |
| Structural | Decorator | Add behaviour dynamically |
| Behavioural | Observer | One-to-many notification |
| Behavioural | Strategy | Interchangeable algorithms |

---

### Software Testing

**V&V:** Verification = "building product RIGHT" (meets spec) | Validation = "building RIGHT product" (meets needs)

**Testing Levels:**

| Level | Scope | Tests | By |
|-------|-------|-------|-----|
| Unit | Single class/method | Isolation | Developer |
| Integration | Combined modules | Interfaces | Dev/Tester |
| System | Complete system | End-to-end | Test team |
| Acceptance | Business requirements | Fitness | Customer |

**Black-Box Techniques:** Equivalence Partitioning (divide inputs into classes, test one from each) | Boundary Value Analysis (test at edges: min-1, min, min+1, max-1, max, max+1) | Decision Tables | State Transition

**White-Box Coverage (weak to strong):** Statement -> Branch/Decision -> Condition -> Path

**TDD Cycle:** Write failing test -> Implement to pass -> Refactor

**Test Pyramid:** Many unit (fast, cheap) | Fewer integration | Fewest E2E (slow, expensive)

**Integration strategies:** Big Bang (all at once) | Top-down (stubs) | Bottom-up (drivers) | Sandwich

**Key trap:** 100% statement coverage does NOT mean no bugs. Statement coverage is the weakest metric.
