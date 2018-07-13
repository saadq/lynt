const path = require('path')

module.exports = {
  defaultSeverity: 'error',
  rulesDirectory: [path.dirname(require.resolve('tslint-microsoft-contrib'))],
  rules: {
    'react-anchor-blank-noopener': true,
    'react-iframe-missing-sandbox': true
  }
}
