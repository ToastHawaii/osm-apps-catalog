import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  react.configs.flat.recommended,

  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Global rules
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/unified-signatures": [
        "error",
        {
          ignoreDifferentlyNamedParameters: true,
          ignoreOverloadsWithDifferentJSDoc: true,
        },
      ],
    },
  }
);
