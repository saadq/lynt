const { CLIEngine } = require('eslint')

test('eslint-config-lynt-react', () => {
  const engine = new CLIEngine({
    useEslintrc: false,
    configFile: '.eslintrc.json'
  })

  const goodCode = `
    import React from 'react'

    const App = () => (
      <div>My App</div>
    )

    export default App
  `

  const badCode = `
    const App = () => (
      <div>My App</div>
    )

    export default App
  `

  expect(engine.executeOnText(goodCode).errorCount).toBe(0)
  expect(engine.executeOnText(badCode).errorCount).toBe(1)
  expect(engine.executeOnText(badCode).results[0].messages[0].ruleId).toBe(
    'react/react-in-jsx-scope'
  )
})
