type Lynt = (paths: Array<string>, options: Options) => Results

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

  /** Get lint results in JSON format instead of default "stylish" format. */
  json?: string | Array<string>

  /** Specify your project's main directory if it isn't in the root. */
  project?: string
}

/** The actual lint results received in either "stylish" or "json" format. */
type Results = string | Array<LyntError>

interface ErrorPosition {
  character: number
  line: number
  position: number
}

interface ErrorMap {
  [fileName: string]: Array<LyntError>
}

interface LyntError {
  startPosition: ErrorPosition
  endPosition: ErrorPosition
  failure: string
  name: string
  ruleName: string
  ruleSeverity: 'ERROR'
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
  rulesDirectory: Array<string>
  defaultSeverity: 'error'
  linterOptions: {
    exclude: Array<string>
  }
  rules: {
    [key: string]: any
  }
  extends?: Array<string>
  jsRules?: {
    [key: string]: any
  }
}

export {
  Lynt,
  Options,
  Results,
  ErrorPosition,
  ErrorMap,
  LyntError,
  ESLintConfig,
  TSLintConfig
}
