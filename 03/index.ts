import input from './myInput'

function cleanInput(input: string): string[][] {
  return input
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => s.split(""))
}

function mostCommonBit(arr: string[]): "0"|"1" {
  const zeroCount = arr
    .filter(s => s === "0")
    .length

  const oneCount = arr.length - zeroCount

  return zeroCount > oneCount ? "0" : "1"
}

function column(matrix: string[][], j: number): string[] {
  return matrix
    .map(s => s.slice(j, j+1)[0])
}

function part1(input: string[][]): number {
  const numberCount = input.length
  const numberLength = input[0].length

  let gammaBin = ""
  for (let j = 0; j < numberLength; j += 1) {
    const jthColumn = column(input, j)
    const mostCommon = mostCommonBit(jthColumn)
    gammaBin += mostCommon
  }

  const gammaRate = parseInt(gammaBin, 2)
  const epsilonRate = Math.pow(2, numberLength) - 1 - gammaRate
  return gammaRate * epsilonRate
}

function part2(input: string[][]): number {

  const filterStep = (rows: string[][], colIndex: number, targetValue: string) => {
    return rows.filter((row) => row.slice(colIndex, colIndex+1)[0] === targetValue)
  }
  let rows = [...input]
  let j = 0
  while (rows.length > 1) {
    const mostCommon = mostCommonBit(column(rows, j))
    rows = filterStep(rows, j, mostCommon)
    j += 1
  }
  const o2RatingBinStr = rows[0].join("")
  const o2Rating = parseInt(o2RatingBinStr, 2)

  rows = [...input]
  j = 0
  while (rows.length > 1) {
    const leastCommon = mostCommonBit(column(rows, j)) === "0" ? "1" : "0"
    rows = filterStep(rows, j, leastCommon)
    j += 1
  }
  const co2RatingBinStr = rows[0].join("")
  const co2Rating = parseInt(co2RatingBinStr, 2)

  return co2Rating * o2Rating
}

const cleanedInput = cleanInput(input)
const part1Output = part1(cleanedInput)
console.log("part 1:", part1Output)
const part2Output = part2(cleanedInput)
console.log("part 2:", part2Output)
