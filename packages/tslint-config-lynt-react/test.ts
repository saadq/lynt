import { Linter, Configuration } from 'tslint'
import fs from 'fs'

test('tslint-config-lynt', () => {
  const fileName = './fixture.tsx'
  const fileContents = fs.readFileSync(fileName, 'utf8')
  const configName = './index.js'
  const config = Configuration.findConfiguration(configName, fileName).results
  const linter = new Linter({ fix: false })

  linter.lint(fileName, fileContents, config)
  const result = linter.getResult()

  expect(result.errorCount).toBe(1)
  expect(result.failures.length).toBe(1)
  expect(result.failures[0].getRuleName()).toBe('jsx-no-string-ref')
})
