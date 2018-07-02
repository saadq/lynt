import { CLIEngine } from 'eslint'

type Results = Array<CLIEngine.LintResult>
type Rules = Record<string, any>

interface Config {
  extends: Array<string>
  rules?: Rules
  [name: string]: any
}

interface ESLintOptions {
  useEslintrc: boolean
  baseConfig: Config
  ignorePattern: Array<string>
  parser: string
  fix: boolean
  globals?: Array<string>
  envs?: Array<string>
  rules?: Record<string, any>
}

export { Results, ESLintOptions, Config, Rules }
