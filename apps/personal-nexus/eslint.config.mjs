import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      react: reactPlugin,
      import: importPlugin,
    },
    // Override or add rules here
    rules: {},
  },
];
