const workerUtils = require('node-worker-pool/nodeWorkerUtils')
import { validateCards } from './credit_cards'

/**
 * Executed once when the worker pool first starts
 * (before any messages are received)
 */
let initData
function onInitialize(data) {
  initData = data
}

/**
 * Executed each time a message is received from the worker pool.
 * Returns the response to the message (response must always be a promise that resolves to an object)
 */
function onMessage(unitOfWork: UnitOfWork) {
  let cards: UnitOfWork = {
    data: validateCards(unitOfWork.data)
  }
  return Promise.resolve(cards)
}

if (require.main === module) {
  try {
    workerUtils.startWorker(onInitialize, onMessage)
  } catch (e) {
    workerUtils.respondWithError(e)
  }
}
