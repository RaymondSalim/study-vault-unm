---
title: "Graphs"
order: 8
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["graphs", "bfs", "dfs", "shortest-path", "mst", "topological-sort"]
---

## Graph Terminology

:::eli10

A graph is like a map of cities and roads. The cities are "vertices" (or nodes) and the roads are "edges." Some roads are one-way (directed), some have distance markers (weighted), and some maps have loops. Graphs show up everywhere — social networks, road maps, the internet, even family trees.

:::

:::eli15

A **graph** $G = (V, E)$ consists of vertices (nodes) and edges (connections between nodes). Key properties:

- **Directed vs Undirected**: Whether edges have a one-way direction
- **Weighted vs Unweighted**: Whether edges have associated costs
- **Sparse vs Dense**: Few edges vs close to the maximum possible
- **Connected**: Every vertex is reachable from every other
- **DAG** (Directed Acyclic Graph): Directed with no cycles — important for scheduling and dependency problems

Maximum edges: $|V|(|V|-1)/2$ for undirected, $|V|(|V|-1)$ for directed.

:::

:::eli20

| Term | Definition |
|------|-----------|
| Graph $G = (V, E)$ | Set of vertices $V$ and edges $E$ |
| Directed (digraph) | Edges have direction: $(u, v) \neq (v, u)$ |
| Undirected | Edges have no direction: $\{u, v\}$ |
| Weighted | Edges have associated costs/weights |
| Adjacent | Two vertices connected by an edge |
| Degree | Number of edges incident to a vertex |
| In-degree / Out-degree | Incoming / outgoing edges (directed) |
| Path | Sequence of vertices connected by edges |
| Cycle | Path that starts and ends at same vertex |
| Connected | Path exists between every pair of vertices |
| DAG | Directed Acyclic Graph |
| Sparse | $|E| \ll |V|^2$ |
| Dense | $|E| \approx |V|^2$ |

### Edge Counts

| Graph Type | Max Edges |
|-----------|-----------|
| Undirected | $\frac{|V|(|V|-1)}{2}$ |
| Directed | $|V|(|V|-1)$ |
| Tree | $|V| - 1$ |

:::

## Representations

:::eli10

There are two main ways to store a graph in a computer. An **adjacency matrix** is a grid where you mark "yes" or "no" for each possible connection — fast to check but uses lots of memory. An **adjacency list** is like each city keeping a list of which other cities it connects to — uses less memory and is better for most algorithms.

:::

:::eli15

Two standard graph representations:

- **Adjacency Matrix**: A 2D array where entry $[i][j]$ indicates whether there's an edge from $i$ to $j$. Space: $O(V^2)$. Edge lookup: $O(1)$. Best for dense graphs.
- **Adjacency List**: Each vertex stores a list of its neighbours. Space: $O(V + E)$. Iterating neighbours: $O(\text{degree})$. Best for sparse graphs and most algorithms (BFS, DFS, Dijkstra, etc.).

Most real-world graphs are sparse (social networks, road maps), so adjacency lists are the default choice.

:::

:::eli20

| Representation | Space | Edge Query | All Neighbours | Add Edge |
|---------------|-------|-----------|----------------|----------|
| Adjacency Matrix | $O(V^2)$ | $O(1)$ | $O(V)$ | $O(1)$ |
| Adjacency List | $O(V + E)$ | $O(\deg(v))$ | $O(\deg(v))$ | $O(1)$ |

### When to Use

| Scenario | Best Choice |
|----------|-------------|
| Dense graph | Adjacency matrix |
| Sparse graph | Adjacency list |
| Need fast edge lookup | Matrix |
| Memory constrained | List |
| Most algorithms | List |

### Adjacency Matrix

```
    A  B  C  D
A [ 0, 1, 1, 0 ]
B [ 1, 0, 0, 1 ]
C [ 1, 0, 0, 1 ]
D [ 0, 1, 1, 0 ]
```

### Adjacency List

```
A -> [B, C]
B -> [A, D]
C -> [A, D]
D -> [B, C]
```

:::

## Breadth-First Search (BFS)

:::eli10

BFS is like dropping a stone in a pond — the ripples spread outward evenly. You visit all your immediate neighbors first, then their neighbors, and so on. It uses a queue (first-in, first-out line). BFS always finds the shortest path in an unweighted graph because it explores everything at distance 1 before distance 2.

:::

:::eli15

**BFS** explores a graph level by level using a queue:

1. Start at the source; mark it visited, distance 0
2. Visit all neighbors (distance 1), add them to the queue
3. For each queued vertex, visit its unvisited neighbors (distance 2), and so on

Key properties:
- Time: $O(V + E)$ — visits every vertex and edge once
- Finds shortest paths in unweighted graphs (fewest edges)
- Applications: shortest path, connected components, bipartiteness check, level-order traversal

:::

:::eli20

Explores all vertices at distance $d$ before distance $d+1$. Uses a **queue**.

```
BFS(G, source):
    for each v in V:
        v.colour = WHITE
        v.dist = INF
        v.parent = null
    source.colour = GREY
    source.dist = 0
    Q = Queue([source])
    while Q not empty:
        u = Q.dequeue()
        for each v in adj[u]:
            if v.colour == WHITE:
                v.colour = GREY
                v.dist = u.dist + 1
                v.parent = u
                Q.enqueue(v)
        u.colour = BLACK
```

| Property | Value |
|----------|-------|
| Time | $O(V + E)$ |
| Space | $O(V)$ |
| Finds | Shortest path (unweighted) |
| Produces | BFS tree, distance from source |

### Applications

- Shortest path in unweighted graph
- Level-order traversal
- Connected components
- Bipartiteness check

:::

## Depth-First Search (DFS)

:::eli10

DFS is like exploring a maze by always taking the first path you see and going as deep as possible. When you hit a dead end, you backtrack to the last fork and try a different direction. It uses a stack (or recursion). DFS is great for detecting cycles and exploring all possible paths.

:::

:::eli15

**DFS** explores a graph by going as deep as possible before backtracking, using a stack (or recursion):

1. Start at a vertex, mark it as being explored (grey)
2. Recursively visit an unvisited neighbor, going deeper
3. When all neighbors are visited, mark the vertex as done (black) and backtrack

Key properties:
- Time: $O(V + E)$
- Assigns discovery and finish timestamps — useful for topological sort, cycle detection, and classifying edges
- A **back edge** (pointing to a grey/in-progress vertex) indicates a cycle

:::

:::eli20

Explores as deep as possible before backtracking. Uses a **stack** (or recursion).

```
DFS(G):
    for each v in V:
        v.colour = WHITE
        v.parent = null
    time = 0
    for each v in V:
        if v.colour == WHITE:
            DFS-Visit(v)

DFS-Visit(u):
    time += 1
    u.discover = time
    u.colour = GREY
    for each v in adj[u]:
        if v.colour == WHITE:
            v.parent = u
            DFS-Visit(v)
    u.colour = BLACK
    time += 1
    u.finish = time
```

| Property | Value |
|----------|-------|
| Time | $O(V + E)$ |
| Space | $O(V)$ |
| Produces | DFS forest, discovery/finish times |

### Edge Classification (Directed Graphs)

| Edge $(u, v)$ | Condition | Meaning |
|--------------|-----------|---------|
| Tree edge | $v$ is WHITE when discovered | Part of DFS tree |
| Back edge | $v$ is GREY | Indicates a **cycle** |
| Forward edge | $v$ is BLACK, $u.d < v.d$ | Ancestor to descendant (not tree) |
| Cross edge | $v$ is BLACK, $u.d > v.d$ | Between unrelated subtrees |

**Cycle detection**: A directed graph has a cycle $\iff$ DFS finds a back edge.

:::

## Topological Sort

:::eli10

Topological sort puts things in an order where everything you depend on comes first — like getting dressed (socks before shoes, underwear before pants). It only works when there are no circular dependencies (a DAG). The result is a valid "to-do list" order.

:::

:::eli15

A **topological sort** of a DAG produces a linear ordering where for every edge $(u, v)$, vertex $u$ appears before $v$. Used for:
- Task scheduling (do prerequisites first)
- Build systems (compile dependencies first)
- Course prerequisite ordering

Two approaches:
- **DFS-based**: Run DFS, output vertices in reverse finish-time order
- **Kahn's algorithm** (BFS-based): Repeatedly remove vertices with in-degree 0

Both run in $O(V + E)$. If the graph has a cycle, topological sort is impossible (Kahn's will detect this).

:::

:::eli20

Linear ordering of vertices in a DAG such that for every edge $(u, v)$, $u$ appears before $v$.

### DFS-based Algorithm

```
topologicalSort(G):
    Run DFS(G) to compute finish times
    Return vertices in reverse order of finish time
```

### Kahn's Algorithm (BFS-based)

```
kahnSort(G):
    Compute in-degree for all vertices
    Q = Queue(all vertices with in-degree 0)
    result = []
    while Q not empty:
        u = Q.dequeue()
        result.append(u)
        for each v in adj[u]:
            in-degree[v] -= 1
            if in-degree[v] == 0:
                Q.enqueue(v)
    if len(result) != |V|: "cycle exists"
    return result
```

| Property | Value |
|----------|-------|
| Time | $O(V + E)$ |
| Applications | Task scheduling, build systems, course prerequisites |

:::

## Dijkstra's Algorithm

:::eli10

Dijkstra's algorithm finds the shortest path from one city to all other cities on a weighted map. It works by always visiting the closest unvisited city next and updating distances to its neighbors. It's like a growing bubble that always expands toward the nearest edge. But it only works when there are no negative road lengths.

:::

:::eli15

**Dijkstra's algorithm** finds shortest paths from a single source in a graph with non-negative edge weights:

1. Set source distance to 0, all others to infinity
2. Use a min-priority queue; repeatedly extract the vertex with smallest distance
3. For each neighbor, check if going through the current vertex gives a shorter path ("relaxation")

Key points:
- Time: $O((V + E) \log V)$ with a binary heap
- **Requires non-negative weights** — if a negative edge exists, a finalised vertex's distance might actually be wrong
- Greedy approach: once extracted from the queue, a vertex's shortest distance is final

:::

:::eli20

Finds shortest paths from a single source in a graph with **non-negative** weights.

```
dijkstra(G, source):
    for each v in V:
        v.dist = INF
        v.parent = null
    source.dist = 0
    PQ = MinPriorityQueue(all vertices by dist)
    while PQ not empty:
        u = PQ.extractMin()
        for each v in adj[u]:
            if u.dist + w(u,v) < v.dist:
                v.dist = u.dist + w(u,v)
                v.parent = u
                PQ.decreaseKey(v, v.dist)
```

| Property | Value |
|----------|-------|
| Time (binary heap) | $O((V + E) \log V)$ |
| Time (Fibonacci heap) | $O(V \log V + E)$ |
| Time (array, no PQ) | $O(V^2)$ |
| Requirement | All edge weights $\geq 0$ |
| Type | Greedy |

### Why Non-Negative Weights?

Dijkstra assumes that once a vertex is extracted from PQ, its shortest distance is final. Negative edges can invalidate already-finalised distances.

:::

## Bellman-Ford Algorithm

:::eli10

Bellman-Ford is like Dijkstra's patient cousin. Instead of being clever about which vertex to check next, it just relaxes every single edge over and over ($V-1$ times). This makes it slower, but it can handle negative weights and can detect "negative cycles" — loops that let you decrease the cost forever.

:::

:::eli15

**Bellman-Ford** finds shortest paths from a single source and can handle negative edge weights:

1. Initialise all distances to infinity, source to 0
2. Repeat $V-1$ times: for every edge $(u, v, w)$, if $u.dist + w < v.dist$, update $v.dist$
3. Do one more pass: if any distance still decreases, there's a negative cycle

Why $V-1$ iterations? A shortest path can have at most $V-1$ edges; each iteration correctly computes paths with one more edge.

Time: $O(VE)$. Slower than Dijkstra, but necessary when negative weights exist.

:::

:::eli20

Handles graphs with **negative** edge weights. Detects negative cycles.

```
bellmanFord(G, source):
    for each v in V:
        v.dist = INF
    source.dist = 0
    for i = 1 to |V| - 1:       // relax all edges V-1 times
        for each edge (u, v, w) in E:
            if u.dist + w < v.dist:
                v.dist = u.dist + w
                v.parent = u
    // Check for negative cycles
    for each edge (u, v, w) in E:
        if u.dist + w < v.dist:
            return "negative cycle exists"
```

| Property | Value |
|----------|-------|
| Time | $O(VE)$ |
| Handles | Negative weights |
| Detects | Negative-weight cycles |
| Type | Dynamic programming |

:::

## Shortest Path Comparison

:::eli10

There are different algorithms for finding shortest paths depending on your situation: BFS for unweighted graphs, Dijkstra for positive weights (fast), Bellman-Ford for negative weights (slower but more powerful), and Floyd-Warshall for finding all-pairs shortest paths at once.

:::

:::eli15

Choose the right shortest-path algorithm based on your constraints:

| When to use | Algorithm |
|-------------|-----------|
| Unweighted graph | BFS — $O(V+E)$ |
| Non-negative weights, single source | Dijkstra — $O((V+E) \log V)$ |
| Negative weights possible | Bellman-Ford — $O(VE)$ |
| All-pairs shortest paths | Floyd-Warshall — $O(V^3)$ |
| DAG (no cycles) | Topological sort + relaxation — $O(V+E)$ |

:::

:::eli20

| Algorithm | Time | Negative Weights | Negative Cycles |
|-----------|------|-----------------|-----------------|
| BFS | $O(V+E)$ | N/A (unweighted) | N/A |
| Dijkstra (binary heap) | $O((V+E)\log V)$ | No | No |
| Bellman-Ford | $O(VE)$ | Yes | Detects |
| Floyd-Warshall | $O(V^3)$ | Yes | Detects |
| DAG relaxation | $O(V+E)$ | Yes | N/A (no cycles) |

:::

## Minimum Spanning Tree (MST)

:::eli10

An MST connects all cities with the cheapest possible total road cost, using exactly enough roads ($V-1$) so everyone is connected but there are no loops. Prim's algorithm grows the tree outward from one city (always adding the cheapest connection to a new city). Kruskal's sorts all roads by cost and adds the cheapest ones that don't create a loop.

:::

:::eli15

A **Minimum Spanning Tree** connects all vertices with minimum total edge weight (using exactly $V-1$ edges, no cycles).

Two classic algorithms:
- **Prim's**: Start from one vertex, repeatedly add the cheapest edge connecting the tree to a non-tree vertex. Like Dijkstra but tracks edge weight to tree instead of total distance. Time: $O((V+E) \log V)$.
- **Kruskal's**: Sort all edges by weight, add each edge if it doesn't create a cycle (checked with Union-Find). Time: $O(E \log E)$.

Both rely on the **cut property**: for any partition of the vertices into two groups, the lightest edge crossing the partition is in some MST.

:::

:::eli20

A spanning tree of minimum total edge weight connecting all vertices.

**Cut property**: For any cut of the graph, the lightest crossing edge is in some MST.

### Prim's Algorithm

Grows MST from a single vertex, always adding cheapest edge to tree.

```
prim(G, source):
    for each v in V:
        v.key = INF
        v.parent = null
    source.key = 0
    PQ = MinPriorityQueue(all vertices by key)
    while PQ not empty:
        u = PQ.extractMin()
        for each v in adj[u]:
            if v in PQ and w(u,v) < v.key:
                v.parent = u
                v.key = w(u,v)
                PQ.decreaseKey(v, v.key)
```

| Property | Value |
|----------|-------|
| Time (binary heap) | $O((V + E) \log V)$ |
| Time (array) | $O(V^2)$ |
| Best for | Dense graphs (with array) |
| Type | Greedy |

### Kruskal's Algorithm

Sort all edges by weight; add edges that don't create a cycle (using Union-Find).

```
kruskal(G):
    MST = []
    Sort edges by weight
    for each vertex v: makeSet(v)
    for each edge (u, v, w) in sorted order:
        if find(u) != find(v):
            MST.append((u, v, w))
            union(u, v)
    return MST
```

| Property | Value |
|----------|-------|
| Time | $O(E \log E)$ = $O(E \log V)$ |
| Data structure | Union-Find (disjoint sets) |
| Best for | Sparse graphs |
| Type | Greedy |

### MST Comparison

| | Prim's | Kruskal's |
|--|--------|-----------|
| Approach | Grow from vertex | Add cheapest edge globally |
| Data structure | Priority queue | Union-Find |
| Best for | Dense graphs | Sparse graphs |
| Time (binary heap) | $O((V+E)\log V)$ | $O(E \log V)$ |

<details>
<summary><strong>Practice: Dijkstra Trace</strong></summary>

Graph:
```
A --1-- B --2-- D
|       |       |
4       3       1
|       |       |
C --5-- E --2-- F
```

Source: A

| Step | Extracted | Updated Distances |
|------|-----------|-------------------|
| Init | - | A=0, B=$\infty$, C=$\infty$, D=$\infty$, E=$\infty$, F=$\infty$ |
| 1 | A (0) | B=1, C=4 |
| 2 | B (1) | D=3, E=4 |
| 3 | D (3) | F=4 |
| 4 | C (4) | E=4 (no improvement via C) |
| 5 | E (4) | F=4 (no improvement) |
| 6 | F (4) | done |

Shortest paths from A: A=0, B=1, C=4, D=3, E=4, F=4

</details>

<details>
<summary><strong>Practice: BFS vs DFS</strong></summary>

Graph:
```
    A
   / \
  B   C
 / \   \
D   E   F
```

**BFS from A**: A, B, C, D, E, F (level by level)

**DFS from A** (left first): A, B, D, E, C, F (deep then backtrack)

Key differences:
- BFS finds shortest path (unweighted)
- DFS uses less memory for deep graphs
- DFS detects cycles (back edges)
- BFS explores uniformly outward

</details>

<details>
<summary><strong>Practice: Kruskal's MST</strong></summary>

Edges (sorted): (A,B,1), (D,F,1), (A,C,2), (B,D,2), (E,F,2), (B,E,3), (C,E,5)

| Edge | Weight | Action | Components |
|------|--------|--------|-----------|
| (A,B) | 1 | Add | {A,B}, {C}, {D}, {E}, {F} |
| (D,F) | 1 | Add | {A,B}, {C}, {D,F}, {E} |
| (A,C) | 2 | Add | {A,B,C}, {D,F}, {E} |
| (B,D) | 2 | Add | {A,B,C,D,F}, {E} |
| (E,F) | 2 | Add | {A,B,C,D,E,F} |

MST edges: (A,B), (D,F), (A,C), (B,D), (E,F). Total weight = 8.

Stopped after 5 edges ($V-1 = 6-1 = 5$).

</details>

<details>
<summary><strong>Practice: Topological Sort</strong></summary>

DAG with edges: A->B, A->C, B->D, C->D, D->E

```mermaid
graph LR
    A --> B
    A --> C
    B --> D
    C --> D
    D --> E
```

Valid topological orderings:
- A, B, C, D, E
- A, C, B, D, E

Invalid: any order where D comes before B or C, or E before D.

</details>

:::
