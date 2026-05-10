---
title: "Networking"
order: 7
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["networking", "OSI", "TCP-IP", "protocols", "IP-addressing"]
---

## OSI Model (7 Layers)

| # | Layer | Function | PDU | Devices | Protocols |
|---|-------|----------|-----|---------|-----------|
| 7 | Application | User interface, services | Data | - | HTTP, FTP, SMTP, DNS |
| 6 | Presentation | Encryption, compression, format | Data | - | SSL/TLS, JPEG, ASCII |
| 5 | Session | Session management | Data | - | NetBIOS, RPC |
| 4 | Transport | End-to-end delivery, reliability | Segment | - | TCP, UDP |
| 3 | Network | Routing, logical addressing | Packet | Router | IP, ICMP, ARP |
| 2 | Data Link | Framing, MAC addressing, error detection | Frame | Switch, Bridge | Ethernet, WiFi |
| 1 | Physical | Bits on wire/air | Bits | Hub, Cable | Ethernet physical, fibre |

Mnemonic (top-down): **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing

## TCP/IP Model (4 Layers)

| TCP/IP Layer | OSI Equivalent | Protocols |
|-------------|----------------|-----------|
| Application | 7, 6, 5 | HTTP, DNS, SMTP, FTP |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP, ARP |
| Network Access | 2, 1 | Ethernet, WiFi |

## TCP vs UDP

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented (3-way handshake) | Connectionless |
| Reliability | Guaranteed delivery, ordering | No guarantee |
| Speed | Slower (overhead) | Faster |
| Use cases | Web, email, file transfer | Streaming, DNS, gaming |
| Header size | 20 bytes minimum | 8 bytes |

### TCP 3-Way Handshake

1. Client → SYN → Server
2. Server → SYN-ACK → Client
3. Client → ACK → Server

## IP Addressing (IPv4)

| Class | Range (first octet) | Default mask | Networks | Hosts/network |
|-------|---------------------|--------------|----------|---------------|
| A | 1-126 | 255.0.0.0 (/8) | 126 | ~16 million |
| B | 128-191 | 255.255.0.0 (/16) | ~16,000 | 65,534 |
| C | 192-223 | 255.255.255.0 (/24) | ~2 million | 254 |

**Private address ranges**: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16

### Subnetting

- **Network address**: first address (host bits all 0)
- **Broadcast address**: last address (host bits all 1)
- **Usable hosts** = 2^(host bits) - 2
- CIDR notation: /n means n bits for network

| Mask | CIDR | Hosts |
|------|------|-------|
| 255.255.255.0 | /24 | 254 |
| 255.255.255.128 | /25 | 126 |
| 255.255.255.192 | /26 | 62 |
| 255.255.255.224 | /27 | 30 |
| 255.255.255.240 | /28 | 14 |

## Key Protocols

| Protocol | Port | Function |
|----------|------|----------|
| HTTP | 80 | Web pages (unencrypted) |
| HTTPS | 443 | Web pages (encrypted) |
| DNS | 53 | Domain name → IP resolution |
| DHCP | 67/68 | Automatic IP assignment |
| FTP | 20/21 | File transfer |
| SMTP | 25 | Sending email |
| SSH | 22 | Secure remote access |
| IMAP | 143 | Retrieving email |
| POP3 | 110 | Retrieving email (download) |

## DNS Resolution Process

1. Browser checks local cache
2. Query recursive DNS resolver (ISP)
3. Resolver queries root server → TLD server → authoritative server
4. IP returned and cached

## DHCP Process (DORA)

| Step | Message | Direction |
|------|---------|-----------|
| 1 | **D**iscover | Client → Broadcast |
| 2 | **O**ffer | Server → Client |
| 3 | **R**equest | Client → Server |
| 4 | **A**cknowledge | Server → Client |

## Network Devices

| Device | Layer | Function |
|--------|-------|----------|
| Hub | 1 | Broadcasts to all ports |
| Switch | 2 | Forwards by MAC address |
| Router | 3 | Routes by IP address |
| Firewall | 3-7 | Filters traffic by rules |

<details>
<summary>Practice: Subnet 192.168.1.0/26 -- what are network, broadcast, usable range?</summary>

/26 = 255.255.255.192 → 6 host bits → 2^6 - 2 = 62 usable hosts

- Network: 192.168.1.0
- First usable: 192.168.1.1
- Last usable: 192.168.1.62
- Broadcast: 192.168.1.63

Next subnet starts at 192.168.1.64
</details>

<details>
<summary>Practice: Which layer handles routing?</summary>

**Layer 3 (Network layer)** -- uses IP addresses and routing tables to determine the best path for packets across networks. Devices: routers.
</details>

<details>
<summary>Practice: Why does DNS primarily use UDP?</summary>

- DNS queries are small (fit in single packet)
- Speed matters more than reliability for lookups
- If response lost, client simply re-queries
- No need for connection setup overhead

Note: DNS uses TCP for zone transfers and responses > 512 bytes.
</details>
