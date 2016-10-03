import * as R from 'ramda'

// Test cases:
//    VISA: 4111111111111111 (valid)
//    VISA: 4111111111111 (invalid)
//    VISA: 4012888888881881 (valid)
//    AMEX: 378282246310005 (invalid)
//    Discover: 6011111111111117 (valid)
//    MasterCard: 5105105105105100 (valid)
//    MasterCard: 5105105105105106 (invalid)
//    Unknown: 9111111111111111 (invalid)

export function validateCards(cards: string[]): string[] {
  return R.map((x) => {
    let cardType = determineCardType(x)
    let validity = luhn(x) ? 'valid' : 'invalid'
    return cardType + ': ' + x + ' (' + validity + ')'
  }, cards)
}

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

function determineCardType(card: string): string {
  const cardLength = card.length
  return isVisa(card, cardLength)
    || isMasterCard(card, cardLength)
    || isDiscover(card, cardLength)
    || isAmex(card, cardLength)
    || 'Unknown'
}

function isAmex(card: string, cardLength: number) {
  return cardLength === 15 && (card.startsWith('34') || card.startsWith('37')) ? 'AMEX' : undefined
}

function isDiscover(card: string, cardLength: number) {
  return cardLength === 16 && card.startsWith('6011') ? 'Discover' : undefined
}

function isMasterCard(card: string, cardLength: number) {
  return cardLength === 16 && (card.startsWith('51') || card.startsWith('55')) ? 'MasterCard' : undefined
}

function isVisa(card: string, cardLength: number) {
  return (cardLength === 13 || cardLength === 16) && card.startsWith('4') ? 'VISA' : undefined
}
