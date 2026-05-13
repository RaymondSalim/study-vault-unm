---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP3028 - Computer Security"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<button onclick="(() => { const content = document.querySelector('.module-content'); const printWindow = window.open('', '_blank'); printWindow.document.write('<html><head><title>COMP3028 Final Notes</title><link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css&quot;/><style>body{font-family:system-ui,sans-serif;font-size:9pt;line-height:1.3;margin:1cm;color:#000}h2{font-size:12pt;margin:0.5em 0 0.2em;border-bottom:1px solid #000}h3{font-size:10pt;margin:0.4em 0 0.1em}table{border-collapse:collapse;width:100%;margin:0.3em 0;font-size:8.5pt}th,td{border:1px solid #999;padding:2px 4px;text-align:left}th{background:#eee}strong{font-weight:700}hr{margin:0.4em 0;border:none;border-top:1px dashed #999}ul,ol{margin:0.2em 0;padding-left:1.2em}li{margin:0.1em 0}p{margin:0.2em 0}code{font-size:8pt;background:#f0f0f0;padding:1px 3px;border-radius:2px}.katex{font-size:0.95em}@page{size:A4;margin:1cm}@media print{.no-print{display:none}}</style></head><body>' + content.innerHTML + '</body></html>'); printWindow.document.close(); printWindow.onload = () => { printWindow.print(); }; })()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

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
| Round ops | $L_i = R_{i-1}$, $R_i = L_{i-1} \oplus F(R_{i-1}, K_i)$ | SubBytes, ShiftRows, MixColumns, AddRoundKey |

**Shannon's principles:** Confusion (ciphertext bit depends on many key bits — S-box/SubBytes) + Diffusion (plaintext bit affects many ciphertext bits — ShiftRows/MixColumns)

**Why blocks not single chars?** Resists frequency analysis + provides diffusion

**3DES:** $C = E_{K_3}(D_{K_2}(E_{K_1}(P)))$ — effective 112-bit key (2-key) or 168-bit (3-key)

---

### Modes of Operation

| Mode | Formula | Weakness/Note |
|------|---------|--------------|
| ECB | $C_i = E_K(P_i)$ | Identical blocks → identical ciphertext; NEVER use |
| CBC | $C_i = E_K(P_i \oplus C_{i-1})$, $C_0 = \text{IV}$ | Chaining hides patterns; needs random IV; sequential enc |
| CFB | $C_i = P_i \oplus E_K(C_{i-1})$, $C_0 = \text{IV}$ | Turns block cipher into stream cipher; self-synchronising |
| OFB | $O_i = E_K(O_{i-1})$, $C_i = P_i \oplus O_i$, $O_0 = \text{IV}$ | Keystream pre-computable; bit errors don't propagate |
| CTR | $C_i = P_i \oplus E_K(\text{Nonce} \| \text{Counter}_i)$ | Parallelisable; nonce reuse catastrophic (reveals $P_1 \oplus P_2$) |

**CBC decryption:** $P_i = D_K(C_i) \oplus C_{i-1}$ &nbsp; **CFB decryption:** $P_i = C_i \oplus E_K(C_{i-1})$ &nbsp; **OFB decryption:** same as encryption

---

### Public-Key Cryptosystems (L7)

**RSA — Key Generation:**
1. Choose large primes $p$, $q$
2. Compute $n = p \times q$
3. Compute $\phi(n) = (p-1)(q-1)$
4. Choose $e$: $1 < e < \phi(n)$, $\gcd(e, \phi(n)) = 1$
5. Compute $d = e^{-1} \bmod \phi(n)$ &nbsp; [i.e., $ed \equiv 1 \pmod{\phi(n)}$]
- Public key: $(e, n)$ &nbsp;|&nbsp; Private key: $(d, n)$

**RSA Encrypt/Decrypt:** $C = M^e \bmod n$ &nbsp;|&nbsp; $M = C^d \bmod n$

**Security basis:** Integer Factorisation Problem — factoring $n$ into $p \times q$ is computationally hard

**Worked example:** $p=11, q=13 \Rightarrow n=143, \phi(n)=120, e=7, d=103$. Encrypt $M=9$: $C = 9^7 \bmod 143 = 48$

---

**Diffie-Hellman Key Exchange:**
- Public: prime $p$, generator $g$
- Alice: secret $a$, sends $A = g^a \bmod p$
- Bob: secret $b$, sends $B = g^b \bmod p$
- Shared key: $K = g^{ab} \bmod p$
- Security: Discrete Logarithm Problem
- Vulnerability: NO authentication → MITM attack (fix: sign DH values with certificates)

---

**ElGamal:**
- Key gen: choose prime $p$, generator $g$, private key $x$, public key $y = g^x \bmod p$
- Encrypt $M$: choose random $k$, $C_1 = g^k \bmod p$, $C_2 = M \cdot y^k \bmod p$
- Decrypt: $M = C_2 \cdot (C_1^x)^{-1} \bmod p$
- Security: Discrete Logarithm Problem
- Produces ciphertext $2\times$ message size

---

### Message Auth, Hash, Digital Signatures (L8)

**Hash function** $H(M)$: arbitrary input → fixed output. Properties:
- Pre-image resistance: given $h$, can't find $M$
- Second pre-image resistance: given $M_1$, can't find $M_2$ with same hash
- Collision resistance: can't find any $M_1 \neq M_2$ with $H(M_1) = H(M_2)$
- Birthday attack: find collision in $\sim 2^{n/2}$ for $n$-bit hash

**MAC** $= \text{MAC}(K, M)$: provides integrity + authentication (NOT non-repudiation — shared key)

**HMAC:** $\text{HMAC}(K,M) = H\bigl((K' \oplus \text{opad}) \| H((K' \oplus \text{ipad}) \| M)\bigr)$ — prevents length extension

**Digital Signature (provides non-repudiation):**
- Sign: $S = H(M)^d \bmod n$ (sender's private key)
- Verify: $H(M) \stackrel{?}{=} S^e \bmod n$ (sender's public key)
- Provides: Authentication + Integrity + Non-repudiation

**Anti-replay:** Add timestamp/nonce to message before signing. Receiver rejects old/duplicate timestamps.

---

## SIDE 2: REMAINING TOPICS (Split across Q2 & Q3)

### Passwords (L9)

**Attacks:** Brute force (try all), Dictionary (common words), Rainbow table (pre-computed hash lookup), Phishing (social engineering)

**Salt:** Random value per user, stored alongside hash. $\text{hash} = H(\text{salt} \| \text{password})$
- Same salt for all users → dictionary attack against all at once; identical passwords still spotted
- Unique salt per user → each must be attacked individually; rainbow tables useless

**Defences:** Slow hash (bcrypt/Argon2), unique salt per user, enforce length (12+), check against breach lists, rate limiting/lockout, MFA

---

### Reference Monitors (L11) & Access Control

**Reference monitor properties:** Always invoked, tamperproof, verifiable (simple enough to prove correct)

**Access Control Matrix:** Subjects $\times$ Objects → Rights. Implemented as:
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
| DES brute force | $2^{56}$ keys |
| AES-128 brute force | $2^{128}$ keys |
| Birthday attack $n$-bit hash | $2^{n/2}$ |
| RSA encrypt | $C = M^e \bmod n$ |
| RSA decrypt | $M = C^d \bmod n$ |
| RSA sign | $S = H(M)^d \bmod n$ |
| RSA verify | $H(M) \stackrel{?}{=} S^e \bmod n$ |
| DH shared key | $K = g^{ab} \bmod p$ |
| CBC encrypt | $C_i = E_K(P_i \oplus C_{i-1})$ |
| CBC decrypt | $P_i = D_K(C_i) \oplus C_{i-1}$ |
