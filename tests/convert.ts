import eslintConvert from '../src/eslint/convert'
import tslintConvert from '../src/tslint/convert'
import { Results as ESLintResults } from '../src/eslint/types'
import { Results as TSLintResults } from '../src/tslint/types'
import { Results as LyntResults } from '../src/common/types'

describe('convert', () => {
  it("can convert eslint's error format to lynt's format", () => {
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

    const actual = eslintConvert(eslintResults)

    expect(actual).toEqual(expected)
  })

  it("can convert tslint's error format to lynt's format", () => {
    const tslintResults: TSLintResults = [
      {
        endPosition: {
          character: 5,
          line: 0,
          position: 5
        },
        failure:
          "Identifier 'x' is never reassigned; use 'const' instead of 'let'.",
        fix: {
          innerStart: 0,
          innerLength: 3,
          innerText: 'const'
        },
        name: 'foo.js',
        ruleName: 'prefer-const',
        ruleSeverity: 'ERROR',
        startPosition: {
          character: 4,
          line: 0,
          position: 4
        }
      }
    ]

    const expected: LyntResults = [
      {
        filePath: 'foo.js',
        errors: [
          {
            ruleName: 'prefer-const',
            message: "Identifier 'x' is never reassigned; use 'const' instead of 'let'.",
            line: 1,
            column: 5,
            endLine: 1,
            endColumn: 6
          }
        ],
        errorCount: 1,
        fixCount: 1
      }
    ]

    const actual = tslintConvert(tslintResults)

    expect(actual).toEqual(expected)
  })
})
