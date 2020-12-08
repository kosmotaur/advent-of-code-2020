
import { readFileSync } from 'fs'
import { compose, curryN, divide, flip, identity, init, length, map, range, reduce, split, useWith, dec } from 'ramda'

enum TileTypes {
  FreeTile = '.',
  TreeTile = '#'
}
type Tile = TileTypes.FreeTile | TileTypes.TreeTile
type SlopeMap = Tile[][]
type SlopeCoordinates = [number, number]

const slopeMap = compose(map(split('')), init, split('\n'))(readFileSync('./day3.txt').toString())
const getXInBound = (x: number, width: number) => (x + 1) % width
const getTile = ([x, y]: SlopeCoordinates, map: SlopeMap): Tile => {
  return map[y][getXInBound(x, map[0].length)]
}
interface GetNumberOfVerticalSteps {
  (yStepLength: number, map: SlopeMap): number
}
const getNumberOfVerticalSteps: GetNumberOfVerticalSteps = curryN(2,
  compose(Math.floor, useWith(flip(divide), [identity, length]))
)
interface GetVerticalStepsRange {
  (verticalStepLength: number, map: SlopeMap): number[]
}
const getVerticalStepsRange: GetVerticalStepsRange = curryN(2,
  compose(range(1), getNumberOfVerticalSteps)
)
const horizontalStepLength = 3
const verticalStepLength = 1
const verticalStepsRange = getVerticalStepsRange(verticalStepLength, slopeMap);

compose(
  console.log,
  reduce((numberOfTreesEncountered: number, stepNumber: number) =>
    getTile(
      [
        stepNumber * horizontalStepLength - 1,
        stepNumber * verticalStepLength
      ],
      slopeMap
    ) === TileTypes.TreeTile ? numberOfTreesEncountered + 1 : numberOfTreesEncountered,
    0
  )
)(verticalStepsRange)
