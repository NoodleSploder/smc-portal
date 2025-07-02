declare module 'node-7z' {
  export function list(archive: string): any;
  const Seven: { list: typeof list };
  export default Seven;
}