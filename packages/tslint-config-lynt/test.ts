import { Linter, Configuration } from 'tslint'
import fs from 'fs'

test('tslint-config-lynt', () => {
  const configFileName = 'tslint.json'
  const fileToLintName = 'fixture.ts'
  const fileToLintContents = fs.readFileSync(fileToLintName, 'utf8')
  const linter = new Linter({ fix: false, formatter: 'json' })
  const config = Configuration.findConfiguration(configFileName, fileToLintName)
    .results

  linter.lint(fileToLintName, fileToLintContents, config)
  const result = linter.getResult()

  expect(result.errorCount).toBe(1)
  expect(result.failures.length).toBe(1)
  expect(result.failures[0].getRuleName()).toBe('no-empty')
})
