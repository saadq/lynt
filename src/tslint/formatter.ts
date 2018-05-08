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
  const errorMap: ErrorMap = {}

  errors.forEach(lintErr => {
    if (errorMap[lintErr.name]) {
      errorMap[lintErr.name].push(lintErr)
    } else {
      errorMap[lintErr.name] = [lintErr]
    }
  })

  const entries = Object.entries(errorMap)
  let output = ''

  entries.forEach(([fileName, fileErrors], index) => {
    output += fileName + '\n'
    output += '============================\n'

    fileErrors.forEach(err => {
      output += [
        `${err.startPosition.line + 1}:${err.startPosition.character + 1}`,
        'ERROR',
        err.ruleName,
        err.failure + '\n'
      ].join('\t')
    })

    if (index !== entries.length - 1) {
      output += '\n'
    }
  })

  return output
}

export default format
