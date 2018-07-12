const path = require('path')

const getRuleDirectory = (name, directory) =>
  path.join(path.dirname(require.resolve(name)), directory || '')

module.exports = {
  defaultSeverity: 'error',
  extends: ['tslint-react'],
  rulesDirectory: [getRuleDirectory('tslint-microsoft-contrib')],
  rules: {
    'jsx-key': true,
    'jsx-no-string-ref': true,
    'react-anchor-blank-noopener': true,
    'react-iframe-missing-sandbox': true
  }
}
