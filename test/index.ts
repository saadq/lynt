import test from 'tape'
import lynt from '../src'
import { readFileSync } from 'fs'
import { join } from 'path'

test('lynt (eslint)', t => {
  const filePath = join(__dirname, 'eslint', '1.js')
  const { errorCount, output } = lynt(filePath)
  t.equal(errorCount, 1)
  t.true(output.includes('prefer-const'))
  t.true(output.includes("'x' is never reassigned. Use 'const' instead"))
  t.end()
})

test('lynt (tslint)', t => {
  const filePath = join(__dirname, 'tslint', '1.ts')
  const options = { typescript: true }
  const { errorCount, output } = lynt(filePath, options)
  t.equal(errorCount, 1)
  t.true(output.includes('no-empty-interface'))
  t.true(output.includes('An empty interface is equivalent to `{}`.'))
  t.end()
})
