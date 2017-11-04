import * as fs from 'fs'
import * as napa from 'napajs'
import { sliceChunk } from './lib/utils'

const { log, time, timeEnd, error } = console

time('program')

const workers = require('os').cpus().length
const zone = napa.zone.create('zone', { workers })

time('workerBroadcast')
zone
  .broadcast('console.log("Worker started!")')
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
        .execute('./lib/credit_cards.js', 'validateCards', [slices.head])
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
