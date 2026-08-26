import { config } from '@n8n/node-cli/eslint';

export default [
  {
    ignores: ['dist/**', 'docs/**', 'node_modules/**', 'package-lock.json'],
  },
  ...config,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
