/// <reference path="../node_modules/@types/ramda/ramda.d.ts"/>
/// <reference path="../node_modules/@types/node/index.d.ts"/>

console.time('program')

const fs = require('fs')
const log = console.log
const time = console.time
const timeEnd = console.timeEnd

import { split } from 'ramda'
import { validateCards } from './lib/credit_cards'

const inputStream = fs.createReadStream(process.argv[2], { encoding: 'utf8' })
const outputStream = fs.createWriteStream(process.argv[3])

let chunkCount = 0
const newLine = '\n'

time('inputStream')
inputStream.on('data', (chunk: string) => {
  chunkCount++

  let cards = validateCards(split(newLine, chunk.trim()))
  let processedCards = cards.join(newLine)
  outputStream.write(processedCards)
})

inputStream.on('end', () => {
  timeEnd('inputStream')
  log(`chunkCount: ${chunkCount}`)
})
