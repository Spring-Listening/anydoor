module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
