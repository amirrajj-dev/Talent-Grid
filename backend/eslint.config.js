import js from '@eslint/js';
import globals from 'globals';

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // Global ignores
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },

  // Main configuration for source files
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      // Essential rules
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-undef': 'error',

      // Code quality
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-eval': 'error',

      // Modern JS
      'prefer-const': 'error',
      'no-var': 'error',

      // Basic formatting
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  },
];
