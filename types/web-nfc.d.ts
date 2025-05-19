// Type definitions for Web NFC API
// This avoids the need to import from external packages

interface NDEFMessage {
  records: NDEFRecord[]
}

interface NDEFRecord {
  recordType: string
  mediaType?: string
  id?: string
  data?: any
  encoding?: string
  lang?: string
}

interface NDEFReadingEvent {
  message: NDEFMessage
  serialNumber: string
}

interface NDEFErrorEvent extends Event {
  message: string
}

interface NDEFReader extends EventTarget {
  scan(options?: { signal?: AbortSignal }): Promise<void>
  write(message: NDEFMessage | { records: NDEFRecord[] }, options?: { signal?: AbortSignal }): Promise<void>

  onreading: ((this: NDEFReader, event: NDEFReadingEvent) => any) | null
  onreadingerror: ((this: NDEFReader, error: NDEFErrorEvent) => any) | null
}

interface Window {
  NDEFReader: {
    new (): NDEFReader
    prototype: NDEFReader
  }
}
