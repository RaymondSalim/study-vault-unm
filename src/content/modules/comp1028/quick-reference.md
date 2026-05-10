---
title: "Quick Reference - Java Syntax Cheat Sheet"
order: 90
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "cheat-sheet", "reference", "syntax", "patterns"]
---

# Quick Reference - Java Syntax Cheat Sheet

## Program Structure

```java
import java.util.*;              // imports at top

public class ClassName {         // class name = file name
    // Fields
    private int field;

    // Constructor
    public ClassName(int field) {
        this.field = field;
    }

    // Methods
    public int getField() {
        return field;
    }

    // Main method (entry point)
    public static void main(String[] args) {
        ClassName obj = new ClassName(42);
    }
}
```

## Data Types Quick Reference

| Type | Literal Example | Wrapper Class |
|------|-----------------|---------------|
| `int` | `42`, `0xFF`, `0b1010` | `Integer` |
| `long` | `42L` | `Long` |
| `double` | `3.14`, `1.5e3` | `Double` |
| `float` | `3.14f` | `Float` |
| `boolean` | `true`, `false` | `Boolean` |
| `char` | `'A'`, `'\n'`, `'A'` | `Character` |
| `String` | `"Hello"` | (already object) |

## String Operations

| Operation | Code | Result |
|-----------|------|--------|
| Length | `s.length()` | int |
| Character at | `s.charAt(0)` | char |
| Substring | `s.substring(1, 4)` | String [1,4) |
| Find | `s.indexOf("lo")` | int (-1 if not found) |
| Replace | `s.replace("a", "b")` | new String |
| Split | `s.split(",")` | String[] |
| Trim | `s.trim()` | removes whitespace |
| Compare | `s.equals(t)` | boolean |
| Ignore case | `s.equalsIgnoreCase(t)` | boolean |
| Contains | `s.contains("hi")` | boolean |
| Starts/ends | `s.startsWith("He")` | boolean |
| To number | `Integer.parseInt(s)` | int |
| From number | `String.valueOf(42)` | "42" |
| Format | `String.format("%d", 42)` | "42" |

## Array Operations

```java
// Declare & create
int[] arr = new int[10];
int[] arr2 = {1, 2, 3, 4, 5};
int[][] grid = new int[3][4];

// Common operations
arr.length                          // size (field, not method!)
Arrays.sort(arr);                   // sort ascending
Arrays.toString(arr);               // "[1, 2, 3]"
Arrays.copyOf(arr, newLength);      // copy/resize
Arrays.fill(arr, 0);               // fill all
Arrays.equals(arr1, arr2);         // compare contents
```

## Collections Quick Reference

```java
// ArrayList
ArrayList<Type> list = new ArrayList<>();
list.add(item);           list.add(index, item);
list.get(index);          list.set(index, item);
list.remove(index);       list.remove(object);
list.size();              list.isEmpty();
list.contains(item);      list.indexOf(item);
Collections.sort(list);

// HashMap
HashMap<K, V> map = new HashMap<>();
map.put(key, value);      map.get(key);
map.getOrDefault(key, d); map.remove(key);
map.containsKey(key);     map.containsValue(val);
map.size();               map.isEmpty();
map.keySet();             map.values();
map.entrySet();

// HashSet
HashSet<Type> set = new HashSet<>();
set.add(item);            set.remove(item);
set.contains(item);       set.size();
```

## Control Flow Templates

```java
// Standard for
for (int i = 0; i < n; i++) { }

// For-each
for (Type item : collection) { }

// While
while (condition) { }

// Do-while
do { } while (condition);

// Ternary
result = condition ? valueTrue : valueFalse;

// Switch
switch (variable) {
    case VALUE: /* code */ break;
    default: /* code */
}
```

## Method Signatures

```java
// Instance method
public ReturnType methodName(ParamType param) { }

// Static method
public static ReturnType methodName(ParamType param) { }

// Void method
public void methodName() { }

// Varargs
public static int sum(int... numbers) { }
```

## OOP Templates

```java
// Basic class
public class MyClass {
    private Type field;
    public MyClass(Type field) { this.field = field; }
    public Type getField() { return field; }
    public void setField(Type field) { this.field = field; }
}

// Inheritance
public class Child extends Parent {
    public Child() { super(); }
    @Override public void method() { super.method(); }
}

// Interface implementation
public class MyClass implements Interface1, Interface2 {
    @Override public void method() { }
}

// Abstract class
public abstract class Base {
    public abstract void doSomething();
    public void concrete() { /* shared code */ }
}
```

## Exception Handling Templates

```java
// Basic try-catch
try {
    // risky code
} catch (SpecificException e) {
    // handle
} finally {
    // cleanup
}

// Try-with-resources
try (Resource r = new Resource()) {
    // use resource
} catch (Exception e) {
    // handle
}

// Throw
throw new IllegalArgumentException("message");

// Method that throws
public void method() throws IOException { }
```

## File I/O Templates

```java
// Read file
try (Scanner sc = new Scanner(new File("input.txt"))) {
    while (sc.hasNextLine()) {
        String line = sc.nextLine();
    }
}

// Write file
try (PrintWriter pw = new PrintWriter("output.txt")) {
    pw.println("text");
}

// Read with BufferedReader
try (BufferedReader br = new BufferedReader(new FileReader("f.txt"))) {
    String line;
    while ((line = br.readLine()) != null) { }
}
```

## Common Patterns

### Swap Two Variables

```java
int temp = a; a = b; b = temp;
```

### Find Min/Max in Array

```java
int max = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
}
```

### Count Frequency (HashMap)

```java
HashMap<String, Integer> freq = new HashMap<>();
for (String item : items) {
    freq.put(item, freq.getOrDefault(item, 0) + 1);
}
```

### Build String Efficiently

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < n; i++) {
    sb.append("item ").append(i).append("\n");
}
String result = sb.toString();
```

### Read All Integers from Scanner

```java
Scanner sc = new Scanner(System.in);
ArrayList<Integer> nums = new ArrayList<>();
while (sc.hasNextInt()) {
    nums.add(sc.nextInt());
}
```

### Convert Between Array and List

```java
// Array to List
String[] arr = {"a", "b", "c"};
List<String> list = new ArrayList<>(Arrays.asList(arr));

// List to Array
String[] arr2 = list.toArray(new String[0]);
```

## Formatting Output

```java
System.out.println("text");                  // with newline
System.out.print("text");                    // no newline
System.out.printf("Name: %s, Age: %d%n", name, age);

// Format specifiers
// %d   integer
// %f   floating point (%.2f for 2 decimal places)
// %s   string
// %c   character
// %b   boolean
// %n   newline (platform-independent)
// %10d right-align in 10 chars
// %-10s left-align in 10 chars
```

## Math Class

```java
Math.abs(-5)          // 5
Math.max(a, b)        // larger of two
Math.min(a, b)        // smaller of two
Math.pow(2, 10)       // 1024.0
Math.sqrt(16)         // 4.0
Math.random()         // [0.0, 1.0)
Math.round(3.7)       // 4 (long)
Math.ceil(3.2)        // 4.0
Math.floor(3.9)       // 3.0
Math.PI               // 3.14159...
```

## Type Conversions

```java
// String -> numbers
int i = Integer.parseInt("42");
double d = Double.parseDouble("3.14");

// Numbers -> String
String s = String.valueOf(42);
String s2 = Integer.toString(42);
String s3 = "" + 42;                  // concatenation trick

// char -> int (ASCII)
int ascii = (int) 'A';               // 65
char ch = (char) 65;                  // 'A'

// char -> digit
int digit = Character.getNumericValue('7');  // 7
int digit2 = '7' - '0';                     // 7
```
