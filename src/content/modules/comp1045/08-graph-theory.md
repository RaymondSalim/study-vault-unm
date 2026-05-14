---
title: "Graph Theory"
order: 8
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["discrete-maths", "graph-theory", "trees", "euler", "hamilton", "colouring", "planar"]
---

# Graph Theory

## Basic Definitions

:::eli10

A graph is a collection of dots (vertices) connected by lines (edges). Think of a social network: people are the dots, and friendships are the lines connecting them. The degree of a vertex is how many connections it has. Graphs can be directed (arrows showing one-way relationships) or weighted (lines labelled with numbers like distances).

:::

:::eli15

A graph G = (V, E) consists of vertices (nodes) and edges (connections between them). Simple graphs have no self-loops or parallel edges. Directed graphs have one-way edges. Weighted graphs assign values to edges (costs, distances). The degree of a vertex is the number of edges connected to it. Two vertices are adjacent if an edge connects them. Graphs model networks, relationships, and many computational problems.

:::

:::eli20

| Term | Definition |
|------|-----------|
| Graph $G = (V, E)$ | Set of vertices $V$ and edges $E \subseteq V \times V$ |
| Simple graph | No self-loops, no multiple edges |
| Directed graph (digraph) | Edges have direction |
| Weighted graph | Edges have associated weights |
| Degree $\deg(v)$ | Number of edges incident to $v$ |
| Adjacent | Two vertices connected by an edge |

:::

## Handshaking Lemma

:::eli10

The handshaking lemma says that if you add up everyone's number of connections, you always get twice the number of edges. That makes sense: every edge connects two vertices, so it gets counted twice. A consequence is that the number of vertices with an odd number of connections is always even.

:::

:::eli15

The handshaking lemma states that the sum of all vertex degrees equals twice the number of edges (since each edge contributes 1 to the degree of each of its endpoints). An important corollary: the number of odd-degree vertices must be even. This is useful for proving whether certain graph configurations are possible or for verifying computations.

:::

:::eli20

$$\sum_{v \in V} \deg(v) = 2|E|$$

> Consequence: number of odd-degree vertices is always even.

:::

## Types of Graphs

:::eli10

Special graphs have specific structures. A complete graph connects every vertex to every other vertex. A bipartite graph splits vertices into two teams where edges only go between teams, never within a team. A regular graph gives every vertex the same number of connections.

:::

:::eli15

Important graph families include: complete graphs K_n (every pair connected, with n(n-1)/2 edges), bipartite graphs (vertices split into two sets with edges only between sets -- useful for matching problems), complete bipartite K_{m,n}, regular graphs (all vertices same degree), and complements (the "opposite" graph with edges where there were none). Subgraphs are graphs contained within larger graphs.

:::

:::eli20

| Graph | Definition |
|-------|-----------|
| Complete $K_n$ | Every pair of vertices connected; $|E| = \binom{n}{2}$ |
| Bipartite | Vertices split into two sets; edges only between sets |
| Complete bipartite $K_{m,n}$ | Every vertex in one set connects to all in the other |
| Regular ($k$-regular) | Every vertex has degree $k$ |
| Subgraph | Subset of vertices and edges of $G$ |
| Complement $\bar{G}$ | Has edge $(u,v)$ iff $G$ does not |

:::

## Paths and Cycles

:::eli10

A path is a route through a graph visiting vertices without repeating any. A cycle is a path that comes back to where it started. A graph is connected if you can get from any vertex to any other by following edges.

:::

:::eli15

A walk is any sequence of edges (can revisit vertices). A path is a walk with no repeated vertices. A cycle is a path that returns to its starting vertex. A graph is connected if a path exists between every pair of vertices. If not connected, it breaks into connected components (maximal connected subgraphs). These concepts are fundamental to routing, reachability, and network analysis.

:::

:::eli20

| Term | Definition |
|------|-----------|
| Walk | Sequence of vertices connected by edges (repeats allowed) |
| Path | Walk with no repeated vertices |
| Cycle | Path that starts and ends at the same vertex |
| Connected | Path exists between every pair of vertices |
| Connected component | Maximal connected subgraph |

:::

## Trees

:::eli10

A tree is a connected graph with no cycles -- like a family tree or a file system's folder structure. A tree with n vertices always has exactly n-1 edges. There is always exactly one path between any two vertices in a tree.

:::

:::eli15

A tree is a connected acyclic graph -- a minimal connected graph. Key equivalences: a tree on n vertices has exactly n-1 edges, has a unique path between every pair of vertices, and adding any edge creates exactly one cycle. Leaves are degree-1 vertices. Spanning trees are subgraphs that include all vertices and are trees. Rooted trees have a designated root vertex, creating parent-child relationships useful in computer science (binary trees, file systems, etc.).

:::

:::eli20

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

:::

## Euler Paths & Circuits

:::eli10

An Euler path visits every EDGE exactly once (like tracing a drawing without lifting your pencil). An Euler circuit does this and returns to the start. The trick: a circuit exists only if every vertex has an even degree; a path exists only if exactly 0 or 2 vertices have odd degree.

:::

:::eli15

Euler paths traverse every edge exactly once. An Euler circuit (closed path) exists if and only if every vertex has even degree. An Euler path (open, start and end differ) exists if and only if exactly two vertices have odd degree (those are the endpoints). This gives a simple way to check existence without searching. For directed graphs: an Euler circuit exists when in-degree equals out-degree for every vertex.

:::

:::eli20

| Type | Condition |
|------|-----------|
| Euler circuit (visits every **edge** exactly once, returns to start) | Every vertex has even degree |
| Euler path (visits every edge exactly once) | Exactly 0 or 2 vertices have odd degree |

> For directed graphs: Euler circuit exists iff in-degree = out-degree for all vertices.

:::

## Hamilton Paths & Circuits

:::eli10

A Hamilton path visits every VERTEX exactly once (unlike Euler which visits every edge). There is no simple rule to check if one exists -- it is one of the hard problems in computer science. But some helpful theorems say: if every vertex has enough connections, a Hamilton circuit must exist.

:::

:::eli15

Hamilton paths visit every vertex exactly once. Unlike Euler paths, there is no simple necessary-and-sufficient condition for existence (it is NP-complete to determine). However, sufficient conditions exist: Dirac's theorem guarantees a Hamiltonian circuit if every vertex has degree >= n/2, and Ore's theorem guarantees it if the sum of degrees of every pair of non-adjacent vertices is >= n. These give quick confirmations but cannot prove non-existence.

:::

:::eli20

| Type | Definition |
|------|-----------|
| Hamilton path | Visits every **vertex** exactly once |
| Hamilton circuit | Hamilton path that returns to start |

No simple necessary-and-sufficient condition exists. Useful theorems:

| Theorem | Statement |
|---------|-----------|
| Dirac | If $\deg(v) \geq n/2$ for all $v$, then Hamiltonian circuit exists |
| Ore | If $\deg(u) + \deg(v) \geq n$ for all non-adjacent $u, v$, then Hamiltonian |

:::

## Graph Colouring

:::eli10

Graph colouring assigns colours to vertices so that no two connected vertices share a colour. The chromatic number is the minimum colours needed. A complete graph on n vertices needs n colours. A bipartite graph only needs 2. Real-world uses include scheduling and map colouring.

:::

:::eli15

A proper k-colouring assigns k colours to vertices such that no adjacent vertices share a colour. The chromatic number chi(G) is the minimum k needed. Known results: chi(K_n) = n (complete graph needs maximum colours), chi(bipartite) = 2, chi(odd cycle) = 3, chi(tree) = 2. Bounds: the clique number (largest complete subgraph) is a lower bound, and maximum degree + 1 is an upper bound. Graph colouring models scheduling, register allocation, and frequency assignment.

:::

:::eli20

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

:::

## Planar Graphs

:::eli10

A planar graph can be drawn on paper without any edges crossing. Euler's formula connects vertices (V), edges (E), and faces (F) of a planar drawing: V - E + F = 2. Some graphs (like K5 and K3,3) are proven to be non-planar because they have too many edges.

:::

:::eli15

A planar graph can be drawn in the plane without edge crossings. Euler's formula for connected planar graphs states V - E + F = 2 (where F includes the outer face). This gives useful inequalities: E <= 3V - 6 for any simple planar graph, and E <= 2V - 4 for triangle-free planar graphs. K5 and K3,3 are the fundamental non-planar graphs -- by Kuratowski's theorem, a graph is planar if and only if it contains no subdivision of either.

:::

:::eli20

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

:::

## Representation

:::eli10

Graphs can be stored in a computer in different ways. An adjacency matrix is a grid where each cell says whether two vertices are connected (good for dense graphs). An adjacency list stores a list of neighbours for each vertex (good for sparse graphs with few connections).

:::

:::eli15

Graphs are stored using data structures chosen for the graph's properties. An adjacency matrix uses O(V^2) space but gives O(1) edge lookups -- best for dense graphs. An adjacency list uses O(V + E) space with O(degree) edge lookup -- best for sparse graphs. An edge list simply stores all edges -- simple but slow for lookups. The choice depends on the graph's density and the operations you need to perform frequently.

:::

:::eli20

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

:::
