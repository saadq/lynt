interface Config {
  extends: Array<string>
  linterOptions: {
    exclude: Array<string>
  }
  [name: string]: any
}

type Results = Array<LintError>
type Rules = Record<string, any>

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

export { Config, Results, LintError, ErrorPosition, ErrorMap, Rules }
