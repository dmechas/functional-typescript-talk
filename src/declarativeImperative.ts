function getPositivesDeclarative(arr: number[]) {
  return arr.filter(a => a > 0)
}

function getPositivesImperative(arr: number[]) {
  const result: number[] = []

  for (const elm of arr) {
    if (elm > 0) {
      result.push(elm)
    }
  }
  return result
}
