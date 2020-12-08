import fs from 'fs'
import { append, compose, countBy, equals, filter, flip, init, juxt, length, map, nth, prop, split, transduce, trim } from 'ramda'

const data = fs.readFileSync('./day2.txt').toString()
const splitPasswordRequirement = split(':')
const splitRequiredCharacter = ([passwordRequirements, password]) => [passwordRequirements.split(' '), password]
const splitRequiredCharacterPositions = juxt([
  compose(map(Number), split('-'), nth(0), nth(0)),
  compose(nth(1), nth(0)),
  nth(1)
])
const trimPassword = juxt([
  nth(0),
  nth(1),
  compose(trim, nth(2))
])
const assertRequiredCharacters = ([positions, character, password]) => [
  map((position) => password[position - 1] === character)(
    positions
  ),
  positions,
  character,
  password
]
const isExactlyOneMatch = compose(equals(1), prop('true'), countBy(equals(true)), nth(0))
const processRowsTransducer = compose(
  map(splitPasswordRequirement),
  map(splitRequiredCharacter),
  map(splitRequiredCharacterPositions),
  map(trimPassword),
  map(assertRequiredCharacters),
  filter(isExactlyOneMatch)
)

compose(
  console.log,
  length,
  transduce(processRowsTransducer, flip(append), []),
  init,
  split('\n')
)(data)
