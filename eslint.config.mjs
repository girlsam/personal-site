import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";

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
  // Disable stylistic rules that conflict with Prettier. Keep last so it wins.
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "next-env.d.ts"]),
]);

export default eslintConfig;
