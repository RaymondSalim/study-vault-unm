---
title: "Requirements Analysis & Modelling"
order: 4
moduleTitle: "COMP2041 - Software Specification"
tags: ["use-cases", "activity-diagrams", "domain-model", "class-diagrams", "DFD", "modelling"]
---

## Purpose of Analysis & Modelling

:::eli10

After collecting raw information from people, you need to organise it into clear pictures and structured descriptions. This is like taking messy notes from a conversation and turning them into neat diagrams that everyone can understand. It helps find missing pieces, contradictions, and things nobody thought about yet.

:::

:::eli15

Analysis and modelling transform raw elicited information into structured, unambiguous specifications. The goals are: detecting conflicts, gaps, and redundancies; communicating requirements visually to diverse stakeholders; and providing a basis for validation and verification. Different models (use cases, activity diagrams, domain models, DFDs) capture different aspects of the system.

:::

:::eli20

- Transform raw elicited information into structured, unambiguous specifications
- Detect conflicts, gaps, and redundancies
- Communicate requirements visually to stakeholders and developers
- Provide a basis for validation and verification

:::

## Use Cases

:::eli10

A use case is a story about how a person uses the system to achieve a goal. It has a main happy path (everything goes right), alternative paths (different choices), and exception paths (things go wrong). It is like writing out the script for every possible way a scene in a movie could play out.

:::

:::eli15

Use cases describe interactions between actors and the system to achieve a goal. They specify preconditions, triggers, step-by-step flows (main success scenario, alternative flows for variations, exception flows for errors), and postconditions. Unlike user stories (brief, conversational), use cases are comprehensive structured documents. They are particularly useful in plan-driven development for formal documentation.

:::

:::eli20

### Use Case vs User Story

| Aspect | Use Case | User Story |
|--------|----------|-----------|
| Format | Structured template | "As a..., I want..., so that..." |
| Detail | Comprehensive (pre/post, flows, exceptions) | Brief (details in conversation) |
| Audience | Formal documentation | Agile backlog |
| When | Waterfall / plan-driven | Agile / iterative |

### Use Case Template

| Element | Description | Example |
|---------|-------------|---------|
| **UC ID** | Unique identifier | UC-003 |
| **Title** | Short descriptive name | Place Order |
| **Primary Actor** | Who initiates | Customer |
| **Secondary Actors** | Other participants | Payment Gateway, Inventory System |
| **Preconditions** | What must hold before | Customer is logged in; cart is non-empty |
| **Trigger** | Event that starts the use case | Customer clicks "Checkout" |
| **Main Success Scenario** | Numbered step-by-step happy path | See below |
| **Alternative Flows** | Branches from main flow | See below |
| **Exception Flows** | Error/failure handling | See below |
| **Postconditions** | What is true after success | Order is created; inventory decremented; confirmation email sent |
| **Business Rules** | Constraints applied | Minimum order value is 5.00 |
| **Non-functional** | Quality requirements for this UC | Complete checkout in < 10s |

### Example: Main Success Scenario

```
1. Customer reviews cart contents.
2. System displays order summary with total.
3. Customer selects delivery address.
4. Customer selects payment method.
5. System validates payment details with Payment Gateway.
6. Payment Gateway confirms authorisation.
7. System creates order record.
8. System decrements inventory.
9. System sends confirmation email to Customer.
10. System displays order confirmation page.
```

### Alternative Flows

```
4a. Customer enters new delivery address:
    4a.1 System displays address form.
    4a.2 Customer enters and submits address.
    4a.3 System validates address format.
    4a.4 Return to step 4 (address now selected).

5a. Payment details invalid:
    5a.1 System displays error message.
    5a.2 Customer corrects payment details.
    5a.3 Return to step 5.
```

### Exception Flows

```
6a. Payment Gateway declines transaction:
    6a.1 System informs Customer of decline.
    6a.2 System logs failed attempt.
    6a.3 Use case ends (order NOT created).

8a. Item out of stock (race condition):
    8a.1 System informs Customer of unavailability.
    8a.2 System offers alternatives or waitlist.
    8a.3 Use case ends or returns to step 1.
```

:::

## Use Case Diagrams (UML)

:::eli10

A use case diagram is a simple picture with stick figures (the people/systems that interact) and ovals (the things the system does). Lines connect the actors to the use cases they participate in. Some use cases always include another (like "checkout" always includes "validate payment"), and some optionally extend another (like "apply discount code").

:::

:::eli15

UML use case diagrams show the system boundary (rectangle), actors (stick figures for external entities), and use cases (ovals for system functions). Relationships include: association (actor participates), include (mandatory sub-behaviour that is always executed), extend (optional/conditional behaviour), and generalisation (inheritance between actors or use cases). These diagrams give a high-level visual overview of who does what with the system.

:::

:::eli20

Elements:
- **Actors** — stick figures (external entities)
- **Use cases** — ovals (system functions)
- **System boundary** — rectangle enclosing use cases
- **Relationships:**

| Relationship | Notation | Meaning |
|-------------|----------|---------|
| Association | Solid line | Actor participates in use case |
| Include | Dashed arrow, <<include>> | Use case always includes another |
| Extend | Dashed arrow, <<extend>> | Use case optionally extends another |
| Generalisation | Solid arrow (triangle) | Actor/UC inherits from another |

**<<include>>** = mandatory sub-behaviour (e.g., "Place Order" includes "Validate Payment")
**<<extend>>** = optional/conditional (e.g., "Place Order" extended by "Apply Discount Code")

:::

## Activity Diagrams

:::eli10

Activity diagrams are fancy flowcharts. They show the steps in a process with diamonds for decisions (like "if yes, go left; if no, go right") and thick bars for things that happen at the same time. Swimlanes show who is responsible for each step, like lanes in a swimming pool.

:::

:::eli15

Activity diagrams model the flow of activities in a process, similar to flowcharts but with support for parallel execution (fork/join bars) and responsibility assignment (swimlanes). They use: filled circles for start, rounded rectangles for actions, diamonds for decisions, thick bars for parallel splits/joins, and bordered circles for end. They are useful for complex business workflows with branching and concurrency, often created before detailed use cases.

:::

:::eli20

Model the **flow of activities** in a process (like a flowchart but with support for concurrency).

| Symbol | Meaning |
|--------|---------|
| Filled circle | Initial node (start) |
| Rounded rectangle | Activity/action |
| Diamond | Decision node (branch) |
| Thick horizontal bar | Fork/Join (parallel) |
| Circle with border | Final node (end) |
| Swimlanes | Responsibility assignment |

**When to use:** Complex workflows with branching/parallel paths; clarifying business processes before writing use cases.

:::

## Domain Modelling

:::eli10

A domain model is a picture of the important "things" in the problem you are solving and how they relate. For a library, those things might be Book, Member, and Loan, connected by relationships like "a Member makes a Loan of a Book." It helps everyone understand the problem before thinking about the software solution.

:::

:::eli15

A domain model captures key concepts (entities) in the problem domain and their relationships -- it is an analysis tool, NOT a software design. You identify candidate concepts from nouns in requirements, add associations (relationships between concepts from verbs), attributes (properties of concepts), and multiplicity (how many of each). It builds shared understanding of the problem space without prescribing implementation details.

:::

:::eli20

A domain model captures key **concepts** (entities) in the problem domain and their relationships — NOT a software design.

### Steps

1. Identify candidate concepts from requirements/interviews (nouns)
2. Remove duplicates, vague terms, and implementation concepts
3. Add associations between concepts (verbs)
4. Add attributes (but no methods — this is analysis, not design)
5. Add multiplicity

### Example Domain Model Concepts (Library System)

| Concept | Attributes | Associations |
|---------|-----------|--------------|
| Book | title, ISBN, publicationYear | has many Copies |
| Copy | barcode, condition | belongs to Book; involved in Loan |
| Member | name, memberID, email | makes Reservations; has Loans |
| Loan | dueDate, returnDate | links Member to Copy |
| Reservation | dateRequested, status | links Member to Book |

:::

## Class Diagrams (Analysis Level)

:::eli10

At the analysis level, class diagrams sort things into three types: entity classes (store data, like "Order" or "Customer"), boundary classes (the screens and interfaces users interact with), and control classes (the coordinators that connect everything together). It is like sorting characters in a play into leads, stage crew, and directors.

:::

:::eli15

Analysis-level class diagrams categorise classes into three stereotypes: entity classes (domain objects with data, like Order or Customer), boundary classes (system interfaces like screens or API endpoints), and control classes (process coordinators like OrderProcessor). This separation of concerns helps identify responsibilities early and maps to architectural patterns like MVC. It is an analysis technique, not detailed design.

:::

:::eli20

At analysis level, class diagrams show:
- **Entity classes** (domain objects with data)
- **Boundary classes** (UI/interface elements)
- **Control classes** (process coordinators)

| Stereotype | Role | Example |
|-----------|------|---------|
| <<entity>> | Stores data | Order, Customer, Product |
| <<boundary>> | System interface | LoginScreen, APIEndpoint |
| <<control>> | Coordinates behaviour | OrderProcessor, AuthController |

:::

## Data Flow Diagrams (DFD)

:::eli10

A data flow diagram shows how information moves through a system -- where it comes from, what processes transform it, where it gets stored, and where it goes. It is like a plumbing diagram showing how water (data) flows through pipes (arrows), gets processed at stations, and collects in tanks (data stores).

:::

:::eli15

Data Flow Diagrams (DFDs) show how data moves through a system at various levels of detail. Level 0 (context diagram) shows the entire system as one process with external entities. Level 1 decomposes into main processes. Level 2+ provides further detail. Elements include: rectangles (external entities), circles/rounded rectangles (processes), open-ended rectangles (data stores), and arrows (data flows). DFDs must follow rules: every process needs input and output, data stores cannot talk directly to external entities, and all flows must be labelled.

:::

:::eli20

| Level | Content |
|-------|---------|
| Context (Level 0) | Single process, external entities, major flows |
| Level 1 | Decompose into main processes |
| Level 2+ | Further decomposition of complex processes |

**DFD Elements:**

| Symbol | Meaning |
|--------|---------|
| Rectangle | External entity |
| Rounded rectangle / circle | Process |
| Open-ended rectangle | Data store |
| Arrow | Data flow (labelled) |

**Rules:**
- Every process must have at least one input and one output
- Data stores cannot communicate directly with external entities
- Data flows must be labelled
- Processes are numbered hierarchically (1, 1.1, 1.2, ...)

:::

## Choosing the Right Model

:::eli10

Different diagrams are good for different things. Use cases show how people interact with the system. Activity diagrams show complex workflows. Domain models show the important "things." DFDs show how data moves. Pick the one that best answers the question you are trying to answer.

:::

:::eli15

The choice of model depends on what you need to communicate. Use cases are best for describing user interactions. Activity diagrams clarify complex workflows with branching and parallelism. Domain models capture problem-space concepts and relationships. DFDs show data movement. Class diagrams show object relationships. Context diagrams define system boundaries. Most projects use a combination of models to capture different aspects of requirements.

:::

:::eli20

| Situation | Recommended Model |
|-----------|------------------|
| Describing user interactions | Use cases |
| Complex business workflow | Activity diagram |
| Understanding problem domain concepts | Domain model |
| Data movement through system | DFD |
| Object relationships (analysis) | Class diagram |
| System boundaries and actors | Use case diagram + context diagram |

<details><summary>Practice: Write a use case</summary>

Write a complete use case for "Return a Library Book" with:
- Primary actor, preconditions, main flow (5-7 steps), one alternative flow, one exception, postconditions.

**Model answer:**

| Element | Content |
|---------|---------|
| UC ID | UC-007 |
| Title | Return a Library Book |
| Primary Actor | Library Member |
| Preconditions | Member has an active loan |
| Trigger | Member presents book at desk / drops in return box |

**Main Success Scenario:**
1. Staff scans book barcode.
2. System identifies the associated loan record.
3. System checks if book is overdue.
4. System marks loan as returned with today's date.
5. System updates copy status to "Available."
6. System checks if any reservations exist for this book.
7. System confirms return to Staff.

**Alternative Flow:**
3a. Book is overdue:
- 3a.1 System calculates fine.
- 3a.2 System adds fine to Member's account.
- 3a.3 Continue to step 4.

**Exception:**
2a. Barcode not recognised:
- 2a.1 System displays error "Book not found."
- 2a.2 Staff manually searches by title/ISBN.
- 2a.3 If found, continue to step 3. If not, use case ends.

**Postconditions:** Loan closed; copy available; fine applied if overdue; reservation notified if applicable.

</details>

<details><summary>Practice: Identify include/extend</summary>

Given use cases for an e-commerce system:
- Place Order
- Validate Payment
- Apply Discount Code
- Track Delivery
- Register Account

Which relationships apply?

**Answers:**
- Place Order **<<include>>** Validate Payment (always required)
- Place Order **<<extend>>** Apply Discount Code (optional)
- Track Delivery is a separate use case (association with Customer actor)
- Register Account is a separate use case (no include/extend relationship with Place Order — but Place Order may <<include>> Authenticate User)

</details>

:::
