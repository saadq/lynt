import { CLIEngine } from 'eslint'

type ESLintConfig = CLIEngine.Options

interface LyntOptions {
  /** Add TypeScript support by using TSLint. */
  typescript?: boolean

  /** Add Flow support. */
  flow?: boolean

  /** Add React support. */
  react?: boolean

  /** Add Jest support. */
  jest?: boolean

  /** Glob patterns of files you don't want to lint. */
  ignore?: string | Array<string>

  /** Add support for the given global variable(s). */
  global?: string | Array<string>

  /** Get lint results in JSON format instead of default "stylish" format. */
  json?: string | Array<string>
}

interface LyntResults {
  /** The amount of errors received from linting. */
  errorCount: number

  /** The actual lint results received in either "stylish" or "json" format. */
  output: string
}

export { LyntOptions, LyntResults, ESLintConfig }
