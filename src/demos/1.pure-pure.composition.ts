import { compose } from "fp-ts/lib/function"

const len: (s: string) => number = s => s.length
const isEven: (n: number) => boolean = n => n % 2 === 0

const hasEvenLength = compose(isEven, len)
