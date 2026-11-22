declare module 'adm-zip' {
  class AdmZip {
    constructor(file?: string | Buffer)
    getEntries(): AdmZip.IZipEntry[]
    getEntry(name: string): AdmZip.IZipEntry | null
    readFile(entry: string | AdmZip.IZipEntry): Buffer | null
    extractAllTo(target: string, overwrite?: boolean): void
  }

  namespace AdmZip {
    interface IZipEntry {
      entryName: string
      isDirectory: boolean
      header: { size: number }
      getData(): Buffer
    }
  }

  export = AdmZip
}
