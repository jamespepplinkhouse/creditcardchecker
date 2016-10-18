import { always, cond, map, T } from 'ramda'

const isAmex = (card: string) => card.length === 15 && (card.startsWith('34') || card.startsWith('37'))
const isDiscover = (card: string) => card.length === 16 && card.startsWith('6011')
const isMasterCard = (card: string) => card.length === 16 && (card.startsWith('51') || card.startsWith('55'))
const isVisa = (card: string) => (card.length === 13 || card.length === 16) && card.startsWith('4')

let cache = {}

const determineCardType = cond([
  [isVisa, always('VISA')],
  [isMasterCard, always('MasterCard')],
  [isDiscover, always('Discover')],
  [isAmex, always('AMEX')],
  [T, always('Unknown')]
])

const luhn = function(card) {
  let b, c, d, e
  for (d = +card[b = card.length - 1], e = 0; b--; ) {
    c = +card[b]
    d += ++e % 2 ? 2 * c % 10 + (c > 4 ? 1 : 0) : c
  }
  return !(d % 10)
}

function validateCard(card: string) {
  if (cache[card]) {
    return cache[card]
  }

  let cardType = determineCardType(card)
  let validity = cardType !== 'Unknown' && luhn(card) ? 'valid' : 'invalid'

  let result = cardType + ': ' + card + ' (' + validity + ')'
  cache[card] = result
  return result
}

export function validateCards(cards: string[]): string[] {
  return map(validateCard, cards)
}
