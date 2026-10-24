export interface Rng {
  /** float in [0, 1) */
  next(): number
  /** integer in [lo, hi] inclusive */
  int(lo: number, hi: number): number
  /** pick a random element */
  pick<T>(arr: T[]): T
  /** true with probability p (0–1) */
  chance(p: number): boolean
  /** -1 or 1 */
  sign(): 1 | -1
  /** shuffled copy of the array */
  shuffle<T>(arr: T[]): T[]
}

/** FNV-1a string hash → uint32 seed. */
export function hashSeed(str: string): number
/** Deterministic PRNG — same seed, same sequence. */
export function rng(seed: number | string): Rng
/** Same seed for everyone on the same UTC day. */
export function dailySeed(date?: Date, suffix?: string): number
