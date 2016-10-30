/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
/// <reference path="../../node_modules/@types/chai/index.d.ts"/>

import { expect } from 'chai'
import { sliceChunk } from './utils'

describe('utils', function() {
  it('sliceChunk() returns full lines and tail', function() {
    const chunk = '1111222233334444\n1111222233334444\n11112222'
    const expectedResult = {
      head: '1111222233334444\n1111222233334444',
      tail: '11112222'
    }

    expect(sliceChunk(chunk, '')).to.eql(expectedResult)
  })

  it('sliceChunk() correctly handles last tail', function() {
    const lastTail = '11112222'
    const chunk = '33334444\n1111222233334444\n11112222'
    const expectedResult = {
      head: '1111222233334444\n1111222233334444',
      tail: '11112222'
    }

    expect(sliceChunk(chunk, lastTail)).to.eql(expectedResult)
  })
})
