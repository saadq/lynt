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
    return chalk.bold.green('\n\u2714 No lynt errors\n')
  }

  let output = '\n'
  let totalErrCount = 0
  let totalFixCount = 0

  const tableOptions: table.Options = {
    stringLength: str => stripAnsi(str).length
  }

  lyntResults.forEach(result => {
    output += `${chalk.underline(result.filePath)}\n`

    const formattedErrors = result.errors.map(error => [
      chalk.red(`  ${error.line}:${error.column}`),
      error.message,
      chalk.dim(error.ruleName)
    ])

    output += `${table(formattedErrors, tableOptions)}\n\n`

    totalErrCount += result.errorCount
    totalFixCount += result.fixCount
  })

  const errWord = pluralize('error', totalErrCount)
  const errMessage = `\u2716 ${totalErrCount} lynt ${errWord}`

  output += chalk.bold.red(errMessage)

  if (totalFixCount > 0) {
    const fixMessage = `  (${totalFixCount} ${errWord} can be automatically fixed with the \`--fix\` flag)`
    output += chalk.bold.yellow(fixMessage)
  }

  output += '\n'

  return output
}

function pluralize(word: string, count: number) {
  return count === 1 ? word : word + 's'
}

export default format
