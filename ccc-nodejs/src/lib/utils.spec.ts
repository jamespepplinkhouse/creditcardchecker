import { sliceChunk } from './utils'

describe('utils', () => {
  it('sliceChunk() returns full lines and tail', () => {
    const chunk = '1111222233334444\n1111222233334444\n11112222'
    const expectedResult = {
      head: '1111222233334444\n1111222233334444',
      tail: '11112222'
    }

    expect(sliceChunk(chunk, '')).toEqual(expectedResult)
  })

  it('sliceChunk() correctly handles last tail', () => {
    const lastTail = '11112222'
    const chunk = '33334444\n1111222233334444\n11112222'
    const expectedResult = {
      head: '1111222233334444\n1111222233334444',
      tail: '11112222'
    }

    expect(sliceChunk(chunk, lastTail)).toEqual(expectedResult)
  })
})
