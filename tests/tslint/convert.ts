import convert from '../../src/tslint/convert'
import { Results as TSLintResults } from '../../src/tslint/types'
import { Results as LyntResults } from '../../src/common/types'

test("convert() can convert TSLint's error format to Lynt's format", () => {
  const tslintResults: TSLintResults = [
    {
      endPosition: { character: 1, line: 11, position: 146 },
      failure: 'block is empty',
      name: 'foo.ts',
      ruleName: 'no-empty',
      ruleSeverity: 'ERROR',
      startPosition: { character: 16, line: 10, position: 143 }
    }
  ]

  const expected: LyntResults = [
    {
      filePath: 'foo.ts',
      errors: [
        {
          ruleName: 'no-empty',
          message: 'block is empty',
          line: 11,
          column: 17,
          endLine: 12,
          endColumn: 2
        }
      ],
      errorCount: 1,
      fixCount: 0
    }
  ]

  const actual = convert(tslintResults)
  expect(actual).toEqual(expected)
})
