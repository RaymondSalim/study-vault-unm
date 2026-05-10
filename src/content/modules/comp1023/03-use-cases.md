---
title: "Use Cases & Scenarios"
order: 3
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "use-cases", "UML", "actors", "scenarios"]
---

## Use Case Diagrams

Use case diagrams show **what** a system does from the user's perspective (not how).

### Elements

| Element | Notation | Purpose |
|---------|----------|---------|
| Actor | Stick figure | External entity that interacts with system |
| Use Case | Oval/ellipse | A goal the actor achieves using the system |
| System Boundary | Rectangle | Scope of the system |
| Association | Solid line | Actor participates in use case |
| Include | Dashed arrow `<<include>>` | Mandatory sub-behaviour |
| Extend | Dashed arrow `<<extend>>` | Optional/conditional behaviour |
| Generalisation | Solid arrow (triangle head) | Inheritance between actors or use cases |

### Actor Types

| Type | Description | Example |
|------|-------------|---------|
| Primary | Initiates the interaction, has a goal | Customer, Admin |
| Secondary | Supports the system (called upon) | Payment Gateway, Email Service |
| Human | A person | Librarian, Student |
| System/External | Another system | Database, API |

---

## Include vs Extend

| Aspect | `<<include>>` | `<<extend>>` |
|--------|---------------|--------------|
| Direction | Base → Included | Extension → Base |
| Meaning | Base **always** uses the included UC | Extension **may** add to base UC |
| Mandatory? | Yes, always executed | No, conditional |
| Purpose | Factor out common behaviour | Add optional steps |
| Arrow direction | From base TO included | From extension TO base |

### Example Diagram (Text Representation)

```
┌─────────────────────────────────────────────┐
│              Online Shop System               │
│                                               │
│   ┌──────────┐         ┌──────────────┐     │
│   │ Place    │────────→│ Authenticate │     │
│   │ Order    │<<include>>│  User       │     │
│   └──────────┘         └──────────────┘     │
│        │                                      │
│        │                ┌──────────────┐     │
│        │←───────────────│ Apply Coupon │     │
│        │  <<extend>>    └──────────────┘     │
│   ┌──────────┐                               │
│   │ Browse   │                               │
│   │ Products │                               │
│   └──────────┘                               │
└─────────────────────────────────────────────┘
      │
  ┌───┴───┐
  │Customer│
  └───────┘
```

**Reading this:**
- "Place Order" always includes "Authenticate User" (mandatory)
- "Apply Coupon" may extend "Place Order" (optional, only if customer has a coupon)

---

## Use Case Template (Fully Dressed)

| Section | Content |
|---------|---------|
| **Use Case ID** | UC-001 |
| **Name** | Place Order |
| **Primary Actor** | Registered Customer |
| **Preconditions** | Customer is logged in; cart is not empty |
| **Postconditions** | Order is created; payment processed; confirmation sent |
| **Main Success Scenario** | Numbered steps (see below) |
| **Extensions/Alternatives** | Branching paths |
| **Stakeholders & Interests** | Who cares and why |
| **Trigger** | Customer clicks "Checkout" |

### Main Success Scenario (Basic Flow)

```
1. Customer selects "Checkout"
2. System displays order summary with items and total
3. Customer confirms delivery address
4. Customer selects payment method
5. Customer confirms order
6. System validates payment with Payment Gateway
7. System creates order record
8. System sends confirmation email
9. System displays order confirmation page
```

### Extensions (Alternative Flows)

```
3a. Customer wants a different address:
    3a.1 Customer enters new address
    3a.2 System validates address format
    3a.3 Return to step 4

6a. Payment declined:
    6a.1 System displays "Payment Failed" message
    6a.2 Customer selects alternative payment method
    6a.3 Return to step 6

6b. Payment gateway timeout:
    6b.1 System retries once after 5 seconds
    6b.2 If still fails, display error and suggest retry later
```

---

## Scenarios

A **scenario** is a single path through a use case (one specific instance).

| Scenario Type | Description |
|---------------|-------------|
| Main Success | The "happy path" - everything works |
| Alternative | Valid but different path (e.g., different payment) |
| Exception | Error/failure path (e.g., payment declined) |

### Example Scenarios for "Place Order"

| Scenario | Path |
|----------|------|
| Happy path | Steps 1-2-3-4-5-6-7-8-9 |
| New address | Steps 1-2-3a-4-5-6-7-8-9 |
| Payment fails then succeeds | Steps 1-2-3-4-5-6a-6-7-8-9 |
| Payment gateway down | Steps 1-2-3-4-5-6b (ends with error) |

---

## Generalisation

### Actor Generalisation

```
        ┌───────┐
        │ User  │  (parent actor)
        └───┬───┘
           /│\
          / │ \
    ┌────┐ ┌────┐ ┌─────┐
    │Admin│ │Staff│ │Guest│  (child actors)
    └────┘ └────┘ └─────┘
```

Child actors inherit all use cases of the parent and may have additional ones.

### Use Case Generalisation

A child use case inherits behaviour of a parent and can override/extend it.

```
       ┌─────────────┐
       │ Make Payment │  (parent)
       └──────┬──────┘
             /│\
            / │ \
  ┌────────┐ ┌────────┐ ┌──────────┐
  │Pay Card│ │Pay Cash│ │Pay Crypto│  (children)
  └────────┘ └────────┘ └──────────┘
```

---

## Common Mistakes in Use Case Diagrams

| Mistake | Why It's Wrong | Correction |
|---------|---------------|-----------|
| Arrows between actors | Actors don't communicate via system | Remove or model as separate system |
| Use cases describing implementation | UML is about "what" not "how" | Keep at goal level |
| Too many use cases | Diagram becomes unreadable | Group related behaviour |
| Include for optional behaviour | Include means mandatory | Use extend for optional |
| Wrong arrow direction for extend | Extend arrow points TO base | Arrow: Extension → Base |
| Actor inside system boundary | Actors are external | Place actors outside rectangle |

---

## Practice Questions

<details>
<summary>Q: Draw (describe) a use case diagram for a library system with: Borrower (borrow book, return book, pay fine), Librarian (add book, remove book), both can search catalogue. Borrow book requires authentication.</summary>

```
┌─────────────────────────────────────────────────┐
│                Library System                     │
│                                                   │
│  ┌──────────────┐       ┌────────────────┐      │
│  │ Borrow Book  │──────→│ Authenticate   │      │
│  └──────────────┘<<incl>>└────────────────┘      │
│  ┌──────────────┐                                │
│  │ Return Book  │                                │
│  └──────────────┘                                │
│  ┌──────────────┐                                │
│  │ Pay Fine     │                                │
│  └──────────────┘                                │
│  ┌──────────────────┐                            │
│  │ Search Catalogue │                            │
│  └──────────────────┘                            │
│  ┌──────────────┐                                │
│  │ Add Book     │                                │
│  └──────────────┘                                │
│  ┌──────────────┐                                │
│  │ Remove Book  │                                │
│  └──────────────┘                                │
└─────────────────────────────────────────────────┘

Borrower ── Borrow Book, Return Book, Pay Fine, Search Catalogue
Librarian ── Add Book, Remove Book, Search Catalogue
```
</details>

<details>
<summary>Q: What is the difference between <<include>> and <<extend>>? Give an example of each.</summary>

**`<<include>>`** - Mandatory, always-executed sub-behaviour factored out for reuse.
- Arrow: Base Case → Included Case
- Example: "Withdraw Cash" always includes "Authenticate User" (you must authenticate before withdrawing)

**`<<extend>>`** - Optional, conditionally-executed behaviour that adds to a base case.
- Arrow: Extending Case → Base Case
- Example: "Print Receipt" extends "Withdraw Cash" (receipt is optional, only printed if customer selects it)

Key distinction: include = "must do this every time"; extend = "might do this sometimes"
</details>

<details>
<summary>Q: Write a fully-dressed use case for "Register Account" on an e-commerce site.</summary>

| Section | Content |
|---------|---------|
| **UC ID** | UC-002 |
| **Name** | Register Account |
| **Primary Actor** | Visitor |
| **Preconditions** | Visitor is not logged in |
| **Postconditions** | Account created; verification email sent |
| **Trigger** | Visitor clicks "Sign Up" |

**Main Success Scenario:**
1. Visitor selects "Sign Up"
2. System displays registration form
3. Visitor enters name, email, password
4. System validates all fields
5. System checks email is not already registered
6. System creates account (inactive)
7. System sends verification email
8. Visitor clicks verification link
9. System activates account
10. System redirects to dashboard

**Extensions:**
- 4a. Invalid email format: System displays error, return to step 3
- 4b. Password too weak: System shows requirements, return to step 3
- 5a. Email already registered: System suggests login/reset, return to step 3
- 8a. Link expired (>24h): System offers to resend verification
</details>
