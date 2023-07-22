module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react-native/no-inline-styles': 'off',
    'no-shadow': 'off',
    'no-undef': 'off',
    'no-catch-shadow': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-unstable-nested-components': [
      'error',
      {
        allowAsProps: true,
        customValidators: [],
      },
    ],
  },
};
