module.exports = {
  parser: '@typescript-eslint/parser', // Tells ESLint to use this parser installed at previous step
  parserOptions: {
    ecmaVersion: 2021, // The version of ECMAScript you are using
    sourceType: 'module', // Enables ECMAScript modules
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  ignorePatterns: ['out/**', 'functions', 'tsconfig.dev.json'],
  extends: [
    'plugin:react/recommended', // Specify rules for React
    'plugin:react-hooks/recommended', // Specify rules for React hooks
    'plugin:@typescript-eslint/recommended', // Specify rules for Typescript
  ],
  rules: {
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'max-len': ['error', { code: 120 }],
    'require-jsdoc': ['off', {}],
    'valid-jsdoc': ['off', {}],
  },
}
