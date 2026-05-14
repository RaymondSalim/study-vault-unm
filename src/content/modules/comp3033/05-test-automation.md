---
title: "Test Automation & JUnit"
order: 5
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["test-automation", "junit", "ripr", "parameterized-tests", "test-fixture", "espresso"]
---

## Test Automation

:::eli10

Instead of a person clicking buttons and checking results every time something changes, you write a program that tests your program automatically. It is like having a robot assistant that checks your homework for you every single time you update it.

:::

:::eli15

Test automation means writing code that runs your tests automatically instead of relying on manual testing. It reduces human error, makes regression testing practical (tests run on every code change), frees developers to focus on creative test design work, and integrates directly into CI/CD pipelines for continuous feedback.

:::

:::eli20

**Why automate?**
- Reduces cost of testing and human error
- Makes regression testing easier (runs on every code change)
- Frees developers to focus on test design (creative work)
- Integrates into CI/CD pipeline

:::

## The RIPR Model

:::eli10

For a test to actually catch a bug, four things must happen in order: (1) the test must run the broken part of the code, (2) the broken code must cause something wrong inside the computer, (3) that wrongness must show up in the final answer, and (4) you must actually check the answer and notice it is wrong.

:::

:::eli15

The RIPR model describes four conditions needed for a test to successfully reveal a failure. Reach: execution must arrive at the faulty code. Infect: the fault must cause an incorrect internal state. Propagate: the error must travel to an observable output. Reveal: the tester must have an oracle (expected result) to notice the incorrect output. If any step fails, the bug goes undetected.

:::

:::eli20

Four conditions needed for a test to be **effective** (reveal failures):

| Step | Name | Meaning | Test Component |
|------|------|---------|----------------|
| 1 | **Reach** | Execution reaches the faulty location | Prefix values |
| 2 | **Infect** | Fault causes incorrect internal state | Test case values |
| 3 | **Propagate** | Error propagates to observable output | Postfix values |
| 4 | **Reveal** | Tester can observe the incorrect output | Expected results (oracle) |

:::

## Components of a Test Case

:::eli10

A test case has four parts: setting things up (like opening a game to the right level), giving it the actual inputs to test, doing things after the test to check the result, and knowing what the correct answer should be so you can tell if it passed or failed.

:::

:::eli15

Every test case consists of four components that map to the RIPR model. Prefix values set up the initial state (Reach). Test case values are the actual inputs being tested (Infect). Postfix values are inputs after the test values that help verify and exit cleanly (Propagate). Expected results are the oracle -- the correct output you compare against (Reveal).

:::

:::eli20

| Component | Purpose | RIPR Role |
|-----------|---------|-----------|
| **Prefix values** | Put system into initial state | Reach faulty location |
| **Test case values** | Input values for the test | Infect (trigger error) |
| **Postfix values** | Inputs after test values (verification + exit) | Propagate error |
| **Expected results** | The oracle — correct output | Reveal failure |

:::

## JUnit 5 (Jupiter)

:::eli10

JUnit is a tool for Java that lets you write mini-programs that test your main program. You tell it "I expect this answer" and it checks if the code gives that answer. If it does not match, the test turns red and you know something is broken.

:::

:::eli15

JUnit 5 (Jupiter) is the standard Java testing framework. You write test methods annotated with @Test that call your code and use assert methods (assertEquals, assertTrue, assertThrows, etc.) to verify results. Test fixtures (@BeforeEach, @AfterEach) set up and tear down state. Parameterized tests let you run the same test logic with multiple data sets using @CsvSource or other parameter sources.

:::

:::eli20

### Basic Structure

```java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class CalcTest {
    @Test
    public void testAdd() {
        assertEquals(5, Calc.add(2, 3));
    }
}
```

### Key Assert Methods

| Method | Purpose |
|--------|---------|
| `assertTrue(boolean)` | Assert condition is true |
| `assertFalse(boolean)` | Assert condition is false |
| `assertEquals(expected, actual)` | Assert equality |
| `assertArrayEquals(expected[], actual[])` | Assert array equality |
| `assertNull(object)` | Assert null |
| `assertThrows(Exception.class, () -> {...})` | Assert exception thrown |
| `fail(message)` | Force test failure |

### Test Fixture

```java
private List<String> list;

@BeforeEach  // Called before EACH test method
public void setUp() {
    list = new ArrayList<>();
}

@AfterEach   // Called after EACH test method
public void tearDown() { ... }

@BeforeAll   // Called once before ALL tests (static)
@AfterAll    // Called once after ALL tests (static)
```

### Parameterized Tests (Data-Driven)

```java
@ParameterizedTest
@CsvSource({
    "1, 1, 2",
    "2, 3, 5",
    "100, 200, 300"
})
public void testAdd(int a, int b, int expected) {
    assertEquals(expected, Calc.add(a, b));
}
```

Parameter sources: `@ValueSource`, `@MethodSource`, `@CsvSource`, `@CsvFileSource`, `@ArgumentsSource`

### Testing Exceptions

```java
@Test
public void testDivByZero() {
    assertThrows(
        ArithmeticException.class,
        () -> Calc.div(2, 0)
    );
}
```

:::

## JUnit ↔ RIPR Mapping

:::eli10

The parts of JUnit line up with the RIPR steps: the setup code (@BeforeEach) gets you to the right place (Reach), the input values cause the bug to happen (Infect and Propagate), and the assert checks let you see if the answer is wrong (Reveal).

:::

:::eli15

JUnit features map directly to the RIPR model. The @BeforeEach fixture handles Reach by setting up the correct initial state. Parameter values and test inputs handle Infect and Propagate by triggering and surfacing errors. The assert methods handle Reveal by comparing actual output against expected results (the oracle).

:::

:::eli20

| JUnit Feature | RIPR Step |
|---------------|-----------|
| `@BeforeEach` (test fixture) | Reach |
| Parameters / input values | Infect & Propagate |
| `assert...()` methods | Reveal |

:::

## Espresso (Android UI Testing)

:::eli10

Espresso is a tool for testing Android apps automatically. It works in three steps: find a button or text box on screen, do something to it (like clicking or typing), and then check that the right thing happened (like a new screen appearing). It is like a robot finger that taps your phone and checks the result.

:::

:::eli15

Espresso is Android's white-box UI testing framework that follows a three-step recipe: Match (find a UI element using ViewMatchers like withId or withText), Act (perform an action using ViewActions like click or typeText), and Assert (verify the result using ViewAssertions like matches(isDisplayed)). It is faster and more reliable than UI Automator because it auto-syncs with the UI thread, but it can only test within a single app.

:::

:::eli20

### The Espresso Recipe: Match → Act → Assert

| Step | API | Examples |
|------|-----|----------|
| **Find element** | `ViewMatchers` | `withId(R.id.btn)`, `withText("Submit")` |
| **Perform action** | `ViewActions` | `click()`, `typeText("Hello")`, `scrollTo()` |
| **Assert result** | `ViewAssertions` | `matches(isDisplayed())`, `matches(withText("OK"))` |

### Espresso vs UI Automator

| | Espresso | UI Automator |
|-|----------|-------------|
| Box type | White-box | Black-box |
| Scope | Within your app | Between apps |
| Speed | Faster, more reliable | Slower |
| Sync | Auto-syncs with UI thread | Manual waits |
| Use case | Intra-app testing | System/cross-app testing |

:::
