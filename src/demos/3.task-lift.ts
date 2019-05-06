import { compose } from "fp-ts/lib/function"
import { lift } from "fp-ts/lib/Functor"
import { delay, Task, task } from "fp-ts/lib/Task"

const square = (n: number) => n * n
const numberAfter1Sec: (n: number) => Task<number> = n => delay(1000, n)

const liftTask2 = <A, B>(f: (a: A) => B) => (fa: Task<A>) => new Task(() => fa.run().then(a => f(a)))

const delayedSquare2: (n: number) => Task<number> =
  compose(liftTask2(square), numberAfter1Sec)

const liftTask = lift(task)

const delayedSquare: (n: number) => Task<number> =
  compose(liftTask(square), numberAfter1Sec)
