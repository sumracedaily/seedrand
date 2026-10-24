# seedrand

Tiny seeded randomness for games and daily puzzles — ~60 lines, zero dependencies, ESM + TypeScript types.

Same seed, same sequence, everywhere. `dailySeed()` gives everyone on Earth the same seed for the same UTC day — the primitive behind "today's puzzle".

## Use

```js
import { rng, dailySeed } from "./seedrand.js"

const r = rng(dailySeed())          // today's stream, same for every player
r.next()                            // float in [0, 1)
r.int(1, 99)                        // inclusive integer
r.pick(["🥕", "🍅", "🎃"])           // random element
r.chance(0.25)                      // true 25% of the time
r.shuffle(deck)                     // shuffled copy

rng("kakuro-7")                     // string seeds work (FNV-1a hash)
dailySeed(date, "number-pyramid")   // per-puzzle daily seeds
```

Open `demo/index.html` to see today's stream.

## License

MIT
