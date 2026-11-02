import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";

export default [
  { ignores: ["dist/**", "dist-ssr/**", "node_modules/**", ".qa/**"] },
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: Object.fromEntries(
        [
          "window",
          "document",
          "IntersectionObserver",
          "URL",
          "console",
          "process",
          "Buffer",
          "setTimeout",
        ].map((name) => [name, "readonly"]),
      ),
    },
    plugins: { react, "react-hooks": hooks },
    settings: { react: { version: "18.2" } },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      ...react.configs.recommended.rules,
      ...hooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": "error",
    },
  },
];
