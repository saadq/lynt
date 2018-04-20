#!/usr/bin/env node

import meow from 'meow'
import lynt from '.'

const template = `
  Usage
    $ lynt [files] <options>

  Options
    --typescript   Add support for TypeScript
    --flow         Add support for Flowtype
    --react        Add support for React

  Examples
    $ lynt src
    $ lynt src --typescript
    $ lynt src --typescript --react
`

const cli = meow({
  help: template,
  flags: {
    typescript: 'boolean',
    flow: 'boolean',
    react: 'boolean'
  }
})

lynt(cli.input, cli.flags)
