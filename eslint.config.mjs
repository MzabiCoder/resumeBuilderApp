import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-config-next already registers the jsx-a11y plugin; we only
  // escalate to the full *strict* rule set (registering it twice throws).
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...jsxA11y.flatConfigs.strict.rules,
      // Scrollable regions must be keyboard-focusable (WCAG 2.1.1); allow role="region".
      "jsx-a11y/no-noninteractive-tabindex": ["error", { tags: [], roles: ["tabpanel", "region"] }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "react/no-danger": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    ".lighthouseci/**",
    "storybook-static/**",
  ]),
]);

export default eslintConfig;
