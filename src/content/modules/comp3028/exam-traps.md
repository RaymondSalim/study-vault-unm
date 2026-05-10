---
title: "Exam Traps"
order: 91
moduleTitle: "COMP3028 - Computer Security"
tags: ["exam", "common-mistakes", "traps", "pitfalls"]
---

## Common Exam Traps

### 1. Cryptography Confusion

| Trap | Correct |
|------|---------|
| "AES key is 64 bits" | AES keys are 128, 192, or 256 bits. DES is 56 bits. |
| "DES block size is 128 bits" | DES block = 64 bits. AES block = 128 bits. |
| "ECB is secure for small messages" | ECB reveals patterns in ANY repeated blocks. Never use. |
| "CBC doesn't need an IV" | CBC requires a random, unpredictable IV per message |
| "Nonce reuse is just bad practice" | Nonce reuse in CTR/GCM is **catastrophic** (reveals XOR of plaintexts) |

### 2. Asymmetric Crypto Traps

| Trap | Correct |
|------|---------|
| "Sign with public key" | Sign with **private** key. Verify with public key. |
| "Encrypt with private key" | Encrypt with recipient's **public** key. Decrypt with private. |
| "RSA is based on discrete log" | RSA is based on **integer factorisation**. DH uses discrete log. |
| "Larger RSA key = always better" | Diminishing returns; consider ECC for efficiency |
| "DH provides authentication" | DH provides key exchange only. Vulnerable to MITM without auth. |
| "Public key is derived from private" | True, but private key cannot be derived from public (that's the security). |

### 3. Hash Function Traps

| Trap | Correct |
|------|---------|
| "SHA-256 output is 128 bits" | SHA-256 output = 256 bits (it's in the name!) |
| "Collision resistance = pre-image resistance" | They are different properties. Collision is easier to break ($2^{n/2}$). |
| "MD5 is fine for passwords" | MD5 is broken AND too fast. Use bcrypt/Argon2. |
| "Hash provides authentication" | Hash provides integrity only. MAC provides integrity + authentication. |
| "Salt must be secret" | Salt prevents rainbow tables but is stored alongside hash. Not secret. |

### 4. Authentication Traps

| Trap | Correct |
|------|---------|
| "Two passwords = MFA" | MFA requires factors from **different categories** |
| "Kerberos encrypts all traffic" | Kerberos authenticates; application must encrypt separately |
| "TGT lasts forever" | TGTs have limited lifetime (typically 8-10 hours) |
| "Biometrics are perfect" | Can be spoofed, cannot be changed if compromised |
| "TOTP codes can be reused" | Each TOTP is valid for one time step only (~30 sec) |

### 5. Access Control Traps

| Trap | Correct |
|------|---------|
| "Bell-LaPadula: no read down" | BLP: No Read **Up**, No Write **Down** (protects confidentiality) |
| "Biba: no write down" | Biba: No Read **Down**, No Write **Up** (protects integrity) |
| "DAC and MAC are the same" | DAC = owner decides. MAC = system enforces mandatory rules. |
| "RBAC is the same as groups" | RBAC adds hierarchy, separation of duties, role constraints |
| "ACLs and capabilities are equivalent" | Theoretically yes, but differ in revocation and delegation ease |

### 6. BLP/Biba Direction Mnemonics

| Model | Mnemonic |
|-------|----------|
| Bell-LaPadula | "No Read Up, No Write Down" = "NRU-NWD" = info can only flow UP |
| Biba | "No Read Down, No Write Up" = "NRD-NWU" = info can only flow DOWN |
| Remember | BLP is the **opposite** of Biba in every direction |

### 7. Network Security Traps

| Trap | Correct |
|------|---------|
| "Firewall prevents all attacks" | Cannot stop application-layer attacks through allowed ports |
| "IDS and IPS are the same" | IDS monitors + alerts. IPS monitors + **blocks**. |
| "VPN encrypts everything" | VPN encrypts between endpoints only. Traffic exits VPN unencrypted. |
| "HTTPS means the site is safe" | HTTPS = encrypted transport. Site can still be malicious. |
| "TLS 1.3 uses RSA key exchange" | TLS 1.3 removed RSA key exchange. Only (EC)DHE. |
| "SSL and TLS are the same" | SSL is deprecated (insecure). TLS is the successor. |

### 8. Web Security Traps

| Trap | Correct |
|------|---------|
| "Input validation prevents SQLi" | Parameterised queries are the primary defence. Validation is secondary. |
| "Encoding input prevents XSS" | Encode **output** (when rendering), not just input |
| "CSRF steals data" | CSRF performs **actions**. It cannot read responses (same-origin policy). |
| "XSS only steals cookies" | XSS can do anything the user can: modify page, keylog, redirect |
| "HTTPS prevents XSS" | HTTPS encrypts transport. XSS is an application-layer flaw. |
| "CSP alone prevents all XSS" | CSP helps but isn't perfect (unsafe-inline, base-uri attacks) |
| "Escaping fixes SQLi" | Escaping is fragile. Prepared statements are the correct fix. |

### 9. Protocol Traps

| Trap | Correct |
|------|---------|
| "Forward secrecy protects against future attacks" | It protects **past** sessions if the long-term key is compromised later |
| "AES-GCM provides only encryption" | GCM provides authenticated encryption (confidentiality + integrity) |
| "HMAC uses asymmetric keys" | HMAC uses a **symmetric** shared key |
| "Digital signatures use symmetric keys" | Signatures use **asymmetric** keys (sign with private) |

### 10. General Security Traps

| Trap | Correct |
|------|---------|
| "Security through obscurity works" | Should not be the sole defence. Assume attacker knows the system (Kerckhoffs). |
| "More encryption = more secure" | Double encryption with same algorithm may not double security |
| "Hashing is encryption" | Hashing is one-way. Encryption is reversible. |
| "HTTPS = authenticated" | HTTPS authenticates the **server**. Does not authenticate the user. |
| "Availability is not a security concern" | CIA triad: Confidentiality, Integrity, **Availability** |
