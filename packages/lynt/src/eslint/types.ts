import { CLIEngine } from 'eslint'

type Results = Array<CLIEngine.LintResult>

interface Config {
  useEslintrc: boolean
  parserOptions: {
    ecmaVersion: number
    ecmaFeatures: {
      [key: string]: boolean
    }
    sourceType: string
  }
  plugins: Array<string>
  envs: Array<string>
  ignorePattern: Array<string>
  rules: {
    [key: string]: any
  }
  parser?: string
  fix?: boolean
  ignorePath?: string
  globals?: Array<string>
}

export { Config, Results }
