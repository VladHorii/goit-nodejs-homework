module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard"],
  semi: ["always"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "comma-dangle": "off",
    "space-before-function-paren": "off",
  },
};
