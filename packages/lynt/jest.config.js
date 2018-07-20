module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['tests/eslint/files-to-lint', 'tests/tslint/files-to-lint', 'tests/fixtures'],
  watchPathIgnorePatterns: ['tslint.json'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
