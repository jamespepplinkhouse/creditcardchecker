var fs = require('fs')
var _ = require('lodash')
var pool = require('workerpool').pool()

var inputStream = fs.createReadStream('data/input_credit_cards.txt')
var outputStream = fs.createWriteStream('data/output_credit_cards.txt')
outputStream.write('Hello world!\n')
outputStream.write('Another line\n')

var data = ''
var chunkCount = 0

inputStream.on('data', function (chunk) {
  chunkCount++
  // data += chunk
  // data += '-----------------------------------------------'

  return pool.exec(fibonacci, [10])
    .then(function (result) {
      // data += chunk
      data += result
      // console.log(result)
      pool.clear() // clear all workers when done
    })
})

inputStream.on('end', function () {
  console.log('Finished processing ' + chunkCount + ' chunks!')
  outputStream.end()
})

function fibonacci (n) {
  if (n < 2) return n
  return fibonacci(n - 2) + fibonacci(n - 1)
}
