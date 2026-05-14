---
title: "Access Control"
order: 5
moduleTitle: "COMP3028 - Computer Security"
tags: ["DAC", "MAC", "RBAC", "Bell-LaPadula", "Biba", "access-control"]
---

## Access Control Overview

:::eli10

Access control is like having rules about who can go where in a building. A "subject" is a person (or program) who wants to do something. An "object" is the thing they want to access (like a file or room). Access rights say what they can do (read, write, enter). A reference monitor is like the security guard who checks if you are allowed in.

:::

:::eli15
Access control governs which subjects (users, processes) can perform which actions (read, write, execute) on which objects (files, databases, resources). It is the mechanism that enforces security policy after authentication has established who the user is. The reference monitor is the trusted component that intercepts all access requests and decides whether to allow or deny them based on the configured policy. Different access control models (DAC, MAC, RBAC, ABAC) offer different trade-offs between flexibility, security, and manageability.

:::

:::eli20
| Concept | Definition |
|---------|-----------|
| Subject | Entity requesting access (user, process) |
| Object | Resource being accessed (file, database) |
| Access right | Permission type (read, write, execute) |
| Policy | Rules governing who can access what |
| Reference monitor | Enforces access control decisions |

:::

## Access Control Models

:::eli10

There are different ways to set up the rules. In DAC, the owner of a file decides who can see it (like sharing a Google Doc). In MAC, a central authority assigns security labels and nobody can override them (like military classifications). In RBAC, you get permissions based on your job role (a doctor can see medical records, a receptionist cannot).

:::

:::eli15
The main access control models differ in who decides permissions and how flexible they are. Discretionary Access Control (DAC) lets resource owners set their own permissions -- flexible but vulnerable to users granting too much access. Mandatory Access Control (MAC) has a central authority assign immutable security labels -- very restrictive but used where security is paramount. Role-Based Access Control (RBAC) assigns permissions to roles rather than individuals, making it scalable for organisations. Attribute-Based Access Control (ABAC) evaluates dynamic rules based on attributes of the subject, object, and environment for fine-grained decisions.

:::

:::eli20
### Discretionary Access Control (DAC)

Owner of a resource decides who gets access.

| Property | Detail |
|----------|--------|
| Who sets policy | Resource owner |
| Flexibility | High |
| Example | Unix file permissions, Windows ACLs |
| Weakness | Vulnerable to Trojan horses (user grants too much) |

**Access Control Matrix:**

| | File1 | File2 | Printer |
|-|-------|-------|---------|
| Alice | read, write | read | print |
| Bob | read | read, write | -- |
| Charlie | -- | read | print |

Implemented as:
- **ACL** (Access Control List): column-wise (per object)
- **Capability list**: row-wise (per subject)

| | ACL | Capability |
|-|-----|-----------|
| Stores per | Object | Subject |
| Check access | Easy (look at object) | Need to search |
| Revocation | Easy (modify object's list) | Hard (find all copies) |
| Example | File system permissions | Capability-based OS |

### Mandatory Access Control (MAC)

System enforces policy based on security labels. Users cannot override.

| Property | Detail |
|----------|--------|
| Who sets policy | System administrator / central authority |
| Labels | Security clearance (subjects) and classification (objects) |
| Override | Users cannot change labels or grant access |
| Example | Military systems, SELinux |

### Role-Based Access Control (RBAC)

Permissions assigned to **roles**, users assigned to roles.

```
Users --> Roles --> Permissions
Alice --> Doctor --> read_records, write_prescriptions
Bob   --> Nurse  --> read_records
```

| Property | Detail |
|----------|--------|
| Principle | Least privilege via role assignment |
| Scalability | Manage permissions for roles, not individual users |
| Separation of duties | Conflicting roles cannot be assigned to same user |
| Hierarchy | Senior roles inherit junior role permissions |

### Attribute-Based Access Control (ABAC)

Decisions based on attributes of subject, object, environment, and action.

```
IF subject.role == "doctor" AND
   object.department == subject.department AND
   environment.time IN working_hours
THEN allow read
```

| RBAC | ABAC |
|------|------|
| Coarse-grained | Fine-grained |
| Simpler to manage | More flexible |
| Pre-defined roles | Dynamic evaluation |
| Scalability issues with many roles | Handles complex policies |

:::

## Security Models

:::eli10

Security models are strict math rules about how information can flow. Bell-LaPadula protects secrets: you cannot read above your level or write below it (so secrets do not leak down). Biba protects accuracy: you cannot read below your level or write above it (so untrustworthy data does not corrupt important files). They are opposites of each other and hard to use at the same time.

:::

:::eli15
Formal security models provide mathematical guarantees about information flow. Bell-LaPadula (BLP) protects confidentiality with "no read up, no write down" -- information can only flow from low to high classification, preventing leaks. Biba protects integrity with "no read down, no write up" -- preventing low-integrity data from corrupting high-integrity resources. These two models are duals of each other and conflict when applied simultaneously (BLP's "no write down" contradicts Biba's "no write up"). The Chinese Wall model is dynamic -- your access rights change based on what you have previously accessed, preventing conflicts of interest.

:::

:::eli20
### Bell-LaPadula (BLP) -- Confidentiality

**Goal**: Prevent unauthorised disclosure (protect secrecy).

Security levels: Top Secret > Secret > Confidential > Unclassified

| Rule | Name | Meaning |
|------|------|---------|
| No Read Up | Simple Security (ss-property) | Subject cannot **read** objects at higher level |
| No Write Down | *-property (star property) | Subject cannot **write** to objects at lower level |

> "Read down, write up" -- prevents information flowing from high to low.

**Intuition**: A top-secret user writing to an unclassified file would leak secrets downward.

### Biba Model -- Integrity

**Goal**: Prevent unauthorised modification (protect integrity).

Integrity levels: High > Medium > Low

| Rule | Name | Meaning |
|------|------|---------|
| No Read Down | Simple Integrity | Subject cannot **read** objects at lower integrity |
| No Write Up | Integrity *-property | Subject cannot **write** to objects at higher integrity |

> "Read up, write down" -- prevents low-integrity data corrupting high-integrity data.

**Intuition**: A program with low integrity writing to a high-integrity system file would corrupt it.

### BLP vs Biba Comparison

| | Bell-LaPadula | Biba |
|-|---------------|------|
| Protects | Confidentiality | Integrity |
| Read rule | No read up | No read down |
| Write rule | No write down | No write up |
| Information flow | From low to high only | From high to low only |
| Dual of | -- | Bell-LaPadula |
| Problem | Ignores integrity | Ignores confidentiality |

### Chinese Wall Model (Brewer-Nash)

Prevents conflicts of interest. Once you access data from one company in a conflict class, you cannot access data from competing companies.

| Property | Detail |
|----------|--------|
| Dynamic | Access rights change based on history |
| Use case | Consulting firms, financial analysts |
| Conflict class | Group of competing organisations |

:::

## Unix File Permissions

:::eli10

In Linux/Unix, every file has permissions for three groups: the owner, the group, and everyone else. Each group can have read (r), write (w), and execute (x) permission. The number 750 means the owner can do everything (7=rwx), the group can read and run but not change it (5=r-x), and everyone else cannot do anything (0=---).

:::

:::eli15
Unix file permissions use a three-tier model: owner, group, and others, each with read/write/execute bits. These are expressed in octal (e.g., 755 = rwxr-xr-x). Special permission bits add extra functionality: SUID makes a program run as the file owner (used by passwd to write to /etc/shadow), SGID makes it run as the group owner or inherits group on new files in directories, and the Sticky bit on a directory means only a file's owner can delete it (used on /tmp). This is a classic DAC implementation where the file owner controls access.

:::

:::eli20
```
rwxr-x--- = 750
```

| Position | Meaning | Octal |
|----------|---------|-------|
| `rwx` | Owner: read, write, execute | 7 |
| `r-x` | Group: read, execute | 5 |
| `---` | Others: nothing | 0 |

Special bits: SUID (4), SGID (2), Sticky (1)

| Bit | Effect on file | Effect on directory |
|-----|---------------|-------------------|
| SUID | Execute as file owner | -- |
| SGID | Execute as group owner | New files inherit group |
| Sticky | -- | Only owner can delete files |

<details>
<summary><strong>Practice: BLP scenario -- which operations are allowed?</strong></summary>

Subject clearance: SECRET. Object classifications:

| Object | Classification | Read? | Write? |
|--------|---------------|-------|--------|
| Doc A | UNCLASSIFIED | Yes (read down) | No (no write down) |
| Doc B | SECRET | Yes (same level) | Yes (same level) |
| Doc C | TOP SECRET | No (no read up) | Yes (write up) |

</details>

<details>
<summary><strong>Practice: Why are BLP and Biba incompatible?</strong></summary>

- BLP says "no write down" (to protect confidentiality)
- Biba says "no write up" (to protect integrity)
- Together: a subject at level $L$ can only write to objects at exactly level $L$
- Similarly for reading: can only read at exactly own level
- This is too restrictive for practical systems

Real systems typically prioritise one (e.g., military: BLP) or use different mechanisms for each (e.g., SELinux type enforcement).
</details>

:::
