import { Results } from '../../src/common/types'

function errResultsHaveRuleName(results: Results, ruleName: string) {
  return results.some(result => {
    return result.errors.some(err => err.ruleName === ruleName)
  })
}

export { errResultsHaveRuleName }
