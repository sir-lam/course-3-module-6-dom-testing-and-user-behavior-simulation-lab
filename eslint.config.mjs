import globals from "globals";
import pluginJs from "@eslint/js";

const customGlobals = {
  ...globals.browser,
  module: 'readonly',
};

export default [
  {
    languageOptions: { globals: customGlobals },
  },
  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
];