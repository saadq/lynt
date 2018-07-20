const { CLIEngine } = require('eslint')

test('eslint-config-lynt', () => {
  const engine = new CLIEngine({
    useEslintrc: false,
    configFile: '.eslintrc.json'
  })

  const goodCode = `
    const age = 23
    export { age }
  `

  const badCode = `
    const age = 23

    if (age)
      console.log(age)
  `

  expect(engine.executeOnText(goodCode).errorCount).toBe(0)
  expect(engine.executeOnText(badCode).errorCount).toBe(1)
  expect(engine.executeOnText(badCode).results[0].messages[0].ruleId).toBe(
    'curly'
  )
})
