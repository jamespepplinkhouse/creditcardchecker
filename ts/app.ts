/// <reference path="../node_modules/@types/ramda/ramda.d.ts"/>
/// <reference path="../node_modules/@types/node/index.d.ts"/>

console.time('program')

const fs = require('fs')
const workerFarm = require('worker-farm')
const workers = workerFarm(require.resolve('./lib/worker'))
const log = console.log
const time = console.time
const timeEnd = console.timeEnd

const inputStream = fs.createReadStream(process.argv[2], { encoding: 'utf8' })
const outputStream = fs.createWriteStream(process.argv[3])

let chunkCount = 0
let chunksProcessing = 0

time('inputStream')
inputStream.on('data', async (chunk: string) => {
  chunkCount++
  chunksProcessing++

  workers(chunk, function (err, response) {
    outputStream.write(response)
    chunksProcessing--

    if (chunksProcessing === 0) {
      // The last chunk has been processed - exit
      outputStream.end()
      workerFarm.end(workers)
      timeEnd('program')
    }
  })
})

inputStream.on('end', () => {
  timeEnd('inputStream')
  log(`chunkCount: ${chunkCount}`)
})
