/* tslint:disable no-non-null-assertion */

import { Linter, Configuration } from 'tslint'
import { writeFileSync, unlinkSync } from 'fs'
import { join } from 'path';

test('tslint-config-lynt-react-typed', async () => {
  const config: any = require('.')
  const configFileName = 'tslint.json'
  const configFilePath = join(__dirname, configFileName)
  writeFileSync(configFilePath, JSON.stringify(config, null, 4))

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
  expect(results.failures[0].getRuleName()).toBe('react-anchor-blank-noopener')

  unlinkSync(configFilePath)
})
