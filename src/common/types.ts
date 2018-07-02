/** The options the user passes in to customize Lynt. */
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

  /** Specify your own desired rules to be merged with lynt's config (style rules are still not permissible) */
  rules?: Record<string, any>
}

/** The converted version of the lint results received from ESLint/TSLint. */
type Results = Array<{
  /** The full path to the given file with lint errors. */
  filePath: string

  /** A collection of errors for the given file. */
  errors: Array<{
    ruleName: string
    message: string
    line: number
    column: number
    endLine?: number
    endColumn?: number
  }>

  /** The amount of errors for the given file. */
  errorCount: number

  /** The amount of errors that can automatically be fixed for the given file.*/
  fixCount: number
}>

export { Options, Results }
