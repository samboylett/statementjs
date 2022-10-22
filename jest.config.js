module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{j,t}s{,x}"
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageReporters: [
    "lcov",
  ],
  testMatch: [
    "**/*.spec.ts",
  ],
  testEnvironment: 'jsdom',
  verbose: true,
  testEnvironmentOptions: {
    url: "http://localhost:3000/",
  },
  maxWorkers: 1,
};
