import * as R from 'ramda'
import { validateCards } from './credit_cards'

module.exports = function (message, callback) {
  let cards = validateCards(R.split('\n', message.trim()))
  callback(null, cards.join('\n'))
}
