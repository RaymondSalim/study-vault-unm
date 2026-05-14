---
title: "Testing and Build Tools"
order: 7
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["JUnit", "testing", "unit test", "mocking", "Maven", "Gradle", "CI", "TDD", "Java"]
---

# Testing and Build Tools

## Unit Testing with JUnit 5

:::eli10

Unit testing means writing small automatic checks for each piece of your code. It is like a robot assistant that runs through a checklist every time you change something: "Does addition still work? Does it handle zero correctly? Does it catch errors?" JUnit 5 is the tool Java programmers use to write these checks. If a test fails, you know exactly what broke and where.

:::

:::eli15

Unit testing verifies individual components (methods, classes) in isolation. JUnit 5 is Java's standard testing framework. Tests follow the Arrange-Act-Assert (AAA) pattern: set up the test state, execute the action under test, and verify the expected outcome. Key features include lifecycle methods (@BeforeEach, @AfterEach), parameterised tests (running the same test with multiple inputs), nested test classes (logical grouping), and various assertion methods. Tests serve as both verification and documentation.

:::

:::eli20

### Test Structure (AAA Pattern)

```java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    private Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator(); // Arrange (common setup)
    }

    @Test
    @DisplayName("Addition of two positive numbers")
    void testAddition() {
        // Arrange (specific)
        int a = 3, b = 5;

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(8, result, "3 + 5 should equal 8");
    }

    @Test
    void testDivisionByZero() {
        assertThrows(ArithmeticException.class, () -> {
            calculator.divide(10, 0);
        });
    }

    @AfterEach
    void tearDown() {
        // Cleanup if needed
    }
}
```

### JUnit 5 Annotations

| Annotation | Purpose |
|------------|---------|
| `@Test` | Marks a test method |
| `@BeforeEach` | Runs before each test method |
| `@AfterEach` | Runs after each test method |
| `@BeforeAll` | Runs once before all tests (static) |
| `@AfterAll` | Runs once after all tests (static) |
| `@DisplayName("...")` | Human-readable test name |
| `@Disabled("reason")` | Skip this test |
| `@Nested` | Group tests in inner class |
| `@Tag("slow")` | Categorise tests |
| `@ParameterizedTest` | Run with multiple inputs |
| `@RepeatedTest(n)` | Run test n times |

### Assertions

| Assertion | Description |
|-----------|-------------|
| `assertEquals(expected, actual)` | Values are equal |
| `assertNotEquals(a, b)` | Values are not equal |
| `assertTrue(condition)` | Condition is true |
| `assertFalse(condition)` | Condition is false |
| `assertNull(obj)` | Object is null |
| `assertNotNull(obj)` | Object is not null |
| `assertThrows(Exception.class, () -> ...)` | Exception is thrown |
| `assertDoesNotThrow(() -> ...)` | No exception thrown |
| `assertAll(...)` | All assertions pass (grouped) |
| `assertTimeout(Duration.ofSeconds(1), () -> ...)` | Completes within time |
| `assertSame(a, b)` | Same reference (==) |
| `assertArrayEquals(a, b)` | Arrays are equal |

### Parameterized Tests

```java
@ParameterizedTest
@ValueSource(ints = {1, 3, 5, 7, 9})
void testIsOdd(int number) {
    assertTrue(calculator.isOdd(number));
}

@ParameterizedTest
@CsvSource({
    "1, 1, 2",
    "0, 0, 0",
    "-1, 1, 0",
    "100, 200, 300"
})
void testAdd(int a, int b, int expected) {
    assertEquals(expected, calculator.add(a, b));
}

@ParameterizedTest
@MethodSource("provideStringsForIsBlank")
void testIsBlank(String input, boolean expected) {
    assertEquals(expected, StringUtils.isBlank(input));
}

static Stream<Arguments> provideStringsForIsBlank() {
    return Stream.of(
        Arguments.of("", true),
        Arguments.of("  ", true),
        Arguments.of("hello", false),
        Arguments.of(null, true)
    );
}
```

### Nested Tests

```java
@DisplayName("Stack")
class StackTest {

    private Stack<Integer> stack;

    @BeforeEach
    void setUp() { stack = new Stack<>(); }

    @Nested
    @DisplayName("when empty")
    class WhenEmpty {
        @Test
        void isEmpty() { assertTrue(stack.isEmpty()); }

        @Test
        void throwsOnPop() {
            assertThrows(EmptyStackException.class, () -> stack.pop());
        }
    }

    @Nested
    @DisplayName("after pushing elements")
    class AfterPushing {
        @BeforeEach
        void pushElements() {
            stack.push(1);
            stack.push(2);
        }

        @Test
        void isNotEmpty() { assertFalse(stack.isEmpty()); }

        @Test
        void popsLastElement() { assertEquals(2, stack.pop()); }
    }
}
```

:::

---

## Mocking with Mockito

:::eli10

Mocking is creating fake versions of things your code depends on (like a fake database or a fake email service) so you can test just your code in isolation. It is like testing a play where some actors are replaced by stand-ins who just say their lines -- you are only checking whether the main actor does their part right.

:::

:::eli15

Mocking isolates the unit under test from its dependencies (databases, APIs, email services). Mockito creates fake objects that simulate dependency behaviour without real side effects. You define what the mock should return (`when(...).thenReturn(...)`) and verify that expected interactions occurred (`verify(mock).method(...)`). Mock external services and slow/non-deterministic operations; do not mock the class under test, simple value objects, or data structures.

:::

:::eli20

### Purpose

Mock external dependencies so you test only the unit under test.

```java
import static org.mockito.Mockito.*;

class OrderServiceTest {

    @Test
    void testPlaceOrder() {
        // Create mock
        PaymentGateway mockGateway = mock(PaymentGateway.class);
        EmailService mockEmail = mock(EmailService.class);

        // Define behaviour
        when(mockGateway.charge(anyDouble())).thenReturn(true);

        // Inject mocks
        OrderService service = new OrderService(mockGateway, mockEmail);

        // Act
        boolean result = service.placeOrder(new Order(99.99));

        // Assert
        assertTrue(result);

        // Verify interactions
        verify(mockGateway).charge(99.99);
        verify(mockEmail).sendConfirmation(any(Order.class));
        verify(mockEmail, never()).sendFailureNotice(any());
    }
}
```

### Key Mockito Methods

| Method | Purpose |
|--------|---------|
| `mock(Class.class)` | Create a mock object |
| `when(...).thenReturn(...)` | Stub return value |
| `when(...).thenThrow(...)` | Stub to throw exception |
| `verify(mock).method(...)` | Verify method was called |
| `verify(mock, times(n))` | Verify called exactly n times |
| `verify(mock, never())` | Verify never called |
| `any()`, `anyInt()`, `anyString()` | Argument matchers |
| `doNothing().when(mock).voidMethod()` | Stub void methods |

### When to Mock

| Mock | Don't Mock |
|------|-----------|
| External services (DB, API) | The class under test |
| Slow operations | Simple value objects |
| Non-deterministic (time, random) | Data structures (List, Map) |
| Dependencies with side effects | Pure functions |

:::

---

## Test-Driven Development (TDD)

:::eli10

TDD is writing the test BEFORE the code. First you write a test that fails (because the code does not exist yet). Then you write the minimum code to make it pass. Then you clean up the code. Repeat. It is like drawing the shape first and then colouring inside the lines.

:::

:::eli15

Test-Driven Development follows a strict Red-Green-Refactor cycle: write a failing test first (Red), write the minimum code to pass (Green), then improve the code without changing behaviour (Refactor). This ensures 100% test coverage by construction, drives simple design (only write code needed to pass tests), and provides confidence for future changes. TDD works best for well-understood logic; it is less suited for exploratory or UI-heavy work.

:::

:::eli20

| Step | Colour | Action |
|------|--------|--------|
| 1 | Red | Write a failing test |
| 2 | Green | Write minimum code to pass |
| 3 | Refactor | Improve code, keep tests green |

```
Red → Green → Refactor → Red → Green → Refactor → ...
```

:::

---

## Build Tools

:::eli10

Build tools automate the boring stuff: downloading libraries, compiling code, running tests, and packaging your application. Maven and Gradle are the two big ones for Java. Maven uses XML configuration and follows strict conventions. Gradle uses code (Groovy/Kotlin) and is faster but harder to learn. Both save you from doing all those steps by hand.

:::

:::eli15

Build tools automate compilation, dependency management, testing, and packaging. Maven and Gradle are Java's primary build tools. Maven uses XML configuration (pom.xml) and favours convention over configuration with a fixed lifecycle (validate, compile, test, package, verify, install, deploy). Gradle uses Groovy/Kotlin DSL (build.gradle), offers more flexibility, and is faster through incremental builds and caching. Both download dependencies from central repositories and integrate with CI pipelines.

:::

:::eli20

### Maven vs Gradle

| Aspect | Maven | Gradle |
|--------|-------|--------|
| Config file | `pom.xml` (XML) | `build.gradle` (Groovy/Kotlin) |
| Convention | Over configuration | Flexible |
| Build speed | Slower | Faster (incremental, caching) |
| Dependency management | Central repository | Central + custom repos |
| Learning curve | Moderate | Steeper |
| Extensibility | Plugins (XML) | Custom tasks (code) |

### Maven `pom.xml` (key parts)

```xml
<project>
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### Maven Lifecycle

| Phase | Action |
|-------|--------|
| `validate` | Check project is correct |
| `compile` | Compile source code |
| `test` | Run unit tests |
| `package` | Package into JAR/WAR |
| `verify` | Run integration tests |
| `install` | Install to local repo |
| `deploy` | Deploy to remote repo |

### Gradle `build.gradle`

```groovy
plugins {
    id 'java'
    id 'application'
}

group = 'com.example'
version = '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.0'
    testImplementation 'org.mockito:mockito-core:5.5.0'
}

application {
    mainClass = 'com.example.Main'
}

test {
    useJUnitPlatform()
}
```

### Common Commands

| Task | Maven | Gradle |
|------|-------|--------|
| Compile | `mvn compile` | `gradle compileJava` |
| Test | `mvn test` | `gradle test` |
| Package | `mvn package` | `gradle build` |
| Clean | `mvn clean` | `gradle clean` |
| Run | `mvn exec:java` | `gradle run` |
| Dependencies | `mvn dependency:tree` | `gradle dependencies` |

:::

---

## Continuous Integration (CI)

:::eli10

Continuous Integration means that every time someone saves their code, an automatic system checks it: compiles it, runs all the tests, and reports whether everything is okay. It is like having a teacher who marks your homework the instant you hand it in. If something breaks, everyone knows immediately and can fix it before things get worse.

:::

:::eli15

Continuous Integration (CI) automates building, testing, and analysing code on every commit or pull request. A CI pipeline typically: triggers on push/PR, checks out code, compiles, runs unit and integration tests, performs static analysis and coverage checks, and packages the artifact. Best practices: commit frequently (at least daily), keep builds fast (under 10 minutes), fix broken builds immediately, automate everything, and maintain test coverage above 80%. CI catches integration issues early and provides rapid feedback.

:::

:::eli20

### CI Pipeline Steps

| Step | Purpose |
|------|---------|
| 1. Trigger | Push/PR triggers pipeline |
| 2. Checkout | Clone source code |
| 3. Build | Compile the project |
| 4. Test | Run unit + integration tests |
| 5. Analyse | Static analysis, code coverage |
| 6. Package | Create deployable artifact |
| 7. Deploy (CD) | Deploy to staging/production |

### CI Best Practices

- Commit frequently (at least daily)
- Keep builds fast (< 10 minutes)
- Fix broken builds immediately
- Automate everything (build, test, deploy)
- Maintain test coverage > 80%

:::

---

<details>
<summary>Practice: Write a JUnit test</summary>

Given this class:
```java
public class StringUtils {
    public String reverse(String input) {
        if (input == null) throw new IllegalArgumentException("Input cannot be null");
        return new StringBuilder(input).reverse().toString();
    }
}
```

Write tests:
```java
class StringUtilsTest {
    private StringUtils utils;

    @BeforeEach
    void setUp() { utils = new StringUtils(); }

    @Test
    void testReverseNormalString() {
        assertEquals("olleh", utils.reverse("hello"));
    }

    @Test
    void testReverseEmptyString() {
        assertEquals("", utils.reverse(""));
    }

    @Test
    void testReversePalindrome() {
        assertEquals("racecar", utils.reverse("racecar"));
    }

    @Test
    void testReverseNull() {
        assertThrows(IllegalArgumentException.class, () -> utils.reverse(null));
    }

    @ParameterizedTest
    @CsvSource({"hello, olleh", "abc, cba", "a, a"})
    void testReverseParameterized(String input, String expected) {
        assertEquals(expected, utils.reverse(input));
    }
}
```

</details>

<details>
<summary>Practice: What should you mock?</summary>

For a `UserRegistrationService` that:
- Validates input (business logic)
- Saves to database (external)
- Sends welcome email (external)
- Logs the registration (external)

**Mock:** Database repository, email service, logger
**Don't mock:** The validation logic, the service itself, simple DTOs

</details>
