# Credit Card Checker (Node.js)

This program validates and identifies credit card numbers by consuming an input file which has one credit card number per line. It writes the results into an output file with one credit card per line. This program is optimised for parsing large files as quickly as possible (it will use all CPU cores at 100%) and assumes the input data is clean. Try this for a quick way to build and test the program:
```
npm install typescript -g
npm install
npm start
```
*Note:* I am using Node 6.5 at the time of writing

*Performance Features:*
- Streams the input file so that it can process very large files
- Input stream allows the program to start processing and writing the output file before the input file is fully loaded
- Processes cards in chunks in multiple Node.js processes to use all CPU cores

*My observations with the large data set:*
- Much faster than the [Elixir solution](https://github.com/jamespepplinkhouse/creditcardchecker-elixir) (~15 seconds for Node.js vs ~46 seconds for Elixir) although both can be optimised further
- Consistent memory usage (~100-150MB on my machine)
- Node.js reaches 100% CPU very quickly, I think due to streaming the file very quickly
- To solve this CPU bound problem with Node.js I used [worker-farm](https://www.npmjs.com/package/worker-farm) which I can recommend for it's minimum boiler plate and good feature set
- I originally used [node-worker-pool](https://www.npmjs.com/package/node-worker-pool) which had some deficiencies when compare to *worker-farm*, namely: higher memory usage, more setup code, it uses stdout & stdin which prevents the worker from writing anything to the console (because it is interpreted by the parent process)
- Results from three runs:

```
inputStream: 526.443ms
chunkCount: 837
program: 14836.772ms

real    0m15.648s
user    0m57.972s
sys     0m1.088s
```
```
inputStream: 594.973ms
chunkCount: 837
program: 15064.395ms

real    0m15.865s
user    0m58.772s
sys     0m1.040s
```
```
inputStream: 576.852ms
chunkCount: 837
program: 14898.166ms

real    0m15.734s
user    0m58.264s
sys     0m1.072s
```

## Multi-Node Architecture

In order to utilise all CPU cores I have used [worker-farm](https://www.npmjs.com/package/worker-farm) which works via [child_process.fork](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options). This allows for the CPU bound work to be spread over all CPU cores. On every chunk of the input file stream I send the chunk to the workers. There are 837 chunks in the large data set.
