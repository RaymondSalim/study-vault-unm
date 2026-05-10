---
title: "Design Patterns - Creational"
order: 3
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["design patterns", "creational", "Singleton", "Factory Method", "Abstract Factory", "Builder", "Java"]
---

# Creational Design Patterns

Creational patterns deal with object creation mechanisms, abstracting the instantiation process.

## Pattern Overview

| Pattern | Intent | When to use |
|---------|--------|-------------|
| **Singleton** | Ensure only one instance exists | Shared resource (config, connection pool) |
| **Factory Method** | Defer instantiation to subclasses | Don't know exact type at compile time |
| **Abstract Factory** | Create families of related objects | Need platform/theme-independent creation |
| **Builder** | Construct complex objects step by step | Object has many optional parameters |

---

## Singleton

### UML Structure

| Class | Members |
|-------|---------|
| `Singleton` | `-instance: Singleton` (static) |
| | `-Singleton()` (private constructor) |
| | `+getInstance(): Singleton` (static) |

### Implementation

```java
// Eager initialisation (thread-safe, simplest)
public class GameEngine {
    private static final GameEngine INSTANCE = new GameEngine();

    private GameEngine() {
        // Private constructor prevents external instantiation
    }

    public static GameEngine getInstance() {
        return INSTANCE;
    }
}

// Lazy initialisation (thread-safe with double-checked locking)
public class DatabaseConnection {
    private static volatile DatabaseConnection instance;

    private DatabaseConnection() {}

    public static DatabaseConnection getInstance() {
        if (instance == null) {                  // First check (no lock)
            synchronized (DatabaseConnection.class) {
                if (instance == null) {          // Second check (with lock)
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}
```

### Trade-offs

| Pros | Cons |
|------|------|
| Controlled access to sole instance | Global state (hidden dependency) |
| Lazy initialisation possible | Hard to unit test (tight coupling) |
| Thread-safe with proper implementation | Violates SRP (controls own lifecycle) |

---

## Factory Method

### UML Structure

| Class | Role |
|-------|------|
| `Product` (interface) | Defines the interface for created objects |
| `ConcreteProductA/B` | Implements `Product` |
| `Creator` (abstract) | Declares `factoryMethod(): Product` |
| `ConcreteCreatorA/B` | Overrides `factoryMethod()` to return specific product |

### Implementation

```java
// Product interface
public interface Notification {
    void send(String message);
}

// Concrete products
public class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

public class SmsNotification implements Notification {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

public class PushNotification implements Notification {
    public void send(String message) {
        System.out.println("Push: " + message);
    }
}

// Creator (abstract)
public abstract class NotificationFactory {
    // Factory method
    public abstract Notification createNotification();

    // Template logic using the factory method
    public void notifyUser(String message) {
        Notification notification = createNotification();
        notification.send(message);
    }
}

// Concrete creators
public class EmailNotificationFactory extends NotificationFactory {
    public Notification createNotification() {
        return new EmailNotification();
    }
}

public class SmsNotificationFactory extends NotificationFactory {
    public Notification createNotification() {
        return new SmsNotification();
    }
}
```

### Parameterised Factory (simpler variant)

```java
public class NotificationFactory {
    public static Notification create(String type) {
        return switch (type) {
            case "email" -> new EmailNotification();
            case "sms"   -> new SmsNotification();
            case "push"  -> new PushNotification();
            default -> throw new IllegalArgumentException("Unknown type: " + type);
        };
    }
}
```

---

## Abstract Factory

### UML Structure

| Class | Role |
|-------|------|
| `AbstractFactory` | Declares creation methods for each product family member |
| `ConcreteFactory1/2` | Implements creation for a specific family/theme |
| `AbstractProductA/B` | Interface for each kind of product |
| `ConcreteProductA1/B1` | Product for Family 1 |
| `ConcreteProductA2/B2` | Product for Family 2 |

### Implementation

```java
// Abstract products
public interface Button {
    void render();
}

public interface TextField {
    void render();
}

// Concrete products - Light theme
public class LightButton implements Button {
    public void render() { System.out.println("[ Light Button ]"); }
}

public class LightTextField implements TextField {
    public void render() { System.out.println("| Light TextField |"); }
}

// Concrete products - Dark theme
public class DarkButton implements Button {
    public void render() { System.out.println("[ Dark Button ]"); }
}

public class DarkTextField implements TextField {
    public void render() { System.out.println("| Dark TextField |"); }
}

// Abstract factory
public interface UIFactory {
    Button createButton();
    TextField createTextField();
}

// Concrete factories
public class LightThemeFactory implements UIFactory {
    public Button createButton() { return new LightButton(); }
    public TextField createTextField() { return new LightTextField(); }
}

public class DarkThemeFactory implements UIFactory {
    public Button createButton() { return new DarkButton(); }
    public TextField createTextField() { return new DarkTextField(); }
}

// Client code - depends only on abstractions
public class Application {
    private Button button;
    private TextField textField;

    public Application(UIFactory factory) {
        this.button = factory.createButton();
        this.textField = factory.createTextField();
    }

    public void render() {
        button.render();
        textField.render();
    }
}
```

### Factory Method vs Abstract Factory

| Aspect | Factory Method | Abstract Factory |
|--------|---------------|-----------------|
| Creates | One product | Family of related products |
| Mechanism | Inheritance (subclass overrides) | Composition (factory object injected) |
| Extensibility | Add new creator subclass | Add new factory implementation |
| Complexity | Simpler | More complex |

---

## Builder

### UML Structure

| Class | Role |
|-------|------|
| `Product` | The complex object being built |
| `Builder` (interface) | Step-by-step construction methods |
| `ConcreteBuilder` | Implements construction steps |
| `Director` (optional) | Defines order of construction steps |

### Implementation

```java
public class Pizza {
    private String dough;
    private String sauce;
    private String topping;
    private boolean cheese;
    private boolean extraLarge;

    // Private constructor - only Builder can create
    private Pizza(Builder builder) {
        this.dough = builder.dough;
        this.sauce = builder.sauce;
        this.topping = builder.topping;
        this.cheese = builder.cheese;
        this.extraLarge = builder.extraLarge;
    }

    // Static inner Builder class
    public static class Builder {
        // Required parameters
        private final String dough;

        // Optional parameters with defaults
        private String sauce = "tomato";
        private String topping = "";
        private boolean cheese = true;
        private boolean extraLarge = false;

        public Builder(String dough) {
            this.dough = dough;
        }

        public Builder sauce(String sauce) {
            this.sauce = sauce;
            return this;  // Enable method chaining
        }

        public Builder topping(String topping) {
            this.topping = topping;
            return this;
        }

        public Builder cheese(boolean cheese) {
            this.cheese = cheese;
            return this;
        }

        public Builder extraLarge(boolean extraLarge) {
            this.extraLarge = extraLarge;
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }
}

// Usage with fluent API
Pizza pizza = new Pizza.Builder("thin crust")
    .sauce("bbq")
    .topping("pepperoni")
    .extraLarge(true)
    .build();
```

### When to Use Builder vs Constructor vs Setters

| Approach | When |
|----------|------|
| Constructor | Few parameters, all required |
| Setters | Mutable object, optional fields |
| Builder | Many parameters, immutable object, complex validation |

---

<details>
<summary>Practice: Choose the pattern</summary>

1. You need exactly one instance of a configuration manager → **Singleton**
2. A document editor must create different UI elements for Windows/Mac → **Abstract Factory**
3. You want to construct an HTTP request with many optional headers → **Builder**
4. A game needs to spawn different enemy types based on difficulty level → **Factory Method**
5. A logging framework must support different output targets (file, console, network) → **Factory Method**

</details>

<details>
<summary>Practice: Identify the problem</summary>

```java
public class Logger {
    private static Logger instance = null;
    public Logger() { } // What's wrong here?

    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }
}
```

**Problems:**
1. Constructor is `public` - anyone can bypass `getInstance()` and create additional instances
2. Not thread-safe - two threads could both see `instance == null` and create two instances
3. Fix: Make constructor `private` and add `synchronized` or use eager initialisation

</details>
