---
title: "Searching & Sorting Algorithms"
order: 7
moduleTitle: "COMP1028 - Programming & Algorithms"
tags: ["java", "algorithms", "searching", "sorting", "complexity", "binary-search", "merge-sort", "quicksort"]
---

# Searching & Sorting Algorithms

## Complexity Summary

:::eli10

Different search and sort methods have different speeds. Linear search checks every item one by one (slow for big lists). Binary search cuts the list in half each time (much faster, but list must be sorted). Simple sorts like bubble sort compare neighbors and swap them, which is slow. Fast sorts like merge sort split the list, sort the halves, and combine them back together.

:::

:::eli15

Algorithm efficiency is measured in Big-O notation. Searching: linear search is O(n) -- checks every element; binary search is O(log n) -- halves the search space each step but requires sorted data. Sorting: simple sorts (bubble, insertion, selection) are O(n^2) -- fine for small data; efficient sorts (merge sort, quicksort) are O(n log n) on average. The "stable" property means equal elements keep their original relative order.

:::

:::eli20

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| Linear Search | O(1) | O(n) | O(n) | O(1) | - |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) | - |
| Bubble Sort | O(n) | O(n^2) | O(n^2) | O(1) | Yes |
| Insertion Sort | O(n) | O(n^2) | O(n^2) | O(1) | Yes |
| Selection Sort | O(n^2) | O(n^2) | O(n^2) | O(1) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quicksort | O(n log n) | O(n log n) | O(n^2) | O(log n) | No |

> **Stable** = preserves relative order of equal elements.

:::

---

## Searching

:::eli10

Linear search is like looking through a pile of papers one by one until you find what you want. Binary search is like looking up a word in a dictionary -- you open to the middle, check if your word comes before or after, and repeat in the right half. Much faster, but the dictionary must be sorted alphabetically.

:::

:::eli15

Linear search works on any data by checking each element sequentially -- O(n) time. Binary search only works on sorted data but is dramatically faster at O(log n) -- it eliminates half the remaining elements with each comparison. For 1 million elements, binary search needs at most 20 comparisons vs. up to 1 million for linear search.

:::

:::eli20

### Linear Search

Checks each element sequentially. Works on unsorted data.

```java
public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;  // not found
}
```

**Time:** O(n) | **Space:** O(1)

### Binary Search

Requires a **sorted** array. Halves the search space each step.

```java
// Iterative
public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;   // avoids integer overflow

        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;  // not found
}
```

```java
// Recursive
public static int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target)
        return binarySearch(arr, target, mid + 1, high);
    else
        return binarySearch(arr, target, low, mid - 1);
}
```

**Time:** O(log n) | **Space:** O(1) iterative, O(log n) recursive

#### Binary Search Trace

Array: `[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]`, target: `23`

| Step | low | high | mid | arr[mid] | Action |
|------|-----|------|-----|----------|--------|
| 1 | 0 | 9 | 4 | 16 | 16 < 23, low = 5 |
| 2 | 5 | 9 | 7 | 56 | 56 > 23, high = 6 |
| 3 | 5 | 6 | 5 | 23 | Found at index 5 |

:::

---

## Sorting

:::eli10

Sorting is putting things in order. Bubble sort is like bubbling the biggest item to the end over and over. Insertion sort is like sorting cards in your hand -- you pick up one at a time and slide it into the right spot. Merge sort is like splitting a deck in half, sorting each half separately, then merging them back together.

:::

:::eli15

Sorting algorithms vary in speed, memory use, and stability. Simple O(n^2) sorts: Bubble sort swaps adjacent out-of-order elements (good for nearly-sorted data); Insertion sort builds a sorted portion one element at a time (fastest simple sort in practice); Selection sort finds the minimum each pass (always O(n^2)). Efficient O(n log n) sorts: Merge sort divides and merges (guaranteed fast, but needs extra memory); Quicksort partitions around a pivot (fastest on average, in-place, but O(n^2) worst case).

:::

:::eli20

### Bubble Sort

Repeatedly swaps adjacent elements that are out of order.

```java
public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;    // optimisation: already sorted
    }
}
```

**Key insight:** After each pass, the largest unsorted element "bubbles" to its correct position. The `swapped` flag gives O(n) best case on already-sorted input.

### Insertion Sort

Builds sorted portion one element at a time (like sorting cards in hand).

```java
public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;

        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

**Key insight:** Efficient on small or nearly-sorted arrays. Best case O(n) when array is already sorted.

### Selection Sort

Finds minimum in unsorted portion, places it at the front.

```java
public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        // Swap
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}
```

**Key insight:** Always O(n^2) regardless of input. Minimises swaps (at most n-1).

### Merge Sort

Divide-and-conquer: split, sort halves, merge.

```java
public static void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;          // base case: 0 or 1 elements

    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);          // sort left half
    mergeSort(arr, mid + 1, right);     // sort right half
    merge(arr, left, mid, right);       // merge sorted halves
}

private static void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }

    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    System.arraycopy(temp, 0, arr, left, temp.length);
}

// Call: mergeSort(arr, 0, arr.length - 1)
```

**Key insight:** Always O(n log n) but requires O(n) extra space. Stable sort.

#### Merge Sort Trace

```
[38, 27, 43, 3, 9, 82, 10]
         Split
[38, 27, 43, 3]  |  [9, 82, 10]
    Split              Split
[38, 27] [43, 3]   [9, 82] [10]
  Split    Split     Split
[38][27] [43][3]  [9][82] [10]
  Merge    Merge    Merge
[27, 38] [3, 43]  [9, 82] [10]
    Merge              Merge
[3, 27, 38, 43]   [9, 10, 82]
         Merge
[3, 9, 10, 27, 38, 43, 82]
```

### Quicksort

Divide-and-conquer with a pivot element.

```java
public static void quickSort(int[] arr, int low, int high) {
    if (low >= high) return;

    int pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);    // sort left of pivot
    quickSort(arr, pivotIndex + 1, high);   // sort right of pivot
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];      // choose last element as pivot
    int i = low - 1;           // boundary of "less than pivot" region

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    // Place pivot in correct position
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}

// Call: quickSort(arr, 0, arr.length - 1)
```

**Key insight:** Average O(n log n), worst O(n^2) when pivot is always min/max (e.g., already sorted + last element pivot). In-place but not stable.

:::

---

## Choosing an Algorithm

:::eli10

Use insertion sort for small lists (fewer than 20 items) or nearly-sorted data. Use merge sort when you need a guarantee of speed. Use binary search when your data is already sorted and you need to find something fast.

:::

:::eli15

Algorithm choice depends on context: small arrays (n < 20) favor insertion sort due to low overhead. Nearly-sorted data also benefits from insertion sort (O(n) best case). When guaranteed O(n log n) is needed, use merge sort. Quicksort is often fastest in practice due to cache efficiency. For searching, always prefer binary search on sorted data (O(log n)) over linear search (O(n)).

:::

:::eli20

| Scenario | Best Choice | Why |
|----------|-------------|-----|
| Small array (n < 20) | Insertion sort | Low overhead, fast on small inputs |
| Nearly sorted | Insertion sort | O(n) best case |
| Guaranteed O(n log n) | Merge sort | No worst-case degradation |
| Average fastest in-place | Quicksort | Good cache performance, low space |
| Stability required | Merge sort or Insertion sort | Preserves equal-element order |
| Searching sorted data | Binary search | O(log n) |
| Searching unsorted data | Linear search | Only option without sorting first |

---

<details>
<summary><strong>Practice: How many comparisons does binary search need for an array of 1,000,000 elements?</strong></summary>

**Answer:** At most ceil(log2(1,000,000)) = 20 comparisons. Each step halves the search space: 1M -> 500K -> 250K -> ... -> 1.

</details>

<details>
<summary><strong>Practice: Trace bubble sort on [5, 3, 8, 1]</strong></summary>

**Pass 1:** Compare adjacent pairs
- [5,3,8,1] -> [3,5,8,1] (swap 5,3)
- [3,5,8,1] -> [3,5,8,1] (no swap)
- [3,5,8,1] -> [3,5,1,8] (swap 8,1)

**Pass 2:**
- [3,5,1,8] -> [3,5,1,8] (no swap)
- [3,5,1,8] -> [3,1,5,8] (swap 5,1)

**Pass 3:**
- [3,1,5,8] -> [1,3,5,8] (swap 3,1)

**Result:** [1, 3, 5, 8]

</details>

<details>
<summary><strong>Practice: What is the output of partitioning [3, 7, 2, 5, 1, 4] with pivot = 4 (last element)?</strong></summary>

Walk through with i = -1, j scanning from index 0:
- j=0: 3 <= 4, i=0, swap arr[0] with arr[0] -> [3,7,2,5,1,4]
- j=1: 7 > 4, skip
- j=2: 2 <= 4, i=1, swap arr[1] with arr[2] -> [3,2,7,5,1,4]
- j=3: 5 > 4, skip
- j=4: 1 <= 4, i=2, swap arr[2] with arr[4] -> [3,2,1,5,7,4]

Place pivot: swap arr[3] with arr[5] -> [3,2,1,4,7,5]

**Result:** `[3, 2, 1, 4, 7, 5]` with pivot 4 at index 3.

</details>

<details>
<summary><strong>Practice: When does quicksort hit O(n^2)?</strong></summary>

**Answer:** When the pivot is always the smallest or largest element, creating maximally unbalanced partitions. This happens with:
- Already sorted array + first/last element as pivot
- All elements equal

Fix: use median-of-three pivot selection or randomised pivot.

</details>

:::
