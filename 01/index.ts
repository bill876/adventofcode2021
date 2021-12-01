import input from './myInput'

/**
 * Counts how many times the next number in the array is greater than the previous.
 */
function part1(arr: number[]): number {
  const pairs = makePairs(arr)
  return countIncrease(pairs)
}

function part2(arr: number[]): number {
  const triplets = makeTriplets(cleanedInput)
  const tripletSums = triplets.map(sum)
  return part1(tripletSums)
}

function cleanInput(input: string): number[] {
  return input
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(Number)
}

function makePairs(arr: any[]): any[][] {
  const pairs = []
  for (let i = 1; i < arr.length; i += 1) {
    pairs.push([arr[i-1], arr[i]])
  }

  return pairs
}

function sum(arr: number[]): number {
  return arr.reduce((acc, n) => acc + n, 0)
}

function makeTriplets(arr: any[]): any[][] {
  const triplets = []
  for (let i = 2; i < arr.length; i += 1) {
    triplets.push([arr[i-2], arr[i-1], arr[i]])
  }

  return triplets
}

function countIncrease(sumPairs: number[][]): number {
  return sumPairs
    .map(([a, b]) => b - a)
    .filter(d => d > 0)
    .length
}

const cleanedInput = cleanInput(input)
const part1Output = part1(cleanedInput)
console.log("part 1:", part1Output)
const part2Output = part2(cleanedInput)
console.log("part 2:", part2Output)
