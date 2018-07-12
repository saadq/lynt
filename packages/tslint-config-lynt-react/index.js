const path = require('path')

module.exports = {
  defaultSeverity: 'error',
  extends: ['tslint-react'],
  rulesDirectory: [path.dirname(require.resolve('tslint-microsoft-contrib'))],
  rules: {
    'jsx-key': true,
    'jsx-no-string-ref': true,
    'react-anchor-blank-noopener': true,
    'react-iframe-missing-sandbox': true
  }
}
