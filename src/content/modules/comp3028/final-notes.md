---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP3028 - Computer Security"
tags: ["exam", "cheat-sheet", "final-notes"]
---

## SIDE 1: CRYPTOGRAPHY (One full question guaranteed)

### Foundations (L2)

**CIA Triad:** Confidentiality (no unauthorised disclosure), Integrity (no unauthorised modification), Availability (accessible when needed)

**Security mechanisms:** Prevention (stop attacks), Detection (identify attacks), Reaction (respond/recover)

**Threat model:** Physical vs Digital — digital can be copied without detection, no "missing" item, jurisdiction issues

---

### Block Ciphers — DES vs AES (L5-6)

| | DES | AES |
|-|-----|-----|
| Block size | 64 bits | 128 bits |
| Key size | 56 bits | 128/192/256 bits |
| Rounds | 16 | 10/12/14 |
| Structure | Feistel network | Substitution-Permutation Network (SPN) |
| Status | Broken (brute-forceable) | Secure (current standard) |
| Round ops | L_i=R_{i-1}, R_i=L_{i-1} XOR F(R_{i-1},K_i) | SubBytes, ShiftRows, MixColumns, AddRoundKey |

**Shannon's principles:** Confusion (ciphertext bit depends on many key bits — S-box/SubBytes) + Diffusion (plaintext bit affects many ciphertext bits — ShiftRows/MixColumns)

**Why blocks not single chars?** Resists frequency analysis + provides diffusion

**3DES:** C = E_K3(D_K2(E_K1(P))) — effective 112-bit key (2-key) or 168-bit (3-key)

---

### Modes of Operation

| Mode | Formula | Weakness/Note |
|------|---------|--------------|
| ECB | C_i = E_K(P_i) | Identical blocks → identical ciphertext; NEVER use |
| CBC | C_i = E_K(P_i XOR C_{i-1}), C_0=IV | Chaining hides patterns; needs random IV; sequential |
| CTR | C_i = P_i XOR E_K(Nonce‖Counter_i) | Parallelisable; nonce reuse catastrophic (reveals P1 XOR P2) |

**CBC decryption:** P_i = D_K(C_i) XOR C_{i-1}

---

### Public-Key Cryptosystems (L7)

**RSA — Key Generation:**
1. Choose large primes p, q
2. n = p × q
3. φ(n) = (p-1)(q-1)
4. Choose e: 1 < e < φ(n), gcd(e, φ(n)) = 1
5. Compute d = e^(-1) mod φ(n) [i.e., ed ≡ 1 mod φ(n)]
- Public key: (e, n) | Private key: (d, n)

**RSA Encrypt/Decrypt:** C = M^e mod n | M = C^d mod n

**Security basis:** Integer Factorisation Problem — factoring n into p×q is computationally hard

**Worked example:** p=11, q=13 → n=143, φ(n)=120, e=7, d=103. Encrypt M=9: C=9^7 mod 143=48

---

**Diffie-Hellman Key Exchange:**
- Public: prime p, generator g
- Alice: secret a, sends A = g^a mod p
- Bob: secret b, sends B = g^b mod p
- Shared key: K = g^(ab) mod p
- Security: Discrete Logarithm Problem
- Vulnerability: NO authentication → MITM attack (fix: sign DH values with certificates)

---

**ElGamal:**
- Key gen: choose prime p, generator g, private key x, public key y = g^x mod p
- Encrypt M: choose random k, C1 = g^k mod p, C2 = M × y^k mod p
- Decrypt: M = C2 × (C1^x)^(-1) mod p
- Security: Discrete Logarithm Problem
- Produces ciphertext 2× message size

---

### Message Auth, Hash, Digital Signatures (L8)

**Hash function H(M):** arbitrary input → fixed output. Properties:
- Pre-image resistance: given h, can't find M
- Second pre-image resistance: given M1, can't find M2 with same hash
- Collision resistance: can't find any M1≠M2 with H(M1)=H(M2)
- Birthday attack: find collision in ~2^(n/2) for n-bit hash

**MAC = MAC(K, M):** provides integrity + authentication (NOT non-repudiation — shared key)

**HMAC:** HMAC(K,M) = H((K' XOR opad) ‖ H((K' XOR ipad) ‖ M)) — prevents length extension

**Digital Signature (provides non-repudiation):**
- Sign: S = H(M)^d mod n (sender's private key)
- Verify: H(M) =? S^e mod n (sender's public key)
- Provides: Authentication + Integrity + Non-repudiation

**Anti-replay:** Add timestamp/nonce to message before signing. Receiver rejects old/duplicate timestamps.

---

## SIDE 2: REMAINING TOPICS (Split across Q2 & Q3)

### Passwords (L9)

**Attacks:** Brute force (try all), Dictionary (common words), Rainbow table (pre-computed hash lookup), Phishing (social engineering)

**Salt:** Random value per user, stored alongside hash. hash = H(salt ‖ password)
- Same salt for all users → dictionary attack against all at once; identical passwords still spotted
- Unique salt per user → each must be attacked individually; rainbow tables useless

**Defences:** Slow hash (bcrypt/Argon2), unique salt per user, enforce length (12+), check against breach lists, rate limiting/lockout, MFA

---

### Reference Monitors (L11) & Access Control

**Reference monitor properties:** Always invoked, tamperproof, verifiable (simple enough to prove correct)

**Access Control Matrix:** Subjects × Objects → Rights. Implemented as:
- **ACL (per object):** easy revocation, easy to see who accesses an object
- **Capability (per subject):** hard to revoke, easy to see what a subject can access

| Operation | ACL | Capability |
|-----------|-----|-----------|
| Check access | Easy (look at object) | Easy (subject presents token) |
| Add new subject | Easy (add to object lists) | Hard (distribute tokens) |
| Revoke subject | Easy (remove from lists) | Hard (revocation problem) |
| New object for all | Hard (add all subjects) | Hard (distribute to all) |

**Models:** DAC (owner decides), MAC (system enforces labels), RBAC (roles → permissions)

**Bell-LaPadula (Confidentiality):** No Read Up + No Write Down ("read down, write up")

**Biba (Integrity):** No Read Down + No Write Up ("read up, write down")

---

### Malware (L12)

| Type | Behaviour |
|------|-----------|
| Virus | Attaches to host program; replicates when host runs |
| Worm | Self-replicating; spreads via network autonomously |
| Trojan | Appears legitimate; hides malicious functionality |
| Ransomware | Encrypts files; demands payment for decryption key |
| Rootkit | Hides presence; modifies OS to evade detection |
| Spyware | Monitors user activity; exfiltrates data |
| Logic bomb | Triggers on specific condition (date, event) |

**Virus phases:** Dormant → Propagation → Triggering → Execution

**Countermeasures:** Antivirus (signature-based), behaviour monitoring (anomaly-based), sandboxing, patching, least privilege

---

### Database Security (L14)

**Threats:** SQL injection, unauthorised access, inference attacks, data leakage

**SQL Injection:** Input: `' OR 1=1 --` turns query into always-true condition
- Defence: Prepared statements/parameterised queries, input validation, least privilege DB accounts

**Inference attack:** Derive sensitive data from non-sensitive queries (e.g., aggregate statistics reveal individual values)

**Statistical database protection:** Query-set size controls, cell suppression, noise addition, query auditing

**Access control in DB:** GRANT/REVOKE, views (restrict visible columns/rows), role-based privileges

---

### Software Security (L15) — NO buffer overflow

**Common vulnerabilities:** Input validation failures, race conditions, improper error handling, insecure defaults

**Defensive programming:** Validate ALL inputs, fail securely, principle of least privilege, minimise attack surface

**Code injection types:** SQL injection, command injection, XSS (cross-site scripting)

**SDLC security:** Security requirements → Threat modelling → Secure coding → Code review → Testing → Deployment hardening

---

### Network Security (L17)

**Firewall types:**
- Packet filter (L3/L4): fast, checks IP/port/protocol
- Stateful (L4): tracks connections, better TCP security
- Application proxy (L7): inspects payload content, slow

**Firewall limitations:** Can't stop: internal attacks, application-layer attacks through allowed ports, social engineering/phishing, encrypted malicious traffic

**IDS vs IPS:** IDS = passive monitor + alert | IPS = inline + block
- Signature-based: known attacks (no zero-days)
- Anomaly-based: novel attacks (high false positives)

**Network attacks:**
- SYN flood: spoofed SYN packets fill connection table → DoS. Defence: SYN cookies
- MITM: intercept traffic between parties. Defence: TLS, cert verification
- ARP spoofing: fake ARP replies redirect traffic. Defence: static ARP entries
- DoS/DDoS: overwhelm resources. Defence: rate limiting, CDN, scrubbing

**IPsec:** Transport mode (payload only, host-to-host) | Tunnel mode (entire packet, gateway-to-gateway)
- AH: integrity + auth | ESP: encryption + integrity + auth

**TLS Handshake (simplified):** ClientHello → ServerHello + Certificate → Key Exchange → Encrypted data
- Forward secrecy: ephemeral DH keys per session; compromise of long-term key doesn't decrypt past sessions

---

### Key Formulas & Numbers

| Item | Value |
|------|-------|
| DES brute force | 2^56 keys |
| AES-128 brute force | 2^128 keys |
| Birthday attack n-bit hash | 2^(n/2) |
| RSA encrypt | C = M^e mod n |
| RSA decrypt | M = C^d mod n |
| RSA sign | S = H(M)^d mod n |
| RSA verify | H(M) =? S^e mod n |
| DH shared key | K = g^(ab) mod p |
| CBC encrypt | C_i = E_K(P_i XOR C_{i-1}) |
| CBC decrypt | P_i = D_K(C_i) XOR C_{i-1} |
