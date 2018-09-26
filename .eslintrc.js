module.exports = {
  parser: 'babel-eslint',

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],

  plugins: ['react', 'prettier'],

  rules: {
    'prettier/prettier': 'error'
  },
  settings: {
    react: {
      version: '16.3'
    }
  }
};
