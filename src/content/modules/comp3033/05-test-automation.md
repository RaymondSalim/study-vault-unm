---
title: "Test Automation & JUnit"
order: 5
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["test-automation", "junit", "ripr", "parameterized-tests", "test-fixture", "espresso"]
---

## Test Automation

**Why automate?**
- Reduces cost of testing and human error
- Makes regression testing easier (runs on every code change)
- Frees developers to focus on test design (creative work)
- Integrates into CI/CD pipeline

## The RIPR Model

Four conditions needed for a test to be **effective** (reveal failures):

| Step | Name | Meaning | Test Component |
|------|------|---------|----------------|
| 1 | **Reach** | Execution reaches the faulty location | Prefix values |
| 2 | **Infect** | Fault causes incorrect internal state | Test case values |
| 3 | **Propagate** | Error propagates to observable output | Postfix values |
| 4 | **Reveal** | Tester can observe the incorrect output | Expected results (oracle) |

## Components of a Test Case

| Component | Purpose | RIPR Role |
|-----------|---------|-----------|
| **Prefix values** | Put system into initial state | Reach faulty location |
| **Test case values** | Input values for the test | Infect (trigger error) |
| **Postfix values** | Inputs after test values (verification + exit) | Propagate error |
| **Expected results** | The oracle — correct output | Reveal failure |

## JUnit 5 (Jupiter)

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

## JUnit ↔ RIPR Mapping

| JUnit Feature | RIPR Step |
|---------------|-----------|
| `@BeforeEach` (test fixture) | Reach |
| Parameters / input values | Infect & Propagate |
| `assert...()` methods | Reveal |

## Espresso (Android UI Testing)

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
