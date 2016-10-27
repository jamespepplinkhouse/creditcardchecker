import { always, cond, map, T } from 'ramda'

const isAmex = (card: string) => card.length === 15 && (card.substr(0, 2) === ('34') || card.substr(0, 2) === ('37'))
const isDiscover = (card: string) => card.length === 16 && card.substr(0, 4) === ('6011')
const isMasterCard = (card: string) => card.length === 16 && (card.substr(0, 2) === ('51') || card.substr(0, 2) === ('55'))
const isVisa = (card: string) => (card.length === 13 || card.length === 16) && card.substr(0, 1) === ('4')

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

export function validateCard(card) {
  let cardType = determineCardType(card)
  let validity = cardType !== 'Unknown' && luhn(card) ? 'valid' : 'invalid'
  return cardType + ': ' + card + ' (' + validity + ')'
}

export function validateCards(cards: string[]): string[] {
  return map(validateCard, cards)
}
