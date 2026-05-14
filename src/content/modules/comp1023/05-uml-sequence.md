---
title: "UML Sequence Diagrams"
order: 5
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "UML", "sequence-diagrams", "interaction", "messages"]
---

## Sequence Diagram Purpose

:::eli10

A sequence diagram is like a comic strip showing objects talking to each other in order. Time flows from top to bottom. Each character (object) has a vertical line, and arrows between them show messages being sent back and forth.

:::

:::eli15

Sequence diagrams show how objects interact over time to accomplish a specific scenario. They emphasise the order of messages between participants. Each object has a vertical lifeline, activation bars show when it is processing, and horizontal arrows represent messages. They are ideal for visualising one specific path through a use case and understanding the dynamic behaviour of a system.

:::

:::eli20

Sequence diagrams show **how objects interact over time** to accomplish a specific scenario. They emphasise the **order** of messages.

:::

---

## Core Elements

:::eli10

The main parts are: boxes at the top (objects/participants), dashed lines going down (lifelines showing they exist), thin rectangles on the lines (showing when they are active/busy), and arrows between them (messages being sent). A dashed arrow back means "here is the answer."

:::

:::eli15

The key elements are participants (boxes at top), lifelines (dashed vertical lines showing existence over time), activation bars (thin rectangles showing processing periods), messages (horizontal arrows for communication), and returns (dashed arrows for responses). Objects can be named as instance:Class, :Class (anonymous), or just by name. Messages can be synchronous (caller waits), asynchronous (fire and forget), or self-calls.

:::

:::eli20

| Element | Notation | Description |
|---------|----------|-------------|
| Object/Participant | Box at top with name | An instance involved in the interaction |
| Lifeline | Dashed vertical line | Object's existence over time |
| Activation bar | Thin rectangle on lifeline | Period when object is active/processing |
| Message | Horizontal arrow | Communication between objects |
| Return | Dashed horizontal arrow | Response/return value |
| Destruction | X at bottom of lifeline | Object is destroyed |

### Object Naming

| Format | Example | Meaning |
|--------|---------|---------|
| `objectName:ClassName` | `order1:Order` | Named instance |
| `:ClassName` | `:PaymentService` | Anonymous instance |
| `objectName` | `customer` | Named, class implied |

:::

---

## Message Types

:::eli10

There are different kinds of messages. A solid arrow means "I am calling you and waiting for an answer." A dashed arrow back means "here is the answer." An arrow that loops back to the same line means an object is talking to itself (doing internal work). There are also arrows for creating and destroying objects.

:::

:::eli15

Message types distinguish how objects communicate. Synchronous messages (solid filled arrowhead) block the caller until a response comes back. Asynchronous messages (open arrowhead) let the caller continue without waiting. Return messages (dashed arrow) carry the response back. Self-messages (loop on same lifeline) represent internal processing. Create messages instantiate new objects, and destroy messages terminate them.

:::

:::eli20

| Message Type | Arrow Style | Meaning |
|-------------|-------------|---------|
| Synchronous | Solid arrow, filled head (→) | Caller waits for response |
| Asynchronous | Solid arrow, open head (→) | Caller does not wait |
| Return | Dashed arrow (--→) | Return from a call |
| Self-message | Arrow loops back to same lifeline | Object calls itself |
| Create | Dashed arrow to new object box | Instantiation |
| Destroy | Arrow to X | Object deletion |

:::

---

## Example: User Login

:::eli10

This shows what happens when you log in: You type your email and password into a login page. The page asks an authentication service to check them. The service looks up your account in the database, verifies the password, and sends back a token. Finally, the login page shows you the dashboard.

:::

:::eli15

This example traces a login scenario through four objects: User, LoginPage, AuthService, and DB. The User sends credentials to LoginPage, which forwards them to AuthService. AuthService queries the DB for the user record, performs internal password verification (self-message), and returns a token. LoginPage then displays the dashboard. Note the self-message for verifyPassword() -- this shows internal processing within AuthService.

:::

:::eli20

```
┌──────┐          ┌───────────┐       ┌────────────┐       ┌──────┐
│:User │          │:LoginPage │       │:AuthService│       │ :DB  │
└──┬───┘          └─────┬─────┘       └──────┬─────┘       └──┬───┘
   │                    │                     │                 │
   │ enter(email, pwd)  │                     │                 │
   │───────────────────→│                     │                 │
   │                    │                     │                 │
   │                    │ authenticate(email, pwd)              │
   │                    │────────────────────→│                 │
   │                    │                     │                 │
   │                    │                     │ findUser(email)  │
   │                    │                     │────────────────→│
   │                    │                     │                 │
   │                    │                     │    user          │
   │                    │                     │←- - - - - - - - │
   │                    │                     │                 │
   │                    │                     │ verifyPassword() │
   │                    │                     │─┐               │
   │                    │                     │ │ (self-call)   │
   │                    │                     │←┘               │
   │                    │                     │                 │
   │                    │       token          │                 │
   │                    │←- - - - - - - - - - │                 │
   │                    │                     │                 │
   │  displayDashboard()│                     │                 │
   │←- - - - - - - - - │                     │                 │
   │                    │                     │                 │
```

:::

---

## Combined Fragments

:::eli10

Combined fragments are boxes you draw around parts of the diagram to show choices and loops. "alt" is like an if-else: one thing happens OR another. "opt" is like an if with no else. "loop" means something repeats. They are labelled in the corner to show what kind they are.

:::

:::eli15

Combined fragments model control flow within sequence diagrams. The "alt" fragment shows mutually exclusive alternatives (if-else), with conditions in square brackets and operands separated by dashed lines. "opt" shows optional behaviour (if, no else). "loop" shows repetition while a condition holds. Other types include "par" (parallel execution), "break" (exit), and "ref" (reference to another diagram). These are essential for showing that interactions are not always a simple linear sequence.

:::

:::eli20

Fragments model control flow (conditionals, loops, etc.) within sequence diagrams.

### Fragment Types

| Fragment | Keyword | Meaning | Usage |
|----------|---------|---------|-------|
| Alternative | `alt` | If-else | Multiple conditions, only one executes |
| Option | `opt` | If (no else) | Executes only if condition is true |
| Loop | `loop` | Repetition | Repeats while condition holds |
| Break | `break` | Exit | Exits enclosing fragment |
| Parallel | `par` | Concurrent | Multiple interactions happen simultaneously |
| Critical | `critical` | Atomic | Must not be interrupted |
| Negative | `neg` | Invalid | Shows what must NOT happen |
| Reference | `ref` | Sub-diagram | References another sequence diagram |

### Alt Fragment (If-Else)

```
   ┌──────┐           ┌───────────┐
   │:ATM  │           │:BankSystem│
   └──┬───┘           └─────┬─────┘
      │  withdraw(amount)    │
      │─────────────────────→│
      │                      │
      │ ┌─────────────────────────┐
      │ │ alt [balance >= amount]  │
      │ │    │                     │
      │ │    │  dispense(amount)   │
      │ │    │←- - - - - - - - - -│
      │ │────────────────────────── │
      │ │ [else]                   │
      │ │    │                     │
      │ │    │  insufficientFunds()│
      │ │    │←- - - - - - - - - -│
      │ └─────────────────────────┘
      │                      │
```

### Opt Fragment (Optional)

```
      │ ┌──────────────────────────┐
      │ │ opt [receipt requested]   │
      │ │    │                      │
      │ │    │  printReceipt()      │
      │ │    │─────────────────→    │
      │ └──────────────────────────┘
```

### Loop Fragment

```
      │ ┌──────────────────────────────┐
      │ │ loop [for each item in cart]  │
      │ │    │                          │
      │ │    │  calculatePrice(item)    │
      │ │    │─────────────────────→    │
      │ │    │                          │
      │ │    │      price               │
      │ │    │←- - - - - - - - - - -   │
      │ └──────────────────────────────┘
```

:::

---

## Guards and Conditions

:::eli10

Guards are conditions written in square brackets that decide whether a message gets sent. They are like "only do this if..." statements. For example, [age >= 18] means "only send this message if age is 18 or older."

:::

:::eli15

Guards are boolean conditions in square brackets that control whether a message is sent or a fragment operand executes. Iteration markers (*[condition]) indicate repeated execution. Constraints in curly braces specify timing or performance requirements. Guards make the diagram precise about when different paths are taken.

:::

:::eli20

| Element | Syntax | Example |
|---------|--------|---------|
| Guard condition | `[condition]` | `[age >= 18]` |
| Iteration | `*[condition]` | `*[for each item]` |
| Constraint | `{constraint}` | `{response < 2s}` |

:::

---

## Object Creation and Destruction

:::eli10

You can show when new objects are born (created) during the interaction and when they are destroyed. A dashed arrow labelled "create" points to a new box that appears partway down. An X at the end of a lifeline means the object is deleted.

:::

:::eli15

Objects can be created and destroyed during an interaction. Creation is shown with a dashed arrow (stereotyped <<create>>) pointing to a new participant box that appears mid-diagram rather than at the top. Destruction is shown with an arrow ending at an X on the lifeline. This is important for modelling object lifecycle -- showing that some objects only exist temporarily during the interaction.

:::

:::eli20

```
   ┌──────────┐
   │:OrderSvc │
   └────┬─────┘
        │
        │    <<create>>
        │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
        │                       │
        │                 ┌─────┴─────┐
        │                 │ :Order    │
        │                 └─────┬─────┘
        │                       │
        │  addItem(item)        │
        │──────────────────────→│
        │                       │
        │       <<destroy>>     │
        │──────────────────────→X
        │
```

:::

---

## Sequence Diagram vs Other UML

:::eli10

Sequence diagrams are best for showing WHEN things happen in order. Other diagrams are better for other things: communication diagrams show WHO talks to WHO, activity diagrams are like flowcharts, and state machines show how a single object changes states over time.

:::

:::eli15

Sequence diagrams focus on time-ordered messages and are best for walkthroughs of specific scenarios. Communication diagrams show the same information but emphasise object relationships over time ordering. Activity diagrams model workflows and parallel processes. State machines model the lifecycle of a single object through its states and transitions. Choose the diagram type based on what aspect of behaviour you want to communicate.

:::

:::eli20

| Diagram | Shows | Best For |
|---------|-------|----------|
| Sequence | Time-ordered messages | Specific scenario walkthrough |
| Communication | Object links + numbered messages | Showing relationships |
| Activity | Workflow/flowchart | Business processes, parallel flows |
| State Machine | Object states + transitions | Lifecycle of single object |

:::

---

## Drawing Tips

:::eli10

Put the main user on the left side, keep related objects near each other to avoid crossing lines, and only show one scenario per diagram to keep it readable.

:::

:::eli15

For clear sequence diagrams: place actors on the left for natural reading flow, put the most active objects toward the left to minimise crossing arrows, number messages if the diagram is complex, keep to one scenario per diagram, use "ref" fragments to reference sub-interactions, and always show return values on dashed arrows so it is clear what each call produces.

:::

:::eli20

| Tip | Reason |
|-----|--------|
| Actors on the left | Natural reading flow |
| Most active objects toward left | Reduces crossing arrows |
| Number messages if complex | Clarifies order |
| One scenario per diagram | Keep focused and readable |
| Use `ref` for sub-interactions | Manage complexity |
| Show return values on dashed arrows | Clarifies what is returned |

:::

---

## Practice Questions

:::eli20

<details>
<summary>Q: Draw a sequence diagram for online shopping checkout: Customer, ShoppingCart, PaymentGateway, OrderSystem, EmailService. Include an alt fragment for payment success/failure.</summary>

```
┌──────────┐ ┌───────────┐ ┌──────────────┐ ┌───────────┐ ┌────────────┐
│:Customer │ │:Cart      │ │:PaymentGW   │ │:OrderSys  │ │:EmailSvc   │
└────┬─────┘ └─────┬─────┘ └──────┬───────┘ └─────┬─────┘ └──────┬─────┘
     │              │              │               │               │
     │ checkout()   │              │               │               │
     │─────────────→│              │               │               │
     │              │              │               │               │
     │              │ charge(card, total)           │               │
     │              │─────────────→│               │               │
     │              │              │               │               │
     │  ┌───────────────────────────────────────────────────────────┐
     │  │ alt [payment successful]                                   │
     │  │           │              │               │               │
     │  │           │   success    │               │               │
     │  │           │←- - - - - - │               │               │
     │  │           │              │               │               │
     │  │           │ createOrder(items)            │               │
     │  │           │─────────────────────────────→│               │
     │  │           │              │               │               │
     │  │           │              │               │ sendConfirm() │
     │  │           │              │               │──────────────→│
     │  │           │              │               │               │
     │  │           │  orderConfirmation           │               │
     │  │           │←- - - - - - - - - - - - - - │               │
     │  │───────────────────────────────────────────────────────────│
     │  │ [payment failed]                                          │
     │  │           │              │               │               │
     │  │           │   failure    │               │               │
     │  │           │←- - - - - - │               │               │
     │  │           │              │               │               │
     │  │           │ displayError()               │               │
     │  │           │─→(self)      │               │               │
     │  └───────────────────────────────────────────────────────────┘
     │              │              │               │               │
     │  result      │              │               │               │
     │←- - - - - - │              │               │               │
```
</details>

<details>
<summary>Q: What is the difference between alt, opt, and loop fragments?</summary>

| Fragment | Meaning | Operands | Analogy |
|----------|---------|----------|---------|
| **alt** | Alternative (if-else) | 2+ operands separated by dashed line, each with a guard | `if/else if/else` |
| **opt** | Optional (if, no else) | 1 operand with a guard condition | `if` (no else) |
| **loop** | Repetition | 1 operand, repeats while guard is true | `while` or `for` |

- `alt`: Exactly one operand executes (mutual exclusion)
- `opt`: The operand either executes or is skipped entirely
- `loop`: The operand executes zero or more times
</details>

<details>
<summary>Q: In a sequence diagram, what does a self-message represent? When would you use one?</summary>

A **self-message** is an arrow that starts and ends on the same object's lifeline (loops back).

It represents an object calling one of its own methods (internal computation).

**When to use:**
- Showing internal validation (e.g., `validateInput()`)
- Computing a derived value (e.g., `calculateTotal()`)
- State changes within the object (e.g., `updateStatus()`)

It creates a nested activation bar on the same lifeline, showing the object is processing internally before continuing the interaction.
</details>

:::
