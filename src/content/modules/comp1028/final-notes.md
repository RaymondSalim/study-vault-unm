---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: JAVA FUNDAMENTALS & OOP

### Primitive Types & Variables

| Type | Size | Range / Notes |
|------|------|---------------|
| `byte` | 8-bit | -128 to 127 |
| `short` | 16-bit | -32,768 to 32,767 |
| `int` | 32-bit | $-2^{31}$ to $2^{31}-1$ |
| `long` | 64-bit | $-2^{63}$ to $2^{63}-1$ (suffix `L`) |
| `float` | 32-bit | ~7 decimal digits (suffix `f`) |
| `double` | 64-bit | ~15 decimal digits |
| `char` | 16-bit | Unicode character |
| `boolean` | 1-bit | `true` / `false` |

**Defaults (fields only):** Numeric = 0, boolean = false, objects = null. **Local variables have NO default -- must initialise before use.**

**Casting:** Widening (int->double) = implicit. Narrowing (double->int) = explicit, **truncates** (not rounds): `(int) 9.99 = 9`

**Integer division trap:** `7/2 = 3` not 3.5. Fix: `(double)7/2 = 3.5`

---

### Operators & Control Flow

**Precedence (high to low):** `()` > unary (`++`,`--`,`!`) > `*`,`/`,`%` > `+`,`-` > relational > `==`,`!=` > `&&` > `||` > `?:` > assignment

**Short-circuit:** `&&` stops if first is false; `||` stops if first is true.

**Loops:**
- `for (init; condition; update) { }` -- known count
- `while (condition) { }` -- 0+ iterations
- `do { } while (condition);` -- 1+ iterations (always runs once)

**Loop control:** `break` = exit loop | `continue` = skip to next iteration | `break label` = exit outer loop

---

### Arrays

```java
int[] arr = new int[5];            // default 0s
int[] primes = {2, 3, 5, 7, 11};  // literal init
```

| Property | Detail |
|----------|--------|
| Fixed size | Cannot grow/shrink |
| Zero-indexed | First at index 0 |
| `.length` | **Field** (no parentheses!) |
| Bounds | `ArrayIndexOutOfBoundsException` |

**2D arrays:** `int[][] grid = new int[3][4];` Access: `grid[row][col]`

**Size accessors trap:** Array = `.length` (field) | String = `.length()` (method) | Collection = `.size()` (method)

---

### Methods

```java
public static int add(int a, int b) { return a + b; }
```

**Signature** = name + parameter types (NOT return type). **Overloading** = same name, different parameter lists.

**Pass-by-value (ALWAYS):**
- Primitives: copy of value. Changes inside method do NOT affect caller.
- Objects: copy of reference. Can modify object's state, but reassigning reference does NOT affect caller.

```java
void f(int x, int[] arr) {
    x = 99;          // caller's int unchanged
    arr[0] = 99;     // caller's array MODIFIED
    arr = new int[5]; // caller's reference unchanged
}
```

---

### OOP -- Classes & Encapsulation

**Class** = blueprint. **Object** = instance (`new`). **Memory:** Stack holds references/primitives; Heap holds objects.

**Constructors:** Same name as class, no return type. Can be overloaded. Default no-arg constructor only exists if you write NO constructors. `this(...)` chains to another constructor (must be first line).

**Encapsulation:** Private fields + public getters/setters. Protects invariants.

**`static`:** Belongs to class, not instance. Shared across all objects. Access via `ClassName.method()`. Cannot use `this` in static context.

---

### Inheritance & Polymorphism

```java
public class Dog extends Animal {
    public Dog(String name) { super(name); } // MUST call super first
}
```

| Rule | Detail |
|------|--------|
| Single inheritance | One parent class only |
| `super(args)` | Must be first line in subclass constructor |
| Implicit `super()` | Inserted if no explicit super call (fails if no no-arg parent constructor) |
| Constructor chain | Parent constructors run first (A->B->C) |
| `final class` | Cannot be extended |
| `final method` | Cannot be overridden |

**Method Overriding:** Same signature in subclass. Use `@Override`. Runtime polymorphism -- actual object type determines which method runs.

**Overriding vs Overloading:**

| | Overriding | Overloading |
|---|-----------|-------------|
| Signature | Same | Different params |
| Where | Subclass | Same class |
| Binding | Runtime (dynamic) | Compile-time (static) |
| `@Override` | Yes | No |

**`instanceof`:** `if (obj instanceof Dog)` -- checks runtime type.

**Abstract classes:** Cannot instantiate. Can have abstract + concrete methods. Subclass must implement all abstract methods.

---

### Interfaces & Collections

**Interface** = contract (what, not how). `implements` keyword. A class can implement multiple interfaces.

| Feature | Interface | Abstract Class |
|---------|-----------|----------------|
| Multiple inheritance | Yes | No |
| Constructors | No | Yes |
| Fields | `public static final` only | Any |
| Methods | Abstract + default (Java 8+) | Abstract + concrete |

**Collections Framework:**

| Interface | Implementation | Use |
|-----------|---------------|-----|
| `List` | `ArrayList` | Dynamic array, O(1) access by index |
| `List` | `LinkedList` | Fast insert/remove at ends |
| `Set` | `HashSet` | No duplicates, unordered |
| `Map` | `HashMap` | Key-value pairs |

```java
ArrayList<String> list = new ArrayList<>();
list.add("A"); list.get(0); list.size(); list.remove(0);

HashMap<String, Integer> map = new HashMap<>();
map.put("key", 42); map.get("key"); map.containsKey("key");
```

**Generics:** `<T>` enforces type safety at compile time. Cannot use primitives (use wrapper: `Integer`, `Double`).

**ArrayList.remove() trap:** `list.remove(1)` removes at INDEX 1. `list.remove(Integer.valueOf(1))` removes OBJECT with value 1.

---

## SIDE 2: RECURSION, ALGORITHMS & EXCEPTIONS

### Recursion

Every recursive method needs: (1) **Base case** -- stops recursion, (2) **Recursive case** -- breaks into smaller subproblem.

```java
int factorial(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorial(n - 1);   // recursive case
}
```

**Call stack:** Each call = new stack frame. Frames build up until base case, then unwind. Too deep = `StackOverflowError`.

**Trace example:** `factorial(4)` -> 4*factorial(3) -> 4*3*factorial(2) -> 4*3*2*factorial(1) -> 4*3*2*1 = 24

**Common recursive patterns:**
- Fibonacci: `fib(n) = fib(n-1) + fib(n-2)`, base: fib(0)=0, fib(1)=1
- Sum array: base = empty/single, recurse on rest
- Binary search: base = low > high, recurse on half

---

### Searching Algorithms

**Linear Search:** Check each element sequentially. O($n$). Works on unsorted.

```java
for (int i = 0; i < arr.length; i++)
    if (arr[i] == target) return i;
return -1;
```

**Binary Search:** Requires SORTED array. O($\log n$). Halves search space each step.

```java
int low = 0, high = arr.length - 1;
while (low <= high) {
    int mid = low + (high - low) / 2;  // avoids overflow
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
}
return -1;
```

---

### Sorting Algorithms

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| Bubble Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Insertion Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Selection Sort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No |
| Merge Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes |
| Quicksort | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No |

**Stable** = preserves relative order of equal elements.

**Bubble Sort:** Repeatedly swap adjacent out-of-order pairs. Best O(n) with early-exit flag.

**Insertion Sort:** Build sorted portion left-to-right, insert each element into correct position. Best for nearly-sorted data.

**Selection Sort:** Find minimum in unsorted portion, swap to front. Always $O(n^2)$.

**Merge Sort:** Divide array in half, recursively sort each half, merge sorted halves. Always $O(n \log n)$ but needs $O(n)$ extra space.

**Quicksort:** Pick pivot, partition (elements < pivot left, > pivot right), recurse on partitions. Worst case $O(n^2)$ with bad pivot choice; average $O(n \log n)$.

---

### Exception Handling

```
Throwable -> Error (don't catch) + Exception
Exception -> RuntimeException (unchecked) + Checked exceptions
```

| | Checked | Unchecked |
|---|---------|-----------|
| Compiler enforces | Yes (catch or declare) | No |
| Cause | External (file, network) | Programming bugs |
| Examples | IOException, FileNotFoundException | NullPointerException, ArrayIndexOutOfBounds |

```java
try {
    // risky code
} catch (FileNotFoundException e) {
    // handle specific
} catch (IOException e) {
    // handle broader
} finally {
    // ALWAYS runs (cleanup)
}
```

**try-with-resources:** `try (Scanner sc = new Scanner(file)) { }` -- auto-closes.

**Custom exception:** `class MyException extends Exception { }` (checked) or `extends RuntimeException` (unchecked).

**Throw:** `throw new IllegalArgumentException("msg");`

**Trap:** `finally` always executes, even after `return` in try/catch.

---

### File I/O

```java
// Reading
Scanner sc = new Scanner(new File("data.txt"));
while (sc.hasNextLine()) {
    String line = sc.nextLine();
}
sc.close();

// Writing
PrintWriter pw = new PrintWriter(new File("out.txt"));
pw.println("Hello");
pw.close();
```

---

### Key Traps Summary

| Trap | Correct |
|------|---------|
| `==` for Strings | Use `.equals()` for content comparison |
| Integer division | `7/2 = 3`. Cast to double first. |
| Array `.length` | Field (no `()`). String is `.length()`. Collection is `.size()`. |
| Uninitialized local | Compiler error. Must assign before use. |
| `null` reference | `NullPointerException` at runtime |
| Missing `break` in switch | Falls through to next case! |
| `super()` placement | Must be FIRST line in subclass constructor |
| `static` cannot use `this` | Static belongs to class, not instance |
| Post vs Pre increment | `y = x++` (y gets old x) vs `y = ++x` (y gets new x) |
| Integer cache | `==` works for -128 to 127 only. Use `.equals()` for Integer. |
