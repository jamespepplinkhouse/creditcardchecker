import { split } from 'ramda'
import { validateCards } from './credit_cards'

module.exports = function (message, callback) {
  const newLine = '\n'
  let cards = validateCards(split(newLine, message.trim()))
  callback(null, cards.join(newLine))
}
