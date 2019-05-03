import { compose } from "fp-ts/lib/function"

// But there are special cases we can tackle!

// when B = C
declare const f: (a: I) => B
declare const g: (b: B) => R
// this is regular function composition: g ∘ f
const h: (a: I) => R = compose(g, f)

// Example:
const length: (s: string) => number = s => s.length
const isEven: (n: number) => boolean = n => n % 2 === 0
const hasEvenLength: (s: string) => boolean = compose(isEven, length)
