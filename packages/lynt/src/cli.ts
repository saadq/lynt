#!/usr/bin/env node

import meow from 'meow'
import lynt from '.'

const template = `
  Usage
    $ lynt [files] <options>

  Options
    --jest     Add support for Jest globals
    --ignore   Glob patterns for paths to ignore

  Examples
    $ lynt src
    $ lynt src --jest
    $ lynt src --ignore dist
    $ lynt src --ignore dist --ignore build
`

const cli = meow({
  help: template,
  flags: {
    jest: 'boolean',
    ignore: 'string'
  }
})

lynt(cli.input, cli.flags)
