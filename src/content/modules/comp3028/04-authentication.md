---
title: "Authentication"
order: 4
moduleTitle: "COMP3028 - Computer Security"
tags: ["authentication", "passwords", "MFA", "biometrics", "Kerberos", "tokens"]
---

## Authentication Factors

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

## Password-Based Authentication

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

## One-Time Passwords (OTP)

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

## Kerberos

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

## Token-Based Authentication

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

## FIDO2 / WebAuthn

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
