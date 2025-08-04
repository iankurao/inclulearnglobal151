import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "@typescript-eslint/parser"
import tseslintPlugin from "@typescript-eslint/eslint-plugin"

// This file is not typically part of a Next.js project's default setup.
// If you intend to use a custom ESLint configuration, you would typically
// use `.eslintrc.js` or `eslint.config.mjs` for flat config.
// For a standard Next.js project, `next lint` handles much of this.

// If you are using ESLint Flat Config (new in ESLint 9), this file would
// contain your configuration. For now, assuming a standard Next.js setup
// where this file might not be strictly necessary or might be empty.

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslintPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]
