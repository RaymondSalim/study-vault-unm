---
title: "Authentication"
order: 4
moduleTitle: "COMP3028 - Computer Security"
tags: ["authentication", "passwords", "MFA", "biometrics", "Kerberos", "tokens"]
---

## Authentication Factors

:::eli10

Authentication means proving who you are. There are different ways to do it: something you know (like a password), something you have (like your phone), or something you are (like your fingerprint). Using two or more of these together (multi-factor authentication) is much safer than just one, because a thief would need to steal multiple different things.

:::

:::eli15

Authentication verifies a user's claimed identity using one or more factors from distinct categories: knowledge (passwords, PINs), possession (phone, hardware token), inherence (biometrics), behaviour (typing pattern), or location (GPS). Multi-factor authentication (MFA) requires factors from at least two different categories -- two passwords do not count as MFA since both are knowledge factors. The strength of MFA comes from requiring an attacker to compromise fundamentally different types of evidence simultaneously.

:::

:::eli20

| Factor | Type | Examples |
|--------|------|----------|
| Something you **know** | Knowledge | Password, PIN, security question |
| Something you **have** | Possession | Smart card, phone, hardware token |
| Something you **are** | Inherence | Fingerprint, face, iris |
| Something you **do** | Behaviour | Typing pattern, gait |
| Somewhere you **are** | Location | GPS, IP geolocation |

### Multi-Factor Authentication (MFA)

Requires **two or more** factors from **different categories**.

| Combination | Example | Strength |
|-------------|---------|----------|
| Know + Have | Password + SMS OTP | Medium (SMS interceptable) |
| Know + Have | Password + TOTP app | Good |
| Know + Are | Password + Fingerprint | Good |
| Have + Are | Smart card + PIN + Fingerprint | Strong |

> Two passwords = NOT MFA (same factor category).

:::

## Password-Based Authentication

:::eli10

Websites do not (or should not) store your actual password. Instead, they run it through a special scrambler (hash function) with a random "salt" and store the scrambled result. When you log in, they scramble your input the same way and check if it matches. If hackers steal the database, they only get scrambled versions that are very hard to reverse.

:::

:::eli15

Secure password authentication never stores passwords in plaintext. Instead, the system stores a salted hash: hash(salt || password). When a user logs in, the system hashes their input with the stored salt and compares. Purpose-built slow hashing algorithms (bcrypt, Argon2) are essential to resist brute-force attacks. Each user gets a unique random salt to prevent rainbow table attacks. Common password attacks include brute force, dictionary attacks, credential stuffing (reusing leaked passwords from other sites), and phishing. Defences include rate limiting, account lockout, checking against known breached password lists, and using FIDO2/WebAuthn for phishing resistance.

:::

:::eli20

### Secure Storage

```
stored = hash(salt || password)
verify: hash(salt || input) == stored?
```

| Practice | Reason |
|----------|--------|
| Use bcrypt/Argon2 | Slow by design, resists brute force |
| Unique salt per user | Defeats rainbow tables |
| Never store plaintext | Database breach = all passwords compromised |
| Minimum length (12+) | Entropy matters more than complexity rules |

### Password Attacks

| Attack | Method | Defence |
|--------|--------|---------|
| Brute force | Try all combinations | Rate limiting, lockout, slow hash |
| Dictionary | Try common passwords | Password policies, leaked-list checking |
| Rainbow table | Pre-computed hash lookup | Salt |
| Credential stuffing | Reuse leaked credentials | MFA, breach monitoring |
| Phishing | Social engineering | User education, FIDO2/WebAuthn |
| Shoulder surfing | Physical observation | Screen privacy |

:::

## One-Time Passwords (OTP)

:::eli10

A one-time password is a code that works only once or for a very short time (like 30 seconds). Your authenticator app generates these using a shared secret and the current time. Even if someone sees the code, it will be expired by the time they try to use it.

:::

:::eli15

One-time passwords add a second authentication factor without needing special hardware. HOTP (HMAC-based OTP) generates codes from a shared secret and an incrementing counter -- each code is valid until used. TOTP (Time-based OTP) is more common: it uses the current time divided into 30-second windows instead of a counter, so codes automatically expire. Both work by computing HMAC-SHA1 of the secret with the counter/time value, then truncating to 6 digits. TOTP is used by apps like Google Authenticator. The main risks are counter desynchronisation (HOTP) and clock skew (TOTP).

:::

:::eli20

### HOTP (HMAC-based)

$$\text{HOTP}(K, C) = \text{Truncate}(\text{HMAC-SHA1}(K, C)) \mod 10^d$$

Counter $C$ increments with each use. Synchronisation issues if out of sync.

### TOTP (Time-based)

$$\text{TOTP}(K, T) = \text{HOTP}(K, \lfloor T / \text{step} \rfloor)$$

Typically: step = 30 seconds, $d = 6$ digits.

| Property | HOTP | TOTP |
|----------|------|------|
| Based on | Counter | Time |
| Expires | Never (until used) | After time step |
| Sync issue | Counter mismatch | Clock skew |
| More common | Hardware tokens | Authenticator apps |

:::

## Kerberos

:::eli10

Kerberos is like getting a wristband at an amusement park. First you show your ID at the gate (authenticate once), and you get a special wristband (ticket). Then you can show the wristband to ride any ride (access any service) without showing your ID every time. The wristband expires at the end of the day so it cannot be stolen and used forever.

:::

:::eli15

Kerberos is a network authentication protocol that provides single sign-on (SSO). You authenticate once with the Key Distribution Centre (KDC) and receive a Ticket Granting Ticket (TGT). When you need to access a service, you present the TGT to get a service-specific ticket, which you then present to the service. All tickets are encrypted and time-limited. Kerberos provides mutual authentication (both client and server verify each other) and uses timestamps to prevent replay attacks. The KDC is a single point of failure. Known attacks include pass-the-ticket, Kerberoasting (cracking service tickets offline), golden tickets (forging TGTs), and silver tickets (forging service tickets).

:::

:::eli20

### Components

| Entity | Role |
|--------|------|
| Client (C) | User requesting access |
| Authentication Server (AS) | Verifies identity, issues TGT |
| Ticket Granting Server (TGS) | Issues service tickets |
| Service Server (SS) | Provides the actual service |
| KDC | Key Distribution Centre (AS + TGS) |

### Protocol Flow

```
1. C --> AS:  "I am Alice, I want TGT"
2. AS --> C:  {TGT}_{K_TGS}, {session key}_{K_C}
3. C --> TGS: TGT + authenticator, "I want access to SS"
4. TGS --> C: {Service ticket}_{K_SS}, {session key}_{K_session}
5. C --> SS:  Service ticket + authenticator
6. SS --> C:  {timestamp+1}_{K_session}  (mutual auth)
```

### Key Points

| Property | Detail |
|----------|--------|
| Single sign-on | Authenticate once, access multiple services |
| Mutual authentication | Both client and server verify each other |
| Ticket lifetime | Limited (typically 8-10 hours) |
| Weakness | KDC is single point of failure |
| Replay protection | Timestamps + authenticators |
| Keys | Each principal shares long-term key with KDC |

### Kerberos Attacks

| Attack | Method | Mitigation |
|--------|--------|------------|
| Pass-the-ticket | Steal TGT from memory | Protect memory, short ticket lifetimes |
| Kerberoasting | Request service ticket, crack offline | Strong service passwords |
| Golden ticket | Forge TGT with KDC master key | Protect KDC, rotate krbtgt password |
| Silver ticket | Forge service ticket with service key | Monitor for anomalous tickets |

:::

## Token-Based Authentication

:::eli10

After you log in to a website, it gives you a special token (stored in your browser) so it knows who you are without asking for your password on every page. Session cookies are like a coat check ticket -- the site keeps your info and you just show the ticket. JWTs are like a passport -- all your info is written inside the token itself, signed so nobody can forge it.

:::

:::eli15

Web applications use tokens to maintain authenticated state after login. Traditional session tokens (cookies) are opaque identifiers that reference server-stored session data -- easy to revoke by deleting server-side. JSON Web Tokens (JWTs) are self-contained: they embed the user's claims (identity, permissions, expiry) in a signed token that the server can verify without a database lookup. JWTs are stateless and scalable but harder to revoke (must wait for expiry or maintain a blacklist). JWTs have three Base64URL-encoded parts: header, payload, and signature (HMAC or RSA/ECDSA).

:::

:::eli20

### Session Tokens (Cookies)

| Property | Detail |
|----------|--------|
| Server stores | Session state |
| Client stores | Session ID (cookie) |
| Stateful | Server must maintain session store |
| Revocation | Easy (delete server-side) |

### JWT (JSON Web Token)

Structure: `header.payload.signature` (Base64URL encoded)

| Property | Detail |
|----------|--------|
| Self-contained | Claims embedded in token |
| Stateless | Server doesn't store sessions |
| Signature | HMAC or RSA/ECDSA |
| Revocation | Difficult (use short expiry + refresh tokens) |

| Claim | Meaning |
|-------|---------|
| `iss` | Issuer |
| `sub` | Subject (user) |
| `exp` | Expiration time |
| `iat` | Issued at |
| `aud` | Audience |

:::

## FIDO2 / WebAuthn

:::eli10

FIDO2 is a new way to log in without passwords at all. Your device (phone or security key) creates a unique key pair for each website. You unlock it with your fingerprint or face, and the device proves your identity using cryptography. Because the key is tied to the real website address, phishing sites cannot trick you -- your device simply will not respond to a fake site.

:::

:::eli15

FIDO2/WebAuthn is a modern authentication standard designed to eliminate phishing. It uses asymmetric cryptography: your device generates a unique key pair for each website, storing the private key securely on the device. Authentication involves the device signing a challenge from the server. The key is bound to the website's origin (domain), so phishing sites cannot request authentication -- the browser will not issue a challenge for the wrong domain. FIDO2 can be passwordless, using biometrics or a PIN just to unlock the local authenticator. It supports hardware security keys, platform authenticators (fingerprint readers, Face ID), and passkeys synced across devices.

:::

:::eli20

| Property | Detail |
|----------|--------|
| Phishing-resistant | Bound to origin (domain) |
| No shared secrets | Asymmetric key pair per site |
| Passwordless | Can replace passwords entirely |
| Authenticator | Hardware key, platform (fingerprint), etc. |

<details>
<summary><strong>Practice: Why is SMS-based 2FA weaker than TOTP?</strong></summary>

SMS vulnerabilities:
1. SIM swapping (social engineering the carrier)
2. SS7 protocol vulnerabilities (intercept SMS in transit)
3. Malware reading SMS on phone
4. SMS delivered in plaintext

TOTP advantages:
- Generated locally, never transmitted
- Based on shared secret + time
- Works offline
- No carrier dependency
</details>

<details>
<summary><strong>Practice: Explain why Kerberos uses timestamps</strong></summary>

Timestamps prevent **replay attacks**:
1. Authenticator includes current timestamp encrypted with session key
2. Server checks timestamp is within acceptable window (typically 5 minutes)
3. Server caches recent authenticators to detect duplicates within window
4. After the window, the timestamp is too old to replay

This requires clocks to be loosely synchronised (NTP).
</details>

:::
