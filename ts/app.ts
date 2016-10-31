/// <reference path="../node_modules/@types/ramda/ramda.d.ts"/>
/// <reference path="../node_modules/@types/node/index.d.ts"/>

console.time('program')

const fs = require('fs')
const workerFarm = require('worker-farm')
import { sliceChunk } from './lib/utils'

const workers = workerFarm({ maxConcurrentCallsPerWorker: Infinity }, require.resolve('./lib/worker'))
const log = console.log
const time = console.time
const timeEnd = console.timeEnd

const inputFile = process.argv[2]
const outputFile = process.argv[3]
const inputStream = fs.createReadStream(inputFile, { encoding: 'utf8' })
const outputStream = fs.createWriteStream(outputFile)

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
