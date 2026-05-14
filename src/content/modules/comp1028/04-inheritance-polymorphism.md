---
title: "Inheritance & Polymorphism"
order: 4
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "inheritance", "polymorphism", "abstract-classes", "method-overriding", "super"]
---

# Inheritance & Polymorphism

## Inheritance

:::eli10

Inheritance is like a family tree. A Dog is a type of Animal -- it has everything an Animal has (name, ability to eat) plus its own special things (breed, ability to bark). You don't have to rewrite all the Animal stuff; the Dog just "inherits" it automatically.

:::

:::eli15

Inheritance creates an "is-a" relationship between classes. A subclass (child) extends a superclass (parent), inheriting its public and protected fields and methods. This promotes code reuse -- shared behavior lives in the parent class. Java supports single inheritance only (one parent class). Use `super` to call the parent's constructor or methods.

:::

:::eli20

Inheritance models an **"is-a"** relationship. A subclass inherits accessible fields and methods from its superclass.

```java
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void eat() {
        System.out.println(name + " is eating");
    }

    public String toString() {
        return "Animal: " + name;
    }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);            // MUST call super constructor first
        this.breed = breed;
    }

    public void bark() {
        System.out.println(name + " says Woof!");
    }

    @Override
    public String toString() {
        return "Dog: " + name + " (" + breed + ")";
    }
}
```

### Key Rules

| Rule | Detail |
|------|--------|
| Single inheritance | A class can extend only ONE class |
| `super(args)` | Must be first statement in subclass constructor |
| Implicit `super()` | If you don't call `super(...)`, Java inserts `super()` (no-arg). Fails if no no-arg constructor in parent. |
| What's inherited | All `public`/`protected` members. Not `private` (but they exist in memory). |
| `final class` | Cannot be extended |
| `final method` | Cannot be overridden |

### Constructor Chain

```java
class A {
    A() { System.out.println("A"); }
}
class B extends A {
    B() { System.out.println("B"); }  // implicitly calls super()
}
class C extends B {
    C() { System.out.println("C"); }  // implicitly calls super()
}

new C();  // prints: A B C (parent constructors run first)
```

:::

## Method Overriding

:::eli10

Method overriding is like when your family has a tradition (say, a greeting), but you do it your own way. Your parent waves, but you give a fist bump. You're still "greeting," but your version is different. The `@Override` tag is like a note saying "I know my parent does this differently."

:::

:::eli15

Overriding means a subclass provides its own implementation of a method inherited from the parent. The method must have the same name and parameters. The `@Override` annotation helps the compiler verify you're actually overriding (catches typos). Access cannot be more restrictive than the parent's. This is different from overloading, which uses the same name but different parameters.

:::

:::eli20

| Overriding | Overloading |
|-----------|-------------|
| Same method signature in subclass | Same name, different parameters |
| `@Override` annotation (recommended) | No annotation needed |
| Runtime polymorphism | Compile-time resolution |
| Return type must be same or covariant | Can differ |
| Access cannot be more restrictive | Independent |

### Overriding Rules

1. Same name, same parameter list
2. Return type: same or a subtype (covariant return)
3. Access modifier: same or **less** restrictive (e.g., `protected` -> `public`)
4. Cannot override `final`, `static`, or `private` methods
5. Can throw fewer/narrower checked exceptions

```java
public class Shape {
    public double area() {
        return 0;
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {       // overrides Shape.area()
        return Math.PI * radius * radius;
    }
}
```

### Using `super` to Call Overridden Method

```java
@Override
public String toString() {
    return super.toString() + " [breed=" + breed + "]";
}
```

:::

## Polymorphism

:::eli10

Polymorphism means "many shapes." Imagine you have a remote control labeled "Animal" that you can point at a Dog, Cat, or Bird. When you press "speak," each animal makes its own sound -- the remote doesn't need to know exactly which animal it's pointing at. It just works differently depending on the actual animal.

:::

:::eli15

Polymorphism allows a variable of a parent type to hold a child object. When you call a method on it, Java runs the child's version (determined at runtime), not the parent's. The compiler checks that the method exists on the declared type, but the JVM executes the actual object's version. This enables writing flexible code that works with any subclass without knowing the specific type.

:::

:::eli20

**Polymorphism** = a superclass reference can hold a subclass object, and method calls are resolved at runtime.

```java
Animal a = new Dog("Rex", "Labrador");  // upcasting (implicit)
a.eat();        // OK -- defined in Animal
a.bark();       // COMPILE ERROR -- compiler sees Animal type
a.toString();   // calls Dog's toString() (runtime dispatch)
```

### Compile-time vs Runtime Type

```java
Animal a = new Dog("Rex", "Labrador");
//  ^          ^
//  |          └── Runtime type (actual object)
//  └── Compile-time type (what compiler sees)
```

- **Compiler** checks: methods available on compile-time type
- **JVM** executes: the overridden version from runtime type

### Downcasting

```java
Animal a = new Dog("Rex", "Labrador");

// Must check before casting to avoid ClassCastException
if (a instanceof Dog) {
    Dog d = (Dog) a;       // explicit downcast
    d.bark();              // now accessible
}
```

### Polymorphism with Arrays/Collections

```java
Shape[] shapes = {
    new Circle(5),
    new Rectangle(3, 4),
    new Triangle(3, 4, 5)
};

for (Shape s : shapes) {
    System.out.println(s.area());  // calls correct overridden method
}
```

:::

## Abstract Classes

:::eli10

An abstract class is like a partially filled-in form. It says "every Shape must be able to calculate its area" but doesn't say how -- because a circle and a rectangle calculate area differently. You can't turn in the blank form itself (can't create an abstract object); you must fill it in completely (create a concrete subclass).

:::

:::eli15

An abstract class cannot be instantiated directly. It can contain both abstract methods (no body -- subclasses must implement) and concrete methods (with implementation -- inherited as-is). Use abstract classes when you want to share code among related classes but force subclasses to provide certain implementations. The first non-abstract subclass must implement all inherited abstract methods.

:::

:::eli20

An abstract class cannot be instantiated. It can have both abstract and concrete methods.

```java
public abstract class Shape {
    protected String colour;

    public Shape(String colour) {
        this.colour = colour;
    }

    // Abstract method -- no body, subclasses MUST implement
    public abstract double area();
    public abstract double perimeter();

    // Concrete method -- inherited as-is
    public String getColour() {
        return colour;
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String colour, double radius) {
        super(colour);
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}
```

### Abstract Class Rules

| Rule | Detail |
|------|--------|
| Cannot instantiate | `new Shape()` is a compile error |
| Can have constructors | Called via `super()` from subclasses |
| Can have fields | Both instance and static |
| Can have concrete methods | Shared implementation |
| First concrete subclass | Must implement ALL abstract methods |
| Can extend another abstract class | Without implementing its abstract methods |

:::

## The Object Class

:::eli10

Every class in Java secretly inherits from a class called `Object`. It's like how every person is a human being, regardless of whether they're a student, teacher, or doctor. `Object` gives every class basic abilities like being able to describe itself (`toString`) and check if it equals something else (`equals`).

:::

:::eli15

`Object` is the root of Java's class hierarchy -- every class implicitly extends it. It provides default implementations of common methods: `toString()` (returns class name + hash), `equals()` (reference equality), `hashCode()` (memory-based hash), and `getClass()` (runtime type info). You typically override `toString()` and `equals()` in your classes.

:::

:::eli20

Every class in Java implicitly extends `Object`. Key methods:

| Method | Purpose |
|--------|---------|
| `toString()` | String representation |
| `equals(Object)` | Logical equality |
| `hashCode()` | Hash for collections |
| `getClass()` | Runtime class info |
| `clone()` | Shallow copy (implement `Cloneable`) |

:::

## instanceof Operator

:::eli10

`instanceof` is like asking "Are you a type of...?" You can ask a Dog "Are you an Animal?" (yes), "Are you a Dog?" (yes), "Are you a Cat?" (no). It helps you figure out what kind of object you're dealing with before doing something specific to that type.

:::

:::eli15

The `instanceof` operator tests whether an object is an instance of a particular class or any of its subclasses. It returns `true` if the object can be safely cast to that type. Always use `instanceof` before downcasting to avoid `ClassCastException`. Note that `null instanceof AnyType` always returns `false`.

:::

:::eli20

```java
Animal a = new Dog("Rex", "Lab");

a instanceof Dog       // true
a instanceof Animal    // true
a instanceof Object    // true
a instanceof Cat       // false
```

> `null instanceof AnyType` is always `false`.

---

<details>
<summary><strong>Practice: What does this print?</strong></summary>

```java
class A {
    public void speak() { System.out.println("A"); }
}
class B extends A {
    public void speak() { System.out.println("B"); }
}
class C extends B {
    public void speak() { System.out.println("C"); }
}

A obj = new C();
obj.speak();
```

**Answer:** `C` -- runtime type is `C`, so `C.speak()` is called (polymorphism).

</details>

<details>
<summary><strong>Practice: Does this compile?</strong></summary>

```java
public abstract class Vehicle {
    public abstract void drive();
}

public class Car extends Vehicle {
    // no methods
}
```

**Answer:** No. `Car` is not abstract and does not implement `drive()`. Either implement the method or declare `Car` as abstract.

</details>

<details>
<summary><strong>Practice: What happens here?</strong></summary>

```java
class Parent {
    public void greet() { System.out.println("Hello from Parent"); }
}
class Child extends Parent {
    private void greet() { System.out.println("Hello from Child"); }
}
```

**Answer:** Compile error. You cannot reduce visibility when overriding. `private` is more restrictive than `public`.

</details>

:::
