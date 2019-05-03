// tslint:disable: no-shadowed-variable
import { compose, identity } from "fp-ts/lib/function"
import { none, Option, some } from "fp-ts/lib/Option"
import { delay, Task } from "fp-ts/lib/Task"

/// Up until now we've bee dealing with pure functions, that is functions of type:
type Pure<A, B> = (a: A) => B

/// What about computations with side effects (effectful computations)?

// What is an effectful computation?
/// It is a function with the following signature
type Effectful<I, B> = (i: I) => F<B>

/// It takes an input of type I and produces a result of type B along with an effect F.

// Examples of effects that F might represent:
// - a computation that might fail: F<B> = Option<B>
// - an asynchronous computation: F<B> = Task<B>

/// Another particular case involves composing an effectul function with a pure function.
declare const f: (i: I) => F<B>
declare const g: (b: B) => C

/// since types don't align, we need a way to transform g so that it can be applyed under the effect F.
/// the usual term for this operation if lift, which itself can be represented by the function:
declare const lift: <A, B>(f: (a: A) => B) => ((fa: F<A>) => F<B>)
// with lift we can compose: lift(g) ∘ f
const h = compose(lift(g), f)

/// this operation is independent of the function being transformed and is only concerned with the effect F.
// Examples of lift for the above mentioned effects:
// F = Option
const liftOption: <A, B>(f: (a: A) => B) => ((fa: Option<A>) => Option<B>) =
  f => (fa => fa.isNone() ? none : some(f(fa.value)))

// F = Task
const liftTask: <A, B>(f: (a: A) => B) => ((fa: Task<A>) => Task<B>) =
  f => (fa => new Task(() => fa.run().then(a => f(a))))

// F = Array
const map: <A, B>(f: (a: A) => B) => (fa: A[]) => B[] = f => fa => {
  const recurs = ([car, ...cdr]: typeof fa): Array<ReturnType<typeof f>> =>
    cdr.length === 0 ? [f(car)] : [f(car), ...recurs(cdr)]
  return recurs(fa)
}

/// lets check if with lift in our toolbelt we can perform the composition

// F = Option
const divide10by: (d: number) => Option<number> = d => d === 0 ? none : some(10 / d)
const square: (n: number) => number = n => n * n
const divisionSquared: (n: number) => Option<number> = compose(liftOption(square), divide10by)

// F = Task
const numberAfter1Sec: (n: number) => Task<number> = n => delay(1000, n)
const delayedSquare: (n: number) => Task<number> = compose(liftTask(square), numberAfter1Sec)

// It works!

/// the pattern that we followed here can be generalised
/// if for some effect F we can create a lift operation with the above signature
/// and this function obeys some basic mathematical properties (which can be 'proven' using pbt), then

// The pair (F, lift) is called a Functor

// lift is probably more well known by its equivalent: map
const mapOption: <A, B>(fa: Option<A>, f: (a: A) => B) => Option<B> =
 (fa, f) => liftOption(f)(fa)
const mapTask: <A, B>(fa: Task<A>, f: (a: A) => B) => Task<B> =
 (fa, f) => liftTask(f)(fa)

/// For some well known types (Option, Task, Array, Either, etc.) fp-ts already supplies a functor instance
/// with lift, map and also a method version of map.

// we can implement the above examples using their map equivalent
const divisionSquared1: (n: number) => Option<number> = n => mapOption(divide10by(n), square)
const delayedSquare1: (n: number) => Task<number> = n =>  mapTask(numberAfter1Sec(n), square)

// and also using their object method equivalent supplied by fp-ts:
const divisionSquared2: (n: number) => Option<number> = n => divide10by(n).map(square)
const delayedSquare2: (n: number) => Task<number> = n => numberAfter1Sec(n).map(square)

/// Although we haven't used Array, it also allows for a Functor instance using the traicional Array.map function
const range = (n: number) => [...Array(n).keys()]
const multipleSquares: (n: number) => number[] = n => range(n).map(square)

// APPLICATIVE // C = A<B>,
// f: A => A<B>
// g: B, C => D
// h: A, C => A<D> = liftAn(g) . f

// MONAD
// f: A => M<B>
// g: B => M<C>
// h: A => M<C> = flatMap(g) . f
