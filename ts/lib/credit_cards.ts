const determineCardType = function(card: string) {
  if ((card.length === 13 || card.length === 16) && card.substr(0, 1) === '4') {
    return 'VISA'
  }

  if (
    card.length === 16 &&
    (card.substr(0, 2) === '51' || card.substr(0, 2) === '55')
  ) {
    return 'MasterCard'
  }

  if (card.length === 16 && card.substr(0, 4) === '6011') {
    return 'Discover'
  }

  if (
    card.length === 15 &&
    (card.substr(0, 2) === '34' || card.substr(0, 2) === '37')
  ) {
    return 'AMEX'
  }

  return 'Unknown'
}

const luhn = function(card: string) {
  let b = 0
  let c = 0
  let total = 0
  let e = 0

  for (total = +card[(b = card.length - 1)], e = 0; b--; ) {
    c = +card[b]
    total += ++e % 2 ? (2 * c) % 10 + (c > 4 ? 1 : 0) : c
  }

  return !(total % 10)
}

const validateCard = function(card: string) {
  const cardType = determineCardType(card)
  const validity = cardType !== 'Unknown' && luhn(card) ? 'valid' : 'invalid'
  return cardType + ': ' + card + ' (' + validity + ')'
}

export const validateCards = (cards: string) => {
  return (
    cards
      .split('\n')
      .map(validateCard)
      .join('\n') + '\n'
  )
}
