import input from './myInput'

enum Direction {
  Forward = "forward",
  Up = "up",
  Down = "down",
}

interface Command {
  direction: Direction
  distance: number
}

function cleanInput(input: string): Command[] {
  return input
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => {
      const parts = s.split(" ")
      const direction = <Direction>(parts[0])
      return {
        direction: direction,
        distance: Number(parts[1]),
      }
    })
}

interface Position {
  depth: number,
  horizontal: number,
}

function part1(commands: Command[]): number {
  const initialPosition: Position = { depth: 0, horizontal: 0 }
  const endPosition: Position = commands.reduce(
    (oldPos, command) => {
      switch (command.direction) {
        case Direction.Up:
          return {
            depth: oldPos.depth - command.distance,
            horizontal: oldPos.horizontal,
          }
        case Direction.Down:
          return {
            depth: oldPos.depth + command.distance,
            horizontal: oldPos.horizontal,
          }
        case Direction.Forward:
          return {
            depth: oldPos.depth,
            horizontal: oldPos.horizontal + command.distance,
          }
      }
    },
    initialPosition,
  )

  return endPosition.horizontal * endPosition.depth
}

interface MovementState {
  position: Position,
  aim: number,
}

function part2(commands: Command[]): number {
  const initialState: MovementState = {
    position: { depth: 0, horizontal: 0 },
    aim: 0,
  }
  const endState: MovementState = commands.reduce(
    (oldState, command) => {
      switch (command.direction) {
        case Direction.Up:
          return {
            ...oldState,
            aim: oldState.aim - command.distance,
          }
        case Direction.Down:
          return {
            ...oldState,
            aim: oldState.aim + command.distance,
          }
        case Direction.Forward:
          return {
            ...oldState,
            position: {
              horizontal: oldState.position.horizontal + command.distance,
              depth: oldState.position.depth + oldState.aim * command.distance,
            }
          }
      }
    },
    initialState,
  )
  const endPosition = endState.position

  return endPosition.horizontal * endPosition.depth
}

const cleanedInput = cleanInput(input)
const part1Output = part1(cleanedInput)
console.log("part 1:", part1Output)
const part2Output = part2(cleanedInput)
console.log("part 2:", part2Output)
