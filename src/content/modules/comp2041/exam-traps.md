---
title: "Exam Traps & Common Mistakes"
order: 91
moduleTitle: "COMP2041 - Software Specification"
tags: ["exam", "mistakes", "pitfalls", "tips"]
---

## Trap 1: Confusing Functional and Non-Functional Requirements

| Mistake | Correction |
|---------|-----------|
| "The system shall be secure" classified as FR | Security as a **quality attribute** is NFR. A specific security function like "encrypt passwords with bcrypt" is FR. |
| "Response time < 2s" classified as FR | Performance is always NFR (how well), not FR (what it does) |
| "System shall authenticate users" classified as NFR | Authentication is a **function** the system performs → FR |

**Rule of thumb:** If you can test it with a feature test (does it do X? yes/no), it's FR. If you need a quality/performance test (how well does it do X?), it's NFR.

**Grey areas to watch:**
- Security: "System shall encrypt data" = FR (it's an action). "System shall resist attacks for 24hrs" = NFR (quality).
- Usability: "System shall provide help tooltips" = FR. "System shall be learnable in < 1hr" = NFR.

## Trap 2: Incomplete Use Cases

| Common Omission | Why It Matters |
|-----------------|---------------|
| No exception flows | Real systems fail; exam expects you to show error handling |
| Missing preconditions | Use case starts in undefined state |
| No postconditions | Can't verify the use case succeeded |
| Steps describe UI details | Use case is at user-goal level, not button clicks |
| Missing actor | Who initiates? Who else participates? |
| No alternative flows | Only showing happy path is incomplete |

**Exam tip:** If asked to write a use case, always include at least one alternative flow and one exception flow, even if the question doesn't explicitly ask for them.

## Trap 3: Writing Untestable Requirements

| What Students Write | Problem | Better Version |
|--------------------|---------|---------------|
| "System shall be user-friendly" | Subjective, no pass/fail test | "90% of users complete checkout in < 4 minutes on first attempt" |
| "System shall be fast" | No measurable target | "Page load < 2s at 95th percentile under 1000 concurrent users" |
| "System shall handle errors" | Which errors? What handling? | "When payment API returns error 500, system shall retry once after 3s, then display message 'Payment service unavailable' and preserve cart" |
| "System shall be reliable" | No metric | "System availability shall be 99.95% measured monthly" |

## Trap 4: Confusing <<include>> and <<extend>>

| Relationship | Meaning | Key Difference |
|-------------|---------|----------------|
| <<include>> | Base UC **always** includes the sub-UC | Mandatory, extracted for reuse |
| <<extend>> | Extension UC **optionally** adds to base | Conditional, base UC works without it |

**Common mistake:** Using <<extend>> when you mean <<include>>.

**Test:** If the base use case makes no sense without the other use case, it's <<include>>. If the base use case works fine alone, it's <<extend>>.

**Examples:**
- "Place Order" **<<include>>** "Process Payment" — you can't place an order without paying
- "Place Order" **<<extend>>** "Apply Coupon" — you can place an order without a coupon

## Trap 5: Confusing Validation and Verification

| | Validation | Verification |
|-|-----------|--------------|
| Question | Right product? | Product right? |
| Checks against | User needs | Specification |
| Common mistake | Saying "testing verifies requirements" | Testing can do BOTH — UAT validates, unit tests verify |

**Mnemonic:** Validation = Valuable to users? Verification = Very correct implementation?

## Trap 6: Design in Requirements

| Requirement with Design | Pure Requirement |
|------------------------|-----------------|
| "System shall use MySQL database" | "System shall persist data with ACID guarantees" |
| "System shall display results in a dropdown" | "System shall allow user to select from search results" |
| "System shall call REST API endpoint /users" | "System shall retrieve user data from the identity service" |
| "System shall implement MVC pattern" | (This is never a valid requirement) |

**Exception:** If there's a genuine **constraint** (e.g., company mandates PostgreSQL), put it in the constraints section with justification.

## Trap 7: MoSCoW Misuse

| Mistake | Why It's Wrong |
|---------|---------------|
| Everything is "Must Have" | Defeats the purpose; if everything is top priority, nothing is |
| Confusing "Won't Have" with "rejected" | "Won't Have" means "not this release" — it's acknowledged |
| Ignoring the 60/20/20 guideline | Too many Musts = no flexibility when things go wrong |
| Prioritising based on stakeholder loudness | Should be based on business value and dependencies |

## Trap 8: Stakeholder Identification Gaps

**Common mistake:** Only identifying end users as stakeholders.

Remember to consider:
- Buyers (may differ from users)
- Regulators
- System administrators
- Maintenance developers
- Operations/support staff
- Training teams
- Adjacent system owners
- Data protection officers

## Trap 9: Traceability Errors

| Mistake | Consequence |
|---------|-------------|
| Requirement with no source link | Can't justify why it exists (gold-plating?) |
| Requirement with no test case | Cannot verify it's implemented correctly |
| Test case with no requirement | Wasted test effort (or missing requirement) |
| Code with no requirement link | Possible gold-plating or undocumented feature |

## Trap 10: SRS Section Confusion

| What Goes Where | NOT in This Section |
|-----------------|-------------------|
| Section 2 (Overall Description): High-level summary, context | Detailed individual requirements |
| Section 3 (Specific Requirements): Detailed, numbered, testable reqs | Vague descriptions, background info |
| Constraints section: Externally imposed limits | Requirements that are actually design preferences |
| Assumptions: Things believed true | Requirements (if it's critical, make it a requirement) |

## Exam Strategy Tips

1. **When asked to classify requirements:** State the type AND briefly explain why.
2. **When writing use cases:** Use the full template structure even if only some fields are required — examiners reward completeness.
3. **When writing requirements:** Always use "shall" for mandatory, include measurable criteria, and provide an ID.
4. **When asked about elicitation techniques:** Name the technique, explain WHEN/WHY you'd use it, and mention at least one limitation.
5. **When asked about change control:** Describe the PROCESS (request → analysis → CCB → decision → update), not just "use change control."
6. **When drawing DFDs:** Label EVERYTHING; ensure no process is a black hole (no output) or miracle (no input).
