---
title: "Design Patterns - Structural"
order: 4
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["design patterns", "structural", "Adapter", "Decorator", "Facade", "Composite", "Java"]
---

# Structural Design Patterns

Structural patterns deal with object composition, creating relationships between objects to form larger structures.

## Pattern Overview

| Pattern | Intent | When to use |
|---------|--------|-------------|
| **Adapter** | Convert one interface to another | Integrate incompatible interfaces |
| **Decorator** | Add behaviour dynamically | Extend functionality without subclassing |
| **Facade** | Simplify a complex subsystem | Provide a unified high-level interface |
| **Composite** | Treat individual and composite objects uniformly | Tree structures (files, UI) |

---

## Adapter

### UML Structure

| Class | Role |
|-------|------|
| `Target` (interface) | The interface the client expects |
| `Adaptee` | The existing class with incompatible interface |
| `Adapter` | Implements `Target`, wraps `Adaptee`, translates calls |
| `Client` | Uses `Target` interface |

### Implementation

```java
// Existing (incompatible) interface - Adaptee
public class LegacyPrinter {
    public void printDocument(String text, int copies) {
        System.out.println("Printing " + copies + " copies: " + text);
    }
}

// Target interface the client expects
public interface ModernPrinter {
    void print(String text);
}

// Adapter (Object Adapter - uses composition)
public class PrinterAdapter implements ModernPrinter {
    private LegacyPrinter legacyPrinter;

    public PrinterAdapter(LegacyPrinter legacyPrinter) {
        this.legacyPrinter = legacyPrinter;
    }

    @Override
    public void print(String text) {
        legacyPrinter.printDocument(text, 1); // Translates the call
    }
}

// Client code
public class DocumentManager {
    private ModernPrinter printer;

    public DocumentManager(ModernPrinter printer) {
        this.printer = printer;
    }

    public void printReport(String report) {
        printer.print(report); // Works with any ModernPrinter
    }
}

// Usage
LegacyPrinter legacy = new LegacyPrinter();
ModernPrinter adapted = new PrinterAdapter(legacy);
DocumentManager manager = new DocumentManager(adapted);
```

### Object Adapter vs Class Adapter

| Type | Mechanism | Java support |
|------|-----------|-------------|
| Object Adapter | Composition (wraps adaptee) | Yes (preferred) |
| Class Adapter | Multiple inheritance | No (Java has single inheritance) |

---

## Decorator

### UML Structure

| Class | Role |
|-------|------|
| `Component` (interface) | Common interface for wrapped and wrapper |
| `ConcreteComponent` | The base object to be decorated |
| `Decorator` (abstract) | Implements `Component`, holds reference to wrapped `Component` |
| `ConcreteDecoratorA/B` | Adds behaviour before/after delegating to wrapped object |

### Implementation

```java
// Component interface
public interface Coffee {
    String getDescription();
    double getCost();
}

// Concrete component (base)
public class SimpleCoffee implements Coffee {
    public String getDescription() { return "Simple coffee"; }
    public double getCost() { return 1.00; }
}

// Abstract decorator
public abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }

    public String getDescription() { return decoratedCoffee.getDescription(); }
    public double getCost() { return decoratedCoffee.getCost(); }
}

// Concrete decorators
public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) { super(coffee); }

    public String getDescription() {
        return decoratedCoffee.getDescription() + ", milk";
    }

    public double getCost() {
        return decoratedCoffee.getCost() + 0.50;
    }
}

public class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) { super(coffee); }

    public String getDescription() {
        return decoratedCoffee.getDescription() + ", sugar";
    }

    public double getCost() {
        return decoratedCoffee.getCost() + 0.25;
    }
}

public class WhipDecorator extends CoffeeDecorator {
    public WhipDecorator(Coffee coffee) { super(coffee); }

    public String getDescription() {
        return decoratedCoffee.getDescription() + ", whip";
    }

    public double getCost() {
        return decoratedCoffee.getCost() + 0.75;
    }
}

// Usage - decorators can be stacked
Coffee order = new WhipDecorator(
    new MilkDecorator(
        new SimpleCoffee()
    )
);
// Description: "Simple coffee, milk, whip"
// Cost: 1.00 + 0.50 + 0.75 = 2.25
```

### Decorator vs Inheritance

| Aspect | Decorator | Inheritance |
|--------|-----------|-------------|
| When | Runtime | Compile time |
| Combinations | Any mix of decorators | Class explosion (MilkSugarCoffee, MilkWhipCoffee...) |
| Principle | OCP (extend without modifying) | Creates tight coupling |
| Flexibility | High | Low |

### Java I/O as Decorator Example

```java
// java.io uses Decorator pattern extensively
InputStream input = new BufferedInputStream(      // Decorator
    new FileInputStream("data.txt")               // Concrete component
);

// DataInputStream decorates BufferedInputStream decorates FileInputStream
DataInputStream data = new DataInputStream(
    new BufferedInputStream(
        new FileInputStream("data.bin")
    )
);
```

---

## Facade

### UML Structure

| Class | Role |
|-------|------|
| `Facade` | Provides simplified interface to subsystem |
| `SubsystemClassA/B/C` | Complex classes that the facade wraps |
| `Client` | Interacts only with Facade |

### Implementation

```java
// Complex subsystem classes
public class VideoDecoder {
    public void decode(String filename) {
        System.out.println("Decoding video: " + filename);
    }
}

public class AudioDecoder {
    public void decode(String filename) {
        System.out.println("Decoding audio: " + filename);
    }
}

public class SubtitleLoader {
    public void load(String filename) {
        System.out.println("Loading subtitles: " + filename);
    }
}

public class VideoRenderer {
    public void render(int width, int height) {
        System.out.println("Rendering at " + width + "x" + height);
    }
}

// Facade - simplifies interaction
public class MediaPlayerFacade {
    private VideoDecoder videoDecoder;
    private AudioDecoder audioDecoder;
    private SubtitleLoader subtitleLoader;
    private VideoRenderer renderer;

    public MediaPlayerFacade() {
        this.videoDecoder = new VideoDecoder();
        this.audioDecoder = new AudioDecoder();
        this.subtitleLoader = new SubtitleLoader();
        this.renderer = new VideoRenderer();
    }

    // Simple interface for complex operations
    public void play(String filename) {
        videoDecoder.decode(filename);
        audioDecoder.decode(filename);
        subtitleLoader.load(filename);
        renderer.render(1920, 1080);
        System.out.println("Playing: " + filename);
    }
}

// Client only needs to know about the Facade
MediaPlayerFacade player = new MediaPlayerFacade();
player.play("movie.mp4");
```

---

## Composite

### UML Structure

| Class | Role |
|-------|------|
| `Component` (interface) | Common interface for leaf and composite |
| `Leaf` | Has no children, performs actual work |
| `Composite` | Contains children (leaves or other composites), delegates to them |

### Implementation

```java
// Component interface
public interface FileSystemItem {
    String getName();
    long getSize();
    void display(String indent);
}

// Leaf
public class File implements FileSystemItem {
    private String name;
    private long size;

    public File(String name, long size) {
        this.name = name;
        this.size = size;
    }

    public String getName() { return name; }
    public long getSize() { return size; }
    public void display(String indent) {
        System.out.println(indent + "- " + name + " (" + size + " bytes)");
    }
}

// Composite
public class Directory implements FileSystemItem {
    private String name;
    private List<FileSystemItem> children = new ArrayList<>();

    public Directory(String name) { this.name = name; }

    public void add(FileSystemItem item) { children.add(item); }
    public void remove(FileSystemItem item) { children.remove(item); }

    public String getName() { return name; }

    public long getSize() {
        return children.stream()
            .mapToLong(FileSystemItem::getSize)
            .sum(); // Recursively calculates total size
    }

    public void display(String indent) {
        System.out.println(indent + "+ " + name);
        for (FileSystemItem child : children) {
            child.display(indent + "  ");
        }
    }
}

// Usage - uniform treatment
Directory root = new Directory("root");
Directory src = new Directory("src");
src.add(new File("Main.java", 500));
src.add(new File("Utils.java", 300));
root.add(src);
root.add(new File("README.md", 100));
root.display(""); // Treats files and directories uniformly
root.getSize();   // Returns 900 (500 + 300 + 100)
```

---

<details>
<summary>Practice: Choose the pattern</summary>

1. Wrapping a third-party library to match your interface → **Adapter**
2. Adding scrollbars, borders, and shadows to a window at runtime → **Decorator**
3. Simplifying access to a complex email subsystem (SMTP, IMAP, auth) → **Facade**
4. Representing a menu with items and sub-menus uniformly → **Composite**
5. Making an old XML API work with your JSON-based system → **Adapter**
6. java.io.BufferedReader wrapping FileReader → **Decorator**

</details>

<details>
<summary>Practice: Decorator order matters?</summary>

Given decorators `EncryptionDecorator` and `CompressionDecorator` for a `DataWriter`:

```java
// Option A: Encrypt then Compress
DataWriter writerA = new CompressionDecorator(new EncryptionDecorator(new FileWriter()));

// Option B: Compress then Encrypt
DataWriter writerB = new EncryptionDecorator(new CompressionDecorator(new FileWriter()));
```

**Which is better for security?** Option B - compress first, then encrypt. Encrypted data doesn't compress well (appears random), so compressing after encryption is wasteful. Compressing first reduces size, then encryption secures it.

**Key insight:** The innermost decorator executes first on write operations.

</details>
