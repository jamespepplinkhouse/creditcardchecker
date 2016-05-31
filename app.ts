// / <reference path='./typings/index.d.ts'/>

const fs = require('fs')
const os = require('os')
var _ = require('lodash')
const WorkerPool = require('node-worker-pool')

const inputStream = fs.createReadStream('data/input_credit_cards.txt')
inputStream.setEncoding('utf8')

const outputStream = fs.createWriteStream('data/output_credit_cards.txt')

const numberOfWorkers = os.cpus().length
const workerPool = new WorkerPool(
  numberOfWorkers,
  process.execPath, // path to the node binary
  [ './lib/worker.js' ], // arguments array
  {
    initData: {someUsefulConstant: 42} // initData is sent exactly once to each worker on startup
  }
)

let chunkCount = 0
let chunksProcessing = 0

inputStream.on('data', async (chunk) => {
  chunkCount++
  chunksProcessing++

  let unitOfWork: UnitOfWork = { data: chunk.split('\n') }
  let reply: UnitOfWork = await workerPool.sendMessage(unitOfWork)
  console.log('reply', reply)
  outputStream.write(_.join(reply.data, '\n'))
  chunksProcessing--

  if (chunksProcessing === 0) {
    // The last chunk has been processed - exit
    outputStream.end()
    await workerPool.destroy()
    console.log('All worker processes have now been killed')
  }
})

inputStream.on('end', async () => {
  console.log(`Finished processing input stream with ${chunkCount} chunks`)
})
