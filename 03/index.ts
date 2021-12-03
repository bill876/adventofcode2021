import input from './myInput'

function cleanInput(input: string): string[][] {
  return input
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => s.split(""))
}

function part1(input: string[][]): number {
  const numberCount = input.length
  const numberLength = input[0].length

  let gammaBin = ""
  for (let j = 0; j < numberLength; j += 1) {
    const zeroCount = input
      .map(s => s.slice(j, j+1)[0])
      .filter(s => s === "0")
      .length

    const oneCount = numberCount - zeroCount

    const mostCommon = zeroCount > oneCount ? "0" : "1"
    gammaBin += mostCommon
  }

  const gammaRate = parseInt(gammaBin, 2)
  const epsilonRate = Math.pow(2, numberLength) - 1 - gammaRate
  return gammaRate * epsilonRate
}

const cleanedInput = cleanInput(input)
const part1Output = part1(cleanedInput)
console.log("part 1:", part1Output)
// const part2Output = part2(cleanedInput)
// console.log("part 2:", part2Output)
