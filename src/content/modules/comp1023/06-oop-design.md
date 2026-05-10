---
title: "OOP Principles & Software Design"
order: 6
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "OOP", "SOLID", "design-patterns", "coupling", "cohesion"]
---

## Four Pillars of OOP

| Principle | Definition | Benefit |
|-----------|-----------|---------|
| **Encapsulation** | Bundling data + methods; hiding internal state | Reduces coupling, protects invariants |
| **Abstraction** | Exposing essential features, hiding complexity | Simplifies usage, manages complexity |
| **Inheritance** | Subclass inherits from superclass ("is-a") | Code reuse, polymorphic behaviour |
| **Polymorphism** | Same interface, different implementations | Extensibility, substitutability |

### Encapsulation Example

```java
// BAD: Exposed internal state
public class BankAccount {
    public double balance; // Anyone can set to -9999!
}

// GOOD: Encapsulated
public class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

### Polymorphism Example

```java
// Same method name, different behaviour
Shape[] shapes = {new Circle(5), new Square(3), new Triangle(4, 6)};

for (Shape s : shapes) {
    System.out.println(s.area()); // Each calculates differently
}
```

---

## SOLID Principles

| Principle | Full Name | Meaning | Violation Symptom |
|-----------|-----------|---------|-------------------|
| **S** | Single Responsibility | A class has one reason to change | God class, does too much |
| **O** | Open/Closed | Open for extension, closed for modification | Modifying existing code to add features |
| **L** | Liskov Substitution | Subtypes must be substitutable for base types | Overridden methods break expectations |
| **I** | Interface Segregation | Clients shouldn't depend on unused methods | Fat interfaces, empty implementations |
| **D** | Dependency Inversion | Depend on abstractions, not concretions | Hard-coded dependencies, can't test |

### Single Responsibility (SRP)

```java
// BAD: Multiple responsibilities
class Employee {
    void calculatePay() { ... }    // payroll logic
    void saveToDatabase() { ... }  // persistence logic
    void generateReport() { ... }  // reporting logic
}

// GOOD: Separated
class Employee { ... }             // domain data
class PayrollCalculator { ... }    // payroll logic
class EmployeeRepository { ... }   // persistence
class EmployeeReporter { ... }     // reporting
```

### Open/Closed Principle (OCP)

```java
// BAD: Must modify to add new shape
double area(Shape s) {
    if (s.type == "circle") return pi * s.r * s.r;
    if (s.type == "square") return s.side * s.side;
    // Must add new if-branch for every new shape!
}

// GOOD: Extend without modifying
abstract class Shape {
    abstract double area();
}
class Circle extends Shape { double area() { return pi * r * r; } }
class Square extends Shape { double area() { return side * side; } }
// New shapes just add a new class - no existing code changes
```

### Liskov Substitution (LSP)

```java
// VIOLATION: Square overrides Rectangle in unexpected way
class Rectangle {
    void setWidth(int w) { width = w; }
    void setHeight(int h) { height = h; }
}

class Square extends Rectangle {
    void setWidth(int w) { width = w; height = w; }  // breaks expectation!
    void setHeight(int h) { width = h; height = h; } // breaks expectation!
}

// Client code that works with Rectangle breaks with Square:
Rectangle r = new Square();
r.setWidth(5);
r.setHeight(3);
assert r.area() == 15; // FAILS! area is 9
```

---

## Coupling & Cohesion

### Coupling (Between Modules)

| Level | Type | Description | Example |
|-------|------|-------------|---------|
| Lowest | Message | Communication via simple parameters | Method calls with primitives |
| Low | Data | Sharing simple data structures | Passing DTOs |
| Medium | Stamp | Sharing complex data (uses part of it) | Passing whole object, using one field |
| High | Control | One module controls another's logic | Passing a flag that changes behaviour |
| Highest | Content | One module modifies another's internals | Directly accessing private fields |

**Goal: LOW coupling** - modules are independent, changes don't ripple.

### Cohesion (Within a Module)

| Level | Type | Description | Example |
|-------|------|-------------|---------|
| Highest | Functional | All elements contribute to one task | `MathUtils.sqrt()` |
| High | Sequential | Output of one element is input to next | Pipeline processing |
| Medium | Communicational | Elements operate on same data | CRUD operations on one entity |
| Low | Procedural | Elements follow execution order | Initialisation routines |
| Low | Temporal | Elements executed at same time | Startup/shutdown tasks |
| Lowest | Coincidental | No meaningful relationship | Utility grab-bag class |

**Goal: HIGH cohesion** - each module does one thing well.

### Summary

| Property | Good | Bad |
|----------|------|-----|
| Coupling | Low (loose) | High (tight) |
| Cohesion | High (focused) | Low (unfocused) |

---

## Design Patterns (Introduction)

Design patterns are reusable solutions to common design problems.

### Creational Patterns

| Pattern | Intent | When to Use |
|---------|--------|------------|
| **Singleton** | Ensure one instance, global access | Database connection, config |
| **Factory Method** | Let subclasses decide which class to create | When exact type isn't known upfront |
| **Abstract Factory** | Create families of related objects | UI toolkit (buttons + menus for OS) |

### Structural Patterns

| Pattern | Intent | When to Use |
|---------|--------|------------|
| **Adapter** | Convert interface to expected interface | Integrating legacy/third-party code |
| **Decorator** | Add responsibilities dynamically | Extending behaviour without subclassing |
| **Facade** | Simplified interface to complex subsystem | Hiding complexity from clients |

### Behavioural Patterns

| Pattern | Intent | When to Use |
|---------|--------|------------|
| **Observer** | One-to-many notification | Event systems, MVC |
| **Strategy** | Interchangeable algorithms | Multiple ways to do same thing |
| **Template Method** | Algorithm skeleton, subclasses fill steps | Frameworks with hook methods |

### Observer Pattern Example

```java
interface Observer {
    void update(String event);
}

class EventBus {
    private List<Observer> observers = new ArrayList<>();

    void subscribe(Observer o) { observers.add(o); }
    void notify(String event) {
        for (Observer o : observers) o.update(event);
    }
}

class EmailNotifier implements Observer {
    void update(String event) { sendEmail(event); }
}

class Logger implements Observer {
    void update(String event) { log(event); }
}
```

---

## Practice Questions

<details>
<summary>Q: Identify which SOLID principle is violated: A class `ReportGenerator` that generates reports AND sends them via email AND saves them to disk.</summary>

**Single Responsibility Principle (SRP)** is violated.

The class has three reasons to change:
1. Report format changes (generation logic)
2. Email provider changes (sending logic)
3. Storage location changes (persistence logic)

**Fix:** Split into `ReportGenerator`, `ReportEmailer`, and `ReportRepository`.
</details>

<details>
<summary>Q: A system has a `Bird` class with a `fly()` method. A `Penguin` class extends `Bird` but throws an exception in `fly()`. Which SOLID principle is violated?</summary>

**Liskov Substitution Principle (LSP)** is violated.

Any code expecting a `Bird` (which can fly) will break when given a `Penguin`. Subtypes must be substitutable for their base types without altering program correctness.

**Fix options:**
1. Create separate `FlyingBird` and `NonFlyingBird` classes
2. Use an interface `Flyable` that only flying birds implement
3. Restructure: `Bird` has no `fly()`, only `FlyingBird extends Bird` does
</details>

<details>
<summary>Q: Explain the difference between high coupling and low cohesion with examples.</summary>

**High coupling (BAD):** Module A depends heavily on Module B's internals.
- Example: `OrderService` directly accesses `Database.connection` field, constructs raw SQL, and parses result sets. Changing the database requires changing `OrderService`.

**Low cohesion (BAD):** A module does many unrelated things.
- Example: A `Utils` class with methods `formatDate()`, `sendEmail()`, `calculateTax()`, `resizeImage()`. These have no logical relationship.

**Combined good design:**
- Low coupling: `OrderService` calls `OrderRepository.save(order)` - doesn't know about DB internals
- High cohesion: `OrderRepository` only handles order persistence operations
</details>

<details>
<summary>Q: When would you use the Strategy pattern vs inheritance?</summary>

**Use Strategy when:**
- Algorithms need to be swapped at runtime
- Multiple independent dimensions of variation exist
- You want to avoid a combinatorial explosion of subclasses

**Use Inheritance when:**
- Behaviour is fixed at compile time
- "Is-a" relationship genuinely exists
- Subclasses share significant implementation

**Example:** A `PaymentProcessor` that supports Credit Card, PayPal, and Crypto.
- Strategy (preferred): `PaymentProcessor` holds a `PaymentStrategy` interface; swap implementations at runtime.
- Inheritance (problematic): `CreditCardProcessor`, `PayPalProcessor`, `CryptoProcessor` - what if you also need `DomesticProcessor` and `InternationalProcessor`? Combinatorial explosion.
</details>
