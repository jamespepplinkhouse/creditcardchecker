import * as creditCards from './credit_cards'

const cards = ['4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005',
'6011111111111117',
'5105105105105100',
'5105105105105106',
'9111111111111111',
'4111111111111111',
'4111111111111',
'4012888888881881',
'378282246310005']

console.time('harness')
const results = creditCards.validateCards(cards)
console.timeEnd('harness')