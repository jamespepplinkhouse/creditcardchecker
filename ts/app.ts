import * as fs from 'fs'
import * as napa from 'napajs'
import { sliceChunk } from './lib/utils'

const { log, time, timeEnd, error } = console

time('program')

const workers = require('os').cpus().length
const zone = napa.zone.create('zone', { workers })

function validateCards(cards: string) {
  var determineCardType = function(card: string) {
    if (
      (card.length === 13 || card.length === 16) &&
      card.substr(0, 1) === '4'
    ) {
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

  var luhn = function(card: string) {
    var b = 0
    var c = 0
    var total = 0
    var e = 0
    for (total = +card[(b = card.length - 1)], e = 0; b--; ) {
      c = +card[b]
      total += ++e % 2 ? (2 * c) % 10 + (c > 4 ? 1 : 0) : c
    }
    return !(total % 10)
  }

  var validateCard = function(card: string) {
    var cardType = determineCardType(card)
    var validity = cardType !== 'Unknown' && luhn(card) ? 'valid' : 'invalid'
    return cardType + ': ' + card + ' (' + validity + ')'
  }

  return (
    cards
      .split('\n')
      .map(validateCard)
      .join('\n') + '\n'
  )
}

time('workerBroadcast')
zone
  .broadcast(validateCards.toString())
  .then(() => {
    timeEnd('workerBroadcast')

    const [, , inputFilePath, outputFilePath] = process.argv
    const inputStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' })
    const outputStream = fs.createWriteStream(outputFilePath)

    let chunkCount = 0
    let chunksProcessing = 0
    let inputStreamFinished = false
    let lastTail = ''

    time('inputStream')
    inputStream.on('data', (chunk: string) => {
      chunkCount++
      chunksProcessing++

      const slices = sliceChunk(chunk, lastTail)
      lastTail = slices.tail

      zone
        .execute('', 'validateCards', [slices.head])
        .then(result => {
          outputStream.write(
            result.payload
              .slice(1, result.payload.length - 1)
              .replace(/\\n/g, '\n')
          )

          chunksProcessing--

          if (inputStreamFinished && chunksProcessing === 0) {
            outputStream.end()
            timeEnd('program')
          }
        })
        .catch(error)
    })

    inputStream.on('end', () => {
      inputStreamFinished = true
      timeEnd('inputStream')
      log(`chunkCount: ${chunkCount}`)
    })
  })
  .catch(error)
