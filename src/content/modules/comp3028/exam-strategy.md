---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP3028 - Computer Security"
tags: ["exam", "strategy", "revision", "planning"]
---

## Exam Strategy

### Time Allocation

| Section | Suggested Time | Notes |
|---------|---------------|-------|
| Reading & planning | 10 minutes | Identify which questions map to your strongest topics |
| Short-answer questions | 40 minutes | Quick definitions, comparisons, protocol steps |
| Long-answer / scenario questions | 60 minutes | In-depth analysis, attack/defence scenarios |
| Review | 10 minutes | Check for missed parts, fix notation |

### Topic Weighting (estimated)

| Topic | Weight | Priority |
|-------|--------|----------|
| Symmetric cryptography (AES, DES, modes) | 15% | High |
| Asymmetric cryptography (RSA, DH, ECC) | 15% | High |
| Hashing and MACs | 10% | Medium |
| Authentication protocols | 15% | High |
| Access control models | 15% | High |
| Network security (firewalls, TLS, IPSec) | 15% | High |
| Web security (XSS, CSRF, SQLi) | 15% | High |

### Question Types to Expect

1. **Compare and contrast** -- e.g., symmetric vs asymmetric, DAC vs MAC vs RBAC
2. **Protocol walkthroughs** -- draw/describe steps of TLS handshake, Needham-Schroeder, Kerberos
3. **Attack scenarios** -- identify vulnerability, explain exploitation, propose mitigation
4. **Calculation** -- RSA key generation, modular arithmetic, hash output lengths
5. **Design questions** -- propose a security architecture for a given scenario

### Key Formulas

| Formula | Context |
|---------|---------|
| RSA: `c = m^e mod n` | Encryption |
| RSA: `m = c^d mod n` | Decryption |
| RSA: `n = p * q`, `phi = (p-1)(q-1)` | Key generation |
| RSA: `e * d = 1 mod phi(n)` | Private key derivation |
| DH: `K = g^(ab) mod p` | Shared secret |
| HMAC: `H((K xor opad) || H((K xor ipad) || m))` | MAC computation |

### Night-Before Top 10 Checklist

1. CIA triad definitions and examples of each being violated
2. AES vs DES: key sizes, block sizes, number of rounds
3. RSA key generation steps and a small worked example
4. Diffie-Hellman steps and why it is vulnerable to MITM
5. Hash properties: pre-image, second pre-image, collision resistance
6. Bell-LaPadula (no read up, no write down) vs Biba (no read down, no write up)
7. TLS handshake sequence (ClientHello through to Application Data)
8. SQL injection example and parameterised query defence
9. XSS types (stored, reflected, DOM-based) and Content Security Policy
10. Kerberos: TGT, service ticket, how timestamps fix replay attacks
