import input from './myInput'

function f1(input: string): number {
  const cleanInput = input
    .split("\n")
    .filter(s => s.length > 0)
    .map(Number)

  const inputPairs: number[][] = []
  for (let i = 1; i < cleanInput.length; i += 1) {
    inputPairs.push([cleanInput[i-1], cleanInput[i]])
  }

  return inputPairs
    .map(([a, b]) => b - a)
    .filter(d => d > 0)
    .length
}

const output = f1(input);
console.log(output);
