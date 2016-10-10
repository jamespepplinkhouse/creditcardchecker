import { always, cond, map, T } from 'ramda'

const isAmex = (card: string) => card.length === 15 && (card.startsWith('34') || card.startsWith('37'))
const isDiscover = (card: string) => card.length === 16 && card.startsWith('6011')
const isMasterCard = (card: string) => card.length === 16 && (card.startsWith('51') || card.startsWith('55'))
const isVisa = (card: string) => (card.length === 13 || card.length === 16) && card.startsWith('4')

const determineCardType = cond([
  [isVisa, always('VISA')],
  [isMasterCard, always('MasterCard')],
  [isDiscover, always('Discover')],
  [isAmex, always('AMEX')],
  [T, always('Unknown')]
])

const luhn = function(a, b?, c?, d?, e?) {
  for (d = +a[b = a.length - 1], e = 0; b--; ) {
    c = +a[b]
    d += ++e % 2 ? 2 * c % 10 + (c > 4 ? 1 : 0) : c
  }
  return !(d % 10)
}

function validateCard(x) {
  let cardType = determineCardType(x)
  let validity = luhn(x) ? 'valid' : 'invalid'
  return cardType + ': ' + x + ' (' + validity + ')'
}

export function validateCards(cards: string[]): string[] {
  return map(validateCard, cards)
}
