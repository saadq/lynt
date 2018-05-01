import { CLIEngine } from 'eslint'

interface Lynter {
  new (options: LyntOptions): Lynter
  lintText(text: string, fileName?: string): LyntResults
  lintFiles(paths: Array<string>): LyntResults
}

interface LyntOptions {
  /** Add TypeScript support by using TSLint. */
  typescript?: boolean

  /** Add Flow support. */
  flow?: boolean

  /** Add React support. */
  react?: boolean

  /** Glob patterns of files you don't want to lint. */
  ignore?: string | Array<string>

  /** Add support for the given global variable(s). */
  global?: string | Array<string>

  /** Get lint results in JSON format instead of default "stylish" format. */
  json?: string | Array<string>

  /** Specify your project's main directory if it isn't in the root. */
  project?: string
}

interface LyntResults {
  /** The amount of errors received from linting. */
  errorCount: number

  /** The actual lint results received in either "stylish" or "json" format. */
  output: string
}

type ESLintConfig = CLIEngine.Options

interface TSLintConfig {
  [key: string]: any
}

export { Lynter, LyntOptions, LyntResults, ESLintConfig, TSLintConfig }
