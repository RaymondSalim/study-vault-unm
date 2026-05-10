---
title: "UML Sequence Diagrams"
order: 5
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "UML", "sequence-diagrams", "interaction", "messages"]
---

## Sequence Diagram Purpose

Sequence diagrams show **how objects interact over time** to accomplish a specific scenario. They emphasise the **order** of messages.

---

## Core Elements

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

---

## Message Types

| Message Type | Arrow Style | Meaning |
|-------------|-------------|---------|
| Synchronous | Solid arrow, filled head (→) | Caller waits for response |
| Asynchronous | Solid arrow, open head (→) | Caller does not wait |
| Return | Dashed arrow (--→) | Return from a call |
| Self-message | Arrow loops back to same lifeline | Object calls itself |
| Create | Dashed arrow to new object box | Instantiation |
| Destroy | Arrow to X | Object deletion |

---

## Example: User Login

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

---

## Combined Fragments

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

---

## Guards and Conditions

| Element | Syntax | Example |
|---------|--------|---------|
| Guard condition | `[condition]` | `[age >= 18]` |
| Iteration | `*[condition]` | `*[for each item]` |
| Constraint | `{constraint}` | `{response < 2s}` |

---

## Object Creation and Destruction

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

---

## Sequence Diagram vs Other UML

| Diagram | Shows | Best For |
|---------|-------|----------|
| Sequence | Time-ordered messages | Specific scenario walkthrough |
| Communication | Object links + numbered messages | Showing relationships |
| Activity | Workflow/flowchart | Business processes, parallel flows |
| State Machine | Object states + transitions | Lifecycle of single object |

---

## Drawing Tips

| Tip | Reason |
|-----|--------|
| Actors on the left | Natural reading flow |
| Most active objects toward left | Reduces crossing arrows |
| Number messages if complex | Clarifies order |
| One scenario per diagram | Keep focused and readable |
| Use `ref` for sub-interactions | Manage complexity |
| Show return values on dashed arrows | Clarifies what is returned |

---

## Practice Questions

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
