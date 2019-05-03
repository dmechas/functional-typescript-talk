import { lift } from "fp-ts/lib/Functor"

// Imperative style: favours inlining and mutability
function getPositivesImperative(arr: number[]) {
  const result: number[] = []

  for (const n of arr) {
    if (n > 0) {
      result.push(n)
    }
  }
  return result
}

// Declarative style: favours composition and immutability
const isPositive = (n: number) => n > 0
const getPositivesDeclarative = (arr: number[]) => arr.filter(isPositive)
