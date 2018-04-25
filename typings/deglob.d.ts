declare module 'deglob' {
  type Callback = (err: Error | null, files: string[]) => void

  interface Options {
    useGitIgnore?: boolean
    usePackageJson?: boolean
    configKey?: string
    gitIgnoreFile?: string
    ignore?: string[]
    cwd?: string
  }

  function deglob(patterns: string[], cb: Callback): void
  function deglob(patterns: string[], opts: Options, cb: Callback): void

  export { Options }
  export default deglob
}
