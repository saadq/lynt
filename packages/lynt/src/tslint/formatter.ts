import table from 'text-table'
import chalk from 'chalk'
import stripAnsi from 'strip-ansi'
import { LyntError, ErrorMap } from '../types'

/**
 * Formats a list of errors into a nice looking table. The output is based on
 * the "stylish" formatter, but it removes inconsistencies between the outputs
 * of ESLint and TSLint.
 *
 * @param errors An array of the errors produced by running lynt.
 * @return A formatted "stylish" table display of the errors.
 */
function format(errors: Array<LyntError>) {
  const sortedErrors = errors.sort((a, b) => {
    if (a.name !== b.name) {
      return a.name < b.name ? -1 : 1
    }

    return a.startPosition.position - b.startPosition.position
  })

  const errorMap: ErrorMap = {}

  sortedErrors.forEach(lintErr => {
    if (errorMap[lintErr.name]) {
      errorMap[lintErr.name].push(lintErr)
    } else {
      errorMap[lintErr.name] = [lintErr]
    }
  })

  const entries = Object.entries(errorMap)
  let output = ''

  entries.forEach(([fileName, fileErrors], index) => {
    output += `${chalk.underline(fileName)}\n`

    const errorTable = fileErrors.map(error => [
      chalk.red(
        `  ${error.startPosition.character}:${error.startPosition.line}`
      ),
      error.failure,
      chalk.dim(error.ruleName)
    ])

    const options: table.Options = {
      stringLength: str => stripAnsi(str).length
    }

    output += `${table(errorTable, options)}\n\n`
  })

  const errCount = errors.length
  const errMessage = `\u2716 ${errCount} lynt ${pluralize('error', errCount)}`
  output += chalk.bold.red(errMessage)

  return output
}

/**
 * Adds the letter 's' to a word if necessary.
 *
 * @param word The word to pluralize.
 * @param count The count used to decide if its necessary to pluralize.
 * @return The original word with an 's' at the end if it is needed.
 */
function pluralize(word: string, count: number) {
  return count > 1 ? `${word}s` : word
}

export default format
