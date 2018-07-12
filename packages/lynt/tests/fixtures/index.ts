import { Results } from '../../src/common/types'

function errResultsToHaveRuleName(results: Results, ruleName: string) {
  return results.some(result => {
    return result.errors.some(err => err.ruleName === ruleName)
  })
}

export { errResultsToHaveRuleName }
