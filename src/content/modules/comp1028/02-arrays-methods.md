---
title: "Arrays & Methods"
order: 2
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "arrays", "methods", "parameters", "scope"]
---

# Arrays & Methods

## Arrays

### Declaration & Initialisation

```java
// Declaration
int[] numbers;              // preferred style
int numbers2[];             // valid but discouraged

// Initialisation
numbers = new int[5];                    // all elements default to 0
int[] primes = {2, 3, 5, 7, 11};        // literal initialisation
int[] zeros = new int[]{0, 0, 0};       // explicit new with values
```

### Key Properties

| Property | Detail |
|----------|--------|
| Fixed size | Cannot grow/shrink after creation |
| Zero-indexed | First element at index 0 |
| `.length` | Field (not method!) giving array size |
| Bounds checking | `ArrayIndexOutOfBoundsException` at runtime |
| Default values | `0` for numeric, `false` for boolean, `null` for objects |

### Common Operations

```java
int[] arr = {10, 20, 30, 40, 50};

// Access
int first = arr[0];         // 10
int last = arr[arr.length - 1]; // 50

// Modify
arr[2] = 99;                // arr is now {10, 20, 99, 40, 50}

// Iterate
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

// Enhanced for-each (read-only traversal)
for (int val : arr) {
    System.out.println(val);
}

// Copy
int[] copy = Arrays.copyOf(arr, arr.length);
int[] partial = Arrays.copyOfRange(arr, 1, 4); // indices [1, 4)
```

### 2D Arrays

```java
int[][] matrix = new int[3][4];     // 3 rows, 4 columns
int[][] grid = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Access
int val = grid[1][2];   // row 1, col 2 -> 6

// Iterate
for (int row = 0; row < grid.length; row++) {
    for (int col = 0; col < grid[row].length; col++) {
        System.out.print(grid[row][col] + " ");
    }
    System.out.println();
}

// Jagged arrays (rows of different lengths)
int[][] jagged = new int[3][];
jagged[0] = new int[2];
jagged[1] = new int[5];
jagged[2] = new int[3];
```

### Useful `Arrays` Utility Methods

```java
import java.util.Arrays;

Arrays.sort(arr);                    // in-place sort (ascending)
Arrays.toString(arr);                // "[10, 20, 30, 40, 50]"
Arrays.deepToString(matrix);         // for 2D arrays
Arrays.fill(arr, 0);                 // fill all with 0
Arrays.equals(arr1, arr2);           // compare contents
int idx = Arrays.binarySearch(arr, 30); // array MUST be sorted first
```

---

## Methods

### Method Anatomy

```java
accessModifier returnType methodName(parameterList) {
    // body
    return value; // omit if void
}
```

```java
public static int add(int a, int b) {
    return a + b;
}
```

### Method Signature

The **signature** = method name + parameter types (in order). Return type is NOT part of the signature.

### Method Overloading

Same name, different parameter lists (number, type, or order):

```java
public int max(int a, int b) { return a > b ? a : b; }
public double max(double a, double b) { return a > b ? a : b; }
public int max(int a, int b, int c) { return max(max(a, b), c); }
```

> Cannot overload by return type alone.

### Parameter Passing

Java is **always pass-by-value**:

| What's passed | Behaviour |
|---------------|-----------|
| Primitive | Copy of the value. Changes inside method do NOT affect caller. |
| Object reference | Copy of the reference. You can modify the object's state, but reassigning the reference does NOT affect caller. |

```java
public static void tryChange(int x, int[] arr) {
    x = 999;           // does NOT affect caller's variable
    arr[0] = 999;      // DOES affect caller's array (same object)
    arr = new int[5];  // does NOT affect caller's reference
}
```

<details>
<summary><strong>Practice: What does this print?</strong></summary>

```java
int num = 10;
int[] data = {1, 2, 3};
tryChange(num, data);
System.out.println(num);       // ?
System.out.println(data[0]);   // ?
```

**Answer:**
- `num` is still `10` (primitive, passed by value)
- `data[0]` is `999` (array object modified via copied reference)

</details>

### Varargs (Variable Arguments)

```java
public static int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}

sum(1, 2, 3);       // 6
sum(10, 20);         // 30
sum();               // 0
```

> Varargs must be the last parameter. Only one varargs per method.

---

## Scope

| Scope Level | Visibility |
|-------------|-----------|
| **Class/field** | Accessible throughout the class (depending on access modifier) |
| **Method** | Accessible only within that method |
| **Block** | Accessible only within `{}` where declared (e.g., loop variable) |

```java
public class Example {
    int field = 1;              // class scope

    public void method() {
        int local = 2;          // method scope

        for (int i = 0; i < 5; i++) {  // block scope
            int temp = i * 2;   // block scope
        }
        // i and temp NOT accessible here
    }
}
```

### Shadowing

A local variable can shadow a field with the same name:

```java
public class Counter {
    int count = 0;

    public void setCount(int count) {
        this.count = count;   // 'this.count' = field, 'count' = parameter
    }
}
```

---

## Common Array Patterns

### Find Maximum

```java
public static int findMax(int[] arr) {
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}
```

### Reverse Array

```java
public static void reverse(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}
```

### Count Occurrences

```java
public static int count(int[] arr, int target) {
    int c = 0;
    for (int val : arr) {
        if (val == target) c++;
    }
    return c;
}
```

---

<details>
<summary><strong>Practice: Trace through this code</strong></summary>

```java
public static void mystery(int[] a) {
    for (int i = 0; i < a.length / 2; i++) {
        int temp = a[i];
        a[i] = a[a.length - 1 - i];
        a[a.length - 1 - i] = temp;
    }
}

int[] data = {1, 2, 3, 4, 5};
mystery(data);
System.out.println(Arrays.toString(data));
```

**Answer:** `[5, 4, 3, 2, 1]` -- it reverses the array.

</details>

<details>
<summary><strong>Practice: Does this compile?</strong></summary>

```java
public static int getValue() {
    int x;
    if (Math.random() > 0.5) {
        x = 1;
    }
    return x;
}
```

**Answer:** No. The compiler sees that `x` might not be initialised if the condition is false. Fix: add an `else { x = 0; }` or initialise `int x = 0;`.

</details>
