---
title: "Flashcards"
order: 92
moduleTitle: "COMP2042 - Developing Maintainable Software"
tags: ["flashcards", "revision", "quick-review"]
---

# Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What does SOLID stand for? | Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. |
| 2 | Explain the Single Responsibility Principle. | A class should have only one reason to change -- it should have only one responsibility or job. |
| 3 | What is the Open/Closed Principle? | Software entities should be open for extension but closed for modification -- add new behaviour without changing existing code. |
| 4 | Explain Liskov Substitution Principle. | Objects of a superclass should be replaceable with objects of its subclasses without breaking the program's correctness. |
| 5 | What is the Factory Method pattern? | A creational pattern that defines an interface for creating objects but lets subclasses decide which class to instantiate. |
| 6 | What is the Observer pattern? | A behavioural pattern where an object (subject) maintains a list of dependents (observers) and notifies them automatically of state changes. |
| 7 | What is a code smell? | A surface indication in code that usually corresponds to a deeper problem in the system (e.g., long method, large class, feature envy). |
| 8 | Define refactoring. | Restructuring existing code without changing its external behaviour to improve readability, reduce complexity, or improve maintainability. |
| 9 | What is the Strategy pattern? | A behavioural pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime. |
| 10 | What is the Decorator pattern? | A structural pattern that attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing. |
| 11 | Explain Dependency Inversion Principle. | High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details. |
| 12 | What is the Singleton pattern and its drawback? | Ensures a class has only one instance with global access. Drawback: introduces global state, makes testing difficult, hides dependencies. |
| 13 | What is Interface Segregation Principle? | Clients should not be forced to depend on interfaces they do not use -- prefer many small, specific interfaces over one large general-purpose interface. |
| 14 | What is the MVC pattern? | Model-View-Controller separates concerns: Model (data/logic), View (presentation), Controller (input handling and coordination). |
| 15 | Name three common code smells. | Long Method, God Class (Large Class), Feature Envy, Duplicated Code, Shotgun Surgery, Primitive Obsession. |
| 16 | What is the Extract Method refactoring? | Taking a code fragment from an existing method and moving it into a new method with a descriptive name. |
| 17 | What is the Adapter pattern? | A structural pattern that converts the interface of a class into another interface clients expect, enabling incompatible classes to work together. |
| 18 | What is coupling and why minimise it? | Coupling is the degree of interdependence between modules. Low coupling makes modules easier to change, test, and reuse independently. |
| 19 | What is cohesion? | The degree to which elements within a module belong together. High cohesion means a class does one thing well. |
| 20 | What is Test-Driven Development (TDD)? | Write a failing test first (red), write minimal code to pass it (green), then refactor. Repeat. |
| 21 | What is a build tool and give an example? | A tool that automates compilation, testing, packaging, and dependency management. Examples: Maven, Gradle, Ant. |
| 22 | What is the Template Method pattern? | A behavioural pattern that defines the skeleton of an algorithm in a superclass, letting subclasses override specific steps without changing the algorithm's structure. |
| 23 | What is the difference between composition and inheritance? | Inheritance is "is-a" relationship (extends class); composition is "has-a" relationship (contains instance). Composition is generally preferred for flexibility. |
| 24 | What is Feature Envy? | A code smell where a method accesses data of another class more than its own, suggesting it should be moved to that other class. |
| 25 | What is the purpose of unit testing? | To verify individual components (methods/classes) work correctly in isolation, enabling confident refactoring and catching regressions early. |
