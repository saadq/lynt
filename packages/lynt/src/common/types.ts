interface Options {
  /** Add TypeScript support by using TSLint. */
  typescript?: boolean

  /** Add Flow support. */
  flow?: boolean

  /** Add React support. */
  react?: boolean

  /** Glob patterns of files you don't want to lint. */
  ignore?: string | Array<string>

  /** Automatically fix linting issues. */
  fix?: boolean

  /** Add support for the given global variable(s). */
  global?: string | Array<string>

  /** Add support for the given env. */
  env?: string | Array<string>

  /** Get lint results in JSON format instead of default "stylish" format. */
  json?: string | Array<string>

  /** Specify your project's main directory if it isn't in the root. */
  project?: string
}

/** The converted version of the lint results received from ESLint/TSLint. */
type Results = Array<{
  filePath: string
  errors: Array<{
    ruleName: string
    message: string
    line: number
    column: number
    endLine?: number
    endColumn?: number
  }>
  errorCount: number
  fixCount: number
}>

export { Options, Results }
