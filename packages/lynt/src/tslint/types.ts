interface Config {
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

type Results = Array<LintError>

interface LintError {
  startPosition: ErrorPosition
  endPosition: ErrorPosition
  failure: string
  name: string
  ruleName: string
  ruleSeverity: 'ERROR'
  fix?: {
    innerStart: number
    innerLength: number
    innerText: string
  }
}

interface ErrorPosition {
  character: number
  line: number
  position: number
}

interface ErrorMap {
  [fileName: string]: Array<LintError>
}

export { Config, Results, LintError, ErrorPosition, ErrorMap }
