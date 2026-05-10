---
title: "UML Class Diagrams"
order: 4
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "UML", "class-diagrams", "OOP", "relationships"]
---

## Class Diagram Notation

A class is represented as a box with three compartments:

```
┌─────────────────────────┐
│      <<stereotype>>      │
│       ClassName          │
├─────────────────────────┤
│ - privateAttr: Type      │
│ # protectedAttr: Type    │
│ + publicAttr: Type       │
│ ~ packageAttr: Type      │
├─────────────────────────┤
│ + publicMethod(): RetType│
│ - privateMethod(): void  │
│ # helper(p: Type): bool  │
└─────────────────────────┘
```

### Visibility Modifiers

| Symbol | Visibility | Accessible From |
|--------|-----------|----------------|
| `+` | Public | Anywhere |
| `-` | Private | Same class only |
| `#` | Protected | Same class & subclasses |
| `~` | Package | Same package |

### Attribute/Method Notation

| Format | Example | Meaning |
|--------|---------|---------|
| `name: Type` | `age: int` | Attribute with type |
| `name: Type = default` | `status: String = "active"` | With default value |
| `method(params): Return` | `getName(): String` | Method signature |
| *`italic`* or `{abstract}` | *`calculateArea()`* | Abstract method |
| <u>`underline`</u> | <u>`getInstance(): Singleton`</u> | Static member |

---

## Relationships

### Relationship Types Summary

| Relationship | Line Style | Meaning | Strength |
|-------------|-----------|---------|----------|
| Association | Solid line | "uses" / "knows about" | Weak |
| Aggregation | Solid line + hollow diamond | "has-a" (shared ownership) | Medium |
| Composition | Solid line + filled diamond | "owns" (exclusive, lifecycle) | Strong |
| Inheritance | Solid line + hollow triangle | "is-a" | Structural |
| Realisation | Dashed line + hollow triangle | "implements" | Structural |
| Dependency | Dashed arrow | "uses temporarily" | Weakest |

### Association

A structural relationship where one class uses or knows about another.

```
┌─────────┐           ┌─────────┐
│ Student │───────────│ Course  │
└─────────┘  enrolls  └─────────┘
```

- Can be **unidirectional** (arrow) or **bidirectional** (plain line)
- Can have a **role name** at each end
- Can have **multiplicity**

### Aggregation (Hollow Diamond)

"Has-a" relationship. Parts can exist independently of the whole.

```
┌────────────┐         ┌─────────┐
│ Department │◇────────│ Teacher │
└────────────┘         └─────────┘
```

- Diamond is on the **whole** side
- If Department is deleted, Teachers still exist
- Teachers can belong to multiple departments

### Composition (Filled Diamond)

"Owns" relationship. Parts cannot exist without the whole.

```
┌─────────┐         ┌────────┐
│  House  │◆────────│  Room  │
└─────────┘         └────────┘
```

- Diamond is on the **whole** side
- If House is destroyed, Rooms are destroyed too
- Rooms belong to exactly one House

### Aggregation vs Composition

| Aspect | Aggregation (◇) | Composition (◆) |
|--------|-----------------|-----------------|
| Lifecycle | Independent | Dependent (part dies with whole) |
| Ownership | Shared possible | Exclusive |
| Multiplicity (whole side) | 0..* | 1 (exactly one owner) |
| Example | Team ◇── Player | Order ◆── OrderLine |
| "Delete whole" effect | Parts survive | Parts destroyed |
| Memory analogy | Reference/pointer | Contained within |

### Inheritance / Generalisation

```
         ┌────────┐
         │ Shape  │  (superclass)
         └────┬───┘
              △
         ┌────┴────┐
    ┌────────┐ ┌────────┐
    │ Circle │ │ Square │  (subclasses)
    └────────┘ └────────┘
```

- Hollow triangle points to **parent**
- Subclass inherits all attributes/methods of superclass
- Represents "is-a" relationship

### Realisation / Implementation

```
     ┌─────────────┐
     │ <<interface>>│
     │  Comparable  │
     └──────┬──────┘
            △ (dashed)
            │
     ┌──────┴──────┐
     │   Student   │
     └─────────────┘
```

- Dashed line + hollow triangle to interface
- Class implements all methods declared in interface

### Dependency

```
┌─────────────┐         ┌──────────┐
│ OrderService│- - - - →│  Logger  │
└─────────────┘         └──────────┘
```

- Weakest relationship (temporary usage)
- Typically: method parameter, local variable, or return type

---

## Multiplicity

| Notation | Meaning |
|----------|---------|
| `1` | Exactly one |
| `0..1` | Zero or one (optional) |
| `*` or `0..*` | Zero or more |
| `1..*` | One or more |
| `n..m` | Between n and m |
| `3` | Exactly three |

### Reading Multiplicity

```
┌─────────┐  1      0..*  ┌─────────┐
│ Company │────────────────│Employee │
└─────────┘                └─────────┘
```

Read: "One Company has zero or more Employees" and "Each Employee works for exactly one Company."

**Tip:** Read multiplicity from the opposite end. The number near Employee (`0..*`) tells how many Employees one Company can have.

---

## Abstract Classes & Interfaces

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Notation | `{abstract}` or *italic name* | `<<interface>>` |
| Can have attributes | Yes | No (only constants) |
| Can have concrete methods | Yes | No (all abstract) |
| Inheritance keyword | extends | implements |
| Multiple inheritance | No (single) | Yes (multiple interfaces) |

```
┌───────────────────────┐     ┌─────────────────────┐
│    {abstract}          │     │   <<interface>>      │
│      Vehicle           │     │     Driveable        │
├───────────────────────┤     ├─────────────────────┤
│ # speed: double        │     │                     │
├───────────────────────┤     ├─────────────────────┤
│ + accelerate(): void   │     │ + steer(d: Dir): void│
│ + *brake(): void*      │     │ + stop(): void       │
└───────────────────────┘     └─────────────────────┘
```

---

## Complete Example

```
┌──────────────────┐          ┌──────────────────┐
│    University     │          │   <<interface>>   │
├──────────────────┤          │    Printable      │
│ - name: String    │          ├──────────────────┤
│ - location: String│          │ + print(): void   │
├──────────────────┤          └────────┬─────────┘
│ + enrol(s): void  │                  △ (dashed)
└────────┬─────────┘                  │
         │◆ 1                         │
         │                     ┌──────┴──────────┐
         │ 1..*               │    Department    │
┌────────┴─────────┐          ├─────────────────┤
│   Department      │          │ - name: String   │
├──────────────────┤          │ - budget: double │
│ - name: String    │          ├─────────────────┤
│ - budget: double  │          │ + print(): void  │
├──────────────────┤          └────────┬─────────┘
│ + hire(t): void   │                  │◇
└────────┬─────────┘                  │ 1..*
         │◇                    ┌──────┴──────────┐
         │ 1..*               │    Lecturer      │
┌────────┴─────────┐          ├─────────────────┤
│    Lecturer       │          │ - name: String   │
├──────────────────┤          │ - title: String  │
│ - name: String    │          ├─────────────────┤
│ - title: String   │          │ + teach(): void  │
├──────────────────┤          └─────────────────┘
│ + teach(): void   │
└──────────────────┘
```

Relationships shown:
- University **composes** Departments (◆) - departments don't exist without the university
- Department **aggregates** Lecturers (◇) - lecturers can exist independently
- Department **realises** Printable interface

---

## Practice Questions

<details>
<summary>Q: Model a class diagram for: A Library has many Books. Each Book has one or more Authors. A Book can be a PhysicalBook or an EBook (both are Books). Members can borrow PhysicalBooks.</summary>

```
┌──────────┐ 1    1..* ┌──────────┐ *      1..* ┌──────────┐
│  Library │◆──────────│   Book   │─────────────│  Author  │
└──────────┘           └────┬─────┘  writtenBy   └──────────┘
                            △
                       ┌────┴────┐
              ┌────────────┐ ┌────────────┐
              │PhysicalBook│ │   EBook    │
              └─────┬──────┘ └────────────┘
                    │ 0..*
                    │ borrows
                    │ 0..1
              ┌─────┴──────┐
              │   Member   │
              └────────────┘
```

- Library ◆ Book: composition (books belong to this library)
- Book △ PhysicalBook/EBook: inheritance
- Book ── Author: association with multiplicity * to 1..*
- Member ── PhysicalBook: association (borrows), 0..1 member per book, 0..* books per member
</details>

<details>
<summary>Q: What is the difference between aggregation and composition? Give a real-world example of each.</summary>

**Aggregation (◇):** "Has-a" with independent lifecycle. Parts can exist without the whole.
- Example: A **Playlist** aggregates **Songs**. Deleting a playlist doesn't delete the songs; songs can be in multiple playlists.

**Composition (◆):** "Owns" with dependent lifecycle. Parts are destroyed when the whole is destroyed.
- Example: An **Invoice** composes **InvoiceLines**. Deleting an invoice deletes its line items; a line item belongs to exactly one invoice and has no meaning alone.
</details>

<details>
<summary>Q: What multiplicity would you assign to: (a) Person to Passport, (b) Student to Module, (c) Order to OrderLine?</summary>

- **(a) Person 1 ── 0..1 Passport:** A person has zero or one passport; a passport belongs to exactly one person.
- **(b) Student * ── * Module:** Many-to-many; a student takes multiple modules, a module has multiple students.
- **(c) Order 1 ── 1..* OrderLine:** An order must have at least one line; each line belongs to exactly one order. (Composition relationship)
</details>
