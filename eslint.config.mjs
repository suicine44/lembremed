import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.jest } },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  },
  pluginJs.configs.recommended,
];
