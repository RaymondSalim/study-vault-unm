---
title: "Glossary"
order: 95
moduleTitle: "COMP3028 - Computer Security"
tags: ["glossary", "definitions", "terminology"]
---

## A

| Term | Definition |
|------|-----------|
| **Access Control** | Mechanisms that restrict who can access what resources |
| **ACL** | Access Control List; permissions stored per object |
| **AES** | Advanced Encryption Standard; 128-bit block cipher (key: 128/192/256 bits) |
| **Asymmetric encryption** | Uses key pair (public + private); also called public-key cryptography |
| **Authenticated encryption** | Provides both confidentiality and integrity (e.g., AES-GCM) |
| **Authentication** | Verifying the identity of a user or system |
| **Authorisation** | Determining what an authenticated entity is allowed to do |
| **Availability** | Ensuring systems are accessible when needed |

## B

| Term | Definition |
|------|-----------|
| **Bell-LaPadula** | Security model enforcing confidentiality (no read up, no write down) |
| **Biba** | Security model enforcing integrity (no read down, no write up) |
| **Birthday attack** | Collision-finding attack exploiting birthday paradox ($2^{n/2}$ complexity) |
| **Block cipher** | Encrypts fixed-size blocks (e.g., AES: 128-bit blocks) |
| **Brute force** | Trying all possible keys/inputs until finding the correct one |

## C

| Term | Definition |
|------|-----------|
| **CA** | Certificate Authority; trusted entity that issues digital certificates |
| **CBC** | Cipher Block Chaining; block cipher mode using IV and chaining |
| **Certificate** | Digital document binding a public key to an identity (X.509) |
| **CIA triad** | Confidentiality, Integrity, Availability -- core security objectives |
| **Ciphertext** | Encrypted (unreadable) form of a message |
| **Collision** | Two different inputs producing the same hash output |
| **Confidentiality** | Ensuring information is accessible only to authorised parties |
| **CRL** | Certificate Revocation List; list of revoked certificates |
| **Cross-site scripting (XSS)** | Injection of malicious scripts into web pages viewed by others |
| **CSRF** | Cross-Site Request Forgery; tricking user's browser into making authenticated requests |
| **CTR mode** | Counter mode; turns block cipher into stream cipher |

## D

| Term | Definition |
|------|-----------|
| **DAC** | Discretionary Access Control; owner sets permissions |
| **DES** | Data Encryption Standard; 56-bit key, 64-bit block (broken) |
| **Diffie-Hellman** | Key exchange protocol based on discrete logarithm problem |
| **Digital signature** | Cryptographic proof of origin and integrity (signed with private key) |
| **DMZ** | Demilitarised Zone; network segment between external and internal networks |
| **DNS spoofing** | Providing false DNS responses to redirect traffic |
| **DoS/DDoS** | Denial of Service / Distributed DoS; overwhelming target resources |

## E-F

| Term | Definition |
|------|-----------|
| **ECDSA** | Elliptic Curve Digital Signature Algorithm |
| **Encryption** | Converting plaintext to ciphertext using a key |
| **ESP** | Encapsulating Security Payload; IPsec protocol providing encryption + auth |
| **Feistel network** | Cipher structure where each round splits block and applies round function (DES) |
| **Firewall** | Network device that filters traffic based on rules |
| **Forward secrecy** | Compromise of long-term key doesn't compromise past session keys |

## G-H

| Term | Definition |
|------|-----------|
| **GCM** | Galois/Counter Mode; authenticated encryption mode for block ciphers |
| **Hash function** | One-way function mapping arbitrary input to fixed-size output |
| **HMAC** | Hash-based Message Authentication Code; keyed hash for integrity + auth |
| **HSTS** | HTTP Strict Transport Security; forces browsers to use HTTPS |
| **HTTP** | Hypertext Transfer Protocol (unencrypted) |
| **HTTPS** | HTTP over TLS; encrypted web traffic |

## I-K

| Term | Definition |
|------|-----------|
| **IDS** | Intrusion Detection System; monitors and alerts on suspicious activity |
| **IKE** | Internet Key Exchange; negotiates IPsec security associations |
| **Integrity** | Ensuring data has not been modified by unauthorised parties |
| **IPS** | Intrusion Prevention System; monitors and blocks suspicious activity |
| **IPsec** | Internet Protocol Security; L3 encryption and authentication suite |
| **IV** | Initialisation Vector; random value used to ensure unique ciphertexts |
| **Kerberos** | Authentication protocol using tickets and KDC for SSO |
| **Kerckhoffs' principle** | Security should depend on key secrecy, not algorithm secrecy |
| **Key exchange** | Protocol for two parties to establish a shared secret over insecure channel |

## L-M

| Term | Definition |
|------|-----------|
| **MAC** | Message Authentication Code; keyed tag for integrity + authenticity |
| **MAC (access)** | Mandatory Access Control; system-enforced security labels |
| **Malware** | Malicious software (virus, worm, trojan, ransomware) |
| **MITM** | Man-in-the-Middle; attacker intercepts communication between parties |
| **MFA** | Multi-Factor Authentication; requires 2+ factor types |

## N-O

| Term | Definition |
|------|-----------|
| **Non-repudiation** | Inability to deny having performed an action (achieved via signatures) |
| **Nonce** | Number used once; prevents replay attacks and ensures uniqueness |
| **OAEP** | Optimal Asymmetric Encryption Padding; secure RSA padding scheme |
| **OCSP** | Online Certificate Status Protocol; real-time certificate revocation check |
| **OWASP** | Open Web Application Security Project; publishes Top 10 web vulnerabilities |

## P-R

| Term | Definition |
|------|-----------|
| **Padding** | Adding bytes to plaintext to fill block size (e.g., PKCS#7) |
| **Phishing** | Social engineering attack to obtain credentials or install malware |
| **PKI** | Public Key Infrastructure; system of CAs, certificates, and trust |
| **Plaintext** | Original unencrypted message |
| **Pre-image resistance** | Given hash $h$, infeasible to find message $m$ where $H(m) = h$ |
| **RBAC** | Role-Based Access Control; permissions assigned to roles, users assigned to roles |
| **Replay attack** | Re-sending captured valid messages to impersonate sender |
| **RSA** | Public-key algorithm based on integer factorisation |

## S

| Term | Definition |
|------|-----------|
| **S-box** | Substitution box; non-linear lookup table in block ciphers |
| **Salt** | Random value concatenated with password before hashing |
| **SameSite cookie** | Cookie attribute preventing cross-site transmission (CSRF defence) |
| **SHA** | Secure Hash Algorithm family (SHA-1 broken; SHA-2/3 secure) |
| **SQL injection** | Inserting malicious SQL via unsanitised input |
| **SSRF** | Server-Side Request Forgery; making server request internal resources |
| **SSL** | Secure Sockets Layer (deprecated predecessor to TLS) |
| **Stream cipher** | Encrypts data one bit/byte at a time using keystream |
| **Symmetric encryption** | Same key for encryption and decryption |

## T-V

| Term | Definition |
|------|-----------|
| **TLS** | Transport Layer Security; encrypted communication protocol (successor to SSL) |
| **TOTP** | Time-based One-Time Password (e.g., Google Authenticator) |
| **Trojan** | Malware disguised as legitimate software |
| **VPN** | Virtual Private Network; encrypted tunnel over untrusted network |
| **Vulnerability** | Weakness that can be exploited by a threat |

## W-Z

| Term | Definition |
|------|-----------|
| **WAF** | Web Application Firewall; filters HTTP traffic for attacks |
| **WireGuard** | Modern, simple VPN protocol using Curve25519 + ChaCha20 |
| **Worm** | Self-replicating malware that spreads without user interaction |
| **X.509** | Standard format for public key certificates |
| **XSS** | Cross-Site Scripting; injecting scripts into web pages |
| **Zero-day** | Vulnerability unknown to the vendor (no patch available) |
