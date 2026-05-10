---
title: "Network Security"
order: 6
moduleTitle: "COMP3028 - Computer Security"
tags: ["firewall", "IDS", "IPS", "VPN", "TLS", "SSL", "network"]
---

## Firewalls

### Types

| Type | Operates at | Inspects | Speed |
|------|-------------|----------|-------|
| Packet filter | Network/Transport (L3/L4) | IP, port, protocol, flags | Fast |
| Stateful inspection | Transport (L4) | Connection state + packet headers | Medium |
| Application proxy | Application (L7) | Full payload content | Slow |
| Next-Gen (NGFW) | All layers | Deep packet inspection + threat intel | Medium |

### Packet Filter Rules (Example)

| Rule | Direction | Source IP | Dest IP | Protocol | Dest Port | Action |
|------|-----------|-----------|---------|----------|-----------|--------|
| 1 | In | Any | 10.0.0.5 | TCP | 80 | Allow |
| 2 | In | Any | 10.0.0.5 | TCP | 443 | Allow |
| 3 | Out | 10.0.0.0/24 | Any | TCP | Any | Allow |
| 4 | Any | Any | Any | Any | Any | **Deny** |

> **Default deny**: Block everything not explicitly allowed (whitelist approach).

### Stateful vs Stateless

| | Stateless (packet filter) | Stateful |
|-|--------------------------|----------|
| Tracks connections | No | Yes |
| Handles TCP state | No (can't distinguish new vs established) | Yes |
| Return traffic | Need explicit rule | Automatically allowed for established |
| Memory usage | Low | Higher |
| Security | Lower (spoofing possible) | Higher |

### DMZ (Demilitarised Zone)

```
Internet <--> [Firewall] <--> DMZ <--> [Firewall] <--> Internal LAN
                              (web server, mail server)
```

## Intrusion Detection/Prevention Systems

| | IDS | IPS |
|-|-----|-----|
| Mode | Passive (monitor + alert) | Active (monitor + block) |
| Placement | Out-of-band (mirror port) | Inline (in traffic path) |
| Risk | Misses = no damage | False positive = blocks legitimate traffic |

### Detection Methods

| Method | How | Pros | Cons |
|--------|-----|------|------|
| Signature-based | Match known attack patterns | Accurate for known attacks, low FP | Cannot detect zero-days |
| Anomaly-based | Detect deviation from baseline | Can detect novel attacks | High false positives |
| Heuristic/Behavioural | Rule-based analysis of behaviour | Balance of both | Requires tuning |

## Virtual Private Networks (VPN)

### Purpose

Create encrypted tunnel over untrusted network (Internet).

### IPsec

| Mode | Protects | Use case |
|------|----------|----------|
| Transport mode | Payload only | Host-to-host |
| Tunnel mode | Entire original IP packet | Gateway-to-gateway (site-to-site) |

| Protocol | Provides |
|----------|----------|
| AH (Authentication Header) | Integrity + authentication (no encryption) |
| ESP (Encapsulating Security Payload) | Encryption + integrity + authentication |
| IKE (Internet Key Exchange) | Key negotiation, SA establishment |

### Security Association (SA)

| Field | Content |
|-------|---------|
| SPI | Security Parameters Index (identifier) |
| Algorithm | Encryption + integrity algorithms |
| Keys | Session keys |
| Lifetime | Duration or byte limit |

### VPN Comparison

| Protocol | Layer | Encryption | Use case |
|----------|-------|-----------|----------|
| IPsec | L3 | ESP (AES) | Site-to-site, corporate |
| OpenVPN | L3-L4 | TLS | Remote access |
| WireGuard | L3 | ChaCha20 | Modern, simple, fast |
| SSL/TLS VPN | L4-L7 | TLS | Browser-based access |

## TLS/SSL

### TLS Handshake (TLS 1.2 simplified)

```
Client                          Server
  |--- ClientHello (versions, ciphers, random) --->|
  |<-- ServerHello (chosen cipher, random) --------|
  |<-- Certificate (server's X.509 cert) ----------|
  |<-- ServerHelloDone ----------------------------|
  |--- ClientKeyExchange (pre-master secret) ----->|
  |--- ChangeCipherSpec --------------------------->|
  |--- Finished (encrypted) ---------------------->|
  |<-- ChangeCipherSpec ----------------------------|
  |<-- Finished (encrypted) -----------------------|
  |============ Application Data ==================|
```

### TLS 1.3 Improvements

| TLS 1.2 | TLS 1.3 |
|---------|---------|
| 2-RTT handshake | 1-RTT handshake (0-RTT resumption) |
| Many cipher suites | Only 5 (removed insecure ones) |
| RSA key exchange | Only (EC)DHE (forward secrecy mandatory) |
| Optional forward secrecy | Always forward secrecy |
| CBC mode allowed | Only AEAD (GCM, ChaCha20-Poly1305) |

### Forward Secrecy (Perfect Forward Secrecy)

| Property | Detail |
|----------|--------|
| Definition | Compromise of long-term key doesn't compromise past sessions |
| Mechanism | Use ephemeral DH keys per session |
| Without PFS | RSA key exchange: stealing server key decrypts all past traffic |
| With PFS | Each session has unique key; past traffic remains secure |

### Certificate Validation in TLS

1. Server presents certificate chain
2. Client verifies signatures up to trusted root CA
3. Client checks certificate not expired/revoked
4. Client checks hostname matches certificate SAN/CN
5. If valid, client trusts server's public key

## Common Network Attacks

| Attack | Layer | Description | Defence |
|--------|-------|-------------|---------|
| ARP spoofing | L2 | Fake ARP replies to redirect traffic | Static ARP, DHCP snooping |
| IP spoofing | L3 | Forged source IP | Ingress filtering, BCP38 |
| SYN flood | L4 | Exhaust server's connection table | SYN cookies, rate limiting |
| DNS spoofing | L7 | Fake DNS responses | DNSSEC |
| MITM | L2-L7 | Intercept and modify traffic | TLS, certificate pinning |
| DoS/DDoS | Any | Overwhelm target resources | CDN, rate limiting, scrubbing |

<details>
<summary><strong>Practice: Why does TLS 1.3 remove RSA key exchange?</strong></summary>

RSA key exchange:
1. Client encrypts pre-master secret with server's RSA public key
2. If server's private key is later compromised, attacker can decrypt all recorded traffic
3. No forward secrecy

(EC)DHE key exchange:
1. Ephemeral keys generated per session
2. Even if long-term signing key is compromised, past session keys cannot be recovered
3. Forward secrecy guaranteed

TLS 1.3 mandates (EC)DHE to ensure all connections have forward secrecy.
</details>

<details>
<summary><strong>Practice: Stateful firewall -- why is it better for TCP?</strong></summary>

Stateless firewall problem:
- Must allow inbound traffic on high ports for TCP return traffic
- Attacker can send packets to high ports claiming to be "return" traffic (ACK flag set)

Stateful firewall:
- Tracks TCP connection state (SYN, SYN-ACK, ESTABLISHED, FIN)
- Only allows inbound packets matching an established outbound connection
- Rejects unsolicited inbound packets even if they have ACK flag
- No need for broad "allow high ports" rules
</details>
