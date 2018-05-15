import { Results as TSLintResults, ErrorMap } from './types'
import { Results as LyntResults } from '../common/types'

/**
 * Converts TSLint's JSON response into lynt's desired output.
 *
 * The main reason `eslint` and `tslint` have a `convert` file is to have a
 * unified JSON output – ESLint and TSLint have different JSON outputs by
 * default, so this normalizes the difference.
 *
 * TSLint does not organize errors by file, so there is an extra step done to
 * create an error map of fileName => lintErrors before converting.
 *
 * @param tslintResults The lint results received from running TSLint.
 * @return A modified version of the lint results following the lynt's schema.
 */
function convert(tslintResults: TSLintResults): LyntResults {
  const sortedResults = tslintResults.sort((a, b) => {
    if (a.name !== b.name) {
      return a.name < b.name ? -1 : 1
    }

    return a.startPosition.position - b.startPosition.position
  })

  const errorMap: ErrorMap = {}

  sortedResults.forEach(result => {
    if (errorMap[result.name]) {
      errorMap[result.name].push(result)
    } else {
      errorMap[result.name] = [result]
    }
  })

  return Object.keys(errorMap).map(fileName => {
    const lintErrors = errorMap[fileName]
    return {
      filePath: fileName,
      errors: lintErrors.map(lintErr => ({
        ruleName: lintErr.ruleName,
        message: lintErr.failure,
        line: lintErr.startPosition.line + 1,
        column: lintErr.startPosition.character + 1,
        endLine: lintErr.endPosition.line + 1,
        endColumn: lintErr.endPosition.character + 1
      })),
      errorCount: lintErrors.length,
      fixCount: lintErrors.reduce((sum, curr) => (curr.fix ? sum + 1 : sum), 0)
    }
  })
}

export default convert
