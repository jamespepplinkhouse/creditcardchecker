# Credit Card Checker (Node.js)

This program validates and identifies credit card numbers by consuming an input file which has one credit card number per line. It writes the results into an output file with one credit card per line. This program is optimised for parsing large files as quickly as possible (it will use all CPU cores at 100%). Try this for a quick way to build and test the program:
```
npm install
npm start
```
*Note:* I am using Node 6.2 at the time of writing

To try a larger input data set (3,310,000 cards) there is a file at: ./data/input_credit_cards_large.txt


*Performance Features:*
- Streams the input file so that it can process very large files
- Input stream allows the program to start processing and writing the output file before the input file is fully loaded
- Processes cards in chunks in multiple Node.js processes to use all CPU cores

*My observations with the large data set:*
- Much faster than the [Elixir solution](https://github.com/jamespepplinkhouse/creditcardchecker-elixir) (~18 seconds for Node.js vs ~46 seconds for Elixir) although both can be optimised further
- Higher memory usage than the Erlang VM (~614MB on my machine)
- Node.js reaches 100% CPU very quickly, I think due to streaming the file very quickly
- This was my first attempt at solving a CPU bound problem with Node.js and it was made easy thanks to [node-worker-pool](https://www.npmjs.com/package/node-worker-pool) with relatively little boiler plate code
- Results from three runs:

```
real    0m17.782s
user    1m4.360s
sys     0m1.093s

real    0m17.888s
user    1m4.610s
sys     0m1.105s

real    0m17.723s
user    1m4.107s
sys     0m1.081s
```

## Multi-Node Architecture

In order to utilise all CPU cores I have used [node-worker-pool](https://www.npmjs.com/package/node-worker-pool) which works by starting workers (child Node.js processes) and sending messages to them via stdout (on Linux my understanding is that this is basically a unix socket). This allows for the CPU bound work to be spread over all CPU cores. On every chunk of the input file stream I send the chunk to the worker pool. There are 837 chunks in the large data set.
