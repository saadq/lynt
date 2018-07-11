/* tslint:disable no-non-null-assertion */

import { Linter, Configuration } from 'tslint'

test('tslint-config-lynt-typed', () => {
  const configFileName = 'tslint.json'
  const program = Linter.createProgram('tsconfig.json', '.')
  const linter = new Linter({ fix: false, formatter: 'json' }, program)

  Linter.getFileNames(program).forEach(file => {
    const fileContents = program.getSourceFile(file)!.getFullText()
    const config = Configuration.findConfiguration(configFileName, file).results
    linter.lint(file, fileContents, config)
  })

  const results = linter.getResult()
  expect(results.errorCount).toBe(1)
  expect(results.failures.length).toBe(1)
  expect(results.failures[0].getRuleName()).toBe('no-unused-variable')
})
