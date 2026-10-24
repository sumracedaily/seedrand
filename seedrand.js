// seedrand — tiny seeded randomness for games and daily puzzles.
// Deterministic: same seed, same sequence, everywhere. No dependencies.

// FNV-1a string hash → uint32 seed
export function hashSeed(str) {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

// mulberry32 — fast, good-enough PRNG for games
export function rng(seed) {
  let a = typeof seed === "string" ? hashSeed(seed) : seed >>> 0
  const next = () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return {
    next, // float in [0, 1)
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)), // inclusive
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    chance: (p) => next() < p, // true with probability p
    sign: () => (next() < 0.5 ? -1 : 1),
    shuffle(arr) {
      const a = arr.slice()
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    },
  }
}

// Same seed for everyone on the same UTC day — the daily-puzzle primitive.
// dailySeed()                    → today's seed (UTC)
// dailySeed(new Date(...))       → seed for that day
// dailySeed(date, "kakuro-7")    → per-puzzle seed for that day
export function dailySeed(date = new Date(), suffix = "") {
  const d = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`
  return hashSeed(suffix ? `${d}:${suffix}` : d)
}
