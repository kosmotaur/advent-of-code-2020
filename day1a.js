import { compose, multiply, apply, reduced, indexOf, map, addIndex, reduce } from 'ramda'
import data from './day1.json'

const reduceIndexed = addIndex(reduce)

compose(
  console.log,
  apply(multiply),
  reduceIndexed(
    (acc, number, i, list) => {
      const foundIndex = indexOf(2020 - number, list)

      return foundIndex > -1 ? reduced([number, data[foundIndex]]) : []
    },
    []
  ),
  map(Number)
)(data)
