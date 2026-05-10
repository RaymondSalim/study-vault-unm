---
title: "Interfaces & Collections"
order: 5
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "interfaces", "generics", "collections", "arraylist", "hashmap", "iterator"]
---

# Interfaces & Collections

## Interfaces

An interface defines a **contract** -- what a class must do, not how.

```java
public interface Drawable {
    void draw();                          // implicitly public abstract
    double getArea();                     // implicitly public abstract

    // Default method (Java 8+)
    default String describe() {
        return "A drawable shape";
    }

    // Static method (Java 8+)
    static int getVersion() {
        return 1;
    }
}
```

### Implementing an Interface

```java
public class Circle implements Drawable {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing circle with radius " + radius);
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}
```

### Interface vs Abstract Class

| Feature | Interface | Abstract Class |
|---------|-----------|----------------|
| Multiple inheritance | Yes (implement many) | No (extend one) |
| Constructors | No | Yes |
| Fields | `public static final` only | Any |
| Methods (pre-Java 8) | Abstract only | Abstract + concrete |
| Methods (Java 8+) | Abstract + default + static | Abstract + concrete |
| Instantiation | No | No |
| Use when | Defining capability/contract | Sharing code among related classes |

### Multiple Interfaces

```java
public interface Serializable { /* ... */ }
public interface Comparable<T> {
    int compareTo(T other);
}

public class Student implements Comparable<Student>, Serializable {
    private String name;
    private double gpa;

    @Override
    public int compareTo(Student other) {
        return Double.compare(this.gpa, other.gpa);
    }
}
```

### Interface as Type (Polymorphism)

```java
Drawable[] shapes = { new Circle(5), new Square(3) };
for (Drawable d : shapes) {
    d.draw();       // polymorphic call
}
```

---

## Generics (Basics)

Generics allow type-safe, reusable code:

```java
// Generic class
public class Box<T> {
    private T item;

    public void set(T item) { this.item = item; }
    public T get() { return item; }
}

Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String s = stringBox.get();   // no cast needed

Box<Integer> intBox = new Box<>();
intBox.set(42);
```

### Generic Method

```java
public static <T> void printArray(T[] arr) {
    for (T element : arr) {
        System.out.print(element + " ");
    }
    System.out.println();
}
```

### Bounded Type Parameters

```java
// T must implement Comparable
public static <T extends Comparable<T>> T findMax(T[] arr) {
    T max = arr[0];
    for (T item : arr) {
        if (item.compareTo(max) > 0) max = item;
    }
    return max;
}
```

---

## Collections Framework

### Hierarchy (simplified)

```
Iterable
  └── Collection
        ├── List (ordered, allows duplicates)
        │     ├── ArrayList
        │     └── LinkedList
        ├── Set (no duplicates)
        │     ├── HashSet
        │     ├── LinkedHashSet
        │     └── TreeSet (sorted)
        └── Queue
              ├── LinkedList
              └── PriorityQueue

Map (key-value, NOT part of Collection)
  ├── HashMap
  ├── LinkedHashMap
  └── TreeMap (sorted keys)
```

---

## ArrayList

Dynamic resizable array.

```java
import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();

// Add
names.add("Alice");              // append
names.add(0, "Bob");             // insert at index

// Access
String first = names.get(0);    // "Bob"
int size = names.size();         // 2

// Modify
names.set(1, "Charlie");        // replace at index

// Remove
names.remove(0);                 // by index
names.remove("Charlie");         // by object (first occurrence)

// Search
boolean has = names.contains("Alice");
int idx = names.indexOf("Alice");   // -1 if not found

// Iterate
for (String name : names) {
    System.out.println(name);
}
```

### ArrayList vs Array

| Feature | Array | ArrayList |
|---------|-------|-----------|
| Size | Fixed | Dynamic |
| Type | Primitives + Objects | Objects only (uses wrappers) |
| Syntax | `arr[i]` | `list.get(i)` |
| Performance | Slightly faster | Slightly slower (autoboxing) |
| Methods | `.length` | `.size()`, `.add()`, `.remove()`, etc. |

### Autoboxing / Unboxing

```java
ArrayList<Integer> nums = new ArrayList<>();
nums.add(5);           // autoboxing: int -> Integer
int x = nums.get(0);  // unboxing: Integer -> int
```

---

## HashMap

Key-value pairs with O(1) average lookup.

```java
import java.util.HashMap;

HashMap<String, Integer> scores = new HashMap<>();

// Put
scores.put("Alice", 95);
scores.put("Bob", 87);

// Get
int aliceScore = scores.get("Alice");        // 95
int missing = scores.getOrDefault("Eve", 0); // 0

// Check
boolean hasKey = scores.containsKey("Bob");   // true
boolean hasVal = scores.containsValue(95);    // true

// Remove
scores.remove("Bob");

// Size
int size = scores.size();

// Iterate
for (String key : scores.keySet()) {
    System.out.println(key + ": " + scores.get(key));
}

for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

### Common HashMap Patterns

```java
// Word frequency counter
HashMap<String, Integer> freq = new HashMap<>();
for (String word : words) {
    freq.put(word, freq.getOrDefault(word, 0) + 1);
}
```

---

## Iterator

```java
import java.util.Iterator;

ArrayList<String> list = new ArrayList<>(Arrays.asList("a", "b", "c", "d"));

Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (s.equals("b")) {
        it.remove();        // safe removal during iteration
    }
}
// list is now [a, c, d]
```

> **ConcurrentModificationException**: You cannot modify a collection (add/remove) during a for-each loop. Use an Iterator or collect items to remove separately.

---

## Comparable vs Comparator

| | Comparable | Comparator |
|---|-----------|-----------|
| Package | `java.lang` | `java.util` |
| Method | `compareTo(T)` | `compare(T, T)` |
| Defined in | The class itself | External class/lambda |
| Use case | Natural ordering | Custom/alternate ordering |

```java
// Using Comparable (natural order)
Collections.sort(students);  // uses compareTo

// Using Comparator (custom order)
Collections.sort(students, (s1, s2) -> s1.getName().compareTo(s2.getName()));

// Or with Comparator utility methods
students.sort(Comparator.comparing(Student::getGpa).reversed());
```

---

<details>
<summary><strong>Practice: What happens here?</strong></summary>

```java
ArrayList<Integer> nums = new ArrayList<>();
nums.add(1);
nums.add(2);
nums.add(3);
nums.remove(1);   // What does this remove?
System.out.println(nums);
```

**Answer:** `[1, 3]` -- `remove(1)` calls `remove(int index)` which removes the element at index 1 (value 2). To remove the Integer object 1, use `nums.remove(Integer.valueOf(1))`.

</details>

<details>
<summary><strong>Practice: Does this compile?</strong></summary>

```java
public interface A {
    void foo();
}
public interface B {
    void foo();
}
public class C implements A, B {
    @Override
    public void foo() {
        System.out.println("C.foo");
    }
}
```

**Answer:** Yes. Both interfaces declare the same method signature, so one implementation satisfies both.

</details>

<details>
<summary><strong>Practice: Fill in the blank</strong></summary>

```java
HashMap<String, ArrayList<String>> graph = new HashMap<>();
graph.put("A", new ArrayList<>(Arrays.asList("B", "C")));
graph.put("B", new ArrayList<>(Arrays.asList("A")));

// How many neighbours does "A" have?
int count = _________;
```

**Answer:** `graph.get("A").size()` which returns `2`.

</details>
