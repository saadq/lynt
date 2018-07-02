const { CLIEngine } = require('eslint')

test('eslint-config-lynt-flow', () => {
  const engine = new CLIEngine({
    useEslintrc: false,
    parser: 'babel-eslint',
    configFile: '.eslintrc.json'
  })

  const goodCode = `
    // @flow

    type Person = {|
      name: string,
      age: number
    |}

    export { Person }
  `

  const badCode = `
    // @flow

    type Person = {|
      name: string,
      age: number,
      name: string
    |}

    export { Person }
  `

  expect(engine.executeOnText(goodCode).errorCount).toBe(0)
  expect(engine.executeOnText(badCode).errorCount).toBe(1)
  expect(engine.executeOnText(badCode).results[0].messages[0].ruleId).toBe(
    'flowtype/no-dupe-keys'
  )
})
