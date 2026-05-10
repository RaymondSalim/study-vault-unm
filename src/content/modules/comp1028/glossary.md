---
title: "Glossary"
order: 95
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "glossary", "definitions", "terminology"]
---

# Glossary

## A

| Term | Definition |
|------|-----------|
| **Abstract class** | A class declared with `abstract` that cannot be instantiated and may contain abstract methods. Subclasses must implement all abstract methods or be declared abstract themselves. |
| **Abstract method** | A method with no body (`abstract void doThing();`). Must be implemented by concrete subclasses. |
| **Access modifier** | Keywords (`public`, `protected`, `private`, default) that control visibility of classes, fields, and methods. |
| **Algorithm** | A step-by-step procedure for solving a problem in a finite number of steps. |
| **ArrayList** | A resizable array implementation of the `List` interface. Provides O(1) access by index and O(n) insertion/removal in the middle. |
| **Argument** | The actual value passed to a method when calling it. Compare with *parameter*. |
| **Array** | A fixed-size, indexed collection of elements of the same type. |
| **Autoboxing** | Automatic conversion of a primitive to its wrapper class (e.g., `int` to `Integer`). |

## B

| Term | Definition |
|------|-----------|
| **Base case** | The condition in a recursive method that stops the recursion and returns a value directly. |
| **Binary search** | A search algorithm on sorted data that halves the search space each step. O(log n). |
| **Block** | A group of statements enclosed in braces `{}`. Defines a scope. |
| **Boolean** | A primitive type with only two values: `true` and `false`. |
| **Bubble sort** | A simple sorting algorithm that repeatedly swaps adjacent out-of-order elements. O(n^2) average/worst. |

## C

| Term | Definition |
|------|-----------|
| **Casting** | Converting a value from one type to another. Widening (implicit) or narrowing (explicit with `(Type)`). |
| **Checked exception** | An exception the compiler forces you to handle (catch or declare with `throws`). Extends `Exception` but not `RuntimeException`. |
| **Class** | A blueprint/template that defines the fields and methods for objects. |
| **Collection** | A framework of interfaces and classes for storing/manipulating groups of objects (`List`, `Set`, `Map`). |
| **Compile-time type** | The declared type of a variable, used by the compiler to determine what methods are accessible. |
| **Constructor** | A special method (same name as class, no return type) called when creating an object with `new`. |
| **Constructor chaining** | Calling one constructor from another using `this(...)` or `super(...)`. |

## D

| Term | Definition |
|------|-----------|
| **Default constructor** | A no-argument constructor automatically provided by Java if no constructors are explicitly defined. |
| **Downcasting** | Casting a superclass reference to a subclass type. Requires explicit cast and risks `ClassCastException`. |
| **Dynamic dispatch** | The JVM mechanism that determines which overridden method to call at runtime based on the actual object type. |

## E

| Term | Definition |
|------|-----------|
| **Encapsulation** | Hiding internal state (private fields) and exposing controlled access through public methods (getters/setters). |
| **Enhanced for loop** | `for (Type item : collection)` -- iterates over arrays/collections without explicit index. |
| **Exception** | An event that disrupts normal program flow. Represented by objects inheriting from `Throwable`. |
| **Expression** | A combination of variables, operators, and method calls that evaluates to a single value. |
| **extends** | Keyword for class inheritance (`class Child extends Parent`) or bounded generics. |

## F

| Term | Definition |
|------|-----------|
| **Field** | A variable declared at class level (instance or static variable). |
| **final** | Keyword: on a variable = constant; on a method = cannot be overridden; on a class = cannot be extended. |
| **finally** | A block that always executes after try/catch, used for cleanup (closing resources). |

## G

| Term | Definition |
|------|-----------|
| **Garbage collection** | Automatic memory management -- the JVM reclaims memory from objects no longer referenced. |
| **Generic** | A type parameter (e.g., `<T>`) allowing classes/methods to operate on different types while maintaining type safety. |
| **Getter** | A public method that returns the value of a private field (e.g., `getName()`). |

## H

| Term | Definition |
|------|-----------|
| **HashMap** | A Map implementation using a hash table. Provides O(1) average-case get/put operations. Keys must override `hashCode()` and `equals()`. |
| **HashSet** | A Set implementation backed by a HashMap. No duplicates, unordered, O(1) contains/add/remove. |
| **Heap (memory)** | The memory region where objects are allocated (via `new`). Managed by garbage collection. |

## I

| Term | Definition |
|------|-----------|
| **Immutable** | An object whose state cannot be changed after creation (e.g., `String`). |
| **implements** | Keyword indicating a class fulfils an interface contract. |
| **Inheritance** | A mechanism where a subclass acquires fields/methods of a superclass. Models "is-a" relationships. |
| **Insertion sort** | A sorting algorithm that builds the sorted portion one element at a time. O(n) best case, O(n^2) worst. |
| **Instance** | A specific object created from a class. |
| **instanceof** | Operator that tests whether an object is an instance of a specific class/interface. |
| **Interface** | A contract defining method signatures that implementing classes must provide. Supports multiple inheritance of type. |
| **Iterator** | An object providing `hasNext()`, `next()`, and `remove()` for traversing a collection. |

## L

| Term | Definition |
|------|-----------|
| **Linear search** | A search that checks each element sequentially. O(n). Works on unsorted data. |
| **Local variable** | A variable declared inside a method or block. Must be initialised before use. |

## M

| Term | Definition |
|------|-----------|
| **Merge sort** | A divide-and-conquer sorting algorithm. Always O(n log n) but requires O(n) extra space. Stable. |
| **Method** | A named block of code belonging to a class that performs a specific task. |
| **Method overloading** | Defining multiple methods with the same name but different parameter lists in the same class. |
| **Method overriding** | A subclass providing its own implementation of a method inherited from a superclass. |
| **Method signature** | The method name plus its parameter types (in order). Does not include return type. |

## N

| Term | Definition |
|------|-----------|
| **new** | Keyword that allocates memory on the heap and calls the constructor to create an object. |
| **null** | A special literal indicating that a reference does not point to any object. |
| **NullPointerException** | A runtime exception thrown when attempting to use a null reference. |

## O

| Term | Definition |
|------|-----------|
| **Object** | An instance of a class, containing state (fields) and behaviour (methods). |
| **Object class** | The root of the Java class hierarchy. Every class implicitly extends `Object`. |
| **Operator precedence** | Rules determining the order in which operators are evaluated in an expression. |
| **Overloading** | See *Method overloading*. |
| **Overriding** | See *Method overriding*. |

## P

| Term | Definition |
|------|-----------|
| **Package** | A namespace that organises related classes (e.g., `java.util`). |
| **Parameter** | A variable in a method declaration that receives a value when the method is called. Compare with *argument*. |
| **Pass-by-value** | Java's parameter-passing mechanism. Primitives: copy of value. Objects: copy of reference (not the object itself). |
| **Polymorphism** | The ability of a superclass reference to refer to subclass objects, with method calls resolved at runtime. |
| **Primitive type** | One of 8 basic types: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`. |

## Q

| Term | Definition |
|------|-----------|
| **Quicksort** | A divide-and-conquer sort using a pivot element. O(n log n) average, O(n^2) worst. In-place, not stable. |

## R

| Term | Definition |
|------|-----------|
| **Recursion** | A technique where a method calls itself to solve smaller sub-problems. |
| **Reference type** | Any non-primitive type (classes, interfaces, arrays). Variables hold a reference to the object on the heap. |
| **Runtime type** | The actual class of an object (determined by `new`). Used for dynamic method dispatch. |

## S

| Term | Definition |
|------|-----------|
| **Scope** | The region of code where a variable is accessible. |
| **Setter** | A public method that sets the value of a private field, often with validation. |
| **Shadowing** | A local variable or parameter having the same name as a field, hiding the field within that scope. |
| **Stack (call stack)** | LIFO structure storing method invocations. Each call creates a stack frame with local variables. |
| **StackOverflowError** | Error thrown when the call stack exceeds its size limit (usually infinite/too-deep recursion). |
| **Static** | Belongs to the class rather than an instance. Shared among all objects. Accessed via `ClassName.member`. |
| **String** | An immutable sequence of characters. A reference type (not primitive). |
| **Subclass** | A class that extends another class (inherits from a superclass). |
| **super** | Keyword referring to the parent class. Used to call parent constructors or overridden methods. |

## T

| Term | Definition |
|------|-----------|
| **this** | Keyword referring to the current object instance. Used to disambiguate fields from parameters or call other constructors. |
| **Throwable** | The root class of all errors and exceptions in Java. |
| **Time complexity** | A measure of how an algorithm's running time grows with input size, expressed in Big-O notation. |
| **try-catch** | Statement for handling exceptions. Code that may throw goes in `try`; handlers in `catch` blocks. |
| **try-with-resources** | A `try` statement that auto-closes resources implementing `AutoCloseable`. |
| **Type casting** | See *Casting*. |

## U

| Term | Definition |
|------|-----------|
| **Unboxing** | Automatic conversion of a wrapper class to its primitive (e.g., `Integer` to `int`). |
| **Unchecked exception** | A `RuntimeException` that the compiler does not force you to handle. Indicates programming errors. |
| **Upcasting** | Treating a subclass object as its superclass type. Always implicit and safe. |

## V

| Term | Definition |
|------|-----------|
| **Variable** | A named storage location with a type that holds a value. |
| **Varargs** | Variable-length argument list (`Type... name`). Must be the last parameter. |
| **void** | Return type indicating a method returns no value. |

## W

| Term | Definition |
|------|-----------|
| **Widening** | Implicit type conversion from a smaller to a larger type (e.g., `int` to `double`). No data loss. |
| **Wrapper class** | Object versions of primitives (`Integer`, `Double`, etc.). Required for generics/collections. |
