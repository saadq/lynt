import { LyntError, ErrorMap } from '../types'

function format(errors: Array<LyntError>) {
  const errorMap: ErrorMap = {}

  errors.forEach(lintErr => {
    const currentErrors = errorMap[lintErr.name]
    if (currentErrors) {
      currentErrors.push(lintErr)
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
