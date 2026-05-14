---
title: "Requirements Engineering"
order: 2
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "requirements", "user-stories", "MoSCoW", "elicitation"]
---

## Requirements Engineering Process

:::eli10

Requirements engineering is figuring out what a program needs to do before you build it. It is like making a wish list for a birthday party -- you have to ask everyone what they want, check what is actually possible, write it all down clearly, and make sure you did not miss anything.

:::

:::eli15

Requirements engineering is a structured process of discovering, documenting, and managing what a software system should do. It involves gathering needs from stakeholders (elicitation), resolving conflicts and assessing feasibility (analysis), writing them formally (specification), checking they are correct (validation), and tracking changes over time (management). Poor requirements are the leading cause of project failure.

:::

:::eli20

| Phase | Activity | Output |
|-------|----------|--------|
| Elicitation | Gather needs from stakeholders | Raw requirements |
| Analysis | Resolve conflicts, assess feasibility | Structured requirements |
| Specification | Document formally | SRS (Software Requirements Specification) |
| Validation | Check correctness & completeness | Validated requirements |
| Management | Track changes over time | Traceability matrix |

:::

---

## Functional vs Non-Functional Requirements

:::eli10

Functional requirements are WHAT the system does (like "users can log in"). Non-functional requirements are HOW WELL it does things (like "the login page loads in under 2 seconds"). One describes features, the other describes quality.

:::

:::eli15

Functional requirements describe specific behaviours or features the system must have (what it does). Non-functional requirements describe quality attributes (how well it performs). Functional requirements are tested by checking if a feature works; non-functional requirements are tested by measuring performance, reliability, or usability against quantifiable targets. The FURPS+ model categorises NFRs into functionality, usability, reliability, performance, and supportability.

:::

:::eli20

| Aspect | Functional (FR) | Non-Functional (NFR) |
|--------|-----------------|---------------------|
| Definition | What the system **does** | How well the system **performs** |
| Example | "User can log in with email/password" | "Login must respond within 2 seconds" |
| Testable by | Feature tests | Performance/stress tests |
| Categories | Input, processing, output, data | Performance, security, usability, reliability |

### NFR Categories (FURPS+)

| Category | Examples |
|----------|---------|
| **F**unctionality | Security, interoperability |
| **U**sability | Learnability, accessibility, UI consistency |
| **R**eliability | Availability (99.9%), MTBF, recovery |
| **P**erformance | Response time, throughput, capacity |
| **S**upportability | Maintainability, portability, testability |
| **+** | Design constraints, implementation, interface, physical |

:::

---

## Elicitation Techniques

:::eli10

Elicitation means finding out what people need. You can ask them (interviews), give them a survey (questionnaires), watch them work (observation), get them in a room together (workshops), or show them a rough version to react to (prototyping). Each way has pros and cons.

:::

:::eli15

Elicitation techniques are methods for gathering requirements from stakeholders. Interviews give deep understanding but are time-consuming. Questionnaires reach many people but lack depth. Observation reveals real workflows but can be influenced by the observer's presence. Workshops build consensus but are hard to schedule. Prototyping clarifies UI expectations but can set unrealistic goals. The choice depends on stakeholder availability, project complexity, and what kind of information you need.

:::

:::eli20

| Technique | Best For | Limitations |
|-----------|----------|------------|
| Interviews | Deep understanding, exploring needs | Time-consuming, interviewer bias |
| Questionnaires | Large stakeholder groups | Low response rate, no follow-up |
| Observation | Understanding actual workflows | Hawthorne effect, time-consuming |
| Workshops (JAD) | Consensus building, complex systems | Scheduling difficulty |
| Prototyping | Clarifying UI/UX requirements | Can set unrealistic expectations |
| Document analysis | Understanding existing processes | May be outdated |
| Brainstorming | Generating creative solutions | Dominant personalities |

:::

---

## User Stories (Agile)

:::eli10

A user story is a short sentence describing what someone wants to do with the software and why. It follows the pattern: "As a [who], I want [what], so that [why]." It is like writing a sentence about what one person needs from the program.

:::

:::eli15

User stories are the primary way Agile teams capture requirements. They follow the format "As a [role], I want [feature], so that [benefit]" and are deliberately brief -- details are negotiated in conversation. Good stories follow the INVEST criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable). Acceptance criteria using Given-When-Then format define when a story is done.

:::

:::eli20

### Format

```
As a [role],
I want [feature/goal],
So that [benefit/reason].
```

### Examples

```
As a registered customer,
I want to reset my password via email,
So that I can regain access if I forget it.
```

### INVEST Criteria for Good User Stories

| Letter | Criterion | Meaning |
|--------|-----------|---------|
| **I** | Independent | No dependencies on other stories |
| **N** | Negotiable | Details can be discussed |
| **V** | Valuable | Delivers value to user/business |
| **E** | Estimable | Team can estimate effort |
| **S** | Small | Fits within one sprint |
| **T** | Testable | Clear acceptance criteria |

### Acceptance Criteria (Given-When-Then)

```
Given the user is on the login page
  And has a registered account
When they click "Forgot Password" and enter their email
Then a reset link is sent to that email within 60 seconds
```

:::

---

## MoSCoW Prioritisation

:::eli10

MoSCoW is a way to sort requirements by importance. "Must have" means the system cannot work without it. "Should have" is important but you could survive without it. "Could have" is nice but optional. "Won't have" means not this time. It helps teams decide what to build first.

:::

:::eli15

MoSCoW is a prioritisation framework that classifies requirements into four categories. "Must have" items are essential for the minimum viable product (about 60% of effort). "Should have" items are important but the system can launch without them (about 20%). "Could have" items are desirable nice-to-haves (about 20%). "Won't have (this time)" explicitly scopes out items acknowledged for future releases. This prevents scope creep and helps stakeholders make trade-offs.

:::

:::eli20

| Priority | Meaning | Guidance |
|----------|---------|----------|
| **M**ust have | Essential for delivery | System fails without these (~60%) |
| **S**hould have | Important but not vital | Painful to leave out (~20%) |
| **C**ould have | Desirable, nice-to-have | Only if time/budget allows (~20%) |
| **W**on't have (this time) | Out of scope for now | Acknowledged for future releases |

**Example:**

| Requirement | Priority | Rationale |
|-------------|----------|-----------|
| User login/authentication | Must | Core security |
| Password reset via email | Should | Important UX, workaround exists |
| Social media login (OAuth) | Could | Convenience feature |
| Biometric login | Won't | Future enhancement |

:::

---

## Requirements Specification Quality

:::eli10

Good requirements are clear, measurable, and realistic. "The system should be fast" is bad because it is vague. "Pages load in under 2 seconds" is good because anyone can test whether it is true. Requirements should be like a clear recipe, not a fuzzy wish.

:::

:::eli15

High-quality requirements follow the SMART criteria: Specific, Measurable, Achievable, Relevant, and Time-bound. Common problems include ambiguity (multiple interpretations), inconsistency (contradictions), incompleteness (gaps), gold plating (unnecessary complexity), and infeasibility (technically impossible). A well-written requirement has a single clear interpretation and a defined way to verify it has been met.

:::

:::eli20

### SMART Requirements

| Criterion | Bad Example | Good Example |
|-----------|-------------|--------------|
| **S**pecific | "System should be fast" | "Page loads in < 2s on 4G" |
| **M**easurable | "System should be reliable" | "99.9% uptime per month" |
| **A**chievable | "Never crashes" | "Recovers from crash within 30s" |
| **R**elevant | "Support 10 languages" (for UK-only app) | "Support English and Welsh" |
| **T**ime-bound | "Eventually support mobile" | "Mobile version by Q3 2025" |

### Common Problems

| Problem | Description | Impact |
|---------|-------------|--------|
| Ambiguity | Multiple interpretations possible | Wrong implementation |
| Inconsistency | Requirements contradict each other | Cannot satisfy both |
| Incompleteness | Missing requirements | Gaps in system |
| Gold plating | Unnecessary detail/features | Wasted effort |
| Infeasibility | Technically impossible | Project failure |

:::

---

## Practice Questions

:::eli20

<details>
<summary>Q: Classify these requirements as Functional or Non-Functional: (a) The system shall allow users to search products by name. (b) The system shall handle 1000 concurrent users. (c) The system shall encrypt passwords using bcrypt. (d) The system shall be available 99.95% of the time.</summary>

- **(a) Functional** - describes a system capability (search feature)
- **(b) Non-Functional (Performance)** - describes a quality attribute (capacity)
- **(c) Functional** (with NFR aspect) - describes a specific processing behaviour, though "encryption" relates to security NFR
- **(d) Non-Functional (Reliability)** - describes an availability quality constraint
</details>

<details>
<summary>Q: Rewrite this poor requirement as a SMART requirement: "The system should be user-friendly."</summary>

**Rewritten:** "A new user with no prior training shall be able to complete the checkout process within 3 minutes on their first attempt, with no more than 1 error, as measured by usability testing with 10 representative users."

This is:
- **Specific:** checkout process, new user
- **Measurable:** 3 minutes, 1 error, 10 users
- **Achievable:** reasonable target
- **Relevant:** core user flow
- **Time-bound:** implied at testing milestone
</details>

<details>
<summary>Q: Write a user story with acceptance criteria for an e-commerce "add to cart" feature.</summary>

**User Story:**
```
As a browsing customer,
I want to add products to my shopping cart,
So that I can purchase multiple items in one transaction.
```

**Acceptance Criteria:**
```
Given I am viewing a product page with items in stock
When I click the "Add to Cart" button
Then the item is added to my cart
  And the cart count increases by 1
  And a confirmation message appears

Given I am viewing a product that is out of stock
When I view the product page
Then the "Add to Cart" button is disabled
  And a message "Out of Stock" is displayed
```
</details>

<details>
<summary>Q: A client says "I need the system to be secure." What elicitation technique(s) would you use to clarify this, and what follow-up questions would you ask?</summary>

**Techniques:** Interview (structured), then workshop with security stakeholders.

**Follow-up questions:**
1. What data needs protecting? (personal data, financial, medical?)
2. Who are the potential threat actors? (external hackers, internal users?)
3. Are there regulatory requirements? (GDPR, PCI-DSS, HIPAA?)
4. What authentication level is needed? (password only, 2FA, SSO?)
5. What happens if there's a breach? (acceptable downtime, notification requirements?)
6. What's the sensitivity classification of stored data?

This transforms the vague NFR into measurable, testable requirements.
</details>

:::
