console.time('program')
const fs = require('fs')
const os = require('os')
import * as _ from 'lodash'
const WorkerPool = require('node-worker-pool')

const inputStream = fs.createReadStream(process.argv[2], { encoding: 'utf8' })
const outputStream = fs.createWriteStream(process.argv[3])

const numberOfWorkers = os.cpus().length
console.log(`numberOfWorkers: ${numberOfWorkers}`)
const workerPool = new WorkerPool(
  numberOfWorkers,
  process.execPath, // path to the node binary
  [ './js/lib/worker.js' ], // arguments array
  { initData: {} } // initData is sent exactly once to each worker on startup
)

let chunkCount = 0
let chunksProcessing = 0

console.time('inputStream')
inputStream.on('data', async (chunk: string) => {
  chunkCount++
  chunksProcessing++

  let cards: any = _(chunk).split('\n').filter((x) => { return x !== '' })
  let message: Message = { data: cards }
  let reply: Message = await workerPool.sendMessage(message)
  outputStream.write(_.join(reply.data, '\n'))
  chunksProcessing--

  if (chunksProcessing === 0) {
    // The last chunk has been processed - exit
    outputStream.end()
    console.time('workerPoolDestroy')
    await workerPool.destroy()
    console.timeEnd('workerPoolDestroy')
    console.timeEnd('program')
  }
})

inputStream.on('end', () => {
  console.timeEnd('inputStream')
  console.log(`chunkCount: ${chunkCount}`)
})
