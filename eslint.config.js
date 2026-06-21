import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: ["dist/**", ".vercel/**", "node_modules/**", "data/**", "playwright-report/**", "test-results/**", "*.log"]
  },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}", "server/**/*.js", "scripts/**/*.mjs", "tests/**/*.{js,jsx}", "*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly"
      }
    },
    plugins: {
      "react-hooks": reactHooks
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^[A-Z][A-Za-z0-9]*$" }],
      "no-undef": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
];
