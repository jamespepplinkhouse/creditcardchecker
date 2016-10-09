/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
/// <reference path="../../node_modules/@types/chai/index.d.ts"/>

import { expect } from 'chai'
import { validateCards } from './credit_cards'

describe('credit_cards', function() {
  it('AMEX', function() {
    const cards = [ '378282246310005' ]
    const cardDescriptions = [ 'AMEX: 378282246310005 (invalid)' ]

    expect(validateCards(cards)).to.eql(cardDescriptions)
  })

  it('Discover', function() {
    const cards = [ '6011111111111117' ]
    const cardDescriptions = [ 'Discover: 6011111111111117 (valid)' ]

    expect(validateCards(cards)).to.eql(cardDescriptions)
  })

  it('MasterCard', function() {
    const cards = [
      '5105105105105100',
      '5105105105105106'
    ]

    const cardDescriptions = [
     'MasterCard: 5105105105105100 (valid)',
     'MasterCard: 5105105105105106 (invalid)'
    ]

    expect(validateCards(cards)).to.eql(cardDescriptions)
  })

  it('Unknown', function() {
    const cards = [ '9111111111111111' ]
    const cardDescriptions = [ 'Unknown: 9111111111111111 (invalid)' ]

    expect(validateCards(cards)).to.eql(cardDescriptions)
  })
})
