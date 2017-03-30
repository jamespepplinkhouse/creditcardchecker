import { split } from 'ramda'
import { validateCards } from './credit_cards'

const newLine = '\n'

module.exports = function (message, callback) {
  let cards = validateCards(split(newLine, message))
  callback(null, cards.join(newLine) + newLine)
}
