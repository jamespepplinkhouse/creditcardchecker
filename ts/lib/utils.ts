export const sliceChunk = (chunk: string, lastTail: string) => {
  const indexOfLastNewLine = chunk.lastIndexOf('\n')

  return {
    head: lastTail + chunk.substr(0, indexOfLastNewLine),
    tail: chunk.substr(indexOfLastNewLine, chunk.length).trim()
  }
}
