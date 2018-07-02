import convert from '../../src/eslint/convert'
import { Results as ESLintResults } from '../../src/eslint/types'
import { Results as LyntResults } from '../../src/common/types'

test("convert() can convert ESLint's error format to Lynt's format", () => {
  const eslintResults: ESLintResults = [
    {
      filePath: 'foo.js',
      messages: [
        {
          ruleId: 'no-undef',
          severity: 2,
          message: "'foo' is not defined.",
          line: 346,
          column: 4,
          nodeType: 'Identifier',
          source: 'foo',
          endLine: 346,
          endColumn: 13
        }
      ],
      errorCount: 1,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0
    }
  ]

  const expected: LyntResults = [
    {
      filePath: 'foo.js',
      errors: [
        {
          ruleName: 'no-undef',
          message: "'foo' is not defined.",
          line: 346,
          column: 4,
          endLine: 346,
          endColumn: 13
        }
      ],
      errorCount: 1,
      fixCount: 0
    }
  ]

  const actual = convert(eslintResults)
  expect(actual).toEqual(expected)
})
