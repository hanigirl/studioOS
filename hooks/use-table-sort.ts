import { useState, useMemo } from "react"

export type SortDir = "asc" | "desc"

interface SortState<K extends string> {
  key: K | null
  dir: SortDir
}

/**
 * Generic table sort hook. Pass a map of comparator functions keyed by
 * column ID; the hook returns the sorted array plus state/toggle needed
 * to drive sort-indicator UI.
 *
 * Cycle: unsorted → asc → desc → unsorted (on repeated clicks of same key).
 * Clicking a new key resets to asc.
 */
export function useTableSort<T, K extends string>(
  items: T[],
  comparators: Record<K, (a: T, b: T) => number>
) {
  const [sort, setSort] = useState<SortState<K>>({ key: null, dir: "asc" })

  function toggle(key: K) {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "asc" }
      if (prev.dir === "asc") return { key, dir: "desc" }
      return { key: null, dir: "asc" }
    })
  }

  function set(key: K | null, dir: SortDir) {
    setSort({ key, dir })
  }

  const sorted = useMemo(() => {
    if (!sort.key) return items
    const cmp = comparators[sort.key]
    return [...items].sort((a, b) =>
      sort.dir === "asc" ? cmp(a, b) : -cmp(a, b)
    )
  }, [items, sort, comparators])

  return { sorted, sortKey: sort.key, sortDir: sort.dir, toggle, set }
}
