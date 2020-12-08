module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverageFrom: ['**/*.vue', 'src/store/modules/*.ts'],
  watchPathIgnorePatterns: ['/node_modules/']
};
