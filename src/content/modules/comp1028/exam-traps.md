---
title: "Exam Traps - Common Java Mistakes"
order: 91
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "exam", "mistakes", "traps", "pitfalls", "debugging"]
---

# Exam Traps - Common Java Mistakes

## String Comparison

| Code | Result | Why |
|------|--------|-----|
| `"hello" == "hello"` | `true` | Same literal from string pool |
| `new String("hello") == "hello"` | `false` | Different objects |
| `new String("hello").equals("hello")` | `true` | Content comparison |

**Rule:** Always use `.equals()` for String comparison. `==` compares references.

---

## Integer Caching Trap

```java
Integer a = 127;
Integer b = 127;
System.out.println(a == b);   // true (cached range -128 to 127)

Integer c = 128;
Integer d = 128;
System.out.println(c == d);   // false (outside cache range!)
System.out.println(c.equals(d)); // true
```

**Rule:** Use `.equals()` for wrapper type comparison, or unbox to primitives.

---

## Integer Division

```java
int result = 7 / 2;           // 3 (not 3.5!)
double wrong = 7 / 2;         // 3.0 (division happens as int first)
double right = 7.0 / 2;       // 3.5
double right2 = (double) 7 / 2; // 3.5
```

---

## Array vs ArrayList Size

```java
int[] arr = {1, 2, 3};
arr.length           // field -- no parentheses!

String s = "hello";
s.length()           // method -- WITH parentheses!

ArrayList<Integer> list = new ArrayList<>();
list.size()          // method -- different name entirely!
```

| Type | Size accessor |
|------|---------------|
| Array | `.length` (field) |
| String | `.length()` (method) |
| Collections | `.size()` (method) |

---

## ArrayList remove() Ambiguity

```java
ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));
list.remove(1);              // removes at INDEX 1 -> removes value 2
list.remove(Integer.valueOf(1)); // removes OBJECT 1 -> removes value 1
```

---

## Uninitialized Local Variables

```java
int x;
System.out.println(x);   // COMPILE ERROR -- local not initialised

// But fields have defaults:
class Foo {
    int x;                // defaults to 0
    String s;             // defaults to null
}
```

---

## Off-by-One Errors

```java
// WRONG: ArrayIndexOutOfBoundsException
for (int i = 0; i <= arr.length; i++) { }  // should be <

// WRONG: skips last element
for (int i = 0; i < arr.length - 1; i++) { }  // processes n-1 elements

// substring is [inclusive, exclusive)
"hello".substring(1, 3);  // "el" (not "ell")
```

---

## Null Pointer Traps

```java
String s = null;
s.length();              // NullPointerException!
s.equals("hello");       // NullPointerException!
"hello".equals(s);       // false (safe -- never throws)
```

**Rule:** Put the known non-null value on the left: `"constant".equals(variable)`.

---

## Switch Fall-Through

```java
int x = 2;
switch (x) {
    case 1: System.out.println("One");
    case 2: System.out.println("Two");     // prints
    case 3: System.out.println("Three");   // also prints! (fall-through)
    default: System.out.println("Default"); // also prints!
}
// Output: Two Three Default
```

**Rule:** Always include `break` unless intentional fall-through.

---

## Pass-by-Value Confusion

```java
public static void changeString(String s) {
    s = "new value";    // reassigns local reference, not caller's
}

String str = "original";
changeString(str);
System.out.println(str);   // "original" -- unchanged!
```

```java
public static void changeArray(int[] arr) {
    arr[0] = 999;         // modifies the SAME object
    arr = new int[5];     // reassigns local reference only
}

int[] data = {1, 2, 3};
changeArray(data);
System.out.println(data[0]);     // 999
System.out.println(data.length); // 3 (not 5!)
```

---

## Constructor Traps

```java
// Trap 1: Adding return type makes it a regular method!
public class Dog {
    void Dog() { }         // THIS IS A METHOD, NOT A CONSTRUCTOR
    public Dog() { }       // THIS is the constructor
}

// Trap 2: No default constructor when any constructor is defined
public class Cat {
    public Cat(String name) { }
}
Cat c = new Cat();   // COMPILE ERROR -- no no-arg constructor
```

---

## Overriding vs Overloading Confusion

```java
class Parent {
    public void print(int x) {
        System.out.println("Parent: " + x);
    }
}

class Child extends Parent {
    // This is OVERLOADING (different param type), NOT overriding!
    public void print(double x) {
        System.out.println("Child: " + x);
    }
}

Child c = new Child();
c.print(5);     // "Parent: 5" -- int matches Parent's method better!
c.print(5.0);   // "Child: 5.0"
```

---

## Static Method Cannot Be Overridden

```java
class Base {
    public static void greet() { System.out.println("Base"); }
}
class Sub extends Base {
    public static void greet() { System.out.println("Sub"); }  // hiding, not overriding
}

Base obj = new Sub();
obj.greet();   // "Base" -- static resolved at compile time by reference type
```

---

## Array of Objects is Array of null

```java
Student[] students = new Student[5];
students[0].getName();   // NullPointerException!
// Must create each object:
students[0] = new Student("Alice");
```

---

## Infinite Loop Traps

```java
// Trap 1: floating point comparison
double d = 0.1;
while (d != 1.0) {   // may never be exactly 1.0!
    d += 0.1;
}

// Trap 2: integer overflow
int i = 1;
while (i > 0) {      // eventually overflows to negative
    i *= 2;
}
```

---

## Equals/HashCode Contract

```java
// If you override equals(), you MUST override hashCode()
// Equal objects must have equal hash codes
// Objects in HashMap/HashSet rely on this contract

@Override
public boolean equals(Object obj) { /* ... */ }

@Override
public int hashCode() {
    return Objects.hash(field1, field2);   // must use same fields as equals
}
```

---

## Scope and Shadowing

```java
int x = 10;
if (true) {
    int x = 20;   // COMPILE ERROR in Java -- cannot shadow local with local
}

// But parameter CAN shadow field:
class Foo {
    int x = 10;
    void set(int x) {
        x = x;           // assigns parameter to itself! (does nothing to field)
        this.x = x;      // correct -- assigns parameter to field
    }
}
```

---

## Recursion: Forgetting the Return

```java
// WRONG -- doesn't return the recursive result
public static int factorial(int n) {
    if (n <= 1) return 1;
    factorial(n - 1);         // result is discarded!
    return n;                 // only returns n, not n * factorial(n-1)
}

// CORRECT
public static int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

---

## Modifying Collection During Iteration

```java
// WRONG -- ConcurrentModificationException
for (String s : list) {
    if (s.equals("remove")) {
        list.remove(s);       // CRASH
    }
}

// CORRECT -- use Iterator
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("remove")) {
        it.remove();          // safe
    }
}
```

---

## Abstract Class Instantiation

```java
abstract class Shape { }
Shape s = new Shape();   // COMPILE ERROR -- cannot instantiate abstract class

// But you CAN have a reference of abstract type:
Shape s = new Circle();  // OK -- Circle extends Shape
```

---

## Checked Exception Not Caught

```java
// This will NOT compile:
public void read() {
    FileReader fr = new FileReader("f.txt");   // throws FileNotFoundException
}

// Must either catch or declare:
public void read() throws FileNotFoundException {
    FileReader fr = new FileReader("f.txt");
}
```

---

## Quick Self-Test Checklist

Before submitting an exam answer, check:

- [ ] Are Strings compared with `.equals()` (not `==`)?
- [ ] Are local variables initialised before use?
- [ ] Does every `switch` case have `break` (unless intentional)?
- [ ] Is array index within bounds (0 to length-1)?
- [ ] Does recursion have a valid base case that is always reachable?
- [ ] Are checked exceptions caught or declared?
- [ ] Does the constructor have no return type?
- [ ] Is `super()` the first statement in the subclass constructor?
- [ ] Are objects in array initialised (not just the array itself)?
- [ ] Is integer division handled correctly for expected double results?
