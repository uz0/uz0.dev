import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  // Next.js presets
  ...nextVitals,
  ...nextTs,

  // Prettier — отключает конфликтующие правила
  prettierConfig,

  // Prettier как eslint-правило
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',

      // App Router
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      '@next/next/no-async-client-component': 'error',
    },
  },

  // Override default ignores of eslint-config-next
  globalIgnores([
    // default
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'docs/static/**',

    // custom
    'public/**',
    'scripts/**',
  ]),
]);
