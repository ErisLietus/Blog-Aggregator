import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.strictTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,

			},
		},
	},
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',


			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': ['warn', {
				"argsIgnorePattern": "^_",
			}],
			'prefer-const': 'off',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/array-type': ['warn', { default: 'generic' }],
			'@typescript-eslint/restrict-template-expressions': ['warn', { allowNumber: true }],
			'@typescript-eslint/no-useless-default-assignment': 'warn',
			'@typescript-eslint/no-unnecessary-condition': 'warn',
			'@typescript-eslint/no-unnecessary-type-parameters': 'warn',
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
			'@typescript-eslint/require-await': 'warn',
			'@typescript-eslint/no-unnecessary-type-arguments': 'warn',
			'@typescript-eslint/no-unnecessary-type-assertion': 'warn',
			'@typescript-eslint/no-deprecated': 'warn',
			'@typescript-eslint/no-unnecessary-type-conversion': 'warn',
			'@typescript-eslint/switch-exhaustiveness-check': ['error', { considerDefaultExhaustiveForUnions: true, requireDefaultForNonUnion: true }],
			'curly': 'warn',


			"@typescript-eslint/no-unsafe-type-assertion": "warn",
			'array-callback-return': ['error', { checkForEach: true }],
			'no-await-in-loop': 'error',
			'no-constructor-return': 'error',
			'no-duplicate-imports': 'warn',
			'no-unmodified-loop-condition': 'error',
			'no-unreachable-loop': 'error',

			"no-use-before-define": "off",
			'@typescript-eslint/no-use-before-define': ['error', { functions: false }],

			'require-atomic-updates': 'error',
			'arrow-body-style': ['warn', 'always'],
			'block-scoped-var': 'error',

			"class-methods-use-this": "off",
			'@typescript-eslint/class-methods-use-this': 'error',

			'consistent-this': 'error',
			"max-params": "off",
			'@typescript-eslint/max-params': 'warn',
			'@typescript-eslint/no-magic-numbers': ['warn', { ignore: [-1, 0], ignoreArrayIndexes: true }],
			'no-negated-condition': 'warn',
			'@typescript-eslint/no-shadow': 'warn',
			'no-unneeded-ternary': 'warn',
			'no-unused-labels': 'warn',
			'no-useless-return': 'error',
			'no-var': 'error',


			// 'complexity': ['warn', 2] //Ideal, but not in a place to enforce at the moment
		}
	},
);
