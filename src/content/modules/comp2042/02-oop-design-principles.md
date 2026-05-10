---
title: "OOP Design Principles"
order: 2
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["SOLID", "OOP", "coupling", "cohesion", "GRASP", "design principles", "Java"]
---

# OOP Design Principles

## SOLID Principles Summary

| Principle | Name | One-liner |
|-----------|------|-----------|
| **S** | Single Responsibility | A class should have only one reason to change |
| **O** | Open/Closed | Open for extension, closed for modification |
| **L** | Liskov Substitution | Subtypes must be substitutable for their base types |
| **I** | Interface Segregation | Clients should not depend on interfaces they don't use |
| **D** | Dependency Inversion | Depend on abstractions, not concretions |

---

## S - Single Responsibility Principle (SRP)

> A class should have only one reason to change.

```java
// BAD: Multiple responsibilities
public class Employee {
    public double calculatePay() { /* ... */ }
    public void saveToDatabase() { /* ... */ }
    public String generateReport() { /* ... */ }
}

// GOOD: Separated responsibilities
public class Employee {
    private String name;
    private double salary;
    // Only employee data and behaviour
}

public class PayCalculator {
    public double calculatePay(Employee e) { /* ... */ }
}

public class EmployeeRepository {
    public void save(Employee e) { /* ... */ }
}

public class EmployeeReportGenerator {
    public String generate(Employee e) { /* ... */ }
}
```

## O - Open/Closed Principle (OCP)

> Software entities should be open for extension but closed for modification.

```java
// BAD: Must modify existing code to add new shapes
public class AreaCalculator {
    public double calculateArea(Object shape) {
        if (shape instanceof Circle) {
            Circle c = (Circle) shape;
            return Math.PI * c.radius * c.radius;
        } else if (shape instanceof Rectangle) {
            Rectangle r = (Rectangle) shape;
            return r.width * r.height;
        }
        // Adding Triangle requires modifying this method!
        return 0;
    }
}

// GOOD: Extend without modifying existing code
public interface Shape {
    double area();
}

public class Circle implements Shape {
    private double radius;
    public double area() { return Math.PI * radius * radius; }
}

public class Rectangle implements Shape {
    private double width, height;
    public double area() { return width * height; }
}

// Adding Triangle: just create a new class, no modification needed
public class Triangle implements Shape {
    private double base, height;
    public double area() { return 0.5 * base * height; }
}
```

## L - Liskov Substitution Principle (LSP)

> If S is a subtype of T, then objects of type T may be replaced with objects of type S without altering correctness.

```java
// BAD: Square violates LSP for Rectangle
public class Rectangle {
    protected int width, height;
    public void setWidth(int w) { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int area() { return width * height; }
}

public class Square extends Rectangle {
    // Violates LSP: changing width must also change height
    public void setWidth(int w) { this.width = w; this.height = w; }
    public void setHeight(int h) { this.width = h; this.height = h; }
}

// Client code that breaks:
void resize(Rectangle r) {
    r.setWidth(5);
    r.setHeight(4);
    assert r.area() == 20; // FAILS for Square!
}

// GOOD: Use a common interface
public interface Shape {
    int area();
}

public class Rectangle implements Shape { /* ... */ }
public class Square implements Shape { /* ... */ }
```

## I - Interface Segregation Principle (ISP)

> Clients should not be forced to depend on interfaces they do not use.

```java
// BAD: Fat interface
public interface Worker {
    void work();
    void eat();
    void sleep();
}

public class Robot implements Worker {
    public void work() { /* OK */ }
    public void eat() { /* Robots don't eat! */ }
    public void sleep() { /* Robots don't sleep! */ }
}

// GOOD: Segregated interfaces
public interface Workable {
    void work();
}

public interface Feedable {
    void eat();
}

public interface Restable {
    void sleep();
}

public class HumanWorker implements Workable, Feedable, Restable {
    public void work() { /* ... */ }
    public void eat() { /* ... */ }
    public void sleep() { /* ... */ }
}

public class Robot implements Workable {
    public void work() { /* ... */ }
}
```

## D - Dependency Inversion Principle (DIP)

> High-level modules should not depend on low-level modules. Both should depend on abstractions.

```java
// BAD: High-level depends on low-level
public class NotificationService {
    private EmailSender emailSender = new EmailSender(); // Concrete!

    public void notify(String message) {
        emailSender.send(message);
    }
}

// GOOD: Both depend on abstraction
public interface MessageSender {
    void send(String message);
}

public class EmailSender implements MessageSender {
    public void send(String message) { /* send email */ }
}

public class SmsSender implements MessageSender {
    public void send(String message) { /* send SMS */ }
}

public class NotificationService {
    private MessageSender sender; // Abstraction!

    public NotificationService(MessageSender sender) {
        this.sender = sender; // Injected dependency
    }

    public void notify(String message) {
        sender.send(message);
    }
}
```

---

## Coupling and Cohesion

### Coupling (aim: LOW)

| Type | Description | Example |
|------|-------------|---------|
| Content | One module modifies internals of another | Accessing private fields via reflection |
| Common | Shared global data | Multiple classes writing to a global variable |
| Control | One module controls flow of another | Passing a flag to select behaviour |
| Stamp | Sharing a composite data structure | Passing an entire object when only one field is needed |
| Data | Only passing necessary data | Method parameters are simple types |
| Message | Only communicating via messages | Event-driven / observer |

*Ordered worst (content) to best (message).*

### Cohesion (aim: HIGH)

| Type | Description | Quality |
|------|-------------|---------|
| Functional | All elements contribute to a single well-defined task | Best |
| Sequential | Output of one element is input to the next | Good |
| Communicational | Elements operate on the same data | Acceptable |
| Procedural | Elements follow a specific order of execution | Moderate |
| Temporal | Elements are related by timing | Weak |
| Logical | Elements are logically related but functionally different | Poor |
| Coincidental | Elements have no meaningful relationship | Worst |

---

## GRASP Principles

| Principle | Guideline |
|-----------|-----------|
| **Information Expert** | Assign responsibility to the class with the most information to fulfil it |
| **Creator** | B creates A if B contains/aggregates A, records A, closely uses A, or has init data for A |
| **Controller** | Assign system event handling to a non-UI class (use-case controller) |
| **Low Coupling** | Assign responsibilities to minimize dependencies |
| **High Cohesion** | Keep classes focused and manageable |
| **Polymorphism** | Use polymorphism to handle alternatives based on type |
| **Pure Fabrication** | Invent a class that doesn't represent a domain concept to achieve low coupling/high cohesion |
| **Indirection** | Assign responsibility to an intermediate object to decouple |
| **Protected Variations** | Wrap instability behind an interface |

---

## UML Class Relationships

| Relationship | Arrow | Meaning | Strength |
|--------------|-------|---------|----------|
| Dependency | `..>` (dashed) | Uses temporarily | Weakest |
| Association | `-->` (solid) | Has-a (knows about) | Weak |
| Aggregation | `--<>` (hollow diamond) | Has-a (part of, can exist independently) | Medium |
| Composition | `--<*>` (filled diamond) | Has-a (part of, cannot exist independently) | Strong |
| Inheritance | `--|>` (hollow triangle) | Is-a | Strongest |
| Realisation | `..|>` (dashed triangle) | Implements interface | Strong |

<details>
<summary>Practice: Which SOLID principle is violated?</summary>

1. A `Logger` class that writes to files, formats messages, AND sends emails → **SRP** (multiple responsibilities)
2. Adding a new payment method requires modifying `PaymentProcessor` → **OCP** (not open for extension)
3. A `Bird` interface with `fly()` method implemented by `Penguin` → **LSP** (penguin can't fly)
4. A `Machine` interface with `print()`, `scan()`, `fax()` methods → **ISP** (too many methods)
5. A `ReportGenerator` that directly instantiates `MySQLConnection` → **DIP** (depends on concretion)

</details>

<details>
<summary>Practice: Identify coupling type</summary>

1. Class A reads private fields of Class B using reflection → **Content coupling**
2. Two classes share a global configuration object they both write to → **Common coupling**
3. Method receives only the specific int value it needs → **Data coupling**
4. Method receives a boolean flag that changes its behaviour → **Control coupling**
5. Classes communicate only through events → **Message coupling**

</details>
