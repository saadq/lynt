#!/usr/bin/env node

import meow from 'meow'
import lynt from '.'

const template = `
  Usage
    $ lynt [files] <options>

  Options
    --jest     Add support for Jest globals
    --ignore   Glob patterns for paths to ignore
    --global   Add support for a given global variable

  Examples
    $ lynt src
    $ lynt src --jest
    $ lynt src --ignore dist
    $ lynt src --ignore dist --ignore build
    $ lynt src --global chrome
    $ lynt src --global chrome --global atom
`

const cli = meow({
  help: template,
  flags: {
    jest: 'boolean',
    ignore: 'string',
    global: 'string'
  }
})

lynt(cli.input, cli.flags)
