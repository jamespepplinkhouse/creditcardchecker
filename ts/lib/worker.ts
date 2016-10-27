// import { split } from 'ramda'
import { validateCard } from './credit_cards'

module.exports = function (line: string, callback) {
  const newLine = '\n'
  let card = validateCard(line.trim())
  callback(null, card + newLine)
}
