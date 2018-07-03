const { eslintStyles, tslintStyles } = require('.')

test('eslintStyles', () => {
  expect(eslintStyles).toContain('semi')
})

test('tslintStyles', () => {
  expect(tslintStyles).toContain('semicolon')
})
