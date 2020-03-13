module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setup-test-env.js'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  moduleNameMapper: {
    '^components/(.*)$': '/src/components/$1',
  },
}
