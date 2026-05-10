---
title: "Glossary"
order: 95
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["glossary", "definitions", "terminology"]
---

# Glossary

## A-C

| Term | Definition |
|------|------------|
| **Abstract Factory** | Creational pattern providing an interface for creating families of related objects without specifying concrete classes |
| **Adapter** | Structural pattern that converts one interface to another expected by a client |
| **Aggregation** | UML relationship where a part can exist independently of the whole (hollow diamond) |
| **Assertion** | Statement in a test that verifies an expected condition holds true |
| **Builder** | Creational pattern that constructs complex objects step by step |
| **CI (Continuous Integration)** | Practice of frequently merging code changes into a shared repository with automated build and test |
| **CD (Continuous Delivery)** | Extension of CI where code is always in a deployable state |
| **Code Smell** | Surface indication in source code that usually corresponds to a deeper problem |
| **Cohesion** | Degree to which elements within a module belong together (aim: HIGH) |
| **Composite** | Structural pattern composing objects into tree structures and treating individual/composite objects uniformly |
| **Composition** | UML relationship where a part cannot exist without the whole (filled diamond); also: design technique of building behaviour by combining objects |
| **Controller** | MVC component that handles user input and coordinates model/view |
| **Corrective Maintenance** | Fixing defects in existing software |
| **Coupling** | Degree of interdependence between modules (aim: LOW) |
| **Cyclomatic Complexity** | Metric measuring the number of independent paths through a program's control flow |

## D-F

| Term | Definition |
|------|------------|
| **Data Clump** | Code smell where the same group of data items appears together repeatedly |
| **Decorator** | Structural pattern attaching additional responsibilities to an object dynamically |
| **Dependency** | UML weakest relationship; one class temporarily uses another |
| **Dependency Injection** | Supplying dependencies from outside rather than creating them internally |
| **Dependency Inversion Principle** | High-level modules should depend on abstractions, not low-level modules |
| **Design Pattern** | Reusable solution to a commonly occurring problem in software design |
| **DRY (Don't Repeat Yourself)** | Principle that every piece of knowledge should have a single authoritative representation |
| **Encapsulation** | Hiding internal details and exposing only a well-defined interface |
| **Extract Method** | Refactoring that moves a code fragment into a new method with a descriptive name |
| **Facade** | Structural pattern providing a simplified interface to a complex subsystem |
| **Factory Method** | Creational pattern that lets subclasses decide which class to instantiate |
| **Feature Envy** | Code smell where a method uses another class's data more than its own |
| **FXML** | XML-based markup language for defining JavaFX user interfaces declaratively |

## G-L

| Term | Definition |
|------|------------|
| **God Class** | Code smell: a class that knows/does too much (violates SRP) |
| **Gradle** | Build automation tool using Groovy/Kotlin DSL, known for flexibility and speed |
| **GRASP** | General Responsibility Assignment Software Patterns - guidelines for assigning responsibilities |
| **Hook Method** | Method in a Template Method pattern that has a default (often empty) implementation subclasses may override |
| **Information Expert** | GRASP principle: assign responsibility to the class that has the information to fulfil it |
| **Inheritance** | IS-A relationship where a subclass extends a parent class |
| **Integration Test** | Test verifying that multiple components work correctly together |
| **Interface Segregation Principle** | Clients should not be forced to depend on methods they do not use |
| **JUnit** | Java testing framework for writing and running unit tests |
| **Lehman's Laws** | Eight laws describing how software systems must evolve to remain satisfactory |
| **Liskov Substitution Principle** | Objects of a supertype shall be replaceable with objects of a subtype without breaking correctness |
| **Long Method** | Code smell: a method that is too long and tries to do too much |

## M-O

| Term | Definition |
|------|------------|
| **Maven** | Build automation tool using XML configuration (pom.xml) with convention-over-configuration |
| **Message Chain** | Code smell: sequence of method calls like `a.getB().getC().doX()` |
| **Mock** | Test double that records interactions and can verify expected calls were made |
| **Mockito** | Java framework for creating mock objects in unit tests |
| **Model** | MVC/MVP component containing data and business logic |
| **MVC (Model-View-Controller)** | Architectural pattern separating data (Model), presentation (View), and input handling (Controller) |
| **MVP (Model-View-Presenter)** | Variant of MVC where the Presenter mediates all communication and the View is passive |
| **Observer** | Behavioural pattern defining a one-to-many dependency so dependents are notified of state changes |
| **Open/Closed Principle** | Software entities should be open for extension but closed for modification |

## P-R

| Term | Definition |
|------|------------|
| **Parameterized Test** | Test that runs multiple times with different input data |
| **Perfective Maintenance** | Improving existing functionality or performance |
| **Polymorphism** | Ability of different types to respond to the same interface/method call |
| **Presenter** | MVP component containing presentation logic, updates view explicitly |
| **Preventive Maintenance** | Making changes to prevent future problems |
| **Pure Fabrication** | GRASP pattern: a class that doesn't represent a domain concept but achieves design goals |
| **Refactoring** | Improving code structure without changing external behaviour |
| **Refused Bequest** | Code smell: subclass doesn't use or want inherited behaviour |
| **Replace Conditional with Polymorphism** | Refactoring replacing type-based switch/if-else with polymorphic method dispatch |

## S-T

| Term | Definition |
|------|------------|
| **Shotgun Surgery** | Code smell: a single change requires edits in many different classes |
| **Single Responsibility Principle** | A class should have only one reason to change |
| **Singleton** | Creational pattern ensuring a class has exactly one instance with a global access point |
| **SOLID** | Acronym for five OO design principles (SRP, OCP, LSP, ISP, DIP) |
| **State** | Behavioural pattern allowing an object to change its behaviour when its internal state changes |
| **Strategy** | Behavioural pattern defining a family of algorithms, encapsulating each one, and making them interchangeable |
| **Stub** | Test double that returns pre-configured responses to method calls |
| **Technical Debt** | Implied cost of future rework from choosing a quick but limited solution |
| **Template Method** | Behavioural pattern defining algorithm skeleton in a method, deferring some steps to subclasses |
| **Test Coverage** | Percentage of code executed during testing |
| **TDD (Test-Driven Development)** | Development process: write failing test, make it pass, refactor |

## U-Z

| Term | Definition |
|------|------------|
| **UML (Unified Modeling Language)** | Standardised visual language for modelling software systems |
| **Unit Test** | Test that verifies a single unit (class/method) in isolation |
| **View** | MVC/MVP component responsible for presenting data to the user |
| **YAGNI (You Ain't Gonna Need It)** | Principle to not add functionality until it is necessary |
