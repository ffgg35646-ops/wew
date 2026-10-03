const PREFIX = "maidora:cache:"

export function readClientCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null

  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function writeClientCache<T>(key: string, value: T): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable or full; the network response still works.
  }
}
