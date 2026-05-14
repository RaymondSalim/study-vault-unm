---
title: "Network Security"
order: 6
moduleTitle: "COMP3028 - Computer Security"
tags: ["firewall", "IDS", "IPS", "VPN", "TLS", "SSL", "network"]
---

## Firewalls

:::eli10

A firewall is like a security guard at the door of your network. It checks every piece of data coming in or going out and decides whether to let it through based on a set of rules. Simple firewalls only look at where data is coming from and where it is going. Smarter firewalls can look inside the data to check if it is dangerous.

:::

:::eli15
Firewalls filter network traffic based on rules. Packet filters operate at layers 3-4, examining IP addresses, ports, and protocol flags -- fast but unable to understand application context. Stateful firewalls track connection state, so they can distinguish legitimate return traffic from unsolicited inbound packets. Application-layer proxies inspect full payload content for threats but are slow. Next-Generation Firewalls (NGFW) combine deep packet inspection with threat intelligence. The principle of "default deny" means blocking everything not explicitly allowed, which is far more secure than default-allow.

:::

:::eli20
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

:::

## Intrusion Detection/Prevention Systems

:::eli10

An IDS is like a security camera that watches network traffic and sounds an alarm if it spots something suspicious. An IPS is the same thing but also has the power to block the attack automatically. The camera approach (IDS) never accidentally blocks good traffic, but the blocker approach (IPS) can stop attacks in real time.

:::

:::eli15
Intrusion Detection Systems (IDS) passively monitor network traffic and alert on suspicious activity. Intrusion Prevention Systems (IPS) sit inline in the traffic path and can actively block threats. Detection methods include signature-based (matching known attack patterns -- accurate but cannot detect new attacks), anomaly-based (detecting deviations from a baseline of normal behaviour -- can catch zero-days but has high false positive rates), and heuristic/behavioural analysis. The key trade-off is between false positives (blocking legitimate traffic) and false negatives (missing real attacks).

:::

:::eli20
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

:::

## Virtual Private Networks (VPN)

:::eli10

A VPN creates a secret tunnel through the internet. Even though your data travels across public networks that anyone could spy on, the tunnel encrypts everything so nobody can see what is inside. It is like sending your letters through a private, locked tube instead of regular mail.

:::

:::eli15
VPNs create encrypted tunnels over untrusted networks, typically the public internet. IPsec is the standard protocol suite for VPNs: transport mode encrypts only the payload (for host-to-host), while tunnel mode wraps the entire IP packet in a new encrypted packet (for site-to-site gateways). IPsec uses ESP for encryption and integrity, AH for integrity only, and IKE for key negotiation. Modern alternatives include WireGuard (simpler, faster, using ChaCha20) and OpenVPN (TLS-based). Each VPN connection is governed by a Security Association (SA) that specifies the algorithms, keys, and lifetime.

:::

:::eli20
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

:::

## TLS/SSL

:::eli10

TLS (the successor to SSL) is what puts the padlock icon in your browser. When you visit a website with HTTPS, your browser and the server perform a secret handshake: they prove their identities, agree on encryption methods, and create shared keys -- all before any private data is sent. After the handshake, everything is encrypted.

:::

:::eli15
TLS (Transport Layer Security) secures communication between clients and servers (HTTPS, email, etc.). The TLS handshake establishes a secure session: the server presents its certificate, they agree on a cipher suite, and derive session keys via key exchange. TLS 1.3 (2018) improved on 1.2 by reducing the handshake to 1 round-trip, removing insecure algorithms (RC4, CBC, RSA key exchange), and mandating forward secrecy via ephemeral Diffie-Hellman. Forward secrecy means that compromising the server's long-term private key does not allow decryption of previously recorded sessions, because each session uses unique ephemeral keys. Certificate validation involves checking the chain of trust up to a root CA, expiry, revocation, and hostname matching.

:::

:::eli20
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

:::

## Common Network Attacks

:::eli10

There are many ways attackers try to break into networks. Some pretend to be your router to intercept your traffic (ARP spoofing). Some flood a server with fake connection requests until it crashes (SYN flood, DDoS). Some trick your computer into going to the wrong website (DNS spoofing). Defences include using encryption (TLS), verifying identities (certificates), and filtering bad traffic (firewalls).

:::

:::eli15
Network attacks target different layers of the stack. At layer 2, ARP spoofing sends fake ARP replies to redirect local traffic through the attacker. At layer 3, IP spoofing forges source addresses. At layer 4, SYN floods exhaust server connection tables by sending half-open TCP connections. At higher layers, DNS spoofing redirects users to malicious servers, and man-in-the-middle attacks intercept communications. DDoS attacks overwhelm targets with traffic from many sources. Key defences include TLS for encryption and authentication, DNSSEC for DNS integrity, SYN cookies for SYN floods, and certificate pinning against MITM.

:::

:::eli20
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

:::
