---
title: "Exception Handling & File I/O"
order: 8
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "exceptions", "try-catch", "file-io", "checked-exceptions", "unchecked-exceptions"]
---

# Exception Handling & File I/O

## Exception Hierarchy

:::eli10

Exceptions are like alarm bells that go off when something goes wrong. Some alarms you must plan for (checked exceptions -- like "what if the file doesn't exist?"). Others are bugs in your code (unchecked -- like dividing by zero or using something that's null). Java forces you to handle the predictable alarms.

:::

:::eli15

Java's exception system has two main categories. Checked exceptions (like `IOException`) represent predictable failures the compiler forces you to handle with try-catch or declare with `throws`. Unchecked exceptions (like `NullPointerException`) are programming errors that should be fixed in code rather than caught. The hierarchy: Throwable splits into Error (unrecoverable, don't catch) and Exception (recoverable), with RuntimeException being the unchecked branch.

:::

:::eli20

```
Throwable
├── Error (unrecoverable -- don't catch these)
│     ├── OutOfMemoryError
│     ├── StackOverflowError
│     └── ...
└── Exception
      ├── RuntimeException (unchecked)
      │     ├── NullPointerException
      │     ├── ArrayIndexOutOfBoundsException
      │     ├── ArithmeticException
      │     ├── ClassCastException
      │     ├── IllegalArgumentException
      │     └── NumberFormatException
      └── Checked Exceptions
            ├── IOException
            ├── FileNotFoundException
            ├── SQLException
            └── ...
```

:::

## Checked vs Unchecked

:::eli10

Checked exceptions are like mandatory safety gear -- Java makes you deal with them or your code won't even compile. Unchecked exceptions are like tripping over your own shoelaces -- Java doesn't force you to plan for them because you should just tie your shoes properly (fix your code).

:::

:::eli15

Checked exceptions must be either caught in a try-catch or declared in the method's `throws` clause -- the compiler enforces this. They represent external failures (file missing, network down). Unchecked exceptions extend RuntimeException and are not enforced by the compiler -- they represent programming bugs (null reference, bad array index) that should be prevented through proper code rather than caught.

:::

:::eli20

| | Checked | Unchecked (Runtime) |
|---|---------|---------------------|
| Compiler enforces | Yes -- must catch or declare | No |
| Keyword | `throws` in method signature | Not required |
| Cause | External factors (file, network) | Programming bugs |
| Examples | IOException, FileNotFoundException | NullPointerException, ArrayIndexOutOfBoundsException |
| Fix strategy | Handle gracefully | Fix the code |

:::

## Try-Catch-Finally

:::eli10

`try` is like saying "I'm going to try something that might go wrong." `catch` is like having a plan B ready. `finally` is like cleanup that always happens no matter what -- like putting your toys away whether you finished playing or not.

:::

:::eli15

The try-catch-finally structure handles exceptions gracefully. Code that might throw goes in `try`. If an exception occurs, execution jumps to the matching `catch` block (more specific exceptions must be caught first). The `finally` block always executes -- even after a return statement -- making it ideal for cleanup. Java 7+ supports multi-catch (`catch (A | B e)`) for handling multiple exception types the same way.

:::

:::eli20

```java
try {
    // Code that might throw an exception
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // Handle specific exception
    System.out.println("Cannot divide by zero: " + e.getMessage());
} catch (Exception e) {
    // Handle broader exception (catch more specific first!)
    System.out.println("Error: " + e.getMessage());
} finally {
    // ALWAYS executes (cleanup code)
    System.out.println("Done");
}
```

### Key Rules

| Rule | Detail |
|------|--------|
| Order matters | Catch more specific exceptions first |
| `finally` always runs | Even after `return` in try/catch |
| Multi-catch (Java 7+) | `catch (IOException | SQLException e)` |
| Catch once | Each exception caught by at most one block |

### Common Exception Methods

```java
e.getMessage()          // "/ by zero"
e.toString()            // "java.lang.ArithmeticException: / by zero"
e.printStackTrace()     // full stack trace to stderr
e.getClass().getName()  // "java.lang.ArithmeticException"
```

:::

## Throwing Exceptions

:::eli10

You can also create your own alarms. If someone tries to set an age to -5, that's obviously wrong, so you "throw" an exception that says "Hey! That's not a valid age!" This stops the bad operation from happening.

:::

:::eli15

You can throw exceptions explicitly using the `throw` keyword to reject invalid inputs or states. For unchecked exceptions (like `IllegalArgumentException`), no declaration is needed. For checked exceptions, the method must declare them with `throws`. You can also create custom exception classes by extending `Exception` (checked) or `RuntimeException` (unchecked) to represent domain-specific error conditions.

:::

:::eli20

```java
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Invalid age: " + age);
    }
    this.age = age;
}
```

### Declaring Checked Exceptions

```java
public void readFile(String path) throws IOException {
    // If this method might throw IOException,
    // it must declare it (or catch it internally)
    BufferedReader reader = new BufferedReader(new FileReader(path));
    // ...
}
```

### Custom Exceptions

```java
public class InsufficientFundsException extends Exception {
    private double amount;

    public InsufficientFundsException(double amount) {
        super("Insufficient funds. Short by: " + amount);
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }
}

// Usage
public void withdraw(double amount) throws InsufficientFundsException {
    if (amount > balance) {
        throw new InsufficientFundsException(amount - balance);
    }
    balance -= amount;
}
```

:::

## Try-With-Resources (Java 7+)

:::eli10

Try-with-resources is like borrowing a library book and having it automatically returned when you're done reading, even if you fall asleep mid-chapter. Java automatically closes files and connections for you so you don't have to remember to do it yourself.

:::

:::eli15

Try-with-resources automatically closes any resource that implements `AutoCloseable` when the try block finishes (whether normally or by exception). This eliminates the need for manual cleanup in `finally` blocks. Resources are declared in parentheses after `try` and are guaranteed to be closed in reverse declaration order. This prevents resource leaks (unclosed files, connections, etc.).

:::

:::eli20

Automatically closes resources that implement `AutoCloseable`:

```java
try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.out.println("Error reading file: " + e.getMessage());
}
// reader is automatically closed here, even if exception thrown
```

> Preferred over manual `finally { reader.close(); }`.

:::

---

## File I/O

:::eli10

File I/O is how your program reads from and writes to files on the computer. Reading a file is like opening a book and reading it line by line. Writing to a file is like writing in a notebook -- you can start fresh or add to what's already there (append mode).

:::

:::eli15

Java provides several classes for file I/O. For reading: `Scanner` is simple and versatile (handles various data types); `BufferedReader` is more efficient for line-by-line text reading. For writing: `PrintWriter` offers familiar print/println methods; `BufferedWriter` is efficient for large writes. Always use try-with-resources to ensure files are closed. Files that don't exist will throw `FileNotFoundException` when reading, or be created when writing.

:::

:::eli20

### Reading a File

#### Using Scanner

```java
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

try (Scanner scanner = new Scanner(new File("input.txt"))) {
    while (scanner.hasNextLine()) {
        String line = scanner.nextLine();
        System.out.println(line);
    }
} catch (FileNotFoundException e) {
    System.out.println("File not found: " + e.getMessage());
}
```

#### Using BufferedReader

```java
import java.io.*;

try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

### Writing to a File

#### Using PrintWriter

```java
import java.io.PrintWriter;
import java.io.FileNotFoundException;

try (PrintWriter writer = new PrintWriter("output.txt")) {
    writer.println("First line");
    writer.println("Second line");
    writer.printf("Value: %d%n", 42);
} catch (FileNotFoundException e) {
    e.printStackTrace();
}
```

#### Using BufferedWriter

```java
import java.io.*;

try (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
    bw.write("Hello, World!");
    bw.newLine();
    bw.write("Second line");
} catch (IOException e) {
    e.printStackTrace();
}
```

#### Appending to a File

```java
// Second argument 'true' enables append mode
try (BufferedWriter bw = new BufferedWriter(new FileWriter("log.txt", true))) {
    bw.write("New log entry");
    bw.newLine();
} catch (IOException e) {
    e.printStackTrace();
}
```

### Reading CSV Data

```java
try (Scanner scanner = new Scanner(new File("data.csv"))) {
    while (scanner.hasNextLine()) {
        String line = scanner.nextLine();
        String[] parts = line.split(",");
        String name = parts[0].trim();
        int age = Integer.parseInt(parts[1].trim());
        double score = Double.parseDouble(parts[2].trim());
        // Process...
    }
} catch (FileNotFoundException e) {
    e.printStackTrace();
}
```

### File Class Utilities

```java
import java.io.File;

File f = new File("data.txt");
f.exists();           // true/false
f.isFile();           // is it a file?
f.isDirectory();      // is it a directory?
f.getName();          // "data.txt"
f.getAbsolutePath();  // full path
f.length();           // size in bytes
f.delete();           // delete the file
f.mkdir();            // create directory
```

:::

---

## Exception Handling Patterns

:::eli10

Common patterns include: safely converting text to numbers (catching the error if it's not a valid number), asking the user to try again when they type something wrong, and checking input before using it so exceptions don't happen in the first place.

:::

:::eli15

Useful exception patterns include: safe parsing (catch `NumberFormatException` and return a default), retry loops (keep asking for input until valid), and input validation with `Scanner.hasNextInt()` to check before reading. The general principle is to prevent exceptions where possible (validate input), and catch them gracefully where prevention isn't feasible (file/network operations).

:::

:::eli20

### Parse with Validation

```java
public static int safeParseInt(String s) {
    try {
        return Integer.parseInt(s);
    } catch (NumberFormatException e) {
        return 0;   // or throw custom exception
    }
}
```

### Retry Pattern

```java
public static String readInput(Scanner scanner, String prompt) {
    while (true) {
        System.out.print(prompt);
        try {
            return scanner.nextLine();
        } catch (Exception e) {
            System.out.println("Invalid input. Try again.");
        }
    }
}
```

### Input Validation with Scanner

```java
Scanner scanner = new Scanner(System.in);
int number = 0;
boolean valid = false;

while (!valid) {
    System.out.print("Enter a number: ");
    if (scanner.hasNextInt()) {
        number = scanner.nextInt();
        valid = true;
    } else {
        System.out.println("That's not a number!");
        scanner.next(); // consume invalid input
    }
}
```

---

<details>
<summary><strong>Practice: What does this print?</strong></summary>

```java
try {
    System.out.println("A");
    int x = 10 / 0;
    System.out.println("B");
} catch (ArithmeticException e) {
    System.out.println("C");
} finally {
    System.out.println("D");
}
System.out.println("E");
```

**Answer:** `A C D E`
- "A" prints
- Exception thrown, "B" skipped
- Caught by catch block, "C" prints
- Finally always runs, "D" prints
- Execution continues normally, "E" prints

</details>

<details>
<summary><strong>Practice: Does this compile?</strong></summary>

```java
public void process() {
    FileReader fr = new FileReader("test.txt");  // throws FileNotFoundException
}
```

**Answer:** No. `FileReader` constructor throws `FileNotFoundException` (checked). Must either:
1. Wrap in try-catch, or
2. Add `throws FileNotFoundException` (or `throws IOException`) to the method signature.

</details>

<details>
<summary><strong>Practice: What is wrong with this exception handling?</strong></summary>

```java
try {
    riskyOperation();
} catch (Exception e) {
    // ignore
} catch (IOException e) {
    System.out.println("IO error");
}
```

**Answer:** Compile error. `IOException` is a subclass of `Exception`, so it is already caught by the first catch block. The second catch is unreachable. Fix: put `IOException` catch first, or remove the `Exception` catch.

</details>

:::
