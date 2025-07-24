// eslint.config.js
import eslintPluginImport from 'eslint-plugin-import';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import importPlugin from 'eslint-plugin-import';

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
            '@typescript-eslint': tsPlugin,
            import: importPlugin,
            jsdoc: jsdocPlugin,
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
            'jsdoc/check-alignment': 'warn',
            'jsdoc/check-param-names': 'warn',
            'jsdoc/check-tag-names': 'warn',
            'jsdoc/check-types': 'warn',
            'jsdoc/require-param': 'warn',
            'jsdoc/require-returns': 'warn',
        },
    },
    eslintConfigPrettier,
];
