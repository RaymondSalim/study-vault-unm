---
title: "Exam Traps & Common Mistakes"
order: 91
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "exam-prep", "common-mistakes"]
---

## UML Diagram Mistakes

### Class Diagrams

| Trap | Why It's Wrong | Correct Approach |
|------|---------------|-----------------|
| Aggregation diamond on wrong side | Diamond goes on the **whole**, not the part | `Company ◆── Employee` (diamond on Company) |
| Confusing aggregation and composition | "Can the part exist without the whole?" | Composition = part dies with whole; Aggregation = part survives |
| Inheritance arrow pointing to child | Arrow points **to the parent** (superclass) | `Dog ──△──▷ Animal` (triangle on Animal) |
| Missing multiplicity | Makes relationships ambiguous | Always specify both ends |
| Using implementation details in class names | Classes should represent concepts | `UserArrayList` → `UserCollection` |
| Realisation shown as solid line | Realisation (implements) uses **dashed** line | Dashed + hollow triangle |

### Sequence Diagrams

| Trap | Why It's Wrong | Correct Approach |
|------|---------------|-----------------|
| Return arrows as solid lines | Returns are always **dashed** | Use `- - - →` |
| Missing activation bars | Unclear when objects are active | Add rectangles during processing |
| `<<extend>>` arrow going wrong way | Common confusion with include | Extend: Extension → Base; Include: Base → Included |
| Messages without parameters or names | Diagram is meaningless without labels | Always label: `methodName(params)` |
| Actor sending messages to itself | Actors interact with the system, not themselves | Messages go to system objects |

### Use Case Diagrams

| Trap | Why It's Wrong | Correct Approach |
|------|---------------|-----------------|
| Include arrow direction reversed | Base case points TO included case | `PlaceOrder ──<<include>>──▷ Authenticate` |
| Extend arrow direction reversed | Extending case points TO base case | `PrintReceipt ──<<extend>>──▷ Withdraw` |
| Using include for optional behaviour | Include = mandatory | Use extend for optional |
| Describing "how" not "what" | Use cases are goals, not steps | "Process Payment" not "Connect to DB and run SQL" |
| Too many use cases | Makes diagram unreadable | 5-10 use cases per diagram |
| Arrows between actors | Actors communicate via the system | Only connect actors to use cases |

---

## Requirements Mistakes

| Trap | Example | Fix |
|------|---------|-----|
| Vague NFR | "System should be fast" | "Response time < 2s for 95% of requests" |
| Untestable requirement | "System should be user-friendly" | Define measurable usability criteria |
| Solution in requirements | "Use MySQL database" | "System shall persist data reliably" (let design decide how) |
| Missing NFR entirely | Only functional reqs listed | Systematically check FURPS+ categories |
| Gold plating user stories | 500-word user story | Keep stories small (INVEST); details in acceptance criteria |
| Confusing FR and NFR | "System shall be secure" (NFR listed as FR) | Security is a quality attribute → NFR |

---

## SDLC Model Traps

| Trap | Why It's Wrong |
|------|---------------|
| "Agile means no documentation" | Agile values working software MORE than docs, not ZERO docs |
| "Waterfall never works" | Works well for stable requirements (embedded, regulated) |
| "Spiral = iterative" | Spiral's key differentiator is **risk analysis**, not just iteration |
| "V-Model = Waterfall" | V-Model explicitly pairs dev phases with test phases |
| "Scrum = Agile" | Scrum is one Agile framework; Kanban, XP are others |
| Mixing up Scrum roles | Product Owner ≠ Scrum Master ≠ Project Manager |

---

## Testing Traps

| Trap | Why It's Wrong | Correct |
|------|---------------|---------|
| "100% statement coverage = no bugs" | Statement coverage is weakest metric | Even 100% path coverage doesn't guarantee correctness |
| Confusing V&V | "Verification tests the code" | Verification = building it right; Validation = building right thing |
| "Unit tests test units together" | That's integration testing | Unit tests isolate a single class/method |
| BVA without equivalence partitioning | BVA boundaries must come from partitions | Always identify partitions first, then test boundaries |
| "Black-box doesn't need requirements" | Black-box tests AGAINST requirements | Requirements are the oracle for expected behaviour |
| Acceptance = System testing | Different purpose | System = complete system works; Acceptance = meets business needs |

---

## OOP & Design Traps

| Trap | Why It's Wrong | Correct |
|------|---------------|---------|
| "Inheritance = code reuse" | Inheritance is for "is-a", not reuse | Use composition for reuse; inheritance for type hierarchy |
| "More patterns = better design" | Over-engineering | Use patterns to solve actual problems, not preemptively |
| "Encapsulation = making things private" | It's about hiding **implementation**, not just access | Public getters for all fields still exposes internals |
| Confusing abstraction and encapsulation | Related but different | Abstraction = simplify interface; Encapsulation = hide state |
| "Low coupling means no dependencies" | Impossible in real systems | Low coupling = minimal, well-defined dependencies |
| "SRP = one method per class" | SRP is about reasons to change | A class can have many methods if they all serve one responsibility |

---

## Exam Strategy Tips

| Tip | Explanation |
|-----|------------|
| Read the scenario carefully | The answer depends on context (project type, team size, etc.) |
| Justify model choices | Don't just say "use Agile" - explain WHY given the scenario |
| Draw before you write | For UML questions, sketch first, then refine |
| Check arrow directions | Most marks are lost on wrong arrow directions in UML |
| Label everything | Multiplicity, role names, method signatures, stereotypes |
| Use correct terminology | "Verification" vs "validation", "aggregation" vs "composition" |
| Answer what's asked | If asked for a class diagram, don't draw a sequence diagram |
| Time management | Don't spend 30 min on a 5-mark UML diagram |

---

## Quick Self-Test

<details>
<summary>Q: Which direction does the include arrow point?</summary>

From the **base case** TO the **included case**.

Example: `PlaceOrder ──<<include>>──▷ Authenticate`

(The base case "uses" the included behaviour)
</details>

<details>
<summary>Q: Where does the diamond go in composition?</summary>

On the **whole** (container/owner) side.

Example: `House ◆────── Room` (diamond on House because House owns Rooms)
</details>

<details>
<summary>Q: Is "the system shall use PostgreSQL" a good requirement?</summary>

**No.** This is a design/implementation constraint disguised as a requirement. A proper requirement would be: "The system shall persist data with ACID compliance and support concurrent access by 100+ users." The choice of PostgreSQL belongs in design.

Exception: If the client mandates a specific technology (e.g., corporate policy), it becomes a **design constraint** requirement.
</details>

<details>
<summary>Q: What's the difference between verification and validation?</summary>

- **Verification:** "Are we building the product RIGHT?" (conformance to specification)
- **Validation:** "Are we building the RIGHT product?" (meeting actual user needs)

A system can pass verification (matches spec perfectly) but fail validation (spec didn't capture what users actually need).
</details>
