---
title: "Requirements Testing"
order: 8
moduleTitle: "COMP2041 - Software Specification"
tags: ["testing", "acceptance-criteria", "verification", "validation", "coverage", "test-cases"]
---

## Requirements and Testing Relationship

Testing does not begin after coding — it begins **during requirements engineering**. Every requirement should be written with testability in mind, and test cases can be derived directly from requirements.

## Validation vs Verification (V&V)

| Aspect | Validation | Verification |
|--------|-----------|--------------|
| Question | "Did we build the right system?" | "Did we build the system right?" |
| Checks against | Stakeholder needs, business goals | Requirements specification |
| Techniques | Reviews, prototypes, acceptance testing | Unit tests, integration tests, inspections |
| When | Throughout (especially early and late) | Throughout development |

## Testability

A requirement is **testable** if you can design a finite, cost-effective test that determines whether the requirement is met.

### Untestable vs Testable

| Untestable | Why | Testable Version |
|-----------|-----|-----------------|
| "System shall be fast" | No measurable criterion | "System shall respond within 200ms at 95th percentile" |
| "System shall be secure" | Vague, no specific test | "System shall resist brute-force login attacks by locking accounts after 5 failed attempts within 10 minutes" |
| "System shall be easy to use" | Subjective | "80% of new users shall complete task X within 3 minutes on first attempt" |
| "System shall handle errors gracefully" | No specific behaviour defined | "When payment fails, system shall display error code, retain cart contents, and log the failure" |

## Deriving Test Cases from Requirements

### Process

1. Read requirement and identify the **conditions** and **expected outcomes**
2. Identify **boundary values** and **equivalence classes**
3. Consider **normal flow**, **alternative flows**, and **exception flows**
4. Write test cases covering each path
5. Map test cases back to requirement ID (traceability)

### Test Case Template

| Field | Content |
|-------|---------|
| TC ID | TC-045 |
| Requirement | FR-015 (Password Reset) |
| Description | Verify reset link expires after 30 minutes |
| Preconditions | User has requested password reset |
| Test Steps | 1. Request reset. 2. Wait 31 minutes. 3. Click reset link. |
| Expected Result | System displays "Link expired" message; no password change allowed |
| Actual Result | (filled during execution) |
| Pass/Fail | (filled during execution) |

### Example: Deriving Tests from a Requirement

**Requirement FR-020:** "The system shall allow users aged 18 or over to create an account. Users under 18 shall be shown a message stating they are ineligible."

**Derived test cases:**

| TC ID | Input | Expected Outcome | Technique |
|-------|-------|-----------------|-----------|
| TC-020a | Age = 18 | Account created | Boundary (lower valid) |
| TC-020b | Age = 25 | Account created | Equivalence (valid class) |
| TC-020c | Age = 17 | Ineligibility message | Boundary (upper invalid) |
| TC-020d | Age = 0 | Ineligibility message | Equivalence (invalid class) |
| TC-020e | Age = -1 | Error / ineligibility | Invalid input |
| TC-020f | Age = blank | Validation error | Missing input |
| TC-020g | Age = "abc" | Validation error | Wrong type |

## Acceptance Criteria

Acceptance criteria define the **conditions that must be met** for a requirement (or user story) to be considered "done."

### Format: Given-When-Then

```
Given [precondition/context]
When  [action/trigger]
Then  [expected outcome]
```

**Example:**
```
Given a registered user is on the login page
When  they enter valid credentials and click "Sign In"
Then  they are redirected to their dashboard within 2 seconds
And   their name is displayed in the header
```

### Acceptance Criteria Checklist

Good acceptance criteria are:
- [ ] Written from the user's perspective
- [ ] Testable (pass/fail deterministic)
- [ ] Independent of implementation
- [ ] Cover happy path AND edge cases
- [ ] Include performance criteria where relevant
- [ ] Agreed upon by stakeholder and team

## Requirements Coverage

### Coverage Types

| Type | Question |
|------|----------|
| Requirements coverage | Does every requirement have at least one test? |
| Test coverage | Are there tests that don't map to any requirement? (gold-plating?) |
| Source coverage | Does every business need trace through to a test? |

### Coverage Matrix

| Requirement | Test Case(s) | Coverage Status |
|-------------|-------------|-----------------|
| FR-001 | TC-001, TC-002, TC-003 | Covered |
| FR-002 | TC-010 | Covered |
| FR-003 | — | **NOT COVERED** |
| NFR-001 | TC-050, TC-051 | Covered |
| NFR-002 | — | **NOT COVERED** |

**Goal:** 100% requirements coverage (every requirement has at least one test). In practice, prioritise Must Have requirements.

## Testing Requirements Documents (Not Code)

You can "test" the requirements themselves through:

| Technique | What it Checks |
|-----------|---------------|
| Reviews/Inspections | Correctness, completeness, consistency |
| Prototyping | Stakeholder understanding matches spec |
| Model checking | Formal models for contradictions |
| Test case derivation | If you can't write a test, the requirement is flawed |
| Scenarios/Walkthroughs | Walk through use cases to find gaps |

### Using Test Case Derivation as a Quality Check

If you **cannot** write a test case for a requirement, the requirement has a problem:
- Too vague → add measurable criteria
- Too complex → decompose into smaller requirements
- Contradictory → resolve conflict
- Incomplete → add missing conditions

## Acceptance Testing

| Level | Scope |
|-------|-------|
| User Acceptance Testing (UAT) | End users verify the system meets their needs |
| Operational Acceptance Testing | Operations team verifies deployment/maintenance |
| Contractual Acceptance | Formal sign-off against contract terms |
| Alpha Testing | Internal testing before external release |
| Beta Testing | External users test in real environment |

### UAT Process

1. Define acceptance criteria (from requirements)
2. Create acceptance test plan
3. Prepare test environment and data
4. Users execute tests
5. Record results and defects
6. Decision: Accept / Accept with conditions / Reject

<details><summary>Practice: Derive test cases</summary>

**Requirement FR-030:** "The system shall apply a 10% discount to orders over 100.00 for Gold members. Standard members receive no discount regardless of order value."

Derive at least 5 test cases.

**Model answer:**

| TC | Member Type | Order Value | Expected Discount | Rationale |
|----|-------------|-------------|-------------------|-----------|
| TC-030a | Gold | 150.00 | 10% (15.00 off) | Normal valid case |
| TC-030b | Gold | 100.01 | 10% (10.00 off) | Boundary (just over) |
| TC-030c | Gold | 100.00 | No discount | Boundary (not over) |
| TC-030d | Gold | 50.00 | No discount | Below threshold |
| TC-030e | Standard | 200.00 | No discount | Standard member, high value |
| TC-030f | Standard | 100.01 | No discount | Standard member at boundary |
| TC-030g | Gold | 0.00 | No discount | Edge case (empty order) |

</details>

<details><summary>Practice: Write acceptance criteria</summary>

Write Given-When-Then acceptance criteria for: "A user can add items to their shopping cart."

**Model answer:**

```
Scenario 1: Add item to empty cart
Given the user is viewing a product page
And   the cart is empty
When  the user clicks "Add to Cart"
Then  the item appears in the cart with quantity 1
And   the cart badge shows "1"

Scenario 2: Add same item again
Given the user has 1 unit of Product A in their cart
When  the user adds Product A again
Then  the cart shows Product A with quantity 2
And   no duplicate entry is created

Scenario 3: Add item when not logged in
Given the user is not logged in
When  the user clicks "Add to Cart"
Then  the item is added to a session-based cart
And   the user is NOT forced to log in

Scenario 4: Add out-of-stock item
Given a product is marked as out of stock
When  the user attempts to add it to cart
Then  the system displays "Currently unavailable"
And   the item is NOT added to the cart
```

</details>
