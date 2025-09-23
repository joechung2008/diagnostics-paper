const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");
const { defineConfig } = require("eslint/config");
const jest = require("eslint-plugin-jest");
const prettier = require("eslint-plugin-prettier");
const reactNative = require("eslint-plugin-react-native");
const react = require("eslint-plugin-react-x");

module.exports = defineConfig([
  {
    ignores: [
      "android",
      "coverage",
      "dist",
      "ios",
      "src/**/*.d.ts",
      "*.{config,setup}.{cjs,js,ts}",
    ],
  },
  expoConfig,
  prettierConfig,
  {
    plugins: {
      jest,
      "react-x": react,
      "react-native": reactNative,
      prettier,
    },
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js"],
        },
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactNative.configs.all.rules,
      "prettier/prettier": "error",
    },
  },
]);
