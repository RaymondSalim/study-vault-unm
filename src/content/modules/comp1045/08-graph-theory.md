---
title: "Graph Theory"
order: 8
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["discrete-maths", "graph-theory", "trees", "euler", "hamilton", "colouring", "planar"]
---

# Graph Theory

## Basic Definitions

| Term | Definition |
|------|-----------|
| Graph $G = (V, E)$ | Set of vertices $V$ and edges $E \subseteq V \times V$ |
| Simple graph | No self-loops, no multiple edges |
| Directed graph (digraph) | Edges have direction |
| Weighted graph | Edges have associated weights |
| Degree $\deg(v)$ | Number of edges incident to $v$ |
| Adjacent | Two vertices connected by an edge |

## Handshaking Lemma

$$\sum_{v \in V} \deg(v) = 2|E|$$

> Consequence: number of odd-degree vertices is always even.

## Types of Graphs

| Graph | Definition |
|-------|-----------|
| Complete $K_n$ | Every pair of vertices connected; $|E| = \binom{n}{2}$ |
| Bipartite | Vertices split into two sets; edges only between sets |
| Complete bipartite $K_{m,n}$ | Every vertex in one set connects to all in the other |
| Regular ($k$-regular) | Every vertex has degree $k$ |
| Subgraph | Subset of vertices and edges of $G$ |
| Complement $\bar{G}$ | Has edge $(u,v)$ iff $G$ does not |

## Paths and Cycles

| Term | Definition |
|------|-----------|
| Walk | Sequence of vertices connected by edges (repeats allowed) |
| Path | Walk with no repeated vertices |
| Cycle | Path that starts and ends at the same vertex |
| Connected | Path exists between every pair of vertices |
| Connected component | Maximal connected subgraph |

## Trees

A **tree** is a connected graph with no cycles.

| Property | Equivalent statements (for $n$-vertex graph) |
|----------|---------------------------------------------|
| Tree | Connected and acyclic |
| Tree | Connected with exactly $n-1$ edges |
| Tree | Acyclic with exactly $n-1$ edges |
| Tree | Unique path between every pair of vertices |

| Term | Definition |
|------|-----------|
| Leaf | Vertex of degree 1 |
| Spanning tree | Subgraph that is a tree and includes all vertices |
| Rooted tree | Tree with a designated root vertex |

## Euler Paths & Circuits

| Type | Condition |
|------|-----------|
| Euler circuit (visits every **edge** exactly once, returns to start) | Every vertex has even degree |
| Euler path (visits every edge exactly once) | Exactly 0 or 2 vertices have odd degree |

> For directed graphs: Euler circuit exists iff in-degree = out-degree for all vertices.

## Hamilton Paths & Circuits

| Type | Definition |
|------|-----------|
| Hamilton path | Visits every **vertex** exactly once |
| Hamilton circuit | Hamilton path that returns to start |

No simple necessary-and-sufficient condition exists. Useful theorems:

| Theorem | Statement |
|---------|-----------|
| Dirac | If $\deg(v) \geq n/2$ for all $v$, then Hamiltonian circuit exists |
| Ore | If $\deg(u) + \deg(v) \geq n$ for all non-adjacent $u, v$, then Hamiltonian |

## Graph Colouring

A **proper $k$-colouring** assigns colours to vertices so no adjacent vertices share a colour.

| Term | Definition |
|------|-----------|
| Chromatic number $\chi(G)$ | Minimum $k$ for a proper $k$-colouring |
| $\chi(K_n)$ | $n$ |
| $\chi(\text{bipartite})$ | 2 (if non-empty) |
| $\chi(\text{cycle } C_n)$ | 2 if $n$ even, 3 if $n$ odd |
| $\chi(\text{tree})$ | 2 (if $|V| \geq 2$) |

### Bounds

$$\omega(G) \leq \chi(G) \leq \Delta(G) + 1$$

where $\omega(G)$ = clique number (largest complete subgraph), $\Delta(G)$ = maximum degree.

## Planar Graphs

A graph is **planar** if it can be drawn in the plane without edge crossings.

### Euler's Formula (for connected planar graphs)

$$V - E + F = 2$$

where $F$ = number of faces (including outer/unbounded face).

### Consequences

| Condition | Inequality |
|-----------|-----------|
| Simple planar ($V \geq 3$) | $E \leq 3V - 6$ |
| Triangle-free planar ($V \geq 3$) | $E \leq 2V - 4$ |

### Non-planar graphs

| Graph | Why non-planar |
|-------|---------------|
| $K_5$ | $E = 10 > 3(5) - 6 = 9$ |
| $K_{3,3}$ | $E = 9 > 2(6) - 4 = 8$ (triangle-free) |

**Kuratowski's Theorem:** $G$ is planar iff it contains no subdivision of $K_5$ or $K_{3,3}$.

## Representation

| Method | Space | Edge lookup | Best for |
|--------|-------|------------|----------|
| Adjacency matrix | $O(V^2)$ | $O(1)$ | Dense graphs |
| Adjacency list | $O(V + E)$ | $O(\deg)$ | Sparse graphs |
| Edge list | $O(E)$ | $O(E)$ | Simple iteration |

---

<details>
<summary><strong>Practice: Euler's Formula</strong></summary>

**Q:** A connected planar graph has 8 vertices and 12 edges. How many faces does it have?

**A:** $V - E + F = 2 \implies 8 - 12 + F = 2 \implies F = 6$.

</details>

<details>
<summary><strong>Practice: Euler Path/Circuit</strong></summary>

**Q:** Does the graph with degree sequence $(2, 2, 2, 3, 3)$ have an Euler circuit? An Euler path?

**A:**
- Euler circuit: No (vertices with odd degree exist -- two vertices have degree 3)
- Euler path: Yes (exactly 2 vertices have odd degree)

</details>

<details>
<summary><strong>Practice: Colouring</strong></summary>

**Q:** What is $\chi(C_7)$ (7-vertex cycle)?

**A:** $C_7$ is an odd cycle, so $\chi(C_7) = 3$.

</details>
