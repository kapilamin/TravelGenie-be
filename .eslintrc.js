module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "airbnb"
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 12,
      sourceType: "module"
    },
    plugins: [
      "react"
    ],
    rules: {
      "no-unused-vars": "error",
      "no-multi-spaces": "error",
      "eol-last": ["error", "always"],
      "semi": ["error", "always"]
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  };
  
  