---
title: "Web Interfaces"
order: 7
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "web", "html", "forms", "crud"]
---

# Web Interfaces for Databases

## Overview

A web interface provides users with a browser-based way to interact with a database through forms and pages, performing CRUD operations (Create, Read, Update, Delete).

## HTML Forms

Forms collect user input and send it to a server for processing.

### Basic Form Structure

```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <input type="submit" value="Submit">
</form>
```

### Form Attributes

| Attribute | Purpose | Values |
|-----------|---------|--------|
| `action` | URL to send data to | `/students/add` |
| `method` | HTTP method | `GET` or `POST` |
| `enctype` | Encoding type | `application/x-www-form-urlencoded` (default), `multipart/form-data` (files) |

### GET vs POST

| Feature | GET | POST |
|---------|-----|------|
| Data location | URL query string | Request body |
| Visibility | Visible in URL | Hidden from URL |
| Length limit | ~2048 chars | No practical limit |
| Caching | Can be cached | Not cached |
| Use for | Search/filter/read | Create/update/delete |
| Bookmarkable | Yes | No |
| Security | Less secure | More secure (but not encrypted without HTTPS) |

### Input Types

| Type | Purpose | Example |
|------|---------|---------|
| `text` | Single-line text | Name, title |
| `email` | Email (with validation) | user@example.com |
| `password` | Hidden text | Login password |
| `number` | Numeric input | Age, quantity |
| `date` | Date picker | Birth date |
| `textarea` | Multi-line text | Comments |
| `select` | Dropdown | Department choice |
| `radio` | Single choice from options | Gender |
| `checkbox` | Multiple choices | Interests |
| `hidden` | Invisible data | Record ID for updates |

### Example: Student Registration Form

```html
<form action="/students/register" method="POST">
    <label for="sid">Student ID:</label>
    <input type="text" id="sid" name="student_id" pattern="[0-9]{7}" required>

    <label for="fname">First Name:</label>
    <input type="text" id="fname" name="first_name" maxlength="50" required>

    <label for="lname">Last Name:</label>
    <input type="text" id="lname" name="last_name" maxlength="50" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="dept">Department:</label>
    <select id="dept" name="dept_id" required>
        <option value="">-- Select --</option>
        <option value="1">Computer Science</option>
        <option value="2">Mathematics</option>
        <option value="3">Engineering</option>
    </select>

    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" name="dob">

    <button type="submit">Register</button>
</form>
```

## CSS Basics for Forms

```css
/* Basic form styling */
form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
}

input, select, textarea {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input:focus, select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 3px rgba(0,123,255,0.3);
}

button[type="submit"] {
    margin-top: 16px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #0056b3;
}
```

## Connecting Forms to Database (Conceptual)

### CRUD Mapping

| CRUD Operation | HTTP Method | SQL | Form/Page |
|----------------|-------------|-----|-----------|
| **Create** | POST | INSERT | Registration form |
| **Read** | GET | SELECT | List/detail page |
| **Update** | POST/PUT | UPDATE | Edit form (pre-filled) |
| **Delete** | POST/DELETE | DELETE | Delete button/confirmation |

### Server-Side Processing Flow

```
User fills form → Browser sends HTTP request → Server receives data
→ Server validates input → Server executes SQL → Database responds
→ Server generates HTML response → Browser displays result
```

### Pseudocode: Handling a Registration

```
// Server-side handler for POST /students/register
function handleRegistration(request):
    // 1. Get form data
    student_id = request.form["student_id"]
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    email = request.form["email"]
    dept_id = request.form["dept_id"]

    // 2. Validate
    if not isValidID(student_id):
        return error("Invalid student ID")

    // 3. Execute SQL (using parameterised query!)
    sql = "INSERT INTO Student (StudentID, FirstName, LastName, Email, DeptID)
           VALUES (?, ?, ?, ?, ?)"
    execute(sql, [student_id, first_name, last_name, email, dept_id])

    // 4. Respond
    return redirect("/students/" + student_id)
```

### SQL Injection Prevention

**NEVER** concatenate user input directly into SQL:

```sql
-- DANGEROUS (SQL Injection vulnerable):
query = "SELECT * FROM Student WHERE StudentID = '" + user_input + "'"
-- If user_input = "'; DROP TABLE Student; --" → disaster!

-- SAFE (Parameterised query):
query = "SELECT * FROM Student WHERE StudentID = ?"
execute(query, [user_input])
```

| Approach | Security | Example |
|----------|----------|---------|
| String concatenation | VULNERABLE | `"... WHERE id='" + input + "'"` |
| Parameterised queries | SAFE | `"... WHERE id = ?"` with parameters |
| Stored procedures | SAFE | Pre-compiled SQL on server |

## Displaying Data in HTML Tables

```html
<table>
    <thead>
        <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <!-- Dynamically generated rows -->
        <tr>
            <td>1234567</td>
            <td>Alice Smith</td>
            <td>alice@uni.ac.uk</td>
            <td>
                <a href="/students/1234567/edit">Edit</a>
                <form action="/students/1234567/delete" method="POST" style="display:inline;">
                    <button type="submit" onclick="return confirm('Are you sure?')">Delete</button>
                </form>
            </td>
        </tr>
    </tbody>
</table>
```

## Form Validation

### Client-Side (HTML5)

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `required` | Must not be empty | `<input required>` |
| `minlength` / `maxlength` | Text length limits | `maxlength="50"` |
| `min` / `max` | Numeric range | `min="0" max="100"` |
| `pattern` | Regex pattern | `pattern="[A-Z]{4}[0-9]{4}"` |
| `type="email"` | Email format check | Built-in validation |

### Server-Side (Essential)

Client-side validation improves UX but can be bypassed. **Always validate on the server:**

1. Check required fields are present
2. Check data types (is the number really a number?)
3. Check constraints (is the ID unique? Does the FK exist?)
4. Sanitise input (escape special characters)

## Practice

<details>
<summary>Q1: Create an HTML form for updating a student's email. The form should include the student ID (hidden, already known) and the new email.</summary>

```html
<form action="/students/update-email" method="POST">
    <input type="hidden" name="student_id" value="1234567">

    <label for="new_email">New Email Address:</label>
    <input type="email" id="new_email" name="email"
           placeholder="new.email@uni.ac.uk" required>

    <button type="submit">Update Email</button>
</form>
```

Key points:
- Hidden field carries the student ID without showing it
- `type="email"` provides client-side format validation
- `required` ensures the field is not empty
- POST method because this modifies data

</details>

<details>
<summary>Q2: Explain why client-side validation alone is insufficient.</summary>

Client-side validation (HTML5 attributes, JavaScript) runs in the **user's browser**, which they fully control. An attacker can:

1. Disable JavaScript in their browser
2. Modify the HTML using developer tools
3. Send HTTP requests directly (e.g., using curl/Postman) bypassing the form entirely
4. Remove `required`, `pattern`, and other attributes

**Server-side validation is mandatory** because the server is the only trusted environment. Client-side validation is a courtesy for UX (immediate feedback), not a security measure.

</details>

<details>
<summary>Q3: What is SQL injection? Give an example and show how to prevent it.</summary>

**SQL Injection** is an attack where malicious SQL code is inserted through user input to manipulate the database.

**Vulnerable code:**
```
username = request.form["username"]
query = "SELECT * FROM Users WHERE username = '" + username + "'"
```

**Attack input:** `' OR '1'='1' --`

**Resulting query:**
```sql
SELECT * FROM Users WHERE username = '' OR '1'='1' --'
```
This returns ALL users because `'1'='1'` is always true.

**Prevention — parameterised queries:**
```
query = "SELECT * FROM Users WHERE username = ?"
execute(query, [username])
```

The database treats the parameter as a literal value, never as SQL code.

</details>
