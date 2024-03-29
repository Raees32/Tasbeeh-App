module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:@typescript-eslint/recommended-type-checked'],
  rules: {
    
    // Disable Prettier rule to insert spaces
    'prettier/prettier': 0,
    // Disable trailing spaces rule
    'no-trailing-spaces': 0,
    // **Important: Disable the base rule as well**
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    '@typescript-eslint/no-unused-vars': 'error',
    "usePrettierrc": false
  },
  // Disable config file checking (optional)
  requireConfigFile: false,
};
