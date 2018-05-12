import table from 'text-table'
import chalk from 'chalk'
import stripAnsi from 'strip-ansi'
import { Results } from '../common/types'

/**
 * Formats a list of lynt errors into a nice looking table. The output is based on
 * the "stylish" formatter, but it removes inconsistencies between the outputs
 * of ESLint's and TSLint's "stylish".
 *
 * @param errors An array of the errors produced by running lynt.
 * @return A formatted "stylish" table display of the errors.
 */
function format(lyntResults: Results): string {
  if (lyntResults.length === 0) {
    return chalk.bold.green('\u2714 No lynt errors')
  }

  let output = ''

  lyntResults.forEach(result => {
    output += `${chalk.underline(result.filePath)}\n`

    const errorTable = result.errors.map(error => [
      chalk.red(`  ${error.line}:${error.column}`),
      error.message,
      chalk.dim(error.ruleName)
    ])

    const options: table.Options = {
      stringLength: str => stripAnsi(str).length
    }

    output += `${table(errorTable, options)}\n\n`
  })

  const errCount = lyntResults.reduce((sum, curr) => sum + curr.errorCount, 0)
  let errMessage = `\u2716 ${errCount} lynt error`

  if (errCount > 1) {
    errMessage += 's'
  }

  output += chalk.bold.red(errMessage)

  return output
}

export default format
