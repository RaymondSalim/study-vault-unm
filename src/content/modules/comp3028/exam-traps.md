---
title: "Exam Traps"
order: 91
moduleTitle: "COMP3028 - Computer Security"
tags: ["exam", "common-mistakes", "traps", "pitfalls"]
---

## Common Exam Traps — 2026

> Focused on the confirmed examinable lectures only.

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

### 3. Hash Function & MAC Traps (Lecture 8)

| Trap | Correct |
|------|---------|
| "SHA-256 output is 128 bits" | SHA-256 output = 256 bits (it's in the name!) |
| "Collision resistance = pre-image resistance" | They are different properties. Collision is easier to break ($2^{n/2}$). |
| "Hash provides authentication" | Hash provides integrity only. MAC provides integrity + authentication. |
| "Digital signature = MAC" | MAC uses shared key (symmetric). Signatures use private key (asymmetric) and provide non-repudiation. |
| "Any hash function works for MACs" | HMAC construction is specifically designed to be secure; raw hash(key‖msg) has length extension attacks. |

### 4. Password Traps (Lecture 9)

| Trap | Correct |
|------|---------|
| "Two passwords = MFA" | MFA requires factors from **different categories** (something you know/have/are) |
| "Longer password = always secure" | Length helps but dictionary words and reuse still compromise security |
| "Biometrics are perfect" | Can be spoofed, cannot be changed if compromised |
| "Salt must be secret" | Salt prevents rainbow tables but is stored alongside hash. Not secret. |
| "MD5 is fine for passwords" | MD5 is broken AND too fast. Use bcrypt/Argon2. |
| "Hashing alone protects passwords" | Need salting + slow hash (bcrypt/Argon2) to resist offline attacks |

### 5. ElGamal Traps (Lecture 7)

| Trap | Correct |
|------|---------|
| "ElGamal is deterministic" | ElGamal uses a random k per encryption — same plaintext gives different ciphertext |
| "ElGamal ciphertext is same size as plaintext" | Ciphertext is a **pair** (c1, c2) — doubles the size |
| "ElGamal is based on factoring" | ElGamal is based on the **discrete logarithm** problem |
| "ElGamal can only encrypt" | ElGamal supports both encryption and digital signatures |

### 6. Foundations Trap: BLP/Biba (Reference Monitor context — Lecture 11)

| Model | Mnemonic |
|-------|----------|
| Bell-LaPadula | "No Read Up, No Write Down" = "NRU-NWD" = info can only flow UP |
| Biba | "No Read Down, No Write Up" = "NRD-NWU" = info can only flow DOWN |
| Remember | BLP is the **opposite** of Biba in every direction |

### 7. Network Security Traps (Lecture 17)

| Trap | Correct |
|------|---------|
| "Firewall prevents all attacks" | Cannot stop application-layer attacks through allowed ports |
| "IDS and IPS are the same" | IDS monitors + alerts. IPS monitors + **blocks**. |
| "VPN encrypts everything" | VPN encrypts between endpoints only. Traffic exits VPN unencrypted. |
| "HTTPS means the site is safe" | HTTPS = encrypted transport. Site can still be malicious. |
| "TLS 1.3 uses RSA key exchange" | TLS 1.3 removed RSA key exchange. Only (EC)DHE. |
| "SSL and TLS are the same" | SSL is deprecated (insecure). TLS is the successor. |
| "Stateful firewall = proxy firewall" | Stateful tracks connections; proxy inspects at application layer. |

### 8. Reference Monitor Traps (Lecture 11)

| Trap | Correct |
|------|---------|
| "Reference monitor = firewall" | Reference monitor is an abstract concept — mediates ALL access to objects |
| "Only needs to be tamper-proof" | Must satisfy THREE properties: completeness, isolation, verifiability |
| "Completeness means it checks most access" | Completeness = **every** access request is mediated, no bypass possible |
| "TCB should be as large as possible" | TCB should be **minimal** — smaller = easier to verify = more trustworthy |

### 9. Malware Traps (Lecture 12)

| Trap | Correct |
|------|---------|
| "Virus and worm are the same" | Virus needs a host program. Worm is **self-replicating** and standalone. |
| "Trojan replicates itself" | Trojan disguises as legitimate software but does NOT self-replicate. |
| "Antivirus catches all malware" | Signature-based AV misses zero-days and polymorphic malware. |
| "Rootkit is a type of virus" | Rootkit hides presence/other malware. It's a stealth mechanism, not a replication strategy. |

### 10. Database Security Traps (Lecture 14)

| Trap | Correct |
|------|---------|
| "Views provide full security" | Views restrict access but can be bypassed via inference attacks. |
| "Aggregation is harmless" | Combining non-sensitive data can reveal sensitive information (inference). |
| "SQL access control = OS access control" | Database has its own GRANT/REVOKE model separate from OS permissions. |

### 11. Software Security Traps (Lecture 15)

| Trap | Correct |
|------|---------|
| "Input validation alone is sufficient" | Defence in depth — also need secure design, least privilege, testing. |
| "Race conditions only affect performance" | TOCTOU race conditions are **security** vulnerabilities (privilege escalation). |
| "Security testing = functional testing" | Security testing specifically targets abuse cases, not just correct behaviour. |

### 12. General Security / Foundations Traps (Lecture 2)

| Trap | Correct |
|------|---------|
| "Security through obscurity works" | Should not be the sole defence. Assume attacker knows the system (Kerckhoffs). |
| "More encryption = more secure" | Double encryption with same algorithm may not double security |
| "Hashing is encryption" | Hashing is one-way. Encryption is reversible. |
| "Availability is not a security concern" | CIA triad: Confidentiality, Integrity, **Availability** |
| "Forward secrecy protects against future attacks" | It protects **past** sessions if the long-term key is compromised later |
| "HMAC uses asymmetric keys" | HMAC uses a **symmetric** shared key |
| "Digital signatures use symmetric keys" | Signatures use **asymmetric** keys (sign with private) |
