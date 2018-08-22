const path = require('path')

module.exports = {
  defaultSeverity: 'error',
  extends: ['tslint-react'],
  rules: {
    'jsx-key': true,
    'jsx-no-string-ref': true,
    'jsx-boolean-value': false
  }
}
