module.exports = {
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js"],
  roots: ["<rootDir>/packages"],
  globals: {
    "ts-jest": {
      extends: "./babel.config.js"
    }
  },
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  setupFilesAfterEnv: ["./setupTests.ts"]
};
