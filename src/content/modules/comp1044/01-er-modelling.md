---
title: "Entity-Relationship Modelling"
order: 1
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "er-diagrams", "data-modelling"]
---

# Entity-Relationship Modelling

## Core Concepts

:::eli10

An ER diagram is like a picture that shows what things (entities) a system needs to remember, what details (attributes) about each thing, and how things are connected (relationships). Think of it like drawing a family tree, but for data in a computer system.

:::

:::eli15

An Entity-Relationship diagram visually models the data structure of a system before building the actual database. It identifies the main "things" you need to store (entities like Student, Module), the details about each (attributes like Name, ID), and how they connect (relationships like "enrols in"). ER diagrams are designed first, then translated into database tables using specific mapping rules.

:::

:::eli20

An **Entity-Relationship (ER) diagram** is a visual representation of the data model for a system. It shows entities, their attributes, and the relationships between them.

:::

## Entities

:::eli10

An entity is any "thing" you want your computer to remember. A student is an entity, a book is an entity, a pet is an entity. Strong entities can stand on their own (they have their own unique ID), while weak entities need a "parent" to be identified (like a room number that only makes sense if you also know which building).

:::

:::eli15

Entities are distinguishable objects in the real world that we store data about. Strong entities have their own primary key and exist independently. Weak entities depend on another "owner" entity for identification -- they have a partial key (discriminator) that only becomes unique when combined with the owner's key. For example, a Room entity might need its Building's ID plus its room number to be uniquely identified.

:::

:::eli20

An **entity** is a distinguishable "thing" in the real world that we want to store data about.

| Concept | Symbol | Example |
|---------|--------|---------|
| Strong Entity | Rectangle | `Student`, `Module` |
| Weak Entity | Double Rectangle | `Dependent` (relies on `Employee`) |

- Strong entities have their own primary key
- Weak entities depend on an owner entity for identification (partial key + owner's key)

:::

## Attributes

:::eli10

Attributes are the details about an entity. For a student, attributes might be their name, age, and phone number. Some attributes are special: a key attribute (like a student ID) uniquely identifies each entity, a derived attribute (like age) can be calculated from other data (date of birth), and a multivalued attribute (like phone numbers) can have more than one value.

:::

:::eli15

Attributes describe the properties of entities. They come in several types: simple (single value like Name), composite (sub-parts like Address broken into Street/City/Postcode), derived (computed from other attributes like Age from DOB), multivalued (can have multiple values like PhoneNumbers), and key attributes (uniquely identify the entity, shown underlined). Understanding attribute types is important because they map differently to relational tables.

:::

:::eli20

| Attribute Type | Symbol | Example |
|---------------|--------|---------|
| Simple | Oval | `Name` |
| Composite | Oval with sub-ovals | `Address` -> Street, City, Postcode |
| Derived | Dashed oval | `Age` (derived from DOB) |
| Multivalued | Double oval | `PhoneNumbers` |
| Key (identifier) | Underlined oval | `StudentID` |

:::

## Relationships

:::eli10

A relationship is a connection between entities. "A student enrols in a module" is a relationship between Student and Module. Relationships can connect two entities, or even connect an entity to itself (like "an employee manages another employee").

:::

:::eli15

Relationships connect entities and are represented as diamond shapes in ER diagrams. They have a degree (how many entities are involved): unary (self-referencing, like manages), binary (two entities, most common), or ternary (three entities). The relationship itself can also have attributes -- for example, an "enrols" relationship might have a Grade attribute.

:::

:::eli20

A **relationship** connects two or more entities. Represented as a diamond shape.

### Degree of Relationships

| Degree | Description | Example |
|--------|-------------|---------|
| Unary | Entity relates to itself | Employee `manages` Employee |
| Binary | Between two entities | Student `enrols` Module |
| Ternary | Between three entities | Supplier `supplies` Part to Project |

:::

## Cardinality (Multiplicity)

:::eli10

Cardinality tells you "how many?" For example, one teacher can teach many classes (one-to-many), but each class has only one teacher. One student can take many modules and one module has many students (many-to-many). Participation tells you whether every entity must be in the relationship (mandatory) or can skip it (optional).

:::

:::eli15

Cardinality constraints specify the number of relationship instances an entity can participate in. One-to-one (1:1) means each entity on both sides links to at most one on the other. One-to-many (1:M) means one entity links to many on the other side. Many-to-many (M:N) means multiple on both sides. Participation can be total (mandatory -- every entity must participate, shown with a double line) or partial (optional -- shown with a single line).

:::

:::eli20

Cardinality specifies how many instances of one entity can be associated with instances of another.

| Cardinality | Notation | Meaning |
|-------------|----------|---------|
| One-to-One (1:1) | 1..1 | One student has one library card |
| One-to-Many (1:M) | 1..* | One department has many employees |
| Many-to-Many (M:N) | *..* | Many students enrol in many modules |

### Participation Constraints

| Type | Line Style | Meaning |
|------|-----------|---------|
| Total (mandatory) | Double line | Every entity must participate |
| Partial (optional) | Single line | Entity may or may not participate |

**Example:** Every employee **must** work in a department (total), but a department **may** have a manager (partial).

:::

## ER-to-Relational Mapping Rules

:::eli10

Once you draw your ER diagram, you need to turn it into actual database tables. There are simple rules for this: each entity becomes a table, one-to-many relationships put a foreign key in the "many" side table, and many-to-many relationships need a new "link" table in the middle.

:::

:::eli15

The ER-to-relational mapping converts your conceptual model into actual tables. Strong entities become tables directly. Weak entities include their owner's key. For relationships: 1:1 puts a foreign key in either table, 1:M puts the FK on the "many" side, and M:N creates a junction table containing both primary keys. Multivalued attributes become separate tables, composite attributes are flattened, and derived attributes are typically not stored.

:::

:::eli20

| ER Construct | Relational Mapping |
|--------------|--------------------|
| Strong entity | Table with all simple attributes |
| Weak entity | Table with partial key + owner's PK as FK |
| 1:1 relationship | FK in either table (prefer total participation side) |
| 1:M relationship | FK in the "many" side table |
| M:N relationship | New junction/link table with both PKs |
| Multivalued attribute | Separate table with FK back to entity |
| Composite attribute | Flatten into simple attributes |
| Derived attribute | Usually not stored (computed) |

:::

## Worked Example

:::eli10

Here is a simple example: a university has Students, Modules, and Lecturers. Students can enrol in many modules, and each module is taught by one lecturer. We turn this into four tables: Student, Module, Lecturer, and an Enrolment table that links students to modules.

:::

:::eli15

This example demonstrates the full process: identify entities (Student, Module, Lecturer), determine relationships (Student enrols Module is M:N with a Grade attribute; Lecturer teaches Module is 1:M), then map to tables. The M:N relationship creates a junction table (Enrolment) with composite primary key. The 1:M relationship adds a foreign key (LecturerID) to the Module table.

:::

:::eli20

**Scenario:** A university system where Students enrol in Modules, each taught by one Lecturer.

Entities:
- **Student** (StudentID, Name, Email)
- **Module** (ModuleCode, Title, Credits)
- **Lecturer** (StaffID, Name, Office)

Relationships:
- Student **enrols** Module (M:N) — with attribute `Grade`
- Lecturer **teaches** Module (1:M)

Resulting tables:

```sql
CREATE TABLE Student (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100)
);

CREATE TABLE Module (
    ModuleCode CHAR(8) PRIMARY KEY,
    Title VARCHAR(100),
    Credits INT,
    LecturerID INT REFERENCES Lecturer(StaffID)
);

CREATE TABLE Lecturer (
    StaffID INT PRIMARY KEY,
    Name VARCHAR(100),
    Office VARCHAR(20)
);

CREATE TABLE Enrolment (
    StudentID INT REFERENCES Student(StudentID),
    ModuleCode CHAR(8) REFERENCES Module(ModuleCode),
    Grade CHAR(2),
    PRIMARY KEY (StudentID, ModuleCode)
);
```

:::

## Practice

:::eli10

Try these questions to test your understanding of ER modelling. Think about what entities you need, how they connect, and what the cardinality is.

:::

:::eli15

These practice problems ask you to design ER models from real-world scenarios, identify cardinalities, and convert ER constructs to relational tables. When approaching these, first identify entities, then determine relationships and their cardinalities, then think about participation constraints.

:::

:::eli20

<details>
<summary>Q1: A hospital has Doctors and Patients. Each patient is assigned to one doctor, but a doctor can have many patients. Each patient has one or more appointments. Draw the ER diagram and identify cardinalities.</summary>

**Entities:** Doctor, Patient, Appointment

**Relationships:**
- Doctor **treats** Patient (1:M) — one doctor, many patients
- Patient **has** Appointment (1:M) — one patient, many appointments

**Participation:**
- Every patient must have a doctor (total on Patient side)
- Every appointment must belong to a patient (total on Appointment side)
- Appointment is a weak entity if it has no independent identifier

</details>

<details>
<summary>Q2: Convert a M:N relationship "Student takes Exam" (with attributes Date and Score) into relational tables.</summary>

```sql
CREATE TABLE Student (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(100)
);

CREATE TABLE Exam (
    ExamID INT PRIMARY KEY,
    Subject VARCHAR(100)
);

CREATE TABLE StudentExam (
    StudentID INT REFERENCES Student(StudentID),
    ExamID INT REFERENCES Exam(ExamID),
    ExamDate DATE,
    Score INT,
    PRIMARY KEY (StudentID, ExamID)
);
```

The M:N relationship becomes a **junction table** (StudentExam) containing the primary keys of both entities plus any relationship attributes.

</details>

<details>
<summary>Q3: What is the difference between a weak entity and a strong entity?</summary>

| Feature | Strong Entity | Weak Entity |
|---------|--------------|-------------|
| Key | Has own primary key | Has only a partial key (discriminator) |
| Existence | Independent | Depends on owner entity |
| Notation | Single rectangle | Double rectangle |
| Relationship | Normal | Identifying relationship (double diamond) |

**Example:** `Room` is weak — identified by `RoomNumber` + `BuildingID` (from owner `Building`).

</details>

:::
