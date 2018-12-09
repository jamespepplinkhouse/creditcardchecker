import { expect } from 'chai'
import { validateCards } from './credit_cards'

describe('credit_cards', () => {
  it('AMEX', () => {
    const cards = ['378282246310005']
    const cardDescriptions = ['AMEX: 378282246310005 (valid)']

    expect(validateCards(cards)).to.eql(cardDescriptions)
  })

  it('Discover', () => {
    const cards = ['6011111111111117']
    const cardDescriptions = ['Discover: 6011111111111117 (valid)']

    expect(validateCards(cards)).to.eql(cardDescriptions)
  })

  it('MasterCard', () => {
    const cards = ['5105105105105100', '5105105105105106']
    const cardDescriptions = [
      'MasterCard: 5105105105105100 (valid)',
      'MasterCard: 5105105105105106 (invalid)'
    ]

    expect(validateCards(cards)).to.eql(cardDescriptions)
  })

  it('Unknown', () => {
    const cards = ['9111111111111111']
    const cardDescriptions = ['Unknown: 9111111111111111 (invalid)']

    expect(validateCards(cards)).to.eql(cardDescriptions)
  })

  it('VISA', () => {
    const cards = ['4111111111111111', '4111111111111', '4012888888881881']
    const cardDescriptions = [
      'VISA: 4111111111111111 (valid)',
      'VISA: 4111111111111 (invalid)',
      'VISA: 4012888888881881 (valid)'
    ]

    expect(validateCards(cards)).to.eql(cardDescriptions)
  })
})
