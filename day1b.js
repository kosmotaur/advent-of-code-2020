import { addIndex, apply, compose, identity, indexOf, map, reduce, reduced, slice, sortBy, tap } from 'ramda'
import data from './day1.json'

const reduceIndexed = addIndex(reduce)

compose(
  console.log,
  apply((a, b, c) => a * b * c),
  tap(console.log),
  reduceIndexed(
    (acc, number, i, list) => {
      const numbers = reduceIndexed(
        (acc2, number2, j, list2) => {
          console.count('iteration')
          const foundIndex = indexOf(2020 - (number + number2), list2)

          return foundIndex > -1 ? reduced([number, number2, list2[foundIndex]]) : []
        },
        [],
        slice(i, Infinity, list)
      )

      return numbers.length === 3 ? reduced(numbers) : []
    },
    []
  ),
  sortBy(identity),
  map(Number)
)(data)
