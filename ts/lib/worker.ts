import * as R from 'ramda'
import { validateCards } from './credit_cards'

module.exports = function (message, callback) {
  const newLine = '\n'
  let cards = validateCards(R.split(newLine, message.trim()))
  callback(null, cards.join(newLine))
}
