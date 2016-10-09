import * as R from 'ramda'

const isAmex = (card: string) => card.length === 15 && (card.startsWith('34') || card.startsWith('37'))
const isDiscover = (card: string) => card.length === 16 && card.startsWith('6011')
const isMasterCard = (card: string) => card.length === 16 && (card.startsWith('51') || card.startsWith('55'))
const isVisa = (card: string) => (card.length === 13 || card.length === 16) && card.startsWith('4')

var determineCardType = R.cond([
  [isVisa, R.always('VISA')],
  [isMasterCard, R.always('MasterCard')],
  [isDiscover, R.always('Discover')],
  [isAmex, R.always('AMEX')],
  [R.T, R.always('Unknown')]
])

function luhn(card) {
  return card.split('').reduceRight(function(previous, current, index) {
    previous = parseInt(previous, 10)
    if ((index + 1) % 2 !== 0) {
      current = (current * 2)
        .toString()
        .split('')
        .reduce(function(prev, curr, idx, arr) {
          return (parseInt(prev, 10) + parseInt(curr, 10)).toString()
        })
    }
    return previous + parseInt(current, 10)
  }) % 10 === 0
}

function validateCard(x) {
  let cardType = determineCardType(x)
  let validity = luhn(x) ? 'valid' : 'invalid'
  return cardType + ': ' + x + ' (' + validity + ')'
}

export function validateCards(cards: string[]): string[] {
  return R.map(validateCard, cards)
}
