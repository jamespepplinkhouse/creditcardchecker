import { validateCards } from './credit_cards'

module.exports = (
  message: string,
  callback: (error: Error | null, result: string) => void
) => {
  const cards = validateCards(message.split('\n'))
  callback(null, cards.join('\n') + '\n')
}
