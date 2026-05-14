---
title: "OOP Basics - Classes & Encapsulation"
order: 3
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "oop", "classes", "objects", "constructors", "encapsulation", "this"]
---

# OOP Basics - Classes & Encapsulation

## Classes and Objects

:::eli10

A class is like a cookie cutter -- it defines the shape. An object is an actual cookie made from that cutter. You can make many cookies (objects) from one cutter (class). Each cookie can have different decorations (different field values), but they all have the same shape (same fields and methods).

:::

:::eli15

A class is a blueprint that defines what data (fields) and behavior (methods) objects will have. An object is a concrete instance created from a class using `new`. Each object has its own copy of instance fields but shares the method definitions. The constructor is a special method that initializes a new object's state when it's created.

:::

:::eli20

A **class** is a blueprint; an **object** is an instance of that blueprint.

```java
public class Student {
    // Fields (instance variables)
    private String name;
    private int age;
    private String studentId;

    // Constructor
    public Student(String name, int age, String studentId) {
        this.name = name;
        this.age = age;
        this.studentId = studentId;
    }

    // Methods
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

```java
// Creating objects
Student s1 = new Student("Alice", 20, "CS001");
Student s2 = new Student("Bob", 21, "CS002");
```

:::

## Memory Model

:::eli10

Think of your program as having two areas: a stack of sticky notes (the stack) and a big warehouse (the heap). Sticky notes hold simple things like numbers and directions to the warehouse. The actual objects (like Student) live in the warehouse, and your sticky note just tells you which shelf to find them on.

:::

:::eli15

Java memory is split into two regions. The stack stores local variables, method parameters, and object references (pointers). The heap stores actual objects created with `new`. A variable of an object type (like `Student s`) holds a reference (address) on the stack that points to the object on the heap. Multiple references can point to the same object.

:::

:::eli20

| Region | Stores |
|--------|--------|
| **Stack** | Local variables, method parameters, references |
| **Heap** | Objects (created with `new`) |

```java
Student s = new Student("Alice", 20, "CS001");
// s (reference) is on the stack
// The Student object is on the heap
// s points to that object
```

:::

## Constructors

:::eli10

A constructor is like the instructions that run when you build a new LEGO set. It sets up all the pieces the right way. You can have different instruction sheets for the same set (different constructors) -- one might need all the details, another might use some default pieces.

:::

:::eli15

Constructors are special methods that initialize new objects. They must have the same name as the class and no return type. If you don't write any constructor, Java provides a default no-argument one. But if you write any constructor, the default disappears. You can overload constructors and chain them using `this(...)` to avoid code duplication.

:::

:::eli20

### Rules

- Same name as the class
- No return type (not even `void`)
- Called with `new`
- If you write no constructor, Java provides a **default no-arg constructor**
- If you write ANY constructor, the default is NOT provided

### Constructor Overloading & Chaining

```java
public class Rectangle {
    private double width;
    private double height;

    // Primary constructor
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    // Overloaded: square
    public Rectangle(double side) {
        this(side, side);       // calls the 2-arg constructor
    }

    // Overloaded: default unit square
    public Rectangle() {
        this(1.0, 1.0);        // calls the 2-arg constructor
    }
}
```

> `this(...)` must be the **first statement** in the constructor.

### Copy Constructor

```java
public Rectangle(Rectangle other) {
    this(other.width, other.height);
}
```

:::

## The `this` Keyword

:::eli10

`this` is like saying "me" or "myself." When a method needs to talk about the object it belongs to, it says `this`. It's especially useful when a parameter has the same name as a field -- `this.name` means "my name" while just `name` means "the name someone passed in."

:::

:::eli15

The `this` keyword refers to the current object instance. Its main uses are: disambiguating between a field and a parameter with the same name (`this.name = name`), calling another constructor from within a constructor (`this(...)`), and returning the current object for method chaining (`return this`).

:::

:::eli20

| Usage | Meaning |
|-------|---------|
| `this.field` | Refers to the current object's field (disambiguates from parameter) |
| `this.method()` | Calls another method on the current object |
| `this(args)` | Calls another constructor of the same class |
| `return this` | Returns the current object (method chaining) |

```java
public class Builder {
    private String name;
    private int value;

    public Builder setName(String name) {
        this.name = name;
        return this;    // enables chaining
    }

    public Builder setValue(int value) {
        this.value = value;
        return this;
    }
}

// Usage: method chaining
Builder b = new Builder().setName("test").setValue(42);
```

:::

## Encapsulation

:::eli10

Encapsulation is like putting your money in a piggy bank instead of leaving it on the table. People can't just grab it -- they have to use the slot (setter) to put money in and shake it (getter) to find out how much is there. This protects your money from someone accidentally (or intentionally) messing with it.

:::

:::eli15

Encapsulation means hiding an object's internal data and controlling access through methods. Fields are declared `private` so they cannot be directly accessed from outside. Public getter and setter methods provide controlled access, allowing validation (reject negative deposits), computed values, and the flexibility to change internal implementation without breaking external code.

:::

:::eli20

**Encapsulation** = bundling data (fields) with methods that operate on that data, and restricting direct access.

### Access Modifiers

| Modifier | Class | Package | Subclass | World |
|----------|:-----:|:-------:|:--------:|:-----:|
| `private` | Yes | No | No | No |
| (default/package-private) | Yes | Yes | No | No |
| `protected` | Yes | Yes | Yes | No |
| `public` | Yes | Yes | Yes | Yes |

### Getter/Setter Pattern

```java
public class BankAccount {
    private double balance;     // private field

    public double getBalance() {        // getter
        return balance;
    }

    public void deposit(double amount) {    // controlled mutation
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}
```

### Why Encapsulate?

1. **Validation** -- reject invalid state changes
2. **Flexibility** -- change internal representation without breaking clients
3. **Read-only fields** -- provide getter, no setter
4. **Computed properties** -- getter can calculate from other fields

:::

## Static Members

:::eli10

Regular fields are like each student having their own notebook -- every student has a different one. A `static` field is like the classroom whiteboard -- there's only one, and everyone shares it. A static method is like a calculator on the teacher's desk -- you don't need to be a specific student to use it.

:::

:::eli15

Static members belong to the class itself, not to any specific object. A static field is shared among all instances (e.g., counting how many objects have been created). Static methods can be called without creating an object (like `Math.sqrt()`). Static methods cannot access instance fields or use `this` because they have no associated object.

:::

:::eli20

| | Instance | Static |
|---|---------|--------|
| Belongs to | Each object | The class itself |
| Access | `obj.method()` | `ClassName.method()` |
| Can access instance members? | Yes | No |
| Shared? | No (each object has its own) | Yes (one copy) |

```java
public class Counter {
    private static int totalCount = 0;   // shared across all instances
    private int id;

    public Counter() {
        totalCount++;
        this.id = totalCount;
    }

    public static int getTotalCount() {
        return totalCount;
    }

    public int getId() {
        return id;
    }
}
```

### Common `static` Uses

- `main` method: `public static void main(String[] args)`
- Utility methods: `Math.sqrt()`, `Integer.parseInt()`
- Constants: `public static final double PI = 3.14159;`

:::

## toString() Method

:::eli10

`toString()` is like giving your object the ability to introduce itself. Without it, if you try to print an object, Java just shows a confusing code. With `toString()`, your object can say "Hi, I'm Student Alice, age 20" instead of "Student@3f99bd32".

:::

:::eli15

Every class inherits a `toString()` method from `Object`, but the default returns the class name and hash code (not useful). By overriding `toString()`, you define a readable string representation of your object. It's automatically called when you print an object or concatenate it with a string.

:::

:::eli20

```java
public class Student {
    private String name;
    private int age;

    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + "}";
    }
}

Student s = new Student("Alice", 20, "CS001");
System.out.println(s);   // calls toString() automatically
```

:::

## equals() Method

:::eli10

By default, `==` on objects asks "Are these literally the same object?" -- like asking if two people are the same person. But `equals()` lets you define what "same" means for your class. For students, you might say two Student objects are "equal" if they have the same student ID, even if they're separate objects.

:::

:::eli15

The default `equals()` from `Object` checks reference equality (same object in memory). For logical equality (same content), you must override it. A proper `equals()` checks: same reference, not null, same class, then compares relevant fields. When you override `equals()`, you should also override `hashCode()` to maintain the contract that equal objects have equal hash codes.

:::

:::eli20

```java
@Override
public boolean equals(Object obj) {
    if (this == obj) return true;                    // same reference
    if (obj == null) return false;                   // null check
    if (getClass() != obj.getClass()) return false;  // type check
    Student other = (Student) obj;                   // cast
    return this.studentId.equals(other.studentId);   // compare fields
}
```

> When you override `equals()`, you should also override `hashCode()`.

---

<details>
<summary><strong>Practice: What does this print?</strong></summary>

```java
public class Point {
    int x, y;
    public Point(int x, int y) { this.x = x; this.y = y; }
}

Point p1 = new Point(3, 4);
Point p2 = p1;
p2.x = 10;
System.out.println(p1.x);
```

**Answer:** `10` -- `p2 = p1` copies the reference, not the object. Both point to the same object.

</details>

<details>
<summary><strong>Practice: Does this compile?</strong></summary>

```java
public class Dog {
    private String name;

    public Dog(String name) {
        this.name = name;
    }
}

// In main:
Dog d = new Dog();
```

**Answer:** No. Since we defined a 1-arg constructor, the default no-arg constructor is not provided. Fix: either pass an argument `new Dog("Rex")` or add a no-arg constructor.

</details>

<details>
<summary><strong>Practice: Can a static method access instance fields?</strong></summary>

```java
public class Example {
    private int value = 5;

    public static void printValue() {
        System.out.println(value);   // ?
    }
}
```

**Answer:** No, this does not compile. Static methods cannot access instance fields because there is no `this` reference. Fix: make `value` static, or make the method non-static.

</details>

:::
