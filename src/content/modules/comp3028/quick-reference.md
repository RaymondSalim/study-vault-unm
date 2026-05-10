---
title: "Quick Reference"
order: 90
moduleTitle: "COMP3028 - Computer Security"
tags: ["reference", "comparison", "algorithms", "key-sizes", "cheat-sheet"]
---

## Cryptographic Algorithm Comparison

### Symmetric Ciphers

| Algorithm | Key Size | Block Size | Rounds | Status |
|-----------|----------|-----------|--------|--------|
| DES | 56 bits | 64 bits | 16 | Broken |
| 3DES | 112/168 bits | 64 bits | 48 | Deprecated |
| AES-128 | 128 bits | 128 bits | 10 | Secure |
| AES-256 | 256 bits | 128 bits | 14 | Secure |
| ChaCha20 | 256 bits | -- (stream) | 20 | Secure |

### Asymmetric Algorithms

| Algorithm | Key Size | Based on | Use |
|-----------|----------|----------|-----|
| RSA-2048 | 2048 bits | Integer factorisation | Encryption, signatures |
| RSA-4096 | 4096 bits | Integer factorisation | Long-term security |
| ECDSA P-256 | 256 bits | Elliptic curve DLP | Signatures |
| ECDH P-256 | 256 bits | Elliptic curve DLP | Key exchange |
| Ed25519 | 256 bits | Twisted Edwards curve | Signatures |
| X25519 | 256 bits | Curve25519 | Key exchange |

### Hash Functions

| Algorithm | Output | Status | Use |
|-----------|--------|--------|-----|
| MD5 | 128 bits | Broken | Legacy only (checksums) |
| SHA-1 | 160 bits | Broken | Do not use |
| SHA-256 | 256 bits | Secure | General purpose |
| SHA-384 | 384 bits | Secure | Higher security |
| SHA-512 | 512 bits | Secure | High throughput on 64-bit |
| SHA-3-256 | 256 bits | Secure | Alternative to SHA-2 |
| BLAKE3 | 256 bits | Secure | High performance |

## Equivalent Security Levels

| Security bits | Symmetric | RSA/DH | ECC | Hash (collision) |
|:---:|:---:|:---:|:---:|:---:|
| 80 | 2TDEA | 1024 | 160 | SHA-1 (160) |
| 112 | 3TDEA | 2048 | 224 | SHA-224 |
| 128 | AES-128 | 3072 | 256 | SHA-256 |
| 192 | AES-192 | 7680 | 384 | SHA-384 |
| 256 | AES-256 | 15360 | 512 | SHA-512 |

## Recommended Key Sizes (2024+)

| Use case | Minimum | Recommended |
|----------|---------|-------------|
| Symmetric encryption | AES-128 | AES-256 |
| RSA signing/encryption | 2048 | 3072-4096 |
| ECDSA/ECDH | P-256 | P-384 or Curve25519 |
| Hash (general) | SHA-256 | SHA-256 or SHA-3 |
| Password hashing | Argon2id | Argon2id |
| HMAC | HMAC-SHA-256 | HMAC-SHA-256 |

## Protocol Quick Reference

| Protocol | Layer | Key exchange | Encryption | Auth |
|----------|-------|-------------|------------|------|
| TLS 1.3 | L4-L7 | ECDHE | AES-GCM / ChaCha20 | Certificates |
| IPsec | L3 | IKEv2 | AES-GCM | PSK or Certificates |
| WireGuard | L3 | Noise (X25519) | ChaCha20-Poly1305 | Public keys |
| SSH | L4-L7 | ECDH / DH | AES-GCM / ChaCha20 | Keys or passwords |
| Kerberos | L7 | -- (KDC) | AES | Tickets |

## Block Cipher Mode Selection

| Need | Use | Avoid |
|------|-----|-------|
| Authenticated encryption | AES-GCM, ChaCha20-Poly1305 | ECB, CBC without MAC |
| Disk encryption | XTS-AES | ECB, CTR |
| Streaming data | CTR, ChaCha20 | CBC (needs padding) |
| Legacy compatibility | CBC + HMAC (Encrypt-then-MAC) | ECB |

## Attack Complexity Reference

| Attack | Target | Complexity |
|--------|--------|-----------|
| Brute force DES | DES key | $2^{56}$ |
| Birthday attack | $n$-bit hash | $2^{n/2}$ |
| Brute force AES-128 | AES key | $2^{128}$ |
| Factor RSA-2048 | RSA key | $\approx 2^{112}$ (GNFS) |
| ECDLP P-256 | ECC key | $\approx 2^{128}$ (Pollard rho) |

## Security Properties Cheat Sheet

| Property | Meaning | Achieved by |
|----------|---------|-------------|
| Confidentiality | Only intended recipient can read | Encryption |
| Integrity | Detect modification | MAC, hash, signatures |
| Authentication | Verify identity | Passwords, certificates, MFA |
| Non-repudiation | Cannot deny action | Digital signatures |
| Availability | System accessible when needed | Redundancy, DDoS protection |
| Forward secrecy | Past sessions safe if key compromised | Ephemeral DH |

## Web Security Mitigation Matrix

| Attack | Primary Defence | Secondary Defence |
|--------|----------------|-------------------|
| SQL Injection | Prepared statements | Input validation, WAF |
| XSS (Reflected) | Output encoding | CSP, HttpOnly cookies |
| XSS (Stored) | Output encoding + input sanitisation | CSP |
| CSRF | Anti-CSRF tokens | SameSite cookies |
| Clickjacking | X-Frame-Options / CSP frame-ancestors | Frame-busting JS |
| Command Injection | Avoid shell commands | Input validation |
| Path Traversal | Canonicalise + whitelist | Chroot, minimal permissions |
| SSRF | URL allowlist | Block internal IPs |

## Access Control Model Comparison

| Model | Who sets policy | Flexibility | Use case |
|-------|----------------|-------------|----------|
| DAC | Owner | High | General OS (Unix, Windows) |
| MAC | System/Admin | Low | Military, high-security |
| RBAC | Admin (roles) | Medium | Enterprise, healthcare |
| ABAC | Policy engine | Very high | Cloud, complex environments |
