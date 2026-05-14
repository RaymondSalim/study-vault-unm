---
title: "Design Patterns - Behavioural"
order: 5
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["design patterns", "behavioural", "Strategy", "Observer", "State", "Template Method", "MVC", "Java"]
---

# Behavioural Design Patterns

## Pattern Overview

:::eli10

Behavioural patterns are about how objects talk to each other and share work. Strategy lets you swap out algorithms like changing the route on a GPS. Observer is like a notification system -- when something changes, everyone subscribed gets told. State makes an object behave differently depending on its current situation (like a traffic light). Template Method is a recipe with some steps filled in and others left blank for subclasses.

:::

:::eli15

Behavioural patterns define how objects interact and distribute responsibility. Strategy encapsulates interchangeable algorithms behind a common interface (swap at runtime). Observer implements one-to-many notifications (pub/sub pattern). State allows an object's behaviour to change when its internal state changes (avoids large conditionals). Template Method defines an algorithm skeleton with abstract steps filled by subclasses. MVC separates concerns for GUI applications into model (data), view (display), and controller (input handling).

:::

:::eli20

Behavioural patterns deal with communication between objects, defining how objects interact and distribute responsibility.

| Pattern | Intent | When to use |
|---------|--------|-------------|
| **Strategy** | Define a family of interchangeable algorithms | Need to swap algorithms at runtime |
| **Observer** | One-to-many dependency notification | Event handling, pub/sub |
| **State** | Change behaviour when internal state changes | Object acts differently based on state |
| **Template Method** | Define algorithm skeleton, defer steps to subclass | Same structure, different steps |
| **MVC** | Separate model, view, controller | GUI applications |

:::

---

## Strategy

:::eli10

The Strategy pattern is like choosing which route to take on a GPS. The destination is the same, but you can pick "fastest," "shortest," or "scenic." Your app does not care which route algorithm is used -- it just asks the current strategy to calculate the route. You can switch strategies at any time without changing the app itself.

:::

:::eli15

The Strategy pattern defines a family of algorithms, encapsulates each one behind a common interface, and makes them interchangeable. The Context holds a reference to a Strategy and delegates the algorithmic work to it. Strategies can be swapped at runtime without modifying client code. This replaces complex conditional logic (if-else or switch on type) with polymorphism, following the Open/Closed Principle.

:::

:::eli20

### UML Structure

| Class | Role |
|-------|------|
| `Strategy` (interface) | Declares the algorithm interface |
| `ConcreteStrategyA/B/C` | Implements specific algorithm |
| `Context` | Holds a `Strategy` reference, delegates to it |

### Implementation

```java
// Strategy interface
public interface SortStrategy {
    <T extends Comparable<T>> void sort(List<T> list);
    String getName();
}

// Concrete strategies
public class BubbleSortStrategy implements SortStrategy {
    public <T extends Comparable<T>> void sort(List<T> list) {
        // Bubble sort implementation
        for (int i = 0; i < list.size() - 1; i++) {
            for (int j = 0; j < list.size() - i - 1; j++) {
                if (list.get(j).compareTo(list.get(j + 1)) > 0) {
                    Collections.swap(list, j, j + 1);
                }
            }
        }
    }
    public String getName() { return "Bubble Sort"; }
}

public class QuickSortStrategy implements SortStrategy {
    public <T extends Comparable<T>> void sort(List<T> list) {
        Collections.sort(list); // Simplified
    }
    public String getName() { return "Quick Sort"; }
}

// Context
public class Sorter {
    private SortStrategy strategy;

    public Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy; // Can change at runtime!
    }

    public <T extends Comparable<T>> void sort(List<T> list) {
        System.out.println("Using: " + strategy.getName());
        strategy.sort(list);
    }
}

// Usage - swap strategies at runtime
Sorter sorter = new Sorter(new BubbleSortStrategy());
sorter.sort(smallList);

sorter.setStrategy(new QuickSortStrategy()); // Switch!
sorter.sort(largeList);
```

### Strategy vs Conditional Logic

```java
// BAD: Conditional logic (violates OCP)
public double calculateDiscount(String type, double price) {
    if (type.equals("student"))     return price * 0.2;
    else if (type.equals("senior")) return price * 0.3;
    else if (type.equals("vip"))    return price * 0.4;
    else                            return 0;
}

// GOOD: Strategy pattern
public interface DiscountStrategy {
    double apply(double price);
}

public class StudentDiscount implements DiscountStrategy {
    public double apply(double price) { return price * 0.2; }
}
// etc.
```

:::

---

## Observer

:::eli10

The Observer pattern is like subscribing to a YouTube channel. When the channel (subject) uploads a new video, all subscribers (observers) get notified automatically. You can subscribe and unsubscribe any time. The channel does not need to know anything about each subscriber -- it just sends notifications to everyone on the list.

:::

:::eli15

The Observer pattern establishes a one-to-many dependency where multiple observers are notified automatically when a subject's state changes. The subject maintains a list of observers, and when its state changes, it iterates through the list calling each observer's update method. This decouples the subject from the observers (it only knows the Observer interface). Two models exist: push (subject sends data with notification) and pull (observer queries subject after being notified).

:::

:::eli20

### UML Structure

| Class | Role |
|-------|------|
| `Subject` (interface) | Maintains list of observers, notifies them |
| `ConcreteSubject` | Stores state, notifies observers on change |
| `Observer` (interface) | Defines `update()` method |
| `ConcreteObserverA/B` | Reacts to notifications |

### Implementation

```java
// Observer interface
public interface Observer {
    void update(String event, Object data);
}

// Subject interface
public interface Subject {
    void addObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers(String event, Object data);
}

// Concrete subject
public class StockMarket implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private Map<String, Double> prices = new HashMap<>();

    public void addObserver(Observer o) { observers.add(o); }
    public void removeObserver(Observer o) { observers.remove(o); }

    public void notifyObservers(String event, Object data) {
        for (Observer o : observers) {
            o.update(event, data);
        }
    }

    public void setPrice(String stock, double price) {
        prices.put(stock, price);
        notifyObservers("PRICE_CHANGE", stock + ": " + price);
    }
}

// Concrete observers
public class StockDisplay implements Observer {
    private String name;

    public StockDisplay(String name) { this.name = name; }

    public void update(String event, Object data) {
        System.out.println("[" + name + "] " + event + " -> " + data);
    }
}

public class AlertSystem implements Observer {
    public void update(String event, Object data) {
        System.out.println("ALERT: " + data);
    }
}

// Usage
StockMarket market = new StockMarket();
market.addObserver(new StockDisplay("Main Screen"));
market.addObserver(new StockDisplay("Mobile App"));
market.addObserver(new AlertSystem());

market.setPrice("AAPL", 150.0); // All observers notified
```

### Push vs Pull Model

| Model | Description | Trade-off |
|-------|-------------|-----------|
| **Push** | Subject sends data in notification | Simple but may send unwanted data |
| **Pull** | Observer queries subject for data it needs | Flexible but requires subject reference |

:::

---

## State

:::eli10

The State pattern makes an object act differently depending on its current state, like a vending machine. With no coin inserted, pressing buttons does nothing. After inserting a coin, you can select a product. While dispensing, it ignores new coins. Each state is a separate object that handles the behaviour for that situation, and the machine switches between them automatically.

:::

:::eli15

The State pattern encapsulates state-specific behaviour in separate state classes. The context delegates behaviour to its current state object, and states manage transitions to other states. This eliminates large conditional statements (if state == X then... else if state == Y then...) and makes adding new states simple (just add a new class). Unlike Strategy (where the client chooses the algorithm), in State the transitions are managed internally by the state objects themselves.

:::

:::eli20

### UML Structure

| Class | Role |
|-------|------|
| `Context` | Maintains current `State` reference, delegates behaviour |
| `State` (interface) | Declares state-specific behaviour |
| `ConcreteStateA/B/C` | Implements behaviour for a specific state |

### Implementation

```java
// State interface
public interface VendingMachineState {
    void insertCoin(VendingMachine machine);
    void selectProduct(VendingMachine machine);
    void dispense(VendingMachine machine);
}

// Context
public class VendingMachine {
    private VendingMachineState state;
    private VendingMachineState noCoinState;
    private VendingMachineState hasCoinState;
    private VendingMachineState dispensingState;

    public VendingMachine() {
        noCoinState = new NoCoinState();
        hasCoinState = new HasCoinState();
        dispensingState = new DispensingState();
        state = noCoinState; // Initial state
    }

    public void setState(VendingMachineState state) { this.state = state; }
    public VendingMachineState getNoCoinState() { return noCoinState; }
    public VendingMachineState getHasCoinState() { return hasCoinState; }
    public VendingMachineState getDispensingState() { return dispensingState; }

    // Delegates to current state
    public void insertCoin() { state.insertCoin(this); }
    public void selectProduct() { state.selectProduct(this); }
    public void dispense() { state.dispense(this); }
}

// Concrete states
public class NoCoinState implements VendingMachineState {
    public void insertCoin(VendingMachine m) {
        System.out.println("Coin inserted");
        m.setState(m.getHasCoinState());
    }
    public void selectProduct(VendingMachine m) {
        System.out.println("Insert coin first!");
    }
    public void dispense(VendingMachine m) {
        System.out.println("Insert coin first!");
    }
}

public class HasCoinState implements VendingMachineState {
    public void insertCoin(VendingMachine m) {
        System.out.println("Coin already inserted");
    }
    public void selectProduct(VendingMachine m) {
        System.out.println("Product selected");
        m.setState(m.getDispensingState());
    }
    public void dispense(VendingMachine m) {
        System.out.println("Select a product first!");
    }
}

public class DispensingState implements VendingMachineState {
    public void insertCoin(VendingMachine m) {
        System.out.println("Please wait, dispensing...");
    }
    public void selectProduct(VendingMachine m) {
        System.out.println("Already dispensing...");
    }
    public void dispense(VendingMachine m) {
        System.out.println("Product dispensed!");
        m.setState(m.getNoCoinState());
    }
}
```

### State vs Strategy

| Aspect | State | Strategy |
|--------|-------|----------|
| Intent | Behaviour changes as internal state changes | Choose algorithm at runtime |
| Transitions | States know about each other (manage transitions) | Strategies are independent |
| Awareness | Context may not choose state directly | Client typically sets strategy |
| Analogy | Traffic light (changes automatically) | GPS (user picks route algorithm) |

:::

---

## Template Method

:::eli10

The Template Method is like a recipe that says "Step 1: prepare ingredients, Step 2: cook, Step 3: serve" -- but each chef does these steps differently. The overall order is fixed (you cannot serve before cooking), but the details are left to each specific chef (subclass) to fill in. The template locks the structure; subclasses provide the specifics.

:::

:::eli15

The Template Method defines an algorithm's skeleton in a base class method (usually marked `final` to prevent overriding), with certain steps left as abstract methods for subclasses to implement. This ensures the algorithm's structure is consistent while allowing variation in specific steps. Hook methods provide optional override points with default implementations. It inverts control: the base class calls subclass code, not vice versa (Hollywood Principle: "don't call us, we'll call you").

:::

:::eli20

### UML Structure

| Class | Role |
|-------|------|
| `AbstractClass` | Defines `templateMethod()` with algorithm skeleton, abstract steps |
| `ConcreteClassA/B` | Implements the abstract steps |

### Implementation

```java
// Abstract class with template method
public abstract class DataMiner {

    // Template method - defines the skeleton (final = cannot override)
    public final void mine(String path) {
        openFile(path);
        String rawData = extractData();
        String parsed = parseData(rawData);
        analyseData(parsed);
        generateReport(parsed);
        closeFile();
    }

    // Steps to be implemented by subclasses
    protected abstract void openFile(String path);
    protected abstract String extractData();
    protected abstract void closeFile();

    // Steps with default implementation (hooks)
    protected String parseData(String rawData) {
        return rawData.trim(); // Default parsing
    }

    protected void analyseData(String data) {
        System.out.println("Analysing " + data.length() + " characters");
    }

    protected void generateReport(String data) {
        System.out.println("Report generated");
    }
}

// Concrete implementation
public class CsvDataMiner extends DataMiner {
    private BufferedReader reader;

    protected void openFile(String path) {
        reader = new BufferedReader(new FileReader(path));
    }

    protected String extractData() {
        return reader.lines().collect(Collectors.joining("\n"));
    }

    protected void closeFile() {
        reader.close();
    }
}

public class PdfDataMiner extends DataMiner {
    protected void openFile(String path) { /* PDF-specific open */ }
    protected String extractData() { /* PDF text extraction */ return ""; }
    protected void closeFile() { /* PDF-specific close */ }
}
```

### Hook Methods

```java
public abstract class Game {
    // Template method
    public final void play() {
        initialise();
        while (!isGameOver()) {  // Hook - subclass controls loop
            makeMove();
        }
        displayResult();
    }

    protected abstract void initialise();
    protected abstract void makeMove();
    protected abstract boolean isGameOver(); // Hook
    protected abstract void displayResult();
}
```

:::

---

## MVC (Model-View-Controller)

:::eli10

MVC splits an application into three parts: the Model (the data and rules -- like a database), the View (what users see -- like a screen), and the Controller (the traffic cop that handles user actions and coordinates between the other two). This way, you can change how things look (View) without changing how they work (Model), and vice versa.

:::

:::eli15

MVC separates an application into three components: the Model (data + business logic, notifies observers of changes), the View (presentation layer, displays data and captures input), and the Controller (mediator that handles input, updates the model, and selects views). The key benefit is separation of concerns: the model is testable without UI, the view can be swapped (web, mobile, desktop), and the controller coordinates without knowing rendering details. The model typically uses the Observer pattern to notify views of changes.

:::

:::eli20

### UML Structure

| Component | Role | Responsibilities |
|-----------|------|-----------------|
| **Model** | Data + business logic | State, validation, persistence |
| **View** | Presentation | Displays data, captures user input |
| **Controller** | Mediator | Handles input, updates Model, selects View |

### Interaction Flow

```
User Action → Controller → Model (update) → View (refresh)
                              ↓
                         Notify observers (Views)
```

### Implementation

```java
// Model
public class StudentModel {
    private String name;
    private int grade;
    private List<Observer> observers = new ArrayList<>();

    public String getName() { return name; }
    public int getGrade() { return grade; }

    public void setGrade(int grade) {
        this.grade = grade;
        notifyObservers();
    }

    public void addObserver(Observer o) { observers.add(o); }

    private void notifyObservers() {
        for (Observer o : observers) {
            o.update();
        }
    }
}

// View
public class StudentView implements Observer {
    private StudentModel model;

    public StudentView(StudentModel model) {
        this.model = model;
        model.addObserver(this);
    }

    public void display() {
        System.out.println("Student: " + model.getName());
        System.out.println("Grade: " + model.getGrade());
    }

    public void update() {
        display(); // Refresh when model changes
    }
}

// Controller
public class StudentController {
    private StudentModel model;
    private StudentView view;

    public StudentController(StudentModel model, StudentView view) {
        this.model = model;
        this.view = view;
    }

    public void updateGrade(int newGrade) {
        if (newGrade >= 0 && newGrade <= 100) { // Validation
            model.setGrade(newGrade);
        } else {
            System.out.println("Invalid grade");
        }
    }
}
```

:::

---

<details>
<summary>Practice: Choose the pattern</summary>

1. A payment system needs to support PayPal, Stripe, and bank transfer interchangeably → **Strategy**
2. Multiple dashboard widgets update when new data arrives → **Observer**
3. A TCP connection behaves differently when Listening, Established, or Closed → **State**
4. All report generators follow the same steps (fetch, process, format) but differ in details → **Template Method**
5. A shopping app where the UI, data, and logic are separated → **MVC**

</details>

<details>
<summary>Practice: State pattern - draw the state diagram</summary>

For a Document with states: Draft, Moderation, Published:

- **Draft** → `publish()` → **Moderation** (if author)
- **Draft** → `publish()` → **Published** (if admin)
- **Moderation** → `approve()` → **Published**
- **Moderation** → `reject()` → **Draft**
- **Published** → `unpublish()` → **Draft**

Key question: **Who decides the transition?** In the State pattern, each state object encapsulates the transition logic for its own state.

</details>
