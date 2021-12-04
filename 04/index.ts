import rawInput from './myInput'

function range(size:number, startAt:number = 0):ReadonlyArray<number> {
  return [...Array(size).keys()].map(i => i + startAt);
}

class Cell {
  n: number
  visited = false

  constructor(n: number) { this.n = n }

  toString() {
    const n = this.n.toString().padEnd(2, " ")
    return this.visited ? `+${n}` : ` ${n}`
  }
}
class Board {
  _cells: Cell[][]

  constructor(cells: Cell[][]) { this._cells = cells }

  toString() {
    return "\n" +
      this._cells
        .map(row => row.map(cell => cell.toString()).join(" "))
        .join("\n")
      + "\n"
  }

  getRowAt(i: number) {
    return this._cells[i]
  }

  getColAt(j: number) {
    return this._cells
      .map(row => row[j])
  }

  get allCells() {
    return this._cells.reduce((acc, row) => [...acc, ...row], [])
  }

  get rows() {
    return range(BOARD_WIDTH).map(i => this.getRowAt(i))
  }

  get cols() {
    return range(BOARD_HEIGHT).map(i => this.getColAt(i))
  }

  visitNumber(n: number) {
    this.allCells.filter(c => c.n === n).forEach(c => c.visited = true)
    return this
  }

  get hasBingo() {
    return this.rows.some(row => row.every(cell => cell.visited)) || this.cols.some(col => col.every(cell => cell.visited))
  }
}

const BOARD_HEIGHT = 5
const BOARD_WIDTH = 5

function prepareInput(input: string): [number[], Board[]] {
  const lines = input
    .split("\n")
    .slice(1) // added 1 empty line to input for convenience

  const numbersString = lines[0].trim();
  const numbers = numbersString
    .split(",")
    .map(s => s.trim())
    .map(Number)

  const boardsInput: string[][] = []
  for (let i = 2; i < lines.length; i += BOARD_HEIGHT + 1) {
    boardsInput.push(lines.slice(i, i + BOARD_HEIGHT))
  }

  const boards = boardsInput
    .map(rawBoard => {
      return new Board(
        rawBoard
          .map(boardLine => boardLine
            .split(" ")
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(Number)
            .map(n => new Cell(n))
          )
      )
    })

  return [numbers, boards]
}

function findWin(numbers: number[], boards: Board[]): [Board, number] {
  for (let n of numbers) {
    boards.forEach(b => b.visitNumber(n))
    const winningBoard = boards.find(b => b.hasBingo)
    if (winningBoard) {
      return [winningBoard, n]
    }
  }
  throw Error("no win :(")
}

function sum(ns: number[]): number {
  return ns.reduce((a, b) => a + b, 0)
}

const [numbers, boards] = prepareInput(rawInput)
const [winningBoard, winningNumber] = findWin(numbers, boards)
const score = winningNumber * sum(winningBoard.allCells.filter(c => !c.visited).map(c => c.n))
console.log("part 1:", score)
// const part2Output = part2(cleanedInput)
// console.log("part 2:", part2Output)
