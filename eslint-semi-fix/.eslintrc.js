module.exports = {
  "env": {
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "semi": [
      "error",
      "always"
    ],
    "semi-spacing": 2,
    "indent": ["error", 2],
    "no-extra-semi": 2,
    "no-unexpected-multiline": 2,
    "operator-linebreak": [2, "none"]
  }
};