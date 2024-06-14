module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  ignorePatterns: ['!**/*', 'lib/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
        tsconfigPath: './tsconfig.json',
      },
      plugins: ['unused-imports', '@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:n/recommended',
        'plugin:eslint-plugin-eslint-plugin/recommended',
      ],
      rules: {
        'prettier/prettier': 'warn',
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.mdx
        // https://github.com/sweepline/eslint-plugin-unused-imports/tree/master
        // This rule is splitted in two in unused-imports: no-unused-imports and no-unused-vars in order to automatically remove unused imports.
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            vars: 'all',
            varsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],

        'n/no-missing-import': 'off',
      },
    },
    {
      files: ['*.js'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': 'warn',
      },
    },
    {
      files: ['*.json'],
      extends: ['plugin:jsonc/recommended-with-jsonc', 'plugin:jsonc/prettier', 'plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': 'warn',
      },
    },
  ],
};
