---
title: "Prerequisites"
order: 96
moduleTitle: "COMP2042 - Developing Maintainable Software"
tags: ["prerequisites", "preparation", "self-assessment"]
---

# Prerequisites

## Required Background Knowledge

| Area | Topics Needed | Why |
|------|---------------|-----|
| Object-Oriented Programming | Classes, objects, inheritance, polymorphism, interfaces, abstract classes | All patterns and principles are expressed in OOP |
| Java Programming | Java syntax, collections, exceptions, file I/O | Module examples and coursework use Java |
| Basic UML | Class diagrams (associations, inheritance arrows) | Pattern diagrams use UML notation |
| Version Control | Git basics (commit, branch, merge) | Required for coursework and understanding build pipelines |

## Helpful Prior Modules

- **COMP1012 - Programming** -- Java/OOP fundamentals, inheritance, polymorphism
- **COMP2019 - Software Engineering Group Project** -- Practical experience with code quality challenges
- **COMP1013 - Algorithms & Data Structures** -- Abstraction, interface design
- **Any Java programming module** -- Comfort with writing and reading Java code

## Key Concepts You Should Already Know

1. How inheritance and polymorphism work in Java
2. The difference between an interface and an abstract class
3. How to write a basic Java class with constructors, getters, and methods
4. What encapsulation means and why it matters
5. Basic Git workflow (clone, commit, push, pull)

## Self-Assessment Test

Answer these before starting the module. If you struggle with more than 2, review the prerequisites first.

| # | Question | Expected Answer |
|---|----------|-----------------|
| 1 | What is polymorphism? Give a Java example. | The ability to treat objects of different subclasses through their common supertype interface. E.g., `Animal a = new Dog(); a.speak();` calls Dog's implementation. |
| 2 | What is the difference between `interface` and `abstract class` in Java? | An interface defines method signatures only (pre-Java 8); an abstract class can have both abstract and concrete methods plus fields. A class can implement multiple interfaces but extend only one abstract class. |
| 3 | What does `@Override` do in Java? | Indicates that a method is intended to override a superclass method; causes a compile error if it doesn't actually override anything. |
| 4 | What is encapsulation? | Hiding internal state and requiring all interaction through well-defined public methods (getters/setters); protects object integrity. |
| 5 | Write a simple Java interface for a `Shape` with a method `double area()`. | `public interface Shape { double area(); }` |
