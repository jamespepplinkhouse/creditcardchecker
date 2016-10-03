const fs = require('fs')
const os = require('os')
import * as _ from 'lodash'
const WorkerPool = require('node-worker-pool')

// const inputStream = fs.createReadStream('data/input_credit_cards.txt')
const inputStream = fs.createReadStream('data/input_credit_cards_large.txt')
inputStream.setEncoding('utf8')

const outputStream = fs.createWriteStream('data/output_credit_cards.txt')

const numberOfWorkers = os.cpus().length
const workerPool = new WorkerPool(
  numberOfWorkers,
  process.execPath, // path to the node binary
  [ './js/lib/worker.js' ], // arguments array
  {
    initData: {someUsefulConstant: 42} // initData is sent exactly once to each worker on startup
  }
)

let chunkCount = 0
let chunksProcessing = 0

inputStream.on('data', async (chunk: string) => {
  chunkCount++
  chunksProcessing++

  let cards: any = _(chunk).split('\n').filter((x) => { return x !== '' })
  let unitOfWork: UnitOfWork = { data: cards }
  let reply: UnitOfWork = await workerPool.sendMessage(unitOfWork)
  outputStream.write(_.join(reply.data, '\n'))
  chunksProcessing--

  if (chunksProcessing === 0) {
    // The last chunk has been processed - exit
    outputStream.end()
    await workerPool.destroy()
    console.log('All worker processes have now been killed')
  }
})

inputStream.on('end', () => {
  console.log(`Finished processing input stream with ${chunkCount} chunks`)
})
