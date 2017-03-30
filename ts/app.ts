const { log, time, timeEnd } = console

time('program')

import * as fs from 'fs'
import { sliceChunk } from './lib/utils'
const workerFarm = require('worker-farm')

const workers = workerFarm({ maxConcurrentCallsPerWorker: Infinity }, require.resolve('./lib/worker'))

const inputFilePath = process.argv[2]
const outputFilePath = process.argv[3]
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

  workers(slices.head, function (err, response) {
    outputStream.write(response)
    chunksProcessing--

    if (inputStreamFinished && chunksProcessing === 0) {
      outputStream.end()
      workerFarm.end(workers)
      timeEnd('program')
    }
  })
})

inputStream.on('end', () => {
  inputStreamFinished = true
  timeEnd('inputStream')
  log(`chunkCount: ${chunkCount}`)
})
