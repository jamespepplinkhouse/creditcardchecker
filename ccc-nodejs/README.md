# Credit Card Checker (Node.js)

## Approach

## Usage

### Setup

```
$ yarn
```

### Start

```
$ yarn compile
$ yarn start
```

### Test

```
$ yarn test
```

### Clinic.js

[Clinic.js is a really easy to use profiling toolkit for Node.js, check it out!](https://clinicjs.org/)

```
$ yarn clinic:doctor
$ yarn clinic:flame
$ yarn clinic:bubbleprof
```

### Profile

```
$ yarn profile
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

_Note:_ I am using Node v9.0.0 at the time of writing

## Performance Features

- Streams the input file so that it can process very large files
- Input stream allows the program to start processing and writing the output file before the input file is fully loaded
- Processes cards in chunks in multiple Node.js processes to use all CPU cores

## Observations

- I implemented this program in Elixir and while it was great fun it turned that Node.js was just as easy to implement for multi-core and a LOT faster at file streaming
- There are 827 chunks in the input file which means 827 messages to worker processes
- Each new version of Node.js has made this program faster which is great to see!
- Node.js has really fast file system IO thanks to C++ module goodness
- TypeScript is great because I can target ES5 or ES6 easily, as of Node.js v9.0.0 performance is around the same

## Multi-Node Architecture

In order to utilise all CPU cores I have used [worker-farm](https://www.npmjs.com/package/worker-farm) which works via [child_process.fork](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options). This allows for the CPU bound work to be spread over all CPU cores. On every chunk of the input file stream I send the chunk to the workers. There are 827 chunks in the large data set.

I tried [Napa.js](https://github.com/Microsoft/napajs) [on another branch](https://github.com/jamespepplinkhouse/creditcardchecker-node/tree/feature/napajs). It's not as nice to work and meant I couldn't use NPM packages without serious performance penalties!
