---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP3028 - Computer Security"
tags: ["exam", "strategy", "revision", "planning"]
---

## Exam Strategy — 2026

### Exam Format (Confirmed by Lecturer)

- **3 questions, answer ALL**
- **20 marks each** (60 marks total)
- **Duration: 1 hour**
- One whole question on **Cryptography** (Lectures 5-8)
- The other two questions spread across remaining topics
- **Pay close attention to mark allocation** within each question part

### Time Allocation

| Section | Suggested Time | Notes |
|---------|---------------|-------|
| Reading & planning | 5 minutes | Read all 3 questions, note mark allocations |
| Question 1 | 17 minutes | Likely the crypto question — allocate time per mark |
| Question 2 | 17 minutes | Mixed topics — check sub-part marks carefully |
| Question 3 | 17 minutes | Mixed topics — check sub-part marks carefully |
| Review | 4 minutes | Check for missed parts, fix notation |

> **Rule of thumb:** 1 mark ≈ 1 minute. A 5-mark sub-part deserves ~5 minutes.

### Examinable Topics (Confirmed Lectures)

| Lecture | Topic | Exam Role | Priority |
|---------|-------|-----------|----------|
| 2 | Foundations of Computer Security | Part of Q2/Q3 | High |
| 5 & 6 | Block Cipher, DES, AES | Part of crypto question | **Critical** |
| 7 | Public-key Cryptosystems (RSA, DH, ElGamal) | Part of crypto question | **Critical** |
| 8 | Message Authentication, Hash Functions, Digital Signatures | Part of crypto question | **Critical** |
| 9 | Passwords | Part of Q2/Q3 | High |
| 11 | Reference Monitors | Part of Q2/Q3 | High |
| 12 | Malware | Part of Q2/Q3 | High |
| 14 | Database Security | Part of Q2/Q3 | Medium |
| 15 | Software Security (**NO buffer overflow**) | Part of Q2/Q3 | Medium |
| 17 | Network Security | Part of Q2/Q3 | High |

### Key Guidance from Lecturer

- **DO NOT memorise DES/AES algorithms** — understand the concepts and differences
- **Know the algorithms**: RSA, Diffie-Hellman, ElGamal (how they work, not bitwise implementation)
- **Differences between DES and AES** are important (key size, block size, structure, security)
- **Buffer overflow is NOT examinable** in Software Security

### Question Structure Prediction

| Question | Likely Content | Marks |
|----------|---------------|-------|
| Q1 (Crypto) | Block ciphers (DES vs AES), public-key (RSA/DH/ElGamal), hashing/MACs/signatures | 20 |
| Q2 (Mixed) | Foundations + passwords + reference monitors + malware (subset) | 20 |
| Q3 (Mixed) | Database security + software security + network security (subset) | 20 |

### Key Formulas (Crypto Question)

| Formula | Context |
|---------|---------|
| RSA: `c = m^e mod n` | Encryption |
| RSA: `m = c^d mod n` | Decryption |
| RSA: `n = p * q`, `φ(n) = (p-1)(q-1)` | Key generation |
| RSA: `e * d ≡ 1 mod φ(n)` | Private key derivation |
| DH: `K = g^(ab) mod p` | Shared secret |
| ElGamal: encrypt `(c1, c2) = (g^k mod p, m * y^k mod p)` | Encryption (y = public key) |
| ElGamal: decrypt `m = c2 * (c1^x)^-1 mod p` | Decryption (x = private key) |
| HMAC: `H((K ⊕ opad) ‖ H((K ⊕ ipad) ‖ m))` | MAC computation |

### DES vs AES Comparison (High Priority)

| Property | DES | AES |
|----------|-----|-----|
| Key size | 56 bits | 128 / 192 / 256 bits |
| Block size | 64 bits | 128 bits |
| Structure | Feistel network | Substitution-permutation network |
| Rounds | 16 | 10 / 12 / 14 |
| Status | Broken (brute-forceable) | Secure |
| Design | IBM / NSA (1977) | Rijndael — open competition (2001) |

### Night-Before Top 10 Checklist (2026 Exam)

1. CIA triad definitions and examples of each being violated (Lecture 2)
2. DES vs AES: key sizes, block sizes, structure, rounds — understand, don't memorise algorithms
3. RSA key generation steps and a small worked example
4. Diffie-Hellman key exchange steps and why it is vulnerable to MITM
5. ElGamal encryption/decryption process
6. Hash properties: pre-image, second pre-image, collision resistance + digital signatures
7. Password storage: salting, hashing (bcrypt/Argon2), attacks (dictionary, rainbow tables)
8. Reference monitor concept: completeness, isolation, verifiability
9. Malware types: virus, worm, trojan, ransomware — propagation and defence
10. Network security: firewalls, TLS, IPSec — defence in depth
