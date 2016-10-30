const newLine = '\n'

export function sliceChunk(chunk: string, lastTail: string) {
  const indexOfLastNewLine = chunk.lastIndexOf(newLine)
  return {
    head: lastTail + chunk.substr(0, indexOfLastNewLine),
    tail: chunk.substr(indexOfLastNewLine, chunk.length).trim()
  }
}
