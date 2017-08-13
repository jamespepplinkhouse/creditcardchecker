import { split } from 'ramda'
import { validateCards } from './credit_cards'

const newLine = '\n'

export type HandleMessageCallback = (error: Error, result: string) => void

module.exports = (message: string, callback: HandleMessageCallback) => {
  const cards = validateCards(split(newLine, message))
  callback(null, cards.join(newLine) + newLine)
}
