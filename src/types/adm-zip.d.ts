declare module 'adm-zip' {
  export default class AdmZip {
    constructor(path?: string);
    getEntries(): Array<{
      entryName: string;
      isDirectory: boolean;
    }>;
  }
}