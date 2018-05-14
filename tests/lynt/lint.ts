import { join } from 'path'
import lynt, { format } from '../../src'

describe('this codebase', () => {
  it('should not have any lint errors', () => {
    const results = lynt([], {
      typescript: true,
      project: join(__dirname, '..', '..')
    })

    console.log(format(results))
    expect(results.length).toBe(0)
  })
})
