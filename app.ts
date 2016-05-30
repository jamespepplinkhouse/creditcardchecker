const fs = require('fs')
const _ = require('lodash')

const inputStream = fs.createReadStream('data/input_credit_cards.txt')
const outputStream = fs.createWriteStream('data/output_credit_cards.txt')
outputStream.write('Test\n')

let chunkCount = 0

inputStream.on('data', function (chunk) {
  chunkCount++

})

inputStream.on('end', function () {
  console.log('Finished processing ' + chunkCount + ' chunks!')
  outputStream.end()
})
