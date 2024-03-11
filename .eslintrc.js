module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  ignorePatterns: ["**/dist/**/*.js"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
};
