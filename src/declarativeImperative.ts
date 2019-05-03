import { lift } from "fp-ts/lib/Functor"

// Imperative style: favours inlining and mutability
function getPositivesImperative(ns: number[]) {
  const positive: number[] = []

  for (const n of ns) {
    if (n > 0) {
      positive.push(n)
    }
  }
  return positive
}

// Declarative style: favours composition and immutability
const isPositive = (n: number) => n > 0
const getPositivesDeclarative = (ns: number[]) => ns.filter(isPositive)
