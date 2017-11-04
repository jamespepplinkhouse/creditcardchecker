# Credit Card Checker (Node.js)

This program validates and identifies credit card numbers by consuming an input file which has one credit card number per line. It writes the results into an output file with one credit card per line. This program is optimised for parsing large files as quickly as possible.

I used this project to experiment with a multi-core Node.js solution and to run performance profiling. It's also a handy reference setup for TypeScript.

Notes:
- There is a sample input file (`data/input_credit_cards_large.txt`) with 3310000 test credit card numbers in it
- For this exercise we expect that the input data is clean
- The program must output one line for each input line
- The program must correctly identify the brand and validity of each credit card number
- Caching/memoization is not allowed - that's against the spirit of the exercise!
- We are not required to write the output credit card numbers to match the input order
- The goal is to process the input file as fast as possible using all CPUs

## Commands

### Setup
```
$ npm install
```

### Start
```
$ npm run compile
$ npm start
```

### Test
```
$ npm test
```

### Profile
```
$ npm run profile
$ ls isolate*
$ node --prof-process isolate-0x27906f0-v8.log > profile.log
$ cat profile.log
```

Here's an example of what you get back:
```
Statistical profiling result from isolate-0x27906f0-v8.log, (820 ticks, 22 unaccounted, 0 excluded).

 [Shared libraries]:
   ticks  total  nonlib   name
     24    2.9%          /lib/x86_64-linux-gnu/libpthread-2.23.so
     22    2.7%          /lib/x86_64-linux-gnu/libc-2.23.so

 [JavaScript]:
   ticks  total  nonlib   name
     92   11.2%   11.9%  LazyCompile: *exports.validateCard /srv/git/creditcardchecker-node/js/lib/credit_cards.js:22:33
     44    5.4%    5.7%  Builtin: ToNumber
     37    4.5%    4.8%  Stub: StringAddStub
     30    3.7%    3.9%  LazyCompile: *ConvertToString native array.js:135:25
     25    3.0%    3.2%  LazyCompile: *<anonymous> /srv/git/creditcardchecker-node/node_modules/ramda/dist/ramda.js:6852:39
     23    2.8%    3.0%  Builtin: StringPrototypeSubstr
     10    1.2%    1.3%  LazyCompile: *isMasterCard /srv/git/creditcardchecker-node/js/lib/credit_cards.js:5:29
      6    0.7%    0.8%  LazyCompile: *_map /srv/git/creditcardchecker-node/node_modules/ramda/dist/ramda.js:257:29
      6    0.7%    0.8%  LazyCompile: *DoJoin native array.js:97:16
      4    0.5%    0.5%  Builtin: ArgumentsAdaptorTrampoline
      3    0.4%    0.4%  Stub: ArraySingleArgumentConstructorStub
      3    0.4%    0.4%  LazyCompile: *map /srv/git/creditcardchecker-node/node_modules/ramda/dist/ramda.js:5979:63
      2    0.2%    0.3%  LazyCompile: ~_combinedTickCallback internal/process/next_tick.js:71:33
      2    0.2%    0.3%  LazyCompile: *isVisa /srv/git/creditcardchecker-node/js/lib/credit_cards.js:6:23
      2    0.2%    0.3%  LazyCompile: *isAmex /srv/git/creditcardchecker-node/js/lib/credit_cards.js:3:23
```

*Note:* I am using Node v8.1.0 at the time of writing


## Performance Features
- Streams the input file so that it can process very large files
- Input stream allows the program to start processing and writing the output file before the input file is fully loaded
- Processes cards in all CPU cores using Napa.js

## Test Results

Here are results from three runs on my desktop - *Intel(R) Core(TM) i5-7600 CPU @ 3.50GHz with SSD*:

```
workerBroadcast: 0.518ms
inputStream: 547.281ms
chunkCount: 827
program: 1298.217ms

workerBroadcast: 0.518ms
inputStream: 516.010ms
chunkCount: 827
program: 1293.823ms

workerBroadcast: 0.502ms
inputStream: 573.516ms
chunkCount: 827
program: 1299.787ms
```

## Observations on Napa.js

In order to utilise all CPU cores I have used [Napa.js](https://github.com/Microsoft/napajs). This allows for the CPU bound work to be spread over all CPU cores. On every chunk of the input file stream I send the chunk to the workers. At the time of writing, Napa.js is still an early version (v0.1.5) and there are quite a few limitations compared to [worker-farm](https://www.npmjs.com/package/worker-farm).

Specifically:
- Napa.js doesn't support TypeScript natively yet but the source code is TS which is nice [Any plans for native TypeScript? ;)](https://github.com/Microsoft/napajs/issues/100)
- Napa.js is limited to Node.js v8.4.0 or older for now (Node.js v9.0.0 just came out)
- I had to remove dependencies like Ramda which added 13 seconds (!!!) to the normal execution time of 1.3 seconds; looks like requiring npm packages is a no-no with Napa.js for now
- The payload string is returned with extra double quotes compare to what the worker returns so I had to strip them and then replace escaped new line chars :-(

