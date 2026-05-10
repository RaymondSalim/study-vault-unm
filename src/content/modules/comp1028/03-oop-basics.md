---
title: "OOP Basics - Classes & Encapsulation"
order: 3
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "oop", "classes", "objects", "constructors", "encapsulation", "this"]
---

# OOP Basics - Classes & Encapsulation

## Classes and Objects

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

## Memory Model

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

## Constructors

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

## The `this` Keyword

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

## Encapsulation

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

## Static Members

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

## toString() Method

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

## equals() Method

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
