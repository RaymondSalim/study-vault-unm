---
title: "Refactoring and Code Smells"
order: 6
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["refactoring", "code smells", "God class", "feature envy", "extract method", "polymorphism", "Java"]
---

# Refactoring and Code Smells

## What is Refactoring?

:::eli10

Refactoring is cleaning up your code without changing what it does. It is like rearranging your room -- everything still works the same, but now it is tidier and easier to find things. The key rules are: always have tests first (so you know nothing breaks), make small changes one at a time, and never add new features at the same time as refactoring.

:::

:::eli15

Refactoring is the disciplined process of restructuring existing code without changing its external behaviour. Key principles: always have passing tests before starting (safety net), make small incremental changes, run tests after each change, and never combine refactoring with feature development. Refactoring improves internal quality (readability, maintainability, extensibility) while preserving functionality. It is the primary weapon against software entropy and technical debt.

:::

:::eli20

> Refactoring is improving the internal structure of code without changing its external behaviour.

**Key principles:**
- Always have tests before refactoring
- Small, incremental changes
- Run tests after each change
- Never refactor and add features simultaneously

:::

---

## Code Smells

:::eli10

Code smells are warning signs that something in your code might be wrong -- like a bad smell in the kitchen means something is off. A method that is too long, a class that does too many things, or code that is duplicated in multiple places are all "smells." They do not mean the code is broken, but they suggest it could be improved.

:::

:::eli15

Code smells are surface-level indicators of potential deeper problems in code. They are grouped into categories: Bloaters (things that have grown too large), OO Abusers (misuse of object-oriented features), Change Preventers (structures that make changes difficult), Dispensables (unnecessary code), and Couplers (excessive dependencies between classes). Each smell has one or more standard refactoring techniques to address it. Recognising smells is the first step toward targeted improvement.

:::

:::eli20

### Bloaters

| Smell | Symptom | Fix |
|-------|---------|-----|
| **Long Method** | Method > 20 lines, does too much | Extract Method |
| **Large Class (God Class)** | Class has too many fields/methods/responsibilities | Extract Class, SRP |
| **Long Parameter List** | Method takes > 3-4 parameters | Introduce Parameter Object, Builder |
| **Primitive Obsession** | Using primitives instead of small objects | Replace with Value Object |
| **Data Clumps** | Groups of data that always appear together | Extract Class |

### Object-Orientation Abusers

| Smell | Symptom | Fix |
|-------|---------|-----|
| **Switch Statements** | Repeated switch/if-else on type | Replace Conditional with Polymorphism |
| **Refused Bequest** | Subclass doesn't use inherited methods | Replace Inheritance with Delegation |
| **Temporary Field** | Fields only used in some circumstances | Extract Class |
| **Alternative Classes with Different Interfaces** | Classes do same thing with different method names | Rename/Extract Interface |

### Change Preventers

| Smell | Symptom | Fix |
|-------|---------|-----|
| **Divergent Change** | One class modified for many different reasons | Extract Class (SRP) |
| **Shotgun Surgery** | One change requires modifying many classes | Move Method, Inline Class |
| **Parallel Inheritance** | Adding a subclass in one hierarchy requires adding one in another | Move Method, collapse hierarchy |

### Dispensables

| Smell | Symptom | Fix |
|-------|---------|-----|
| **Dead Code** | Unreachable/unused code | Delete it |
| **Speculative Generality** | Code created "just in case" | Remove unused abstractions |
| **Duplicate Code** | Same logic in multiple places | Extract Method/Class |
| **Lazy Class** | Class that doesn't do enough to justify existence | Inline Class |
| **Comments (excessive)** | Comments compensating for bad code | Rename, Extract Method |

### Couplers

| Smell | Symptom | Fix |
|-------|---------|-----|
| **Feature Envy** | Method uses another class's data more than its own | Move Method |
| **Inappropriate Intimacy** | Classes access each other's private parts | Move Method, Extract Class |
| **Message Chains** | `a.getB().getC().getD().doSomething()` | Hide Delegate |
| **Middle Man** | Class only delegates to another | Remove Middle Man |

:::

---

## Key Refactoring Techniques

:::eli10

The most common refactoring moves are: Extract Method (pull a chunk of code into its own named method), Move Method (put a method in the class whose data it uses most), Replace Conditional with Polymorphism (replace if/switch on type with proper subclasses), Extract Class (split a big class into smaller focused ones), and Introduce Parameter Object (bundle related parameters into one object).

:::

:::eli15

Key refactoring techniques address specific code smells: Extract Method breaks long methods into smaller named pieces. Move Method relocates methods to the class that owns the data they use (fixes Feature Envy). Replace Conditional with Polymorphism eliminates type-checking conditionals by using inheritance. Extract Class splits God Classes into focused classes (enforces SRP). Introduce Parameter Object groups related parameters into a dedicated object. Replace Inheritance with Delegation fixes Refused Bequest. Each technique has a well-defined, reversible procedure.

:::

:::eli20

### 1. Extract Method

```java
// BEFORE: Long method with embedded logic
public void printOwing() {
    printBanner();

    // Calculate outstanding
    double outstanding = 0.0;
    for (Order order : orders) {
        outstanding += order.getAmount();
    }

    // Print details
    System.out.println("name: " + name);
    System.out.println("amount: " + outstanding);
}

// AFTER: Extracted methods
public void printOwing() {
    printBanner();
    double outstanding = calculateOutstanding();
    printDetails(outstanding);
}

private double calculateOutstanding() {
    return orders.stream()
        .mapToDouble(Order::getAmount)
        .sum();
}

private void printDetails(double outstanding) {
    System.out.println("name: " + name);
    System.out.println("amount: " + outstanding);
}
```

### 2. Move Method

```java
// BEFORE: Feature Envy - method uses Order's data extensively
public class Invoice {
    public double getDiscount(Order order) {
        if (order.getQuantity() > 10 && order.getCustomerType().equals("VIP")) {
            return order.getTotal() * 0.15;
        }
        return order.getTotal() * 0.05;
    }
}

// AFTER: Move method to Order where the data lives
public class Order {
    private int quantity;
    private String customerType;
    private double total;

    public double getDiscount() {
        if (quantity > 10 && customerType.equals("VIP")) {
            return total * 0.15;
        }
        return total * 0.05;
    }
}
```

### 3. Replace Conditional with Polymorphism

```java
// BEFORE: Switch on type
public class Employee {
    private String type; // "engineer", "manager", "salesman"

    public double calculatePay(double basePay) {
        switch (type) {
            case "engineer":  return basePay;
            case "manager":   return basePay * 1.5;
            case "salesman":  return basePay + calculateCommission();
            default: throw new IllegalStateException();
        }
    }
}

// AFTER: Polymorphism
public abstract class Employee {
    protected double basePay;
    public abstract double calculatePay();
}

public class Engineer extends Employee {
    public double calculatePay() { return basePay; }
}

public class Manager extends Employee {
    public double calculatePay() { return basePay * 1.5; }
}

public class Salesman extends Employee {
    private double commission;
    public double calculatePay() { return basePay + commission; }
}
```

### 4. Extract Class

```java
// BEFORE: God Class
public class Person {
    private String name;
    private String street;
    private String city;
    private String postcode;
    private String areaCode;
    private String phoneNumber;

    public String getFullAddress() { return street + ", " + city + " " + postcode; }
    public String getFullPhone() { return "(" + areaCode + ") " + phoneNumber; }
}

// AFTER: Extracted Address and PhoneNumber
public class Person {
    private String name;
    private Address address;
    private PhoneNumber phone;
}

public class Address {
    private String street;
    private String city;
    private String postcode;
    public String getFullAddress() { return street + ", " + city + " " + postcode; }
}

public class PhoneNumber {
    private String areaCode;
    private String number;
    public String getFullPhone() { return "(" + areaCode + ") " + number; }
}
```

### 5. Introduce Parameter Object

```java
// BEFORE: Long parameter list
public List<Transaction> findTransactions(
    Date startDate, Date endDate,
    double minAmount, double maxAmount,
    String accountId) { /* ... */ }

// AFTER: Parameter object
public class TransactionFilter {
    private Date startDate;
    private Date endDate;
    private double minAmount;
    private double maxAmount;
    private String accountId;
    // Constructor, getters, builder...
}

public List<Transaction> findTransactions(TransactionFilter filter) { /* ... */ }
```

### 6. Replace Inheritance with Delegation

```java
// BEFORE: Stack inherits from Vector (real Java mistake!)
public class Stack<E> extends Vector<E> {
    // Inherits add(index, element), get(index), etc. - inappropriate!
}

// AFTER: Delegation
public class Stack<E> {
    private List<E> elements = new ArrayList<>();

    public void push(E item) { elements.add(item); }
    public E pop() { return elements.remove(elements.size() - 1); }
    public E peek() { return elements.get(elements.size() - 1); }
    public boolean isEmpty() { return elements.isEmpty(); }
}
```

:::

---

## Refactoring Workflow

:::eli10

The refactoring workflow is simple: make sure tests exist and pass, find the smell, pick the right fix, apply it in small steps, run tests after each step, and save your work when tests pass. Never skip the testing steps -- that is how bugs sneak in.

:::

:::eli15

The safe refactoring workflow is: (1) ensure comprehensive tests exist and pass, (2) identify the specific code smell, (3) choose the appropriate refactoring technique, (4) apply the refactoring in small incremental steps, (5) run tests after each step to catch regressions immediately, (6) commit when tests pass. This disciplined approach minimises risk and ensures external behaviour is preserved. Automated refactoring tools in IDEs (rename, extract method, etc.) provide additional safety.

:::

:::eli20

| Step | Action |
|------|--------|
| 1 | Ensure tests exist and pass |
| 2 | Identify the code smell |
| 3 | Choose appropriate refactoring technique |
| 4 | Apply refactoring in small steps |
| 5 | Run tests after each step |
| 6 | Commit when tests pass |

:::

---

<details>
<summary>Practice: Identify the code smell</summary>

1. A `UserManager` class with 2000 lines handling auth, profiles, billing, and notifications → **God Class / Large Class**
2. `order.getCustomer().getAddress().getCity().toUpperCase()` → **Message Chain**
3. A method that takes `(String name, String email, String phone, String street, String city, String postcode, int age)` → **Long Parameter List**
4. A method in `ReportFormatter` that mostly calls methods on `DataFetcher` → **Feature Envy**
5. Fields `x1, y1, x2, y2` appearing together in 5 different classes → **Data Clumps**
6. A `Shape` class with `getVolume()` inherited by `Circle` (2D shape) → **Refused Bequest**

</details>

<details>
<summary>Practice: Which refactoring technique?</summary>

1. A 50-line method with 3 distinct sections → **Extract Method** (3 times)
2. A switch statement on employee type in 4 different methods → **Replace Conditional with Polymorphism**
3. A method in ClassA that only uses data from ClassB → **Move Method** to ClassB
4. A class with 15 fields, half related to address → **Extract Class** (Address)
5. An inheritance hierarchy where child ignores half of parent's methods → **Replace Inheritance with Delegation**

</details>
