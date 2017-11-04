import { split } from 'ramda'
import { validateCards } from './credit_cards'

module.exports = (
  message: string,
  callback: (error: Error, result: string) => void
) => {
  const cards = validateCards(split('\n', message))
  callback(null, cards.join('\n') + '\n')
}
