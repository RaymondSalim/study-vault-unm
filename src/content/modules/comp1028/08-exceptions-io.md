---
title: "Exception Handling & File I/O"
order: 8
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "exceptions", "try-catch", "file-io", "checked-exceptions", "unchecked-exceptions"]
---

# Exception Handling & File I/O

## Exception Hierarchy

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

## Checked vs Unchecked

| | Checked | Unchecked (Runtime) |
|---|---------|---------------------|
| Compiler enforces | Yes -- must catch or declare | No |
| Keyword | `throws` in method signature | Not required |
| Cause | External factors (file, network) | Programming bugs |
| Examples | IOException, FileNotFoundException | NullPointerException, ArrayIndexOutOfBoundsException |
| Fix strategy | Handle gracefully | Fix the code |

## Try-Catch-Finally

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

## Throwing Exceptions

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

## Try-With-Resources (Java 7+)

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

---

## File I/O

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

---

## Exception Handling Patterns

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
