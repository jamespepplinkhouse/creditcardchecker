# Credit Card Checker

## Overview

This repo contains programs that validate and identify credit card numbers by consuming an input file which has one credit card number per line, then write the results into an output file with one credit card per line.

I use this project to experiment with different programming languages, to see how they approach CPU and IO bound performance limits. A performant program needs to read a large text file, process the contents across many CPU cores, and compile the results back into an output file. It's a great opportunity to identify idiomatic solutions if different languages and use profiling tools to squeeze out the best results of each solution.

Notes:

- There is a sample input file (`data/input_credit_cards_large.txt`) with 3310000 test credit card numbers in it
- For this exercise we expect that the input data is clean
- The program must output one line for each input line
- The program must correctly identify the brand and validity of each credit card number
- Caching/memoization is not allowed - that's against the spirit of the exercise!
- We are not required to write the output credit card numbers to match the input order
- The goal is to process the input file as fast as possible
- For "Run Time" below, programs are timed using the `time` command to capture end-to-end timing, and averaged over 5 runs on the same machine; this is just for fun, not a strict benchmark (run it yourself!)

## Solutions

| Directory | Language | Run Time | Description                                                                 |
| --------- | -------- | -------- | --------------------------------------------------------------------------- |
| ccc-node  | Node.js  | 2960ms   | Uses worker farm approach to distribute load across child Node.js processes |
| ccc-rust  | Rust     |          |                                                                             |
