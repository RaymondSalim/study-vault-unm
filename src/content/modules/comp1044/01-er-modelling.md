---
title: "Entity-Relationship Modelling"
order: 1
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "er-diagrams", "data-modelling"]
---

# Entity-Relationship Modelling

## Core Concepts

An **Entity-Relationship (ER) diagram** is a visual representation of the data model for a system. It shows entities, their attributes, and the relationships between them.

## Entities

An **entity** is a distinguishable "thing" in the real world that we want to store data about.

| Concept | Symbol | Example |
|---------|--------|---------|
| Strong Entity | Rectangle | `Student`, `Module` |
| Weak Entity | Double Rectangle | `Dependent` (relies on `Employee`) |

- Strong entities have their own primary key
- Weak entities depend on an owner entity for identification (partial key + owner's key)

## Attributes

| Attribute Type | Symbol | Example |
|---------------|--------|---------|
| Simple | Oval | `Name` |
| Composite | Oval with sub-ovals | `Address` -> Street, City, Postcode |
| Derived | Dashed oval | `Age` (derived from DOB) |
| Multivalued | Double oval | `PhoneNumbers` |
| Key (identifier) | Underlined oval | `StudentID` |

## Relationships

A **relationship** connects two or more entities. Represented as a diamond shape.

### Degree of Relationships

| Degree | Description | Example |
|--------|-------------|---------|
| Unary | Entity relates to itself | Employee `manages` Employee |
| Binary | Between two entities | Student `enrols` Module |
| Ternary | Between three entities | Supplier `supplies` Part to Project |

## Cardinality (Multiplicity)

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

## ER-to-Relational Mapping Rules

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

## Worked Example

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

## Practice

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
