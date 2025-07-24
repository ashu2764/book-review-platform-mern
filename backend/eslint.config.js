// eslint.config.js
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': eslintPluginTs,
            import: eslintPluginImport,
        },
        rules: {
            'no-console': 'warn',
            'import/order': [
                'warn',
                {
                    groups: [
                        ['builtin', 'external'],
                        'internal',
                        ['parent', 'sibling', 'index'],
                    ],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
    },
    eslintConfigPrettier,
];
