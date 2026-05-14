---
title: "UML Class Diagrams"
order: 4
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "UML", "class-diagrams", "OOP", "relationships"]
---

## Class Diagram Notation

:::eli10

A class diagram is like a blueprint for objects in your program. Each class is a box divided into three parts: the name at the top, the data it stores in the middle, and the actions it can perform at the bottom. Symbols like + and - show who is allowed to see each part.

:::

:::eli15

UML class diagrams model the static structure of a system. Each class is represented as a three-compartment box: class name, attributes (data), and methods (behaviour). Visibility modifiers (+ public, - private, # protected, ~ package) control access. Attributes include their type and optional default values. Methods show their parameters and return types. Abstract members are shown in italics, static members are underlined.

:::

:::eli20

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

:::

---

## Relationships

:::eli10

Classes are connected by lines that show how they relate. A solid line means "knows about." A diamond means "has" (hollow diamond = shared, filled diamond = owns completely). A triangle means "is a type of." Different lines show different strengths of connection.

:::

:::eli15

Relationships between classes range from weak to strong. Dependency (dashed arrow) is the weakest: temporary usage. Association (solid line) means one class knows about another. Aggregation (hollow diamond) means "has-a" with independent lifecycles. Composition (filled diamond) means "owns" with dependent lifecycles. Inheritance (solid line + hollow triangle) means "is-a." Realisation (dashed line + hollow triangle) means "implements an interface."

:::

:::eli20

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

:::

---

## Multiplicity

:::eli10

Multiplicity tells you how many objects can be on each side of a relationship. "1" means exactly one, "0..*" means zero or more, "1..*" means at least one. It is like saying "a school has many students" or "each student has exactly one student ID."

:::

:::eli15

Multiplicity notation specifies how many instances of one class can be associated with one instance of another. Common values: 1 (exactly one), 0..1 (optional), * or 0..* (zero or more), 1..* (one or more). Read multiplicity from the opposite end: the number next to a class tells how many of that class relate to one instance of the other class. Getting multiplicity right is crucial for database design.

:::

:::eli20

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

:::

---

## Abstract Classes & Interfaces

:::eli10

An abstract class is like an incomplete template: it provides some things but leaves others for subclasses to fill in. An interface is a contract that says "any class implementing me must have these methods" without providing any code at all. A class can have only one parent class but can follow multiple interfaces.

:::

:::eli15

Abstract classes can contain both concrete and abstract methods plus attributes. They cannot be instantiated directly and serve as partial templates. Interfaces declare only method signatures (no implementation, no attributes beyond constants). A class can extend one abstract class but implement multiple interfaces. In UML, abstract classes use italic names or {abstract}, while interfaces use the <<interface>> stereotype.

:::

:::eli20

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

:::

---

## Complete Example

:::eli10

Here is a full diagram showing a University that owns Departments (composition -- departments cannot exist without the university), Departments that have Lecturers (aggregation -- lecturers can exist independently), and Departments implementing a Printable interface.

:::

:::eli15

This example combines multiple relationship types in one diagram. University composes Departments (strong ownership, lifecycle dependency). Department aggregates Lecturers (lecturers exist independently). Department realises the Printable interface (must implement the print method). Multiplicities show one university has one or more departments, and one department has one or more lecturers.

:::

:::eli20

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

:::

---

## Practice Questions

:::eli20

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

:::
