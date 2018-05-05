type Lynt = (paths: Array<string>, options: LyntOptions) => LyntResults

interface LyntOptions {
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

interface ESLintConfig {
  useEslintrc: boolean
  parserOptions: {
    ecmaVersion: number
    ecmaFeatures: {
      [key: string]: boolean
    }
    sourceType: string
  }
  plugins: Array<string>
  envs: Array<string>
  ignorePattern: Array<string>
  rules: {
    [key: string]: any
  }
  parser?: string
  fix?: boolean
  ignorePath?: string
  globals?: Array<string>
}

interface TSLintConfig {
  [key: string]: any
}

export { Lynt, LyntOptions, LyntResults, ESLintConfig, TSLintConfig }
