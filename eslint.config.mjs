import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Strengthen accessibility: enable the full jsx-a11y recommended ruleset.
  // eslint-config-next already registers the `jsx-a11y` plugin (with a curated
  // subset), so we only spread its rules here — re-registering the plugin would
  // throw "Cannot redefine plugin".
  {
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  // Import ordering: third-party/package imports in the first block, local
  // imports (`@/…` and relative) in the next — each block alphabetized, with a
  // blank line between. Autofixable.
  {
    rules: {
      "import/order": [
        "error",
        {
          // Two blocks only: packages, then all local (`@/…` + relative).
          groups: [["builtin", "external"], "internal"],
          pathGroups: [
            { pattern: "@/**", group: "internal" },
            { pattern: "./**", group: "internal" },
            { pattern: "../**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["builtin", "external"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
  // Disable stylistic rules that conflict with Prettier. Keep last so it wins.
  prettier,
  {
    // Module-augmentation declaration files need empty interfaces and `any` to
    // merge with upstream library types.
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "next-env.d.ts"]),
]);

export default eslintConfig;
