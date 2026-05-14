---
title: "GUI and Maintainability"
order: 8
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["MVC", "MVP", "GUI", "JavaFX", "Swing", "event handling", "separation of concerns", "Java"]
---

# GUI and Maintainability

## Why GUI Code is Hard to Maintain

:::eli10

GUI code gets messy because people tend to put everything in one place: the look of the screen, the logic of the application, and the data storage all tangled together. This makes it impossible to test the logic without opening a window, and any change to the appearance might break the calculations. The solution is to separate these concerns into different parts.

:::

:::eli15

GUI code is particularly prone to maintenance problems because: business logic gets mixed into UI event handlers (making it untestable without launching the GUI), state is scattered across widgets (leading to inconsistencies), event handlers become God methods doing everything, the code becomes tightly coupled to the specific UI framework (cannot swap), and there are no clear boundaries (shotgun surgery for any change). The solution is architectural patterns like MVC and MVP that enforce separation of concerns.

:::

:::eli20

| Problem | Consequence |
|---------|-------------|
| Business logic mixed with UI code | Can't test logic without launching GUI |
| Event handlers contain everything | God methods, hard to reuse |
| Tight coupling to framework | Can't swap UI toolkit |
| State scattered across widgets | Inconsistent display, race conditions |
| No clear boundaries | Shotgun surgery for changes |

:::

---

## MVC for GUI Applications

:::eli10

MVC splits a GUI application into three parts. The Model stores the data and knows the rules (like a calculator's memory). The View is what you see on screen (buttons, labels, text fields). The Controller is the middleman that connects actions (button clicks) to the model and tells the view to update. This way you can test the model without any GUI and swap the view without changing the logic.

:::

:::eli15

In GUI MVC: the Model holds all data and business logic (completely independent of the UI), the View handles display and input capture (observes the model for changes), and the Controller coordinates between them (handles user input, updates model, selects views). Key benefit: the Model can be fully unit tested without any GUI framework. The View can be swapped (desktop, web, mobile) without changing business logic. JavaFX supports this through FXML (declarative views), property binding, and controller classes.

:::

:::eli20

### Component Responsibilities

| Component | Responsibilities | Knows about |
|-----------|-----------------|-------------|
| **Model** | Data, business logic, state, validation | Nothing (independent) |
| **View** | Display, user input capture, visual feedback | Model (observes) |
| **Controller** | Input handling, coordination, command interpretation | Model + View |

### JavaFX MVC Example

```java
// === MODEL ===
public class CounterModel {
    private int count = 0;
    private List<Runnable> listeners = new ArrayList<>();

    public int getCount() { return count; }

    public void increment() {
        count++;
        notifyListeners();
    }

    public void decrement() {
        if (count > 0) {
            count--;
            notifyListeners();
        }
    }

    public void addListener(Runnable listener) {
        listeners.add(listener);
    }

    private void notifyListeners() {
        listeners.forEach(Runnable::run);
    }
}

// === VIEW (FXML or programmatic) ===
public class CounterView extends VBox {
    private Label countLabel;
    private Button incrementBtn;
    private Button decrementBtn;

    public CounterView() {
        countLabel = new Label("0");
        incrementBtn = new Button("+");
        decrementBtn = new Button("-");
        getChildren().addAll(countLabel, incrementBtn, decrementBtn);
    }

    public void setCount(int count) {
        countLabel.setText(String.valueOf(count));
    }

    public void setOnIncrement(Runnable handler) {
        incrementBtn.setOnAction(e -> handler.run());
    }

    public void setOnDecrement(Runnable handler) {
        decrementBtn.setOnAction(e -> handler.run());
    }
}

// === CONTROLLER ===
public class CounterController {
    private CounterModel model;
    private CounterView view;

    public CounterController(CounterModel model, CounterView view) {
        this.model = model;
        this.view = view;

        // Wire view events to model actions
        view.setOnIncrement(model::increment);
        view.setOnDecrement(model::decrement);

        // Wire model changes to view updates
        model.addListener(() -> view.setCount(model.getCount()));
    }
}

// === MAIN ===
public class App extends Application {
    @Override
    public void start(Stage stage) {
        CounterModel model = new CounterModel();
        CounterView view = new CounterView();
        CounterController controller = new CounterController(model, view);

        stage.setScene(new Scene(view, 200, 100));
        stage.show();
    }
}
```

:::

---

## MVP (Model-View-Presenter)

:::eli10

MVP is like MVC but the View is even simpler -- it just displays what it is told and reports button clicks, nothing else. All the thinking is done by the Presenter. This makes the View so simple you can replace it with a fake for testing. The Presenter can be tested completely without any real screen.

:::

:::eli15

MVP (Model-View-Presenter) makes the View completely passive ("dumb"): it only displays data and forwards user actions to the Presenter. The Presenter contains all presentation logic and explicitly updates the View. Unlike MVC (where the View observes the Model directly), in MVP the View only talks to the Presenter. This makes testing much easier because the View can be mocked -- you can test all Presenter logic without any GUI. MVP is preferred when testability is a priority.

:::

:::eli20

### MVC vs MVP

| Aspect | MVC | MVP |
|--------|-----|-----|
| View-Model link | View observes Model directly | View only talks to Presenter |
| View intelligence | Some logic (observing) | Passive (dumb), no logic |
| Testability | Moderate | High (view is mockable interface) |
| Presenter/Controller | Thin controller | Contains presentation logic |
| Data binding | Model notifies View | Presenter updates View explicitly |

### MVP Implementation

```java
// View interface (allows mocking)
public interface CounterViewInterface {
    void setCount(int count);
    void setDecrementEnabled(boolean enabled);
    void setOnIncrement(Runnable handler);
    void setOnDecrement(Runnable handler);
}

// Presenter (all logic here - fully testable)
public class CounterPresenter {
    private CounterModel model;
    private CounterViewInterface view;

    public CounterPresenter(CounterModel model, CounterViewInterface view) {
        this.model = model;
        this.view = view;

        view.setOnIncrement(this::onIncrement);
        view.setOnDecrement(this::onDecrement);
        updateView();
    }

    private void onIncrement() {
        model.increment();
        updateView();
    }

    private void onDecrement() {
        model.decrement();
        updateView();
    }

    private void updateView() {
        view.setCount(model.getCount());
        view.setDecrementEnabled(model.getCount() > 0);
    }
}

// Now we can test without any GUI:
@Test
void testIncrementUpdatesView() {
    CounterModel model = new CounterModel();
    CounterViewInterface mockView = mock(CounterViewInterface.class);
    CounterPresenter presenter = new CounterPresenter(model, mockView);

    // Simulate button press
    ArgumentCaptor<Runnable> captor = ArgumentCaptor.forClass(Runnable.class);
    verify(mockView).setOnIncrement(captor.capture());
    captor.getValue().run();

    verify(mockView).setCount(1);
}
```

:::

---

## Event Handling Best Practices

:::eli10

The biggest mistake in GUI programming is putting all the logic inside the button click handler. Instead, the handler should just say "hey controller, the button was clicked" and the controller handles everything else. This keeps the GUI code simple and the logic testable.

:::

:::eli15

Event handlers should be thin -- they should only delegate to a controller or presenter method, not contain business logic, validation, database calls, or complex calculations. Bad: a button handler that validates input, calculates tax, saves to database, and sends email (untestable, unmaintainable). Good: a handler that calls `controller.handleCalculate()` which orchestrates the logic through properly separated services. This enables testing logic without GUI and keeps event handlers trivially simple.

:::

:::eli20

### Bad: Logic in Event Handler

```java
// BAD: Everything in the handler
button.setOnAction(event -> {
    String input = textField.getText();
    if (input.isEmpty()) {
        errorLabel.setText("Input required");
        return;
    }
    double price = Double.parseDouble(input);
    double tax = price * 0.2;
    double total = price + tax;
    resultLabel.setText("Total: " + total);
    database.save(new Order(price, tax, total));
    emailService.sendReceipt(total);
});
```

### Good: Delegate to Controller/Presenter

```java
// GOOD: Handler just delegates
button.setOnAction(event -> controller.handleCalculate());

// Controller handles logic
public class OrderController {
    public void handleCalculate() {
        String input = view.getInputText();
        try {
            Order order = orderService.createOrder(input);
            view.displayTotal(order.getTotal());
        } catch (ValidationException e) {
            view.showError(e.getMessage());
        }
    }
}
```

:::

---

## Separating Concerns in JavaFX

:::eli10

JavaFX lets you separate the look (FXML files -- like HTML for your app) from the behaviour (Java controller classes). You can also use property binding so that when data in the model changes, the screen updates automatically without you writing extra code. This keeps things clean and maintainable.

:::

:::eli15

JavaFX supports separation of concerns through FXML (declarative XML view definitions, similar to HTML), controller classes linked to FXML, and property binding (automatic UI updates when model data changes). FXML separates view structure from Java logic. Property binding (`label.textProperty().bind(model.property().asString())`) eliminates manual update code. CSS handles styling separately. These mechanisms together enable a clean MVC/MVP architecture in JavaFX applications.

:::

:::eli20

### FXML for Separation

```xml
<!-- counter.fxml - View definition (declarative) -->
<VBox xmlns:fx="http://javafx.com/fxml"
      fx:controller="com.example.CounterController">
    <Label fx:id="countLabel" text="0"/>
    <Button text="+" onAction="#handleIncrement"/>
    <Button text="-" onAction="#handleDecrement"/>
</VBox>
```

```java
// CounterController.java - linked to FXML
public class CounterController {
    @FXML private Label countLabel;

    private CounterModel model = new CounterModel();

    @FXML
    private void handleIncrement() {
        model.increment();
        countLabel.setText(String.valueOf(model.getCount()));
    }

    @FXML
    private void handleDecrement() {
        model.decrement();
        countLabel.setText(String.valueOf(model.getCount()));
    }
}
```

### Property Binding (JavaFX)

```java
// JavaFX properties enable automatic UI updates
public class CounterModel {
    private IntegerProperty count = new SimpleIntegerProperty(0);

    public IntegerProperty countProperty() { return count; }
    public int getCount() { return count.get(); }
    public void setCount(int value) { count.set(value); }
}

// View binds directly to model property
countLabel.textProperty().bind(model.countProperty().asString());
// Now label updates automatically when model changes!
```

:::

---

## Testing GUI Code

:::eli10

The secret to testing GUI code is to put all the logic in the Model and Presenter/Controller (which can be tested easily without a screen) and keep the View so simple it barely needs testing. You test the Model with normal JUnit, test the Presenter with mocked Views, and only use special GUI testing tools for checking that things look right.

:::

:::eli15

A testable GUI architecture allows most logic to be verified without launching the GUI. Unit test the Model with plain JUnit (no UI dependencies). Unit test the Presenter/Controller with a mock View interface (verifying it calls the right View methods). Use integration testing tools (TestFX for JavaFX) only for verifying visual behaviour and component interaction. The key architectural requirement: the Model must have zero GUI dependencies, the View must be a passive mockable interface, and event handlers must be thin delegates.

:::

:::eli20

| Approach | What it tests | Tool |
|----------|---------------|------|
| Unit test Presenter/Controller | Logic without GUI | JUnit + Mockito |
| Unit test Model | Business rules | JUnit |
| Integration test | Components together | TestFX (JavaFX) |
| Manual test | Visual appearance | Human inspection |

### Testable Architecture Checklist

| Requirement | How |
|-------------|-----|
| Model has no GUI dependencies | Pure Java, no import javafx.* |
| Controller is testable | Inject mock view interface |
| View is passive | No business logic, only display |
| Event handlers are thin | Delegate to controller immediately |
| State is in model | View reflects model, not vice versa |

:::

---

<details>
<summary>Practice: Identify the problem</summary>

```java
public class GamePanel extends JPanel implements ActionListener {
    private int score = 0;
    private Timer timer;
    private List<Enemy> enemies = new ArrayList<>();

    public void actionPerformed(ActionEvent e) {
        // Move enemies
        for (Enemy enemy : enemies) { enemy.move(); }
        // Check collisions
        for (Enemy enemy : enemies) {
            if (player.collidesWith(enemy)) {
                score += 10;
                enemies.remove(enemy);
                // Save high score
                FileWriter fw = new FileWriter("scores.txt");
                fw.write(String.valueOf(score));
                fw.close();
            }
        }
        repaint();
    }
}
```

**Problems:**
1. **God class** - GamePanel handles rendering, game logic, file I/O
2. **No separation** - Model (score, enemies) mixed with View (JPanel)
3. **Untestable** - Can't test game logic without creating a JPanel
4. **File I/O in event handler** - Blocks UI thread, belongs in a service
5. **ConcurrentModificationException** - Removing from list during iteration

**Fix:** Extract `GameModel`, `GameController`, keep `GamePanel` as view only.

</details>

<details>
<summary>Practice: Refactor to MVP</summary>

Given a login form with username/password fields and a submit button, identify:

- **Model:** `UserRepository` (validates credentials), `User` (data)
- **View Interface:** `LoginView` with methods: `getUsername()`, `getPassword()`, `showError(String)`, `navigateToHome()`, `setOnSubmit(Runnable)`
- **Presenter:** `LoginPresenter` with method `handleLogin()` that:
  1. Gets credentials from view
  2. Validates via model
  3. Shows error or navigates

This way, `LoginPresenter` can be fully unit tested with a mock `LoginView`.

</details>
