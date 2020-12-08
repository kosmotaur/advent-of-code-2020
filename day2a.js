import fs from 'fs'
import { allPass, append, apply, compose, filter, flip, gte, init, juxt, length, lte, map, nth, split, transduce, __ } from 'ramda'

const data = fs.readFileSync('./day2.txt').toString()
const splitPasswordRequirement = split(':')
const splitRequiredCharacter = ([passwordRequirements, password]) => {
  return [passwordRequirements.split(' '), password]
}
const splitRequiredCharacterCountRange = juxt([
  compose(map(Number), split('-'), nth(0), nth(0)),
  compose(nth(1), nth(0)),
  nth(1)
])
const countRequiredCharacter = ([counts, character, password]) => {
  const characterMatch = password.match(RegExp(`(${character})`, 'g'))
  return [
    counts,
    characterMatch ? characterMatch.length : 0
  ]
}
const valueInRage = ([min, max], value) => {
  return allPass([gte(__, min), lte(__, max)])(value)
}
const processRowsTransducer = compose(
  map(splitPasswordRequirement),
  map(splitRequiredCharacter),
  map(splitRequiredCharacterCountRange),
  map(countRequiredCharacter),
  filter(apply(valueInRage))
)

compose(
  console.log,
  length,
  transduce(processRowsTransducer, flip(append), []),
  init,
  split('\n')
)(data)
