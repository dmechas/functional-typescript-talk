import { compose } from "fp-ts/lib/function"
import { lift } from "fp-ts/lib/Functor"
import { none, Option, option, some } from "fp-ts/lib/Option"

const square = (n: number) => n * n
const divide10by = (d: number) => (d === 0 ? none : some(10 / d))

const liftOption2 = <A, B>(f: (a: A) => B) => (fa: Option<A>) => (fa.isNone() ? none : some(f(fa.value)))
const divisionSquared2 = compose(
  liftOption2(square),
  divide10by,
)

const liftOption = lift(option)
const divisionSquared = compose(
  liftOption(square),
  divide10by,
  )
