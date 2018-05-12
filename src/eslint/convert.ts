import { Results as ESLintResults } from './types'
import { Results as LyntResults } from '../common/types'

/**
 * Converts ESLint's JSON response into lynt's desired output.
 *
 * The main reason `eslint` and `tslint` have a `convert` file is to have a
 * unified JSON output – ESLint and TSLint have different JSON outputs by
 * default, so this normalizes the difference.
 *
 * @param eslintResults The lint results received from running ESLint.
 * @return A modified version of the lint results following the lynt's schema.
 */
function convert(eslintResults: ESLintResults): LyntResults {
  return eslintResults.map(eslintResult => ({
    filePath: eslintResult.filePath,
    errors: eslintResult.messages.map(message => ({
      ruleName: message.ruleId || '',
      message: message.message,
      line: message.line,
      endLine: message.endLine,
      column: message.column,
      endColumn: message.endColumn
    })),
    errorCount: eslintResult.errorCount,
    fixCount: eslintResult.fixableErrorCount
  }))
}

export default convert
