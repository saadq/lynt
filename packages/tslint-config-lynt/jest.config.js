const config = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: 'test.ts',
  testPathIgnorePatterns: ['tests/js-files', 'tests/ts-files'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}

module.exports = config
